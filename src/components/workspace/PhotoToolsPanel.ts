import { $images, $filteredImages, $selectedImageId, $layoutConfig, replaceImages } from '../../lib/store';
import { loadImagesFromFiles } from '../../lib/media/imageLoader';
import {
  CROP_PRESETS,
  SPLIT_GRIDS,
  rotateImageFile,
  flipImageFile,
  cropImageFileToAspect,
  mergeImageFiles,
  splitImageFile,
  type MergeMode,
} from '../../lib/media/imageEditor';
import type { ImageItem } from '../../lib/types';

/**
 * Photo tools: rotate, flip, crop, split one frame; merge several into one.
 *
 * Every operation goes File → canvas → File and then back through
 * `loadImagesFromFiles`, so the result re-enters the store as an ordinary
 * `ImageItem` with real decoded dimensions. Nothing here knows about the sheet
 * geometry; the engine re-lays out on the next `$images` emission.
 *
 * Markup is built once and `sync()` only patches read-only text and disabled
 * states — it never writes to a select, a number input or a checkbox. Those are
 * the user's values, and rewriting one mid-interaction is what made the layout
 * sliders unusable before (see the note in `LayoutControls`).
 */
export class PhotoToolsPanel {
  private container: HTMLElement;
  private busy = false;

  private nameEl: HTMLElement | null = null;
  private metaEl: HTMLElement | null = null;
  private statusEl: HTMLElement | null = null;
  private mergeCountEl: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.build();
    this.attachEvents();
    this.sync();

