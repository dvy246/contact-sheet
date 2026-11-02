import type { Locale } from '../config';

/**
 * Localized names and descriptions for collage templates, contact sheet presets
 * and mood board templates, keyed by template id. The English source of truth
 * stays in the engine data (templates.ts / moodboardStore.ts); a missing id here
 * falls back to it via `templateCopy()`, so adding a template never breaks a page
 * — but it does leave that card in English until it is added below.
 *
 * Without this file the localized template hubs served English template copy
 * under translated URLs, which Google treats as untranslated duplicates.
 */
type TemplateKind = 'collage' | 'contactSheet' | 'moodBoard';
type Copy = { name: string; description: string };

const TEMPLATE_COPY: Record<Exclude<Locale, 'en'>, Record<TemplateKind, Record<string, Copy>>> = {
  "es": {
    "collage": {
      "side-by-side-2": {
        "name": "Lado a lado (2 fotos)",
        "description": "Comparación horizontal limpia o presentación de dos retratos"
      },
      "three-strip-h": {
        "name": "Tira de tres fotos",
        "description": "Tríptico horizontal para contar una historia"
      },
      "three-strip-v": {
        "name": "Tríptico vertical (3 fotos)",
        "description": "Tres encuadres panorámicos apilados para historias en móvil y secuencias cinematográficas"
      },
      "film-strip-4": {
        "name": "Tira de película cuádruple (4 fotos)",
        "description": "Cuatro encuadres verticales uno junto a otro en una tira panorámica cinematográfica 16:9"
      },
      "three-hero-split": {
        "name": "Principal + 2 apiladas",
        "description": "Una foto principal destacada a la izquierda y 2 fotos de detalle a la derecha"
      },
      "hero-golden-quad": {
        "name": "Principal dominante + 3 apiladas",
        "description": "Una foto principal que ocupa dos tercios a la izquierda y tres encuadres horizontales de detalle apilados a la derecha"
      },
      "cinematic-split": {
        "name": "Cabecera cinematográfica + 3 insertos",
        "description": "Una cabecera horizontal ancha en la parte superior y tres encuadres de detalle iguales debajo"
      },
      "grid-2x2": {
        "name": "Cuadrícula cuadrada 2×2",
        "description": "Cuadrícula cuadrada clásica y equilibrada de 4 fotos"
      },
      "grid-3x3": {
        "name": "Cuadrícula cuadrada 3×3",
        "description": "Mood board de 9 fotos y escaparate para galería de Instagram"
      },
      "editorial-mosaic-5": {
        "name": "Editorial con foto central (5 fotos)",
        "description": "Un retrato vertical dominante en el centro, flanqueado por dos encuadres apilados a cada lado"
      },
      "grid-2x3-portrait": {
        "name": "Retrato social 2×3 (6 fotos)",
        "description": "Dos columnas de tres encuadres verticales ajustadas a feeds de Instagram en formato 4:5"
      },
      "center-hero-cross": {
        "name": "Foco central (5 fotos)",
        "description": "Cuatro fotos en las esquinas enmarcan una imagen central destacada en un mood board cuadrado"
      },
      "hero-bottom-grid-5": {
        "name": "Panorámica + 4 miniaturas",
        "description": "Un paisaje panorámico de situación en la parte superior y cuatro miniaturas de detalle debajo"
      },
      "social-portrait-4-5": {
        "name": "Retrato social (4:5)",
        "description": "1 foto horizontal arriba + 2 retratos verticales abajo"
      },
      "social-story-9-16": {
        "name": "Historia social (9:16)",
        "description": "Historia vertical para móvil con cabecera principal y dos encuadres inferiores"
      },
      "before-after": {
        "name": "Comparación antes y después",
        "description": "Presentación dividida y rotulada para retoque y edición de fotos"
      },
      "headline-duo-3-2": {
        "name": "Dúo editorial (3:2)",
        "description": "Dúo asimétrico 55/45 para combinar retrato y textura, con márgenes de bellas artes"
      },
      "portfolio-wall": {
        "name": "Muro mosaico de portafolio",
        "description": "Collage arquitectónico asimétrico de 4 fotos: una alta, dos pequeñas y una ancha"
      },
      "collage-8x10-2up-5x7": {
        "name": "Dos 5x7 en 8x10 (ahorro de impresión)",
        "description": "Dos celdas 5x7 apiladas o divididas en una hoja 8x10"
      },
      "collage-8x10-4up-4x5": {
        "name": "Cuatro 4x5 en 8x10 (ahorro de impresión)",
        "description": "Cuadrícula 2x2 de celdas con proporción 4x5 en una hoja 8x10"
      },
      "collage-8x10-8up-wallet": {
        "name": "Ocho fotos de cartera en 8x10",
        "description": "Cuadrícula 2x4 de celdas tamaño cartera en una hoja 8x10"
      },
      "poster-16x20-hero-grid": {
        "name": "Póster 16×20: principal + 4 insertos",
        "description": "1 foto principal grande de 11×14 con 4 insertos de detalle apilados en formato póster 16×20"
      },
      "poster-24x36-storyboard": {
        "name": "Storyboard cinematográfico 24×36 (9 fotos)",
        "description": "Cuadrícula cinematográfica de 9 fotos con diseño 3×3 normalizado, ajustada para pósteres 24×36"
      },
      "poster-16x20-gang-sheet": {
        "name": "Seis 5×7 en 16×20 (hoja agrupada)",
        "description": "6 copias 5×7 por hoja para ahorrar en impresión, en formato póster 16×20"
      },
      "poster-24x36-gang-sheet": {
        "name": "Doce por hoja en 24×36 (hoja agrupada)",
        "description": "12 copias por hoja para ahorrar en impresión, en formato póster grande 24×36"
      }
    },
    "contactSheet": {
      "a4-portrait-proof": {
        "name": "Hoja de pruebas A4 vertical",
        "description": "Formato estándar de revisión impresa (cuadrícula 4×5, 20 fotos por página)"
      },
      "a4-landscape-proof": {
        "name": "Hoja de pruebas A4 horizontal",
        "description": "Revisión impresa en formato ancho horizontal (cuadrícula 5×4)"
      },
      "us-letter-portrait": {
        "name": "Prueba US Letter vertical",
        "description": "Hoja de revisión impresa en el estándar norteamericano"
      },
      "us-letter-landscape": {
        "name": "Prueba US Letter horizontal",
        "description": "Hoja de revisión en formato ancho estándar norteamericano"
      },
      "16-9-digital-board": {
        "name": "Panel de revisión digital 16:9",
        "description": "Diseño de presentación optimizado para pantalla 1080p/4K (cuadrícula 4×3)"
      },
      "client-selection-sheet": {
        "name": "Hoja de selección para el cliente",
        "description": "Fotos grandes (cuadrícula 3×4) con números de índice e indicadores de estado"
      },
      "filename-first-proof": {
        "name": "Hoja de pruebas centrada en nombres de archivo",
        "description": "Cuadrícula densa 4×6 que maximiza el número de miniaturas y la legibilidad de las etiquetas"
      },
      "gallery-white-print": {
        "name": "Hoja de impresión blanco galería",
        "description": "Papel blanco, filetes finos y banda con título: para imprimir y archivar"
      },
      "film-strip-index": {
        "name": "Índice de tiras de 35mm",
        "description": "Índice 5×7 muy denso en orden de fotogramas, solo con números: la costumbre del cuarto oscuro"
      },
      "square-6x6-proof": {
        "name": "Prueba cuadrada 6×6",
        "description": "Página cuadrada con fotogramas recortados 4×4: para formato medio y trabajos de encuadre cuadrado"
      },
      "dense-thumbnail-index": {
        "name": "Índice de sesión completa",
        "description": "6×8 = 48 fotogramas por página. Cabe una tarjeta entera en una o dos hojas"
      },
      "wedding-client-proof": {
        "name": "Prueba para cliente con título",
        "description": "4×3 horizontal con banda de título, números de página y marcas de conservar/descartar"
      },
      "casting-sheet": {
        "name": "Hoja de casting / talento",
        "description": "Fotogramas grandes 3×3 con el nombre impreso dentro de la foto"
      },
      "instagram-grid-preview": {
        "name": "Vista previa de cuadrícula de Instagram",
        "description": "Cuadrícula cuadrada 3×3 de fotogramas recortados, sin etiquetas: revisa el feed antes de publicar"
      },
      "storyboard-6up": {
        "name": "Storyboard de 6 viñetas",
        "description": "3×2 horizontal con viñetas numeradas y banda de título"
      },
      "studio-tech-exif": {
        "name": "Hoja técnica de estudio con EXIF",
        "description": "Fotogramas grandes 3×3 con etiquetas de metadatos de cámara, objetivo, diafragma, obturación e ISO"
      },
      "medium-format-6x7": {
        "name": "Prueba de película 120 6×7 (10 por hoja)",
        "description": "Fotogramas verticales 2×5 que reproducen el contacto completo de un rollo 120 de 10 exposiciones"
      },
      "detail-macro-8up": {
        "name": "Control de detalle y enfoque (8 por hoja)",
        "description": "Fotogramas panorámicos 4×2 sobre papel blanco limpio para evaluar el enfoque y la nitidez de las texturas"
      },
      "lookbook-spread-2up": {
        "name": "Doble página de lookbook (2 por hoja)",
        "description": "Dos encuadres de presentación extragrandes lado a lado con amplios márgenes de galería"
      },
      "social-storyboard-8up": {
        "name": "Storyboard para Reels y Shorts (8 por hoja)",
        "description": "Panel de presentación en pantalla 4×2 con tarjetas numeradas para marcar el ritmo del vídeo vertical"
      },
      "archival-mega-index-70": {
        "name": "Megaíndice de archivo de laboratorio (70 por hoja)",
        "description": "Índice denso de fotogramas 7×10 que reúne dos rollos completos de 36 exposiciones en una sola hoja"
      },
      "print-8x10-2up-5x7": {
        "name": "Dos 5×7 en hoja 8×10 (ahorro de impresión)",
        "description": "Ahorra dinero imprimiendo dos fotos 5×7 en una sola hoja 8×10 en la farmacia o el laboratorio"
      },
      "print-8x10-4up-4x5": {
        "name": "Cuatro 4×5 en hoja 8×10 (ahorro de impresión)",
        "description": "Imprime cuatro fotos 4×5 con precisión en una sola hoja 8×10"
      },
      "print-8x10-8up-wallet": {
        "name": "Ocho fotos de cartera en 8×10",
        "description": "Imprime ocho fotos tamaño cartera de 2.5×3.5 en una sola hoja 8×10"
      },
      "print-8x10-full": {
        "name": "Impresión 8×10 a hoja completa",
        "description": "Formato de impresión estándar 8×10 con bordes opcionales"
      },
      "poster-16x20-gang": {
        "name": "Hoja agrupada 16×20 (6 por hoja)",
        "description": "Seis copias 5×7 en una hoja de póster 16×20 (cuadrícula 2×3) para ahorrar en la farmacia o el laboratorio"
      },
      "poster-24x36-gang": {
        "name": "Hoja agrupada para póster grande 24×36 (12 por hoja)",
        "description": "Doce copias en un póster grande 24×36 (cuadrícula 3×4) para imprimir por lotes de forma eficiente"
      },
      "print-11x14-4up": {
        "name": "Cuatro por hoja en 11×14 (ahorro de impresión)",
        "description": "Cuatro fotos en una hoja de póster pequeño 11×14 (cuadrícula 2×2)"
      }
    },
    "moodBoard": {
      "editorial-photoshoot": {
        "name": "Sesión editorial",
        "description": "Retrato principal con encuadres de detalle, muestras de color y notas de vestuario del director."
      },
      "lighting-concept": {
        "name": "Panel de iluminación y concepto",
        "description": "Desglose técnico de iluminación con varios puntos de luz, notas de equipo y relaciones de sombra."
      },
      "warm-film-mood": {
        "name": "Ambiente de película cálido",
        "description": "Marcos estilo Polaroid, inclinaciones sutiles, grano de película vintage y paleta de color Kodak."
      },
      "fashion-lookbook": {
        "name": "Lookbook de moda y estilismo",
        "description": "Siluetas verticales de lookbook, muestras macro de tejidos y estudios de poses de modelo."
      },
      "minimalist-clean": {
        "name": "Minimalista y limpio",
        "description": "Amplio espacio negativo, paleta de galería en crema claro y geometría equilibrada."
      },
      "color-story": {
        "name": "Historia de color y estudio de paleta",
        "description": "Muestras de color horizontales destacadas junto a fotografías de inspiración con tonos a juego."
      },
      "analog-triptych-study": {
        "name": "Tríptico analógico en película 120",
        "description": "3 fotogramas grandes de formato medio con referencias de textura de grano y notas de relación de exposición."
      },
      "high-fashion-spread": {
        "name": "Lookbook de pasarela de alta costura",
        "description": "Diseño editorial a doble página con retrato principal de pasarela y notas sobre materiales de estilismo."
      },
      "cinematic-storyboard-grid": {
        "name": "Storyboard cinematográfico y concepto de escena",
        "description": "Storyboard de director en panorámico 16:9 con progresión narrativa de escenas y etiquetas de iluminación."
      },
      "monochrome-architecture": {
        "name": "Cuadrícula arquitectónica monocromática",
        "description": "Estudio estructural limpio de alto contraste con espacio negativo y geometría brutalista."
      }
    }
  },
  "de": {
    "collage": {
      "side-by-side-2": {
        "name": "Nebeneinander (2 Fotos)",
        "description": "Klarer horizontaler Vergleich oder Doppelporträt"
      },
      "three-strip-h": {
        "name": "Dreierstreifen",
        "description": "Horizontales Triptychon zum Erzählen einer Bildgeschichte"
      },
      "three-strip-v": {
        "name": "Vertikales Triptychon (3 Fotos)",
        "description": "Drei gestapelte Panoramabilder für Mobile Stories und filmische Sequenzen"
      },
      "film-strip-4": {
        "name": "Filmstreifen (4 Fotos)",
        "description": "Vier Hochformatbilder nebeneinander in einem filmischen 16:9-Breitbildstreifen"
      },
      "three-hero-split": {
        "name": "Hauptbild + 2 gestapelt",
        "description": "Ein dominantes Hauptbild links, zwei Detailaufnahmen rechts"
      },
      "hero-golden-quad": {
        "name": "Großes Hauptbild + 3 gestapelt",
        "description": "Ein Hauptbild über zwei Drittel links, drei gestapelte Querformat-Details rechts"
      },
      "cinematic-split": {
        "name": "Filmischer Header + 3 Details",
        "description": "Ein breites Querformat oben, drei gleich große Detailbilder darunter"
      },
      "grid-2x2": {
        "name": "2×2-Quadratraster",
        "description": "Klassisches, ausgewogenes Raster mit 4 Fotos"
      },
      "grid-3x3": {
        "name": "3×3-Quadratraster",
        "description": "9 Fotos für Moodboards und Instagram-Galerien"
      },
      "editorial-mosaic-5": {
        "name": "Editorial mit Mittelbild (5 Fotos)",
        "description": "Dominantes Hochformat in der Mitte, links und rechts je zwei gestapelte Bilder"
      },
      "grid-2x3-portrait": {
        "name": "Social Hochformat 2×3 (6 Fotos)",
        "description": "Zwei Spalten mit je drei Hochformatbildern, abgestimmt auf Instagram-Feeds im 4:5-Format"
      },
      "center-hero-cross": {
        "name": "Zentraler Fokus (5 Fotos)",
        "description": "Vier Eckbilder rahmen ein markantes Mittelbild in einem quadratischen Moodboard"
      },
      "hero-bottom-grid-5": {
        "name": "Panorama + 4 Miniaturen",
        "description": "Ein Panorama als Establishing Shot oben, vier Detailminiaturen darunter"
      },
      "social-portrait-4-5": {
        "name": "Social Hochformat (4:5)",
        "description": "Ein Querformat oben, zwei Hochformatkacheln unten"
      },
      "social-story-9-16": {
        "name": "Social Story (9:16)",
        "description": "Vertikale Mobile Story mit Hauptbild oben und zwei Bildern unten"
      },
      "before-after": {
        "name": "Vorher-Nachher-Vergleich",
        "description": "Beschriftete Gegenüberstellung für Retusche und Bildbearbeitung"
      },
      "headline-duo-3-2": {
        "name": "Editorial-Duo (3:2)",
        "description": "Asymmetrisches 55/45-Duo für Porträt und Textur, mit Fine-Art-Rand"
      },
      "portfolio-wall": {
        "name": "Portfolio-Mosaikwand",
        "description": "Asymmetrische Collage mit 4 Fotos: ein hohes, zwei kleine, ein breites"
      },
      "collage-8x10-2up-5x7": {
        "name": "Zwei 5x7 auf 8x10 (Druck-Sparer)",
        "description": "Zwei 5x7-Felder übereinander bzw. nebeneinander auf 8x10"
      },
      "collage-8x10-4up-4x5": {
        "name": "Vier 4x5 auf 8x10 (Druck-Sparer)",
        "description": "2x2-Raster mit Feldern im 4x5-Format auf 8x10"
      },
      "collage-8x10-8up-wallet": {
        "name": "Acht Passbilder auf 8x10",
        "description": "2x4-Raster mit Passbildfeldern auf 8x10"
      },
      "poster-16x20-hero-grid": {
        "name": "16×20-Poster: Hauptbild + 4 Details",
        "description": "Großes 11×14-Hauptbild mit 4 gestapelten Detailbildern im 16×20-Posterformat"
      },
      "poster-24x36-storyboard": {
        "name": "24×36-Filmstoryboard (9 Fotos)",
        "description": "Filmisches 3×3-Raster mit 9 Fotos, abgestimmt auf 24×36-Posterdrucke"
      },
      "poster-16x20-gang-sheet": {
        "name": "Sechs 5×7 auf 16×20 (Sammelbogen)",
        "description": "6 Abzüge im Format 5×7 auf einem 16×20-Poster: spart Druckkosten"
      },
      "poster-24x36-gang-sheet": {
        "name": "Zwölf auf 24×36 (Sammelbogen)",
        "description": "12 Abzüge auf einem großen 24×36-Poster: spart Druckkosten"
      }
    },
    "contactSheet": {
      "a4-portrait-proof": {
        "name": "A4-Kontaktbogen hoch",
        "description": "Standardformat für die Druckabstimmung (4×5-Raster, 20 Fotos pro Seite)"
      },
      "a4-landscape-proof": {
        "name": "A4-Kontaktbogen quer",
        "description": "Querformat für die Druckabstimmung (5×4-Raster)"
      },
      "us-letter-portrait": {
        "name": "US-Letter-Kontaktbogen hoch",
        "description": "Nordamerikanisches Standardformat für die Druckabstimmung"
      },
      "us-letter-landscape": {
        "name": "US-Letter-Kontaktbogen quer",
        "description": "Nordamerikanisches Querformat für die Bildauswahl"
      },
      "16-9-digital-board": {
        "name": "16:9-Digitalboard",
        "description": "Bildschirmoptimiertes Präsentationslayout für 1080p/4K (4×3-Raster)"
      },
      "client-selection-sheet": {
        "name": "Kundenauswahlbogen",
        "description": "Große Fotos (3×4-Raster) mit Bildnummern und Statusmarkierungen"
      },
      "filename-first-proof": {
        "name": "Kontaktbogen mit Dateinamen",
        "description": "Dichtes 4×6-Raster mit möglichst vielen Miniaturen und gut lesbaren Beschriftungen"
      },
      "gallery-white-print": {
        "name": "Galerieweißer Druckbogen",
        "description": "Weißes Papier, feine Rahmenlinien, Titelzeile – zum Drucken und Archivieren"
      },
      "film-strip-index": {
        "name": "35mm-Streifenindex",
        "description": "Sehr dichter 5×7-Index in Bildreihenfolge, nur Nummern – wie früher in der Dunkelkammer"
      },
      "square-6x6-proof": {
        "name": "Quadratischer 6×6-Kontaktbogen",
        "description": "Quadratische Seite, 4×4 beschnittene Bilder – für Mittelformat und quadratische Ausschnitte"
      },
      "dense-thumbnail-index": {
        "name": "Index des ganzen Shootings",
        "description": "6×8 = 48 Bilder pro Seite. Eine komplette Speicherkarte auf ein bis zwei Bögen"
      },
      "wedding-client-proof": {
        "name": "Kunden-Kontaktbogen mit Titel",
        "description": "4×3 quer mit Titelzeile, Seitenzahlen und Behalten/Verwerfen-Markierungen"
      },
      "casting-sheet": {
        "name": "Casting-Bogen",
        "description": "3×3 große Bilder, Name direkt im Foto eingeblendet"
      },
      "instagram-grid-preview": {
        "name": "Instagram-Rastervorschau",
        "description": "Quadratisches 3×3 mit beschnittenen Bildern, ohne Beschriftung – Feed vor dem Posten prüfen"
      },
      "storyboard-6up": {
        "name": "Storyboard (6 pro Bogen)",
        "description": "3×2 quer mit nummerierten Panels und Titelzeile"
      },
      "studio-tech-exif": {
        "name": "Technischer EXIF-Bogen",
        "description": "3×3 große Bilder mit EXIF-Badges für Kamera, Objektiv, Blende, Verschlusszeit und ISO"
      },
      "medium-format-6x7": {
        "name": "120er-Film 6×7 (10 pro Bogen)",
        "description": "2×5 Hochformatbilder wie ein Kontaktabzug eines vollen 120er-Rollfilms mit 10 Aufnahmen"
      },
      "detail-macro-8up": {
        "name": "Detail- & Schärfekontrolle (8 pro Bogen)",
        "description": "4×2 Breitbildbilder auf weißem Papier zur Beurteilung von Fokus und Texturschärfe"
      },
      "lookbook-spread-2up": {
        "name": "Lookbook-Doppelseite (2 pro Bogen)",
        "description": "Zwei extragroße Bilder nebeneinander mit großzügigen Galerierändern"
      },
      "social-storyboard-8up": {
        "name": "Reels- & Shorts-Storyboard (8 pro Bogen)",
        "description": "4×2-Bildschirmboard mit nummerierten Karten zur Taktung vertikaler Videos"
      },
      "archival-mega-index-70": {
        "name": "Archiv-Großindex (70 pro Bogen)",
        "description": "Dichter 7×10-Index: zwei komplette Filme mit je 36 Aufnahmen auf einem Bogen"
      },
      "print-8x10-2up-5x7": {
        "name": "Zwei 5×7 auf 8×10 (Druck-Sparer)",
        "description": "Sparen Sie Geld: zwei 5×7-Fotos auf einem 8×10-Bogen im Drogeriemarkt oder Fotolabor drucken"
      },
      "print-8x10-4up-4x5": {
        "name": "Vier 4×5 auf 8×10 (Druck-Sparer)",
        "description": "Vier 4×5-Fotos passgenau auf einem 8×10-Bogen drucken"
      },
      "print-8x10-8up-wallet": {
        "name": "Acht Passbilder auf 8×10",
        "description": "Acht Fotos im Passbildformat 2.5×3.5 auf einem 8×10-Bogen drucken"
      },
      "print-8x10-full": {
        "name": "8×10 ganzseitig",
        "description": "Standard-8×10-Druck mit optionalem Rand"
      },
      "poster-16x20-gang": {
        "name": "16×20-Sammelbogen (6 pro Bogen)",
        "description": "Sechs 5×7-Abzüge auf einem 16×20-Posterbogen (2×3-Raster) – spart Kosten im Drogeriemarkt oder Labor"
      },
      "poster-24x36-gang": {
        "name": "24×36-Poster-Sammelbogen (12 pro Bogen)",
        "description": "Zwölf Abzüge auf einem großen 24×36-Poster (3×4-Raster) für effizienten Stapeldruck"
      },
      "print-11x14-4up": {
        "name": "Vier auf 11×14 (Druck-Sparer)",
        "description": "Vier Fotos auf einem kleinen 11×14-Posterbogen (2×2-Raster)"
      }
    },
    "moodBoard": {
      "editorial-photoshoot": {
        "name": "Editorial-Shooting",
        "description": "Hauptporträt mit Detailbildern, Farbfeldern und Styling-Notizen der Regie."
      },
      "lighting-concept": {
        "name": "Licht- & Konzeptboard",
        "description": "Technischer Lichtaufbau mit mehreren Lichtquellen, Equipment-Notizen und Lichtverhältnissen."
      },
      "warm-film-mood": {
        "name": "Warme Film-Stimmung",
        "description": "Polaroid-Rahmen, leichte Neigungen, Vintage-Filmkorn und Kodak-Farbpalette."
      },
      "fashion-lookbook": {
        "name": "Mode-Lookbook & Styling",
        "description": "Hochformatige Lookbook-Silhouetten, Stoffmuster im Makro und Posing-Studien."
      },
      "minimalist-clean": {
        "name": "Minimalistisch & klar",
        "description": "Viel Weißraum, helle Galeriepalette in Creme und ausgewogene Geometrie."
      },
      "color-story": {
        "name": "Farbgeschichte & Palette",
        "description": "Markante horizontale Farbfelder, kombiniert mit farblich abgestimmten Inspirationsfotos."
      },
      "analog-triptych-study": {
        "name": "Analoges 120er-Triptychon",
        "description": "3 große Mittelformatbilder mit Kornstruktur und Notizen zum Belichtungsverhältnis."
      },
      "high-fashion-spread": {
        "name": "High-Fashion-Laufsteg-Lookbook",
        "description": "Editorial-Doppelseite mit Laufsteg-Hauptporträt und Notizen zu Styling und Materialien."
      },
      "cinematic-storyboard-grid": {
        "name": "Filmisches Storyboard & Szenenkonzept",
        "description": "16:9-Regie-Storyboard mit erzählerischem Szenenablauf und Licht-Tags."
      },
      "monochrome-architecture": {
        "name": "Monochromes Architekturraster",
        "description": "Klare, kontrastreiche Strukturstudie mit Negativraum und brutalistischer Geometrie."
      }
    }
  },
  "fr": {
    "collage": {
      "side-by-side-2": {
        "name": "Côte à côte (2 photos)",
        "description": "Comparaison horizontale nette ou présentation de deux portraits"
      },
      "three-strip-h": {
        "name": "Bande de trois photos",
        "description": "Triptyque horizontal pour raconter une histoire"
      },
      "three-strip-v": {
        "name": "Triptyque vertical (3 photos)",
        "description": "Trois cadres panoramiques empilés pour les stories mobiles et les séquences cinématographiques"
      },
      "film-strip-4": {
        "name": "Bande film à quatre vues (4 photos)",
        "description": "Quatre cadres verticaux côte à côte dans une bande panoramique 16:9 au rendu cinéma"
      },
      "three-hero-split": {
        "name": "Photo phare + 2 empilées",
        "description": "Une photo phare à gauche, deux photos de détail à droite"
      },
      "hero-golden-quad": {
        "name": "Grande photo phare + 3 empilées",
        "description": "Une photo phare dominante sur les deux tiers gauches, trois cadres de détail horizontaux empilés à droite"
      },
      "cinematic-split": {
        "name": "Bandeau cinéma + 3 vignettes",
        "description": "Un large bandeau paysage en haut, trois cadres de détail identiques en bas"
      },
      "grid-2x2": {
        "name": "Grille carrée 2×2",
        "description": "Grille carrée classique et équilibrée de 4 photos"
      },
      "grid-3x3": {
        "name": "Grille carrée 3×3",
        "description": "Planche d'inspiration de 9 photos, idéale pour une galerie Instagram"
      },
      "editorial-mosaic-5": {
        "name": "Éditorial, portrait central (5 photos)",
        "description": "Un portrait vertical dominant au centre, encadré de deux cadres empilés de chaque côté"
      },
      "grid-2x3-portrait": {
        "name": "Portrait réseaux sociaux 2×3 (6 photos)",
        "description": "Deux colonnes de trois cadres verticaux calibrés pour le format portrait 4:5 d'Instagram"
      },
      "center-hero-cross": {
        "name": "Mise en avant centrale (5 photos)",
        "description": "Quatre photos d'angle encadrant une photo centrale mise en valeur, dans une planche carrée"
      },
      "hero-bottom-grid-5": {
        "name": "Panorama + 4 vignettes",
        "description": "Un paysage panoramique d'ouverture en haut, quatre vignettes de détail en dessous"
      },
      "social-portrait-4-5": {
        "name": "Portrait réseaux sociaux (4:5)",
        "description": "Une photo paysage en haut + deux vignettes portrait verticales en bas"
      },
      "social-story-9-16": {
        "name": "Story réseaux sociaux (9:16)",
        "description": "Story mobile verticale avec photo phare en tête et deux cadres en pied"
      },
      "before-after": {
        "name": "Comparaison avant/après",
        "description": "Présentation scindée et légendée pour la retouche et les corrections photo"
      },
      "headline-duo-3-2": {
        "name": "Duo éditorial (3:2)",
        "description": "Duo asymétrique 55/45 pour associer portrait et texture, avec marge façon tirage d'art"
      },
      "portfolio-wall": {
        "name": "Mur mosaïque portfolio",
        "description": "Collage architectural asymétrique de 4 photos : une haute, deux petites, une large"
      },
      "collage-8x10-2up-5x7": {
        "name": "Deux 5x7 sur un 8x10 (économie de tirage)",
        "description": "Deux cases 5x7 superposées ou côte à côte sur un 8x10"
      },
      "collage-8x10-4up-4x5": {
        "name": "Quatre 4x5 sur un 8x10 (économie de tirage)",
        "description": "Grille 2x2 de cases au ratio 4x5 sur un 8x10"
      },
      "collage-8x10-8up-wallet": {
        "name": "Huit photos format portefeuille sur un 8x10",
        "description": "Grille 2x4 de cases format portefeuille sur un 8x10"
      },
      "poster-16x20-hero-grid": {
        "name": "Poster 16×20, photo phare + 4 vignettes",
        "description": "Une grande photo phare 11×14 et 4 vignettes de détail empilées, au format poster 16×20"
      },
      "poster-24x36-storyboard": {
        "name": "Storyboard cinéma 24×36 (9 photos)",
        "description": "Grille cinéma de 9 photos en 3×3 normalisée, calibrée pour les posters 24×36"
      },
      "poster-16x20-gang-sheet": {
        "name": "Six 5×7 sur un 16×20 (planche groupée)",
        "description": "Six tirages 5×7 groupés pour économiser, au format poster 16×20"
      },
      "poster-24x36-gang-sheet": {
        "name": "Douze par feuille sur un 24×36 (planche groupée)",
        "description": "Douze tirages groupés pour économiser, au grand format poster 24×36"
      }
    },
    "contactSheet": {
      "a4-portrait-proof": {
        "name": "Planche d'épreuves A4 portrait",
        "description": "Format standard de relecture imprimée (grille 4×5, 20 photos par page)"
      },
      "a4-landscape-proof": {
        "name": "Planche d'épreuves A4 paysage",
        "description": "Relecture imprimée au format horizontal large (grille 5×4)"
      },
      "us-letter-portrait": {
        "name": "Épreuve US Letter portrait",
        "description": "Planche de relecture au format d'impression standard nord-américain"
      },
      "us-letter-landscape": {
        "name": "Épreuve US Letter paysage",
        "description": "Planche de relecture au format large nord-américain"
      },
      "16-9-digital-board": {
        "name": "Planche numérique 16:9",
        "description": "Mise en page optimisée pour l'écran en 1080p/4K (grille 4×3)"
      },
      "client-selection-sheet": {
        "name": "Planche de sélection client",
        "description": "Grandes photos (grille 3×4) avec numéros d'index et indicateurs de statut"
      },
      "filename-first-proof": {
        "name": "Planche d'épreuves axée noms de fichiers",
        "description": "Grille 4×6 dense pour un maximum de vignettes et des légendes lisibles"
      },
      "gallery-white-print": {
        "name": "Planche galerie sur fond blanc",
        "description": "Papier blanc, filets fins, bandeau de titre — pour l'impression et l'archivage"
      },
      "film-strip-index": {
        "name": "Index bandes 35mm",
        "description": "Index 5×7 très dense dans l'ordre des vues, numéros seuls — à la manière de la planche contact argentique"
      },
      "square-6x6-proof": {
        "name": "Épreuve carrée 6×6",
        "description": "Page carrée, vues recadrées en 4×4 — pour le moyen format et le recadrage carré"
      },
      "dense-thumbnail-index": {
        "name": "Index complet de la séance",
        "description": "6×8 = 48 vues par page. Une carte mémoire entière tient sur une ou deux planches"
      },
      "wedding-client-proof": {
        "name": "Épreuve client — avec titre",
        "description": "Grille 4×3 paysage avec bandeau de titre, numéros de page et marques garder/rejeter"
      },
      "casting-sheet": {
        "name": "Planche casting / talents",
        "description": "Grandes vues en 3×3 avec le nom imprimé dans la photo"
      },
      "instagram-grid-preview": {
        "name": "Aperçu de grille Instagram",
        "description": "Carré 3×3 de vues recadrées, sans légendes — vérifiez votre feed avant de publier"
      },
      "storyboard-6up": {
        "name": "Storyboard 6 par feuille",
        "description": "Grille 3×2 paysage avec cases numérotées et bandeau de titre"
      },
      "studio-tech-exif": {
        "name": "Planche technique studio EXIF",
        "description": "Grandes vues en 3×3 avec badges de métadonnées : boîtier, objectif, ouverture, vitesse et ISO"
      },
      "medium-format-6x7": {
        "name": "Épreuve film 120 6×7 (10 par feuille)",
        "description": "Vues verticales en 2×5 reproduisant la planche contact d'un film 120 complet de 10 poses"
      },
      "detail-macro-8up": {
        "name": "Contrôle détail et netteté (8 par feuille)",
        "description": "Vues panoramiques en 4×2 sur papier blanc pour juger la mise au point et le piqué des textures"
      },
      "lookbook-spread-2up": {
        "name": "Double page lookbook (2 par feuille)",
        "description": "Deux très grandes vues de présentation côte à côte avec de généreuses marges galerie"
      },
      "social-storyboard-8up": {
        "name": "Storyboard Reels et Shorts (8 par feuille)",
        "description": "Planche écran 4×2 avec cartes numérotées pour rythmer une vidéo verticale"
      },
      "archival-mega-index-70": {
        "name": "Méga-index d'archives labo (70 par feuille)",
        "description": "Index dense 7×10 réunissant deux films complets de 36 poses sur une seule planche"
      },
      "print-8x10-2up-5x7": {
        "name": "Deux 5×7 sur une feuille 8×10 (économie de tirage)",
        "description": "Économisez en imprimant deux photos 5×7 sur une seule feuille 8×10 en pharmacie ou au labo"
      },
      "print-8x10-4up-4x5": {
        "name": "Quatre 4×5 sur une feuille 8×10 (économie de tirage)",
        "description": "Imprimez quatre photos 4×5 parfaitement placées sur une seule feuille 8×10"
      },
      "print-8x10-8up-wallet": {
        "name": "Huit photos format portefeuille sur un 8×10",
        "description": "Imprimez huit photos format portefeuille 2.5×3.5 sur une seule feuille 8×10"
      },
      "print-8x10-full": {
        "name": "Tirage pleine feuille 8×10",
        "description": "Format de tirage 8×10 standard avec bordures en option"
      },
      "poster-16x20-gang": {
        "name": "Planche groupée 16×20 (6 par feuille)",
        "description": "Six tirages 5×7 sur une feuille poster 16×20 (grille 2×3) pour économiser en pharmacie ou au labo"
      },
      "poster-24x36-gang": {
        "name": "Planche groupée grand poster 24×36 (12 par feuille)",
        "description": "Douze tirages sur un grand poster 24×36 (grille 3×4) pour une impression groupée efficace"
      },
      "print-11x14-4up": {
        "name": "Quatre par feuille sur un 11×14 (économie de tirage)",
        "description": "Quatre photos sur une petite feuille poster 11×14 (grille 2×2)"
      }
    },
    "moodBoard": {
      "editorial-photoshoot": {
        "name": "Shooting éditorial",
        "description": "Portrait principal, cadres de détail, nuanciers et notes stylisme du directeur artistique."
      },
      "lighting-concept": {
        "name": "Planche éclairage et concept",
        "description": "Schéma technique d'éclairage multi-sources avec notes matériel et rapports d'ombre."
      },
      "warm-film-mood": {
        "name": "Ambiance argentique chaude",
        "description": "Cadres façon Polaroid, légères inclinaisons, grain argentique vintage et palette Kodak."
      },
      "fashion-lookbook": {
        "name": "Lookbook mode et stylisme",
        "description": "Silhouettes lookbook verticales, échantillons textiles en macro et études de poses."
      },
      "minimalist-clean": {
        "name": "Minimaliste épuré",
        "description": "Espace négatif généreux, palette galerie crème clair et géométrie équilibrée."
      },
      "color-story": {
        "name": "Histoire de couleurs et étude de palette",
        "description": "Grands nuanciers horizontaux associés à des photos d'inspiration aux tons assortis."
      },
      "analog-triptych-study": {
        "name": "Triptyque argentique film 120",
        "description": "Trois grandes vues moyen format avec repères de grain et notes de rapports d'exposition."
      },
      "high-fashion-spread": {
        "name": "Lookbook défilé haute couture",
        "description": "Mise en page éditoriale en double page avec portrait de défilé et notes sur les matières."
      },
      "cinematic-storyboard-grid": {
        "name": "Storyboard cinéma et concept de scène",
        "description": "Storyboard réalisateur panoramique 16:9 avec progression narrative des scènes et repères d'éclairage."
      },
      "monochrome-architecture": {
        "name": "Grille architecturale monochrome",
        "description": "Étude structurelle épurée et contrastée, jouant sur l'espace négatif et la géométrie brutaliste."
      }
    }
  },
  "ja": {
    "collage": {
      "side-by-side-2": {
        "name": "左右並び（2枚）",
        "description": "横並びの比較や2枚のポートレートをすっきり見せるレイアウト"
      },
      "three-strip-h": {
        "name": "3枚ストリップ",
        "description": "横長の三連構成でストーリーを伝えるレイアウト"
      },
      "three-strip-v": {
        "name": "縦型トリプティク（3枚）",
        "description": "横長パノラマ3コマを縦に重ねた、モバイルのストーリーズや映画的なシーケンス向けレイアウト"
      },
      "film-strip-4": {
        "name": "フィルムストリップ4連（4枚）",
        "description": "縦位置4コマを横に並べた、16:9ワイドのシネマティックなストリップ"
      },
      "three-hero-split": {
        "name": "メイン＋縦2段",
        "description": "左に大きなメインカット、右にディテールカット2枚"
      },
      "hero-golden-quad": {
        "name": "大判メイン＋縦3段",
        "description": "左の3分の2を占めるメイン写真と、右に縦に並ぶ横位置ディテール3コマ"
      },
      "cinematic-split": {
        "name": "シネマティックヘッダー＋3インセット",
        "description": "上部に横長の風景ヘッダー、下部に同サイズのディテール3コマ"
      },
      "grid-2x2": {
        "name": "2×2スクエアグリッド",
        "description": "バランスの取れた定番の4枚スクエアグリッド"
      },
      "grid-3x3": {
        "name": "3×3スクエアグリッド",
        "description": "ムードボードやInstagramギャラリー向けの9枚構成"
      },
      "editorial-mosaic-5": {
        "name": "エディトリアル中央メイン（5枚）",
        "description": "中央の縦位置ポートレートを、左右それぞれ縦2段のコマで挟む構成"
      },
      "grid-2x3-portrait": {
        "name": "SNS縦位置 2×3（6枚）",
        "description": "縦位置3コマを2列に配置した、Instagramの4:5縦型フィード向けレイアウト"
      },
      "center-hero-cross": {
        "name": "センタースポットライト（5枚）",
        "description": "四隅の写真で中央の主役写真を囲むスクエアのムードボード"
      },
      "hero-bottom-grid-5": {
        "name": "パノラマ＋サムネイル4枚",
        "description": "上部に状況を伝えるパノラマ風景、下部にディテールのサムネイル4枚"
      },
      "social-portrait-4-5": {
        "name": "SNS縦位置（4:5）",
        "description": "上に横位置写真1枚、下に縦位置ポートレート2枚"
      },
      "social-story-9-16": {
        "name": "SNSストーリーズ（9:16）",
        "description": "メインヘッダーと下部2コマで構成する縦型モバイルストーリー"
      },
      "before-after": {
        "name": "ビフォー・アフター比較",
        "description": "レタッチや編集の前後をラベル付きで見せる分割レイアウト"
      },
      "headline-duo-3-2": {
        "name": "エディトリアル・デュオ（3:2）",
        "description": "55/45の非対称な黄金比ペア。ポートレートと質感カットの組み合わせに、ファインアート風の余白付き"
      },
      "portfolio-wall": {
        "name": "ポートフォリオ・モザイクウォール",
        "description": "縦長1枚・小2枚・横長1枚で組む、建築的な非対称4枚コラージュ"
      },
      "collage-8x10-2up-5x7": {
        "name": "8×10に5×7を2枚（プリント節約）",
        "description": "8×10用紙に5×7のセルを2面配置（縦積み／左右分割）"
      },
      "collage-8x10-4up-4x5": {
        "name": "8×10に4×5を4枚（プリント節約）",
        "description": "8×10用紙に4×5比率のセルを2×2で配置"
      },
      "collage-8x10-8up-wallet": {
        "name": "8×10に財布サイズ8枚",
        "description": "8×10用紙に財布サイズのセルを2×4で配置"
      },
      "poster-16x20-hero-grid": {
        "name": "16×20ポスター メイン＋4インセット",
        "description": "16×20ポスターに11×14の大判メイン1枚と縦に並ぶディテール4枚"
      },
      "poster-24x36-storyboard": {
        "name": "24×36シネマティック絵コンテ（9枚）",
        "description": "24×36ポスタープリント向けに調整した3×3のシネマティックグリッド（9枚）"
      },
      "poster-16x20-gang-sheet": {
        "name": "16×20に5×7を6枚（面付け）",
        "description": "16×20ポスターに5×7を6面付けしてプリント代を節約"
      },
      "poster-24x36-gang-sheet": {
        "name": "24×36に12面（面付け）",
        "description": "24×36の大判ポスターに12面付けしてプリント代を節約"
      }
    },
    "contactSheet": {
      "a4-portrait-proof": {
        "name": "A4縦 プルーフシート",
        "description": "標準的なプリント確認用フォーマット（4×5グリッド、1ページ20枚）"
      },
      "a4-landscape-proof": {
        "name": "A4横 プルーフシート",
        "description": "横長のワイドなプリント確認用フォーマット（5×4グリッド）"
      },
      "us-letter-portrait": {
        "name": "USレター縦 プルーフ",
        "description": "北米標準サイズのプリント確認用シート"
      },
      "us-letter-landscape": {
        "name": "USレター横 プルーフ",
        "description": "北米標準サイズの横長確認用シート"
      },
      "16-9-digital-board": {
        "name": "16:9 デジタル確認ボード",
        "description": "1080p／4K画面表示に最適化したプレゼン用レイアウト（4×3グリッド）"
      },
      "client-selection-sheet": {
        "name": "クライアントセレクトシート",
        "description": "大きめの写真（3×4グリッド）にインデックス番号とステータス表示付き"
      },
      "filename-first-proof": {
        "name": "ファイル名重視 プルーフシート",
        "description": "サムネイル数とラベルの読みやすさを両立した高密度の4×6グリッド"
      },
      "gallery-white-print": {
        "name": "ギャラリーホワイト プリントシート",
        "description": "白い用紙、極細の罫線、タイトル帯付き。プリントと保管に"
      },
      "film-strip-index": {
        "name": "35mmストリップ インデックス",
        "description": "コマ順に並べた超高密度の5×7インデックス。番号のみの暗室ベタ焼きスタイル"
      },
      "square-6x6-proof": {
        "name": "スクエア6×6 プルーフ",
        "description": "正方形ページに4×4のトリミング済みコマ。中判・スクエア作品向け"
      },
      "dense-thumbnail-index": {
        "name": "撮影全カット インデックス",
        "description": "6×8＝1ページ48コマ。カード1枚分を1〜2シートに収録"
      },
      "wedding-client-proof": {
        "name": "クライアントプルーフ（タイトル付き）",
        "description": "横位置4×3、タイトル帯・ページ番号・採用／不採用マーク付き"
      },
      "casting-sheet": {
        "name": "キャスティング／タレントシート",
        "description": "3×3の大きなコマに、写真内へ名前を印字"
      },
      "instagram-grid-preview": {
        "name": "Instagramグリッド プレビュー",
        "description": "ラベルなしのトリミング済み3×3スクエア。投稿前にフィードの見え方を確認"
      },
      "storyboard-6up": {
        "name": "絵コンテ 6面",
        "description": "横位置3×2、番号付きパネルとタイトル帯付き"
      },
      "studio-tech-exif": {
        "name": "スタジオ技術 EXIFシート",
        "description": "3×3の大きなコマに、カメラ・レンズ・絞り・シャッター速度・ISOのメタデータバッジを表示"
      },
      "medium-format-6x7": {
        "name": "120フィルム 6×7 プルーフ（10面）",
        "description": "縦位置2×5。120ロールフィルム10枚撮り1本分のベタ焼きを再現"
      },
      "detail-macro-8up": {
        "name": "ディテール＆ピント確認（8面）",
        "description": "白い用紙に横長4×2のコマ。ピントと質感のシャープネス評価用"
      },
      "lookbook-spread-2up": {
        "name": "ルックブック見開き（2面）",
        "description": "特大のプレゼン用コマ2枚を、ゆったりしたギャラリー余白で左右に配置"
      },
      "social-storyboard-8up": {
        "name": "リール＆ショート動画 絵コンテ（8面）",
        "description": "縦型動画の構成確認用に番号付きカードを並べた4×2の画面用ボード"
      },
      "archival-mega-index-70": {
        "name": "アーカイブ用 大判インデックス（70面）",
        "description": "36枚撮り2本分を1シートに収める7×10の高密度インデックス"
      },
      "print-8x10-2up-5x7": {
        "name": "8×10に5×7を2枚（プリント節約）",
        "description": "ドラッグストアやラボで、8×10用紙1枚に5×7写真を2枚プリントして節約"
      },
      "print-8x10-4up-4x5": {
        "name": "8×10に4×5を4枚（プリント節約）",
        "description": "8×10用紙1枚に4×5写真を4枚きれいに収めてプリント"
      },
      "print-8x10-8up-wallet": {
        "name": "8×10に財布サイズ8枚",
        "description": "8×10用紙1枚に2.5×3.5の財布サイズ写真を8枚プリント"
      },
      "print-8x10-full": {
        "name": "8×10 全面プリント",
        "description": "フチの有無を選べる標準的な8×10プリントフォーマット"
      },
      "poster-16x20-gang": {
        "name": "16×20 面付けシート（6面）",
        "description": "16×20ポスター用紙に5×7を6枚（2×3グリッド）。ドラッグストアやラボでのプリント代節約に"
      },
      "poster-24x36-gang": {
        "name": "24×36 大判ポスター面付けシート（12面）",
        "description": "24×36の大判ポスターに12枚（3×4グリッド）。効率よくまとめてプリント"
      },
      "print-11x14-4up": {
        "name": "11×14に4面（プリント節約）",
        "description": "11×14の小型ポスター用紙に写真4枚（2×2グリッド）"
      }
    },
    "moodBoard": {
      "editorial-photoshoot": {
        "name": "エディトリアル撮影",
        "description": "メインのポートレートにディテールカット、カラースウォッチ、ディレクターの衣装メモを添えて。"
      },
      "lighting-concept": {
        "name": "ライティング＆コンセプトボード",
        "description": "多灯ライティングの技術的な内訳を、機材メモとシャドウ比率とともに整理。"
      },
      "warm-film-mood": {
        "name": "あたたかなフィルムムード",
        "description": "ポラロイド風のフレーム、わずかな傾き、ヴィンテージのフィルム粒子とコダック調の配色。"
      },
      "fashion-lookbook": {
        "name": "ファッションルックブック＆スタイリング",
        "description": "縦長のルックブックシルエット、生地のマクロスウォッチ、モデルのポーズ検討。"
      },
      "minimalist-clean": {
        "name": "ミニマル・クリーン",
        "description": "たっぷりの余白、明るいクリーム系のギャラリーパレット、バランスの取れた構成。"
      },
      "color-story": {
        "name": "カラーストーリー＆パレット検討",
        "description": "大きな横長のカラースウォッチと、トーンを合わせた参考写真の組み合わせ。"
      },
      "analog-triptych-study": {
        "name": "アナログ120フィルム 三連作",
        "description": "中判の大きなコマ3枚に、粒子感の手がかりと露出比のメモを添えて。"
      },
      "high-fashion-spread": {
        "name": "ハイファッション ランウェイルックブック",
        "description": "ランウェイのメインポートレートとスタイリング素材メモを配した見開きエディトリアル。"
      },
      "cinematic-storyboard-grid": {
        "name": "シネマティック絵コンテ＆シーン構想",
        "description": "シーンの流れとライティングタグを示す、16:9ワイドのディレクター向け絵コンテ。"
      },
      "monochrome-architecture": {
        "name": "モノクロ建築グリッド",
        "description": "余白とブルータリズムの幾何学で構成する、ハイコントラストな構造スタディ。"
      }
    }
  },
  "pt": {
    "collage": {
      "side-by-side-2": {
        "name": "Lado a lado (2 fotos)",
        "description": "Comparação horizontal limpa ou apresentação de dois retratos"
      },
      "three-strip-h": {
        "name": "Faixa de 3 fotos",
        "description": "Tríptico horizontal para contar uma história"
      },
      "three-strip-v": {
        "name": "Tríptico vertical (3 fotos)",
        "description": "Três quadros panorâmicos empilhados para stories no celular e sequências cinematográficas"
      },
      "film-strip-4": {
        "name": "Tira de filme com 4 fotos",
        "description": "Quatro quadros verticais lado a lado em uma faixa cinematográfica widescreen 16:9"
      },
      "three-hero-split": {
        "name": "Destaque + 2 empilhadas",
        "description": "Uma foto principal em destaque à esquerda e 2 fotos de detalhe à direita"
      },
      "hero-golden-quad": {
        "name": "Destaque principal + 3 empilhadas",
        "description": "Uma foto principal ocupando dois terços à esquerda e três quadros horizontais de detalhe empilhados à direita"
      },
      "cinematic-split": {
        "name": "Cabeçalho cinematográfico + 3 detalhes",
        "description": "Uma paisagem larga no topo e três quadros de detalhe iguais na parte de baixo"
      },
      "grid-2x2": {
        "name": "Grade quadrada 2×2",
        "description": "Grade quadrada clássica e equilibrada com 4 fotos"
      },
      "grid-3x3": {
        "name": "Grade quadrada 3×3",
        "description": "Mood board com 9 fotos e vitrine de galeria para o Instagram"
      },
      "editorial-mosaic-5": {
        "name": "Destaque central editorial (5 fotos)",
        "description": "Retrato vertical dominante no centro, ladeado por dois quadros empilhados de cada lado"
      },
      "grid-2x3-portrait": {
        "name": "Retrato para redes 2×3 (6 fotos)",
        "description": "Duas colunas de três quadros verticais, ajustadas para o feed do Instagram em retrato 4:5"
      },
      "center-hero-cross": {
        "name": "Destaque central (5 fotos)",
        "description": "Quatro fotos nos cantos emoldurando um destaque central em um mood board quadrado"
      },
      "hero-bottom-grid-5": {
        "name": "Panorâmica + 4 miniaturas",
        "description": "Uma paisagem panorâmica de abertura no topo e quatro miniaturas de detalhe embaixo"
      },
      "social-portrait-4-5": {
        "name": "Retrato para redes (4:5)",
        "description": "1 foto horizontal no topo + 2 retratos verticais embaixo"
      },
      "social-story-9-16": {
        "name": "Story para redes (9:16)",
        "description": "Story vertical para celular com foto de destaque no topo e dois quadros no rodapé"
      },
      "before-after": {
        "name": "Comparação antes e depois",
        "description": "Apresentação dividida e identificada para retoques e edições de fotos"
      },
      "headline-duo-3-2": {
        "name": "Dupla editorial (3:2)",
        "description": "Dupla assimétrica 55/45 na proporção áurea para combinar retrato e textura, com margem de fine art"
      },
      "portfolio-wall": {
        "name": "Mosaico de portfólio",
        "description": "Colagem arquitetônica assimétrica com 4 fotos: uma alta, duas pequenas e uma larga"
      },
      "collage-8x10-2up-5x7": {
        "name": "Duas 5x7 em 8x10 (economia de impressão)",
        "description": "Duas células 5x7 empilhadas ou divididas em uma folha 8x10"
      },
      "collage-8x10-4up-4x5": {
        "name": "Quatro 4x5 em 8x10 (economia de impressão)",
        "description": "Grade 2x2 de células na proporção 4x5 em uma folha 8x10"
      },
      "collage-8x10-8up-wallet": {
        "name": "Oito fotos tamanho carteira em 8x10",
        "description": "Grade 2x4 de células tamanho carteira em uma folha 8x10"
      },
      "poster-16x20-hero-grid": {
        "name": "Pôster 16×20 com destaque + 4 detalhes",
        "description": "1 foto grande de destaque 11×14 com 4 detalhes empilhados em formato de pôster 16×20"
      },
      "poster-24x36-storyboard": {
        "name": "Storyboard cinematográfico 24×36 (9 fotos)",
        "description": "Grade cinematográfica de 9 fotos com layout 3×3 normalizado, ajustada para pôsteres impressos em 24×36"
      },
      "poster-16x20-gang-sheet": {
        "name": "Seis 5×7 em 16×20 (folha agrupada)",
        "description": "6 fotos 5×7 por folha para economizar na impressão em formato de pôster 16×20"
      },
      "poster-24x36-gang-sheet": {
        "name": "Doze fotos em 24×36 (folha agrupada)",
        "description": "12 fotos por folha para economizar na impressão em pôster grande 24×36"
      }
    },
    "contactSheet": {
      "a4-portrait-proof": {
        "name": "Folha de prova A4 retrato",
        "description": "Formato padrão para revisão impressa (grade 4×5, 20 fotos por página)"
      },
      "a4-landscape-proof": {
        "name": "Folha de prova A4 paisagem",
        "description": "Revisão impressa em formato horizontal largo (grade 5×4)"
      },
      "us-letter-portrait": {
        "name": "Prova US Letter retrato",
        "description": "Folha de revisão impressa no padrão norte-americano"
      },
      "us-letter-landscape": {
        "name": "Prova US Letter paisagem",
        "description": "Folha de revisão no formato largo norte-americano"
      },
      "16-9-digital-board": {
        "name": "Painel de revisão digital 16:9",
        "description": "Layout de apresentação otimizado para tela em 1080p/4K (grade 4×3)"
      },
      "client-selection-sheet": {
        "name": "Folha de seleção do cliente",
        "description": "Fotos grandes (grade 3×4) com números de índice e indicadores de status"
      },
      "filename-first-proof": {
        "name": "Prova com foco no nome do arquivo",
        "description": "Grade densa 4×6 que maximiza o número de miniaturas e a legibilidade dos rótulos"
      },
      "gallery-white-print": {
        "name": "Folha branca estilo galeria",
        "description": "Papel branco, fios finos e faixa de título, para imprimir e arquivar"
      },
      "film-strip-index": {
        "name": "Índice de tiras 35mm",
        "description": "Índice 5×7 bem denso na ordem dos quadros, só com números, como a prova do laboratório"
      },
      "square-6x6-proof": {
        "name": "Prova quadrada 6×6",
        "description": "Página quadrada com quadros recortados em 4×4, para médio formato e recortes quadrados"
      },
      "dense-thumbnail-index": {
        "name": "Índice do ensaio completo",
        "description": "6×8 = 48 quadros por página. Cabe um cartão inteiro em uma ou duas folhas"
      },
      "wedding-client-proof": {
        "name": "Prova do cliente com título",
        "description": "4×3 paisagem com faixa de título, números de página e marcações de aprovar/descartar"
      },
      "casting-sheet": {
        "name": "Folha de casting / talentos",
        "description": "Quadros grandes em 3×3 com o nome impresso dentro da foto"
      },
      "instagram-grid-preview": {
        "name": "Prévia do feed do Instagram",
        "description": "Quadros recortados em grade quadrada 3×3, sem rótulos, para conferir o feed antes de postar"
      },
      "storyboard-6up": {
        "name": "Storyboard com 6 quadros",
        "description": "3×2 paisagem com painéis numerados e faixa de título"
      },
      "studio-tech-exif": {
        "name": "Folha técnica de estúdio com EXIF",
        "description": "Quadros grandes em 3×3 com selos de metadados de câmera, lente, abertura, velocidade e ISO"
      },
      "medium-format-6x7": {
        "name": "Prova de filme 120 6×7 (10 por folha)",
        "description": "Quadros verticais em 2×5 que reproduzem a folha de contato de um rolo 120 completo de 10 poses"
      },
      "detail-macro-8up": {
        "name": "Controle de foco e detalhes (8 por folha)",
        "description": "Quadros widescreen em 4×2 sobre papel branco para avaliar o foco e a nitidez das texturas"
      },
      "lookbook-spread-2up": {
        "name": "Página dupla de lookbook (2 por folha)",
        "description": "Dois quadros de apresentação bem grandes lado a lado, com margens generosas de galeria"
      },
      "social-storyboard-8up": {
        "name": "Storyboard para Reels e Shorts (8 por folha)",
        "description": "Painel de apresentação 4×2 com cards numerados para definir o ritmo de vídeos verticais"
      },
      "archival-mega-index-70": {
        "name": "Megaíndice de arquivo (70 por folha)",
        "description": "Índice denso de quadros em 7×10 que comporta dois rolos completos de 36 poses em uma única folha"
      },
      "print-8x10-2up-5x7": {
        "name": "Duas 5×7 em folha 8×10 (economia de impressão)",
        "description": "Economize imprimindo duas fotos 5×7 em uma única folha 8×10 na farmácia ou no laboratório"
      },
      "print-8x10-4up-4x5": {
        "name": "Quatro 4×5 em folha 8×10 (economia de impressão)",
        "description": "Imprima quatro fotos 4×5 perfeitamente em uma folha 8×10"
      },
      "print-8x10-8up-wallet": {
        "name": "Oito fotos tamanho carteira em 8×10",
        "description": "Imprima oito fotos tamanho carteira 2.5×3.5 em uma única folha 8×10"
      },
      "print-8x10-full": {
        "name": "Impressão 8×10 em folha inteira",
        "description": "Formato padrão de impressão 8×10 com bordas opcionais"
      },
      "poster-16x20-gang": {
        "name": "Folha agrupada 16×20 (6 por folha)",
        "description": "Seis fotos 5×7 em uma folha de pôster 16×20 (grade 2×3) para economizar na farmácia ou no laboratório"
      },
      "poster-24x36-gang": {
        "name": "Folha agrupada em pôster grande 24×36 (12 por folha)",
        "description": "Doze fotos em um pôster grande 24×36 (grade 3×4) para impressão em lote mais eficiente"
      },
      "print-11x14-4up": {
        "name": "Quatro fotos em folha 11×14 (economia de impressão)",
        "description": "Quatro fotos em uma folha de pôster pequeno 11×14 (grade 2×2)"
      }
    },
    "moodBoard": {
      "editorial-photoshoot": {
        "name": "Ensaio editorial",
        "description": "Retrato em destaque com quadros de detalhe, amostras de cor e notas de figurino da direção."
      },
      "lighting-concept": {
        "name": "Painel de luz e conceito",
        "description": "Esquema técnico de iluminação com várias fontes, notas de equipamento e razões de sombra."
      },
      "warm-film-mood": {
        "name": "Clima de filme quente",
        "description": "Quadros estilo Polaroid, leves inclinações, granulação de filme vintage e paleta de cores Kodak."
      },
      "fashion-lookbook": {
        "name": "Lookbook de moda e styling",
        "description": "Silhuetas verticais de lookbook, amostras de tecido em macro e estudos de pose da modelo."
      },
      "minimalist-clean": {
        "name": "Minimalista e clean",
        "description": "Muito espaço negativo, paleta de galeria em creme claro e geometria equilibrada."
      },
      "color-story": {
        "name": "Narrativa de cor e estudo de paleta",
        "description": "Amostras de cor horizontais em destaque, combinadas com fotos de referência no mesmo tom."
      },
      "analog-triptych-study": {
        "name": "Tríptico analógico em filme 120",
        "description": "3 quadros grandes de médio formato com referências de granulação e notas de exposição."
      },
      "high-fashion-spread": {
        "name": "Lookbook de passarela de alta moda",
        "description": "Layout editorial em página dupla com retrato de passarela em destaque e notas sobre materiais do styling."
      },
      "cinematic-storyboard-grid": {
        "name": "Storyboard cinematográfico e conceito de cena",
        "description": "Storyboard de direção widescreen 16:9 com a progressão narrativa das cenas e marcações de luz."
      },
      "monochrome-architecture": {
        "name": "Grade arquitetônica monocromática",
        "description": "Estudo estrutural limpo e de alto contraste, com espaço negativo e geometria brutalista."
      }
    }
  }
};

export function templateCopy<T extends { id: string; name: string; description?: string }>(
  locale: Locale,
  kind: TemplateKind,
  template: T,
): Copy {
  const localized = locale === 'en' ? undefined : TEMPLATE_COPY[locale]?.[kind]?.[template.id];
  return localized ?? { name: template.name, description: template.description ?? '' };
}
