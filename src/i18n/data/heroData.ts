import type { Locale } from '../config';

export interface HeroData {
  badge: string;
  titlePrefix: string;
  titleHighlight1: string;
  titleMiddle: string;
  titleHighlight2: string;
  subtitle: string;
  ctaStart: string;
  ctaExplore: string;
  pillZeroUploads: string;
  pillFreeNoSignup: string;
  pillFilenames: string;
}

export const HERO_DATA: Record<Locale, HeroData> = {
  "en": {
    "badge": "100% LOCAL IN-BROWSER ENGINE",
    "titlePrefix": "Free",
    "titleHighlight1": "Contact Sheet Maker",
    "titleMiddle": "&",
    "titleHighlight2": "Photo Collage",
    "subtitle": "Arrange photos into print-ready contact sheets and photo collages online. Review client selects with fast keyboard shortcuts, keep camera filenames intact, and export 300 DPI PDFs locally.",
    "ctaStart": "Start Creating",
    "ctaExplore": "Explore Templates",
    "pillZeroUploads": "Zero Server Uploads",
    "pillFreeNoSignup": "Free & No Signup",
    "pillFilenames": "Filenames Preserved"
  },
  "es": {
    "badge": "100% MOTOR LOCAL EN EL NAVEGADOR",
    "titlePrefix": "Gratis",
    "titleHighlight1": "Creador de hojas de contactos",
    "titleMiddle": "y",
    "titleHighlight2": "Collages de fotos",
    "subtitle": "Organiza fotos en hojas de contactos listas para imprimir y collages en línea. Revisa selecciones con atajos de teclado, conserva los nombres de cámara y exporta PDFs a 300 DPI localmente.",
    "ctaStart": "Empezar ahora",
    "ctaExplore": "Ver plantillas",
    "pillZeroUploads": "Cero subidas a servidores",
    "pillFreeNoSignup": "Gratis y sin registro",
    "pillFilenames": "Nombres de archivo intactos"
  },
  "de": {
    "badge": "100% LOKALE BROWSER-ENGINE",
    "titlePrefix": "Kostenlos",
    "titleHighlight1": "Kontaktabzug-Generator",
    "titleMiddle": "&",
    "titleHighlight2": "Fotocollagen",
    "subtitle": "Erstellen Sie druckfertige Kontaktabzüge und Fotocollagen direkt im Browser. Schnelle Tastatur-Shortcuts, exakte Originaldateinamen und lokaler 300 DPI PDF-Export.",
    "ctaStart": "Jetzt erstellen",
    "ctaExplore": "Vorlagen entdecken",
    "pillZeroUploads": "Keine Server-Uploads",
    "pillFreeNoSignup": "Kostenlos & ohne Anmeldung",
    "pillFilenames": "Dateinamen bleiben erhalten"
  },
  "fr": {
    "badge": "MOTEUR 100% LOCAL DANS LE NAVIGATEUR",
    "titlePrefix": "Gratuit",
    "titleHighlight1": "Créateur de planches contact",
    "titleMiddle": "&",
    "titleHighlight2": "Collages photo",
    "subtitle": "Assemblez vos photos en planches contact prêtes à imprimer et collages en ligne. Raccourcis clavier ultra-rapides, noms de fichiers préservés et export PDF 300 DPI en local.",
    "ctaStart": "Commencer",
    "ctaExplore": "Explorer les modèles",
    "pillZeroUploads": "Zéro téléversement serveur",
    "pillFreeNoSignup": "Gratuit et sans inscription",
    "pillFilenames": "Noms de fichiers préservés"
  },
  "ja": {
    "badge": "100% 完全ブラウザ内ローカル処理",
    "titlePrefix": "無料",
    "titleHighlight1": "コンタクトシート作成",
    "titleMiddle": "＆",
    "titleHighlight2": "フォトコラージュ",
    "subtitle": "ブラウザ上で印刷用コンタクトシートやコラージュを作成。高速キーボードショートカットで選別、カメラ元ファイル名を完全保持し、300 DPIの印刷用PDFを端末内で出力。",
    "ctaStart": "今すぐ作成する",
    "ctaExplore": "テンプレートを見る",
    "pillZeroUploads": "サーバー送信ゼロ（完全ローカル）",
    "pillFreeNoSignup": "完全無料・登録不要",
    "pillFilenames": "元ファイル名を完全保持"
  },
  "pt": {
    "badge": "MOTOR 100% LOCAL NO NAVEGADOR",
    "titlePrefix": "Grátis",
    "titleHighlight1": "Criador de folhas de contato",
    "titleMiddle": "e",
    "titleHighlight2": "Colagens de fotos",
    "subtitle": "Organize fotos em folhas de contato prontas para impressão e colagens online. Avalie seleções com atalhos de teclado, mantenha os nomes originais e exporte PDFs em 300 DPI localmente.",
    "ctaStart": "Começar agora",
    "ctaExplore": "Ver modelos",
    "pillZeroUploads": "Zero uploads para servidor",
    "pillFreeNoSignup": "Grátis e sem cadastro",
    "pillFilenames": "Nomes de arquivos preservados"
  }
};
