import type { Locale } from '../config';

export interface HomeLocalizedSection {
  title: string;
  description: string;
  workspaceBadge: string;
  workspaceHeading: string;
  workspaceLead: string;
  moodboardBadge: string;
  moodboardHeading: string;
  moodboardLead: string;
  proseBadge: string;
  proseHeading: string;
  proseP1: string;
  proseH3_1: string;
  proseP2: string;
  proseH3_2: string;
  proseP3: string;
  proseH3_3: string;
  proseP4: string;
  proseH3_4: string;
  proseP5: string;
  proseH3_5: string;
  proseP6: string;
  sidebarHeading: string;
  sidebarSteps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const HOME_LOCALIZED_DATA: Record<Locale, HomeLocalizedSection> = {
  "es": {
    "title": "Creador de hojas de contactos — Hojas de pruebas fotográficas gratuitas",
    "description": "Crea hojas de contactos, collages de fotos y mood boards gratis en tu navegador. Conserva nombres de archivo, revisa selecciones y exporta PDF a 300 DPI.",
    "workspaceBadge": "INSTRUMENTO DE TRABAJO EN VIVO",
    "workspaceHeading": "Motor instantáneo de pruebas fotográficas y maquetación",
    "workspaceLead": "Arrastra y suelta tus fotos directamente en el navegador para montar hojas de contactos, collages y paquetes de pruebas sin demoras de carga.",
    "moodboardBadge": "DIRECCIÓN VISUAL LIBRE",
    "moodboardHeading": "Crea mood boards estéticos y lookbooks",
    "moodboardLead": "Organiza fotos de inspiración en un lienzo libre con guías de ajuste magnético, paletas de diseñador y directivas en notas adhesivas.",
    "proseBadge": "DESCRIPCIÓN COMPLETA",
    "proseHeading": "Un creador de hojas de contactos en el navegador creado para flujos fotográficos",
    "proseP1": "Make Contact Sheet es un espacio de trabajo fotográfico dedicado a optimizar la forma en que fotógrafos, directores de arte y estudios compilan, evalúan y entregan colecciones visuales de imágenes. Al ejecutarse íntegramente en los navegadores web modernos, la plataforma elimina configuraciones pesadas de software y colas de carga a la nube, convirtiendo carpetas de imágenes sin procesar en hojas de prueba estructuradas, mood boards y collages en cuestión de segundos.",
    "proseH3_1": "Comprendiendo las hojas de contactos y las pruebas digitales",
    "proseP2": "En la fotografía tradicional de cuarto oscuro, se creaba una hoja de contactos colocando tiras de negativos directamente sobre papel fotográfico y exponiéndolas a la luz. Esto producía un índice exacto 1:1 de un carrete completo en una sola copia en papel. En la producción digital moderna, las hojas de prueba cumplen el mismo propósito fundamental: proporcionar una visión general rápida y de alta densidad de una sesión. En lugar de obligar a clientes o colaboradores a abrir cientos de archivos de alta resolución individualmente, una sola hoja de prueba digital organiza las tomas en una cuadrícula estructurada con identificadores de cámara originales y parámetros técnicos para una comparación precisa.",
    "proseH3_2": "Revisión estructurada, selección personalizada y metadatos exactos",
    "proseP3": "La revisión de grandes lotes de fotos requiere una respuesta visual clara. Make Contact Sheet incorpora atajos rápidos de teclado que permiten marcar fotogramas como Conservar (1), Destacar (2) o Descartar (3) mientras inspeccionas miniaturas. Debido a que la comunicación precisa depende de referencias exactas, el motor extrae metadatos EXIF directamente de tus archivos (velocidad de obturación, apertura, ISO, distancia focal y nombres exactos de cámara).",
    "proseH3_3": "Formatos de exportación flexibles: de PDF para impresión a sincronización con Lightroom",
    "proseP4": "Una vez configurada la cuadrícula, el motor de exportación genera entregables calibrados: documentos PDF de varias páginas a 300 DPI (A4 y Carta), imágenes compuestas JPEG/PNG/WebP de hasta 4K, listas de selección filtradas para Lightroom y Capture One, y archivos XMP sidecar estándar que aplican valoraciones de estrellas directamente a tus archivos RAW originales.",
    "proseH3_4": "Mood boards libres y dirección visual creativa",
    "proseP5": "Cuando un proyecto requiere planificación conceptual en lugar de una cuadrícula rígida, nuestro creador de mood boards ofrece un lienzo libre sin restricciones. Puedes arrastrar, rotar y superponer fotos junto con tarjetas de muestras de color y notas adhesivas con ajuste magnético y exportación a 300 DPI.",
    "proseH3_5": "Ejecución en el navegador y privacidad estricta del cliente",
    "proseP6": "Todo el procesamiento de imágenes, decodificación EXIF y generación de PDF se ejecuta localmente en el hardware de tu dispositivo utilizando Canvas HTML5 y Web Workers. Tus fotos y datos confidenciales nunca se cargan en servidores externos.",
    "sidebarHeading": "Cuatro pasos para la entrega al cliente",
    "sidebarSteps": [
      {
        "title": "Importar fotos",
        "desc": "Suelta lotes de imágenes en la mesa de luz con compatibilidad para formatos estándar y previsualizaciones RAW."
      },
      {
        "title": "Seleccionar y descartar",
        "desc": "Usa las teclas 1–3 para etiquetar selecciones o usa el descarte automático por nitidez."
      },
      {
        "title": "Formatear diseño",
        "desc": "Elige una plantilla de hoja de contactos, ahorro 8×10 o mood board libre."
      },
      {
        "title": "Exportar y entregar",
        "desc": "Genera archivos PDF a 300 DPI, portales HTML para clientes o archivos XMP para Lightroom."
      }
    ],
    "faqs": [
      {
        "question": "¿Qué es una hoja de contactos?",
        "answer": "Una hoja de contactos (o de pruebas) es una cuadrícula de imágenes en miniatura utilizada por fotógrafos para previsualizar, catalogar y seleccionar fotos de una sesión. Muestra números de fotograma, nombres de archivo y metadatos técnicos para facilitar la edición."
      },
      {
        "question": "¿Cómo hago una hoja de contactos online?",
        "answer": "Arrastra y suelta tu carpeta de imágenes en el estudio de Make Contact Sheet, configura columnas, filas, márgenes y etiquetas de archivo, y haz clic en Exportar para descargar un PDF o PNG a 300 DPI listo para imprimir."
      },
      {
        "question": "¿Puedo hacer una hoja de contactos sin Photoshop ni Lightroom?",
        "answer": "Sí. Make Contact Sheet se ejecuta directamente en el navegador sin suscripciones a Creative Cloud ni descargas de software pesado."
      },
      {
        "question": "¿Se pueden crear hojas de contactos sin cuenta?",
        "answer": "Sí. Es completamente gratuito y no requiere registro, inicio de sesión ni recopilación de datos personales."
      },
      {
        "question": "¿Aparecen los nombres de archivo originales de la cámara?",
        "answer": "Sí. Conserva nombres originales como DSC_8941.NEF o _MG_1024.CR3 con estilos de pie de foto configurables."
      },
      {
        "question": "¿Cuántas fotos puedo incluir en una sola hoja?",
        "answer": "Puedes organizar desde decenas hasta cientos de fotos en documentos de una o varias páginas con paginación automática."
      },
      {
        "question": "¿Qué formatos de exportación están disponibles?",
        "answer": "Puedes exportar archivos PDF de alta resolución a 300 DPI, imágenes PNG/JPEG compuestas, listas CSV y archivos XMP para Adobe Lightroom Classic."
      },
      {
        "question": "¿Qué formatos de archivo de imagen son compatibles?",
        "answer": "Es compatible con JPEG, PNG, WebP, AVIF, GIF, BMP y formatos RAW de cámaras (Canon CR2/CR3, Nikon NEF, Sony ARW, Fuji RAF)."
      },
      {
        "question": "¿Cómo funciona la exportación de selecciones de clientes?",
        "answer": "Puedes revisar fotos con atajos de teclado (1 Mantener, 2 Destacar, 3 Descartar) y copiar la lista filtrada directamente a Lightroom o Capture One."
      },
      {
        "question": "¿Se suben mis fotos a un servidor en la nube?",
        "answer": "No. Toda la decodificación y renderizado ocurre en la memoria local de tu navegador sin transmitir datos al exterior."
      }
    ]
  },
  "de": {
    "title": "Kontaktabzug-Generator — Kostenlose Foto-Proofbögen online",
    "description": "Erstellen Sie Kontaktabzüge, Fotocollagen und Moodboards kostenlos im Browser. Dateinamen behalten, Auswahl treffen und druckfertige 300 DPI PDFs exportieren.",
    "workspaceBadge": "LIVE-ARBEITSBEREICH",
    "workspaceHeading": "Sofortige Fotoprüfung & Layout-Engine",
    "workspaceLead": "Ziehen Sie Fotos per Drag & Drop direkt in den Browser, um Kontaktabzüge, Collagen und Auswahlpakete ohne Upload-Wartezeiten zu erstellen.",
    "moodboardBadge": "FREIE VISUELLE GESTALTUNG",
    "moodboardHeading": "Ästhetische Moodboards & Lookbooks kuratieren",
    "moodboardLead": "Ordnen Sie Inspirationsfotos auf einer freien Arbeitsfläche mit magnetischen Hilfslinien, Farbpaletten und Notizen an.",
    "proseBadge": "GESAMTÜBERSICHT",
    "proseHeading": "Ein browserbasierter Kontaktabzug-Generator für professionelle Fotografie",
    "proseP1": "Make Contact Sheet ist ein spezialisierter Arbeitsbereich für fotografische Arbeitsabläufe. Entwickelt für Fotografen, Art Direktoren und Studios, verwandelt die Plattform Bildordner in Sekundenschnelle in strukturierte Kontaktabzüge, Moodboards und Collagen – ganz ohne Softwareinstallation oder Cloud-Warteschlangen.",
    "proseH3_1": "Kontaktabzüge und digitales Proofing verstehen",
    "proseP2": "In der traditionellen Dunkelkammer entstand ein Kontaktabzug, indem Filmstreifen direkt auf Fotopapier gelegt und belichtet wurden. In der modernen Digitalfotografie erfüllt der Kontaktabzug denselben Zweck: einen schnellen, hochauflösenden Gesamtüberblick über ein Shooting zu bieten, um Schärfe, Belichtung und Ausdruck präzise zu vergleichen.",
    "proseH3_2": "Strukturierte Auswahl, Culling und exakte EXIF-Metadaten",
    "proseP3": "Große Bildmengen erfordern schnelles Feedback. Make Contact Sheet bietet Tastatur-Shortcuts (1 für Behalten, 2 für Markieren, 3 für Verwerfen) und liest EXIF-Daten (Blende, Belichtungszeit, ISO, Brennweite und Originaldateinamen) direkt aus.",
    "proseH3_3": "Flexible Ausgabe: Von 300 DPI Druck-PDFs bis zum Lightroom-Sync",
    "proseP4": "Exportieren Sie mehrseitige PDFs mit 300 DPI für A4 und US Letter, 4K-Masterbilder, CSV-Auswahllisten oder standardisierte Adobe XMP Sidecars zur direkten Bewertung in Lightroom Classic und Capture One.",
    "proseH3_4": "Freie Moodboards und kreative Bildregie",
    "proseP5": "Für konzeptionelle Shootings bietet der integrierte Moodboard-Maker eine freie Arbeitsfläche mit magnetischen Hilfslinien, Farbfeldern mit Hex-Codes und Notizzetteln.",
    "proseH3_5": "Browserbasierte Ausführung und garantierte Privatsphäre",
    "proseP6": "Alle Bildverarbeitungen erfolgen lokal im Speicher Ihres Geräts über HTML5 Canvas und Web Worker. Keine Datei wird auf externe Server hochgeladen.",
    "sidebarHeading": "Vier Schritte zur Kundenübergabe",
    "sidebarSteps": [
      {
        "title": "Fotos importieren",
        "desc": "Bilder direkt in den Leuchttisch ziehen – inklusive RAW-Vorschauunterstützung."
      },
      {
        "title": "Auswählen & Sortieren",
        "desc": "Mit Tasten 1–3 schnell beurteilen oder Schärfe-KI nutzen."
      },
      {
        "title": "Layout festlegen",
        "desc": "Kontaktabzug-Vorlage, 8×10-Sparlayout oder Moodboard wählen."
      },
      {
        "title": "Exportieren & Übergeben",
        "desc": "300 DPI PDFs, Kundenportale oder XMP-Dateien exportieren."
      }
    ],
    "faqs": [
      {
        "question": "Was ist ein Kontaktabzug?",
        "answer": "Ein Kontaktabzug ist eine Rasteranordnung von Miniaturbildern, mit der Fotografen ein Shooting schnell sichten, katalogisieren und Kunden präsentieren können."
      },
      {
        "question": "Wie erstelle ich online einen Kontaktabzug?",
        "answer": "Ziehen Sie Ihren Bildordner in Make Contact Sheet, stellen Sie Spalten, Zeilen und Beschriftungen ein und exportieren Sie druckfertige 300 DPI PDFs."
      },
      {
        "question": "Kann ich Kontaktabzüge ohne Photoshop oder Lightroom erstellen?",
        "answer": "Ja. Make Contact Sheet läuft vollständig im Browser ohne Adobe-Abo oder Softwareinstallation."
      },
      {
        "question": "Muss ich ein Benutzerkonto erstellen?",
        "answer": "Nein. Das Tool ist 100% kostenlos ohne Anmeldung oder Datenerfassung nutzbar."
      },
      {
        "question": "Werden die Original-Dateinamen der Kamera angezeigt?",
        "answer": "Ja. Originaldateinamen wie DSC_8941.NEF oder _MG_1024.CR3 bleiben vollständig erhalten."
      },
      {
        "question": "Wie viele Fotos passen auf einen Kontaktabzug?",
        "answer": "Sie können Dutzende bis Hunderte von Fotos über mehrseitige Dokumente mit automatischer Paginierung anordnen."
      },
      {
        "question": "Welche Exportformate werden unterstützt?",
        "answer": "300 DPI PDFs (A4/Letter), PNG/JPEG-Bilder, CSV-Listen und Adobe XMP Sidecars."
      },
      {
        "question": "Welche Bildformate werden akzeptiert?",
        "answer": "JPEG, PNG, WebP, AVIF, GIF, BMP sowie gängige RAW-Formate (Canon, Nikon, Sony, Fuji)."
      },
      {
        "question": "Wie funktioniert der Kundenauswahl-Export?",
        "answer": "Bewerten Sie Fotos mit den Tasten 1–3 und kopieren Sie gefilterte Dateinamenlisten direkt in Lightroom oder Capture One."
      },
      {
        "question": "Werden meine Fotos auf Server hochgeladen?",
        "answer": "Nein. Alle Berechnungen laufen 100% lokal in Ihrem Browser ab."
      }
    ]
  },
  "fr": {
    "title": "Créateur de planches contact — Épreuves photo gratuites en ligne",
    "description": "Créez des planches contact, collages et mood boards gratuitement dans votre navigateur. Conservez les noms de fichiers et exportez en PDF 300 DPI.",
    "workspaceBadge": "ESPACE DE TRAVAIL EN DIRECT",
    "workspaceHeading": "Moteur instantané d'épreuves photo et de mise en page",
    "workspaceLead": "Glissez-déposez vos photos directement dans le navigateur pour assembler planches contact et sélections sans aucun délai de téléversement.",
    "moodboardBadge": "DIRECTION VISUELLE LIBRE",
    "moodboardHeading": "Composez des mood boards esthétiques et des lookbooks",
    "moodboardLead": "Disposez vos photos d'inspiration sur une toile libre avec repères magnétiques, nuanciers de couleurs et notes de direction.",
    "proseBadge": "VUE D'ENSEMBLE COMPLÈTE",
    "proseHeading": "Un générateur de planches contact conçu pour les flux de travail des photographes",
    "proseP1": "Make Contact Sheet est un espace de travail dédié à la simplification des flux de travail photographiques. Conçu pour les photographes et directeurs artistiques, il transforme des dossiers d'images brutes en planches contact structurées en quelques secondes sans installer de logiciel.",
    "proseH3_1": "Comprendre les planches contact et l'épreuvage numérique",
    "proseP2": "En chambre noire argentique, la planche contact était créée en appliquant les négatifs sur le papier photo. En numérique, elle offre une vue d'ensemble rapide et haute densité d'une séance pour comparer netteté, cadrage et expressions.",
    "proseH3_2": "Sélection structurée, tri rapide et métadonnées EXIF",
    "proseP3": "Gagnez du temps grâce aux raccourcis clavier (1 Conserver, 2 Marquer, 3 Rejeter) et à l'extraction automatique des paramètres EXIF (vitesse, ouverture, ISO, focale et noms de fichiers natifs).",
    "proseH3_3": "Formats d'export polyvalents : du PDF haute résolution à Lightroom",
    "proseP4": "Exportez des PDF multipages 300 DPI (A4 et US Letter), des composites 4K, des listes CSV ou des fichiers annexes Adobe XMP appliquant directement les étoiles dans Lightroom Classic.",
    "proseH3_4": "Mood boards libres et direction artistique",
    "proseP5": "Notre créateur de mood boards offre une toile libre avec alignement magnétique, palettes de couleurs avec codes hexadécimaux et notes stylistes.",
    "proseH3_5": "Traitement local dans le navigateur et confidentialité absolue",
    "proseP6": "Tout s'exécute dans la mémoire locale de votre appareil via Canvas HTML5 et Web Workers. Vos clichés confidentiels ne sont jamais téléversés.",
    "sidebarHeading": "Quatre étapes pour livrer vos sélections",
    "sidebarSteps": [
      {
        "title": "Importer vos images",
        "desc": "Déposez vos dossiers d'images avec prise en charge des aperçus RAW."
      },
      {
        "title": "Trier et sélectionner",
        "desc": "Utilisez les touches 1 à 3 ou l'évaluation automatique de netteté."
      },
      {
        "title": "Mettre en page",
        "desc": "Choisissez une grille de planche contact, un format 8×10 ou un mood board."
      },
      {
        "title": "Exporter et livrer",
        "desc": "Générez des PDF 300 DPI, des portails HTML ou des fichiers XMP."
      }
    ],
    "faqs": [
      {
        "question": "Qu'est-ce qu'une planche contact ?",
        "answer": "Une planche contact est une grille de vignettes permettant aux photographes de prévisualiser, numéroter et sélectionner les photos d'une séance."
      },
      {
        "question": "Comment créer une planche contact en ligne ?",
        "answer": "Déposez vos photos dans Make Contact Sheet, réglez les lignes, colonnes et marges, puis exportez votre PDF ou image 300 DPI."
      },
      {
        "question": "Peut-on créer une planche contact sans Photoshop ni Lightroom ?",
        "answer": "Oui, Make Contact Sheet s'exécute entièrement dans votre navigateur sans aucun abonnement Adobe."
      },
      {
        "question": "Faut-il créer un compte ?",
        "answer": "Non, l'outil est 100% gratuit et sans inscription ni collecte de données."
      },
      {
        "question": "Les noms de fichiers originaux sont-ils conservés ?",
        "answer": "Oui, les noms comme DSC_8941.NEF ou _MG_1024.CR3 sont parfaitement préservés sous chaque photo."
      },
      {
        "question": "Combien de photos peut-on mettre sur une planche ?",
        "answer": "De quelques dizaines à plusieurs centaines avec pagination automatique sur plusieurs feuilles."
      },
      {
        "question": "Quels sont les formats d'export disponibles ?",
        "answer": "PDF d'impression 300 DPI, images PNG/JPEG haute résolution, listes CSV et fichiers XMP Lightroom."
      },
      {
        "question": "Quels formats d'image sont acceptés ?",
        "answer": "JPEG, PNG, WebP, AVIF, GIF, BMP et formats RAW d'appareils photo majeurs."
      },
      {
        "question": "Comment fonctionne l'export des sélections client ?",
        "answer": "Attribuez des statuts aux images et collez directement la liste de noms filtrée dans Lightroom ou Capture One."
      },
      {
        "question": "Mes photos sont-elles envoyées sur un serveur ?",
        "answer": "Non, tout est traité localement dans la mémoire de votre navigateur."
      }
    ]
  },
  "ja": {
    "title": "コンタクトシート作成 — 無料写真プルーフシートジェネレーター",
    "description": "ブラウザ上でコンタクトシート、フォトコラージュ、ムードボードを無料作成。元ファイル名を保持し、300 DPI高解像度印刷PDFを出力。",
    "workspaceBadge": "ライブ・ワークスペース",
    "workspaceHeading": "即時写真校正 & レイアウトエンジン",
    "workspaceLead": "ブラウザに写真をドラッグ＆ドロップするだけで、サーバーへのアップロード待機時間なしにコンタクトシートや校正パッケージを作成。",
    "moodboardBadge": "自由なビジュアルディレクション",
    "moodboardHeading": "洗練されたムードボード & ルックブックの作成",
    "moodboardLead": "マグネット吸着ガイド、デザイナー厳選カラーパレット、スタイリストメモを備えた自由配置キャンバスでインスピレーションを具現化。",
    "proseBadge": "包括的概要とワークフロー",
    "proseHeading": "写真家のワークフローのために構築されたブラウザ完結型コンタクトシート作成ツール",
    "proseP1": "Make Contact Sheetは、プロフォトグラファー、アートディレクター、撮影スタジオの選別・納品フローを劇的に効率化するワークスペースです。重いソフトウェアの起動やクラウドへのアップロードを一切排除し、撮影フォルダから瞬時に美しいプルーフシートを生成します。",
    "proseH3_1": "コンタクトシート（ベタ焼き）とデジタル校正の意義",
    "proseP2": "フィルム時代の暗室で印画紙の上にネガを密着させて露光した「コンタクトシート（ベタ焼き）」は、撮影ロール全体を一覧できる絶対的な指標でした。デジタル制作においても、クライアントに大量のファイルを個別に開かせることなく、1枚のシート上でピントや表情、露出の均一性を比較するために不可欠です。",
    "proseH3_2": "構造化された選別、カリング、正確なEXIFメタデータ",
    "proseP3": "キーボードショートカット（1=キープ、2=フラグ、3=リジェクト）で高速選別が可能。シャッタースピード、絞り値、ISO感度、焦点距離、カメラ元のファイル名（Canon CR2/CR3, Nikon NEF, Sony ARW, Fuji RAF等）を正確に印字できます。",
    "proseH3_3": "柔軟な出力形式：印刷用300 DPI PDFからLightroom連携まで",
    "proseP4": "A4およびUSレター規格の300 DPI印刷用PDF、最大4Kのマスター画像、CSVリスト、Lightroom Classicに星評価とカラーラベルを自動反映する標準Adobe XMPサイドカー出力に対応。",
    "proseH3_4": "自由配置ムードボードとビジュアル演出",
    "proseP5": "厳密なグリッドだけでなく、撮影コンセプトやスタイリング指示をまとめるムードボード機能も搭載。写真、カラー見本、付箋メモを自由に配置できます。",
    "proseH3_5": "完全ブラウザ内実行と徹底したデータプライバシー",
    "proseP6": "画像デコードやPDF生成はHTML5 CanvasとWeb Workersを用い、すべて端末のローカルメモリ内で完結。機密写真や未公開素材が外部サーバーに送信されることは一切ありません。",
    "sidebarHeading": "クライアント納品までの4ステップ",
    "sidebarSteps": [
      {
        "title": "写真の取り込み",
        "desc": "RAWプレビュー対応で撮影フォルダをライトテーブルに直接投入。"
      },
      {
        "title": "選別 & カリング",
        "desc": "1〜3キーで採用・不採用を瞬時にタグ付け、AI鮮鋭度判定も活用。"
      },
      {
        "title": "レイアウト設定",
        "desc": "A4・USレター・8×10またはムードボード形式を選択。"
      },
      {
        "title": "出力 & 納品",
        "desc": "300 DPI PDF、校正用HTML、またはLightroom用XMPを出力。"
      }
    ],
    "faqs": [
      {
        "question": "コンタクトシート（ベタ焼き）とは何ですか？",
        "answer": "撮影した複数の写真画像を一覧できるサムネイルグリッドシートです。コマ番号やカメラファイル名が明記され、写真の選別やアーカイブに重宝されます。"
      },
      {
        "question": "オンラインでコンタクトシートを作成するには？",
        "answer": "写真をMake Contact Sheetにドラッグ＆ドロップし、列数や行数、ファイル名ラベルを設定して、300 DPIのPDFやPNGを書き出すだけです。"
      },
      {
        "question": "PhotoshopやLightroomがなくても作成できますか？",
        "answer": "はい。Adobeのサブスクリプションやソフトのインストール不要で、Webブラウザのみで完全動作します。"
      },
      {
        "question": "アカウント登録やログインは必要ですか？",
        "answer": "いいえ。アカウント作成は一切不要で、誰でも完全無料で即座に利用できます。"
      },
      {
        "question": "カメラ元のファイル名は保持されますか？",
        "answer": "はい。DSC_8941.NEFや_MG_1024.CR3などの元ファイル名がサムネイル下に正確に印字されます。"
      },
      {
        "question": "1つのシートに何枚の写真を配置できますか？",
        "answer": "端末のメモリが許す限り、数十枚から数百枚の写真を自動改ページで複数枚のシートにレイアウトできます。"
      },
      {
        "question": "対応している出力フォーマットは何ですか？",
        "answer": "300 DPIの高解像度PDF（A4/レター）、PNG/JPEG画像、CSVマニフェスト、Lightroom用XMPサイドカーに対応しています。"
      },
      {
        "question": "対応している画像形式は何ですか？",
        "answer": "JPEG、PNG、WebP、AVIF、GIF、BMPのほか、主要カメラのRAW画像プレビューに対応しています。"
      },
      {
        "question": "クライアント選別リストの書き出しはどう動作しますか？",
        "answer": "1〜3キーで選別後、書き出しパネルからファイル名リストをコピーしてLightroomやCapture Oneの検索欄に直接貼り付けられます。"
      },
      {
        "question": "写真はクラウドサーバーにアップロードされますか？",
        "answer": "いいえ。すべての画像処理はブラウザのローカルメモリ内で完結し、外部サーバーへの通信は行われません。"
      }
    ]
  },
  "pt": {
    "title": "Criador de folhas de contato — Folhas de prova fotográficas gratuitas",
    "description": "Crie folhas de contato, colagens e mood boards grátis no navegador. Mantenha nomes de arquivos e exporte PDFs em 300 DPI prontos para impressão.",
    "workspaceBadge": "INSTRUMENTO DE TRABALHO AO VIVO",
    "workspaceHeading": "Mecanismo instantâneo de prova fotográfica e layout",
    "workspaceLead": "Arraste e solte fotos diretamente no navegador para montar folhas de contato e seleções sem atrasos de upload.",
    "moodboardBadge": "DIREÇÃO VISUAL LIVRE",
    "moodboardHeading": "Crie mood boards estéticos e lookbooks",
    "moodboardLead": "Organize fotos de inspiração em uma tela livre com guias magnéticas de alinhamento, paletas de cores de designer e notas adesivas.",
    "proseBadge": "VISÃO GERAL COMPLETA",
    "proseHeading": "Um criador de folhas de contato no navegador feito para fluxos de fotografia",
    "proseP1": "Make Contact Sheet é um espaço de trabalho fotográfico projetado para otimizar como fotógrafos e estúdios compilam e entregam coleções de imagens. Operando inteiramente no navegador, elimina instalações pesadas e filas de upload na nuvem.",
    "proseH3_1": "Compreendendo folhas de contato e provas digitais",
    "proseP2": "Na fotografia analógica, a folha de contato era criada encostando tiras de filme no papel fotográfico. No fluxo digital, cumpre o mesmo objetivo: fornecer uma visão panorâmica e densa do ensaio para comparar nitidez, luz e expressões com precisão.",
    "proseH3_2": "Revisão estruturada, seleção ágil e metadados EXIF",
    "proseP3": "Avalie lotes de fotos usando atalhos de teclado rápidos (1 Manter, 2 Destacar, 3 Descartar) e extraia dados EXIF reais (velocidade, abertura, ISO, distância focal e nomes originais da câmera).",
    "proseH3_3": "Saídas flexíveis: de PDFs em 300 DPI à sincronização com Lightroom",
    "proseP4": "Exporte PDFs multipáginas em 300 DPI para A4 e Carta, imagens 4K, listas CSV filtradas ou arquivos sidecar XMP padrão para sincronização direta com Adobe Lightroom Classic.",
    "proseH3_4": "Mood boards livres e direção artística",
    "proseP5": "Para planejamento conceitual, nosso criador de mood boards oferece uma tela livre com guias magnéticas, paletas de cores com códigos hexadecimais e notas adesivas de styling.",
    "proseH3_5": "Execução local no navegador e privacidade garantida",
    "proseP6": "Todo o processamento roda localmente na memória do seu dispositivo via HTML5 Canvas e Web Workers. Seus arquivos confidenciais nunca são enviados a servidores.",
    "sidebarHeading": "Quatro etapas para entrega ao cliente",
    "sidebarSteps": [
      {
        "title": "Importar fotos",
        "desc": "Arraste pastas de fotos com suporte a formatos raster e prévias RAW."
      },
      {
        "title": "Fazer a triagem",
        "desc": "Use as teclas 1 a 3 ou a pontuação automática de nitidez."
      },
      {
        "title": "Formatar layout",
        "desc": "Escolha folha de contato, impressão 8×10 ou mood board."
      },
      {
        "title": "Exportar e entregar",
        "desc": "Gere PDFs em 300 DPI, portais HTML ou arquivos XMP."
      }
    ],
    "faqs": [
      {
        "question": "O que é uma folha de contato?",
        "answer": "Uma folha de contato é uma grade de miniaturas usada por fotógrafos para visualizar, catalogar e selecionar fotos de um ensaio."
      },
      {
        "question": "Como fazer uma folha de contato online?",
        "answer": "Arraste suas fotos para o Make Contact Sheet, ajuste colunas, margens e legendas, e exporte um PDF ou PNG em 300 DPI pronto para imprimir."
      },
      {
        "question": "Posso fazer uma folha de contato sem Photoshop ou Lightroom?",
        "answer": "Sim. O Make Contact Sheet roda diretamente no navegador sem assinaturas Adobe nem instalações de programas."
      },
      {
        "question": "É preciso criar uma conta?",
        "answer": "Não. É totalmente gratuito e não requer cadastro nem coleta de dados."
      },
      {
        "question": "Os nomes originais dos arquivos da câmera são mantidos?",
        "answer": "Sim. Nomes como DSC_8941.NEF ou _MG_1024.CR3 são preservados perfeitamente sob cada foto."
      },
      {
        "question": "Quantas fotos cabem em uma folha de contato?",
        "answer": "Você pode organizar dezenas a centenas de fotos com paginação automática em múltiplas folhas."
      },
      {
        "question": "Quais formatos de exportação estão disponíveis?",
        "answer": "PDFs em 300 DPI (A4/Carta), imagens PNG/JPEG, listas CSV e arquivos XMP para Lightroom."
      },
      {
        "question": "Quais formatos de imagem são aceitos?",
        "answer": "JPEG, PNG, WebP, AVIF, GIF, BMP e arquivos RAW das principais câmeras."
      },
      {
        "question": "Como funciona a exportação de seleções de clientes?",
        "answer": "Avalie as imagens com as teclas 1 a 3 e cole a lista de nomes filtrada diretamente no Lightroom ou Capture One."
      },
      {
        "question": "Minhas fotos são enviadas para um servidor?",
        "answer": "Não. Todo o processamento ocorre localmente na memória do seu navegador."
      }
    ]
  },
  "en": {
    "title": "Contact Sheet Maker — Free Online Photo Proof Sheets",
    "description": "Make contact sheets, photo collages, and mood boards free in your browser. Keep filenames, review selects, and export 300 DPI print-ready PDFs.",
    "workspaceBadge": "LIVE WORKSPACE INSTRUMENT",
    "workspaceHeading": "Instant Photo Proofing & Layout Engine",
    "workspaceLead": "Drop your photos directly into the browser to assemble contact sheets, collages, and proof packages with zero upload delay.",
    "moodboardBadge": "FREEFORM VISUAL DIRECTION",
    "moodboardHeading": "Curate Aesthetic Mood Boards & Lookbooks",
    "moodboardLead": "Arrange inspiration photos on a fluid freeform canvas with magnetic alignment guides, designer color palettes, and sticky note directives.",
    "proseBadge": "COMPLETE OVERVIEW",
    "proseHeading": "A Browser-First Contact Sheet Maker Built for Photography Workflows",
    "proseP1": "Make Contact Sheet is a dedicated photo workflow workspace designed to streamline how photographers, art directors, and studios compile, evaluate, and deliver visual image collections. Operating entirely within modern web browsers, the platform eliminates tedious software setups and expensive cloud upload queues, turning raw image folders into structured proof sheets, mood boards, and collages in seconds.",
    "proseH3_1": "Understanding Contact Sheets and Digital Proofing",
    "proseP2": "In traditional darkroom photography, a contact sheet was created by placing strips of film negatives directly against photographic paper and exposing them to light. This produced an exact 1:1 index of an entire camera roll on a single print. In modern digital production, contact sheets serve the same essential purpose: providing a scannable, high-density overview of a photoshoot.",
    "proseH3_2": "Structured Review, Custom Culling, and Exact Metadata",
    "proseP3": "Reviewing large batches of photos requires clear visual feedback. Make Contact Sheet incorporates rapid keyboard triage shortcuts, allowing you to mark individual frames as Keep (1), Flag (2), or Reject (3) while inspecting thumbnails. Technical EXIF parameters are extracted directly from local files.",
    "proseH3_3": "Flexible Output: From Print-Ready PDFs to Lightroom Sync",
    "proseP4": "Once your layout is configured, the export engine produces calibrated deliverables: 300 DPI print-ready PDFs (A4 and US Letter), up to 4K composite images, CSV selection manifests, and Adobe XMP sidecar XMLs that synchronize ratings into Lightroom Classic and Capture One.",
    "proseH3_4": "Freeform Mood Boards and Creative Visual Direction",
    "proseP5": "When a project calls for conceptual planning rather than a rigid grid, our integrated mood board maker provides an unconstrained freeform canvas with magnetic snapping guides and scaled 300 DPI exports.",
    "proseH3_5": "In-Browser Execution and Client-Side Data Privacy",
    "proseP6": "All image decoding, thumbnail generation, EXIF parsing, and rendering operations execute locally on your device hardware using HTML5 Canvas and client Web Workers. Your files are never uploaded to an external server.",
    "sidebarHeading": "Four Steps to Client Delivery",
    "sidebarSteps": [
      {
        "title": "Import Media",
        "desc": "Drop image batches into the light-table with support for standard raster formats and RAW previews."
      },
      {
        "title": "Cull & Review",
        "desc": "Use keyboard keys 1–3 to tag keeps and rejects, or use automated sharpness evaluation."
      },
      {
        "title": "Format Layout",
        "desc": "Choose a contact sheet template, 8×10 print saver, or freeform mood board layout."
      },
      {
        "title": "Export Handoff",
        "desc": "Generate 300 DPI PDFs, client review HTML portals, CSV manifests, and Adobe XMP rating sidecars."
      }
    ],
    "faqs": [
      {
        "question": "What is a contact sheet?",
        "answer": "A contact sheet is a grid layout of thumbnail images used by photographers to quickly preview, catalog, and select photographs from a shoot."
      },
      {
        "question": "How do I make a contact sheet online?",
        "answer": "Drag and drop your image folder into Make Contact Sheet, configure columns and rows, and click Export for 300 DPI print-ready PDF."
      },
      {
        "question": "Can I make a contact sheet without Photoshop or Lightroom?",
        "answer": "Yes. Make Contact Sheet runs directly in your web browser with no Adobe Creative Cloud subscription required."
      },
      {
        "question": "Can I create a contact sheet without an account?",
        "answer": "Yes. Completely free to use with no account registration or personal information collection."
      },
      {
        "question": "Can I show original camera filenames on the contact sheet?",
        "answer": "Yes. Preserves original camera filenames with configurable caption styles."
      },
      {
        "question": "How many photos can I put on one contact sheet?",
        "answer": "Arrange dozens to hundreds across single or multi-page documents with automatic pagination."
      },
      {
        "question": "What export formats are available for contact sheets?",
        "answer": "300 DPI PDFs (A4/Letter), PNG/JPEG images, CSV manifests, and Adobe XMP sidecar XMLs."
      },
      {
        "question": "Which image file formats are supported?",
        "answer": "Standard formats (JPEG, PNG, WebP, AVIF, GIF, BMP) and camera RAW previews."
      },
      {
        "question": "How do client photo proofing and selection exports work?",
        "answer": "Review with keys 1–3 and export filtered selection lists for Lightroom or Capture One."
      },
      {
        "question": "Are my photos uploaded to a cloud server?",
        "answer": "No. All processing runs locally in your browser memory."
      }
    ]
  }
};
