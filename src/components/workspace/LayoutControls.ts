import {
  $layoutConfig,
  $workspaceMode,
  $activeTemplateId,
  $filteredImages,
  $sortKey,
  updateLayoutConfig,
  setActiveTemplate,
  sortImages,
} from '../../lib/store';
import {
  CONTACT_SHEET_PRESETS,
  CONTACT_SHEET_CATEGORY_LABELS,
  COLLAGE_TEMPLATES,
  PRESET_STRUCTURAL_BASE,
} from '../../lib/engine/templates';
import type { ContactSheetCategory } from '../../lib/engine/templates';
import {
  getPagePixelDimensions,
  buildCellLabel,
  PX_PER_MM,
  CUSTOM_PAGE_MIN_MM,
  CUSTOM_PAGE_MAX_MM,
} from '../../lib/engine/contactSheetEngine';
import { resolveMetadataTokens } from '../../lib/engine/canvasRenderer';
import type { LayoutConfig, SortKey } from '../../lib/types';
import { extractForensicWatermark } from '../../lib/engine/forensicWatermark';

/**
 * Layout sidebar.
 *
 * The previous version re-rendered `container.innerHTML` from a
 * `$layoutConfig.subscribe`. Every `input` event on a slider therefore replaced
 * the slider mid-drag, so the thumb was destroyed under the pointer and the
 * drag died after one pixel. Every control in here was effectively click-only.
 *
 * So: the DOM is built **once** per mode. `sync()` then patches values, active
 * states and readouts in place, skipping whatever element currently has focus
 * so a live drag or a half-typed title is never overwritten. Events are
 * delegated on the container, which means nothing needs re-binding either.
 */

/** Sizes whose dimensions the user thinks about in mm, so a mm readout next to
 *  the px one is useful. Screen sizes are px-native and get px only. */
const MM_SIZES = new Set(['a4', 'letter', 'custom']);

const NUMERIC_KEYS = new Set([
  'columns',
  'rows',
  'spacing',
  'margin',
  'fontSize',
  'cellBorderWidth',
  'cellRadius',
  'customWidthMm',
  'customHeightMm',
  'watermarkOpacity',
  'watermarkImageScale',
]);

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'custom', label: 'Manual order (drag to arrange)' },
  { value: 'name-asc', label: 'Filename A → Z' },
  { value: 'name-desc', label: 'Filename Z → A' },
  { value: 'date-asc', label: 'File date — oldest first' },
  { value: 'date-desc', label: 'File date — newest first' },
  { value: 'size-asc', label: 'File size — smallest first' },
  { value: 'size-desc', label: 'File size — largest first' },
];

export const PALETTE_GROUPS = [
  {
    name: 'Studio Darks',
    swatches: [
      { bg: '#1a1210', text: '#f7efe6', title: 'Dark chocolate' },
      { bg: '#121214', text: '#f3f4f6', title: 'Deep obsidian' },
      { bg: '#000000', text: '#ffffff', title: 'Onyx black' },
      { bg: '#0f172a', text: '#f8fafc', title: 'Midnight slate' },
      { bg: '#231915', text: '#fbeee0', title: 'Dark espresso' },
    ],
  },
  {
    name: 'Gallery & Paper',
    swatches: [
      { bg: '#ffffff', text: '#18181b', title: 'Gallery white' },
      { bg: '#f7efe6', text: '#2a1a12', title: 'Warm cream' },
      { bg: '#f5f0e8', text: '#292524', title: 'Linen parchment' },
      { bg: '#ebe5db', text: '#1c1917', title: 'Soft bone' },
      { bg: '#e2e8f0', text: '#0f172a', title: 'Cool studio gray' },
    ],
  },
  {
    name: 'Earth & Editorial',
    swatches: [
      { bg: '#334155', text: '#f8fafc', title: 'Slate steel' },
      { bg: '#202c24', text: '#ecfdf5', title: 'Forest moss' },
      { bg: '#4a2820', text: '#fef2f2', title: 'Warm terracotta' },
      { bg: '#2e1822', text: '#fdf2f8', title: 'Bordeaux wine' },
      { bg: '#3d342f', text: '#fafaf9', title: 'Warm taupe' },
    ],
  },
  {
    name: 'Pastels & Vibrant',
    swatches: [
      { bg: '#fce7f3', text: '#831843', title: 'Soft rose' },
      { bg: '#dcfce7', text: '#14532d', title: 'Pale mint' },
      { bg: '#f3e8ff', text: '#581c87', title: 'Pale lavender' },
      { bg: '#fef3c7', text: '#78350f', title: 'Warm sand' },
      { bg: '#e0f2fe', text: '#0c4a6e', title: 'Soft sky' },
    ],
  },
];

const INPUT_CLASS =
  'w-full bg-workspace-surface border border-workspace-border rounded-lg px-2.5 py-1.5 text-xs text-workspace-text focus:border-accent focus:outline-none transition-colors';
const RANGE_CLASS =
  'w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-[var(--color-accent)]';

export class LayoutControls {
  private container: HTMLElement;
  private builtMode: string | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();

    this.container.addEventListener('input', (e) => this.onValue(e));
    this.container.addEventListener('change', (e) => this.onValue(e));
    this.container.addEventListener('click', (e) => this.onClick(e));

