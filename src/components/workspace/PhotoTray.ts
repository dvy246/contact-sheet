import {
  $filteredImages,
  $selectedImageId,
  $images,
  moveImageToIndex,
  removeImage,
} from '../../lib/store';

/** Payload type shared with the canvas, so a tray thumbnail can be dropped
 *  straight into a grid cell. A custom MIME keeps it distinguishable from a
 *  file drop, which must still import. */
export const TRAY_DRAG_TYPE = 'application/x-frameproof-image';

/** How close to an edge, in px, before the tray scrolls itself during a drag. */
const AUTOSCROLL_ZONE = 56;

/**
 * The grid maker's photo tray: a wrapping strip of numbered thumbnails that can
 * be dragged into any order, or dragged onto a cell in the sheet.
 *
 * `ThumbnailGrid` is a list of rows with per-photo review buttons — right for a
 * proof sheet, wrong here, where the only question is what order the pictures go
 * in. Reordering shows an insertion caret at the exact slot rather than swapping
 * two rows on release, because "drop it between these two" is what the gesture
 * looks like it should do.
 */
export class PhotoTray {
  private container: HTMLElement;
  private draggedId: string | null = null;
  /** Insertion target, as an index in the store's own order. */
  private insertAt: number | null = null;
  private ghost: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    $filteredImages.subscribe(() => this.render());
    $selectedImageId.subscribe(() => this.paintSelection());
  }

  private render() {
    const images = $filteredImages.get();

    if (images.length === 0) {
      this.container.innerHTML = `
        <p class="p-4 text-center text-[11px] text-workspace-muted leading-relaxed">
          Drop photos anywhere on the page.<br />They land here in the order you add them.
        </p>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="tray-list grid grid-cols-3 gap-2 p-2.5" role="list">
        ${images
          .map(
            (img, index) => `
          <div
            class="tray-item group relative aspect-square rounded-xl overflow-hidden border border-workspace-border bg-black/20 cursor-grab active:cursor-grabbing"
            role="listitem"
            data-id="${img.id}"
            data-index="${index}"
            draggable="true"
            title="${img.sanitizedName}"
          >
            <img src="${img.thumbnailUrl || img.previewUrl}" alt="${img.sanitizedName}" class="w-full h-full object-cover pointer-events-none" loading="lazy" />
            <span class="absolute top-1 left-1 px-1 rounded bg-black/60 text-[9px] font-mono text-white pointer-events-none">${index + 1}</span>
            <button
              type="button"
              data-remove="${img.id}"
              title="Remove ${img.sanitizedName}"
              class="absolute top-1 right-1 w-5 h-5 rounded-md bg-black/60 text-white text-[11px] leading-none opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
            >×</button>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    this.attachEvents();
    this.paintSelection();
  }

  private attachEvents() {
    const items = this.container.querySelectorAll<HTMLElement>('.tray-item');

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('button[data-remove]')) return;
        const id = item.dataset.id;
        if (id) $selectedImageId.set(id);
      });

      item.addEventListener('dragstart', (e) => {
        const dragEvent = e as DragEvent;
        this.draggedId = item.dataset.id ?? null;
        if (!this.draggedId || !dragEvent.dataTransfer) return;

        dragEvent.dataTransfer.effectAllowed = 'move';
        dragEvent.dataTransfer.setData(TRAY_DRAG_TYPE, this.draggedId);
        // Some browsers refuse a drag with no text/plain payload at all.
        dragEvent.dataTransfer.setData('text/plain', this.draggedId);
        this.attachGhost(dragEvent, item);
        item.classList.add('is-dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        this.clearMarkers();
        this.releaseGhost();
        this.draggedId = null;
        this.insertAt = null;
      });

      item.addEventListener('dragover', (e) => {
        if (!this.draggedId) return;
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';

        const rect = item.getBoundingClientRect();
        const after = (e as DragEvent).clientX > rect.left + rect.width / 2;
        this.clearMarkers();
        item.classList.add(after ? 'is-insert-after' : 'is-insert-before');

        const targetId = item.dataset.id;
        const order = $images.get();
        const targetIndex = order.findIndex((img) => img.id === targetId);
        const fromIndex = order.findIndex((img) => img.id === this.draggedId);
        if (targetIndex === -1 || fromIndex === -1) return;

        // The caret sits *between* thumbnails, so the slot it means depends on
        // which side of the source the drop is: dragging forwards, landing
        // "after" target N means index N; dragging backwards it means N + 1.
        let slot = after ? targetIndex + 1 : targetIndex;
        if (fromIndex < slot) slot -= 1;
        this.insertAt = slot;
      });

      item.addEventListener('drop', (e) => {
        if (!this.draggedId) return;
        e.preventDefault();
        e.stopPropagation();
        if (this.insertAt !== null) moveImageToIndex(this.draggedId, this.insertAt);
        this.clearMarkers();
        this.draggedId = null;
        this.insertAt = null;
      });
    });

    // Dropping on the tray's own padding means "put it last".
    this.container.addEventListener('dragover', (e) => {
      if (!this.draggedId) return;
      e.preventDefault();
      this.autoScroll(e as DragEvent);
    });

    this.container.addEventListener('drop', (e) => {
      if (!this.draggedId) return;
      e.preventDefault();
      if ((e.target as HTMLElement).closest('.tray-item')) return;
      moveImageToIndex(this.draggedId, $images.get().length - 1);
      this.clearMarkers();
      this.draggedId = null;
      this.insertAt = null;
    });

    this.container.querySelectorAll<HTMLButtonElement>('button[data-remove]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.remove;
        if (id) removeImage(id);
      });
    });
  }

  /**
   * Replaces the browser's translucent snapshot with a lifted, rounded copy.
   * The clone has to be in the document when `setDragImage` reads it, so it is
   * parked off-screen and removed on the next frame rather than immediately.
   */
  private attachGhost(event: DragEvent, item: HTMLElement) {
    const clone = item.cloneNode(true) as HTMLElement;
    clone.classList.remove('is-dragging');
    clone.querySelectorAll('button').forEach((b) => b.remove());
    clone.style.position = 'fixed';
    clone.style.top = '-1000px';
    clone.style.left = '-1000px';
    clone.style.width = `${item.offsetWidth}px`;
    clone.style.height = `${item.offsetHeight}px`;
    clone.style.transform = 'rotate(-3deg) scale(1.06)';
    clone.style.boxShadow = '0 18px 40px rgba(0,0,0,0.45)';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);
    this.ghost = clone;
    event.dataTransfer?.setDragImage(clone, item.offsetWidth / 2, item.offsetHeight / 2);
  }

  private releaseGhost() {
    this.ghost?.remove();
    this.ghost = null;
  }

  /** Keeps a long tray usable: dragging near an edge scrolls it. */
  private autoScroll(event: DragEvent) {
    const rect = this.container.getBoundingClientRect();
    if (event.clientY < rect.top + AUTOSCROLL_ZONE) {
      this.container.scrollTop -= 14;
    } else if (event.clientY > rect.bottom - AUTOSCROLL_ZONE) {
      this.container.scrollTop += 14;
    }
  }

  private clearMarkers() {
    this.container.querySelectorAll('.is-insert-before, .is-insert-after').forEach((el) => {
      el.classList.remove('is-insert-before', 'is-insert-after');
    });
  }

  /** Selection is a class flip rather than a re-render: rebuilding the list
   *  mid-drag would drop the drag. */
  private paintSelection() {
    const selected = $selectedImageId.get();
    this.container.querySelectorAll<HTMLElement>('.tray-item').forEach((item) => {
      item.classList.toggle('is-selected', item.dataset.id === selected);
    });
  }
}
