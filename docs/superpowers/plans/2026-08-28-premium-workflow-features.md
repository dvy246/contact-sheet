# Premium Workflow Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate state-of-the-art contact sheet capabilities directly into the core workflow: Batch Rename (applying recipes to `customLabel`) and PDF Password Protection. These features provide immediate value over competitor paywalls.

**Architecture:** 
- **Batch Rename:** Extend `src/components/workspace/PhotoTray.ts` (or add a new `BatchRenameTool.ts` in the tools tab) to let users input a Prefix, Start Number, and padding. The logic maps over `$images` and calls `setImageCustomLabel(id, generatedName)`.
- **Password Protection:** Extend `src/components/workspace/ExportDrawer.ts` to include an optional password input when PDF is selected. The password passes down to `exportContactSheetToPDF` and `exportCollageLayoutToPDF` in `src/lib/export/pdfExporter.ts`, configuring `jsPDF`'s native encryption engine.

**Tech Stack:** Astro 5, Vanilla TypeScript, `nanostores`, `jsPDF`.

**Spec:** docs/strategy_report.md

## Global Constraints

- Must be 100% client-side (no backend calls, no uploads).
- Must adhere to the existing `sync()` rendering pattern (never re-render a container from inside an event that container is currently handling).
- Maintain 0 errors, 0 warnings, 0 hints on `astro check`.
- Preserve existing responsive constraints and design tokens.

---

### Task 1: Update Export Exporter Signatures

**Files:**
- Modify: `src/lib/export/pdfExporter.ts`

**Interfaces:**
- Consumes: The existing `jsPDF` dynamic import.
- Produces: `exportContactSheetToPDF(..., options?: { password?: string })`

- [ ] **Step 1: Add options parameter to PDF exporters**

```typescript
// Update exportContactSheetToPDF and exportCollageLayoutToPDF in src/lib/export/pdfExporter.ts
export async function exportContactSheetToPDF(
  pages: PageLayoutResult[],
  config: LayoutConfig,
  filename: string,
  options?: { password?: string }
) {
  // ... existing setup ...
  const { jsPDF } = await import('jspdf');

  const pdfOptions: any = {
    orientation,
    unit: 'mm',
    format,
    compress: true,
  };
  
  if (options?.password) {
    pdfOptions.encryption = {
      userPassword: options.password,
      ownerPassword: options.password,
      userPermissions: ['print', 'modify', 'copy', 'annot-forms']
    };
  }

  const doc = new jsPDF(pdfOptions);
  // ... rest of implementation ...
```
*(Do the same for `exportCollageLayoutToPDF`)*

- [ ] **Step 2: Commit**

```bash
git add src/lib/export/pdfExporter.ts
git commit -m "feat: add password protection support to pdfExporter"
```

### Task 2: Add Password UI to Export Drawer

**Files:**
- Modify: `src/components/workspace/ExportDrawer.ts`

**Interfaces:**
- Consumes: User input string.
- Produces: The password passed into the exporter functions.

- [ ] **Step 1: Add state and UI elements**

```typescript
// In ExportDrawer.ts class fields:
private pdfPassword = '';

// In render():
// Inside the format selection area (or right below it), add a password field that only shows when format is 'pdf'.
// Add this HTML to the render string:
`
<div id="export-password-group" class="${this.selectedFormat === 'pdf' ? 'block' : 'hidden'} mt-4">
  <label class="flex items-center gap-2 text-sm text-workspace-text mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    Password Protect (Optional)
  </label>
  <input type="text" id="export-pdf-password" placeholder="Leave empty for no password" class="w-full bg-workspace-page border border-workspace-border rounded-md px-3 py-2 text-sm text-workspace-text" value="${this.pdfPassword}" />
</div>
`
```

- [ ] **Step 2: Bind events and sync**

