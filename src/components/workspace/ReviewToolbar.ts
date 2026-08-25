import { 
  $images, 
  $filterStatus, 
  $reviewCounts, 
  $workspaceMode, 
  setFilterStatus, 
  setWorkspaceMode, 
  batchSetStatus 
} from '../../lib/store';
import type { FilterStatus } from '../../lib/types';

export class ReviewToolbar {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupStoreSubscriptions();
  }

  private render() {
    const counts = $reviewCounts.get();
    const currentFilter = $filterStatus.get();
    const currentMode = $workspaceMode.get();

    this.container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-workspace-panel border-b border-workspace-border text-xs text-workspace-text select-none">
        <!-- Mode Switcher -->
        <div class="flex items-center rounded-lg bg-workspace-bg p-1 border border-workspace-border">
          <button 
            id="mode-contact-sheet" 
            class="px-3 py-1.5 rounded-md font-medium transition-all ${currentMode === 'contact-sheet' ? 'bg-workspace-surface text-workspace-text shadow-sm' : 'text-workspace-muted hover:text-workspace-text'}"
          >
            Contact Sheet
          </button>
          <button 
            id="mode-collage" 
            class="px-3 py-1.5 rounded-md font-medium transition-all ${currentMode === 'collage' ? 'bg-workspace-surface text-workspace-text shadow-sm' : 'text-workspace-muted hover:text-workspace-text'}"
          >
            Collage
          </button>
        </div>

        <!-- Filter Pills with Live Badges -->
        <div class="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1">
          <button data-filter="all" class="filter-pill px-2.5 py-1 rounded-full border transition-colors ${currentFilter === 'all' ? 'bg-workspace-surface-hover border-accent-amber text-workspace-text' : 'border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            All <span class="ml-1 opacity-70 font-mono">(${counts.total})</span>
          </button>
          <button data-filter="keep" class="filter-pill px-2.5 py-1 rounded-full border transition-colors ${currentFilter === 'keep' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400' : 'border-workspace-border text-workspace-muted hover:text-emerald-400'}">
            ✓ Kept <span class="ml-1 opacity-70 font-mono">(${counts.keep})</span>
          </button>
          <button data-filter="flag" class="filter-pill px-2.5 py-1 rounded-full border transition-colors ${currentFilter === 'flag' ? 'bg-amber-950/60 border-amber-500 text-amber-400' : 'border-workspace-border text-workspace-muted hover:text-amber-400'}">
            ★ Flagged <span class="ml-1 opacity-70 font-mono">(${counts.flag})</span>
          </button>
          <button data-filter="reject" class="filter-pill px-2.5 py-1 rounded-full border transition-colors ${currentFilter === 'reject' ? 'bg-rose-950/60 border-rose-500 text-rose-400' : 'border-workspace-border text-workspace-muted hover:text-rose-400'}">
            ✕ Rejected <span class="ml-1 opacity-70 font-mono">(${counts.reject})</span>
          </button>
          <button data-filter="unreviewed" class="filter-pill px-2.5 py-1 rounded-full border transition-colors ${currentFilter === 'unreviewed' ? 'bg-workspace-surface-hover border-zinc-400 text-zinc-300' : 'border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            Unreviewed <span class="ml-1 opacity-70 font-mono">(${counts.unreviewed})</span>
          </button>
        </div>

        <!-- Quick Batch Controls & Help -->
        <div class="flex items-center gap-2">
          <button id="btn-batch-keep" class="px-2.5 py-1.5 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover text-emerald-400 border border-workspace-border transition-colors text-xs font-medium" title="Mark visible as Kept">
            Keep All
          </button>
          <button id="btn-batch-clear" class="px-2.5 py-1.5 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover text-workspace-muted hover:text-workspace-text border border-workspace-border transition-colors text-xs" title="Reset all statuses">
            Reset Status
          </button>
          <button id="btn-help-shortcuts" class="p-1.5 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover text-workspace-muted hover:text-workspace-text border border-workspace-border transition-colors" title="Keyboard Shortcuts (?)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Mode toggles
    document.getElementById('mode-contact-sheet')?.addEventListener('click', () => {
      setWorkspaceMode('contact-sheet');
    });
    document.getElementById('mode-collage')?.addEventListener('click', () => {
      setWorkspaceMode('collage');
    });

    // Filter pills
    this.container.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') as FilterStatus;
        if (filter) setFilterStatus(filter);
      });
    });

    // Batch actions
    document.getElementById('btn-batch-keep')?.addEventListener('click', () => {
      batchSetStatus('keep');
    });
    document.getElementById('btn-batch-clear')?.addEventListener('click', () => {
      batchSetStatus('unreviewed');
    });
  }

  private setupStoreSubscriptions() {
    $reviewCounts.subscribe(() => this.render());
    $filterStatus.subscribe(() => this.render());
    $workspaceMode.subscribe(() => this.render());
  }
}
