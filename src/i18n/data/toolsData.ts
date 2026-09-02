import type { Locale } from '../config';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface StudioStep {
  n: string;
  title: string;
  body: string;
}

export interface SettingGroup {
  title: string;
  items: string[];
}

export interface ShortcutItem {
  keys: string;
  action: string;
}

export interface ExportFormatItem {
  name: string;
  body: string;
}

export interface PosterSpec {
  name: string;
  metric: string;
  ratio: string;
  dpi150: string;
  dpi300: string;
  capacity: string;
  labs: string;
  badge: string;
  tagVariant: string;
}

export interface PillarItem {
  title: string;
  desc: string;
  emoji: string;
  icon: 'crop' | 'columns' | 'download' | 'file-text' | 'camera' | 'shield';
}

// -------------------------------------------------------------
// 1. PHOTO CONTACT SHEET MAKER (/photo-contact-sheet-maker)
// -------------------------------------------------------------
export interface ContactSheetToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  ctaStudio: string;
  sec1Heading: string;
  sec1P1: string;
  sec1P2: string;
  sec2Heading: string;
  sec2P1: string;
  sec2P2: string;
  faqs: ToolFaq[];
}

export const CONTACT_SHEET_DATA: Record<Locale, ContactSheetToolData> = {
  en: {
    title: 'Photo Contact Sheet — Free Proof Sheet Generator',
    description: 'Generate photo contact sheets online with camera filenames, custom grids, and 300 DPI PDF exports. Free, private, and runs in your browser.',
    heading: 'Photo Contact Sheet Maker',
    lead: 'Create professional photography contact sheets and proof prints directly in your browser. Configure grid columns, paper formats, and camera filename labels with instant local PDF and PNG exports.',
    breadcrumbName: 'Photo Contact Sheet Maker',
    ctaStudio: 'Open the full-screen Contact Sheet Studio',
    sec1Heading: 'What is a photo contact sheet?',
    sec1P1: 'A photo contact sheet (historically known as a proof sheet or contact print) is a grid arrangement of thumbnail images compiled onto a single page or multi-page document. In traditional darkroom photography, a contact print was created by placing photographic negative strips directly onto light-sensitive paper under glass.',
    sec1P2: 'In modern digital workflows, contact sheets serve as the standard tool for photographers, editors, and studios to scan an entire shoot, evaluate framing and color consistency, share proofs with clients, and archive photo batches with verifiable camera filenames intact.',
    sec2Heading: 'Why use a browser-based contact sheet generator?',
    sec2P1: 'Traditional desktop software like Adobe Photoshop or Lightroom requires heavy subscriptions, installation, and complex catalog setups for a task that should take thirty seconds. Meanwhile, generic online collage apps strip camera filenames, upload unreleased client work to unknown cloud servers, and force users to create accounts.',
    sec2P2: 'Make Contact Sheet bridges this gap by offering a dedicated, studio-grade contact sheet workspace that operates entirely inside your browser. Your images are rendered locally with hardware acceleration, preserving 100% data privacy while providing professional export options including multi-page print PDFs and Lightroom-ready filename lists.',
    faqs: [
      { question: 'How do I create a photo contact sheet in Make Contact Sheet?', answer: 'Simply drag and drop your photo batch into the workspace. Select your desired columns, rows, paper format (such as A4 or US Letter), and label preferences. Make Contact Sheet automatically arranges your images into a structured proof sheet ready for export as a PDF or high-resolution image.' },
      { question: 'Can I include original filenames on every thumbnail?', answer: 'Yes. Make Contact Sheet preserves original camera filenames by default and renders them below each image. You can also display index numbers or both.' },
      { question: 'How many photos can I add to a single contact sheet?', answer: 'Make Contact Sheet handles batches ranging from 10 to over 300 photos smoothly in your browser. For large batches, Make Contact Sheet automatically splits items into multiple cleanly numbered pages.' },
      { question: 'Is this contact sheet generator private?', answer: 'Yes. Unlike cloud upload tools, Make Contact Sheet processes all photos locally in your browser. No files, thumbnails, or metadata ever leave your computer.' }
    ]
  },
  es: {
    title: 'Creador de hojas de contactos — Generador de hojas de pruebas gratuito',
    description: 'Genera hojas de contactos fotográficas en línea con nombres de archivo de cámara, cuadrículas personalizadas y exportaciones PDF a 300 DPI. 100% privado.',
    heading: 'Creador de Hojas de Contactos',
    lead: 'Crea hojas de contactos fotográficas y pruebas profesionales directamente en tu navegador. Configura columnas de cuadrícula, formatos de papel y etiquetas de nombres de archivo de cámara con exportaciones locales instantáneas en PDF y PNG.',
    breadcrumbName: 'Creador de hojas de contactos',
    ctaStudio: 'Abrir el estudio de hojas de contactos a pantalla completa',
    sec1Heading: '¿Qué es una hoja de contactos fotográfica?',
    sec1P1: 'Una hoja de contactos fotográfica (históricamente conocida como hoja de pruebas o copia por contacto) es una disposición en cuadrícula de imágenes en miniatura compiladas en una sola página o documento de varias páginas. En la fotografía tradicional de cuarto oscuro, se creaba colocando tiras de película negativa directamente sobre papel fotosensible bajo un cristal.',
    sec1P2: 'En los flujos de trabajo digitales modernos, las hojas de contactos son la herramienta estándar para fotógrafos, editores y estudios para inspeccionar una sesión completa, evaluar la consistencia del encuadre y el color, compartir pruebas con clientes y archivar lotes de fotos con los nombres de archivo originales verificables.',
    sec2Heading: '¿Por qué usar un generador en el navegador?',
    sec2P1: 'El software de escritorio tradicional como Adobe Photoshop o Lightroom requiere suscripciones costosas, instalaciones pesadas y configuraciones complejas de catálogos para una tarea que debería tomar treinta segundos. Por otro lado, las aplicaciones genéricas de collage en línea eliminan los nombres de archivo de cámara y suben el trabajo confidencial de tus clientes a servidores desconocidos en la nube.',
    sec2P2: 'Make Contact Sheet soluciona este problema ofreciendo un espacio de trabajo de calidad de estudio que funciona 100% en tu navegador. Tus imágenes se procesan localmente con aceleración por hardware, garantizando total privacidad mientras ofrece opciones de exportación profesional que incluyen PDFs a 300 DPI y listas de nombres listas para Lightroom.',
    faqs: [
      { question: '¿Cómo creo una hoja de contactos en Make Contact Sheet?', answer: 'Simplemente arrastra y suelta tu lote de fotos en el espacio de trabajo. Selecciona las columnas, filas, formato de papel (como A4 o Carta) y preferencias de etiqueta. Make Contact Sheet organiza automáticamente tus imágenes en una hoja de pruebas estructurada lista para exportar en PDF o imagen de alta resolución.' },
      { question: '¿Puedo incluir los nombres de archivo originales en cada miniatura?', answer: 'Sí. Make Contact Sheet conserva los nombres de archivo de cámara originales por defecto y los muestra debajo de cada imagen. También puedes mostrar números de índice o ambos.' },
      { question: '¿Cuántas fotos puedo añadir a una sola hoja de contactos?', answer: 'Make Contact Sheet procesa lotes desde 10 hasta más de 300 fotos fluidamente en tu navegador. Para lotes grandes, divide automáticamente las imágenes en varias páginas numeradas de forma limpia.' },
      { question: '¿Es privado este generador de hojas de contactos?', answer: 'Sí. A diferencia de las herramientas que suben archivos a la nube, Make Contact Sheet procesa todas las fotos localmente en tu navegador. Ningún archivo, miniatura ni metadato sale jamás de tu ordenador.' }
    ]
  },
  de: {
    title: 'Kontaktabzug-Ersteller — Kostenlose Foto-Prüfbögen online erstellen',
    description: 'Erstelle Foto-Kontaktabzüge online mit Original-Dateinamen, flexiblen Rastern und 300 DPI PDF-Export. Kostenlos und 100% lokal im Browser.',
    heading: 'Foto-Kontaktabzug-Ersteller',
    lead: 'Erstelle professionelle Foto-Kontaktabzüge und Prüfabzüge direkt in deinem Webbrowser. Konfiguriere Spalten, Zeilen, Papierformate und Kamera-Dateinamen mit sofortigem lokalem PDF- und PNG-Export.',
    breadcrumbName: 'Kontaktabzug-Ersteller',
    ctaStudio: 'Vollbild-Kontaktabzug-Studio öffnen',
    sec1Heading: 'Was ist ein Foto-Kontaktabzug?',
    sec1P1: 'Ein Foto-Kontaktabzug (historisch auch als Prüfbogen oder Kontaktkopie bezeichnet) ist eine gitterförmige Anordnung von Miniaturbildern auf einer einzelnen Seite oder einem mehrseitigen Dokument. In der traditionellen Dunkelkammer entstand ein Kontaktabzug, indem Negativstreifen direkt auf lichtempfindliches Fotopapier unter Glas belichtet wurden.',
    sec1P2: 'In modernen digitalen Workflows sind Kontaktabzüge das Standardwerkzeug für Fotografen, Redakteure und Studios, um ein gesamtes Shooting zu sichten, Bildkompositionen zu vergleichen, Prüfabzüge mit Kunden zu teilen und Bildbestände mit Original-Kameranamen zu archivieren.',
    sec2Heading: 'Warum ein browserbasiertes Kontaktabzug-Tool?',
    sec2P1: 'Klassische Desktop-Software wie Adobe Photoshop oder Lightroom erfordert teure Abonnements, Installationen und komplexe Kataloge für eine Aufgabe, die nur dreißig Sekunden dauern sollte. Standard-Online-Collagen-Tools hingegen entfernen Dateinamen und laden vertrauliche Kundendaten auf fremde Cloud-Server hoch.',
    sec2P2: 'Make Contact Sheet schließt diese Lücke mit einem professionellen Studio-Arbeitsplatz direkt im Browser. Bilder werden hardwarebeschleunigt lokal verarbeitet – bei vollem Datenschutz und professionellen Exportoptionen wie mehrseitigen 300-DPI-Druck-PDFs.',
    faqs: [
      { question: 'Wie erstelle ich einen Kontaktabzug in Make Contact Sheet?', answer: 'Ziehe deine Bildauswahl per Drag-and-Drop in den Arbeitsbereich. Wähle Spalten, Zeilen, Papierformat (wie A4 oder Letter) und Beschriftungsoptionen. Das Tool ordnet deine Fotos automatisch in einem druckfertigen Bogen an.' },
      { question: 'Werden die Original-Dateinamen beibehalten?', answer: 'Ja. Make Contact Sheet behält standardmäßig die Original-Kameranamen bei und druckt sie unter jedes Bild. Auch Bildnummern können eingeblendet werden.' },
      { question: 'Wie viele Fotos können auf einen Kontaktabzug?', answer: 'Make Contact Sheet verarbeitet mühelos 10 bis über 300 Fotos im Browser. Größere Serien werden automatisch auf nummerierte Einzelseiten aufgeteilt.' },
      { question: 'Bleiben meine Fotos privat?', answer: 'Ja. Im Gegensatz zu Cloud-Diensten verarbeitet Make Contact Sheet alle Fotos ausschließlich lokal im Browser. Es verlassen keine Daten deinen Rechner.' }
    ]
  },
  fr: {
    title: 'Créateur de planches contact photo — Feuilles d\'épreuves gratuites en ligne',
    description: 'Générez des planches contact en ligne avec noms de fichiers originaux, grilles sur mesure et exports PDF 300 DPI. 100% privé et local.',
    heading: 'Créateur de Planches Contact',
    lead: 'Créez des planches contact photo professionnelles et des tirages d\'épreuves directement dans votre navigateur. Configurez grilles, formats de papier et noms de fichiers avec export instantané en PDF et PNG.',
    breadcrumbName: 'Planche contact',
    ctaStudio: 'Ouvrir le studio plein écran',
    sec1Heading: 'Qu\'est-ce qu\'une planche contact photographique ?',
    sec1P1: 'Une planche contact (historiquement appelée épreuve contact) est un assemblage ordonné en grille de vignettes photos sur une seule ou plusieurs pages. En chambre noire traditionnelle, elle était réalisée en posant les bandes de négatifs directement sur du papier photosensible sous verre.',
    sec1P2: 'Dans les flux de travail numériques actuels, elle reste l\'outil de référence pour visualiser rapidement un shooting, évaluer la cohérence chromatique et partager des épreuves avec les clients tout en conservant les noms de fichiers du boîtier.',
    sec2Heading: 'Pourquoi choisir un générateur dans le navigateur ?',
    sec2P1: 'Les logiciels classiques comme Adobe Photoshop ou Lightroom imposent des abonnements coûteux et des catalogues complexes pour une tâche qui ne devrait prendre que trente secondes. À l\'inverse, les outils en ligne génériques suppriment les noms de fichiers et téléversent vos photos sur des serveurs distants.',
    sec2P2: 'Make Contact Sheet allie simplicité et rigueur professionnelle en s\'exécutant entièrement en local dans votre navigateur, avec rendu accéléré par le matériel et exports haute résolution 300 DPI.',
    faqs: [
      { question: 'Comment créer une planche contact dans Make Contact Sheet ?', answer: 'Déposez votre dossier de photos dans l\'espace de travail. Choisissez le nombre de colonnes, de rangées, le format papier (A4 ou US Letter) et vos options de texte. L\'outil assemble vos images en un document prêt pour l\'impression.' },
      { question: 'Les noms de fichiers originaux sont-ils conservés ?', answer: 'Oui. Les noms de fichiers de l\'appareil photo sont préservés et affichés sous chaque vignette. Vous pouvez aussi afficher la numérotation séquentielle.' },
      { question: 'Combien de photos puis-je ajouter ?', answer: 'Make Contact Sheet gère confortablement de 10 à plus de 300 photos dans votre navigateur, avec découpage automatique en plusieurs pages numérotées.' },
      { question: 'Mes photos restent-elles confidentielles ?', answer: 'Oui. Le traitement s\'effectue 100% localement dans votre navigateur. Aucun fichier ni métadonnée ne quitte votre ordinateur.' }
    ]
  },
  ja: {
    title: '写真コンタクトシート作成ツール — 無料ベタ焼き・プルーフシート作成',
    description: 'カメラのファイル名や撮影情報（EXIF）を保持した写真コンタクトシート（ベタ焼き）をブラウザで簡単作成。300 DPIの高解像度PDF出力対応。完全無料・プライベート。',
    heading: '写真コンタクトシート作成ツール',
    lead: '撮影した写真をブラウザにドロップするだけで、本格的なベタ焼き・プルーフシートを即座に作成。グリッド列数、用紙サイズ、ファイル名ラベルを自由にカスタマイズし、印刷用300 DPIのPDFやPNGとしてローカル保存できます。',
    breadcrumbName: 'コンタクトシート作成',
    ctaStudio: '全画面コンタクトシートスタジオを開く',
    sec1Heading: '写真のコンタクトシート（ベタ焼き）とは？',
    sec1P1: '写真のコンタクトシート（伝統的にはベタ焼きや密着焼き、プルーフシートと呼ばれます）は、1本のフィルムや撮影セッションの写真を1枚の紙に縮小グリッド状に並べたものです。従来の暗室作業では、ネガフィルムを印画紙の上に直接密着させて露光して作られていました。',
    sec1P2: 'デジタル撮影が主流となった現在でも、コンタクトシートは写真家、編集者、制作スタジオにとって不可欠なツールです。大量の撮影データを素早く俯瞰し、構図や色味の統一感を比較・評価したり、クライアントとセレクトを共有したりする際に広く活用されています。',
    sec2Heading: 'なぜブラウザ完結型のコンタクトシート作成ツールなのか？',
    sec2P1: 'Adobe PhotoshopやLightroomなどのデスクトップアプリは、わずか数十秒で終わるはずの作業に高額な月額サブスクリプションや煩雑なカタログ設定を要求します。一方、一般的な無料オンラインツールは元のファイル名を削除してしまったり、機密性の高いクライアントワークを外部サーバーへ勝手にアップロードしたりします。',
    sec2P2: 'Make Contact Sheetは、すべての画像処理をブラウザのメモリ内（ローカル）で行うため、大切な写真データが外部サーバーへ送信される心配は一切ありません。複数ページの300 DPI印刷用PDF出力やLightroom連携用のファイル名書き出しなど、プロ仕様の機能を安全にお使いいただけます。',
    faqs: [
      { question: 'Make Contact Sheetでコンタクトシートを作成するには？', answer: '写真をまとめてワークスペースにドラッグ＆ドロップするだけです。列数・行数、用紙サイズ（A4やUSレターなど）、ラベル表示を設定すれば、印刷用のPDFや高解像度画像として即座に出力できます。' },
      { question: 'カメラの元ファイル名を各写真の下に表示できますか？', answer: 'はい。カメラ固有のファイル名をデフォルトで維持し、各サムネイルの下に自動印字します。連番インデックスの表示や併記も可能です。' },
      { question: '1枚のコンタクトシートに何枚の写真を追加できますか？', answer: '10枚程度の小規模なものから300枚を超える大量の撮影データまで快適に処理できます。指定したグリッドに収まらない場合は、自動的に複数ページに分割されます。' },
      { question: '写真データが外部サーバーにアップロードされることはありますか？', answer: 'いいえ。すべての画像デコード、サムネイル生成、PDF出力処理はお使いのパソコンのブラウザ内で100%完結します。外部へのデータ送信は一切ありません。' }
    ]
  },
  pt: {
    title: 'Criador de folhas de contato fotográficas — Gerador de folhas de prova gratuito',
    description: 'Gere folhas de contato online com nomes de arquivos de câmera, grades personalizadas e exportação em PDF a 300 DPI. Gratuito, privado e 100% local.',
    heading: 'Criador de Folhas de Contato',
    lead: 'Crie folhas de contato fotográficas e impressões de prova profissionais diretamente no seu navegador. Configure colunas, formatos de papel e legendas com nomes de arquivos da câmera com exportação instantânea para PDF e PNG.',
    breadcrumbName: 'Folha de contato',
    ctaStudio: 'Abrir estúdio de folha de contato em tela cheia',
    sec1Heading: 'O que é uma folha de contato fotográfica?',
    sec1P1: 'Uma folha de contato fotográfica (historicamente conhecida como folha de provas ou cópia por contato) é uma disposição em grade de imagens em miniatura compiladas em uma única página ou documento de várias páginas. Na fotografia tradicional de laboratório escuro, era produzida colocando tiras de filme negativo diretamente sobre papel fotossensível sob vidro.',
    sec1P2: 'Nos fluxos de trabalho digitais atuais, as folhas de contato continuam sendo a ferramenta padrão para fotógrafos, editores e estúdios avaliarem um ensaio completo, compararem o enquadramento, compartilharem seleções com clientes e arquivarem fotos com os nomes originais dos arquivos intactos.',
    sec2Heading: 'Por que usar um gerador no navegador?',
    sec2P1: 'Softwares clássicos como Adobe Photoshop ou Lightroom exigem assinaturas pesadas e instalações complexas para uma tarefa que deveria levar apenas trinta segundos. Por outro lado, aplicativos comuns de colagem online apagam os nomes dos arquivos e enviam trabalhos confidenciais para servidores remotos.',
    sec2P2: 'O Make Contact Sheet resolve essa lacuna oferecendo uma área de trabalho profissional que opera 100% no seu navegador com aceleração por hardware, mantendo a privacidade total dos seus dados e permitindo exportações em PDF a 300 DPI.',
    faqs: [
      { question: 'Como criar uma folha de contato no Make Contact Sheet?', answer: 'Arraste e solte suas fotos no espaço de trabalho. Escolha o número de colunas, linhas, formato de papel (como A4 ou Carta) e opções de legenda. O Make Contact Sheet organiza automaticamente suas fotos em uma folha de provas pronta para exportação.' },
      { question: 'Os nomes originais dos arquivos são preservados?', answer: 'Sim. Os nomes originais da câmera são mantidos por padrão e exibidos abaixo de cada miniatura. Você também pode exibir números sequenciais ou ambos.' },
      { question: 'Quantas fotos posso incluir em uma única folha de contato?', answer: 'O Make Contact Sheet processa de 10 a mais de 300 fotos com fluidez. Lotes grandes são divididos automaticamente em várias páginas numeradas.' },
      { question: 'Minhas fotos permanecem privadas?', answer: 'Sim. Todo o processamento ocorre localmente no seu navegador. Nenhum arquivo, miniatura ou metadado é enviado para servidores externos.' }
    ]
  }
};

// -------------------------------------------------------------
// 2. PHOTO COLLAGE MAKER (/photo-collage-maker)
// -------------------------------------------------------------
export interface CollageToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  sec1Heading: string;
  sec1P1: string;
  sec1P2: string;
  sec2Heading: string;
  sec2P1: string;
  faqs: ToolFaq[];
}