```typescript
// In bindEvents():
const passwordInput = this.container.querySelector('#export-pdf-password') as HTMLInputElement;
if (passwordInput) {
  passwordInput.addEventListener('input', (e) => {
    this.pdfPassword = (e.target as HTMLInputElement).value;
  });
}

// In sync():
const pwdGroup = this.container.querySelector('#export-password-group');
if (pwdGroup) {
  pwdGroup.className = \`\${this.selectedFormat === 'pdf' ? 'block' : 'hidden'} mt-4\`;
}
```

- [ ] **Step 3: Pass password to exporter**

```typescript
// In executeExport(), when format is pdf:
if (mode === 'contact-sheet') {
  await exportContactSheetToPDF(pages, config, filename, { password: this.pdfPassword });
} else {
  // same for collage
  await exportCollageLayoutToPDF(canvas, filename, { password: this.pdfPassword });
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/workspace/ExportDrawer.ts
git commit -m "feat: add password protect UI to export drawer"
```

### Task 3: Build Batch Rename UI in Workspace

**Files:**
- Modify: `src/components/workspace/PhotoTray.ts` or `src/components/workspace/StudioApp.astro` (depending on where the UI fits best. Let's place it in a collapsible details section inside `PhotoTray.ts`).

**Interfaces:**
- Consumes: `$images`, `setImageCustomLabel`
- Produces: Updates `customLabel` for all active images.

- [ ] **Step 1: Add Rename UI to PhotoTray**

```typescript
// In src/components/workspace/PhotoTray.ts
// In the render method, add a new section above or below the thumbnail grid.
`
<details class="mb-4 border-b border-workspace-border pb-4 group">
  <summary class="cursor-pointer text-xs font-semibold uppercase tracking-wider text-workspace-muted hover:text-workspace-text flex items-center justify-between outline-none">
    Batch Rename Files
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
  </summary>
  <div class="mt-4 flex flex-col gap-3">
    <div class="flex gap-2">
      <div class="flex-1">
        <label class="block text-[10px] text-workspace-muted mb-1">Prefix</label>
        <input type="text" id="batch-rename-prefix" value="IMG_" class="w-full bg-workspace-page border border-workspace-border rounded px-2 py-1.5 text-xs text-workspace-text" />
      </div>
      <div class="w-16">
        <label class="block text-[10px] text-workspace-muted mb-1">Start #</label>
        <input type="number" id="batch-rename-start" value="1" min="1" class="w-full bg-workspace-page border border-workspace-border rounded px-2 py-1.5 text-xs text-workspace-text" />
      </div>
    </div>
    <button id="apply-batch-rename-btn" class="w-full bg-workspace-accent/10 text-workspace-accent hover:bg-workspace-accent hover:text-workspace-page transition-colors py-1.5 rounded text-xs font-medium border border-workspace-accent/20">
      Apply to all photos
    </button>
  </div>
</details>
`
```

- [ ] **Step 2: Bind events to apply renaming**

```typescript
// In bindEvents():
const applyBtn = this.container.querySelector('#apply-batch-rename-btn');
const prefixInput = this.container.querySelector('#batch-rename-prefix') as HTMLInputElement;
const startInput = this.container.querySelector('#batch-rename-start') as HTMLInputElement;

if (applyBtn && prefixInput && startInput) {
  applyBtn.addEventListener('click', () => {
    const prefix = prefixInput.value;
    const startNum = parseInt(startInput.value, 10) || 1;
    const padding = 4;
    
    // Import store variables at top of file
    import('../../lib/store').then(({ $images, setImageCustomLabel }) => {
      const current = $images.get();
      current.forEach((img, index) => {
        const numStr = String(startNum + index).padStart(padding, '0');
        const extMatch = img.name.match(/\.[^.]+$/);
        const ext = extMatch ? extMatch[0] : '';
        const newName = \`\${prefix}\${numStr}\${ext}\`;
        setImageCustomLabel(img.id, newName);
      });
    });
  });
}
```

- [ ] **Step 3: Run Astro check & test**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/workspace/PhotoTray.ts
git commit -m "feat: add batch rename UI to photo tray"
```

