import type { ImageItem, LayoutConfig, PageLayoutResult, PageSize, PageOrientation } from '../types';

export function getPagePixelDimensions(pageSize: PageSize, orientation: PageOrientation, baseScale = 1): { width: number; height: number } {
  let w = 1240;
  let h = 1754;

  if (pageSize === 'a4') {
    w = orientation === 'portrait' ? 1240 : 1754;
    h = orientation === 'portrait' ? 1754 : 1240;
  } else if (pageSize === 'letter') {
    w = orientation === 'portrait' ? 1275 : 1650;
    h = orientation === 'portrait' ? 1650 : 1275;
  } else if (pageSize === '16-9') {
    w = orientation === 'portrait' ? 1080 : 1920;
    h = orientation === 'portrait' ? 1920 : 1080;
  } else if (pageSize === 'square') {
    w = 1200;
    h = 1200;
  } else if (pageSize === 'story') {
    w = 1080;
    h = 1920;
  } else {
    // Auto default to 1240x1754
    w = orientation === 'portrait' ? 1240 : 1754;
    h = orientation === 'portrait' ? 1754 : 1240;
  }

  return {
    width: Math.round(w * baseScale),
    height: Math.round(h * baseScale),
  };
}

export function calculateContactSheetPages(
  images: ImageItem[],
  config: LayoutConfig,
  baseScale = 1
): PageLayoutResult[] {
  const { width: canvasWidth, height: canvasHeight } = getPagePixelDimensions(
    config.pageSize,
    config.orientation,
    baseScale
  );

  const columns = Math.max(1, config.columns || 4);
  const rows = Math.max(1, config.rows || 5);
  const itemsPerPage = columns * rows;
  const totalPages = Math.max(1, Math.ceil(images.length / itemsPerPage));

  const margin = Math.round(config.margin * baseScale);
  const spacing = Math.round(config.spacing * baseScale);

  const availableWidth = canvasWidth - 2 * margin;
  const availableHeight = canvasHeight - 2 * margin;

  const totalColSpacing = (columns - 1) * spacing;
  const totalRowSpacing = (rows - 1) * spacing;

  const rawCellWidth = (availableWidth - totalColSpacing) / columns;
  const rawCellHeight = (availableHeight - totalRowSpacing) / rows;

  const labelHeight = config.showLabels && config.labelPosition === 'below' 
    ? Math.round(22 * baseScale) 
    : 0;

  const photoAreaHeight = Math.max(10, rawCellHeight - labelHeight);

  const pages: PageLayoutResult[] = [];

  for (let p = 0; p < totalPages; p++) {
    const pageImages = images.slice(p * itemsPerPage, (p + 1) * itemsPerPage);
    const cells: PageLayoutResult['cells'] = [];

    for (let i = 0; i < pageImages.length; i++) {
      const img = pageImages[i];
      const globalIndex = p * itemsPerPage + i + 1;
      const col = i % columns;
      const row = Math.floor(i / columns);

      const cellX = margin + col * (rawCellWidth + spacing);
      const cellY = margin + row * (rawCellHeight + spacing);

      // Compute photo placement inside cell based on contain/cover
      let drawX = cellX;
      let drawY = cellY;
      let drawW = rawCellWidth;
      let drawH = photoAreaHeight;

      if (config.fit === 'contain' && img.aspectRatio) {
        const cellRatio = rawCellWidth / photoAreaHeight;
        if (img.aspectRatio > cellRatio) {
          // Wider than cell
          drawW = rawCellWidth;
          drawH = rawCellWidth / img.aspectRatio;
          drawY = cellY + (photoAreaHeight - drawH) / 2;
        } else {
          // Taller than cell
          drawH = photoAreaHeight;
          drawW = photoAreaHeight * img.aspectRatio;
          drawX = cellX + (rawCellWidth - drawW) / 2;
        }
      }

      // Generate label
      let labelText: string | undefined;
      if (config.showLabels) {
        if (config.labelType === 'number') {
          labelText = `#${globalIndex}`;
        } else if (config.labelType === 'both') {
          labelText = `#${globalIndex} · ${img.sanitizedName}`;
        } else if (config.labelType === 'filename') {
          labelText = img.sanitizedName;
        }
      }

      cells.push({
        image: img,
        x: Math.round(drawX),
        y: Math.round(drawY),
        width: Math.round(drawW),
        height: Math.round(drawH),
        label: labelText,
        indexNumber: globalIndex,
        status: img.status,
      });
    }

    pages.push({
      pageIndex: p,
      totalPages,
      canvasWidth,
      canvasHeight,
      cells,
    });
  }

  return pages;
}
