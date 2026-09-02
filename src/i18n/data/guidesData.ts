import type { Locale } from '../config';

export interface GuideStep {
  name: string;
  text: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideCta {
  badge: string;
  title: string;
  text: string;
  btnPrimary: string;
  btnSecondary: string;
}

export interface GuideBreadcrumbs {
  home: string;
  guides?: string;
  current: string;
}

export interface LightroomWorkflowData {
  title: string;
  description: string;
  h1: string;
  lead: string;
  howItWorksHeading: string;
  steps: GuideStep[];
  faqHeading: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface ContactSheetGuideData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  historyHeading: string;
  historyP1: string;
  historyP2: string;
  historyP3: string;
  dpiHeading: string;
  dpiP1: string;
  table1Headers: { format: string; size: string; canvas: string; grid: string };
  table1Rows: Array<{ format: string; size: string; canvas: string; grid: string }>;
  dpiP2: string;
  compareHeading: string;
  compareIntro: string;
  table2Headers: { criteria: string; tool: string; lightroom: string; photoshop: string };
  table2Rows: Array<{ criteria: string; tool: string; lightroom: string; photoshop: string }>;
  psychologyHeading: string;
  psychologyP1: string;
  psychologyP2: string;
  psychologyBullets: Array<{ label: string; text: string }>;
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface MoodBoardGuideData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  strategyHeading: string;
  strategyP1: string;
  strategyP2: string;
  strategyBullets: Array<{ label: string; text: string }>;
  elementsHeading: string;
  elementsIntro: string;
  elements: Array<{ tag: string; title: string; text: string }>;
  aspectRatioHeading: string;
  aspectRatioIntro: string;
  tableHeaders: { ratio: string; target: string; dimensions: string; useCase: string };
  tableRows: Array<{ ratio: string; target: string; dimensions: string; useCase: string }>;
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface PhotoCollageGuideData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  h1Post: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  balanceHeading: string;
  balanceP1: string;
  balanceP2: string;
  balanceBullets: Array<{ label: string; text: string }>;
  colorHeading: string;
  colorP1: string;
  colorP2: string;
  colorSteps: Array<{ label: string; text: string }>;
  aspectRatioHeading: string;
  aspectRatioIntro: string;
  tableHeaders: { ratio: string; dimensions: string; platform: string; layout: string };
  tableRows: Array<{ ratio: string; dimensions: string; platform: string; layout: string }>;
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface PhotoProofSheetData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  costHeading: string;
  costP1: string;
  costQuote: string;
  costP2: string;
  costP3: string;
  cameraHeading: string;
  cameraP1: string;
  tableHeaders: { brand: string; srgb: string; adobergb: string; raw: string };
  tableRows: Array<{ brand: string; srgb: string; adobergb: string; raw: string }>;
  cameraP2: string;
  walkthroughHeading: string;
  walkthroughIntro: string;
  walkthroughBoxTitle: string;
  walkthroughSteps: string[];
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface LargeFramesGuideData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  matrixHeading: string;
  matrixP1: string;
  tableHeaders: { frameSize: string; metricSize: string; aspectRatio: string; canvas150: string; canvas300: string };
  tableRows: Array<{ frameSize: string; metricSize: string; aspectRatio: string; canvas150: string; canvas300: string; isNative?: boolean }>;
  mattingHeading: string;
  mattingP1: string;
  mattingP2: string;
  mattingBullets: Array<{ label: string; text: string }>;
  mattingProTip: string;
  hangingHeading: string;
  hangingP1: string;
  hangingRules: Array<{ label: string; text: string }>;
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface WeddingWorkflowData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  comparisonHeading: string;
  comparisonP1: string;
  tableHeaders: { factor: string; tool: string; cloud: string };
  tableRows: Array<{ factor: string; tool: string; cloud: string }>;
  comparisonP2: string;
  syncHeading: string;
  syncP1: string;
  syncSteps: Array<{ label: string; text: string }>;
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export interface AlbumsVsProofsData {
  title: string;
  description: string;
  badge: string;
  h1Pre: string;
  h1Highlight: string;
  lead: string;
  quickAnswerLabel: string;
  quickAnswerText: string;
  stepsHeading: string;
  stepsIntro: string;
  steps: GuideStep[];
  matrixHeading: string;
  matrixP1: string;
  tableHeaders: { format: string; capacity: string; cost: string; binding: string; purpose: string };
  tableRows: Array<{ format: string; capacity: string; cost: string; binding: string; purpose: string; highlight?: boolean }>;
  gutterHeading: string;
  gutterP1: string;
  gutterBullets: Array<{ label: string; text: string }>;
  cta: GuideCta;
  faqHeading: string;
  faqSub: string;
  faqs: GuideFaq[];
  breadcrumbs: GuideBreadcrumbs;
}

export const LIGHTROOM_WORKFLOW_DATA: Record<Locale, LightroomWorkflowData> = {
  "en": {
    "title": "Lightroom Client Selection Workflow — XMP Sync Guide",
    "description": "Sync client photo selections into Lightroom Classic with XMP sidecar files. Step-by-step guide for photographers, no plugins needed.",
    "h1": "Lightroom Client Selection Workflow",
    "lead": "Sync client photo selections directly into Lightroom Classic and Capture One using zero-click XMP sidecars. No plugins required.",
    "howItWorksHeading": "How it Works: The XMP Sidecar Workflow",
    "steps": [
      {
        "name": "Generate Proof Portal / Contact Sheet",
        "text": "Drag your exported low-res JPEG proofs into Make Contact Sheet and generate a Client Proofing Portal or send them a PDF."
      },
      {
        "name": "Collect Client Selections",
        "text": "Clients review the photos and export their feedback manifest (.makecontactsheet.json). Drop this file into the Make Contact Sheet studio to instantly restore their Keep/Flag/Reject tags."
      },
      {
        "name": "Export XMP Sidecar ZIP",
        "text": "Click the \"Export Artifact\" button and select the \"Lightroom XMP\" format. This generates a ZIP of .xmp files containing 5-star ratings and color labels for every selected photo."
      },
      {
        "name": "Drop Sidecars into RAW Folder in Lightroom Classic / Capture One",
        "text": "Extract the ZIP into the exact folder containing your original RAW files. In Lightroom, select all images, right-click, and choose \"Metadata > Read Metadata from File\". Your client selections are now perfectly synced to your RAWs."
      }
    ],
    "faqHeading": "Frequently Asked Questions",
    "faqs": [
      {
        "question": "How do XMP sidecars sync with Lightroom Classic?",
        "answer": "Lightroom reads standard Adobe XMP metadata. When you drop an .xmp file next to a RAW file of the same name and tell Lightroom to \"Read Metadata from File\", it imports the color labels, star ratings, and keywords written in the sidecar directly onto the RAW file."
      },
      {
        "question": "Does this work with Capture One?",
        "answer": "Yes! Capture One also reads standard XMP metadata. Make sure \"Auto Sync Sidecar XMP\" is enabled in Capture One preferences."
      },
      {
        "question": "Are there any plugins required?",
        "answer": "No plugins are required. Make Contact Sheet generates standard Adobe XMP files natively in your browser that can be read by any professional RAW processor."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "current": "Lightroom Client Selection Workflow"
    }
  },
  "es": {
    "title": "Flujo de selección de clientes para Lightroom — Guía de sincronización XMP",
    "description": "Sincroniza las selecciones de fotos de clientes en Lightroom Classic con archivos XMP sidecar. Guía paso a paso para fotógrafos, sin plugins.",
    "h1": "Flujo de selección de clientes para Lightroom",
    "lead": "Sincroniza las selecciones de fotos de tus clientes directamente en Lightroom Classic y Capture One mediante archivos sidecar XMP sin clics adicionales. No requiere plugins.",
    "howItWorksHeading": "Cómo funciona: El flujo de trabajo con archivos XMP Sidecar",
    "steps": [
      {
        "name": "Generar portal de pruebas u hoja de contactos",
        "text": "Arrastra tus pruebas JPEG de baja resolución a Make Contact Sheet y genera un portal interactivo para clientes o envíales un PDF listo para imprimir."
      },
      {
        "name": "Recopilar las selecciones del cliente",
        "text": "Los clientes revisan las fotos y exportan su manifiesto de selección (.makecontactsheet.json). Arrastra este archivo al estudio para restaurar al instante sus etiquetas de Conservar/Destacar/Descartar."
      },
      {
        "name": "Exportar ZIP de archivos XMP Sidecar",
        "text": "Haz clic en el botón \"Exportar\" y selecciona el formato \"Lightroom XMP\". Esto generará un archivo ZIP con ficheros .xmp que contienen valoraciones de 5 estrellas y etiquetas de color para cada foto elegida."
      },
      {
        "name": "Colocar los archivos XMP en la carpeta RAW en Lightroom Classic o Capture One",
        "text": "Extrae el archivo ZIP en la misma carpeta donde residen tus archivos RAW originales. En Lightroom, selecciona todas las imágenes, haz clic derecho y pulsa \"Metadatos > Leer metadatos del archivo\". Las selecciones del cliente quedarán perfectamente sincronizadas con tus RAWs."
      }
    ],
    "faqHeading": "Preguntas frecuentes",
    "faqs": [
      {
        "question": "¿Cómo se sincronizan los archivos XMP sidecar con Lightroom Classic?",
        "answer": "Lightroom lee metadatos XMP estándar de Adobe. Al colocar un archivo .xmp junto a un archivo RAW con el mismo nombre y seleccionar en Lightroom \"Leer metadatos del archivo\", se importan directamente las etiquetas de color, clasificaciones por estrellas y palabras clave sobre el archivo RAW."
      },
      {
        "question": "¿Funciona esto también con Capture One?",
        "answer": "¡Sí! Capture One también es compatible con metadatos XMP estándar. Solo asegúrate de tener activada la opción \"Sincronizar automáticamente XMP sidecar\" en las preferencias de Capture One."
      },
      {
        "question": "¿Es necesario instalar algún plugin?",
        "answer": "No se requiere ningún plugin. Make Contact Sheet genera archivos Adobe XMP estándar de manera nativa en tu navegador web, compatibles con cualquier revelador RAW profesional."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "current": "Flujo de selección en Lightroom"
    }
  },
  "de": {
    "title": "Lightroom Kunden-Auswahl-Workflow — XMP-Sync-Anleitung",
    "description": "Synchronisieren Sie Fotoauswahlen Ihrer Kunden mit XMP-Sidecar-Dateien in Lightroom Classic. Schritt-für-Schritt-Anleitung, keine Plugins nötig.",
    "h1": "Lightroom Kunden-Auswahl-Workflow",
    "lead": "Synchronisieren Sie Fotoauswahlen Ihrer Kunden mit klickfreien XMP-Sidecars direkt in Lightroom Classic und Capture One. Vollständig ohne Plugins.",
    "howItWorksHeading": "So funktioniert es: Der XMP-Sidecar-Workflow",
    "steps": [
      {
        "name": "Proof-Portal oder Kontaktabzug erstellen",
        "text": "Ziehen Sie Ihre exportierten JPEG-Vorschaubilder in Make Contact Sheet und erstellen Sie ein Kunden-Auswahlportal oder ein PDF-Dokument."
      },
      {
        "name": "Kundenauswahlen erfassen",
        "text": "Kunden prüfen die Aufnahmen und exportieren ihr Auswahlmanifest (.makecontactsheet.json). Ziehen Sie diese Datei in das Studio, um Behalten-/Markieren-/Ablehnen-Tags sofort wiederherzustellen."
      },
      {
        "name": "XMP-Sidecar-ZIP exportieren",
        "text": "Klicken Sie auf \"Exportieren\" und wählen Sie das Format \"Lightroom XMP\". Dadurch wird eine ZIP-Datei mit .xmp-Dateien erzeugt, die 5-Sterne-Bewertungen und Farblabels für alle ausgewählten Fotos enthält."
      },
      {
        "name": "Sidecars in den RAW-Ordner in Lightroom Classic / Capture One ablegen",
        "text": "Entpacken Sie das ZIP-Archiv in den Ordner mit Ihren originalen RAW-Dateien. Wählen Sie in Lightroom alle Bilder aus, klicken Sie mit der rechten Maustaste und wählen Sie \"Metadaten > Metadaten aus Datei lesen\". Die Auswahlen sind sofort mit Ihren RAWs synchronisiert."
      }
    ],
    "faqHeading": "Häufig gestellte Fragen",
    "faqs": [
      {
        "question": "Wie synchronisieren sich XMP-Sidecars mit Lightroom Classic?",
        "answer": "Lightroom liest standardisierte Adobe-XMP-Metadaten ein. Wenn Sie eine .xmp-Datei neben eine gleichnamige RAW-Datei legen und in Lightroom \"Metadaten aus Datei lesen\" wählen, werden Farbetiketten, Sternbewertungen und Stichwörter direkt auf die RAW-Datei übertragen."
      },
      {
        "question": "Funktioniert dieser Ablauf auch mit Capture One?",
        "answer": "Ja! Auch Capture One liest standardmäßige XMP-Metadaten. Vergewissern Sie sich einfach, dass \"Sidecar-XMP automatisch synchronisieren\" in den Voreinstellungen von Capture One aktiviert ist."
      },
      {
        "question": "Werden dafür zusätzliche Plugins benötigt?",
        "answer": "Es sind keinerlei Plugins erforderlich. Make Contact Sheet generiert standardkonforme Adobe-XMP-Dateien direkt im Browser, die von jedem professionellen RAW-Konverter verarbeitet werden können."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "current": "Lightroom Kunden-Auswahl-Workflow"
    }
  },
  "fr": {
    "title": "Flux de sélection client Lightroom — Guide de synchronisation XMP",
    "description": "Synchronisez les sélections de photos des clients dans Lightroom Classic avec des fichiers sidecar XMP. Guide pas à pas sans aucun plugin.",
    "h1": "Flux de sélection client pour Lightroom",
    "lead": "Synchronisez les choix de photos de vos clients directement dans Lightroom Classic et Capture One grâce aux fichiers sidecars XMP. Aucun plugin requis.",
    "howItWorksHeading": "Comment ça marche : Le flux de travail XMP Sidecar",
    "steps": [
      {
        "name": "Générer la planche contact ou le portail client",
        "text": "Glissez vos épreuves JPEG basse résolution dans Make Contact Sheet et créez un portail de sélection interactif ou un PDF imprimable."
      },
      {
        "name": "Récupérer les sélections du client",
        "text": "Les clients examinent les photos et exportent leur fichier de sélection (.makecontactsheet.json). Déposez ce fichier dans le studio pour restaurer instantanément leurs mentions Conserver/Signaler/Rejeter."
      },
      {
        "name": "Exporter le fichier ZIP de sidecars XMP",
        "text": "Cliquez sur \"Exporter\" et choisissez le format \"Lightroom XMP\". Vous obtiendrez une archive ZIP de fichiers .xmp contenant des notes 5 étoiles et des labels de couleur pour chaque photo retenue."
      },
      {
        "name": "Placer les sidecars dans le dossier RAW dans Lightroom Classic / Capture One",
        "text": "Extrayez le ZIP directement dans le dossier contenant vos fichiers RAW d'origine. Dans Lightroom, sélectionnez toutes les images, faites un clic droit et choisissez \"Métadonnées > Lire les métadonnées du fichier\". Vos sélections sont immédiatement synchronisées."
      }
    ],
    "faqHeading": "Foire aux questions",
    "faqs": [
      {
        "question": "Comment les sidecars XMP se synchronisent-ils avec Lightroom Classic ?",
        "answer": "Lightroom prend en charge les métadonnées Adobe XMP standard. En plaçant un fichier .xmp à côté d'un fichier RAW portant le même nom et en cliquant sur \"Lire les métadonnées du fichier\", Lightroom importe automatiquement les libellés de couleur, les étoiles et les mots-clés directement sur le fichier RAW."
      },
      {
        "question": "Est-ce que cela fonctionne avec Capture One ?",
        "answer": "Oui ! Capture One lit également les métadonnées XMP standard. Veillez simplement à cocher l'option \"Synchroniser automatiquement les XMP sidecars\" dans les préférences de Capture One."
      },
      {
        "question": "Faut-il installer un plugin supplémentaire ?",
        "answer": "Aucun plugin n'est requis. Make Contact Sheet génère des fichiers Adobe XMP conformes directement dans votre navigateur, lisibles par tous les dérawtiseurs professionnels."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "current": "Sélection client Lightroom"
    }
  },
  "ja": {
    "title": "Lightroomクライアント写真選定ワークフロー — XMP同期ガイド",
    "description": "XMPサイドカーファイルを使用してクライアントの写真選定をLightroom Classicに直接同期。プラグイン不要の写真家向けステップバイステップガイド。",
    "h1": "Lightroom クライアント写真選定ワークフロー",
    "lead": "プラグイン不要。ゼロクリックのXMPサイドカーを使用して、クライアントの写真選定結果をLightroom ClassicやCapture Oneに直接同期します。",
    "howItWorksHeading": "仕組み：XMPサイドカーワークフロー",
    "steps": [
      {
        "name": "プルーフポータルまたはコンタクトシートの作成",
        "text": "書き出した低解像度JPEGプレビューをMake Contact Sheetにドラッグ＆ドロップし、クライアント向けプルーフポータルまたはPDFを作成します。"
      },
      {
        "name": "クライアントの選定データを受信",
        "text": "クライアントが写真を確認し、選定マニフェスト（.makecontactsheet.json）を書き出します。このファイルをスタジオにドロップすると、キープ・フラグ・除外タグが瞬時に復元されます。"
      },
      {
        "name": "XMPサイドカーZIPの書き出し",
        "text": "「書き出し」をクリックし、「Lightroom XMP」フォーマットを選択します。選定された全写真の5つ星評価とカラーラベルを含む.xmpファイルのZIPが生成されます。"
      },
      {
        "name": "RAWフォルダにサイドカーを展開してLightroom / Capture Oneで同期",
        "text": "オリジナルRAWファイルが格納されているフォルダ内にZIPを展開します。Lightroomで全画像を選択して右クリックし、「メタデータ > ファイルからメタデータを読み込み」を実行すると、選定情報がRAWに即座に同期されます。"
      }
    ],
    "faqHeading": "よくある質問",
    "faqs": [
      {
        "question": "XMPサイドカーはどのようにLightroom Classicと同期しますか？",
        "answer": "Lightroomは業界標準のAdobe XMPメタデータを読み込みます。同名のRAWファイルの横に.xmpファイルを配置し、Lightroomで「ファイルからメタデータを読み込み」を実行すると、サイドカーに書き込まれた星評価やカラーラベルがRAWに直接反映されます。"
      },
      {
        "question": "Capture Oneでも利用できますか？",
        "answer": "はい、利用可能です。Capture Oneも標準XMPメタデータをサポートしています。環境設定で「サイドカーXMPの自動同期」が有効になっていることを確認してください。"
      },
      {
        "question": "専用のプラグインは必要ですか？",
        "answer": "プラグインは一切不要です。Make Contact Sheetはブラウザ内で標準規格に準拠したAdobe XMPファイルを生成するため、あらゆるプロ用RAW現像ソフトで読み込めます。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "current": "Lightroomクライアント選定ワークフロー"
    }
  },
  "pt": {
    "title": "Fluxo de seleção de fotos para clientes no Lightroom — Guia XMP",
    "description": "Sincronize as seleções de fotos de clientes no Lightroom Classic com arquivos sidecar XMP. Guia passo a passo para fotógrafos, sem plugins.",
    "h1": "Fluxo de seleção de fotos para clientes no Lightroom",
    "lead": "Sincronize as escolhas de fotos dos clientes diretamente no Lightroom Classic e Capture One usando arquivos sidecar XMP. Sem necessidade de plugins.",
    "howItWorksHeading": "Como funciona: O fluxo de trabalho com XMP Sidecar",
    "steps": [
      {
        "name": "Gerar portal de provas ou folha de contato",
        "text": "Arraste suas prévias JPEG de baixa resolução para o Make Contact Sheet e gere um portal interativo ou envie um PDF de alta qualidade."
      },
      {
        "name": "Coletar seleções do cliente",
        "text": "Os clientes avaliam as fotos e exportam o manifesto de seleção (.makecontactsheet.json). Solte esse arquivo no estúdio para restaurar instantaneamente as marcações de Manter/Destacar/Rejeitar."
      },
      {
        "name": "Exportar ZIP com arquivos XMP Sidecar",
        "text": "Clique no botão de exportação e selecione o formato \"Lightroom XMP\". Isso gera um arquivo ZIP com arquivos .xmp contendo classificações de 5 estrelas e rótulos de cor para cada foto selecionada."
      },
      {
        "name": "Colocar os arquivos XMP na pasta RAW no Lightroom Classic ou Capture One",
        "text": "Extraia o ZIP na mesma pasta que contém seus arquivos RAW originais. No Lightroom, selecione todas as fotos, clique com o botão direito e escolha \"Metadados > Ler metadados do arquivo\". As seleções serão sincronizadas perfeitamente."
      }
    ],
    "faqHeading": "Perguntas frequentes",
    "faqs": [
      {
        "question": "Como os arquivos XMP sidecar sincronizam com o Lightroom Classic?",
        "answer": "O Lightroom lê metadados padrão Adobe XMP. Ao colocar um arquivo .xmp junto a um arquivo RAW de mesmo nome e selecionar \"Ler metadados do arquivo\", ele importa automaticamente os rótulos de cor, classificações por estrelas e palavras-chave para o arquivo RAW."
      },
      {
        "question": "Esse método funciona com o Capture One?",
        "answer": "Sim! O Capture One também lê metadados XMP padrão. Certifique-se de ativar a opção \"Sincronizar automaticamente XMP sidecar\" nas preferências do Capture One."
      },
      {
        "question": "É necessário instalar algum plugin?",
        "answer": "Nenhum plugin é necessário. O Make Contact Sheet gera arquivos Adobe XMP padrão diretamente no seu navegador, compatíveis com qualquer software profissional de revelação RAW."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "current": "Fluxo de seleção no Lightroom"
    }
  }
};

export const CONTACT_SHEET_GUIDE_DATA: Record<Locale, ContactSheetGuideData> = {
  "en": {
    "title": "How to Make a Contact Sheet — Step-by-Step Guide",
    "description": "Learn how to make a contact sheet with free tools, Photoshop, or Lightroom. Step-by-step photo proof sheet tutorial with printable examples.",
    "badge": "PHOTOGRAPHY WORKFLOW GUIDE · 8 MIN READ",
    "h1Pre": "How to Make a Contact Sheet: ",
    "h1Highlight": "Step-by-Step Photography Guide",
    "lead": "Learn how to generate professional, high-density contact sheets and proof packages in seconds. Master grid mathematics, paper dimension standards, EXIF metadata overlays, and zero-friction client selection handoffs.",
    "quickAnswerLabel": "Quick Answer / Summary Definition",
    "quickAnswerText": "A photography contact sheet (or proof sheet) is a structured multi-image document arranging thumbnail captures into calibrated rows and columns, displaying original camera filenames and technical capture metadata beneath each frame. To make one for free without installing software: import your image batch into Make Contact Sheet, choose your target sheet dimensions (A4 or US Letter) and grid density (e.g., 4 × 5 for 20 photos per page), review your selects, and export a 300 DPI multi-page PDF or filename CSV list.",
    "stepsHeading": "5 Steps to Create a Production Proof Sheet",
    "stepsIntro": "Follow this standardized, five-step studio procedure to transform raw camera shoots into organized, client-ready review documents:",
    "steps": [
      {
        "name": "Import and index your photo batch",
        "text": "Drag your folder or selection of image files directly into the Make Contact Sheet browser workspace. The local engine immediately indexes all raster formats (JPEG, PNG, WebP, AVIF, HEIC) and RAW preview buffers without transferring any bytes to remote cloud servers."
      },
      {
        "name": "Select paper geometry and grid density",
        "text": "Choose your destination page standard: US Letter (8.5 × 11 in) for North American labs or ISO A4 (210 × 297 mm) for international documents. Configure column and row counts (such as 4 × 5 for 20 frames per sheet or 6 × 6 for 36-exposure film rolls) to balance thumbnail inspection with page count."
      },
      {
        "name": "Configure filename and technical EXIF metadata",
        "text": "Enable filename labels to display verifiable camera identifiers (e.g. DSC_4821.NEF) and sequential index badges (#01, #02). Optionally insert dynamic EXIF badges to expose exposure parameters (shutter speed, aperture, ISO, and focal length) beneath each frame."
      },
      {
        "name": "Perform rapid keyboard review and triage",
        "text": "Navigate through your proof thumbnails using keyboard shortcuts: press 1 to mark Keep, 2 to Flag for secondary consideration, and 3 to Reject out-of-focus or unselected takes directly on the interactive light-table."
      },
      {
        "name": "Export calibrated 300 DPI PDF or Lightroom selection lists",
        "text": "Open the Export drawer to download a multi-page, print-ready 300 DPI PDF document with custom margins and headers, or copy a comma-separated filename text string to paste directly into Adobe Lightroom or Capture One search filters."
      }
    ],
    "historyHeading": "What is the history of the photographic contact sheet?",
    "historyP1": "The term contact sheet originates in 19th and 20th-century analog darkroom practices. Photographers cut exposed 35mm or 120 medium format film rolls into strips of 4 to 6 frames, laid them directly emulsion-to-emulsion against a sheet of photographic gelatin-silver paper inside a glass printing frame, and turned on the enlarger light for a brief test exposure. Because the negative was in physical contact with the paper, the resulting positive print displayed an exact 1:1 optical reproduction of the entire camera roll.",
    "historyP2": "Master photographers like Henri Cartier-Bresson, Richard Avedon, and Annie Leibovitz treated contact sheets as intimate visual journals. The sheet revealed the exact sequence of thought: how the photographer worked the scene, circled around a subject, bracketed lighting exposures, and finally captured the decisive moment. Red grease pencil marks on historical proof sheets documented the photographer's culling decisions before making final master enlargements.",
    "historyP3": "In contemporary digital photography, although physical darkroom chemicals have been replaced by digital sensors and pixels, the fundamental necessity of the contact sheet remains unchanged: it provides a high-density, bird's-eye perspective of a photoshoot that cannot be replicated by viewing full-screen single images sequentially.",
    "dpiHeading": "What DPI and grid size do I need for printing a contact sheet?",
    "dpiP1": "Creating a clean contact sheet requires precise calculation of page dimensions, aspect ratios, and printable margins to ensure crisp rendering when outputting to commercial digital presses or local office printers:",
    "table1Headers": {
      "format": "Standard Format",
      "size": "Physical Size",
      "canvas": "Pixel Canvas at 300 DPI",
      "grid": "Recommended Grid Density"
    },
    "table1Rows": [
      {
        "format": "ISO A4 (Portrait)",
        "size": "210 × 297 mm",
        "canvas": "2480 × 3508 px",
        "grid": "4 × 5 (20 images) or 4 × 6 (24 images)"
      },
      {
        "format": "US Letter (Portrait)",
        "size": "8.5 × 11.0 in",
        "canvas": "2550 × 3300 px",
        "grid": "4 × 5 (20 images) or 3 × 4 (12 images)"
      },
      {
        "format": "16:9 Widescreen (Digital)",
        "size": "4K Ultra HD Display",
        "canvas": "3840 × 2160 px",
        "grid": "6 × 3 (18 images) or 8 × 4 (32 images)"
      },
      {
        "format": "120 Medium Format (6×7)",
        "size": "A4 Landscape Proof",
        "canvas": "3508 × 2480 px",
        "grid": "5 × 2 (10-Up roll simulation)"
      }
    ],
    "dpiP2": "When outputting proof sheets for physical print inspection, 300 DPI is the industry baseline. At lower resolutions (such as standard 72 DPI screen renderings), micro-text containing camera filenames and exposure data becomes pixelated and illegible, undermining the technical utility of the proof document.",
    "compareHeading": "How does Make Contact Sheet compare to Photoshop and Lightroom?",
    "compareIntro": "Photographers evaluating their production proofing pipeline typically compare three distinct approaches. Here is a technical breakdown of each workflow:",
    "table2Headers": {
      "criteria": "Evaluation Criteria",
      "tool": "Make Contact Sheet",
      "lightroom": "Lightroom Classic",
      "photoshop": "Photoshop (Contact Sheet II)"
    },
    "table2Rows": [
      {
        "criteria": "Setup & Installation",
        "tool": "Instant (0 Install, Browser)",
        "lightroom": "Heavy Desktop Application",
        "photoshop": "Heavy Desktop Application"
      },
      {
        "criteria": "Catalog Prerequisite",
        "tool": "None (Direct Folder Drop)",
        "lightroom": "Mandatory Catalog Import",
        "photoshop": "None (Batch Script Folder)"
      },
      {
        "criteria": "Batch Processing Speed",
        "tool": "Real-time Web Workers",
        "lightroom": "Slow Background Spooling",
        "photoshop": "Slow Single-Thread Automation"
      },
      {
        "criteria": "Client Triage Shortcuts",
        "tool": "Built-in (1 Keep, 2 Flag, 3 Reject)",
        "lightroom": "Requires Library Module Switching",
        "photoshop": "None (Static Render)"
      },
      {
        "criteria": "Cost & Licensing",
        "tool": "100% Free & Open",
        "lightroom": "$19.99+/mo Creative Cloud",
        "photoshop": "$20.99+/mo Creative Cloud"
      }
    ],
    "psychologyHeading": "Client Proofing Psychology: Eliminating Selection Bottlenecks",
    "psychologyP1": "When delivering unedited photo proofs to commercial clients, art directors, or wedding couples, sending a folder of loose JPEG files creates significant communication friction. Clients often provide ambiguous feedback such as \"We love the third shot where the model looks left, but not the one next to it.\" Translating these subjective descriptions into raw camera numbers can cost hours of administrative back-and-forth.",
    "psychologyP2": "Delivering an indexed contact sheet establishes a structured, unambiguous visual contract:",
    "psychologyBullets": [
      {
        "label": "Sequential Index Identifiers",
        "text": "Numbering frames sequentially (#01, #02, #03) gives clients a simple shorthand to communicate their favorite takes without having to memorize complex camera filenames."
      },
      {
        "label": "Visible Technical Metadata",
        "text": "Exposing camera settings (such as ISO 3200 or 1/60s) provides immediate technical context during test shoots and commercial lighting reviews."
      },
      {
        "label": "Side-by-Side Expression Comparison",
        "text": "Placing adjacent burst frames directly next to each other allows clients to assess micro-expressions, blink rate, and posture variations instantly."
      }
    ],
    "cta": {
      "badge": "FREE IN-BROWSER WORKBENCH",
      "title": "Ready to Generate Your Contact Sheets?",
      "text": "Process unlimited photos with zero cloud uploads. Create print-ready 300 DPI PDFs, customize grid margins, and preserve camera filenames locally.",
      "btnPrimary": "Launch Contact Sheet Maker",
      "btnSecondary": "Explore 21 Layout Presets"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Practical answers regarding contact sheet generation, paper dimensions, and Lightroom integrations.",
    "faqs": [
      {
        "question": "How do you make a contact sheet in Lightroom vs Make Contact Sheet?",
        "answer": "In Adobe Lightroom Classic, creating a contact sheet requires entering the Print Module, manually configuring a Custom Package or Contact Sheet template, adjusting margin and stroke sliders, and waiting for slow catalog background rendering. Make Contact Sheet removes all catalog overhead by allowing you to drop image folders directly into a browser for immediate, local 300 DPI PDF generation with zero subscription fees."
      },
      {
        "question": "What is the optimal grid configuration for photography client proofs?",
        "answer": "For standard commercial and portrait proofing on US Letter or A4 paper, a 4 × 5 grid (20 photos per page) or 3 × 4 grid (12 photos per page) provides the best balance. It allows clients to clearly evaluate facial expressions, sharpness, and framing without needing a magnifying loupe."
      },
      {
        "question": "Why is it critical to preserve original camera filenames on proof sheets?",
        "answer": "Consumer collage generators and cloud apps frequently rename uploaded files to sequential IDs (e.g. image_1.jpg) or strip metadata. Preserving exact camera identifiers (such as _MG_8092.CR3 or DSC_1042.ARW) ensures that when a client requests edits for specific frame numbers, you can instantly locate the original RAW master files in your editing software without guessing."
      },
      {
        "question": "Can I render contact sheets on dark or custom background colors?",
        "answer": "Yes. Make Contact Sheet provides curated studio dark tones (Studio Slate, Dark Chocolate, Truffle Noir) as well as classic Gallery White, Archival Linen, and Warm Cream. You can also input custom hex codes for both sheet paper backgrounds and label typography."
      },
      {
        "question": "What resolution should I use when exporting contact sheets for physical print?",
        "answer": "For physical printing on home inkjet printers or pro lab copiers, always export at 300 DPI (dots per inch). At 300 DPI, an A4 page renders at 2480 × 3508 pixels and US Letter renders at 2550 × 3300 pixels, ensuring razor-sharp thumbnail details and crystal-clear micro-typography for filename labels."
      },
      {
        "question": "Are my confidential client photographs uploaded to an external server?",
        "answer": "No. Make Contact Sheet executes 100% locally in your web browser using HTML5 Canvas and client-side Web Workers. Your files, pixels, filenames, and EXIF metadata never leave your computer or touch a cloud server."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "How to Make a Contact Sheet"
    }
  },
  "es": {
    "title": "Cómo hacer una hoja de contactos — Guía fotográfica paso a paso",
    "description": "Aprende a crear una hoja de contactos fotográfica con herramientas gratuitas, Photoshop o Lightroom. Tutorial con ejemplos imprimibles a 300 DPI.",
    "badge": "GUÍA DE FLUJO DE TRABAJO · 8 MIN DE LECTURA",
    "h1Pre": "Cómo hacer una hoja de contactos: ",
    "h1Highlight": "Guía fotográfica paso a paso",
    "lead": "Aprende a generar hojas de contactos profesionales y paquetes de prueba de alta densidad en cuestión de segundos. Domina las dimensiones de papel, los metadatos EXIF y la entrega ágil a clientes.",
    "quickAnswerLabel": "Respuesta rápida / Definición resumida",
    "quickAnswerText": "Una hoja de contactos fotográfica (o de pruebas) es un documento estructurado que organiza miniaturas en filas y columnas calibradas, mostrando nombres de archivo y metadatos técnicos debajo de cada foto. Para hacer una gratis sin instalar software: importa tus imágenes en Make Contact Sheet, elige el tamaño (A4 o Carta) y la densidad de cuadrícula (ej. 4 × 5 para 20 fotos por página), revisa las tomas y exporta un PDF a 300 DPI o lista CSV.",
    "stepsHeading": "5 pasos para crear una hoja de contactos profesional",
    "stepsIntro": "Sigue este procedimiento estandarizado de estudio para transformar sesiones fotográficas en documentos de revisión organizados y listos para el cliente:",
    "steps": [
      {
        "name": "Importar e indexar el lote de fotografías",
        "text": "Arrastra tu carpeta o selección de imágenes directamente al espacio de trabajo. El motor local indexa al instante formatos rasterizados (JPEG, PNG, WebP, AVIF, HEIC) y previsualizaciones RAW sin subir ningún byte a servidores externos."
      },
      {
        "name": "Seleccionar geometría de papel y densidad de cuadrícula",
        "text": "Elige el estándar de página: Carta EE.UU. (8.5 × 11 in) o ISO A4 (210 × 297 mm). Configura el número de columnas y filas (como 4 × 5 para 20 fotogramas o 6 × 6 para carretes de 36 fotos) para equilibrar el tamaño de miniatura y el número de páginas."
      },
      {
        "name": "Configurar etiquetas de nombres y metadatos EXIF",
        "text": "Activa las etiquetas para mostrar identificadores verificables de cámara (ej. DSC_4821.NEF) e insignias de índice secuencial (#01, #02). Inserta de forma opcional parámetros técnicos EXIF (velocidad, apertura, ISO y longitud focal)."
      },
      {
        "name": "Realizar selección y descarte rápido por teclado",
        "text": "Navega por tus miniaturas con atajos de teclado: pulsa 1 para Conservar (Keep), 2 para Destacar (Flag) y 3 para Descartar (Reject) tomas desenfocadas directamente en la mesa de luz interactiva."
      },
      {
        "name": "Exportar PDF calibrado a 300 DPI o listas para Lightroom",
        "text": "Abre el menú de exportación para descargar un documento PDF multipágina listo para imprimir a 300 DPI con márgenes y encabezados personalizados, o copia la lista de nombres para pegarla en los filtros de Lightroom o Capture One."
      }
    ],
    "historyHeading": "¿Cuál es la historia de la hoja de contactos fotográfica?",
    "historyP1": "El término hoja de contactos tiene su origen en las prácticas analógicas de cuarto oscuro de los siglos XIX y XX. Los fotógrafos cortaban rollos de película de 35 mm o formato medio 120 en tiras de 4 a 6 fotogramas, las colocaban directamente emulsión contra emulsión sobre papel fotográfico baritado dentro de un chasis de cristal y encendían la ampliadora para una breve exposición. Al haber contacto directo, la copia resultante ofrecía una reproducción óptica exacta 1:1 de todo el carrete.",
    "historyP2": "Grandes maestros como Henri Cartier-Bresson, Richard Avedon y Annie Leibovitz consideraban las hojas de contacto como diarios visuales íntimos. La hoja revelaba la secuencia exacta de pensamiento: cómo el fotógrafo exploraba la escena, rodeaba al sujeto, ajustaba la exposición y finalmente capturaba el instante decisivo. Las marcas con lápiz graso rojo en las hojas históricas documentaban las decisiones de descarte antes de ampliar.",
    "historyP3": "En la era digital, aunque los químicos hayan dado paso a sensores y píxeles, la necesidad de la hoja de contactos sigue intacta: proporciona una vista panorámica de conjunto que ninguna visualización individual a pantalla completa puede igualar.",
    "dpiHeading": "¿Qué resolución DPI y cuadrícula se necesitan para imprimir?",
    "dpiP1": "Crear una hoja de contactos impecable exige calcular con precisión las dimensiones de página, proporciones de aspecto y márgenes imprimibles:",
    "table1Headers": {
      "format": "Formato estándar",
      "size": "Tamaño físico",
      "canvas": "Lienzo en píxeles a 300 DPI",
      "grid": "Densidad de cuadrícula recomendada"
    },
    "table1Rows": [
      {
        "format": "ISO A4 (Vertical)",
        "size": "210 × 297 mm",
        "canvas": "2480 × 3508 px",
        "grid": "4 × 5 (20 fotos) o 4 × 6 (24 fotos)"
      },
      {
        "format": "Carta EE.UU. (Vertical)",
        "size": "8.5 × 11.0 in",
        "canvas": "2550 × 3300 px",
        "grid": "4 × 5 (20 fotos) o 3 × 4 (12 fotos)"
      },
      {
        "format": "Panorámico 16:9 (Digital)",
        "size": "Pantalla 4K Ultra HD",
        "canvas": "3840 × 2160 px",
        "grid": "6 × 3 (18 fotos) u 8 × 4 (32 fotos)"
      },
      {
        "format": "Formato medio 120 (6×7)",
        "size": "A4 Horizontal",
        "canvas": "3508 × 2480 px",
        "grid": "5 × 2 (simulación de carrete de 10 fotos)"
      }
    ],
    "dpiP2": "Al generar hojas de prueba para impresión física, 300 DPI es la referencia del sector. A resoluciones más bajas (como 72 DPI de pantalla), el microtexto de los nombres de archivo y datos de toma se vuelve ilegible, arruinando la utilidad técnica de la prueba.",
    "compareHeading": "¿Cómo se compara Make Contact Sheet con Photoshop y Lightroom?",
    "compareIntro": "Al evaluar el flujo de generación de hojas de prueba, los fotógrafos suelen contrastar tres alternativas. Este es el desglose técnico de cada flujo:",
    "table2Headers": {
      "criteria": "Criterio de evaluación",
      "tool": "Make Contact Sheet",
      "lightroom": "Lightroom Classic",
      "photoshop": "Photoshop (Hoja de contactos II)"
    },
    "table2Rows": [
      {
        "criteria": "Instalación y configuración",
        "tool": "Instantáneo (0 instalaciones, navegador)",
        "lightroom": "Aplicación pesada de escritorio",
        "photoshop": "Aplicación pesada de escritorio"
      },
      {
        "criteria": "Importación obligatoria de catálogo",
        "tool": "Ninguna (arrastrar carpetas directamente)",
        "lightroom": "Importación obligatoria a catálogo",
        "photoshop": "Ninguna (script de carpetas)"
      },
      {
        "criteria": "Velocidad de procesamiento por lotes",
        "tool": "En tiempo real con Web Workers",
        "lightroom": "Lenta cola en segundo plano",
        "photoshop": "Automatización lenta monohilo"
      },
      {
        "criteria": "Atajos de selección para clientes",
        "tool": "Integrados (1 Conservar, 2 Destacar, 3 Descartar)",
        "lightroom": "Requiere cambiar al módulo Biblioteca",
        "photoshop": "Ninguno (renderizado estático)"
      },
      {
        "criteria": "Coste y suscripción",
        "tool": "100% Gratuito y de libre acceso",
        "lightroom": "19,99+ €/mes Creative Cloud",
        "photoshop": "20,99+ €/mes Creative Cloud"
      }
    ],
    "psychologyHeading": "Psicología de selección con clientes: eliminación de cuellos de botella",
    "psychologyP1": "Al entregar pruebas de fotos sin ordenar a clientes comerciales o novios de bodas, una carpeta de JPEGs sueltos genera confusión. Los clientes dan indicaciones vagas como \"Nos encanta la tercera foto donde la modelo mira a la izquierda, pero no la de al lado\". Traducir esas descripciones a números de archivo RAW puede costar horas.",
    "psychologyP2": "Entregar una hoja de contactos indexada establece un contrato visual claro e inequívoco:",
    "psychologyBullets": [
      {
        "label": "Índices secuenciales",
        "text": "Numerar los fotogramas en orden (#01, #02, #03) da a los clientes una referencia sencilla para indicar sus favoritos sin tener que recordar nombres de archivo complejos."
      },
      {
        "label": "Metadatos técnicos a la vista",
        "text": "Mostrar ajustes de disparo (como ISO 3200 o 1/60s) aporta contexto inmediato durante sesiones de prueba y revisiones de iluminación."
      },
      {
        "label": "Comparación lado a lado de expresiones",
        "text": "Colocar tomas contiguas en ráfaga una junto a otra permite evaluar microexpresiones, ojos cerrados y cambios de postura al instante."
      }
    ],
    "cta": {
      "badge": "ESPACIO DE TRABAJO GRATUITO EN NAVEGADOR",
      "title": "¿Listo para crear tus hojas de contactos?",
      "text": "Procesa fotos ilimitadas sin subir nada a la nube. Genera PDF a 300 DPI listos para imprimir, personaliza márgenes y conserva los nombres de archivo localmente.",
      "btnPrimary": "Abrir creador de hojas de contactos",
      "btnSecondary": "Explorar 21 plantillas de diseño"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Respuestas prácticas sobre generación de hojas de prueba, tamaños de papel e integración con Lightroom.",
    "faqs": [
      {
        "question": "¿Cómo se hace una hoja de contactos en Lightroom frente a Make Contact Sheet?",
        "answer": "En Lightroom Classic, crear una hoja de contactos requiere ir al módulo Imprimir, configurar una plantilla a medida, ajustar márgenes y esperar a que el catálogo renderice en segundo plano. Make Contact Sheet elimina esa fricción: basta con arrastrar tus fotos al navegador para generar al instante un PDF a 300 DPI sin cuotas de suscripción."
      },
      {
        "question": "¿Cuál es la configuración de cuadrícula ideal para pruebas con clientes?",
        "answer": "Para sesiones comerciales o de retrato en papel A4 o Carta, una cuadrícula de 4 × 5 (20 fotos por página) o 3 × 4 (12 fotos por página) ofrece el equilibrio óptimo entre claridad de expresión y número total de páginas."
      },
      {
        "question": "¿Por qué es crucial conservar los nombres de archivo originales?",
        "answer": "Las aplicaciones comunes de collage suelen renombrar los archivos subidos a nombres genéricos o eliminar metadatos. Conservar los nombres de cámara exactos (_MG_8092.CR3, DSC_1042.ARW) permite localizar los archivos RAW originales al instante cuando el cliente solicita los retoques finales."
      },
      {
        "question": "¿Puedo generar hojas de contactos con fondos oscuros o personalizados?",
        "answer": "Sí. Make Contact Sheet incluye tonos oscuros de estudio (Studio Slate, Dark Chocolate, Truffle Noir) y fondos claros clásicos (Blanco Galería, Lino de Archivo, Crema). También puedes introducir cualquier código hexadecimal personalizado."
      },
      {
        "question": "¿Qué resolución debo usar al exportar para impresión física?",
        "answer": "Para imprimir en impresoras fotográficas o laboratorios, exporta siempre a 300 DPI. En A4 son 2480 × 3508 píxeles y en Carta 2550 × 3300 píxeles, garantizando nitidez perfecta en las miniaturas y tipografía impecable."
      },
      {
        "question": "¿Se suben las fotografías confidenciales de mis clientes a algún servidor?",
        "answer": "No. Make Contact Sheet se ejecuta al 100% de manera local en tu navegador con Canvas HTML5 y Web Workers. Tus imágenes, píxeles, nombres de archivo y metadatos jamás salen de tu ordenador ni tocan servidores en la nube."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Cómo hacer una hoja de contactos"
    }
  },
  "de": {
    "title": "Kontaktabzug erstellen — Schritt-für-Schritt-Anleitung für Fotografen",
    "description": "Erfahren Sie, wie Sie Kontaktabzüge mit kostenlosen Tools, Photoshop oder Lightroom erstellen. Schritt-für-Schritt-Anleitung mit druckfertigen 300-DPI-Beispielen.",
    "badge": "FOTO-WORKFLOW-LEITFADEN · 8 MIN LESEZEIT",
    "h1Pre": "Kontaktabzug erstellen: ",
    "h1Highlight": "Schritt-für-Schritt-Anleitung für Fotografen",
    "lead": "Erstellen Sie professionelle, hochdichte Kontaktabzüge und Proof-Bögen in Sekundenschnelle. Meistern Sie Rastermathematik, Papierformate, EXIF-Metadaten und reibungslose Kundenabstimmungen.",
    "quickAnswerLabel": "Kurzantwort / Definition",
    "quickAnswerText": "Ein Kontaktabzug (oder Proof-Bogen) ist ein strukturiertes Dokument, das Miniaturansichten in kalibrierten Zeilen und Spalten anordnet und originale Kamera-Dateinamen sowie Aufnahmedaten unter jedem Bild anzeigt. So erstellen Sie kostenlos einen Kontaktabzug ohne Software-Installation: Laden Sie Ihre Bilder in Make Contact Sheet, wählen Sie das Papierformat (A4 oder US Letter) und die Rasterdichte (z. B. 4 × 5 für 20 Bilder pro Seite), prüfen Sie die Auswahlen und exportieren Sie ein druckfertiges 300-DPI-PDF oder eine CSV-Namensliste.",
    "stepsHeading": "5 Schritte zum Erstellen eines professionellen Proof-Bogens",
    "stepsIntro": "Befolgen Sie dieses standardisierte Verfahren, um unbearbeitete Shootings in übersichtliche, kundenfertige Auswahldokumente zu verwandeln:",
    "steps": [
      {
        "name": "Fotostapel importieren und indexieren",
        "text": "Ziehen Sie Ihren Ordner oder Ihre Bildauswahl direkt in die Arbeitsfläche von Make Contact Sheet. Die lokale Engine indexiert alle Bildformate (JPEG, PNG, WebP, AVIF, HEIC) und RAW-Vorschauen sofort, ohne Daten an Cloud-Server zu senden."
      },
      {
        "name": "Papierformat und Rasterdichte wählen",
        "text": "Wählen Sie Ihr Zielseitenformat: ISO A4 (210 × 297 mm) für europäische Labore oder US Letter (8,5 × 11 Zoll) für Nordamerika. Konfigurieren Sie Zeilen und Spalten (z. B. 4 × 5 für 20 Bilder oder 6 × 6 für 36er-Kleinbildfilme)."
      },
      {
        "name": "Dateinamen und EXIF-Metadaten konfigurieren",
        "text": "Aktivieren Sie Dateinamenbeschriftungen mit verifizierbaren Kameranummern (z. B. DSC_4821.NEF) und fortlaufenden Indexnummern (#01, #02). Fügen Sie optional Belichtungsparameter (Verschlusszeit, Blende, ISO, Brennweite) hinzu."
      },
      {
        "name": "Schnelle Tastaturauswahl und Sortierung durchführen",
        "text": "Navigieren Sie mit Tastaturkürzeln durch Ihre Miniaturen: Drücken Sie 1 für Behalten (Keep), 2 für Markieren (Flag) und 3 für Ablehnen (Reject) unscharfer Aufnahmen direkt auf dem Leuchttisch."
      },
      {
        "name": "Kalibriertes 300-DPI-PDF oder Lightroom-Listen exportieren",
        "text": "Laden Sie druckfertige mehrseitige 300-DPI-PDFs mit individuellen Rändern herunter oder kopieren Sie eine kommagetrennte Liste der Dateinamen direkt in die Suchfilter von Lightroom oder Capture One."
      }
    ],
    "historyHeading": "Was ist die Geschichte des fotografischen Kontaktabzugs?",
    "historyP1": "Der Begriff Kontaktabzug stammt aus der analogen Dunkelkammerpraxis des 19. und 20. Jahrhunderts. Fotografen schnitten belichtete Kleinbild- oder Rollfilme in Streifen zu 4 bis 6 Bildern, legten sie mit der Emulsionsseite direkt auf Fotopapier in einen Glas-Kopierrahmen und schalteten das Vergrößerungslicht für eine kurze Testbelichtung ein. Da der Film in physischem Kontakt mit dem Papier stand, zeigte der Abzug eine exakte 1:1-Wiedergabe des gesamten Filmstreifens.",
    "historyP2": "Meisterfotografen wie Henri Cartier-Bresson, Richard Avedon und Annie Leibovitz nutzten Kontaktabzüge als intime visuelle Tagebücher. Der Bogen zeigte die Entwicklung des Motivs: wie der Fotograf das Licht abtastete, sich dem Subjekt näherte und den entscheidenden Moment festhielt. Rote Fettstiftmarkierungen dokumentierten die Auswahlentscheidungen vor der finalen Vergrößerung.",
    "historyP3": "Auch in der digitalen Ära bleibt der Kontaktabzug unverzichtbar: Er bietet einen hochdichten Gesamtüberblick über ein Shooting, den die sequenzielle Vollbildansicht einzelner Fotos nicht leisten kann.",
    "dpiHeading": "Welche DPI und Rastergröße sind für den Druck erforderlich?",
    "dpiP1": "Ein sauberer Kontaktabzug erfordert eine genaue Abstimmung von Seitenmaßen, Seitenverhältnissen und Druckrändern:",
    "table1Headers": {
      "format": "Standardformat",
      "size": "Physische Größe",
      "canvas": "Pixel-Leinwand bei 300 DPI",
      "grid": "Empfohlene Rasterdichte"
    },
    "table1Rows": [
      {
        "format": "ISO A4 (Hochformat)",
        "size": "210 × 297 mm",
        "canvas": "2480 × 3508 px",
        "grid": "4 × 5 (20 Bilder) oder 4 × 6 (24 Bilder)"
      },
      {
        "format": "US Letter (Hochformat)",
        "size": "8,5 × 11,0 Zoll",
        "canvas": "2550 × 3300 px",
        "grid": "4 × 5 (20 Bilder) oder 3 × 4 (12 Bilder)"
      },
      {
        "format": "16:9 Breitbild (Digital)",
        "size": "4K Ultra-HD-Display",
        "canvas": "3840 × 2160 px",
        "grid": "6 × 3 (18 Bilder) oder 8 × 4 (32 Bilder)"
      },
      {
        "format": "Mittelformat 120 (6×7)",
        "size": "A4 Querformat Proof",
        "canvas": "3508 × 2480 px",
        "grid": "5 × 2 (10er-Rollfilm-Simulation)"
      }
    ],
    "dpiP2": "Für den physischen Druck gilt 300 DPI als weltweiter Industriestandard. Bei geringerer Auflösung (z. B. 72 DPI) werden Dateinamen und Aufnahmedaten pixelig und unleserlich.",
    "compareHeading": "Wie schneidet Make Contact Sheet im Vergleich zu Photoshop und Lightroom ab?",
    "compareIntro": "Fotografen vergleichen bei der Erstellung von Kontaktabzügen meist drei Ansätze. Hier ist der technische Vergleich:",
    "table2Headers": {
      "criteria": "Bewertungskriterium",
      "tool": "Make Contact Sheet",
      "lightroom": "Lightroom Classic",
      "photoshop": "Photoshop (Kontaktabzug II)"
    },
    "table2Rows": [
      {
        "criteria": "Einrichtung & Installation",
        "tool": "Sofort (0 Installation, Browser)",
        "lightroom": "Schwere Desktop-Anwendung",
        "photoshop": "Schwere Desktop-Anwendung"
      },
      {
        "criteria": "Katalog-Import vorausgesetzt",
        "tool": "Keiner (Direkter Ordner-Drop)",
        "lightroom": "Katalogimport zwingend",
        "photoshop": "Keiner (Stapelverarbeitungsscript)"
      },
      {
        "criteria": "Stapelverarbeitungsgeschwindigkeit",
        "tool": "Echtzeit mit Web Workern",
        "lightroom": "Langsame Hintergrundverarbeitung",
        "photoshop": "Langsame Single-Thread-Automatisierung"
      },
      {
        "criteria": "Kunden-Auswahl-Tastenkürzel",
        "tool": "Integriert (1 Behalten, 2 Flagge, 3 Ablehnen)",
        "lightroom": "Erfordert Wechsel zum Bibliotheksmodul",
        "photoshop": "Keine (statisches Rendering)"
      },
      {
        "criteria": "Kosten & Lizenzierung",
        "tool": "100% Kostenlos & Open",
        "lightroom": "Ab 19,99 €/Monat Creative Cloud",
        "photoshop": "Ab 20,99 €/Monat Creative Cloud"
      }
    ],
    "psychologyHeading": "Auswahlpsychologie mit Kunden: Engpässe vermeiden",
    "psychologyP1": "Wer Kunden lose JPEG-Ordner schickt, erntet vages Feedback: \"Uns gefällt das dritte Bild in der zweiten Reihe, aber nicht das daneben.\" Das Zuordnen dieser Beschreibungen zu RAW-Dateien kostet wertvolle Arbeitszeit.",
    "psychologyP2": "Ein nummerierter Kontaktabzug schafft eine eindeutige visuelle Grundlage:",
    "psychologyBullets": [
      {
        "label": "Fortlaufende Indexnummern",
        "text": "Klare Ziffern (#01, #02, #03) ermöglichen es Kunden, Favoriten ohne komplizierte Dateinamen zu nennen."
      },
      {
        "label": "Sichtbare Aufnahmedaten",
        "text": "Eingeblendete Belichtungswerte (z. B. ISO 3200 oder 1/60s) bieten sofortigen Kontext bei Beleuchtungstests."
      },
      {
        "label": "Direkter Gesichtsausdruck-Vergleich",
        "text": "Nebeneinander liegende Serienbilder erleichtern das Erkennen von Blinzeln und feinen Nuancen."
      }
    ],
    "cta": {
      "badge": "KOSTENLOSES BROWSER-STUDIO",
      "title": "Bereit für Ihre Kontaktabzüge?",
      "text": "Verarbeiten Sie unbegrenzt viele Fotos ohne Cloud-Upload. Erstellen Sie druckfertige 300-DPI-PDFs, passen Sie Ränder an und behalten Sie Dateinamen lokal bei.",
      "btnPrimary": "Kontaktabzug-Studio öffnen",
      "btnSecondary": "21 Layout-Vorlagen ansehen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Praxisnahe Antworten zu Kontaktabzügen, Druckauflösungen und der Integration in Lightroom.",
    "faqs": [
      {
        "question": "Wie erstelle ich einen Kontaktabzug in Lightroom im Vergleich zu Make Contact Sheet?",
        "answer": "In Lightroom Classic muss man das Druckmodul aufrufen, ein Vorlagenlayout anpassen und auf die Hintergrundverarbeitung warten. Make Contact Sheet spart diesen Aufwand: Ordner einfach in den Browser ziehen und sofort ein druckfertiges 300-DPI-PDF erstellen."
      },
      {
        "question": "Welches Raster ist für Kunden-Proofs am besten geeignet?",
        "answer": "Auf A4 oder US Letter hat sich ein 4 × 5-Raster (20 Fotos) oder 3 × 4-Raster (12 Fotos) bewährt, da es Gesichter und Schärfe ohne Lupe gut erkennbar macht."
      },
      {
        "question": "Warum ist die Beibehaltung der originalen Dateinamen so wichtig?",
        "answer": "Kollagen-Apps benennen Dateien oft um oder löschen EXIF-Daten. Wenn Sie die Originalnamen (_MG_8092.CR3, DSC_1042.ARW) beibehalten, finden Sie die gewünschten RAWs im Archiv sofort wieder."
      },
      {
        "question": "Kann ich dunkle oder individuelle Hintergrundfarben wählen?",
        "answer": "Ja. Make Contact Sheet bietet Studio-Dunkeltöne (Slate, Dark Chocolate, Truffle Noir) sowie Galerie-Weiß und Creme. Eigene Hex-Farbcodes sind ebenfalls möglich."
      },
      {
        "question": "Welche Auflösung brauche ich für den Ausdruck?",
        "answer": "Für den Druck sollten Sie immer 300 DPI wählen. Bei A4 entspricht dies 2480 × 3508 Pixeln und gewährleistet gestochen scharfe Dateinamen und Miniaturen."
      },
      {
        "question": "Werden Kundenfotos auf externe Server hochgeladen?",
        "answer": "Nein. Make Contact Sheet arbeitet zu 100 % lokal in Ihrem Browser via HTML5 Canvas und Web Workers. Keine Datei verlässt Ihr Gerät."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Kontaktabzug erstellen"
    }
  },
  "fr": {
    "title": "Comment faire une planche contact — Guide pas à pas pour photographes",
    "description": "Apprenez à créer une planche contact avec des outils gratuits, Photoshop ou Lightroom. Tutoriel complet avec modèles imprimables en 300 DPI.",
    "badge": "GUIDE DE FLUX DE TRAVAIL · 8 MIN DE LECTURE",
    "h1Pre": "Comment faire une planche contact : ",
    "h1Highlight": "Guide pas à pas pour photographes",
    "lead": "Générez des planches contact haute densité et des épreuves professionnelles en quelques secondes. Maîtrisez les dimensions de papier, les métadonnées EXIF et la sélection client sans friction.",
    "quickAnswerLabel": "Réponse rapide / Définition",
    "quickAnswerText": "Une planche contact (ou feuille d'épreuve) est un document ordonné agençant des vignettes de photos en rangées et colonnes calibrées, avec les noms de fichiers et paramètres de prise de vue sous chaque image. Pour en créer une gratuitement sans logiciel : glissez vos photos dans Make Contact Sheet, choisissez le format (A4 ou Lettre US) et la grille (ex. 4 × 5 pour 20 photos par page), triez vos images et exportez un PDF 300 DPI ou une liste de noms CSV.",
    "stepsHeading": "5 étapes pour créer une planche contact professionnelle",
    "stepsIntro": "Suivez cette méthode standardisée pour transformer vos séries de prises de vue en documents de sélection clairs et prêts pour vos clients :",
    "steps": [
      {
        "name": "Importer et indexer vos photos",
        "text": "Glissez votre dossier ou sélection d'images dans l'espace de travail. Le moteur local indexe instantanément les formats matriciels (JPEG, PNG, WebP, AVIF, HEIC) et les prévisualisations RAW sans envoyer le moindre octet sur le cloud."
      },
      {
        "name": "Choisir le format de page et la grille",
        "text": "Sélectionnez votre standard de page : ISO A4 (210 × 297 mm) ou Lettre US (8,5 × 11 pouces). Définissez le nombre de colonnes et de rangées (ex. 4 × 5 pour 20 images ou 6 × 6 pour une pellicule 36 poses)."
      },
      {
        "name": "Configurer les noms de fichiers et métadonnées EXIF",
        "text": "Affichez les identifiants d'appareil (ex. DSC_4821.NEF) et des numéros d'index (#01, #02). Activez au besoin les métadonnées techniques EXIF (vitesse, ouverture, ISO et focale sous chaque cadre)."
      },
      {
        "name": "Trier rapidement vos photos au clavier",
        "text": "Parcourez vos vignettes avec des raccourcis clavier : 1 pour Conserver (Keep), 2 pour Signaler (Flag) et 3 pour Rejeter (Reject) les photos floues directement sur la table lumineuse."
      },
      {
        "name": "Exporter un PDF 300 DPI ou une liste pour Lightroom",
        "text": "Ouvrez le volet d'export pour télécharger un document PDF multipage prêt à l'impression à 300 DPI avec en-têtes personnalisés, ou copiez la liste de noms pour la coller dans Lightroom ou Capture One."
      }
    ],
    "historyHeading": "Quelle est l'histoire de la planche contact photographique ?",
    "historyP1": "L'expression planche contact provient du laboratoire argentique des XIXe et XXe siècles. Les photographes découpaient leurs films 35 mm ou 120 en bandes de 4 à 6 poses, les posaient directement émulsion contre émulsion sur une feuille de papier gélatino-argentique sous verre, puis allumaient l'agrandisseur pour une brève exposition. Le contact direct produisait une reproduction optique fidèle à l'échelle 1:1 de toute la pellicule.",
    "historyP2": "Des maîtres de la photographie comme Henri Cartier-Bresson, Richard Avedon et Annie Leibovitz considéraient la planche contact comme un journal intime de création. Elle montrait la réflexion du photographe : l'exploration du sujet, les variations d'angle et de lumière, jusqu'à l'instant décisif. Les marques au crayon gras rouge guidaient ensuite les tirages finaux.",
    "historyP3": "Avec le numérique, bien que les capteurs aient remplacé la chimie, la planche contact demeure fondamentale : elle offre une vue d'ensemble panoramique et dense qu'aucune consultation d'images isolées en plein écran ne peut remplacer.",
    "dpiHeading": "Quelle résolution DPI et quelle grille choisir pour l'impression ?",
    "dpiP1": "La réussite d'une planche contact repose sur le calcul rigoureux des dimensions de page, ratios et marges imprimables :",
    "table1Headers": {
      "format": "Format standard",
      "size": "Taille physique",
      "canvas": "Définition en pixels à 300 DPI",
      "grid": "Grille recommandée"
    },
    "table1Rows": [
      {
        "format": "ISO A4 (Portrait)",
        "size": "210 × 297 mm",
        "canvas": "2480 × 3508 px",
        "grid": "4 × 5 (20 photos) ou 4 × 6 (24 photos)"
      },
      {
        "format": "Lettre US (Portrait)",
        "size": "8,5 × 11,0 pouces",
        "canvas": "2550 × 3300 px",
        "grid": "4 × 5 (20 photos) ou 3 × 4 (12 photos)"
      },
      {
        "format": "16:9 Panoramique (Écran)",
        "size": "Écran 4K Ultra HD",
        "canvas": "3840 × 2160 px",
        "grid": "6 × 3 (18 photos) ou 8 × 4 (32 photos)"
      },
      {
        "format": "Moyen format 120 (6×7)",
        "size": "A4 Paysage",
        "canvas": "3508 × 2480 px",
        "grid": "5 × 2 (simulation rouleau 10 poses)"
      }
    ],
    "dpiP2": "Pour l'impression physique d'épreuves, 300 DPI est la norme de référence. Une résolution inférieure (comme 72 DPI) rend les noms de fichiers et données EXIF pixelisés et illisibles.",
    "compareHeading": "Comment Make Contact Sheet se compare-t-il à Photoshop et Lightroom ?",
    "compareIntro": "Pour produire leurs planches d'épreuves, les photographes comparent généralement trois options :",
    "table2Headers": {
      "criteria": "Critère d'évaluation",
      "tool": "Make Contact Sheet",
      "lightroom": "Lightroom Classic",
      "photoshop": "Photoshop (Planche contact II)"
    },
    "table2Rows": [
      {
        "criteria": "Installation et configuration",
        "tool": "Immédiat (0 installation, navigateur)",
        "lightroom": "Application de bureau lourde",
        "photoshop": "Application de bureau lourde"
      },
      {
        "criteria": "Import catalogue obligatoire",
        "tool": "Aucun (glisser-déposer direct)",
        "lightroom": "Import obligatoire dans le catalogue",
        "photoshop": "Aucun (script de dossier)"
      },
      {
        "criteria": "Rapidité de traitement par lot",
        "tool": "Temps réel avec Web Workers",
        "lightroom": "Traitement d'arrière-plan lent",
        "photoshop": "Automatisation monothread lente"
      },
      {
        "criteria": "Raccourcis de sélection client",
        "tool": "Intégrés (1 Conserver, 2 Signaler, 3 Rejeter)",
        "lightroom": "Nécessite le module Bibliothèque",
        "photoshop": "Aucun (rendu statique)"
      },
      {
        "criteria": "Tarification et abonnement",
        "tool": "100% Gratuit et ouvert",
        "lightroom": "19,99+ €/mois Creative Cloud",
        "photoshop": "20,99+ €/mois Creative Cloud"
      }
    ],
    "psychologyHeading": "Psychologie du tri client : lever les blocages de sélection",
    "psychologyP1": "Envoyer un dossier d'images JPEG en vrac à un client commercial ou à de jeunes mariés engendre des retours imprécis : \"On aime bien la troisième photo de la deuxième rangée, mais pas celle d'à côté\". Retrouver ces clichés dans vos fichiers RAW peut vous faire perdre des heures.",
    "psychologyP2": "Une planche contact numérotée instaure un repère visuel clair et sans équivoque :",
    "psychologyBullets": [
      {
        "label": "Numérotation séquentielle claire",
        "text": "Associer un numéro séquentiel (#01, #02, #03) permet au client de désigner ses favoris sans manipuler de noms de fichiers compliqués."
      },
      {
        "label": "Métadonnées de prise de vue visibles",
        "text": "Afficher les réglages boîtier (ISO 3200, 1/60s) apporte un contexte technique précieux lors des séances d'essais."
      },
      {
        "label": "Comparaison directe des expressions",
        "text": "L'affichage côte à côte des rafales permet de repérer immédiatement un cillement d'yeux ou une nuance de posture."
      }
    ],
    "cta": {
      "badge": "STUDIO GRATUIT DANS VOTRE NAVIGATEUR",
      "title": "Prêt à créer vos planches contact ?",
      "text": "Traitez un nombre illimité de photos sans chargement cloud. Générez des PDF 300 DPI prêts à l'impression et préservez vos noms de fichiers localement.",
      "btnPrimary": "Lancer l'outil Planche Contact",
      "btnSecondary": "Explorer les 21 modèles"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Réponses utiles sur la création de planches contact, les formats papier et l'intégration Lightroom.",
    "faqs": [
      {
        "question": "Comment créer une planche contact dans Lightroom par rapport à Make Contact Sheet ?",
        "answer": "Dans Lightroom Classic, il faut ouvrir le module Impression, configurer une disposition sur mesure et attendre le rendu en arrière-plan. Make Contact Sheet élimine ces contraintes : glissez vos images dans le navigateur pour obtenir un PDF 300 DPI sans abonnement."
      },
      {
        "question": "Quelle est la meilleure grille pour les épreuves client ?",
        "answer": "Sur papier A4 ou Lettre US, une disposition 4 × 5 (20 photos) ou 3 × 4 (12 photos) offre le compromis parfait entre lisibilité des visages et nombre de pages."
      },
      {
        "question": "Pourquoi est-il crucial de préserver les noms de fichiers originaux ?",
        "answer": "Les générateurs de collages grand public renomment souvent les fichiers ou effacent les métadonnées. Préserver les noms originaux (_MG_8092.CR3, DSC_1042.ARW) permet de retrouver immédiatement vos fichiers RAW dans votre logiciel d'édition."
      },
      {
        "question": "Peut-on choisir un arrière-plan sombre ou personnalisé ?",
        "answer": "Oui. Make Contact Sheet propose des teintes sombres de studio (Slate, Dark Chocolate, Truffle Noir) ainsi que Blanc Galerie et Crème. Les codes hexadécimaux personnalisés sont également acceptés."
      },
      {
        "question": "Quelle résolution employer pour un tirage papier ?",
        "answer": "Pour une impression physique de qualité, exportez toujours à 300 DPI (2480 × 3508 px en A4). Les vignettes et les noms de fichiers resteront d'une netteté parfaite."
      },
      {
        "question": "Les photos de mes clients sont-elles transmises à un serveur externe ?",
        "answer": "Non. Make Contact Sheet fonctionne à 100 % en local dans votre navigateur grâce à Canvas HTML5 et aux Web Workers. Vos fichiers et métadonnées restent sur votre ordinateur."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Créer une planche contact"
    }
  },
  "ja": {
    "title": "コンタクトシート（ベタ焼き）の作り方 — 写真家向け実践ガイド",
    "description": "無料ツール、Photoshop、Lightroomを使用した写真コンタクトシートの作成手順。300 DPI印刷対応のグリッド計算と実践ガイド。",
    "badge": "写真ワークフローガイド · 読了目安 8分",
    "h1Pre": "コンタクトシートの作り方：",
    "h1Highlight": "写真家向け実践ステップバイステップガイド",
    "lead": "プロ品質の高密度コンタクトシート（ベタ焼き）とプルーフパッケージを数秒で作成。グリッド計算、用紙規格、EXIFメタデータ表示、効率的なクライアント選定をマスターしましょう。",
    "quickAnswerLabel": "クイック回答 / 概要定義",
    "quickAnswerText": "写真のコンタクトシート（ベタ焼き・プルーフシート）とは、サムネイル画像を規則正しい行と列に配置し、元ファイル名や撮影メタデータを各コマの下に明記した一覧ドキュメントです。ソフトウェアをインストールせずに無料で作成するには：Make Contact Sheetに写真をドロップし、用紙サイズ（A4またはUSレター）とグリッド密度（例：1ページあたり20枚の4×5）を選択し、選定を行って300 DPIのマルチページPDFまたはCSVリストを書き出します。",
    "stepsHeading": "プロ仕様のプルーフシートを作成する5つの手順",
    "stepsIntro": "撮影した大量のRAW・JPEGデータを整理し、クライアントへ納品可能な選定用シートへと仕上げる標準スタジオ手順です：",
    "steps": [
      {
        "name": "写真バッチの取り込みとインデックス化",
        "text": "画像フォルダまたは選択したファイルをMake Contact Sheetのワークスペースに直接ドラッグ＆ドロップします。クラウドへ送信することなく、主要画像形式（JPEG、PNG、WebP、AVIF、HEIC）やRAWプレビューをブラウザ内で瞬時に処理します。"
      },
      {
        "name": "用紙規格とグリッド密度の選択",
        "text": "用途に応じた用紙規格（ISO A4：210×297mm、または北米向けUSレター：8.5×11インチ）を選択します。コマ確認のしやすさと総ページ数のバランスを考慮し、列数と行数（4×5で20コマ、または36枚撮りフィルム用の6×6など）を設定します。"
      },
      {
        "name": "ファイル名およびEXIFメタデータの表示設定",
        "text": "カメラの正確なファイル名（例：DSC_4821.NEF）と通し番号バッジ（#01、#02）を表示します。必要に応じてシャッタースピード、絞り値、ISO感度、焦点距離などの技術情報を各コマの下に追加できます。"
      },
      {
        "name": "キーボードショートカットによる高速写真選別",
        "text": "ショートカットキーを使用して効率的に選定：1キーで「キープ」、2キーで「要検討（フラグ）」、3キーでピンボケ写真の「除外」をインタラクティブなライトテーブル上で行えます。"
      },
      {
        "name": "高精細300 DPI PDFまたはLightroom用リストの書き出し",
        "text": "エクスポートドロワーを開き、余白やヘッダーを整えた印刷用300 DPIマルチページPDFをダウンロードするか、カンマ区切りのファイル名リストをコピーしてLightroomやCapture Oneの検索フィルターに直接貼り付けます。"
      }
    ],
    "historyHeading": "写真コンタクトシート（ベタ焼き）の歴史とは？",
    "historyP1": "コンタクトシートという名称は、19世紀から20世紀にかけてのアナログ暗室技法に由来します。写真家は35mmや120中判フィルムを4〜6コマずつのストリップに切り分け、ガラス製プリンティングフレームの中で印画紙の乳剤面に直接重ね合わせ（コンタクトさせ）、引き伸ばし機の光を短時間当てて露光しました。ネガフィルムが印画紙に直接密着していたため、ロール全体の1:1等倍プリントが得られました。",
    "historyP2": "アンリ・カルティエ＝ブレッソン、リチャード・アヴェドン、アニー・リーボヴィッツといった巨匠たちは、コンタクトシートを思考プロセスの記録として重視しました。写真家がどのように被写体に迫り、光を観察し、決定的瞬間を捉えたかが克明に記録されていたためです。最終引き伸ばしプリントを作成する前に、赤いダーマトグラフ（油性色鉛筆）で枠を引いて選定を行っていました。",
    "historyP3": "現代のデジタル撮影において薬品による現像はセンサーとピクセルに置き換わりましたが、コンタクトシートの価値は変わりません。個別写真を全画面で1枚ずつめくるだけでは得られない、撮影全体の鳥瞰的かつ高密度な視界を提供します。",
    "dpiHeading": "印刷に必要なDPIと推奨グリッドサイズは？",
    "dpiP1": "印刷時に文字やディテールが潰れない高品質なシートを作成するための標準仕様です：",
    "table1Headers": {
      "format": "標準フォーマット",
      "size": "実寸法",
      "canvas": "300 DPI時のピクセル数",
      "grid": "推奨グリッド構成"
    },
    "table1Rows": [
      {
        "format": "ISO A4（縦）",
        "size": "210 × 297 mm",
        "canvas": "2480 × 3508 px",
        "grid": "4 × 5（20枚）または 4 × 6（24枚）"
      },
      {
        "format": "USレター（縦）",
        "size": "8.5 × 11.0 インチ",
        "canvas": "2550 × 3300 px",
        "grid": "4 × 5（20枚）または 3 × 4（12枚）"
      },
      {
        "format": "16:9 ワイド（デジタル）",
        "size": "4K Ultra HD ディスプレイ",
        "canvas": "3840 × 2160 px",
        "grid": "6 × 3（18枚）または 8 × 4（32枚）"
      },
      {
        "format": "120 中判（6×7）",
        "size": "A4 横向きプルーフ",
        "canvas": "3508 × 2480 px",
        "grid": "5 × 2（10コマ ロール再現）"
      }
    ],
    "dpiP2": "写真プリントの品質を保つには300 DPIが標準です。72 DPIなどの低解像度では、ファイル名やカメラ設定の微細な文字がジャギーを起こして判読できなくなります。",
    "compareHeading": "Make Contact SheetとPhotoshop・Lightroomの比較",
    "compareIntro": "写真制作現場におけるプルーフ作成ツールの比較分析です：",
    "table2Headers": {
      "criteria": "比較項目",
      "tool": "Make Contact Sheet",
      "lightroom": "Lightroom Classic",
      "photoshop": "Photoshop（コンタクトシート II）"
    },
    "table2Rows": [
      {
        "criteria": "導入とセットアップ",
        "tool": "即時利用（インストール不要、ブラウザ完結）",
        "lightroom": "重量級デスクトップアプリのインストール",
        "photoshop": "重量級デスクトップアプリのインストール"
      },
      {
        "criteria": "カタログの事前読み込み",
        "tool": "不要（フォルダを直接ドロップ）",
        "lightroom": "カタログへの事前インポートが必須",
        "photoshop": "不要（バッチスクリプト処理）"
      },
      {
        "criteria": "バッチ処理速度",
        "tool": "Web Workerによるリアルタイム並列処理",
        "lightroom": "バックグラウンドのスプール待ちが発生",
        "photoshop": "単一スレッドの低速自動処理"
      },
      {
        "criteria": "クライアント選定ショートカット",
        "tool": "標準搭載（1キープ、2フラグ、3除外）",
        "lightroom": "ライブラリモジュールへの切り替えが必要",
        "photoshop": "なし（静止画像レンダリングのみ）"
      },
      {
        "criteria": "利用料金とサブスクリプション",
        "tool": "完全無料・登録不要",
        "lightroom": "Creative Cloud月額課金",
        "photoshop": "Creative Cloud月額課金"
      }
    ],
    "psychologyHeading": "クライアント選定の心理学：曖昧な指示の排除",
    "psychologyP1": "クライアントに番号のないバラバラの画像フォルダを送ると、「2列目の3番目、モデルが左を向いている写真が好きです」といった曖昧な指示が返ってきがちです。これらをRAWファイル名と照合する作業は大きなロスとなります。",
    "psychologyP2": "整理されたコンタクトシートは明確な共通認識をもたらします：",
    "psychologyBullets": [
      {
        "label": "通し番号による指示の明確化",
        "text": "「#04と#12を現像してください」と伝えるだけで、複雑なファイル名を意識せず確実に意図が伝わります。"
      },
      {
        "label": "撮影データの可視化",
        "text": "感度やシャッター速度を併記することで、テスト撮影やライティング確認が迅速に行えます。"
      },
      {
        "label": "並列比較による表情の見極め",
        "text": "連写カットを隣り合わせで配置することで、目つぶりや微細な表情の違いを一目で比較できます。"
      }
    ],
    "cta": {
      "badge": "完全無料・ブラウザ完結型スタジオ",
      "title": "今すぐコンタクトシートを作成しませんか？",
      "text": "クラウドへの写真アップロードなし。枚数無制限で300 DPI印刷用PDFを作成し、ファイル名を正確に維持します。",
      "btnPrimary": "コンタクトシート作成を開く",
      "btnSecondary": "21種類のプリセットを見る"
    },
    "faqHeading": "よくある質問",
    "faqSub": "コンタクトシート作成、印刷解像度、Lightroom連携に関する実用的な回答です。",
    "faqs": [
      {
        "question": "LightroomとMake Contact Sheetの違いは何ですか？",
        "answer": "Lightroom Classicでは現像モジュールからプリントモジュールへ移動し、カタログを介してレンダリングを待つ必要があります。Make Contact Sheetは画像をブラウザにドロップするだけで、即座に300 DPIのPDFを出力できます。"
      },
      {
        "question": "クライアント確認に最適なグリッド構成は？",
        "answer": "A4またはUSレター用紙の場合、4×5（20枚）または3×4（12枚）が最適です。拡大鏡を使わずに表情やピントを確認できる十分なサイズが確保できます。"
      },
      {
        "question": "カメラのオリジナルファイル名を維持すべき理由は？",
        "answer": "一般的なコラージュアプリはファイル名を連番に変換してしまいます。オリジナルのファイル名（_MG_8092.CR3など）を残すことで、レタッチ依頼を受けた際に元のRAWマスターを即座に特定できます。"
      },
      {
        "question": "黒背景やカスタムカラーのシートは作成できますか？",
        "answer": "はい。スタジオダーク、クラシックホワイト、リネン調のほか、任意の16進数カラーコード（HEX）を指定して用紙背景や文字色を自由に設定できます。"
      },
      {
        "question": "印刷に適した解像度は？",
        "answer": "用紙プリント用には必ず300 DPIで出力してください。A4サイズなら2480×3508ピクセルとなり、サムネイルもファイル名も鮮明に仕上がります。"
      },
      {
        "question": "写真データが外部サーバーにアップロードされる心配はありませんか？",
        "answer": "一切ありません。Make Contact SheetはHTML5 CanvasとWeb Workersを利用して100%お使いの端末ローカルで動作します。写真やメタデータが外部に送信されることはありません。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "コンタクトシートの作り方"
    }
  },
  "pt": {
    "title": "Como fazer uma folha de contato — Guia passo a passo para fotógrafos",
    "description": "Aprenda a criar folhas de contato com ferramentas gratuitas, Photoshop ou Lightroom. Tutorial completo com modelos imprimíveis em 300 DPI.",
    "badge": "GUIA DE FLUXO DE TRABALHO · 8 MIN DE LEITURA",
    "h1Pre": "Como fazer uma folha de contato: ",
    "h1Highlight": "Guia passo a passo para fotógrafos",
    "lead": "Gere folhas de contato profissionais e pacotes de provas fotográficas em segundos. Domine dimensões de papel, metadados EXIF e seleções de clientes sem atrito.",
    "quickAnswerLabel": "Resposta rápida / Definição resumida",
    "quickAnswerText": "Uma folha de contato (ou folha de prova) é um documento estruturado que organiza miniaturas fotográficas em linhas e colunas calibradas, exibindo nomes de arquivo originais e dados técnicos sob cada foto. Para criar uma gratuitamente sem instalar programas: arraste suas fotos para o Make Contact Sheet, escolha o formato (A4 ou Carta) e a grade (ex.: 4 × 5 para 20 fotos por página), faça sua seleção e exporte um PDF em 300 DPI ou uma lista CSV.",
    "stepsHeading": "5 passos para criar uma folha de contato profissional",
    "stepsIntro": "Siga este procedimento padronizado de estúdio para converter suas fotos em documentos de revisão claros e prontos para entrega:",
    "steps": [
      {
        "name": "Importar e indexar o lote de fotos",
        "text": "Arraste sua pasta ou seleção de imagens para a área de trabalho. O motor local processa formatos matriciais (JPEG, PNG, WebP, AVIF, HEIC) e prévias RAW instantaneamente, sem enviar dados para a nuvem."
      },
      {
        "name": "Definir tamanho de papel e densidade de grade",
        "text": "Selecione o formato de página desejado: ISO A4 (210 × 297 mm) ou Carta (8,5 × 11 pol.). Configure linhas e colunas (como 4 × 5 para 20 fotos ou 6 × 6 para rolos de filme de 36 poses)."
      },
      {
        "name": "Configurar nomes de arquivo e dados EXIF",
        "text": "Ative os rótulos de nomes para exibir identificadores exatos da câmera (ex.: DSC_4821.NEF) e números sequenciais (#01, #02). Opcionalmente, inclua dados técnicos EXIF (velocidade, abertura, ISO e distância focal)."
      },
      {
        "name": "Triagem e seleção rápida pelo teclado",
        "text": "Navegue pelas miniaturas com atalhos de teclado: tecle 1 para Manter (Keep), 2 para Destacar (Flag) e 3 para Rejeitar (Reject) fotos desfocadas diretamente na mesa de luz."
      },
      {
        "name": "Exportar PDF em 300 DPI ou listas para o Lightroom",
        "text": "Abra o painel de exportação para baixar um PDF multipágina para impressão em 300 DPI com margens personalizadas ou copie a lista de nomes para colar nos filtros do Lightroom ou Capture One."
      }
    ],
    "historyHeading": "Qual é a história da folha de contato fotográfica?",
    "historyP1": "O termo folha de contato nasceu nos laboratórios de câmara escura dos séculos XIX e XX. Os fotógrafos cortavam filmes 35 mm ou 120 em tiras de 4 a 6 fotogramas, colocavam-nos diretamente com a emulsão contra uma folha de papel fotográfico dentro de um chassi de vidro e acendiam a luz do ampliador. Por haver contato físico direto, a cópia positiva exibia uma reprodução óptica exata em escala 1:1 de todo o filme.",
    "historyP2": "Grandes nomes como Henri Cartier-Bresson, Richard Avedon e Annie Leibovitz viam nas folhas de contato um diário visual de seu processo criativo. A folha revelava a linha de raciocínio do fotógrafo: a aproximação do tema, as variações de luz e o instante decisivo. Traços com lápis dermatográfico vermelho registravam as escolhas antes da ampliação final.",
    "historyP3": "Na fotografia digital, mesmo com a substituição da química por sensores e pixels, a necessidade da folha de contato permanece: ela oferece uma visão panorâmica e compacta que a navegação individual em tela cheia não consegue proporcionar.",
    "dpiHeading": "Qual DPI e tamanho de grade são necessários para impressão?",
    "dpiP1": "Uma boa folha de contato exige o cálculo correto de proporções de aspecto, dimensões de página e margens para impressão nítida:",
    "table1Headers": {
      "format": "Formato padrão",
      "size": "Tamanho físico",
      "canvas": "Definição em pixels a 300 DPI",
      "grid": "Densidade de grade recomendada"
    },
    "table1Rows": [
      {
        "format": "ISO A4 (Retrato)",
        "size": "210 × 297 mm",
        "canvas": "2480 × 3508 px",
        "grid": "4 × 5 (20 fotos) ou 4 × 6 (24 fotos)"
      },
      {
        "format": "Carta (Retrato)",
        "size": "8,5 × 11,0 pol.",
        "canvas": "2550 × 3300 px",
        "grid": "4 × 5 (20 fotos) ou 3 × 4 (12 fotos)"
      },
      {
        "format": "Widescreen 16:9 (Digital)",
        "size": "Monitor 4K Ultra HD",
        "canvas": "3840 × 2160 px",
        "grid": "6 × 3 (18 fotos) ou 8 × 4 (32 fotos)"
      },
      {
        "format": "Médio formato 120 (6×7)",
        "size": "A4 Paisagem",
        "canvas": "3508 × 2480 px",
        "grid": "5 × 2 (simulação de filme de 10 poses)"
      }
    ],
    "dpiP2": "Para impressão física, 300 DPI é o padrão da indústria. Em resoluções menores (como 72 DPI), o texto dos nomes de arquivos e dados EXIF fica ilegível e borrado.",
    "compareHeading": "Como o Make Contact Sheet se compara ao Photoshop e Lightroom?",
    "compareIntro": "Ao planejar o fluxo de revisão com clientes, os fotógrafos costumam avaliar três opções:",
    "table2Headers": {
      "criteria": "Critério de avaliação",
      "tool": "Make Contact Sheet",
      "lightroom": "Lightroom Classic",
      "photoshop": "Photoshop (Folha de contato II)"
    },
    "table2Rows": [
      {
        "criteria": "Instalação e configuração",
        "tool": "Instantâneo (0 instalação, no navegador)",
        "lightroom": "Programa de desktop pesado",
        "photoshop": "Programa de desktop pesado"
      },
      {
        "criteria": "Importação prévia de catálogo",
        "tool": "Nenhuma (arraste direto de pastas)",
        "lightroom": "Importação obrigatória para catálogo",
        "photoshop": "Nenhuma (script de pastas)"
      },
      {
        "criteria": "Velocidade de processamento",
        "tool": "Tempo real com Web Workers",
        "lightroom": "Fila lenta em segundo plano",
        "photoshop": "Automação lenta monothread"
      },
      {
        "criteria": "Atalhos de triagem de clientes",
        "tool": "Integrados (1 Manter, 2 Destacar, 3 Rejeitar)",
        "lightroom": "Requer alternar para o módulo Biblioteca",
        "photoshop": "Nenhum (renderização estática)"
      },
      {
        "criteria": "Custo e assinatura",
        "tool": "100% Gratuito e aberto",
        "lightroom": "Mensalidade Creative Cloud",
        "photoshop": "Mensalidade Creative Cloud"
      }
    ],
    "psychologyHeading": "Psicologia da seleção com clientes: eliminando ambiguidades",
    "psychologyP1": "Ao entregar arquivos soltos para clientes comerciais ou noivos de casamentos, o feedback costuma ser vago: \"Gostamos da terceira foto da segunda fileira, onde ela olha para o lado\". Localizar esses arquivos RAW a partir de descrições imprecisas custa muito tempo.",
    "psychologyP2": "Uma folha de contato indexada estabelece um acordo visual sem falhas:",
    "psychologyBullets": [
      {
        "label": "Índice sequencial numérico",
        "text": "Numerar os quadros (#01, #02, #03) permite aos clientes indicar seus favoritos com clareza imediata."
      },
      {
        "label": "Metadados visíveis",
        "text": "Apresentar as configurações (ISO 3200, 1/60s) dá suporte técnico em fotos de teste e sessões em estúdio."
      },
      {
        "label": "Comparação lado a lado",
        "text": "Colocar fotos em sequência contígua permite comparar microexpressões e piscadas de olhos rapidamente."
      }
    ],
    "cta": {
      "badge": "ESTÚDIO GRATUITO NO NAVEGADOR",
      "title": "Pronto para criar suas folhas de contato?",
      "text": "Processe fotos ilimitadas sem uploads na nuvem. Gere PDFs em 300 DPI para impressão e mantenha os nomes de arquivo originais localmente.",
      "btnPrimary": "Abrir criador de folhas de contato",
      "btnSecondary": "Explorar 21 modelos"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Respostas práticas sobre criação de folhas de prova, resolução para impressão e sincronização com o Lightroom.",
    "faqs": [
      {
        "question": "Qual a diferença entre fazer no Lightroom e no Make Contact Sheet?",
        "answer": "No Lightroom Classic, é preciso acessar o módulo Imprimir, configurar o modelo e esperar a renderização lenta do catálogo. O Make Contact Sheet elimina isso: basta arrastar as fotos para o navegador e exportar seu PDF em 300 DPI de graça."
      },
      {
        "question": "Qual é a melhor grade para aprovação com clientes?",
        "answer": "Em folhas A4 ou Carta, uma grade 4 × 5 (20 fotos) ou 3 × 4 (12 fotos) oferece o melhor equilíbrio entre tamanho de miniatura e número de páginas."
      },
      {
        "question": "Por que é fundamental preservar os nomes de arquivo da câmera?",
        "answer": "Ferramentas genéricas costumam renomear arquivos ao fazer upload. Preservar os nomes originais (_MG_8092.CR3, DSC_1042.ARW) garante que você localize os arquivos RAW originais sem adivinhações na hora de editar."
      },
      {
        "question": "Posso usar fundos escuros ou personalizados?",
        "answer": "Sim. O Make Contact Sheet oferece tons escuros (Studio Slate, Dark Chocolate, Truffle Noir) e claros (Branco Galeria, Linho e Creme). Você também pode inserir códigos hexadecimais próprios."
      },
      {
        "question": "Qual resolução devo utilizar para imprimir?",
        "answer": "Sempre exporte em 300 DPI para impressão física (2480 × 3508 px no A4). Isso garante nitidez impecável nos detalhes e nos textos de identificação."
      },
      {
        "question": "As fotos dos clientes são enviadas para algum servidor?",
        "answer": "Não. O Make Contact Sheet roda 100% no seu navegador com HTML5 Canvas e Web Workers. Nenhum arquivo ou dado sai do seu computador."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Como fazer folha de contato"
    }
  }
};

export const MOOD_BOARD_GUIDE_DATA: Record<Locale, MoodBoardGuideData> = {
  "en": {
    "title": "How to Make a Mood Board — Step-by-Step Guide",
    "description": "Step-by-step mood board tutorial for photoshoots, brand books, and lookbooks. Learn composition, color swatches, and 300 DPI print exports.",
    "badge": "CREATIVE DIRECTION GUIDE · 9 MIN READ",
    "h1Pre": "How to Make a Mood Board: ",
    "h1Highlight": "Step-by-Step Direction Guide",
    "lead": "Master the art of visual pre-production. Learn how to structure compelling mood boards, extract harmonized color swatches, formulate technical lighting directives, and export 300 DPI presentation decks.",
    "quickAnswerLabel": "Direct Answer / Methodology Summary",
    "quickAnswerText": "To make a professional mood board for photography or creative direction: establish a focused visual thesis, curate 4–8 high-impact reference images (hero framing, lighting, texture macros), extract a 3–5 swatch color palette with exact hex codes, annotate technical lighting and wardrobe directives using sticky notes, and export a calibrated 300 DPI PDF or lossless 4K PNG. In Make Contact Sheet, this entire process executes in your browser with magnetic snapping guides, zero account signups, and 100% local privacy.",
    "stepsHeading": "5 Steps to Build a Client-Ready Visual Mood Board",
    "stepsIntro": "Follow this structured pre-production workflow to align creative teams, agency clients, and on-set talent before production begins:",
    "steps": [
      {
        "name": "Define your creative concept and visual thesis",
        "text": "Clarify the narrative premise, emotional tone, and aesthetic direction before gathering imagery—whether planning an editorial fashion campaign, cinematic film lookbook, analog 35mm portrait series, or minimalist architectural study."
      },
      {
        "name": "Curate a disciplined set of reference photographs",
        "text": "Gather 4 to 8 high-impact reference images covering hero framing, lighting atmosphere, pose studies, and texture macros. Drag them into the Make Contact Sheet freeform canvas light-table."
      },
      {
        "name": "Extract and arrange a cohesive designer color palette",
        "text": "Add designer color swatch cards sampled from your core imagery. Label each swatch with exact hex color codes and descriptive tonal names to guide set design, lighting gels, wardrobe, and post-production color grading."
      },
      {
        "name": "Annotate actionable styling, lighting, and camera notes",
        "text": "Place stylist sticky notes or typographic directives detailing key technical instructions: key-to-fill light ratios, modifier selections (octabox vs beauty dish), hair/makeup specifications, and lens choices (e.g. 85mm f/1.4)."
      },
      {
        "name": "Export calibrated 300 DPI PDF or lossless PNG handoffs",
        "text": "Download a crisp 300 DPI multi-page PDF presentation or lossless 4K PNG. Optionally apply local PDF password protection before sharing with clients, models, stylists, and assistants to align the whole production crew prior to shoot day."
      }
    ],
    "strategyHeading": "Why are mood boards strategically important in commercial photography?",
    "strategyP1": "In high-stakes commercial photoshoots, film productions, and editorial lookbooks, verbal descriptions are notoriously prone to subjective misinterpretation. A client requesting a \"moody, warm, editorial portrait\" might envision soft golden hour sunlight with vintage anamorphic flare, while the photographer might envision dramatic low-key chiaroscuro with hard tungsten rim lighting.",
    "strategyP2": "A disciplined mood board bridges this linguistic gap. It acts as an unambiguous visual contract between all key stakeholders:",
    "strategyBullets": [
      {
        "label": "The Client & Art Director",
        "text": "Confirms brand alignment, narrative pacing, and product placement before committing budget."
      },
      {
        "label": "The Photographer & Gaffer",
        "text": "Sets concrete lighting ratios (e.g. 4:1 key-to-fill), modifier choices (parabolic umbrellas, fresnel spots), and camera angle perspectives."
      },
      {
        "label": "The Wardrobe & Prop Stylist",
        "text": "Establishes fabric textures, garment silhouettes, and color palettes that complement the backdrop rather than clash."
      },
      {
        "label": "Hair & Makeup Artists (HMUA)",
        "text": "Defines skin finish (matte vs dewy), lip tones, and hair styling references with photographic precision."
      }
    ],
    "elementsHeading": "What are the key elements of an effective editorial mood board?",
    "elementsIntro": "A high-craft mood board is not a random collage of Pinterest clippings. It follows a deliberate compositional architecture designed to guide the viewer's eye:",
    "elements": [
      {
        "tag": "Element 1",
        "title": "The Hero Anchor Frame",
        "text": "The largest photograph on the canvas (occupying ~40% of the visual weight). This image instantly establishes the primary mood, subject energy, and lighting style of the concept."
      },
      {
        "tag": "Element 2",
        "title": "Supporting Detail & Texture Callouts",
        "text": "2 to 4 complementary images displaying macro fabric weaves, jewelry accents, background textures, or pose variations that contextualize the hero frame."
      },
      {
        "tag": "Element 3",
        "title": "Designer Swatch Palette with Hex Values",
        "text": "A dedicated row of 3 to 5 color cards sampled directly from the scene. Displaying hex codes (e.g. #D97706, #261B17) gives set painters and stylists exact target colors."
      },
      {
        "tag": "Element 4",
        "title": "Technical Directives & Sticky Notes",
        "text": "Concise typographic notes specifying technical parameters: key light height, diffusion density, gel colors, lens focal lengths, and model direction notes."
      }
    ],
    "aspectRatioHeading": "Which canvas aspect ratio and resolution should I use for a mood board?",
    "aspectRatioIntro": "The medium through which your mood board is viewed dictates the optimal canvas aspect ratio and resolution:",
    "tableHeaders": {
      "ratio": "Aspect Ratio",
      "target": "Target Medium",
      "dimensions": "Recommended Dimensions",
      "useCase": "Best Use Case"
    },
    "tableRows": [
      {
        "ratio": "16:9 Widescreen",
        "target": "Monitors & TVs",
        "dimensions": "1920 × 1080 / 3840 × 2160",
        "useCase": "Agency client pitch decks & video treatments"
      },
      {
        "ratio": "9:16 Vertical",
        "target": "Smartphones & Social",
        "dimensions": "1080 × 1920 px",
        "useCase": "Mobile lookbooks, TikTok & IG Story mood guides"
      },
      {
        "ratio": "A4 / US Letter",
        "target": "Physical Print Handout",
        "dimensions": "2480 × 3508 px (300 DPI)",
        "useCase": "Laminated on-set lighting & styling reference sheets"
      },
      {
        "ratio": "1:1 Square",
        "target": "Portfolio & Feed",
        "dimensions": "2048 × 2048 px",
        "useCase": "Instagram grid aesthetic concepts & album artwork"
      }
    ],
    "cta": {
      "badge": "FREE IN-BROWSER WORKBENCH",
      "title": "Ready to Design Your Mood Board?",
      "text": "Create unconstrained visual boards with magnetic snapping, designer swatches, and password-protected 300 DPI PDF exports. 100% private in your browser.",
      "btnPrimary": "Launch Mood Board Studio",
      "btnSecondary": "Explore 10 Direction Presets"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Expert guidance on visual direction boards, color curation, and pre-production alignment.",
    "faqs": [
      {
        "question": "What is the primary purpose of a photography mood board in pre-production?",
        "answer": "A visual mood board serves as the central aesthetic contract for a creative production. It aligns photographers, models, art directors, wardrobe stylists, and hair/makeup artists on lighting ratios, color palettes, poses, and atmospheric tone before shooting begins, ensuring zero wasted time on set."
      },
      {
        "question": "What core elements must be included on a professional direction board?",
        "answer": "A comprehensive layout typically contains: 1–2 prominent hero anchor images, 2–4 supporting detail/texture shots, a 3–5 swatch color palette with hex values, technical lighting notes (key-to-fill ratios, modifier types), hair and makeup directives, and camera/film stock notes."
      },
      {
        "question": "How do I choose the right canvas aspect ratio for client presentations?",
        "answer": "Use 16:9 widescreen (1920 × 1080 or 3840 × 2160) for monitor pitches and iPad presentations, 4:3 for desktop slide decks, A4 or US Letter for physical print handouts on set, and 9:16 for vertical mobile lookbooks and Instagram story decks."
      },
      {
        "question": "Can I export password-protected PDF mood boards for confidential client work?",
        "answer": "Yes. Make Contact Sheet includes a client-side encryption engine that allows you to set secure user passwords for exported PDF mood boards directly in your browser without uploading files to third-party servers."
      },
      {
        "question": "How does Make Contact Sheet differ from Pinterest or generic design tools like Canva?",
        "answer": "Unlike Pinterest (which is a public link aggregator) or Canva (which requires accounts and compresses uploads into the cloud), Make Contact Sheet is a private, client-side studio instrument specifically built for photographers with magnetic snapping, calibrated 300 DPI rendering, designer swatch cards, and zero cloud uploads."
      },
      {
        "question": "How many reference images should be on a single mood board canvas?",
        "answer": "The most effective mood boards maintain strict editorial restraint, utilizing 4 to 8 carefully chosen photographs. Overcrowding a board with 20+ images creates visual confusion and dilutes the clarity of your lighting and styling direction."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "How to Make a Mood Board"
    }
  },
  "es": {
    "title": "Cómo hacer un mood board — Guía paso a paso de dirección creativa",
    "description": "Tutorial paso a paso para crear mood boards fotográficos, lookbooks y libros de marca. Aprende composición, paletas de color y exportación a 300 DPI.",
    "badge": "GUÍA DE DIRECCIÓN CREATIVA · 9 MIN DE LECTURA",
    "h1Pre": "Cómo hacer un mood board: ",
    "h1Highlight": "Guía paso a paso de dirección creativa",
    "lead": "Domina el arte de la preproducción visual. Aprende a estructurar mood boards convincentes, extraer muestras de color armonizadas, redactar directivas técnicas de iluminación y exportar dossiers en 300 DPI.",
    "quickAnswerLabel": "Respuesta directa / Resumen metodológico",
    "quickAnswerText": "Para crear un mood board profesional para fotografía o dirección creativa: define una tesis visual clara, reúne entre 4 y 8 imágenes de referencia de alto impacto (foto principal, atmósfera de luz, texturas), extrae una paleta de 3 a 5 muestras con códigos hexadecimales exactos, anota directivas de estilismo e iluminación mediante notas adhesivas y exporta un PDF calibrado a 300 DPI o PNG 4K sin pérdidas. En Make Contact Sheet todo se ejecuta en tu navegador con guías de ajuste magnético, sin cuentas y con privacidad total.",
    "stepsHeading": "5 pasos para crear un mood board visual listo para clientes",
    "stepsIntro": "Sigue este flujo estructurado de preproducción para alinear a equipos creativos, clientes y modelos antes de iniciar la sesión:",
    "steps": [
      {
        "name": "Definir el concepto creativo y la premisa estética",
        "text": "Aclara la narrativa, el tono emocional y la dirección estilística antes de buscar imágenes, ya sea una campaña editorial de moda, un lookbook cinematográfico o una serie minimalista de retratos."
      },
      {
        "name": "Seleccionar un conjunto disciplinado de imágenes de referencia",
        "text": "Reúne entre 4 y 8 fotografías potentes que ilustren el encuadre principal, la luz, poses y texturas. Arrástralas directamente al lienzo libre de Make Contact Sheet."
      },
      {
        "name": "Extraer y organizar una paleta de color coherente",
        "text": "Añade tarjetas de muestras de color muestreadas directamente de tus fotos de referencia. Nómbralas con su código hexadecimal exacto para orientar la dirección de arte, filtros de iluminación y vestuario."
      },
      {
        "name": "Anotar directivas técnicas de iluminación y cámara",
        "text": "Coloca notas adhesivas con instrucciones técnicas: ratios de luz principal/relleno, difusores (octabox vs beauty dish), especificaciones de maquillaje y elección de lentes (ej. 85mm f/1.4)."
      },
      {
        "name": "Exportar PDF calibrado a 300 DPI o imagen PNG sin pérdidas",
        "text": "Descarga una presentación PDF de varias páginas a 300 DPI o un PNG 4K. Opcionalmente añade contraseña de seguridad al PDF antes de compartirlo con clientes, estilistas y asistentes."
      }
    ],
    "strategyHeading": "¿Por qué son estratégicos los mood boards en fotografía comercial?",
    "strategyP1": "En producciones publicitarias o editoriales de alto presupuesto, las descripciones verbales son propensas a malinterpretaciones. Un cliente que pide un \"retrato editorial cálido y sugerente\" puede imaginar luz dorada suave con óptica vintage, mientras el fotógrafo piensa en un claroscuro dramático con luz dura de tungsteno.",
    "strategyP2": "Un mood board disciplinado actúa como un contrato visual inequívoco entre todas las partes:",
    "strategyBullets": [
      {
        "label": "Cliente y director de arte",
        "text": "Confirma la coherencia de marca, el ritmo narrativo y la presencia del producto antes de asignar presupuesto."
      },
      {
        "label": "Fotógrafo y gaffer (jefe de iluminación)",
        "text": "Fija ratios de iluminación (ej. 4:1), tipo de modificadores (paraguas parabólico, fresnel) y ángulos de cámara."
      },
      {
        "label": "Estilista de vestuario y atrezo",
        "text": "Determina texturas de tela, siluetas de prendas y gamas tonales que complementen el fondo."
      },
      {
        "label": "Maquillaje y peluquería (HMUA)",
        "text": "Define el acabado de la piel (mate vs jugoso), tonos de labios y referencias de peinado con exactitud."
      }
    ],
    "elementsHeading": "¿Cuáles son los componentes clave de un mood board editorial?",
    "elementsIntro": "Un mood board eficaz no es una recopilación dispersa de imágenes de Pinterest; responde a una composición estudiada para guiar la mirada:",
    "elements": [
      {
        "tag": "Elemento 1",
        "title": "La imagen ancla principal (Hero Frame)",
        "text": "La fotografía más destacada del lienzo (~40% del peso visual). Establece de inmediato el estado de ánimo, la actitud del sujeto y el esquema de iluminación."
      },
      {
        "tag": "Elemento 2",
        "title": "Detalles secundarios y texturas",
        "text": "2 a 4 fotos de apoyo con primeros planos de tejidos, joyas, texturas de fondo o variaciones de pose que aportan contexto a la toma principal."
      },
      {
        "tag": "Elemento 3",
        "title": "Paleta de muestras de color con valores HEX",
        "text": "Una franja de 3 a 5 tarjetas de color con códigos hexadecimales exactos (#D97706, #261B17) para pintores de decorados y estilistas."
      },
      {
        "tag": "Elemento 4",
        "title": "Directivas técnicas y notas adhesivas",
        "text": "Indicaciones breves sobre altura de luces, densidad de difusión, gelatinas, distancias focales y notas para la dirección de modelos."
      }
    ],
    "aspectRatioHeading": "¿Qué relación de aspecto y resolución elegir para el lienzo?",
    "aspectRatioIntro": "El soporte de visualización determina la proporción óptima del mood board:",
    "tableHeaders": {
      "ratio": "Relación de aspecto",
      "target": "Soporte de destino",
      "dimensions": "Dimensiones recomendadas",
      "useCase": "Mejor caso de uso"
    },
    "tableRows": [
      {
        "ratio": "16:9 Panorámico",
        "target": "Monitores y TV",
        "dimensions": "1920 × 1080 / 3840 × 2160",
        "useCase": "Presentaciones ante clientes de agencia y tratamientos de vídeo"
      },
      {
        "ratio": "9:16 Vertical",
        "target": "Móviles y Redes",
        "dimensions": "1080 × 1920 px",
        "useCase": "Lookbooks para móvil, Stories de Instagram y guías de TikTok"
      },
      {
        "ratio": "A4 / Carta EE.UU.",
        "target": "Impresión en papel",
        "dimensions": "2480 × 3508 px (300 DPI)",
        "useCase": "Hojas de referencia plastificadas para el equipo en el set"
      },
      {
        "ratio": "1:1 Cuadrado",
        "target": "Portafolio y Feeds",
        "dimensions": "2048 × 2048 px",
        "useCase": "Conceptos estéticos para cuadrículas de Instagram y portadas"
      }
    ],
    "cta": {
      "badge": "ESTUDIO GRATUITO EN NAVEGADOR",
      "title": "¿Listo para diseñar tu mood board?",
      "text": "Crea paneles visuales con ajuste magnético, muestras de color y exportación de PDF en 300 DPI con protección por contraseña. 100% privado en tu navegador.",
      "btnPrimary": "Abrir estudio de mood boards",
      "btnSecondary": "Explorar 10 plantillas"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Orientación experta sobre paneles de dirección visual, paletas cromáticas y preproducción fotográfica.",
    "faqs": [
      {
        "question": "¿Cuál es el objetivo principal de un mood board fotográfico en preproducción?",
        "answer": "Un mood board visual funciona como el contrato estético central de una producción. Alinea a fotógrafos, modelos, directores de arte, estilistas y maquilladores en cuanto a esquemas de luz, paletas de color y tono antes de empezar a disparar, evitando pérdidas de tiempo en el set."
      },
      {
        "question": "¿Qué elementos básicos debe contener un tablero de dirección profesional?",
        "answer": "Un diseño completo incluye: 1 o 2 imágenes ancla principales, 2 a 4 fotos de detalle y textura, una paleta de 3 a 5 muestras con valores hexadecimales, notas de iluminación y directivas de vestuario y maquillaje."
      },
      {
        "question": "¿Cómo elijo la relación de aspecto adecuada?",
        "answer": "Utiliza 16:9 panorámico para pantallas de ordenador e iPad, A4 o Carta para imprimir hojas de referencia para el set, y 9:16 vertical para lookbooks móviles y redes sociales."
      },
      {
        "question": "¿Puedo proteger con contraseña el PDF para proyectos confidenciales?",
        "answer": "Sí. Make Contact Sheet cuenta con cifrado en el navegador que te permite asignar una contraseña al PDF exportado sin subir ningún archivo a servidores externos."
      },
      {
        "question": "¿En qué se diferencia Make Contact Sheet de Pinterest o Canva?",
        "answer": "A diferencia de Pinterest (agregador público) o Canva (que exige cuenta y comprime las imágenes en la nube), Make Contact Sheet es una herramienta privada creada para fotógrafos con ajuste magnético, salida a 300 DPI y privacidad absoluta."
      },
      {
        "question": "¿Cuántas imágenes de referencia conviene incluir en un solo lienzo?",
        "answer": "Los mejores mood boards mantienen moderación editorial con entre 4 y 8 fotografías cuidadosamente escogidas. Saturar el tablero con más de 20 imágenes confunde la dirección estética."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Cómo hacer un mood board"
    }
  },
  "de": {
    "title": "Moodboard erstellen — Schritt-für-Schritt-Anleitung für Fotoshootings",
    "description": "Erfahren Sie, wie Sie professionelle Moodboards für Fotoshootings und Lookbooks gestalten. Inklusive Komposition, Farbfelder und 300-DPI-Druckexport.",
    "badge": "CREATIVE-DIRECTION-LEITFADEN · 9 MIN LESEZEIT",
    "h1Pre": "Moodboard erstellen: ",
    "h1Highlight": "Schritt-für-Schritt-Anleitung für Fotoshootings",
    "lead": "Meistern Sie die Kunst der visuellen Vorproduktion. Strukturieren Sie überzeugende Moodboards, extrahieren Sie harmonische Farbfelder, formulieren Sie Lichtanweisungen und exportieren Sie 300-DPI-Präsentationen.",
    "quickAnswerLabel": "Kurzantwort / Methodik-Zusammenfassung",
    "quickAnswerText": "Um ein professionelles Moodboard für Fotoshootings zu erstellen: Definieren Sie eine visuelle Kernbotschaft, wählen Sie 4 bis 8 aussagekräftige Referenzbilder (Hauptmotiv, Lichtstimmung, Texturen), erstellen Sie eine Farbpalette mit 3 bis 5 Feldern inklusive Hex-Codes, notieren Sie Anweisungen für Styling und Beleuchtung und exportieren Sie ein 300-DPI-PDF oder verlustfreies 4K-PNG. In Make Contact Sheet geschieht dies direkt im Browser mit magnetischen Hilfslinien und ohne Cloud-Uploads.",
    "stepsHeading": "5 Schritte zum kundenfertigen visuellen Moodboard",
    "stepsIntro": "Folgen Sie diesem strukturierten Ablauf, um Kreativteams, Kunden und Models vor dem Shooting perfekt abzustimmen:",
    "steps": [
      {
        "name": "Kreativkonzept und visuelle These formulieren",
        "text": "Klären Sie Bildsprache, emotionale Wirkung und Stil vor der Bildsuche — ob für eine Modestrecke, ein cineastisches Lookbook oder eine minimalistische Architekturserie."
      },
      {
        "name": "Gezielte Referenzfotografien kuratieren",
        "text": "Sammeln Sie 4 bis 8 ausdrucksstarke Bilder zu Hauptmotiv, Lichtführung, Posen und Makrotexturen. Ziehen Sie diese direkt auf die freie Arbeitsfläche von Make Contact Sheet."
      },
      {
        "name": "Harmonische Farbpalette mit Hex-Codes anlegen",
        "text": "Erstellen Sie Farbfelder aus Ihren Kernbildern und versehen Sie diese mit genauen Hex-Werten für Set-Bau, Lichtfilter und Styling."
      },
      {
        "name": "Präzise Styling- und Lichtnotizen anbringen",
        "text": "Platzieren Sie digitale Notizzettel mit technischen Anweisungen: Lichtverhältnisse (z. B. 4:1 Haupt- zu Aufhelllicht), Lichtformer (Octabox vs. Beauty Dish) und Objektivauswahl."
      },
      {
        "name": "Kalibriertes 300-DPI-PDF oder verlustfreies PNG exportieren",
        "text": "Exportieren Sie das Moodboard als gestochen scharfes 300-DPI-PDF oder 4K-PNG. Schützen Sie vertrauliche Kundenunterlagen optional mit einem lokalen PDF-Passwort."
      }
    ],
    "strategyHeading": "Warum sind Moodboards in der kommerziellen Fotografie unverzichtbar?",
    "strategyP1": "Bei anspruchsvollen Produktionen führen verbale Beschreibungen schnell zu Missverständnissen. Die Vorgabe \"stimmungsvolles, warmes Porträt\" interpretiert ein Kunde womöglich als goldenes Abendlicht, während der Fotograf an kontrastreiches Kunstlicht mit harten Schatten denkt.",
    "strategyP2": "Ein präzises Moodboard schließt diese Lücke und dient als eindeutige visuelle Vereinbarung:",
    "strategyBullets": [
      {
        "label": "Kunde & Art Director",
        "text": "Stellt Markenkongruenz und Bildrhythmus sicher, bevor Budgets freigegeben werden."
      },
      {
        "label": "Fotograf & Beleuchter",
        "text": "Definiert Lichtverhältnisse, Lichtformer und Kameraperspektiven im Vorfeld."
      },
      {
        "label": "Styling & Requisite",
        "text": "Legt Stoffe, Schnitte und Farbharmonien fest, die mit dem Hintergrund harmonieren."
      },
      {
        "label": "Hair & Make-up (HMUA)",
        "text": "Gibt Hautfinish (matt vs. glänzend), Lippenfarben und Haarstyling fotografisch exakt vor."
      }
    ],
    "elementsHeading": "Die Kernelemente eines gelungenen Moodboards",
    "elementsIntro": "Ein starkes Moodboard ist keine zufällige Bildersammlung, sondern folgt einer durchdachten Bildhierarchie:",
    "elements": [
      {
        "tag": "Element 1",
        "title": "Das Hero-Hauptmotiv",
        "text": "Das dominierende Bild (~40 % der visuellen Gewichtung). Es definiert sofort Bildstimmung, Energie und Lichtcharakteristik des Konzepts."
      },
      {
        "tag": "Element 2",
        "title": "Detail- und Texturaufnahmen",
        "text": "2 bis 4 Detailfotos zu Stoffstrukturen, Accessoires oder Posenvariationen, die das Hauptmotiv kontextualisieren."
      },
      {
        "tag": "Element 3",
        "title": "Farbpalette mit Hex-Werten",
        "text": "Eine Leiste mit 3 bis 5 Farbkarten inklusive exakter Hex-Codes (#D97706, #261B17) für Kostümbild und Set-Design."
      },
      {
        "tag": "Element 4",
        "title": "Technische Notizen & Regieanweisungen",
        "text": "Kurze Notizen zu Lampenhöhe, Diffusionsgrad, Brennweiten und Modellführung."
      }
    ],
    "aspectRatioHeading": "Welches Seitenverhältnis und welche Auflösung wählen?",
    "aspectRatioIntro": "Das gewählte Ausgabemedium bestimmt das ideale Seitenverhältnis:",
    "tableHeaders": {
      "ratio": "Seitenverhältnis",
      "target": "Zielmedium",
      "dimensions": "Empfohlene Maße",
      "useCase": "Einsatzbereich"
    },
    "tableRows": [
      {
        "ratio": "16:9 Breitbild",
        "target": "Monitore & TVs",
        "dimensions": "1920 × 1080 / 3840 × 2160",
        "useCase": "Agentur-Pitches und digitale Präsentationen"
      },
      {
        "ratio": "9:16 Hochformat",
        "target": "Smartphones & Social Media",
        "dimensions": "1080 × 1920 px",
        "useCase": "Mobile Lookbooks und Instagram-Story-Konzepte"
      },
      {
        "ratio": "A4 / US Letter",
        "target": "Druckausgabe",
        "dimensions": "2480 × 3508 px (300 DPI)",
        "useCase": "Laminierte Referenzblätter für das Team am Set"
      },
      {
        "ratio": "1:1 Quadratisch",
        "target": "Portfolio & Feeds",
        "dimensions": "2048 × 2048 px",
        "useCase": "Instagram-Feed-Konzepte und Cover-Artworks"
      }
    ],
    "cta": {
      "badge": "KOSTENLOSES BROWSER-STUDIO",
      "title": "Bereit, Ihr Moodboard zu gestalten?",
      "text": "Gestalten Sie freie Layouts mit magnetischem Einrasten, Farbfeldern und passwortgeschütztem 300-DPI-PDF-Export. 100% vertraulich im Browser.",
      "btnPrimary": "Moodboard-Studio öffnen",
      "btnSecondary": "10 Layout-Vorlagen ansehen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Expertenantworten zu visuellen Konzeptboards, Farbwelten und der Shooting-Vorbereitung.",
    "faqs": [
      {
        "question": "Was ist der Hauptzweck eines Moodboards in der Vorproduktion?",
        "answer": "Ein Moodboard bildet die gestalterische Grundlage eines Shootings. Es bringt Fotograf, Stylist, Make-up-Artist und Kunde vorab auf denselben Stand bezüglich Licht, Farben und Posen, um Zeitverluste am Set zu vermeiden."
      },
      {
        "question": "Welche Elemente gehören auf ein professionelles Moodboard?",
        "answer": "Ein vollständiges Board enthält: 1–2 dominierende Hauptmotive, 2–4 Detail- und Texturbilder, eine 3–5-teilige Farbpalette mit Hex-Codes sowie kurze Notizen zu Licht und Styling."
      },
      {
        "question": "Wie wähle ich das passende Seitenverhältnis?",
        "answer": "Verwenden Sie 16:9 Breitbild für Präsentationen auf Monitoren, A4 oder US Letter für Handouts am Set und 9:16 für mobile Lookbooks."
      },
      {
        "question": "Kann ich vertrauliche Moodboards mit einem Passwort versehen?",
        "answer": "Ja. Make Contact Sheet bietet eine browserbasierte Verschlüsselung, mit der exportierte PDF-Dokumente ohne Cloud-Uploads mit einem Kennwort geschützt werden können."
      },
      {
        "question": "Worin unterscheidet sich Make Contact Sheet von Pinterest oder Canva?",
        "answer": "Im Gegensatz zu Pinterest (öffentlicher Link-Sammler) oder Canva (erfordert Accounts und komprimiert in die Cloud) ist Make Contact Sheet ein privates Werkzeug mit 300-DPI-Export und magnetischen Hilfslinien speziell für Fotografen."
      },
      {
        "question": "Wie viele Bilder sollten auf einem Moodboard platziert werden?",
        "answer": "Bewährt haben sich 4 bis 8 sorgfältig ausgewählte Bilder. Mehr als 20 Aufnahmen überladen das Board und schwächen die visuelle Aussagekraft ab."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Moodboard erstellen"
    }
  },
  "fr": {
    "title": "Comment faire un mood board — Guide pas à pas de direction artistique",
    "description": "Apprenez à concevoir un mood board professionnel pour photoshoots, lookbooks et chartes d'image. Composition, nuancier et export 300 DPI.",
    "badge": "GUIDE DE DIRECTION ARTISTIQUE · 9 MIN DE LECTURE",
    "h1Pre": "Comment faire un mood board : ",
    "h1Highlight": "Guide pas à pas de direction artistique",
    "lead": "Maîtrisez la préproduction visuelle. Structurez des mood boards percutants, extrayez des nuanciers harmonisés, formulez vos directives d'éclairage et exportez des présentations 300 DPI.",
    "quickAnswerLabel": "Réponse directe / Résumé méthodologique",
    "quickAnswerText": "Pour créer un mood board professionnel en photographie ou direction artistique : définissez un axe visuel clair, rassemblez 4 à 8 images de référence fortes (cadrage principal, ambiance lumineuse, textures), composez un nuancier de 3 à 5 échantillons avec codes hexadécimaux, annotez vos consignes techniques sur des post-it virtuels et exportez un PDF 300 DPI ou une image PNG 4K. Avec Make Contact Sheet, l'ensemble du processus s'exécute dans votre navigateur avec alignement magnétique et sans création de compte.",
    "stepsHeading": "5 étapes pour créer un mood board prêt pour vos clients",
    "stepsIntro": "Suivez cette méthode éprouvée pour fédérer équipes artistiques, clients et modèles avant le shooting :",
    "steps": [
      {
        "name": "Définir le concept créatif et l'axe visuel",
        "text": "Précisez l'intention narrative, l'émotion et l'esthétique générale avant de chercher des images (campagne de mode éditoriale, lookbook cinéma ou portrait minimaliste)."
      },
      {
        "name": "Sélectionner des images de référence ciblées",
        "text": "Réunissez 4 à 8 clichés forts illustrant le cadrage vedette, la lumière, les attitudes et les matières. Glissez-les sur l'espace de travail libre de Make Contact Sheet."
      },
      {
        "name": "Composer un nuancier de couleurs harmonieux",
        "text": "Ajoutez des cartes d'échantillons échantillonnées directement sur vos images de référence, annotées avec leur code hexadécimal pour guider le stylisme et la régie lumière."
      },
      {
        "name": "Annoter les consignes de stylisme, maquillage et éclairage",
        "text": "Disposez des notes adhésives précisant les paramètres clés : ratios de lumière (clé/débouchage), modeleurs (octabox vs bol beauté) et focales optiques (ex. 85mm f/1.4)."
      },
      {
        "name": "Exporter un PDF 300 DPI ou une image PNG 4K",
        "text": "Téléchargez votre document en PDF 300 DPI ou en PNG haute définition. Vous pouvez ajouter un mot de passe local au fichier PDF avant de le transmettre à l'équipe."
      }
    ],
    "strategyHeading": "Pourquoi le mood board est-il crucial en photographie commerciale ?",
    "strategyP1": "En production photographique professionnelle, les mots sont souvent source d'ambiguïté. Un client demandant un \"portrait éditorial doux et chaud\" peut songer à une lumière rasante de coucher de soleil, tandis que le photographe imagine un clair-obscur feutré avec projecteur tungstène.",
    "strategyP2": "Un mood board rigoureux comble ce décalage et fait office de contrat visuel entre tous les intervenants :",
    "strategyBullets": [
      {
        "label": "Client & Directeur artistique",
        "text": "Valide l'univers de marque et la cohérence visuelle avant d'engager les budgets de production."
      },
      {
        "label": "Photographe & Chef électricien",
        "text": "Établit les contrastes d'éclairage, le choix des modeleurs et les angles de prise de vue."
      },
      {
        "label": "Styliste vêtements & accessoires",
        "text": "Définit les textures, les coupes et les palettes vestimentaires en harmonie avec le décor."
      },
      {
        "label": "Maquilleur & Coiffeur (HMUA)",
        "text": "Indique avec précision le rendu de la peau (mat ou éclatant), les teintes de lèvres et la coiffure."
      }
    ],
    "elementsHeading": "Les composants majeurs d'un mood board éditorial réussi",
    "elementsIntro": "Un mood board efficace obéit à une organisation spatiale rigoureuse pour structurer la lecture visuelle :",
    "elements": [
      {
        "tag": "Élément 1",
        "title": "L'image vedette (Hero Frame)",
        "text": "La photo la plus imposante (~40 % du poids visuel). Elle insuffle instantanément l'atmosphère, l'énergie du sujet et le style d'éclairage."
      },
      {
        "tag": "Élément 2",
        "title": "Les détails et gros plans de texture",
        "text": "2 à 4 images complémentaires soulignant les matières de tissus, bijoux ou variations de pose qui éclairent le sujet principal."
      },
      {
        "tag": "Élément 3",
        "title": "Le nuancier avec codes HEX",
        "text": "Une rangée de 3 à 5 échantillons de couleurs avec leurs codes hexadécimaux précis (#D97706, #261B17) pour les accessoiristes et décorateurs."
      },
      {
        "tag": "Élément 4",
        "title": "Les directives techniques sur notes adhésives",
        "text": "Des notes concises indiquant la hauteur des sources lumineuses, la diffusion, les filtres et les intentions de mise en scène."
      }
    ],
    "aspectRatioHeading": "Quel format de toile et quelle résolution adopter ?",
    "aspectRatioIntro": "Le support de diffusion détermine le format optimal du mood board :",
    "tableHeaders": {
      "ratio": "Format d'image",
      "target": "Support de diffusion",
      "dimensions": "Dimensions recommandées",
      "useCase": "Cas d'usage idéal"
    },
    "tableRows": [
      {
        "ratio": "16:9 Panoramique",
        "target": "Écrans & Téléviseurs",
        "dimensions": "1920 × 1080 / 3840 × 2160",
        "useCase": "Présentations clients d'agence et dossiers vidéo"
      },
      {
        "ratio": "9:16 Vertical",
        "target": "Smartphones & Réseaux",
        "dimensions": "1080 × 1920 px",
        "useCase": "Lookbooks mobiles et dossiers de Stories Instagram"
      },
      {
        "ratio": "A4 / Lettre US",
        "target": "Impression papier",
        "dimensions": "2480 × 3508 px (300 DPI)",
        "useCase": "Fiches de référence plastifiées pour l'équipe sur le plateau"
      },
      {
        "ratio": "1:1 Carré",
        "target": "Portfolio & Feeds",
        "dimensions": "2048 × 2048 px",
        "useCase": "Univers visuels pour grilles Instagram et pochettes"
      }
    ],
    "cta": {
      "badge": "STUDIO GRATUIT DANS VOTRE NAVIGATEUR",
      "title": "Prêt à concevoir votre mood board ?",
      "text": "Créez des agencements libres avec alignement magnétique, nuanciers et export PDF 300 DPI sécurisé par mot de passe. 100% confidentiel dans votre navigateur.",
      "btnPrimary": "Lancer le studio Mood Board",
      "btnSecondary": "Découvrir 10 modèles"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Conseils d'experts sur la direction artistique, la gestion des couleurs et la préparation de shooting.",
    "faqs": [
      {
        "question": "Quel est le rôle principal d'un mood board en préproduction ?",
        "answer": "Le mood board sert de référence esthétique commune. Il aligne le photographe, les modèles, le styliste, la maquilleuse et le client sur les ambiances, la lumière et les couleurs avant le jour J."
      },
      {
        "question": "Quels éléments essentiels doit-il contenir ?",
        "answer": "Une présentation complète réunit : 1 à 2 images maîtresses, 2 à 4 détails/textures, une palette de 3 à 5 échantillons de couleur avec valeurs HEX et des notes sur l'éclairage et la mise en scène."
      },
      {
        "question": "Quel format de page privilégier ?",
        "answer": "Le 16:9 est idéal pour les présentations sur écran d'ordinateur ou tablette, le format A4 pour les fiches imprimées sur le plateau et le 9:16 pour les dossiers destinés aux smartphones."
      },
      {
        "question": "Peut-on protéger les PDF par mot de passe pour des projets confidentiels ?",
        "answer": "Oui. Make Contact Sheet embarque un système de chiffrement côté client permettant de verrouiller vos fichiers PDF sans les transférer sur un serveur distant."
      },
      {
        "question": "En quoi Make Contact Sheet diffère-t-il de Canva ou Pinterest ?",
        "answer": "Contrairement à Pinterest ou Canva (qui compressent vos photos en ligne et nécessitent des comptes), Make Contact Sheet est un outil autonome pour photographes avec export 300 DPI et confidentialité totale."
      },
      {
        "question": "Combien de photos placer sur un même mood board ?",
        "answer": "Il est recommandé de se limiter à 4 à 8 images bien sélectionnées. Trop d'images diluent le propos artistique et créent de la confusion."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Créer un mood board"
    }
  },
  "ja": {
    "title": "ムードボードの作り方 — 撮影・ビジュアルディレクション実践ガイド",
    "description": "写真撮影やブランドブックに向けたムードボードの作り方。構図の原則、カラーパレット抽出、300 DPI印刷用書き出しまで詳しく解説。",
    "badge": "ビジュアルディレクションガイド · 読了目安 9分",
    "h1Pre": "ムードボードの作り方：",
    "h1Highlight": "撮影・ディレクション実践ステップバイステップガイド",
    "lead": "ビジュアルプリプロダクションの極意を習得。説得力あるムードボードの構成、統一感のあるカラーパレット抽出、技術的なライティング指示の記載、300 DPIプレゼン資料の書き出しまでを網羅。",
    "quickAnswerLabel": "ダイレクト回答 / 手法概要",
    "quickAnswerText": "写真撮影やクリエイティブ制作におけるムードボードの作成手順：明確なビジュアルテーマを定め、4〜8枚の印象的な参考写真（メイン構図、光の雰囲気、質感のアップ）を厳選し、正確なカラーコード付きの3〜5色のパレットを抽出し、付箋機能で照明やスタイリング指示を添えて、300 DPI PDFまたは可逆圧縮4K PNGとして書き出します。Make Contact Sheetなら、アカウント登録不要でブラウザ上で安全に完結します。",
    "stepsHeading": "クライアント提案に耐えうるムードボード作成の5ステップ",
    "stepsIntro": "撮影本番前にチーム全員の認識を完全に一致させるための標準ワークフローです：",
    "steps": [
      {
        "name": "クリエイティブコンセプトとビジュアルテーマの決定",
        "text": "ファッション撮影、映画的ルックブック、モノクロポートレートなど、画像収集を始める前に物語のトーンや世界観を明確にします。"
      },
      {
        "name": "厳選された参考写真の収集と配置",
        "text": "主役となる構図、照明の空気感、ポージング、素材の質感を網羅する4〜8枚の写真を厳選し、Make Contact Sheetの自由配置キャンバスにドロップします。"
      },
      {
        "name": "統一感のあるカラーパレットの抽出",
        "text": "主要画像からサンプリングしたカラースウォッチカードを追加し、正確な16進数カラーコード（HEX）を明記して衣装や照明フィルターの指針とします。"
      },
      {
        "name": "具体的なライティング・スタイリング指示の追記",
        "text": "主光と補助光の比率（キーライト比）、ディフューザーの種類（オクタボックスかビューティーディッシュか）、ヘアメイクの質感、使用レンズ（例：85mm F1.4）などのメモを付箋で配置します。"
      },
      {
        "name": "300 DPI PDFまたは高解像度PNGの書き出し",
        "text": "印刷に耐えうる高精細な300 DPI PDFまたは4K PNGとしてダウンロードします。機密性の高いクライアント案件ではPDFにパスワードを設定して安全に共有できます。"
      }
    ],
    "strategyHeading": "商業撮影においてムードボードが極めて重要な理由とは？",
    "strategyP1": "商業撮影の現場において、言葉だけの指示は誤解を招く原因となります。クライアントが求める「温かみのあるエモーショナルな光」という言葉を、クライアントは夕暮れの自然光と想像し、フォトグラファーはタングステン照明によるドラマチックな陰影と解釈してしまうことがあります。",
    "strategyP2": "整ったムードボードは、関係者間の明確なビジュアル合意書として機能します：",
    "strategyBullets": [
      {
        "label": "クライアント＆アートディレクター",
        "text": "予算を確定する前に、ブランドイメージや商品配置の整合性を視覚的に確認できます。"
      },
      {
        "label": "フォトグラファー＆照明技師",
        "text": "照明比率（4:1など）、使用するモディファイア、カメラのアングルを正確に共有できます。"
      },
      {
        "label": "スタイリスト＆小道具担当",
        "text": "背景と調和する衣装の生地感、シルエット、トーンを事前に確定できます。"
      },
      {
        "label": "ヘアメイク（HMUA）",
        "text": "肌の質感（マットかツヤか）、リップのトーン、髪型のニュアンスを写真ベースで指示できます。"
      }
    ],
    "elementsHeading": "説得力のあるエディトリアル・ムードボードの4大要素",
    "elementsIntro": "優れたムードボードは単なる画像の寄せ集めではなく、視線を誘導する計算されたレイアウトに基づいています：",
    "elements": [
      {
        "tag": "要素 1",
        "title": "主役となるアンカー写真（Hero Frame）",
        "text": "キャンバスの約40%の面積を占める最も重要な1枚。コンセプト全体の空気感、被写体のエネルギー、照明の方向性を一目で伝えます。"
      },
      {
        "tag": "要素 2",
        "title": "ディテール・質感のクローズアップ",
        "text": "生地の織り目やアクセサリー、背景テクスチャなど、主役写真を補完する2〜4枚のサブカット。"
      },
      {
        "tag": "要素 3",
        "title": "HEXコード付きカラースウォッチ",
        "text": "写真から抽出した3〜5色の色見本カード。正確なHEXコード（#D97706など）を明記し、美術や衣装の基準とします。"
      },
      {
        "tag": "要素 4",
        "title": "技術的な指示メモ（付箋）",
        "text": "ライトの高さ、ディフューザーの濃さ、使用レンズ、モデルのポージング指示などを箇条書きで記載します。"
      }
    ],
    "aspectRatioHeading": "ムードボードに最適なアスペクト比と解像度は？",
    "aspectRatioIntro": "提示するデバイスや利用シーンに応じて最適な比率を選択します：",
    "tableHeaders": {
      "ratio": "アスペクト比",
      "target": "対象メディア",
      "dimensions": "推奨サイズ",
      "useCase": "主な用途"
    },
    "tableRows": [
      {
        "ratio": "16:9 ワイドスクリーン",
        "target": "モニター・テレビ画面",
        "dimensions": "1920 × 1080 / 3840 × 2160",
        "useCase": "クライアント向けプレゼン資料、動画コンテ"
      },
      {
        "ratio": "9:16 縦型",
        "target": "スマートフォン・SNS",
        "dimensions": "1080 × 1920 px",
        "useCase": "スマホ用ルックブック、Instagramストーリー"
      },
      {
        "ratio": "A4 / USレター",
        "target": "印刷用配布資料",
        "dimensions": "2480 × 3508 px (300 DPI)",
        "useCase": "撮影現場に持ち込むラミネート用指示書"
      },
      {
        "ratio": "1:1 正方形",
        "target": "ポートフォリオ・フィード",
        "dimensions": "2048 × 2048 px",
        "useCase": "Instagramフィード構想、ジャケット写真"
      }
    ],
    "cta": {
      "badge": "完全無料・ブラウザ完結型スタジオ",
      "title": "今すぐムードボードを作成しませんか？",
      "text": "磁気スナップガイド、カラースウォッチ、パスワード保護付き300 DPI PDF書き出し。端末ローカルで100%安全に動作します。",
      "btnPrimary": "ムードボード作成を開く",
      "btnSecondary": "10種類のプリセットを見る"
    },
    "faqHeading": "よくある質問",
    "faqSub": "ムードボード作成、カラー選定、撮影前ディレクションに関する実用的なアドバイスです。",
    "faqs": [
      {
        "question": "撮影前のムードボード作成にはどのような意義がありますか？",
        "answer": "制作者とクライアント、モデル、ヘアメイク、スタイリストの間で光の加減や色合いの共通認識を事前に確立し、撮影当日の試行錯誤や手戻りをなくす効果があります。"
      },
      {
        "question": "プロの現場で必須とされる構成要素は？",
        "answer": "主役となるキービジュアル1〜2枚、質感や小物のディテールカット2〜4枚、HEXコード付きのカラーパレット3〜5色、照明や衣装の指示メモです。"
      },
      {
        "question": "プレゼンに適したアスペクト比は？",
        "answer": "PC画面やiPadでの確認には16:9ワイド、現場での紙印刷にはA4、スマートフォンでの確認には9:16縦型が推奨されます。"
      },
      {
        "question": "機密案件のためにPDFにパスワードをかけることはできますか？",
        "answer": "はい。Make Contact Sheetは端末内で安全にPDF暗号化処理を行うため、ファイルを外部サーバーにアップロードすることなくパスワード保護が可能です。"
      },
      {
        "question": "PinterestやCanvaなどの汎用ツールとの違いは？",
        "answer": "Make Contact Sheetは写真家専用に設計されており、300 DPI印刷解像度、スウォッチ抽出、磁気スナップ配置、完全ローカル完結のプライバシー保護を特徴としています。"
      },
      {
        "question": "1枚のボードに何枚の写真を載せるのが理想的ですか？",
        "answer": "4〜8枚程度に絞り込むのが最も効果的です。20枚以上詰め込むと情報過多になり、最も伝えたいライティングやスタイリングの方向性が曖昧になります。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "ムードボードの作り方"
    }
  },
  "pt": {
    "title": "Como fazer um mood board — Guia passo a passo de direção visual",
    "description": "Tutorial passo a passo de mood board para ensaios fotográficos, lookbooks e marcas. Composição, amostras de cor e exportação em 300 DPI.",
    "badge": "GUIA DE DIREÇÃO CRIATIVA · 9 MIN DE LEITURA",
    "h1Pre": "Como fazer um mood board: ",
    "h1Highlight": "Guia passo a passo de direção visual",
    "lead": "Domine a pré-produção visual. Estruture mood boards envolventes, extraia paletas de cores harmônicas, anote parâmetros de iluminação e exporte materiais em 300 DPI.",
    "quickAnswerLabel": "Resposta direta / Resumo do método",
    "quickAnswerText": "Para criar um mood board profissional de fotografia ou direção criativa: defina um conceito visual claro, selecione de 4 a 8 fotos de referência impactantes (enquadramento principal, luz, texturas), crie uma paleta com 3 a 5 cores com códigos hexadecimais, inclua notas adesivas com orientações técnicas e exporte em PDF 300 DPI ou PNG 4K sem perdas. No Make Contact Sheet, tudo roda no navegador com guias magnéticas e privacidade total.",
    "stepsHeading": "5 passos para criar um mood board visual de nível profissional",
    "stepsIntro": "Siga este fluxo estruturado para alinhar equipe de fotografia, maquiagem, figurino e clientes antes do ensaio:",
    "steps": [
      {
        "name": "Definir o conceito criativo e a narrativa visual",
        "text": "Defina o clima emocional, o tom de iluminação e a proposta estética antes de buscar referências visuais (campanha de moda, lookbook de filme ou ensaio artístico)."
      },
      {
        "name": "Selecionar imagens de referência de alto impacto",
        "text": "Reúna de 4 a 8 imagens fortes que traduzam enquadramento, atmosfera, poses e texturas. Arraste-as diretamente para a tela livre do Make Contact Sheet."
      },
      {
        "name": "Montar uma paleta de cores consistente",
        "text": "Adicione cartões de amostra de cores extraídos das suas imagens de referência, acompanhados dos códigos hexadecimais exatos para guiar maquiagem, figurino e cenografia."
      },
      {
        "name": "Anotar diretrizes de iluminação e estilo",
        "text": "Insira notas adesivas detalhando pontos técnicos: proporção de luz (principal vs preenchimento), tipo de modificadores (octabox ou beauty dish) e lentes a utilizar."
      },
      {
        "name": "Exportar em PDF 300 DPI ou PNG de alta fidelidade",
        "text": "Baixe a apresentação em PDF nítido de 300 DPI ou PNG em 4K. É possível adicionar senha de proteção ao PDF antes de compartilhá-lo com clientes e modelos."
      }
    ],
    "strategyHeading": "Por que o mood board é essencial na fotografia comercial?",
    "strategyP1": "Em ensaios comerciais e campanhas, descrições apenas faladas geram divergências. Dizer que o ensaio terá um \"tom suave e quente\" pode significar luz dourada de fim de tarde para o cliente, enquanto o fotógrafo pensa em iluminação contínua com refletores tungstênio.",
    "strategyP2": "Um mood board bem planejado elimina essas dúvidas e serve como contrato visual:",
    "strategyBullets": [
      {
        "label": "Cliente e Diretor de Arte",
        "text": "Assegura o alinhamento da identidade visual e das expectativas antes de iniciar a produção."
      },
      {
        "label": "Fotógrafo e Iluminador",
        "text": "Determina esquemas de luz, difusores e enquadramentos de forma indiscutível."
      },
      {
        "label": "Figurinista e Cenógrafo",
        "text": "Define silhuetas, texturas de tecidos e cores que valorizam a cena sem competir com o fundo."
      },
      {
        "label": "Maquiagem e Cabelo (HMUA)",
        "text": "Orienta o acabamento da pele (matte ou viçosa), cores de batom e estilo de penteado com referências fotográficas."
      }
    ],
    "elementsHeading": "Os 4 elementos indispensáveis de um mood board editorial",
    "elementsIntro": "Um mood board de alto nível segue uma hierarquia de composição planejada:",
    "elements": [
      {
        "tag": "Elemento 1",
        "title": "A imagem-âncora principal (Hero Frame)",
        "text": "A foto de maior destaque na tela (~40% do peso visual). Ela traduz instantaneamente o estilo de luz, a atitude e o clima central."
      },
      {
        "tag": "Elemento 2",
        "title": "Detalhes de suporte e texturas",
        "text": "2 a 4 fotos complementares com closes em tecidos, acessórios ou poses que contextualizam a foto principal."
      },
      {
        "tag": "Elemento 3",
        "title": "Paleta de cores com códigos HEX",
        "text": "Uma linha de 3 a 5 cartões de cor com códigos hexadecimais (#D97706, #261B17) para facilitar o trabalho de figurino e cenário."
      },
      {
        "tag": "Elemento 4",
        "title": "Notas técnicas e direcionamentos",
        "text": "Orientações diretas sobre posicionamento de luzes, modificadores, filtros e condução das modelos."
      }
    ],
    "aspectRatioHeading": "Qual proporção de tela e resolução escolher?",
    "aspectRatioIntro": "O meio onde o mood board será apresentado dita o formato correto:",
    "tableHeaders": {
      "ratio": "Proporção de tela",
      "target": "Meio de exibição",
      "dimensions": "Dimensões recomendadas",
      "useCase": "Melhor aplicação"
    },
    "tableRows": [
      {
        "ratio": "16:9 Widescreen",
        "target": "Monitores e TVs",
        "dimensions": "1920 × 1080 / 3840 × 2160",
        "useCase": "Apresentações para clientes de agência e tratamentos de vídeo"
      },
      {
        "ratio": "9:16 Vertical",
        "target": "Smartphones e Redes",
        "dimensions": "1080 × 1920 px",
        "useCase": "Lookbooks no celular e guias para Stories do Instagram"
      },
      {
        "ratio": "A4 / Carta",
        "target": "Impressão física",
        "dimensions": "2480 × 3508 px (300 DPI)",
        "useCase": "Folhas de referência plastificadas para a equipe no set"
      },
      {
        "ratio": "1:1 Quadrado",
        "target": "Portfólio e Feed",
        "dimensions": "2048 × 2048 px",
        "useCase": "Conceitos estéticos para feed do Instagram e capas"
      }
    ],
    "cta": {
      "badge": "ESTÚDIO GRATUITO NO NAVEGADOR",
      "title": "Pronto para criar seu mood board?",
      "text": "Crie painéis livres com guias magnéticas, paletas de cores e exportação de PDF em 300 DPI protegido por senha. 100% privado no seu navegador.",
      "btnPrimary": "Abrir estúdio de Mood Board",
      "btnSecondary": "Explorar 10 modelos"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Respostas práticas sobre painéis de direção visual, curadoria de cores e pré-produção.",
    "faqs": [
      {
        "question": "Qual é a principal função do mood board na pré-produção?",
        "answer": "O mood board estabelece um alinhamento estético comum entre fotógrafo, modelos, maquiadores e clientes em relação a iluminação, paletas e poses antes de iniciar a sessão."
      },
      {
        "question": "Quais elementos essenciais não podem faltar?",
        "answer": "Um painel completo reúne: 1 ou 2 fotos principais de destaque, 2 a 4 fotos de texturas/detalhes, uma paleta de 3 a 5 cores com códigos HEX e notas objetivas de iluminação e figurino."
      },
      {
        "question": "Como escolher a proporção ideal de tela?",
        "answer": "Use 16:9 para telas de computador e apresentações em tablet, formato A4 para impressões físicas no set e 9:16 para celulares e redes sociais."
      },
      {
        "question": "É possível proteger o PDF com senha para trabalhos confidenciais?",
        "answer": "Sim. O Make Contact Sheet inclui criptografia local no navegador, permitindo definir senha para o PDF exportado sem enviar arquivos a servidores externos."
      },
      {
        "question": "Qual a diferença em relação ao Pinterest ou Canva?",
        "answer": "Diferente do Pinterest ou Canva (que comprimem arquivos e exigem contas), o Make Contact Sheet é uma ferramenta de estúdio para fotógrafos com exportação em 300 DPI, alinhamento magnético e total sigilo."
      },
      {
        "question": "Quantas fotos de referência devem estar na mesma tela?",
        "answer": "O ideal é manter disciplina editorial com 4 a 8 fotografias. Exagerar com 20 ou mais imagens dispersa o foco da iluminação e do figurino."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Como fazer um mood board"
    }
  }
};

export const PHOTO_COLLAGE_GUIDE_DATA: Record<Locale, PhotoCollageGuideData> = {
  "en": {
    "title": "How to Make a Photo Collage Online — Easy Tutorial",
    "description": "Step-by-step tutorial to make a photo collage online for free. Combine pictures into balanced grid layouts in minutes, no software needed.",
    "badge": "COMPOSITION & DESIGN GUIDE · 8 MIN READ",
    "h1Pre": "How to Make a ",
    "h1Highlight": "Photo Collage",
    "h1Post": " Online: Complete Composition Guide",
    "lead": "Master the principles of photographic layout design. Learn how to combine multiple images into balanced geometric compositions, harmonize color temperatures, and export 300 DPI master files.",
    "quickAnswerLabel": "Quick Answer / Summary Protocol",
    "quickAnswerText": "To make a photo collage online: choose an aspect ratio suited for your target platform (e.g. 1:1 square, 4:5 vertical, or 16:9 widescreen), drop 2–9 curated images into the workspace, assign your main visual anchor to the dominant hero cell, adjust border gutters (0px–24px) and background matte color, and export a lossless 4K PNG or 300 DPI print file. Make Contact Sheet processes all pixels locally in your browser with zero compression loss, zero watermark stamps, and zero cloud uploads.",
    "stepsHeading": "5 Steps to Build a Balanced Photo Collage",
    "stepsIntro": "Follow this proven design procedure to create striking multi-photo editorial layouts in under two minutes:",
    "steps": [
      {
        "name": "Select a purposeful aspect ratio for your medium",
        "text": "Choose an aspect ratio optimized for your target platform: 1:1 square for portfolio grids, 4:5 portrait for vertical social feeds, 9:16 for full-screen mobile stories, or 16:9 widescreen for website hero banners and print posters."
      },
      {
        "name": "Import and batch-index your curated image collection",
        "text": "Gather 2 to 9 complementary photographs sharing harmonized lighting, color grading, or subject matter. Drag them into the Make Contact Sheet canvas dropzone for instant local decoding without cloud uploads."
      },
      {
        "name": "Assign hero and supporting detail images to layout cells",
        "text": "Position your strongest hero photograph in the dominant cell (anchoring visual weight) and arrange secondary close-up or texture shots in surrounding tiles. Drag and swap images fluidly across cells."
      },
      {
        "name": "Fine-tune borders, gutter gaps, and background canvas tone",
        "text": "Adjust spacing between cells from 0px seamless edge-to-edge mosaics to 24px wide fine-art gallery mats. Select a background tone (such as Deep Charcoal, Archival Linen, or Warm Cream) that flatters your photography."
      },
      {
        "name": "Export at full native sensor resolution up to 4K",
        "text": "Download your completed collage layout as a lossless PNG or high-quality JPEG at 300 DPI or 4K resolution, ready for immediate physical printing or digital publication with zero watermarks."
      }
    ],
    "balanceHeading": "How do you create visual balance in a multi-photo layout?",
    "balanceP1": "A compelling photo collage is fundamentally an exercise in visual storytelling and weight distribution. When multiple photographs are displayed together, the viewer's brain naturally seeks a clear hierarchy. Layouts where all images share equal size can cause cognitive fatigue, as the eye wanders aimlessly without a clear focal entry point.",
    "balanceP2": "Effective editorial collages utilize the Golden Hero Principle:",
    "balanceBullets": [
      {
        "label": "The Visual Anchor (Hero Frame)",
        "text": "Allocate 50% to 65% of the total canvas area to your single strongest photograph. This image should possess high emotional resonance, strong compositional leading lines, or clear subject focus."
      },
      {
        "label": "Contextual Sub-Frames",
        "text": "Surround the hero with smaller secondary tiles displaying detail shots, texture macros, environmental context, or alternating angles."
      },
      {
        "label": "Directional Gaze Alignment",
        "text": "When composing portraits, ensure subjects in side cells are looking inward toward the center of the collage rather than gazing out of the canvas frame."
      }
    ],
    "colorHeading": "How do you harmonize color temperature and exposure in a collage?",
    "colorP1": "One of the most common mistakes in photo collage design is placing images with conflicting white balances or exposure values side by side. If one image has a cool blue cast (6500K) while an adjacent frame is warm golden sunlight (3200K), the collage feels discordant and amateurish.",
    "colorP2": "To achieve a cohesive, magazine-grade layout:",
    "colorSteps": [
      {
        "label": "Select Images from the Same Lighting Environment",
        "text": "Group photographs shot under identical lighting conditions (e.g. open shade, direct golden hour, or controlled studio strobe setups)."
      },
      {
        "label": "Match Black Points & Contrast Levels",
        "text": "Ensure that deep shadows across all images share similar tonal depth to avoid washed-out cells next to high-contrast frames."
      },
      {
        "label": "Limit the Scene Palette",
        "text": "Strive for a unified 2-to-3 color harmony across the collective composition (such as terracotta and sand, or deep forest green and slate)."
      }
    ],
    "aspectRatioHeading": "Which aspect ratio should I select for digital and print collages?",
    "aspectRatioIntro": "Before arranging your cells, select the canvas aspect ratio matching your destination publishing channel:",
    "tableHeaders": {
      "ratio": "Aspect Ratio",
      "dimensions": "Dimensions (px)",
      "platform": "Primary Platform",
      "layout": "Recommended Grid Layout"
    },
    "tableRows": [
      {
        "ratio": "1:1 Square",
        "dimensions": "2048 × 2048",
        "platform": "Instagram Feed / Portfolio Squares",
        "layout": "2 × 2 Quad or 3 × 3 Mosaic Grid"
      },
      {
        "ratio": "4:5 Portrait",
        "dimensions": "2160 × 2700",
        "platform": "Vertical Mobile Social Feeds",
        "layout": "Hero + 2 Stacked or Duo Diptych"
      },
      {
        "ratio": "9:16 Story",
        "dimensions": "1080 × 1920",
        "platform": "TikTok, Instagram Reels & Stories",
        "layout": "Vertical Triptych (3-Photo Tall)"
      },
      {
        "ratio": "16:9 Landscape",
        "dimensions": "3840 × 2160",
        "platform": "Website Banners & Poster Prints",
        "layout": "Cinematic Header + 3 Insets"
      }
    ],
    "cta": {
      "badge": "FREE IN-BROWSER WORKBENCH",
      "title": "Ready to Create Your Photo Collage?",
      "text": "Choose from 18 curated geometric templates, adjust gallery borders, and export crisp 4K lossless images with zero watermarks.",
      "btnPrimary": "Launch Collage Maker",
      "btnSecondary": "Browse 18 Collage Templates"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Expert guidance on photo collage composition, aspect ratios, and print resolution.",
    "faqs": [
      {
        "question": "How do I combine multiple photos without sacrificing image sharpness and quality?",
        "answer": "Make Contact Sheet uses client-side HTML5 Canvas rendering to process and composite images at their native source resolution up to 4K / 300 DPI. Unlike cloud collage apps that downscale and aggressively compress uploads, our local engine preserves original pixel fidelity and sharp micro-details."
      },
      {
        "question": "Can I create a photo collage with mixed horizontal and vertical orientations?",
        "answer": "Yes. Templates like \"Hero + 2 Stacked\", \"Editorial Duo\", and \"Master Hero + 3 Stacked\" feature asymmetrical cell configurations engineered specifically to harmoniously combine landscape orientation shots with tall portrait frames."
      },
      {
        "question": "Are there any hidden watermarks on exported photo collages?",
        "answer": "No. All photo collages generated in Make Contact Sheet are completely free and 100% watermark-free, with no account registration or payment required."
      },
      {
        "question": "What is the optimal gap width between photos in a collage?",
        "answer": "For a seamless modern look, use 0px gutters. For editorial magazines and web posts, a 6px to 12px gap provides clean separation. For framed gallery prints, wide borders (16px to 24px) mimic traditional picture framing matboards."
      },
      {
        "question": "How should I choose which photo gets the largest cell in a collage?",
        "answer": "Assign the largest cell to your primary narrative anchor—typically a wide contextual shot, an expressive portrait, or the main subject in motion. Secondary cells should display complementary details, such as jewelry, hands, atmospheric lighting, or environmental textures."
      },
      {
        "question": "Can I make collages on mobile devices as well as desktop computers?",
        "answer": "Yes. Make Contact Sheet is fully responsive across mobile phones, tablets, and desktop workstations, allowing you to create and export multi-image collages directly from your mobile browser."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "How to Make a Photo Collage"
    }
  },
  "es": {
    "title": "Cómo hacer un collage de fotos online — Tutorial fácil y completo",
    "description": "Tutorial paso a paso para crear collages de fotos online gratis. Combina imágenes en cuadrículas equilibradas en minutos, sin descargar programas.",
    "badge": "GUÍA DE COMPOSICIÓN Y DISEÑO · 8 MIN DE LECTURA",
    "h1Pre": "Cómo hacer un ",
    "h1Highlight": "Collage de fotos",
    "h1Post": " online: Guía completa de composición",
    "lead": "Domina los principios del diseño y composición fotográfica. Aprende a combinar múltiples fotos en maquetas geométricas equilibradas, armonizar temperaturas de color y exportar a 300 DPI.",
    "quickAnswerLabel": "Respuesta rápida / Resumen metodológico",
    "quickAnswerText": "Para hacer un collage de fotos online: elige una proporción adecuada para tu canal (ej. 1:1 cuadrado, 4:5 vertical o 16:9 panorámico), arrastra de 2 a 9 imágenes seleccionadas, asigna tu toma principal a la celda protagonista, ajusta los espacios de separación (0px a 24px) y el color de fondo, y exporta un archivo PNG 4K o PDF a 300 DPI. Make Contact Sheet procesa todo localmente en tu navegador sin marcas de agua ni pérdida de calidad.",
    "stepsHeading": "5 pasos para crear un collage fotográfico equilibrado",
    "stepsIntro": "Sigue este procedimiento de diseño editorial para crear composiciones multifoto llamativas en menos de dos minutos:",
    "steps": [
      {
        "name": "Elegir la proporción de aspecto adecuada",
        "text": "Selecciona una relación de aspecto óptima para tu plataforma de destino: 1:1 cuadrado para portafolios, 4:5 vertical para redes sociales, 9:16 para Stories y Reels, o 16:9 panorámico para banners web y carteles."
      },
      {
        "name": "Importar el lote de imágenes seleccionadas",
        "text": "Reúne de 2 a 9 fotos que compartan iluminación, estética o temática. Arrástralas al área de trabajo de Make Contact Sheet para decodificarlas localmente sin subirlas a la nube."
      },
      {
        "name": "Asignar la foto principal y los detalles a las celdas",
        "text": "Coloca tu imagen más impactante en la celda de mayor tamaño y ubica planos de detalle o texturas en los marcos secundarios. Puedes arrastrar e intercambiar fotos fácilmente entre celdas."
      },
      {
        "name": "Ajustar márgenes, separaciones y color de fondo",
        "text": "Modifica el espaciado entre fotos desde un mosaico continuo de 0px hasta márgenes amplios de 24px tipo paspartú de galería. Elige tonos como Gris Carbón, Lino de Archivo o Crema Cálido."
      },
      {
        "name": "Exportar a resolución nativa del sensor hasta 4K",
        "text": "Descarga tu composición terminada en PNG sin pérdidas o JPEG de alta calidad a 300 DPI o resolución 4K, lista para imprimir o publicar sin marcas de agua."
      }
    ],
    "balanceHeading": "¿Cómo lograr equilibrio visual en una composición con varias fotos?",
    "balanceP1": "Un collage exitoso es un ejercicio de narrativa visual y distribución de pesos. Cuando varias fotos compiten por atención con el mismo tamaño, el cerebro del espectador experimenta fatiga visual al no encontrar un punto focal de entrada.",
    "balanceP2": "Los diseños editoriales profesionales aplican el principio del ancla visual (Golden Hero):",
    "balanceBullets": [
      {
        "label": "El ancla visual (fotograma principal)",
        "text": "Asigna del 50% al 65% del área total a tu mejor fotografía. Debe tener alta carga emocional, líneas de fuga claras o un sujeto inequívoco."
      },
      {
        "label": "Submarcos contextuales",
        "text": "Rodea la toma principal de planos secundarios más pequeños que aporten texturas, detalles o perspectivas alternativas."
      },
      {
        "label": "Alineación de la mirada",
        "text": "En retratos, asegúrate de que las miradas de los laterales se orienten hacia el interior de la composición y no hacia fuera del marco."
      }
    ],
    "colorHeading": "¿Cómo armonizar la temperatura de color y la exposición?",
    "colorP1": "Uno de los errores más comunes es colocar fotos con balances de blancos o valores de exposición discordantes. Si una foto tiene una dominante azulada (6500K) y la contigua es dorada y cálida (3200K), el collage parecerá descoordinado.",
    "colorP2": "Para lograr un aspecto cohesivo de revista:",
    "colorSteps": [
      {
        "label": "Seleccionar fotos del mismo entorno lumínico",
        "text": "Agrupa imágenes capturadas con iluminación coherente (ej. luz de atardecer, sombra abierta o focos de estudio calibrados)."
      },
      {
        "label": "Igualar el punto de negros y contraste",
        "text": "Verifica que las sombras tengan una profundidad tonal similar para no mezclar celdas lavadas con otras de alto contraste."
      },
      {
        "label": "Limitar la gama cromática del conjunto",
        "text": "Busca una armonía de 2 a 3 colores predominantes en toda la composición (como terracota y arena, o verde bosque y grafito)."
      }
    ],
    "aspectRatioHeading": "¿Qué relación de aspecto elegir para digital o impresión?",
    "aspectRatioIntro": "Antes de ubicar tus fotos, elige la relación de aspecto según el medio final:",
    "tableHeaders": {
      "ratio": "Proporción",
      "dimensions": "Dimensiones (px)",
      "platform": "Plataforma principal",
      "layout": "Diseño de cuadrícula recomendado"
    },
    "tableRows": [
      {
        "ratio": "1:1 Cuadrado",
        "dimensions": "2048 × 2048",
        "platform": "Feed de Instagram / Portafolio",
        "layout": "Cuadrícula 2 × 2 o Mosaico 3 × 3"
      },
      {
        "ratio": "4:5 Vertical",
        "dimensions": "2160 × 2700",
        "platform": "Feeds móviles verticales",
        "layout": "Principal + 2 apiladas o Díptico dúo"
      },
      {
        "ratio": "9:16 Vertical",
        "dimensions": "1080 × 1920",
        "platform": "Stories, Reels y TikTok",
        "layout": "Tríptico vertical (3 fotos altas)"
      },
      {
        "ratio": "16:9 Panorámico",
        "dimensions": "3840 × 2160",
        "platform": "Banners web y cartelería",
        "layout": "Cabecera panorámica + 3 miniaturas"
      }
    ],
    "cta": {
      "badge": "ESPACIO DE TRABAJO GRATUITO EN NAVEGADOR",
      "title": "¿Listo para crear tu collage fotográfico?",
      "text": "Elige entre 18 plantillas geométricas cuidadosamente diseñadas, ajusta los marcos y exporta imágenes 4K sin pérdidas y sin marcas de agua.",
      "btnPrimary": "Abrir creador de collages",
      "btnSecondary": "Ver 18 plantillas de collage"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Orientación técnica sobre composición de collages, proporciones de pantalla y resolución de impresión.",
    "faqs": [
      {
        "question": "¿Cómo combinar fotos sin perder nitidez ni calidad?",
        "answer": "Make Contact Sheet renderiza las imágenes mediante Canvas HTML5 en el navegador a su resolución nativa de captura hasta 4K / 300 DPI. A diferencia de las apps en la nube que comprimen los archivos, nuestro motor local mantiene el detalle original."
      },
      {
        "question": "¿Puedo mezclar fotos horizontales y verticales en el mismo collage?",
        "answer": "Sí. Plantillas como \"Hero + 2 apiladas\", \"Dúo editorial\" y \"Hero superior + 3 fotos\" están configuradas asimétricamente para fusionar tomas horizontales y verticales con total armonía."
      },
      {
        "question": "¿Aparecen marcas de agua en los archivos exportados?",
        "answer": "No. Todas las composiciones creadas en Make Contact Sheet son 100% gratuitas y sin marcas de agua de ningún tipo."
      },
      {
        "question": "¿Cuál es la distancia de separación ideal entre fotos?",
        "answer": "Para un acabado moderno continuo, usa 0px. Para estilo editorial o revistas, un espacio de 6px a 12px da una separación limpia. Para impresiones enmarcadas, bordes anchos de 16px a 24px simulan un paspartú de museo."
      },
      {
        "question": "¿Qué foto debe ocupar el espacio más grande?",
        "answer": "La celda de mayor tamaño debe reservarse a la foto con mayor fuerza narrativa (un retrato expresivo o una escena contextual amplia). Las secundarias deben contener detalles, texturas o planos cercanos."
      },
      {
        "question": "¿Puedo crear collages tanto en el móvil como en el ordenador?",
        "answer": "Sí. Make Contact Sheet es totalmente adaptable a smartphones, tabletas y ordenadores de sobremesa, permitiendo componer y exportar desde el navegador de cualquier dispositivo."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Cómo hacer un collage de fotos"
    }
  },
  "de": {
    "title": "Fotocollage online erstellen — Schritt-für-Schritt-Anleitung",
    "description": "Erfahren Sie, wie Sie Fotocollagen online kostenlos erstellen. Mehrere Bilder harmonisch in ausgewogenen Rastern anordnen — ohne Software-Installation.",
    "badge": "KOMPOSITIONS- & DESIGN-LEITFADEN · 8 MIN LESEZEIT",
    "h1Pre": "Fotocollage online erstellen: ",
    "h1Highlight": "Kompletter Gestaltungsleitfaden",
    "h1Post": "",
    "lead": "Meistern Sie die Prinzipien des visuellen Layout-Designs. Lernen Sie, wie Sie mehrere Aufnahmen zu harmonischen Rastern verbinden, Farbtemperaturen abstimmen und 300-DPI-Dateien exportieren.",
    "quickAnswerLabel": "Kurzantwort / Zusammenfassung",
    "quickAnswerText": "So erstellen Sie eine Fotocollage online: Wählen Sie das passende Seitenverhältnis für Ihr Medium (z. B. 1:1 quadratisch, 4:5 hochkant oder 16:9 breit), ziehen Sie 2 bis 9 Fotos in den Arbeitsbereich, weisen Sie das Hauptbild dem dominierenden Rahmen zu, passen Sie Bildabstände (0 bis 24 px) und Hintergrundfarben an und exportieren Sie ein verlustfreies 4K-PNG oder 300-DPI-PDF. Make Contact Sheet verarbeitet alle Bilddaten lokal in Ihrem Browser — ohne Wasserzeichen oder Qualitätsverlust.",
    "stepsHeading": "5 Schritte zu einer ausgewogenen Fotocollage",
    "stepsIntro": "Folgen Sie dieser bewährten Gestaltungsmethode, um in weniger als zwei Minuten ansprechende Bildkompositionen zu erstellen:",
    "steps": [
      {
        "name": "Zweckmäßiges Seitenverhältnis auswählen",
        "text": "Wählen Sie das passende Format: 1:1 quadratisch für Portfolios, 4:5 Hochformat für Social-Media-Feeds, 9:16 für Vollbild-Stories oder 16:9 Breitbild für Banner und Poster."
      },
      {
        "name": "Ausgewählte Bilder importieren",
        "text": "Wählen Sie 2 bis 9 aufeinander abgestimmte Fotos mit ähnlicher Lichtstimmung oder Bildsprache und ziehen Sie sie direkt in den Browser."
      },
      {
        "name": "Hauptmotiv und Detailaufnahmen den Zellen zuweisen",
        "text": "Platzieren Sie Ihr stärkstes Bild im größten Rahmen und füllen Sie die kleineren Kacheln mit Detailaufnahmen oder Makros. Bilder können flexibel getauscht werden."
      },
      {
        "name": "Bildabstände und Hintergrundton feinabstimmen",
        "text": "Stellen Sie die Fugenbreite von 0 px (nahtloses Mosaik) bis zu 24 px (Passepartout-Optik) ein. Wählen Sie dezente Hintergründe wie Schiefergrau, Leinen oder Warmweiß."
      },
      {
        "name": "In nativer Sensorauflösung bis zu 4K exportieren",
        "text": "Laden Sie Ihre fertige Collage als verlustfreies PNG oder hochauflösendes JPEG in 300 DPI oder 4K herunter — druckfertig und ohne Wasserzeichen."
      }
    ],
    "balanceHeading": "Wie erzeugt man visuelle Balance in einem Mehrfach-Bildlayout?",
    "balanceP1": "Eine überzeugende Fotocollage lebt von visueller Dramaturgie und Gewichtsverteilung. Haben alle Bilder dieselbe Größe, ermüdet das Auge des Betrachters, weil ein klarer Einstiegspunkt fehlt.",
    "balanceP2": "Professionelle Magazin-Layouts nutzen das Golden-Hero-Prinzip:",
    "balanceBullets": [
      {
        "label": "Der visuelle Anker (Hero-Bild)",
        "text": "Widmen Sie 50 bis 65 % der Gesamtfläche Ihrem stärksten Foto mit hoher emotionaler Wirkung oder klarer Linienführung."
      },
      {
        "label": "Kontextgebende Nebenzellen",
        "text": "Arrangieren Sie um das Hauptbild kleinere Kacheln mit Texturen, Umgebungsdetails oder alternativen Blickwinkeln."
      },
      {
        "label": "Blickrichtung abstimmen",
        "text": "Achten Sie bei Porträts darauf, dass die Blicke der Personen in Richtung Bildmitte gerichtet sind und nicht aus der Collage herausführen."
      }
    ],
    "colorHeading": "Farbtemperatur und Belichtung angleichen",
    "colorP1": "Ein häufiger Fehler bei Collagen ist das Nebeneinandersetzen von Bildern mit gegensätzlichen Farbtemperaturen (z. B. 6500K kühles Blau neben 3200K warmem Kunstlicht). Dadurch wirkt die Komposition unruhig.",
    "colorP2": "Für ein harmonisches Gesamtbild empfiehlt sich:",
    "colorSteps": [
      {
        "label": "Fotos aus derselben Lichtumgebung wählen",
        "text": "Verwenden Sie Bilder, die unter vergleichbaren Lichtbedingungen entstanden sind (z. B. Schatten, Abendsonne oder Blitzlicht)."
      },
      {
        "label": "Schwarzpunkte und Kontraste angleichen",
        "text": "Achten Sie darauf, dass Tiefen und Mitteltöne in allen Zellen eine ähnliche Dichte aufweisen."
      },
      {
        "label": "Farbpalette auf 2–3 Töne beschränken",
        "text": "Eine einheitliche Farbharmonie (wie Sand und Terracotta oder Moosgrün und Anthrazit) bindet die Einzelaufnahmen zusammen."
      }
    ],
    "aspectRatioHeading": "Welches Seitenverhältnis für Digital und Druck wählen?",
    "aspectRatioIntro": "Wählen Sie vor dem Anordnen der Zellen das passende Ausgabeverhältnis:",
    "tableHeaders": {
      "ratio": "Seitenverhältnis",
      "dimensions": "Abmessungen (px)",
      "platform": "Hauptplattform",
      "layout": "Empfohlene Rasteranordnung"
    },
    "tableRows": [
      {
        "ratio": "1:1 Quadratisch",
        "dimensions": "2048 × 2048",
        "platform": "Instagram-Feed / Portfolio",
        "layout": "2 × 2 Raster oder 3 × 3 Mosaik"
      },
      {
        "ratio": "4:5 Hochformat",
        "dimensions": "2160 × 2700",
        "platform": "Vertikale Social-Media-Feeds",
        "layout": "Hero + 2 gestapelt oder Diptychon"
      },
      {
        "ratio": "9:16 Story",
        "dimensions": "1080 × 1920",
        "platform": "TikTok, Instagram Reels & Stories",
        "layout": "Vertikales Triptychon (3 Bilder hoch)"
      },
      {
        "ratio": "16:9 Querformat",
        "dimensions": "3840 × 2160",
        "platform": "Website-Banner & Posterdruck",
        "layout": "Kino-Header + 3 Miniaturen"
      }
    ],
    "cta": {
      "badge": "KOSTENLOSES BROWSER-STUDIO",
      "title": "Bereit für Ihre Fotocollage?",
      "text": "Wählen Sie aus 18 kuratierten Rastern, passen Sie Passepartouts an und exportieren Sie gestochen scharfe 4K-Bilder ohne Wasserzeichen.",
      "btnPrimary": "Collage-Studio öffnen",
      "btnSecondary": "18 Layout-Vorlagen ansehen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Expertenantworten zu Komposition, Seitenverhältnissen und Druckauflösung von Fotocollagen.",
    "faqs": [
      {
        "question": "Wie kombiniere ich Fotos ohne Qualitätsverlust?",
        "answer": "Make Contact Sheet nutzt clientseitiges HTML5 Canvas, um Bilder in ihrer nativen Sensorauflösung bis zu 4K / 300 DPI zusammenzusetzen. Da keine Cloud-Komprimierung stattfindet, bleiben feine Details erhalten."
      },
      {
        "question": "Kann ich Hoch- und Querformate in einer Collage mischen?",
        "answer": "Ja. Vorlagen wie \"Hero + 2 gestapelt\" oder \"Kino-Header + 3 Insets\" sind asymmetrisch aufgebaut, um Quer- und Hochformate harmonisch zu vereinen."
      },
      {
        "question": "Werden exportierte Collagen mit Wasserzeichen versehen?",
        "answer": "Nein. Alle in Make Contact Sheet erstellten Collagen sind vollständig kostenlos und ohne störende Wasserzeichen."
      },
      {
        "question": "Wie groß sollte der Abstand zwischen den Fotos sein?",
        "answer": "0 px sorgt für einen modernen, nahtlosen Look. 6 bis 12 px bieten eine dezente Trennung für Magazine, und 16 bis 24 px erzeugen einen klassischen Passepartout-Rahmen."
      },
      {
        "question": "Welches Foto sollte in die größte Zelle?",
        "answer": "Das stärkste Bild mit der zentralen Aussage des Shootings gehört in die größte Zelle. Nebenzellen zeigen Details, Texturen oder alternative Blickwinkel."
      },
      {
        "question": "Funktioniert das Tool auch auf Smartphones und Tablets?",
        "answer": "Ja. Make Contact Sheet ist responsiv für Desktop-Workstations, Tablets und Smartphones optimiert."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Fotocollage erstellen"
    }
  },
  "fr": {
    "title": "Comment faire un collage photo en ligne — Guide de composition complet",
    "description": "Tutoriel pas à pas pour créer un collage photo en ligne gratuitement. Combinez plusieurs photos dans des grilles équilibrées en quelques minutes.",
    "badge": "GUIDE DE COMPOSITION & DESIGN · 8 MIN DE LECTURE",
    "h1Pre": "Comment faire un ",
    "h1Highlight": "Collage photo",
    "h1Post": " en ligne : Guide de composition complet",
    "lead": "Maîtrisez les principes de composition photographique. Apprenez à combiner plusieurs clichés dans des grilles géométriques équilibrées, à harmoniser vos couleurs et à exporter en 300 DPI.",
    "quickAnswerLabel": "Réponse rapide / Méthodologie",
    "quickAnswerText": "Pour faire un collage photo en ligne : choisissez un ratio d'image adapté à votre support (ex. 1:1 carré, 4:5 vertical ou 16:9 paysage), glissez 2 à 9 photos sélectionnées, attribuez votre photo vedette à l'emplacement principal, réglez l'espacement des bordures (0 à 24 px) et la couleur de fond, puis exportez en PNG 4K sans perte ou en 300 DPI. Make Contact Sheet traite vos images localement dans le navigateur, sans filigrane ni compression dégradante.",
    "stepsHeading": "5 étapes pour réussir un collage photo harmonieux",
    "stepsIntro": "Suivez ce protocole de design éditorial pour composer des mises en page captivantes en moins de deux minutes :",
    "steps": [
      {
        "name": "Choisir le format d'image selon la destination",
        "text": "Optez pour un ratio adapté : 1:1 carré pour les grilles de portfolio, 4:5 portrait pour les fils d'actualité mobiles, 9:16 pour les Stories plein écran ou 16:9 pour les bannières web et posters."
      },
      {
        "name": "Importer votre série de photos sélectionnées",
        "text": "Rassemblez de 2 à 9 clichés partageant une cohérence de lumière et de tonalité. Déposez-les dans Make Contact Sheet pour un traitement local instantané."
      },
      {
        "name": "Assigner la photo maîtresse et les détails dans les cellules",
        "text": "Placez votre image forte dans la cellule prépondérante et répartissez les plans secondaires (textures, gros plans) autour. Vous pouvez permuter les images d'un simple glisser-déposer."
      },
      {
        "name": "Régler les marges, espacements et teinte de fond",
        "text": "Ajustez la gouttière entre les photos, de 0 px pour une mosaïque continue à 24 px pour un effet passe-partout de galerie. Choisissez une teinte de fond valorisante (anthracite, lin ou crème)."
      },
      {
        "name": "Exporter en haute définition native jusqu'en 4K",
        "text": "Téléchargez votre collage en PNG sans perte ou en JPEG haute qualité à 300 DPI ou en définition 4K, prêt pour l'impression ou la publication en ligne sans filigrane."
      }
    ],
    "balanceHeading": "Comment équilibrer la composition visuelle d'un collage ?",
    "balanceP1": "Un collage photo efficace repose sur une narration visuelle et une hiérarchie précise. Lorsque plusieurs images partagent la même taille, l'œil du spectateur hésite et se fatigue faute de point focal évident.",
    "balanceP2": "Les mises en page de magazines appliquent la règle de l'ancre visuelle (Golden Hero) :",
    "balanceBullets": [
      {
        "label": "L'image vedette (Hero Frame)",
        "text": "Consacrez 50 à 65 % de la surface totale à votre cliché le plus fort. Il doit porter l'émotion ou présenter des lignes de force marquées."
      },
      {
        "label": "Les sous-cadres contextuels",
        "text": "Disposez autour de l'image principale des vignettes plus petites montrant des détails, matières ou angles complémentaires."
      },
      {
        "label": "L'orientation des regards",
        "text": "Dans les portraits latéraux, veillez à ce que les regards convergent vers le centre de la composition plutôt que vers l'extérieur."
      }
    ],
    "colorHeading": "Harmoniser la température de couleur et l'exposition",
    "colorP1": "L'erreur la plus fréquente consiste à juxtaposer des photos aux balances des blancs opposées (par exemple un cliché bleuté à 6500K et un cliché doré à 3200K). Cette discordance nuit à l'élégance de la composition.",
    "colorP2": "Pour une mise en page digne d'une publication papier :",
    "colorSteps": [
      {
        "label": "Sélectionner des photos d'une même ambiance lumineuse",
        "text": "Regroupez des images prises dans des conditions d'éclairage cohérentes (lumière tamisée, plein soleil couchant ou flash de studio)."
      },
      {
        "label": "Harmoniser le niveau des noirs et contrastes",
        "text": "Assurez-vous que la profondeur des ombres soit comparable d'une cellule à l'autre."
      },
      {
        "label": "Limiter la palette générale à 2 ou 3 dominantes",
        "text": "Une harmonie chromatique resserrée (ex. terracotta et sable, ou vert émeraude et gris ardoise) crée une unité visuelle immédiate."
      }
    ],
    "aspectRatioHeading": "Quel format choisir pour le web et pour l'impression ?",
    "aspectRatioIntro": "Sélectionnez votre ratio d'image en fonction du support visé :",
    "tableHeaders": {
      "ratio": "Format d'image",
      "dimensions": "Dimensions (px)",
      "platform": "Plateforme privilégiée",
      "layout": "Disposition recommandée"
    },
    "tableRows": [
      {
        "ratio": "1:1 Carré",
        "dimensions": "2048 × 2048",
        "platform": "Feed Instagram / Portfolio",
        "layout": "Grille 2 × 2 ou Mosaïque 3 × 3"
      },
      {
        "ratio": "4:5 Portrait",
        "dimensions": "2160 × 2700",
        "platform": "Fils d'actualité mobiles verticaux",
        "layout": "Image vedette + 2 empilées"
      },
      {
        "ratio": "9:16 Story",
        "dimensions": "1080 × 1920",
        "platform": "Stories TikTok & Instagram",
        "layout": "Triptyque vertical (3 photos)"
      },
      {
        "ratio": "16:9 Paysage",
        "dimensions": "3840 × 2160",
        "platform": "Bannières web & Affiches",
        "layout": "Bandeau cinématographique + 3 encarts"
      }
    ],
    "cta": {
      "badge": "ESPACE DE TRAVAIL GRATUIT EN LIGNE",
      "title": "Prêt à créer votre collage photo ?",
      "text": "Choisissez parmi 18 modèles géométriques soignés, ajustez les bordures et exportez en 4K sans perte et sans filigrane.",
      "btnPrimary": "Lancer l'outil Collage",
      "btnSecondary": "Explorer les 18 modèles"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Conseils d'experts sur la composition de collages, les formats d'image et la résolution d'impression.",
    "faqs": [
      {
        "question": "Comment assembler des photos sans perte de netteté ?",
        "answer": "Make Contact Sheet utilise Canvas HTML5 directement dans votre navigateur pour traiter vos images à leur résolution d'origine jusqu'en 4K / 300 DPI. Contrairement aux services cloud qui recompressent vos fichiers, les détails restent intacts."
      },
      {
        "question": "Peut-on combiner des photos horizontales et verticales ?",
        "answer": "Oui. Des modèles comme \"Image vedette + 2 empilées\" ou \"Duo éditorial\" sont conçus pour associer harmonieusement photos de formats différents."
      },
      {
        "question": "Y a-t-il des filigranes sur les exports ?",
        "answer": "Non. Tous les collages générés sur Make Contact Sheet sont 100 % gratuits et sans aucun filigrane."
      },
      {
        "question": "Quelle est la largeur idéale pour les séparations ?",
        "answer": "0 px offre un rendu épuré et continu. Un espace de 6 à 12 px convient au style éditorial, tandis que 16 à 24 px évoquent un encadrement passe-partout."
      },
      {
        "question": "Quelle image placer dans la cellule la plus grande ?",
        "answer": "La photo dotée de la plus forte présence visuelle (portrait expressif, scène d'ensemble) doit occuper l'emplacement principal. Les cellules secondaires accueilleront textures et détails."
      },
      {
        "question": "L'outil fonctionne-t-il aussi sur mobile ?",
        "answer": "Oui. Make Contact Sheet est entièrement fonctionnel sur ordinateur, tablette et smartphone."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Créer un collage photo"
    }
  },
  "ja": {
    "title": "写真コラージュの作り方 — 構図とレイアウトの完全ガイド",
    "description": "オンラインで写真コラージュを美しく作成する手順。複数枚の写真をバランス良くグリッド配置する構図原則と300 DPI書き出し。",
    "badge": "構図＆デザインガイド · 読了目安 8分",
    "h1Pre": "写真コラージュの作り方：",
    "h1Highlight": "オンライン写真コラージュ",
    "h1Post": "構図とレイアウトの完全ガイド",
    "lead": "写真レイアウトの構図原則をマスター。複数枚の写真を幾何学的に美しいバランスで配置し、色温度を整え、300 DPIの印刷用マスターデータを書き出しましょう。",
    "quickAnswerLabel": "クイック回答 / プロトコル概要",
    "quickAnswerText": "写真コラージュを作成する基本手順：目的のメディアに応じたアスペクト比（1:1正方形、4:5縦長、16:9ワイド等）を選び、厳選した2〜9枚の写真をワークスペースにドロップし、主役写真を最も大きなセルに配置し、境界線の余白（0px〜24px）と背景色を調整して、劣化のない4K PNGまたは300 DPI印刷ファイルとして書き出します。Make Contact Sheetなら、透かし（ウォーターマーク）なしで端末ローカルで高速処理されます。",
    "stepsHeading": "バランスの取れた写真コラージュを作る5つのステップ",
    "stepsIntro": "2分以内に雑誌のような美しいエディトリアルレイアウトを作成するための標準的な手順です：",
    "steps": [
      {
        "name": "媒体に適したアスペクト比の選定",
        "text": "投稿先に合わせて縦横比を選択します：ポートフォリオ用1:1正方形、縦スクロールSNS用4:5、全画面ストーリー用9:16、Webバナー・ポスター用16:9。"
      },
      {
        "name": "厳選した写真群の読み込み",
        "text": "光のトーンや被写体のテーマが揃った2〜9枚の写真を用意し、Make Contact Sheetにドロップしてクラウド送信なしで即座に展開します。"
      },
      {
        "name": "主役（ヒーロー）写真とディテール写真の配置",
        "text": "最も存在感のある写真を最大の主役セルに配置し、周囲にアップやテクスチャ写真を配置します。ドラッグ＆ドロップでセル間の入れ替えも自由自在です。"
      },
      {
        "name": "枠線余白・溝幅・背景色の微調整",
        "text": "写真同士の間隔を0px（隙間のない連続モザイク）から24px（美術館マットボード風）まで調整し、ダークグレーやリネン、クリームなどの上品な背景色を選択します。"
      },
      {
        "name": "最大4K・300 DPIの最高画質で書き出し",
        "text": "透かしの一切入らない、印刷用300 DPIまたは4K解像度の可逆圧縮PNG・JPEGとして保存します。"
      }
    ],
    "balanceHeading": "複数枚の写真配置で視覚的バランスを保つ秘訣とは？",
    "balanceP1": "魅力的な写真コラージュは、視覚的な重み付けとストーリーテリングが不可欠です。すべての写真を均等な大きさで並べると、どこから見てよいか視線が定まらず、見る人に負担を与えてしまいます。",
    "balanceP2": "エディトリアルデザインで用いられる「ゴールデン・ヒーロー原則」：",
    "balanceBullets": [
      {
        "label": "視線のアンカー（主役写真）",
        "text": "キャンバス全体の50〜65%を最も強い1枚の写真に割り当てます。感情を揺さぶるポートレートや明確な主役を据えます。"
      },
      {
        "label": "文脈を補うサブフレーム",
        "text": "主役の周りに、ディテール、テクスチャ、環境、別の角度の写真を小さく配置してストーリーを補強します。"
      },
      {
        "label": "視線の向き（目線）の誘導",
        "text": "人物ポートレートを配置する場合、端の写真の人物の目線がコラージュの内側（中央）を向くように配置します。"
      }
    ],
    "colorHeading": "色温度と露出の統一感を出す方法",
    "colorP1": "コラージュ作成で最も多い失敗は、ホワイトバランスや露出が大きく異なる写真を隣り合わせにしてしまうことです。青白い寒色（6500K）の写真と夕暮れの温かい写真（3200K）が並ぶと、ちぐはぐな印象を与えます。",
    "colorP2": "雑誌クオリティの一体感を出すためのポイント：",
    "colorSteps": [
      {
        "label": "同一の照明環境で撮影されたカットを揃える",
        "text": "日陰、夕暮れ時、またはスタジオストロボなど、同じ光の質で撮られた写真同士を組み合わせます。"
      },
      {
        "label": "黒レベルとコントラスト感を合わせる",
        "text": "極端に眠い写真とハイコントラストな写真が混在しないよう、暗部の締まり方を揃えます。"
      },
      {
        "label": "全体の主要カラーを2〜3色に絞る",
        "text": "画面全体を通してテラコッタと砂色、あるいは深緑とスレートグレーといったまとまりを意識します。"
      }
    ],
    "aspectRatioHeading": "用途に合わせた縦横比の選び方",
    "aspectRatioIntro": "配置を決める前に、最終的な出力先に適した縦横比を選択します：",
    "tableHeaders": {
      "ratio": "アスペクト比",
      "dimensions": "寸法（px）",
      "platform": "主な利用先",
      "layout": "推奨レイアウト"
    },
    "tableRows": [
      {
        "ratio": "1:1 正方形",
        "dimensions": "2048 × 2048",
        "platform": "Instagramフィード / ポートフォリオ",
        "layout": "2×2 グリッドまたは 3×3 モザイク"
      },
      {
        "ratio": "4:5 縦長",
        "dimensions": "2160 × 2700",
        "platform": "スマホ縦スクロールSNS",
        "layout": "主役＋2段スタック、または2枚組"
      },
      {
        "ratio": "9:16 ストーリー",
        "dimensions": "1080 × 1920",
        "platform": "TikTok、Reels、Stories",
        "layout": "縦長3枚トリプティク"
      },
      {
        "ratio": "16:9 横長",
        "dimensions": "3840 × 2160",
        "platform": "Webヘッダー、ポスター印刷",
        "layout": "シネマヘッダー＋3カットインセット"
      }
    ],
    "cta": {
      "badge": "完全無料・ブラウザ完結型スタジオ",
      "title": "今すぐ写真コラージュを作りませんか？",
      "text": "18種類の厳選テンプレートから選び、余白を自由にカスタマイズ。透かしなしの4K可逆圧縮画像として書き出せます。",
      "btnPrimary": "コラージュ作成を開く",
      "btnSecondary": "18種類のテンプレートを見る"
    },
    "faqHeading": "よくある質問",
    "faqSub": "写真コラージュの構図、縦横比、印刷解像度に関するプロの回答です。",
    "faqs": [
      {
        "question": "画質を劣化させずに複数枚を合成できますか？",
        "answer": "Make Contact SheetはHTML5 Canvasを活用し、最大4K / 300 DPIのネイティブ解像度でブラウザ内で直接合成します。圧縮によるディテール劣化は発生しません。"
      },
      {
        "question": "縦向きと横向きの写真を混在させることはできますか？",
        "answer": "はい。「主役＋縦2段スタック」や「エディトリアルデュオ」などの非対称テンプレートを使用すれば、縦横比の異なる写真を美しく調和させて配置できます。"
      },
      {
        "question": "書き出した画像に透かし（ウォーターマーク）は入りますか？",
        "answer": "一切入りません。完全無料で登録不要、商用・個人利用問わず透かしなしで書き出せます。"
      },
      {
        "question": "写真と写真の隙間（ガター）の推奨幅は？",
        "answer": "隙間なしの0pxはモダンでシームレスな印象に、6〜12pxは雑誌風のすっきりした印象に、16〜24pxはマット紙額装のような高級感を演出できます。"
      },
      {
        "question": "どの写真を一番大きくすべきですか？",
        "answer": "最もストーリー性や訴求力のあるメインカットを最大のセルに割り当て、アクセサリーや手の表情、背景などの補足カットを小さなセルに配置します。"
      },
      {
        "question": "スマートフォンからも作成できますか？",
        "answer": "はい。レスポンシブ設計により、PCだけでなくスマートフォンやタブレットのブラウザからも快適に作成・書き出しが可能です。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "写真コラージュの作り方"
    }
  },
  "pt": {
    "title": "Como fazer colagem de fotos online — Tutorial fácil de composição",
    "description": "Passo a passo para fazer colagem de fotos online grátis. Combine imagens em grades equilibradas em minutos, sem instalar nada.",
    "badge": "GUIA DE COMPOSIÇÃO E DESIGN · 8 MIN DE LEITURA",
    "h1Pre": "Como fazer uma ",
    "h1Highlight": "Colagem de fotos",
    "h1Post": " online: Guia completo de composição",
    "lead": "Domine as regras de composição fotográfica. Aprenda a combinar várias imagens em grades harmoniosas, equilibrar temperaturas de cor e exportar em 300 DPI.",
    "quickAnswerLabel": "Resposta rápida / Protocolo geral",
    "quickAnswerText": "Para criar uma colagem de fotos online: selecione a proporção ideal para sua plataforma (ex.: 1:1 quadrado, 4:5 vertical ou 16:9 widescreen), adicione de 2 a 9 fotos, coloque sua imagem principal no quadro de maior destaque, ajuste as margens de separação (0 a 24 px) e a cor de fundo, e exporte em PNG 4K ou PDF em 300 DPI. O Make Contact Sheet funciona direto no navegador, sem marcas d'água e sem perdas.",
    "stepsHeading": "5 passos para criar uma colagem de fotos equilibrada",
    "stepsIntro": "Siga este método editorial para compor layouts elegantes em menos de dois minutos:",
    "steps": [
      {
        "name": "Escolher a proporção certa para o meio desejado",
        "text": "Escolha o formato ideal: 1:1 quadrado para portfólios, 4:5 vertical para redes sociais, 9:16 para Stories ou 16:9 widescreen para banners de sites e pôsteres."
      },
      {
        "name": "Importar as imagens selecionadas",
        "text": "Selecione de 2 a 9 fotografias que conversem entre si em luz e estilo. Arraste-as para a área de trabalho do Make Contact Sheet com decodificação local imediata."
      },
      {
        "name": "Distribuir a foto principal e os detalhes nas células",
        "text": "Posicione sua melhor foto no espaço dominante e preencha as células secundárias com closes de texturas ou ângulos alternativos. É fácil trocar fotos de posição arrastando."
      },
      {
        "name": "Ajustar espaçamento, bordas e cor de fundo",
        "text": "Configure o espaçamento entre 0 px (mosaico contínuo) e 24 px (efeito moldura com paspartú). Escolha cores refinadas como Cinza Grafite, Linho de Arquivo ou Creme Quente."
      },
      {
        "name": "Exportar em resolução máxima até 4K",
        "text": "Baixe sua composição em PNG sem perdas ou JPEG de alta qualidade em 300 DPI ou 4K, pronto para impressão ou uso digital sem nenhuma marca d'água."
      }
    ],
    "balanceHeading": "Como criar equilíbrio visual em composições com várias fotos?",
    "balanceP1": "Uma colagem fotográfica envolvente é um exercício de narrativa e distribuição de pesos visuais. Se todas as imagens tiverem o mesmo tamanho, o olho vagueia sem saber por onde começar.",
    "balanceP2": "Layouts editoriais de renome usam o Princípio da Foto Principal (Golden Hero):",
    "balanceBullets": [
      {
        "label": "A âncora visual (Hero Frame)",
        "text": "Reserve de 50% a 65% do espaço total para a sua melhor imagem. Ela deve carregar a emoção e a força da narrativa."
      },
      {
        "label": "Quadro secundários contextuais",
        "text": "Cerque a imagem principal com fotos menores de texturas, acessórios ou detalhes de ambiente."
      },
      {
        "label": "Convergência dos olhares",
        "text": "Em retratos, certifique-se de que os rostos nas bordas olhem para o centro da colagem, e não para fora da tela."
      }
    ],
    "colorHeading": "Harmonizar temperatura de cor e exposição",
    "colorP1": "Colocar lado a lado fotos com balanços de branco conflitantes (como uma luz fria azulada a 6500K junto a uma luz dourada a 3200K) deixa o layout visualmente desorganizado.",
    "colorP2": "Para obter um padrão de qualidade de revista:",
    "colorSteps": [
      {
        "label": "Escolher fotos com iluminação compatível",
        "text": "Agrupe fotos feitas em condições parecidas (sombra aberta, hora dourada ou luz controlada de estúdio)."
      },
      {
        "label": "Equalizar pretos e contraste",
        "text": "Garanta que as sombras tenham profundidade semelhante entre os quadros para evitar fotos lavadas ao lado de imagens contrastadas."
      },
      {
        "label": "Limitar a paleta principal a 2 ou 3 tons",
        "text": "Uma harmonia cromática concisa (como terracota e areia, ou verde musgo e chumbo) confere elegância instantânea."
      }
    ],
    "aspectRatioHeading": "Qual proporção escolher para uso digital e impresso?",
    "aspectRatioIntro": "Defina o formato da tela de acordo com onde a colagem será exibida:",
    "tableHeaders": {
      "ratio": "Proporção",
      "dimensions": "Dimensões (px)",
      "platform": "Plataforma principal",
      "layout": "Layout de grade recomendado"
    },
    "tableRows": [
      {
        "ratio": "1:1 Quadrado",
        "dimensions": "2048 × 2048",
        "platform": "Feed do Instagram / Portfólio",
        "layout": "Grade 2 × 2 ou Mosaico 3 × 3"
      },
      {
        "ratio": "4:5 Vertical",
        "dimensions": "2160 × 2700",
        "platform": "Feeds móveis verticais",
        "layout": "Principal + 2 empilhadas ou Díptico"
      },
      {
        "ratio": "9:16 Stories",
        "dimensions": "1080 × 1920",
        "platform": "TikTok, Reels e Stories",
        "layout": "Tríptico vertical (3 fotos altas)"
      },
      {
        "ratio": "16:9 Widescreen",
        "dimensions": "3840 × 2160",
        "platform": "Banners de sites e pôsteres",
        "layout": "Cabeçalho cinematográfico + 3 fotos"
      }
    ],
    "cta": {
      "badge": "ESTÚDIO GRATUITO NO NAVEGADOR",
      "title": "Pronto para criar sua colagem de fotos?",
      "text": "Escolha entre 18 modelos geométricos selecionados, ajuste molduras e exporte arquivos em 4K sem perdas e sem marcas d'água.",
      "btnPrimary": "Abrir criador de colagens",
      "btnSecondary": "Explorar 18 modelos de colagem"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Orientações sobre composição de colagens, proporções de tela e qualidade de impressão.",
    "faqs": [
      {
        "question": "Como combinar fotos sem perder nitidez?",
        "answer": "O Make Contact Sheet usa renderização Canvas HTML5 no navegador em resolução nativa até 4K / 300 DPI. Sem compressão na nuvem, a riqueza dos detalhes originais é preservada."
      },
      {
        "question": "Posso misturar fotos horizontais e verticais?",
        "answer": "Sim. Modelos como \"Principal + 2 empilhadas\" e \"Duo editorial\" foram feitos especificamente para mesclar fotos horizontais e verticais com equilíbrio."
      },
      {
        "question": "As imagens exportadas têm marcas d'água?",
        "answer": "Não. Todas as colagens geradas são 100% gratuitas e completamente livres de qualquer marca d'água."
      },
      {
        "question": "Qual é a distância ideal entre as fotos?",
        "answer": "0 px dá um visual moderno contínuo. De 6 a 12 px é ideal para estilo de revista, e de 16 a 24 px simula o efeito clássico de paspartú."
      },
      {
        "question": "Qual foto deve ficar no maior espaço?",
        "answer": "A imagem com maior presença visual ou que conta o ponto alto da cena deve ocupar a célula principal. Fotos menores devem exibir detalhes e ângulos de apoio."
      },
      {
        "question": "É possível criar colagens no celular?",
        "answer": "Sim. O Make Contact Sheet funciona de maneira responsiva tanto em computadores quanto em tablets e smartphones."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Como fazer colagem de fotos"
    }
  }
};

export const PHOTO_PROOF_SHEET_DATA: Record<Locale, PhotoProofSheetData> = {
  "en": {
    "title": "Photo Proof Sheet with Filenames — Workflow Guide",
    "description": "Create a photo proof sheet with camera filenames preserved. Simplify client selection and streamline your Lightroom culling workflow.",
    "badge": "POST-PRODUCTION WORKFLOW GUIDE · 8 MIN READ",
    "h1Pre": "Photo Proof Sheets with Filenames: ",
    "h1Highlight": "Complete Workflow Guide",
    "lead": "Eliminate client selection confusion forever. Learn how to generate filename-accurate proof sheets, automate Adobe Lightroom Classic culling, and deliver frictionless client selection handoffs.",
    "quickAnswerLabel": "Quick Answer / Core Protocol",
    "quickAnswerText": "To create a photo proof sheet with filenames intact: import your camera image folder into Make Contact Sheet, enable the \"Index & Filename\" label preset, and export a multi-page 300 DPI PDF. When your client returns their selects, mark the approved frames in the workspace and export a filtered filename list (CSV/TXT) or Adobe XMP sidecar package to paste directly into Lightroom Classic or Capture One filters.",
    "stepsHeading": "The 4-Step Professional Handoff Workflow",
    "stepsIntro": "Follow this standardized post-shoot protocol to reduce client selection turnaround from days to minutes:",
    "steps": [
      {
        "name": "Import camera media with zero filename alteration",
        "text": "Drag your camera shoot files directly into Make Contact Sheet. The browser engine indexes the exact source filenames (e.g. DSC_8941.NEF, _MG_1024.CR3, or DSC0491.ARW) with zero risk of truncation or arbitrary renaming."
      },
      {
        "name": "Configure index badges and filename overlays",
        "text": "Set the label configuration to \"Index Number & Filename\". This displays both a human-friendly sequential identifier (#01, #02) and the exact alphanumeric camera filename beneath each thumbnail frame."
      },
      {
        "name": "Export the branded PDF proof package for client review",
        "text": "Generate a clean, multi-page 300 DPI PDF document featuring your studio logo watermark and custom header text. Deliver this PDF to your client for initial image culling and selection."
      },
      {
        "name": "Copy client selections and sync directly to Lightroom or Capture One",
        "text": "When your client returns their selected numbers, mark those frames in Make Contact Sheet. Click \"Export Selection List\" to copy a comma-separated filename string or download Adobe XMP sidecar XMLs that instantly apply 5-star ratings and color labels inside Lightroom Classic."
      }
    ],
    "costHeading": "The Hidden Cost of Ambiguous Client Feedback",
    "costP1": "Every working commercial, portrait, and wedding photographer has experienced the frustration of unorganized client feedback. After delivering an unindexed online gallery, clients frequently respond via email or messaging apps with vague descriptions:",
    "costQuote": "\"We love the 4th photo in the second row, the one where the bride is looking right, and the photo near the bottom with the cake.\"",
    "costP2": "Translating these subjective statements back into actual camera files (such as _MG_9421.CR3 or DSC_1084.NEF) wastes billable hours, leads to incorrect file edits, and creates friction in the client relationship.",
    "costP3": "Delivering a proof sheet with verified filename labels and sequential index badges (#01, #02, #03) completely eliminates ambiguity. When a client replies with \"Please edit #04, #12, and #28\", the photographer has an instant, mathematically exact reference.",
    "cameraHeading": "Understanding Camera Filename Structures Across Brands",
    "cameraP1": "Professional digital cameras generate standardized alphanumeric naming sequences based on the Design Rule for Camera File System (DCF) standard:",
    "tableHeaders": {
      "brand": "Camera Brand",
      "srgb": "Standard sRGB Pattern",
      "adobergb": "Adobe RGB Pattern",
      "raw": "RAW Extension"
    },
    "tableRows": [
      {
        "brand": "Canon EOS",
        "srgb": "IMG_0001.JPG",
        "adobergb": "_MG_0001.CR3",
        "raw": ".CR2 / .CR3"
      },
      {
        "brand": "Nikon Z / DSLR",
        "srgb": "DSC_0001.JPG",
        "adobergb": "_DSC0001.NEF",
        "raw": ".NEF / .NRW"
      },
      {
        "brand": "Sony Alpha",
        "srgb": "DSC00001.JPG",
        "adobergb": "_DSC0001.ARW",
        "raw": ".ARW"
      },
      {
        "brand": "Fujifilm X / GFX",
        "srgb": "DSCF0001.JPG",
        "adobergb": "_DSF0001.RAF",
        "raw": ".RAF"
      }
    ],
    "cameraP2": "Make Contact Sheet indexes the complete, unmodified string—including leading underscores used in Adobe RGB color profiles—ensuring zero broken search queries when syncing back to your raw catalog.",
    "walkthroughHeading": "Lightroom Classic & Capture One Integration Walkthrough",
    "walkthroughIntro": "Once your client provides their selection list, syncing those picks into your post-processing software requires only a single copy-paste operation:",
    "walkthroughBoxTitle": "Step-by-Step Adobe Lightroom Classic Search Sync",
    "walkthroughSteps": [
      "In Make Contact Sheet, click Export Drawer → Scope: Kept Only → Format: Lightroom TXT to copy the comma-separated filename string to your clipboard.",
      "Open Adobe Lightroom Classic and select the target shoot folder in the Library Grid view (press G).",
      "Press the \\ key to display the top Library Filter bar.",
      "Click on Text, set the first dropdown to Filename, and set the second dropdown to Contains.",
      "Paste (Cmd+V / Ctrl+V) your clipboard string into the search input.",
      "Lightroom will instantly filter your catalog to show only the selected client images. Press Cmd+A and assign a 5-star rating or color label."
    ],
    "cta": {
      "badge": "FREE IN-BROWSER WORKBENCH",
      "title": "Generate Proof Sheets with Filenames Today",
      "text": "Preserve camera filenames, add technical EXIF badges, and streamline your Lightroom selection workflow. 100% private in your browser.",
      "btnPrimary": "Launch Contact Sheet Studio",
      "btnSecondary": "Lightroom XMP Workflow"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Practical solutions for digital asset management, filename preservation, and client proofing.",
    "faqs": [
      {
        "question": "How do I paste exported filename lists into Adobe Lightroom Classic?",
        "answer": "In Lightroom Classic, enter the Library Grid view (press G), press the \"\\\" key to open the Library Filter bar, click \"Text\", set the filter dropdown to \"Filename -> Contains\", and paste the comma-separated filename list exported from Make Contact Sheet. Lightroom will immediately isolate only the client-approved photos."
      },
      {
        "question": "Why do conventional consumer collage and cloud apps strip filenames?",
        "answer": "Most consumer photo tools are designed for social media collages rather than professional asset pipelines. When uploading photos, they re-encode files into generic sequential strings (such as image_1.jpg) and discard EXIF headers. Make Contact Sheet is engineered specifically for photography workflows and strictly preserves all original camera identifiers."
      },
      {
        "question": "Can I export a list containing only the client \"Keep\" selections?",
        "answer": "Yes. In the Make Contact Sheet Export drawer, set the Export Scope dropdown to \"Kept Only\" and select CSV or TXT format. The tool will output a clean, filtered manifest containing solely the approved files."
      },
      {
        "question": "What is an Adobe XMP sidecar file and how does it speed up post-production?",
        "answer": "An XMP sidecar is an industry-standard XML metadata file carrying the same basename as your RAW image (e.g. DSC_0012.xmp). When placed in the same folder as your RAW files, Lightroom Classic and Capture One automatically read the XMP sidecar to apply star ratings, color labels, and orientation flags without modifying the original RAW sensor data."
      },
      {
        "question": "How do I handle multi-camera shoots with duplicate file numbers (e.g. DSC_0001 from two bodies)?",
        "answer": "Before generating client proofs, use our integrated Batch Photo Tools to apply a token rename recipe (e.g. {date}_{camera}_{index:03}). This guarantees unique, non-overlapping file identifiers across all cameras before client delivery."
      },
      {
        "question": "Can I include technical exposure settings alongside filenames on the proof sheet?",
        "answer": "Yes. Enable the \"EXIF Metadata Overlay\" in Layout Controls to render camera model, focal length, aperture (f/stop), shutter speed, and ISO directly under each photo frame."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "Proof Sheets with Filenames"
    }
  },
  "es": {
    "title": "Hoja de contactos con nombres de archivo — Guía de flujo de trabajo",
    "description": "Crea hojas de contactos fotográficas conservando los nombres de archivo originales. Simplifica la selección del cliente y agiliza el filtrado en Lightroom.",
    "badge": "GUÍA DE POSTPRODUCCIÓN · 8 MIN DE LECTURA",
    "h1Pre": "Hojas de contactos con nombres de archivo: ",
    "h1Highlight": "Guía completa de trabajo",
    "lead": "Elimina para siempre las dudas en la selección de fotos de tus clientes. Aprende a generar hojas de prueba precisas, automatizar el filtrado en Adobe Lightroom Classic y entregar selecciones sin fricción.",
    "quickAnswerLabel": "Respuesta rápida / Protocolo básico",
    "quickAnswerText": "Para crear una hoja de contactos conservando los nombres de archivo intactos: importa la carpeta de fotos en Make Contact Sheet, activa la etiqueta \"Número de índice y nombre\" y exporta un PDF multipágina a 300 DPI. Cuando el cliente devuelva sus selecciones, márcalas en la herramienta y exporta una lista filtrada (CSV/TXT) o sidecars XMP para pegarlos directamente en los filtros de Lightroom Classic o Capture One.",
    "stepsHeading": "El flujo profesional de entrega en 4 pasos",
    "stepsIntro": "Sigue este protocolo de postproducción estandarizado para reducir el tiempo de selección de días a minutos:",
    "steps": [
      {
        "name": "Importar fotos sin alterar los nombres de archivo",
        "text": "Arrastra los archivos de tu sesión fotográfica a Make Contact Sheet. El motor del navegador indexa los nombres de origen exactos (DSC_8941.NEF, _MG_1024.CR3, DSC0491.ARW) sin riesgo de truncamiento o renombramiento arbitrario."
      },
      {
        "name": "Configurar insignias de índice y nombres de archivo",
        "text": "Elige la etiqueta \"Número de índice y nombre de archivo\". Esto muestra tanto un identificador secuencial claro (#01, #02) como el nombre alfanumérico exacto de la cámara bajo cada miniatura."
      },
      {
        "name": "Exportar el documento PDF personalizado para revisión",
        "text": "Genera un documento PDF a 300 DPI con el logotipo de tu estudio y texto de encabezado. Entrégale este PDF al cliente para la selección inicial de tomas."
      },
      {
        "name": "Copiar las selecciones y sincronizarlas en Lightroom o Capture One",
        "text": "Cuando el cliente envíe sus números elegidos, márcalos en Make Contact Sheet. Pulsa \"Exportar lista de selección\" para copiar los nombres o descargar sidecars XMP que aplican valoraciones de 5 estrellas en Lightroom Classic."
      }
    ],
    "costHeading": "El coste oculto de los comentarios ambiguos de clientes",
    "costP1": "Todo fotógrafo comercial, de retrato o de bodas conoce la frustración de recibir comentarios desorganizados tras enviar una galería sin indexar:",
    "costQuote": "\"Nos encanta la cuarta foto de la segunda fila, donde la novia mira a la derecha, y la foto de abajo junto a la tarta.\"",
    "costP2": "Intentar identificar a qué archivos RAW (_MG_9421.CR3 o DSC_1084.NEF) corresponden esas descripciones subjetivas consume horas facturables, causa errores de edición y genera fricción.",
    "costP3": "Entregar una hoja de contactos con nombres verificados e índices secuenciales (#01, #02, #03) elimina cualquier ambigüedad. Cuando el cliente dice \"Por favor, edita la #04, #12 y #28\", la referencia es matemáticamente exacta.",
    "cameraHeading": "Estructuras de nombres de archivo según cada fabricante",
    "cameraP1": "Las cámaras profesionales generan nombres de archivo normalizados según el estándar DCF (Design Rule for Camera File System):",
    "tableHeaders": {
      "brand": "Marca de cámara",
      "srgb": "Patrón sRGB estándar",
      "adobergb": "Patrón Adobe RGB",
      "raw": "Extensión RAW"
    },
    "tableRows": [
      {
        "brand": "Canon EOS",
        "srgb": "IMG_0001.JPG",
        "adobergb": "_MG_0001.CR3",
        "raw": ".CR2 / .CR3"
      },
      {
        "brand": "Nikon Z / DSLR",
        "srgb": "DSC_0001.JPG",
        "adobergb": "_DSC0001.NEF",
        "raw": ".NEF / .NRW"
      },
      {
        "brand": "Sony Alpha",
        "srgb": "DSC00001.JPG",
        "adobergb": "_DSC0001.ARW",
        "raw": ".ARW"
      },
      {
        "brand": "Fujifilm X / GFX",
        "srgb": "DSCF0001.JPG",
        "adobergb": "_DSF0001.RAF",
        "raw": ".RAF"
      }
    ],
    "cameraP2": "Make Contact Sheet indexa la cadena completa sin modificaciones, incluidos los guiones bajos iniciales de perfiles Adobe RGB, garantizando que las búsquedas en Lightroom nunca fallen.",
    "walkthroughHeading": "Guía de sincronización con Lightroom Classic y Capture One",
    "walkthroughIntro": "Una vez recibidas las elecciones del cliente, sincronizarlas en tu revelador requiere una sola operación de copiar y pegar:",
    "walkthroughBoxTitle": "Sincronización paso a paso en Adobe Lightroom Classic",
    "walkthroughSteps": [
      "En Make Contact Sheet, abre el menú de exportación → Ámbito: Solo conservadas → Formato: Lightroom TXT para copiar los nombres al portapapeles.",
      "Abre Adobe Lightroom Classic y selecciona la carpeta de la sesión en la vista de cuadrícula de la biblioteca (pulsa G).",
      "Pulsa la tecla \\ para mostrar la barra superior de Filtro de biblioteca.",
      "Haz clic en Texto, selecciona Nombre de archivo y la condición Contiene.",
      "Pega (Cmd+V / Ctrl+V) la cadena de nombres en el campo de búsqueda.",
      "Lightroom filtrará al instante solo las fotos elegidas por el cliente. Pulsa Cmd+A y asígnales 5 estrellas o una etiqueta de color."
    ],
    "cta": {
      "badge": "ESPACIO DE TRABAJO GRATUITO EN NAVEGADOR",
      "title": "Genera hoy tus hojas de prueba con nombres de archivo",
      "text": "Conserva los nombres de cámara, añade insignias EXIF y simplifica tu flujo de trabajo en Lightroom. 100% privado en tu navegador.",
      "btnPrimary": "Abrir estudio de hojas de contacto",
      "btnSecondary": "Flujo de trabajo XMP para Lightroom"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Soluciones prácticas para gestión de activos digitales, nombres de archivo y selección con clientes.",
    "faqs": [
      {
        "question": "¿Cómo pego la lista de nombres exportada en Adobe Lightroom Classic?",
        "answer": "En la vista Cuadrícula de la Biblioteca de Lightroom (tecla G), pulsa \"\\\" para abrir el Filtro de biblioteca, haz clic en \"Texto\", selecciona \"Nombre de archivo -> Contiene\" y pega la lista. Lightroom mostrará solo las fotos seleccionadas."
      },
      {
        "question": "¿Por qué las aplicaciones comunes de collage eliminan los nombres?",
        "answer": "La mayoría de herramientas están pensadas para redes sociales y no para flujos profesionales. Al cargar imágenes, las renombran con códigos genéricos. Make Contact Sheet fue diseñada para fotógrafos y conserva con exactitud todos los nombres de cámara."
      },
      {
        "question": "¿Puedo exportar solo las fotos aprobadas por el cliente?",
        "answer": "Sí. En el menú de exportación, elige en el desplegable Ámbito la opción \"Solo conservadas\" y exporta en formato CSV o TXT. Obtendrás un manifiesto limpio únicamente con las aprobadas."
      },
      {
        "question": "¿Qué es un archivo XMP sidecar y cómo acelera el trabajo?",
        "answer": "Un archivo XMP sidecar es un documento XML estándar que comparte el mismo nombre base que tu foto RAW (ej. DSC_0012.xmp). Al ubicarlo en la misma carpeta que el RAW, Lightroom Classic y Capture One leen automáticamente estrellas y etiquetas sin tocar el archivo original."
      },
      {
        "question": "¿Cómo gestionar sesiones multicámara con números duplicados (ej. DSC_0001 en dos cuerpos)?",
        "answer": "Antes de generar las pruebas, utiliza nuestra herramienta integrada de procesamiento por lotes para aplicar un patrón de renombramiento por tokens (ej. {fecha}_{cámara}_{índice:03}). Así garantizarás nombres únicos para cada cámara."
      },
      {
        "question": "¿Puedo mostrar los ajustes de exposición técnica junto al nombre?",
        "answer": "Sí. Activa la opción \"Insignia de metadatos EXIF\" en los controles de diseño para mostrar modelo de cámara, distancia focal, diafragma (f/), velocidad de obturación e ISO bajo cada fotografía."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Hojas de prueba con nombres"
    }
  },
  "de": {
    "title": "Proof-Bogen mit Dateinamen — Workflow-Leitfaden für Fotografen",
    "description": "Erstellen Sie Kontaktabzüge unter Beibehaltung der originalen Dateinamen. Vereinfachen Sie die Fotoauswahl Ihrer Kunden und die Lightroom-Sortierung.",
    "badge": "POSTPRODUKTIONS-LEITFADEN · 8 MIN LESEZEIT",
    "h1Pre": "Proof-Bögen mit Dateinamen: ",
    "h1Highlight": "Kompletter Workflow-Leitfaden",
    "lead": "Beseitigen Sie Missverständnisse bei der Bildauswahl mit Kunden endgültig. Erfahren Sie, wie Sie dateinamengenaue Proof-Bögen erstellen und die Auswahl in Lightroom Classic automatisieren.",
    "quickAnswerLabel": "Kurzantwort / Kernprotokoll",
    "quickAnswerText": "So erstellen Sie einen Proof-Bogen mit exakten Dateinamen: Ziehen Sie Ihren Foto-Ordner in Make Contact Sheet, aktivieren Sie das Label \"Indexnummer & Dateiname\" und exportieren Sie ein mehrseitiges 300-DPI-PDF. Sobald die Kunden ihre Auswahl treffen, markieren Sie die Fotos im Tool und exportieren Sie eine gefilterte Dateinamensliste (CSV/TXT) oder XMP-Sidecars, um sie direkt in Lightroom Classic oder Capture One einzufügen.",
    "stepsHeading": "Der professionelle 4-Schritte-Übergabe-Workflow",
    "stepsIntro": "Befolgen Sie dieses standardisierte Vorgehen, um den Abstimmungsprozess von Tagen auf Minuten zu verkürzen:",
    "steps": [
      {
        "name": "Kameradateien ohne Namensänderung importieren",
        "text": "Ziehen Sie Ihre Shooting-Dateien in Make Contact Sheet. Die Engine liest die exakten Originalnamen (z. B. DSC_8941.NEF, _MG_1024.CR3, DSC0491.ARW) fehlerfrei ein."
      },
      {
        "name": "Indexnummern und Dateinamen einblenden",
        "text": "Wählen Sie \"Indexnummer & Dateiname\". Dadurch werden sowohl lesefreundliche Ziffern (#01, #02) als auch die exakten Dateinamen unter den Bildern angezeigt."
      },
      {
        "name": "Kunden-PDF-Proof mit Studio-Branding exportieren",
        "text": "Erstellen Sie ein druckfertiges 300-DPI-PDF mit eigenem Studio-Wasserzeichen und individuellem Kopfzeilentext für die Kundenauswahl."
      },
      {
        "name": "Auswahlen kopieren und direkt in Lightroom / Capture One synchronisieren",
        "text": "Markieren Sie die Kundenauswahl im Studio. Kopieren Sie mit \"Auswahlliste exportieren\" eine kommagetrennte Liste oder laden Sie XMP-Sidecars herunter, die Bewertungen direkt in Lightroom Classic zuweisen."
      }
    ],
    "costHeading": "Die versteckten Kosten ungenauer Kundenrückmeldungen",
    "costP1": "Jeder Porträt- und Hochzeitsfotograf kennt unstrukturiertes Kundenfeedback zu nicht indexierten Online-Galerien:",
    "costQuote": "\"Uns gefällt das vierte Bild in der zweiten Reihe, bei dem die Braut nach rechts schaut, und das Bild unten mit der Torte.\"",
    "costP2": "Das mühsame Zuordnen solcher Beschreibungen zu RAW-Dateien (_MG_9421.CR3 oder DSC_1084.NEF) kostet wertvolle Arbeitsstunden und führt zu Fehlern.",
    "costP3": "Ein nummerierter Kontaktabzug mit Klarnamen (#01, #02, #03) schafft Abhilfe. Sagt der Kunde \"Bitte Bild #04, #12 und #28 retuschieren\", ist die Zuordnung mathematisch exakt.",
    "cameraHeading": "Dateinamen-Strukturen gängiger Kamerahersteller",
    "cameraP1": "Professionelle Kameras erzeugen Dateinamen nach dem Design Rule for Camera File System (DCF):",
    "tableHeaders": {
      "brand": "Kameramarke",
      "srgb": "sRGB-Standardmuster",
      "adobergb": "Adobe-RGB-Muster",
      "raw": "RAW-Endung"
    },
    "tableRows": [
      {
        "brand": "Canon EOS",
        "srgb": "IMG_0001.JPG",
        "adobergb": "_MG_0001.CR3",
        "raw": ".CR2 / .CR3"
      },
      {
        "brand": "Nikon Z / DSLR",
        "srgb": "DSC_0001.JPG",
        "adobergb": "_DSC0001.NEF",
        "raw": ".NEF / .NRW"
      },
      {
        "brand": "Sony Alpha",
        "srgb": "DSC00001.JPG",
        "adobergb": "_DSC0001.ARW",
        "raw": ".ARW"
      },
      {
        "brand": "Fujifilm X / GFX",
        "srgb": "DSCF0001.JPG",
        "adobergb": "_DSF0001.RAF",
        "raw": ".RAF"
      }
    ],
    "cameraP2": "Make Contact Sheet indexiert den kompletten Dateinamen einschließlich führender Unterstriche (Adobe RGB), sodass Suchabfragen im RAW-Katalog nie ins Leere laufen.",
    "walkthroughHeading": "Schritt-für-Schritt-Synchronisation mit Lightroom Classic",
    "walkthroughIntro": "Sobald die Kundenliste vorliegt, reicht ein einfacher Kopiervorgang zur Synchronisation:",
    "walkthroughBoxTitle": "Lightroom Classic Filtersuche im Detail",
    "walkthroughSteps": [
      "In Make Contact Sheet auf Export → Umfang: Nur Behaltene → Format: Lightroom TXT klicken, um die Dateinamen in die Zwischenablage zu kopieren.",
      "Lightroom Classic öffnen und den Shooting-Ordner in der Rasteransicht der Bibliothek (G) auswählen.",
      "Die Taste \\ drücken, um die Bibliotheksfilter-Leiste einzublenden.",
      "Auf Text klicken, das Dropdown auf Dateiname und Enthält setzen.",
      "Die Liste mit Cmd+V / Strg+V in das Suchfeld einfügen.",
      "Lightroom isoliert sofort alle ausgewählten RAW-Dateien. Mit Cmd+A markieren und mit 5 Sternen oder einem Farblabel versehen."
    ],
    "cta": {
      "badge": "KOSTENLOSES BROWSER-STUDIO",
      "title": "Erstellen Sie noch heute Proof-Bögen mit Dateinamen",
      "text": "Dateinamen beibehalten, EXIF-Daten einblenden und die Lightroom-Auswahl beschleunigen. 100% vertraulich im Browser.",
      "btnPrimary": "Kontaktabzug-Studio öffnen",
      "btnSecondary": "Lightroom XMP-Workflow ansehen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Praktische Antworten zu Digital-Asset-Management, Dateinamen und Kundenfreigaben.",
    "faqs": [
      {
        "question": "Wie füge ich die Dateinamenliste in Lightroom Classic ein?",
        "answer": "In der Bibliotheks-Rasteransicht (Taste G) die Taste \"\\\" drücken, auf \"Text\" klicken, die Filter auf \"Dateiname -> Enthält\" einstellen und die Liste einfügen."
      },
      {
        "question": "Warum löschen viele Apps die Dateinamen?",
        "answer": "Einfache Foto-Tools sind für Social-Media-Collagen gedacht und vergeben beim Upload generische Namen. Make Contact Sheet wurde für Fotografen entwickelt und behält alle Originalbezeichnungen bei."
      },
      {
        "question": "Kann ich nur die vom Kunden ausgewählten Fotos exportieren?",
        "answer": "Ja. Im Export-Menü den Bereich \"Nur Behaltene\" wählen und als CSV oder TXT herunterladen. Sie erhalten eine saubere Liste der freigegebenen Bilder."
      },
      {
        "question": "Was ist eine XMP-Sidecar-Datei?",
        "answer": "Eine XMP-Sidecar-Datei ist eine standardisierte XML-Metadatendatei mit demselben Namen wie Ihr RAW-Foto (z. B. DSC_0012.xmp). Liegt sie im selben Ordner, liest Lightroom Bewertungen und Labels automatisch aus."
      },
      {
        "question": "Wie gehe ich mit doppelten Dateinamen bei Multi-Kamera-Shootings um?",
        "answer": "Nutzen Sie vorab unsere integrierten Batch-Tools, um ein Token-Muster (z. B. {date}_{camera}_{index:03}) anzuwenden. So erhält jedes Bild einen unverwechselbaren Namen."
      },
      {
        "question": "Können Belichtungsdaten neben den Dateinamen stehen?",
        "answer": "Ja. Aktivieren Sie die EXIF-Metadaten-Einblendung, um Brennweite, Blende, Verschlusszeit und ISO-Wert unter jedem Bild anzuzeigen."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Proof-Bögen mit Dateinamen"
    }
  },
  "fr": {
    "title": "Planche contact avec noms de fichiers — Guide de post-production",
    "description": "Créez une planche contact conservant les noms de fichiers originaux. Facilitez le tri de vos clients et synchronisez vos sélections dans Lightroom.",
    "badge": "GUIDE DE POST-PRODUCTION · 8 MIN DE LECTURE",
    "h1Pre": "Planches contact avec noms de fichiers : ",
    "h1Highlight": "Guide de post-production",
    "lead": "En finissez avec les malentendus lors de la sélection photo. Générez des planches d'épreuves précises, automatisez le tri dans Adobe Lightroom Classic et facilitez la validation client.",
    "quickAnswerLabel": "Réponse rapide / Protocole clé",
    "quickAnswerText": "Pour créer une planche contact en préservant les noms de fichiers : glissez vos photos dans Make Contact Sheet, activez l'option \"Numéro d'index & Nom de fichier\" et exportez un PDF 300 DPI. Lorsque le client vous transmet ses choix, repérez-les dans l'outil et exportez la liste filtrée (CSV/TXT) ou les sidecars XMP à injecter directement dans Lightroom Classic ou Capture One.",
    "stepsHeading": "Le flux de validation professionnelle en 4 étapes",
    "stepsIntro": "Suivez ce protocole pour réduire les délais de sélection client de plusieurs jours à quelques minutes :",
    "steps": [
      {
        "name": "Importer les clichés sans altération de nom",
        "text": "Glissez vos fichiers de prise de vue dans Make Contact Sheet. Le moteur conserve scrupuleusement les noms d'origine du boîtier (DSC_8941.NEF, _MG_1024.CR3, DSC0491.ARW)."
      },
      {
        "name": "Afficher les repères d'index et noms de fichiers",
        "text": "Sélectionnez le libellé \"Numéro d'index & Nom de fichier\" pour afficher sous chaque cadre un numéro séquentiel simple (#01, #02) et le nom alphanumérique de l'appareil."
      },
      {
        "name": "Exporter le PDF d'épreuves avec votre logo",
        "text": "Générez un PDF 300 DPI multipage intégrant votre logo en filigrane et un texte d'en-tête personnalisé à transmettre au client pour son choix initial."
      },
      {
        "name": "Synchroniser la sélection dans Lightroom ou Capture One",
        "text": "Dès réception des choix du client, marquez les photos correspondantes. Exportez la liste de noms séparés par des virgules ou téléchargez les sidecars XMP pour attribuer 5 étoiles d'un coup dans Lightroom."
      }
    ],
    "costHeading": "Le coût caché des retours clients imprécis",
    "costP1": "Tout photographe de portrait ou de mariage a déjà fait face à des messages de ce type après l'envoi d'une galerie non indexée :",
    "costQuote": "\"On adore la 4e photo de la deuxième ligne, celle où la mariée regarde vers la droite, et aussi celle en bas avec le gâteau.\"",
    "costP2": "Faire correspondre ces descriptions vagues avec les fichiers RAW (_MG_9421.CR3 ou DSC_1084.NEF) fait perdre un temps précieux et engendre des erreurs de retouche.",
    "costP3": "Fournir une planche avec les vrais noms de fichiers et des numéros d'index (#01, #02, #03) résout définitivement ce problème. Quand le client demande les numéros #04, #12 et #28, la référence est limpide.",
    "cameraHeading": "Nomenclature des fichiers selon les fabricants",
    "cameraP1": "Les boîtiers professionnels respectent la norme standardisée DCF (Design Rule for Camera File System) :",
    "tableHeaders": {
      "brand": "Marque de boîtier",
      "srgb": "Format sRGB standard",
      "adobergb": "Format Adobe RGB",
      "raw": "Extension RAW"
    },
    "tableRows": [
      {
        "brand": "Canon EOS",
        "srgb": "IMG_0001.JPG",
        "adobergb": "_MG_0001.CR3",
        "raw": ".CR2 / .CR3"
      },
      {
        "brand": "Nikon Z / Reflex",
        "srgb": "DSC_0001.JPG",
        "adobergb": "_DSC0001.NEF",
        "raw": ".NEF / .NRW"
      },
      {
        "brand": "Sony Alpha",
        "srgb": "DSC00001.JPG",
        "adobergb": "_DSC0001.ARW",
        "raw": ".ARW"
      },
      {
        "brand": "Fujifilm X / GFX",
        "srgb": "DSCF0001.JPG",
        "adobergb": "_DSF0001.RAF",
        "raw": ".RAF"
      }
    ],
    "cameraP2": "Make Contact Sheet indexe la chaîne complète, y compris le tiret bas initial propre au profil Adobe RGB, pour garantir que la recherche dans votre catalogue d'origine fonctionne parfaitement.",
    "walkthroughHeading": "Synchronisation pas à pas avec Lightroom Classic",
    "walkthroughIntro": "Une fois les choix reçus, la synchronisation dans votre logiciel d'édition se résume à un simple copier-coller :",
    "walkthroughBoxTitle": "Recherche filtrée dans Adobe Lightroom Classic",
    "walkthroughSteps": [
      "Dans Make Contact Sheet, cliquez sur Exporter → Périmètre : Photos retenues → Format : Lightroom TXT pour copier les noms de fichiers.",
      "Ouvrez Lightroom Classic et sélectionnez le dossier de la séance dans la grille Bibliothèque (G).",
      "Appuyez sur la touche \\ pour afficher la barre supérieure de filtre de bibliothèque.",
      "Cliquez sur Texte, définissez le filtre sur Nom de fichier et Contient.",
      "Collez (Cmd+V / Ctrl+V) la chaîne de noms dans le champ de recherche.",
      "Lightroom n'affiche alors que les photos choisies par le client. Appuyez sur Cmd+A et attribuez 5 étoiles ou un libellé de couleur."
    ],
    "cta": {
      "badge": "ESPACE DE TRAVAIL GRATUIT EN LIGNE",
      "title": "Générez vos planches d'épreuves avec noms de fichiers",
      "text": "Préservez les noms d'origine, ajoutez les données EXIF et simplifiez votre flux de sélection dans Lightroom. 100% privé dans votre navigateur.",
      "btnPrimary": "Lancer le studio Planche Contact",
      "btnSecondary": "Voir le tutoriel XMP Lightroom"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Conseils pratiques sur la gestion des fichiers numériques, la préservation des noms et les validations clients.",
    "faqs": [
      {
        "question": "Comment coller la liste exportée dans Lightroom Classic ?",
        "answer": "Dans la vue Grille de la Bibliothèque (touche G), appuyez sur \"\\\", cliquez sur \"Texte\", choisissez \"Nom de fichier -> Contient\" et collez votre liste."
      },
      {
        "question": "Pourquoi les applications courantes écrasent-elles les noms ?",
        "answer": "La plupart des outils grand public sont pensés pour les réseaux sociaux et réencodent les fichiers avec des numéros génériques. Make Contact Sheet est conçu pour les professionnels et préserve l'intégrité des noms d'origine."
      },
      {
        "question": "Puis-je exporter uniquement les photos approuvées ?",
        "answer": "Oui. Dans le volet d'export, sélectionnez \"Photos retenues\" dans le menu déroulant et choisissez le format CSV ou TXT."
      },
      {
        "question": "Qu'est-ce qu'un fichier XMP sidecar ?",
        "answer": "Un fichier XMP sidecar est un fichier XML qui porte le même nom que votre image RAW (ex. DSC_0012.xmp). Placé à côté de vos fichiers RAW, Lightroom et Capture One y lisent notes et labels sans modifier les données brutes du capteur."
      },
      {
        "question": "Comment gérer les doublons de numérotation lors d'un shooting à plusieurs boîtiers ?",
        "answer": "Utilisez notre outil de traitement par lot pour appliquer une formule de renommage par jetons (ex. {date}_{camera}_{index:03}) avant de créer les planches."
      },
      {
        "question": "Peut-on faire apparaître les réglages de prise de vue sous les photos ?",
        "answer": "Oui. Activez l'option \"Insigne métadonnées EXIF\" pour afficher le modèle de boîtier, la focale, l'ouverture, la vitesse et l'ISO sous chaque image."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Planches avec noms de fichiers"
    }
  },
  "ja": {
    "title": "ファイル名入り写真プルーフシートの作成手順 — 写真選定ガイド",
    "description": "カメラの元ファイル名を維持した写真プルーフシート（ベタ焼き）の作成法。クライアントの写真選定を簡素化し、Lightroom連携を円滑に。",
    "badge": "ポストプロダクションガイド · 読了目安 8分",
    "h1Pre": "ファイル名入り写真プルーフシート：",
    "h1Highlight": "完全ワークフローガイド",
    "lead": "クライアントの写真選定における曖昧さを完全に排除。ファイル名と通し番号を正確に維持したプルーフシートを作成し、Lightroom Classicでの写真絞り込みを自動化しましょう。",
    "quickAnswerLabel": "クイック回答 / 基本プロトコル",
    "quickAnswerText": "ファイル名を保持したプルーフシートの作成方法：Make Contact Sheetに撮影フォルダをドラッグ＆ドロップし、「通し番号＆ファイル名」ラベルを有効にして300 DPIのPDFを書き出します。クライアントから選定結果が届いたら、ツール上で該当カットをマークし、ファイル名リスト（CSV/TXT）またはXMPサイドカーを出力してLightroom Classicの検索フィルターにペーストします。",
    "stepsHeading": "プロの現場で用いられる4ステップの納品ワークフロー",
    "stepsIntro": "撮影後のクライアント選定にかかる日数を数分へと短縮するための標準手順です：",
    "steps": [
      {
        "name": "ファイル名を改変せずに画像を取り込み",
        "text": "撮影データをMake Contact Sheetにドロップします。ブラウザエンジンが元の正確なファイル名（DSC_8941.NEF、_MG_1024.CR3、DSC0491.ARWなど）を欠損なくインデックス化します。"
      },
      {
        "name": "通し番号バッジとファイル名ラベルの設定",
        "text": "「通し番号＆ファイル名」表示を選択します。各サムネイルの下に、指示しやすい通し番号（#01、#02）とカメラの正確なファイル名が併記されます。"
      },
      {
        "name": "スタジオロゴ入りPDFプルーフを書き出してクライアントへ送付",
        "text": "スタジオロゴの透かしやヘッダーテキストを設定した300 DPIのマルチページPDFを作成し、選定用ドキュメントとしてクライアントに送付します。"
      },
      {
        "name": "クライアントの選定番号をLightroomやCapture Oneへ一括同期",
        "text": "指示された番号の写真をツール上でチェックし、「選定リスト書き出し」からカンマ区切りのファイル名文字列をコピーするか、Lightroomで5つ星評価を自動反映させるXMPサイドカーを出力します。"
      }
    ],
    "costHeading": "曖昧なクライアント指示がもたらす時間の浪費",
    "costP1": "ポートレートやウェディングの撮影現場で、ファイル番号のないギャラリーを送った際に生じる典型的な問題です：",
    "costQuote": "「2列目の4番目の花嫁が右を向いている写真と、下の方にあるケーキの写真をレタッチしてください」",
    "costP2": "こうした主観的な言葉を手がかりに何千枚ものRAWファイル（_MG_9421.CR3やDSC_1084.NEF）から該当画像を探し出す作業は、大きな時間的損失と修正ミスを生みます。",
    "costP3": "ファイル名と通し番号（#01、#02、#03）が記載されたプルーフシートがあれば、「#04、#12、#28をレタッチ希望」と伝えるだけで、1コマの狂いもなく正確に伝達できます。",
    "cameraHeading": "カメラメーカーごとのファイル名構造の理解",
    "cameraP1": "デジタルカメラはDCF（Design Rule for Camera File System）規格に基づき、命名規則に従ってファイルを生成します：",
    "tableHeaders": {
      "brand": "カメラブランド",
      "srgb": "sRGB設定時のファイル名",
      "adobergb": "Adobe RGB設定時のファイル名",
      "raw": "RAW拡張子"
    },
    "tableRows": [
      {
        "brand": "Canon EOS",
        "srgb": "IMG_0001.JPG",
        "adobergb": "_MG_0001.CR3",
        "raw": ".CR2 / .CR3"
      },
      {
        "brand": "Nikon Z / 一眼レフ",
        "srgb": "DSC_0001.JPG",
        "adobergb": "_DSC0001.NEF",
        "raw": ".NEF / .NRW"
      },
      {
        "brand": "Sony Alpha",
        "srgb": "DSC00001.JPG",
        "adobergb": "_DSC0001.ARW",
        "raw": ".ARW"
      },
      {
        "brand": "Fujifilm X / GFX",
        "srgb": "DSCF0001.JPG",
        "adobergb": "_DSF0001.RAF",
        "raw": ".RAF"
      }
    ],
    "cameraP2": "Make Contact Sheetは、Adobe RGB設定時に先頭に付くアンダースコア（_）も含めて正確に認識するため、Lightroomでの検索時にヒットしないトラブルを防ぎます。",
    "walkthroughHeading": "Lightroom Classicへの検索連携ステップ",
    "walkthroughIntro": "クライアントの選定結果が届いたら、わずか1回のコピー＆ペーストで現像ソフトに反映できます：",
    "walkthroughBoxTitle": "Adobe Lightroom Classic 検索フィルター同期手順",
    "walkthroughSteps": [
      "Make Contact Sheetのエクスポート画面で「対象：キープのみ」「形式：Lightroom TXT」を選び、ファイル名文字列をクリップボードにコピーします。",
      "Lightroom Classicを開き、ライブラリのグリッド表示（Gキー）で撮影フォルダを選択します。",
      "キーボードの「\\」キーを押してライブラリフィルターバーを表示します。",
      "「テキスト」をクリックし、プルダウンを「ファイル名」「含む」に設定します。",
      "検索フィールドにコピーした文字列をペースト（Cmd+V / Ctrl+V）します。",
      "選定された写真だけが瞬時に絞り込まれます。Cmd+Aで全選択し、5つ星評価やカラーラベルを付与します。"
    ],
    "cta": {
      "badge": "完全無料・ブラウザ完結型スタジオ",
      "title": "ファイル名入りプルーフシートを作成しませんか？",
      "text": "カメラの元ファイル名を完全に維持し、EXIF情報を添えてLightroom連携を効率化。100%安全にブラウザ内で動作します。",
      "btnPrimary": "コンタクトシート作成を開く",
      "btnSecondary": "Lightroom XMP連携ガイド"
    },
    "faqHeading": "よくある質問",
    "faqSub": "デジタル資産管理、ファイル名保持、クライアント選定に関する実践的な回答です。",
    "faqs": [
      {
        "question": "書き出したファイル名リストをLightroom Classicで使う方法は？",
        "answer": "ライブラリグリッド表示（Gキー）で「\\」を押してフィルターバーを開き、「テキスト」>「ファイル名」>「含む」を選択してリストを貼り付けます。"
      },
      {
        "question": "なぜ一般的なコラージュアプリはファイル名を消してしまうのですか？",
        "answer": "一般向けツールはSNS投稿を目的としており、画像アップロード時にimage_1.jpgのような連番に変換してしまうためです。Make Contact Sheetは写真業務専用に設計されており、カメラの元ファイル名を厳格に維持します。"
      },
      {
        "question": "クライアントが「キープ」した写真だけを出力できますか？",
        "answer": "はい。エクスポート画面で対象を「キープのみ」に指定してCSVまたはTXTを出力すれば、承認された写真だけのクリーンなリストが得られます。"
      },
      {
        "question": "Adobe XMPサイドカーファイルとは何ですか？",
        "answer": "RAW画像と同じファイル名を持つXMLメタデータファイル（例：DSC_0012.xmp）です。RAWと同じフォルダに置くことで、元の画像データを改変せずに星評価やカラーラベルをLightroomに読み込ませることができます。"
      },
      {
        "question": "複数カメラ使用時にファイル番号が重複した場合は？",
        "answer": "当ツールのバッチ処理機能を使って、プルーフ作成前にトークン（{date}_{camera}_{index:03}など）に基づいた一括リネームを行えば、ファイル名の重複を完全に防止できます。"
      },
      {
        "question": "ファイル名と一緒に撮影時の設定値も表示できますか？",
        "answer": "はい。レイアウト設定の「EXIFメタデータオーバーレイ」を有効にすると、カメラ機種、焦点距離、絞り値（F値）、シャッタースピード、ISO感度をサムネイル下に併記できます。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "ファイル名入りプルーフシート"
    }
  },
  "pt": {
    "title": "Folha de provas com nomes de arquivo — Guia de post-produção",
    "description": "Crie folhas de contato mantendo os nomes originais dos arquivos da câmera. Simplifique a escolha do cliente e a triagem no Lightroom.",
    "badge": "GUIA DE PÓS-PRODUÇÃO · 8 MIN DE LEITURA",
    "h1Pre": "Folhas de prova com nomes de arquivo: ",
    "h1Highlight": "Guia completo de trabalho",
    "lead": "Elimine qualquer confusão na escolha de fotos pelos clientes. Aprenda a gerar folhas de prova com nomes de arquivo exatos e automatize a seleção no Adobe Lightroom Classic.",
    "quickAnswerLabel": "Resposta rápida / Protocolo central",
    "quickAnswerText": "Para criar uma folha de prova com nomes de arquivo intactos: arraste a pasta de fotos para o Make Contact Sheet, ative o rótulo \"Número de índice e nome\" e exporte um PDF em 300 DPI. Quando o cliente devolver as escolhas, marque as fotos aprovadas e exporte uma lista filtrada (CSV/TXT) ou arquivos XMP sidecar para colar diretamente nos filtros do Lightroom Classic ou Capture One.",
    "stepsHeading": "O fluxo de trabalho profissional em 4 etapas",
    "stepsIntro": "Siga este procedimento para reduzir o tempo de aprovação de fotos de dias para minutos:",
    "steps": [
      {
        "name": "Importar fotos sem alterar os nomes dos arquivos",
        "text": "Arraste os arquivos da sessão para o Make Contact Sheet. O motor do navegador mantém a nomenclatura exata da câmera (DSC_8941.NEF, _MG_1024.CR3, DSC0491.ARW) sem risco de renomeações involuntárias."
      },
      {
        "name": "Configurar identificadores e nomes de arquivo",
        "text": "Ative \"Número de índice e nome de arquivo\". Cada miniatura exibirá um número sequencial prático (#01, #02) e o nome alfanumérico da foto original."
      },
      {
        "name": "Exportar pacote de provas em PDF personalizado",
        "text": "Gere um PDF em 300 DPI com marca d'água do seu estúdio e cabeçalho customizado para enviar ao cliente para a seleção inicial."
      },
      {
        "name": "Sincronizar as escolhas no Lightroom ou Capture One",
        "text": "Assim que receber as seleções do cliente, marque as fotos no Make Contact Sheet. Clique em \"Exportar lista de seleção\" para copiar a lista de nomes ou baixar pacotes XMP sidecar para o Lightroom."
      }
    ],
    "costHeading": "O custo de comentários imprecisos de clientes",
    "costP1": "Todo fotógrafo profissional já recebeu mensagens confusas após enviar galerias sem numeração definida:",
    "costQuote": "\"Adoramos a quarta foto da segunda fileira, onde a noiva olha para a direita, e também aquela lá embaixo com o bolo.\"",
    "costP2": "Descobrir a quais arquivos RAW (_MG_9421.CR3 ou DSC_1084.NEF) essas frases se referem gasta horas de trabalho e gera retrabalho.",
    "costP3": "Entregar uma folha de contato numerada (#01, #02, #03) com os nomes reais dos arquivos resolve o problema. Se o cliente pedir para editar as fotos #04, #12 e #28, a identificação é imediata.",
    "cameraHeading": "Estrutura dos nomes de arquivo por fabricante",
    "cameraP1": "Câmeras digitais profissionais seguem o padrão DCF (Design Rule for Camera File System):",
    "tableHeaders": {
      "brand": "Marca da câmera",
      "srgb": "Padrão sRGB",
      "adobergb": "Padrão Adobe RGB",
      "raw": "Extensão RAW"
    },
    "tableRows": [
      {
        "brand": "Canon EOS",
        "srgb": "IMG_0001.JPG",
        "adobergb": "_MG_0001.CR3",
        "raw": ".CR2 / .CR3"
      },
      {
        "brand": "Nikon Z / DSLR",
        "srgb": "DSC_0001.JPG",
        "adobergb": "_DSC0001.NEF",
        "raw": ".NEF / .NRW"
      },
      {
        "brand": "Sony Alpha",
        "srgb": "DSC00001.JPG",
        "adobergb": "_DSC0001.ARW",
        "raw": ".ARW"
      },
      {
        "brand": "Fujifilm X / GFX",
        "srgb": "DSCF0001.JPG",
        "adobergb": "_DSF0001.RAF",
        "raw": ".RAF"
      }
    ],
    "cameraP2": "O Make Contact Sheet preserva a sequência completa, incluindo o sublinhado inicial do perfil Adobe RGB, garantindo que as buscas no catálogo RAW não falhem.",
    "walkthroughHeading": "Sincronização passo a passo no Lightroom Classic",
    "walkthroughIntro": "Com a lista de escolhas em mãos, basta um copiar e colar para filtrar as fotos no programa:",
    "walkthroughBoxTitle": "Filtro de biblioteca no Adobe Lightroom Classic",
    "walkthroughSteps": [
      "No Make Contact Sheet, clique em Exportar → Escopo: Apenas Mantidas → Formato: Lightroom TXT para copiar os nomes.",
      "Abra o Lightroom Classic e selecione a pasta da sessão na visualização em grade da Biblioteca (G).",
      "Pressione a tecla \\ para abrir a barra de filtros da biblioteca.",
      "Clique em Texto, defina o primeiro campo como Nome do arquivo e a condição como Contém.",
      "Cole (Cmd+V / Ctrl+V) os nomes de arquivos no campo de busca.",
      "O Lightroom exibirá apenas as fotos aprovadas. Pressione Cmd+A e defina 5 estrelas ou um rótulo de cor."
    ],
    "cta": {
      "badge": "ESTÚDIO GRATUITO NO NAVEGADOR",
      "title": "Gere folhas de prova com nomes de arquivo agora",
      "text": "Mantenha os nomes originais, inclua dados EXIF e agilize a seleção no Lightroom. 100% privado no seu navegador.",
      "btnPrimary": "Abrir estúdio de folha de contato",
      "btnSecondary": "Ver fluxo XMP para Lightroom"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Respostas práticas sobre gestão de arquivos fotográficos e aprovação de imagens com clientes.",
    "faqs": [
      {
        "question": "Como colar a lista no Lightroom Classic?",
        "answer": "Na grade da Biblioteca (G), aperte \"\\\", clique em \"Texto\", marque \"Nome do arquivo -> Contém\" e cole a lista de nomes exportada."
      },
      {
        "question": "Por que programas convencionais removem os nomes dos arquivos?",
        "answer": "Aplicativos comuns focam em redes sociais e renomeiam arquivos para termos genéricos. O Make Contact Sheet é feito para fotógrafos e mantém os nomes originais rigorosamente intactos."
      },
      {
        "question": "Posso exportar somente as fotos que o cliente aprovou?",
        "answer": "Sim. No painel de exportação, selecione \"Apenas Mantidas\" e baixe um arquivo em CSV ou TXT com a lista filtrada."
      },
      {
        "question": "O que é um arquivo XMP sidecar?",
        "answer": "É um arquivo de metadados XML com o mesmo nome da foto RAW (ex.: DSC_0012.xmp). Colocado na mesma pasta, o Lightroom lê notas e cores sem alterar o arquivo bruto."
      },
      {
        "question": "Como resolver números duplicados em sessões com várias câmeras?",
        "answer": "Utilize nossas Ferramentas de Lote antes de montar as folhas para renomear os arquivos com tokens (ex.: {date}_{camera}_{index:03}), garantindo nomes exclusivos."
      },
      {
        "question": "Posso incluir os dados de exposição abaixo das fotos?",
        "answer": "Sim. Ative a opção \"Sobreposição EXIF\" para exibir o modelo da câmera, distância focal, abertura (f/), velocidade e ISO sob cada miniatura."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Folhas de prova com nomes"
    }
  }
};

export const LARGE_FRAMES_GUIDE_DATA: Record<Locale, LargeFramesGuideData> = {
  "en": {
    "title": "Large Photo Frames & Print Sizes Guide — Dimensions & Math",
    "description": "Complete guide to large photo frames and print sizes (11x14 to 24x36). Learn aspect ratios, matting math, DPI formulas, and gallery hanging rules.",
    "badge": "PRINT & FRAMING GUIDE · 9 MIN READ",
    "h1Pre": "Large Photo Frames & ",
    "h1Highlight": "Print Sizes Guide",
    "lead": "Master standard photographic frame dimensions, sensor aspect ratios, matting mathematics, and print resolution standards. Learn how to size prints accurately for gallery exhibitions, home decor, and retail photo labs.",
    "quickAnswerLabel": "Quick Answer / Standard Dimensions Reference",
    "quickAnswerText": "Standard large photo frame sizes in North America are 11×14 in (28×36 cm), 12×18 in (30×46 cm), 16×20 in (41×51 cm), 18×24 in (46×61 cm), and 24×36 in (61×91 cm). To avoid image cropping, pair 3:2 camera sensors with 12×18 or 24×36 frames, and pair 4:3 sensors with 18×24 frames. For crisp gallery printing, target 300 DPI (4800×6000 px for 16×20), or 150 DPI (3600×5400 px for 24×36) for standard poster viewing distances.",
    "stepsHeading": "How do you choose and prepare photos for large frame prints?",
    "stepsIntro": "Follow this 5-step studio framework to calculate resolution, match frame aspect ratios, and export gallery-quality master files:",
    "steps": [
      {
        "name": "Determine native camera aspect ratio and resolution",
        "text": "Inspect your source image pixel dimensions and aspect ratio (typically 3:2 for full-frame DSLRs/mirrorless, 4:3 for micro four-thirds and smartphones, or 1:1 for square captures). Ensure the file has at least 150 DPI for poster sizes or 300 DPI for gallery fine art."
      },
      {
        "name": "Select standard frame size vs custom dimensions",
        "text": "Choose a mass-market frame dimension (such as 11×14, 16×20, 18×24, or 24×36 inches) to avoid costly bespoke custom moulding. Standard sizes are readily available at retail home decor stores and online framers."
      },
      {
        "name": "Calculate mat window opening and border margins",
        "text": "Decide whether to frame full-bleed or with an archival mat board. A standard 2 to 3-inch mat border adds breathing room and elevates perception, requiring a smaller photo print inside a larger frame (e.g., an 8×10 print inside an 11×14 matted frame)."
      },
      {
        "name": "Format and lay out print canvas with exact bleed tolerances",
        "text": "Use Make Contact Sheet to lay out single large prints or multi-photo gang sheets with millimeter-precise margins and sub-pixel edge alignment. Add 0.125-inch (3mm) safe bleed margins to prevent white edges during trimming."
      },
      {
        "name": "Export at 300 DPI sRGB and assemble with archival hardware",
        "text": "Export your print-ready master file as an uncompressed 300 DPI PNG or JPEG in sRGB color profile. Mount the print behind UV-filtering acrylic or museum glass with acid-free corner hinges to prevent paper buckling over time."
      }
    ],
    "matrixHeading": "What are the standard large photo frame dimensions and pixel requirements?",
    "matrixP1": "When ordering frames from commercial retailers (such as West Elm, CB2, Target, or Michaels) or printing at retail labs (Walgreens, CVS, Walmart), choosing a standardized dimension eliminates custom framing surcharges. The reference matrix below outlines physical dimensions, metric equivalents, aspect ratios, and resolution requirements:",
    "tableHeaders": {
      "frameSize": "Frame Size (Inches)",
      "metricSize": "Metric Size (cm)",
      "aspectRatio": "Aspect Ratio",
      "canvas150": "150 DPI Canvas (Poster)",
      "canvas300": "300 DPI Canvas (Gallery)"
    },
    "tableRows": [
      {
        "frameSize": "8 × 10 in",
        "metricSize": "20.3 × 25.4 cm",
        "aspectRatio": "4:5 (1.25)",
        "canvas150": "1200 × 1500 px",
        "canvas300": "2400 × 3000 px"
      },
      {
        "frameSize": "11 × 14 in",
        "metricSize": "27.9 × 35.6 cm",
        "aspectRatio": "11:14 (1.27)",
        "canvas150": "1650 × 2100 px",
        "canvas300": "3300 × 4200 px"
      },
      {
        "frameSize": "12 × 18 in",
        "metricSize": "30.5 × 45.7 cm",
        "aspectRatio": "3:2 (Native DSLR)",
        "canvas150": "1800 × 2700 px",
        "canvas300": "3600 × 5400 px",
        "isNative": true
      },
      {
        "frameSize": "16 × 20 in",
        "metricSize": "40.6 × 50.8 cm",
        "aspectRatio": "4:5 (1.25)",
        "canvas150": "2400 × 3000 px",
        "canvas300": "4800 × 6000 px"
      },
      {
        "frameSize": "18 × 24 in",
        "metricSize": "45.7 × 61.0 cm",
        "aspectRatio": "3:4 (Micro 4/3 & iPhone)",
        "canvas150": "2700 × 3600 px",
        "canvas300": "5400 × 7200 px"
      },
      {
        "frameSize": "24 × 36 in",
        "metricSize": "61.0 × 91.4 cm",
        "aspectRatio": "3:2 (Master Poster)",
        "canvas150": "3600 × 5400 px",
        "canvas300": "7200 × 10800 px",
        "isNative": true
      }
    ],
    "mattingHeading": "How do mat board borders affect photo print size calculations?",
    "mattingP1": "An archival mat board (passe-partout) serves two essential functions: mechanical protection (preventing the glass from sticking to and damaging photographic emulsion) and aesthetic enhancement (drawing the viewer's eye into the focal point of the artwork).",
    "mattingP2": "When framing with a mat board, the exterior dimension of the mat matches the frame moulding, while the interior opening cut matches your photo print size. Standard industry pairings include:",
    "mattingBullets": [
      {
        "label": "11×14 in Frame with Mat",
        "text": "Holds an 8×10 in photo with a 1.5-inch border on all sides."
      },
      {
        "label": "16×20 in Frame with Mat",
        "text": "Holds an 11×14 in photo with a 2.5 to 3-inch border, or an 8×10 in photo with a wide 4-inch gallery mat."
      },
      {
        "label": "18×24 in Frame with Mat",
        "text": "Holds a 12×18 in photo with a 3-inch border on all sides."
      },
      {
        "label": "24×36 in Frame with Mat",
        "text": "Holds an 18×24 in photo or 20×30 in photo with a generous 3 to 3.5-inch border."
      }
    ],
    "mattingProTip": "Always order your print with a 0.25-inch (6mm) overlap relative to the mat window opening. If your mat opening is precisely 8×10 inches, print the image at 8.25×10.25 inches to prevent visible white paper margins from slipping past the bevel cut.",
    "hangingHeading": "What are the core gallery rules for hanging large framed prints?",
    "hangingP1": "Proper hanging height transforms how large framed prints are perceived in residential and gallery spaces. Curators follow three universal spatial rules:",
    "hangingRules": [
      {
        "label": "The 57-to-60 Inch Eye-Level Rule",
        "text": "The vertical center of the framed artwork should hang precisely 57 to 60 inches (145–152 cm) from the floor. To calculate nail height: divide the frame height by 2, add 58 inches, and subtract the drop distance from the top of the frame to the wire hanger."
      },
      {
        "label": "Furniture Proportionality (The 65–75% Rule)",
        "text": "When hanging a large print or gallery cluster above a sofa, headboard, or console table, the total frame width should span approximately 65% to 75% of the furniture's width. Leave 6 to 8 inches of open wall clearance above the furniture."
      },
      {
        "label": "Consistent Gallery Spacing",
        "text": "In multi-frame salon clusters or triptychs, maintain a uniform 2 to 3 inches (5–8 cm) of separation between adjacent frame mouldings."
      }
    ],
    "cta": {
      "badge": "FREE IN-BROWSER POSTER WORKSPACE",
      "title": "Format Large Poster Prints & Gang Sheets in Seconds",
      "text": "Arrange photos for 11×14, 16×20, and 24×36 prints online. Export calibrated 300 DPI master files with custom bleed margins and zero server uploads.",
      "btnPrimary": "Open Large Print Studio",
      "btnSecondary": "View Contact Sheet Guide"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Common questions about photo frame sizing, aspect ratios, and large poster printing.",
    "faqs": [
      {
        "question": "What are the most popular standard large photo frame sizes in the US?",
        "answer": "The five most popular standard large photo frame sizes in the United States are 11×14 inches (small poster), 12×18 inches (native 3:2 DSLR ratio), 16×20 inches (standard gallery size), 18×24 inches (medium architectural poster), and 24×36 inches (commercial large poster)."
      },
      {
        "question": "How do I choose between framing with a mat board versus full-bleed?",
        "answer": "Framing with a 2 to 3.5-inch archival mat board creates visual separation between the art and frame, preventing paper emulsion from sticking to the glass. Full-bleed framing works best for modern, graphic photography, posters, and minimalist aluminum gallery frames where maximum visual scale is desired."
      },
      {
        "question": "What image resolution in megapixels is required for a 24×36 inch print?",
        "answer": "For standard viewing distance (3+ feet), a 24×36 inch print at 150 DPI requires a 3600×5400 pixel image (19.4 megapixels). For critical close-up inspection at 300 DPI, it requires a 7200×10800 pixel master file (77.8 megapixels), which can be achieved natively or via bicubic canvas upscaling."
      },
      {
        "question": "Why does a 3:2 camera sensor crop when printed on an 8×10 or 16×20 frame?",
        "answer": "A native 35mm DSLR or mirrorless sensor produces images with a 3:2 (1.50) aspect ratio. However, 8×10 and 16×20 frames have a 5:4 (1.25) aspect ratio. Printing a 3:2 image to fill a 16×20 frame requires cropping approximately 16.7% of the total width."
      },
      {
        "question": "How high should large framed photos be hung on a wall?",
        "answer": "The standard museum gallery rule is to hang the center point of the framed photo at 57 to 60 inches (145–152 cm) from the finished floor. When hanging above furniture (such as a sofa or credenza), maintain 6 to 8 inches of clearance between the top of the furniture and bottom of the frame."
      },
      {
        "question": "How can I print multiple photos onto one large poster frame to save money?",
        "answer": "You can gang multiple 4×5, 5×7, or 8×10 images onto a single 16×20 or 24×36 poster canvas in Make Contact Sheet. Retail print labs like Walgreens, CVS, and Walmart offer large poster prints at deep discounts (often $10–$18 with coupons), saving up to 70% compared to ordering individual prints."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "Large Photo Frames & Print Sizes"
    }
  },
  "es": {
    "title": "Marcos de fotos grandes y tamaños de impresión — Guía de dimensiones y proporciones",
    "description": "Guía completa de marcos de fotos grandes y tamaños de impresión (11x14 a 24x36). Aprende proporciones, paspartú, fórmulas de DPI y reglas para colgar cuadros.",
    "badge": "GUÍA DE IMPRESIÓN Y ENMARCADO · 9 MIN DE LECTURA",
    "h1Pre": "Guía de marcos de fotos grandes y ",
    "h1Highlight": "Tamaños de impresión",
    "lead": "Domina los tamaños estándar de marcos fotográficos, proporciones de sensor, matemáticas de paspartú y resolución de impresión. Aprende a preparar imágenes para exposiciones, decoración y laboratorios.",
    "quickAnswerLabel": "Respuesta rápida / Referencia de dimensiones estándar",
    "quickAnswerText": "Los tamaños estándar más comunes de marcos grandes son 11×14 in (28×36 cm), 12×18 in (30×46 cm), 16×20 in (41×51 cm), 18×24 in (46×61 cm) y 24×36 in (61×91 cm). Para evitar recortar tus fotos, combina sensores 3:2 con marcos de 12×18 o 24×36, y sensores 4:3 con marcos de 18×24. Para exposiciones de galería, busca 300 DPI (4800×6000 px para 16×20) o 150 DPI (3600×5400 px para 24×36) para distancias normales de cartel.",
    "stepsHeading": "¿Cómo elegir y preparar fotos para marcos grandes?",
    "stepsIntro": "Sigue este esquema de estudio en 5 pasos para calcular resolución, adaptar proporciones y exportar copias de calidad museo:",
    "steps": [
      {
        "name": "Determinar la proporción y resolución nativa de la cámara",
        "text": "Verifica las dimensiones en píxeles y el ratio del sensor (3:2 en cámaras réflex y sin espejo, 4:3 en micro cuatro tercios y móviles). Asegúrate de alcanzar al menos 150 DPI para pósteres o 300 DPI para impresión artística fina."
      },
      {
        "name": "Seleccionar marco estándar frente a moldura a medida",
        "text": "Opta por dimensiones comerciales estándar (11×14, 16×20, 18×24 o 24×36 pulgadas) para evitar costosos sobrecostes de molduras personalizadas."
      },
      {
        "name": "Calcular la ventana del paspartú y los márgenes",
        "text": "Decide si enmarcarás a sangre o con paspartú protector. Un margen de 5 a 8 cm (2 a 3 pulgadas) realza la obra y evita que el papel toque directamente el cristal."
      },
      {
        "name": "Maquetar el lienzo de impresión con márgenes de sangrado",
        "text": "Usa Make Contact Sheet para componer fotos individuales o pliegos múltiples (gang sheets) con precisión milimétrica. Añade 3 mm de sangrado de seguridad."
      },
      {
        "name": "Exportar a 300 DPI en perfil sRGB y montar con materiales de conservación",
        "text": "Exporta tu archivo maestro en PNG o JPEG a 300 DPI en sRGB. Enmarca tras vidrio acrílico con filtro UV utilizando cantoneras libres de ácido para evitar deformaciones."
      }
    ],
    "matrixHeading": "¿Cuáles son las medidas estándar de marcos grandes y sus requisitos en píxeles?",
    "matrixP1": "Al comprar marcos comerciales o solicitar impresiones en laboratorios fotográficos, elegir un tamaño estándar evita sobrecostes. La tabla de referencia resume dimensiones, equivalencias métricas y requisitos de resolución:",
    "tableHeaders": {
      "frameSize": "Tamaño del marco (pulgadas)",
      "metricSize": "Tamaño métrico (cm)",
      "aspectRatio": "Relación de aspecto",
      "canvas150": "Lienzo a 150 DPI (Póster)",
      "canvas300": "Lienzo a 300 DPI (Galería)"
    },
    "tableRows": [
      {
        "frameSize": "8 × 10 in",
        "metricSize": "20.3 × 25.4 cm",
        "aspectRatio": "4:5 (1.25)",
        "canvas150": "1200 × 1500 px",
        "canvas300": "2400 × 3000 px"
      },
      {
        "frameSize": "11 × 14 in",
        "metricSize": "27.9 × 35.6 cm",
        "aspectRatio": "11:14 (1.27)",
        "canvas150": "1650 × 2100 px",
        "canvas300": "3300 × 4200 px"
      },
      {
        "frameSize": "12 × 18 in",
        "metricSize": "30.5 × 45.7 cm",
        "aspectRatio": "3:2 (Nativo réflex/sin espejo)",
        "canvas150": "1800 × 2700 px",
        "canvas300": "3600 × 5400 px",
        "isNative": true
      },
      {
        "frameSize": "16 × 20 in",
        "metricSize": "40.6 × 50.8 cm",
        "aspectRatio": "4:5 (1.25)",
        "canvas150": "2400 × 3000 px",
        "canvas300": "4800 × 6000 px"
      },
      {
        "frameSize": "18 × 24 in",
        "metricSize": "45.7 × 61.0 cm",
        "aspectRatio": "3:4 (Micro 4/3 y móviles)",
        "canvas150": "2700 × 3600 px",
        "canvas300": "5400 × 7200 px"
      },
      {
        "frameSize": "24 × 36 in",
        "metricSize": "61.0 × 91.4 cm",
        "aspectRatio": "3:2 (Póster maestro)",
        "canvas150": "3600 × 5400 px",
        "canvas300": "7200 × 10800 px",
        "isNative": true
      }
    ],
    "mattingHeading": "¿Cómo influyen los márgenes del paspartú en el cálculo del tamaño de impresión?",
    "mattingP1": "El paspartú (passe-partout) cumple dos funciones clave: protección mecánica (impide que la emulsión se adhiera al cristal y se dañe) y jerarquía visual (conduce la mirada hacia el centro de la imagen).",
    "mattingP2": "Al enmarcar con paspartú, la medida exterior coincide con la moldura y la ventana interior se ajusta a la foto. Las combinaciones estándar son:",
    "mattingBullets": [
      {
        "label": "Marco de 11×14 in con paspartú",
        "text": "Alberga una foto de 8×10 in con márgenes de unos 4 cm en cada lateral."
      },
      {
        "label": "Marco de 16×20 in con paspartú",
        "text": "Alberga una foto de 11×14 in con márgenes de 6 a 8 cm, o una foto de 8×10 in con paspartú ancho de galería."
      },
      {
        "label": "Marco de 18×24 in con paspartú",
        "text": "Alberga una foto de 12×18 in con márgenes de 7,5 cm en todo el perímetro."
      },
      {
        "label": "Marco de 24×36 in con paspartú",
        "text": "Alberga una foto de 18×24 in o 20×30 in con márgenes generosos de 8 a 9 cm."
      }
    ],
    "mattingProTip": "Consejo profesional: Pide siempre la impresión con un solapamiento de 6 mm (0,25 pulgadas) respecto a la ventana del paspartú para evitar que se vean bordes blancos en el corte biselado.",
    "hangingHeading": "¿Cuáles son las reglas básicas de galería para colgar cuadros grandes?",
    "hangingP1": "La altura a la que se cuelgan las fotos transforma la percepción del espacio. Los conservadores aplican tres reglas espaciales:",
    "hangingRules": [
      {
        "label": "La regla de la altura de ojos (145 a 152 cm)",
        "text": "El centro geométrico del cuadro debe quedar exactamente a 145–152 cm del suelo. Para calcular el punto del clavo: divide la altura del marco entre 2, suma 148 cm y resta la caída del alambre colgador."
      },
      {
        "label": "Proporción con el mobiliario (Regla del 65–75%)",
        "text": "Al colgar cuadros sobre sofás o consolas, el ancho del marco debe ocupar aproximadamente entre el 65% y el 75% del ancho del mueble, dejando entre 15 y 20 cm de separación vertical."
      },
      {
        "label": "Separación homogénea entre marcos",
        "text": "En composiciones de galería o trípticos, mantén una separación constante de 5 a 8 cm entre las molduras."
      }
    ],
    "cta": {
      "badge": "ESPACIO GRATUITO DE MAQUETACIÓN EN NAVEGADOR",
      "title": "Maqueta impresiones grandes y pliegos combinados en segundos",
      "text": "Organiza fotos para impresiones de 11×14, 16×20 y 24×36 pulgadas. Exporta copias maestras a 300 DPI con márgenes de sangrado y sin subir archivos a servidores.",
      "btnPrimary": "Abrir estudio de impresiones grandes",
      "btnSecondary": "Ver guía de hojas de contacto"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Dudas habituales sobre dimensiones de marcos, proporciones y formatos de impresión grande.",
    "faqs": [
      {
        "question": "¿Cuáles son los tamaños de marco grande más populares?",
        "answer": "Los cinco tamaños más comunes son 11×14 in (póster pequeño), 12×18 in (ratio réflex 3:2 nativo), 16×20 in (estándar de galería), 18×24 in (póster medio) y 24×36 in (gran póster comercial)."
      },
      {
        "question": "¿Cómo elijo entre enmarcar con paspartú o a sangre?",
        "answer": "Enmarcar con paspartú crea separación visual y protege la emulsión fotográfica del contacto directo con el cristal. El enmarcado a sangre funciona mejor en fotografía moderna, carteles gráficos y molduras minimalistas de aluminio."
      },
      {
        "question": "¿Cuántos megapíxeles se necesitan para imprimir en 24×36 pulgadas (60×90 cm)?",
        "answer": "Para una distancia de observación normal (más de 1 metro), un póster de 24×36 a 150 DPI requiere unos 19,4 megapíxeles (3600×5400 px). Para examen minucioso de cerca a 300 DPI se necesitan unos 77,8 megapíxeles (7200×10800 px)."
      },
      {
        "question": "¿Por qué se recortan las fotos 3:2 al imprimirlas en marcos de 8×10 o 16×20?",
        "answer": "Los sensores réflex de 35 mm producen imágenes con relación 3:2 (1,50). En cambio, los marcos de 8×10 y 16×20 tienen una relación de 5:4 (1,25). Ajustar la foto completa implica recortar aproximadamente un 16,7% del ancho."
      },
      {
        "question": "¿A qué altura exacta se deben colgar los cuadros en la pared?",
        "answer": "La norma internacional de galerías sitúa el centro del cuadro entre 145 y 152 cm del suelo terminado. Si se coloca sobre un mueble, deja de 15 a 20 cm de margen sobre el respaldo."
      },
      {
        "question": "¿Cómo puedo combinar varias fotos en un póster grande para ahorrar dinero?",
        "answer": "Puedes agrupar varias fotos de 4×5, 5×7 u 8×10 pulgadas dentro de un único lienzo de 16×20 o 24×36 en Make Contact Sheet. Los laboratorios comerciales ofrecen precios muy reducidos para pósteres individuales, ahorrando hasta un 70% frente a pedir copias sueltas."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Marcos grandes y tamaños de impresión"
    }
  },
  "de": {
    "title": "Große Bilderrahmen & Fotodruckformate — Maße, Auflösung & Zuschnitt",
    "description": "Umfassender Leitfaden zu großen Bilderrahmen und Druckgrößen (11x14 bis 24x36 Zoll). Seitenverhältnisse, Passepartout-Berechnung, DPI und Hängeregeln.",
    "badge": "DRUCK- & RAHMEN-LEITFADEN · 9 MIN LESEZEIT",
    "h1Pre": "Große Bilderrahmen & ",
    "h1Highlight": "Fotodruckformate",
    "lead": "Meistern Sie standardisierte Rahmenmaße, Sensor-Seitenverhältnisse, Passepartout-Berechnungen und Druckauflösungen für Ausstellungen und Heimdekoration.",
    "quickAnswerLabel": "Kurzantwort / Standardmaße im Überblick",
    "quickAnswerText": "Typische Standardgrößen für große Bilderrahmen sind 11×14 Zoll (28×36 cm), 12×18 Zoll (30×46 cm), 16×20 Zoll (41×51 cm), 18×24 Zoll (46×61 cm) und 24×36 Zoll (61×91 cm). Um Zuschnittverluste zu vermeiden, kombinieren Sie 3:2-Kamerasensoren mit 12×18 oder 24×36 Rahmen und 4:3-Sensoren mit 18×24 Rahmen. Für Galeriequalität empfiehlt sich eine Ausgabequalität von 300 DPI (4800×6000 px für 16×20), bei Postern genügen oft 150 DPI.",
    "stepsHeading": "Wie wählt und bereitet man Fotos für große Rahmen vor?",
    "stepsIntro": "Folgen Sie diesem 5-Stufen-Leitfaden, um Bildauflösung, Seitenverhältnisse und Schnittzugaben fehlerfrei abzustimmen:",
    "steps": [
      {
        "name": "Natives Kamerasensor-Format und Auflösung prüfen",
        "text": "Prüfen Sie das Seitenverhältnis Ihrer Ausgangsdatei (3:2 bei Vollformat/APS-C, 4:3 bei Micro Four Thirds und Smartphones). Für Galerieausdrucke sollten mindestens 300 DPI, für Poster 150 DPI vorliegen."
      },
      {
        "name": "Standard-Rahmengröße statt Maßanfertigung wählen",
        "text": "Wählen Sie gängige Handelsmaße (z. B. 12×18, 16×20 oder 24×36 Zoll bzw. DIN-Formate A3/A2/A1), um kostspielige Sonderanfertigungen zu vermeiden."
      },
      {
        "name": "Passepartout-Ausschnitt und Randabstände berechnen",
        "text": "Entscheiden Sie zwischen randlosem Vollbilddruck und Rahmung mit Passepartout. Ein 5 bis 8 cm breiter Karton schützt das Bild und verleiht ihm optische Tiefe."
      },
      {
        "name": "Druckleinwand mit Anschnittzugabe anlegen",
        "text": "Nutzen Sie Make Contact Sheet für Einzelbilder oder Sammeldruckbögen (Gang Sheets). Planen Sie 3 mm Sicherheitsbeschnitt an allen Außenkanten ein."
      },
      {
        "name": "In 300 DPI sRGB exportieren und archivgerecht rahmen",
        "text": "Laden Sie druckfertige Dateien als unkomprimiertes 300-DPI-PNG oder JPEG im sRGB-Farbraum herunter. Verwenden Sie UV-Schutzglas und säurefreie Fixierecken."
      }
    ],
    "matrixHeading": "Standardformate für große Bilderrahmen und Pixelanforderungen",
    "matrixP1": "Die Wahl von Standardmaßen erleichtert den Kauf fertiger Rahmen im Handel erheblich. Die folgende Übersicht zeigt Maße, Seitenverhältnisse und Pixelanforderungen:",
    "tableHeaders": {
      "frameSize": "Rahmengröße (Zoll)",
      "metricSize": "Metrisches Maß (cm)",
      "aspectRatio": "Seitenverhältnis",
      "canvas150": "150 DPI Leinwand (Poster)",
      "canvas300": "300 DPI Leinwand (Galerie)"
    },
    "tableRows": [
      {
        "frameSize": "8 × 10 in",
        "metricSize": "20,3 × 25,4 cm",
        "aspectRatio": "4:5 (1,25)",
        "canvas150": "1200 × 1500 px",
        "canvas300": "2400 × 3000 px"
      },
      {
        "frameSize": "11 × 14 in",
        "metricSize": "27,9 × 35,6 cm",
        "aspectRatio": "11:14 (1,27)",
        "canvas150": "1650 × 2100 px",
        "canvas300": "3300 × 4200 px"
      },
      {
        "frameSize": "12 × 18 in",
        "metricSize": "30,5 × 45,7 cm",
        "aspectRatio": "3:2 (Natives DSLR-Format)",
        "canvas150": "1800 × 2700 px",
        "canvas300": "3600 × 5400 px",
        "isNative": true
      },
      {
        "frameSize": "16 × 20 in",
        "metricSize": "40,6 × 50,8 cm",
        "aspectRatio": "4:5 (1,25)",
        "canvas150": "2400 × 3000 px",
        "canvas300": "4800 × 6000 px"
      },
      {
        "frameSize": "18 × 24 in",
        "metricSize": "45,7 × 61,0 cm",
        "aspectRatio": "3:4 (Micro 4/3 & iPhone)",
        "canvas150": "2700 × 3600 px",
        "canvas300": "5400 × 7200 px"
      },
      {
        "frameSize": "24 × 36 in",
        "metricSize": "61,0 × 91,4 cm",
        "aspectRatio": "3:2 (Master-Poster)",
        "canvas150": "3600 × 5400 px",
        "canvas300": "7200 × 10800 px",
        "isNative": true
      }
    ],
    "mattingHeading": "Passepartout-Berechnung und Bildgrößen",
    "mattingP1": "Ein Passepartout erfüllt zwei Zwecke: Es verhindert, dass die Fotoemulsion direkt am Glas anhaftet, und lenkt den Blick des Betrachters auf das Kunstwerk.",
    "mattingP2": "Das Außenmaß des Passepartouts entspricht der Rahmenleiste, der Innenausschnitt dem Fotodruck. Typische Kombinationen:",
    "mattingBullets": [
      {
        "label": "11×14 Zoll Rahmen mit Passepartout",
        "text": "Für 8×10 Zoll Fotos mit ca. 4 cm umlaufendem Rand."
      },
      {
        "label": "16×20 Zoll Rahmen mit Passepartout",
        "text": "Für 11×14 Zoll Fotos oder 8×10 Zoll Fotos mit breitem Galerierand."
      },
      {
        "label": "18×24 Zoll Rahmen mit Passepartout",
        "text": "Für 12×18 Zoll Fotos mit ca. 7,5 cm umlaufendem Rand."
      },
      {
        "label": "24×36 Zoll Rahmen mit Passepartout",
        "text": "Für 18×24 Zoll oder 20×30 Zoll Fotos mit 8 bis 9 cm Passepartout-Breite."
      }
    ],
    "mattingProTip": "Profitipp: Bestellen Sie den Abzug immer ca. 5 bis 6 mm größer als den Passepartout-Ausschnitt, um weiße Schnittspalten zuverlässig zu verhindern.",
    "hangingHeading": "Galerie-Regeln für das Aufhängen großer Bilder",
    "hangingP1": "Die Aufhängehöhe bestimmt die Wirkung im Raum. Kuratoren orientieren sich an drei Grundregeln:",
    "hangingRules": [
      {
        "label": "Die 145–150-cm-Augenhöhen-Regel",
        "text": "Die vertikale Mitte des Bildes sollte sich ca. 145 bis 150 cm über dem Fußboden befinden."
      },
      {
        "label": "Möbel-Proportionalität (65–75%-Regel)",
        "text": "Über Sofas oder Sideboards sollte das Bild etwa zwei Drittel bis drei Viertel der Möbelbreite einnehmen und ca. 15 bis 20 cm darüber hängen."
      },
      {
        "label": "Einheitliche Abstände",
        "text": "Bei Bilderwänden empfiehlt sich ein gleichmäßiger Abstand von 5 bis 8 cm zwischen den Leisten."
      }
    ],
    "cta": {
      "badge": "KOSTENLOSES BROWSER-STUDIO",
      "title": "Großformatdrucke & Sammelbögen sofort anlegen",
      "text": "Arrangieren Sie Fotos für Posterformate online. Exportieren Sie 300-DPI-Masterdateien ohne Cloud-Upload.",
      "btnPrimary": "Großformat-Studio öffnen",
      "btnSecondary": "Kontaktabzug-Leitfaden lesen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Praxisnahe Antworten zu Rahmengrößen, Seitenverhältnissen und Großformatdrucken.",
    "faqs": [
      {
        "question": "Welche Rahmenmaße sind am weitesten verbreitet?",
        "answer": "Besonders beliebt sind 12×18 Zoll (30×45 cm für 3:2-DSLRs), 16×20 Zoll (40×50 cm Galerieformat), 18×24 Zoll (45×60 cm) und 24×36 Zoll (60×90 cm) sowie die DIN-Formate A3, A2 und A1."
      },
      {
        "question": "Passepartout oder randloser Vollbilddruck?",
        "answer": "Passepartouts schützen die Emulsion und wirken klassisch edel. Randloser Druck passt hervorragend zu moderner Architekturfotografie und minimalistischen Alurahmen."
      },
      {
        "question": "Wie viel Megapixel braucht ein 60×90 cm (24×36 Zoll) Druck?",
        "answer": "Bei 150 DPI genügen ca. 20 Megapixel (3600×5400 px). Für extrem scharfe Betrachtung aus nächster Nähe bei 300 DPI werden ca. 78 Megapixel benötigt."
      },
      {
        "question": "Warum wird mein 3:2-Foto bei 16×20 Zoll Rahmen beschnitten?",
        "answer": "35mm-Kameras haben ein Seitenverhältnis von 3:2 (1,50), während ein 16×20 Zoll Rahmen dem Verhältnis 5:4 (1,25) entspricht. Beim Füllen des Rahmens gehen ca. 16,7 % der Bildbreite verloren."
      },
      {
        "question": "In welcher Höhe sollten große Bilder hängen?",
        "answer": "Als Richtwert gilt: Die Bildmitte sollte auf 145–150 cm Höhe liegen. Über Möbeln sollte ein Abstand von 15 bis 20 cm eingehalten werden."
      },
      {
        "question": "Wie kann ich mehrere Fotos auf ein großes Poster drucken?",
        "answer": "In Make Contact Sheet können Sie mehrere 10×15 oder 13×18 cm Bilder auf einer einzigen 50×70 oder 60×90 cm Leinwand als Sammelbogen (Gang Sheet) anordnen und günstig drucken lassen."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Bilderrahmen & Druckgrößen"
    }
  },
  "fr": {
    "title": "Cadres photo grand format & tailles d'impression — Dimensions & Ratios",
    "description": "Guide complet des cadres photo grand format et tailles de tirage (11x14 à 24x36 pouces). Ratios de capteur, passe-partout, DPI et accrochage de galerie.",
    "badge": "GUIDE D'IMPRESSION & ENCADREMENT · 9 MIN DE LECTURE",
    "h1Pre": "Cadres photo grand format & ",
    "h1Highlight": "Tailles d'impression",
    "lead": "Maîtrisez les dimensions de cadre standardisées, les ratios de capteur, les calculs de passe-partout et les résolutions d'impression pour expositions et décoration d'intérieur.",
    "quickAnswerLabel": "Réponse rapide / Tableau des formats courants",
    "quickAnswerText": "Les formats courants de cadres grand format sont 11×14 pouces (28×36 cm), 12×18 pouces (30×46 cm), 16×20 pouces (41×51 cm), 18×24 pouces (46×61 cm) et 24×36 pouces (61×91 cm). Pour éviter de rogner vos images, associez les capteurs 3:2 aux cadres 12×18 ou 24×36, et les capteurs 4:3 aux cadres 18×24. Pour des tirages d'exposition haut de gamme, visez 300 DPI (4800×6000 px pour du 16×20) ou 150 DPI pour des affiches grand format.",
    "stepsHeading": "Comment choisir et préparer ses photos pour de grands cadres ?",
    "stepsIntro": "Suivez cette démarche en 5 étapes pour calculer la définition, respecter les proportions et exporter des tirages d'art :",
    "steps": [
      {
        "name": "Identifier le ratio natif du capteur et sa résolution",
        "text": "Vérifiez le rapport hauteur/largeur d'origine (3:2 sur reflex/hybride plein format, 4:3 en micro 4/3 et smartphone). Prévoyez 300 DPI pour les tirages d'art ou 150 DPI pour les posters."
      },
      {
        "name": "Privilégier un format de cadre standardisé",
        "text": "Choisissez des dimensions industrielles répandues (ex. 30×45, 40×50, 50×70, 60×90 cm ou 12×18, 16×20, 24×36 pouces) pour éviter le surcoût d'un encadrement sur mesure."
      },
      {
        "name": "Calculer l'ouverture du passe-partout et les marges",
        "text": "Décidez entre un tirage plein cadre et un encadrement sous passe-partout. Une marge de 5 à 8 cm isole l'œuvre du verre et rehausse sa valeur visuelle."
      },
      {
        "name": "Mettre en page la toile avec fond perdu de sécurité",
        "text": "Utilisez Make Contact Sheet pour composer vos tirages seuls ou en planches d'amalgame (gang sheets) avec précision millimétrique. Ajoutez 3 mm de fond perdu."
      },
      {
        "name": "Exporter en 300 DPI sRGB et encadrer avec soin",
        "text": "Générez votre fichier en PNG ou JPEG 300 DPI dans le profil sRGB. Utilisez un verre anti-reflet/anti-UV et des coins de fixation sans acide pour protéger le tirage dans le temps."
      }
    ],
    "matrixHeading": "Formats standards de cadres et définition en pixels",
    "matrixP1": "Choisir une dimension standard facilite l'achat de cadres dans le commerce. Le tableau récapitule dimensions, équivalences métriques et résolutions :",
    "tableHeaders": {
      "frameSize": "Format cadre (pouces)",
      "metricSize": "Format métrique (cm)",
      "aspectRatio": "Rapport d'aspect",
      "canvas150": "Toile 150 DPI (Poster)",
      "canvas300": "Toile 300 DPI (Galerie)"
    },
    "tableRows": [
      {
        "frameSize": "8 × 10 in",
        "metricSize": "20,3 × 25,4 cm",
        "aspectRatio": "4:5 (1,25)",
        "canvas150": "1200 × 1500 px",
        "canvas300": "2400 × 3000 px"
      },
      {
        "frameSize": "11 × 14 in",
        "metricSize": "27,9 × 35,6 cm",
        "aspectRatio": "11:14 (1,27)",
        "canvas150": "1650 × 2100 px",
        "canvas300": "3300 × 4200 px"
      },
      {
        "frameSize": "12 × 18 in",
        "metricSize": "30,5 × 45,7 cm",
        "aspectRatio": "3:2 (Natif reflex/hybride)",
        "canvas150": "1800 × 2700 px",
        "canvas300": "3600 × 5400 px",
        "isNative": true
      },
      {
        "frameSize": "16 × 20 in",
        "metricSize": "40,6 × 50,8 cm",
        "aspectRatio": "4:5 (1,25)",
        "canvas150": "2400 × 3000 px",
        "canvas300": "4800 × 6000 px"
      },
      {
        "frameSize": "18 × 24 in",
        "metricSize": "45,7 × 61,0 cm",
        "aspectRatio": "3:4 (Micro 4/3 & iPhone)",
        "canvas150": "2700 × 3600 px",
        "canvas300": "5400 × 7200 px"
      },
      {
        "frameSize": "24 × 36 in",
        "metricSize": "61,0 × 91,4 cm",
        "aspectRatio": "3:2 (Grand poster)",
        "canvas150": "3600 × 5400 px",
        "canvas300": "7200 × 10800 px",
        "isNative": true
      }
    ],
    "mattingHeading": "Calcul du passe-partout et dimensions d'impression",
    "mattingP1": "Le passe-partout remplit une double mission : protéger l'émulsion contre le contact direct avec le verre et guider le regard vers l'œuvre.",
    "mattingP2": "La dimension extérieure du passe-partout correspond au cadre, tandis que la découpe intérieure s'ajuste au tirage :",
    "mattingBullets": [
      {
        "label": "Cadre 11×14 pouces avec passe-partout",
        "text": "Accueille une photo 8×10 pouces avec une marge d'environ 4 cm sur tous les côtés."
      },
      {
        "label": "Cadre 16×20 pouces avec passe-partout",
        "text": "Accueille une photo 11×14 pouces (marges de 6 cm) ou 8×10 pouces avec large marge de musée."
      },
      {
        "label": "Cadre 18×24 pouces avec passe-partout",
        "text": "Accueille une photo 12×18 pouces avec une marge équilibrée de 7,5 cm."
      },
      {
        "label": "Cadre 24×36 pouces avec passe-partout",
        "text": "Accueille une photo 18×24 ou 20×30 pouces avec des bordures de 8 à 9 cm."
      }
    ],
    "mattingProTip": "Conseil de professionnel : Commandez toujours votre tirage avec un débord de 5 à 6 mm par rapport à l'ouverture du passe-partout pour masquer les bords blancs.",
    "hangingHeading": "Règles muséales pour suspendre de grands tableaux",
    "hangingP1": "La hauteur d'accrochage transforme la perception de la pièce :",
    "hangingRules": [
      {
        "label": "La règle du niveau des yeux (145–150 cm)",
        "text": "Le centre du tableau doit se trouver à environ 145 à 150 cm du sol."
      },
      {
        "label": "Proportion par rapport au mobilier (65–75%)",
        "text": "Au-dessus d'un canapé ou d'une commode, le tableau doit occuper environ 65 à 75 % de la largeur du meuble, avec 15 à 20 cm de dégagement vertical."
      },
      {
        "label": "Espacement régulier",
        "text": "Dans les compositions murales, maintenez un intervalle homogène de 5 à 8 cm entre les cadres."
      }
    ],
    "cta": {
      "badge": "ESPACE DE TRAVAIL GRAND FORMAT",
      "title": "Mettez en page vos tirages géants en quelques secondes",
      "text": "Préparez des photos pour cadres 30×45, 40×50 et 60×90 cm. Exportez en 300 DPI sans transfert sur des serveurs distants.",
      "btnPrimary": "Ouvrir le studio Grand Format",
      "btnSecondary": "Consulter le guide Planche Contact"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Réponses pratiques sur les dimensions de cadre, les formats de capteur et l'impression d'affiches.",
    "faqs": [
      {
        "question": "Quels sont les formats de cadre grand format les plus courants ?",
        "answer": "Les tailles les plus fréquentes sont le 30×45 cm (12×18 in), le 40×50 cm (16×20 in), le 50×70 cm et le 60×90 cm (24×36 in)."
      },
      {
        "question": "Plein cadre ou avec passe-partout ?",
        "answer": "Le passe-partout protège l'émulsion du tirage et apporte une finition muséale. Le plein cadre convient parfaitement aux affiches graphiques et aux cadres aluminium fins."
      },
      {
        "question": "Quelle définition d'image faut-il pour un tirage 60×90 cm ?",
        "answer": "À distance normale d'observation (plus d'un mètre), 150 DPI suffisent (~20 mégapixels). Pour une observation minutieuse de près à 300 DPI, prévoyez un fichier de 78 mégapixels."
      },
      {
        "question": "Pourquoi une photo 3:2 est-elle rognée dans un cadre 40×50 cm ?",
        "answer": "Le ratio 3:2 correspond à 1,50 alors que le 40×50 cm correspond au ratio 5:4 (1,25). Pour remplir tout le cadre, environ 16,7 % de la largeur doit être recadré."
      },
      {
        "question": "À quelle hauteur accrocher un tableau ?",
        "answer": "Le centre de l'œuvre doit être à 145–150 cm du sol. Au-dessus d'un meuble, conservez 15 à 20 cm d'espace libre."
      },
      {
        "question": "Comment imprimer plusieurs photos sur un seul grand poster pour économiser ?",
        "answer": "Dans Make Contact Sheet, vous pouvez assembler plusieurs photos 10×15 ou 13×18 cm sur une toile 50×70 ou 60×90 cm (planche d'amalgame) et faire tirer l'ensemble au prix d'un seul poster."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Cadres photo grand format"
    }
  },
  "ja": {
    "title": "大型フォトフレーム規格とプリントサイズ寸法ガイド — 縦横比と計算式",
    "description": "大型写真フレームと印刷サイズ（11x14〜24x36インチ）の完全ガイド。アスペクト比、マットボード計算、DPI計算式、展示用配置ルールを解説。",
    "badge": "印刷＆額装ガイド · 読了目安 9分",
    "h1Pre": "大型フォトフレーム規格＆",
    "h1Highlight": "プリントサイズ寸法ガイド",
    "lead": "標準的な写真額縁の寸法、センサーの縦横比、マットボード（台紙）の計算式、印刷解像度の基準を解説。ギャラリー展示やインテリアに最適なプリントを作成しましょう。",
    "quickAnswerLabel": "クイック回答 / 標準寸法リファレンス",
    "quickAnswerText": "代表的な大型写真フレーム規格は11×14インチ（28×36cm）、12×18インチ（30×46cm）、16×20インチ（41×51cm）、18×24インチ（46×61cm）、24×36インチ（61×91cm）です。写真の端がトリミングされるのを防ぐには、3:2センサーの写真には12×18または24×36フレームを、4:3センサーの写真には18×24フレームを合わせます。ギャラリー鑑賞用プリントは300 DPI、ポスター鑑賞距離なら150 DPIを基準とします。",
    "stepsHeading": "大型フレーム用プリントの選定・作成5ステップ",
    "stepsIntro": "解像度計算からフレームのアスペクト比適合、展示品質マスターデータの出力までの5工程です：",
    "steps": [
      {
        "name": "カメラセンサー固有の縦横比と解像度の確認",
        "text": "元画像のピクセル数とアスペクト比（フルサイズ一眼は3:2、マイクロフォーサーズやスマホは4:3）を確認します。展示用には300 DPI、ポスターには最低150 DPIを確保します。"
      },
      {
        "name": "既製標準フレームと特注オーダーの選択",
        "text": "割高な特注額装を避けるため、流通量の多い市販規格（A3/A2/A1や12×18、16×20、24×36インチ）を優先的に選択します。"
      },
      {
        "name": "マットボードの窓抜き寸法と余白幅の計算",
        "text": "全面フチなしにするか、マットボード（台紙）を挟むかを決定します。5〜8cmの余白を設けることで、印画紙がアクリル板に密着するのを防ぎ、作品の格調を高めます。"
      },
      {
        "name": "裁ち落とし（ブリード）余白を考慮したレイアウト",
        "text": "Make Contact Sheetを使用して、単一の引き伸ばしプリントまたは複数カットをまとめた付け合わせ印刷用キャンバスを作成します。端に3mmの安全マージンを設定します。"
      },
      {
        "name": "300 DPI sRGBでの書き出しと保存用額装",
        "text": "sRGBカラープロファイルの非圧縮300 DPIファイルを出力します。経年劣化や紙の波打ちを防ぐため、UVカットアクリルと無酸性のコーナーヒンジで額装します。"
      }
    ],
    "matrixHeading": "大型写真フレームの標準寸法と必要ピクセル数",
    "matrixP1": "市販フレームやフォトラボの大型プリント規格に適合させるための寸法・解像度対照表です：",
    "tableHeaders": {
      "frameSize": "フレーム寸法（インチ）",
      "metricSize": "メートル法寸法（cm）",
      "aspectRatio": "アスペクト比",
      "canvas150": "150 DPI時（ポスター）",
      "canvas300": "300 DPI時（ギャラリー）"
    },
    "tableRows": [
      {
        "frameSize": "8 × 10 in",
        "metricSize": "20.3 × 25.4 cm",
        "aspectRatio": "4:5 (1.25)",
        "canvas150": "1200 × 1500 px",
        "canvas300": "2400 × 3000 px"
      },
      {
        "frameSize": "11 × 14 in",
        "metricSize": "27.9 × 35.6 cm",
        "aspectRatio": "11:14 (1.27)",
        "canvas150": "1650 × 2100 px",
        "canvas300": "3300 × 4200 px"
      },
      {
        "frameSize": "12 × 18 in",
        "metricSize": "30.5 × 45.7 cm",
        "aspectRatio": "3:2（一眼レフ標準）",
        "canvas150": "1800 × 2700 px",
        "canvas300": "3600 × 5400 px",
        "isNative": true
      },
      {
        "frameSize": "16 × 20 in",
        "metricSize": "40.6 × 50.8 cm",
        "aspectRatio": "4:5 (1.25)",
        "canvas150": "2400 × 3000 px",
        "canvas300": "4800 × 6000 px"
      },
      {
        "frameSize": "18 × 24 in",
        "metricSize": "45.7 × 61.0 cm",
        "aspectRatio": "3:4（M4/3＆スマホ）",
        "canvas150": "2700 × 3600 px",
        "canvas300": "5400 × 7200 px"
      },
      {
        "frameSize": "24 × 36 in",
        "metricSize": "61.0 × 91.4 cm",
        "aspectRatio": "3:2（大判ポスター）",
        "canvas150": "3600 × 5400 px",
        "canvas300": "7200 × 10800 px",
        "isNative": true
      }
    ],
    "mattingHeading": "マットボードの余白計算と写真サイズの関係",
    "mattingP1": "マットボード（中抜き台紙）には、印画紙の乳剤が前面ガラスに張り付いて破損するのを防ぐ物理的保護と、鑑賞者の視線を中央へ引き込む美的な効果の2つの役割があります。",
    "mattingP2": "マットの外寸をフレームに合わせ、窓抜き部分を写真サイズに合わせる代表的な組み合わせ：",
    "mattingBullets": [
      {
        "label": "11×14インチ額＋マット",
        "text": "8×10インチの写真を収め、全周に約4cmの均等な余白を確保します。"
      },
      {
        "label": "16×20インチ額＋マット",
        "text": "11×14インチ写真を6〜8cmの余白で収めるか、8×10インチ写真を広めのギャラリーマットで額装します。"
      },
      {
        "label": "18×24インチ額＋マット",
        "text": "12×18インチ写真（一眼レフ標準3:2）を全周7.5cmの余白で収めます。"
      },
      {
        "label": "24×36インチ額＋マット",
        "text": "18×24または20×30インチの写真を8〜9cmのゆったりとした余白で収めます。"
      }
    ],
    "mattingProTip": "プロのアドバイス：マットの窓抜き寸法よりも、写真を全周約6mm（0.25インチ）大きめにプリントしてください。窓抜きの斜めカット（ベベル）から白い下地が見えてしまうのを防げます。",
    "hangingHeading": "大型写真を美しく飾るギャラリーの展示ルール",
    "hangingP1": "適切な高さに飾ることで作品の印象が劇的に変わります：",
    "hangingRules": [
      {
        "label": "目線の高さルール（床から145〜150cm）",
        "text": "額装の中心点が床面から145〜150cmの高さに来るように設置します。"
      },
      {
        "label": "家具との比率ルール（家具幅の65〜75%）",
        "text": "ソファやサイドボードの上に飾る場合、額の総幅が家具の幅の約3分の2〜4分の3に収まるようにし、家具の上端から15〜20cmの空間を空けます。"
      },
      {
        "label": "均一な展示間隔（5〜8cm）",
        "text": "複数枚を並べて飾る場合は、フレーム間の隙間を均一に5〜8cmで統一します。"
      }
    ],
    "cta": {
      "badge": "無料・ブラウザ完結型ポスター作成",
      "title": "大型プリント＆付け合わせシートを数秒で作成",
      "text": "11×14、16×20、24×36インチのプリント配置をオンラインで完結。安全なローカル処理で300 DPI印刷データを出力できます。",
      "btnPrimary": "大型プリントスタジオを開く",
      "btnSecondary": "コンタクトシートガイドを見る"
    },
    "faqHeading": "よくある質問",
    "faqSub": "フレームサイズ、センサーの縦横比、大判印刷に関するプロの回答です。",
    "faqs": [
      {
        "question": "日本や海外で最も人気のある大型フレームサイズは？",
        "answer": "国際規格のA3・A2・A1に加え、インチ規格の12×18（約30×45cm・3:2比率）、16×20（約40×50cm）、24×36（約60×90cm）が広く親しまれています。"
      },
      {
        "question": "マットボードありとフチなし全面プリントの選び方は？",
        "answer": "作品の保護と高級感を重視するならマットボード額装、現代的なグラフィックやポスターで迫力を出したいならフチなし全面額装が適しています。"
      },
      {
        "question": "24×36インチ（約60×90cm）の印刷に必要な画素数は？",
        "answer": "ポスター鑑賞距離（1m以上）の150 DPIなら約2000万画素（3600×5400px）で十分です。至近距離での鑑賞を想定した300 DPIなら約7800万画素が必要となります。"
      },
      {
        "question": "なぜ3:2の写真が16×20フレームでトリミングされるのですか？",
        "answer": "一眼レフの3:2（1.50）に対し、16×20フレームは5:4（1.25）の比率であるため、画面いっぱいに広げると左右の約16.7%がカットされます。"
      },
      {
        "question": "壁に掛ける最適な高さは？",
        "answer": "美術館の基本ルールとして、作品の中央が床から145〜150cmの高さになるように設置するのが最も自然に見えます。"
      },
      {
        "question": "1枚の大型ポスターに複数の写真をまとめて安く印刷できますか？",
        "answer": "Make Contact Sheetを使えば、16×20や24×36インチのキャンバス上に複数の2L判や六つ切り写真を面付け（ギャングシート化）して、ポスター1枚分の格安料金で印刷できます。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "大型額縁＆プリント寸法ガイド"
    }
  },
  "pt": {
    "title": "Molduras grandes e tamanhos de impressão — Guia de medidas e proporções",
    "description": "Guia completo de molduras para fotos e tamanhos de impressão (11x14 a 24x36 pol.). Proporções de sensor, paspartú, DPI e regras para pendurar quadros.",
    "badge": "GUIA DE IMPRESSÃO & ENQUADRAMENTO · 9 MIN DE LEITURA",
    "h1Pre": "Molduras para fotos grandes & ",
    "h1Highlight": "Tamanhos de impressão",
    "lead": "Domine as medidas de molduras convencionais, proporções de sensores, cálculos de paspartú e resoluções para galerias, decoração e laboratórios fotográficos.",
    "quickAnswerLabel": "Resposta rápida / Tabela de medidas padrão",
    "quickAnswerText": "Os tamanhos de molduras grandes mais utilizados são 11×14 pol. (28×36 cm), 12×18 pol. (30×46 cm), 16×20 pol. (41×51 cm), 18×24 pol. (46×61 cm) e 24×36 pol. (61×91 cm). Para não cortar partes da sua imagem, combine fotos de sensores 3:2 com molduras 12×18 ou 24×36, e sensores 4:3 com molduras 18×24. Para exposições, mire em 300 DPI (4800×6000 px para 16×20) ou 150 DPI para pôsteres.",
    "stepsHeading": "Como escolher e preparar fotos para molduras grandes?",
    "stepsIntro": "Siga este roteiro de 5 etapas para calcular a definição ideal e exportar impressões perfeitas:",
    "steps": [
      {
        "name": "Identificar a proporção e resolução original da câmera",
        "text": "Verifique a proporção nativa do arquivo (geralmente 3:2 em câmeras profissionais reflex ou mirrorless e 4:3 em smartphones). Assegure pelo menos 150 DPI para pôsteres ou 300 DPI para cópias de galeria."
      },
      {
        "name": "Optar por molduras padrão de mercado",
        "text": "Escolha tamanhos consagrados (como 12×18, 16×20 ou 24×36 pol.) para não depender de marcenaria sob medida de alto custo."
      },
      {
        "name": "Calcular as margens da janela de paspartú",
        "text": "Defina se fará um enquadramento sangrado ou com paspartú protetor. Margens de 5 a 8 cm valorizam o trabalho e evitam que a foto grude no vidro."
      },
      {
        "name": "Diagramar a tela com margem de sangria de segurança",
        "text": "Utilize o Make Contact Sheet para dispor ampliações individuais ou folhas de aproveitamento múltiplo com precisão milimétrica. Insira 3 mm de sangria."
      },
      {
        "name": "Exportar em 300 DPI sRGB e montar com materiais de conservação",
        "text": "Gere seu arquivo final em PNG ou JPEG a 300 DPI no perfil sRGB. Monte o quadro com acrílico anti-UV e cantoneiras livres de ácido."
      }
    ],
    "matrixHeading": "Tabela de medidas de molduras grandes e resolução necessária",
    "matrixP1": "Ao comprar molduras prontas ou encomendar cópias em laboratórios, dimensões consagradas evitam desperdício. Confira as especificações:",
    "tableHeaders": {
      "frameSize": "Tamanho da moldura (pol.)",
      "metricSize": "Tamanho métrico (cm)",
      "aspectRatio": "Proporção de tela",
      "canvas150": "Tela a 150 DPI (Pôster)",
      "canvas300": "Tela a 300 DPI (Galeria)"
    },
    "tableRows": [
      {
        "frameSize": "8 × 10 in",
        "metricSize": "20,3 × 25,4 cm",
        "aspectRatio": "4:5 (1,25)",
        "canvas150": "1200 × 1500 px",
        "canvas300": "2400 × 3000 px"
      },
      {
        "frameSize": "11 × 14 in",
        "metricSize": "27,9 × 35,6 cm",
        "aspectRatio": "11:14 (1,27)",
        "canvas150": "1650 × 2100 px",
        "canvas300": "3300 × 4200 px"
      },
      {
        "frameSize": "12 × 18 in",
        "metricSize": "30,5 × 45,7 cm",
        "aspectRatio": "3:2 (Nativo DSLR/Mirrorless)",
        "canvas150": "1800 × 2700 px",
        "canvas300": "3600 × 5400 px",
        "isNative": true
      },
      {
        "frameSize": "16 × 20 in",
        "metricSize": "40,6 × 50,8 cm",
        "aspectRatio": "4:5 (1,25)",
        "canvas150": "2400 × 3000 px",
        "canvas300": "4800 × 6000 px"
      },
      {
        "frameSize": "18 × 24 in",
        "metricSize": "45,7 × 61,0 cm",
        "aspectRatio": "3:4 (Micro 4/3 e Celulares)",
        "canvas150": "2700 × 3600 px",
        "canvas300": "5400 × 7200 px"
      },
      {
        "frameSize": "24 × 36 in",
        "metricSize": "61,0 × 91,4 cm",
        "aspectRatio": "3:2 (Grande Pôster)",
        "canvas150": "3600 × 5400 px",
        "canvas300": "7200 × 10800 px",
        "isNative": true
      }
    ],
    "mattingHeading": "O efeito do paspartú no tamanho final da ampliação",
    "mattingP1": "O paspartú tem dupla função: proteger a emulsão contra o contato com o vidro e guiar a atenção visual para o centro da obra.",
    "mattingP2": "A borda externa do paspartú acompanha a moldura e a abertura interna recebe a foto impressa:",
    "mattingBullets": [
      {
        "label": "Moldura 11×14 pol. com paspartú",
        "text": "Recebe uma foto 8×10 pol. com cerca de 4 cm de borda em todos os lados."
      },
      {
        "label": "Moldura 16×20 pol. com paspartú",
        "text": "Recebe fotos 11×14 pol. ou fotos 8×10 pol. com paspartú amplo de galeria."
      },
      {
        "label": "Moldura 18×24 pol. com paspartú",
        "text": "Recebe fotos 12×18 pol. com cerca de 7,5 cm de borda."
      },
      {
        "label": "Moldura 24×36 pol. com paspartú",
        "text": "Recebe fotos 18×24 ou 20×30 pol. com margens confortáveis de 8 a 9 cm."
      }
    ],
    "mattingProTip": "Dica de especialista: Sempre imprima a foto cerca de 6 mm maior do que a abertura interna do paspartú para assegurar que nenhum vão branco fique à mostra no corte biselado.",
    "hangingHeading": "Regras universais para pendurar quadros em paredes",
    "hangingP1": "A altura correta de fixação transforma a decoração do ambiente:",
    "hangingRules": [
      {
        "label": "A regra da linha dos olhos (145 a 150 cm)",
        "text": "O centro do quadro deve ficar a cerca de 145–150 cm do chão."
      },
      {
        "label": "Proporção em relação a móveis (65 a 75%)",
        "text": "Acima de sofás e aparadores, a moldura deve ocupar cerca de 65% a 75% da largura da mobília, com 15 a 20 cm de distância vertical."
      },
      {
        "label": "Espaçamento consistente",
        "text": "Em galerias na parede, mantenha de 5 a 8 cm de distância uniforme entre as molduras."
      }
    ],
    "cta": {
      "badge": "ESTÚDIO DE PÔSTERES NO NAVEGADOR",
      "title": "Crie ampliações grandes e folhas combinadas agora",
      "text": "Diagramação online para formatos 30×45, 40×50 e 60×90 cm. Exporte masters em 300 DPI sem enviar dados para a nuvem.",
      "btnPrimary": "Abrir estúdio de Grandes Formatos",
      "btnSecondary": "Ler guia de Folha de Contato"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Respostas práticas sobre molduras grandes, proporções de imagem e impressão de pôsteres.",
    "faqs": [
      {
        "question": "Quais os tamanhos de molduras grandes mais comuns?",
        "answer": "Os tamanhos mais usados são 30×45 cm (12×18 in), 40×50 cm (16×20 in), 50×70 cm e 60×90 cm (24×36 in)."
      },
      {
        "question": "Enquadramento sangrado ou com paspartú?",
        "answer": "O paspartú protege a emulsão e confere refinamento de museu. O formato sangrado (sem margem) valoriza fotografias modernas e pôsteres em molduras minimalistas."
      },
      {
        "question": "Quantos megapixels são necessários para imprimir em 60×90 cm?",
        "answer": "Para visualização a média distância (1 metro ou mais), 150 DPI exigem cerca de 20 megapixels (3600×5400 px). Para alta definição minuciosa em 300 DPI, são necessários cerca de 78 megapixels."
      },
      {
        "question": "Por que fotos 3:2 sofrem corte em molduras 40×50 cm (16×20 pol.)?",
        "answer": "Sensores 3:2 têm proporção 1,50, enquanto molduras 16×20 têm proporção 5:4 (1,25). Para preencher o quadro todo, cerca de 16,7% da largura da imagem precisa ser cortada."
      },
      {
        "question": "A qual altura da parede devo pendurar o quadro?",
        "answer": "A altura padrão recomendada posiciona o centro do quadro a 145–150 cm do chão. Sobre móveis, preserve de 15 a 20 cm de folga."
      },
      {
        "question": "Como colocar várias fotos num único pôster para baratear?",
        "answer": "No Make Contact Sheet, você pode montar várias fotos menores numa única prancha de 50×70 ou 60×90 cm (gang sheet) e imprimir com o valor de um único pôster promocional."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Molduras grandes e tamanhos de impressão"
    }
  }
};

export const WEDDING_WORKFLOW_DATA: Record<Locale, WeddingWorkflowData> = {
  "en": {
    "title": "Wedding Photography Proofing Workflow — Client Selects Guide",
    "description": "Streamline your wedding photography proofing and culling workflow. Learn 3-pass culling, filename-backed proof sheets, and Lightroom XMP selection sync.",
    "badge": "WEDDING WORKFLOW GUIDE · 10 MIN READ",
    "h1Pre": "The Modern Wedding Photography ",
    "h1Highlight": "Proofing Workflow",
    "lead": "How to ingest, cull, and proof a 3,000+ photo wedding shoot in under two hours. Streamline client selections, preserve exact RAW camera filenames, and eliminate subscription cloud gallery bottlenecks.",
    "quickAnswerLabel": "Quick Answer / Standard Studio Workflow",
    "quickAnswerText": "The fastest wedding proofing workflow uses a two-pass local triage model: First, perform a rapid keyboard rejection pass (eliminating missed focus and duplicates using local AI sharpness scoring). Second, generate a structured, branded PDF contact sheet proof package displaying original camera filenames (_DSC4821.NEF) beneath every frame. Clients highlight their selects, and a single comma-separated text string syncs directly back into Adobe Lightroom Classic’s Library Filter.",
    "stepsHeading": "How do you organize and cull a large wedding shoot step-by-step?",
    "stepsIntro": "Follow this 5-stage studio blueprint to cut wedding proofing turnaround from two weeks down to 48 hours:",
    "steps": [
      {
        "name": "Ingest raw wedding shoot files without cloud upload delays",
        "text": "Drop your full multi-camera memory card dump (2,000 to 5,000+ files) directly into the Make Contact Sheet light-table. Because processing occurs entirely within local browser RAM, all thumbnails render immediately without waiting hours for multi-gigabyte cloud uploads."
      },
      {
        "name": "Execute Pass 1: AI sharpness filter & blinks reject cull",
        "text": "Run the integrated local AI sharpness scanner to instantly score focus across burst shots and group formals. Use keyboard shortcuts (press 3 to Reject) to rapidly eliminate missed focus, closed eyes, and unflattering test frames in under 15 minutes."
      },
      {
        "name": "Execute Pass 2: Sequence grading and hero selection",
        "text": "Navigate through remaining frames using arrow keys: press 1 to mark Keep for final delivery and 2 to Flag for secondary consideration (e.g. album spreads or social sneak peeks). Sort by capture timestamp to preserve wedding day chronology."
      },
      {
        "name": "Generate branded PDF proof sheets with verified camera filenames",
        "text": "Export a lightweight, multi-page 300 DPI PDF proof document with exact camera identifiers (e.g. _DSC4821.NEF, _MG_9024.CR3) and frame numbers clearly rendered beneath every photo. Add your studio logo watermark and primary brand colors."
      },
      {
        "name": "Sync client selections back into Adobe Lightroom Classic or Capture One",
        "text": "When your client returns their favorite frame numbers or review manifest, copy the comma-separated filename text string and paste it into Lightroom’s Library Filter bar (Text > Filename > Contains) or import the XMP sidecar rating packet for instant 5-star synchronization."
      }
    ],
    "comparisonHeading": "Why are heavy cloud galleries slowing down wedding client delivery?",
    "comparisonP1": "For the past decade, wedding photographers relied almost exclusively on subscription cloud gallery platforms (such as Pixieset, ShootProof, or Pic-Time). While functional for final high-res archival delivery, using them for initial proofing introduces severe workflow friction:",
    "tableHeaders": {
      "factor": "Workflow Factor",
      "tool": "Make Contact Sheet (Local-First)",
      "cloud": "Traditional Cloud Galleries"
    },
    "tableRows": [
      {
        "factor": "Upload Bandwidth & Time",
        "tool": "0 Seconds (Instant Browser RAM)",
        "cloud": "2 to 6 Hours (Gigabyte Cloud Spooling)"
      },
      {
        "factor": "Client Privacy & Data Security",
        "tool": "100% Private (Zero Cloud Ingestion)",
        "cloud": "Stored on 3rd-Party Cloud Buckets"
      },
      {
        "factor": "Camera Filename Fidelity",
        "tool": "Preserves Exact RAW Filenames",
        "cloud": "Often Strips or Re-indexes Filenames"
      },
      {
        "factor": "Lightroom Selection Sync",
        "tool": "1-Click Filename String or XMP Packet",
        "cloud": "Requires Plugin or Manual CSV Cross-Check"
      },
      {
        "factor": "Cost & Subscription Fees",
        "tool": "$0 Free Forever",
        "cloud": "$25 to $60 / Month recurring"
      }
    ],
    "comparisonP2": "By decoupling the initial selection proofing phase from the final hi-res download delivery, studios eliminate cloud upload bottlenecks, allowing couples to review proofs while the excitement of their wedding day is fresh.",
    "syncHeading": "How do you sync client proof selections directly into Adobe Lightroom Classic?",
    "syncP1": "When a couple reviews their proof sheet document, they mark their preferred takes (e.g. 80 photos for the luxury wedding album and 300 photos for color grading). Here is the exact procedure to sync those selections into Adobe Lightroom in under 30 seconds:",
    "syncSteps": [
      {
        "label": "Receive Filename List",
        "text": "Have the client provide their selected frame numbers (e.g. _DSC0412, _DSC0425, _MG_8091) or download their review manifest from the interactive HTML portal."
      },
      {
        "label": "Open Lightroom Classic Library Filter",
        "text": "Press \\ (backslash) in Lightroom's Library Grid view to open the top filter bar."
      },
      {
        "label": "Configure Text Filter",
        "text": "Click Text, set rule to Filename > Contains > Any."
      },
      {
        "label": "Paste & Filter",
        "text": "Paste the comma-separated filename text string directly into the search field. Lightroom instantly isolates only the client-approved RAW master files."
      },
      {
        "label": "Apply Color Label or Collection",
        "text": "Press Cmd+A to select all filtered frames and hit 8 (Green Label) or drag them into a new target collection named \"Client Final Selects\"."
      }
    ],
    "cta": {
      "badge": "PRIVATE STUDIO PROOFING",
      "title": "Speed Up Your Wedding Proofing Workflow Today",
      "text": "Drop your wedding shoot folder into Make Contact Sheet. Cull duplicates with AI sharpness scoring, export 300 DPI proof sheets, and sync selections directly into Lightroom.",
      "btnPrimary": "Launch Full-Screen Studio",
      "btnSecondary": "View Lightroom Sync Tutorial"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Common questions about wedding culling, proof sheet generation, and Lightroom integration.",
    "faqs": [
      {
        "question": "How do professional wedding photographers cull 3,000+ photos efficiently?",
        "answer": "Professional wedding photographers use a two-pass culling strategy: Pass 1 is an aggressive rejection pass removing out-of-focus shots, lighting test frames, and awkward expressions in under 20 minutes. Pass 2 is an additive selection pass picking the strongest hero frames for color grading and album design."
      },
      {
        "question": "Why should I send clients a PDF contact sheet instead of a heavy online gallery?",
        "answer": "Traditional cloud galleries often overwhelm wedding clients with endless scrolling grids of 800+ unorganized files and require complex account logins. A categorized PDF proof sheet offers structured pagination, works offline on any device, and preserves exact camera filenames for error-free album revisions."
      },
      {
        "question": "How does client selection sync back into Adobe Lightroom Classic without manual searching?",
        "answer": "Make Contact Sheet generates a standardized list of client-selected filenames or an Adobe-compliant XMP sidecar archive. In Lightroom Classic, pasting the comma-separated filename string into the Library Filter instantly isolates the selected RAW master files for batch retouching."
      },
      {
        "question": "Are unreleased client wedding photos uploaded to any external server?",
        "answer": "No. Make Contact Sheet processes all photographs, thumbnails, and metadata 100% locally in your browser memory. High-profile celebrity weddings and confidential private ceremonies remain completely secure on your local machine with zero third-party cloud exposure."
      },
      {
        "question": "What is the ideal grid size for a wedding proofing contact sheet?",
        "answer": "A 4 × 5 grid (20 photos per page) or 3 × 4 grid (12 photos per page) on US Letter or ISO A4 paper provides the ideal balance between thumbnail clarity and manageable document page count for wedding clients evaluating portraits and reception details."
      },
      {
        "question": "Can I add custom studio branding and watermarks to client proof sheets?",
        "answer": "Yes. You can upload your studio transparent PNG logo watermark, set opacity and corner placement, apply custom studio palette backgrounds (such as Warm Linen or Truffle Noir), and remove all platform branding for a seamless white-label client presentation."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "Wedding Photography Proofing Workflow"
    }
  },
  "es": {
    "title": "Flujo de selección para fotografía de bodas — Guía de pruebas con clientes",
    "description": "Optimiza el descarte y revisión de fotos de bodas. Descubre el método en 2 fases, hojas de prueba con nombres de archivo y sincronización XMP con Lightroom.",
    "badge": "GUÍA DE FOTOGRAFÍA DE BODAS · 10 MIN DE LECTURA",
    "h1Pre": "El flujo moderno de ",
    "h1Highlight": "Pruebas en fotografía de bodas",
    "lead": "Cómo importar, descartar y preparar pruebas de una boda de más de 3.000 fotos en menos de dos horas. Acelera la selección de los novios, conserva los nombres RAW y elimina los cuellos de botella de la nube.",
    "quickAnswerLabel": "Respuesta rápida / Flujo de trabajo de estudio",
    "quickAnswerText": "El flujo más ágil de selección de bodas utiliza un modelo de triaje local en dos fases: Primero, un descarte rápido por teclado (eliminando fotos desenfocadas y ojos cerrados mediante análisis local de nitidez por IA). Segundo, la generación de un paquete de hojas de contacto en PDF con los nombres originales de cámara (_DSC4821.NEF) bajo cada foto. Los novios marcan sus favoritas y una sencilla cadena de texto separada por comas se sincroniza directamente en el filtro de Adobe Lightroom Classic.",
    "stepsHeading": "¿Cómo organizar y descartar una boda multitudinaria paso a paso?",
    "stepsIntro": "Sigue esta guía de 5 etapas para reducir los plazos de entrega de pruebas de dos semanas a tan solo 48 horas:",
    "steps": [
      {
        "name": "Ingestar archivos RAW sin demoras de subida a la nube",
        "text": "Arrastra la descarga completa de las tarjetas de memoria (2.000 a 5.000+ fotos) a la mesa de luz de Make Contact Sheet. Al procesarse en la memoria RAM del navegador, las miniaturas cargan al instante sin esperar horas de subida."
      },
      {
        "name": "Fase 1: Filtro de nitidez por IA y descarte de parpadeos",
        "text": "Ejecuta el detector local de nitidez por IA para puntuar el foco en ráfagas y fotos de grupo. Usa atajos de teclado (tecla 3 para Descartar) para eliminar tomas movidas u ojos cerrados en menos de 15 minutos."
      },
      {
        "name": "Fase 2: Valoración secuencial y selección de fotos estrella",
        "text": "Avanza con las flechas del teclado: pulsa 1 para Conservar en la entrega final y 2 para Destacar candidatas al álbum o redes sociales. Ordena por fecha de captura para conservar la cronología del evento."
      },
      {
        "name": "Generar hojas de prueba en PDF con nombres de archivo reales",
        "text": "Exporta un PDF liviano a 300 DPI con nombres de archivo exactos (_DSC4821.NEF, _MG_9024.CR3) y numeración clara bajo cada imagen, incorporando el logotipo y colores de tu estudio."
      },
      {
        "name": "Sincronizar las selecciones de los novios en Lightroom o Capture One",
        "text": "Cuando los novios envíen sus números elegidos, copia la lista de nombres y pégala en el Filtro de biblioteca de Lightroom (Texto > Nombre de archivo > Contiene) o importa los sidecars XMP para asignar 5 estrellas automáticamente."
      }
    ],
    "comparisonHeading": "¿Por qué las galerías pesadas en la nube retrasan las entregas?",
    "comparisonP1": "Durante años, los fotógrafos de bodas han dependido de suscripciones a galerías en la nube (Pixieset, ShootProof, Pic-Time). Aunque útiles para la descarga final, utilizarlas para la fase inicial de selección genera fricción:",
    "tableHeaders": {
      "factor": "Factor del flujo",
      "tool": "Make Contact Sheet (Local)",
      "cloud": "Galerías tradicionales en la nube"
    },
    "tableRows": [
      {
        "factor": "Tiempo y ancho de banda de subida",
        "tool": "0 Segundos (RAM local inmediata)",
        "cloud": "2 a 6 horas de subida en segundo plano"
      },
      {
        "factor": "Privacidad y seguridad del cliente",
        "tool": "100% Privado (sin ingesta externa)",
        "cloud": "Archivos alojados en servidores de terceros"
      },
      {
        "factor": "Fidelidad de nombres de cámara",
        "tool": "Preserva nombres RAW exactos",
        "cloud": "A menudo renombra o elimina nombres"
      },
      {
        "factor": "Sincronización con Lightroom",
        "tool": "1 clic: texto o paquete XMP",
        "cloud": "Requiere plugins o cotejo manual"
      },
      {
        "factor": "Costes de suscripción",
        "tool": "0 € Gratis para siempre",
        "cloud": "25 a 60 € / mes recurrentes"
      }
    ],
    "comparisonP2": "Al separar la fase de selección inicial de la entrega final en alta resolución, tu estudio elimina demoras y permite a la pareja revivir la emoción de su boda sin esperas.",
    "syncHeading": "¿Cómo sincronizar las fotos elegidas por los novios en Lightroom Classic?",
    "syncP1": "Cuando la pareja entrega su selección (ej. 80 fotos para el álbum de lujo y 300 para edición cromática), el proceso de sincronización en Lightroom lleva menos de 30 segundos:",
    "syncSteps": [
      {
        "label": "Recibir la lista de nombres",
        "text": "Pide a los novios sus números de foto elegidos (_DSC0412, _DSC0425, _MG_8091) o descarga su manifiesto desde el portal interactivo."
      },
      {
        "label": "Abrir el Filtro de biblioteca en Lightroom Classic",
        "text": "Pulsa la tecla \\ (barra invertida) en la vista de cuadrícula de la biblioteca de Lightroom."
      },
      {
        "label": "Configurar el filtro de texto",
        "text": "Haz clic en Texto y define la regla en Nombre de archivo > Contiene > Cualquiera."
      },
      {
        "label": "Pegar y filtrar",
        "text": "Pega la cadena de nombres en el campo de búsqueda. Lightroom aislará al instante únicamente los archivos RAW aprobados."
      },
      {
        "label": "Asignar etiqueta de color o colección",
        "text": "Pulsa Cmd+A para seleccionar las fotos filtradas y pulsa 8 (etiqueta verde) o arrástralas a una colección llamada \"Selección final de los novios\"."
      }
    ],
    "cta": {
      "badge": "REVISIÓN PRIVADA PARA ESTUDIOS",
      "title": "Acelera hoy el flujo de selección de tus bodas",
      "text": "Arrastra la carpeta del enlace a Make Contact Sheet. Descarta duplicadas con IA de nitidez, exporta hojas de prueba a 300 DPI y sincroniza con Lightroom.",
      "btnPrimary": "Abrir estudio a pantalla completa",
      "btnSecondary": "Ver tutorial de sincronización XMP"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Dudas habituales sobre selección de fotos de boda, hojas de contacto y sincronización con Lightroom.",
    "faqs": [
      {
        "question": "¿Cómo descartan más de 3.000 fotos de boda los profesionales de forma rápida?",
        "answer": "Aplican un descarte en dos pasadas: la Fase 1 es una eliminación rápida en menos de 20 minutos de tomas desenfocadas y ojos cerrados. La Fase 2 es una selección cualitativa de las mejores fotos maestras para el retoque y el álbum."
      },
      {
        "question": "¿Por qué enviar un PDF de contactos en lugar de una galería online pesada?",
        "answer": "Las galerías en la nube abruman a las parejas con cientos de imágenes continuas que tardan en cargar y exigen contraseñas. Un PDF ofrece páginas ordenadas, funciona sin internet y muestra nombres de archivo para no equivocarse en el álbum."
      },
      {
        "question": "¿Cómo se sincroniza la selección en Lightroom sin buscar una por una?",
        "answer": "Make Contact Sheet genera una lista de nombres de archivo separados por comas o archivos XMP sidecar. Al pegar esa lista en el filtro de biblioteca de Lightroom Classic, los archivos RAW correspondientes quedan aislados en segundos."
      },
      {
        "question": "¿Se suben las fotos de boda de los clientes a servidores externos?",
        "answer": "No. Todo el procesamiento se realiza localmente en el navegador. La privacidad de ceremonias íntimas o bodas de personalidades públicas queda garantizada en tu máquina."
      },
      {
        "question": "¿Cuál es el tamaño de cuadrícula ideal para una hoja de boda?",
        "answer": "Una cuadrícula de 4 × 5 (20 fotos por página) o 3 × 4 (12 fotos por página) en papel A4 o Carta ofrece el mejor equilibrio para juzgar detalles de rostros y decoración."
      },
      {
        "question": "¿Puedo incorporar la marca de agua de mi estudio a las hojas?",
        "answer": "Sí. Puedes subir el logo PNG transparente de tu estudio, ajustar su transparencia y posición, y retirar el logotipo de la plataforma para una presentación totalmente profesional."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Flujo de pruebas para bodas"
    }
  },
  "de": {
    "title": "Workflow für Hochzeitsfotografen — Fotoauswahl & Kundenabstimmung",
    "description": "Optimieren Sie die Bildauswahl nach Hochzeiten. Erfahren Sie mehr über 2-Phasen-Culling, Proof-Bögen mit Dateinamen und Lightroom-XMP-Synchronisation.",
    "badge": "HOCHZEITS-WORKFLOW-LEITFADEN · 10 MIN LESEZEIT",
    "h1Pre": "Der moderne ",
    "h1Highlight": "Hochzeitsfotografie-Workflow",
    "lead": "Wie Sie ein Shooting mit über 3.000 Fotos in unter zwei Stunden sichten, aussortieren und dem Brautpaar vorlegen. Original-Dateinamen beibehalten und Cloud-Ladezeiten eliminieren.",
    "quickAnswerLabel": "Kurzantwort / Studio-Standardablauf",
    "quickAnswerText": "Der schnellste Workflow für Hochzeitsreportagen setzt auf ein lokales 2-Phasen-Culling: Zuerst werden Fehlschüsse und geschlossene Augen per Tastatur und lokaler KI-Schärfebewertung aussortiert. Danach wird ein gebrandeter PDF-Kontaktabzug mit Original-Dateinamen (_DSC4821.NEF) unter jedem Bild erstellt. Das Brautpaar nennt seine Favoriten und eine kommagetrennte Liste isoliert die RAWs direkt in Lightroom Classic.",
    "stepsHeading": "Große Hochzeitsreportagen Schritt für Schritt sortieren",
    "stepsIntro": "Mit diesem 5-Stufen-Plan verkürzen Sie die Bereitstellung der Auswahl von zwei Wochen auf 48 Stunden:",
    "steps": [
      {
        "name": "RAW-Dateien ohne Cloud-Wartezeiten laden",
        "text": "Ziehen Sie alle Speicherkarten-Dumps (2.000 bis 5.000+ Fotos) in Make Contact Sheet. Da die Verarbeitung im lokalen Browser-RAM erfolgt, laden alle Vorschauen sofort ohne stundenlanges Hochladen."
      },
      {
        "name": "Phase 1: KI-Schärfeprüfung & Blinzel-Aussortierung",
        "text": "Starten Sie die lokale KI-Schärfeanalyse für Serienbilder. Nutzen Sie die Taste 3 (Ablehnen), um unscharfe Bilder und unvorteilhafte Ausdrücke in unter 15 Minuten zu entfernen."
      },
      {
        "name": "Phase 2: Favoritenauswahl für Album und Reportage",
        "text": "Navigieren Sie mit den Pfeiltasten: Taste 1 für Behalten (Keep) und Taste 2 für Markieren (Flag). Nach Aufnahmezeitpunkt sortieren, um den Ablauf des Hochzeitstages chronologisch abzubilden."
      },
      {
        "name": "Gebrandeten PDF-Kontaktabzug mit Dateinamen exportieren",
        "text": "Erstellen Sie ein leichtes 300-DPI-PDF mit verifizierbaren Kameranummern (_DSC4821.NEF) und eigenem Studio-Wasserzeichen für die Auswahl durch das Brautpaar."
      },
      {
        "name": "Brautpaar-Auswahl in Lightroom Classic / Capture One übernehmen",
        "text": "Sobald die Auswahl vorliegt, fügen Sie die kommagetrennte Dateinamenliste in den Bibliotheksfilter von Lightroom ein oder importieren Sie XMP-Sidecars für automatische 5-Sterne-Bewertungen."
      }
    ],
    "comparisonHeading": "Warum verlangsamen schwere Cloud-Galerien die Abnahme?",
    "comparisonP1": "Viele Fotografen nutzen Cloud-Galerien (wie Pixieset oder Pic-Time). Für die finale Auslieferung geeignet, erzeugen sie in der Auswahlphase jedoch unnötige Hürden:",
    "tableHeaders": {
      "factor": "Kriterium",
      "tool": "Make Contact Sheet (Lokal)",
      "cloud": "Herkömmliche Cloud-Galerien"
    },
    "tableRows": [
      {
        "factor": "Upload-Dauer & Bandbreite",
        "tool": "0 Sekunden (Sofortiger Browser-RAM)",
        "cloud": "2 bis 6 Stunden Uploadzeit"
      },
      {
        "factor": "Datenschutz & Vertraulichkeit",
        "tool": "100% Privat (Kein Cloud-Transfer)",
        "cloud": "Speicherung auf Drittservern"
      },
      {
        "factor": "Erhalt der RAW-Dateinamen",
        "tool": "Exakte Kameranamen bleiben erhalten",
        "cloud": "Oft umbenannt oder verkürzt"
      },
      {
        "factor": "Synchronisation mit Lightroom",
        "tool": "1-Klick-Namensliste oder XMP",
        "cloud": "Erfordert Plugins oder CSV-Abgleich"
      },
      {
        "factor": "Monatliche Kosten",
        "tool": "0 € Dauerhaft kostenlos",
        "cloud": "25 € bis 60 € / Monat"
      }
    ],
    "comparisonP2": "Indem Sie die Vorauswahl von der finalen Auslieferung trennen, vermeiden Sie Wartezeiten und lassen das Brautpaar die Bilder begutachten, solange die Erinnerung noch ganz frisch ist.",
    "syncHeading": "Wie synchronisiert man die Auswahl mit Adobe Lightroom Classic?",
    "syncP1": "Wenn das Paar seine Wunschbilder nennt (z. B. 80 Fotos fürs Album und 300 für die Reportage), dauert der Import in Lightroom unter 30 Sekunden:",
    "syncSteps": [
      {
        "label": "Dateinamenliste erhalten",
        "text": "Lassen Sie sich die Nummern (_DSC0412, _DSC0425) geben oder laden Sie das Auswahlmanifest aus dem Portal herunter."
      },
      {
        "label": "Bibliotheksfilter in Lightroom öffnen",
        "text": "Drücken Sie die Taste \\ in der Rasteransicht der Bibliothek."
      },
      {
        "label": "Textfilter konfigurieren",
        "text": "Klicken Sie auf Text und stellen Sie Dateiname > Enthält ein."
      },
      {
        "label": "Einfügen & Filtern",
        "text": "Fügen Sie die Dateinamen ein. Lightroom zeigt sofort nur die ausgewählten RAW-Dateien an."
      },
      {
        "label": "Label oder Sammlung anlegen",
        "text": "Drücken Sie Cmd+A und weisen Sie ein Farbetikett (Taste 8) oder eine Sammlung zu."
      }
    ],
    "cta": {
      "badge": "PRIVATES STUDIO-PROOFING",
      "title": "Beschleunigen Sie Ihren Hochzeits-Workflow",
      "text": "Ziehen Sie Ihre Hochzeitsfotos in Make Contact Sheet. Sortieren Sie mit KI-Schärfebewertung, erstellen Sie 300-DPI-PDFs und synchronisieren Sie mit Lightroom.",
      "btnPrimary": "Vollbild-Studio öffnen",
      "btnSecondary": "Lightroom-Sync-Anleitung lesen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Praxisnahe Antworten zu Hochzeits-Culling, Kontaktabzügen und Lightroom-Sync.",
    "faqs": [
      {
        "question": "Wie sortieren Profis 3.000+ Fotos schnell aus?",
        "answer": "Über ein 2-Phasen-Culling: In Phase 1 werden unscharfe Fotos und geschlossene Augen in unter 20 Minuten gelöscht. In Phase 2 werden gezielt die stärksten Motive für die Bildbearbeitung ausgewählt."
      },
      {
        "question": "Warum ein PDF-Kontaktabzug statt einer Online-Galerie?",
        "answer": "Endlose Webalben überfordern Kunden oft. Ein PDF ist strukturiert paginiert, funktioniert offline und zeigt unverwechselbare Dateinamen für das Fotoalbum."
      },
      {
        "question": "Wie funktioniert die Lightroom-Synchronisation?",
        "answer": "Make Contact Sheet exportiert eine kommagetrennte Dateinamenliste. Im Bibliotheksfilter von Lightroom Classic eingefügt, isoliert sie die gewünschten RAWs in Sekundenschnelle."
      },
      {
        "question": "Werden vertrauliche Hochzeitsfotos hochgeladen?",
        "answer": "Nein. Alle Berechnungen laufen lokal im Browser ab. Vertrauliche Hochzeiten bleiben auf Ihrem Rechner geschützt."
      },
      {
        "question": "Welche Rastergröße ist für Hochzeits-Proofs optimal?",
        "answer": "Ein 4 × 5-Raster (20 Bilder) oder 3 × 4-Raster (12 Bilder) auf A4 bietet die beste Übersicht bei guter Erkennbarkeit von Gesichtern."
      },
      {
        "question": "Kann ich mein eigenes Studio-Logo einbinden?",
        "answer": "Ja, Sie können ein transparentes PNG-Wasserzeichen hochladen, Deckkraft und Position wählen und das Tool als White-Label-Lösung nutzen."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Hochzeits-Proofing-Workflow"
    }
  },
  "fr": {
    "title": "Flux de travail mariage — Guide de tri & validation client",
    "description": "Optimisez le tri de vos reportages de mariage. Découvrez le culling en 2 phases, les planches d'épreuves avec noms de fichiers et la synchronisation Lightroom.",
    "badge": "GUIDE PHOTOGRAPHIE DE MARIAGE · 10 MIN DE LECTURE",
    "h1Pre": "Le flux moderne de ",
    "h1Highlight": "Validation en photo de mariage",
    "lead": "Comment décharger, trier et présenter un mariage de plus de 3 000 photos en moins de deux heures. Préservez les noms de fichiers RAW et supprimez la lenteur des galeries en ligne.",
    "quickAnswerLabel": "Réponse rapide / Méthode standard de studio",
    "quickAnswerText": "Le flux de sélection de mariage le plus rapide repose sur un tri local en deux temps : d'abord, une élimination rapide au clavier (des clichés flous et yeux fermés grâce à l'IA de netteté locale). Ensuite, la création d'une planche d'épreuves PDF personnalisée mentionnant le nom exact de chaque cliché (_DSC4821.NEF). Les mariés indiquent leurs choix et une simple chaîne de texte filtrera directement les fichiers dans Adobe Lightroom Classic.",
    "stepsHeading": "Comment organiser et trier un grand mariage pas à pas ?",
    "stepsIntro": "Suivez ce protocole pour réduire la livraison des épreuves de deux semaines à 48 heures :",
    "steps": [
      {
        "name": "Importer les fichiers RAW sans lenteur de transfert cloud",
        "text": "Déposez l'intégralité des cartes mémoire (2 000 à 5 000+ photos) dans Make Contact Sheet. Le traitement s'effectue dans la mémoire vive de votre navigateur : les vignettes s'affichent instantanément."
      },
      {
        "name": "Passe 1 : Filtrage de netteté par IA et rejet des yeux fermés",
        "text": "Lancez l'analyse locale de netteté pour noter les rafales. Utilisez la touche 3 (Rejeter) pour écarter les photos floues et expressions maladroites en moins de 15 minutes."
      },
      {
        "name": "Passe 2 : Notation séquentielle et choix des photos maîtresses",
        "text": "Passez en revue les images restantes : touche 1 pour Conserver (Keep) et touche 2 pour Signaler (Flag). Classez par ordre chronologique pour respecter le fil de la journée."
      },
      {
        "name": "Générer un PDF d'épreuves avec les vrais noms de fichiers",
        "text": "Exportez un PDF 300 DPI léger affichant les identifiants d'origine (_DSC4821.NEF) sous chaque photo, orné de votre filigrane de studio."
      },
      {
        "name": "Synchroniser les choix des mariés dans Lightroom ou Capture One",
        "text": "Lorsque le couple vous remet ses numéros favoris, copiez la liste de noms et collez-la dans le filtre de bibliothèque de Lightroom pour isoler les fichiers RAW correspondants."
      }
    ],
    "comparisonHeading": "Pourquoi les galeries en ligne ralentissent-elles la validation ?",
    "comparisonP1": "Les photographes utilisent souvent des galeries cloud avec abonnement (Pixieset, ShootProof). Si elles conviennent à la livraison finale, elles créent des frictions pour le tri initial :",
    "tableHeaders": {
      "factor": "Critère",
      "tool": "Make Contact Sheet (Local)",
      "cloud": "Galeries cloud traditionnelles"
    },
    "tableRows": [
      {
        "factor": "Bande passante & temps de téléversement",
        "tool": "0 seconde (traitement local direct)",
        "cloud": "2 à 6 heures de téléversement"
      },
      {
        "factor": "Confidentialité & sécurité des données",
        "tool": "100% privé (aucun transfert en ligne)",
        "cloud": "Stocké sur des serveurs tiers"
      },
      {
        "factor": "Intégrité des noms de fichiers RAW",
        "tool": "Noms boîtier rigoureusement préservés",
        "cloud": "Fichiers souvent renommés"
      },
      {
        "factor": "Synchronisation avec Lightroom",
        "tool": "1 clic : liste texte ou paquet XMP",
        "cloud": "Nécessite des plugins ou vérification manuelle"
      },
      {
        "factor": "Coût & abonnement",
        "tool": "0 € Gratuit à vie",
        "cloud": "25 € à 60 € / mois"
      }
    ],
    "comparisonP2": "En dissociant la sélection initiale de la livraison finale haute définition, vous gagnez un temps précieux et permettez aux mariés de choisir leurs photos dans l'euphorie du mariage.",
    "syncHeading": "Comment synchroniser les choix des mariés dans Lightroom Classic ?",
    "syncP1": "Quand le couple vous indique sa sélection (ex. 80 photos pour l'album et 300 pour la retouche), l'importation dans Lightroom prend moins de 30 secondes :",
    "syncSteps": [
      {
        "label": "Recevoir la liste des fichiers",
        "text": "Demandez aux mariés leurs numéros retenus (_DSC0412, _DSC0425) ou téléchargez leur fichier de sélection."
      },
      {
        "label": "Ouvrir le filtre de bibliothèque dans Lightroom",
        "text": "Appuyez sur la touche \\ dans la vue grille de la bibliothèque."
      },
      {
        "label": "Configurer le filtre Texte",
        "text": "Cliquez sur Texte et choisissez Nom de fichier > Contient."
      },
      {
        "label": "Coller et filtrer",
        "text": "Collez la liste de noms dans le champ de recherche. Lightroom affiche uniquement les RAW correspondants."
      },
      {
        "label": "Attribuer un label ou créer une collection",
        "text": "Sélectionnez tout (Cmd+A) et appliquez un label de couleur (touche 8) ou créez une collection dédiée."
      }
    ],
    "cta": {
      "badge": "STUDIO DE VALIDATION PRIVÉ",
      "title": "Accélérez vos validations de mariage dès aujourd'hui",
      "text": "Déposez votre dossier de mariage dans Make Contact Sheet. Triez les doublons par IA, exportez des planches 300 DPI et synchronisez avec Lightroom.",
      "btnPrimary": "Ouvrir le studio plein écran",
      "btnSecondary": "Voir le tutoriel de synchronisation XMP"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Conseils sur le tri de mariage, les planches contact et l'intégration Lightroom.",
    "faqs": [
      {
        "question": "Comment trier rapidement plus de 3 000 photos de mariage ?",
        "answer": "La méthode en 2 passes est idéale : la première élimine les photos floues en moins de 20 minutes, la seconde permet de retenir les moments forts pour l'album."
      },
      {
        "question": "Pourquoi préférer une planche contact PDF à une galerie web ?",
        "answer": "Un document PDF est paginé avec soin, consultable hors-ligne et affiche les noms réels pour éviter les confusions lors de la confection du livre."
      },
      {
        "question": "Comment synchroniser les sélections sans recherche manuelle ?",
        "answer": "Make Contact Sheet génère une liste de noms séparés par des virgules. Collée dans le filtre de Lightroom Classic, elle isole les RAW en un instant."
      },
      {
        "question": "Les photos de mariage restent-elles confidentielles ?",
        "answer": "Oui. Tout s'exécute dans votre navigateur sans téléversement. Les mariages intimes ou de personnalités restent protégés sur votre machine."
      },
      {
        "question": "Quelle grille convient le mieux pour une planche d'épreuves mariage ?",
        "answer": "Une grille 4 × 5 (20 photos) ou 3 × 4 (12 photos) sur format A4 garantit une excellente lisibilité des expressions."
      },
      {
        "question": "Puis-je ajouter le logo de mon studio ?",
        "answer": "Oui, vous pouvez importer votre filigrane PNG, choisir son opacité et personnaliser les couleurs pour une présentation en marque blanche."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Workflow de validation mariage"
    }
  },
  "ja": {
    "title": "ウェディング写真の写真選定・納品ワークフロー — クライアント選定ガイド",
    "description": "結婚式撮影の写真セレクトを高速化。2段階カリング手法、ファイル名入りプルーフシート、Lightroom XMP同期による効率的ワークフロー。",
    "badge": "ウェディング写真ガイド · 読了目安 10分",
    "h1Pre": "プロが実践する",
    "h1Highlight": "ウェディング写真選定ワークフロー",
    "lead": "3,000枚を超える挙式・披露宴の撮影データを2時間以内に選別・納品準備。新郎新婦の選定をスムーズにし、クラウドアップロードの待ち時間をゼロにします。",
    "quickAnswerLabel": "クイック回答 / 標準スタジオワークフロー",
    "quickAnswerText": "最速のウェディング写真選定ワークフローは「ローカル2段階セレクト」を採用します：第1段階としてAIピント判定とショートカットキーで手ブレ・目つぶり写真を高速除外。第2段階として、正確なカメラファイル名（_DSC4821.NEF）を明記したブランド入りPDFプルーフシートを作成します。新郎新婦が選んだ番号をコピーし、カンマ区切りテキストとしてLightroom Classicの検索バーにペーストするだけで即座にRAWデータが同期されます。",
    "stepsHeading": "膨大なウェディング撮影をステップバイステップで選別する手順",
    "stepsIntro": "撮影後、選定シートの提出までにかかる日数を2週間から48時間以内へと大幅短縮する5工程です：",
    "steps": [
      {
        "name": "クラウドへのアップロード待ちなしでRAWを取り込み",
        "text": "複数台のカメラから読み込んだカードデータ（2,000〜5,000枚以上）をMake Contact Sheetに直接ドロップ。ブラウザRAM内で完結するため、数ギガバイトの送信待ちなしでサムネイルが即時表示されます。"
      },
      {
        "name": "ステップ1：AIシャープネス判定と目つぶり写真の高速除外",
        "text": "端末内AIによるピントスコアリングを実行。3キー（除外）を使い、集合写真の目つぶりや連写のピンボケカットを15分以内に一掃します。"
      },
      {
        "name": "ステップ2：本番カットの格付けとアルバム候補選定",
        "text": "矢印キーで進みながら、納品確定カットに1キー（キープ）、アルバム見開きやSNS用候補に2キー（フラグ）を付与。撮影時刻順に並べて結婚式の進行順序を保ちます。"
      },
      {
        "name": "正確なファイル名入りのスタジオブランドPDFプルーフを作成",
        "text": "カメラの元ファイル名（_DSC4821.NEFなど）と通し番号を記載した軽量300 DPI PDFを作成。スタジオロゴの透かしを入れて新郎新婦へ送付します。"
      },
      {
        "name": "新郎新婦の選定番号をLightroom ClassicやCapture Oneに同期",
        "text": "返信された選定番号のカンマ区切りテキストをLightroomのライブラリフィルター（テキスト > ファイル名 > 含む）に貼り付けるか、XMPサイドカーで一括星付けします。"
      }
    ],
    "comparisonHeading": "なぜ大容量クラウドギャラリーは納品を遅らせるのか？",
    "comparisonP1": "近年のクラウド納品サービス（PixiesetやPic-Timeなど）は完成写真の納品には便利ですが、撮影直後の一次選定用としては大きな負担になります：",
    "tableHeaders": {
      "factor": "比較項目",
      "tool": "Make Contact Sheet（ローカル完結）",
      "cloud": "従来のクラウドギャラリー"
    },
    "tableRows": [
      {
        "factor": "アップロード時間と回線負荷",
        "tool": "0秒（端末RAMで即時処理）",
        "cloud": "2〜6時間のアップロード待ち"
      },
      {
        "factor": "顧客プライバシーと安全性",
        "tool": "100%安全（外部サーバー非経由）",
        "cloud": "サードパーティのクラウドに保管"
      },
      {
        "factor": "カメラの元ファイル名の保持",
        "tool": "RAWファイル名を完全に維持",
        "cloud": "リネームや連番変換される場合あり"
      },
      {
        "factor": "Lightroomとの選定同期",
        "tool": "1クリックでテキストまたはXMP出力",
        "cloud": "CSV照合や手動検索が必要"
      },
      {
        "factor": "月額利用料",
        "tool": "永年完全無料",
        "cloud": "月額3,000円〜8,000円の継続課金"
      }
    ],
    "comparisonP2": "初期の「写真選定フェーズ」を重たい「高解像度ダウンロード納品」から切り離すことで、新郎新婦の挙式の熱気が冷めないうちに選定シートを届けることができます。",
    "syncHeading": "新郎新婦の選定写真をLightroom Classicへ同期する手順",
    "syncP1": "アルバム用80枚や現像用300枚の選定リストが届いた際、30秒以内でLightroomに反映させる手順です：",
    "syncSteps": [
      {
        "label": "ファイル名リストの受け取り",
        "text": "新郎新婦から指定されたファイル番号（_DSC0412、_DSC0425など）を受け取るか、マニフェストファイルを読み込みます。"
      },
      {
        "label": "Lightroom Classicでフィルターバーを開く",
        "text": "ライブラリのグリッド表示で「\\」キーを押します。"
      },
      {
        "label": "テキストフィルターの設定",
        "text": "「テキスト」をクリックし、「ファイル名」「含む」に指定します。"
      },
      {
        "label": "ペーストして絞り込み",
        "text": "検索枠にカンマ区切りの文字列を貼り付けます。選ばれたRAW写真のみが一覧表示されます。"
      },
      {
        "label": "カラーラベルまたはコレクションの作成",
        "text": "Cmd+Aで全選択し、8キー（グリーンラベル）を押すか、新規コレクションにドラッグします。"
      }
    ],
    "cta": {
      "badge": "スタジオ向け高機密プルーフ作成",
      "title": "ウェディング写真選定を今すぐ高速化しませんか？",
      "text": "撮影フォルダをMake Contact Sheetにドロップ。AIピント判定で重複を削り、300 DPIシートを出力してLightroomと即座に連携。",
      "btnPrimary": "フルスクリーンスタジオを開く",
      "btnSecondary": "Lightroom同期ガイドを見る"
    },
    "faqHeading": "よくある質問",
    "faqSub": "結婚式写真の選別、プルーフシート作成、Lightroom連携に関する実用的な回答です。",
    "faqs": [
      {
        "question": "3,000枚以上の結婚式写真を効率的に選別するには？",
        "answer": "2段階選別が基本です。第1段階でピンボケや目つぶりを徹底的に除外し（約20分）、第2段階でアルバムや現像に回すベストショットをじっくり選びます。"
      },
      {
        "question": "なぜWebギャラリーではなくPDFコンタクトシートが選ばれるのか？",
        "answer": "Webギャラリーは枚数が多すぎるとスクロールに疲弊しがちです。整然とページ分けされたPDFならオフラインでも閲覧でき、アルバム制作時のコマ指定が確実になります。"
      },
      {
        "question": "選定写真を1枚ずつ探さずにLightroomに反映できますか？",
        "answer": "はい。Make Contact Sheetから出力されるカンマ区切りリストをライブラリフィルターに貼り付けるだけで、該当するRAWファイルが一括抽出されます。"
      },
      {
        "question": "新郎新婦の大切な写真が外部サーバーに流出する心配は？",
        "answer": "一切ありません。すべての処理はお使いのパソコンのブラウザ内で完結するため、著名人の挙式など機密性の高い案件でも安心です。"
      },
      {
        "question": "ウェディングプルーフに最適なグリッドサイズは？",
        "answer": "A4用紙で4×5（20枚）または3×4（12枚）が見やすく、表情の確認と全体のページ数のバランスが最も優れています。"
      },
      {
        "question": "スタジオ独自のロゴや透かしは入れられますか？",
        "answer": "はい。透明PNGロゴの配置、透過度調整、専用のカラーパレット適用が可能で、自社ブランドのプルーフ資料として納品できます。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "ウェディング写真選定ワークフロー"
    }
  },
  "pt": {
    "title": "Fluxo de seleção para fotografia de casamento — Guia de aprovação",
    "description": "Otimize a triagem de fotos de casamento. Conheça o método de culling em 2 etapas, folhas de prova com nomes e sincronização XMP com o Lightroom.",
    "badge": "GUIA DE FOTOGRAFIA DE CASAMENTO · 10 MIN DE LEITURA",
    "h1Pre": "O moderno fluxo de ",
    "h1Highlight": "Aprovação em fotografia de casamento",
    "lead": "Como descarregar, triar e apresentar um casamento de mais de 3.000 fotos em menos de duas horas. Preserve os nomes de arquivo RAW e acabe com a lentidão da nuvem.",
    "quickAnswerLabel": "Resposta rápida / Fluxo padrão de estúdio",
    "quickAnswerText": "O fluxo de triagem de casamento mais ágil adota um modelo local em duas etapas: Primeiro, um descarte rápido no teclado (eliminando fotos desfocadas e olhos fechados com IA local de nitidez). Segundo, a geração de uma folha de contato em PDF exibindo os nomes reais da câmera (_DSC4821.NEF) sob cada imagem. Os noivos informam seus favoritos e uma lista de nomes em texto filtra os arquivos RAW diretamente no Lightroom Classic.",
    "stepsHeading": "Como organizar e triar casamentos grandes passo a passo",
    "stepsIntro": "Siga este roteiro de 5 passos para reduzir o prazo de entrega das prévias de duas semanas para 48 horas:",
    "steps": [
      {
        "name": "Importar arquivos RAW sem esperar uploads na nuvem",
        "text": "Arraste as fotos de todos os cartões de memória (2.000 a 5.000+ fotos) para o Make Contact Sheet. O processamento ocorre na memória RAM do navegador, abrindo as miniaturas imediatamente."
      },
      {
        "name": "Etapa 1: Filtro de nitidez por IA e eliminação de piscadas",
        "text": "Rode o verificador local de nitidez por IA. Use a tecla 3 (Rejeitar) para eliminar fotos desfocadas e expressões inadequadas em menos de 15 minutos."
      },
      {
        "name": "Etapa 2: Seleção das fotos principais para o álbum",
        "text": "Navegue com as setas: tecle 1 para Manter (Keep) e 2 para Destacar (Flag). Ordene por horário de captura para manter a cronologia exata do casamento."
      },
      {
        "name": "Exportar PDF de provas com nomes de arquivo da câmera",
        "text": "Gere um PDF leve em 300 DPI com os identificadores exatos da câmera (_DSC4821.NEF) sob cada imagem, incluindo a marca d'água do seu estúdio."
      },
      {
        "name": "Sincronizar as escolhas dos noivos no Lightroom ou Capture One",
        "text": "Assim que os noivos retornarem suas escolhas, copie a lista de nomes e cole no Filtro de Biblioteca do Lightroom ou importe o pacote XMP sidecar para marcar 5 estrelas."
      }
    ],
    "comparisonHeading": "Por que galerias na nuvem atrasam a aprovação dos noivos?",
    "comparisonP1": "Muitos fotógrafos dependem de galerias online com planos mensais (Pixieset, ShootProof). Embora úteis para entrega final, elas atrasam a fase inicial de escolha:",
    "tableHeaders": {
      "factor": "Fator",
      "tool": "Make Contact Sheet (Local)",
      "cloud": "Galerias tradicionais na nuvem"
    },
    "tableRows": [
      {
        "factor": "Banda e tempo de upload",
        "tool": "0 segundos (abertura direta na RAM)",
        "cloud": "2 a 6 horas de envio para a nuvem"
      },
      {
        "factor": "Privacidade e segurança das fotos",
        "tool": "100% privado (nada sai do seu PC)",
        "cloud": "Armazenado em servidores de terceiros"
      },
      {
        "factor": "Integridade dos nomes de arquivo",
        "tool": "Preserva nomes RAW originais",
        "cloud": "Costuma renomear os arquivos"
      },
      {
        "factor": "Sincronização com o Lightroom",
        "tool": "1 clique: texto ou pacote XMP",
        "cloud": "Exige plugins ou conferência manual"
      },
      {
        "factor": "Custo de assinatura",
        "tool": "R$ 0 Gratuito para sempre",
        "cloud": "R$ 150 a R$ 350 / mês recorrentes"
      }
    ],
    "comparisonP2": "Ao separar a fase de escolha da entrega dos arquivos finais em alta resolução, você agiliza o processo e permite que os noivos façam suas escolhas com a empolgação do casamento ainda recente.",
    "syncHeading": "Como sincronizar a escolha dos noivos no Lightroom Classic?",
    "syncP1": "Quando o casal envia a lista de fotos aprovadas (ex.: 80 para o álbum e 300 para o tratamento de cor), o processo no Lightroom leva menos de 30 segundos:",
    "syncSteps": [
      {
        "label": "Receber a lista de nomes",
        "text": "Peça aos noivos os números das fotos (_DSC0412, _DSC0425) ou baixe o manifesto pelo portal interativo."
      },
      {
        "label": "Abrir o Filtro de biblioteca no Lightroom Classic",
        "text": "Pressione a tecla \\ na grade da Biblioteca do Lightroom."
      },
      {
        "label": "Configurar o filtro de texto",
        "text": "Clique em Texto e selecione Nome do arquivo > Contém."
      },
      {
        "label": "Colar e filtrar",
        "text": "Cole os nomes de arquivo no campo de pesquisa. O Lightroom isolará apenas os arquivos RAW selecionados."
      },
      {
        "label": "Criar rótulo ou coleção",
        "text": "Pressione Cmd+A e tecle 8 (rótulo verde) ou arraste os itens para uma nova coleção."
      }
    ],
    "cta": {
      "badge": "PROVAS PRIVADAS DE ESTÚDIO",
      "title": "Acelere a aprovação dos seus casamentos hoje",
      "text": "Arraste sua pasta de fotos para o Make Contact Sheet. Faça a triagem com IA de nitidez, gere folhas em 300 DPI e sincronize com o Lightroom.",
      "btnPrimary": "Abrir estúdio em tela cheia",
      "btnSecondary": "Ver tutorial de sincronização XMP"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Dúvidas sobre triagem de casamento, folhas de prova e sincronização no Lightroom.",
    "faqs": [
      {
        "question": "Como triar mais de 3.000 fotos de casamento rapidamente?",
        "answer": "Utilize a estratégia de duas etapas: na primeira, descarte fotos desfocadas e olhos fechados em 20 minutos. Na segunda, selecione com calma os melhores momentos para o álbum."
      },
      {
        "question": "Por que usar um PDF de contato em vez de galeria web?",
        "answer": "Galerias pesadas cansam o cliente com centenas de fotos contínuas. Um PDF estruturado funciona offline e mantém os nomes corretos para montar o álbum."
      },
      {
        "question": "Como sincronizar sem procurar foto por foto?",
        "answer": "O Make Contact Sheet gera uma lista em texto com nomes separados por vírgula. Ao colar no filtro do Lightroom Classic, os arquivos RAW são encontrados na hora."
      },
      {
        "question": "As fotos de casamento permanecem seguras?",
        "answer": "Sim. Todo o processamento ocorre no navegador da sua máquina, sem nenhum upload na nuvem."
      },
      {
        "question": "Qual é a grade ideal para folhas de prova de casamento?",
        "answer": "Grades de 4 × 5 (20 fotos) ou 3 × 4 (12 fotos) no formato A4 ou Carta oferecem ótima visibilidade das expressões."
      },
      {
        "question": "Posso incluir o logo do meu estúdio?",
        "answer": "Sim, você pode adicionar sua marca d'água PNG, definir a transparência e usar cores próprias para uma entrega profissional em white-label."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Workflow de fotos de casamento"
    }
  }
};

export const ALBUMS_VS_PROOFS_DATA: Record<Locale, AlbumsVsProofsData> = {
  "en": {
    "title": "Large Photo Albums vs Proof Books — Photography Guide",
    "description": "Compare large photo albums and proof books for client delivery. Learn printing costs, gutter margin safety, layout geometry, and proofing options.",
    "badge": "ALBUM & PRINT GUIDE · 9 MIN READ",
    "h1Pre": "Large Photo Albums vs. ",
    "h1Highlight": "Proof Books",
    "lead": "Compare luxury heirloom albums, magazine photo books, and working contact sheet proof books. Understand production economics, gutter safety margins, layout geometry, and client delivery strategies.",
    "quickAnswerLabel": "Quick Answer / Comparison Summary",
    "quickAnswerText": "The difference between a photo album and a proof book lies in intent and density: A large photo album (e.g. 12×12 flush mount) is a luxury heirloom displaying 50 to 80 fully retouched final selects with artistic white space ($200+ print cost). A proof book (or contact sheet book) is a high-density working document displaying 300 to 1,000+ raw thumbnails with verifiable camera filenames ($0 to $15 print cost) designed specifically for client culling and archival indexing.",
    "stepsHeading": "How do you choose between an album and a proof book for client delivery?",
    "stepsIntro": "Follow this 5-step studio framework to select the right book format, calculate margin bleed tolerances, and export press-ready files:",
    "steps": [
      {
        "name": "Determine project intent: Heirloom Album vs Working Proof Book",
        "text": "Identify whether the final document is an archival luxury keepsake (40 to 80 retouched hero photographs in a heavy leather flush-mount album) or an operational selection proof book (300 to 1,000+ photos arranged in high-density grids for client review)."
      },
      {
        "name": "Select page geometry and aspect ratio standards",
        "text": "Choose standard dimensions: 10×10 in or 12×12 in square for luxury wedding albums, 11×14 in landscape for editorial lookbooks, or ISO A4 / US Letter portrait for cost-effective spiral-bound proof books."
      },
      {
        "name": "Calculate center gutter margin and outer edge bleed tolerances",
        "text": "Account for physical binding mechanics: apply a 0.5-inch (13mm) safety margin along the center spine gutter for standard bound books (preventing heads and faces from falling into the crease) or use seamless layflat panoramic spreads."
      },
      {
        "name": "Format multi-image spreads with filename and sequence labels",
        "text": "Arrange your photographs using balanced grid presets in Make Contact Sheet. For proof books, enable micro-typography labels to display camera filenames and sequential frame numbers beneath each thumbnail."
      },
      {
        "name": "Export calibrated 300 DPI master files for lab press or office printing",
        "text": "Export uncompressed 300 DPI multi-page PDF documents for local spiral-bound proofing or high-resolution PNG image spreads calibrated in standard sRGB for commercial pro lab binding."
      }
    ],
    "matrixHeading": "How do photo album formats compare in cost, capacity, and turnaround?",
    "matrixP1": "Commercial portrait and wedding studios evaluate four distinct physical book formats when structuring client packages:",
    "tableHeaders": {
      "format": "Book Format",
      "capacity": "Photo Capacity",
      "cost": "Production Cost",
      "binding": "Binding Style",
      "purpose": "Primary Purpose"
    },
    "tableRows": [
      {
        "format": "Flush Mount Album",
        "capacity": "40 – 90 Photos",
        "cost": "$180 – $450+",
        "binding": "Thick board pages, seamless layflat",
        "purpose": "Wedding & Heirloom Keepsake"
      },
      {
        "format": "Layflat Photo Book",
        "capacity": "80 – 160 Photos",
        "cost": "$60 – $140",
        "binding": "Hinged medium paper, 180° open",
        "purpose": "Family & Commercial Lookbook"
      },
      {
        "format": "Magazine / Softcover",
        "capacity": "100 – 250 Photos",
        "cost": "$20 – $45",
        "binding": "Perfect-bound text-weight paper",
        "purpose": "Editorial Preview & Lookbook"
      },
      {
        "format": "Contact Sheet Proof Book",
        "capacity": "300 – 1,200+ Photos",
        "cost": "$0 (PDF) or $8 – $18 (Spiral)",
        "binding": "Spiral wire or digital multi-page PDF",
        "purpose": "Client Triage & Archival Index",
        "highlight": true
      }
    ],
    "gutterHeading": "What are the critical gutter and bleed safety rules for album design?",
    "gutterP1": "Misaligned margins can ruin an expensive photo album run. When designing two-page panoramic spreads and multi-photo grids, follow these universal mechanical safety rules:",
    "gutterBullets": [
      {
        "label": "The Gutter Safety Zone",
        "text": "In standard bound books, keep essential subject elements (eyes, faces, and text) at least 0.5 to 0.75 inches (13–19 mm) away from the center fold line. Only seamless flush-mount albums allow continuous imagery across the center crease."
      },
      {
        "label": "Outer Edge Bleed",
        "text": "Add 0.125 inches (3 mm) of bleed beyond the trim line on all four outer sides to guarantee that no unintended white slivers appear when hydraulic bindery blades trim the pages."
      },
      {
        "label": "Safe Text Margin",
        "text": "Position all typography, image captions, and page numbers at least 0.375 inches (10 mm) inside the final trimmed edge."
      }
    ],
    "cta": {
      "badge": "INSTANT PROOF BOOK GENERATOR",
      "title": "Create Multi-Page Proof Books in Seconds",
      "text": "Drop hundreds of photos into Make Contact Sheet. Format calibrated 300 DPI proof pages with camera filenames, customize margins, and export print-ready PDFs instantly.",
      "btnPrimary": "Generate Proof Book Sheets",
      "btnSecondary": "View Contact Sheet Tutorial"
    },
    "faqHeading": "Frequently Asked Questions",
    "faqSub": "Common questions about photo album printing, proof book layouts, and binding standards.",
    "faqs": [
      {
        "question": "What is the main difference between a large photo album and a proof book?",
        "answer": "A large photo album is a premium, archival heirloom designed to display 50 to 100 fully retouched final photographs on thick board pages. A proof book (or contact sheet book) is a functional studio document containing hundreds of raw thumbnail captures with filenames for client image selection."
      },
      {
        "question": "How much does it cost to produce a flush-mount album vs a spiral proof book?",
        "answer": "A professional flush-mount leather wedding album typically costs $150 to $450+ to print at pro labs (and retails to clients for $800 to $2,500). In contrast, a 50-page spiral-bound proof book or digital PDF contact sheet costs between $0 and $15 to produce."
      },
      {
        "question": "What is the gutter margin safety rule in photo album design?",
        "answer": "In traditional perfect-bound or magazine photo books, the inner pages curve into the spine. Designers must keep critical subject elements (especially eyes, faces, and text) at least 0.5 to 0.75 inches away from the center gutter to avoid distortion."
      },
      {
        "question": "Why are square formats (10×10 and 12×12) standard for wedding photo albums?",
        "answer": "Square album formats (10×10 and 12×12 inches) offer maximum compositional versatility. They accommodate both 3:2 landscape orientation photos and 2:3 vertical portraits on the same spread without creating awkward negative space."
      },
      {
        "question": "Can I design proof book layouts with camera filenames in Make Contact Sheet?",
        "answer": "Yes. Make Contact Sheet automatically formats multi-page proof book layouts (such as 4×5 or 3×4 grids per page) with original camera filenames, sequential frame index numbers, and EXIF capture data rendered cleanly beneath each image."
      },
      {
        "question": "What color profile and resolution should I use when exporting photo album spreads?",
        "answer": "Always export photo album spreads at 300 DPI (dots per inch) in standard sRGB color space. At 300 DPI, a 12×12 inch album spread (12×24 inches open) renders at 7200×3600 pixels, ensuring razor-sharp rendering on silver halide and digital press papers."
      }
    ],
    "breadcrumbs": {
      "home": "Home",
      "guides": "Guides",
      "current": "Large Photo Albums vs Proof Books"
    }
  },
  "es": {
    "title": "Álbumes de fotos grandes frente a libros de pruebas — Guía fotográfica",
    "description": "Compara álbumes de lujo y libros de prueba (proof books). Costes de impresión, márgenes de lomo, sangrado y opciones de selección de fotos para clientes.",
    "badge": "GUÍA DE ÁLBUMES E IMPRESIÓN · 9 MIN DE LECTURA",
    "h1Pre": "Álbumes de fotos grandes frente a ",
    "h1Highlight": "Libros de pruebas",
    "lead": "Compara álbumes de lujo para bodas, fotolibros de revista y libros de contactos de trabajo. Analiza costes de producción, márgenes de seguridad en el lomo y entrega a clientes.",
    "quickAnswerLabel": "Respuesta rápida / Resumen comparativo",
    "quickAnswerText": "La diferencia entre un álbum de fotos y un libro de pruebas radica en el propósito y la densidad: un álbum fotográfico grande (ej. 30×30 cm con apertura plana) es una pieza de lujo que reúne de 50 a 80 fotos retocadas con diseño artístico (coste de 150 a 400 €). Un libro de pruebas (o cuaderno de contactos) es un documento de trabajo de alta densidad con cientos de miniaturas y nombres de archivo (coste de 0 a 15 €) para que el cliente elija sus fotos.",
    "stepsHeading": "¿Cómo elegir entre un álbum y un libro de pruebas?",
    "stepsIntro": "Sigue este esquema de estudio en 5 pasos para seleccionar el soporte idóneo y preparar archivos listos para imprenta:",
    "steps": [
      {
        "name": "Determinar el fin: Álbum de colección vs Libro de selección",
        "text": "Identifica si el encargo es un recuerdo de lujo para toda la vida (40 a 80 fotos en álbum encuadernado en piel) o un libro de trabajo para selección previa (300 a 1.000+ fotos en cuadrículas densas)."
      },
      {
        "name": "Seleccionar geometría y estándares de formato",
        "text": "Elige dimensiones habituales: 25×25 cm o 30×30 cm cuadrado para bodas, 28×35 cm horizontal para catálogos editoriales o A4 vertical para libros de pruebas en espiral económicos."
      },
      {
        "name": "Calcular márgenes de lomo (medianil) y sangrado exterior",
        "text": "Ten en cuenta la mecánica de encuadernación: deja un margen de seguridad de 13 mm en el lomo central para encuadernaciones estándar o utiliza pliegos panorámicos con apertura plana (layflat)."
      },
      {
        "name": "Maquetar pliegos con nombres de archivo y numeración",
        "text": "Organiza las fotos con plantillas de cuadrícula en Make Contact Sheet. Para libros de prueba, activa las etiquetas de texto con nombres de cámara y números de índice bajo cada foto."
      },
      {
        "name": "Exportar archivos a 300 DPI en perfil sRGB",
        "text": "Genera documentos PDF de varias páginas a 300 DPI para impresión en espiral o pliegos PNG de alta definición en sRGB para laboratorios profesionales."
      }
    ],
    "matrixHeading": "¿Cómo se comparan los formatos de fotolibros en coste, capacidad y encuadernación?",
    "matrixP1": "Los estudios profesionales de retrato y boda valoran cuatro opciones físicas al armar sus presupuestos:",
    "tableHeaders": {
      "format": "Formato de libro",
      "capacity": "Capacidad de fotos",
      "cost": "Coste de producción",
      "binding": "Tipo de encuadernación",
      "purpose": "Uso principal"
    },
    "tableRows": [
      {
        "format": "Álbum Flush Mount (Piel/Madera)",
        "capacity": "40 – 90 Fotos",
        "cost": "180 – 450+ €",
        "binding": "Hojas rígidas, apertura 180° plana",
        "purpose": "Bodas y piezas de herencia familiar"
      },
      {
        "format": "Fotolibro Layflat (Apertura plana)",
        "capacity": "80 – 160 Fotos",
        "cost": "60 – 140 €",
        "binding": "Papel semirrígido con bisagra",
        "purpose": "Sesiones familiares y lookbooks"
      },
      {
        "format": "Revista / Tapa blanda",
        "capacity": "100 – 250 Fotos",
        "cost": "20 – 45 €",
        "binding": "Encolado rústico, papel revista",
        "purpose": "Previas editoriales y portafolios"
      },
      {
        "format": "Libro de pruebas (Contact Sheet Book)",
        "capacity": "300 – 1.200+ Fotos",
        "cost": "0 € (PDF) o 8 – 18 € (Espiral)",
        "binding": "Espiral metálica o PDF digital",
        "purpose": "Selección de clientes e índice de archivo",
        "highlight": true
      }
    ],
    "gutterHeading": "¿Cuáles son las reglas de seguridad de medianil y sangrado?",
    "gutterP1": "Márgenes incorrectos pueden echar a perder una encuadernación de cientos de euros. Respeta estas tres normas mecánicas universales:",
    "gutterBullets": [
      {
        "label": "Zona de seguridad del lomo (medianil)",
        "text": "En libros convencionales con cosido o encolado, mantén elementos críticos (rostros, ojos y textos) al menos a 13–19 mm del pliegue central. Solo los álbumes flush mount permiten imágenes continuas cruzando el centro."
      },
      {
        "label": "Sangrado exterior (Bleed)",
        "text": "Añade 3 mm de sangrado más allá de la línea de corte en los cuatro lados para evitar filetes blancos no deseados al cortar las páginas con guillotina."
      },
      {
        "label": "Margen de seguridad de texto",
        "text": "Sitúa cualquier texto, pie de foto o número de página al menos a 10 mm hacia el interior del borde definitivo."
      }
    ],
    "cta": {
      "badge": "GENERADOR RÁPIDO DE LIBROS DE PRUEBAS",
      "title": "Crea libros de prueba multipágina en segundos",
      "text": "Arrastra cientos de fotos a Make Contact Sheet. Maqueta páginas de prueba a 300 DPI con nombres de archivo, ajusta márgenes y exporta en PDF al instante.",
      "btnPrimary": "Generar hojas de libro de pruebas",
      "btnSecondary": "Ver tutorial de hojas de contacto"
    },
    "faqHeading": "Preguntas frecuentes",
    "faqSub": "Dudas habituales sobre impresión de álbumes, maquetación de libros de prueba y encuadernación.",
    "faqs": [
      {
        "question": "¿Cuál es la principal diferencia entre un álbum y un libro de pruebas?",
        "answer": "Un álbum de fotos es un producto final de lujo para exhibir 50 a 100 fotos retocadas en papel grueso de conservación. Un libro de pruebas es una herramienta de trabajo que compila cientos de miniaturas con nombres para que el cliente elija."
      },
      {
        "question": "¿Cuánto cuesta producir un álbum encuadernado frente a un libro en espiral?",
        "answer": "Un álbum profesional de piel suele costar de 150 a 400 € en laboratorio (y se vende a clientes por 800 a 2.500 €). Un libro de pruebas en espiral de 50 páginas o un PDF cuesta entre 0 y 15 €."
      },
      {
        "question": "¿Qué es la regla del medianil en el diseño de fotolibros?",
        "answer": "En libros tradicionales las páginas se curvan hacia el lomo. No coloques caras ni textos a menos de 13 a 19 mm de la línea central para evitar distorsiones ópticas."
      },
      {
        "question": "¿Por qué los formatos cuadrados (25×25 y 30×30) son el estándar en bodas?",
        "answer": "Los formatos cuadrados ofrecen versatilidad total: permiten alternar fotos horizontales (3:2) y verticales (2:3) en el mismo pliego sin dejar huecos irregulares."
      },
      {
        "question": "¿Puedo incluir los nombres de archivo en Make Contact Sheet?",
        "answer": "Sí. Make Contact Sheet formatea automáticamente pliegos multipágina con nombres de archivo de cámara, números de fotograma correlativos e información EXIF bajo cada imagen."
      },
      {
        "question": "¿Qué resolución y perfil de color se usan para enviar a imprenta?",
        "answer": "Exporta siempre en 300 DPI y espacio de color sRGB estándar. A 300 DPI, un pliego abierto de 30×60 cm equivale a 7200×3600 píxeles con nitidez máxima."
      }
    ],
    "breadcrumbs": {
      "home": "Inicio",
      "guides": "Guías",
      "current": "Álbumes vs Libros de pruebas"
    }
  },
  "de": {
    "title": "Große Fotoalben vs. Proof-Bücher — Leitfaden für Fotografen",
    "description": "Fotoalben und Proof-Bücher im Vergleich. Produktionskosten, Bundsteg-Sicherheitsabstände, Seitenverhältnisse und Auswahllayouts für Kunden.",
    "badge": "ALBUM- & DRUCKLEITFADEN · 9 MIN LESEZEIT",
    "h1Pre": "Große Fotoalben vs. ",
    "h1Highlight": "Proof-Bücher",
    "lead": "Vergleichen Sie edle Echtleder-Alben, Magazin-Fotobücher und Arbeits-Proof-Bücher. Verstehen Sie Produktionskosten, Bundsteg-Sicherheitszonen und Kundenübergaben.",
    "quickAnswerLabel": "Kurzantwort / Vergleich im Überblick",
    "quickAnswerText": "Der Unterschied zwischen einem Fotoalbum und einem Proof-Buch liegt in Zweck und Bilddichte: Ein großes Fotoalbum (z. B. 30×30 cm Layflat) ist ein langlebiges Erbstück mit 50 bis 80 retuschierten Highlights und viel Weißraum (180–450 € Druckkosten). Ein Proof-Buch (oder Kontaktabzugsbuch) ist ein Arbeitsdokument mit 300 bis 1.000+ Fotos und sichtbaren Dateinamen (0–15 € Druckkosten), gedacht für die Auswahl und Archivierung.",
    "stepsHeading": "Wie wählt man zwischen Album und Proof-Buch?",
    "stepsIntro": "Folgen Sie diesem 5-Stufen-Leitfaden, um das passende Format zu bestimmen und druckfertige Daten zu erstellen:",
    "steps": [
      {
        "name": "Zweck klären: Luxus-Album vs. Arbeits-Proof-Buch",
        "text": "Entscheiden Sie, ob das Endprodukt ein edles Erinnerungsstück (40 bis 80 retuschierte Meisterfotos im Lederband) oder ein praktisches Auswahldokument (300 bis 1.000+ Aufnahmen im dichten Raster) ist."
      },
      {
        "name": "Seitenformat und Abmessungen festlegen",
        "text": "Wählen Sie Standardmaße: 25×25 cm oder 30×30 cm quadratisch für Hochzeitsalben, 28×35 cm Querformat für Lookbooks oder DIN A4 Hochformat für günstige spiralgebundene Proof-Bücher."
      },
      {
        "name": "Bundsteg-Sicherheitsabstand und Beschnitt berechnen",
        "text": "Berücksichtigen Sie die Bindung: Halten Sie bei herkömmlichen Büchern mindestens 13 mm Sicherheitsabstand zum Mittelfalz ein oder nutzen Sie 180° Layflat-Doppelseiten."
      },
      {
        "name": "Mehrfach-Raster mit Dateinamen formatieren",
        "text": "Nutzen Sie Vorlagen in Make Contact Sheet. Aktivieren Sie für Proof-Bücher Textbeschriftungen mit Original-Dateinamen und Ziffern unter jedem Bild."
      },
      {
        "name": "In 300 DPI sRGB für Fachlabore exportieren",
        "text": "Laden Sie mehrseitige 300-DPI-PDFs für den Bürodruck oder hochauflösende PNG-Einzelseiten für Fotofachlabore herunter."
      }
    ],
    "matrixHeading": "Buchformate im Vergleich: Kosten, Kapazität und Fertigung",
    "matrixP1": "Fotostudios unterscheiden bei Kundenangeboten vier Buchvarianten:",
    "tableHeaders": {
      "format": "Buchformat",
      "capacity": "Bildkapazität",
      "cost": "Produktionskosten",
      "binding": "Bindungsart",
      "purpose": "Haupteinsatzbereich"
    },
    "tableRows": [
      {
        "format": "Flush-Mount-Album (Echtleder)",
        "capacity": "40 – 90 Fotos",
        "cost": "180 – 450+ €",
        "binding": "Starke Kartonseiten, 180° Layflat",
        "purpose": "Hochzeits- & Premium-Erbstücke"
      },
      {
        "format": "Layflat-Fotobuch",
        "capacity": "80 – 160 Fotos",
        "cost": "60 – 140 €",
        "binding": "Flexibles Papier mit Scharnierfalz",
        "purpose": "Familien- & Business-Lookbooks"
      },
      {
        "format": "Magazin / Softcover",
        "capacity": "100 – 250 Fotos",
        "cost": "20 – 45 €",
        "binding": "Klebebindung, Magazinpapier",
        "purpose": "Vorschauexemplare & Portfolios"
      },
      {
        "format": "Kontaktabzug-Proof-Buch",
        "capacity": "300 – 1.200+ Fotos",
        "cost": "0 € (PDF) oder 8 – 18 € (Spirale)",
        "binding": "Drahtkammbindung oder Digital-PDF",
        "purpose": "Kundenauswahl & Archivindex",
        "highlight": true
      }
    ],
    "gutterHeading": "Sicherheitsregeln für Bundsteg und Anschnitt",
    "gutterP1": "Fehlerhafte Ränder ruinieren teure Buchdrucke. Halten Sie diese Regeln ein:",
    "gutterBullets": [
      {
        "label": "Bundsteg-Sicherheitszone",
        "text": "Halten Sie Gesichter und Texte mindestens 13 bis 19 mm vom Mittelfalz fern, außer bei echten nahtlosen Layflat-Bindungen."
      },
      {
        "label": "Außenkanten-Beschnitt (Bleed)",
        "text": "Fügen Sie an allen Außenkanten 3 mm Anschnitt hinzu, um weiße Blitzer beim Beschneiden zu verhindern."
      },
      {
        "label": "Sicherer Textabstand",
        "text": "Platzieren Sie Bildunterschriften und Seitenzahlen mindestens 10 mm innerhalb der späteren Schnittkante."
      }
    ],
    "cta": {
      "badge": "SCHNELLER PROOF-BUCH-GENERATOR",
      "title": "Mehrseitige Proof-Bücher in Sekunden erstellen",
      "text": "Ziehen Sie Hunderte Fotos in Make Contact Sheet. Formatieren Sie 300-DPI-Seiten mit Dateinamen und exportieren Sie druckfertige PDFs.",
      "btnPrimary": "Proof-Buch-Seiten anlegen",
      "btnSecondary": "Kontaktabzug-Anleitung lesen"
    },
    "faqHeading": "Häufig gestellte Fragen",
    "faqSub": "Praxisnahe Antworten zu Albumdruck, Proof-Buch-Layouts und Bindungsarten.",
    "faqs": [
      {
        "question": "Was unterscheidet ein Fotoalbum von einem Proof-Buch?",
        "answer": "Ein Fotoalbum ist ein hochwertiges Meisterwerk für 50 bis 100 finale Bilder auf schwerem Papier. Ein Proof-Buch ist ein Arbeitsmittel mit Hunderten nummerierten Miniaturen für die Bildauswahl."
      },
      {
        "question": "Was kostet die Produktion?",
        "answer": "Ein professionelles Leder-Hochzeitsalbum kostet im Fachlabor 150 bis 450 € (Kundenverkaufspreis: 800 bis 2.500 €). Ein 50-seitiges Spiral-Proof-Buch oder PDF kostet 0 bis 15 €."
      },
      {
        "question": "Was besagt die Bundsteg-Regel?",
        "answer": "Da herkömmliche Buchseiten in den Falz hineinlaufen, dürfen wichtige Bildelemente und Texte nicht näher als 13 bis 19 mm am Falz liegen."
      },
      {
        "question": "Warum sind quadratische Formate (30×30) Standard bei Hochzeiten?",
        "answer": "Quadratische Seiten bieten maximale gestalterische Freiheit: Hoch- und Querformate lassen sich ohne unschöne Leerräume kombinieren."
      },
      {
        "question": "Können Dateinamen automatisch eingeblendet werden?",
        "answer": "Ja, Make Contact Sheet generiert mehrseitige Buchlayouts mit originalen Dateinamen, Ziffern und Belichtungsdaten unter jedem Foto."
      },
      {
        "question": "Welches Farbprofil und welche Auflösung benötigt die Druckerei?",
        "answer": "Exportieren Sie immer in 300 DPI und sRGB. Eine aufgeschlagene 30×30-Doppelseite (30×60 cm) misst 7200×3600 Pixel und liefert gestochen scharfe Druckergebnisse."
      }
    ],
    "breadcrumbs": {
      "home": "Startseite",
      "guides": "Leitfäden",
      "current": "Alben vs. Proof-Bücher"
    }
  },
  "fr": {
    "title": "Grands albums photo vs livres d'épreuves — Guide de reliure",
    "description": "Comparez albums de mariage haut de gamme et livres d'épreuves (proof books). Coûts de fabrication, marges de pli et mise en page pour la sélection client.",
    "badge": "GUIDE ALBUM & ÉDITION · 9 MIN DE LECTURE",
    "h1Pre": "Grands albums photo vs. ",
    "h1Highlight": "Livres d'épreuves",
    "lead": "Comparez les albums d'art en cuir, les livres magazines et les recueils de planches contact d'épreuves. Maîtrisez les coûts d'impression, les zones de sécurité et la sélection client.",
    "quickAnswerLabel": "Réponse rapide / Synthèse comparative",
    "quickAnswerText": "La différence entre un album photo et un livre d'épreuves tient à l'objectif et à la densité : un grand album photo (ex. 30×30 cm à ouverture à plat) est une pièce de luxe réunissant 50 à 80 photos retouchées avec un design épuré (180 à 450 € d'impression). Un livre d'épreuves (ou recueil de planches contact) est un document de travail dense regroupant 300 à 1 000+ vignettes avec noms de fichiers (0 à 15 €) pour permettre au client de faire ses choix.",
    "stepsHeading": "Comment choisir entre un album d'art et un livre d'épreuves ?",
    "stepsIntro": "Suivez ce protocole en 5 étapes pour sélectionner la reliure idéale et exporter des fichiers prêts pour l'impression :",
    "steps": [
      {
        "name": "Définir l'intention : Livre de collection vs Cahier de travail",
        "text": "Déterminez s'il s'agit d'un écrin patrimonial de 40 à 80 photos sur pages rigides ou d'un cahier de sélection technique regroupant des centaines de clichés bruts."
      },
      {
        "name": "Sélectionner le format géométrique approprié",
        "text": "Choisissez des standards : 25×25 ou 30×30 cm carré pour les mariages, 28×35 cm à l'italienne pour les lookbooks ou A4 portrait pour des cahiers d'épreuves à spirale économiques."
      },
      {
        "name": "Calculer la marge de petit fond (pliure) et le fond perdu",
        "text": "Tenez compte du type de reliure : prévoyez 13 mm de sécurité le long du pli central pour les reliures classiques ou optez pour une ouverture à plat (layflat)."
      },
      {
        "name": "Agencer les planches avec noms de fichiers et index",
        "text": "Utilisez les gabarits de Make Contact Sheet. Pour un livre d'épreuves, affichez les identifiants de prise de vue et un repère numérique sous chaque image."
      },
      {
        "name": "Exporter des fichiers étalonnés 300 DPI sRGB",
        "text": "Générez un PDF multipage 300 DPI pour impression de bureau ou des planches PNG haute résolution étalonnées en sRGB pour votre laboratoire pro."
      }
    ],
    "matrixHeading": "Comparatif des formats : Coûts, capacité et façonnage",
    "matrixP1": "Les studios de portrait et de mariage proposent généralement quatre catégories de livres :",
    "tableHeaders": {
      "format": "Type de livre",
      "capacity": "Capacité en photos",
      "cost": "Coût de fabrication",
      "binding": "Type de reliure",
      "purpose": "Usage privilégié"
    },
    "tableRows": [
      {
        "format": "Album Flush Mount (Prestige)",
        "capacity": "40 – 90 Photos",
        "cost": "180 – 450+ €",
        "binding": "Pages rigides, ouverture 180° à plat",
        "purpose": "Mariages & Souvenirs d'exception"
      },
      {
        "format": "Livre photo Layflat",
        "capacity": "80 – 160 Photos",
        "cost": "60 – 140 €",
        "binding": "Papier semi-rigide avec rainure",
        "purpose": "Séances famille & Lookbooks de mode"
      },
      {
        "format": "Magazine / Couverture souple",
        "capacity": "100 – 250 Photos",
        "cost": "20 – 45 €",
        "binding": "Dos carré collé, papier magazine",
        "purpose": "Prévisualisation éditoriale & Démo"
      },
      {
        "format": "Livre d'épreuves (Proof Book)",
        "capacity": "300 – 1 200+ Photos",
        "cost": "0 € (PDF) ou 8 – 18 € (Spirale)",
        "binding": "Spirale métallique ou PDF numérique",
        "purpose": "Tri client & Index d'archivage",
        "highlight": true
      }
    ],
    "gutterHeading": "Règles indispensables pour le pli central et le fond perdu",
    "gutterP1": "Une erreur de marge peut gâcher un tirage d'album coûteux. Respectez ces 3 consignes techniques :",
    "gutterBullets": [
      {
        "label": "Marge de sécurité du pli central (petit fond)",
        "text": "Dans une reliure collée standard, éloignez les visages et les textes d'au moins 13 à 19 mm du pli pour éviter toute déformation dans la reliure."
      },
      {
        "label": "Fond perdu extérieur (Bleed)",
        "text": "Ajoutez 3 mm de fond perdu au-delà du trait de coupe sur les 4 côtés extérieurs pour empêcher les liserés blancs lors du massicotage."
      },
      {
        "label": "Marge de sécurité du texte",
        "text": "Positionnez les légendes et numéros de page à au moins 10 mm à l'intérieur du format fini rogné."
      }
    ],
    "cta": {
      "badge": "GÉNÉRATEUR DE LIVRES D'ÉPREUVES",
      "title": "Créez des livres d'épreuves multipages en quelques secondes",
      "text": "Déposez des centaines de photos dans Make Contact Sheet. Formatez des pages 300 DPI avec noms de fichiers et exportez en PDF imprimable.",
      "btnPrimary": "Générer un livre d'épreuves",
      "btnSecondary": "Lire le tutoriel Planche Contact"
    },
    "faqHeading": "Foire aux questions",
    "faqSub": "Réponses d'experts sur la fabrication d'albums, les formats de livres d'épreuves et la reliure.",
    "faqs": [
      {
        "question": "Quelle est la vraie différence entre un album et un livre d'épreuves ?",
        "answer": "Un album photo est un ouvrage haut de gamme de 50 à 100 photos retouchées sur papier d'art rigide. Un livre d'épreuves est un support de travail dense compilant des centaines de vignettes avec noms de fichiers pour la sélection."
      },
      {
        "question": "Combien coûte un album par rapport à un livre d'épreuves ?",
        "answer": "Un album cuir haut de gamme coûte de 150 à 450 € chez un façonneur d'art (et se vend de 800 à 2 500 € au client). Un livre d'épreuves de 50 pages à spirale ou PDF coûte entre 0 et 15 €."
      },
      {
        "question": "Qu'est-ce que la règle du pli central en mise en page d'album ?",
        "answer": "Dans une reliure classique, les pages s'incurvent vers le dos. Il faut maintenir les éléments importants à au moins 13 à 19 mm du pli central pour éviter qu'ils ne disparaissent dans la reliure."
      },
      {
        "question": "Pourquoi le format carré (30×30 cm) est-il plébiscité en mariage ?",
        "answer": "Le format carré accueille aussi bien des cadrages horizontaux que verticaux sur une même double page sans créer de vides asymétriques disgracieux."
      },
      {
        "question": "Peut-on imprimer les noms de fichiers sous chaque vignette ?",
        "answer": "Oui. Make Contact Sheet insère automatiquement les noms de fichiers boîtier et des numéros de repère sous chaque cadre pour simplifier les choix du client."
      },
      {
        "question": "Quelle définition et quel profil utiliser pour l'envoi au labo ?",
        "answer": "Exportez toujours en 300 DPI en espace sRGB. Une double page 30×30 cm ouverte (30×60 cm) représente 7200×3600 pixels d'une netteté photographique absolue."
      }
    ],
    "breadcrumbs": {
      "home": "Accueil",
      "guides": "Guides",
      "current": "Albums vs Livres d'épreuves"
    }
  },
  "ja": {
    "title": "大型写真アルバム vs プルーフブック（写真集・ベタ焼き見本帳）の比較ガイド",
    "description": "高級記念アルバムと選定用プルーフブックの違いを徹底比較。印刷コスト、ノド部分の安全マージン、製本様式、クライアント納品戦略。",
    "badge": "アルバム＆印刷ガイド · 読了目安 9分",
    "h1Pre": "大型写真アルバム vs. ",
    "h1Highlight": "プルーフブック比較ガイド",
    "lead": "高級本革アルバム、雑誌風フォトブック、高密度コンタクトシート型プルーフブックを徹底比較。製造コスト、ノド余白の安全基準、クライアント納品戦略を解説。",
    "quickAnswerLabel": "クイック回答 / 比較まとめ",
    "quickAnswerText": "写真アルバムとプルーフブックの決定的な違いは「目的と収録密度」にあります：大型写真アルバム（例：30×30cmのフルフラット製本）は、厳選・レタッチされた50〜80枚の写真を贅沢な余白とともに美しく残す一生モノの記念品です（印刷原価2〜5万円）。一方、プルーフブック（ベタ焼き見本帳）は、300〜1,000枚以上の未加工サムネイルを元ファイル名付きで高密度に並べた、写真選定と長期保管のための実用的な作業資料です（原価0〜2,000円程度）。",
    "stepsHeading": "アルバムとプルーフブックの選定・制作5ステップ",
    "stepsIntro": "用途に応じた製本様式の選択から余白計算、印刷所入稿データ作成までのスタジオ標準手順です：",
    "steps": [
      {
        "name": "制作目的の確定：記念アルバムか選定用プルーフ本か",
        "text": "最終成果物が重厚な本革製フラッシュマウントアルバム（40〜80枚の厳選レタッチ写真）か、選定用の高密度一覧ブック（300〜1,000枚の撮影カット）かを明確にします。"
      },
      {
        "name": "ページ寸法と縦横比規格の決定",
        "text": "標準規格を選定：ウェディング向け25×25cmまたは30×30cm正方形、エディトリアル向け横長、または低コストなリング製本用のA4縦型を選択します。"
      },
      {
        "name": "ノド（綴じ代）マージンと外周断ち落としの計算",
        "text": "製本上の構造を考慮：通常製本では中央の折り目（ノド）に人物の顔や文字が吸い込まれないよう約13mmの安全余白を確保するか、180度完全に開くレイフラット製本を採用します。"
      },
      {
        "name": "ファイル名と通し番号ラベルを添えた見開きレイアウト",
        "text": "Make Contact Sheetの均等グリッドを使用。プルーフブック用には、微小フォントでカメラの元ファイル名と連番バッジを各コマの下に配置します。"
      },
      {
        "name": "ラボ印刷用の300 DPI sRGBマスターデータの書き出し",
        "text": "リング製本用のマルチページ300 DPI PDF、またはプロラボの銀塩・デジタルオフセット印刷に適合した高解像度sRGB PNGデータを出力します。"
      }
    ],
    "matrixHeading": "製本様式ごとのコスト・収録枚数・納期の比較",
    "matrixP1": "フォトスタジオがクライアントプランを構成する際に比較する4つの主要ブック形態です：",
    "tableHeaders": {
      "format": "製本スタイル",
      "capacity": "収録写真枚数",
      "cost": "製造原価目安",
      "binding": "製本・綴じ構造",
      "purpose": "主な用途"
    },
    "tableRows": [
      {
        "format": "フラッシュマウント高級アルバム",
        "capacity": "40 – 90 枚",
        "cost": "¥25,000 – ¥60,000+",
        "binding": "厚手合紙、180度フラット見開き",
        "purpose": "挙式記念品・一生の宝物"
      },
      {
        "format": "レイフラット・フォトブック",
        "capacity": "80 – 160 枚",
        "cost": "¥8,000 – ¥20,000",
        "binding": "ヒンジ付き中厚紙、見開き良好",
        "purpose": "家族写真・ファッションルックブック"
      },
      {
        "format": "ソフトカバー・マガジン",
        "capacity": "100 – 250 枚",
        "cost": "¥3,000 – ¥7,000",
        "binding": "無線綴じ、雑誌紙質",
        "purpose": "事前確認・ポートフォリオ"
      },
      {
        "format": "コンタクトシート・プルーフブック",
        "capacity": "300 – 1,200+ 枚",
        "cost": "¥0（PDF）または ¥1,000 – ¥2,500",
        "binding": "リング綴じまたは電子PDF",
        "purpose": "クライアント選定・撮影全コマ保管",
        "highlight": true
      }
    ],
    "gutterHeading": "アルバム制作におけるノド（綴じ代）と断ち落としの鉄則",
    "gutterP1": "余白の計算ミスは高価なアルバム印刷の失敗に直結します：",
    "gutterBullets": [
      {
        "label": "ノド（綴じ代）の安全マージン",
        "text": "通常製本では中央の折り目に向かってページが湾曲するため、人物の顔、目、重要なテキストはセンターから少なくとも13〜19mm離して配置します。"
      },
      {
        "label": "外周の裁ち落とし（ブリード）",
        "text": "断裁時の刃のわずかなズレによる白フチを防ぐため、仕上がり線の外側に3mmの塗り足し（ブリード）を設定します。"
      },
      {
        "label": "文字の安全マージン",
        "text": "キャプションやページ番号は、仕上がり線の内側10mm以上の安全領域に配置します。"
      }
    ],
    "cta": {
      "badge": "即時プルーフブック作成エンジン",
      "title": "複数ページのプルーフブックを数秒で作成",
      "text": "大量の写真をMake Contact Sheetにドロップ。ファイル名付き300 DPIシートを作成し、印刷用PDFを瞬時に出力できます。",
      "btnPrimary": "プルーフブックシートを作成",
      "btnSecondary": "コンタクトシートガイドを見る"
    },
    "faqHeading": "よくある質問",
    "faqSub": "アルバム印刷、プルーフブックのレイアウト、製本構造に関する実用的な回答です。",
    "faqs": [
      {
        "question": "高級アルバムとプルーフブックの最大の違いは？",
        "answer": "アルバムは完成した50〜100枚の写真を美しく鑑賞するための保存用美術品です。プルーフブックは全撮影コマからお気に入りを選ぶための作業用カタログです。"
      },
      {
        "question": "制作費用の目安は？",
        "answer": "本革の本格アルバムはプロラボ印刷で2万〜5万円以上かかりますが、リング製本のプルーフブックやPDF形式なら0円〜2,000円程度で作成できます。"
      },
      {
        "question": "製本時の「ノド」に関する注意点とは？",
        "answer": "見開きの中心部分は製本時に巻き込まれるため、人物の顔や文字を中央から13mm以上離して配置する必要があります。完全にフラットに開く合紙製本なら中央をまたいだ写真配置が可能です。"
      },
      {
        "question": "なぜ結婚式アルバムには正方形（30×30cm）が多いのですか？",
        "answer": "正方形の見開きは、縦位置写真と横位置写真のどちらをレイアウトしても無駄な余白が出にくく、最も自由で安定した構図が組めるためです。"
      },
      {
        "question": "ファイル名入りのプルーフブックは作れますか？",
        "answer": "はい。Make Contact Sheetを使えば、1ページあたり12枚や20枚などの高密度グリッドに正確な元ファイル名と連番を添えて自動レイアウトできます。"
      },
      {
        "question": "印刷所への入稿に適したカラープロファイルと解像度は？",
        "answer": "300 DPI、sRGBカラープロファイルが最も安全で標準的です。30×30cmアルバムの見開き（30×60cm）なら7200×3600ピクセルとなり、極めて高精細に仕上がります。"
      }
    ],
    "breadcrumbs": {
      "home": "ホーム",
      "guides": "ガイド",
      "current": "アルバム vs プルーフブック"
    }
  },
  "pt": {
    "title": "Álbuns de fotos grandes vs Livros de provas — Guia de fotografia",
    "description": "Compare álbuns de luxo e livros de prova (proof books). Custos de encadernação, margens de dobra e diagramação para aprovação com clientes.",
    "badge": "GUIA DE ÁLBUNS E IMPRESSÃO · 9 MIN DE LEITURA",
    "h1Pre": "Grandes álbuns de fotos vs. ",
    "h1Highlight": "Livros de provas",
    "lead": "Compare álbuns de luxo para casamentos, fotolivros estilo revista e cadernos de folhas de contato. Entenda custos de produção, margens de segurança na lombada e entrega aos clientes.",
    "quickAnswerLabel": "Resposta rápida / Resumo comparativo",
    "quickAnswerText": "A diferença entre um álbum fotográfico e um livro de provas está no propósito e na densidade: um álbum grande (ex.: 30×30 cm com abertura panorâmica) é uma peça de luxo com 50 a 80 fotos tratadas e diagramação limpa (custo de R$ 400 a R$ 1.500). Um livro de provas (proof book) é um documento prático de alta densidade reunindo centenas de fotos com nomes de arquivo (custo de R$ 0 a R$ 50) para o cliente selecionar seus favoritos.",
    "stepsHeading": "Como escolher entre um álbum de luxo e um livro de provas?",
    "stepsIntro": "Siga este roteiro em 5 etapas para selecionar a encadernação correta e gerar arquivos prontos para a gráfica:",
    "steps": [
      {
        "name": "Definir o objetivo: Obra de lembrança vs Caderno de triagem",
        "text": "Identifique se a entrega final é uma lembrança de família definitiva (40 a 80 fotos em álbum encadernado em couro) ou um material de trabalho para seleção de fotos (300 a 1.000+ fotos em grade densa)."
      },
      {
        "name": "Selecionar o formato geométrico ideal",
        "text": "Escolha padrões consagrados: 25×25 cm ou 30×30 cm quadrado para casamentos, 28×35 cm paisagem para lookbooks ou A4 retrato para cadernos de espiral econômicos."
      },
      {
        "name": "Calcular margens de vinco central (canaleta) e sangria",
        "text": "Considere o acabamento da encadernação: mantenha 13 mm de margem no vinco central em livros comuns para não esconder rostos ou use folhas panorâmicas layflat com abertura 180°."
      },
      {
        "name": "Diagramar lâminas com nomes de arquivo e sequência",
        "text": "Organize as fotos usando as grades do Make Contact Sheet. Para livros de provas, ative rótulos de identificação com nomes de câmera e numeração sequencial sob cada miniatura."
      },
      {
        "name": "Exportar arquivos calibrados em 300 DPI sRGB",
        "text": "Gere arquivos PDF multipágina em 300 DPI para impressão em espiral ou lâminas em PNG de alta resolução para encadernadoras fotográficas profissionais."
      }
    ],
    "matrixHeading": "Comparativo de formatos de livros: Custos, capacidade e acabamento",
    "matrixP1": "Estúdios de retrato e casamento analisam quatro opções principais ao montar propostas comerciais:",
    "tableHeaders": {
      "format": "Formato de livro",
      "capacity": "Capacidade de fotos",
      "cost": "Custo de produção",
      "binding": "Tipo de encadernação",
      "purpose": "Finalidade principal"
    },
    "tableRows": [
      {
        "format": "Álbum Panorâmico Flush Mount",
        "capacity": "40 – 90 Fotos",
        "cost": "R$ 400 – R$ 1.200+",
        "binding": "Páginas rígidas, abertura plana 180°",
        "purpose": "Casamentos e lembranças de família"
      },
      {
        "format": "Fotolivro Layflat",
        "capacity": "80 – 160 Fotos",
        "cost": "R$ 150 – R$ 380",
        "binding": "Papel semirrígido articulado",
        "purpose": "Ensaios de família e catálogos"
      },
      {
        "format": "Revista / Capa flexível",
        "capacity": "100 – 250 Fotos",
        "cost": "R$ 50 – R$ 120",
        "binding": "Colagem fresada, papel couché fino",
        "purpose": "Prévias editoriais e portfólios"
      },
      {
        "format": "Livro de Provas (Proof Book)",
        "capacity": "300 – 1.200+ Fotos",
        "cost": "R$ 0 (PDF) ou R$ 25 – R$ 50 (Espiral)",
        "binding": "Espiral metálica wire-o ou PDF",
        "purpose": "Triagem com clientes e arquivo geral",
        "highlight": true
      }
    ],
    "gutterHeading": "Regras de vinco central e margem de sangria",
    "gutterP1": "Erros de margem podem estragar encadernações caras. Siga sempre estas três recomendações mecânicas:",
    "gutterBullets": [
      {
        "label": "Área de segurança da dobra central",
        "text": "Em encadernações tradicionais, mantenha rostos, olhos e textos a pelo menos 13 a 19 mm de distância da dobra central."
      },
      {
        "label": "Sangria externa (Bleed)",
        "text": "Adicione 3 mm de sangria em todas as quatro bordas externas para evitar filetes brancos após o refile na guilhotina."
      },
      {
        "label": "Margem de segurança para textos",
        "text": "Posicione legendas e números de página a pelo menos 10 mm para dentro da linha de corte."
      }
    ],
    "cta": {
      "badge": "GERADOR DE LIVRO DE PROVAS",
      "title": "Crie livros de prova multipágina em segundos",
      "text": "Arraste centenas de fotos para o Make Contact Sheet. Diagrame páginas em 300 DPI com nomes de arquivo e exporte PDFs prontos para impressão.",
      "btnPrimary": "Gerar páginas de prova",
      "btnSecondary": "Ver tutorial de Folha de Contato"
    },
    "faqHeading": "Perguntas frequentes",
    "faqSub": "Respostas práticas sobre produção de álbuns, diagramação de livros de prova e acabamento gráfico.",
    "faqs": [
      {
        "question": "Qual a diferença real entre um álbum e um livro de provas?",
        "answer": "Um álbum fotográfico é uma obra de arte finalizada para contemplar de 50 a 100 fotos tratadas em papel grosso. Um livro de provas é um caderno de trabalho com centenas de miniaturas numeradas para o cliente escolher."
      },
      {
        "question": "Quanto custa produzir cada um?",
        "answer": "Um álbum profissional de casamento custa de R$ 400 a R$ 1.200+ na encadernadora (vendido ao casal por R$ 2.000 a R$ 7.000). Um livro de provas em espiral ou PDF custa de R$ 0 a R$ 50."
      },
      {
        "question": "O que é a regra da dobra central (canaleta)?",
        "answer": "Como as páginas de livros tradicionais se curvam para dentro da lombada, elementos essenciais (como rostos) devem ficar a pelo menos 13 a 19 mm da dobra para evitar distorções."
      },
      {
        "question": "Por que o formato quadrado (30×30 cm) é o preferido em casamentos?",
        "answer": "O formato quadrado permite alternar fotos horizontais e verticais em uma mesma lâmina com elegância e sem gerar espaços vazios estranhos."
      },
      {
        "question": "É possível imprimir com os nomes dos arquivos abaixo das fotos?",
        "answer": "Sim. O Make Contact Sheet adiciona automaticamente os nomes reais da câmera e números sequenciais sob cada foto para que a escolha seja precisa."
      },
      {
        "question": "Qual resolução e perfil de cor enviar para a encadernadora?",
        "answer": "Exporte sempre em 300 DPI no perfil sRGB. Uma lâmina aberta de 30×60 cm equivale a 7200×3600 pixels com máxima definição fotográfica."
      }
    ],
    "breadcrumbs": {
      "home": "Início",
      "guides": "Guias",
      "current": "Álbuns vs Livros de provas"
    }
  }
};