    $layoutConfig.subscribe(() => this.sync());
    $activeTemplateId.subscribe(() => this.sync());
    $sortKey.subscribe(() => this.sync());
    $filteredImages.subscribe(() => this.sync());
    // Only a mode switch replaces the DOM — the two modes share almost no
    // controls, so patching between them would be more code than rebuilding.
    $workspaceMode.subscribe(() => this.render());
  }

  // ---------------------------------------------------------------- rendering

  private render() {
    const mode = $workspaceMode.get();
    if (this.builtMode === mode) return;
    this.builtMode = mode;
    this.container.innerHTML =
      mode === 'contact-sheet' ? this.contactSheetMarkup() : this.collageMarkup();
    this.sync();
  }

  private contactSheetMarkup(): string {
    return `
      <div class="flex flex-col text-xs text-workspace-text">
        ${this.section(
          'Start from a template',
          'Pick the closest sheet, then adjust anything below.',
          this.presetGroups(),
          true
        )}

        ${this.section(
          'Paper & grid',
          'How big the page is and how many photos go on it.',
          `
          <div class="grid grid-cols-2 gap-2.5">
            <label class="space-y-1.5 block">
              <span class="text-[11px] text-workspace-muted font-medium">Page size</span>
              <select data-cfg="pageSize" class="${INPUT_CLASS} cursor-pointer">
                <option value="a4">A4 (210 × 297 mm)</option>
                <option value="letter">US Letter (8.5 × 11 in)</option>
                <option value="16-9">16:9 screen</option>
                <option value="square">Square 1:1</option>
                <option value="story">Story 9:16</option>
                <option value="custom">Custom size (mm)</option>
              </select>
            </label>
            <div class="space-y-1.5">
              <span class="text-[11px] text-workspace-muted font-medium">Orientation</span>
              ${this.seg('orientation', [
                { value: 'portrait', label: 'Portrait' },
                { value: 'landscape', label: 'Landscape' },
              ])}
            </div>
          </div>

          <div data-when-eq="pageSize:custom" class="grid grid-cols-2 gap-2.5">
            <label class="space-y-1.5 block">
              <span class="text-[11px] text-workspace-muted font-medium">Short edge (mm)</span>
              <input
                type="number"
                data-cfg="customWidthMm"
                min="${CUSTOM_PAGE_MIN_MM}" max="${CUSTOM_PAGE_MAX_MM}" step="1"
                class="${INPUT_CLASS}"
              />
            </label>
            <label class="space-y-1.5 block">
              <span class="text-[11px] text-workspace-muted font-medium">Long edge (mm)</span>
              <input
                type="number"
                data-cfg="customHeightMm"
                min="${CUSTOM_PAGE_MIN_MM}" max="${CUSTOM_PAGE_MAX_MM}" step="1"
                class="${INPUT_CLASS}"
              />
            </label>
            <p class="col-span-2 text-[11px] text-workspace-muted leading-snug">
              ${CUSTOM_PAGE_MIN_MM}–${CUSTOM_PAGE_MAX_MM} mm each. The smaller number becomes the
              short edge, so Orientation above still decides which way the page turns.
            </p>
          </div>

          <p class="text-[11px] font-mono text-workspace-muted" data-readout="page-dims"></p>

          ${this.slider('columns', 'Columns', 1, 10, 1)}
          ${this.slider('rows', 'Rows', 1, 12, 1)}

          <div class="space-y-1.5">
            <span class="text-[11px] text-workspace-muted font-medium">Frame order</span>
            ${this.seg('fillOrder', [
              { value: 'row', label: 'Across then down' },
              { value: 'column', label: 'Down then across' },
            ])}
            <p class="text-[11px] text-workspace-muted leading-snug" data-readout="fill-hint"></p>
          </div>

          <div class="rounded-lg bg-workspace-surface border border-workspace-border px-2.5 py-2 space-y-0.5">
            <p class="text-[11px] font-semibold text-accent-ink" data-readout="grid"></p>
            <p class="text-[11px] text-workspace-muted" data-readout="pages"></p>
          </div>
        `,
          true
        )}

        ${this.section(
          'Spacing',
          'Gap between photos, and the blank border around the sheet.',
          `
          ${this.slider('spacing', 'Gap between photos', 0, 60, 2, true)}
          ${this.slider('margin', 'Page border', 0, 96, 4, true)}
        `
        )}

        ${this.section(
          'Photos',
          'Whether a photo is shown whole or cropped to fill its box.',
          `
          <div class="space-y-1.5">
            <span class="text-[11px] text-workspace-muted font-medium">Photo fit</span>
            ${this.seg('fit', [
              { value: 'contain', label: 'Whole photo' },
              { value: 'cover', label: 'Crop to fill' },
            ])}
            <p class="text-[11px] text-workspace-muted leading-snug" data-readout="fit-hint"></p>
          </div>

          ${this.slider('cellBorderWidth', 'Keyline around each photo', 0, 6, 1, true)}
          <div data-when="cellBorderWidth" class="flex items-center justify-between gap-3">
            <span class="text-[11px] text-workspace-muted font-medium">Keyline colour</span>
            <input type="color" data-cfg="cellBorderColor" class="w-9 h-7 rounded border border-workspace-border bg-workspace-surface cursor-pointer" />
          </div>

          ${this.slider('cellRadius', 'Rounded corners', 0, 32, 1, true)}

          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="text-[11px] text-workspace-muted font-medium">Show keep / flag / reject marks</span>
            <input type="checkbox" data-cfg="showStatusBadges" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
          </label>
        `
        )}

        ${this.section(
          'Labels',
          'The text printed with each photo.',
          `
          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="font-semibold text-xs text-workspace-text">Print labels</span>
            <input type="checkbox" data-cfg="showLabels" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
          </label>

          <div data-when="showLabels" class="space-y-3">
            <label class="space-y-1.5 block">
              <span class="text-[11px] text-workspace-muted font-medium">What to print</span>
              <select data-cfg="labelType" class="${INPUT_CLASS} cursor-pointer">
                <option value="filename">Filename</option>
                <option value="number">Frame number</option>
                <option value="both">Number + filename</option>
              </select>
            </label>

            <div class="space-y-1.5">
              <span class="text-[11px] text-workspace-muted font-medium">Where</span>
              ${this.seg('labelPosition', [
                { value: 'below', label: 'Under photo' },
                { value: 'overlay', label: 'On photo' },
              ])}
            </div>

            <div data-when-eq="labelPosition:below" class="space-y-1.5">
              <span class="text-[11px] text-workspace-muted font-medium">Alignment</span>
              ${this.seg('labelAlign', [
                { value: 'center', label: 'Centred' },
                { value: 'left', label: 'Left edge' },
              ])}
            </div>

            <label class="flex items-center justify-between gap-3 cursor-pointer">
              <span class="text-[11px] text-workspace-muted font-medium">Hide file extension</span>
              <input type="checkbox" data-cfg="labelHideExtension" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
            </label>

            <label class="flex items-center justify-between gap-3 cursor-pointer">
              <span class="text-[11px] text-workspace-muted font-medium">ALL CAPITALS</span>
              <input type="checkbox" data-cfg="labelUppercase" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
            </label>

            ${this.slider('fontSize', 'Label size', 6, 28, 1, true)}
            <p class="text-[11px] text-workspace-muted leading-snug" data-readout="label-sample"></p>
          </div>
        `
        )}

        ${this.section(
          'Photo metadata & EXIF',
          'Overlay camera settings, exposure data, or custom tokens on frames.',
          `
          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="font-semibold text-xs text-workspace-text">Show metadata overlay</span>
            <input type="checkbox" data-cfg="showExifOverlay" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
          </label>

          <div data-when="showExifOverlay" class="space-y-3">
            <div class="space-y-1.5">
              <span class="text-[11px] text-workspace-muted font-medium">Token template</span>
              <input
                type="text"
                data-cfg="exifTokenTemplate"
                placeholder="{basename} · {focal} {fstop} {shutter} ISO {iso}"
                class="${INPUT_CLASS}"
              />
              <div class="flex flex-wrap gap-1 pt-1">
                ${[
                  { token: '{focal}', label: 'Focal' },
                  { token: '{aperture}', label: 'Aperture' },
                  { token: '{shutter}', label: 'Shutter' },
                  { token: '{iso}', label: 'ISO' },
                  { token: '{camera}', label: 'Camera' },
                  { token: '{lens}', label: 'Lens' },
                  { token: '{date}', label: 'Date' },
                  { token: '{basename}', label: 'Name' },
                  { token: '{index:03}', label: 'Index' },
                ]
                  .map(
                    (t) => `
                  <button
                    type="button"
                    data-insert-token="${t.token}"
                    class="px-2 py-0.5 rounded text-[10px] font-mono bg-workspace-surface border border-workspace-border hover:border-accent hover:text-accent-ink transition-colors cursor-pointer"
                    title="Insert ${t.token}"
                  >+ ${t.label}</button>
                `
                  )
                  .join('')}
              </div>
            </div>

            <label class="space-y-1.5 block">
              <span class="text-[11px] text-workspace-muted font-medium">Badge style</span>
              <select data-cfg="exifBadgeStyle" class="${INPUT_CLASS} cursor-pointer">
                <option value="plain-text">Plain text (with drop shadow)</option>
                <option value="dark-pill">Dark pill</option>
                <option value="subtle-badge">Subtle badge</option>
              </select>
            </label>

            <p class="text-[11px] text-workspace-muted leading-snug font-mono" data-readout="exif-sample"></p>
          </div>
        `
        )}

        ${this.section(
          'Page furniture',
          'A title across the top and page numbers along the bottom.',
          `
          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="text-[11px] text-workspace-muted font-medium">Title band</span>
            <input type="checkbox" data-cfg="showHeader" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
          </label>
          <div data-when="showHeader">
            <input
              type="text"
              data-cfg="headerText"
              maxlength="80"
              placeholder="Contact Sheet"
              class="${INPUT_CLASS}"
            />
          </div>

          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="text-[11px] text-workspace-muted font-medium">Page numbers</span>
            <input type="checkbox" data-cfg="showPageNumbers" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
          </label>
          <p class="text-[11px] text-workspace-muted leading-snug">
            Both bands reserve their own strip, so turning them on never crops a photo.
          </p>
        `
        )}

        ${this.section(
          'Photo order',
          'Frame numbers follow this order.',
          `
          <select data-cfg="sortKey" class="${INPUT_CLASS} cursor-pointer">
            ${SORT_OPTIONS.map((o) => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
          <p class="text-[11px] text-workspace-muted leading-snug">
            Filenames sort numerically, so DSC_2 comes before DSC_10. File date is
            the date on disk, not the camera's capture time.
          </p>
        `
        )}

        ${this.section(
          'Watermark & proof protection',
          'Stamp or tile text across photos to protect proofs.',
          this.watermarkMarkup()
        )}

        ${this.section('Sheet colours', 'Paper tone and label ink.', this.colourMarkup())}

        ${this.section(
          'Custom branding & white-label',
          'Personalize the client proofing portal with your own logo and colors.',
          this.brandingMarkup()
        )}
      </div>
    `;
  }

  private collageMarkup(): string {
    return `
      <div class="flex flex-col text-xs text-workspace-text">
        ${this.section(
          'Collage layout',
          'Each template has a fixed number of frames.',
          `
          <div class="grid grid-cols-2 gap-2">
            ${COLLAGE_TEMPLATES.map(
              (t) => `
              <button
                data-template="${t.id}"
                class="template-card group flex flex-col gap-1.5 p-2 rounded-xl border text-left transition-colors cursor-pointer bg-workspace-surface/50 border-workspace-border hover:border-stone-500"
                title="${t.description}"
              >
                <div class="relative w-full rounded bg-workspace-panel border border-workspace-border overflow-hidden" style="aspect-ratio: ${t.aspectRatio}">
                  ${t.cells
                    .map(
                      (c) =>
                        `<div class="absolute bg-current opacity-35 rounded-[1px]" style="left:${c.x * 100}%;top:${c.y * 100}%;width:${c.w * 100}%;height:${c.h * 100}%"></div>`
                    )
                    .join('')}
                </div>
                <span class="text-[11px] font-semibold leading-tight">${t.name}</span>
                <span class="text-[10px] font-mono text-workspace-muted">${t.cells.length} frames</span>
              </button>
            `
            ).join('')}
          </div>
        `,
          true
        )}

        ${this.section(
          'Spacing',
          'Gap between frames and border around the canvas.',
          `
          ${this.slider('spacing', 'Frame gap', 0, 60, 2, true)}
          ${this.slider('margin', 'Canvas border', 0, 96, 4, true)}
        `,
          true
        )}

        ${this.section(
          'Watermark & proof protection',
          'Stamp or tile text across photos to protect proofs.',
          this.watermarkMarkup()
        )}

        ${this.section('Canvas colours', 'Background tone and text ink.', this.colourMarkup())}
      </div>
    `;
  }

  private brandingMarkup(): string {
    return `
      <div class="space-y-3">
        <label class="space-y-1.5 block">
          <span class="text-[11px] text-workspace-muted font-medium">Custom Logo (PNG/JPG/SVG)</span>
          <input type="file" id="brandLogoUpload" accept="image/png, image/jpeg, image/svg+xml" class="hidden" />
          <div class="flex gap-2">
            <button type="button" class="btn btn-secondary text-xs flex-1" onclick="document.getElementById('brandLogoUpload').click()">Upload Logo</button>
            <button type="button" class="btn btn-secondary text-xs px-2" data-action="clearBrandLogo" title="Clear Logo">✕</button>
          </div>
          <p class="text-[10px] text-workspace-muted mt-1">Recommended: Square or horizontal transparent PNG.</p>
        </label>

        <label class="space-y-1.5 block">
          <span class="text-[11px] text-workspace-muted font-medium">Brand Name</span>
          <input type="text" data-cfg="customBrandName" placeholder="Your Studio Name" class="${INPUT_CLASS}" />
        </label>

        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] text-workspace-muted font-medium">Primary Brand Color</span>
          <input type="color" data-cfg="customBrandColor" value="#2563eb" class="w-9 h-7 rounded border border-workspace-border bg-workspace-surface cursor-pointer" />
        </div>

        <label class="flex items-center justify-between gap-3 cursor-pointer pt-2 border-t border-workspace-border">
          <span class="text-[11px] text-workspace-muted font-medium">Hide Platform Branding (White-Label)</span>
          <input type="checkbox" data-cfg="hideMadeWithBadge" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
        </label>
      </div>
    `;
  }

  private watermarkMarkup(): string {
    return `
      <label class="flex items-center justify-between gap-3 cursor-pointer">
        <span class="font-semibold text-xs text-workspace-text">Print watermark on photos</span>
        <input type="checkbox" data-cfg="showWatermark" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
      </label>

      <div data-when="showWatermark" class="space-y-3 pt-1">
        <!-- Watermark Type Picker -->
        <div class="space-y-1.5">
          <span class="text-[11px] text-workspace-muted font-medium">Watermark Type</span>
          ${this.seg('watermarkType', [
            { value: 'text', label: 'Text' },
            { value: 'image', label: 'Logo / Stamp' },
          ])}
        </div>

        <!-- Text watermark options -->
        <div data-when-eq="watermarkType:text" class="space-y-3">
          <label class="space-y-1.5 block">
            <span class="text-[11px] text-workspace-muted font-medium">Watermark text</span>
            <input
              type="text"
              data-cfg="watermarkText"
              maxlength="50"
              placeholder="PROOF"
              class="${INPUT_CLASS}"
            />
          </label>

          <div class="space-y-1.5">
            <span class="text-[11px] text-workspace-muted font-medium">Style</span>
            ${this.seg('watermarkStyle', [
              { value: 'diagonal', label: 'Diagonal' },
              { value: 'tiled', label: 'Tiled grid' },
              { value: 'center', label: 'Center' },
            ])}
          </div>

          ${this.slider('watermarkOpacity', 'Opacity', 5, 80, 5, false)}

          <div class="flex items-center justify-between gap-3">
            <span class="text-[11px] text-workspace-muted font-medium">Watermark ink</span>
            <input type="color" data-cfg="watermarkColor" class="w-9 h-7 rounded border border-workspace-border bg-workspace-surface cursor-pointer" />
          </div>
        </div>

        <!-- Image / Logo watermark options -->
        <div data-when-eq="watermarkType:image" class="space-y-3">
          <div class="space-y-1.5">
            <span class="text-[11px] text-workspace-muted font-medium">Upload Logo / Signature</span>
            <div class="flex items-center gap-2">
              <input type="file" id="watermark-logo-file" accept="image/png,image/jpeg,image/svg+xml,image/webp" class="hidden" />
              <button type="button" id="btn-upload-watermark-logo" class="flex-1 h-8 px-2.5 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover border border-workspace-border text-xs text-workspace-text flex items-center justify-center gap-1.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span id="watermark-logo-filename" class="truncate">Choose Image</span>
              </button>
              <button type="button" id="btn-remove-watermark-logo" class="h-8 px-2 rounded-lg bg-workspace-surface hover:bg-rose-500/20 text-workspace-muted hover:text-rose-500 border border-workspace-border text-xs cursor-pointer" title="Remove logo">
                ✕
              </button>
            </div>
            <p class="text-[10px] text-workspace-muted leading-tight">PNG with transparency, JPG, SVG, or WebP.</p>
          </div>

          <div class="space-y-1.5">
            <span class="text-[11px] text-workspace-muted font-medium">Position</span>
            <select data-cfg="watermarkImagePosition" class="${INPUT_CLASS} cursor-pointer">
              <option value="bottom-right">Bottom-Right</option>
              <option value="bottom-left">Bottom-Left</option>
              <option value="top-right">Top-Right</option>
              <option value="top-left">Top-Left</option>
              <option value="center">Center</option>
              <option value="tiled">Tiled Grid</option>
            </select>
          </div>

          ${this.slider('watermarkImageScale', 'Logo size (% of frame)', 10, 80, 5, false)}
          ${this.slider('watermarkOpacity', 'Opacity', 5, 100, 5, false)}
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-workspace-border space-y-3">
        <label class="flex items-center justify-between gap-3 cursor-pointer">
          <span class="font-semibold text-[11px] text-workspace-text">Invisible Forensic Watermark</span>
          <input type="checkbox" data-cfg="enableForensicWatermark" class="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer" />
        </label>
        <p class="text-[10px] text-workspace-muted leading-tight">
          Embeds a hidden tracking payload in exported images. Helps identify the source of leaked proofs.
        </p>
        
        <div class="mt-2 rounded bg-workspace-panel border border-workspace-border border-dashed p-3 text-center" id="verify-leak-dropzone">
          <span class="text-[11px] text-workspace-muted font-medium block mb-1">Verify Leaked Proof</span>
          <p class="text-[10px] text-workspace-muted mb-2">Drop a suspect photo here to extract its forensic UUID.</p>
          <input type="file" id="verify-leak-input" accept="image/png, image/jpeg, image/webp" class="hidden" />
          <button type="button" class="btn btn-secondary text-xs px-3 py-1" onclick="document.getElementById('verify-leak-input').click()">Select Photo</button>
          <div id="verify-leak-result" class="text-[10px] mt-2 font-mono font-bold hidden"></div>
        </div>
      </div>
    `;
  }

  private colourMarkup(): string {
    return `
      <div class="space-y-3">
        ${PALETTE_GROUPS.map(
          (group) => `
          <div class="space-y-1.5">
            <span class="text-[10px] font-mono uppercase tracking-wider text-workspace-muted font-semibold">${group.name}</span>
            <div class="grid grid-cols-5 gap-2 pt-0.5">
              ${group.swatches.map(
                (s) => `
                <button
                  type="button"
                  data-bg="${s.bg}"
                  data-text="${s.text}"
                  title="${s.title} (${s.bg})"
                  class="swatch group/swatch relative aspect-square rounded-lg border border-workspace-border hover:scale-105 transition-all cursor-pointer shadow-xs flex items-center justify-center"
                  style="background:${s.bg}"
                >
                  <span class="w-1.5 h-1.5 rounded-full opacity-0 group-hover/swatch:opacity-100 transition-opacity" style="background:${s.text}"></span>
                </button>
              `
              ).join('')}
            </div>
          </div>
        `
        ).join('')}

        <div class="pt-2 border-t border-workspace-border grid grid-cols-2 gap-2.5">
          <label class="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-workspace-surface/60 border border-workspace-border">
            <span class="text-[11px] text-workspace-muted font-medium">Paper</span>
            <input type="color" data-cfg="bg" class="w-8 h-6 rounded border border-workspace-border bg-workspace-surface cursor-pointer" />
          </label>
          <label class="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-workspace-surface/60 border border-workspace-border">
            <span class="text-[11px] text-workspace-muted font-medium">Text</span>
            <input type="color" data-cfg="textColor" class="w-8 h-6 rounded border border-workspace-border bg-workspace-surface cursor-pointer" />
          </label>
        </div>
      </div>
    `;
  }

  private presetGroups(): string {
    const order: ContactSheetCategory[] = ['standard', 'film', 'client', 'digital'];
    return order
      .map((cat) => {
        const presets = CONTACT_SHEET_PRESETS.filter((p) => p.category === cat);
        if (!presets.length) return '';
        return `
          <div class="space-y-2">
            <p class="text-[10px] uppercase tracking-wider font-mono text-workspace-muted">
              ${CONTACT_SHEET_CATEGORY_LABELS[cat]}
            </p>
            <div class="grid grid-cols-2 gap-2">
              ${presets.map((p) => this.presetCard(p.id, p.name, p.description, p.config)).join('')}
            </div>
          </div>
        `;
      })
      .join('');
  }

  private presetCard(
    id: string,
    name: string,
    description: string,
    config: Partial<LayoutConfig>
  ): string {
    const cols = config.columns || 4;
    const rows = config.rows || 5;
    const { width, height } = getPagePixelDimensions(
      config.pageSize || 'a4',
      config.orientation || 'portrait'
    );
    // Cap the drawn cells: the 48-frame index sheet does not need 48 divs to
    // read as "very dense" at 90px wide.
    const drawn = Math.min(cols * rows, 64);

    return `
      <button
        data-preset="${id}"
        title="${description}"
        class="template-card flex flex-col gap-1.5 p-2 rounded-xl border text-left transition-colors cursor-pointer bg-workspace-surface/50 border-workspace-border hover:border-stone-500"
      >
        <div
          class="w-full grid gap-[1.5px] rounded bg-workspace-panel border border-workspace-border p-1"
          style="aspect-ratio: ${width} / ${height}; grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr)"
        >
          ${Array.from({ length: drawn }, () => '<div class="bg-current opacity-35 rounded-[1px]"></div>').join('')}
        </div>
        <span class="text-[11px] font-semibold leading-tight">${name}</span>
        <span class="text-[10px] font-mono text-workspace-muted">${cols}×${rows} · ${cols * rows}/page</span>
      </button>
    `;
  }

  /** `<details>` so open/closed state survives every sync — no JS needed. */
  private section(
    title: string,
    hint: string,
    body: string,
    open = false
  ): string {
    return `
      <details class="group border-b border-workspace-border" ${open ? 'open' : ''}>
        <summary class="flex items-start justify-between gap-2 px-4 py-3 cursor-pointer list-none hover:bg-workspace-surface/40 transition-colors">
          <span class="min-w-0">
            <span class="block text-xs font-bold text-workspace-text">${title}</span>
            <span class="block text-[11px] text-workspace-muted leading-snug mt-0.5">${hint}</span>
          </span>
          <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-workspace-muted transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div class="px-4 pb-4 pt-1 space-y-3">${body}</div>
      </details>
    `;
  }

  private slider(
    key: string,
    label: string,
    min: number,
    max: number,
    step: number,
    showUnit = false
  ): string {
    return `
      <div class="space-y-1.5">
        <div class="flex justify-between items-baseline gap-2">
          <span class="text-[11px] text-workspace-muted font-medium">${label}</span>
          <span class="font-mono text-[11px] text-accent-ink font-bold" data-readout="${key}"></span>
        </div>
        <input
          type="range"
          data-cfg="${key}"
          data-unit="${showUnit ? 'px' : ''}"
          min="${min}" max="${max}" step="${step}"
          class="${RANGE_CLASS}"
        />
      </div>
    `;
  }

  private seg(key: string, options: { value: string; label: string }[]): string {
    return `
      <div class="grid gap-1 bg-workspace-surface border border-workspace-border rounded-lg p-1" style="grid-template-columns: repeat(${options.length}, 1fr)">
        ${options
          .map(
            (o) => `
          <button
            data-seg="${key}" data-val="${o.value}"
            class="py-1 rounded text-[11px] text-center transition-colors cursor-pointer"
          >${o.label}</button>
        `
          )
          .join('')}
      </div>
    `;
  }

  // ------------------------------------------------------------------- events

  private onValue(e: Event) {
    const el = e.target as HTMLInputElement | HTMLSelectElement | null;
    if (!el) return;

    if (el.id === 'verify-leak-input' && el instanceof HTMLInputElement && el.files?.[0]) {
      const file = el.files[0];
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const payload = extractForensicWatermark(canvas);
          const resultEl = this.container.querySelector('#verify-leak-result');
          if (resultEl) {
            resultEl.classList.remove('hidden');
            resultEl.textContent = payload ? `Found UUID: ${payload}` : 'No watermark found.';
            resultEl.className = `text-[10px] mt-2 font-mono font-bold block ${payload ? 'text-emerald-500' : 'text-rose-500'}`;
          }
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
      return;
    }

    if (!('dataset' in el)) return;
    const key = el.dataset.cfg;
    if (!key) return;

    if (el.id === 'watermark-logo-file' && el instanceof HTMLInputElement && el.files?.[0]) {
      const file = el.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        updateLayoutConfig({
          watermarkImageUrl: dataUrl,
          watermarkType: 'image',
          showWatermark: true,
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    if (el.id === 'brandLogoUpload' && el instanceof HTMLInputElement && el.files?.[0]) {
      const file = el.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        updateLayoutConfig({
          customBrandLogo: dataUrl,
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    if (key === 'sortKey') {
      sortImages(el.value as SortKey);
      return;
    }

    if (NUMERIC_KEYS.has(key)) {
      const num = parseInt(el.value, 10);
      updateLayoutConfig({ [key]: Number.isFinite(num) ? num : 0 } as Partial<LayoutConfig>);
      return;
    }

    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      updateLayoutConfig({ [key]: el.checked } as Partial<LayoutConfig>);
      return;
    }

    updateLayoutConfig({ [key]: el.value } as Partial<LayoutConfig>);
  }

  private onClick(e: Event) {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const uploadLogoBtn = target.closest('#btn-upload-watermark-logo');
    if (uploadLogoBtn) {
      const fileInput = this.container.querySelector<HTMLInputElement>('#watermark-logo-file');
      fileInput?.click();
      return;
    }

    const removeLogoBtn = target.closest('#btn-remove-watermark-logo');
    if (removeLogoBtn) {
      updateLayoutConfig({ watermarkImageUrl: '' });
      const fileInput = this.container.querySelector<HTMLInputElement>('#watermark-logo-file');
      if (fileInput) fileInput.value = '';
      return;
    }

    const clearBrandLogoBtn = target.closest('[data-action="clearBrandLogo"]');
    if (clearBrandLogoBtn) {
      updateLayoutConfig({ customBrandLogo: '' });
      const fileInput = this.container.querySelector<HTMLInputElement>('#brandLogoUpload');
      if (fileInput) fileInput.value = '';
      return;
    }

    const seg = target.closest<HTMLElement>('[data-seg]');
    if (seg) {
      const key = seg.dataset.seg!;
      updateLayoutConfig({ [key]: seg.dataset.val } as Partial<LayoutConfig>);
      return;
    }

    const preset = target.closest<HTMLElement>('[data-preset]');
    if (preset) {
      const found = CONTACT_SHEET_PRESETS.find((p) => p.id === preset.dataset.preset);
      if (found) {
        setActiveTemplate(found.id);
        updateLayoutConfig({ ...PRESET_STRUCTURAL_BASE, ...found.config });
      }
      return;
    }

    const template = target.closest<HTMLElement>('[data-template]');
    if (template) {
      const found = COLLAGE_TEMPLATES.find((t) => t.id === template.dataset.template);
      if (found) {
        setActiveTemplate(found.id);
        updateLayoutConfig({ spacing: found.defaultSpacing, margin: found.defaultMargin });
      }
      return;
    }

    const swatch = target.closest<HTMLElement>('[data-bg]');
    if (swatch) {
      const bg = swatch.dataset.bg;
      const text = swatch.dataset.text;
      if (bg && text) updateLayoutConfig({ bg, textColor: text });
      return;
    }

    const insertTokenBtn = target.closest<HTMLElement>('[data-insert-token]');
    if (insertTokenBtn) {
      const token = insertTokenBtn.dataset.insertToken;
      if (token) {
        const currentVal = $layoutConfig.get().exifTokenTemplate ?? '{basename} · {focal} {fstop} {shutter} ISO {iso}';
        const newVal = currentVal ? `${currentVal} ${token}` : token;
        updateLayoutConfig({ exifTokenTemplate: newVal });
        const input = this.container.querySelector<HTMLInputElement>('input[data-cfg="exifTokenTemplate"]');
        if (input) {
          input.value = newVal;
          input.focus();
        }
      }
      return;
    }
  }

  // --------------------------------------------------------------- patch pass

  private sync() {
    const c = $layoutConfig.get();
    const active = document.activeElement;

    // Values. The focus check is the whole point of this method: writing
    // `el.value` into the range being dragged is what used to kill the drag.
    this.container.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-cfg]').forEach((el) => {
      if (el === active) return;
      const key = el.dataset.cfg!;
      if (key === 'sortKey') {
        el.value = $sortKey.get();
        return;
      }
      const value = (c as unknown as Record<string, unknown>)[key];
      if (value === undefined) return;
      if (el instanceof HTMLInputElement && el.type === 'checkbox') {
        el.checked = Boolean(value);
      } else {
        el.value = String(value);
      }
    });

    // Segmented buttons.
    this.container.querySelectorAll<HTMLElement>('[data-seg]').forEach((btn) => {
      const key = btn.dataset.seg!;
      const on = String((c as unknown as Record<string, unknown>)[key]) === btn.dataset.val;
      btn.classList.toggle('bg-workspace-panel', on);
      btn.classList.toggle('text-accent-ink', on);
      btn.classList.toggle('font-bold', on);
      btn.classList.toggle('shadow-xs', on);
      btn.classList.toggle('text-workspace-muted', !on);
      btn.classList.toggle('hover:text-workspace-text', !on);
    });

    // Preset / template selection.
    const activeId = $activeTemplateId.get();
    this.container.querySelectorAll<HTMLElement>('[data-preset], [data-template]').forEach((card) => {
      const on = (card.dataset.preset || card.dataset.template) === activeId;
      card.classList.toggle('border-accent', on);
      card.classList.toggle('bg-workspace-surface', on);
      card.classList.toggle('text-accent-ink', on);
      card.classList.toggle('border-workspace-border', !on);
    });

    // Swatch rings.
    this.container.querySelectorAll<HTMLElement>('[data-bg]').forEach((btn) => {
      const on = btn.dataset.bg === c.bg;
      btn.classList.toggle('border-accent', on);
      btn.classList.toggle('scale-110', on);
      btn.classList.toggle('border-stone-500', !on);
    });

    // Conditional blocks.
    this.container.querySelectorAll<HTMLElement>('[data-when]').forEach((el) => {
      const key = el.dataset.when!;
      const raw = (c as unknown as Record<string, unknown>)[key];
      const on = typeof raw === 'number' ? raw > 0 : Boolean(raw);
      el.classList.toggle('hidden', !on);
    });

    // Conditional blocks keyed on a specific value rather than truthiness —
    // `pageSize` and `labelPosition` are strings, so `data-when` cannot express
    // "only when this equals custom".
    this.container.querySelectorAll<HTMLElement>('[data-when-eq]').forEach((el) => {
      const [key, expected] = (el.dataset.whenEq || '').split(':');
      const on = String((c as unknown as Record<string, unknown>)[key]) === expected;
      el.classList.toggle('hidden', !on);
    });

    // Logo watermark filename status & remove button
    const logoFilenameEl = this.container.querySelector<HTMLElement>('#watermark-logo-filename');
    const removeLogoBtn = this.container.querySelector<HTMLElement>('#btn-remove-watermark-logo');
    if (logoFilenameEl) {
      logoFilenameEl.textContent = c.watermarkImageUrl ? 'Logo Loaded ✓' : 'Choose Image';
    }
    if (removeLogoBtn) {
      removeLogoBtn.classList.toggle('hidden', !c.watermarkImageUrl);
    }

    this.syncReadouts(c);
  }

  private syncReadouts(c: LayoutConfig) {
    const set = (name: string, text: string) => {
      const el = this.container.querySelector<HTMLElement>(`[data-readout="${name}"]`);
      if (el) el.textContent = text;
    };

    const withMm = (px: number) =>
      MM_SIZES.has(c.pageSize)
        ? `${px} px · ${(px / PX_PER_MM).toFixed(1)} mm`
        : `${px} px`;

    set('columns', String(c.columns));
    set('rows', String(c.rows));
    set('spacing', withMm(c.spacing));
    set('margin', withMm(c.margin));
    set('fontSize', `${c.fontSize} px`);
    set('cellBorderWidth', c.cellBorderWidth > 0 ? `${c.cellBorderWidth} px` : 'Off');
    set('cellRadius', c.cellRadius > 0 ? `${c.cellRadius} px` : 'Square');
    set('watermarkOpacity', `${c.watermarkOpacity ?? 20}%`);
    set('watermarkImageScale', `${c.watermarkImageScale ?? 30}%`);

    if (this.builtMode !== 'contact-sheet') return;

    const { width, height } = getPagePixelDimensions(c.pageSize, c.orientation, 1, {
      widthMm: c.customWidthMm,
      heightMm: c.customHeightMm,
    });
    const mm = MM_SIZES.has(c.pageSize)
      ? ` · ${Math.round(width / PX_PER_MM)} × ${Math.round(height / PX_PER_MM)} mm`
      : '';
    set('page-dims', `${width} × ${height} px at 150 dpi${mm}`);

    const perPage = Math.max(1, c.columns * c.rows);
    set('grid', `${c.columns} across × ${c.rows} down = ${perPage} photos per page`);

    const images = $filteredImages.get();
    const count = images.length;
    if (count === 0) {
      set('pages', 'No photos added yet.');
    } else {
      const pages = Math.max(1, Math.ceil(count / perPage));
      const leftover = count % perPage;
      const tail =
        pages > 1 && leftover > 0
          ? ` — last page holds ${leftover}`
          : '';
      set(
        'pages',
        `${count} photo${count === 1 ? '' : 's'} · ${pages} page${pages === 1 ? '' : 's'}${tail}`
      );
    }

    set(
      'fit-hint',
      c.fit === 'contain'
        ? 'Whole photo is shown. Boxes are left partly empty when shapes differ.'
        : 'Photo is cropped from the centre to fill its box. Edges can be lost.'
    );

    set(
      'fill-hint',
      c.fillOrder === 'row'
        ? 'Frame 1 top-left, then along the first row. How a proof sheet is read.'
        : 'Frame 1 top-left, then down the first column. How a film strip is filed.'
    );

    // Real filename when there is one, so the preview shows what the user's own
    // names will look like rather than a made-up example.
    const sampleName = images[0]?.sanitizedName ?? 'DSC_0142.JPG';
    const sample = buildCellLabel(c, sampleName, 1);
    set('label-sample', sample ? `Prints as: ${sample}` : '');

    // Live EXIF token preview sample
    const sampleImage = images[0] || {
      id: 'sample',
      file: {} as File,
      name: 'DSC_0142.JPG',
      sanitizedName: 'DSC_0142.JPG',
      size: 2450000,
      type: 'image/jpeg',
      width: 6000,
      height: 4000,
      aspectRatio: 1.5,
      previewUrl: '',
      thumbnailUrl: '',
      status: 'unreviewed' as const,
      order: 0,
      exif: {
        cameraMake: 'Sony',
        cameraModel: 'A7 IV',
        lensModel: 'FE 50mm F1.2 GM',
        focalLength: '50mm',
        fNumber: 'f/1.8',
        exposureTime: '1/500s',
        iso: 100,
      },
    };
    const sampleExif = resolveMetadataTokens(
      c.exifTokenTemplate || '{basename} · {focal} {fstop} {shutter} ISO {iso}',
      sampleImage,
      1
    );
    set('exif-sample', sampleExif ? `Preview: ${sampleExif}` : '');
  }
}
