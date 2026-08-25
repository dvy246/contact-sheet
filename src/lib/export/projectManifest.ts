import type { ImageItem, LayoutConfig, ProjectManifest, WorkspaceMode } from '../types';

export function exportProjectManifest(
  images: ImageItem[],
  mode: WorkspaceMode,
  config: LayoutConfig,
  activeTemplateId?: string,
  filename = 'frameproof-session'
): void {
  const manifest: ProjectManifest = {
    version: '1.0.0',
    generator: 'FrameProof',
    createdAt: new Date().toISOString(),
    mode,
    layoutConfig: config,
    activeTemplateId,
    images: images.map(img => ({
      name: img.name,
      sanitizedName: img.sanitizedName,
      size: img.size,
      type: img.type,
      width: img.width,
      height: img.height,
      status: img.status,
      order: img.order,
      note: img.note,
    })),
  };

  const jsonStr = JSON.stringify(manifest, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.frameproof.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function parseProjectManifest(jsonText: string): ProjectManifest | null {
  try {
    const data = JSON.parse(jsonText);
    if (data.generator === 'FrameProof' && Array.isArray(data.images)) {
      return data as ProjectManifest;
    }
    return null;
  } catch {
    return null;
  }
}