export const COLLAGE_DATA: Record<Locale, CollageToolData> = {
  en: {
    title: 'Photo Collage Maker — Free Online Grid & Story Layouts',
    description: 'Create photo collages online for free. Pick from grid, story, and comparison layouts. Export high-res images with zero cloud uploads.',
    heading: 'Free Photo Collage Maker Online',
    lead: 'Combine multiple pictures into balanced grids, storytelling triptychs, and social formats. Fast, private, and free online photo collage maker with zero cloud uploads or signups required.',
    breadcrumbName: 'Photo Collage Maker',
    sec1Heading: 'How to design clean, intentional photo collages',
    sec1P1: 'A great photo collage tells a cohesive visual story rather than crowding random images into a cluttered box. When designing a collage, start by selecting a purposeful aspect ratio based on where the image will be seen: square (1:1) for portfolio feeds, portrait (4:5) for standard social posts, vertical (9:16) for mobile stories, or widescreen (16:9) for website hero banners and print posters.',
    sec1P2: 'Pay close attention to visual balance. Place your strongest hero image in the largest cell, and support it with detail or atmospheric shots in adjacent tiles. Keep gutter spacing consistent throughout the layout to give each photograph room to breathe.',
    sec2Heading: 'Why Make Contact Sheet is a better collage tool for creators',
    sec2P1: 'Most online collage makers are bloated design tools that push subscription upgrades, plaster watermarks on exports, and require you to upload your personal photos to their servers. Make Contact Sheet takes a minimalist, privacy-first approach: clean geometric templates, adjustable borders and margins, uncompromised full-resolution exports, and 100% local processing.',
    faqs: [
      { question: 'How do I make a photo collage online for free?', answer: 'Select a template preset in Make Contact Sheet (such as a 2×2 grid, three-photo strip, or 9:16 mobile story layout), drag your photos into the dropzone, adjust spacing or background colors, and export your high-resolution collage instantly as a PNG or JPEG.' },
      { question: 'Do I need to sign up or create an account?', answer: 'No. Make Contact Sheet is completely free and requires no account, email address, or software installation.' },
      { question: 'Can I create before-and-after photo comparisons?', answer: 'Yes. Make Contact Sheet includes dedicated side-by-side comparison templates designed for retouching portfolios, product showcases, and fitness transformations.' },
      { question: 'What resolution are exported collages?', answer: 'Make Contact Sheet exports collages at full studio resolution (up to 4K / 300 DPI) ensuring sharp prints and crisp social media uploads.' }
    ]
  },
  es: {
    title: 'Creador de collages de fotos en línea — Diseños de cuadrícula y relatos',
    description: 'Crea collages de fotos gratis en línea. Elige cuadrículas simétricas, trípticos o formatos para redes sociales. Exportaciones en alta resolución sin subir archivos.',
    heading: 'Creador de Collages de Fotos Gratis en Línea',
    lead: 'Combina múltiples imágenes en cuadrículas equilibradas, trípticos narrativos y formatos para redes. Rápido, privado y gratuito, sin registros ni cargas en la nube.',
    breadcrumbName: 'Creador de collages',
    sec1Heading: 'Cómo diseñar collages de fotos limpios e intencionados',
    sec1P1: 'Un buen collage de fotos cuenta una historia visual coherente en lugar de amontonar imágenes al azar en un recuadro sobrecargado. Al diseñar un collage, comienza seleccionando una relación de aspecto deliberada según su destino: cuadrada (1:1) para portafolios, vertical (4:5) para redes sociales, formato historia (9:16) para móviles o panorámica (16:9) para cabeceras web y pósteres.',
    sec1P2: 'Presta especial atención al equilibrio visual. Coloca tu imagen principal más fuerte en la celda más grande y apóyala con tomas de detalle o ambientales en las celdas contiguas. Mantén un espaciado regular para que cada fotografía respire.',
    sec2Heading: 'Por qué Make Contact Sheet es una mejor herramienta de collage',
    sec2P1: 'La mayoría de los creadores de collages en línea son herramientas saturadas que imponen suscripciones, colocan marcas de agua forzadas y exigen subir fotos a servidores remotos. Make Contact Sheet adopta un enfoque minimalista y centrado en la privacidad: plantillas geométricas limpias, márgenes ajustables, exportaciones a resolución completa y procesamiento 100% local.',
    faqs: [
      { question: '¿Cómo hago un collage de fotos en línea gratis?', answer: 'Selecciona una plantilla predefinida en Make Contact Sheet (como cuadrícula 2×2, tira de tres fotos o formato historia 9:16), arrastra tus fotos a la zona de colocación, ajusta los espacios o colores de fondo y exporta tu collage en alta resolución instantáneamente en PNG o JPEG.' },
      { question: '¿Necesito registrarme o crear una cuenta?', answer: 'No. Make Contact Sheet es completamente gratuito y no requiere cuenta, dirección de correo ni instalación de software.' },
      { question: '¿Puedo crear comparaciones de fotos antes y después?', answer: 'Sí. Make Contact Sheet incluye plantillas de comparación lado a lado diseñadas para portafolios de retoque, presentaciones de productos y transformaciones físicas.' },
      { question: '¿A qué resolución se exportan los collages?', answer: 'Make Contact Sheet exporta los collages a resolución de estudio completa (hasta 4K / 300 DPI), asegurando impresiones nítidas y publicaciones impecables en redes sociales.' }
    ]
  },
  de: {
    title: 'Online Fotocollagen-Ersteller — Kostenlose Raster- & Story-Layouts',
    description: 'Kostenlose Fotocollagen online erstellen. Wähle aus geometrischen Rastern, Triptychen und Social-Media-Formaten. 100% lokal ohne Uploads.',
    heading: 'Kostenloser Online Fotocollagen-Ersteller',
    lead: 'Kombiniere mehrere Bilder zu ausgewogenen Rastern, erzählerischen Triptychen und Social-Formaten. Schnell, privat und kostenlos ohne Registrierung oder Cloud-Upload.',
    breadcrumbName: 'Collagen-Ersteller',
    sec1Heading: 'Klare und stimmige Fotocollagen gestalten',
    sec1P1: 'Eine gelungene Collage erzählt eine zusammenhängende visuelle Geschichte. Beginne mit einem zielgerichteten Seitenverhältnis: Quadrat (1:1) für Feeds, Porträt (4:5) für Social Media, 9:16 für Stories oder 16:9 für Web-Banner und Poster.',
    sec1P2: 'Achte auf visuelle Ausgewogenheit. Platziere dein stärkstes Hauptmotiv in der größten Kachel und ergänze es mit stimmungsvollen Detailaufnahmen in den Nachbarfeldern.',
    sec2Heading: 'Warum Make Contact Sheet das bessere Collagen-Tool ist',
    sec2P1: 'Viele Online-Generatoren überfordern mit Upgrade-Meldungen, Wasserzeichen und Datenuploads. Make Contact Sheet setzt auf geometrische Vorlagen, anpassbare Ränder und hochauflösende Exporte ohne Serverkontakt.',
    faqs: [
      { question: 'Wie erstelle ich kostenlos eine Fotocollage?', answer: 'Wähle eine Vorlage (z. B. 2×2-Raster, 3er-Streifen oder 9:16-Story), ziehe deine Bilder hinein, passe Abstände oder Hintergrund an und exportiere sofort als PNG oder JPEG.' },
      { question: 'Ist ein Benutzerkonto erforderlich?', answer: 'Nein. Make Contact Sheet ist komplett kostenlos und erfordert weder Registrierung noch E-Mail-Adresse.' },
      { question: 'Kann ich Vorher-Nachher-Vergleiche erstellen?', answer: 'Ja. Es stehen spezielle Vorlagen für Vorher-Nachher-Gegenüberstellungen bereit.' },
      { question: 'Welche Auflösung haben die exportierten Collagen?', answer: 'Exporte erfolgen in voller Studioauflösung (bis zu 4K / 300 DPI) für gestochen scharfe Drucke und Social-Media-Beiträge.' }
    ]
  },
  fr: {
    title: 'Créateur de collage photo en ligne — Mises en page en grille gratuites',
    description: 'Créez des collages photo gratuits en ligne. Choisissez parmi des grilles géométriques, triptyques et formats réseaux sociaux. Aucun téléversement requis.',
    heading: 'Créateur de Collage Photo Gratuit en Ligne',
    lead: 'Assemblez plusieurs images dans des grilles équilibrées, des triptyques narratifs et des formats pour réseaux sociaux. Rapide, privé et gratuit.',
    breadcrumbName: 'Créateur de collage',
    sec1Heading: 'Concevoir des collages photo épurés et harmonieux',
    sec1P1: 'Un collage réussi raconte une histoire cohérente. Choisissez d\'abord le bon ratio : carré (1:1) pour les flux, portrait (4:5) pour les réseaux, vertical (9:16) pour les stories ou panoramique (16:9) pour les bannières web.',
    sec1P2: 'Mettez en valeur votre image principale dans l\'emplacement le plus spacieux et entourez-la de clichés d\'ambiance tout en conservant des gouttières régulières.',
    sec2Heading: 'Pourquoi Make Contact Sheet est un meilleur outil de collage',
    sec2P1: 'La plupart des outils en ligne imposent des abonnements, des filigranes et des téléversements forcés. Make Contact Sheet privilégie la simplicité : modèles géométriques épurés, marges personnalisables et export haute définition local.',
    faqs: [
      { question: 'Comment créer un collage photo gratuitement ?', answer: 'Sélectionnez un modèle prédéfini (grille 2×2, triptyque ou story 9:16), glissez vos clichés, ajustez espacements et couleurs de fond, puis exportez en PNG ou JPEG.' },
      { question: 'Faut-il créer un compte ?', answer: 'Non. L\'outil est entièrement libre d\'accès, sans inscription ni coordonnées requises.' },
      { question: 'Peut-on réaliser des comparatifs avant/après ?', answer: 'Oui, des modèles côte à côte sont spécialement prévus pour la retouche et les présentations de projets.' },
      { question: 'Quelle est la résolution maximale d\'exportation ?', answer: 'Les exports sont générés en pleine résolution studio (jusqu\'à 4K / 300 DPI) pour des impressions nettes.' }
    ]
  },
  ja: {
    title: '無料写真コラージュ作成ツール — グリッド＆ストーリーレイアウト',
    description: 'ブラウザ上で簡単に写真コラージュを作成。美しい幾何学グリッド、ストーリー仕立てのトリプティク、SNS用フォーマットに対応。会員登録不要・完全無料。',
    heading: '無料オンライン 写真コラージュ作成ツール',
    lead: '複数の写真をバランスの取れたグリッドや魅力的なトリプティク（3枚組）、SNS用フォーマットに素早くレイアウト。クラウドへのアップロードや会員登録は一切不要の安全・高速ツールです。',
    breadcrumbName: 'コラージュ作成',
    sec1Heading: '洗練された写真コラージュのデザイン手法',
    sec1P1: '優れたコラージュは、ただ写真を詰め込むのではなく、1つの統一されたビジュアルストーリーを伝えます。まずは掲載先に合わせたアスペクト比を選択しましょう：ポートフォリオ用の正方形（1:1）、SNS投稿用の縦長（4:5）、スマートフォン用ストーリー（9:16）、Webバナー用のワイド（16:9）など。',
    sec1P2: '視覚的なバランスにも配慮が必要です。最も印象的なメイン写真を一番大きな枠に配置し、周囲にディテールや空気感を伝えるサブ写真を並べます。写真間の余白を均一に保つことで、すっきりと洗練された仕上がりになります。',
    sec2Heading: 'クリエイターがMake Contact Sheetを選ぶ理由',
    sec2P1: '市販のコラージュアプリの多くは、煩わしい有料課金の誘導やウォーターマークの強制挿入、写真のクラウド送信を伴います。Make Contact Sheetは、無駄のない幾何学デザイン、調整可能な余白、最高画質出力、そして100%ローカル処理というプライバシー最優先のアプローチを採用しています。',
    faqs: [
      { question: '無料で写真コラージュを作る手順は？', answer: '2×2グリッドや3連ストリップ、9:16モバイルストーリーなどのテンプレートを選び、写真をドラッグ＆ドロップして間隔や背景色を整えるだけです。PNGまたはJPEGで瞬時に書き出せます。' },
      { question: 'アカウント登録やログインは必要ですか？', answer: '一切不要です。メールアドレスの登録やソフトのインストールなしで、誰でもすぐに使い始められます。' },
      { question: 'Before/Afterの比較画像は作れますか？', answer: 'はい。レタッチ前後やビフォーアフターの比較に特化した横並びテンプレートを用意しています。' },
      { question: '書き出されるコラージュの解像度は？', answer: '最大4K / 300 DPIの高解像度で出力されるため、印刷用ポスターや高画質なSNS投稿にもそのまま使用できます。' }
    ]
  },
  pt: {
    title: 'Criador de colagem de fotos online — Layouts em grade e histórias visuais',
    description: 'Crie colagens de fotos grátis online. Escolha grades geométricas, trípticos e formatos para redes sociais. Exportação em alta resolução sem uploads.',
    heading: 'Criador de Colagem de Fotos Online Grátis',
    lead: 'Combine várias imagens em grades harmoniosas, trípticos narrativos e formatos para redes sociais. Rápido, privado e gratuito, sem necessidade de cadastro ou uploads.',
    breadcrumbName: 'Criador de colagem',
    sec1Heading: 'Como projetar colagens de fotos harmoniosas e elegantes',
    sec1P1: 'Uma boa colagem conta uma história visual coesa em vez de apenas aglomerar imagens. Comece escolhendo a proporção adequada: quadrado (1:1) para feeds, retrato (4:5) para redes sociais, formato vertical (9:16) para stories ou panorâmico (16:9) para banners e pôsteres.',
    sec1P2: 'Dê atenção ao equilíbrio visual. Posicione sua foto principal na célula de maior destaque e complemente com detalhes e fotos de ambientação nas células adjacentes.',
    sec2Heading: 'Por que o Make Contact Sheet é a melhor ferramenta de colagem',
    sec2P1: 'Muitos criadores de colagem online empurram planos pagos, inserem marcas d\'água indesejadas e exigem o envio de fotos para a nuvem. O Make Contact Sheet aposta na simplicidade: modelos geométricos limpos, margens ajustáveis, exportações na resolução máxima e processamento 100% local.',
    faqs: [
      { question: 'Como faço uma colagem de fotos online grátis?', answer: 'Selecione um modelo (grade 2×2, faixa de 3 fotos ou story 9:16), arraste suas fotos para a área de edição, ajuste as margens e exporte instantaneamente em PNG ou JPEG.' },
      { question: 'É necessário criar uma conta?', answer: 'Não. O Make Contact Sheet é totalmente gratuito e não exige cadastro, e-mail ou instalação.' },
      { question: 'É possível criar comparações antes e depois?', answer: 'Sim, há modelos lado a lado específicos para portfólios de retoque e demonstrações visuais.' },
      { question: 'Qual é a resolução das colagens exportadas?', answer: 'As imagens são exportadas em resolução máxima de estúdio (até 4K / 300 DPI), ideais para impressão e redes sociais.' }
    ]
  }
};

// -------------------------------------------------------------
// 3. MOOD BOARD MAKER (/mood-board-maker)
// -------------------------------------------------------------
export interface MoodBoardToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  badge: string;
  breadcrumbName: string;
  btnStudio: string;
  btnCollage: string;
  btnContactSheet: string;
  guideHeading: string;
  guideLead: string;
  pillars: PillarItem[];
  faqs: ToolFaq[];
}

export const MOODBOARD_DATA: Record<Locale, MoodBoardToolData> = {
  en: {
    title: 'Mood Board Maker — Free Online Visual Direction Studio',
    description: 'Design mood boards and lookbooks for free on a freeform canvas. Drag photos, add color swatches and notes, then export at 300 DPI.',
    heading: 'Free Online Mood Board Maker',
    lead: 'Curate aesthetic visual stories, fashion lookbooks, and photo concept boards. Arrange images on a tactile freeform canvas with magnetic snapping guides, color swatches, stylist sticky notes, and 300 DPI exports.',
    badge: '100% PRIVATE FREEFORM CANVAS',
    breadcrumbName: 'Mood Board Maker',
    btnStudio: 'Launch Mood Board Studio',
    btnCollage: 'Photo Collage Maker',
    btnContactSheet: 'Contact Sheet Studio',
    guideHeading: 'Visual Direction Crafted for Photographers & Art Directors',
    guideLead: 'A compelling mood board establishes tone, palette, and composition before the first shutter clicks. Make Contact Sheet provides an unconstrained freeform workspace designed specifically for creative production workflows.',
    pillars: [
      { title: 'Freeform Canvas & Snapping', desc: 'Freely position, scale, rotate, and layer visual assets. Magnetic snapping guides ensure precise element-to-element alignment without rigid grid constraints.', emoji: '📐', icon: 'crop' },
      { title: 'Color Palettes & Notes', desc: 'Add harmonic color swatch pills, typography labels, and sticky notes to capture mood, lighting instructions, wardrobe references, and styling notes.', emoji: '🎨', icon: 'columns' },
      { title: 'High-DPI 300 DPI Export', desc: 'Export uncompressed high-resolution PNGs, web-optimized JPEGs, or multi-page presentation PDFs ready for client pitches, creative decks, and studio wall prints.', emoji: '🖨️', icon: 'download' }
    ],
    faqs: [
      { question: 'How do I create a photo mood board in Make Contact Sheet?', answer: 'Simply drag and drop your inspiration photos directly onto the canvas. You can freely position, resize, rotate, and layer images, add typographic text notes and color swatches, and align elements using real-time magnetic snapping guides. When you are finished, export your high-resolution mood board as a PNG, JPEG, or 300 DPI print-ready PDF.' },
      { question: 'Are my inspiration photos uploaded to any server?', answer: 'No. Just like our contact sheet and collage tools, the mood board workspace operates 100% locally in your web browser. Your images, notes, color swatches, and compositions never leave your device.' },
      { question: 'Can I add custom color palettes and text annotations?', answer: 'Yes! You can add customizable color swatch pills, sticky notes, headlines, and captions alongside your photos to communicate color harmonies, lighting references, wardrobe cues, and aesthetic direction.' },
      { question: 'What canvas aspect ratios and export resolutions are supported?', answer: 'You can choose from standard presentation aspect ratios including 16:9 widescreen, 4:3 presentation, 1:1 square, 9:16 mobile story, or custom pixel dimensions. Exports are generated at full high-DPI resolution (up to 4K / 300 DPI) for razor-sharp client presentations and studio printouts.' },
      { question: 'Is Make Contact Sheet free to use?', answer: 'Yes. The mood board tool is completely free to use with no account signups, subscriptions, or watermarks on your exports.' }
    ]
  },
  es: {
    title: 'Creador de Mood Boards gratuito en línea — Estudio de dirección visual',
    description: 'Diseña mood boards y lookbooks gratis en un lienzo libre. Arrastra fotos, añade muestras de color y notas, y exporta a 300 DPI.',
    heading: 'Creador de Mood Boards Gratis en Línea',
    lead: 'Comisaría relatos visuales estéticos, lookbooks de moda y paneles conceptuales para fotos. Organiza imágenes en un lienzo táctil con guías magnéticas, muestras de color, notas adhesivas y exportación a 300 DPI.',
    badge: 'LIENZO LIBRE 100% PRIVADO',
    breadcrumbName: 'Creador de Mood Boards',
    btnStudio: 'Iniciar estudio de Mood Board',
    btnCollage: 'Creador de collages',
    btnContactSheet: 'Estudio de hojas de contactos',
    guideHeading: 'Dirección visual creada para Fotógrafos y Directores de Arte',
    guideLead: 'Un mood board convincente define el tono, la paleta y la composición antes del primer disparo. Make Contact Sheet proporciona un espacio libre diseñado específicamente para flujos de producción creativos.',
    pillars: [
      { title: 'Lienzo libre y ajuste magnético', desc: 'Posiciona, escala, rota y superpone imágenes con total libertad. Las guías magnéticas aseguran una alineación perfecta entre elementos sin cuadrículas rígidas.', emoji: '📐', icon: 'crop' },
      { title: 'Paletas de color y notas', desc: 'Añade muestras cromáticas personalizadas, etiquetas tipográficas y notas adhesivas para capturar iluminación, vestuario e instrucciones de estilismo.', emoji: '🎨', icon: 'columns' },
      { title: 'Exportación a 300 DPI para impresión', desc: 'Exporta PNGs sin compresión, JPEGs optimizados para la web o PDFs para presentaciones listos para reuniones con clientes y paredes de estudio.', emoji: '🖨️', icon: 'download' }
    ],
    faqs: [
      { question: '¿Cómo creo un mood board en Make Contact Sheet?', answer: 'Simplemente arrastra y suelta tus fotos de inspiración en el lienzo. Puedes colocarlas, redimensionarlas, rotarlas y organizarlas por capas libremente, agregar notas y muestras de color, y exportar tu composición en PNG, JPEG o PDF a 300 DPI.' },
      { question: '¿Se suben mis fotos de inspiración a algún servidor?', answer: 'No. El espacio de trabajo de mood boards funciona 100% localmente en tu navegador. Tus fotos, notas y paletas nunca salen de tu ordenador.' },
      { question: '¿Puedo añadir paletas de color personalizadas y notas de texto?', answer: '¡Sí! Puedes añadir muestras de color con códigos hex, notas adhesivas de estilista y titulares para comunicar armonías de color y referencias de iluminación.' },
      { question: '¿Qué relaciones de aspecto y resoluciones se admiten?', answer: 'Puedes elegir entre formatos estándar como 16:9 panorámico, 4:3 presentación, 1:1 cuadrado, 9:16 historia móvil o dimensiones personalizadas, exportando a 300 DPI.' },
      { question: '¿Es gratuito Make Contact Sheet?', answer: 'Sí. La herramienta es completamente gratuita, sin suscripciones, registros ni marcas de agua en tus exportaciones.' }
    ]
  },
  de: {
    title: 'Kostenloser Moodboard-Ersteller online — Visuelles Regie-Studio',
    description: 'Gestalte ästhetische Moodboards und Lookbooks auf einer freien Arbeitsfläche. Fotos anordnen, Farbfelder & Notizen hinzufügen, 300 DPI Export.',
    heading: 'Kostenloser Online Moodboard-Ersteller',
    lead: 'Entwickle visuelle Geschichten, Fashion-Lookbooks und Foto-Konzeptboards. Arrangiere Bilder auf einer freien Arbeitsfläche mit magnetischen Hilfslinien, Farbfeldern, Notizen und 300-DPI-Export.',
    badge: '100% PRIVATE FREIE ARBEITSFLÄCHE',
    breadcrumbName: 'Moodboard-Ersteller',
    btnStudio: 'Moodboard-Studio starten',
    btnCollage: 'Collagen-Ersteller',
    btnContactSheet: 'Kontaktabzug-Studio',
    guideHeading: 'Visuelle Richtung für Fotografen & Art Directors',
    guideLead: 'Ein überzeugendes Moodboard definiert Stimmung, Farbwelt und Komposition vor dem ersten Auslösen. Make Contact Sheet bietet den perfekten freien Arbeitsbereich dafür.',
    pillars: [
      { title: 'Freie Arbeitsfläche & Snapping', desc: 'Bilder frei skalieren, rotieren und ebenenweise anordnen. Magnetische Hilfslinien garantieren exakte Ausrichtung ohne starres Gitter.', emoji: '📐', icon: 'crop' },
      { title: 'Farbpaletten & Textnotizen', desc: 'Erstelle harmonische Farbfelder, Beschriftungen und Notizen für Lichtstimmung, Styling und Modellhinweise.', emoji: '🎨', icon: 'columns' },
      { title: '300 DPI High-Res Export', desc: 'Exportiere unkomprimierte PNGs, weboptimierte JPEGs oder druckfertige PDFs für Kundenpräsentationen und Moodboard-Wände.', emoji: '🖨️', icon: 'download' }
    ],
    faqs: [
      { question: 'Wie erstelle ich ein Moodboard in Make Contact Sheet?', answer: 'Ziehe Inspirationsfotos direkt auf die Arbeitsfläche. Du kannst Bilder skalieren, drehen, Farbfelder und Notizen ergänzen und als hochauflösendes PDF oder Bild exportieren.' },
      { question: 'Werden meine Bilder irgendwo hochgeladen?', answer: 'Nein. Der gesamte Moodboard-Arbeitsplatz läuft zu 100% lokal im Browser. Deine Bilder und Notizen bleiben auf deinem Computer.' },
      { question: 'Kann ich eigene Farbmuster und Notizen anlegen?', answer: 'Ja! Ergänze Farbfelder mit Hex-Werten sowie Notizen für Licht- und Styling-Vorgaben.' },
      { question: 'Welche Seitenverhältnisse werden unterstützt?', answer: 'Unterstützt werden 16:9 Breitbild, 4:3, 1:1 Quadrat, 9:16 Story oder frei definierbare Abmessungen bei bis zu 300 DPI.' },
      { question: 'Ist Make Contact Sheet kostenlos?', answer: 'Ja, vollständig kostenlos, ohne Abos, Registrierungen oder störende Wasserzeichen.' }
    ]
  },
  fr: {
    title: 'Créateur de mood board gratuit en ligne — Studio de direction visuelle',
    description: 'Concevez des mood boards et lookbooks esthétiques sur toile libre. Photos, nuanciers de couleurs, notes adhésives et export 300 DPI.',
    heading: 'Créateur de Mood Board Gratuit en Ligne',
    lead: 'Composez des récits visuels, des lookbooks de mode et des planches de tendances. Disposez librement vos images avec repères magnétiques, nuanciers de couleurs, notes de styliste et export 300 DPI.',
    badge: 'TOILE LIBRE 100% PRIVÉE',
    breadcrumbName: 'Mood board',
    btnStudio: 'Lancer le studio Mood Board',
    btnCollage: 'Créateur de collage',
    btnContactSheet: 'Studio planche contact',
    guideHeading: 'Direction visuelle pensée pour Photographes & Directeurs Artistiques',
    guideLead: 'Un mood board réussi pose l\'ambiance, la colorimétrie et la lumière avant la prise de vue. Make Contact Sheet propose un espace fluide taillé pour les flux créatifs.',
    pillars: [
      { title: 'Toile libre et aimantation', desc: 'Positionnez, redimensionnez et superposez vos visuels en toute liberté avec repères magnétiques d\'alignement.', emoji: '📐', icon: 'crop' },
      { title: 'Palettes & annotations', desc: 'Ajoutez des pastilles chromatiques, des légendes typographiques et des post-its pour préciser coiffure, maquillage et éclairage.', emoji: '🎨', icon: 'columns' },
      { title: 'Export 300 DPI haute définition', desc: 'Exportez en PNG non compressé, JPEG web ou PDF haute qualité pour vos dossiers de présentation et affichages studio.', emoji: '🖨️', icon: 'download' }
    ],
    faqs: [
      { question: 'Comment concevoir un mood board ?', answer: 'Glissez vos images d\'inspiration sur la toile, disposez-les librement, ajoutez des échantillons de couleurs et notes de texte, puis exportez en PDF 300 DPI ou image HD.' },
      { question: 'Mes photos sont-elles envoyées sur un serveur ?', answer: 'Non. Le studio fonctionne à 100% dans votre navigateur sans aucune fuite de données vers l\'extérieur.' },
      { question: 'Puis-je intégrer mes propres teintes de couleurs ?', answer: 'Oui, créez des pastilles de teintes personnalisées avec codes hexadécimaux et indications de style.' },
      { question: 'Quels formats et résolutions sont supportés ?', answer: 'Les formats 16:9, 4:3, carré 1:1, story 9:16 ou dimensions personnalisées sont gérés jusqu\'à 300 DPI.' },
      { question: 'L\'outil est-il gratuit ?', answer: 'Oui, sans abonnement, sans création de compte et sans filigrane imposé.' }
    ]
  },
  ja: {
    title: '無料ムードボード作成ツール — ビジュアルディレクションスタジオ',
    description: '直感的なフリーフォームキャンバスで写真ムードボードやルックブックを作成。自由な写真配置、カラーパレット、付箋メモ、300 DPI印刷対応。',
    heading: '無料オンライン ムードボード作成ツール',
    lead: '世界観を伝えるビジュアルストーリー、ファッションのルックブック、撮影コンセプトボードを自由にデザイン。マグネットスナップ対応のキャンバスに写真を並べ、カラースウォッチや指示メモを添えて300 DPIで出力できます。',
    badge: '100% プライベートなフリーフォームキャンバス',
    breadcrumbName: 'ムードボード作成',
    btnStudio: 'ムードボードスタジオを開く',
    btnCollage: 'コラージュ作成ツール',
    btnContactSheet: 'コンタクトシートスタジオ',
    guideHeading: '写真家とアートディレクターのためのビジュアルディレクション',
    guideLead: '優れたムードボードは、最初のシャッターを切る前にプロジェクトのトーン、色彩、構図の共通認識を確立します。柔軟な制作現場のニーズに応える自由度の高いワークスペースです。',
    pillars: [
      { title: '自由な配置とマグネットスナップ', desc: '画像の移動、拡大縮小、回転、レイヤーの前後入れ替えが思いのまま。マグネット吸着ガイドにより、グリッドに縛られず綺麗に整列できます。', emoji: '📐', icon: 'crop' },
      { title: 'カラーパレット＆付箋メモ', desc: 'キーカラーを示すスウォッチや付箋メモを追加して、照明のトーンや衣装のスタイリング指示を視覚的に共有できます。', emoji: '🎨', icon: 'columns' },
      { title: '300 DPI 高解像度出力', desc: '非圧縮PNG、Web用JPEG、高画質PDFに対応。クライアントへの企画提案書やスタジオの壁面掲示用印刷にそのまま使えます。', emoji: '🖨️', icon: 'download' }
    ],
    faqs: [
      { question: 'ムードボードを作る手順は？', answer: 'インスピレーション写真をキャンバスに直接ドロップし、直感的に配置・リサイズします。カラースウォッチやテキストメモを追加して、高解像度PNG、JPEG、PDFとして出力します。' },
      { question: 'アップロードした写真がサーバーに保存される心配はありますか？', answer: 'ありません。本ツールの処理はすべてお使いのブラウザ内（ローカル）で行われるため、画像データが外部サーバーへ送信されることは一切ありません。' },
      { question: '独自のカラーパレットやテキスト注釈を追加できますか？', answer: 'はい。Hexカラーコード付きのカラースウォッチや、衣装・照明指示を記載できるスタイリスト用付箋メモを自由に配置できます。' },
      { question: '対応しているアスペクト比と解像度は？', answer: '16:9ワイド、4:3プレゼン、1:1スクエア、9:16モバイルストーリー、カスタム寸法に対応し、最大300 DPIで出力できます。' },
      { question: '無料で利用できますか？', answer: 'はい。登録不要、透かし（ウォーターマーク）なしで完全無料でお使いいただけます。' }
    ]
  },
  pt: {
    title: 'Criador de mood board gratuito online — Estúdio de direção visual',
    description: 'Crie mood boards e lookbooks em tela livre. Arraste fotos, monte paletas de cores, adicione notas e exporte a 300 DPI.',
    heading: 'Criador de Mood Board Gratuito Online',
    lead: 'Construa narrativas visuais marcantes, lookbooks de moda e painéis conceituais. Organize imagens em uma tela livre com guias magnéticas, amostras de cores, notas adesivas e exportação a 300 DPI.',
    badge: 'TELA LIVRE 100% PRIVADA',
    breadcrumbName: 'Mood board',
    btnStudio: 'Iniciar estúdio de Mood Board',
    btnCollage: 'Criador de colagens',
    btnContactSheet: 'Estúdio de folhas de contato',
    guideHeading: 'Direção visual pensada para Fotógrafos e Diretores de Arte',
    guideLead: 'Um bom mood board alinha conceito, paleta cromática e iluminação antes do primeiro clique. O Make Contact Sheet oferece uma área de trabalho livre feita para a produção criativa.',
    pillars: [
      { title: 'Tela livre e guias magnéticas', desc: 'Posicione, redimensione, gire e sobreponha fotos livremente. As guias magnéticas garantem alinhamento preciso sem amarras de grade.', emoji: '📐', icon: 'crop' },
      { title: 'Paletas de cores e anotações', desc: 'Crie amostras de cores com códigos hexadecimais, legendas e notas adesivas para orientar iluminação, figurino e estilo.', emoji: '🎨', icon: 'columns' },
      { title: 'Exportação em alta definição 300 DPI', desc: 'Exporte em PNG sem perdas, JPEG otimizado ou PDF para apresentações a clientes e impressão em estúdio.', emoji: '🖨️', icon: 'download' }
    ],
    faqs: [
      { question: 'Como montar um mood board?', answer: 'Arraste suas fotos de referência para a tela, ajuste posições e tamanhos, inclua amostras de cores e anotações e exporte em PNG, JPEG ou PDF a 300 DPI.' },
      { question: 'Minhas imagens são enviadas para algum servidor?', answer: 'Não. O estúdio de mood board opera 100% localmente no navegador. Suas fotos e anotações não saem do seu computador.' },
      { question: 'Posso adicionar paletas de cores personalizadas?', answer: 'Sim, você pode adicionar amostras com código hex e notas adesivas com orientações de figurino e luz.' },
      { question: 'Quais proporções de tela são suportadas?', answer: 'São suportados os formatos 16:9 widescreen, 4:3, quadrado 1:1, story 9:16 e medidas personalizadas em até 300 DPI.' },
      { question: 'O Make Contact Sheet é gratuito?', answer: 'Sim, totalmente gratuito, sem assinaturas, sem cadastros e sem marcas d\'água.' }
    ]
  }
};

// -------------------------------------------------------------
// 4. BATCH PHOTO TOOLS (/batch-photo-tools)
// -------------------------------------------------------------
export interface BatchPhotoToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  badge: string;
  breadcrumbName: string;
  btnContactSheet: string;
  btnCollage: string;
  sectionHeading: string;
  sectionLead: string;
  pillars: PillarItem[];
  faqs: ToolFaq[];
}

