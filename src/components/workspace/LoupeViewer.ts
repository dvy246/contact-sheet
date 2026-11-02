import {
  $filteredImages,
  $selectedImageId,
  setImageStatus,
} from '../../lib/store';
import type { ImageItem, ReviewStatus } from '../../lib/types';

const STATUS_STYLES: Record<ReviewStatus, { label: string; className: string }> = {
  keep: { label: 'Kept', className: 'bg-emerald-500 text-white' },
  flag: { label: 'Flagged', className: 'bg-amber-500 text-black' },
  reject: { label: 'Rejected', className: 'bg-rose-500 text-white' },
  unreviewed: { label: 'Unreviewed', className: 'bg-white/15 text-white' },
};

function exifLine(img: ImageItem): string {
  const exif = img.exif;
  if (!exif) return `${img.width} × ${img.height}`;
  const camera = [exif.cameraMake, exif.cameraModel].filter(Boolean).join(' ');
  const parts = [
    camera,
    exif.lensModel,
    // metadataExtractor already formats these as `85mm`, `f/2.8`, `1/250s`.
    exif.focalLength,
    exif.fNumber,
    exif.exposureTime,
    exif.iso ? `ISO ${exif.iso}` : '',
  ].filter(Boolean);
  parts.push(`${img.width} × ${img.height}`);
  return parts.join(' · ');
}

/**
 * Full-screen single-photo review. The tray thumbnails are 480px at most, which
 * is too small to judge focus — the loupe shows the original file and can drop
 * to 1:1 pixels so missed focus is visible before a frame is kept.
 *
 * Markup is built once and patched by `update()`, so a keypress never replaces
 * the element that is handling it.
 */
export class LoupeViewer {
  private root: HTMLElement;
  private stage: HTMLElement;
  private img: HTMLImageElement;
  private titleEl: HTMLElement;
  private metaEl: HTMLElement;
  private counterEl: HTMLElement;
  private statusEl: HTMLElement;
  private zoomBtn: HTMLButtonElement;
  private open = false;
  private actualSize = false;
  private returnFocus: HTMLElement | null = null;

  constructor() {
    this.root = document.createElement('div');
    this.root.id = 'loupe-viewer';
    this.root.className = 'fixed inset-0 z-[60] hidden flex-col bg-neutral-950 text-white select-none';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Loupe review');
    this.root.innerHTML = `
      <div class="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <span id="loupe-counter" class="font-mono text-xs text-white/60 shrink-0"></span>
        <div class="min-w-0 flex-1">
          <p id="loupe-title" class="text-sm font-semibold truncate"></p>
          <p id="loupe-meta" class="text-[11px] font-mono text-white/55 truncate"></p>
        </div>
        <span id="loupe-status" class="h-6 px-2.5 rounded-full text-[11px] font-bold flex items-center shrink-0"></span>
        <button type="button" id="loupe-zoom" class="h-8 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer shrink-0" title="Toggle 1:1 pixels (Z)"></button>
        <button type="button" id="loupe-close" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-sm cursor-pointer shrink-0" title="Close (Esc)" aria-label="Close loupe">✕</button>
      </div>
      <div id="loupe-stage" class="relative flex-1 min-h-0 overflow-auto">
        <img id="loupe-img" alt="" draggable="false" class="block m-auto" />
        <button type="button" data-loupe-nav="-1" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-lg cursor-pointer" aria-label="Previous photo">‹</button>
        <button type="button" data-loupe-nav="1" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-lg cursor-pointer" aria-label="Next photo">›</button>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2 px-4 py-3 border-t border-white/10 text-xs">
        <button type="button" data-loupe-status="keep" class="h-8 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 font-semibold cursor-pointer">Keep <kbd class="ml-1 opacity-60 font-mono">1</kbd></button>
        <button type="button" data-loupe-status="flag" class="h-8 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 font-semibold cursor-pointer">Flag <kbd class="ml-1 opacity-60 font-mono">2</kbd></button>
        <button type="button" data-loupe-status="reject" class="h-8 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 font-semibold cursor-pointer">Reject <kbd class="ml-1 opacity-60 font-mono">3</kbd></button>
        <button type="button" data-loupe-status="unreviewed" class="h-8 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 cursor-pointer">Clear <kbd class="ml-1 opacity-60 font-mono">0</kbd></button>
        <span class="hidden sm:inline text-white/45 ml-2">← → to move · Z for 1:1 · Esc to close</span>
      </div>
    `;
    document.body.appendChild(this.root);

    this.stage = this.root.querySelector('#loupe-stage')!;
    this.img = this.root.querySelector('#loupe-img')!;
    this.titleEl = this.root.querySelector('#loupe-title')!;
    this.metaEl = this.root.querySelector('#loupe-meta')!;
    this.counterEl = this.root.querySelector('#loupe-counter')!;
    this.statusEl = this.root.querySelector('#loupe-status')!;
    this.zoomBtn = this.root.querySelector('#loupe-zoom')!;

    this.root.querySelector('#loupe-close')!.addEventListener('click', () => this.close());
    this.zoomBtn.addEventListener('click', () => this.toggleActualSize());
    this.img.addEventListener('click', (e) => this.toggleActualSize(e));
    // RAW/HEIC previews may not be decodable by <img>; the generated thumbnail always is.
    this.img.addEventListener('error', () => {
      const current = this.current();
      if (current?.thumbnailUrl && this.img.src !== current.thumbnailUrl) this.img.src = current.thumbnailUrl;
    });
    this.root.querySelectorAll<HTMLButtonElement>('[data-loupe-nav]').forEach((btn) => {
      btn.addEventListener('click', () => this.step(Number(btn.dataset.loupeNav)));
    });
    this.root.querySelectorAll<HTMLButtonElement>('[data-loupe-status]').forEach((btn) => {
      btn.addEventListener('click', () => this.mark(btn.dataset.loupeStatus as ReviewStatus));
    });

    $selectedImageId.subscribe(() => this.update());
    $filteredImages.subscribe(() => {
      if (this.open && $filteredImages.get().length === 0) this.close();
      else this.update();
    });
  }

