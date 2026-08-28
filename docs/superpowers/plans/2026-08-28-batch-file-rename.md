# Batch File Rename Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully client-side batch file rename tool for photographers to rename image sets before creating contact sheets, matching ContactSheetMaker's $9/mo paid feature for free.

**Architecture:** Astro static page with a vanilla TS component using `nanostores` for state. The tool will use the HTML5 File API and `jszip` to rename files client-side and download them as a ZIP archive with zero uploads, making it infinitely scalable and private.

**Tech Stack:** Astro 5, Tailwind 4, Vanilla TypeScript, `nanostores`, `jszip`.

**Spec:** docs/strategy_report.md

## Global Constraints

- Must be 100% client-side (zero uploads).
- Must adhere to Tailwind 4 and Astro 5. No React runtime.
- Maintain 0 errors, 0 warnings, 0 hints on `astro check`.
- Use `nanostores` for state management if needed.
- SEO requirements: Page must have full metadata, semantic HTML, and `WebApplication` schema.

---

### Task 1: Add JSZip Dependency

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: None
- Produces: `jszip` available in node_modules

- [ ] **Step 1: Install jszip**

```bash
npm install jszip
```

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add jszip for client-side batch renaming"
```

### Task 2: Create Batch Rename Store

**Files:**
- Create: `src/lib/batchRenameStore.ts`

**Interfaces:**
- Consumes: None
- Produces: `export const $renameFiles = atom<File[]>([]);`, `export const $renameRule = atom<string>('{original}');`

- [ ] **Step 1: Write the store implementation**

```typescript
// src/lib/batchRenameStore.ts
import { atom } from 'nanostores';

export interface RenameFileItem {
  originalFile: File;
  newName: string;
}

export const $renameFiles = atom<RenameFileItem[]>([]);
export const $prefix = atom<string>('IMG_');
export const $startNumber = atom<number>(1);
export const $padding = atom<number>(4);

export function addFiles(files: File[]) {
  const current = $renameFiles.get();
  const newItems = files.map(f => ({ originalFile: f, newName: f.name }));
  $renameFiles.set([...current, ...newItems]);
  updateNewNames();
}

export function updateNewNames() {
  const prefix = $prefix.get();
  const startNum = $startNumber.get();
  const padding = $padding.get();
  
  const current = $renameFiles.get();
  const updated = current.map((item, index) => {
    const ext = item.originalFile.name.split('.').pop() || '';
    const num = String(startNum + index).padStart(padding, '0');
    return { ...item, newName: `${prefix}${num}.${ext}` };
  });
  $renameFiles.set(updated);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/batchRenameStore.ts
git commit -m "feat: add nanostore for batch file renaming"
```

### Task 3: Create Batch Rename Component

**Files:**
- Create: `src/components/workspace/BatchRenameApp.astro`
- Create: `src/components/workspace/BatchRenameApp.ts`

**Interfaces:**
- Consumes: `src/lib/batchRenameStore.ts`
- Produces: Web component that renders the rename preview and ZIP download logic.

- [ ] **Step 1: Write the Astro component template**

```astro
---
// src/components/workspace/BatchRenameApp.astro
---
<div id="batch-rename-app" class="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6">
  <div class="flex gap-4 items-center">
    <input type="file" id="rename-file-input" multiple accept="image/*" class="hidden" />
    <button id="rename-upload-btn" class="px-4 py-2 bg-zinc-800 text-white rounded">Select Files</button>
  </div>
  <div class="grid grid-cols-3 gap-4">
    <div>
      <label class="block text-sm">Prefix</label>
      <input type="text" id="rename-prefix" value="IMG_" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2" />
    </div>
    <div>
      <label class="block text-sm">Start Number</label>
      <input type="number" id="rename-start" value="1" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2" />
    </div>
  </div>
  <div id="rename-preview-list" class="flex flex-col gap-2 max-h-96 overflow-y-auto border border-zinc-800 p-4">
    <!-- Preview items go here -->
  </div>
  <div>
    <button id="rename-download-btn" class="px-4 py-2 bg-white text-black font-medium rounded">Download Renamed ZIP</button>
  </div>
</div>
<script src="./BatchRenameApp.ts"></script>
```

- [ ] **Step 2: Write the Vanilla TS controller**

```typescript
// src/components/workspace/BatchRenameApp.ts
import { $renameFiles, addFiles, $prefix, $startNumber, updateNewNames } from '../../lib/batchRenameStore';
import JSZip from 'jszip';

const uploadBtn = document.getElementById('rename-upload-btn');
const fileInput = document.getElementById('rename-file-input') as HTMLInputElement;
const prefixInput = document.getElementById('rename-prefix') as HTMLInputElement;
const startInput = document.getElementById('rename-start') as HTMLInputElement;
const previewList = document.getElementById('rename-preview-list');
const downloadBtn = document.getElementById('rename-download-btn');

if (uploadBtn && fileInput) {
  uploadBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const files = Array.from((e.target as HTMLInputElement).files || []);
    addFiles(files);
  });
}

