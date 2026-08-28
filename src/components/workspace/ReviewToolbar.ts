import { 
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
      <div class="flex flex-nowrap lg:flex-wrap items-center justify-start lg:justify-between gap-3 sm:gap-4 p-3 sm:px-4 overflow-x-auto lg:overflow-x-visible custom-scrollbar bg-workspace-panel border-b border-workspace-border text-xs text-workspace-text select-none transition-colors w-full min-w-0">
        <!-- Mode Switcher -->
        <div class="flex items-center rounded-xl bg-workspace-surface p-1 border border-workspace-border shrink-0">
          <button 
            id="mode-contact-sheet" 
            class="h-8 px-3.5 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center justify-center ${currentMode === 'contact-sheet' ? 'bg-workspace-panel text-workspace-text shadow-xs' : 'text-workspace-muted hover:text-workspace-text'}"
          >
            Contact Sheet
          </button>
          <button 
            id="mode-collage" 
            class="h-8 px-3.5 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center justify-center ${currentMode === 'collage' ? 'bg-workspace-panel text-workspace-text shadow-xs' : 'text-workspace-muted hover:text-workspace-text'}"
          >
            Collage
          </button>
        </div>

        <!-- Filter Pills with Live Badges -->
        <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar py-1 max-w-full min-w-0 shrink-0 lg:shrink">
          <button data-filter="all" class="filter-pill h-8 px-3.5 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1.5 shrink-0 ${currentFilter === 'all' ? 'bg-workspace-surface border-accent text-workspace-text font-bold shadow-xs' : 'border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <span>All</span>
            <span class="opacity-70 font-mono">(${counts.total})</span>
          </button>
          <button data-filter="keep" class="filter-pill h-8 px-3.5 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1.5 shrink-0 ${currentFilter === 'keep' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold' : 'border-workspace-border text-workspace-muted hover:text-emerald-600 dark:hover:text-emerald-400'}">
            <span>✓ Kept</span>
            <span class="opacity-70 font-mono">(${counts.keep})</span>
          </button>
          <button data-filter="flag" class="filter-pill h-8 px-3.5 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1.5 shrink-0 ${currentFilter === 'flag' ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-400 font-bold' : 'border-workspace-border text-workspace-muted hover:text-amber-600 dark:hover:text-amber-400'}">
            <span>★ Flagged</span>
            <span class="opacity-70 font-mono">(${counts.flag})</span>
          </button>
          <button data-filter="reject" class="filter-pill h-8 px-3.5 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1.5 shrink-0 ${currentFilter === 'reject' ? 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-400 font-bold' : 'border-workspace-border text-workspace-muted hover:text-rose-600 dark:hover:text-rose-400'}">
            <span>✕ Rejected</span>
            <span class="opacity-70 font-mono">(${counts.reject})</span>
          </button>
          <button data-filter="unreviewed" class="filter-pill h-8 px-3.5 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1.5 shrink-0 ${currentFilter === 'unreviewed' ? 'bg-workspace-surface border-stone-400 text-workspace-text font-bold' : 'border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <span>Unreviewed</span>
            <span class="opacity-70 font-mono">(${counts.unreviewed})</span>
          </button>
        </div>

        <!-- Quick Batch Controls & Help -->
        <div class="flex items-center gap-2 shrink-0">
          <button id="btn-batch-keep" class="h-8 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 transition-colors text-xs font-semibold cursor-pointer flex items-center justify-center" title="Mark visible as Kept">
            Keep All
          </button>
          <button id="btn-batch-clear" class="h-8 px-3 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover text-workspace-muted hover:text-workspace-text border border-workspace-border transition-colors text-xs cursor-pointer flex items-center justify-center" title="Reset all statuses">
            Reset Status
          </button>
          <button id="btn-help-shortcuts" class="w-8 h-8 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover text-workspace-muted hover:text-workspace-text border border-workspace-border transition-colors cursor-pointer flex items-center justify-center" title="Keyboard Shortcuts (?)">
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
