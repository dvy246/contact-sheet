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
        <div class="flex flex-col gap-5 p-4 text-xs text-workspace-text transition-colors">
          <!-- Presets Dropdown -->
          <div class="space-y-1.5">
            <label class="font-bold text-[11px] uppercase tracking-wider text-workspace-muted font-mono">Layout Preset</label>
            <select id="preset-selector" class="w-full bg-workspace-surface border border-workspace-border rounded-xl px-3 py-2 text-xs text-workspace-text focus:border-accent-amber transition-colors cursor-pointer">
              ${CONTACT_SHEET_PRESETS.map(p => `
                <option value="${p.id}">${p.name}</option>
              `).join('')}
            </select>
          </div>

          <!-- Page & Orientation -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted font-mono">Page Size</label>
              <select id="page-size-select" class="w-full bg-workspace-surface border border-workspace-border rounded-xl px-2.5 py-1.5 text-xs text-workspace-text focus:border-accent-amber transition-colors cursor-pointer">
                <option value="a4" ${config.pageSize === 'a4' ? 'selected' : ''}>A4 (Standard)</option>
                <option value="letter" ${config.pageSize === 'letter' ? 'selected' : ''}>US Letter</option>
                <option value="16-9" ${config.pageSize === '16-9' ? 'selected' : ''}>16:9 Screen</option>
                <option value="square" ${config.pageSize === 'square' ? 'selected' : ''}>1:1 Square</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted font-mono">Orientation</label>
              <div class="grid grid-cols-2 gap-1 bg-workspace-surface border border-workspace-border rounded-xl p-1">
                <button id="btn-orient-portrait" class="py-1 rounded-lg text-center transition-all cursor-pointer ${config.orientation === 'portrait' ? 'bg-workspace-panel text-accent-amber font-bold shadow-xs' : 'text-workspace-muted hover:text-workspace-text'}">
                  Portrait
                </button>
                <button id="btn-orient-landscape" class="py-1 rounded-lg text-center transition-all cursor-pointer ${config.orientation === 'landscape' ? 'bg-workspace-panel text-accent-amber font-bold shadow-xs' : 'text-workspace-muted hover:text-workspace-text'}">
                  Landscape
                </button>
              </div>
            </div>
          </div>

          <!-- Grid Dimensions (Columns & Rows) -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted font-medium">Columns</span>
                <span class="font-mono text-accent-amber font-bold" id="cols-val">${config.columns}</span>
              </div>
              <input id="input-cols" type="range" min="1" max="8" value="${config.columns}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-amber-500" />
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted font-medium">Rows</span>
                <span class="font-mono text-accent-amber font-bold" id="rows-val">${config.rows}</span>
              </div>
              <input id="input-rows" type="range" min="1" max="10" value="${config.rows}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-amber-500" />
            </div>
          </div>

          <!-- Spacing & Margins -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted font-medium">Gutter Spacing</span>
                <span class="font-mono text-accent-amber font-bold" id="spacing-val">${config.spacing}px</span>
              </div>
              <input id="input-spacing" type="range" min="0" max="48" step="2" value="${config.spacing}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-amber-500" />
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted font-medium">Page Margin</span>
                <span class="font-mono text-accent-amber font-bold" id="margin-val">${config.margin}px</span>
              </div>
              <input id="input-margin" type="range" min="0" max="64" step="4" value="${config.margin}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-amber-500" />
            </div>
          </div>

          <!-- Image Fit & Background Color -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted font-mono">Image Fit</label>
              <div class="grid grid-cols-2 gap-1 bg-workspace-surface border border-workspace-border rounded-xl p-1">
                <button id="btn-fit-contain" class="py-1 rounded-lg text-center transition-all cursor-pointer ${config.fit === 'contain' ? 'bg-workspace-panel text-accent-amber font-bold shadow-xs' : 'text-workspace-muted hover:text-workspace-text'}">
                  Contain (Full)
                </button>
                <button id="btn-fit-cover" class="py-1 rounded-lg text-center transition-all cursor-pointer ${config.fit === 'cover' ? 'bg-workspace-panel text-accent-amber font-bold shadow-xs' : 'text-workspace-muted hover:text-workspace-text'}">
                  Cover (Fill)
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="font-medium text-[11px] text-workspace-muted font-mono">Background Tone</label>
              <div class="flex items-center gap-2.5 pt-1">
                <button data-bg="#141417" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-[#141417] border-2 transition-all cursor-pointer ${config.bg === '#141417' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-500'}" title="The Archival Matte (Dark)"></button>
                <button data-bg="#000000" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-black border-2 transition-all cursor-pointer ${config.bg === '#000000' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-500'}" title="Deep Black"></button>
                <button data-bg="#ffffff" data-text="#18181b" class="w-7 h-7 rounded-full bg-white border-2 transition-all cursor-pointer ${config.bg === '#ffffff' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-400'}" title="Clean Gallery White"></button>
                <button data-bg="#f4f4f5" data-text="#18181b" class="w-7 h-7 rounded-full bg-[#f4f4f5] border-2 transition-all cursor-pointer ${config.bg === '#f4f4f5' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-400'}" title="Light Slate"></button>
              </div>
            </div>
          </div>

          <!-- Labels Configuration -->
          <div class="space-y-2 pt-2 border-t border-workspace-border">
            <div class="flex items-center justify-between">
              <label class="font-semibold text-xs text-workspace-text cursor-pointer" for="toggle-labels">Display Labels</label>
              <input id="toggle-labels" type="checkbox" ${config.showLabels ? 'checked' : ''} class="w-4 h-4 rounded text-accent-amber focus:ring-accent-amber accent-amber-500 cursor-pointer" />
            </div>

            ${config.showLabels ? `
              <div class="space-y-1.5 pt-1">
                <select id="label-type-select" class="w-full bg-workspace-surface border border-workspace-border rounded-xl px-2.5 py-1.5 text-xs text-workspace-text focus:border-accent-amber transition-colors cursor-pointer">
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
        <div class="flex flex-col gap-5 p-4 text-xs text-workspace-text transition-colors">
          <div class="space-y-2">
            <label class="font-bold text-[11px] uppercase tracking-wider text-workspace-muted font-mono">Choose Collage Template</label>
            <div class="grid grid-cols-1 gap-2 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
              ${COLLAGE_TEMPLATES.map(t => {
                const isSelected = t.id === activeTemplate;
                return `
                  <button 
                    data-template="${t.id}"
                    class="collage-template-card flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-workspace-surface border-accent-amber shadow-xs' 
                        : 'bg-workspace-surface/50 border-workspace-border hover:border-zinc-500'
                    }"
                  >
                    <div class="flex items-center justify-between font-bold text-xs text-workspace-text">
                      <span>${t.name}</span>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-workspace-panel border border-workspace-border text-workspace-muted font-mono">
                        ${t.cells.length} cells
                      </span>
                    </div>
                    <div class="text-[11px] text-workspace-muted mt-1 leading-snug">${t.description}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Spacing & Margins -->
          <div class="space-y-3 pt-2 border-t border-workspace-border">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted font-medium">Cell Gap</span>
                <span class="font-mono text-accent-amber font-bold" id="spacing-val">${config.spacing}px</span>
              </div>
              <input id="input-spacing" type="range" min="0" max="40" step="2" value="${config.spacing}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-amber-500" />
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-workspace-muted font-medium">Border Margin</span>
                <span class="font-mono text-accent-amber font-bold" id="margin-val">${config.margin}px</span>
              </div>
              <input id="input-margin" type="range" min="0" max="64" step="4" value="${config.margin}" class="w-full h-1.5 bg-workspace-border rounded-lg cursor-pointer accent-amber-500" />
            </div>
          </div>

          <!-- Background Color Swatches -->
          <div class="space-y-1.5 pt-2 border-t border-workspace-border">
            <label class="font-medium text-[11px] text-workspace-muted font-mono">Canvas Tone</label>
            <div class="flex items-center gap-2.5 pt-1">
              <button data-bg="#141417" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-[#141417] border-2 transition-all cursor-pointer ${config.bg === '#141417' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-500'}" title="The Archival Matte"></button>
              <button data-bg="#000000" data-text="#f4f4f5" class="w-7 h-7 rounded-full bg-black border-2 transition-all cursor-pointer ${config.bg === '#000000' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-500'}" title="Deep Black"></button>
              <button data-bg="#ffffff" data-text="#18181b" class="w-7 h-7 rounded-full bg-white border-2 transition-all cursor-pointer ${config.bg === '#ffffff' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-400'}" title="Clean White"></button>
              <button data-bg="#f4f4f5" data-text="#18181b" class="w-7 h-7 rounded-full bg-[#f4f4f5] border-2 transition-all cursor-pointer ${config.bg === '#f4f4f5' ? 'border-accent-amber scale-110 shadow-sm' : 'border-zinc-400'}" title="Light Slate"></button>
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
          updateLayoutConfig({
            pageSize: preset.config.pageSize,
            orientation: preset.config.orientation,
            columns: preset.config.columns,
            rows: preset.config.rows,
            spacing: preset.config.spacing,
            margin: preset.config.margin,
            showLabels: preset.config.showLabels,
            labelType: preset.config.labelType,
          });
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

      // Columns / Rows sliders
      const colsInput = document.getElementById('input-cols') as HTMLInputElement | null;
      colsInput?.addEventListener('input', () => {
        const val = parseInt(colsInput.value, 10);
        updateLayoutConfig({ columns: val });
        const valLabel = document.getElementById('cols-val');
        if (valLabel) valLabel.textContent = String(val);
      });

      const rowsInput = document.getElementById('input-rows') as HTMLInputElement | null;
      rowsInput?.addEventListener('input', () => {
        const val = parseInt(rowsInput.value, 10);
        updateLayoutConfig({ rows: val });
        const valLabel = document.getElementById('rows-val');
        if (valLabel) valLabel.textContent = String(val);
      });

      // Spacing / Margin sliders
      const spacingInput = document.getElementById('input-spacing') as HTMLInputElement | null;
      spacingInput?.addEventListener('input', () => {
        const val = parseInt(spacingInput.value, 10);
        updateLayoutConfig({ spacing: val });
        const valLabel = document.getElementById('spacing-val');
        if (valLabel) valLabel.textContent = `${val}px`;
      });

      const marginInput = document.getElementById('input-margin') as HTMLInputElement | null;
      marginInput?.addEventListener('input', () => {
        const val = parseInt(marginInput.value, 10);
        updateLayoutConfig({ margin: val });
        const valLabel = document.getElementById('margin-val');
        if (valLabel) valLabel.textContent = `${val}px`;
      });

      // Fit mode
      document.getElementById('btn-fit-contain')?.addEventListener('click', () => {
        updateLayoutConfig({ fit: 'contain' });
      });
      document.getElementById('btn-fit-cover')?.addEventListener('click', () => {
        updateLayoutConfig({ fit: 'cover' });
      });

      // Background Tone swatches
      this.container.querySelectorAll('[data-bg]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const bg = btn.getAttribute('data-bg');
          const text = btn.getAttribute('data-text');
          if (bg && text) {
            updateLayoutConfig({ bg, textColor: text });
          }
        });
      });

      // Labels Toggle
      const toggleLabels = document.getElementById('toggle-labels') as HTMLInputElement | null;
      toggleLabels?.addEventListener('change', () => {
        updateLayoutConfig({ showLabels: toggleLabels.checked });
        this.render();
      });

      // Label type
      const labelTypeSelect = document.getElementById('label-type-select') as HTMLSelectElement | null;
      labelTypeSelect?.addEventListener('change', () => {
        updateLayoutConfig({ labelType: labelTypeSelect.value as LabelType });
      });

    } else {
      // Collage Events
      this.container.querySelectorAll('.collage-template-card').forEach((btn) => {
        btn.addEventListener('click', () => {
          const tId = btn.getAttribute('data-template');
          if (tId) {
            setActiveTemplate(tId);
            this.render();
          }
        });
      });

      // Spacing / Margin
      const spacingInput = document.getElementById('input-spacing') as HTMLInputElement | null;
      spacingInput?.addEventListener('input', () => {
        const val = parseInt(spacingInput.value, 10);
        updateLayoutConfig({ spacing: val });
        const valLabel = document.getElementById('spacing-val');
        if (valLabel) valLabel.textContent = `${val}px`;
      });

      const marginInput = document.getElementById('input-margin') as HTMLInputElement | null;
      marginInput?.addEventListener('input', () => {
        const val = parseInt(marginInput.value, 10);
        updateLayoutConfig({ margin: val });
        const valLabel = document.getElementById('margin-val');
        if (valLabel) valLabel.textContent = `${val}px`;
      });

      // Background Swatches
      this.container.querySelectorAll('[data-bg]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const bg = btn.getAttribute('data-bg');
          const text = btn.getAttribute('data-text');
          if (bg && text) {
            updateLayoutConfig({ bg, textColor: text });
          }
        });
      });
    }
  }

  private setupStoreSubscriptions() {
    $layoutConfig.subscribe(() => this.render());
    $workspaceMode.subscribe(() => this.render());
    $activeTemplateId.subscribe(() => this.render());
  }
}