if (prefixInput) {
  prefixInput.addEventListener('input', (e) => {
    $prefix.set((e.target as HTMLInputElement).value);
    updateNewNames();
  });
}

if (startInput) {
  startInput.addEventListener('input', (e) => {
    $startNumber.set(parseInt((e.target as HTMLInputElement).value, 10) || 1);
    updateNewNames();
  });
}

$renameFiles.subscribe(files => {
  if (!previewList) return;
  previewList.innerHTML = files.map(f => `
    <div class="flex justify-between text-sm p-2 bg-zinc-900 rounded">
      <span class="text-zinc-500">${f.originalFile.name}</span>
      <span class="text-white font-mono">${f.newName}</span>
    </div>
  `).join('');
});

if (downloadBtn) {
  downloadBtn.addEventListener('click', async () => {
    const files = $renameFiles.get();
    if (files.length === 0) return;
    
    const zip = new JSZip();
    files.forEach(f => {
      zip.file(f.newName, f.originalFile);
    });
    
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'makecontactsheet-renamed.zip';
    a.click();
    URL.revokeObjectURL(url);
  });
}
```

- [ ] **Step 3: Run Astro check**

Run: `npm run check`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add src/components/workspace/BatchRenameApp.astro src/components/workspace/BatchRenameApp.ts
git commit -m "feat: create batch rename workspace component"
```

### Task 4: Create SEO-Optimized Tool Route

**Files:**
- Create: `src/pages/batch-file-rename.astro`
- Modify: `src/lib/seo/metadata.ts`

**Interfaces:**
- Consumes: `BatchRenameApp.astro`, `MarketingLayout.astro`
- Produces: The public-facing `/batch-file-rename` route.

- [ ] **Step 1: Update metadata registry**

Modify `src/lib/seo/metadata.ts` to add the route:

```typescript
  '/batch-file-rename': {
    title: 'Free Batch File Renamer | Make Contact Sheet',
    description: 'Rename image sets securely in your browser before creating contact sheets. Zero uploads, 100% private, free batch renaming tool.',
    canonicalUrl: 'https://makecontactsheet.com/batch-file-rename'
  },
```

- [ ] **Step 2: Create the route**

```astro
---
// src/pages/batch-file-rename.astro
import MarketingLayout from '../layouts/MarketingLayout.astro';
import BatchRenameApp from '../components/workspace/BatchRenameApp.astro';
import { METADATA_REGISTRY } from '../lib/seo/metadata';

const meta = METADATA_REGISTRY['/batch-file-rename'];
---

<MarketingLayout title={meta.title} description={meta.description} canonical={meta.canonicalUrl}>
  <main class="py-20 bg-zinc-950 text-white">
    <div class="max-w-4xl mx-auto px-6 mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">Batch Rename Photos Securely</h1>
      <p class="text-zinc-400">Rename your image sets in seconds before generating contact sheets. 100% browser-based, no uploads.</p>
    </div>
    
    <BatchRenameApp />
    
    <!-- SEO Helper Text -->
    <article class="max-w-3xl mx-auto mt-20 text-zinc-400 prose prose-invert">
      <h2>Why use a local batch file renamer?</h2>
      <p>When preparing client proofs, keeping filenames structured is critical. Unlike other tools that charge a monthly fee or force you to upload gigabytes of files, Make Contact Sheet processes everything directly in your browser's memory. It's completely private and instantly outputs a ZIP file with your renamed images.</p>
    </article>
  </main>
</MarketingLayout>
```

- [ ] **Step 3: Run Astro check & Build**

Run: `npm run check && npm run build`
Expected: Passes with no errors, 16 static routes built.

- [ ] **Step 4: Commit**

```bash
git add src/pages/batch-file-rename.astro src/lib/seo/metadata.ts
git commit -m "feat: add SEO-optimized batch file rename route"
```

