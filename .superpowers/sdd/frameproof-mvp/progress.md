# SDD ledger — plan: docs/superpowers/plans/2026-08-25-frameproof-mvp.md

## Pre-flight Conflict Scan
| Task Pair | Produces / Consumes | Scan Result |
|---|---|---|
| Task 1.1 / Task 1.2 | Package & styles -> Layouts | Clean - Tailwind v4 tokens consumed by BaseLayout & common components |
| Task 2.1 / Task 2.2 | Types & Stores -> Media Loader & Web Worker | Clean - ImageItem and store actions consumed by decoder & loader |
| Task 3.1 / Task 3.2 | Layout engines -> Canvas Renderer | Clean - Calculated bounds fed directly to 2D renderer |
| Task 4.1 / Task 4.2 / Task 4.3 | Stores & Engines -> Review, Exporters & Container Island | Clean - Standard export contracts (Blob, PDF, CSV, Manifest) |
| Task 5.1 / Task 5.2 / Task 5.3 | SEO metadata & schemas -> 13 MPA routes | Clean - Exact schema mapping from seo.md |

## Tasks
- [ ] Task 1.1: Project Setup & Tailwind CSS v4 Configuration
- [ ] Task 1.2: Core Layouts & Common Components
- [ ] Task 2.1: Types, Stores & State Management
- [ ] Task 2.2: Media Ingestion & Web Worker Decoder
- [ ] Task 3.1: Template Registry & Layout Calculators
- [ ] Task 3.2: Canvas 2D Real-Time Renderer
- [ ] Task 4.1: Review Toolbar & Keyboard Shortcuts
- [ ] Task 4.2: Export Engine (PNG, JPEG, PDF, CSV, Manifest)
- [ ] Task 4.3: Main Workspace Container Island
- [ ] Task 5.1: SEO Metadata Registry & JSON-LD Builders
- [ ] Task 5.2: Public Marketing & Tool Entry Routes
- [ ] Task 5.3: Guides, Comparison, Trust & Utility Routes
- [ ] Task 5.4: QA, Verification & Pre-Flight Quality Gate
