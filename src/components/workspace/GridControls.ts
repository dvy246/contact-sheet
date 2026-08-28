import { $layoutConfig, $images, updateLayoutConfig } from '../../lib/store';
import { GRID_PRESETS, GRID_BACKGROUNDS, findGridPreset } from '../../lib/engine/gridPresets';

/**
 * The grid maker's whole control surface: pick a shape, then three sliders.
 *
 * `LayoutControls` is the full document panel — every field a proof sheet needs.
 * This is the opposite brief: a grid is a picture, so the only live controls are
 * gap, corner rounding and background, and everything else arrives as a preset
 * patch. Anyone who wants the other thirty fields has the contact sheet studio.
 *
 * Same build-once/patch discipline as `LayoutControls`: the markup is written
 * once and `sync()` only writes to controls that are not focused. Re-rendering
 * the container on `input` is what made the sheet sliders undraggable.
 */
export class GridControls {
  private container: HTMLElement;
  private activePresetId = 'square-3x3';

  constructor(container: HTMLElement) {
    this.container = container;
    this.build();
    this.attachEvents();
    // The route lands on a 3×3 square: it is the grid people picture when they
    // say "photo grid", and an empty tool that already looks like something is
    // easier to understand than a blank page of controls.
    this.applyPreset(this.activePresetId);
    this.sync();

    $layoutConfig.subscribe(() => this.sync());
    $images.subscribe(() => this.sync());
  }

