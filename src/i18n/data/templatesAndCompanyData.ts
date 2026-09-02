import type { Locale } from '../config';

export interface ContactSheetTemplatesData {
  title: string;
  description: string;
  breadcrumbsTitle: string;
  heroTitlePrefix: string;
  heroHighlight: string;
  heroTitleSuffix: string;
  heroLead: string;
  categories: Record<'all' | 'standard' | 'film' | 'client' | 'digital', string>;
  pageSizeLabel: string;
  labelsLabel: string;
  marginsGapLabel: string;
  usePresetBtn: string;
  editorialTitle: string;
  editorialP1: string;
  editorialP2: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
}

export interface CollageTemplatesData {
  title: string;
  description: string;
  breadcrumbsTitle: string;
  heroTitlePrefix: string;
  heroHighlight: string;
  heroTitleSuffix: string;
  heroLead: string;
  categories: Record<'all' | 'basic' | 'showcase' | 'social' | 'comparison', string>;
  photosLabel: string;
  aspectRatioLabel: string;
  defaultGapLabel: string;
  useTemplateBtn: string;
  editorialTitle: string;
  editorialP1: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
}

export interface MoodBoardTemplatesData {
  title: string;
  description: string;
  breadcrumbsMoodBoard: string;
  breadcrumbsTitle: string;
  heroTitlePrefix: string;
  heroHighlight: string;
  heroTitleSuffix: string;
  heroLead: string;
  openCanvasBtn: string;
  readGuideBtn: string;
  categories: Record<'all' | 'editorial' | 'lookbook' | 'concept' | 'film' | 'minimal', string>;
  aspectRatioLabel: string;
  elementsLabel: string;
  totalObjectsLabel: string;
  photosLabel: string;
  swatchesLabel: string;
  widescreenLabel: string;
  useTemplateBtn: string;
  editorialTitle: string;
  editorialHighlight: string;
  editorialLead: string;
  editorialCards: { title: string; desc: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  relatedToolsTitle: string;
}

export interface ComparePhotoshopData {
  title: string;
  description: string;
  breadcrumbsCompare: string;
  breadcrumbsTitle: string;
  badge: string;
  heroTitle: string;
  heroLead: string;
  tableHeaderCapability: string;
  tableHeaderMcs: string;
  tableHeaderPs: string;
  tableHeaderCanva: string;
  tableHeaderVizua: string;
  comparisonRows: {
    feature: string;
    icon: string;
    mcs: string;
    mcsHighlight?: 'lime' | 'yellow' | 'pink' | 'cyan' | 'orange';
    ps: string;
    canva: string;
    vizua: string;
  }[];
  section1Title: string;
  section1P: string;
  section2Title: string;
  section2P: string;
  section2List: { bold: string; text: string }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
}

export interface AboutUsData {
  title: string;
  description: string;
  breadcrumbsTitle: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroLead: string;
  missionTitle: string;
  missionP1: string;
  missionP2: string;
  archTitle: string;
  archP1: string;
  archP2: string;
  archBullets: { bold: string; text: string }[];
  commitmentsTitle: string;
  commitments: { bold: string; text: string }[];
  communityTitle: string;
  communityP: string;
  contactCta: string;
  privacyPolicyLink: string;
}

export interface ContactUsData {
  title: string;
  description: string;
  breadcrumbsTitle: string;
  heroTitle: string;
  heroLead: string;
  cardHeading: string;
  cardLead: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  responseTime: string;
}

export interface LegalSection {
  title: string;
  content: string[];
  bullets?: string[];
}

export interface PrivacyPolicyData {
  title: string;
  description: string;
  breadcrumbsTitle: string;
  heroTitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface TermsAndConditionsData {
  title: string;
  description: string;
  breadcrumbsTitle: string;
  heroTitle: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export interface TemplatesAndCompanyPageData {
  contactSheetTemplates: ContactSheetTemplatesData;
  collageTemplates: CollageTemplatesData;
  moodBoardTemplates: MoodBoardTemplatesData;
  comparePhotoshop: ComparePhotoshopData;
  aboutUs: AboutUsData;
  contactUs: ContactUsData;
  privacyPolicy: PrivacyPolicyData;
  termsAndConditions: TermsAndConditionsData;
}

export const TEMPLATES_AND_COMPANY_DATA: Record<Locale, TemplatesAndCompanyPageData> = {
  es: {
    contactSheetTemplates: {
      title: "Plantillas de hojas de contactos — Diseños de prueba para imprimir",
      description: "Plantillas gratuitas de hojas de contactos en A4, Carta y 16:9. Cuadrículas calibradas con nombres de archivo y exportación en 300 DPI.",
      breadcrumbsTitle: "Plantillas de hojas de contactos",
      heroTitlePrefix: "Plantillas gratuitas de ",
      heroHighlight: "hojas de contactos",
      heroTitleSuffix: " y diseños",
      heroLead: "Explora plantillas imprimibles de hojas de contactos para pruebas de clientes, indexación de película analógica y archivo de portafolios. Elige un diseño en A4, Carta o panorámico 16:9.",
      categories: {
        all: "Todas",
        standard: "Estándares de impresión",
        film: "Película y cuarto oscuro",
        client: "Revisión de clientes y EXIF",
        digital: "Pantalla y vídeo",
      },
      pageSizeLabel: "Tamaño:",
      labelsLabel: "Etiquetas:",
      marginsGapLabel: "Márgenes / Separación:",
      usePresetBtn: "Usar este ajuste",
      editorialTitle: "Cómo elegir la plantilla de hoja de contactos adecuada",
      editorialP1: "El diseño óptimo de una hoja de contactos equilibra el tamaño de cada miniatura con la densidad de la página. Para una carpeta de revisión de clientes, una plantilla A4 o Carta con 16 a 20 imágenes por página permite evaluar expresiones, iluminación y composición con total nitidez.",
      editorialP2: "Para presentaciones en pantalla o videollamadas con clientes, las cuadrículas panorámicas en formato 16:9 se adaptan a monitores modernos sin dejar bordes verticales vacíos.",
      faqTitle: "Preguntas frecuentes sobre plantillas",
      faqs: [
        {
          question: "¿Qué plantilla de hoja de contactos debo utilizar para imprimir?",
          answer: "Para impresoras domésticas y de oficina estándar, utiliza la hoja de pruebas A4 en vertical (estándar internacional) o Carta vertical (estándar norteamericano). Ambas incluyen márgenes calibrados para que las fotos y los nombres de archivo queden dentro del área de impresión.",
        },
        {
          question: "¿Puedo personalizar las filas y columnas de estas plantillas?",
          answer: "Sí. Aunque estas plantillas ofrecen valores probados, puedes modificar columnas (1-8), filas (1-10), separación entre celdas y márgenes exteriores en el espacio de trabajo.",
        },
        {
          question: "¿Cuál es la mejor plantilla para que el cliente elija fotos?",
          answer: "Se recomienda la plantilla 'Hoja de selección para clientes'. Utiliza una cuadrícula de 3×4 con miniaturas grandes, números de índice (#1, #2) e indicadores de estado para una comunicación clara.",
        },
      ],
    },
    collageTemplates: {
      title: "Plantillas de collages de fotos — Diseños creativos en cuadrícula",
      description: "Explora plantillas gratuitas de collage con fotos destacadas, trípticos y formatos para redes sociales. Personaliza y exporta en tu navegador.",
      breadcrumbsTitle: "Plantillas de collages",
      heroTitlePrefix: "Plantillas de ",
      heroHighlight: "collage de fotos",
      heroTitleSuffix: " y composiciones a medida",
      heroLead: "Explora plantillas personalizables de collage fotográfico para historias en redes sociales, paneles comparativos y pósteres impresos con proporciones geométricas equilibradas.",
      categories: {
        all: "Todas",
        basic: "Cuadrícula básica",
        showcase: "Destacados y editorial",
        social: "Historias sociales",
        comparison: "Comparación y dúos",
      },
      photosLabel: "fotos",
      aspectRatioLabel: "Relación de aspecto:",
      defaultGapLabel: "Separación estándar:",
      useTemplateBtn: "Usar esta plantilla",
      editorialTitle: "Formatos de plantillas y casos de uso",
      editorialP1: "Las plantillas de Make Contact Sheet están diseñadas según proporciones fotográficas reales. Por ejemplo, nuestra tira horizontal de 3 fotos es ideal para panorámicas de paisajes, mientras que el formato vertical 9:16 combina retratos con planos detalle para plataformas móviles.",
      faqTitle: "Preguntas frecuentes sobre collages",
      faqs: [
        {
          question: "¿Puedo cambiar el espacio entre fotos en una plantilla de collage?",
          answer: "Sí. Cada plantilla permite ajustar la separación entre celdas (desde 0 px sin bordes hasta separadores amplios de 40 px) y los márgenes exteriores.",
        },
        {
          question: "¿Cómo encajo fotos con diferentes relaciones de aspecto?",
          answer: "Puedes elegir entre 'Cover' (recorte centrado inteligente que llena cada celda) y 'Contain' (que muestra la imagen completa sin recortar con bandas de fondo).",
        },
        {
          question: "¿Las plantillas de collage son gratuitas para descargar y usar?",
          answer: "Sí. Todas las plantillas de Make Contact Sheet son 100% gratuitas, sin marcas de agua ni obligación de registrarse.",
        },
      ],
    },
    moodBoardTemplates: {
      title: "Plantillas de mood boards — Diseños estéticos gratuitos",
      description: "Explora plantillas gratuitas de mood boards para fotografía, moda y marcas. Elige estilos editoriales, lookbooks o minimalistas y edita al instante.",
      breadcrumbsMoodBoard: "Creador de mood boards",
      breadcrumbsTitle: "Plantillas",
      heroTitlePrefix: "Plantillas gratuitas de ",
      heroHighlight: "mood boards",
      heroTitleSuffix: " y composiciones visuales",
      heroLead: "Ajustes de dirección visual para sesiones de fotos, lookbooks de moda, esquemas de iluminación y paletas cromáticas. 100% personalizables en tu navegador.",
      openCanvasBtn: "Abrir lienzo de estudio",
      readGuideBtn: "Leer guía paso a paso",
      categories: {
        all: "Todos los diseños",
        editorial: "Editorial y storyboard",
        lookbook: "Lookbook de moda",
        concept: "Concepto y paleta",
        film: "Película y analógico",
        minimal: "Limpio y minimalista",
      },
      aspectRatioLabel: "Relación de aspecto:",
      elementsLabel: "Elementos:",
      totalObjectsLabel: "objetos en total",
      photosLabel: "Fotos",
      swatchesLabel: "Muestras",
      widescreenLabel: "Panorámico 16:9",
      useTemplateBtn: "Usar esta plantilla",
      editorialTitle: "Cómo elegir la plantilla creativa adecuada",
      editorialHighlight: "Plantilla creativa ideal",
      editorialLead: "Un panel conceptual visual sirve como guía estilística para todo el equipo creativo: modelos, maquilladores, estilistas y asistentes. Elegir el diseño adecuado asegura la armonía visual antes de entrar al set.",
      editorialCards: [
        {
          title: "Editorial y storyboard",
          desc: "Prioriza un fotograma principal junto a planos detalle de texturas y notas de iluminación para producciones comerciales.",
        },
        {
          title: "Lookbook de moda",
          desc: "Equilibra tomas de cuerpo entero con muestras de tela, accesorios y notas de preparación de prendas.",
        },
        {
          title: "Historia cromática y paleta",
          desc: "Destaca muestras de color con código hexadecimal junto a referencias tonales para definir filtros de luz y etalonaje.",
        },
        {
          title: "Tríptico analógico de película",
          desc: "Muestra la estética de medio formato 120 y grano de 35 mm con notas técnicas sobre tipo de película y exposición.",
        },
      ],
      faqTitle: "Preguntas frecuentes sobre mood boards",
      faqs: [
        {
          question: "¿Cómo utilizo una plantilla de mood board?",
          answer: "Haz clic en 'Usar esta plantilla' en cualquier diseño. Se abrirá el estudio visual con dimensiones, marcos fotográficos, muestras de color y notas preconfiguradas.",
        },
        {
          question: "¿Puedo sustituir los marcos por mis propias fotos?",
          answer: "Sí. Arrastra tus fotos a la bandeja inferior y suéltalas sobre cualquier marco del lienzo, o haz clic en 'Rellenar marcos' para asignarlas automáticamente.",
        },
        {
          question: "¿Se pueden cambiar los colores de fondo, las muestras y los textos?",
          answer: "Cada elemento es 100% editable. Puedes cambiar el fondo, alternar texturas de cuadrícula o puntos, cambiar los códigos hexadecimales y escribir notas de dirección.",
        },
        {
          question: "¿Puedo exportar los tableros para presentaciones y para imprimir?",
          answer: "Sí. Puedes exportar imágenes PNG o JPEG de alta resolución y archivos PDF a 300 DPI listos para imprimir (con protección opcional por contraseña).",
        },
      ],
      relatedToolsTitle: "Herramientas y flujos relacionados",
    },
    comparePhotoshop: {
      title: "Alternativa a Photoshop Contact Sheet — Pruebas fotográficas más rápidas",
      description: "Compara Make Contact Sheet con Adobe Photoshop para crear hojas de contactos. Previsualización en vivo, mayor rapidez y sin suscripción a Creative Cloud.",
      breadcrumbsCompare: "Comparativa",
      breadcrumbsTitle: "Alternativa a Photoshop",
      badge: "BENCHMARK Y PRIVACIDAD",
      heroTitle: "La mejor alternativa ligera a Contact Sheet II de Photoshop",
      heroLead: "Compara la automatización Contact Sheet II de Adobe Photoshop con el espacio de trabajo ágil y en el navegador de Make Contact Sheet.",
      tableHeaderCapability: "Capacidad / Característica",
      tableHeaderMcs: "Make Contact Sheet",
      tableHeaderPs: "Photoshop (Contact Sheet II)",
      tableHeaderCanva: "Canva",
      tableHeaderVizua: "Vizua",
      comparisonRows: [
        {
          feature: "Cuenta / Registro obligatorio",
          icon: "👤",
          mcs: "No (Acceso instantáneo)",
          mcsHighlight: "lime",
          ps: "Sí (Adobe ID)",
          canva: "Sí (Obligatorio)",
          vizua: "No",
        },
        {
          feature: "Privacidad / Transferencia de archivos",
          icon: "🔒",
          mcs: "100% Local en el navegador",
          mcsHighlight: "lime",
          ps: "Escritorio local",
          canva: "Subida a la nube",
          vizua: "Navegador local",
        },
        {
          feature: "Preservación de nombres de archivo",
          icon: "🏷️",
          mcs: "Siempre preservados y verificados",
          mcsHighlight: "yellow",
          ps: "Preservados al imprimir",
          canva: "Eliminados / Perdidos",
          vizua: "Preservados en cuadrícula",
        },
        {
          feature: "Triaje y selección (Mantener / Descartar / Destacar)",
          icon: "🎯",
          mcs: "Sí (Atajos 1, 2, 3)",
          mcsHighlight: "pink",
          ps: "Ninguno",
          canva: "Ninguno",
          vizua: "Ninguno",
        },
        {
          feature: "Exportación de lista CSV / TXT",
          icon: "📄",
          mcs: "Sí (Listo para Lightroom)",
          mcsHighlight: "cyan",
          ps: "Ninguno",
          canva: "Ninguno",
          vizua: "Ninguno",
        },
        {
          feature: "Modos de collage y mood board",
          icon: "🎨",
          mcs: "Estudio integrado",
          mcsHighlight: "orange",
          ps: "Ninguno",
          canva: "Múltiples plantillas",
          vizua: "Ninguno",
        },
        {
          feature: "Modelo de precio",
          icon: "💰",
          mcs: "Gratuito y abierto",
          mcsHighlight: "lime",
          ps: "~20€-60€/mes",
          canva: "Freemium (12€/mes)",
          vizua: "Gratis (máx. 50 fotos)",
        },
      ],
      section1Title: "Entendiendo Contact Sheet II de Photoshop",
      section1P: "Durante más de dos décadas, el script integrado Contact Sheet II de Adobe Photoshop (Archivo > Automatizar > Hoja de contactos II) ha sido la opción tradicional para imprimir pruebas fotográficas. Sin embargo, apenas ha cambiado desde CS3: procesa las imágenes una a una lentamente, genera un documento rasterizado plano y carece de herramientas interactivas de triaje o exportación de nombres.",
      section2Title: "Dónde destaca Make Contact Sheet",
      section2P: "Make Contact Sheet fue diseñado desde cero para los flujos digitales actuales de selección y entrega a clientes:",
      section2List: [
        {
          bold: "Procesamiento web instantáneo:",
          text: "Sin instalar Creative Cloud ni esperar actualizaciones. Arrastra tu carpeta y empieza a revisar de inmediato.",
        },
        {
          bold: "Estados de revisión integrados:",
          text: "Marca fotogramas como Conservar (1), Destacar (2) o Descartar (3) directamente en la hoja.",
        },
        {
          bold: "Exportación para Lightroom:",
          text: "Genera listas CSV y TXT de nombres de archivo para filtrar con un solo clic en Lightroom Classic.",
        },
        {
          bold: "Doble modo con collage y mood board:",
          text: "Alterna entre hojas de contactos técnicas y composiciones libres sin cambiar de programa.",
        },
        {
          bold: "Gratuito y confidencial:",
          text: "Procesamiento 100% local en tu navegador sin costes ni suscripciones.",
        },
      ],
      ctaTitle: "Prueba un flujo de trabajo fotográfico más rápido",
      ctaDesc: "Crea hojas de contactos listas para imprimir en segundos sin abrir Photoshop.",
      ctaBtn: "Abrir Make Contact Sheet gratis",
      faqTitle: "Preguntas frecuentes sobre la comparativa",
      faqs: [
        {
          question: "¿Cómo se crea una hoja de contactos en Photoshop?",
          answer: "En Adobe Photoshop, ve a Archivo > Automatizar > Hoja de contactos II. Debes seleccionar una carpeta, fijar dimensiones y configurar columnas y filas mientras Photoshop abre y coloca cada imagen una tras otra.",
        },
        {
          question: "¿Por qué elegir Make Contact Sheet en lugar de Photoshop?",
          answer: "Make Contact Sheet se abre de inmediato en el navegador sin suscripción a Creative Cloud. Incluye atajos rápidos de selección (1, 2, 3) y exportación de listas de nombres de archivo, funciones ausentes en Photoshop.",
        },
        {
          question: "¿Cuándo conviene seguir usando Adobe Photoshop?",
          answer: "Photoshop sigue siendo adecuado si necesitas perfiles de color CMYK muy específicos, scripts ICC personalizados o retoques avanzados por capas.",
        },
      ],
    },
    aboutUs: {
      title: "Acerca de nosotros — Make Contact Sheet",
      description: "Conoce al equipo detrás de Make Contact Sheet, el espacio de trabajo en el navegador para hojas de contactos, collages y revisión para clientes.",
      breadcrumbsTitle: "Acerca de Make Contact Sheet",
      badge: "INGENIERÍA Y MISIÓN",
      heroTitle: "Acerca de ",
      heroHighlight: "Make Contact Sheet",
      heroLead: "Construyendo el espacio de trabajo en el navegador más rápido, privado y eficiente para hojas de contactos, mood boards y pruebas fotográficas.",
      missionTitle: "Nuestra misión y propósito",
      missionP1: "Make Contact Sheet fue creado por ingenieros de software y fotógrafos comerciales en activo para resolver un problema recurrente en la producción visual: ¿por qué crear una hoja de contactos simple y precisa con nombres de archivo exige suscripciones mensuales caras, catálogos lentos o subir gigabytes a nubes ajenas?",
      missionP2: "Creemos que los fotógrafos, directores de arte, diseñadores y creadores visuales merecen herramientas de estudio ligeras que respeten la confidencialidad de sus clientes, aprovechen la potencia del hardware moderno y no entorpezcan el proceso creativo.",
      archTitle: "Arquitectura de privacidad local (Local-First)",
      archP1: "A diferencia de las aplicaciones SaaS tradicionales que envían las fotos del usuario a servidores remotos centralizados, Make Contact Sheet está diseñado como una aplicación 100% del lado del cliente.",
      archP2: "Cuando arrastras una sesión comercial de 500 fotos o un retrato confidencial a Make Contact Sheet:",
      archBullets: [
        {
          bold: "Cero transferencia por red:",
          text: "Cada píxel, nombre de archivo y metadato EXIF se decodifica y procesa localmente en tu navegador mediante HTML5 Canvas y Web Workers.",
        },
        {
          bold: "Cero almacenamiento en servidores:",
          text: "No disponemos de servidores de procesamiento de imágenes. Tus archivos nunca tocan un disco remoto, bases de datos en la nube ni modelos de entrenamiento de IA.",
        },
        {
          bold: "Ejecución instantánea:",
          text: "Al no haber colas de subida ni descarga, la maquetación en cuadrícula y la generación de PDFs a 300 DPI suceden a la velocidad nativa de tu dispositivo.",
        },
      ],
      commitmentsTitle: "Compromisos fundamentales del estudio",
      commitments: [
        {
          bold: "Sin barreras de registro:",
          text: "Todas las funciones, plantillas y exportaciones en alta resolución son accesibles sin necesidad de crear cuenta ni pagar.",
        },
        {
          bold: "Integridad estricta de metadatos:",
          text: "Los nombres de archivo de cámara originales, las marcas de tiempo y los parámetros ópticos se conservan sin recortes arbitrarios.",
        },
        {
          bold: "Cero telemetría sobre tu contenido:",
          text: "No recopilamos métricas ni analíticas sobre el contenido de tus imágenes, nombres de archivo o decisiones de selección.",
        },
      ],
      communityTitle: "Comunidad abierta y sugerencias",
      communityP: "Make Contact Sheet es un proyecto en constante evolución gracias a los comentarios de estudios profesionales, laboratorios analógicos, retocadores y fotógrafos independientes de todo el mundo.",
      contactCta: "¿Tienes sugerencias o peticiones de plantillas? Contacta con nuestro equipo",
      privacyPolicyLink: "Lee nuestra Política de Privacidad completa",
    },
    contactUs: {
      title: "Contacto — Make Contact Sheet",
      description: "Ponte en contacto con el equipo de Make Contact Sheet para soporte técnico, sugerencias de plantillas o consultas sobre nuestras herramientas.",
      breadcrumbsTitle: "Contacto",
      heroTitle: "Contacto",
      heroLead: "¿Tienes preguntas, propuestas de plantillas o sugerencias sobre el flujo de trabajo? Nos encantará escucharte.",
      cardHeading: "Ponte en contacto",
      cardLead: "Make Contact Sheet se desarrolla y mantiene para la comunidad fotográfica y de creadores visuales. Escríbenos con informes de errores, ideas de funciones o propuestas de colaboración.",
      card1Title: "Consultas generales y soporte técnico",
      card1Desc: "Para recibir ayuda con Make Contact Sheet o informar de incompatibilidades en navegadores:",
      card2Title: "Peticiones de plantillas y nuevas funciones",
      card2Desc: "Para proponer un nuevo diseño de hoja de contactos o formato de collage:",
      responseTime: "Revisamos todos los mensajes de la comunidad y respondemos en un plazo de 1 a 2 días laborables.",
    },
    privacyPolicy: {
      title: "Política de privacidad — Make Contact Sheet",
      description: "Política de privacidad de Make Contact Sheet. Todo el procesamiento de imágenes se ejecuta localmente en tu navegador sin subidas a servidores.",
      breadcrumbsTitle: "Política de privacidad",
      heroTitle: "Política de privacidad",
      lastUpdated: "Última actualización: Agosto de 2026",
      sections: [
        {
          title: "1. Visión general y garantía de privacidad fundamental",
          content: [
            "En Make Contact Sheet, la privacidad no es una opción de configuración: es el principio de ingeniería fundamental de nuestro software. Make Contact Sheet funciona como una aplicación que se ejecuta en el navegador del cliente.",
            "Cuando cargas imágenes, hojas de contactos o collages en Make Contact Sheet, toda la decodificación, escalado, maquetación y exportación a PDF suceden directamente en la memoria local de tu navegador.",
            "Tus fotografías, píxeles, nombres originales de archivo y metadatos EXIF nunca se transmiten a nuestros servidores ni se almacenan en ninguna base de datos remota.",
          ],
        },
        {
          title: "2. Información que no recopilamos",
          content: [
            "Nos aseguramos de que los datos sensibles permanezcan en tu dispositivo en todo momento:",
          ],
          bullets: [
            "No creamos ni almacenamos cuentas de usuario, contraseñas ni credenciales de inicio de sesión.",
            "No recopilamos, visualizamos ni guardamos archivos de imagen ni fotografías subidas.",
            "No inspeccionamos ni transmitimos datos EXIF incrustados (GPS, números de serie, marcas de tiempo).",
            "No rastreamos selecciones de fotos individuales ni decisiones de triaje de clientes.",
          ],
        },
        {
          title: "3. Almacenamiento local y manifiestos de sesión",
          content: [
            "Si decides exportar un manifiesto de proyecto (.makecontactsheet.json), este archivo se genera en tu navegador y se guarda directamente en tu equipo. Al volver a abrirlo, se lee exclusivamente dentro de tu navegador para restaurar la configuración.",
          ],
        },
        {
          title: "4. Servicios de terceros y analítica",
          content: [
            "Podemos utilizar herramientas de analítica web mínimas y respetuosas con la privacidad para consultar estadísticas agregadas (como visitas totales y navegadores utilizados). Ningún archivo de imagen ni identificador de usuario se incluye en dichos eventos.",
          ],
        },
        {
          title: "5. Contacto relativo a la privacidad",
          content: [
            "Para cualquier duda o verificación técnica sobre la arquitectura local de Make Contact Sheet, contáctanos en privacy@makecontactsheet.com.",
          ],
        },
      ],
    },
    termsAndConditions: {
      title: "Términos y condiciones — Make Contact Sheet",
      description: "Términos y condiciones de uso del espacio de trabajo fotográfico Make Contact Sheet, incluyendo hojas de contactos, collages y revisión.",
      breadcrumbsTitle: "Términos y condiciones",
      heroTitle: "Términos y condiciones de uso",
      lastUpdated: "Última actualización: Agosto de 2026",
      sections: [
        {
          title: "1. Aceptación de los términos",
          content: "Al acceder o utilizar Make Contact Sheet (el 'Servicio'), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de los términos, no deberás utilizar el Servicio.",
        },
        {
          title: "2. Descripción del servicio y propiedad intelectual",
          content: "Make Contact Sheet proporciona herramientas basadas en el navegador para la creación de hojas de contactos, maquetación de collages y revisión de selecciones fotográficas. Conservas en todo momento el 100% de la propiedad y los derechos de propiedad intelectual de todas las fotografías, imágenes y contenidos procesados a través del Servicio.",
        },
        {
          title: "3. Exclusión de garantías",
          content: "El Servicio se proporciona 'TAL CUAL' y 'SEGÚN DISPONIBILIDAD', sin garantías de ningún tipo, expresas o implícitas. Make Contact Sheet no garantiza que el Servicio funcione sin interrupciones, esté libre de errores o sea compatible con todas las combinaciones de hardware y navegadores.",
        },
        {
          title: "4. Limitación de responsabilidad",
          content: "En ningún caso Make Contact Sheet ni sus colaboradores serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso del Servicio o de cualquier pérdida de datos fotográficos.",
        },
      ],
    },
  },
  de: {
    contactSheetTemplates: {
      title: "Kontaktabzug-Vorlagen — Kostenlose druckfertige Proof-Layouts",
      description: "Kostenlose Vorlagen für Kontaktabzüge in A4, US Letter und 16:9. Kalibrierte Raster mit Dateinamen und druckfertigem 300 DPI PDF-Export.",
      breadcrumbsTitle: "Kontaktabzug-Vorlagen",
      heroTitlePrefix: "Kostenlose ",
      heroHighlight: "Kontaktabzug-Vorlagen",
      heroTitleSuffix: " & Layouts",
      heroLead: "Kostenlose druckfertige Kontaktabzug-Vorlagen für Kundenauswahl, analoge Filmindexierung und Portfolio-Archivierung. Wählen Sie A4, US Letter oder 16:9.",
      categories: {
        all: "Alle",
        standard: "Druckstandards",
        film: "Film & Dunkelkammer",
        client: "Kundenauswahl & EXIF",
        digital: "Bildschirm & Video",
      },
      pageSizeLabel: "Seitengröße:",
      labelsLabel: "Beschriftung:",
      marginsGapLabel: "Ränder / Abstand:",
      usePresetBtn: "Preset verwenden",
      editorialTitle: "So wählen Sie die richtige Kontaktabzug-Vorlage",
      editorialP1: "Das ideale Layout eines Kontaktabzugs balanciert Bildgröße und Rasterdichte aus. Für Kundenmappen ermöglicht eine A4- oder US-Letter-Vorlage mit 16 bis 20 Fotos pro Seite eine genaue Beurteilung von Schärfe, Belichtung und Mimik ohne Lupe.",
      editorialP2: "Für Bildschirmpräsentationen und Videokonferenzen eignen sich 16:9-Widescreen-Raster, die Monitore optimal ausfüllen, ohne ungenutzte weiße Ränder zu hinterlassen.",
      faqTitle: "Häufige Fragen zu Vorlagen",
      faqs: [
        {
          question: "Welche Vorlage eignet sich am besten für den Ausdruck?",
          answer: "Für Standarddrucker nutzen Sie den A4-Hochformat-Bogen (internationaler Standard) oder US Letter Hochformat (Nordamerika). Beide Vorlagen enthalten kalibrierte Ränder, sodass alle Bilder und Dateinamen sauber im druckbaren Bereich liegen.",
        },
        {
          question: "Kann ich Zeilen und Spalten der Vorlagen anpassen?",
          answer: "Ja. Alle Vorlagen bieten voreingestellte Werte, Sie können jedoch Spalten (1-8), Zeilen (1-10), Ränder und Bildabstände im Arbeitsbereich frei anpassen.",
        },
        {
          question: "Welche Vorlage empfiehlt sich für die Kundenauswahl?",
          answer: "Wir empfehlen das Preset 'Kundenauswahl-Bogen'. Ein 3×4-Raster mit großzügigen Miniaturansichten, deutlichen Indexnummern (#1, #2) und Bewertungsmarkierungen ermöglicht Kunden eine unmissverständliche Auswahl.",
        },
      ],
    },
    collageTemplates: {
      title: "Fotocollage-Vorlagen — Kostenlose kreative Raster-Layouts",
      description: "Entdecken Sie kostenlose Fotocollage-Vorlagen mit Hero-Bildern, Triptychen und Social-Media-Rastern. Direkt im Browser bearbeiten und exportieren.",
      breadcrumbsTitle: "Fotocollage-Vorlagen",
      heroTitlePrefix: "Individuelle ",
      heroHighlight: "Fotocollage-Vorlagen",
      heroTitleSuffix: " & Raster-Designs",
      heroLead: "Entdecken Sie vielseitige Fotocollage-Vorlagen für Social-Media-Storys, Vergleichstafeln und Wanddrucke mit harmonischen geometrischen Proportionen.",
      categories: {
        all: "Alle",
        basic: "Einfaches Raster",
        showcase: "Editorial & Highlight",
        social: "Social Media Storys",
        comparison: "Vergleich & Duos",
      },
      photosLabel: "Fotos",
      aspectRatioLabel: "Seitenverhältnis:",
      defaultGapLabel: "Standardabstand:",
      useTemplateBtn: "Vorlage verwenden",
      editorialTitle: "Vorlagenformate und Anwendungsbereiche",
      editorialP1: "Die Vorlagen von Make Contact Sheet orientieren sich an echten fotografischen Seitenverhältnissen. Ein horizontaler 3-Foto-Streifen eignet sich hervorragend für Landschaftspanoramen, während das 9:16-Format Porträts und Nahaufnahmen für mobile Plattformen kombiniert.",
      faqTitle: "Häufige Fragen zu Collagen",
      faqs: [
        {
          question: "Kann ich den Abstand zwischen den Fotos anpassen?",
          answer: "Ja. Jede Vorlage erlaubt die freie Einstellung des Abstands (von nahtlosen 0 px bis zu 40 px breiten Trennstegen) sowie der äußeren Ränder.",
        },
        {
          question: "Wie passe ich Fotos mit unterschiedlichen Seitenverhältnissen an?",
          answer: "Sie können zwischen 'Cover' (automatischer zentrierter Beschnitt zur vollständigen Ausfüllung der Zelle) und 'Contain' (vollständige unbeschnittene Darstellung mit dezenten Rändern) wählen.",
        },
        {
          question: "Sind die Fotocollage-Vorlagen kostenlos nutzbar?",
          answer: "Ja. Alle Vorlagen in Make Contact Sheet sind 100% kostenlos ohne Wasserzeichen oder Benutzerregistrierung.",
        },
      ],
    },
    moodBoardTemplates: {
      title: "Moodboard-Vorlagen — Kostenlose ästhetische Layouts & Presets",
      description: "Kostenlose Moodboard-Vorlagen für Fotografie, Mode und Branding. Wählen Sie Editorial-, Lookbook- oder Minimal-Presets und passen Sie sie sofort an.",
      breadcrumbsMoodBoard: "Moodboard-Studio",
      breadcrumbsTitle: "Vorlagen",
      heroTitlePrefix: "Kostenlose ",
      heroHighlight: "Moodboard-Vorlagen",
      heroTitleSuffix: " & Layouts",
      heroLead: "Kuratierte Vorlagen für Fotoshootings, Mode-Lookbooks, Lichtskizzen und Farbwelten. Zu 100% lokal im Browser anpassbar.",
      openCanvasBtn: "Studio-Arbeitsfläche öffnen",
      readGuideBtn: "Schritt-für-Schritt-Anleitung lesen",
      categories: {
        all: "Alle Layouts",
        editorial: "Editorial & Storyboard",
        lookbook: "Mode-Lookbook",
        concept: "Konzept & Farbpalette",
        film: "Film & Analog",
        minimal: "Minimal & Clean",
      },
      aspectRatioLabel: "Seitenverhältnis:",
      elementsLabel: "Elemente:",
      totalObjectsLabel: "Objekte insgesamt",
      photosLabel: "Fotos",
      swatchesLabel: "Farbfelder",
      widescreenLabel: "16:9 Widescreen",
      useTemplateBtn: "Vorlage verwenden",
      editorialTitle: "So wählen Sie die passende kreative Vorlage",
      editorialHighlight: "Kreative Layout-Auswahl",
      editorialLead: "Ein visuelles Moodboard dient als gestalterischer Kompass für das gesamte Team – Models, Stylisten, Make-up-Artists und Fotoassistenten. Das passende Layout stellt sicher, dass die visuelle Vision vor dem Shooting feststeht.",
      editorialCards: [
        {
          title: "Editorial & Storyboard",
          desc: "Betont ein großes Hauptmotiv neben Detailaufnahmen von Texturen und Lichtnotizen für kommerzielle Produktionen.",
        },
        {
          title: "Mode-Lookbook",
          desc: "Kombiniert Ganzkörperaufnahmen mit Stofffarbfeldern, Accessoires und Styling-Hinweisen.",
        },
        {
          title: "Farbwelt & Palette",
          desc: "Enthält dominante Farbfelder mit Hex-Codes neben tonalen Referenzbildern zur Abstimmung von Farbfolien und Grading.",
        },
        {
          title: "Analoges Triptychon",
          desc: "Zeigt die Ästhetik von 120er Mittelformat und 35mm-Korn mit technischen Belichtungsangaben und Filmmaterial.",
        },
      ],
      faqTitle: "Häufige Fragen zu Moodboards",
      faqs: [
        {
          question: "Wie verwende ich eine Moodboard-Vorlage?",
          answer: "Klicken Sie einfach bei einer beliebigen Vorlage auf 'Vorlage verwenden'. Das Studio öffnet sich mit vorbereiteten Bildrahmen, Farbfeldern und Notizzetteln.",
        },
        {
          question: "Kann ich die Platzhalter durch eigene Fotos ersetzen?",
          answer: "Ja. Ziehen Sie Ihre Fotos in die Bildleiste und ziehen Sie sie direkt auf die Rahmen oder nutzen Sie 'Rahmen füllen' zur automatischen Belegung.",
        },
        {
          question: "Lassen sich Hintergrundfarben, Farbfelder und Notizen bearbeiten?",
          answer: "Jedes Element ist vollständig editierbar: Passen Sie Hintergrundfarben an, wählen Sie Punktraster, ändern Sie Hex-Codes und schreiben Sie eigene Regieanweisungen.",
        },
        {
          question: "Kann ich fertige Boards für Kundenpräsentationen exportieren?",
          answer: "Ja. Exportieren Sie hochauflösende PNGs, JPEGs oder druckfertige 300 DPI PDFs (optional mit Kundenpasswort) ohne Qualitätsverlust.",
        },
      ],
      relatedToolsTitle: "Verwandte Werkzeuge & Workflows",
    },
    comparePhotoshop: {
      title: "Alternative zu Photoshop Contact Sheet II — Schnelleres Proofing",
      description: "Make Contact Sheet im Vergleich zu Adobe Photoshop: Schnellere Rastererstellung, Live-Vorschau und kein monatliches Creative-Cloud-Abonnement erforderlich.",
      breadcrumbsCompare: "Vergleich",
      breadcrumbsTitle: "Photoshop-Alternative",
      badge: "LEISTUNG & DATENSCHUTZ",
      heroTitle: "Die beste schlanke Alternative zu Photoshop Contact Sheet II",
      heroLead: "Vergleichen Sie Adobe Photoshops Contact Sheet II mit dem browserbasierten, schnellen Arbeitsbereich von Make Contact Sheet.",
      tableHeaderCapability: "Funktion / Merkmal",
      tableHeaderMcs: "Make Contact Sheet",
      tableHeaderPs: "Photoshop (Contact Sheet II)",
      tableHeaderCanva: "Canva",
      tableHeaderVizua: "Vizua",
      comparisonRows: [
        {
          feature: "Benutzerkonto / Registrierung erforderlich",
          icon: "👤",
          mcs: "Nein (Sofortiger Zugriff)",
          mcsHighlight: "lime",
          ps: "Ja (Adobe ID)",
          canva: "Ja (Erforderlich)",
          vizua: "Nein",
        },
        {
          feature: "Datenschutz / Dateiübertragung",
          icon: "🔒",
          mcs: "100% Lokal im Browser",
          mcsHighlight: "lime",
          ps: "Lokaler Desktop",
          canva: "Upload in die Cloud",
          vizua: "Lokaler Browser",
        },
        {
          feature: "Erhalt der Originaldateinamen",
          icon: "🏷️",
          mcs: "Stets erhalten & geprüft",
          mcsHighlight: "yellow",
          ps: "Im Druck erhalten",
          canva: "Verworfen / Verloren",
          vizua: "Im Raster erhalten",
        },
        {
          feature: "Schnelle Bildbewertung (Behalten / Markieren / Ablehnen)",
          icon: "🎯",
          mcs: "Ja (Shortcuts 1, 2, 3)",
          mcsHighlight: "pink",
          ps: "Keine",
          canva: "Keine",
          vizua: "Keine",
        },
        {
          feature: "CSV- & TXT-Dateinamenexport",
          icon: "📄",
          mcs: "Ja (Lightroom-kompatibel)",
          mcsHighlight: "cyan",
          ps: "Keine",
          canva: "Keine",
          vizua: "Keine",
        },
        {
          feature: "Integrierte Collagen & Moodboards",
          icon: "🎨",
          mcs: "Integriertes Studio",
          mcsHighlight: "orange",
          ps: "Keine",
          canva: "Zahlreiche Vorlagen",
          vizua: "Keine",
        },
        {
          feature: "Preise & Lizenzmodell",
          icon: "💰",
          mcs: "Kostenlos & Open",
          mcsHighlight: "lime",
          ps: "~24€-65€/Monat",
          canva: "Freemium (12€/Monat)",
          vizua: "Kostenlos (max. 50 Bilder)",
        },
      ],
      section1Title: "Hintergrund zu Photoshop Contact Sheet II",
      section1P: "Seit über zwanzig Jahren ist Adobe Photoshops Skript 'Kontaktabzug II' (Datei > Automatisieren > Kontaktabzug II) das Standardwerkzeug für Foto-Proofbögen. Technisch hat sich das Modul seit CS3 jedoch kaum weiterentwickelt: Bilder werden einzeln und langsam gerendert, es entsteht ein flaches Rasterbild ohne jede Möglichkeit zur interaktiven Bildauswahl.",
      section2Title: "Die Vorteile von Make Contact Sheet",
      section2P: "Make Contact Sheet wurde von Grund auf für moderne digitale Workflows und reibungslose Kundenabstimmungen konzipiert:",
      section2List: [
        {
          bold: "Sofortige Ausführung im Web:",
          text: "Kein Creative-Cloud-Start oder Warten auf Software-Updates. Ordner hineinziehen und direkt arbeiten.",
        },
        {
          bold: "Integrierte Bildbewertung:",
          text: "Tasten 1 (Behalten), 2 (Markieren) und 3 (Ablehnen) direkt in der Rasteransicht nutzen.",
        },
        {
          bold: "Export für Lightroom:",
          text: "Strukturierte Dateinamenlisten als CSV/TXT für den 1-Klick-Filter in Lightroom Classic kopieren.",
        },
        {
          bold: "Kombiniertes Studio:",
          text: "Nahtlos zwischen technischen Kontaktabzügen und freien Moodboards wechseln.",
        },
        {
          bold: "100% Privat & Kostenfrei:",
          text: "Alle Daten bleiben lokal im Gerätespeicher ohne monatliche Lizenzgebühren.",
        },
      ],
      ctaTitle: "Erleben Sie den schnelleren Kontaktabzug-Workflow",
      ctaDesc: "Erstellen Sie druckfertige Kontaktabzüge in Sekundenschnelle ohne Photoshop.",
      ctaBtn: "Make Contact Sheet kostenlos öffnen",
      faqTitle: "Häufige Fragen zum Vergleich",
      faqs: [
        {
          question: "Wie erstelle ich einen Kontaktabzug in Photoshop?",
          answer: "In Photoshop navigieren Sie zu Datei > Automatisieren > Kontaktabzug II. Wählen Sie einen Bilderordner, legen Sie Seitengröße, Zeilen und Spalten fest und warten Sie, bis Photoshop alle Bilder nacheinander platziert.",
        },
        {
          question: "Warum Make Contact Sheet statt Photoshop nutzen?",
          answer: "Make Contact Sheet startet sofort im Browser ohne teures Adobe-Abonnement. Zudem bietet es Schnellauswahl per Tastatur und Dateinamenexport, was Photoshop vollständig fehlt.",
        },
        {
          question: "Wann sollte man weiterhin Photoshop verwenden?",
          answer: "Photoshop bleibt unverzichtbar, wenn Sie spezielle Druck-Farbprofile (CMYK), komplexe Farbmanagement-Skripte oder retuschierte Mehrschicht-Montagen benötigen.",
        },
      ],
    },
    aboutUs: {
      title: "Über uns — Make Contact Sheet",
      description: "Lernen Sie das Team hinter Make Contact Sheet kennen: Der kostenlose, browserbasierte Arbeitsbereich für Kontaktabzüge, Collagen und Kundenproofs.",
      breadcrumbsTitle: "Über Make Contact Sheet",
      badge: "MISSION & TECHNOLOGIE",
      heroTitle: "Über ",
      heroHighlight: "Make Contact Sheet",
      heroLead: "Wir entwickeln den schnellsten und sichersten browserbasierten Arbeitsbereich für Foto-Kontaktabzüge, Moodboards und Kundenauswahl.",
      missionTitle: "Unsere Mission",
      missionP1: "Make Contact Sheet entstand aus einer Zusammenarbeit von Software-Entwicklern und professionellen Fotografen. Die Kernfrage lautete: Warum erfordert das Erstellen einfacher, präziser Kontaktabzüge mit Dateinamen teure Monatsabos, zähe Katalogimporte oder den zeitraubenden Upload sensibler Bilder in Cloud-Speicher?",
      missionP2: "Fotografen, Art Direktoren und Gestalter verdienen leichtgewichtige Werkzeuge, die die Vertraulichkeit ihrer Kunden wahren, die Hardwaregeschwindigkeit moderner Rechner voll ausnutzen und den kreativen Prozess nicht ausbremsen.",
      archTitle: "Lokale Datenschutz-Architektur (Local-First)",
      archP1: "Im Gegensatz zu herkömmlichen Web-Apps, die Fotos auf Server hochladen, arbeitet Make Contact Sheet vollständig clientseitig.",
      archP2: "Wenn Sie ein Shooting mit 500 hochauflösenden Kundenbildern in Make Contact Sheet öffnen:",
      archBullets: [
        {
          bold: "Keine Netzwerkübertragung:",
          text: "Jedes Pixel, jeder Dateiname und alle EXIF-Metadaten werden lokal im Browser über HTML5 Canvas und Web Worker gerendert.",
        },
        {
          bold: "Keine Serverspeicherung:",
          text: "Wir betreiben keine Server zur Bildverarbeitung. Ihre Aufnahmen berühren niemals fremde Festplatten oder KI-Trainingspipelines.",
        },
        {
          bold: "Verarbeitung in Echtzeit:",
          text: "Ohne Upload-Warteschlangen erfolgen Rasteranordnung und 300 DPI PDF-Export mit maximaler Hardware-Geschwindigkeit.",
        },
      ],
      commitmentsTitle: "Unsere Leitprinzipien",
      commitments: [
        {
          bold: "Keine Anmeldeschranken:",
          text: "Alle Arbeitsbereiche, Vorlagen und Exporte in Druckqualität sind ohne Benutzerkonto und ohne Bezahlschranke zugänglich.",
        },
        {
          bold: "Präzise Metadaten:",
          text: "Kamera-Dateinamen, Belichtungszeiten und Objektivangaben werden originalgetreu und ungekürzt abgebildet.",
        },
        {
          bold: "Keine Telemetrie auf Bilddaten:",
          text: "Wir erfassen keinerlei Nutzungsdaten über Ihre Bildinhalte, Dateinamen oder Bewertungsauswahlen.",
        },
      ],
      communityTitle: "Community & Austausch",
      communityP: "Make Contact Sheet wächst kontinuierlich durch das Feedback von Fotostudios, Filmlaboren, Retuscheuren und Fotografen weltweit.",
      contactCta: "Haben Sie Feedback oder Vorlagenwünsche? Kontaktieren Sie unser Team",
      privacyPolicyLink: "Unsere vollständige Datenschutzerklärung lesen",
    },
    contactUs: {
      title: "Kontakt — Make Contact Sheet",
      description: "Kontaktieren Sie das Team von Make Contact Sheet für Support, Feedback oder Funktionsvorschläge rund um unsere Foto-Tools.",
      breadcrumbsTitle: "Kontakt",
      heroTitle: "Kontakt",
      heroLead: "Haben Sie Fragen, Anregungen zu neuen Vorlagen oder Feedback zu unseren Workflows? Wir freuen uns über jede Nachricht.",
      cardHeading: "Treten Sie mit uns in Kontakt",
      cardLead: "Make Contact Sheet wird für die weltweite Fotocommunity entwickelt. Schreiben Sie uns bei Fehlermeldungen, Ideen oder Kooperationsanfragen.",
      card1Title: "Allgemeine Anfragen & Support",
      card1Desc: "Für Hilfestellungen bei der Nutzung oder Browser-Kompatibilitätsprobleme:",
      card2Title: "Vorlagen & Funktionswünsche",
      card2Desc: "Für Vorschläge zu neuen Kontaktabzug-Presets oder Collage-Formaten:",
      responseTime: "Wir prüfen alle Community-Rückmeldungen und antworten in der Regel innerhalb von 1–2 Werktagen.",
    },
    privacyPolicy: {
      title: "Datenschutzerklärung — Make Contact Sheet",
      description: "Datenschutzerklärung von Make Contact Sheet. Alle Bildverarbeitungen erfolgen lokal im Browser. Keine Fotos werden auf externe Server übertragen.",
      breadcrumbsTitle: "Datenschutzerklärung",
      heroTitle: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: August 2026",
      sections: [
        {
          title: "1. Grundsätzliches Datenschutzversprechen",
          content: [
            "Bei Make Contact Sheet ist Datenschutz kein nachträglich hinzugefügtes Feature, sondern das grundlegende Fundament unserer Software-Architektur.",
            "Wenn Sie Fotos in Make Contact Sheet einfügen, laufen Decodierung, Skalierung, Rasteraufbau und PDF-Erstellung ausschließlich im lokalen Arbeitsspeicher Ihres Browsers ab.",
            "Ihre Fotos, Pixeldaten, Dateinamen und EXIF-Metadaten werden zu keinem Zeitpunkt an unsere Server übertragen oder in externen Datenbanken gespeichert.",
          ],
        },
        {
          title: "2. Daten, die wir nicht erfassen",
          content: [
            "Wir verzichten bewusst auf die Erhebung sensibler Nutzer- und Mediendaten:",
          ],
          bullets: [
            "Wir speichern keine Benutzerkonten, Passwörter oder Anmeldedaten.",
            "Wir erfassen, sichten und speichern keinerlei Bilddateien.",
            "Wir lesen oder übertragen keine EXIF-Kameradaten an Server (GPS, Seriennummern, Aufnahmezeiten).",
            "Wir verfolgen keine individuellen Bildbewertungen oder Auswahllisten.",
          ],
        },
        {
          title: "3. Lokale Speicherung und Projektdateien",
          content: [
            "Wenn Sie eine Projektdatei (.makecontactsheet.json) exportieren, wird diese clientseitig erzeugt und direkt auf Ihrer Festplatte gesichert. Beim erneuten Laden liest der Browser die Datei nur lokal ein.",
          ],
        },
        {
          title: "4. Drittanbieter-Dienste & Analysen",
          content: [
            "Wir setzen lediglich sparsame, datenschutzfreundliche Analysedienste ein, um aggregierte Statistiken (wie Besucherzahlen und Browsertypen) einzusehen. Es werden dabei niemals Bilddaten oder Nutzeridentifikatoren erfasst.",
          ],
        },
        {
          title: "5. Kontakt für Datenschutzfragen",
          content: [
            "Bei Fragen zur technischen Architektur von Make Contact Sheet erreichen Sie uns unter privacy@makecontactsheet.com.",
          ],
        },
      ],
    },
    termsAndConditions: {
      title: "Allgemeine Geschäftsbedingungen — Make Contact Sheet",
      description: "Nutzungsbedingungen für den Online-Fotoarbeitsbereich Make Contact Sheet für Kontaktabzüge, Fotocollagen und Auswahllisten.",
      breadcrumbsTitle: "Nutzungsbedingungen",
      heroTitle: "Allgemeine Geschäftsbedingungen",
      lastUpdated: "Zuletzt aktualisiert: August 2026",
      sections: [
        {
          title: "1. Geltungsbereich",
          content: "Durch den Zugriff auf Make Contact Sheet (der 'Dienst') erklären Sie sich mit diesen Geschäftsbedingungen einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, dürfen Sie den Dienst nicht nutzen.",
        },
        {
          title: "2. Leistungsbeschreibung & Urheberrechte",
          content: "Make Contact Sheet stellt browserbasierte Werkzeuge zur Erstellung von Kontaktabzügen, Fotocollagen und Kundenauswahlen bereit. Sie behalten zu jedem Zeitpunkt 100% aller Eigentums- und Urheberrechte an allen Fotos und Inhalten, die Sie im Dienst bearbeiten.",
        },
        {
          title: "3. Gewährleistungsausschluss",
          content: "Der Dienst wird 'WIE BESEHEN' und 'NACH VERFÜGBARKEIT' ohne ausdrückliche oder stillschweigende Gewährleistung bereitgestellt. Wir übernehmen keine Garantie für unterbrechungsfreien oder fehlerfreien Betrieb auf jeder Hard- und Softwarekonfiguration.",
        },
        {
          title: "4. Haftungsbeschränkung",
          content: "In keinem Fall haften Make Contact Sheet oder seine Mitwirkenden für indirekte, beiläufig entstandene oder Folgeschäden, die aus der Nutzung des Dienstes oder einem eventuellen Verlust von Fotodaten resultieren.",
        },
      ],
    },
  },
  fr: {
    contactSheetTemplates: {
      title: "Modèles de planches contact — Mises en page d'épreuves prêtes à imprimer",
      description: "Modèles gratuits de planches contact aux formats A4, US Letter et 16:9. Grilles calibrées avec noms de fichiers et export PDF 300 DPI.",
      breadcrumbsTitle: "Modèles de planches contact",
      heroTitlePrefix: "Modèles gratuits de ",
      heroHighlight: "planches contact",
      heroTitleSuffix: " et mises en page",
      heroLead: "Parcourez des modèles de planches contact imprimables pour la sélection client, l'indexation de films argentiques et l'archivage. Formats A4, US Letter ou 16:9.",
      categories: {
        all: "Tous",
        standard: "Standards d'impression",
        film: "Film & Chambre noire",
        client: "Sélection client & EXIF",
        digital: "Écran & Vidéo",
      },
      pageSizeLabel: "Format de page :",
      labelsLabel: "Légendes :",
      marginsGapLabel: "Marges / Espacement :",
      usePresetBtn: "Utiliser ce modèle",
      editorialTitle: "Comment choisir le bon modèle de planche contact",
      editorialP1: "La disposition idéale d'une planche contact trouve l'équilibre entre la taille de chaque vignette et la densité de la page. Pour un classeur de présentation client, un modèle A4 ou US Letter avec 16 à 20 images par feuille permet d'analyser netteté, cadrage et expressions sans loupe.",
      editorialP2: "Pour les présentations sur écran et visioconférences, les grilles panoramiques au format 16:9 exploitent parfaitement la surface des moniteurs sans bandes blanches inutiles.",
      faqTitle: "Questions fréquentes sur les modèles",
      faqs: [
        {
          question: "Quel modèle de planche contact choisir pour l'impression ?",
          answer: "Pour les imprimantes de bureau courantes, utilisez la planche contact A4 portrait (standard international) ou US Letter portrait (Amérique du Nord). Les deux intègrent des marges calibrées pour garantir que photos et noms de fichiers restent dans la zone imprimable.",
        },
        {
          question: "Puis-je personnaliser le nombre de lignes et de colonnes ?",
          answer: "Oui. Bien que les modèles proposent des réglages optimisés, vous pouvez modifier librement colonnes (1-8), lignes (1-10), espacement et marges dans l'espace de travail.",
        },
        {
          question: "Quel est le meilleur modèle pour la sélection des clients ?",
          answer: "Le modèle 'Feuille de sélection client' est idéal. Sa grille de 3×4 photos offre de grandes vignettes, des numéros d'index lisibles (#1, #2) et des marqueurs de statut pour faciliter le choix.",
        },
      ],
    },
    collageTemplates: {
      title: "Modèles de collages photo — Mises en page créatives et gratuites",
      description: "Découvrez des modèles de collages gratuits avec image vedette, triptyques et formats réseaux sociaux. Personnalisez et exportez dans le navigateur.",
      breadcrumbsTitle: "Modèles de collages",
      heroTitlePrefix: "Modèles de ",
      heroHighlight: "collages photo",
      heroTitleSuffix: " sur mesure",
      heroLead: "Explorez des modèles de collages photo personnalisables pour vos publications sur les réseaux sociaux, panneaux comparatifs et affiches imprimées.",
      categories: {
        all: "Tous",
        basic: "Grille simple",
        showcase: "Éditorial & Vedette",
        social: "Stories réseaux sociaux",
        comparison: "Comparaison & Duos",
      },
      photosLabel: "photos",
      aspectRatioLabel: "Format :",
      defaultGapLabel: "Espacement par défaut :",
      useTemplateBtn: "Utiliser ce modèle",
      editorialTitle: "Formats de modèles et cas d'usage",
      editorialP1: "Les modèles de Make Contact Sheet s'appuient sur des ratios photographiques réels. Notre bandeau horizontal de 3 photos convient parfaitement aux séries panoramiques, tandis que le format vertical 9:16 marie portraits et plans de détail pour les smartphones.",
      faqTitle: "Questions fréquentes sur les collages",
      faqs: [
        {
          question: "Puis-je ajuster l'espace entre les photos d'un collage ?",
          answer: "Oui. Chaque modèle permet d'ajuster l'espacement (de 0 px sans bordure jusqu'à des séparations de 40 px) ainsi que les marges extérieures.",
        },
        {
          question: "Comment adapter des photos ayant des ratios différents ?",
          answer: "Vous pouvez choisir entre 'Cover' (remplissage complet de la case avec recadrage centré) et 'Contain' (affichage de la photo intégrale sans aucun recadrage).",
        },
        {
          question: "L'utilisation et le téléchargement des collages sont-ils gratuits ?",
          answer: "Oui. Tous les modèles de Make Contact Sheet sont 100% gratuits, sans filigrane ni inscription requise.",
        },
      ],
    },
    moodBoardTemplates: {
      title: "Modèles de mood boards — Préréglages esthétiques gratuits",
      description: "Parcourez des modèles de mood boards gratuits pour la photo, la mode et le branding. Choisissez un style éditorial ou minimaliste et personnalisez.",
      breadcrumbsMoodBoard: "Studio Mood Board",
      breadcrumbsTitle: "Modèles",
      heroTitlePrefix: "Modèles gratuits de ",
      heroHighlight: "mood boards",
      heroTitleSuffix: " et directions visuelles",
      heroLead: "Préréglages esthétiques pour séances photo, lookbooks de mode, plans d'éclairage et nuanciers. 100% modifiables dans votre navigateur.",
      openCanvasBtn: "Ouvrir l'espace studio",
      readGuideBtn: "Consulter le guide pas à pas",
      categories: {
        all: "Tous les modèles",
        editorial: "Éditorial & Storyboard",
        lookbook: "Lookbook de mode",
        concept: "Concept & Palette",
        film: "Argentique & Grain",
        minimal: "Épuré & Minimaliste",
      },
      aspectRatioLabel: "Ratio :",
      elementsLabel: "Éléments :",
      totalObjectsLabel: "objets au total",
      photosLabel: "Photos",
      swatchesLabel: "Nuanciers",
      widescreenLabel: "Panoramique 16:9",
      useTemplateBtn: "Utiliser ce modèle",
      editorialTitle: "Comment choisir le bon modèle créatif",
      editorialHighlight: "Modèle créatif adapté",
      editorialLead: "Un mood board sert de boussole esthétique à toute l'équipe : modèles, stylistes, maquilleurs et assistants. Bien choisir sa disposition garantit l'alignement de tous avant d'entrer en studio.",
      editorialCards: [
        {
          title: "Éditorial & Storyboard",
          desc: "Met en valeur une grande image vedette entourée de plans de texture et d'indications d'éclairage pour la publicité.",
        },
        {
          title: "Lookbook de mode",
          desc: "Associe des silhouettes en pied à des échantillons textiles, accessoires et notes de préparation.",
        },
        {
          title: "Palette & Harmonie chromatique",
          desc: "Met en avant des nuanciers avec codes hexadécimaux et images d'ambiance pour caler les filtres et l'étalonnage.",
        },
        {
          title: "Triptyque argentique",
          desc: "Sublime le moyen format 120 et le grain du 35 mm avec les caractéristiques techniques du film et de l'exposition.",
        },
      ],
      faqTitle: "Questions fréquentes sur les mood boards",
      faqs: [
        {
          question: "Comment utiliser un modèle de mood board ?",
          answer: "Cliquez simplement sur 'Utiliser ce modèle' sur l'une des compositions. Le studio s'ouvre instantanément avec cadres photos, nuanciers et notes adhésives prédisposés.",
        },
        {
          question: "Puis-je remplacer les cadres par mes propres images ?",
          answer: "Oui ! Glissez-déposez vos photos dans la pellicule de travail, puis faites-les glisser sur un cadre ou cliquez sur 'Remplir les cadres'.",
        },
        {
          question: "Peut-on personnaliser couleurs de fond, nuances et textes ?",
          answer: "Chaque élément est entièrement modifiable : ajustez la couleur de fond, activez les grilles de repère, modifiez les codes hexadécimaux et écrivez vos notes.",
        },
        {
          question: "Peut-on exporter ces planches pour des présentations et l'impression ?",
          answer: "Oui. Exportez en PNG haute résolution, JPEG ou PDF 300 DPI prêt pour l'impression (avec mot de passe client optionnel) directement dans votre navigateur.",
        },
      ],
      relatedToolsTitle: "Outils et guides complémentaires",
    },
    comparePhotoshop: {
      title: "Alternative à Photoshop Contact Sheet II — Épreuvage plus rapide",
      description: "Comparez Make Contact Sheet à Adobe Photoshop pour vos planches contact. Aperçu instantané, sélection rapide et aucun abonnement Creative Cloud requis.",
      breadcrumbsCompare: "Comparatif",
      breadcrumbsTitle: "Alternative à Photoshop",
      badge: "PERFORMANCE ET CONFIDENTIALITÉ",
      heroTitle: "La meilleure alternative légère à Contact Sheet II de Photoshop",
      heroLead: "Comparez l'outil Contact Sheet II d'Adobe Photoshop avec l'espace de travail en ligne et instantané de Make Contact Sheet.",
      tableHeaderCapability: "Fonctionnalité / Atout",
      tableHeaderMcs: "Make Contact Sheet",
      tableHeaderPs: "Photoshop (Contact Sheet II)",
      tableHeaderCanva: "Canva",
      tableHeaderVizua: "Vizua",
      comparisonRows: [
        {
          feature: "Compte / Inscription obligatoire",
          icon: "👤",
          mcs: "Non (Accès immédiat)",
          mcsHighlight: "lime",
          ps: "Oui (Identifiant Adobe)",
          canva: "Oui (Obligatoire)",
          vizua: "Non",
        },
        {
          feature: "Confidentialité / Transfert de fichiers",
          icon: "🔒",
          mcs: "100% Local dans le navigateur",
          mcsHighlight: "lime",
          ps: "Bureau local",
          canva: "Téléversement cloud",
          vizua: "Navigateur local",
        },
        {
          feature: "Conservation des noms de fichiers originaux",
          icon: "🏷️",
          mcs: "Toujours préservés & vérifiés",
          mcsHighlight: "yellow",
          ps: "Préservés à l'impression",
          canva: "Supprimés / Perdus",
          vizua: "Préservés dans la grille",
        },
        {
          feature: "Tri rapide (Conserver / Marquer / Rejeter)",
          icon: "🎯",
          mcs: "Oui (Raccourcis 1, 2, 3)",
          mcsHighlight: "pink",
          ps: "Aucun",
          canva: "Aucun",
          vizua: "Aucun",
        },
        {
          feature: "Export de liste CSV / TXT",
          icon: "📄",
          mcs: "Oui (Prêt pour Lightroom)",
          mcsHighlight: "cyan",
          ps: "Aucun",
          canva: "Aucun",
          vizua: "Aucun",
        },
        {
          feature: "Modes collage et mood board intégrés",
          icon: "🎨",
          mcs: "Studio intégré",
          mcsHighlight: "orange",
          ps: "Aucun",
          canva: "Nombreux modèles",
          vizua: "Aucun",
        },
        {
          feature: "Modèle de tarification",
          icon: "💰",
          mcs: "Gratuit & Libre",
          mcsHighlight: "lime",
          ps: "~24€-65€/mois",
          canva: "Freemium (12€/mois)",
          vizua: "Gratuit (50 photos max)",
        },
      ],
      section1Title: "Comprendre Contact Sheet II dans Photoshop",
      section1P: "Depuis plus de vingt ans, le script intégré Contact Sheet II d'Adobe Photoshop (Fichier > Automatisation > Planche contact II) sert de référence historique. Cependant, l'outil n'a quasiment pas évolué depuis CS3 : il ouvre les photos une par une avec lenteur, génère un document aplati et n'offre aucun tri interactif ni export de sélection.",
      section2Title: "Les avantages de Make Contact Sheet",
      section2P: "Make Contact Sheet a été conçu spécialement pour répondre aux exigences des photographes numériques d'aujourd'hui :",
      section2List: [
        {
          bold: "Exécution web instantanée :",
          text: "Aucune application Creative Cloud à lancer ou mettre à jour. Glissez vos photos et commencez à travailler sans délai.",
        },
        {
          bold: "Statuts de sélection intégrés :",
          text: "Appliquez les statuts Conserver (1), Marquer (2) ou Rejeter (3) directement lors de l'inspection.",
        },
        {
          bold: "Export vers Lightroom :",
          text: "Exportez des listes de noms de fichiers au format CSV ou TXT pour les filtrer d'un clic dans Lightroom Classic.",
        },
        {
          bold: "Double mode créatif :",
          text: "Passez sans heurt d'une planche contact rigoureuse à un mood board libre dans le même espace.",
        },
        {
          bold: "Gratuit et confidentiel :",
          text: "100% du traitement se fait dans votre navigateur sans aucun frais d'abonnement.",
        },
      ],
      ctaTitle: "Adoptez un flux de travail plus fluide",
      ctaDesc: "Générez des planches contact prêtes à imprimer en quelques secondes sans ouvrir Photoshop.",
      ctaBtn: "Ouvrir Make Contact Sheet gratuitement",
      faqTitle: "Questions fréquentes sur le comparatif",
      faqs: [
        {
          question: "Comment créer une planche contact dans Photoshop ?",
          answer: "Dans Photoshop, rendez-vous dans Fichier > Automatisation > Planche contact II. Choisissez un dossier d'images, définissez les dimensions et le nombre de cases, puis attendez que Photoshop traite chaque photo séquentiellement.",
        },
        {
          question: "Pourquoi préférer Make Contact Sheet à Photoshop ?",
          answer: "Make Contact Sheet démarre immédiatement dans le navigateur sans abonnement Adobe. Il intègre le tri rapide au clavier (1, 2, 3) et l'export de listes de noms de fichiers, absents de Photoshop.",
        },
        {
          question: "Dans quels cas utiliser encore Adobe Photoshop ?",
          answer: "Photoshop demeure indispensable si vous appliquez des profils d'impression CMJN complexes, des scripts ICC spécifiques ou des retouches poussées par calques.",
        },
      ],
    },
    aboutUs: {
      title: "À propos de nous — Make Contact Sheet",
      description: "Découvrez l'équipe derrière Make Contact Sheet, l'espace de travail en ligne pour planches contact, collages et outils de sélection client.",
      breadcrumbsTitle: "À propos de Make Contact Sheet",
      badge: "INGÉNIERIE ET MISSION",
      heroTitle: "À propos de ",
      heroHighlight: "Make Contact Sheet",
      heroLead: "Nous concevons l'espace de travail en ligne le plus rapide et confidentiel pour créer planches contact, mood boards et épreuves photo.",
      missionTitle: "Notre mission et notre vision",
      missionP1: "Make Contact Sheet est né de la collaboration entre développeurs logiciels et photographes professionnels en activité, face à un constat récurrent : pourquoi créer une simple planche contact fidèle aux noms de fichiers nécessite-t-il des abonnements mensuels coûteux, des imports lourds ou l'envoi de photos confidentielles sur des serveurs distants ?",
      missionP2: "Nous pensons que les photographes, directeurs artistiques, graphistes et créateurs visuels ont droit à des outils dédiés et légers qui respectent le secret professionnel de leurs clients, tirent parti de la puissance de calcul des appareils modernes et s'effacent devant la création.",
      archTitle: "Architecture locale et respect absolu de la vie privée",
      archP1: "À l'inverse des plateformes SaaS traditionnelles qui transfèrent vos clichés sur des serveurs cloud distants, Make Contact Sheet est conçu dès sa base comme une application 100% exécutée côté client.",
      archP2: "Lorsque vous déposez une séance de 500 photos de studio ou un portrait confidentiel dans Make Contact Sheet :",
      archBullets: [
        {
          bold: "Zéro transfert réseau :",
          text: "Chaque pixel, chaque nom de fichier et chaque donnée EXIF est décodé et affiché localement dans votre navigateur grâce à HTML5 Canvas et aux Web Workers.",
        },
        {
          bold: "Zéro stockage serveur :",
          text: "Nous n'exploitons aucun serveur de traitement d'images. Vos créations ne touchent jamais un disque distant, une base de données cloud ou un algorithme d'entraînement d'IA.",
        },
        {
          bold: "Rapidité instantanée :",
          text: "Sans file d'attente de téléversement, l'affichage de la grille et la génération du PDF 300 DPI s'effectuent à la vitesse native de votre matériel.",
        },
      ],
      commitmentsTitle: "Nos engagements fondamentaux",
      commitments: [
        {
          bold: "Aucune obligation de compte :",
          text: "Toutes les fonctions, tous les modèles et les exports haute résolution sont accessibles immédiatement sans inscription ni paywall.",
        },
        {
          bold: "Intégrité des métadonnées :",
          text: "Les noms de fichiers originaux, horodatages d'exposition et focales d'objectifs sont conservés sans troncature arbitraire.",
        },
        {
          bold: "Zéro télémétrie sur vos médias :",
          text: "Nous ne collectons aucune statistique sur le contenu de vos photos, leurs noms de fichiers ou vos sélections client.",
        },
      ],
      communityTitle: "Une communauté créative ouverte",
      communityP: "Make Contact Sheet évolue en continu grâce aux retours de studios professionnels, laboratoires photo, retoucheurs et photographes indépendants du monde entier.",
      contactCta: "Vous avez des suggestions ou des demandes de modèles ? Contactez notre équipe",
      privacyPolicyLink: "Consulter notre politique de confidentialité",
    },
    contactUs: {
      title: "Contactez-nous — Make Contact Sheet",
      description: "Contactez l'équipe de Make Contact Sheet pour obtenir de l'aide, faire des suggestions de modèles ou poser des questions sur nos outils.",
      breadcrumbsTitle: "Contact",
      heroTitle: "Contactez-nous",
      heroLead: "Une question, une idée de modèle ou une suggestion pour améliorer vos flux de travail ? Nous serions ravis de vous lire.",
      cardHeading: "Prendre contact",
      cardLead: "Make Contact Sheet est conçu et maintenu pour la communauté des photographes et créateurs visuels. Partagez vos retours, anomalies rencontrées ou propositions de collaboration.",
      card1Title: "Support technique & questions générales",
      card1Desc: "Pour obtenir de l'aide sur l'application ou signaler un problème de compatibilité :",
      card2Title: "Suggestions de modèles & nouvelles fonctionnalités",
      card2Desc: "Pour proposer un nouveau préréglage de planche contact ou un gabarit de collage :",
      responseTime: "Nous examinons tous les messages et répondons généralement sous 1 à 2 jours ouvrés.",
    },
    privacyPolicy: {
      title: "Politique de confidentialité — Make Contact Sheet",
      description: "Politique de confidentialité de Make Contact Sheet. Tout le traitement d'image s'exécute localement dans votre navigateur sans transfert externe.",
      breadcrumbsTitle: "Politique de confidentialité",
      heroTitle: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour : Août 2026",
      sections: [
        {
          title: "1. Principe fondamental de confidentialité",
          content: [
            "Chez Make Contact Sheet, la protection de vos données n'est pas une simple option : c'est le principe d'ingénierie fondateur de notre application.",
            "Lorsque vous déposez des images dans Make Contact Sheet, toutes les étapes de décodage, redimensionnement, composition et génération de PDF se déroulent exclusivement dans la mémoire locale de votre navigateur.",
            "Vos photos, vos pixels, vos noms de fichiers originaux et vos données EXIF ne sont jamais transmis à nos serveurs ni stockés dans une base de données distante.",
          ],
        },
        {
          title: "2. Informations que nous ne collectons pas",
          content: [
            "Nous ne conservons aucune donnée confidentielle relative à vos travaux :",
          ],
          bullets: [
            "Nous ne créons ni ne conservons aucun compte utilisateur, mot de passe ou identifiant.",
            "Nous ne collectons, ne visionnons et ne stockons aucun fichier image.",
            "Nous n'analysons ni ne transmettons de métadonnées EXIF (coordonnées GPS, numéros de série, dates).",
            "Nous ne traçons aucun tri de photos individuel ni choix de sélection client.",
          ],
        },
        {
          title: "3. Fichiers de projet et stockage local",
          content: [
            "Si vous exportez un fichier projet (.makecontactsheet.json), celui-ci est généré localement et enregistré sur votre appareil. Lors d'une réouverture, il est lu uniquement par votre navigateur pour restaurer votre mise en page.",
          ],
        },
        {
          title: "4. Services tiers et analyses d'audience",
          content: [
            "Nous pouvons employer des outils de mesure d'audience sobres et respectueux de la vie privée afin de suivre des données agrégées (nombre de visites, types de navigateurs). Aucun fichier média ni identifiant utilisateur n'est jamais transmis.",
          ],
        },
        {
          title: "5. Contact pour toute question",
          content: [
            "Pour toute question relative à l'architecture locale de Make Contact Sheet, écrivez-nous à privacy@makecontactsheet.com.",
          ],
        },
      ],
    },
    termsAndConditions: {
      title: "Conditions générales d'utilisation — Make Contact Sheet",
      description: "Conditions d'utilisation de l'espace de travail photo Make Contact Sheet, incluant planches contact, collages et épreuves.",
      breadcrumbsTitle: "Conditions générales",
      heroTitle: "Conditions générales d'utilisation",
      lastUpdated: "Dernière mise à jour : Août 2026",
      sections: [
        {
          title: "1. Acceptation des conditions",
          content: "En accédant à Make Contact Sheet (le 'Service') ou en l'utilisant, vous acceptez d'être lié par les présentes Conditions Générales. Si vous êtes en désaccord avec tout ou partie de ces conditions, vous ne devez pas utiliser le Service.",
        },
        {
          title: "2. Description du service et propriété intellectuelle",
          content: "Make Contact Sheet propose des outils dans le navigateur pour la création de planches contact, collages et sélections de photos. Vous conservez l'entière propriété et l'intégralité des droits d'auteur sur toutes les photographies et contenus traités avec le Service.",
        },
        {
          title: "3. Exclusion de garanties",
          content: "Le Service est fourni 'EN L'ÉTAT' et 'SELON DISPONIBILITÉ', sans garantie d'aucune sorte. Make Contact Sheet ne garantit pas que le Service sera ininterrompu, exempt d'erreurs ou compatible avec toutes les configurations logicielles et matérielles.",
        },
        {
          title: "4. Limitation de responsabilité",
          content: "En aucun cas Make Contact Sheet ou ses contributeurs ne pourront être tenus responsables de dommages indirects, accessoires ou consécutifs découlant de l'utilisation du Service ou de toute perte éventuelle de données photographiques.",
        },
      ],
    },
  },
  ja: {
    contactSheetTemplates: {
      title: "コンタクトシートテンプレート — 無料の印刷用写真校正レイアウト",
      description: "A4、USレター、16:9形式の無料コンタクトシートテンプレート。ファイル名印字と300 DPI印刷用PDF出力に対応。",
      breadcrumbsTitle: "コンタクトシートテンプレート",
      heroTitlePrefix: "無料の",
      heroHighlight: "コンタクトシート（ベタ焼き）テンプレート",
      heroTitleSuffix: "＆レイアウト",
      heroLead: "クライアント校正、フィルム整理、ポートフォリオ保存に最適な印刷用コンタクトシートテンプレート。A4、USレター、16:9比率をワンクリックで選択可能。",
      categories: {
        all: "すべて",
        standard: "標準印刷規格",
        film: "フィルム・暗室インデックス",
        client: "クライアント校正・EXIF",
        digital: "スクリーン・ビデオボード",
      },
      pageSizeLabel: "用紙サイズ:",
      labelsLabel: "ラベル:",
      marginsGapLabel: "余白 / 間隔:",
      usePresetBtn: "このプリセットを使用",
      editorialTitle: "適切なコンタクトシートテンプレートの選び方",
      editorialP1: "コンタクトシートの理想的なレイアウトは、サムネイルの視認性と1ページの密度とのバランスです。納品確認用バインダー印刷には、A4またはUSレター用紙に16〜20枚を配置するプリセットが適しており、ルーペを使わずにピントや表情を確認できます。",
      editorialP2: "モニターでのプレゼンテーションやオンラインミーティングには、16:9のワイドスクリーン形式が画面全体を有効活用でき、無駄な余白を残しません。",
      faqTitle: "テンプレートに関するよくある質問",
      faqs: [
        {
          question: "印刷にはどのコンタクトシートテンプレートを使うべきですか？",
          answer: "一般的なオフィスや家庭用プリンターには、国際標準のA4縦（A4 Portrait）または北米標準のUSレター縦（US Letter Portrait）をお使いください。画像のトリミングを防ぐ安全マージンが確保されています。",
        },
        {
          question: "行数や列数をカスタマイズできますか？",
          answer: "はい。テンプレートの既定値をベースに、ワークスペース上で列数（1〜8列）、行数（1〜10行）、写真同士の間隔や余白を自由に変更できます。",
        },
        {
          question: "クライアントの写真選別に最適なテンプレートはどれですか？",
          answer: "「クライアント選別シート（Client Selection Sheet）」がおすすめです。3×4グリッドで1枚1枚が大きく、通し番号（#1, #2）とステータス表示でスムーズな意思疎通が可能です。",
        },
      ],
    },
    collageTemplates: {
      title: "フォトコラージュテンプレート — クリエイティブな無料グリッドレイアウト",
      description: "メイン写真強調、3分割トリプティック、SNSストーリー向け無料フォトコラージュテンプレート。ブラウザで直感編集・保存。",
      breadcrumbsTitle: "コラージュテンプレート",
      heroTitlePrefix: "カスタム",
      heroHighlight: "フォトコラージュ",
      heroTitleSuffix: "テンプレート＆レイアウト",
      heroLead: "SNSのストーリーズ投稿、比較ボード、印刷用ポスターに適したフォトコラージュテンプレート。均整の取れた幾何学的レイアウトを即座に作成。",
      categories: {
        all: "すべて",
        basic: "基本グリッド",
        showcase: "エディトリアル・ショーケース",
        social: "SNSストーリー",
        comparison: "比較・2枚組",
      },
      photosLabel: "枚の写真",
      aspectRatioLabel: "アスペクト比:",
      defaultGapLabel: "初期画像間隔:",
      useTemplateBtn: "このテンプレートを使用",
      editorialTitle: "テンプレートの形式と用途",
      editorialP1: "Make Contact Sheetのテンプレートは、汎用的な図形ではなく写真本来のアスペクト比に合わせて設計されています。横3枚のストリップは風景パノラマや連続カットに最適で、9:16縦長フォーマットはスマートフォン向けのポートレートとディテール写真の組み合わせに最適です。",
      faqTitle: "コラージュに関するよくある質問",
      faqs: [
        {
          question: "コラージュの写真の間隔は変更できますか？",
          answer: "はい。余白なしの0pxから最大40pxの区切り線まで、写真間の隙間や外枠マージンをワークスペースで自由に調節できます。",
        },
        {
          question: "異なる縦横比の写真を綺麗に配置するには？",
          answer: "枠全体を中央基準でトリミングして埋める「Cover」と、写真を一切切り取らず全体を表示する「Contain」を選択できます。",
        },
        {
          question: "コラージュテンプレートのダウンロードや商用利用は無料ですか？",
          answer: "はい。Make Contact Sheetの全テンプレートは完全無料で、透かし（ウォーターマーク）も入らず、登録不要でご利用いただけます。",
        },
      ],
    },
    moodBoardTemplates: {
      title: "ムードボードテンプレート — 洗練された無料デザインレイアウト",
      description: "写真撮影、ファッション、ブランド設計のための無料ムードボードテンプレート。エディトリアルやミニマル構成を瞬時にカスタマイズ。",
      breadcrumbsMoodBoard: "ムードボード作成",
      breadcrumbsTitle: "テンプレート",
      heroTitlePrefix: "無料の",
      heroHighlight: "ムードボードテンプレート",
      heroTitleSuffix: "＆ビジュアル構成",
      heroLead: "写真撮影、ファッションルックブック、ライティング指示書、カラーパレット作成のための厳選プリセット。ブラウザ上で100%編集可能。",
      openCanvasBtn: "スタジオキャンバスを開く",
      readGuideBtn: "作成ガイドを読む",
      categories: {
        all: "すべてのレイアウト",
        editorial: "エディトリアル＆ストーリー",
        lookbook: "ファッションルックブック",
        concept: "コンセプト＆パレット",
        film: "フィルム＆アナログ",
        minimal: "ミニマル＆クリーン",
      },
      aspectRatioLabel: "アスペクト比:",
      elementsLabel: "配置要素:",
      totalObjectsLabel: "個のオブジェクト",
      photosLabel: "枚の写真",
      swatchesLabel: "色見本",
      widescreenLabel: "16:9 ワイドスクリーン",
      useTemplateBtn: "このテンプレートを使用",
      editorialTitle: "最適なクリエイティブレイアウトの選び方",
      editorialHighlight: "クリエイティブ演出プリセット",
      editorialLead: "ムードボードはモデル、ヘアメイク、スタイリスト、撮影助手全員の美意識を共有する羅針盤です。適切な構成を選ぶことで、現場に入る前に共通のイメージを確立できます。",
      editorialCards: [
        {
          title: "エディトリアル＆ストーリー",
          desc: "広告や商業撮影向けに、大きなメイン写真の周囲に質感マクロや照明メモを配した構成です。",
        },
        {
          title: "ファッションルックブック",
          desc: "全身のスタイリング写真と生地見本、アクセサリー指示、アイロン指定メモをバランスよく配置します。",
        },
        {
          title: "カラーストーリー＆パレット",
          desc: "トーンの参考写真とともにHEXカラーコード付きのスウォッチを並べ、照明フィルターやグレーディングを明確にします。",
        },
        {
          title: "フィルム＆アナログ3連",
          desc: "120中判や35mm粒状感の質感表現に、使用フィルムや露出設定の技術メモを添えて構成します。",
        },
      ],
      faqTitle: "ムードボードに関するよくある質問",
      faqs: [
        {
          question: "ムードボードテンプレートはどう使えばいいですか？",
          answer: "上のプリセット一覧から「このテンプレートを使用」をクリックすると、写真枠、色見本、メモが配置されたスタジオ画面が開きます。",
        },
        {
          question: "枠の中に自分の写真を入れ替える方法は？",
          answer: "写真を下部トレイにドラッグ＆ドロップし、キャンバス上の枠へドラッグするか、「枠に自動投入」をクリックします。",
        },
        {
          question: "背景色やカラーコード、フォントは変更できますか？",
          answer: "すべてのオブジェクトが自由に編集可能です。背景色の変更、方眼ドット表示の切り替え、カラーコードの打ち替え、メモの文面変更に対応しています。",
        },
        {
          question: "プレゼン用や印刷用に高解像度で書き出せますか？",
          answer: "はい。高解像度PNG、JPEG、およびパスワード保護対応の印刷用300 DPI PDFを端末上で無劣化出力できます。",
        },
      ],
      relatedToolsTitle: "関連ツール＆ワークフロー",
    },
    comparePhotoshop: {
      title: "Photoshop代替コンタクトシート作成 — より高速な写真校正",
      description: "Adobe Photoshop Contact Sheet IIとMake Contact Sheetの比較。高速なグリッド設定、リアルタイムプレビュー、Adobe契約不要。",
      breadcrumbsCompare: "ツール比較",
      breadcrumbsTitle: "Photoshop代替",
      badge: "ベンチマーク＆プライバシー",
      heroTitle: "Photoshop Contact Sheet IIに代わる最速の軽量ツール",
      heroLead: "Adobe PhotoshopのContact Sheet II（コンタクトシートII）と、ブラウザ完結の写真校正・選別ワークスペースMake Contact Sheetを徹底比較。",
      tableHeaderCapability: "機能・特徴",
      tableHeaderMcs: "Make Contact Sheet",
      tableHeaderPs: "Photoshop (Contact Sheet II)",
      tableHeaderCanva: "Canva",
      tableHeaderVizua: "Vizua",
      comparisonRows: [
        {
          feature: "アカウント登録・ログイン必須",
          icon: "👤",
          mcs: "不要（即時利用可能）",
          mcsHighlight: "lime",
          ps: "必要（Adobe ID）",
          canva: "必要（必須）",
          vizua: "不要",
        },
        {
          feature: "プライバシー・ファイル送信",
          icon: "🔒",
          mcs: "100% ブラウザ内ローカル完結",
          mcsHighlight: "lime",
          ps: "ローカル端末",
          canva: "クラウドへアップロード",
          vizua: "ローカルブラウザ",
        },
        {
          feature: "カメラ元ファイル名の完全保持",
          icon: "🏷️",
          mcs: "常に保持・検証印字",
          mcsHighlight: "yellow",
          ps: "印刷時に保持",
          canva: "消去・消失",
          vizua: "グリッド内で保持",
        },
        {
          feature: "写真の高速選別（採用/保留/不採用）",
          icon: "🎯",
          mcs: "対応（1, 2, 3ショートカット）",
          mcsHighlight: "pink",
          ps: "非対応",
          canva: "非対応",
          vizua: "非対応",
        },
        {
          feature: "選別ファイル名のCSV/TXT書き出し",
          icon: "📄",
          mcs: "対応（Lightroom連携）",
          mcsHighlight: "cyan",
          ps: "非対応",
          canva: "非対応",
          vizua: "非対応",
        },
        {
          feature: "コラージュ＆ムードボード制作機能",
          icon: "🎨",
          mcs: "スタジオ内蔵",
          mcsHighlight: "orange",
          ps: "非対応",
          canva: "豊富なテンプレート",
          vizua: "非対応",
        },
        {
          feature: "料金体系",
          icon: "💰",
          mcs: "完全無料・オープン",
          mcsHighlight: "lime",
          ps: "月額約2,000円〜7,000円",
          canva: "フリーミアム（月額1,500円〜）",
          vizua: "無料（50枚まで）",
        },
      ],
      section1Title: "Photoshopの「コンタクトシートII」の現状",
      section1P: "20年以上にわたり、Adobe Photoshopの内蔵スクリプト「コンタクトシートII」（ファイル > 自動処理 > コンタクトシート II）は写真校正の標準でした。しかしCS3以降ほとんど改良されておらず、画像を1枚ずつ開いて平坦な画像を生成するため処理が重く、画面上での選別やファイル名のリスト抽出が一切できません。",
      section2Title: "Make Contact Sheetが選ばれる理由",
      section2P: "Make Contact Sheetは、現代のデジタル撮影とクライアント納品フローのために新設計されました：",
      section2List: [
        {
          bold: "起動不要のブラウザ即時処理：",
          text: "Creative Cloudの重い起動やアップデート待ちは不要。フォルダをドロップするだけで即座に開始できます。",
        },
        {
          bold: "ショートカットによる高速カリング：",
          text: "シートを見ながら1（キープ）、2（フラグ）、3（リジェクト）で直感的に選別可能。",
        },
        {
          bold: "Lightroom連携リスト出力：",
          text: "選別した写真のファイル名をCSVやTXTで出力し、Lightroom Classicの検索バーに1クリックで反映。",
        },
        {
          bold: "ムードボード＆コラージュ統合：",
          text: "技術的な校正シートから演出用のムードボードまで、同一ツール内で自由に切り替え可能。",
        },
        {
          bold: "完全無料＆データ非送信：",
          text: "サブスクリプション不要、データはすべてお使いの端末内でのみ処理されます。",
        },
      ],
      ctaTitle: "より軽快な写真校正ワークフローを体験",
      ctaDesc: "Photoshopを開くことなく、印刷用コンタクトシートをわずか数秒で作成できます。",
      ctaBtn: "Make Contact Sheetを無料で開く",
      faqTitle: "比較に関するよくある質問",
      faqs: [
        {
          question: "Photoshopでコンタクトシートを作成する手順は？",
          answer: "ファイル > 自動処理 > コンタクトシート II を開き、フォルダを選択し、用紙サイズ・解像度・行と列を指定します。Photoshopが各画像を順次読み込んで配置します。",
        },
        {
          question: "PhotoshopよりMake Contact Sheetを選ぶメリットは？",
          answer: "Adobeの有料プラン不要でブラウザから即座に動作し、ショートカットキー（1, 2, 3）での選別やLightroom向けファイル名書き出しが可能です。",
        },
        {
          question: "Photoshopを使い続けるべき場面はありますか？",
          answer: "高度なCMYK印刷プロファイル変換、カスタムICCカラー管理、複雑なレイヤー合成を施す場合にはPhotoshopの活用が適しています。",
        },
      ],
    },
    aboutUs: {
      title: "当サイトについて — Make Contact Sheet",
      description: "ブラウザ完結型の無料コンタクトシート・コラージュ・校正ワークスペース「Make Contact Sheet」の開発理念と特徴をご紹介します。",
      breadcrumbsTitle: "Make Contact Sheetについて",
      badge: "エンジニアリング＆ミッション",
      heroTitle: "",
      heroHighlight: "Make Contact Sheet",
      heroLead: "写真コンタクトシート、ムードボード、クライアント校正のための最も高速で安全なブラウザ完結型ワークスペースを構築しています。",
      missionTitle: "私たちの理念と目的",
      missionP1: "Make Contact Sheetは、ソフトウェアエンジニアと現役の商業写真家によって立ち上げられました。開発の契機はシンプルな疑問でした。「ファイル名が正確なベタ焼きや校正シートを作るだけのために、なぜ毎月の高額な課金や、時間のかかるカタログ読み込み、未公開写真のクラウド送信が必要なのか？」",
      missionP2: "私たちは、写真家、アートディレクター、デザイナーが、クライアントの機密を守り、現代のPCスペックを余すことなく発揮できる、創作の邪魔をしない専用ツールを手にする権利があると考えています。",
      archTitle: "完全ローカル・プライバシーアーキテクチャ",
      archP1: "写真を外部サーバーに送信する一般的なWebサービスと異なり、Make Contact Sheetは100%クライアントサイドで完結するよう根本から設計されています。",
      archP2: "500枚のコマーシャル撮影データや未発表のポートレートを投入した際も：",
      archBullets: [
        {
          bold: "ネットワーク通信ゼロ：",
          text: "画像ピクセル、ファイル名、EXIFメタデータは、ブラウザ内のHTML5 CanvasとWeb Workersにより端末メモリ内でのみ処理されます。",
        },
        {
          bold: "サーバー保存ゼロ：",
          text: "画像処理サーバーを一切保有していません。大切な撮影素材が外部のストレージやAI学習に利用されることは構造上あり得ません。",
        },
        {
          bold: "即座のレスポンス：",
          text: "巨大な画像ファイルのアップロードやダウンロードの待ち時間がないため、300 DPI PDFの生成まで瞬時に完了します。",
        },
      ],
      commitmentsTitle: "3つの基本原則",
      commitments: [
        {
          bold: "アカウント登録不要：",
          text: "すべてのワークスペース機能、テンプレート、高解像度書き出しはログインや課金なしで利用可能です。",
        },
        {
          bold: "メタデータの厳格な保持：",
          text: "カメラ元ファイル名、露出時間、レンズ焦点距離などの技術情報を正確にシートへ反映します。",
        },
        {
          bold: "ユーザー素材の追跡ゼロ：",
          text: "写真の内容、ファイル名、クライアントの選別内容に関するいかなるデータ収集も行いません。",
        },
      ],
      communityTitle: "オープンなコミュニティと改善",
      communityP: "Make Contact Sheetは、世界中の撮影スタジオ、ラボ、レタッチャー、写真家の皆様からのフィードバックによって日々進化しています。",
      contactCta: "ご意見やテンプレートのご要望はありますか？ お気軽にご連絡ください",
      privacyPolicyLink: "プライバシーポリシー全文を読む",
    },
    contactUs: {
      title: "お問い合わせ — Make Contact Sheet",
      description: "Make Contact Sheetに関するサポート、新機能やテンプレートのご要望、ご意見などのお問い合わせはこちらから。",
      breadcrumbsTitle: "お問い合わせ",
      heroTitle: "お問い合わせ",
      heroLead: "ご質問、新しいテンプレートのご提案、機能のご要望などがございましたら、お気軽にお寄せください。",
      cardHeading: "ご連絡窓口",
      cardLead: "Make Contact Sheetは写真家とクリエイターコミュニティのために開発・運営されています。不具合報告や機能のアイデアをお待ちしております。",
      card1Title: "一般的なお問い合わせ・技術サポート",
      card1Desc: "ツールの使い方やブラウザ動作の不具合に関するご相談：",
      card2Title: "テンプレート・新機能のご要望",
      card2Desc: "新しいコンタクトシートプリセットやコラージュ枠のご提案：",
      responseTime: "いただいたすべてのご意見を確認し、通常1〜2営業日以内に回答いたします。",
    },
    privacyPolicy: {
      title: "プライバシーポリシー — Make Contact Sheet",
      description: "Make Contact Sheetのプライバシーポリシー。すべての画像処理は端末のブラウザ内でローカルに実行され、外部サーバーへ送信されません。",
      breadcrumbsTitle: "プライバシーポリシー",
      heroTitle: "プライバシーポリシー",
      lastUpdated: "最終更新日：2026年8月",
      sections: [
        {
          title: "1. 概要とデータプライバシーの基本保証",
          content: [
            "Make Contact Sheetにおいて、プライバシーは単なるオプション設定ではなく、設計の根幹をなす理念です。当ツールはブラウザ内で動作するクライアントサイドアプリケーションです。",
            "写真を読み込んでコンタクトシートやコラージュを生成するすべての処理（デコード、リサイズ、配置、PDF作成）は、お使いの端末のローカルメモリ内でのみ実行されます。",
            "写真データ、ファイル名、EXIFメタデータが外部サーバーへ送信されたり、遠隔データベースに保存されたりすることは一切ありません。",
          ],
        },
        {
          title: "2. 当サービスが収集しない情報",
          content: [
            "当サービスは、ユーザーのプライバシー保護のため以下の情報を一切収集しません：",
          ],
          bullets: [
            "ユーザーアカウント、パスワード、認証情報",
            "アップロードされた画像ファイルや写真本体",
            "画像に埋め込まれたEXIFカメラデータ（GPS位置情報、カメラ製造番号、撮影日時）",
            "個別の写真選別ログやクライアントの採用・不採用ステータス",
          ],
        },
        {
          title: "3. ローカルストレージとプロジェクトファイル",
          content: [
            "プロジェクト設定（.makecontactsheet.json）を出力する場合、ファイルはブラウザ上で生成され、ご使用のPCに直接保存されます。再読み込み時もブラウザ内でのみ参照されます。",
          ],
        },
        {
          title: "4. 第三者サービスおよびアクセス解析",
          content: [
            "当サイトでは、サービスの安定運用のためにプライバシーに配慮した最小限のアクセス解析（訪問者数やブラウザ種別等の統計情報）を使用することがあります。画像データや個人の特定につながる情報は一切含まれません。",
          ],
        },
        {
          title: "5. プライバシーに関するお問い合わせ",
          content: [
            "データ保護や動作仕様に関するご質問は、privacy@makecontactsheet.com までご連絡ください。",
          ],
        },
      ],
    },
    termsAndConditions: {
      title: "利用規約 — Make Contact Sheet",
      description: "Make Contact Sheetの利用規約。コンタクトシート作成、コラージュ編集、クライアント校正ツールの利用条件について。",
      breadcrumbsTitle: "利用規約",
      heroTitle: "利用規約",
      lastUpdated: "最終更新日：2026年8月",
      sections: [
        {
          title: "1. 規約への同意",
          content: "Make Contact Sheet（以下「当サービス」）をご利用いただくにあたり、本規約に同意したものとみなします。本規約に同意いただけない場合、当サービスを利用することはできません。",
        },
        {
          title: "2. サービス概要と知的財産権",
          content: "当サービスは、写真のコンタクトシート作成、コラージュ配置、校正選別を行うためのブラウザ完結型ツールを提供します。当サービスを通じて処理されたすべての写真、画像、コンテンツの知的財産権および所有権は、100%ユーザーに留保されます。",
        },
        {
          title: "3. 免責事項",
          content: "当サービスは「現状有姿」かつ「提供可能な範囲」で提供され、明示的・黙示的を問わずいかなる保証も行いません。当サービスの中断、動作エラーの不存在、または特定のハードウェア環境との完全な互換性を保証するものではありません。",
        },
        {
          title: "4. 責任の制限",
          content: "当サービスの利用または写真データの損失等から生じるいかなる間接損害、特別損害、偶発的損害についても、当サービスおよびその運営者は責任を負いません。",
        },
      ],
    },
  },
  pt: {
    contactSheetTemplates: {
      title: "Modelos de folhas de contato — Layouts de prova para impressão",
      description: "Modelos gratuitos de folhas de contato em formatos A4, Carta e 16:9. Grades calibradas com nomes de arquivos e exportação em 300 DPI.",
      breadcrumbsTitle: "Modelos de folhas de contato",
      heroTitlePrefix: "Modelos gratuitos de ",
      heroHighlight: "folhas de contato",
      heroTitleSuffix: " e layouts",
      heroLead: "Navegue por modelos imprimíveis de folhas de contato para aprovação com clientes, indexação de filme analógico e arquivamento de portfólio. Formatos A4, Carta ou 16:9.",
      categories: {
        all: "Todos",
        standard: "Padrões de impressão",
        film: "Filme & Revelação",
        client: "Revisão com clientes & EXIF",
        digital: "Telas & Vídeo",
      },
      pageSizeLabel: "Tamanho da página:",
      labelsLabel: "Legendas:",
      marginsGapLabel: "Margens / Espaçamento:",
      usePresetBtn: "Usar este modelo",
      editorialTitle: "Como escolher o modelo ideal de folha de contato",
      editorialP1: "O layout perfeito de uma folha de contato equilibra o tamanho de cada foto com a densidade da página. Para uma pasta de apresentação ao cliente, um modelo A4 ou Carta com 16 a 20 fotos por folha permite avaliar expressões, iluminação e foco sem precisar de lupa.",
      editorialP2: "Para apresentações em monitor ou videochamadas, as grades panorâmicas 16:9 aproveitam toda a largura de telas modernas sem margens verticais vazias.",
      faqTitle: "Perguntas frequentes sobre modelos",
      faqs: [
        {
          question: "Qual modelo de folha de contato devo usar para imprimir?",
          answer: "Para impressoras normais de escritório ou casa, use a folha A4 Retrato (padrão internacional) ou Carta Retrato (padrão norte-americano). Ambos trazem margens calibradas para que imagens e nomes fiquem dentro da área imprimível.",
        },
        {
          question: "Posso personalizar linhas e colunas destes modelos?",
          answer: "Sim. Embora os modelos tragam configurações consagradas, você pode ajustar livremente colunas (1 a 8), linhas (1 a 10), espaçamento e margens no estúdio.",
        },
        {
          question: "Qual é o melhor modelo para o cliente selecionar fotos?",
          answer: "Recomendamos a 'Folha de Seleção do Cliente'. Com grade 3×4, miniaturas generosas, números de índice destacados (#1, #2) e marcações de status, a comunicação fica simples e precisa.",
        },
      ],
    },
    collageTemplates: {
      title: "Modelos de colagens de fotos — Layouts criativos em grade",
      description: "Explore modelos gratuitos de colagens fotográficas com imagem principal, trípticos e redes sociais. Personalize e exporte no navegador.",
      breadcrumbsTitle: "Modelos de colagens",
      heroTitlePrefix: "Modelos de ",
      heroHighlight: "colagens de fotos",
      heroTitleSuffix: " e layouts em grade",
      heroLead: "Descubra modelos personalizáveis de colagens de fotos para stories de redes sociais, pranchas comparativas e pôsteres com proporções geométricas harmoniosas.",
      categories: {
        all: "Todos",
        basic: "Grade básica",
        showcase: "Destaque & Editorial",
        social: "Stories para redes",
        comparison: "Comparação & Duos",
      },
      photosLabel: "fotos",
      aspectRatioLabel: "Proporção:",
      defaultGapLabel: "Espaçamento padrão:",
      useTemplateBtn: "Usar este modelo",
      editorialTitle: "Formatos e casos de uso de colagens",
      editorialP1: "Os modelos do Make Contact Sheet foram desenhados com base nas proporções reais da fotografia. Nossa tira horizontal de 3 fotos é perfeita para paisagens panorâmicas, enquanto o formato vertical 9:16 combina retratos e detalhes para telas de celular.",
      faqTitle: "Perguntas frequentes sobre colagens",
      faqs: [
        {
          question: "Posso alterar o espaçamento entre as fotos no modelo de colagem?",
          answer: "Sim. Cada modelo permite ajustar o espaçamento entre fotos (desde 0 px sem bordas até divisórias largas de 40 px) e as margens externas.",
        },
        {
          question: "Como encaixar fotos com proporções diferentes?",
          answer: "Você pode alternar entre 'Cover' (preenchimento total da moldura com recorte inteligente centralizado) e 'Contain' (que mantém a foto inteira sem nenhum corte).",
        },
        {
          question: "Os modelos de colagem são gratuitos para usar e baixar?",
          answer: "Sim. Todos os modelos no Make Contact Sheet são 100% gratuitos, sem marcas d'água e sem necessidade de cadastro.",
        },
      ],
    },
    moodBoardTemplates: {
      title: "Modelos de mood boards — Predefinições estéticas gratuitas",
      description: "Navegue por modelos gratuitos de mood boards para fotografia, moda e marcas. Escolha estilos editoriais, lookbooks ou minimalistas com edição imediata.",
      breadcrumbsMoodBoard: "Criador de mood boards",
      breadcrumbsTitle: "Modelos",
      heroTitlePrefix: "Modelos gratuitos de ",
      heroHighlight: "mood boards",
      heroTitleSuffix: " e direção visual",
      heroLead: "Predefinições de direção estética para ensaios fotográficos, lookbooks de moda, mapas de luz e paletas de cores. 100% personalizáveis no seu navegador.",
      openCanvasBtn: "Abrir tela de criação",
      readGuideBtn: "Ler guia passo a passo",
      categories: {
        all: "Todos os layouts",
        editorial: "Editorial & Storyboard",
        lookbook: "Lookbook de moda",
        concept: "Conceito & Paleta",
        film: "Filme analógico",
        minimal: "Minimalista & Clean",
      },
      aspectRatioLabel: "Proporção:",
      elementsLabel: "Elementos:",
      totalObjectsLabel: "objetos no total",
      photosLabel: "Fotos",
      swatchesLabel: "Cores",
      widescreenLabel: "Widescreen 16:9",
      useTemplateBtn: "Usar este modelo",
      editorialTitle: "Como escolher a predefinição criativa ideal",
      editorialHighlight: "Predefinição criativa ideal",
      editorialLead: "Um mood board visual orienta toda a equipe criativa: modelos, maquiadores, stylists e assistentes. Escolher a estrutura certa alinha a linguagem visual antes de entrar no estúdio.",
      editorialCards: [
        {
          title: "Editorial & Storyboard",
          desc: "Destaca uma grande foto principal acompanhada de detalhes de textura e notas de iluminação para produções publicitárias.",
        },
        {
          title: "Lookbook de moda",
          desc: "Harmoniza fotos de corpo inteiro com amostras de tecido, destaques de acessórios e observações de styling.",
        },
        {
          title: "História de cores & Paleta",
          desc: "Traz cartões de cores com códigos hexadecimais alinhados a referências tonais para definir gelatinas e pós-produção.",
        },
        {
          title: "Tríptico analógico de filme",
          desc: "Evidencia o grão do 35mm e a profundidade do médio formato 120 com anotações de exposição e película utilizada.",
        },
      ],
      faqTitle: "Perguntas frequentes sobre mood boards",
      faqs: [
        {
          question: "Como utilizo um modelo de mood board?",
          answer: "Basta clicar em 'Usar este modelo' em qualquer opção acima. O estúdio será aberto com molduras, amostras de cores e notas já posicionadas.",
        },
        {
          question: "Posso substituir as fotos de exemplo pelas minhas próprias?",
          answer: "Sim! Arraste suas fotos para a bandeja de fotos e solte-as sobre qualquer moldura da tela, ou clique em 'Preencher molduras' para distribuir automaticamente.",
        },
        {
          question: "É possível alterar cores de fundo, cartelas e notas de texto?",
          answer: "Cada elemento é 100% editável. Você pode ajustar a cor de fundo, ligar guias pontilhadas, mudar os códigos hexadecimais das cores e redigir suas próprias notas.",
        },
        {
          question: "Posso exportar os painéis para apresentações e impressão?",
          answer: "Sim. Exporte imagens PNG ou JPEG em alta resolução e PDFs em 300 DPI prontos para impressão (com senha opcional de segurança) sem compressão destrutiva.",
        },
      ],
      relatedToolsTitle: "Ferramentas e tutoriais relacionados",
    },
    comparePhotoshop: {
      title: "Alternativa ao Photoshop Contact Sheet — Provas fotográficas rápidas",
      description: "Compare o Make Contact Sheet com o Adobe Photoshop para criar folhas de prova. Configuração rápida, prévia em tempo real e sem assinatura Adobe.",
      breadcrumbsCompare: "Comparação",
      breadcrumbsTitle: "Alternativa ao Photoshop",
      badge: "BENCHMARK E PRIVACIDADE",
      heroTitle: "A melhor alternativa leve ao Contact Sheet II do Photoshop",
      heroLead: "Compare o script Contact Sheet II do Adobe Photoshop com o estúdio ágil no navegador do Make Contact Sheet.",
      tableHeaderCapability: "Recurso / Capacidade",
      tableHeaderMcs: "Make Contact Sheet",
      tableHeaderPs: "Photoshop (Contact Sheet II)",
      tableHeaderCanva: "Canva",
      tableHeaderVizua: "Vizua",
      comparisonRows: [
        {
          feature: "Conta / Cadastro obrigatório",
          icon: "👤",
          mcs: "Não (Acesso imediato)",
          mcsHighlight: "lime",
          ps: "Sim (Adobe ID)",
          canva: "Sim (Obrigatório)",
          vizua: "Não",
        },
        {
          feature: "Privacidade / Transferência de arquivos",
          icon: "🔒",
          mcs: "100% Local no navegador",
          mcsHighlight: "lime",
          ps: "Computador local",
          canva: "Upload para nuvem",
          vizua: "Navegador local",
        },
        {
          feature: "Preservação dos nomes originais de arquivo",
          icon: "🏷️",
          mcs: "Sempre preservados & verificados",
          mcsHighlight: "yellow",
          ps: "Preservados na impressão",
          canva: "Removidos / Perdidos",
          vizua: "Preservados na grade",
        },
        {
          feature: "Triagem ágil (Manter / Destacar / Rejeitar)",
          icon: "🎯",
          mcs: "Sim (Atalhos 1, 2, 3)",
          mcsHighlight: "pink",
          ps: "Nenhum",
          canva: "Nenhum",
          vizua: "Nenhum",
        },
        {
          feature: "Exportação de lista CSV / TXT",
          icon: "📄",
          mcs: "Sim (Pronto para Lightroom)",
          mcsHighlight: "cyan",
          ps: "Nenhum",
          canva: "Nenhum",
          vizua: "Nenhum",
        },
        {
          feature: "Modos de colagem e mood board",
          icon: "🎨",
          mcs: "Estúdio integrado",
          mcsHighlight: "orange",
          ps: "Nenhum",
          canva: "Vários modelos",
          vizua: "Nenhum",
        },
        {
          feature: "Modelo de preços",
          icon: "💰",
          mcs: "Gratuito & Aberto",
          mcsHighlight: "lime",
          ps: "~R$120-R$300/mês",
          canva: "Freemium (R$35/mês)",
          vizua: "Grátis (máx. 50 fotos)",
        },
      ],
      section1Title: "Entendendo o Contact Sheet II do Photoshop",
      section1P: "Por mais de duas décadas, o script embutido do Adobe Photoshop 'Contact Sheet II' (Arquivo > Automatizar > Folha de Contatos II) foi a ferramenta padrão para impressão de provas. No entanto, a ferramenta quase não mudou desde o CS3: ela abre as fotos uma a uma com lentidão, cria um arquivo bitmap plano e não oferece nenhuma triagem interativa nem exportação de seleção.",
      section2Title: "Onde o Make Contact Sheet se destaca",
      section2P: "O Make Contact Sheet foi projetado especialmente para o ritmo dos fluxos fotográficos digitais modernos:",
      section2List: [
        {
          bold: "Processamento web instantâneo:",
          text: "Sem precisar abrir o Creative Cloud ou baixar atualizações pesadas. Arraste suas fotos e comece na hora.",
        },
        {
          bold: "Classificação integrada:",
          text: "Defina Manter (1), Destacar (2) ou Rejeitar (3) diretamente enquanto visualiza a folha.",
        },
        {
          bold: "Exportação para Lightroom:",
          text: "Exporte arquivos CSV e TXT com os nomes selecionados para filtrar em 1 clique no Lightroom Classic.",
        },
        {
          bold: "Modo duplo colagem e mood board:",
          text: "Alterne entre folhas técnicas de contato e painéis livres sem mudar de aplicativo.",
        },
        {
          bold: "Gratuito e seguro:",
          text: "Execução 100% no seu computador sem mensalidades ou assinaturas.",
        },
      ],
      ctaTitle: "Experimente um fluxo de prova fotográfica mais rápido",
      ctaDesc: "Crie folhas de contato prontas para impressão em segundos sem abrir o Photoshop.",
      ctaBtn: "Abrir Make Contact Sheet grátis",
      faqTitle: "Perguntas frequentes sobre o comparativo",
      faqs: [
        {
          question: "Como criar uma folha de contato no Photoshop?",
          answer: "No Photoshop, acesse Arquivo > Automatizar > Folha de Contatos II. Selecione a pasta com as fotos, defina as dimensões da página, linhas e colunas, e aguarde o programa processar cada arquivo um por um.",
        },
        {
          question: "Por que escolher o Make Contact Sheet em vez do Photoshop?",
          answer: "O Make Contact Sheet roda diretamente no navegador sem exigir assinatura Adobe. Traz atalhos rápidos de teclado (1, 2, 3) e exportação de nomes para Lightroom, recursos inexistentes no Photoshop.",
        },
        {
          question: "Quando ainda vale a pena usar o Adobe Photoshop?",
          answer: "O Photoshop continua essencial se você precisa de perfis de cor CMYK específicos para gráficas, gerenciamento avançado via scripts ICC ou ajustes complexos em camadas.",
        },
      ],
    },
    aboutUs: {
      title: "Sobre nós — Make Contact Sheet",
      description: "Conheça a equipe por trás do Make Contact Sheet, o espaço de trabalho gratuito no navegador para folhas de contato, colagens e provas para clientes.",
      breadcrumbsTitle: "Sobre o Make Contact Sheet",
      badge: "ENGENHARIA E MISSÃO",
      heroTitle: "Sobre o ",
      heroHighlight: "Make Contact Sheet",
      heroLead: "Construindo o espaço de trabalho fotográfico mais rápido, privado e inteligente para folhas de contato, mood boards e aprovação com clientes.",
      missionTitle: "Nossa missão e propósito",
      missionP1: "O Make Contact Sheet foi idealizado por engenheiros de software e fotógrafos comerciais para solucionar uma dificuldade recorrente na produção visual: por que criar uma simples folha de provas com nomes de arquivo precisos exige assinaturas mensais caras, catálogos lentos ou o upload arriscado de fotos para nuvens de terceiros?",
      missionP2: "Acreditamos que fotógrafos, diretores de arte, designers e criadores visuais merecem ferramentas de estúdio leves, que respeitem a confidencialidadade dos clientes, aproveitem a velocidade do hardware moderno e não atrapalhem a criação.",
      archTitle: "Arquitetura local com privacidade absoluta (Local-First)",
      archP1: "Ao contrário dos aplicativos web tradicionais que enviam suas fotos para servidores remotos, o Make Contact Sheet foi projetado como uma aplicação 100% executada no cliente.",
      archP2: "Quando você arrasta um ensaio de 500 fotos ou retratos confidenciais para o Make Contact Sheet:",
      archBullets: [
        {
          bold: "Zero transferência de rede:",
          text: "Cada pixel, nome de arquivo e metadado EXIF é processado localmente no seu navegador via HTML5 Canvas e Web Workers.",
        },
        {
          bold: "Zero armazenamento em servidores:",
          text: "Não temos servidores de processamento de imagens. Seus arquivos nunca tocam discos externos, bancos de dados na nuvem ou sistemas de treino de IA.",
        },
        {
          bold: "Execução imediata:",
          text: "Sem filas de upload ou download, a montagem da grade e a geração do PDF em 300 DPI acontecem na velocidade nativa do seu dispositivo.",
        },
      ],
      commitmentsTitle: "Compromissos essenciais do estúdio",
      commitments: [
        {
          bold: "Sem bloqueio por cadastro:",
          text: "Todas as ferramentas, predefinições e exportações em alta resolução estão disponíveis sem login ou assinaturas pagas.",
        },
        {
          bold: "Integridade rigorosa de metadados:",
          text: "Nomes de arquivo originais de câmera, tempos de exposição e distâncias focais são preservados sem cortes arbitrários.",
        },
        {
          bold: "Zero telemetria sobre suas imagens:",
          text: "Não coletamos nenhuma informação sobre o conteúdo visual, nomes de arquivos ou decisões de seleção dos seus clientes.",
        },
      ],
      communityTitle: "Comunidade e aprimoramento contínuo",
      communityP: "O Make Contact Sheet é um projeto vivo que evolui com as sugestões de estúdios profissionais, laboratórios de filme, retocadores e fotógrafos de todo o mundo.",
      contactCta: "Tem sugestões ou pedidos de novos modelos? Fale com a nossa equipe",
      privacyPolicyLink: "Leia nossa política de privacidade completa",
    },
    contactUs: {
      title: "Fale conosco — Make Contact Sheet",
      description: "Entre em contato com a equipe do Make Contact Sheet para suporte, sugestões de novos modelos ou dúvidas sobre as ferramentas.",
      breadcrumbsTitle: "Fale conosco",
      heroTitle: "Fale conosco",
      heroLead: "Dúvidas, pedidos de novos modelos ou sugestões de fluxo de trabalho? Será um prazer conversar com você.",
      cardHeading: "Como entrar em contato",
      cardLead: "O Make Contact Sheet é mantido para a comunidade de fotógrafos e criadores visuais. Envie relatórios de erros, ideias de novas ferramentas ou propostas de parceria.",
      card1Title: "Dúvidas gerais & suporte técnico",
      card1Desc: "Para ajuda com o uso das ferramentas ou problemas de compatibilidade no navegador:",
      card2Title: "Sugestões de modelos & novas funções",
      card2Desc: "Para sugerir um novo formato de folha de contato ou layout de colagem:",
      responseTime: "Lemos todas as mensagens da comunidade e respondemos em até 1 a 2 dias úteis.",
    },
    privacyPolicy: {
      title: "Política de privacidade — Make Contact Sheet",
      description: "Política de privacidade do Make Contact Sheet. Todo o processamento de imagem roda localmente no navegador sem envio para servidores.",
      breadcrumbsTitle: "Política de privacidade",
      heroTitle: "Política de privacidade",
      lastUpdated: "Última atualização: Agosto de 2026",
      sections: [
        {
          title: "1. Visão geral e compromisso de privacidade",
          content: [
            "No Make Contact Sheet, a privacidade não é uma configuração opcional: é o princípio técnico basilar do nosso software.",
            "Ao colocar fotos no Make Contact Sheet, todas as etapas de decodificação, ajuste de proporção, organização e exportação para PDF acontecem na memória local do seu navegador.",
            "Suas fotos, pixels, nomes de arquivos originais da câmera e metadados EXIF nunca são enviados aos nossos servidores nem salvos em bancos de dados remotos.",
          ],
        },
        {
          title: "2. Informações que não coletamos",
          content: [
            "Garantimos que dados sensíveis permaneçam exclusivamente sob o seu controle:",
          ],
          bullets: [
            "Não criamos nem armazenamos contas de usuário, senhas ou dados de login.",
            "Não coletamos, visualizamos nem mantemos arquivos de imagem ou fotos.",
            "Não analisamos nem transmitimos dados EXIF embutidos (GPS, número de série da câmera, datas).",
            "Não rastreamos seleções individuais de fotos nem triagens de clientes.",
          ],
        },
        {
          title: "3. Armazenamento local e arquivos de projeto",
          content: [
            "Ao exportar um arquivo de projeto (.makecontactsheet.json), ele é gerado pelo seu navegador e salvo no seu computador. Ao ser reaberto, é lido apenas localmente para recuperar a configuração.",
          ],
        },
        {
          title: "4. Serviços de terceiros e estatísticas de uso",
          content: [
            "Podemos utilizar ferramentas de métricas enxutas e focadas em privacidade para avaliar estatísticas agregadas (como total de visitas e navegadores utilizados). Nenhum arquivo de mídia ou identificador pessoal é enviado nesses registros.",
          ],
        },
        {
          title: "5. Contato sobre privacidade",
          content: [
            "Para dúvidas sobre a arquitetura local do Make Contact Sheet, contate-nos em privacy@makecontactsheet.com.",
          ],
        },
      ],
    },
    termsAndConditions: {
      title: "Termos e condições — Make Contact Sheet",
      description: "Termos e condições de uso do espaço de trabalho fotográfico Make Contact Sheet, incluindo folhas de contato, colagens e revisões.",
      breadcrumbsTitle: "Termos e condições",
      heroTitle: "Termos e condições de uso",
      lastUpdated: "Última atualização: Agosto de 2026",
      sections: [
        {
          title: "1. Aceitação dos termos",
          content: "Ao acessar ou usar o Make Contact Sheet (o 'Serviço'), você concorda em cumprir estes Termos e Condições. Caso não concorde com qualquer parte destes termos, não deverá utilizar o Serviço.",
        },
        {
          title: "2. Descrição do serviço e propriedade intelectual",
          content: "O Make Contact Sheet fornece ferramentas no navegador para geração de folhas de contato, montagem de colagens e triagem de fotos. Você mantém 100% da posse e dos direitos de propriedade intelectual sobre todas as fotografias, imagens e conteúdos processados por meio do Serviço.",
        },
        {
          title: "3. Isenção de garantias",
          content: "O Serviço é disponibilizado 'NO ESTADO EM QUE SE ENCONTRA' e 'CONFORME DISPONÍVEL', sem garantias de qualquer natureza. Não garantimos que o Serviço funcionará sem interrupções, livre de falhas ou com compatibilidade total em todas as configurações de hardware e navegadores.",
        },
        {
          title: "4. Limitação de responsabilidade",
          content: "Em hipótese alguma o Make Contact Sheet ou seus desenvolvedores serão responsáveis por quaisquer danos indiretos, incidentais, especiais ou consequentes decorrentes do uso do Serviço ou de eventual perda de dados fotográficos.",
        },
      ],
    },
  },
  en: {
    contactSheetTemplates: {
      title: "Contact Sheet Templates — Free Printable Proof Layouts",
      description: "Free printable contact sheet templates in A4, US Letter, and 16:9 formats. Calibrated grids with filenames and 300 DPI export support.",
      breadcrumbsTitle: "Contact Sheet Templates",
      heroTitlePrefix: "Free ",
      heroHighlight: "Contact Sheet Templates",
      heroTitleSuffix: " & Layouts",
      heroLead: "Browse free printable contact sheet templates for client proofing, darkroom film indexing, and portfolio archiving. Choose an A4, US Letter, or digital 16:9 contact sheet layout to arrange photos in seconds.",
      categories: {
        all: "All",
        standard: "Print Standards",
        film: "Film & Darkroom Index",
        client: "Client Review & EXIF",
        digital: "Screen & Video Board",
      },
      pageSizeLabel: "Page Size:",
      labelsLabel: "Labels:",
      marginsGapLabel: "Margins / Gap:",
      usePresetBtn: "Use This Preset",
      editorialTitle: "How to choose the right printable contact sheet template",
      editorialP1: "The ideal contact sheet layout balances thumbnail size with page density. If you are printing a photo proof sheet for a client review binder, an A4 contact sheet template or US Letter preset with 16 to 20 images per page allows the viewer to evaluate facial expressions, lighting, and composition without needing a magnifying loupe.",
      editorialP2: "For digital screen presentations and video call reviews, 16:9 widescreen formats (such as our 4×3 Digital Review Board) match modern laptop and monitor displays without leaving awkward blank vertical margins.",
      faqTitle: "Template FAQs",
      faqs: [
        {
          question: "Which contact sheet template should I use for printing?",
          answer: "For standard home and office printers, use either the A4 Portrait Proof Sheet (for international standard paper) or the US Letter Portrait Proof Sheet (for North American standard paper). Both include margins calibrated to ensure filenames and images fit inside printable margins.",
        },
        {
          question: "Can I customize the rows and columns of these templates?",
          answer: "Yes. While these templates provide tested defaults, you can freely adjust columns (1-8), rows (1-10), gutter spacing, and margins inside the Make Contact Sheet workspace.",
        },
        {
          question: "What is the best template for client selection?",
          answer: "The 'Client Selection Sheet' preset is recommended. It uses a 3×4 grid with large photos, clear index numbers (#1, #2), and status indicators so clients can easily point out selections.",
        },
      ],
    },
    collageTemplates: {
      title: "Photo Collage Templates — Free Creative Grid Layouts",
      description: "Explore free photo collage templates with hero, triptych, and social media grid layouts. Customize and export directly in your browser.",
      breadcrumbsTitle: "Collage Templates",
      heroTitlePrefix: "Custom ",
      heroHighlight: "Photo Collage",
      heroTitleSuffix: " Templates & Layouts",
      heroLead: "Explore customizable photo collage templates for social media stories, comparison boards, and print posters. Arrange your photos with balanced geometric proportions in seconds.",
      categories: {
        all: "All",
        basic: "Basic Grid",
        showcase: "Showcase & Editorial",
        social: "Social Stories",
        comparison: "Comparison & Duo",
      },
      photosLabel: "Photos",
      aspectRatioLabel: "Aspect Ratio:",
      defaultGapLabel: "Default Gap:",
      useTemplateBtn: "Use This Template",
      editorialTitle: "Template formats and use cases",
      editorialP1: "Make Contact Sheet templates are crafted around photographic proportions rather than generic graphics. For example, our 3-photo horizontal strip is perfect for landscape panoramas and documentary sequences, while our 9:16 vertical story format lets you combine portrait shots with detail insets for mobile platforms.",
      faqTitle: "Collage Template FAQs",
      faqs: [
        {
          question: "Can I change the spacing between photos in a collage template?",
          answer: "Yes. Every template allows custom gutter spacing (from 0px borderless seamless tiles up to 40px wide separators) and outer margin adjustments in the workspace.",
        },
        {
          question: "How do I fit photos with different aspect ratios?",
          answer: "Make Contact Sheet allows you to choose between 'Cover' (smart center crop that fills each cell completely) and 'Contain' (which preserves the full uncropped image with letterboxing).",
        },
        {
          question: "Are collage templates free to download and use?",
          answer: "Yes. All templates in Make Contact Sheet are completely free with zero watermark restrictions or signup requirements.",
        },
      ],
    },
    moodBoardTemplates: {
      title: "Mood Board Templates — Free Aesthetic Presets & Layouts",
      description: "Browse free mood board templates for photography, fashion, and branding. Pick editorial, lookbook, or minimal presets and customize instantly.",
      breadcrumbsMoodBoard: "Mood Board Maker",
      breadcrumbsTitle: "Templates",
      heroTitlePrefix: "Free ",
      heroHighlight: "Mood Board Templates",
      heroTitleSuffix: " & Layouts",
      heroLead: "Curated visual direction presets for photography, fashion styling lookbooks, lighting setups, and color palettes. 100% customizable in your browser with zero uploads.",
      openCanvasBtn: "Open Studio Canvas",
      readGuideBtn: "Read Step-by-Step Guide",
      categories: {
        all: "All Layouts",
        editorial: "Editorial & Storyboard",
        lookbook: "Fashion Lookbook",
        concept: "Concept & Palette",
        film: "Film & Analog",
        minimal: "Minimal Clean",
      },
      aspectRatioLabel: "Aspect Ratio:",
      elementsLabel: "Elements:",
      totalObjectsLabel: "total objects",
      photosLabel: "Photos",
      swatchesLabel: "Swatches",
      widescreenLabel: "16:9 Widescreen",
      useTemplateBtn: "Use This Template",
      editorialTitle: "How to Choose the Right",
      editorialHighlight: "Creative Layout Preset",
      editorialLead: "A visual concept board serves as the stylistic compass for your entire creative crew—including models, makeup artists, wardrobe stylists, and digital assistants. Choosing the right layout ensures everyone aligns with the intended aesthetic before stepping onto set.",
      editorialCards: [
        {
          title: "Editorial & Storyboard",
          desc: "Prioritizes a large hero subject frame alongside texture macros and lighting balance notes for commercial productions.",
        },
        {
          title: "Fashion Lookbook",
          desc: "Balances full-body runway looks with fabric swatches, accessory callouts, and garment steam requirements.",
        },
        {
          title: "Color Story & Palette",
          desc: "Features prominent hex code color swatches aligned with tonal reference photographs to define lighting gels and grading.",
        },
        {
          title: "Film & Analog Triptych",
          desc: "Showcases 120 medium format and 35mm grain aesthetics with exposure ratings and film stock technical notes.",
        },
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "How do I use a mood board template?",
          answer: "Simply click 'Use This Template' on any preset above. It will instantly launch the full-screen visual studio with canvas dimensions, photographic frames, color swatches, and styling notes pre-positioned for you.",
        },
        {
          question: "Can I replace the placeholder frames with my own photos?",
          answer: "Yes! Drag and drop your photos into the studio photo tray, then drag them directly onto any photo frame on the canvas or click 'Fill Frames' to auto-populate the layout.",
        },
        {
          question: "Can I change canvas background colors, swatches, and fonts?",
          answer: "Every element in our visual templates is 100% editable. You can adjust background colors, toggle grid/dot textures, customize hex codes on color swatches, and type custom direction notes.",
        },
        {
          question: "Can I export visual boards for client presentations and print?",
          answer: "Yes. You can export high-resolution PNGs, JPEGs, and print-ready 300 DPI PDFs (with optional client password protection) directly in your browser with zero compression loss.",
        },
      ],
      relatedToolsTitle: "Related Tools & Workflows",
    },
    comparePhotoshop: {
      title: "Photoshop Contact Sheet Alternative — Faster Proofing",
      description: "Compare Make Contact Sheet to Adobe Photoshop for creating proof sheets. Faster grid setup, live preview, and no Creative Cloud subscription.",
      breadcrumbsCompare: "Compare",
      breadcrumbsTitle: "Photoshop Alternative",
      badge: "BENCHMARK & PRIVACY",
      heroTitle: "The Best Lightweight Alternative to Photoshop Contact Sheet II",
      heroLead: "Compare Adobe Photoshop's Contact Sheet II automation with Make Contact Sheet's browser-first photo review and proofing workspace.",
      tableHeaderCapability: "Capability / Feature",
      tableHeaderMcs: "Make Contact Sheet",
      tableHeaderPs: "Photoshop (Contact Sheet II)",
      tableHeaderCanva: "Canva",
      tableHeaderVizua: "Vizua",
      comparisonRows: [
        {
          feature: "Account / Signup Required",
          icon: "👤",
          mcs: "No (Instant Access)",
          mcsHighlight: "lime",
          ps: "Yes (Adobe ID)",
          canva: "Yes (Mandatory)",
          vizua: "No",
        },
        {
          feature: "Privacy / File Transfer",
          icon: "🔒",
          mcs: "100% In-Browser Local",
          mcsHighlight: "lime",
          ps: "Local Desktop",
          canva: "Uploaded to Cloud",
          vizua: "Local Browser",
        },
        {
          feature: "Filename Preservation",
          icon: "🏷️",
          mcs: "Always Preserved & Verified",
          mcsHighlight: "yellow",
          ps: "Preserved in Print",
          canva: "Stripped / Lost",
          vizua: "Preserved in Grid",
        },
        {
          feature: "Keep / Reject / Flag Culling",
          icon: "🎯",
          mcs: "Yes (Shortcuts 1, 2, 3)",
          mcsHighlight: "pink",
          ps: "None",
          canva: "None",
          vizua: "None",
        },
        {
          feature: "Filename CSV / TXT Export",
          icon: "📄",
          mcs: "Yes (Lightroom Ready)",
          mcsHighlight: "cyan",
          ps: "None",
          canva: "None",
          vizua: "None",
        },
        {
          feature: "Collage & Mood Board Modes",
          icon: "🎨",
          mcs: "Built-in Studio",
          mcsHighlight: "orange",
          ps: "None",
          canva: "Extensive Templates",
          vizua: "None",
        },
        {
          feature: "Pricing Model",
          icon: "💰",
          mcs: "Free & Open",
          mcsHighlight: "lime",
          ps: "~$20-$55/month",
          canva: "Freemium ($13/mo)",
          vizua: "Free (50 imgs max)",
        },
      ],
      section1Title: "Understanding Photoshop Contact Sheet II",
      section1P: "For over two decades, Adobe Photoshop’s built-in Contact Sheet II script (File > Automate > Contact Sheet II) has been the default choice for photographers who need to print image proofs. While capable, the tool has changed little since CS3: it opens each image one-by-one, renders a static flattened raster document, and provides zero interactive review, culling, or selection export capabilities.",
      section2Title: "Where Make Contact Sheet Excels",
      section2P: "Make Contact Sheet was designed from the ground up for modern digital culling and client handoffs:",
      section2List: [
        {
          bold: "Instant Web Processing:",
          text: "No Creative Cloud app to launch or update. Drag your folder and start reviewing immediately.",
        },
        {
          bold: "Integrated Review States:",
          text: "Mark Keep (1), Flag (2), or Reject (3) directly while viewing the contact sheet layout.",
        },
        {
          bold: "Filename Handoff:",
          text: "Export structured CSV and TXT filename lists for 1-click filtering in Lightroom.",
        },
        {
          bold: "Collage Dual-Mode:",
          text: "Seamlessly switch from contact sheets to creative collage templates without leaving the workspace.",
        },
        {
          bold: "Free & Private:",
          text: "100% in-browser processing with no subscription fee.",
        },
      ],
      ctaTitle: "Try the faster contact sheet workflow",
      ctaDesc: "Create print-ready contact sheets in seconds without opening Photoshop.",
      ctaBtn: "Open Make Contact Sheet Free",
      faqTitle: "Comparison FAQs",
      faqs: [
        {
          question: "How do I make a contact sheet in Photoshop?",
          answer: "In Adobe Photoshop, go to File > Automate > Contact Sheet II. You must choose a folder, select page dimensions in inches/pixels, configure column and row counts, and let Photoshop open and tile each image sequentially. This process can take several minutes for large raw batches.",
        },
        {
          question: "Why choose Make Contact Sheet over Photoshop Contact Sheet II?",
          answer: "Make Contact Sheet is instant and runs directly in your browser without requiring a Creative Cloud subscription or heavy installation. Additionally, Make Contact Sheet includes built-in Keep/Flag/Reject review states and 1-click CSV filename export, which Photoshop lacks.",
        },
        {
          question: "When should I still use Adobe Photoshop?",
          answer: "Photoshop remains the standard tool if you need advanced CMYK printer profiles, custom ICC color management scripts, or complex multi-layer raster adjustments.",
        },
      ],
    },
    aboutUs: {
      title: "About Us — Make Contact Sheet",
      description: "Meet the team behind Make Contact Sheet, the free browser-first workspace for photo proof sheets, collages, and client review tools.",
      breadcrumbsTitle: "About Make Contact Sheet",
      badge: "ENGINEERING & MISSION",
      heroTitle: "About ",
      heroHighlight: "Make Contact Sheet",
      heroLead: "Building the fastest, most private browser-first workspace for photo contact sheets, mood boards, and client proofing.",
      missionTitle: "Our Mission & Purpose",
      missionP1: "Make Contact Sheet was founded by software engineers and working commercial photographers to solve a persistent friction in visual production: why does creating a simple, filename-accurate contact sheet or client proof package require expensive monthly subscriptions, slow catalog indexing, or privacy-compromising cloud uploaders?",
      missionP2: "We believe photographers, art directors, graphic designers, and visual creators deserve lightweight, dedicated studio instruments that respect client confidentiality, execute at the raw hardware speed of modern client devices, and get completely out of the way of the creative process.",
      archTitle: "The Local-First Privacy Architecture",
      archP1: "Unlike conventional SaaS web applications that funnel user photographs into centralized remote cloud storage buckets, Make Contact Sheet is fundamentally engineered as a 100% client-side application.",
      archP2: "When you drag a 500-photo commercial shoot or unreleased client portrait session into Make Contact Sheet:",
      archBullets: [
        {
          bold: "Zero Network Transfer:",
          text: "Every byte of raw pixel bitmap data, camera filename text, and technical EXIF metadata is decoded and rendered directly within your local browser sandbox using HTML5 Canvas and client-side Web Workers.",
        },
        {
          bold: "Zero Server Storage:",
          text: "We operate zero backend image processing servers. Your confidential client assets never touch a remote hard drive, third-party AI training pipeline, or cloud database.",
        },
        {
          bold: "Instant Execution:",
          text: "Because there are no multi-gigabyte upload or download queues, image rendering, grid formatting, and 300 DPI PDF generation happen immediately at hardware speed.",
        },
      ],
      commitmentsTitle: "Core Studio Commitments",
      commitments: [
        {
          bold: "Zero Account Gates:",
          text: "Full workspace capabilities, template presets, and high-resolution exports are accessible without mandatory account registration or paywalls.",
        },
        {
          bold: "Strict Metadata Integrity:",
          text: "Original camera filenames, exposure timestamps, and lens parameters are preserved without arbitrary truncation.",
        },
        {
          bold: "Zero Telemetry on User Media:",
          text: "We collect zero analytics or telemetry on image contents, file names, or client proof selections.",
        },
      ],
      communityTitle: "Open Community & Feedback",
      communityP: "Make Contact Sheet is an evolving project shaped directly by feedback from professional studios, film laboratories, editorial retouchers, and independent photographers worldwide. We continually introduce new layout presets, color palettes, and workflow bridges based on real-world production requirements.",
      contactCta: "Have feedback or template requests? Contact our team",
      privacyPolicyLink: "Read our full Privacy Policy",
    },
    contactUs: {
      title: "Contact Us — Make Contact Sheet",
      description: "Get in touch with the Make Contact Sheet team for support, feedback, or partnership inquiries about our photo workspace tools.",
      breadcrumbsTitle: "Contact Us",
      heroTitle: "Contact Us",
      heroLead: "Have questions, template requests, or workflow suggestions? We'd love to hear from you.",
      cardHeading: "Get in Touch",
      cardLead: "Make Contact Sheet is developed and maintained for the photographic and visual creator community. Reach out with bug reports, feature ideas, or collaboration inquiries.",
      card1Title: "General & Support Inquiries",
      card1Desc: "For help using Make Contact Sheet or reporting browser compatibility bugs:",
      card2Title: "Template & Feature Requests",
      card2Desc: "Suggesting a new contact sheet preset or collage layout:",
      responseTime: "We review all community feedback and respond to inquiries within 1-2 business days.",
    },
    privacyPolicy: {
      title: "Privacy Policy — Make Contact Sheet",
      description: "Make Contact Sheet privacy policy. All image processing runs locally in your browser. No photos are uploaded to external servers.",
      breadcrumbsTitle: "Privacy Policy",
      heroTitle: "Privacy Policy",
      lastUpdated: "Last Updated: August 2026",
      sections: [
        {
          title: "1. Overview & Core Privacy Guarantee",
          content: [
            "At Make Contact Sheet, privacy is not a marketing setting: it is the foundational engineering principle of our software. Make Contact Sheet operates as a browser-first client-side application.",
            "When you drop images, contact sheets, or collages into Make Contact Sheet, all image decoding, resizing, layout generation, and PDF document exports happen directly within your browser's local memory sandbox.",
            "Your photos, image pixels, original camera filenames, and EXIF metadata are never transmitted to our servers or stored in any remote database.",
          ],
        },
        {
          title: "2. Information We Do Not Collect",
          content: [
            "We intentionally ensure that no sensitive user media reaches remote systems:",
          ],
          bullets: [
            "We do not collect or store user accounts, passwords, or login credentials.",
            "We do not collect, view, or retain uploaded image files or photos.",
            "We do not inspect or transmit embedded EXIF camera data (GPS, camera serials, timestamps).",
            "We do not track individual photo selections or client review statuses.",
          ],
        },
        {
          title: "3. Local Storage and Session Manifests",
          content: [
            "If you choose to export a project manifest (.makecontactsheet.json), this file is generated client-side and saved directly to your local file system. When re-opened, it is read entirely within your browser to restore layout parameters.",
          ],
        },
        {
          title: "4. Third-Party Services & Analytics",
          content: [
            "We may use minimal, privacy-respecting website analytics to track coarse aggregated statistics (such as total page visits and browser operating systems). No media files or user identifiers are ever included in telemetry events.",
          ],
        },
        {
          title: "5. Contact Regarding Privacy",
          content: [
            "For any questions or verifications regarding Make Contact Sheet's local architecture, contact us at privacy@makecontactsheet.com.",
          ],
        },
      ],
    },
    termsAndConditions: {
      title: "Terms and Conditions — Make Contact Sheet",
      description: "Terms and conditions for using the Make Contact Sheet online photo workspace, including contact sheet, collage, and review tools.",
      breadcrumbsTitle: "Terms & Conditions",
      heroTitle: "Terms and Conditions",
      lastUpdated: "Last Updated: August 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using Make Contact Sheet (the 'Service'), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use the Service.",
        },
        {
          title: "2. Description of Service & Intellectual Property",
          content: "Make Contact Sheet provides browser-based tools for photo contact sheet generation, collage assembly, and client selection review. You retain 100% full ownership and intellectual property rights to all photographs, images, and content you process using the Service.",
        },
        {
          title: "3. Disclaimer of Warranties",
          content: "The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis without warranties of any kind, whether express or implied. Make Contact Sheet does not warrant that the Service will be uninterrupted, bug-free, or compatible with every browser hardware configuration.",
        },
        {
          title: "4. Limitation of Liability",
          content: "In no event shall Make Contact Sheet or its contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service or any loss of photographic data.",
        },
      ],
    },
  },
};