export const BATCH_TOOLS_DATA: Record<Locale, BatchPhotoToolData> = {
  en: {
    title: 'Batch Photo Editor — Rename, Convert & Extract EXIF',
    description: 'Free batch photo editing tools: rename files with tokens, extract EXIF data, and convert image formats locally. No uploads or installs required.',
    heading: 'Free Batch Photo Tools & Operations',
    lead: 'Streamline your photography proofing workflow. Batch rename photos with dynamic token recipes, inspect technical camera EXIF metadata, and convert image formats directly in your browser with zero server uploads.',
    badge: '100% IN-BROWSER PRIVATE SUITE',
    breadcrumbName: 'Batch Photo Tools',
    btnContactSheet: 'Open Contact Sheet Studio',
    btnCollage: 'Photo Collage Maker',
    sectionHeading: 'Designed for Professional Photography Workflows',
    sectionLead: 'Whether you are delivering client proof sheets, organizing thousands of camera roll frames, or extracting technical shoot parameters, Make Contact Sheet provides zero-install, private tools running entirely on your machine.',
    pillars: [
      { title: 'Dynamic Token Recipes', desc: 'Construct sequential naming formats with customizable zero-padding (001, 0001), prefixes, suffixes, and camera EXIF parameters. Export executable shell scripts for instant local execution.', emoji: '🏷️', icon: 'file-text' },
      { title: 'Deep EXIF Extraction', desc: 'Inspect camera bodies, lenses, focal lengths, apertures, shutter speeds, and ISO values across your entire shoot in a consolidated, downloadable table formatted for spreadsheets and Lightroom catalogs.', emoji: '📷', icon: 'camera' },
      { title: 'Zero-Upload Privacy', desc: 'Unlike cloud-based converters and upload services, Make Contact Sheet executes every operation in local browser memory using modern web standards. Your commercial client files remain strictly confidential.', emoji: '🔒', icon: 'shield' }
    ],
    faqs: [
      { question: 'How does the batch photo rename tool work?', answer: 'The batch photo renamer allows you to construct custom naming recipes using prefixes, sequenced index numbers with zero-padding (e.g. 001, 0001), suffixes, and dynamic metadata tokens ({name}, {date}, {camera}, {fstop}, {iso}). You can preview the changes in real time and download a local Mac/Linux Bash (.sh) script, Windows PowerShell (.ps1) script, or CSV mapping table to apply the renames directly on your device.' },
      { question: 'Can I extract EXIF camera settings for my whole photo shoot?', answer: 'Yes! When you drop your images or a whole directory into the tool, Make Contact Sheet reads the camera make and model, lens details, focal length, aperture (f-number), shutter speed, ISO, and original capture timestamps using client-side binary parsing. You can export this technical data into a CSV spreadsheet or Lightroom search filter query with one click.' },
      { question: 'Does Make Contact Sheet upload my files to any server?', answer: 'No. All file operations, decoding, thumbnail generation, EXIF parsing, and format conversions execute 100% locally in your browser. Your images and filenames never leave your computer.' },
      { question: 'Can I send my batch directly to the Contact Sheet or Collage Maker?', answer: 'Yes! Clicking "Send to Studio" immediately loads your batch into the interactive light-table workspace, where you can arrange photos on A4/Letter proof sheets, review picks with keyboard shortcuts, and export high-DPI PDF contact sheets.' }
    ]
  },
  es: {
    title: 'Herramientas de fotos por lotes — Renombrado, EXIF y conversor',
    description: 'Renombra fotos por lotes con tokens, extrae metadatos EXIF y convierte formatos de imagen localmente en tu navegador. 100% privado.',
    heading: 'Herramientas y Operaciones de Fotos por Lotes Gratis',
    lead: 'Optimiza tu flujo de trabajo fotográfico. Renombra fotos por lotes con recetas dinámicas de tokens, inspecciona metadatos técnicos EXIF de cámara y convierte formatos directamente en tu navegador sin subir nada a servidores.',
    badge: 'SUITE PRIVADA 100% EN EL NAVEGADOR',
    breadcrumbName: 'Herramientas por lotes',
    btnContactSheet: 'Abrir estudio de hojas de contactos',
    btnCollage: 'Creador de collages',
    sectionHeading: 'Diseñado para flujos de trabajo de Fotografía Profesional',
    sectionLead: 'Ya sea que entregues hojas de pruebas a clientes, organices miles de tomas de cámara o extraigas parámetros técnicos, Make Contact Sheet ofrece herramientas privadas sin instalación que se ejecutan enteramente en tu máquina.',
    pillars: [
      { title: 'Recetas dinámicas con tokens', desc: 'Construye nombres secuenciales con relleno de ceros personalizable (001, 0001), prefijos, sufijos y parámetros EXIF de cámara. Exporta scripts de shell para ejecución local instantánea.', emoji: '🏷️', icon: 'file-text' },
      { title: 'Extracción profunda de EXIF', desc: 'Inspecciona cuerpos de cámara, objetivos, distancias focales, aperturas, velocidades de obturación e ISOs de toda la sesión en una tabla descargable.', emoji: '📷', icon: 'camera' },
      { title: 'Privacidad absoluta sin cargas', desc: 'A diferencia de los convertidores en la nube, cada operación se ejecuta en la memoria local del navegador. Los archivos comerciales de tus clientes permanecen estrictamente confidenciales.', emoji: '🔒', icon: 'shield' }
    ],
    faqs: [
      { question: '¿Cómo funciona la herramienta de renombrado de fotos por lotes?', answer: 'Permite construir recetas personalizadas con prefijos, números correlativos con ceros a la izquierda (001, 0001), sufijos y tokens de metadatos ({name}, {date}, {camera}, {fstop}, {iso}). Puedes previsualizar en tiempo real y descargar un script de Bash (.sh), PowerShell (.ps1) o archivo CSV.' },
      { question: '¿Puedo extraer los ajustes técnicos EXIF de toda una sesión?', answer: '¡Sí! Al soltar tus imágenes o una carpeta, el sistema lee la marca y modelo de cámara, objetivo, distancia focal, apertura, velocidad, ISO y fecha de captura mediante análisis binario en el navegador. Puedes exportar esta información a una hoja de cálculo CSV.' },
      { question: '¿Sube Make Contact Sheet mis archivos a algún servidor?', answer: 'No. Todas las operaciones de decodificación, generación de miniaturas, análisis EXIF y conversión de formato se ejecutan 100% de manera local.' },
      { question: '¿Puedo enviar mi lote directamente al creador de hojas de contactos o collage?', answer: '¡Sí! Al hacer clic en "Enviar al estudio", tu lote se carga instantáneamente en la mesa de luz interactiva para componer hojas de prueba o collages.' }
    ]
  },
  de: {
    title: 'Stapelverarbeitung für Fotos — Batch-Renamer, EXIF & Konverter',
    description: 'Fotos stapelweise mit Token-Mustern umbenennen, EXIF-Kameradaten extrahieren und Formate lokal konvertieren. 100% privat ohne Uploads.',
    heading: 'Kostenlose Foto-Stapelverarbeitung & Batch-Tools',
    lead: 'Optimiere deinen Workflow: Fotos mit dynamischen Token-Rezepten umbenennen, technische EXIF-Metadaten analysieren und Formate direkt im Browser konvertieren.',
    badge: '100% PRIVATE BROWSER-SUITE',
    breadcrumbName: 'Stapelverarbeitung',
    btnContactSheet: 'Kontaktabzug-Studio öffnen',
    btnCollage: 'Collagen-Ersteller',
    sectionHeading: 'Entwickelt für professionelle Fotografie-Workflows',
    sectionLead: 'Ob Kundenabzüge, die Organisation tausender Serienbilder oder die Analyse von Kameraeinstellungen – unsere lokalen Werkzeuge benötigen keine Software-Installation.',
    pillars: [
      { title: 'Dynamische Token-Rezepte', desc: 'Erstelle Namensmuster mit führenden Nullen (001, 0001), Präfixen, Suffixen und EXIF-Parametern. Lade ausführbare Shell-Skripte für die lokale Ausführung herunter.', emoji: '🏷️', icon: 'file-text' },
      { title: 'Detaillierte EXIF-Extraktion', desc: 'Lese Kameragehäuse, Objektive, Brennweiten, Blendenwerte, Belichtungszeiten und ISO-Werte deiner gesamten Serie in einer tabellarischen Übersicht aus.', emoji: '📷', icon: 'camera' },
      { title: 'Offline-Datenschutz ohne Uploads', desc: 'Jede Operation wird im Arbeitsspeicher deines Browsers ausgeführt. Vertrauliche Kundendaten bleiben strikt auf deinem Gerät geschützt.', emoji: '🔒', icon: 'shield' }
    ],
    faqs: [
      { question: 'Wie funktioniert das Stapel-Umbenennungs-Tool?', answer: 'Baue eigene Namensmuster aus Präfixen, Zählern mit führenden Nullen (001, 0001) und EXIF-Tokens ({name}, {date}, {camera}, {fstop}, {iso}). Lade passende Bash- (.sh), PowerShell- (.ps1) oder CSV-Dateien herunter.' },
      { question: 'Kann ich EXIF-Einstellungen für ein ganzes Shooting auslesen?', answer: 'Ja. Das Tool liest Kamera, Objektiv, Blende, Verschlusszeit, ISO und Aufnahmezeitpunkt im Browser aus und exportiert sie als CSV-Tabelle.' },
      { question: 'Werden Dateien auf einen Server geladen?', answer: 'Nein. Alle Vorgänge laufen vollständig im lokalen Browser ab.' },
      { question: 'Kann ich die Bilder direkt ins Kontaktabzug-Studio übergeben?', answer: 'Ja, mit einem Klick auf "An Studio senden" lädst du die Serie direkt in den Leuchttisch.' }
    ]
  },
  fr: {
    title: 'Outils photo par lots — Renommage séquentiel, EXIF & conversion',
    description: 'Renommez des photos par lots avec des jetons dynamiques, extrayez les métadonnées EXIF et convertissez les formats localement. 100% privé.',
    heading: 'Outils & Opérations pour Photos par Lots Gratuits',
    lead: 'Accélérez votre flux de travail : renommez des séries de photos avec des règles personnalisées, inspectez les paramètres EXIF et convertissez les formats sans téléversement.',
    badge: 'SUITE 100% LOCALE DANS LE NAVIGATEUR',
    breadcrumbName: 'Outils par lots',
    btnContactSheet: 'Ouvrir le studio planche contact',
    btnCollage: 'Créateur de collage',
    sectionHeading: 'Conçu pour les photographes professionnels',
    sectionLead: 'Qu\'il s\'agisse de trier des milliers de déclenchements, d\'analyser les focales utilisées ou de préparer des sélections clients, profitez d\'outils locaux sans installation.',
    pillars: [
      { title: 'Modèles de renommage dynamiques', desc: 'Générez des noms séquentiels avec zéros de tête (001, 0001), préfixes, suffixes et jetons EXIF. Téléchargez des scripts exécutables Bash ou PowerShell.', emoji: '🏷️', icon: 'file-text' },
      { title: 'Extraction EXIF détaillée', desc: 'Consultez boîtiers, objectifs, ouvertures, vitesses et sensibilités ISO de toute une série dans un tableau téléchargeable en CSV.', emoji: '📷', icon: 'camera' },
      { title: 'Confidentialité totale sans upload', desc: 'Tous les calculs s\'opèrent dans la mémoire vive de votre navigateur. Vos clichés commerciaux restent rigoureusement protégés.', emoji: '🔒', icon: 'shield' }
    ],
    faqs: [
      { question: 'Comment fonctionne le renommage par lots ?', answer: 'Définissez un modèle avec préfixe, numérotation (ex. 001) et jetons ({name}, {date}, {camera}, {fstop}, {iso}), puis téléchargez le script de renommage local.' },
      { question: 'Peut-on extraire les paramètres de prise de vue d\'un shooting complet ?', answer: 'Oui, l\'outil lit instantanément l\'ouverture, la focale, la vitesse et l\'ISO de tous vos fichiers et les exporte sous forme de tableau CSV.' },
      { question: 'Y a-t-il un transfert vers un serveur ?', answer: 'Non, toutes les opérations s\'exécutent localement dans votre navigateur.' },
      { question: 'Puis-je basculer mon lot vers le studio de planche contact ?', answer: 'Oui, un clic sur "Envoyer au studio" transfère directement l\'ensemble de vos images sur la table lumineuse.' }
    ]
  },
  ja: {
    title: '写真一括処理ツール — 一括リネーム・EXIF抽出・フォーマット変換',
    description: '撮影日時やカメラ情報を使った写真の一括リネーム、EXIFメタデータの書き出し、画像変換をブラウザ内で完結。100%安全・非送信。',
    heading: '無料 写真一括処理ツール & オペレーション',
    lead: '撮影ワークフローを劇的に効率化。トークンを活用したファイル名の一括変更、カメラのEXIFメタデータ抽出、画像フォーマット変換をすべてブラウザ内で安全に実行できます。',
    badge: '100% ブラウザ完結型プライベートスイート',
    breadcrumbName: '一括処理ツール',
    btnContactSheet: 'コンタクトシートスタジオを開く',
    btnCollage: 'コラージュ作成ツール',
    sectionHeading: 'プロの現場のために設計された撮影オペレーション機能',
    sectionLead: 'クライアントへのプルーフ提出、数千枚の写真整理、撮影データの詳細分析まで、面倒なインストールなしに自分のマシン上で高速処理できます。',
    pillars: [
      { title: '動的トークンリネーム', desc: 'ゼロ埋め連番（001、0001）、日付、カメラ型番、露出情報を組み合わせた柔軟な命名規則を作成。ローカル実行用シェルスクリプト（Bash/PowerShell）も書き出せます。', emoji: '🏷️', icon: 'file-text' },
      { title: '詳細EXIF抽出', desc: '使用カメラ、レンズ型番、焦点距離、絞り値（F値）、シャッタースピード、ISO感度を一覧表として抽出し、CSVファイルとして保存できます。', emoji: '📷', icon: 'camera' },
      { title: '完全オフライン・高セキュリティ', desc: 'すべての処理がPCのローカルメモリ上で動作するため、未公開のクライアントワークや機密写真の漏洩リスクがゼロです。', emoji: '🔒', icon: 'shield' }
    ],
    faqs: [
      { question: '一括リネームツールはどのように機能しますか？', answer: '接頭辞、ゼロ埋め連番、EXIFトークン（{name}, {date}, {camera}, {fstop}, {iso}など）を組み合わせて命名パターンを作成し、Mac/Linux用Bashスクリプト（.sh）やWindows用PowerShellスクリプト（.ps1）、CSVファイルを書き出してPC上で安全に実行できます。' },
      { question: '撮影セッション全体のEXIF情報を一覧出力できますか？', answer: 'はい。写真を読み込ませるだけでカメラやレンズ、露光パラメータを解析し、スプレッドシート等で開けるCSV形式でダウンロードできます。' },
      { question: 'ファイルがサーバーに送信されることはありますか？', answer: 'いいえ。サムネイル生成、EXIFパース、画像変換処理は100%ブラウザ内部で実行されます。' },
      { question: '処理した写真をそのままコンタクトシートに読み込めますか？', answer: 'はい。「スタジオに送る」ボタンを押すと、読み込んだ写真群がそのままコンタクトシート編集画面へ引き継がれます。' }
    ]
  },
  pt: {
    title: 'Ferramentas de fotos em lote — Renomeador, EXIF e conversor',
    description: 'Renomeie fotos em lote com padrões dinâmicos, extraia metadados EXIF da câmera e converta formatos no navegador. 100% privado.',
    heading: 'Ferramentas & Operações para Fotos em Lote Grátis',
    lead: 'Agilize seu fluxo fotográfico: renomeie arquivos em lote com regras flexíveis, inspecione metadados EXIF da câmera e converta formatos diretamente no navegador sem uploads.',
    badge: 'SUITE 100% LOCAL NO NAVEGADOR',
    breadcrumbName: 'Ferramentas em lote',
    btnContactSheet: 'Abrir estúdio de folhas de contato',
    btnCollage: 'Criador de colagens',
    sectionHeading: 'Desenvolvido para fotografia profissional',
    sectionLead: 'Seja para entregar folhas de prova, organizar milhares de disparos ou extrair parâmetros técnicos da câmera, utilize ferramentas locais sem necessidade de instalação.',
    pillars: [
      { title: 'Modelos de renomeação dinâmicos', desc: 'Crie sequências com zeros à esquerda (001, 0001), prefixos, sufixos e parâmetros EXIF. Baixe scripts executáveis em Bash ou PowerShell para execução local.', emoji: '🏷️', icon: 'file-text' },
      { title: 'Extração completa de EXIF', desc: 'Visualize corpos de câmera, lentes, distâncias focais, aberturas, velocidades e ISO de todo o ensaio em uma tabela exportável em CSV.', emoji: '📷', icon: 'camera' },
      { title: 'Privacidade offline sem uploads', desc: 'Todas as operações ocorrem na memória do navegador. Os arquivos confidenciais dos seus clientes permanecem estritamente seguros.', emoji: '🔒', icon: 'shield' }
    ],
    faqs: [
      { question: 'Como funciona o renomeador de fotos em lote?', answer: 'Defina regras com prefixos, números sequenciais (001, 0001) e tokens EXIF ({name}, {date}, {camera}, {fstop}, {iso}) e baixe scripts locais em Bash (.sh) ou PowerShell (.ps1), ou uma planilha CSV.' },
      { question: 'É possível extrair dados técnicos EXIF de uma sessão inteira?', answer: 'Sim. O sistema lê câmera, lente, abertura, velocidade e ISO de todos os arquivos e exporta tudo em formato de planilha CSV.' },
      { question: 'Os arquivos são enviados para algum servidor?', answer: 'Não. Decodificação, miniaturas, análise EXIF e conversões rodam 100% no seu navegador.' },
      { question: 'Posso enviar o lote direto para o estúdio de folhas de contato?', answer: 'Sim, ao clicar em "Enviar ao estúdio", todas as imagens são carregadas instantaneamente na mesa de luz.' }
    ]
  }
};

// -------------------------------------------------------------
// 5. FREE 8x10 PHOTO PRINTS (/free-8x10-photo-prints)
// -------------------------------------------------------------
export interface Free8x10ToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  howToHeading: string;
  howToSteps: HowToStep[];
  specsHeading: string;
  specsP1: string;
  specsP2: string;
  layoutsHeading: string;
  layouts: { title: string; desc: string }[];
  faqs: ToolFaq[];
}

export const FREE_8X10_DATA: Record<Locale, Free8x10ToolData> = {
  en: {
    title: 'Free 8x10 Photo Prints — Multi-Photo Collage Layout Maker',
    description: 'Create multi-photo 8x10 collage prints to save on printing at Walgreens, CVS, or home. Place 2x 5x7s or 4x 4x5s onto one 8x10 sheet for free.',
    heading: 'Free 8x10 Photo Prints Multi-Photo Collage Maker',
    lead: 'Save money at pharmacy photo counters by arranging multiple photos onto a single 8x10 inch sheet. Fit two 5x7s, four 4x5s, or eight wallet photos onto one print at 300 DPI.',
    breadcrumbName: 'Free 8x10 Photo Prints',
    howToHeading: 'How to make multi-photo 8x10 prints',
    howToSteps: [
      { name: 'Choose your 8x10 layout preset', text: 'Select whether you want two 5x7 prints, four 4x5 prints, or eight wallet-sized photos on your 8x10 sheet.' },
      { name: 'Drop in your photos', text: 'Drag and drop your photos into the layout cells. Position and crop each picture to fit precisely.' },
      { name: 'Export at 300 DPI', text: 'Download a full-resolution JPEG or PNG file calibrated at 2400x3000 pixels (300 DPI).' },
      { name: 'Print at pharmacy or home', text: 'Order a single 8x10 print at Walgreens, CVS, Walmart, or print on your home photo printer, then trim along the margins.' }
    ],
    specsHeading: 'Exact 8x10 Print Mathematics & Geometry',
    specsP1: 'An 8x10 inch print at 300 DPI measures exactly 2400 x 3000 pixels. Photo labs and retail pharmacies charge a single flat price for an 8x10 enlargement, regardless of whether it holds one portrait or eight wallet pictures.',
    specsP2: 'By arranging two 5x7 photos (each 1500 x 2100 px) or four 4x5 photos side by side with neat cutting gutters, you get multiple high-grade prints for the cost of a single 8x10 print coupon.',
    layoutsHeading: 'Popular 8x10 Gang Sheet Layouts',
    layouts: [
      { title: 'Two 5x7 Prints on 8x10', desc: 'Fits two standard 5x7 portraits horizontally or vertically. Perfect for framing matching portraits or school photos.' },
      { title: 'Four 4x5 Prints on 8x10', desc: 'Four 4x5 inch proofs in a neat 2x2 grid. Ideal for small desktop frames, holiday gifts, and mood boards.' },
      { title: 'Eight Wallet Prints on 8x10', desc: 'Eight 2.5x3.5 inch wallet-sized pictures arranged in a 2x4 grid with cutting guides.' }
    ],
    faqs: [
      { question: 'How do I print multiple photos on one 8x10 sheet?', answer: 'Use our free 8x10 gang sheet templates to place 2, 4, or 8 photos onto one 8x10 canvas, export at 300 DPI (2400x3000 px), and order an 8x10 print at your local pharmacy lab.' },
      { question: 'What is the pixel resolution of an 8x10 photo print?', answer: 'At 300 DPI, an 8x10 inch print is exactly 2400 x 3000 pixels. Our export engine generates files at this exact studio dimension.' },
      { question: 'Can I use this for free Walgreens 8x10 promo codes?', answer: 'Yes! When pharmacies offer free 8x10 promo coupons, you can upload your arranged multi-photo 8x10 file and receive multiple prints for free.' }
    ]
  },
  es: {
    title: 'Impresiones 8x10 gratuitas — Creador de collages multifoto',
    description: 'Crea impresiones de collage 8x10 multifoto para ahorrar en farmacias o en casa. Coloca 2 de 5x7 o 4 de 4x5 en una hoja 8x10 gratis.',
    heading: 'Creador de Collages Multifoto para Impresiones 8x10',
    lead: 'Ahorra dinero en mostradores de revelado organizando varias fotos en una sola hoja de 8x10 pulgadas. Coloca dos 5x7, cuatro 4x5 u ocho fotos de cartera a 300 DPI.',
    breadcrumbName: 'Impresiones 8x10 gratis',
    howToHeading: 'Cómo hacer impresiones multifoto 8x10',
    howToSteps: [
      { name: 'Elige tu plantilla 8x10', text: 'Selecciona si deseas dos fotos 5x7, cuatro 4x5 u ocho fotos de cartera en tu hoja de 8x10.' },
      { name: 'Coloca tus fotos', text: 'Arrastra y suelta tus fotos en las celdas. Ajusta el encuadre para que encaje a la perfección.' },
      { name: 'Exporta a 300 DPI', text: 'Descarga un archivo JPEG o PNG a resolución completa calibrado a 2400x3000 píxeles (300 DPI).' },
      { name: 'Imprime y recorta', text: 'Pide una sola copia 8x10 en tu laboratorio o imprímela en casa, y luego corta por las guías.' }
    ],
    specsHeading: 'Geometría y medidas exactas de impresión 8x10',
    specsP1: 'Una copia de 8x10 pulgadas a 300 DPI mide exactamente 2400 x 3000 píxeles. Los laboratorios cobran un precio fijo por la hoja 8x10 sin importar cuántas imágenes contenga.',
    specsP2: 'Al colocar dos fotos 5x7 o cuatro 4x5 juntas con líneas de corte limpias, obtienes múltiples copias de alta calidad por el precio de una sola ampliación.',
    layoutsHeading: 'Diseños populares de hojas combinadas 8x10',
    layouts: [
      { title: 'Dos fotos 5x7 en 8x10', desc: 'Dos retratos clásicos 5x7 en horizontal o vertical. Ideal para marcos dobles o fotos escolares.' },
      { title: 'Cuatro fotos 4x5 en 8x10', desc: 'Cuatro fotos de 4x5 pulgadas en cuadrícula 2x2. Perfecto para pequeños marcos y recuerdos.' },
      { title: 'Ocho fotos de cartera en 8x10', desc: 'Ocho fotos de tamaño billetera (2.5x3.5 pulgadas) en cuadrícula 2x4 con guías de corte.' }
    ],
    faqs: [
      { question: '¿Cómo imprimo varias fotos en una hoja 8x10?', answer: 'Usa nuestras plantillas combinadas 8x10 para colocar 2, 4 u 8 fotos en un lienzo, exporta a 300 DPI (2400x3000 px) e imprime la hoja 8x10.' },
      { question: '¿Cuál es la resolución en píxeles de una foto 8x10?', answer: 'A 300 DPI, una foto de 8x10 pulgadas tiene exactamente 2400 x 3000 píxeles. Nuestro generador exporta a esta medida exacta.' },
      { question: '¿Puedo aprovechar cupones y ofertas de ampliación 8x10?', answer: '¡Sí! Cuando las farmacias o tiendas ofrecen cupones para fotos 8x10 gratis, puedes subir este archivo combinado y llevarte varias fotos sin pagar extra.' }
    ]
  },
  de: {
    title: 'Kostenlose 8x10 Fotodrucke — Mehrfachfoto-Collagen-Ersteller',
    description: 'Erstelle 8x10-Zoll Mehrfach-Fotodrucke und spare Druckkosten. Platziere 2x 5x7 oder 4x 4x5 auf einem einzigen 8x10 Bogen bei 300 DPI.',
    heading: 'Kostenloser 8x10 Fotodruck & Mehrfach-Collagen-Ersteller',
    lead: 'Spare Druckkosten: Ordne mehrere Bilder auf einem einzigen 8x10-Zoll-Bogen an. Platziere zwei 5x7, vier 4x5 oder acht Passfotos auf einem Blatt bei 300 DPI.',
    breadcrumbName: '8x10 Fotodrucke',
    howToHeading: 'So erstellst du Mehrfach-8x10-Drucke',
    howToSteps: [
      { name: '8x10 Vorlage wählen', text: 'Wähle zwei 5x7-Fotos, vier 4x5-Bilder oder acht Passfotos auf einem 8x10-Bogen.' },
      { name: 'Fotos einfügen', text: 'Bilder per Drag & Drop in die Zellen ziehen und den Ausschnitt anpassen.' },
      { name: 'In 300 DPI exportieren', text: 'Lade die Bilddatei mit 2400x3000 Pixeln (300 DPI) als JPEG oder PNG herunter.' },
      { name: 'Drucken & zuschneiden', text: 'Den 8x10 Bogen im Fotolabor oder daheim drucken und an den Rändern zuschneiden.' }
    ],
    specsHeading: 'Präzise 8x10 Druckmaße & Pixelgeometrie',
    specsP1: 'Ein 8x10-Zoll-Druck bei 300 DPI entspricht exakt 2400 x 3000 Pixeln (ca. 20x25 cm). Labore berechnen denselben Preis, egal wie viele Bilder darauf platziert sind.',
    specsP2: 'Indem du zwei 5x7-Bilder oder vier 4x5-Bilder mit Schneidelinien anordnest, erhältst du mehrere Abzüge zum Preis eines einzelnen Bogens.',
    layoutsHeading: 'Beliebte 8x10 Drucklayouts',
    layouts: [
      { title: 'Zwei 5x7 auf 8x10', desc: 'Zwei 5x7-Porträts nebeneinander. Perfekt für passende Fotorahmen oder Schulporträts.' },
      { title: 'Vier 4x5 auf 8x10', desc: 'Vier 4x5-Zoll-Abzüge im 2x2-Raster. Ideal für kleine Aufsteller und Geschenke.' },
      { title: 'Acht Passfotos auf 8x10', desc: 'Acht Fotos im Portemonnaie-Format (2,5x3,5 Zoll) mit Schnittmarken.' }
    ],
    faqs: [
      { question: 'Wie drucke ich mehrere Fotos auf einem 8x10 Bogen?', answer: 'Wähle eine Vorlage für 2, 4 oder 8 Bilder, exportiere mit 2400x3000 Pixeln bei 300 DPI und bestelle einen 8x10-Abzug.' },
      { question: 'Welche Auflösung hat ein 8x10-Druck?', answer: 'Bei 300 DPI misst ein 8x10-Zoll-Bogen exakt 2400 x 3000 Pixel.' },
      { question: 'Funktioniert das mit Fotolabor-Gutscheinen?', answer: 'Ja! Wenn Fotolabore Aktionen für 8x10-Vergrößerungen anbieten, kannst du diesen kombinierten Bogen einreichen.' }
    ]
  },
  fr: {
    title: 'Tirages photo 8x10 gratuits — Générateur de collage multi-photos',
    description: 'Créez des tirages 8x10 multi-photos pour économiser sur vos tirages. Placez 2 clichés 5x7 ou 4 clichés 4x5 sur une seule feuille 8x10 à 300 DPI.',
    heading: 'Créateur de Collage Multi-Photos pour Tirages 8x10',
    lead: 'Économisez sur vos tirages en combinant plusieurs photos sur une seule feuille 8x10 pouces (20x25 cm). Imprimez deux 5x7, quatre 4x5 ou huit photos d\'identité à 300 DPI.',
    breadcrumbName: 'Tirages 8x10 gratuits',
    howToHeading: 'Comment créer des tirages 8x10 multi-photos',
    howToSteps: [
      { name: 'Choisissez votre disposition 8x10', text: 'Sélectionnez deux formats 5x7, quatre formats 4x5 ou huit petits formats sur une feuille 8x10.' },
      { name: 'Insérez vos photos', text: 'Glissez vos images dans les emplacements prévus et cadrez-les avec précision.' },
      { name: 'Exportez à 300 DPI', text: 'Téléchargez votre fichier JPEG ou PNG haute définition étalonné à 2400x3000 pixels (300 DPI).' },
      { name: 'Imprimez et découpez', text: 'Commandez un seul agrandissement 8x10 chez votre imprimeur ou tirez-le chez vous, puis découpez.' }
    ],
    specsHeading: 'Précision géométrique et dimensions 8x10',
    specsP1: 'Un tirage 8x10 pouces à 300 DPI représente exactement 2400 x 3000 pixels. Les laboratoires facturent le même tarif forfaitaire quel que soit le nombre d\'images contenues.',
    specsP2: 'En agençant deux photos 5x7 ou quatre photos 4x5 avec des repères de découpe, vous obtenez plusieurs épreuves pour le prix d\'un tirage unique.',
    layoutsHeading: 'Mises en page 8x10 courantes',
    layouts: [
      { title: 'Deux photos 5x7 sur 8x10', desc: 'Deux portraits 5x7 côte à côte. Parfait pour les cadres assortis et photos d\'école.' },
      { title: 'Quatre photos 4x5 sur 8x10', desc: 'Quatre tirages 4x5 pouces en grille 2x2. Idéal pour les petits cadres de bureau.' },
      { title: 'Huit photos portefeuille sur 8x10', desc: 'Huit photos format portefeuille (2,5x3,5 pouces) avec lignes de coupe.' }
    ],
    faqs: [
      { question: 'Comment imprimer plusieurs photos sur un format 8x10 ?', answer: 'Utilisez nos modèles multi-photos pour regrouper 2, 4 ou 8 images sur une planche 8x10, exportez à 2400x3000 px (300 DPI) et faites tirer la feuille.' },
      { question: 'Quelle est la taille en pixels d\'un tirage 8x10 ?', answer: 'À 300 DPI, un format 8x10 mesure exactement 2400 x 3000 pixels.' },
      { question: 'Puis-je profiter des offres de tirages gratuits 8x10 ?', answer: 'Oui ! Lors de promotions sur les tirages 8x10, soumettez ce fichier composé pour obtenir plusieurs photos d\'un coup.' }
    ]
  },
  ja: {
    title: '8x10写真プリント作成ツール — 複数写真コラージュ面付け',
    description: '8x10インチ（六切相当）の用紙に複数枚の写真を面付けしてプリント代を節約。5x7を2枚、4x5を4枚、300 DPIで1枚のシートに配置。完全無料。',
    heading: '無料 8x10写真プリント 複数写真面付けコラージュ作成',
    lead: '1枚の8x10インチ（約203×254mm）印画紙に複数の写真を効率よく配置して現像コストを大幅削減。2枚の5x7、4枚の4x5、または8枚のカードサイズ写真を300 DPIで美しく面付けします。',
    breadcrumbName: '8x10写真プリント',
    howToHeading: '8x10マルチ写真プリントの作成手順',
    howToSteps: [
      { name: '8x10レイアウトを選択', text: '5x7が2枚、4x5が4枚、またはカードサイズ8枚の中から希望の面付けを選択します。' },
      { name: '写真を配置', text: 'セルに写真をドラッグ＆ドロップし、余白やトリミング位置を調整します。' },
      { name: '300 DPIで書き出し', text: '2400×3000ピクセル（300 DPI）の完全な印刷用JPEGまたはPNGとしてダウンロードします。' },
      { name: '現像・カット', text: 'ネットプリントや家庭用プリンターで8x10サイズとしてプリントし、ガイド線に沿って切り分けます。' }
    ],
    specsHeading: '8x10プリントの寸法とピクセル解像度',
    specsP1: '300 DPIでの8x10インチプリントは、正確に2400×3000ピクセルです。プリントショップでは1枚の写真でも複数枚の面付けでも同じ1枚分の料金で現像できます。',
    specsP2: '2枚の5x7（各1500×2100 px）や4枚の4x5を切り取り余白付きで配置することで、1枚分のプリント料金で高品質な複数枚の写真が手に入ります。',
    layoutsHeading: '代表的な8x10面付けレイアウト',
    layouts: [
      { title: '8x10に5x7を2枚', desc: '一般的な2L判〜キャビネ判に近い5x7写真を2枚並べます。写真立てや記念写真に最適です。' },
      { title: '8x10に4x5を4枚', desc: '4×5インチの写真を2×2のグリッドで4枚配置。卓上フォトフレームやプレゼントにぴったりです。' },
      { title: '8x10にカードサイズ8枚', desc: '財布や手帳に入るミニサイズ（2.5×3.5インチ）の写真を8枚整列させます。' }
    ],
    faqs: [
      { question: '1枚の8x10用紙に複数の写真を配置して印刷する方法は？', answer: '当ツールの8x10テンプレートで2枚、4枚、8枚の写真を配置し、300 DPI（2400×3000 px）で出力した画像を現像店で8x10サイズとして注文します。' },
      { question: '8x10プリントのピクセル寸法は？', answer: '300 DPI印刷時、8x10インチは正確に2400×3000ピクセルです。' },
      { question: '無料プリントクーポンやキャンペーンに使えますか？', answer: 'はい。現像チェーン等の8x10プリント無料クーポンを利用する際、この面付け画像を使えば1枚分の無料枠で複数枚の写真を印刷できます。' }
    ]
  },
  pt: {
    title: 'Impressões de fotos 8x10 gratuitas — Criador de colagem multifoto',
    description: 'Crie colagens multifoto 8x10 para economizar na impressão. Coloque 2 fotos 5x7 ou 4 fotos 4x5 em uma única folha 8x10 a 300 DPI.',
    heading: 'Criador de Colagens Multifoto para Impressão 8x10',
    lead: 'Economize nos laboratórios de revelação organizando várias imagens em uma única folha de 8x10 polegadas (20x25 cm). Monte duas fotos 5x7, quatro 4x5 ou oito fotos para carteira a 300 DPI.',
    breadcrumbName: 'Impressões 8x10 gratuitas',
    howToHeading: 'Como fazer impressões multifoto 8x10',
    howToSteps: [
      { name: 'Escolha seu modelo 8x10', text: 'Selecione se deseja duas fotos 5x7, quatro 4x5 ou oito fotos menores na folha 8x10.' },
      { name: 'Insira suas fotos', text: 'Arraste suas fotos para os espaços designados e ajuste o enquadramento.' },
      { name: 'Exporte a 300 DPI', text: 'Baixe um arquivo JPEG ou PNG em resolução máxima de 2400x3000 pixels (300 DPI).' },
      { name: 'Imprima e recorte', text: 'Peça uma única ampliação 8x10 no laboratório ou imprima em casa, recortando pelas guías.' }
    ],
    specsHeading: 'Geometria e dimensões exatas da folha 8x10',
    specsP1: 'Uma impressão 8x10 a 300 DPI mede exatamente 2400 x 3000 pixels. Os laboratórios cobram um valor fixo pela folha 8x10, independentemente de quantas fotos ela contém.',
    specsP2: 'Ao posicionar duas fotos 5x7 ou quatro 4x5 com margens de corte limpas, você garante várias impressões de alta qualidade pagando por uma única ampliação.',
    layoutsHeading: 'Modelos populares de folha combinada 8x10',
    layouts: [
      { title: 'Duas fotos 5x7 em 8x10', desc: 'Dois retratos 5x7 lado a lado. Ideal para porta-retratos duplos e fotos escolares.' },
      { title: 'Quatro fotos 4x5 em 8x10', desc: 'Quatro fotos de 4x5 polegadas em grade 2x2. Perfeito para pequenos quadros e lembranças.' },
      { title: 'Oito fotos para carteira em 8x10', desc: 'Oito fotos no formato 2,5x3,5 polegadas com marcas de corte.' }
    ],
    faqs: [
      { question: 'Como imprimir várias fotos em uma folha 8x10?', answer: 'Use nossos modelos combinados para dispor 2, 4 ou 8 fotos, exporte a 300 DPI (2400x3000 px) e imprima como uma folha 8x10 comum.' },
      { question: 'Qual é a resolução em pixels de uma foto 8x10?', answer: 'A 300 DPI, uma folha 8x10 possui exatamente 2400 x 3000 pixels.' },
      { question: 'Posso usar em promoções de ampliações 8x10?', answer: 'Sim! Em cupons ou descontos para cópias 8x10, envie o arquivo montado para obter várias fotos sem pagar a mais.' }
    ]
  }
};

