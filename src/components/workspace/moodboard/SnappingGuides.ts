import type { MoodBoardElement, MoodBoardCanvasConfig } from '../../../lib/types';

export type SnapOrientation = 'horizontal' | 'vertical';
export type SnapType = 'edge' | 'center' | 'canvas' | 'grid';

export interface SnapLine {
  orientation: SnapOrientation;
  /** Position on the snapped axis (x for vertical, y for horizontal) */
  position: number;
  /** Start coordinate on the orthogonal axis */
  start: number;
  /** End coordinate on the orthogonal axis */
  end: number;
  type: SnapType;
}

export interface BoxRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SnapResult {
  x: number;
  y: number;
  dx: number;
  dy: number;
  lines: SnapLine[];
}

/**
 * Calculates geometric alignment snapping for an element being dragged or resized
 * against other elements on the moodboard and canvas boundaries.
 */
export function calculateSnapping(
  target: BoxRect,
  otherElements: MoodBoardElement[],
  config: MoodBoardCanvasConfig,
  customThreshold?: number
): SnapResult {
  // Screen-relative magnetic threshold (converted to board coordinates)
  const zoom = Math.max(0.1, config.zoom || 1);
  const threshold = customThreshold ?? 6 / zoom;

  let bestDx = 0;
  let minDiffX = threshold + 1;
  const verticalLines: SnapLine[] = [];

  let bestDy = 0;
  let minDiffY = threshold + 1;
  const horizontalLines: SnapLine[] = [];

  // Target key coordinates
  const targetLeft = target.x;
  const targetCenterX = target.x + target.width / 2;
  const targetRight = target.x + target.width;

  const targetTop = target.y;
  const targetCenterY = target.y + target.height / 2;
  const targetBottom = target.y + target.height;

  // -------------------------------------------------------------------------
  // 1. Element-to-Element & Canvas Alignment Snapping
  // -------------------------------------------------------------------------
  if (config.snapToElements !== false) {
    // Vertical reference anchors (X axis)
    const xAnchors: {
      pos: number;
      type: SnapType;
      startY: number;
      endY: number;
    }[] = [
      // Canvas boundaries
      { pos: 0, type: 'canvas', startY: 0, endY: config.height },
      { pos: Math.round(config.width / 2), type: 'canvas', startY: 0, endY: config.height },
      { pos: config.width, type: 'canvas', startY: 0, endY: config.height },
    ];

    // Horizontal reference anchors (Y axis)
    const yAnchors: {
      pos: number;
      type: SnapType;
      startX: number;
      endX: number;
    }[] = [
      // Canvas boundaries
      { pos: 0, type: 'canvas', startX: 0, endX: config.width },
      { pos: Math.round(config.height / 2), type: 'canvas', startX: 0, endX: config.width },
      { pos: config.height, type: 'canvas', startX: 0, endX: config.width },
    ];

    // Other elements anchors
    for (const el of otherElements) {
      const elLeft = el.x;
      const elCenterX = el.x + el.width / 2;
      const elRight = el.x + el.width;

      const elTop = el.y;
      const elCenterY = el.y + el.height / 2;
      const elBottom = el.y + el.height;

      // Vertical anchors from other element
      xAnchors.push(
        { pos: elLeft, type: 'edge', startY: elTop, endY: elBottom },
        { pos: elCenterX, type: 'center', startY: elTop, endY: elBottom },
        { pos: elRight, type: 'edge', startY: elTop, endY: elBottom }
      );

      // Horizontal anchors from other element
      yAnchors.push(
        { pos: elTop, type: 'edge', startX: elLeft, endX: elRight },
        { pos: elCenterY, type: 'center', startX: elLeft, endX: elRight },
        { pos: elBottom, type: 'edge', startX: elLeft, endX: elRight }
      );
    }

    // Check X Snapping candidates (Left, Center, Right)
    const targetXPoints = [
      { pos: targetLeft },
      { pos: targetCenterX },
      { pos: targetRight },
    ];

    for (const tPt of targetXPoints) {
      for (const anchor of xAnchors) {
        const diff = anchor.pos - tPt.pos;
        const absDiff = Math.abs(diff);

        if (absDiff <= threshold && absDiff < minDiffX) {
          minDiffX = absDiff;
          bestDx = diff;

          const lineStart = Math.min(targetTop, anchor.startY) - 12;
          const lineEnd = Math.max(targetBottom, anchor.endY) + 12;

          verticalLines.length = 0;
          verticalLines.push({
            orientation: 'vertical',
            position: anchor.pos,
            start: lineStart,
            end: lineEnd,
            type: anchor.type,
          });
        } else if (absDiff <= threshold && Math.abs(absDiff - minDiffX) < 0.001) {
          const lineStart = Math.min(targetTop, anchor.startY) - 12;
          const lineEnd = Math.max(targetBottom, anchor.endY) + 12;
          verticalLines.push({
            orientation: 'vertical',
            position: anchor.pos,
            start: lineStart,
            end: lineEnd,
            type: anchor.type,
          });
        }
      }
    }

    // Check Y Snapping candidates (Top, Center, Bottom)
    const targetYPoints = [
      { pos: targetTop },
      { pos: targetCenterY },
      { pos: targetBottom },
    ];

    for (const tPt of targetYPoints) {
      for (const anchor of yAnchors) {
        const diff = anchor.pos - tPt.pos;
        const absDiff = Math.abs(diff);

        if (absDiff <= threshold && absDiff < minDiffY) {
          minDiffY = absDiff;
          bestDy = diff;

          const lineStart = Math.min(targetLeft, anchor.startX) - 12;
          const lineEnd = Math.max(targetRight, anchor.endX) + 12;

          horizontalLines.length = 0;
          horizontalLines.push({
            orientation: 'horizontal',
            position: anchor.pos,
            start: lineStart,
            end: lineEnd,
            type: anchor.type,
          });
        } else if (absDiff <= threshold && Math.abs(absDiff - minDiffY) < 0.001) {
          const lineStart = Math.min(targetLeft, anchor.startX) - 12;
          const lineEnd = Math.max(targetRight, anchor.endX) + 12;
          horizontalLines.push({
            orientation: 'horizontal',
            position: anchor.pos,
            start: lineStart,
            end: lineEnd,
            type: anchor.type,
          });
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // 2. Grid Snapping Fallback (if enabled and no element snap occurred)
  // -------------------------------------------------------------------------
  if (config.snapToGrid && config.gridSize && config.gridSize > 0) {
    const gridSize = config.gridSize;

    if (minDiffX > threshold) {
      const nearestGridX = Math.round(targetLeft / gridSize) * gridSize;
      const diffX = nearestGridX - targetLeft;
      if (Math.abs(diffX) <= threshold) {
        bestDx = diffX;
        verticalLines.push({
          orientation: 'vertical',
          position: nearestGridX,
          start: targetTop - 12,
          end: targetBottom + 12,
          type: 'grid',
        });
      }
    }

    if (minDiffY > threshold) {
      const nearestGridY = Math.round(targetTop / gridSize) * gridSize;
      const diffY = nearestGridY - targetTop;
      if (Math.abs(diffY) <= threshold) {
        bestDy = diffY;
        horizontalLines.push({
          orientation: 'horizontal',
          position: nearestGridY,
          start: targetLeft - 12,
          end: targetRight + 12,
          type: 'grid',
        });
      }
    }
  }

  return {
    x: Math.round(target.x + bestDx),
    y: Math.round(target.y + bestDy),
    dx: bestDx,
    dy: bestDy,
    lines: [...verticalLines, ...horizontalLines],
  };
}

/**
 * High-performance SVG overlay renderer for snapping alignment guides.
 */
export class SnappingGuidesRenderer {
  private svg: SVGSVGElement;
  private isMounted = false;

  constructor() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('class', 'moodboard-snapping-guides absolute inset-0 pointer-events-none');
    this.svg.style.position = 'absolute';
    this.svg.style.top = '0';
    this.svg.style.left = '0';
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';
    this.svg.style.zIndex = '9999';
    this.svg.style.pointerEvents = 'none';
    this.svg.style.overflow = 'visible';
  }

  public mount(container: HTMLElement) {
    if (!this.isMounted) {
      container.appendChild(this.svg);
      this.isMounted = true;
    }
  }

  public unmount() {
    if (this.isMounted && this.svg.parentElement) {
      this.svg.parentElement.removeChild(this.svg);
      this.isMounted = false;
    }
  }

  public render(lines: SnapLine[], canvasWidth: number, canvasHeight: number) {
    this.svg.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);
    this.svg.innerHTML = '';

    if (lines.length === 0) return;

    const fragment = document.createDocumentFragment();

    for (const line of lines) {
      const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      if (line.orientation === 'vertical') {
        lineEl.setAttribute('x1', `${line.position}`);
        lineEl.setAttribute('y1', `${Math.max(0, line.start)}`);
        lineEl.setAttribute('x2', `${line.position}`);
        lineEl.setAttribute('y2', `${Math.min(canvasHeight, line.end)}`);
      } else {
        lineEl.setAttribute('x1', `${Math.max(0, line.start)}`);
        lineEl.setAttribute('y1', `${line.position}`);
        lineEl.setAttribute('x2', `${Math.min(canvasWidth, line.end)}`);
        lineEl.setAttribute('y2', `${line.position}`);
      }

      // Visual styling based on alignment type
      if (line.type === 'canvas') {
        lineEl.setAttribute('stroke', '#10b981'); // Emerald for canvas boundaries/center
        lineEl.setAttribute('stroke-width', '1.25');
        lineEl.setAttribute('stroke-dasharray', '4,3');
        lineEl.setAttribute('opacity', '0.9');
      } else if (line.type === 'center') {
        lineEl.setAttribute('stroke', '#3b82f6'); // Sky blue for center alignment
        lineEl.setAttribute('stroke-width', '1.25');
        lineEl.setAttribute('stroke-dasharray', '3,2');
        lineEl.setAttribute('opacity', '0.9');
      } else if (line.type === 'grid') {
        lineEl.setAttribute('stroke', '#8b5cf6'); // Purple for grid
        lineEl.setAttribute('stroke-width', '1');
        lineEl.setAttribute('stroke-dasharray', '2,2');
        lineEl.setAttribute('opacity', '0.6');
      } else {
        // Standard edge snapping: Warm Caramel accent
        lineEl.setAttribute('stroke', '#c98a46');
        lineEl.setAttribute('stroke-width', '1.5');
        lineEl.setAttribute('opacity', '0.95');
      }

      fragment.appendChild(lineEl);
    }

    this.svg.appendChild(fragment);
  }

  public clear() {
    this.svg.innerHTML = '';
  }

  public destroy() {
    this.unmount();
    this.clear();
  }
}