  get isOpen(): boolean {
    return this.open;
  }

  contains(node: Node): boolean {
    return this.root.contains(node);
  }

  openAt(id?: string | null) {
    const images = $filteredImages.get();
    if (images.length === 0) return;
    const target = id && images.some((img) => img.id === id) ? id : images[0].id;
    $selectedImageId.set(target);
    this.returnFocus = document.activeElement as HTMLElement | null;
    this.open = true;
    this.actualSize = false;
    this.root.classList.remove('hidden');
    this.root.classList.add('flex');
    document.documentElement.style.overflow = 'hidden';
    this.update();
    (this.root.querySelector('#loupe-close') as HTMLButtonElement).focus();
  }

  close() {
    if (!this.open) return;
    this.open = false;
    this.root.classList.add('hidden');
    this.root.classList.remove('flex');
    document.documentElement.style.overflow = '';
    this.returnFocus?.focus?.();
  }

  /** Returns true when the key was consumed, so the grid shortcuts skip it. */
  handleKey(e: KeyboardEvent): boolean {
    if (!this.open) return false;
    switch (e.key) {
      case 'Escape':
      case ' ':
        this.close();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        this.step(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.step(-1);
        break;
      case '1':
        this.mark('keep');
        break;
      case '2':
        this.mark('flag');
        break;
      case '3':
        this.mark('reject');
        break;
      case '0':
      case 'u':
      case 'U':
        this.mark('unreviewed');
        break;
      case 'z':
      case 'Z':
        this.toggleActualSize();
        break;
      default:
        return true;
    }
    e.preventDefault();
    return true;
  }

  private current(): ImageItem | undefined {
    const id = $selectedImageId.get();
    return $filteredImages.get().find((img) => img.id === id);
  }

  private step(delta: number) {
    const images = $filteredImages.get();
    if (images.length === 0) return;
    const index = images.findIndex((img) => img.id === $selectedImageId.get());
    const next = Math.max(0, Math.min(images.length - 1, (index === -1 ? 0 : index) + delta));
    this.actualSize = false;
    $selectedImageId.set(images[next].id);
  }

  private mark(status: ReviewStatus) {
    const current = this.current();
    if (!current) return;
    const images = $filteredImages.get();
    const index = images.findIndex((img) => img.id === current.id);
    setImageStatus(current.id, status);
    if (status === 'unreviewed') return;
    // Under a status filter the marked photo may have just left the list; the
    // frame now at the same index is the "next" one in that case.
    const after = $filteredImages.get();
    const stillListed = after.some((img) => img.id === current.id);
    const nextIndex = stillListed ? index + 1 : index;
    if (after.length > 0) {
      this.actualSize = false;
      $selectedImageId.set(after[Math.min(nextIndex, after.length - 1)].id);
    }
  }

  private toggleActualSize(e?: MouseEvent) {
    const rect = this.img.getBoundingClientRect();
    // Zoom toward the clicked point so the detail being inspected stays put.
    const fx = e && rect.width ? (e.clientX - rect.left) / rect.width : 0.5;
    const fy = e && rect.height ? (e.clientY - rect.top) / rect.height : 0.5;
    this.actualSize = !this.actualSize;
    this.applySize();
    if (this.actualSize) {
      this.stage.scrollLeft = fx * this.img.naturalWidth - this.stage.clientWidth / 2;
      this.stage.scrollTop = fy * this.img.naturalHeight - this.stage.clientHeight / 2;
    }
  }

  private applySize() {
    if (this.actualSize) {
      this.img.style.cssText = 'max-width:none;max-height:none;width:auto;height:auto;cursor:zoom-out;';
    } else {
      this.img.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;cursor:zoom-in;position:absolute;inset:0;';
    }
    this.zoomBtn.textContent = this.actualSize ? 'Fit' : '1:1';
  }

  private update() {
    if (!this.open) return;
    const images = $filteredImages.get();
    const current = this.current();
    if (!current) return;
    const index = images.findIndex((img) => img.id === current.id);

    if (this.img.dataset.id !== current.id) {
      this.img.dataset.id = current.id;
      this.img.src = current.previewUrl || current.thumbnailUrl;
      this.img.alt = current.customLabel || current.name;
      this.stage.scrollTo(0, 0);
    }
    this.applySize();

    this.counterEl.textContent = `${index + 1} / ${images.length}`;
    this.titleEl.textContent = current.customLabel || current.name;
    this.metaEl.textContent = exifLine(current);
    const style = STATUS_STYLES[current.status];
    this.statusEl.textContent = style.label;
    this.statusEl.className = `h-6 px-2.5 rounded-full text-[11px] font-bold flex items-center shrink-0 ${style.className}`;
    this.root.querySelectorAll<HTMLButtonElement>('[data-loupe-status]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.loupeStatus === current.status));
      btn.classList.toggle('ring-2', btn.dataset.loupeStatus === current.status);
      btn.classList.toggle('ring-white/70', btn.dataset.loupeStatus === current.status);
    });
  }
}