// -------------------------------------------------------------
// 6. LARGE PHOTO PRINTS (/large-photo-prints)
// -------------------------------------------------------------
export interface LargePrintsToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  specsBadge: string;
  specsHeading: string;
  specsLead: string;
  posterSpecs: PosterSpec[];
  howToHeading: string;
  howToLead: string;
  howToSteps: HowToStep[];
  proseH2: string;
  proseP1: string;
  proseP2: string;
  proseH3_1: string;
  proseP3: string;
  proseBullets: string[];
  proseH3_2: string;
  proseP4: string;
  proseP5: string;
  proseH3_3: string;
  proseP6: string;
  proseP7: string;
  faqs: ToolFaq[];
}

export const LARGE_PRINTS_DATA: Record<Locale, LargePrintsToolData> = {
  en: {
    title: 'Large Photo Print Layouts — Multi-Photo Poster Gang Sheets',
    description: 'Create multi-photo poster gang sheets for 11x14, 12x18, 16x20, and 24x36 large prints. 300 DPI resolution, custom grids, and zero uploads.',
    heading: 'Large Photo Print Layouts & Multi-Photo Poster Gang Sheets',
    lead: 'Max out your large format photo prints. Arrange multiple portraits, client proofs, and gallery selections onto 11x14, 12x18, 16x20, or 24x36 poster sheets at native 300 DPI print resolution with zero cloud uploads.',
    breadcrumbName: 'Large Photo Prints',
    specsBadge: 'DIMENSION & RESOLUTION SPECIFICATIONS',
    specsHeading: 'Standard Poster Dimensions & Pixel Requirements',
    specsLead: 'Commercial print labs print large posters at 150 to 300 DPI. Calculate exact pixel dimensions for uncompromised sharpness.',
    posterSpecs: [
      { name: '11 x 14 in', metric: '279 x 356 mm', ratio: '11:14 Aspect Ratio', dpi150: '1650 x 2100 px', dpi300: '3300 x 4200 px', capacity: 'Fits 2x 5x7 or 6x 3.5x5 prints', labs: 'CVS, Walgreens, Nations Photo Lab', badge: 'MOST POPULAR SMALL POSTER', tagVariant: 'blue' },
      { name: '12 x 18 in', metric: '305 x 457 mm', ratio: '2:3 Native DSLR Ratio', dpi150: '1800 x 2700 px', dpi300: '3600 x 5400 px', capacity: 'Fits 2x 8x12 or 6x 4x6 uncropped prints', labs: 'Mpix, Bay Photo, White House Custom Colour', badge: 'ZERO-CROP 35MM FORMAT', tagVariant: 'teal' },
      { name: '16 x 20 in', metric: '406 x 508 mm', ratio: '4:5 Standard Portrait', dpi150: '2400 x 3000 px', dpi300: '4800 x 6000 px', capacity: 'Fits 4x 8x10 or 8x 5x7 prints', labs: 'Costco (Shutterfly), Printique, Staples', badge: 'GALLERY & CLIENT SHOWCASE', tagVariant: 'amber' },
      { name: '24 x 36 in', metric: '610 x 914 mm', ratio: '2:3 Large Format Architecture', dpi150: '3600 x 5400 px', dpi300: '7200 x 10800 px', capacity: 'Fits 6x 11x14 or 24x 4x6 prints', labs: 'Staples, Office Depot, Pro Darkrooms', badge: 'MAXIMUM WALL IMPACT', tagVariant: 'rose' }
    ],
    howToHeading: 'How to Build a Multi-Photo Poster Gang Sheet',
    howToLead: 'Follow this streamlined workflow to assemble, verify, and export large-format multi-image print layouts in your browser.',
    howToSteps: [
      { name: 'Select Your Target Poster Dimension', text: 'Open the Contact Sheet Studio and choose your poster format (11x14, 12x18, 16x20, or 24x36) from the paper preset menu.' },
      { name: 'Configure the Grid Structure', text: 'Set your column and row counts to match the number of images you want on the sheet.' },
      { name: 'Drag and Drop Your Full-Resolution Photos', text: 'Import your original photo files directly into the browser. Images are processed in local memory.' },
      { name: 'Calibrate Cell Spacing and Cutting Gutters', text: 'Add 2mm to 6mm cell spacing to serve as clear trim lines when slicing with a rotary trimmer.' },
      { name: 'Export at 300 DPI and Submit to Your Lab', text: 'Download a full-resolution 300 DPI JPEG or multi-page PDF ready for any lab.' }
    ],
    proseH2: 'The Economics of Multi-Photo Large Format Gang Sheets',
    proseP1: 'Professional photography print pricing does not scale linearly with paper area. A single 8x10 print costs around $4 to $6 at retail labs, while a 24x36 poster enlargement typically costs $20 to $30. However, a 24x36 sheet offers nearly nine times the surface area of an 8x10.',
    proseP2: 'By arranging four 11x14s or eighteen 4x6 proof prints onto a single 24x36 poster gang sheet, your per-image print cost drops significantly.',
    proseH3_1: 'Understanding DPI: 150 DPI Viewing Distance vs 300 DPI Handheld',
    proseP3: 'For handheld prints, 300 DPI is the benchmark for photographic perfection. But for large wall posters viewed from several feet away, 150 to 200 DPI delivers excellent results.',
    proseBullets: [
      'Handheld viewing (12–18 inches): 300 DPI required for fine detail.',
      'Arm-length viewing (2–3 feet): 200–240 DPI indistinguishable from 300 DPI.',
      'Wall gallery viewing (4+ feet): 150 DPI provides clean typography and sharp detail.'
    ],
    proseH3_2: 'Cutting Gutters, Bleed Margins, and Trim Guides',
    proseP4: 'When multiple photos share a single sheet, precision trimming requires dedicated gutter spacing. Make Contact Sheet allows you to configure exact spacing between thumbnails.',
    proseP5: 'This creates neat margins that guide rotary cutters and mat boards without encroaching on your subjects.',
    proseH3_3: 'Client Storyboards, Retrospective Walls, and Gallery Sets',
    proseP6: 'Large format gang sheets are not just cost savers; they are a compelling presentation medium. Wedding photographers deliver full timeline storyboards on 16x20 prints.',
    proseP7: 'Commercial studios use 24x36 sheets to present campaign lookbooks and concept variations side by side.',
    faqs: [
      { question: 'What is a poster gang sheet in photography?', answer: 'A gang sheet (or multi-up print layout) arranges multiple individual photos onto a single large-format photographic paper sheet (such as 16x20 or 24x36 inches) to reduce print costs and create cohesive multi-image displays.' },
      { question: 'Can I print 12x18, 16x20, and 24x36 posters without losing sharpness?', answer: 'Yes! Make Contact Sheet exports full-resolution images calibrated for 300 DPI print output (e.g. 7200x10800 px for 24x36) ensuring razor-sharp detail.' },
      { question: 'What spacing should I use between photos for trimming?', answer: 'We recommend setting a cell gap of 2% to 4% (or 4mm to 8mm), which gives you clean cutting gutters for rotary cutters.' }
    ]
  },
  es: {
    title: 'Diseños de impresión fotográfica en gran formato — Hojas de póster combinadas',
    description: 'Crea hojas combinadas para pósteres en 11x14, 12x18, 16x20 y 24x36 pulgadas a 300 DPI. Cuadrículas personalizadas y 100% privado.',
    heading: 'Diseños de Impresión en Gran Formato y Pósteres Multifoto',
    lead: 'Aprovecha al máximo tus impresiones de gran formato. Organiza múltiples retratos, pruebas y fotos de galería en hojas póster de 11x14, 12x18, 16x20 o 24x36 a 300 DPI sin subir archivos a la nube.',
    breadcrumbName: 'Impresiones en gran formato',
    specsBadge: 'DIMENSIONES Y RESOLUCIÓN',
    specsHeading: 'Dimensiones de póster y requerimientos de píxeles',
    specsLead: 'Los laboratorios imprimen a 150 o 300 DPI. Calcula las medidas exactas en píxeles para lograr nitidez máxima.',
    posterSpecs: [
      { name: '11 x 14 pulg.', metric: '279 x 356 mm', ratio: 'Relación 11:14', dpi150: '1650 x 2100 px', dpi300: '3300 x 4200 px', capacity: 'Entran 2x 5x7 o 6x 3.5x5', labs: 'CVS, Walgreens, laboratorios locales', badge: 'PÓSTER PEQUEÑO POPULAR', tagVariant: 'blue' },
      { name: '12 x 18 pulg.', metric: '305 x 457 mm', ratio: 'Relación 2:3 réflex nativa', dpi150: '1800 x 2700 px', dpi300: '3600 x 5400 px', capacity: 'Entran 2x 8x12 o 6x 4x6 sin recorte', labs: 'Mpix, White House Custom Colour', badge: 'FORMATO 35MM SIN RECORTE', tagVariant: 'teal' },
      { name: '16 x 20 pulg.', metric: '406 x 508 mm', ratio: 'Relación 4:5 retrato estándar', dpi150: '2400 x 3000 px', dpi300: '4800 x 6000 px', capacity: 'Entran 4x 8x10 u 8x 5x7', labs: 'Printique, laboratorios fotográficos', badge: 'GALERÍAS Y CLIENTES', tagVariant: 'amber' },
      { name: '24 x 36 pulg.', metric: '610 x 914 mm', ratio: 'Relación 2:3 gran formato', dpi150: '3600 x 5400 px', dpi300: '7200 x 10800 px', capacity: 'Entran 6x 11x14 o 24x 4x6', labs: 'Laboratorios profesionales', badge: 'MÁXIMO IMPACTO VISUAL', tagVariant: 'rose' }
    ],
    howToHeading: 'Cómo armar una hoja póster multifoto combinada',
    howToLead: 'Sigue este proceso optimizado para diseñar, revisar y exportar composiciones de gran formato en tu navegador.',
    howToSteps: [
      { name: 'Selecciona las dimensiones del póster', text: 'Abre el estudio y selecciona el formato deseado (11x14, 12x18, 16x20 o 24x36) en el menú de papel.' },
      { name: 'Configura la cuadrícula', text: 'Define el número de filas y columnas según la cantidad de imágenes.' },
      { name: 'Arrastra tus fotos en alta resolución', text: 'Importa tus fotos originales directamente en el navegador. Se procesan en la memoria local.' },
      { name: 'Ajusta márgenes y guías de corte', text: 'Añade espaciado entre celdas para contar con líneas de corte limpias.' },
      { name: 'Exporta a 300 DPI y envía a imprimir', text: 'Descarga un archivo JPEG o PDF a 300 DPI listo para cualquier laboratorio profesional.' }
    ],
    proseH2: 'La economía de las impresiones combinadas en gran formato',
    proseP1: 'El coste de impresión fotográfica no aumenta de forma lineal. Un póster de 24x36 pulgadas cuesta solo una fracción más que imprimir varias copias individuales pequeñas.',
    proseP2: 'Al agrupar cuatro copias 11x14 o dieciocho fotos 4x6 en un solo póster de 24x36, el coste por foto disminuye de forma radical.',
    proseH3_1: 'Comprendiendo los DPI: distancia de visión a 150 DPI frente a 300 DPI en mano',
    proseP3: 'Para fotos sostenidas en mano, 300 DPI es el estándar indiscutible. Para pósteres de pared observados a más de un metro, entre 150 y 200 DPI ofrecen una nitidez impecable.',
    proseBullets: [
      'Visión en mano (30–45 cm): 300 DPI requeridos para máximo detalle.',
      'Visión a distancia de brazo (60–90 cm): 200–240 DPI indistinguibles de 300 DPI.',
      'Visión de galería (más de 1,2 m): 150 DPI garantizan tipografía limpia e imágenes nítidas.'
    ],
    proseH3_2: 'Márgenes de sangrado y guías de corte',
    proseP4: 'Al compartir varias fotos una misma hoja, el corte limpio exige márgenes bien calibrados. Make Contact Sheet permite configurar distancias milimétricas exactas.',
    proseP5: 'Esto crea canales de corte seguros para cizallas rotativas sin invadir las fotografías.',
    proseH3_3: 'Storyboards para clientes y murales de estudio',
    proseP6: 'Las hojas combinadas de gran formato son un soporte de presentación extraordinario. Los fotógrafos de bodas las usan para presentar la cronología completa del evento en láminas 16x20.',
    proseP7: 'Los estudios de moda emplean formatos 24x36 para contrastar opciones de campaña cara a cara.',
    faqs: [
      { question: '¿Qué es una hoja combinada (gang sheet) de póster?', answer: 'Es un archivo que reúne múltiples fotos individuales en una sola hoja fotográfica de gran formato (como 16x20 o 24x36 pulgadas) para abaratar costes y crear mosaicos visuales.' },
      { question: '¿Puedo imprimir pósteres 16x20 y 24x36 sin perder nitidez?', answer: 'Sí. Make Contact Sheet exporta a resolución completa calibrada a 300 DPI (hasta 7200x10800 px para 24x36).' },
      { question: '¿Qué separación debo dejar entre fotos para recortar?', answer: 'Recomendamos un espacio entre celdas del 2% al 4% (entre 4 mm y 8 mm) para disponer de guías de corte cómodas.' }
    ]
  },
  de: {
    title: 'Großformat-Fotodruck Layouts — Mehrfach-Posterbogen & Gang Sheets',
    description: 'Erstelle Mehrfach-Posterbögen für 11x14, 12x18, 16x20 und 24x36 Zoll Großdrucke. 300 DPI Druckauflösung und 100% Datenschutz.',
    heading: 'Großformat-Fotodruck Layouts & Mehrfach-Posterbögen',
    lead: 'Hole das Maximum aus deinen Großformatdrucken heraus: Kombiniere Kundenabzüge und Porträts auf 11x14, 12x18, 16x20 oder 24x36 Zoll Posterbögen bei echten 300 DPI ohne Cloud-Uploads.',
    breadcrumbName: 'Großformat-Drucke',
    specsBadge: 'ABMESSUNGEN & AUFLÖSUNG',
    specsHeading: 'Standard-Postergrößen & Pixelanforderungen',
    specsLead: 'Labore drucken Poster mit 150 bis 300 DPI. Exakte Maße für maximale Schärfe berechnen.',
    posterSpecs: [
      { name: '11 x 14 Zoll', metric: '279 x 356 mm', ratio: '11:14 Seitenverhältnis', dpi150: '1650 x 2100 px', dpi300: '3300 x 4200 px', capacity: 'Platz für 2x 5x7 oder 6x 3.5x5', labs: 'Fachlabore & Fotodienstleister', badge: 'BELIEBTES KLEINPOSTER', tagVariant: 'blue' },
      { name: '12 x 18 Zoll', metric: '305 x 457 mm', ratio: '2:3 Natives Kleinbildformat', dpi150: '1800 x 2700 px', dpi300: '3600 x 5400 px', capacity: 'Platz für 2x 8x12 oder 6x 4x6 ohne Beschnitt', labs: 'Mpix, Whitewall, Saal Digital', badge: 'BESCHNITTFREIES 35MM-FORMAT', tagVariant: 'teal' },
      { name: '16 x 20 Zoll', metric: '406 x 508 mm', ratio: '4:5 Standard-Porträt', dpi150: '2400 x 3000 px', dpi300: '4800 x 6000 px', capacity: 'Platz für 4x 8x10 oder 8x 5x7', labs: 'Saal Digital, WhiteWall', badge: 'GALERIE & KUNDENPRÄSENTATION', tagVariant: 'amber' },
      { name: '24 x 36 Zoll', metric: '610 x 914 mm', ratio: '2:3 Großformat-Poster', dpi150: '3600 x 5400 px', dpi300: '7200 x 10800 px', capacity: 'Platz für 6x 11x14 oder 24x 4x6', labs: 'Profi-Fachlabore', badge: 'MAXIMALE WANDWIRKUNG', tagVariant: 'rose' }
    ],
    howToHeading: 'Einen Mehrfach-Posterbogen erstellen',
    howToLead: 'Folge diesem Arbeitsablauf, um Großformat-Layouts im Browser zu gestalten und zu exportieren.',
    howToSteps: [
      { name: 'Postergröße auswählen', text: 'Öffne das Studio und wähle dein Format (11x14, 12x18, 16x20 oder 24x36) im Papiermenü.' },
      { name: 'Rasterstruktur festlegen', text: 'Passe Zeilen und Spalten an die gewünschte Bildanzahl an.' },
      { name: 'Originalfotos per Drag & Drop laden', text: 'Bilder direkt im Browser importieren – Verarbeitung erfolgt im RAM.' },
      { name: 'Schneidestege anpassen', text: 'Füge 2 bis 6 mm Abstand zwischen den Kacheln als Schnittmarken ein.' },
      { name: 'In 300 DPI exportieren & drucken', text: 'Lade ein druckfertiges 300 DPI JPEG oder PDF herunter.' }
    ],
    proseH2: 'Kostenvorteile kombinierter Großformatbögen',
    proseP1: 'Fotodruckpreise steigen nicht linear. Ein 24x36 Bogen bietet die neunfache Fläche eines 8x10-Abzugs bei nur geringen Mehrkosten.',
    proseP2: 'Das Platzieren mehrerer Bilder auf einem Posterbogen senkt die Stückkosten pro Motiv erheblich.',
    proseH3_1: '150 DPI Betrachtungsabstand vs. 300 DPI Nahansicht',
    proseP3: 'In der Hand gehaltene Bilder erfordern 300 DPI. Für Wandposter aus über einem Meter Abstand reichen 150 bis 200 DPI völlig aus.',
    proseBullets: [
      'Nahbetrachtung (30–45 cm): 300 DPI für feine Details.',
      'Armlänge Abstand (60–90 cm): 200–240 DPI wirken gestochen scharf.',
      'Wandbetrachtung (ab 1,2 m): 150 DPI liefert brillante Ergebnisse.'
    ],
    proseH3_2: 'Schneidestege und Beschnittzugaben',
    proseP4: 'Werden mehrere Fotos auf einem Bogen gedruckt, erfordert das Zuschneiden definierte Stege. Make Contact Sheet ermöglicht exakte Randabstände.',
    proseP5: 'Das schützt die Motive vor unsauberen Schnittkanten beim Trennen mit dem Rollenschneider.',
    proseH3_3: 'Storyboards und Galerie-Konzepte',
    proseP6: 'Kombinierte Bögen eignen sich hervorragend für Bildgeschichten, Hochzeits-Chronologien und Kollektions-Übersichten.',
    proseP7: 'Studios nutzen 24x36-Poster, um ganze Kampagnenentwürfe nebeneinander an die Wand zu bringen.',
    faqs: [
      { question: 'Was ist ein Gang Sheet bzw. Mehrfach-Posterbogen?', answer: 'Ein Druckbogen, auf dem mehrere einzelne Fotos auf einem einzigen großformatigen Fotopapier angeordnet werden, um Druckkosten zu sparen.' },
      { question: 'Bleibt die Bildschärfe bei 24x36 Postern erhalten?', answer: 'Ja. Make Contact Sheet exportiert bis zu 7200x10800 Pixel (300 DPI) für gestochen scharfe Großdrucke.' },
      { question: 'Welchen Abstand sollte man zum Schneiden einplanen?', answer: 'Wir empfehlen 2% bis 4% (bzw. 4 bis 8 mm) Zwischenraum als komfortable Schnittgasse.' }
    ]
  },
  fr: {
    title: 'Mises en page d\'impression grand format — Planches poster multi-photos',
    description: 'Créez des planches d\'impression poster pour formats 11x14, 12x18, 16x20 et 24x36 pouces à 300 DPI. Grilles sur mesure, 100% privé.',
    heading: 'Impressions Grand Format & Planches Poster Multi-Photos',
    lead: 'Maximisez vos tirages d\'art et agrandissements. Agencez plusieurs portraits et épreuves sur des planches poster 11x14, 12x18, 16x20 ou 24x36 à 300 DPI sans téléversement.',
    breadcrumbName: 'Tirages grand format',
    specsBadge: 'DIMENSIONS & RÉSOLUTION',
    specsHeading: 'Dimensions standard de poster et calcul de pixels',
    specsLead: 'Les laboratoires tirent entre 150 et 300 DPI. Calculez les pixels requis pour une netteté absolue.',
    posterSpecs: [
      { name: '11 x 14 pouces', metric: '279 x 356 mm', ratio: 'Ratio 11:14', dpi150: '1650 x 2100 px', dpi300: '3300 x 4200 px', capacity: 'Contient 2x 5x7 ou 6x 3.5x5', labs: 'Laboratoires professionnels', badge: 'PETIT POSTER POPULAIRE', tagVariant: 'blue' },
      { name: '12 x 18 pouces', metric: '305 x 457 mm', ratio: 'Ratio 2:3 natif reflex', dpi150: '1800 x 2700 px', dpi300: '3600 x 5400 px', capacity: 'Contient 2x 8x12 ou 6x 4x6 sans recadrage', labs: 'Whitewall, Picto, laboratoires photo', badge: 'FORMAT 35MM SANS RECADRAGE', tagVariant: 'teal' },
      { name: '16 x 20 pouces', metric: '406 x 508 mm', ratio: 'Ratio 4:5 portrait standard', dpi150: '2400 x 3000 px', dpi300: '4800 x 6000 px', capacity: 'Contient 4x 8x10 ou 8x 5x7', labs: 'Laboratoires d\'art', badge: 'GALERIE & PRÉSENTATION CLIENT', tagVariant: 'amber' },
      { name: '24 x 36 pouces', metric: '610 x 914 mm', ratio: 'Ratio 2:3 grand format', dpi150: '3600 x 5400 px', dpi300: '7200 x 10800 px', capacity: 'Contient 6x 11x14 ou 24x 4x6', labs: 'Imprimeurs grand format', badge: 'IMPACT MURAL MAXIMUM', tagVariant: 'rose' }
    ],
    howToHeading: 'Comment monter une planche poster multi-photos',
    howToLead: 'Suivez ces étapes pour composer, vérifier et exporter vos tirages d\'exposition directement dans le navigateur.',
    howToSteps: [
      { name: 'Sélectionnez le format poster', text: 'Ouvrez le studio et choisissez votre dimension (11x14, 12x18, 16x20 ou 24x36).' },
      { name: 'Configurez la grille', text: 'Ajustez le nombre de rangées et de colonnes.' },
      { name: 'Déposez vos photographies', text: 'Importez vos images haute définition en local.' },
      { name: 'Ajustez les gouttières de coupe', text: 'Ajoutez 2 à 6 mm de marge entre les clichés pour guider le cutter.' },
      { name: 'Exportez à 300 DPI', text: 'Téléchargez votre fichier JPEG ou PDF prêt pour le laboratoire.' }
    ],
    proseH2: 'La rentabilité des planches combinées grand format',
    proseP1: 'Le coût du tirage ne croît pas de manière linéaire avec la surface. Un poster 24x36 offre neuf fois la surface d\'un 8x10 pour un coût très avantageux.',
    proseP2: 'En regroupant plusieurs tirages sur un même lé de papier photographique, vous diminuez considérablement le coût unitaire.',
    proseH3_1: '150 DPI pour affichage mural vs 300 DPI pour vision rapprochée',
    proseP3: 'Une épreuve tenue en main réclame 300 DPI. Pour un poster mural contemplé à distance, 150 à 200 DPI garantissent un rendu exceptionnel.',
    proseBullets: [
      'Vision rapprochée (30–45 cm) : 300 DPI pour une finesse absolue.',
      'Distance de bras (60–90 cm) : 200–240 DPI d\'une grande précision.',
      'Vision murale (plus de 1,2 m) : 150 DPI parfaitement nets.'
    ],
    proseH3_2: 'Gouttières et marges de découpe',
    proseP4: 'Pour découper proprement plusieurs images issues d\'une même feuille, l\'espacement doit être régulier et millimétré.',
    proseP5: 'Make Contact Sheet garantit des gouttières de séparation nettes pour massicots et rogneuses.',
    proseH3_3: 'Storyboards clients et accrochages muraux',
    proseP6: 'Les planches grand format constituent également un formidable support de présentation commerciale et artistique.',
    proseP7: 'Idéal pour restituer la chronologie d\'un reportage de mariage ou exposer une collection de mode.',
    faqs: [
      { question: 'Qu\'est-ce qu\'une planche combinée (gang sheet) ?', answer: 'C\'est l\'assemblage de plusieurs photos distinctes sur une même grande feuille pour optimiser les frais d\'impression.' },
      { question: 'La netteté est-elle préservée sur un tirage 24x36 ?', answer: 'Oui. Le moteur exporte en pleine définition (jusqu\'à 7200x10800 px à 300 DPI).' },
      { question: 'Quel espacement prévoir pour la découpe ?', answer: 'Un espacement de 2% à 4% (soit 4 à 8 mm) offre une gouttière de coupe idéale.' }
    ]
  },
  ja: {
    title: '大判写真プリント面付けレイアウト — ポスターサイズ複数写真配置',
    description: '11x14、12x18、16x20、24x36インチの大判用紙に複数の写真を面付け。300 DPIの高解像度出力、自由なグリッド設定、完全非送信。',
    heading: '大判写真プリント面付け & ポスターコラージュ作成',
    lead: '大判プリントの用紙スペースを最大限に活用。11x14、12x18、16x20、24x36インチのポスターサイズに複数のポートレートや作品を300 DPIの高画質で自由に面付けできます。',
    breadcrumbName: '大判写真プリント',
    specsBadge: '寸法＆解像度仕様',
    specsHeading: '標準ポスター寸法と推奨ピクセル数',
    specsLead: 'プロラボでの大判プリントは150〜300 DPIが基準となります。最高の鮮明さを保つピクセル計算表です。',
    posterSpecs: [
      { name: '11 x 14 インチ', metric: '279 x 356 mm', ratio: '11:14 アスペクト比', dpi150: '1650 x 2100 px', dpi300: '3300 x 4200 px', capacity: '5x7が2枚、または3.5x5が6枚配置可能', labs: '各種プリントラボ・現像所', badge: '手頃な小型ポスター', tagVariant: 'blue' },
      { name: '12 x 18 インチ', metric: '305 x 457 mm', ratio: '2:3 一眼レフのネイティブ比率', dpi150: '1800 x 2700 px', dpi300: '3600 x 5400 px', capacity: '8x12が2枚、または4x6（KG判）が6枚無トリミングで配置可能', labs: 'プロ向け写真ラボ', badge: '35mmフルサイズ無裁断', tagVariant: 'teal' },
      { name: '16 x 20 インチ', metric: '406 x 508 mm', ratio: '4:5 標準ポートレート', dpi150: '2400 x 3000 px', dpi300: '4800 x 6000 px', capacity: '8x10が4枚、または5x7が8枚配置可能', labs: 'プロフォト現像所', badge: '個展・クライアント提出用', tagVariant: 'amber' },
      { name: '24 x 36 インチ', metric: '610 x 914 mm', ratio: '2:3 特大ポスター', dpi150: '3600 x 5400 px', dpi300: '7200 x 10800 px', capacity: '11x14が6枚、または4x6が24枚配置可能', labs: '大判インクジェット・銀塩出力所', badge: '圧倒的な壁面インパクト', tagVariant: 'rose' }
    ],
    howToHeading: '大判ポスター面付けシートの作成フロー',
    howToLead: 'ブラウザ上で完結する大判マルチプリントの組み立てと高画質書き出しの流れです。',
    howToSteps: [
      { name: '目的のポスター用紙サイズを選択', text: 'スタジオを開き、用紙メニューから11x14、12x18、16x20、24x36などの大判サイズを選びます。' },
      { name: 'グリッドの列数と行数を設定', text: '配置したい写真の枚数に合わせてグリッドを調整します。' },
      { name: '高解像度写真をドラッグ＆ドロップ', text: '元の写真ファイルをブラウザへ直接インポートします。' },
      { name: 'カッティング用の余白（マージン）を調整', text: 'カット時の目安となるよう、写真間に2〜6mm程度の余白を設定します。' },
      { name: '300 DPIで書き出してラボへ入稿', text: '印刷に適した300 DPIのJPEGまたはPDFをダウンロードし、ラボに入稿します。' }
    ],
    proseH2: '大判面付けプリントのコスト効率とメリット',
    proseP1: '写真プリントの料金は用紙面積に比例しません。24x36インチの特大ポスターは、8x10の約9倍の面積を持ちながら、価格差は数倍程度に抑えられています。',
    proseP2: '複数枚の写真を1枚の大判シートに集約して面付け（ギャングシート化）することで、写真1枚あたりのプリント原価を劇的に抑えられます。',
    proseH3_1: '鑑賞距離に応じたDPIの考え方：手持ち300 DPI vs 壁掛け150 DPI',
    proseP3: '手で持って見る写真集やアルバムには300 DPIが必須ですが、1メートル以上離れて鑑賞する壁掛けポスターでは150〜200 DPIでも極めて高精細に見えます。',
    proseBullets: [
      '手持ち鑑賞（30〜45cm）：微細な質感を表現するために300 DPIを推奨。',
      '腕の長さ（60〜90cm）：200〜240 DPIで十分にシャープな描写。',
      '壁掛け鑑賞（1.2m以上）：150 DPIでも文字の輪郭やディテールが美しく再現。'
    ],
    proseH3_2: 'トリミングラインとカッティングマージン',
    proseP4: '1枚の用紙から写真を綺麗に切り分けるには、均一なマージン設定が不可欠です。Make Contact Sheetならセルの間隔を直感的に微調整できます。',
    proseP5: 'ペーパーカッターやロータリートリマーで切断する際も、被写体を傷つけることなく安全に裁断できます。',
    proseH3_3: 'クライアント向けストーリーボードや展示パネル',
    proseP6: '大判面付けシートはコスト削減だけでなく、優れたプレゼンテーション手段でもあります。ウェディングフォトの時系列ストーリーを16x20にまとめる手法が人気です。',
    proseP7: '広告スタジオでは、24x36のシートを使ってキャンペーンの全カットを一度に比較検討しています。',
    faqs: [
      { question: '写真の面付け（ギャングシート）とは？', answer: '複数の写真を1枚の大判印画紙（16x20や24x36など）にまとめて並べてプリントし、現像コストを削減したり一覧性を高める手法です。' },
      { question: '24x36インチの大判ポスターでも画質は荒れませんか？', answer: 'はい。Make Contact Sheetは300 DPI（最大7200×10800ピクセル）の高精細データを出力するため、粗さのない鮮明なプリントが可能です。' },
      { question: '裁断用の余白はどのくらい空ければいいですか？', answer: '2〜4%（約4〜8mm程度）のセル間隔を空けると、カッターでまっすぐ切り分けやすくなります。' }
    ]
  },
  pt: {
    title: 'Layouts de impressão em grande formato — Folhas combinadas de pôster',
    description: 'Crie folhas combinadas para pôsteres em 11x14, 12x18, 16x20 e 24x36 polegadas a 300 DPI. Grades sob medida e privacidade total.',
    heading: 'Layouts de Impressão em Grande Formato & Pôsteres Multifoto',
    lead: 'Aproveite cada centímetro dos seus pôsteres e ampliações. Reúna múltiplos retratos e ensaios em folhas de 11x14, 12x18, 16x20 ou 24x36 a 300 DPI com processamento local.',
    breadcrumbName: 'Impressões em grande formato',
    specsBadge: 'DIMENSÕES E RESOLUÇÃO',
    specsHeading: 'Dimensões padrão de pôster e requisitos de pixels',
    specsLead: 'Laboratórios imprimem entre 150 e 300 DPI. Calcule os pixels exatos para nitidez máxima.',
    posterSpecs: [
      { name: '11 x 14 pol.', metric: '279 x 356 mm', ratio: 'Proporção 11:14', dpi150: '1650 x 2100 px', dpi300: '3300 x 4200 px', capacity: 'Cabem 2x 5x7 ou 6x 3.5x5', labs: 'Laboratórios fotográficos', badge: 'PÔSTER PEQUENO POPULAR', tagVariant: 'blue' },
      { name: '12 x 18 pol.', metric: '305 x 457 mm', ratio: 'Proporção 2:3 nativa DSLR', dpi150: '1800 x 2700 px', dpi300: '3600 x 5400 px', capacity: 'Cabem 2x 8x12 ou 6x 4x6 sem cortes', labs: 'Laboratórios profissionais', badge: 'FORMATO 35MM SEM RECORTE', tagVariant: 'teal' },
      { name: '16 x 20 pol.', metric: '406 x 508 mm', ratio: 'Proporção 4:5 retrato clássico', dpi150: '2400 x 3000 px', dpi300: '4800 x 6000 px', capacity: 'Cabem 4x 8x10 ou 8x 5x7', labs: 'Laboratórios de belas artes', badge: 'GALERIAS E CLIENTES', tagVariant: 'amber' },
      { name: '24 x 36 pol.', metric: '610 x 914 mm', ratio: 'Proporção 2:3 grande formato', dpi150: '3600 x 5400 px', dpi300: '7200 x 10800 px', capacity: 'Cabem 6x 11x14 ou 24x 4x6', labs: 'Birôs de grande formato', badge: 'IMPACTO VISUAL MÁXIMO', tagVariant: 'rose' }
    ],
    howToHeading: 'Como montar uma folha de pôster multifoto',
    howToLead: 'Siga este processo para diagramar, conferir e exportar seus arquivos de grande formato no navegador.',
    howToSteps: [
      { name: 'Escolha a medida do pôster', text: 'Abra o estúdio e selecione o tamanho desejado (11x14, 12x18, 16x20 ou 24x36).' },
      { name: 'Configure a grade', text: 'Ajuste linhas e colunas para a quantidade de fotos desejada.' },
      { name: 'Adicione suas fotos em alta resolução', text: 'Carregue os arquivos diretamente no navegador com processamento local.' },
      { name: 'Defina as margens de corte', text: 'Insira 2 a 6 mm de espaçamento para guiar o estilete ou guilhotina.' },
      { name: 'Exporte a 300 DPI', text: 'Baixe a imagem JPEG ou PDF calibrada para o laboratório de impressão.' }
    ],
    proseH2: 'A economia das impressões combinadas em grandes formatos',
    proseP1: 'O preço de ampliações não é estritamente proporcional à área. Um pôster 24x36 tem quase nove vezes a área de uma cópia 8x10, custando muito menos por centímetro quadrado.',
    proseP2: 'Ao distribuir várias fotos em uma única folha grande, você economiza expressivamente no custo unitário de cada fotografia.',
    proseH3_1: 'DPI conforme a distância de visualização',
    proseP3: 'Fotos manuseadas de perto exigem 300 DPI. Pôsteres de parede vistos a mais de um metro mantêm excelente qualidade entre 150 e 200 DPI.',
    proseBullets: [
      'Visão próxima (30–45 cm): 300 DPI para riqueza de detalhes.',
      'Distância do braço (60–90 cm): 200–240 DPI com nitidez perfeita.',
      'Visão de parede (mais de 1,2 m): 150 DPI perfeitamente nítidos.'
    ],
    proseH3_2: 'Margens seguras e linhas de corte',
    proseP4: 'O recorte preciso exige espaçamentos milimétricos uniformes entre cada imagem.',
    proseP5: 'O Make Contact Sheet cria canais de corte regulares que protegem o enquadramento.',
    proseH3_3: 'Storyboards e murais para ensaios',
    proseP6: 'Folhas combinadas também são uma apresentação elegante para clientes de casamentos e moda.',
    proseP7: 'Estúdios utilizam folhas 24x36 para expor campanhas inteiras lado a lado.',
    faqs: [
      { question: 'O que é uma folha combinada (gang sheet)?', answer: 'É o arranjo de várias fotos em uma mesma folha de papel de grande formato para economizar custos de impressão.' },
      { question: 'As ampliações mantêm a nitidez em 24x36?', answer: 'Sim. O Make Contact Sheet exporta em resolução total a 300 DPI (até 7200x10800 px).' },
      { question: 'Qual espaçamento deixar para o corte?', answer: 'Recomendamos entre 2% e 4% de espaçamento entre células para corte confortável.' }
    ]
  }
};

