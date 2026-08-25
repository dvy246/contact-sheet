import { 
  $layoutConfig, 
  $workspaceMode, 
  $activeTemplateId, 
  updateLayoutConfig, 
  setActiveTemplate 
} from '../../lib/store';
import { CONTACT_SHEET_PRESETS, COLLAGE_TEMPLATES } from '../../lib/engine/templates';
import type { PageSize, LabelType } from '../../lib/types';

export class LayoutControls {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupStoreSubscriptions();
  }

  private render() {
    const config = $layoutConfig.get();
    const mode = $workspaceMode.get();
    const activeTemplate = $activeTemplateId.get();

    if (mode === 'contact-sheet') {
      this.container.innerHTML = `
        <div class="flex flex-col gap-5 p-4 text-xs text-workspace-text">
          <!-- Presets Dropdown -->
          <div class="space-y-1.5">
            <label class="font-bold text-[11px] uppercase tracking-wider text-workspace-muted">Layout Preset</label>
            <select id="preset-selector" class="w-full bg-workspace-panel border border-workspace-border rounded-lg px-2.5 py-2 text-xs text-workspace-text focus:border-accent-amber">
              ${CONTACT_SHEET_PRESETS.map(p => `
                <option value="${p.id}">${p.name}</option>
              `).join('')}
            </select>
          </div>

          <!-- Page & Orientation -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted">Page Size</label>
              <select id="page-size-select" class="w-full bg-workspace-panel border border-workspace-border rounded-lg px-2 py-1.5 text-xs text-workspace-text">
                <option value="a4" ${config.pageSize === 'a4' ? 'selected' : ''}>A4 (Standard)</option>
                <option value="letter" ${config.pageSize === 'letter' ? 'selected' : ''}>US Letter</option>
                <option value="16-9" ${config.pageSize === '16-9' ? 'selected' : ''}>16:9 Screen</option>
                <option value="square" ${config.pageSize === 'square' ? 'selected' : ''}>1:1 Square</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted">Orientation</label>
              <div class="grid grid-cols-2 gap-1 bg-workspace-panel border border-workspace-border rounded-lg p-0.5">
                <button id="btn-orient-portrait" class="py-1 rounded text-center transition-all ${config.orientation === 'portrait' ? 'bg-workspace-surface-hover text-accent-amber font-bold' : 'text-workspace-muted'}">
                  Portrait
                </button>
                <button id="btn-orient-landscape" class="py-1 rounded text-center transition-all ${config.orientation === 'landscape' ? 'bg-workspace-surface-hover text-accent-amber font-bold' : 'text-workspace-muted'}">
                  Landscape
                </button>
              </div>
            </div>
          </div>

          <!-- Grid Dimensions (Columns & Rows) -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted">Columns</span>
                <span class="font-mono text-accent-amber font-bold" id="cols-val">${config.columns}</span>
              </div>
              <input id="input-cols" type="range" min="1" max="8" value="${config.columns}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer" />
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted">Rows</span>
                <span class="font-mono text-accent-amber font-bold" id="rows-val">${config.rows}</span>
              </div>
              <input id="input-rows" type="range" min="1" max="10" value="${config.rows}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer" />
            </div>
          </div>

          <!-- Spacing & Margins -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted">Gutter Spacing</span>
                <span class="font-mono text-accent-amber font-bold" id="spacing-val">${config.spacing}px</span>
              </div>
              <input id="input-spacing" type="range" min="0" max="48" step="2" value="${config.spacing}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer" />
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted">Page Margin</span>
                <span class="font-mono text-accent-amber font-bold" id="margin-val">${config.margin}px</span>
              </div>
              <input id="input-margin" type="range" min="0" max="64" step="4" value="${config.margin}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer" />
            </div>
          </div>

          <!-- Image Fit & Background Color -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted">Image Fit</label>
              <div class="grid grid-cols-2 gap-1 bg-workspace-panel border border-workspace-border rounded-lg p-0.5">
                <button id="btn-fit-contain" class="py-1 rounded text-center transition-all ${config.fit === 'contain' ? 'bg-workspace-surface-hover text-accent-amber font-bold' : 'text-workspace-muted'}">
                  Contain (Uncropped)
                </button>
                <button id="btn-fit-cover" class="py-1 rounded text-center transition-all ${config.fit === 'cover' ? 'bg-workspace-surface-hover text-accent-amber font-bold' : 'text-workspace-muted'}">
                  Cover (Fill Cell)
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted">Background Tone</label>
              <div class="flex items-center gap-2">
                <button data-bg="#141417" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-[#141417] border-2 transition-all ${config.bg === '#141417' ? 'border-accent-amber scale-110' : 'border-zinc-700'}" title="The Archival Matte (Dark)"></button>
                <button data-bg="#000000" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-black border-2 transition-all ${config.bg === '#000000' ? 'border-accent-amber scale-110' : 'border-zinc-700'}" title="Deep Black"></button>
                <button data-bg="#ffffff" data-text="#18181b" class="w-7 h-7 rounded-full bg-white border-2 transition-all ${config.bg === '#ffffff' ? 'border-accent-amber scale-110' : 'border-zinc-300'}" title="Clean Gallery White"></button>
                <button data-bg="#f4f4f5" data-text="#18181b" class="w-7 h-7 rounded-full bg-[#f4f4f5] border-2 transition-all ${config.bg === '#f4f4f5' ? 'border-accent-amber scale-110' : 'border-zinc-300'}" title="Light Slate"></button>
              </div>
            </div>
          </div>

          <!-- Labels Configuration -->
          <div class="space-y-2 pt-2 border-t border-workspace-border">
            <div class="flex items-center justify-between">
              <label class="font-medium text-xs text-workspace-text">Display Labels</label>
              <input id="toggle-labels" type="checkbox" ${config.showLabels ? 'checked' : ''} class="w-4 h-4 rounded text-accent-amber focus:ring-accent-amber" />
            </div>

            ${config.showLabels ? `
              <div class="space-y-1.5 pt-1">
                <select id="label-type-select" class="w-full bg-workspace-panel border border-workspace-border rounded-lg px-2 py-1.5 text-xs text-workspace-text">
                  <option value="filename" ${config.labelType === 'filename' ? 'selected' : ''}>Filename Only</option>
                  <option value="both" ${config.labelType === 'both' ? 'selected' : ''}>Index Number & Filename</option>
                  <option value="number" ${config.labelType === 'number' ? 'selected' : ''}>Index Number Only</option>
                </select>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      // Collage Layout Controls
      this.container.innerHTML = `
        <div class="flex flex-col gap-5 p-4 text-xs text-workspace-text">
          <div class="space-y-1.5">
            <label class="font-bold text-[11px] uppercase tracking-wider text-workspace-muted">Choose Collage Template</label>
            <div class="grid grid-cols-1 gap-2 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
              ${COLLAGE_TEMPLATES.map(t => {
                const isSelected = t.id === activeTemplate;
                return `
                  <button 
                    data-template="${t.id}"
                    class="collage-template-card flex flex-col p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-workspace-surface-hover border-accent-amber shadow-sm' 
                        : 'bg-workspace-panel border-workspace-border hover:border-zinc-700'
                    }"
                  >
                    <div class="flex items-center justify-between font-medium text-xs text-workspace-text">
                      <span>${t.name}</span>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-workspace-surface border border-workspace-border text-workspace-muted font-mono">
                        ${t.cells.length} cells
                      </span>
                    </div>
                    <div class="text-[11px] text-workspace-muted mt-0.5">${t.description}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Spacing & Margins -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted">Cell Gap</span>
                <span class="font-mono text-accent-amber font-bold" id="spacing-val">${config.spacing}px</span>
              </div>
              <input id="input-spacing" type="range" min="0" max="40" step="2" value="${config.spacing}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer" />
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted">Border Margin</span>
                <span class="font-mono text-accent-amber font-bold" id="margin-val">${config.margin}px</span>
              </div>
              <input id="input-margin" type="range" min="0" max="64" step="4" value="${config.margin}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer" />
            </div>
          </div>

          <!-- Background Color Swatches -->
          <div class="space-y-1.5 pt-2 border-t border-workspace-border">
            <label class="font-medium text-[11px] text-workspace-muted">Canvas Tone</label>
            <div class="flex items-center gap-2">
              <button data-bg="#141417" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-[#141417] border-2 transition-all ${config.bg === '#141417' ? 'border-accent-amber scale-110' : 'border-zinc-700'}" title="The Archival Matte"></button>
              <button data-bg="#000000" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-black border-2 transition-all ${config.bg === '#000000' ? 'border-accent-amber scale-110' : 'border-zinc-700'}" title="Deep Black"></button>
              <button data-bg="#ffffff" data-text="#18181b" class="w-7 h-7 rounded-full bg-white border-2 transition-all ${config.bg === '#ffffff' ? 'border-accent-amber scale-110' : 'border-zinc-300'}" title="Clean White"></button>
              <button data-bg="#f4f4f5" data-text="#18181b" class="w-7 h-7 rounded-full bg-[#f4f4f5] border-2 transition-all ${config.bg === '#f4f4f5' ? 'border-accent-amber scale-110' : 'border-zinc-300'}" title="Light Slate"></button>
            </div>
          </div>
        </div>
      `;
    }

    this.attachEvents();
  }

  private attachEvents() {
    const mode = $workspaceMode.get();

    if (mode === 'contact-sheet') {
      // Presets
      document.getElementById('preset-selector')?.addEventListener('change', (e) => {
        const id = (e.target as HTMLSelectElement).value;
        const preset = CONTACT_SHEET_PRESETS.find(p => p.id === id);
        if (preset) {
          updateLayoutConfig(preset.config);
        }
      });

      // Page size
      document.getElementById('page-size-select')?.addEventListener('change', (e) => {
        updateLayoutConfig({ pageSize: (e.target as HTMLSelectElement).value as PageSize });
      });

      // Orientation
      document.getElementById('btn-orient-portrait')?.addEventListener('click', () => {
        updateLayoutConfig({ orientation: 'portrait' });
      });
      document.getElementById('btn-orient-landscape')?.addEventListener('click', () => {
        updateLayoutConfig({ orientation: 'landscape' });
      });

      // Columns & Rows
      const colsInput = document.getElementById('input-cols') as HTMLInputElement | null;
      colsInput?.addEventListener('input', () => {
        const val = parseInt(colsInput.value, 10);
        updateLayoutConfig({ columns: val });
        const label = document.getElementById('cols-val');
        if (label) label.textContent = val.toString();
      });

      const rowsInput = document.getElementById('input-rows') as HTMLInputElement | null;
      rowsInput?.addEventListener('input', () => {
        const val = parseInt(rowsInput.value, 10);
        updateLayoutConfig({ rows: val });
        const label = document.getElementById('rows-val');
        if (label) label.textContent = val.toString();
      });

      // Image Fit
      document.getElementById('btn-fit-contain')?.addEventListener('click', () => {
        updateLayoutConfig({ fit: 'contain' });
      });
      document.getElementById('btn-fit-cover')?.addEventListener('click', () => {
        updateLayoutConfig({ fit: 'cover' });
      });

      // Labels toggle & type
      const toggleLabels = document.getElementById('toggle-labels') as HTMLInputElement | null;
      toggleLabels?.addEventListener('change', () => {
        updateLayoutConfig({ showLabels: toggleLabels.checked });
      });

      const labelTypeSelect = document.getElementById('label-type-select') as HTMLSelectElement | null;
      labelTypeSelect?.addEventListener('change', () => {
        updateLayoutConfig({ labelType: labelTypeSelect.value as LabelType });
      });
    } else {
      // Collage templates
      this.container.querySelectorAll('.collage-template-card').forEach((card) => {
        card.addEventListener('click', () => {
          const tId = card.getAttribute('data-template');
          if (tId) setActiveTemplate(tId);
        });
      });
    }

    // Shared Spacing & Margin
    const spacingInput = document.getElementById('input-spacing') as HTMLInputElement | null;
    spacingInput?.addEventListener('input', () => {
      const val = parseInt(spacingInput.value, 10);
      updateLayoutConfig({ spacing: val });
      const label = document.getElementById('spacing-val');
      if (label) label.textContent = `${val}px`;
    });

    const marginInput = document.getElementById('input-margin') as HTMLInputElement | null;
    marginInput?.addEventListener('input', () => {
      const val = parseInt(marginInput.value, 10);
      updateLayoutConfig({ margin: val });
      const label = document.getElementById('margin-val');
      if (label) label.textContent = `${val}px`;
    });

    // Background swatches
    this.container.querySelectorAll('button[data-bg]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const bg = btn.getAttribute('data-bg');
        const text = btn.getAttribute('data-text');
        if (bg && text) {
          updateLayoutConfig({ bg, textColor: text });
        }
      });
    });
  }

  private setupStoreSubscriptions() {
    $layoutConfig.subscribe(() => this.render());
    $workspaceMode.subscribe(() => this.render());
    $activeTemplateId.subscribe(() => this.render());
  }
}