  private build() {
    const chips = GRID_PRESETS.map(
      (p) => `
        <button
          type="button"
          data-preset="${p.id}"
          class="grid-preset-chip group relative flex flex-col items-start gap-0.5 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer bg-workspace-surface/60 border-workspace-border hover:border-accent/60 hover:bg-workspace-surface"
        >
          <span class="text-xs font-bold tracking-tight text-workspace-text">${p.label}</span>
          <span class="text-[10px] font-mono text-workspace-muted">${p.shape} · ${p.capacity} photos</span>
        </button>
      `
    ).join('');

    const swatches = GRID_BACKGROUNDS.map(
      (b) => `
        <button
          type="button"
          data-bg="${b.bg}"
          title="${b.label}"
          aria-label="${b.label} background"
          class="grid-bg-swatch w-7 h-7 rounded-lg border-2 border-workspace-border transition-transform hover:scale-105 cursor-pointer"
          style="background:${b.bg}"
        ></button>
      `
    ).join('');

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Shape -->
        <div class="space-y-2">
          <div class="flex items-baseline justify-between gap-2">
            <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Pick a grid</span>
            <span id="grid-capacity-note" class="text-[10px] font-mono text-workspace-muted"></span>
          </div>
          <div class="grid grid-cols-2 gap-1.5" id="grid-preset-list">${chips}</div>
        </div>

        <!-- Live controls. Three, on purpose. -->
        <div class="space-y-3 pt-3 border-t border-workspace-border">
          ${this.slider('grid-gap', 'Gap between photos', 'spacing', 0, 60, 1, 'px')}
          ${this.slider('grid-radius', 'Rounded corners', 'cellRadius', 0, 32, 1, 'px')}
          ${this.slider('grid-margin', 'Outer border', 'margin', 0, 96, 2, 'px')}
        </div>

        <!-- Background -->
        <div class="space-y-2 pt-3 border-t border-workspace-border">
          <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Background</span>
          <div class="flex items-center gap-2 flex-wrap" id="grid-bg-list">
            ${swatches}
            <label class="flex items-center gap-1.5 h-7 px-2 rounded-lg bg-workspace-surface border border-workspace-border cursor-pointer">
              <input id="grid-bg-custom" type="color" class="w-4 h-4 bg-transparent border-0 p-0 cursor-pointer" />
              <span class="text-[10px] text-workspace-muted">Custom</span>
            </label>
          </div>
        </div>

        <!-- Fit. The one geometry choice a grid genuinely needs. -->
        <div class="space-y-2 pt-3 border-t border-workspace-border">
          <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Photo fit</span>
          <div class="grid grid-cols-2 gap-1.5">
            <button type="button" data-fit="cover" class="grid-fit-btn h-8 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer">Fill cell</button>
            <button type="button" data-fit="contain" class="grid-fit-btn h-8 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer">Whole photo</button>
          </div>
          <p class="text-[10px] text-workspace-muted leading-relaxed">
            Fill crops each photo to its cell. Whole photo keeps every edge and shows background around it.
          </p>
        </div>
      </div>
    `;
  }

  private slider(
    id: string,
    label: string,
    key: string,
    min: number,
    max: number,
    step: number,
    unit: string
  ) {
    return `
      <div class="space-y-1">
        <div class="flex items-center justify-between gap-2">
          <label for="${id}" class="text-[11px] text-workspace-text">${label}</label>
          <span data-readout="${key}" class="text-[10px] font-mono text-workspace-muted">0${unit}</span>
        </div>
        <input
          id="${id}"
          data-config-key="${key}"
          data-unit="${unit}"
          type="range"
          min="${min}"
          max="${max}"
          step="${step}"
          class="w-full accent-accent cursor-pointer"
        />
      </div>
    `;
  }

  private attachEvents() {
    this.container.querySelectorAll<HTMLButtonElement>('button[data-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.preset;
        if (id) this.applyPreset(id);
      });
    });

    this.container.querySelectorAll<HTMLInputElement>('input[data-config-key]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.configKey;
        if (!key) return;
        updateLayoutConfig({ [key]: Number(input.value) });
      });
    });

    this.container.querySelectorAll<HTMLButtonElement>('button[data-bg]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const bg = btn.dataset.bg;
        if (!bg) return;
        // Text colour follows the background so a future label or page number is
        // never printed dark-on-dark. Threshold is plain luminance.
        updateLayoutConfig({ bg, textColor: isLight(bg) ? '#1a1210' : '#f7efe6' });
      });
    });

    const custom = this.container.querySelector<HTMLInputElement>('#grid-bg-custom');
    custom?.addEventListener('input', () => {
      updateLayoutConfig({ bg: custom.value, textColor: isLight(custom.value) ? '#1a1210' : '#f7efe6' });
    });

    this.container.querySelectorAll<HTMLButtonElement>('button[data-fit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const fit = btn.dataset.fit;
        if (fit === 'cover' || fit === 'contain') updateLayoutConfig({ fit });
      });
    });
  }

  private applyPreset(id: string) {
    const preset = findGridPreset(id);
    if (!preset) return;
    this.activePresetId = id;
    updateLayoutConfig(preset.patch);
    this.sync();
  }

  private sync() {
    const config = $layoutConfig.get();
    const total = $images.get().length;

    this.container.querySelectorAll<HTMLInputElement>('input[data-config-key]').forEach((input) => {
      // Writing to a control the user is dragging cancels the drag.
      if (document.activeElement === input) return;
      const key = input.dataset.configKey as keyof typeof config;
      const value = config[key];
      if (typeof value === 'number') input.value = String(value);
    });

    this.container.querySelectorAll<HTMLElement>('[data-readout]').forEach((el) => {
      const key = el.dataset.readout as keyof typeof config;
      const value = config[key];
      const unit = this.container.querySelector<HTMLInputElement>(`input[data-config-key="${key}"]`)?.dataset.unit ?? '';
      if (typeof value === 'number') el.textContent = `${value}${unit}`;
    });

    this.container.querySelectorAll<HTMLButtonElement>('button[data-preset]').forEach((btn) => {
      const on = btn.dataset.preset === this.activePresetId;
      btn.classList.toggle('border-accent', on);
      btn.classList.toggle('bg-workspace-surface', on);
      btn.classList.toggle('border-workspace-border', !on);
    });

    this.container.querySelectorAll<HTMLButtonElement>('button[data-fit]').forEach((btn) => {
      const on = btn.dataset.fit === config.fit;
      btn.className = `grid-fit-btn h-8 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
        on
          ? 'border-accent bg-accent/15 text-accent-ink'
          : 'border-workspace-border bg-workspace-surface/60 text-workspace-muted hover:text-workspace-text'
      }`;
    });

    this.container.querySelectorAll<HTMLButtonElement>('button[data-bg]').forEach((btn) => {
      const on = btn.dataset.bg?.toLowerCase() === config.bg.toLowerCase();
      btn.classList.toggle('border-accent', on);
      btn.classList.toggle('border-workspace-border', !on);
    });

    const note = this.container.querySelector('#grid-capacity-note');
    if (note) {
      const capacity = Math.max(1, config.columns * config.rows);
      const sheets = Math.max(1, Math.ceil(total / capacity));
      note.textContent = total === 0
        ? `${config.columns} × ${config.rows}`
        : `${total} photo${total === 1 ? '' : 's'} · ${sheets} grid${sheets === 1 ? '' : 's'}`;
    }
  }
}

/** Relative luminance, sRGB coefficients. Used only to pick a readable ink. */
function isLight(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.55;
}
