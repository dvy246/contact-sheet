<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->

---
name: Make Contact Sheet
description: Browser-first photo preparation, contact-sheet, collage, and review workspace
---

# Design System: Make Contact Sheet

## Overview
**Creative North Star: "The Archival Matte"**

Make Contact Sheet operates as a quiet, authoritative space that honors the photographer’s work. The interface must recede entirely, allowing the photos to provide all the visual richness and color the page needs. It bridges the precision of a physical light table with the professional trust of an archival gallery matte. 

The workspace is built for a photographer reviewing work late at night—relying on dark, restrained surfaces to reduce eye strain and evaluate true color. The marketing presence, conversely, provides a crisp, well-lit gallery environment to persuade and present. Every label, control, and bounding box is functional, verifiable, and precise.

**Key Characteristics:**
- **Show the work, not the tool:** Photos are the sole source of visual interest.
- **The grid is the motif:** The structure of contact sheets is used as a functional visual element, never as mere decoration.
- **Progressive disclosure:** One clear action at a time to prevent settings overload.
- **Quiet authority:** The language and aesthetic carry the weight of a professional studio tool.

## User Workflow Mapping

### Contact Sheet Workflow
Map each step to its UI treatment:
```text
Import → [Drop zone: full-width, centered, dashed border, prominent]
         ↓
Organize → [Thumbnail grid: sortable, draggable, status badges]
         ↓  
Configure → [Side panel or drawer: layout controls, template picker]
         ↓
Preview → [Full-width rendered contact sheet with zoom]
         ↓
Review → [Overlay states on thumbnails: keep/reject/flag badges]
         ↓
Export → [Bottom bar or drawer: format, quality, filename options]
```

### Collage Workflow
Map each step similarly:
```text
Import → [Same drop zone as contact sheets]
         ↓
Template → [Template gallery: cards with preview, dimensions, use case]
         ↓
Place → [Canvas with cells, drag-to-place, crop/contain toggle]
         ↓
Customize → [Inline controls: spacing, background, borders]
         ↓
Preview → [Full-size preview with actual dimensions]
         ↓
Export → [Same export drawer as contact sheets]
```

### State Transitions
- **Animation/transition between states:** One authored moment (e.g., exponential ease-out from an already-visible default).
- **What persists:** User selections, file caches, workflow settings.
- **What resets:** Active ephemeral states (focus, hover, open dropdowns).
- **Error recovery at each step:** In-context and non-destructive. A failed export retains all configuration.

### Screen-to-Mode Mapping
| Screen | Mode | Primary Action | Secondary Actions |
|---|---|---|---|
| Landing page | Persuade | Start creating | Learn more, view templates |
| Import/drop zone | Operate | Add files | Sort, filter |
| Grid preview | Operate | Configure layout | Review, reorder |
| Review overlay | Operate | Keep/reject/flag | Filter by status, notes |
| Export drawer | Operate | Download | Change format, quality |
| Template gallery | Operate | Select template | Preview, customize |

### Progressive Disclosure Mapping
- **Level 0 (first visit):** Drop zone + one CTA. Nothing else.
- **Level 1 (files imported):** Grid + basic controls (columns, page size)
- **Level 2 (layout configured):** Preview + review controls appear
- **Level 3 (review started):** Filter, export, status summary appear
- **Level 4 (power user):** Advanced settings, presets, keyboard shortcuts

## Colors
The palette is deeply restrained, built around warm slates and a single, precise accent color to direct primary actions.

### Primary
- **Workspace Backgrounds:** [to be resolved during implementation] — Dark warm slates (avoiding pure black or cool tech grays).
- **Marketing Backgrounds:** [to be resolved during implementation] — Crisp, high-contrast light surfaces (explicitly avoiding the AI-slop warm cream/terracotta default).
- **Accent:** [to be resolved during implementation] — A single, decisive color (e.g., a technical amber or safety orange) used strictly for primary interactions.

### Neutral
- **Surfaces & Borders:** [to be resolved during implementation] — Tints and shades of the base slate. 
- **Text:** [to be resolved during implementation] — Primary text must meet ≥4.5:1 contrast; secondary text is tinted from the hue, never just gray.

### Named Rules
- **No Category-Based Modes:** Light/dark themes are chosen by the use scene (Workspace = Dark, Marketing = Light), not toggled arbitrarily by the user.
- **Color as Function:** Zero-offset colored halos are strictly decoration and forbidden. Photos provide the color.

## Typography
Fonts must be purposeful. We explicitly avoid default tech/startup choices (Inter, Space Grotesk, DM Sans) and editorial cliches (Fraunces, Playfair). The type must carry a geometric or stark humanist precision that does not compete with the images.

**Display Font:** [to be resolved during implementation]
**Body Font:** [to be resolved during implementation]
**Character:** Legible, professional, structural. The interface recedes.

### Hierarchy
- **Display:** Max 6rem.
- **H1:** [to be resolved during implementation]
- **H2:** [to be resolved during implementation]
- **H3:** [to be resolved during implementation]
- **Body:** 65-75ch measure for readability.
- **Small:** [to be resolved during implementation]
- **Caption:** [to be resolved during implementation]

### Named Rules
- **Tracking Floor:** Never track below -0.04em.
- **No System Voices for Display:** System fonts are not used for display/brand voices.
- **No Monospace Costumes:** Do not use monospace simply to look "technical."
- **Balanced Headings:** Obvious scale and weight steps between levels.

## Layout
The layout is governed by the contact-sheet grid, establishing a strict, rhythmic division of space.

