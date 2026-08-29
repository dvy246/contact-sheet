import type { ImageItem, LayoutConfig, PageLayoutResult, PageSize, PageOrientation } from '../types';

/** Unscaled band heights. Exported so the renderer draws type at the same
 *  proportion the layout reserved, at any export scale. */
export const HEADER_BAND_HEIGHT = 54;
export const FOOTER_BAND_HEIGHT = 30;
/** Vertical space a `below` label occupies under its photo, unscaled. */
export const LABEL_BAND_HEIGHT = 22;

/** Every page size is laid out at 150 dpi, so mm → px is a fixed multiplier. */
export const PX_PER_MM = 150 / 25.4;

/** Bounds on a custom page, in mm. The lower bound keeps a page big enough to
 *  hold one labelled thumbnail; the upper bound keeps the raster inside what a
 *  browser canvas will allocate (A0 is 841 × 1189). */
export const CUSTOM_PAGE_MIN_MM = 40;
export const CUSTOM_PAGE_MAX_MM = 1200;

export function getPagePixelDimensions(
  pageSize: PageSize,
  orientation: PageOrientation,
  baseScale = 1,
  custom?: { widthMm: number; heightMm: number }
): { width: number; height: number } {
  let w = 1240;
  let h = 1754;

  if (pageSize === 'a4') {
    w = orientation === 'portrait' ? 1240 : 1754;
    h = orientation === 'portrait' ? 1754 : 1240;
  } else if (pageSize === 'letter') {
    w = orientation === 'portrait' ? 1275 : 1650;
    h = orientation === 'portrait' ? 1650 : 1275;
  } else if (pageSize === '8x10') {
    w = orientation === 'portrait' ? 1200 : 1500;
    h = orientation === 'portrait' ? 1500 : 1200;
  } else if (pageSize === '11x14') {
    w = orientation === 'portrait' ? 1650 : 2100;
    h = orientation === 'portrait' ? 2100 : 1650;
  } else if (pageSize === '16x20') {
    w = orientation === 'portrait' ? 2400 : 3000;
    h = orientation === 'portrait' ? 3000 : 2400;
  } else if (pageSize === '24x36') {
    w = orientation === 'portrait' ? 3600 : 5400;
    h = orientation === 'portrait' ? 5400 : 3600;
  } else if (pageSize === '12x18') {
    w = orientation === 'portrait' ? 1800 : 2700;
    h = orientation === 'portrait' ? 2700 : 1800;
  } else if (pageSize === '16-9') {
    w = orientation === 'portrait' ? 1080 : 1920;
    h = orientation === 'portrait' ? 1920 : 1080;
  } else if (pageSize === 'square') {
    w = 1200;
    h = 1200;
  } else if (pageSize === 'story') {
    w = 1080;
    h = 1920;
  } else if (pageSize === 'custom') {
    // The orientation control still applies: the two mm values are read as the
    // page's short and long edge rather than as literal width and height, so
    // flipping orientation does not force the user to swap the numbers.
    const a = clampCustomMm(custom?.widthMm);
    const b = clampCustomMm(custom?.heightMm);
    const short = Math.min(a, b);
    const long = Math.max(a, b);
    const mmW = orientation === 'portrait' ? short : long;
    const mmH = orientation === 'portrait' ? long : short;
    w = Math.round(mmW * PX_PER_MM);
    h = Math.round(mmH * PX_PER_MM);
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

function clampCustomMm(value: number | undefined): number {
  if (!Number.isFinite(value)) return 100;
  return Math.min(CUSTOM_PAGE_MAX_MM, Math.max(CUSTOM_PAGE_MIN_MM, Math.round(value as number)));
}

/**
 * Text printed with a photo.
 *
 * Kept here rather than in the renderer because the layout needs to know a
 * label exists before it can reserve a strip for it. Takes the name rather than
 * the whole `ImageItem` so the sidebar can preview a label without inventing an
 * image.
 */
export function buildCellLabel(
  config: LayoutConfig,
  sanitizedName: string,
  indexNumber: number
): string | undefined {
  if (!config.showLabels || config.labelPosition === 'none' || config.labelType === 'none') {
    return undefined;
  }

  let name = sanitizedName;
  if (config.labelHideExtension) {
    // Last dot only, and only when something follows it — "IMG_0042" must not
    // become "IMG" and a leading-dot name must not become empty.
    name = name.replace(/\.[^./\\]+$/, '') || name;
  }

  let text: string;
  if (config.labelType === 'number') {
    text = `#${indexNumber}`;
  } else if (config.labelType === 'both') {
    text = `#${indexNumber} · ${name}`;
  } else {
    text = name;
  }

  return config.labelUppercase ? text.toUpperCase() : text;
}


export function calculateContactSheetPages(
  images: ImageItem[],
  config: LayoutConfig,
  baseScale = 1
): PageLayoutResult[] {
  const { width: canvasWidth, height: canvasHeight } = getPagePixelDimensions(
    config.pageSize,
    config.orientation,
    baseScale,
    { widthMm: config.customWidthMm, heightMm: config.customHeightMm }
  );

  const columns = Math.max(1, config.columns || 4);
  const rows = Math.max(1, config.rows || 5);
  const itemsPerPage = columns * rows;
  const totalPages = Math.max(1, Math.ceil(images.length / itemsPerPage));

  const margin = Math.round(config.margin * baseScale);
  const spacing = Math.round(config.spacing * baseScale);

  // Title and page-number bands eat into the photo area rather than
  // overprinting it, so turning either on never crops a thumbnail.
  const headerHeight = config.showHeader ? Math.round(HEADER_BAND_HEIGHT * baseScale) : 0;
  const footerHeight = config.showPageNumbers ? Math.round(FOOTER_BAND_HEIGHT * baseScale) : 0;

  const availableWidth = canvasWidth - 2 * margin;
  const availableHeight = canvasHeight - 2 * margin - headerHeight - footerHeight;

  const totalColSpacing = (columns - 1) * spacing;
  const totalRowSpacing = (rows - 1) * spacing;

  const rawCellWidth = (availableWidth - totalColSpacing) / columns;
  const rawCellHeight = (availableHeight - totalRowSpacing) / rows;

  // Only a `below` label needs its own strip. `overlay` prints inside the
  // photo, and `none` prints nothing, so both leave the cell at full height.
  const labelHeight = config.showLabels && config.labelPosition === 'below'
    ? Math.round(LABEL_BAND_HEIGHT * baseScale)
    : 0;

  const photoAreaHeight = Math.max(10, rawCellHeight - labelHeight);
  const gridTop = margin + headerHeight;

  const pages: PageLayoutResult[] = [];

  for (let p = 0; p < totalPages; p++) {
    const pageImages = images.slice(p * itemsPerPage, (p + 1) * itemsPerPage);
    const cells: PageLayoutResult['cells'] = [];

    for (let i = 0; i < pageImages.length; i++) {
      const img = pageImages[i];
      const globalIndex = p * itemsPerPage + i + 1;
      // `column` walks down each column before moving right, which is how a
      // film strip reads on a light table. The grid geometry is unchanged —
      // only which cell an index lands in.
      const col = config.fillOrder === 'column' ? Math.floor(i / rows) : i % columns;
      const row = config.fillOrder === 'column' ? i % rows : Math.floor(i / columns);

      const cellX = margin + col * (rawCellWidth + spacing);
      const cellY = gridTop + row * (rawCellHeight + spacing);

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

      const labelText = buildCellLabel(config, img.customLabel || img.sanitizedName, globalIndex);

      cells.push({
        image: img,
        x: Math.round(drawX),
        y: Math.round(drawY),
        width: Math.round(drawW),
        height: Math.round(drawH),
        label: labelText,
        // Only set when a strip was actually reserved. Hit-testing in
        // CanvasPreview extends a cell's box down to the label, so setting this
        // unconditionally made the clickable area overhang the photo by the
        // band height whenever labels were off or drawn as an overlay.
        labelX: Math.round(cellX),
        labelWidth: Math.round(rawCellWidth),
        labelY: labelHeight
          ? Math.round(cellY + photoAreaHeight + 5 * baseScale)
          : undefined,
        indexNumber: globalIndex,
        status: img.status,
      });
    }

    pages.push({
      pageIndex: p,
      totalPages,
      canvasWidth,
      canvasHeight,
      scale: baseScale,
      headerRect: headerHeight
        ? { x: margin, y: margin, width: availableWidth, height: headerHeight }
        : undefined,
      footerRect: footerHeight
        ? {
            x: margin,
            y: canvasHeight - margin - footerHeight,
            width: availableWidth,
            height: footerHeight,
          }
        : undefined,
      cells,
    });
  }

  return pages;
}