// -------------------------------------------------------------
// 7. AUTO CULL PHOTOS (/auto-cull-photos)
// -------------------------------------------------------------
export interface AutoCullProse {
  h2: string;
  p1: string;
  p2: string;
  h3_1: string;
  p3: string;
  bullets: string[];
  h3_2: string;
  p4: string;
  p5: string;
}

export interface AutoCullToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  prose: AutoCullProse;
  faqs: ToolFaq[];
}

export const AUTO_CULL_DATA: Record<Locale, AutoCullToolData> = {
  en: {
    title: 'AI Photo Culling Online — Local In-Browser Smart Culling',
    description: 'Fast, private photo culling in your browser. Automatic sharpness scoring using Laplacian variance without uploading files to the cloud.',
    heading: 'AI-Powered In-Browser Photo Culling',
    lead: 'Review and cull thousands of photos in seconds. Our client-side sharpness analysis automatically detects blurry shots, closed eyes, and misfocused burst frames directly in your browser with zero cloud uploads.',
    breadcrumbName: 'Auto Cull Photos',
    prose: {
      h2: 'How Browser-Side Laplacian Variance Sharpness Scoring Works',
      p1: 'Traditional photo culling tools force photographers to upload gigabytes of sensitive RAW files to third-party cloud servers. Make Contact Sheet performs high-speed sharpness analysis directly in your browser using modified Laplacian variance calculations.',
      p2: 'The engine evaluates edge frequency and contrast gradients across high-frequency luminance channels, assigning an objective sharpness score to every frame without sending a single byte to an external server.',
      h3_1: 'The Three-Tier Triage Pipeline: Keep, Flag, and Reject',
      p3: 'Once analyzed, frames are sorted into three actionable buckets so you can finalize your selections in minutes rather than hours:',
      bullets: [
        'Keep (Rating 1): Sharpest, best-focused frames within burst sequences.',
        'Flag (Rating 2): Candidate shots with good expression that warrant second inspection.',
        'Reject (Rating 3): Out-of-focus, motion-blurred, or miscomposed frames flagged for instant pruning.'
      ],
      h3_2: 'Instant Lightroom & Capture One Handoff',
      p4: 'When your review is complete, export Adobe XMP sidecar files, Lightroom search filter strings, or CSV file lists with a single click.',
      p5: 'Sync your Keep selections directly back to Lightroom Classic by pasting the comma-separated filename query into the Library Filter bar.'
    },
    faqs: [
      { question: 'How does the automatic photo culling work?', answer: 'Make Contact Sheet uses local computer vision algorithms (modified Laplacian variance) to measure edge sharpness across image luminance channels. It detects soft focus and camera shake instantly in your browser.' },
      { question: 'Are my photos uploaded to any AI cloud server?', answer: 'No! Unlike cloud AI culling services, 100% of the analysis runs in your local browser memory using Web Workers. Your client photos never leave your device.' },
      { question: 'Can I export my selections back into Lightroom Classic?', answer: 'Yes. You can copy a comma-separated filename list formatted specifically for Lightroom Classic\'s Library Filter bar, or export Adobe XMP sidecar XMLs.' }
    ]
  },
  es: {
    title: 'Selección inteligente de fotos con IA — Culling local en navegador',
    description: 'Selecciona y descarta fotos rápidamente en tu navegador. Análisis de nitidez con varianza de Laplace sin subir archivos a la nube.',
    heading: 'Selección Fotográfica con IA en el Navegador',
    lead: 'Revisa y selecciona miles de fotos en segundos. Nuestro análisis de nitidez local detecta tomas desenfocadas y ráfagas defectuosas directamente en tu navegador sin subir nada a la nube.',
    breadcrumbName: 'Selección inteligente',
    prose: {
      h2: 'Cómo funciona el análisis de nitidez con varianza de Laplace en el navegador',
      p1: 'Las herramientas tradicionales obligan a subir gigabytes de archivos RAW a servidores externos. Make Contact Sheet realiza el análisis de nitidez directamente en tu navegador mediante varianza laplaciana.',
      p2: 'El motor calcula la frecuencia de bordes y contrastes en los canales de luminancia, asignando una puntuación de nitidez objetiva a cada imagen sin enviar datos al exterior.',
      h3_1: 'Flujo de clasificación en tres niveles: Conservar, Dudosa y Descartar',
      p3: 'Una vez analizadas, las imágenes se clasifican en tres estados clave para acelerar la toma de decisiones:',
      bullets: [
        'Conservar (Keep): Las fotos más nítidas y mejor enfocadas de cada ráfaga.',
        'Dudosa (Flag): Tomas de interés con buena expresión que ameritan segunda revisión.',
        'Descartar (Reject): Tomas con desenfoque o movimiento listas para eliminación inmediata.'
      ],
      h3_2: 'Integración instantánea con Lightroom y Capture One',
      p4: 'Al terminar, exporta archivos secundarios XMP de Adobe, cadenas de filtro para Lightroom o listas CSV con un solo clic.',
      p5: 'Sincroniza tus elecciones en Lightroom Classic pegando la lista de nombres en la barra de filtros de biblioteca.'
    },
    faqs: [
      { question: '¿Cómo funciona la selección automática de fotos?', answer: 'Make Contact Sheet emplea algoritmos locales de visión por computador (varianza laplaciana) para medir la nitidez de bordes y detectar fotos movidas o fuera de foco en el navegador.' },
      { question: '¿Se suben mis fotos a algún servidor con IA?', answer: '¡No! Todo el procesamiento se realiza en la memoria local del navegador mediante Web Workers. Ninguna foto sale de tu equipo.' },
      { question: '¿Puedo exportar mi selección a Lightroom Classic?', answer: 'Sí. Puedes copiar una lista de nombres de archivo separada por comas lista para el filtro de biblioteca de Lightroom o descargar archivos XMP.' }
    ]
  },
  de: {
    title: 'KI-Fotoauswahl online — Lokales Smart Culling im Browser',
    description: 'Schnelle, private Fotoauswahl im Browser. Automatische Schärfebewertung mit Laplace-Varianz ohne Cloud-Uploads.',
    heading: 'KI-gestützte Fotoauswahl direkt im Browser',
    lead: 'Sichte tausende Bilder in Sekundenschnelle. Unsere lokale Schärfeanalyse erkennt unscharfe Aufnahmen und Fehlfokus direkt im Browser ohne Datenübertragung.',
    breadcrumbName: 'Automatische Bildauswahl',
    prose: {
      h2: 'Funktionsweise der browserbasierten Laplace-Schärfeanalyse',
      p1: 'Herkömmliche Culling-Software verlangt den Upload sensibler RAW-Dateien in die Cloud. Make Contact Sheet führt die Schärfeanalyse direkt im Arbeitsspeicher deines Browsers durch.',
      p2: 'Der Algorithmus misst Kantensteilheit und Hochfrequenz-Kontraste im Helligkeitskanal und vergibt objektive Schärfewerte – 100% offline.',
      h3_1: 'Dreistufige Sortierung: Behalten, Markieren, Verwerfen',
      p3: 'Nach der Analyse werden Serienbilder in drei übersichtliche Kategorien unterteilt:',
      bullets: [
        'Behalten (Keep): Die schärfsten und treffsichersten Bilder einer Serie.',
        'Markieren (Flag): Aufnahmen mit gutem Ausdruck für eine Zweitsichtung.',
        'Verwerfen (Reject): Unscharfe oder verwackelte Bilder zur schnellen Aussortierung.'
      ],
      h3_2: 'Nahtlose Übergabe an Lightroom & Capture One',
      p4: 'Nach der Sichtung exportierst du Adobe XMP-Filialdateien, Lightroom-Suchabfragen oder CSV-Dateilisten mit einem Klick.',
      p5: 'Übertrage deine Auswahl in Lightroom Classic, indem du die kommagetrennte Dateiliste in den Bibliotheksfilter einfügst.'
    },
    faqs: [
      { question: 'Wie funktioniert das automatische Culling?', answer: 'Make Contact Sheet nutzt lokale Bildverarbeitungsalgorithmen (Laplace-Varianz), um Kantenschärfe zu berechnen und Verwacklungen im Browser zu erkennen.' },
      { question: 'Werden Bilder zu Cloud-Servern gesendet?', answer: 'Nein! Die Analyse läuft komplett offline im Browser über Web Worker. Deine Kundendaten verlassen niemals deinen Rechner.' },
      { question: 'Kann ich die Auswahl in Lightroom Classic übernehmen?', answer: 'Ja. Du kannst eine kommagetrennte Dateiliste für die Lightroom-Bibliothekssuche kopieren oder XMP-Dateien exportieren.' }
    ]
  },
  fr: {
    title: 'Tri photo intelligent par IA — Tri local et privé dans le navigateur',
    description: 'Triez vos photos rapidement et en toute confidentialité. Détection automatique de la netteté par variance laplacienne sans téléversement.',
    heading: 'Tri Photo Intelligent Assisté par IA dans le Navigateur',
    lead: 'Passez au crible des milliers de clichés en un clin d\'œil. Notre analyse locale de netteté détecte flous de bougé et erreurs de mise au point directement dans votre navigateur.',
    breadcrumbName: 'Tri automatique',
    prose: {
      h2: 'Analyse locale de la netteté par variance laplacienne',
      p1: 'La plupart des outils de tri imposent le téléversement de volumineux fichiers RAW sur des serveurs cloud. Make Contact Sheet analyse la netteté localement dans votre navigateur.',
      p2: 'L\'algorithme évalue les fréquences de contours dans les canaux de luminance pour attribuer un score objectif sans transfert de données.',
      h3_1: 'Le flux de tri en trois catégories : Garder, Vérifier, Rejeter',
      p3: 'Après calcul, les prises de vue sont réparties en trois groupes pour faciliter votre décision :',
      bullets: [
        'Garder (Keep) : Les clichés les plus nets et parfaitement mis au point.',
        'Vérifier (Flag) : Les poses prometteuses nécessitant un second regard.',
        'Rejeter (Reject) : Les photos floues ou ratées prêtes pour la suppression.'
      ],
      h3_2: 'Export direct vers Lightroom et Capture One',
      p4: 'Une fois le tri achevé, exportez en un clic des fichiers XMP Adobe, des requêtes de filtre Lightroom ou des listes CSV.',
      p5: 'Synchronisez vos choix dans Lightroom Classic en collant la liste des noms de fichiers dans la barre de filtre de la bibliothèque.'
    },
    faqs: [
      { question: 'Comment s\'effectue le tri automatique ?', answer: 'Make Contact Sheet applique des calculs de vision par ordinateur (variance laplacienne) pour jauger la netteté des contours et repérer les flous dans le navigateur.' },
      { question: 'Mes clichés sont-ils analysés sur un serveur distant ?', answer: 'Non ! Tout s\'exécute localement dans la mémoire de votre navigateur via des Web Workers sans aucun envoi réseau.' },
      { question: 'Peut-on importer la sélection dans Lightroom Classic ?', answer: 'Oui. Vous pouvez copier une liste de noms de fichiers séparés par des virgules pour le filtre de recherche Lightroom ou exporter des fichiers sidecar XMP.' }
    ]
  },
  ja: {
    title: 'AI写真セレクト・写真選別ツール — ブラウザ内完結スマートカーリング',
    description: '高速かつプライベートな写真セレクト。ラプラシアン分散による鮮明度自動スコアリングでピンボケ写真を瞬時に検出。外部アップロード不要。',
    heading: 'ブラウザ完結型 AI写真セレクト＆選別ツール',
    lead: '大量の写真の中からベストショットを素早く判定。ブラウザ上で動作する鮮明度解析アルゴリズムが、ピンボケや手ブレ、連写時のピント外れを自動判別し、選別作業の時間を大幅に削減します。',
    breadcrumbName: '写真の自動選別',
    prose: {
      h2: 'ブラウザ内ラプラシアン分散による鮮明度判定の仕組み',
      p1: '従来のAI選別ツールは、何ギガバイトものRAW写真をクラウドサーバーにアップロードする必要がありました。Make Contact Sheetは、ブラウザ内部でラプラシアン分散解析を高速実行します。',
      p2: '輝度情報のエッジ周波数とコントラスト勾配を局所的に計算し、外部サーバーに一切データを送信することなく、各フレームの客観的なシャープネススコアを算出します。',
      h3_1: '効率的な3段階トリアージ：キープ・保留・不採用',
      p3: '解析された写真は、直感的に3つのステータスに分類されます：',
      bullets: [
        'キープ（Keep）：連写の中で最もピントが合っているベストショット。',
        '保留（Flag）：表情が良く、再確認が必要な候補ショット。',
        '不採用（Reject）：ピンボケや被写体ブレにより除外すべき失敗ショット。'
      ],
      h3_2: 'Lightroom ClassicやCapture Oneとのスムーズな連携',
      p4: '選別が終わったら、Adobe標準のXMPサイドカーファイル、Lightroom検索クエリ、CSVファイルリストをワンクリックで書き出せます。',
      p5: '書き出したファイル名リストをLightroom Classicのライブラリフィルターに貼り付けるだけで、セレクト結果が一瞬で同期されます。'
    },
    faqs: [
      { question: '写真の自動選別はどのように行われますか？', answer: 'Make Contact Sheetはブラウザ上でコンピュータビジョンアルゴリズム（ラプラシアン分散）を実行し、画像のエッジ輪郭の鋭さを解析してピンボケやブレを自動検出します。' },
      { question: '写真がクラウドのAIサーバーに送信されることはありますか？', answer: 'いいえ。すべての画像解析はWeb Workerを通じてお使いのパソコンのメモリ上でのみ実行されます。大切な撮影データが外部に出ることはありません。' },
      { question: '選別結果をLightroom Classicに引き継げますか？', answer: 'はい。Lightroomのライブラリフィルター用ファイル名テキスト（カンマ区切り）や、5つ星評価を含むAdobe XMPサイドカーファイルをダウンロードできます。' }
    ]
  },
  pt: {
    title: 'Seleção inteligente de fotos com IA — Culling local no navegador',
    description: 'Faça a triagem de milhares de fotos com rapidez e privacidade. Análise de nitidez por variância laplaciana sem envio para a nuvem.',
    heading: 'Seleção Fotográfica com IA Direto no Navegador',
    lead: 'Revise e selecione milhares de fotos em instantes. Nossa análise de nitidez local identifica fotos fora de foco e disparos tremidos diretamente no navegador sem enviar dados para a nuvem.',
    breadcrumbName: 'Seleção automática',
    prose: {
      h2: 'Como funciona o cálculo de nitidez por variância de Laplace',
      p1: 'Softwares tradicionais exigem o upload de gigabytes de fotos RAW para servidores externos. O Make Contact Sheet realiza toda a análise diretamente no seu navegador.',
      p2: 'O algoritmo mede o contraste e a definição de bordas nos canais de luminância, pontuando cada imagem com total precisão e sem conexões externas.',
      h3_1: 'Triagem em três níveis: Manter, Analisar e Descartar',
      p3: 'Após o cálculo, as fotos são organizadas em três categorias para agilizar suas decisões:',
      bullets: [
        'Manter (Keep): As imagens mais nítidas e com foco perfeito de cada sequência.',
        'Analisar (Flag): Imagens com boa expressão que merecem conferência posterior.',
        'Descartar (Reject): Fotos com desfoque ou erro de foco prontas para remoção.'
      ],
      h3_2: 'Exportação rápida para Lightroom e Capture One',
      p4: 'Finalizada a revisão, exporte arquivos XMP da Adobe, textos de busca para o Lightroom ou planilhas CSV com um clique.',
      p5: 'Cole a lista de nomes de arquivos no filtro de biblioteca do Lightroom Classic para sincronizar suas escolhas na hora.'
    },
    faqs: [
      { question: 'Como funciona a seleção automática de fotos?', answer: 'O Make Contact Sheet utiliza algoritmos locais de visão computacional (variância laplaciana) para mensurar a nitidez das bordas e identificar imagens tremidas no navegador.' },
      { question: 'Minhas fotos são enviadas para algum servidor de IA?', answer: 'Não! Toda a análise é realizada localmente na memória do navegador com Web Workers. Suas fotos nunca saem da sua máquina.' },
      { question: 'Posso exportar minha seleção para o Lightroom Classic?', answer: 'Sim. Você pode copiar a lista de arquivos formatada para a barra de filtros do Lightroom ou baixar arquivos sidecar XMP.' }
    ]
  }
};