    $images.subscribe(() => this.sync());
    $selectedImageId.subscribe(() => this.sync());
    $filteredImages.subscribe(() => this.sync());
  }

  private build() {
    const cropOptions = CROP_PRESETS.map((p) => `<option value="${p.id}">${p.label}</option>`).join('');
    const splitOptions = SPLIT_GRIDS.map((g) => `<option value="${g.id}">${g.label}</option>`).join('');

    this.container.innerHTML = `
      <div class="p-3 space-y-3">
        <!-- Selected frame -->
        <div class="rounded-xl border border-workspace-border bg-workspace-surface/50 p-2.5 space-y-1">
          <div id="phototools-name" class="text-xs font-semibold text-workspace-text truncate">No photo selected</div>
          <div id="phototools-meta" class="text-[10px] font-mono text-workspace-muted">Click a photo in the list or on the sheet</div>
        </div>

        <!-- Rotate / flip -->
        <div class="space-y-1.5">
          <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Rotate &amp; flip</span>
          <div class="grid grid-cols-5 gap-1.5">
            ${this.toolButton('rotate-left', '⟲ 90°', 'Rotate 90° counter-clockwise')}
            ${this.toolButton('rotate-right', '⟳ 90°', 'Rotate 90° clockwise')}
            ${this.toolButton('rotate-180', '180°', 'Turn upside down')}
            ${this.toolButton('flip-h', '⇋', 'Mirror left to right')}
            ${this.toolButton('flip-v', '⇅', 'Mirror top to bottom')}
          </div>
        </div>

        <!-- Crop -->
        <div class="space-y-1.5">
          <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Crop to shape</span>
          <div class="flex items-center gap-1.5">
            <select id="phototools-crop" class="flex-1 min-w-0 h-8 px-2 rounded-lg bg-workspace-surface border border-workspace-border text-[11px] text-workspace-text cursor-pointer">
              ${cropOptions}
            </select>
            ${this.actionButton('crop', 'Crop')}
          </div>
          <p class="text-[10px] text-workspace-muted leading-relaxed">Centre crop. Only removes pixels — nothing is stretched or upscaled.</p>
        </div>

        <!-- Split -->
        <div class="space-y-1.5">
          <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Split into frames</span>
          <div class="flex items-center gap-1.5">
            <select id="phototools-split" class="flex-1 min-w-0 h-8 px-2 rounded-lg bg-workspace-surface border border-workspace-border text-[11px] text-workspace-text cursor-pointer">
              ${splitOptions}
            </select>
            ${this.actionButton('split', 'Split')}
          </div>
          <p class="text-[10px] text-workspace-muted leading-relaxed">Replaces the photo with its tiles, in reading order, at its position in the sheet.</p>
        </div>

        <!-- Merge -->
        <div class="pt-3 border-t border-workspace-border space-y-1.5">
          <span class="text-[10px] uppercase tracking-wider text-workspace-muted font-semibold">Merge photos into one</span>
          <div class="grid grid-cols-2 gap-1.5">
            <select id="phototools-merge-mode" class="h-8 px-2 rounded-lg bg-workspace-surface border border-workspace-border text-[11px] text-workspace-text cursor-pointer">
              <option value="horizontal">Side by side</option>
              <option value="vertical">Stacked</option>
              <option value="grid">Grid</option>
            </select>
            <label class="flex items-center gap-1.5 h-8 px-2 rounded-lg bg-workspace-surface border border-workspace-border">
              <span class="text-[10px] text-workspace-muted whitespace-nowrap">Gap px</span>
              <input
                id="phototools-merge-gap"
                type="number"
                min="0"
                max="400"
                step="4"
                value="0"
                class="w-full min-w-0 bg-transparent text-[11px] font-mono text-workspace-text outline-none"
              />
            </label>
          </div>
          <label class="flex items-center gap-2 text-[10px] text-workspace-muted cursor-pointer">
            <input id="phototools-merge-keep" type="checkbox" checked class="accent-accent cursor-pointer" />
            <span>Keep the originals in the sheet as well</span>
          </label>
          ${this.actionButton('merge', 'Merge photos in view', 'w-full')}
          <p id="phototools-merge-count" class="text-[10px] text-workspace-muted leading-relaxed">Nothing to merge yet.</p>
        </div>

        <p id="phototools-status" class="text-[10px] leading-relaxed text-workspace-muted min-h-[1.2em]" role="status" aria-live="polite"></p>
      </div>
    `;

    this.nameEl = this.container.querySelector('#phototools-name');
    this.metaEl = this.container.querySelector('#phototools-meta');
    this.statusEl = this.container.querySelector('#phototools-status');
    this.mergeCountEl = this.container.querySelector('#phototools-merge-count');
  }

  private toolButton(action: string, label: string, title: string) {
    return `
      <button
        data-tool="${action}"
        title="${title}"
        class="h-8 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover border border-workspace-border text-[11px] font-medium text-workspace-text transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >${label}</button>
    `;
  }

  private actionButton(action: string, label: string, extra = '') {
    return `
      <button
        data-tool="${action}"
        class="${extra} h-8 px-3 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/50 text-[11px] font-semibold text-accent-ink transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
      >${label}</button>
    `;
  }

  private attachEvents() {
    this.container.querySelectorAll<HTMLButtonElement>('button[data-tool]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if (!tool || this.busy) return;
        void this.run(tool);
      });
    });
  }

  private selected(): ImageItem | undefined {
    const id = $selectedImageId.get();
    if (!id) return undefined;
    return $images.get().find((img) => img.id === id);
  }

  private async run(tool: string) {
    if (tool === 'merge') {
      await this.runMerge();
      return;
    }

    const target = this.selected();
    if (!target) {
      this.say('Select a photo first.', true);
      return;
    }

    this.setBusy(true, 'Working…');
    try {
      let produced: File[];

      switch (tool) {
        case 'rotate-left':
          produced = [await rotateImageFile(target.file, 270)];
          break;
        case 'rotate-right':
          produced = [await rotateImageFile(target.file, 90)];
          break;
        case 'rotate-180':
          produced = [await rotateImageFile(target.file, 180)];
          break;
        case 'flip-h':
          produced = [await flipImageFile(target.file, 'horizontal')];
          break;
        case 'flip-v':
          produced = [await flipImageFile(target.file, 'vertical')];
          break;
        case 'crop': {
          const id = this.selectValue('#phototools-crop');
          const preset = CROP_PRESETS.find((p) => p.id === id);
          if (!preset) throw new Error('Pick a crop shape.');
          produced = [await cropImageFileToAspect(target.file, preset)];
          break;
        }
        case 'split': {
          const id = this.selectValue('#phototools-split');
          const grid = SPLIT_GRIDS.find((g) => g.id === id);
          if (!grid) throw new Error('Pick a split.');
          produced = await splitImageFile(target.file, grid.cols, grid.rows);
          break;
        }
        default:
          return;
      }

      const items = await loadImagesFromFiles(produced);
      if (items.length === 0) throw new Error('The edit produced nothing readable.');

      replaceImages([target.id], items);
      this.say(
        items.length > 1
          ? `Split into ${items.length} frames.`
          : `Applied to ${target.sanitizedName}.`
      );
    } catch (err) {
      this.say(err instanceof Error ? err.message : 'That edit failed.', true);
    } finally {
      this.setBusy(false);
    }
  }

  /**
   * Merges whatever the current filter shows, in sheet order. That is the set
   * the user is already looking at, so a "merge my three selects" flow is
   * filter to Kept → Merge, with no second selection model to learn.
   */
  private async runMerge() {
    const targets = $filteredImages.get();
    if (targets.length < 2) {
      this.say('Merging needs at least two photos in view.', true);
      return;
    }

    const mode = this.selectValue('#phototools-merge-mode') as MergeMode;
    const gapEl = this.container.querySelector<HTMLInputElement>('#phototools-merge-gap');
    const keepEl = this.container.querySelector<HTMLInputElement>('#phototools-merge-keep');
    const gap = Math.min(400, Math.max(0, Number(gapEl?.value ?? 0) || 0));
    // Gaps take the sheet's own background, so a merged frame drops onto the
    // contact sheet without a white or black seam through it.
    const bg = $layoutConfig.get().bg;

    this.setBusy(true, `Merging ${targets.length} photos…`);
    try {
      const merged = await mergeImageFiles(
        targets.map((t) => t.file),
        { mode, gap, background: bg }
      );
      const items = await loadImagesFromFiles([merged]);
      if (items.length === 0) throw new Error('The merge produced nothing readable.');

      replaceImages(
        targets.map((t) => t.id),
        items,
        { keepSources: keepEl?.checked ?? true }
      );
      this.say(`Merged ${targets.length} photos into ${items[0].width}×${items[0].height}.`);
    } catch (err) {
      this.say(err instanceof Error ? err.message : 'The merge failed.', true);
    } finally {
      this.setBusy(false);
    }
  }

  private selectValue(selector: string): string {
    return this.container.querySelector<HTMLSelectElement>(selector)?.value ?? '';
  }

  private setBusy(busy: boolean, message?: string) {
    this.busy = busy;
    if (message) this.say(message);
    this.sync();
  }

  private say(message: string, isError = false) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message;
    this.statusEl.className = `text-[10px] leading-relaxed min-h-[1.2em] ${
      isError ? 'text-rose-600 dark:text-rose-400' : 'text-workspace-muted'
    }`;
  }

  private sync() {
    const target = this.selected();
    const inView = $filteredImages.get().length;

    if (this.nameEl) {
      this.nameEl.textContent = target ? target.sanitizedName : 'No photo selected';
    }
    if (this.metaEl) {
      this.metaEl.textContent = target
        ? `${target.width}×${target.height} · ${target.type.replace('image/', '').toUpperCase()}`
        : 'Click a photo in the list or on the sheet';
    }
    if (this.mergeCountEl) {
      this.mergeCountEl.textContent =
        inView < 2
          ? 'Merging needs at least two photos in view.'
          : `Merges the ${inView} photos the current filter shows, in sheet order.`;
    }

    this.container.querySelectorAll<HTMLButtonElement>('button[data-tool]').forEach((btn) => {
      const isMerge = btn.dataset.tool === 'merge';
      btn.disabled = this.busy || (isMerge ? inView < 2 : !target);
    });
  }
}
