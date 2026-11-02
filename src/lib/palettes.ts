/**
 * Header colour palettes ("flavours"). Truffle is the site default and sets no
 * `data-palette` attribute; the others are applied by `html[data-palette]`
 * rules generated into `src/styles/palettes.css`.
 *
 * The hex values here only paint the picker's preview swatches, so each one
 * shows its own colours whichever palette is active. Keep them in sync with
 * palettes.css (accent / light surface / dark surface).
 *
 * The ids are mirrored in BaseLayout's inline anti-flash script allowlist.
 */
export const DEFAULT_PALETTE = 'truffle';

export const PALETTES = [
  { id: 'truffle', labelKey: 'flavourTruffle', accent: '#9c5a1c', cream: '#f5eee5', cocoa: '#251a15' },
  { id: 'pistachio', labelKey: 'flavourPistachio', accent: '#4f822c', cream: '#edf1e8', cocoa: '#1b1e15' },
  { id: 'strawberry', labelKey: 'flavourStrawberry', accent: '#ca4568', cream: '#f8ebee', cocoa: '#25191c' },
  { id: 'blueberry', labelKey: 'flavourBlueberry', accent: '#4f6fd4', cream: '#eaeff9', cocoa: '#181d26' },
  { id: 'mint', labelKey: 'flavourMint', accent: '#028476', cream: '#e7f2ef', cocoa: '#14201c' },
  { id: 'mango', labelKey: 'flavourMango', accent: '#ba5a00', cream: '#f6eee3', cocoa: '#241b10' },
  { id: 'ube', labelKey: 'flavourUbe', accent: '#8e5ebf', cream: '#f1edf7', cocoa: '#1f1b25' },
  { id: 'cotton-candy', labelKey: 'flavourCottonCandy', accent: '#425b9a', cream: '#fff6dc', cocoa: '#ff95a5' },
  { id: 'butterscotch', labelKey: 'flavourButterscotch', accent: '#d4621a', cream: '#fef3e2', cocoa: '#2a1a0e' },
] as const;

export type PaletteId = (typeof PALETTES)[number]['id'];
