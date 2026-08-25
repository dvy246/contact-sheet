import type { CollageTemplate, ImageItem, CollageLayoutResult, LayoutConfig } from '../types';

export function calculateCollageLayout(
  images: ImageItem[],
  template: CollageTemplate,
  config: LayoutConfig,
  baseScale = 1
): CollageLayoutResult {
  // Determine base canvas dimensions
  let canvasWidth = Math.round(1600 * baseScale);
  let canvasHeight = Math.round((1600 / template.aspectRatio) * baseScale);

  if (template.aspectRatio < 1) {
    // Vertical format (e.g. 9:16 or 4:5)
    canvasHeight = Math.round(1800 * baseScale);
    canvasWidth = Math.round(1800 * template.aspectRatio * baseScale);
  }

  const margin = Math.round((config.margin ?? template.defaultMargin) * baseScale);
  const spacing = Math.round((config.spacing ?? template.defaultSpacing) * baseScale);

  const innerW = canvasWidth - 2 * margin;
  const innerH = canvasHeight - 2 * margin;

  const cells: CollageLayoutResult['cells'] = template.cells.map((cellDef, index) => {
    // Percentage to pixel
    const rawX = margin + cellDef.x * innerW;
    const rawY = margin + cellDef.y * innerH;
    const rawW = cellDef.w * innerW;
    const rawH = cellDef.h * innerH;

    // Apply half-spacing adjustments between cells
    const adjustedX = rawX + (cellDef.x > 0 ? spacing / 2 : 0);
    const adjustedY = rawY + (cellDef.y > 0 ? spacing / 2 : 0);
    const adjustedW = rawW - (cellDef.x > 0 && cellDef.x + cellDef.w < 1 ? spacing : spacing / 2);
    const adjustedH = rawH - (cellDef.y > 0 && cellDef.y + cellDef.h < 1 ? spacing : spacing / 2);

    const assignedImage = images[index];

    return {
      image: assignedImage,
      x: Math.round(adjustedX),
      y: Math.round(adjustedY),
      width: Math.max(10, Math.round(adjustedW)),
      height: Math.max(10, Math.round(adjustedH)),
      fit: cellDef.fit || config.fit || 'cover',
    };
  });

  return {
    canvasWidth,
    canvasHeight,
    cells,
  };
}