// -------------------------------------------------------------
// 8. WHITE LABEL CLIENT GALLERY (/white-label-client-gallery)
// -------------------------------------------------------------
export interface WhiteLabelTableRow {
  feature: string;
  freeLabel: string;
  cloudLabel: string;
}

export interface WhiteLabelToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  tableHeading: string;
  tableRows: WhiteLabelTableRow[];
  faqs: ToolFaq[];
}

export const WHITE_LABEL_DATA: Record<Locale, WhiteLabelToolData> = {
  en: {
    title: 'Free White-Label Client Proofing Gallery Alternative',
    description: 'Deliver custom branded client photo proofing portals for free. Offline HTML proofing with ratings, notes, and zero subscription fees.',
    heading: 'Free White-Label Client Photo Proofing Portals',
    lead: 'Deliver private, branded client proofing galleries without paying $25 to $50/month in cloud subscriptions. Export self-contained HTML proofing files featuring your custom studio logo, hex colors, and client selection tools.',
    breadcrumbName: 'White-Label Gallery',
    tableHeading: 'Make Contact Sheet vs Cloud Subscription Proofing Services',
    tableRows: [
      { feature: 'Monthly Subscription Cost', freeLabel: '$0 / month forever', cloudLabel: '$25 – $50 / month recurring' },
      { feature: 'Data Privacy & Hosting', freeLabel: '100% Local / Self-Hosted HTML', cloudLabel: 'Uploaded to third-party servers' },
      { feature: 'Studio Branding & Logo', freeLabel: 'Custom studio logo & hex accents', cloudLabel: 'Requires highest-tier plan' },
      { feature: 'Client Selection Feedback', freeLabel: '1-click Keep/Flag/Reject & notes', cloudLabel: 'Client account creation required' },
      { feature: 'Lightroom Sync Mechanism', freeLabel: 'JSON manifest & Library Filter query', cloudLabel: 'Proprietary plugin required' },
      { feature: 'File Bundle Portability', freeLabel: 'Single self-contained .html file', cloudLabel: 'Locked behind expiring web links' }
    ],
    faqs: [
      { question: 'What is a self-contained HTML client proofing gallery?', answer: 'It is a single, offline-capable HTML file that contains your photos (embedded as compressed previews), your custom studio logo, brand colors, and an interactive review interface. Clients can open it in any web browser without logging into any service.' },
      { question: 'How do clients send back their photo selections?', answer: 'Clients review images using 1-click Keep/Flag/Reject buttons, star ratings, and per-photo notes. When finished, they click "Export Selections", which generates a clean text file of filenames or a .makecontactsheet.json review manifest to send back to you.' },
      { question: 'Do I need web hosting or a server to share these galleries?', answer: 'No! You can email the single .html file directly to your client, send it via Dropbox/Google Drive, or host it on your own website domain.' }
    ]
  },
  es: {
    title: 'Galería de pruebas para clientes marca blanca — Alternativa gratuita',
    description: 'Entrega portales de prueba de fotos con tu marca gratis. Archivo HTML independiente con valoraciones, notas y sin cuotas mensuales.',
    heading: 'Portales de Pruebas Fotográficas Marca Blanca Gratuitos',
    lead: 'Entrega galerías de prueba privadas y personalizadas sin pagar suscripciones de 25 a 50 $ al mes. Exporta archivos HTML independientes con el logo de tu estudio, tus colores y herramientas de selección.',
    breadcrumbName: 'Galería marca blanca',
    tableHeading: 'Make Contact Sheet frente a plataformas de prueba en la nube',
    tableRows: [
      { feature: 'Coste mensual de suscripción', freeLabel: '0 $ / mes para siempre', cloudLabel: '25 $ – 50 $ / mes recurrente' },
      { feature: 'Privacidad y alojamiento', freeLabel: '100% local / HTML autónomo', cloudLabel: 'Subido a servidores de terceros' },
      { feature: 'Identidad y logotipo del estudio', freeLabel: 'Logotipo y colores personalizados', cloudLabel: 'Requiere planes superiores' },
      { feature: 'Selección y notas del cliente', freeLabel: 'Botones Conservar/Dudosa y notas', cloudLabel: 'Exige que el cliente cree cuenta' },
      { feature: 'Sincronización con Lightroom', freeLabel: 'Manifiesto JSON y filtro de texto', cloudLabel: 'Requiere plugins propietarios' },
      { feature: 'Portabilidad del archivo', freeLabel: 'Un único archivo .html autónomo', cloudLabel: 'Sujeto a enlaces con caducidad' }
    ],
    faqs: [
      { question: '¿Qué es una galería HTML de prueba para clientes autónoma?', answer: 'Es un archivo HTML único que contiene las fotos en miniatura comprimidas, tu logotipo, colores de marca y una interfaz interactiva de revisión. El cliente lo abre en su navegador sin registrarse.' },
      { question: '¿Cómo me devuelve el cliente su selección de fotos?', answer: 'El cliente marca las fotos con botones de selección, estrellas y comentarios. Al terminar, hace clic en "Exportar selección" y descarga un archivo de texto o manifiesto JSON para enviártelo.' },
      { question: '¿Necesito un servidor web para compartir estas galerías?', answer: 'No. Puedes enviar el archivo .html directamente por correo electrónico, WeTransfer o alojarlo en tu propio dominio si lo prefieres.' }
    ]
  },
  de: {
    title: 'Kostenlose White-Label Kundengalerie — Lokale Abnahme-Portale',
    description: 'Bereitstellung von Kunden-Prüfgemeinschaften mit eigenem Logo ohne monatliche Abos. Eigenständiges HTML-Portal mit Bewertung & Notizen.',
    heading: 'Kostenlose White-Label Kunden-Prüfgalerien',
    lead: 'Präsentiere Fotoauswahlen im eigenen Studiodesign ohne 25–50 € Monatsabos. Exportiere eigenständige HTML-Dateien mit deinem Logo, Akzentfarben und Auswahlinstrumenten.',
    breadcrumbName: 'White-Label Galerie',
    tableHeading: 'Make Contact Sheet im Vergleich zu Cloud-Galeriediensten',
    tableRows: [
      { feature: 'Monatliche Abokosten', freeLabel: '0 € dauerhaft kostenlos', cloudLabel: '25 € – 50 € mtl. wiederkehrend' },
      { feature: 'Datenschutz & Hosting', freeLabel: '100% lokal / Offline-HTML', cloudLabel: 'Speicherung auf Fremdservern' },
      { feature: 'Eigenes Studio-Branding', freeLabel: 'Eigenes Logo & Farbdesign', cloudLabel: 'Nur in teuren Tarifen verfügbar' },
      { feature: 'Kunden-Feedback & Notizen', freeLabel: '1-Klick-Auswahl, Sterne & Notizen', cloudLabel: 'Kunden müssen Account anlegen' },
      { feature: 'Lightroom-Synchronisation', freeLabel: 'JSON-Manifest & Bibliotheksfilter', cloudLabel: 'Erfordert proprietäre Plugins' },
      { feature: 'Dateiformat & Mobilität', freeLabel: 'Einzelne eigenständige .html-Datei', cloudLabel: 'Gebunden an ablaufende Weblinks' }
    ],
    faqs: [
      { question: 'Was ist eine eigenständige HTML-Kundengalerie?', answer: 'Eine einzelne Datei, die Bildvorschauen, Studio-Branding und eine interaktive Oberfläche vereint. Kunden öffnen sie einfach im Browser ohne Account.' },
      { question: 'Wie übermittelt der Kunde seine Auswahl?', answer: 'Der Kunde bewertet Bilder mit Sternen und Notizen. Ein Klick auf "Auswahl exportieren" erstellt eine Dateiliste oder ein JSON-Manifest zur Rücksendung.' },
      { question: 'Wird ein Webserver benötigt?', answer: 'Nein! Die Datei kann direkt per Mail, WeTransfer oder USB-Stick weitergegeben werden.' }
    ]
  },
  fr: {
    title: 'Galerie client en marque blanche gratuite — Portails d\'épreuves photo',
    description: 'Livrez des galeries d\'épreuves à vos couleurs sans abonnement mensuel. Fichier HTML autonome avec notations, remarques et sélection.',
    heading: 'Portails d\'Épreuves Photo Client en Marque Blanche Gratuits',
    lead: 'Présentez vos shootings dans une interface à votre image sans payer 25 à 50 € par mois d\'abonnement cloud. Exportez des fichiers HTML autonomes avec votre logo et vos couleurs.',
    breadcrumbName: 'Galerie marque blanche',
    tableHeading: 'Make Contact Sheet comparé aux plateformes cloud payantes',
    tableRows: [
      { feature: 'Coût mensuel d\'abonnement', freeLabel: '0 € / mois pour toujours', cloudLabel: '25 € à 50 € / mois récurrent' },
      { feature: 'Hébergement et confidentialité', freeLabel: '100% local / Fichier HTML autonome', cloudLabel: 'Téléversé sur des serveurs tiers' },
      { feature: 'Identité visuelle du studio', freeLabel: 'Logo personnalisé et teinte d\'accent', cloudLabel: 'Réservé aux forfaits les plus chers' },
      { feature: 'Retours de sélection client', freeLabel: 'Boutons Garder/Rejeter, notes & étoiles', cloudLabel: 'Création de compte client requise' },
      { feature: 'Passerelle vers Lightroom', freeLabel: 'Manifeste JSON et filtre de bibliothèque', cloudLabel: 'Plugin propriétaire obligatoire' },
      { feature: 'Portabilité du document', freeLabel: 'Fichier .html unique et autonome', cloudLabel: 'Dépendant de liens web temporaires' }
    ],
    faqs: [
      { question: 'Qu\'est-ce qu\'une galerie client HTML autonome ?', answer: 'Un fichier HTML unique renfermant des aperçus légers de vos photos, votre logo de studio et une interface de sélection interactive sans aucun serveur externe.' },
      { question: 'Comment le client transmet-il ses choix ?', answer: 'Le client consulte les photos, attribue des notes et rédige des commentaires, puis clique sur "Exporter la sélection" pour générer un fichier de synthèse.' },
      { question: 'Faut-il disposer d\'un hébergement web ?', answer: 'Non. Vous pouvez envoyer directement le fichier .html par courriel ou le partager via votre outil de transfert habituel.' }
    ]
  },
  ja: {
    title: '無料ホワイトレーベル クライアント校正ギャラリー — 独自ブランド納品',
    description: '自社ロゴやブランドカラーを設定できる写真校正ポータルを無料で作成。サブスクリプション不要、単一HTMLファイル完結、高セキュリティ。',
    heading: '無料 ホワイトレーベル クライアント写真校正ポータル',
    lead: '月額25〜50ドルの高額なクラウド校正サービスに頼ることなく、自社のロゴやブランドカラーを反映した洗練された納品用ギャラリーを提供。ローカル完結の単一HTMLファイルとして書き出せます。',
    breadcrumbName: 'ホワイトレーベル校正',
    tableHeading: 'Make Contact Sheet と 一般的なクラウド校正サービスの比較',
    tableRows: [
      { feature: '月額利用料', freeLabel: '永久完全無料（0円）', cloudLabel: '月額約3,500円〜7,000円の固定費' },
      { feature: 'データ管理と機密性', freeLabel: '100%ローカル / 単一HTML配布', cloudLabel: '第三者の海外サーバーに保存' },
      { feature: '自社スタジオロゴ・ブランディング', freeLabel: '独自ロゴ・アクセントカラー反映無料', cloudLabel: '上位プランのみに制限' },
      { feature: 'クライアントの選別・メモ機能', freeLabel: 'ワンクリック選別・星評価・メモ対応', cloudLabel: 'クライアントのアカウント登録が必要' },
      { feature: 'Lightroomとの同期', freeLabel: 'JSONマニフェスト & 検索テキスト出力', cloudLabel: '専用外部プラグインの導入が必要' },
      { feature: 'ファイルの保管性・可搬性', freeLabel: 'オフラインでも開ける自己完結型HTML', cloudLabel: '有効期限付きWebリンクに依存' }
    ],
    faqs: [
      { question: '自己完結型HTMLクライアント校正ギャラリーとは何ですか？', answer: '写真のプレビュー画像、自社ロゴ、テーマカラー、選別インターフェースが1つのHTMLファイルに内包されたものです。クライアントはブラウザで開くだけで閲覧・選別できます。' },
      { question: 'クライアントはどのように選別結果を返信しますか？', answer: 'クライアントが写真の評価やコメントを入力後、「セレクト結果を書き出す」をクリックすると、選択済みファイル名テキストやJSONマニフェストが生成され、メール等で簡単に受け取れます。' },
      { question: 'Webサーバーやホスティングの契約は必要ですか？', answer: '一切不要です。生成された.htmlファイルをメール添付やファイル転送サービスでそのまま送信できます。' }
    ]
  },
  pt: {
    title: 'Galeria para clientes marca branca gratuita — Provas fotográficas',
    description: 'Entregue galerias de aprovação de fotos com sua identidade visual gratuitamente. Arquivo HTML independente com notas e sem custos mensais.',
    heading: 'Portais de Aprovação Fotográfica para Clientes em Marca Branca',
    lead: 'Apresente suas fotos em uma área personalizada sem pagar mensalidades caras na nuvem. Gere arquivos HTML independentes com sua logo, cores e ferramentas de seleção.',
    breadcrumbName: 'Galeria marca branca',
    tableHeading: 'Make Contact Sheet vs Serviços de Prova na Nuvem',
    tableRows: [
      { feature: 'Custo mensal de assinatura', freeLabel: 'R$ 0 / mês para sempre', cloudLabel: 'Planos mensais recorrentes caros' },
      { feature: 'Privacidade e hospedagem', freeLabel: '100% local / Arquivo HTML independente', cloudLabel: 'Armazenado em servidores de terceiros' },
      { feature: 'Identidade visual e logo', freeLabel: 'Logo própria e cores personalizadas', cloudLabel: 'Exclusivo dos planos mais caros' },
      { feature: 'Seleção do cliente e notas', freeLabel: 'Seleção rápida, notas e estrelas', cloudLabel: 'Exige cadastro prévio do cliente' },
      { feature: 'Sincronização com o Lightroom', freeLabel: 'Manifesto JSON e filtro por texto', cloudLabel: 'Requer plugins proprietários' },
      { feature: 'Portabilidade do arquivo', freeLabel: 'Arquivo .html único e autônomo', cloudLabel: 'Links com prazo de validade' }
    ],
    faqs: [
      { question: 'O que é uma galeria HTML independente para clientes?', answer: 'É um arquivo HTML único contendo prévias compactas das fotos, sua logomarca e uma interface de aprovação que abre em qualquer navegador sem necessidade de login.' },
      { question: 'Como o cliente envia as fotos escolhidas?', answer: 'O cliente marca as fotos e notas e clica em "Exportar seleções" para gerar uma lista de nomes ou manifesto JSON que pode ser enviado de volta por e-mail.' },
      { question: 'É necessário ter um servidor web para compartilhar?', answer: 'Não. Você pode enviar o arquivo .html por e-mail, WeTransfer ou armazenar no seu próprio site.' }
    ]
  }
};

// -------------------------------------------------------------
// 9. BULK RESIZE PHOTOS TO 16:9 (/bulk-resize-photos-to-16-9)
// -------------------------------------------------------------
export interface BulkResizeProse {
  h2: string;
  p1: string;
  p2: string;
  h3_1: string;
  p3: string;
  bullets: string[];
  h3_2: string;
  p4: string;
}

export interface BulkResizeToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  prose: BulkResizeProse;
  faqs: ToolFaq[];
}

export const BULK_RESIZE_DATA: Record<Locale, BulkResizeToolData> = {
  en: {
    title: 'Bulk Resize Photos to 16:9 Online — Free Batch Aspect Ratio Crop',
    description: 'Crop and resize photo batches to 16:9 widescreen online. Fast, browser-based center cropping with 1080p, 2K, and 4K bounds. Zero cloud uploads.',
    heading: 'Bulk Resize Photos to 16:9 Aspect Ratio',
    lead: 'Quickly adapt batches of vertical or standard DSLR photos to cinematic 16:9 widescreen format. Choose output resolutions from 1080p up to 4K Ultra HD with local browser processing.',
    breadcrumbName: 'Bulk Resize to 16:9',
    prose: {
      h2: 'Why Standardize Image Batches to 16:9 Widescreen?',
      p1: 'Modern presentation environments—from 4K televisions and digital video displays to keynote decks and YouTube thumbnails—are built around the universal 16:9 widescreen aspect ratio. However, standard cameras capture in 3:2 (DSLR) or 4:3 (Micro Four Thirds & smartphones), leaving distracting black pillarboxes when presented on widescreen screens.',
      p2: 'Make Contact Sheet provides an instant, browser-based batch cropping pipeline that automatically calculates optical center coordinates, trims edges symmetrically, and outputs uniform 16:9 assets at your chosen resolution.',
      h3_1: 'Target Resolution Presets',
      p3: 'Select the optimal output dimensions based on your publishing destination:',
      bullets: [
        '1080p Full HD (1920 × 1080 px): Ideal for presentation slides, website banners, and rapid email sharing.',
        '2K Quad HD (2560 × 1440 px): Perfect for retina web galleries, portfolio showcases, and desktop wallpapers.',
        '4K Ultra HD (3840 × 2160 px): Recommended for video background plates, TV slide broadcasts, and high-end digital signage.'
      ],
      h3_2: '100% In-Browser Privacy and Speed',
      p4: 'Unlike online photo converters that require uploading hundreds of gigabytes of commercial images to remote cloud servers, Make Contact Sheet executes every resize operation in local browser memory. Files are processed with multi-threaded Web Workers and Canvas rendering.'
    },
    faqs: [
      { question: 'How does the 16:9 bulk resize tool crop photos?', answer: 'The tool uses intelligent optical center-cropping. It calculates the largest possible 16:9 rectangle that fits inside your image and trims equal margins from the opposing edges, keeping your subject centered.' },
      { question: 'What file formats can I convert to 16:9?', answer: 'You can import JPEG, PNG, WebP, AVIF, GIF, and standard camera RAW files. Output files can be exported as high-quality WebP, JPEG, or PNG.' },
      { question: 'Are my images uploaded to an external server?', answer: 'No. All conversions happen entirely on your computer inside your web browser. No photos are ever uploaded.' }
    ]
  },
  es: {
    title: 'Redimensionar fotos a 16:9 por lotes — Recorte panorámico gratis',
    description: 'Recorta fotos a 16:9 panorámico en línea. Recorte central automático con límites 1080p, 2K y 4K. 100% privado en tu navegador.',
    heading: 'Redimensionar Fotos a Proporción 16:9 por Lotes',
    lead: 'Adapta lotes de fotos a formato panorámico 16:9 de cine. Elige resoluciones de salida desde 1080p hasta 4K Ultra HD con procesamiento local en el navegador.',
    breadcrumbName: 'Redimensionar a 16:9',
    prose: {
      h2: '¿Por qué adaptar lotes de imágenes a formato panorámico 16:9?',
      p1: 'Las pantallas actuales (monitores, televisores 4K, diapositivas y miniaturas de vídeo) se basan en la relación panorámica 16:9. Sin embargo, las cámaras capturan en 3:2 o 4:3, dejando barras negras laterales cuando se muestran en pantallas anchas.',
      p2: 'Make Contact Sheet ofrece un flujo de recorte central por lotes en el navegador que calcula automáticamente el centro óptico y recorta márgenes simétricos para lograr tomas 16:9 uniformes.',
      h3_1: 'Ajustes predefinidos de resolución de salida',
      p3: 'Elige las medidas ideales según el destino de tus imágenes:',
      bullets: [
        '1080p Full HD (1920 × 1080 px): Ideal para presentaciones, cabeceras web y envíos por correo.',
        '2K Quad HD (2560 × 1440 px): Excelente para galerías web retina y fondos de escritorio.',
        '4K Ultra HD (3840 × 2160 px): Recomendado para vídeos de fondo, pantallas de televisión y cartelería digital.'
      ],
      h3_2: 'Privacidad y rapidez 100% en el navegador',
      p4: 'A diferencia de los convertidores en la nube, Make Contact Sheet ejecuta cada operación de recorte en la memoria local mediante Web Workers y aceleración por Canvas.'
    },
    faqs: [
      { question: '¿Cómo recorta las fotos a 16:9 la herramienta por lotes?', answer: 'Aplica un recorte central simétrico: calcula el mayor rectángulo 16:9 posible dentro de la imagen y recorta los márgenes sobrantes de forma equidistante manteniendo el motivo centrado.' },
      { question: '¿Qué formatos puedo redimensionar a 16:9?', answer: 'Admite JPEG, PNG, WebP, AVIF y archivos de cámara. Puedes exportar en WebP, JPEG o PNG con alta fidelidad.' },
      { question: '¿Se suben mis fotos a algún servidor?', answer: 'No. Todas las conversiones ocurren íntegramente en tu navegador sin enviar nada a servidores externos.' }
    ]
  },
  de: {
    title: 'Fotos stapelweise auf 16:9 skalieren — Kostenloser Batch-Zuschnitt',
    description: 'Fotos stapelweise auf 16:9 Breitbild zuschneiden. Automatischer Mitten-Zuschnitt für 1080p, 2K und 4K ohne Cloud-Uploads.',
    heading: 'Fotos stapelweise auf das Seitenverhältnis 16:9 anpassen',
    lead: 'Passe Bilderserien blitzschnell an das filmische 16:9-Format an. Wähle Auflösungen von 1080p bis 4K Ultra HD bei lokaler Verarbeitung im Browser.',
    breadcrumbName: 'Auf 16:9 skalieren',
    prose: {
      h2: 'Warum Bilderserien auf 16:9 Breitbild vereinheitlichen?',
      p1: 'Moderne Bildschirme, Präsentationen und Video-Thumbnails basieren auf dem 16:9-Seitenverhältnis. Kameras nehmen jedoch in 3:2 oder 4:3 auf, was auf Monitoren zu schwarzen Balken führt.',
      p2: 'Make Contact Sheet schneidet Bilder automatisch mittig auf 16:9 zu und skaliert sie auf die gewünschte Auflösung.',
      h3_1: 'Verfügbare Auflösungs-Presets',
      p3: 'Wähle die passende Ausgabegröße für deinen Einsatzzweck:',
      bullets: [
        '1080p Full HD (1920 × 1080 px): Perfekt für Präsentationen und Website-Banner.',
        '2K Quad HD (2560 × 1440 px): Ideal für hochauflösende Web-Portfolios.',
        '4K Ultra HD (3840 × 2160 px): Empfohlen für 4K-Displays und Video-Hintergründe.'
      ],
      h3_2: '100% Privatsphäre & lokale Ausführung',
      p4: 'Kein Warten auf Server-Uploads: Alle Bildoperationen laufen direkt im RAM deines Computers ab.'
    },
    faqs: [
      { question: 'Wie werden die Bilder auf 16:9 zugeschnitten?', answer: 'Das Tool berechnet das größte 16:9-Rechteck im Bild und schneidet die überstehenden Ränder symmetrisch ab.' },
      { question: 'Welche Formate werden unterstützt?', answer: 'Unterstützt werden JPEG, PNG, WebP, AVIF und gängige RAW-Formate.' },
      { question: 'Werden Bilder irgendwo gespeichert?', answer: 'Nein, die Verarbeitung erfolgt komplett lokal auf deinem Rechner.' }
    ]
  },
  fr: {
    title: 'Redimensionner des photos en 16:9 par lots — Recadrage panoramique',
    description: 'Recadrez des photos en 16:9 en ligne. Recadrage centré automatique pour 1080p, 2K et 4K sans aucun téléversement cloud.',
    heading: 'Redimensionner des Photos au Ratio 16:9 par Lots',
    lead: 'Adaptez rapidement des séries de clichés au format panoramique 16:9. Choisissez votre résolution de 1080p à 4K Ultra HD en local.',
    breadcrumbName: 'Redimensionner en 16:9',
    prose: {
      h2: 'Pourquoi normaliser des séries de photos en format 16:9 ?',
      p1: 'Les écrans modernes, les téléviseurs 4K et les présentations utilisent le standard 16:9. Les capteurs photo produisant du 3:2 ou du 4:3, des bandes noires apparaissent souvent.',
      p2: 'Make Contact Sheet offre un recadrage optique centré automatique qui harmonise vos visuels en 16:9 à la définition souhaitée.',
      h3_1: 'Profils de résolution prédéfinis',
      p3: 'Sélectionnez la dimension idéale pour votre support :',
      bullets: [
        '1080p Full HD (1920 × 1080 px) : Idéal pour les diaporamas et bannières web.',
        '2K Quad HD (2560 × 1440 px) : Recommandé pour les galeries retina.',
        '4K Ultra HD (3840 × 2160 px) : Parfait pour la vidéo et l\'affichage dynamique.'
      ],
      h3_2: 'Confidentialité totale et rapidité locale',
      p4: 'Toutes les opérations de recadrage et de redimensionnement sont opérées en mémoire locale via Web Workers.'
    },
    faqs: [
      { question: 'Comment le recadrage 16:9 est-il calculé ?', answer: 'L\'outil effectue un cadrage centré symétrique en conservant le centre de la scène et en égalisant les marges.' },
      { question: 'Quels formats d\'image sont acceptés ?', answer: 'JPEG, PNG, WebP, AVIF et aperçus RAW avec export en WebP, JPEG ou PNG.' },
      { question: 'Mes clichés sont-ils transférés sur internet ?', answer: 'Non, le traitement s\'exécute entièrement dans votre navigateur.' }
    ]
  },
  ja: {
    title: '写真一括16:9リサイズ・トリミングツール — 無料ワイド画角変換',
    description: '大量の写真を16:9ワイド画面比率に一括トリミング＆リサイズ。1080p、2K、4K解像度対応。ブラウザ内ローカル処理で安全・高速。',
    heading: '写真一括 16:9アスペクト比リサイズ＆トリミング',
    lead: '一眼レフやスマホで撮影した写真をシネマティックな16:9ワイド比率へ瞬時に適合。1080pから4K Ultra HDまで、好みの解像度を選んでブラウザ内で安全に一括変換できます。',
    breadcrumbName: '16:9リサイズ',
    prose: {
      h2: 'なぜ写真素材を16:9ワイドアスペクト比に揃えるのか？',
      p1: '4Kテレビやディスプレイ、プレゼンテーションスライド、YouTubeのサムネイルなど、現在の主要な画面表示は16:9が国際標準です。しかし一般的なカメラは3:2や4:3で撮影されるため、そのまま表示すると左右に不要な黒帯が生じます。',
      p2: 'Make Contact Sheetは、写真の中心座標を自動計算して左右または上下を均等にトリミングし、統一された16:9の画像アセットを一括生成します。',
      h3_1: '用途に応じた解像度プリセット',
      p3: '出力先に合わせて最適なピクセルサイズを選択できます：',
      bullets: [
        '1080p フルHD（1920 × 1080 px）：企画書、スライド資料、Webバナーに最適。',
        '2K Quad HD（2560 × 1440 px）：Retina対応のWebポートフォリオや壁紙に推奨。',
        '4K Ultra HD（3840 × 2160 px）：高精細ディスプレイや動画背景素材に最適。'
      ],
      h3_2: '100% ブラウザ内完結の安全性と処理速度',
      p4: 'ファイルをクラウドへアップロードすることなく、パソコンのブラウザメモリ上でマルチスレッドWeb Workerを用いて高速に処理されます。'
    },
    faqs: [
      { question: '16:9のトリミングはどのように行われますか？', answer: '画像の光学的な中心を自動認識し、最大の16:9矩形を切り出して不要な両端を均等にクロップします。' },
      { question: '対応している画像フォーマットは？', answer: 'JPEG、PNG、WebP、AVIF、主要カメラのRAW画像に対応し、WebP、JPEG、PNGで出力可能です。' },
      { question: '写真データが外部に送信されることはありますか？', answer: 'ありません。すべてのトリミング・リサイズ処理はお使いのマシン上で100%完結します。' }
    ]
  },
  pt: {
    title: 'Redimensionar fotos para 16:9 em lote — Recorte panorâmico grátis',
    description: 'Recorte fotos para o formato panorâmico 16:9 online. Enquadramento central automático para 1080p, 2K e 4K sem uploads.',
    heading: 'Redimensionar Fotos para a Proporção 16:9 em Lote',
    lead: 'Adapte séries de fotos para o formato panorâmico 16:9. Escolha resoluções de 1080p até 4K Ultra HD com processamento local no navegador.',
    breadcrumbName: 'Redimensionar para 16:9',
    prose: {
      h2: 'Por que padronizar fotos no formato 16:9?',
      p1: 'Monitores modernos, TVs 4K e apresentações utilizam o formato 16:9. Câmeras capturam em 3:2 ou 4:3, gerando faixas pretas nas bordas.',
      p2: 'O Make Contact Sheet calcula o centro da imagem e apara as margens simetricamente, gerando imagens 16:9 uniformes com agilidade.',
      h3_1: 'Resoluções de saída disponíveis',
      p3: 'Selecione o tamanho ideal conforme o uso final:',
      bullets: [
        '1080p Full HD (1920 × 1080 px): Ideal para slides, apresentações e sites.',
        '2K Quad HD (2560 × 1440 px): Excelente para portfólios retina e monitores 1440p.',
        '4K Ultra HD (3840 × 2160 px): Recomendado para fundos de vídeo e telas 4K.'
      ],
      h3_2: 'Privacidade e processamento 100% no navegador',
      p4: 'Nenhum arquivo é enviado para a nuvem. O redimensionamento é executado no navegador com Web Workers.'
    },
    faqs: [
      { question: 'Como o recorte 16:9 é realizado?', answer: 'A ferramenta faz um corte central simétrico, preservando o centro da foto e eliminando bordas em excesso.' },
      { question: 'Quais formatos de arquivo são suportados?', answer: 'Aceita JPEG, PNG, WebP, AVIF e formatos RAW, exportando em WebP, JPEG ou PNG.' },
      { question: 'As imagens são salvas em algum servidor?', answer: 'Não. Todas as conversões são feitas exclusivamente no seu computador.' }
    ]
  }
};