### Spacing & Alignment System
A comprehensive alignment system ensures the grid motif is felt throughout the workspace.

**Alignment Rules:**
- **Grid alignment:** All content sits on a baseline grid.
- **Horizontal alignment:** Left-aligned text; centered headings are reserved ONLY for the hero section.
- **Vertical rhythm:** Consistent line-height multiples.
- **Component alignment:** Buttons, inputs, and labels align to a shared mathematical grid, but adjust for optical weight.
- **Icon alignment:** Icons sit relative to text based on optical center, not mathematical center.

**Whitespace Rules:**
- Never let adjacent sections have the same spacing — vary density to guide the eye.
- More space above a heading than below it (always).
- Tighter spacing inside components, generous spacing between them.
- Mobile spacing is proportionally reduced but maintains the exact same hierarchy.

### Spacing Scale
The complete 8-step spacing scale and usage rules:

| Token | Value | Usage |
|---|---|---|
| --space-xs | 4px | **Intimate:** Tight element spacing. Between an icon and its label, or an input and helper text. |
| --space-sm | 8px | **Intimate:** Between a heading and its first paragraph, or related component items. |
| --space-md | 16px | **Related:** Elements in the same group (form fields, list items). |
| --space-lg | 24px | **Grouped:** Related components within a section. |
| --space-xl | 32px | **Grouped (Wide):** Between card groups or control clusters. |
| --space-2xl | 48px | **Sectional:** Between minor page sections (mobile) or significant subsections. |
| --space-3xl | 80px | **Sectional / Landmark:** Between major page sections. |
| --space-4xl | 120px | **Landmark:** Between page landmarks (hero → content, content → footer). |

### Separation Hierarchy
The 5 levels of visual separation, each with its specific mechanism:
1. **Intimate (4-8px):** Related elements within a component (icon + label, input + helper text).
2. **Related (16px):** Elements in the same group (form fields, list items).
3. **Grouped (24-32px):** Components within a section (card groups, control clusters).
4. **Sectional (48-80px):** Between major page sections.
5. **Landmark (80-120px):** Between page landmarks (hero→content, content→footer).

```text
+---------------------------------------------------------+
|  [Header]                                               |
+---------------------------------------------------------+
|                                                         |
|  <-- Landmark (80-120px) -->                            |
|                                                         |
|  +---------------------------------------------------+  |
|  | Section Title                                     |  |
|  |                                                   |  |
|  | <-- Sectional (48-80px) -->                       |  |
|  |                                                   |  |
|  | +-----------------------+ +---------------------+ |  |
|  | | Grouped (24-32px)     | | Grouped (24-32px)   | |  |
|  | | +-------------------+ | | +-----------------+ | |  |
|  | | | Related (16px)    | | | |                 | | |  |
|  | | |                   | | | |                 | | |  |
|  | | | [Icon] (4-8px)    | | | |                 | | |  |
|  | | | [Label] Intimate  | | | |                 | | |  |
|  | | +-------------------+ | | +-----------------+ | |  |
|  | +-----------------------+ +---------------------+ |  |
|  +---------------------------------------------------+  |
+---------------------------------------------------------+
```

### Breakpoints
| Name | Min width |
|---|---|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

## Elevation & Depth
Elevation is used sparingly and realistically to distinguish the canvas from the tools.

### Elevation Levels
- **Layer 0 (Canvas):** The base workspace.
- **Layer 1 (Panels):** Modals, floating toolbars, and context menus.

### Named Rules
- **Realistic Shadows:** Shadows carry offset and a soft blur. No hard-offset shadows (unless adopting a strict neobrutalist world, which we are not).
- **No Ghost Cards:** Never mix a border AND a shadow on the same element.
- **No Glassmorphism:** Glass and blur effects are strictly prohibited as decoration.

## Shapes
The form language is structural and sharp, echoing photographic prints and frames.

### Named Rules
- **Restrained Radii:** Card border-radii never exceed 12-16px. Sharp cuts are preferred for images.
- **Pills for Controls Only:** Fully rounded (pill) shapes are reserved exclusively for small interactive controls/badges.
- **Symmetric Borders:** No colored border-left/right above 1px on cards or alerts.

## Do's and Don'ts

### Do:
- **Show the work:** Ensure user photos dominate the visual hierarchy.
- **Label accurately:** Every filename, dimension, and export setting must be verifiable. Filename accuracy is trust.
- **Design the export:** Ensure downloaded artifacts (collages, sheets) look professional-grade; the export *is* the product.
- **Animate purposefully:** Use one authored motion moment (e.g., exponential ease-out from an already-visible default). No scattered effects.
- **Write exact copy:** Controls name their action. Errors name the problem and the recovery path.

### Don'ts:
- **NO KICKERS/EYEBROWS:** Absolutely no small uppercase kickers above headings. This is an absolute ban.
- **NO HERO METRICS:** Do not use the "big number, small label, accent color" template.
- **NO SAME-SIZE CARDS:** Do not use same-size icon + heading + text cards to structure pages.
- **NO DECORATIVE NUMBERS:** No section numbers (01/02/03) unless the sequence explicitly carries sequential information.
- **NO GRADIENTS:** Gradient text and repeating-linear-gradient stripes (without a blueprint/canvas rationale) are banned.
- **NO EMOJI ICONS:** Do not use Unicode glyphs or emojis standing in for a proper icon system.
- **NO SKETCH SVG:** Avoid sketch-style or quirky SVG illustrations. Keep visual assets photographic or strictly structural.