// -------------------------------------------------------------
// 10. COMPRESS PHOTOS FOR WEB (/compress-photos-for-web)
// -------------------------------------------------------------
export interface CompressProse {
  h2: string;
  p1: string;
  h3_1: string;
  p2: string;
  h3_2: string;
  p3: string;
  h3_3: string;
  p4: string;
}

export interface CompressToolData {
  title: string;
  description: string;
  heading: string;
  lead: string;
  breadcrumbName: string;
  prose: CompressProse;
  faqs: ToolFaq[];
}

export const COMPRESS_DATA: Record<Locale, CompressToolData> = {
  en: {
    title: 'Compress Photos for Web Online — Free Batch Image Optimizer',
    description: 'Compress photo batches for the web in your browser. Convert to WebP or optimized JPEG with size reduction up to 80%. 100% private.',
    heading: 'Batch Compress Photos for Web',
    lead: 'Shrink file sizes by up to 80% without visible quality loss. Convert heavy camera photos into web-optimized WebP or JPEG formats directly in your browser with zero cloud uploads.',
    breadcrumbName: 'Compress for Web',
    prose: {
      h2: 'Why Modern Web Publishing Requires Aggressive Image Compression',
      p1: 'Unoptimized camera JPEGs typically weigh between 8MB and 25MB each. When uploaded directly to websites, portfolios, or client galleries, these oversized files destroy Core Web Vitals, spike bounce rates, and degrade mobile user experience.',
      h3_1: 'The Modern WebP Standard',
      p2: 'Google\'s WebP format delivers 25% to 35% smaller file sizes than equivalent JPEGs at identical visual fidelity. Supported across all modern web browsers, WebP provides superior compression efficiency.',
      h3_2: 'Visual Quality vs File Size Sweet Spot',
      p3: 'Our compression engine is calibrated to a default quality threshold of 82%. This represents the perceptual sweet spot where file sizes are slashed by 70% to 80% while retaining razor-sharp details for retina displays.',
      h3_3: 'Total Privacy with Zero Server Uploads',
      p4: 'Unlike online image compression services that process your confidential client work on remote cloud clusters, Make Contact Sheet runs entirely in local browser memory.'
    },
    faqs: [
      { question: 'How much smaller will my compressed photos be?', answer: 'Most camera JPEGs (10MB–20MB) are reduced to 400KB–1.2MB—an average file size reduction of 75% to 85%—with virtually indistinguishable visual quality.' },
      { question: 'Should I convert to WebP or JPEG for web use?', answer: 'WebP is strongly recommended for websites and portfolios because it delivers smaller files at equal quality. JPEG remains the best choice if you need maximum compatibility with legacy software.' },
      { question: 'Are my photos uploaded to a cloud server to compress?', answer: 'No. The entire compression process runs inside your web browser using HTML5 Canvas and browser image decoders.' }
    ]
  },
  es: {
    title: 'Comprimir fotos para la web por lotes — Optimizador de imágenes gratis',
    description: 'Comprime fotos para la web en tu navegador. Convierte a WebP o JPEG optimizado con reducciones de hasta el 80%. 100% privado.',
    heading: 'Comprimir Fotos para la Web por Lotes',
    lead: 'Reduce el peso de tus fotos hasta un 80% sin pérdida visual perceptible. Convierte imágenes pesadas de cámara a WebP o JPEG optimizado directamente en el navegador.',
    breadcrumbName: 'Comprimir para la web',
    prose: {
      h2: '¿Por qué la publicación web moderna exige compresión de imágenes?',
      p1: 'Las fotos recién salidas de la cámara pesan entre 8 y 25 MB cada una. Subirlas directamente a páginas web o portafolios perjudica los tiempos de carga y la experiencia en móviles.',
      h3_1: 'El estándar moderno WebP',
      p2: 'El formato WebP ofrece archivos un 25% a 35% más ligeros que los JPEGs equivalentes con la misma calidad visual, respaldado por todos los navegadores modernos.',
      h3_2: 'El punto óptimo de calidad frente a tamaño',
      p3: 'Nuestro motor está calibrado en un 82% de calidad: el equilibrio perfecto donde el peso se reduce entre un 70% y un 80% manteniendo gran nitidez.',
      h3_3: 'Privacidad total sin servidores intermedios',
      p4: 'A diferencia de servicios que procesan fotos en la nube, Make Contact Sheet ejecuta la compresión en la memoria local de tu navegador.'
    },
    faqs: [
      { question: '¿Cuánto se reducirá el tamaño de mis fotos?', answer: 'La mayoría de las imágenes pasan de 10-20 MB a solo 400 KB-1.2 MB (una reducción media del 75% al 85%) conservando una fidelidad visual óptima.' },
      { question: '¿Debería elegir WebP o JPEG para la web?', answer: 'WebP es ideal para páginas web y portafolios por su ligereza. JPEG sigue siendo recomendable si requieres compatibilidad con programas antiguos.' },
      { question: '¿Se suben mis fotos para ser comprimidas?', answer: 'No. La compresión se realiza íntegramente en tu navegador sin subir nada a la nube.' }
    ]
  },
  de: {
    title: 'Fotos fürs Web komprimieren — Kostenloser Batch-Bildoptimierer',
    description: 'Fotos fürs Web im Browser komprimieren. In WebP oder optimiertes JPEG konvertieren mit bis zu 80% Ersparnis. 100% privat.',
    heading: 'Fotos fürs Web stapelweise komprimieren',
    lead: 'Dateigrößen um bis zu 80% reduzieren ohne sichtbaren Qualitätsverlust. Konvertiere schwere Kamerabilder direkt im Browser in weboptimiertes WebP oder JPEG.',
    breadcrumbName: 'Fürs Web komprimieren',
    prose: {
      h2: 'Warum moderne Websites Bildkomprimierung erfordern',
      p1: 'Direkte Kamera-JPEGs wiegen 8 bis 25 MB. Solche Dateien verlangsamen Ladezeiten drastisch und schaden der mobilen Nutzung.',
      h3_1: 'Der moderne WebP-Standard',
      p2: 'WebP erzeugt bei gleicher optischer Schärfe 25% bis 35% kleinere Dateien als JPEG und wird von allen modernen Browsern unterstützt.',
      h3_2: 'Der optimale Schnittpunkt aus Qualität und Dateigröße',
      p3: 'Unser Kompressor arbeitet mit 82% Qualität – dem idealen Punkt für 70% bis 80% kleinere Dateien bei gestochen scharfer Darstellung.',
      h3_3: 'Volle Privatsphäre ohne Upload',
      p4: 'Keine Speicherung auf Cloud-Servern: Alle Berechnungen laufen auf deinem Computer im Browser.'
    },
    faqs: [
      { question: 'Um wie viel werden meine Fotos kleiner?', answer: 'Bilder mit 10–20 MB schrumpfen in der Regel auf 400 KB–1,2 MB – eine Reduktion um bis zu 85% bei hervorragender Schärfe.' },
      { question: 'WebP oder JPEG für Websites?', answer: 'WebP bietet die beste Kombination aus geringer Größe und hoher Schärfe. JPEG eignet sich für maximale Kompatibilität mit Altsystemen.' },
      { question: 'Werden Bilder zur Komprimierung hochgeladen?', answer: 'Nein, die Komprimierung läuft zu 100% lokal im Browser.' }
    ]
  },
  fr: {
    title: 'Compresser des photos pour le Web — Optimiseur d\'images par lots',
    description: 'Compressez vos photos pour le web dans le navigateur. Conversion en WebP ou JPEG optimisé avec jusqu\'à 80% de réduction. 100% local.',
    heading: 'Compresser des Photos pour le Web par Lots',
    lead: 'Allégez le poids de vos clichés jusqu\'à 80% sans dégradation visible. Transformez vos photos haute définition en WebP ou JPEG optimisés pour le web sans téléversement.',
    breadcrumbName: 'Compresser pour le Web',
    prose: {
      h2: 'Pourquoi optimiser impérativement les images pour le web ?',
      p1: 'Les fichiers JPEG bruts de 8 à 25 Mo ralentissent considérablement l\'affichage des sites et pénalisent le référencement.',
      h3_1: 'Le standard WebP moderne',
      p2: 'Le WebP génère des fichiers 25% à 35% plus légers que le JPEG à rendu visuel identique.',
      h3_2: 'Le compromis idéal entre finesse et légèreté',
      p3: 'Calibré à 82% de qualité, notre moteur réduit le poids de 70% à 80% tout en préservant les détails sur écrans haute densité.',
      h3_3: 'Confidentialité absolue sans transfert réseau',
      p4: 'L\'intégralité du traitement s\'opère dans le navigateur, sans qu\'aucune photo ne quitte votre terminal.'
    },
    faqs: [
      { question: 'Quel gain de poids puis-je espérer ?', answer: 'Des clichés de 10 à 20 Mo sont couramment réduits à 400 Ko - 1,2 Mo, soit un allègement moyen de 75% à 85%.' },
      { question: 'Faut-il privilégier le WebP ou le JPEG ?', answer: 'Le WebP est vivement recommandé pour le web grâce à sa légèreté supérieure. Le JPEG reste utile pour la compatibilité universelle.' },
      { question: 'Y a-t-il un transfert vers un serveur pour la compression ?', answer: 'Non, tous les calculs sont effectués localement par le navigateur.' }
    ]
  },
  ja: {
    title: '写真一括Web用圧縮ツール — 高画質画像軽量化・WebP変換',
    description: 'ブラウザ上で大量の写真をWeb用に一括圧縮。見た目の美しさを保ったままファイルサイズを最大80%削減。WebP/JPEG変換対応。完全非送信。',
    heading: 'Web用写真一括圧縮＆軽量化ツール',
    lead: '画質の劣化を感じさせずにファイルサイズを最大80%削減。重いデジカメ写真をWeb表示に最適化されたWebPや軽量JPEGへブラウザ内で高速変換します。',
    breadcrumbName: 'Web用画像圧縮',
    prose: {
      h2: 'なぜWebサイト掲載には画像の適切な圧縮が不可欠なのか？',
      p1: 'カメラから取り出したJPEG写真は1枚あたり8〜25MBあります。そのままWebサイトやポートフォリオに掲載すると読み込み速度が大幅に遅延し、離脱率の増加やSEO順位の低下を招きます。',
      h3_1: '次世代画像フォーマット WebP（ウェッピー）',
      p2: 'Googleが開発したWebP形式は、同等画質のJPEGと比較してファイルサイズを約25〜35%小さく抑えられます。現在の主要ブラウザすべてでサポートされています。',
      h3_2: '画質とデータ量のスイートスポット',
      p3: '本ツールの初期品質設定（82%）は、Retinaディスプレイでも鮮明さを維持しながら、ファイルサイズを70〜80%削減できる理想的なバランスに調整されています。',
      h3_3: '完全なプライバシー保護とローカル高速処理',
      p4: '大切な写真を外部のクラウド圧縮サーバーへアップロードすることなく、ブラウザのCanvasレンダリング機能を使って手元で安全に処理されます。'
    },
    faqs: [
      { question: 'どのくらいファイルサイズが小さくなりますか？', answer: '10〜20MBの写真であれば、400KB〜1.2MB程度まで（約75〜85%削減）美しさを保ったまま軽量化できます。' },
      { question: 'WebPとJPEGはどちらを選ぶべきですか？', answer: 'Webサイトやブログへの掲載には軽量なWebPを推奨します。古いソフトとの互換性が必要な場合はJPEGをお選びください。' },
      { question: '写真がサーバーへ送信されることはありますか？', answer: 'ありません。すべての圧縮・フォーマット変換処理はPCのブラウザ内部で完結します。' }
    ]
  },
  pt: {
    title: 'Comprimir fotos para a Web em lote — Otimizador de imagens grátis',
    description: 'Comprima fotos para a web no navegador. Converta para WebP ou JPEG otimizado com redução de até 80%. 100% privado.',
    heading: 'Comprimir Fotos para a Web em Lote',
    lead: 'Reduza o tamanho dos arquivos em até 80% sem perda visual perceptível. Converta fotos pesadas da câmera em WebP ou JPEG otimizados diretamente no navegador.',
    breadcrumbName: 'Comprimir para a Web',
    prose: {
      h2: 'Por que otimizar imagens para a web?',
      p1: 'Fotos diretas da câmera pesam de 8 a 25 MB. Enviar esses arquivos sem compressão torna os sites lentos e prejudica o acesso em celulares.',
      h3_1: 'O padrão moderno WebP',
      p2: 'O formato WebP gera arquivos de 25% a 35% menores que o JPEG com a mesma fidelidade visual.',
      h3_2: 'O ponto de equilíbrio entre qualidade e tamanho',
      p3: 'Nosso compressor opera em 82% de qualidade: redução média de 70% a 80% mantendo alta nitidez.',
      h3_3: 'Privacidade total sem envio para servidores',
      p4: 'Nenhuma foto sai do seu computador. Todo o processo acontece na memória local do navegador.'
    },
    faqs: [
      { question: 'Qual é a redução média de tamanho?', answer: 'Fotos de 10–20 MB costumam ser reduzidas para 400 KB–1,2 MB (redução média de 75% a 85%).' },
      { question: 'Devo escolher WebP ou JPEG para sites?', answer: 'O WebP é a melhor opção para sites pela economia de dados. O JPEG continua ideal para máxima compatibilidade com sistemas legados.' },
      { question: 'As fotos são carregadas na nuvem para compressão?', answer: 'Não. A compressão roda 100% no navegador do seu computador.' }
    ]
  }
};

// -------------------------------------------------------------
// 11. STUDIO CONTACT SHEET (/studio/contact-sheet)
// -------------------------------------------------------------
export interface StudioContactSheetData {
  title: string;
  description: string;
  heading: string;
  lead1: string;
  lead2: string;
  breadcrumbName: string;
  stepsHeading: string;
  steps: StudioStep[];
  settingsHeading: string;
  settingsLead: string;
  settingGroups: SettingGroup[];
  reviewHeading: string;
  reviewP1: string;
  reviewP2: string;
  shortcutsHeading: string;
  shortcuts: ShortcutItem[];
  exportsHeading: string;
  exportsLead: string;
  exports: ExportFormatItem[];
  faqsHeading: string;
  faqs: ToolFaq[];
  relatedHeading: string;
  relatedLinks: { name: string; url: string }[];
}

export const STUDIO_CONTACT_SHEET_DATA: Record<Locale, StudioContactSheetData> = {
  en: {
    title: 'Full-Screen Photo Contact Sheet Studio — Make Contact Sheet',
    description: 'High-density photo proofing studio. Configure grids, inspect EXIF tokens, and export 300 DPI PDFs. 100% private in-browser workspace.',
    heading: 'Professional In-Browser Contact Sheet Studio',
    lead1: 'A dedicated, full-screen environment for producing print-calibrated contact sheets, client proof packages, and archival photo indices.',
    lead2: 'Every step runs inside browser memory with zero network requests. Your photos never leave your machine.',
    breadcrumbName: 'Contact Sheet Studio',
    stepsHeading: 'How the Contact Sheet Studio Works',
    steps: [
      { n: '01', title: 'Load your photo shoot', body: 'Drop in folders or raw camera files. All decoding happens locally.' },
      { n: '02', title: 'Configure paper & grid layout', body: 'Choose standard dimensions (A4, Letter, 8x10) or custom millimeter sizing with 1 to 12 columns.' },
      { n: '03', title: 'Review and cull with keyboard keys', body: 'Flag keepers (1), candidates (2), or rejects (3) with instant progress metrics.' },
      { n: '04', title: 'Export print-ready files', body: 'Download 300 DPI PDFs, PNGs, CSV manifests, or Adobe XMP sidecar XMLs.' }
    ],
    settingsHeading: 'Studio Configuration Capabilities',
    settingsLead: 'Fine-tune every visual and technical parameter with real-time canvas updates.',
    settingGroups: [
      { title: 'Canvas & Paper Formats', items: ['A4 portrait & landscape (210 × 297 mm)', 'US Letter (8.5 × 11 in)', 'Photo Print 8 × 10 in', 'Widescreen 16:9 & Square 1:1', 'Custom millimeter dimensions (40mm to 1200mm)'] },
      { title: 'Grid Geometry & Spacing', items: ['1 to 12 columns and rows', 'Adjustable page margins and cell gaps', 'Auto-pagination across multi-page sheets', 'Fit modes: Cover vs Contain with aspect ratio crop'] },
      { title: 'Metadata & Filename Overlays', items: ['Preserve original camera filenames', 'Dynamic EXIF token badges ({camera}, {fstop}, {iso})', 'Sequence index counters with zero-padding', 'Custom logo and signature watermarks'] }
    ],
    reviewHeading: 'Integrated Review & Culling Toolbar',
    reviewP1: 'Evaluating hundreds of photos requires rapid decisions. The studio toolbar provides dedicated status buttons and single-key keyboard shortcuts to triage your shoot without switching tools.',
    reviewP2: 'Selections are synchronized with our export engine, allowing you to export only Keep selections into Lightroom-ready lists or Adobe XMP sidecars.',
    shortcutsHeading: 'Productivity Keyboard Shortcuts',
    shortcuts: [
      { keys: '1 / K', action: 'Mark selected photo as Keep (Rating 1)' },
      { keys: '2 / F', action: 'Mark selected photo as Flag (Rating 2)' },
      { keys: '3 / R', action: 'Mark selected photo as Reject (Rating 3)' },
      { keys: '0 / U', action: 'Clear rating / unmark selection' },
      { keys: '← / →', action: 'Navigate to previous / next photo' },
      { keys: 'Space', action: 'Open full-resolution zoom lightbox' }
    ],
    exportsHeading: 'Professional Export Formats',
    exportsLead: 'Six versatile export formats supporting visual handoffs and automated software pipelines.',
    exports: [
      { name: 'Multi-Page PDF', body: 'Print-calibrated 300 DPI vector PDF document with custom margins.' },
      { name: 'High-Res PNG', body: 'Lossless full-resolution image of the active page.' },
      { name: 'Compressed JPEG', body: 'Web-optimized image for quick messaging and client emails.' },
      { name: 'CSV Manifest', body: 'Structured spreadsheet table with filenames, ratings, and EXIF parameters.' },
      { name: 'Lightroom Text Query', body: 'Comma-separated filename list formatted for the Lightroom Library Filter.' },
      { name: 'Project JSON', body: 'Complete workspace state file for archiving and reloading sessions.' }
    ],
    faqsHeading: 'Contact Sheet Studio FAQs',
    faqs: [
      { question: 'What is the difference between this studio and the homepage tool?', answer: 'The studio provides a dedicated full-screen layout with advanced zoom controls, keyboard shortcuts, and deep EXIF metadata inspection.' },
      { question: 'Are my images uploaded anywhere?', answer: 'No. All image decoding and PDF rendering happen 100% inside your browser memory.' },
      { question: 'Can I print at custom dimensions?', answer: 'Yes, you can configure custom dimensions from 40mm up to 1200mm.' },
      { question: 'What image formats are supported?', answer: 'JPEG, PNG, WebP, AVIF, GIF, BMP, and standard camera RAW previews.' }
    ],
    relatedHeading: 'Related Tools & Resources',
    relatedLinks: [
      { name: 'Photo Contact Sheet Maker', url: '/photo-contact-sheet-maker' },
      { name: 'Contact Sheet Templates', url: '/contact-sheet-template' },
      { name: 'How to Make a Contact Sheet', url: '/guides/how-to-make-a-contact-sheet' },
      { name: 'Proof Sheets with Filenames', url: '/guides/photo-proof-sheet-with-filenames' },
      { name: 'Photoshop Alternative', url: '/compare/photoshop-contact-sheet-alternative' },
      { name: 'Photo Collage Maker', url: '/photo-collage-maker' }
    ]
  },
  es: {
    title: 'Estudio de hojas de contactos a pantalla completa — Make Contact Sheet',
    description: 'Estudio fotográfico de alta densidad. Configura cuadrículas, metadatos EXIF y exporta PDFs a 300 DPI. 100% privado en tu navegador.',
    heading: 'Estudio Profesional de Hojas de Contactos en el Navegador',
    lead1: 'Un entorno dedicado a pantalla completa para producir hojas de contactos calibradas para impresión, paquetes de pruebas para clientes e índices fotográficos de archivo.',
    lead2: 'Cada paso se ejecuta en la memoria de tu navegador sin conexiones de red. Tus fotos nunca salen de tu ordenador.',
    breadcrumbName: 'Estudio de hojas de contactos',
    stepsHeading: 'Cómo funciona el Estudio de Hojas de Contactos',
    steps: [
      { n: '01', title: 'Carga tu sesión de fotos', body: 'Arrastra carpetas o fotos de cámara. Toda la decodificación es local.' },
      { n: '02', title: 'Configura papel y cuadrícula', body: 'Elige formatos estándar (A4, Carta, 8x10) o dimensiones en milímetros de 1 a 12 columnas.' },
      { n: '03', title: 'Revisa y clasifica con atajos', body: 'Marca fotos con Conservar (1), Dudosa (2) o Descartar (3).' },
      { n: '04', title: 'Exporta con calidad de impresión', body: 'Descarga PDFs a 300 DPI, PNGs, manifiestos CSV o archivos XMP para Adobe.' }
    ],
    settingsHeading: 'Capacidades de configuración del estudio',
    settingsLead: 'Ajusta cada parámetro visual y técnico con previsualización en tiempo real.',
    settingGroups: [
      { title: 'Formatos de papel y lienzo', items: ['A4 vertical y horizontal (210 × 297 mm)', 'Carta US (8,5 × 11 pulg.)', 'Foto 8 × 10 pulg.', 'Panorámico 16:9 y Cuadrado 1:1', 'Dimensiones en milímetros (40 mm a 1200 mm)'] },
      { title: 'Geometría y cuadrícula', items: ['De 1 a 12 columnas y filas', 'Márgenes de página y espacio entre celdas ajustables', 'Paginación automática en varias hojas', 'Modos de ajuste: Rellenar vs Contener'] },
      { title: 'Metadatos y nombres de archivo', items: ['Conservación de nombres de archivo de cámara', 'Insignias dinámicas EXIF ({camera}, {fstop}, {iso})', 'Contadores secuenciales con ceros', 'Logotipo y marcas de agua personalizadas'] }
    ],
    reviewHeading: 'Barra de revisión y clasificación integrada',
    reviewP1: 'Evaluar cientos de fotos exige decisiones ágiles. La barra de herramientas ofrece botones y atajos de teclado para clasificar la sesión sin cambiar de herramienta.',
    reviewP2: 'Las selecciones se sincronizan con las opciones de exportación para generar listas de nombres para Lightroom o archivos XMP.',
    shortcutsHeading: 'Atajos de teclado para máxima productividad',
    shortcuts: [
      { keys: '1 / K', action: 'Marcar como Conservar (Keep / 1 estrella)' },
      { keys: '2 / F', action: 'Marcar como Dudosa (Flag / 2 estrellas)' },
      { keys: '3 / R', action: 'Marcar como Descartar (Reject / 3 estrellas)' },
      { keys: '0 / U', action: 'Borrar marca o calificación' },
      { keys: '← / →', action: 'Ir a la foto anterior / siguiente' },
      { keys: 'Espacio', action: 'Abrir visor ampliado en alta resolución' }
    ],
    exportsHeading: 'Formatos de exportación profesionales',
    exportsLead: 'Seis opciones adaptadas tanto para entrega a clientes como para programas de edición.',
    exports: [
      { name: 'PDF multipágina', body: 'Documento vectorial a 300 DPI en escala de impresión.' },
      { name: 'PNG en alta resolución', body: 'Imagen sin compresión de la página activa.' },
      { name: 'JPEG optimizado', body: 'Archivo ligero para envíos rápidos por correo o mensajería.' },
      { name: 'Manifiesto CSV', body: 'Hoja de cálculo con nombres, calificaciones y parámetros EXIF.' },
      { name: 'Lista para Lightroom', body: 'Nombres separados por comas para búsqueda en el filtro de biblioteca.' },
      { name: 'JSON de proyecto', body: 'Archivo completo de sesión para archivar y reanudar el trabajo.' }
    ],
    faqsHeading: 'Preguntas frecuentes sobre el estudio',
    faqs: [
      { question: '¿Cuál es la diferencia entre el estudio y la herramienta de inicio?', answer: 'El estudio aprovecha la pantalla completa, con zoom interactivo, atajos de teclado y lectura profunda de metadatos EXIF.' },
      { question: '¿Se suben mis imágenes a algún servidor?', answer: 'No. Toda la decodificación y generación de archivos ocurre en la memoria local de tu navegador.' },
      { question: '¿Puedo imprimir en medidas personalizadas?', answer: 'Sí, puedes definir dimensiones en milímetros desde 40 mm hasta 1200 mm.' },
      { question: '¿Qué formatos de imagen se pueden cargar?', answer: 'JPEG, PNG, WebP, AVIF, GIF, BMP y vistas previas de archivos RAW.' }
    ],
    relatedHeading: 'Herramientas y recursos relacionados',
    relatedLinks: [
      { name: 'Creador de hojas de contactos', url: '/photo-contact-sheet-maker' },
      { name: 'Plantillas de hojas de contactos', url: '/contact-sheet-template' },
      { name: 'Cómo hacer una hoja de contactos', url: '/guides/how-to-make-a-contact-sheet' },
      { name: 'Hojas de pruebas con nombres de archivo', url: '/guides/photo-proof-sheet-with-filenames' },
      { name: 'Alternativa a Photoshop', url: '/compare/photoshop-contact-sheet-alternative' },
      { name: 'Creador de collages', url: '/photo-collage-maker' }
    ]
  },
  de: {
    title: 'Vollbild-Kontaktabzug-Studio — Make Contact Sheet',
    description: 'Professionelles Foto-Prüfstudio im Vollbild. Raster gestalten, EXIF-Daten einblenden und 300 DPI PDFs exportieren. 100% lokal im Browser.',
    heading: 'Professionelles Kontaktabzug-Studio im Browser',
    lead1: 'Eine dedizierte Vollbildumgebung zur Erstellung druckfertiger Kontaktabzüge, Kunden-Prüfpakete und Bildarchive.',
    lead2: 'Jeder Schritt wird ohne Serverkontakt im Arbeitsspeicher deines Browsers ausgeführt. Deine Fotos bleiben auf deinem Rechner.',
    breadcrumbName: 'Kontaktabzug-Studio',
    stepsHeading: 'So funktioniert das Kontaktabzug-Studio',
    steps: [
      { n: '01', title: 'Fotoserie laden', body: 'Ordner oder RAW-Vorschauen per Drag & Drop importieren. 100% lokale Dekodierung.' },
      { n: '02', title: 'Papier & Raster konfigurieren', body: 'Standardformate (A4, Letter, 8x10) oder Millimetermaße mit 1 bis 12 Spalten wählen.' },
      { n: '03', title: 'Mit Tastaturkürzeln sichten', body: 'Bilder mit Behalten (1), Markieren (2) oder Verwerfen (3) taggen.' },
      { n: '04', title: 'Druckfertig exportieren', body: '300 DPI PDFs, PNGs, CSV-Listen oder Adobe XMP-Filialdateien herunterladen.' }
    ],
    settingsHeading: 'Konfigurationsmöglichkeiten im Studio',
    settingsLead: 'Optimiere jedes Detail mit sofortiger Echtzeit-Aktualisierung.',
    settingGroups: [
      { title: 'Papier- & Bogenformate', items: ['A4 Hoch- & Querformat (210 × 297 mm)', 'US Letter (8,5 × 11 Zoll)', 'Fotodruck 8 × 10 Zoll', '16:9 Breitbild & 1:1 Quadrat', 'Benutzerdefinierte Millimetermaße (40 bis 1200 mm)'] },
      { title: 'Raster & Abstände', items: ['1 bis 12 Spalten und Zeilen', 'Frei einstellbare Rand- und Zwischenabstände', 'Automatische Mehrseitenaufteilung', 'Einpassung: Ausfüllen vs Einpassen'] },
      { title: 'Metadaten & Beschriftungen', items: ['Kamera-Dateinamen beibehalten', 'Dynamische EXIF-Badges ({camera}, {fstop}, {iso})', 'Fortlaufende Bildnummern mit führenden Nullen', 'Eigenes Studialogo als Wasserzeichen'] }
    ],
    reviewHeading: 'Integrierte Sichtungs- und Bewertungsleiste',
    reviewP1: 'Hunderte Aufnahmen zu sichten verlangt schnelle Entscheidungen. Die Studio-Toolbar bietet Tastaturkürzel zur direkten Bewertung.',
    reviewP2: 'Deine Auswahlen können direkt als gefilterte Dateilisten für Lightroom oder XMP-Dateien exportiert werden.',
    shortcutsHeading: 'Produktivitäts-Tastaturkürzel',
    shortcuts: [
      { keys: '1 / K', action: 'Als Behalten markieren (Keep / 1)' },
      { keys: '2 / F', action: 'Als Markieren taggen (Flag / 2)' },
      { keys: '3 / R', action: 'Als Verwerfen einstufen (Reject / 3)' },
      { keys: '0 / U', action: 'Bewertung zurücksetzen' },
      { keys: '← / →', action: 'Vorheriges / nächstes Bild' },
      { keys: 'Leertaste', action: 'Hochauflösende Lightbox öffnen' }
    ],
    exportsHeading: 'Professionelle Exportformate',
    exportsLead: 'Sechs vielseitige Exportmöglichkeiten für Kundenübergabe und Weiterverarbeitung.',
    exports: [
      { name: 'Mehrseitiges PDF', body: 'Druckfertiges 300 DPI Dokument mit exakten Rändern.' },
      { name: 'Hochauflösendes PNG', body: 'Verlustfreies Bild der aktuellen Seite.' },
      { name: 'Komprimiertes JPEG', body: 'Optimierte Datei für schnellen Mailversand.' },
      { name: 'CSV-Tabelle', body: 'Strukturierte Liste mit Dateinamen und EXIF-Werten.' },
      { name: 'Lightroom-Textabfrage', body: 'Kommagetrennte Dateiliste für den Bibliotheksfilter.' },
      { name: 'Projekt-JSON', body: 'Sitzungsdatei zum Speichern und späteren Fortsetzen.' }
    ],
    faqsHeading: 'Häufig gestellte Fragen zum Studio',
    faqs: [
      { question: 'Was unterscheidet das Studio von der Startseite?', answer: 'Das Studio nutzt den vollen Bildschirm, bietet Leuchttisch-Zoom bis 600% und schnelle Tastatur-Sichtung.' },
      { question: 'Werden Fotos irgendwo hochgeladen?', answer: 'Nein, alles läuft zu 100% lokal im Browser-Arbeitsspeicher.' },
      { question: 'Sind Sonderformate möglich?', answer: 'Ja, Maße von 40 bis 1200 mm können frei in Millimetern definiert werden.' },
      { question: 'Welche Dateiformate werden unterstützt?', answer: 'JPEG, PNG, WebP, AVIF, GIF, BMP und gängige RAW-Formate.' }
    ],
    relatedHeading: 'Verwandte Tools & Ressourcen',
    relatedLinks: [
      { name: 'Kontaktabzug-Ersteller', url: '/photo-contact-sheet-maker' },
      { name: 'Kontaktabzug-Vorlagen', url: '/contact-sheet-template' },
      { name: 'Anleitung: Kontaktabzug erstellen', url: '/guides/how-to-make-a-contact-sheet' },
      { name: 'Prüfbögen mit Dateinamen', url: '/guides/photo-proof-sheet-with-filenames' },
      { name: 'Photoshop Alternative', url: '/compare/photoshop-contact-sheet-alternative' },
      { name: 'Fotocollagen-Ersteller', url: '/photo-collage-maker' }
    ]
  },
  fr: {
    title: 'Studio de planches contact plein écran — Make Contact Sheet',
    description: 'Studio d\'épreuves photographiques haute densité. Grilles personnalisées, métadonnées EXIF et PDF 300 DPI. 100% privé dans votre navigateur.',
    heading: 'Studio Professionnel de Planches Contact dans le Navigateur',
    lead1: 'Un espace dédié en plein écran pour produire des planches contact calibrées pour l\'impression, des dossiers d\'épreuves et des index d\'archives.',
    lead2: 'Chaque étape s\'exécute dans la mémoire vive de votre navigateur sans requête réseau. Vos clichés ne quittent jamais votre équipement.',
    breadcrumbName: 'Studio planche contact',
    stepsHeading: 'Fonctionnement du Studio Planche Contact',
    steps: [
      { n: '01', title: 'Chargez votre série de photos', body: 'Glissez vos dossiers ou fichiers RAW. Le décodage est 100% local.' },
      { n: '02', title: 'Réglez le format papier et la grille', body: 'Sélectionnez vos dimensions (A4, Letter, 8x10) ou des mesures sur mesure en millimètres.' },
      { n: '03', title: 'Triez au clavier avec fluidité', body: 'Classez avec Garder (1), Vérifier (2) ou Rejeter (3) avec indicateurs en direct.' },
      { n: '04', title: 'Exportez pour le tirage', body: 'Téléchargez en PDF 300 DPI, PNG, listes CSV ou fichiers sidecar XMP Adobe.' }
    ],
    settingsHeading: 'Paramètres et options du studio',
    settingsLead: 'Ajustez chaque paramètre graphique et technique avec mise à jour immédiate sur le canevas.',
    settingGroups: [
      { title: 'Formats de papier et toiles', items: ['A4 portrait et paysage (210 × 297 mm)', 'US Letter (8,5 × 11 pouces)', 'Tirage 8 × 10 pouces', 'Panoramique 16:9 & Carré 1:1', 'Dimensions personnalisées en mm (40 à 1200 mm)'] },
      { title: 'Géométrie de grille et gouttières', items: ['De 1 à 12 colonnes et rangées', 'Marges et espacements de gouttières réglables', 'Pagination automatique multi-pages', 'Mode de cadrage : Remplir vs Ajuster'] },
      { title: 'Métadonnées et noms de fichiers', items: ['Conservation des noms originaux', 'Badges dynamiques EXIF ({camera}, {fstop}, {iso})', 'Numérotation séquentielle avec zéros', 'Logo de studio en filigrane'] }
    ],
    reviewHeading: 'Barre de tri et de validation intégrée',
    reviewP1: 'La sélection parmi des centaines de clichés demande rapidité et concentration. La barre d\'outils propose des raccourcis pour trier sans changer de fenêtre.',
    reviewP2: 'Les sélections se synchronisent directement avec le moteur d\'export pour générer des requêtes pour Lightroom ou des fichiers XMP.',
    shortcutsHeading: 'Raccourcis clavier de productivité',
    shortcuts: [
      { keys: '1 / K', action: 'Marquer comme Garder (Keep / 1)' },
      { keys: '2 / F', action: 'Marquer comme Vérifier (Flag / 2)' },
      { keys: '3 / R', action: 'Marquer comme Rejeter (Reject / 3)' },
      { keys: '0 / U', action: 'Effacer l\'état de sélection' },
      { keys: '← / →', action: 'Photo précédente / suivante' },
      { keys: 'Espace', action: 'Ouvrir la visionneuse zoom haute définition' }
    ],
    exportsHeading: 'Formats d\'exportation professionnels',
    exportsLead: 'Six formats polyvalents pour les présentations clients et l\'intégration dans vos logiciels photo.',
    exports: [
      { name: 'PDF multi-pages', body: 'Document vectoriel à 300 DPI calibré pour l\'impression.' },
      { name: 'PNG haute résolution', body: 'Fichier sans perte de la page en cours d\'affichage.' },
      { name: 'JPEG optimisé', body: 'Fichier compact pour les envois rapides par courriel.' },
      { name: 'Manifeste CSV', body: 'Tableau avec noms, statuts et valeurs EXIF.' },
      { name: 'Requête texte Lightroom', body: 'Liste séparée par des virgules pour le filtre de bibliothèque.' },
      { name: 'JSON de projet', body: 'Sauvegarde intégrale de session pour archivage et reprise.' }
    ],
    faqsHeading: 'Questions fréquentes sur le studio',
    faqs: [
      { question: 'Quelle est la différence avec l\'outil de la page d\'accueil ?', answer: 'Le studio occupe tout l\'écran, autorise un zoom jusqu\'à 600% et dispose de raccourcis clavier pour le tri rapide.' },
      { question: 'Mes fichiers sont-ils transférés sur un serveur ?', answer: 'Non. Tous les calculs s\'exécutent localement dans votre navigateur.' },
      { question: 'Peut-on imprimer dans des formats personnalisés ?', answer: 'Oui, vous pouvez renseigner des dimensions en millimètres de 40 mm à 1200 mm.' },
      { question: 'Quels formats d\'image sont acceptés ?', answer: 'JPEG, PNG, WebP, AVIF, GIF, BMP et aperçus de fichiers RAW.' }
    ],
    relatedHeading: 'Outils et ressources associés',
    relatedLinks: [
      { name: 'Créateur de planches contact', url: '/photo-contact-sheet-maker' },
      { name: 'Modèles de planches contact', url: '/contact-sheet-template' },
      { name: 'Guide : Créer une planche contact', url: '/guides/how-to-make-a-contact-sheet' },
      { name: 'Planches avec noms de fichiers', url: '/guides/photo-proof-sheet-with-filenames' },
      { name: 'Alternative à Photoshop', url: '/compare/photoshop-contact-sheet-alternative' },
      { name: 'Créateur de collage photo', url: '/photo-collage-maker' }
    ]
  },
  ja: {
    title: '全画面写真コンタクトシートスタジオ — Make Contact Sheet',
    description: '高密度写真校正スタジオ。カスタムグリッド、EXIFメタデータバッジ、300 DPI印刷PDF出力に対応。100%ローカル・高セキュリティ。',
    heading: 'ブラウザ完結型 プロフェッショナル・コンタクトシートスタジオ',
    lead1: '印刷用に最適化されたコンタクトシート、クライアント提出用プルーフ、長期保管用写真インデックスを作成するための全画面ワークスペース。',
    lead2: 'すべての処理がお使いのマシンのメモリ上で完結し、外部ネットワークへのリクエストは発生しません。大切な写真が外部に流出する心配はありません。',
    breadcrumbName: 'コンタクトシートスタジオ',
    stepsHeading: 'コンタクトシートスタジオの利用手順',
    steps: [
      { n: '01', title: '撮影データを読み込む', body: 'フォルダやRAW画像を直接ドラッグ＆ドロップ。すべてローカルで高速デコードされます。' },
      { n: '02', title: '用紙サイズとグリッドを設定', body: 'A4、USレター、8x10インチ、またはミリ単位のカスタムサイズ（1〜12列）を指定します。' },
      { n: '03', title: 'ショートカットキーで瞬時に選別', body: 'キーボードの数字キー（1:採用、2:保留、3:不採用）で素早くトリアージを実行します。' },
      { n: '04', title: '印刷用データを出力', body: '300 DPI高解像度PDF、PNG画像、CSVリスト、Adobe XMPサイドカーファイルを書き出します。' }
    ],
    settingsHeading: 'スタジオの充実したカスタマイズ機能',
    settingsLead: 'リアルタイムにキャンバスを更新しながら、あらゆるレイアウト設定を細かく調整できます。',
    settingGroups: [
      { title: 'キャンバス＆用紙フォーマット', items: ['A4 縦・横（210 × 297 mm）', 'USレター（8.5 × 11 インチ）', '写真プリント 8 × 10 インチ', '16:9 ワイド ＆ 1:1 正方形', 'ミリ単位カスタム指定（40mm〜1200mm）'] },
      { title: 'グリッド構造と余白', items: ['1〜12列・行の自由なグリッド分割', 'ページ余白とセル間隔の微調整', '大量写真の自動複数ページ分割', 'フィットモード：切り抜き（Cover） vs 全体表示（Contain）'] },
      { title: 'メタデータ＆ファイル名ラベル', items: ['カメラ本来のファイル名をそのまま表示', '動的EXIFバッジ（{camera}, {fstop}, {iso}など）', 'ゼロ埋め連番インデックス表示', '独自ロゴや透かし（ウォーターマーク）の挿入'] }
    ],
    reviewHeading: '統合された選別（カーリング）ツールバー',
    reviewP1: '何百枚もの撮影データを迅速に精査するには効率的な操作が欠かせません。専用のステータスボタンとキーボードショートカットで瞬時に選別できます。',
    reviewP2: '選別結果はエクスポート機能と連動しており、「採用（Keep）」の写真だけをLightroom検索用テキストやXMPファイルとして書き出すことができます。',
    shortcutsHeading: '作業を加速するショートカットキー',
    shortcuts: [
      { keys: '1 / K', action: '選択中の写真を「採用（Keep / 1）」に設定' },
      { keys: '2 / F', action: '選択中の写真を「保留（Flag / 2）」に設定' },
      { keys: '3 / R', action: '選択中の写真を「不採用（Reject / 3）」に設定' },
      { keys: '0 / U', action: 'ステータス・評価の解除' },
      { keys: '← / →', action: '前後の写真へ移動' },
      { keys: 'Space', action: '原寸ズーム拡大ライトボックスを開く' }
    ],
    exportsHeading: 'プロ仕様の多様なエクスポート形式',
    exportsLead: '印刷、納品、後工程の編集ソフト連携に対応した6種類のエクスポート形式を用意しています。',
    exports: [
      { name: '複数ページPDF', body: '余白や解像度が印刷用に最適化された300 DPIベクターPDF文書。' },
      { name: '高解像度PNG', body: '現在表示中のページの劣化なしフル解像度画像。' },
      { name: '軽量JPEG', body: 'メール添付やメッセージ送信用に最適化された軽量画像。' },
      { name: 'CSVマニフェスト', body: 'ファイル名、選別ステータス、EXIF設定を含む表計算用データ。' },
      { name: 'Lightroom検索クエリ', body: 'Lightroomのライブラリフィルターにそのまま貼れるカンマ区切りテキスト。' },
      { name: 'プロジェクトJSON', body: '作業状態を保存し、後からいつでも再開できるセッションファイル。' }
    ],
    faqsHeading: 'スタジオに関するよくある質問',
    faqs: [
      { question: 'トップページのツールとの違いは何ですか？', answer: 'スタジオは全画面表示に対応し、最大600%の拡大ズーム、キーボードショートカット選別、詳細なEXIF解析機能を備えています。' },
      { question: '写真データが外部に送信されることはありますか？', answer: 'いいえ。すべての画像処理とPDF生成はお使いのブラウザ内部のローカルメモリでのみ動作します。' },
      { question: '自由な用紙寸法で出力できますか？', answer: 'はい。40mmから1200mmまでミリ単位で自由なサイズを指定して出力できます。' },
      { question: '対応している画像フォーマットは？', answer: 'JPEG、PNG、WebP、AVIF、GIF、BMP、および主要カメラのRAW画像プレビューに対応しています。' }
    ],
    relatedHeading: '関連ツール＆リソース',
    relatedLinks: [
      { name: '写真コンタクトシート作成', url: '/photo-contact-sheet-maker' },
      { name: 'コンタクトシートテンプレート', url: '/contact-sheet-template' },
      { name: 'コンタクトシートの作り方完全ガイド', url: '/guides/how-to-make-a-contact-sheet' },
      { name: 'ファイル名付きプルーフシート作成', url: '/guides/photo-proof-sheet-with-filenames' },
      { name: 'Photoshop代替ツール比較', url: '/compare/photoshop-contact-sheet-alternative' },
      { name: '写真コラージュ作成ツール', url: '/photo-collage-maker' }
    ]
  },
  pt: {
    title: 'Estúdio de folhas de contato em tela cheia — Make Contact Sheet',
    description: 'Estúdio profissional de provas fotográficas. Configure grades, metadados EXIF e exporte PDFs a 300 DPI. 100% privado no navegador.',
    heading: 'Estúdio Profissional de Folhas de Contato no Navegador',
    lead1: 'Um ambiente dedicado em tela cheia para produzir folhas de contato calibradas para impressão, pacotes de provas para clientes e arquivos fotográficos.',
    lead2: 'Cada etapa roda na memória do navegador sem requisições de rede. Suas fotos nunca saem do seu computador.',
    breadcrumbName: 'Estúdio de folhas de contato',
    stepsHeading: 'Como funciona o Estúdio de Folhas de Contato',
    steps: [
      { n: '01', title: 'Carregue suas fotos', body: 'Arraste pastas ou arquivos RAW da câmera. Decodificação 100% local.' },
      { n: '02', title: 'Configure papel e grade', body: 'Escolha formatos padrão (A4, Carta, 8x10) ou medidas em milímetros com 1 a 12 colunas.' },
      { n: '03', title: 'Avalie com atalhos de teclado', body: 'Marque como Manter (1), Analisar (2) ou Descartar (3) em tempo real.' },
      { n: '04', title: 'Exporte para impressão', body: 'Baixe PDFs a 300 DPI, PNGs, planilhas CSV ou arquivos XMP da Adobe.' }
    ],
    settingsHeading: 'Recursos de configuração do estúdio',
    settingsLead: 'Ajuste cada detalhe com atualização instantânea na mesa de luz.',
    settingGroups: [
      { title: 'Formatos de papel e tela', items: ['A4 retrato e paisagem (210 × 297 mm)', 'Carta US (8,5 × 11 pol.)', 'Impressão de fotos 8 × 10 pol.', 'Widescreen 16:9 e Quadrado 1:1', 'Dimensões em milímetros (40 a 1200 mm)'] },
      { title: 'Geometria de grade e margens', items: ['De 1 a 12 colunas e linhas', 'Margens e espaçamentos reguláveis', 'Divisão automática em múltiplas páginas', 'Ajuste: Preencher vs Conter'] },
      { title: 'Metadados e legendas de arquivo', items: ['Preservação dos nomes originais da câmera', 'Badges dinâmicos EXIF ({camera}, {fstop}, {iso})', 'Contadores sequenciais com zeros à esquerda', 'Logotipo do estúdio como marca d\'água'] }
    ],
    reviewHeading: 'Barra de revisão e seleção integrada',
    reviewP1: 'Avaliar centenas de imagens requer agilidade. A barra do estúdio oferece atalhos rápidos de teclado para classificar suas fotos sem mudar de aplicativo.',
    reviewP2: 'As escolhas são sincronizadas para exportação direta em listas do Lightroom ou arquivos XMP.',
    shortcutsHeading: 'Atalhos de teclado para produtividade',
    shortcuts: [
      { keys: '1 / K', action: 'Marcar como Manter (Keep / 1)' },
      { keys: '2 / F', action: 'Marcar como Analisar (Flag / 2)' },
      { keys: '3 / R', action: 'Marcar como Descartar (Reject / 3)' },
      { keys: '0 / U', action: 'Limpar classificação' },
      { keys: '← / →', action: 'Foto anterior / próxima' },
      { keys: 'Espaço', action: 'Abrir ampliação em alta resolução' }
    ],
    exportsHeading: 'Formatos profissionais de exportação',
    exportsLead: 'Seis opções versáteis para entrega ao cliente e integração com softwares de edição.',
    exports: [
      { name: 'PDF multipágina', body: 'Documento vetorial a 300 DPI calibrado para impressão.' },
      { name: 'PNG de alta resolução', body: 'Imagem sem perdas da página selecionada.' },
      { name: 'JPEG comprimido', body: 'Arquivo leve para envio rápido por e-mail.' },
      { name: 'Planilha CSV', body: 'Tabela estruturada com nomes, notas e parâmetros EXIF.' },
      { name: 'Consulta para o Lightroom', body: 'Nomes separados por vírgula para filtro de biblioteca.' },
      { name: 'JSON do projeto', body: 'Arquivo de sessão para arquivar e continuar depois.' }
    ],
    faqsHeading: 'Perguntas frequentes sobre o estúdio',
    faqs: [
      { question: 'Qual a diferença entre este estúdio e a ferramenta da página inicial?', answer: 'O estúdio aproveita a tela inteira e oferece zoom de até 600% para análise minuciosa de cada detalhe.' },
      { question: 'Minhas fotos são enviadas para algum lugar?', answer: 'Não, todo o processo ocorre localmente no seu computador.' },
      { question: 'Posso imprimir em tamanhos personalizados?', answer: 'Sim, você pode definir as dimensões exatas em milímetros (de 40 a 1200 mm).' },
      { question: 'Quais tipos de arquivo são suportados?', answer: 'JPEG, PNG, WebP, AVIF, GIF, BMP e prévias de arquivos RAW.' }
    ],
    relatedHeading: 'Páginas relacionadas',
    relatedLinks: [
      { name: 'Criador de folhas de contato', url: '/photo-contact-sheet-maker' },
      { name: 'Modelos de folha de contato', url: '/contact-sheet-template' },
      { name: 'Como fazer folha de contato', url: '/guides/how-to-make-a-contact-sheet' },
      { name: 'Folhas de prova com nomes de arquivos', url: '/guides/photo-proof-sheet-with-filenames' },
      { name: 'Alternativa ao Photoshop', url: '/compare/photoshop-contact-sheet-alternative' },
      { name: 'Criador de colagens de fotos', url: '/photo-collage-maker' }
    ]
  }
};

// -------------------------------------------------------------
// UNIFIED AGGREGATOR OBJECT
// -------------------------------------------------------------
export const TOOLS_DATA = {
  'photo-contact-sheet-maker': CONTACT_SHEET_DATA,
  'photo-collage-maker': COLLAGE_DATA,
  'mood-board-maker': MOODBOARD_DATA,
  'batch-photo-tools': BATCH_TOOLS_DATA,
  'free-8x10-photo-prints': FREE_8X10_DATA,
  'large-photo-prints': LARGE_PRINTS_DATA,
  'auto-cull-photos': AUTO_CULL_DATA,
  'white-label-client-gallery': WHITE_LABEL_DATA,
  'bulk-resize-photos-to-16-9': BULK_RESIZE_DATA,
  'compress-photos-for-web': COMPRESS_DATA,
  'studio/contact-sheet': STUDIO_CONTACT_SHEET_DATA,
};


