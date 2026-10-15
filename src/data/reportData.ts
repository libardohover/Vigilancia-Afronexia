export interface PresentationScreen {
  id: number;
  number: string;
  durationSeconds: number; // in seconds
  durationFormatted: string;
  title: string;
  subtitle: string;
  centralMessage: string;
  keyPoints: string[];
  docSource: string;
  speakerScript: {
    estimatedTime: string;
    speech: string[];
    transitionSentence: string;
    deliveryAdvice: string;
  };
}

export const INSTITUTIONAL_DATA = {
  projectTitle:
    'Desarrollo de un sistema de información basado en IA para la promoción, visibilización y gestión de la oferta cultural y turística de la población afrodescendiente del municipio de Barrancabermeja',
  shortTitle: 'AFRONEXIA VT INTELLIGENCE 2026',
  subtitle: 'De la vigilancia tecnológica a la innovación cultural afrodescendiente',
  researcher: 'Libardo Hover Bautista B.',
  researcherRole: 'Aprendiz Investigador (ADSO)',
  sennovaInstructor: 'Hugo Semanate Quiñonez',
  sennovaRole: 'Instructor de Investigación (SENNOVA)',
  technicalInstructor: 'Alejandro Zabala Díaz',
  technicalRole: 'Instructor Técnico',
  institution: 'Servicio Nacional de Aprendizaje — SENA',
  center: 'Centro de Comercio, Regional Antioquia',
  reportCode: 'GFPI-F-153 V03',
  date: '3 de octubre de 2026',
  location: 'Medellín / Barrancabermeja, Colombia',
  totalTimeMinutes: 15,
  totalTimeSeconds: 900,
};

export const SCREENS_DATA: PresentationScreen[] = [
  {
    id: 1,
    number: '01',
    durationSeconds: 60,
    durationFormatted: '1:00 min',
    title: 'AFRONEXIA: tecnología para visibilizar nuestra identidad cultural',
    subtitle: 'Contexto territorial, problema de I+D+i y objetivo de la Vigilancia Tecnológica',
    centralMessage:
      'La vigilancia tecnológica permitió identificar conocimientos y soluciones para orientar el desarrollo de AFRONEXIA.',
    keyPoints: [
      'Problema central: Limitada incorporación de IA para promocionar y gestionar el turismo cultural afrodescendiente de Barrancabermeja.',
      'Territorio y comunidad: Población afrodescendiente del Magdalena Medio, portadores de tradición, saberes ancestrales y gestores.',
      'Propuesta de valor: Transformar información cultural dispersa en un activo digital estructurado, consultable y con asistencia de IA responsable.',
    ],
    docSource: 'Informe Final VT (GFPI-F-153 V03) — Capítulos 1, 2, 3 y 4 (págs. 6–9)',
    speakerScript: {
      estimatedTime: '1 minuto',
      speech: [
        'Buenos días, señores miembros del comité evaluador e instructores. Mi nombre es Libardo Hover Bautista, aprendiz investigador del programa ADSO en el SENA Centro de Comercio de la Regional Antioquia, acompañado por nuestros instructores Hugo Semanate de SENNOVA y Alejandro Zabala.',
        'Hoy presento los resultados de la Vigilancia Tecnológica de AFRONEXIA, un sistema de información basado en inteligencia artificial para la promoción, visibilización y gestión de la oferta cultural y turística de la comunidad afrodescendiente de Barrancabermeja.',
        'En nuestro territorio, la riqueza cultural, la memoria oral y la oferta de los saberes tradicionales se encuentran fragmentadas y con escasa presencia digital. Frente a esto, nos planteamos como objetivo investigar cómo la inteligencia artificial, el turismo inteligente y el patrimonio digital pueden converger para proteger y proyectar esta memoria.',
      ],
      transitionSentence:
        'Para abordar este reto con rigurosidad científica, estructuramos una metodología sistemática basada en la norma UNE 166006 y el Skill VT 2026.',
      deliveryAdvice:
        'Postura firme, tono seguro y pausado. Mirar al jurado y articular con claridad el valor cultural de Barrancabermeja.',
    },
  },
  {
    id: 2,
    number: '02',
    durationSeconds: 90,
    durationFormatted: '1:30 min',
    title: '¿Cómo investigamos las tecnologías que necesita AFRONEXIA?',
    subtitle: 'Metodología sistemática de cuatro fases, fuentes científicas y embudo cienciométrico',
    centralMessage:
      'El proceso articuló cienciometría, vigilancia de patentes y análisis cualitativo bajo la lógica de la norma UNE 166006.',
    keyPoints: [
      'Fase I — Delimitación y Ecuaciones: Tesauros UNESCO, operadores booleanos y apoyo de IA generativa para sintaxis precisa.',
      'Fase II — Búsqueda Multifuente: Scopus, Dimensions, Google Scholar, Lens.org y PATENTSCOPE (WIPO).',
      'Fase III — Depuración y Análisis: Criterios estrictos de pertinencia, actualidad 2021-2026, VOSviewer y Tree of Science.',
      'Fase IV — Transferencia Estratégica: Traducción de la evidencia en decisiones de arquitectura y hoja de ruta tecnológica.',
    ],
    docSource: 'Informe Final VT — Capítulo 5, Figura 1 y Figura 2 (págs. 9–15)',
    speakerScript: {
      estimatedTime: '1 minuto y 30 segundos',
      speech: [
        'Para garantizar trazabilidad, implementamos un proceso en cuatro fases documentado en la Figura 1 y el embudo cienciométrico de la Figura 2 de nuestro informe.',
        'Iniciamos en la Fase 1 delimitando el objeto de vigilancia mediante tesauros y combinaciones booleanas de conceptos como smart tourism, generative AI, intangible cultural heritage y recommender systems.',
        'En la Fase 2 realizamos la búsqueda en tres bases científicas principales: Scopus, Dimensions y Google Scholar, junto a dos plataformas de propiedad industrial: Lens y PATENTSCOPE.',
        'En la Fase 3 aplicamos un riguroso embudo: filtramos 1.529 registros iniciales para seleccionar 50 artículos de alta pertinencia y 20 soluciones de patentes, analizando redes de coocurrencia en VOSviewer y estructurando el Tree of Science.',
        'Finalmente, en la Fase 4 convertimos esos hallazgos en lineamientos aplicables al prototipo AFRONEXIA.',
      ],
      transitionSentence:
        'Veamos ahora qué descubrimos al examinar la producción científica global consolidada.',
      deliveryAdvice:
        'Señalar el embudo metodológico. Enfatizar que no fue una búsqueda web al azar, sino un protocolo estructurado.',
    },
  },
  {
    id: 3,
    number: '03',
    durationSeconds: 150,
    durationFormatted: '2:30 min',
    title: '¿Qué revela la producción científica mundial?',
    subtitle: 'Corpus consolidado de 1.529 publicaciones, dinámica temporal, distribución geográfica y áreas técnicas',
    centralMessage:
      'La producción científica muestra una aceleración reciente y una oportunidad para desarrollar soluciones contextualizadas en Colombia.',
    keyPoints: [
      'Corpus: 1.529 resultados (1.142 Scopus, 373 Dimensions, 14 Scholar) depurados a 50 documentos clave (3,3% de selección rigurosa).',
      'Dinámica temporal: El 92% de la literatura seleccionada se concentra entre 2024 y 2026, con pico máximo de 22 artículos en 2025.',
      'Liderazgo geográfico: Marcada concentración en Asia (China con 475, India 147, Malasia 89); baja producción colombiana que representa oportunidad.',
      'Convergencia temática: Sistemas de recomendación turística, RAG, georreferenciación y protección de patrimonio inmaterial.',
    ],
    docSource: 'Informe Final VT — Capítulo 8.3, Tablas 6 y 7, Figuras 8, 9, 10 y 11 (págs. 41–51)',
    speakerScript: {
      estimatedTime: '2 minutos y 30 segundos',
      speech: [
        'El análisis cuantitativo nos entrega cuatro hallazgos de gran trascendencia. Primero, como se observa en la Tabla 6, de los 1.529 resultados globales seleccionamos exactamente 50 documentos para análisis focalizado; es decir, un 3,3 % que superó los criterios de pertinencia directa.',
        'Segundo, en la evolución temporal de la Figura 8, vemos una aceleración contundente: el 92 % de los documentos seleccionados se publicó entre 2024 y 2026, alcanzando un pico de 22 artículos en 2025. Esto demuestra que AFRONEXIA investiga un campo en plena consolidación en la frontera del conocimiento.',
        'Tercero, en la distribución geográfica de la Figura 10, China lidera con 475 publicaciones, seguida de India con 147, Estados Unidos con 112 y Malasia con 89. Colombia registra una participación comparativamente baja. Metodológicamente no interpretamos esto como debilidad, sino como una brecha de investigación y una oportunidad estratégica para aportar innovación con arraigo local.',
        'Cuarto, las áreas técnicas de la Figura 9 confirman que las publicaciones convergen en modelos de lenguaje contextualizados, recomendación turística por preferencias y geolocalización de patrimonio.',
      ],
      transitionSentence:
        'Para entender cómo se estructuran estos conocimientos a nivel conceptual, examinamos la metáfora del Tree of Science.',
      deliveryAdvice:
        'Guiar la vista de los evaluadores hacia los picos del gráfico temporal y el mapa de calor por países.',
    },
  },
  {
    id: 4,
    number: '04',
    durationSeconds: 120,
    durationFormatted: '2:00 min',
    title: 'De los fundamentos científicos a las tecnologías emergentes',
    subtitle: 'Tree of Science: raíces teóricas, tronco de consolidación y hojas de frontera tecnológica',
    centralMessage:
      'Las tecnologías más prometedoras son aquellas que pueden adaptarse a las necesidades culturales y turísticas del territorio.',
    keyPoints: [
      'Raíces (Fundamentos): Sperlí (2021, chatbots patrimoniales), Tao et al. (2023, recomendación autosupervisada), Luca et al. (2023, movilidad espacial).',
      'Tronco (Consolidación): Suanpang & Pothipassa (2024, IA generativa + IoT, 116 citas), Gîrbacia (2024, IA en patrimonio), Ranjgar et al. (2024, recuperación semántica).',
      'Hojas (Frontera 2025–2026): Wang et al. (2026, Graph-Retrieval en patrimonio inmaterial), Ye et al. (2025, TourismMinds - LLMs geoespaciales), Koukopoulos (2026, XR e IA).',
    ],
    docSource: 'Informe Final VT — Capítulo 8.1, Tablas 3 y 4, Figura 4 (págs. 23–30)',
    speakerScript: {
      estimatedTime: '2 minutos',
      speech: [
        'En la Figura 4 aplicamos el modelo del Tree of Science para organizar la genealogía del conocimiento.',
        'En las Raíces encontramos los cimientos: los trabajos de Sperlí de 2021 sobre chatbots para guiar la experiencia del turista con Deep Learning, y las investigaciones de Luca de 2023 sobre modelado de movilidad humana con datos geoespaciales, que sustentan nuestras rutas turísticas.',
        'En el Tronco se consolida el campo: destaca Suanpang y Pothipassa en 2024, con 116 citaciones, demostrando cómo la IA generativa unida a datos contextuales transforma los destinos turísticos inteligentes; junto a Ranjgar, que analiza la transición hacia ontologías y Web Semántica en patrimonio cultural.',
        'Y en las Hojas, la frontera viva de 2025 y 2026: Wang y colaboradores integran Graph-Retrieval para consultas sobre portadores de patrimonio inmaterial; mientras Ye presenta TourismMinds, combinando modelos de lenguaje con trayectorias geoespaciales.',
        'Este árbol nos enseña que el camino de AFRONEXIA no es inventar algoritmos aislados, sino integrar estas hojas emergentes de RAG y georreferenciación en la identidad de Barrancabermeja.',
      ],
      transitionSentence:
        'Pero no solo vigilamos la academia: examinamos cómo la industria está protegiendo estas tecnologías mediante patentes.',
      deliveryAdvice:
        'Enfatizar el paso de la teoría (raíz) a la aplicación concreta en el territorio (hojas).',
    },
  },
  {
    id: 5,
    number: '05',
    durationSeconds: 120,
    durationFormatted: '2:00 min',
    title: '¿Qué soluciones tecnológicas se están patentando?',
    subtitle: 'Análisis de 20 patentes en WIPO y Lens: agentes conversacionales, cartografía patrimonial y rutas inteligentes',
    centralMessage:
      'Las patentes permiten identificar soluciones existentes que pueden orientar el desarrollo tecnológico de AFRONEXIA.',
    keyPoints: [
      'Corpus: 20 soluciones tecnológicas en Lens y PATENTSCOPE, con aceleración marcada desde 2023 y pico en 2025 (Figura 7).',
      'Baja concentración de inventores: Diversidad de actores (Jwa Jeong Woo con 2 invenciones, resto con 1) indicando ecosistema abierto.',
      'Patentes de alta pertinencia: CN118708822 A (mapas IA de patrimonio inmaterial), KR1020250061233 A / WO 2025/089510 A1 (chatbot turístico NLP), CN117076759 A (rutas inteligentes).',
      'Rigor metodológico: Se diferencian familias de patentes y se aclara que la vigilancia no prejuzga libertad de operación comercial (FTO).',
    ],
    docSource: 'Informe Final VT — Capítulo 8.2, Tabla 5, Figuras 5, 6 y 7 (págs. 30–41)',
    speakerScript: {
      estimatedTime: '2 minutos',
      speech: [
        'En el componente de propiedad industrial identificamos 20 soluciones tecnológicas relevantes. La Figura 7 muestra que las solicitudes de patente en este campo se intensifican fuertemente a partir de 2023, con un pico de 7 documentos en 2025.',
        'La Tabla 5 del informe documenta las patentes de pertinencia muy alta. Resalto cuatro invenciones clave:',
        'La patente china CN118708822 de 2024, que utiliza IA para generar mapas de patrimonio cultural inmaterial y priorizar atractivos; directamente transferible a nuestro módulo de georreferenciación.',
        'Las patentes de Jwa Jeong Woo en Corea y PCT de 2025, que diseñan la arquitectura de un chatbot turístico con extracción de entidades e intención, validando la lógica que implementamos en NEXIA.',
        'Y la patente CN117076759 de Xiao Xiong, que genera rutas turísticas multidimensionales evaluando confort, tiempo y emoción.',
        'Una aclaración de rigor científico: vigilamos estas tecnologías como referentes de ingeniería, evitando contar familias repetidas como invenciones independientes y reconociendo que cualquier uso futuro requiere análisis de libertad de operación.',
      ],
      transitionSentence:
        'Con esta evidencia científica y tecnológica, pasamos a clasificar qué tecnologías debíamos priorizar y cuál era nuestra madurez real.',
      deliveryAdvice:
        'Destacar la prudencia jurídica en patentes. Demuestra madurez y rigor investigativo ante el comité.',
    },
  },
  {
    id: 6,
    number: '06',
    durationSeconds: 120,
    durationFormatted: '2:00 min',
    title: '¿Qué tecnologías debe priorizar AFRONEXIA?',
    subtitle: 'Matriz de priorización, salto de madurez TRL 3 a TRL 4 y brechas organizacionales críticas',
    centralMessage:
      'AFRONEXIA avanzó en integración tecnológica, pero necesita fortalecer las alianzas y la validación comunitaria.',
    keyPoints: [
      'Priorización Inmediata: Asistente NEXIA + RAG (PostgreSQL/pgvector), recomendación contextual, SIG de rutas y analítica de uso.',
      'Horizontes Posteriores: Realidad extendida (XR), IoT sensorial, Blockchain y aprendizaje federado.',
      'Madurez Tecnológica: Salto verificado de TRL 3 (prueba de concepto) a TRL 4 (tecnología validada en laboratorio); meta siguiente TRL 5.',
      'Brechas Organizacionales: Desarrollo de software es fortaleza (nivel 4), pero relacionamiento externo tiene prioridad crítica 89/100.',
    ],
    docSource: 'Informe Final VT — Capítulos 6.1, 6.3, 7 y Tabla 1, Tabla 2 (págs. 16–22)',
    speakerScript: {
      estimatedTime: '2 minutos',
      speech: [
        'En la pantalla 6 cruzamos la vigilancia con la realidad de nuestro proyecto. Construimos una matriz donde separamos lo urgente de lo aspiracional.',
        'En aplicación inmediata priorizamos cuatro componentes: NEXIA con arquitectura RAG para responder con información verificada; recomendación contextual; georreferenciación con rutas comunitarias; y analítica de datos. Tecnologías como metaverso, blockchain o IoT se programan para horizontes posteriores debido a la infraestructura requerida.',
        'En términos de madurez tecnológica, como sustenta la Tabla 1, AFRONEXIA inició la vigilancia en TRL 3: teníamos conceptos y pantallas aisladas. Gracias a la VT avanzamos a TRL 4: un prototipo completamente integrado en laboratorio, con base vectorial pgvector, API REST y recuperación semántica funcional.',
        'Sin embargo, nuestro diagnóstico organizacional reveló un punto crítico: mientras en desarrollo de software estamos en nivel 4 de madurez, en relacionamiento externo y alianzas estamos en nivel 0 y 1, con un índice de prioridad de 89 sobre 100. Esto significa que la tecnología está lista en el código, pero su éxito depende de articularse con la comunidad afrodescendiente.',
      ],
      transitionSentence:
        'Veamos ahora cómo estos criterios transformaron tangiblemente el diseño y la funcionalidad del prototipo.',
      deliveryAdvice:
        'Tono reflexivo y autocrítico al hablar de las brechas organizacionales. A los evaluadores les agrada la honestidad metodológica.',
    },
  },
  {
    id: 7,
    number: '07',
    durationSeconds: 150,
    durationFormatted: '2:30 min',
    title: 'De la investigación a una solución tecnológica funcional',
    subtitle: 'Evolución del prototipo: contraste visual Antes/Después y los 9 módulos de la arquitectura AFRONEXIA',
    centralMessage:
      'La vigilancia tecnológica aportó criterios para fortalecer la arquitectura y las funcionalidades de AFRONEXIA.',
    keyPoints: [
      'Antes de VT (Figura 12): Prototipo inicial estático centrado en archivo web plano bajo el lema "El río también guarda memoria afro".',
      'Después de VT (Figura 13): Ecosistema inteligente integrado con 9 módulos completos documentados en la Tabla 9.',
      'Cadena de valor: Evidencia Científica → Selección Tecnológica → Arquitectura RAG → Integración pgvector → Prototipo Funcional.',
      'Propiedad Intelectual: Derechos patrimoniales correspondientes exclusivamente al SENA (Centro de Comercio, Regional Antioquia).',
    ],
    docSource: 'Informe Final VT — Capítulo 9, Figuras 12 y 13, Tabla 9 (págs. 52–56)',
    speakerScript: {
      estimatedTime: '2 minutos y 30 segundos',
      speech: [
        'Llegamos a la pantalla central de la evolución de ingeniería. En la Figura 12 observan el prototipo inicial: una interfaz básica con una galería estática de textos e imágenes que no permitía interacción inteligente.',
        'En la Figura 13 y en la Tabla 9 del informe presentamos el nuevo prototipo AFRONEXIA, estructurado en nueve módulos funcionales:',
        'Módulo 1: Explorador cultural con fichas filtrables de sitios naturales, espacios históricos y gastronomía.',
        'Módulo 2: Memoria y patrimonio, con archivo digital comunitario y la función "Registrar mis saberes" para portadores locales.',
        'Módulo 3: Agenda cultural con filtros de festivales y ferias.',
        'Módulo 4: Talentos y emprendimientos afro, con perfiles comerciales directos.',
        'Módulo 5 y 6: Rutas culturales georreferenciadas y experiencias comercializables con reserva.',
        'Módulo 7: El asistente virtual NEXIA, potenciado con RAG para evitar alucinaciones y contestar con rigor histórico.',
        'Y módulos 8 y 9: Autenticación por roles para gestores y panel administrativo con analítica.',
        'Todo este desarrollo tecnológico respeta la titularidad patrimonial exclusiva del SENA, salvaguardando los derechos morales del aprendiz.',
      ],
      transitionSentence:
        'Finalmente, condensamos los aprendizajes en las conclusiones y la hoja de ruta estratégica para Barrancabermeja.',
      deliveryAdvice:
        'Demostrar entusiasmo y dominio del software. Invitar a interactuar con el visor interactivo de módulos.',
    },
  },
  {
    id: 8,
    number: '08',
    durationSeconds: 90,
    durationFormatted: '1:30 min',
    title: 'AFRONEXIA: de la inteligencia tecnológica al impacto territorial',
    subtitle: 'Conclusiones del boletín, hoja de ruta a corto, mediano y largo plazo, y compromiso con la comunidad',
    centralMessage:
      'AFRONEXIA demuestra cómo la inteligencia artificial, orientada por la investigación, puede contribuir a preservar, visibilizar y proyectar el patrimonio cultural afrodescendiente.',
    keyPoints: [
      'Conclusión 1: La VT demostró la viabilidad de integrar IA contextualizada en turismo cultural sin caer en sesgos ni descontextualización.',
      'Conclusión 2: El prototipo escaló a TRL 4 mediante módulos articulados y arquitectura RAG con base comunitaria.',
      'Hoja de Ruta: Corto plazo (pruebas de laboratorio), Mediano plazo (piloto territorial TRL 5 en Barrancabermeja), Largo plazo (escalabilidad regional).',
    ],
    docSource: 'Informe Final VT — Capítulo 10 (págs. 57) y Referencias Bibliográficas (págs. 58–66)',
    speakerScript: {
      estimatedTime: '1 minuto y 30 segundos',
      speech: [
        'Para concluir nuestra sustentación, sintetizamos tres mensajes fundamentales del Capítulo 10:',
        'Primero: La vigilancia tecnológica demostró que la inteligencia artificial no debe ser un fin decorativo, sino un puente ético que respeta y proyecta la identidad afrodescendiente.',
        'Segundo: Logramos transformar datos cienciométricos en mejoras reales de ingeniería de software, validando en laboratorio un prototipo TRL 4 robusto.',
        'Y tercero, nuestra hoja de ruta: a corto plazo, enriquecer la base de conocimiento con los portadores de tradición; a mediano plazo, ejecutar el piloto con usuarios reales en Barrancabermeja para alcanzar TRL 5; y a largo plazo, consolidar un modelo transferible a todo el Magdalena Medio.',
        'Cerramos con la convicción de que AFRONEXIA demuestra que desde el SENA unimos la rigurosidad científica, el desarrollo de software y el orgullo cultural para transformar positivamente el territorio. Quedo atento a las preguntas del jurado evaluador. Muchas gracias.',
      ],
      transitionSentence:
        'Fin de la presentación. Espacio abierto para sesión de preguntas del comité evaluador.',
      deliveryAdvice:
        'Cierre cálido, agradecimiento mirando a todos los miembros de la mesa, respiración tranquila.',
    },
  },
];

// Exact bibliometric datasets extracted from the report
export const SOURCES_BREAKDOWN = [
  { source: 'Scopus', recuperados: 1142, seleccionados: 16, percentage: '74,7 %', selectedPct: '1,4 %' },
  { source: 'Dimensions', recuperados: 373, seleccionados: 20, percentage: '24,4 %', selectedPct: '5,4 %' },
  { source: 'Google Scholar', recuperados: 14, seleccionados: 14, percentage: '0,9 %', selectedPct: '100 %' },
];

export const TIMELINE_PUBLICATIONS = [
  { year: '2021', total: 1, scopus: 1, dimensions: 0, scholar: 0, note: 'Inicio del campo' },
  { year: '2022', total: 1, scopus: 1, dimensions: 0, scholar: 0, note: 'Exploración inicial' },
  { year: '2023', total: 2, scopus: 1, dimensions: 1, scholar: 0, note: 'Primeras aplicaciones' },
  { year: '2024', total: 11, scopus: 5, dimensions: 4, scholar: 2, note: 'Aceleración marcada' },
  { year: '2025', total: 22, scopus: 6, dimensions: 10, scholar: 6, note: 'Pico máximo de producción (44%)' },
  { year: '2026', total: 13, scopus: 2, dimensions: 5, scholar: 6, note: 'Consolidación frontera (hasta oct)' },
];

export const COUNTRY_DISTRIBUTION = [
  { country: 'China', count: 475, code: 'CN', region: 'Asia' },
  { country: 'India', count: 147, code: 'IN', region: 'Asia' },
  { country: 'Estados Unidos', count: 112, code: 'US', region: 'América' },
  { country: 'Reino Unido', count: 90, code: 'GB', region: 'Europa' },
  { country: 'Malasia', count: 89, code: 'MY', region: 'Asia' },
  { country: 'Indonesia', count: 75, code: 'ID', region: 'Asia' },
  { country: 'Arabia Saudita', count: 66, code: 'SA', region: 'Medio Oriente' },
  { country: 'Corea del Sur', count: 62, code: 'KR', region: 'Asia' },
  { country: 'España', count: 62, code: 'ES', region: 'Europa' },
  { country: 'Australia', count: 59, code: 'AU', region: 'Oceanía' },
  { country: 'Italia', count: 53, code: 'IT', region: 'Europa' },
  { country: 'Hong Kong', count: 46, code: 'HK', region: 'Asia' },
  { country: 'Taiwán', count: 42, code: 'TW', region: 'Asia' },
  { country: 'Alemania', count: 40, code: 'DE', region: 'Europa' },
  { country: 'Turquía', count: 38, code: 'TR', region: 'Europa/Asia' },
  { country: 'Tailandia', count: 37, code: 'TH', region: 'Asia' },
  { country: 'Vietnam', count: 36, code: 'VN', region: 'Asia' },
  { country: 'Canadá', count: 32, code: 'CA', region: 'América' },
  { country: 'Pakistán', count: 32, code: 'PK', region: 'Asia' },
  { country: 'Irán', count: 29, code: 'IR', region: 'Medio Oriente' },
];

export const TECHNICAL_AREAS = [
  { area: 'Big data / recomendación', count: 2 },
  { area: 'Conversacional / turismo inteligente', count: 1 },
  { area: 'Recomendación turística', count: 1 },
  { area: 'IA / privacidad / recomendación', count: 1 },
  { area: 'IA / reservas turísticas', count: 1 },
  { area: 'Grafos conocimiento / recomendación', count: 1 },
  { area: 'Big data / perfiles usuarios', count: 1 },
  { area: 'Analítica predictiva de destinos', count: 1 },
  { area: 'Rutas inteligentes y movilidad', count: 1 },
  { area: 'Gestión de turismo cultural', count: 1 },
  { area: 'VR / turismo inteligente inmersivo', count: 1 },
  { area: 'LLM / XR patrimonial', count: 1 },
  { area: 'IA / turismo cultural', count: 1 },
  { area: 'Deep learning / sentimiento', count: 1 },
  { area: 'IA / contenido cultural', count: 1 },
  { area: 'Grafos / recomendación', count: 1 },
  { area: 'IA multimodal patrimonial', count: 1 },
  { area: 'Algoritmos recomendación', count: 1 },
  { area: 'Visión IA / turismo cultural', count: 1 },
];

export const TREE_OF_SCIENCE_DATA = {
  roots: [
    {
      authors: 'Sperlí, G.',
      year: 2021,
      citations: 'N/D',
      title: 'A cultural heritage framework using a Deep Learning based Chatbot for supporting tourist journey',
      topic: 'Deep Learning, chatbot, patrimonio cultural, turismo',
      role: 'Framework pionero de interacción conversacional en entornos patrimoniales. Antecedente directo del asistente NEXIA.',
    },
    {
      authors: 'Orea-Giner, A. et al.',
      year: 2022,
      citations: 'N/D',
      title: 'Cultural tourist and user experience with artificial intelligence: A holistic perspective from industry 5.0',
      topic: 'IA, experiencia turística centrada en personas, Industria 5.0',
      role: 'Sustento conceptual: la IA debe potenciar la dignidad y experiencia humana y comunitaria, no solo automatizar procesos.',
    },
    {
      authors: 'Tao, Z. et al.',
      year: 2023,
      citations: '212',
      title: 'Self-supervised learning for multimedia recommendation in cultural tourism',
      topic: 'IA, recomendación multimedia, autosupervisado',
      role: 'Fundamentos matemáticos para modelar preferencias de usuarios a partir de fotos, rutas e intereses culturales.',
    },
    {
      authors: 'Luca, M. et al.',
      year: 2023,
      citations: '278',
      title: 'Deep learning approaches for human mobility and spatial data analysis',
      topic: 'Deep Learning, movilidad humana, datos espaciales',
      role: 'Bases algorítmicas para el cálculo de desplazamientos, rutas óptimas y análisis territorial.',
    },
    {
      authors: 'Hadi, R. et al.',
      year: 2024,
      citations: '372',
      title: 'Metaverse consumer behavior and virtual environments in tourism',
      topic: 'Metaverso, comportamiento de usuario en entornos virtuales',
      role: 'Teoría del comportamiento en plataformas interactivas y espacios inmersivos aplicados a la cultura.',
    },
  ],
  trunk: [
    {
      authors: 'Suanpang, P. & Pothipassa, P.',
      year: 2024,
      citations: '116',
      title: 'Integrating Generative AI and IoT for Sustainable Smart Tourism Destinations',
      topic: 'IA generativa, IoT, smart tourism, sostenibilidad',
      role: 'Piedra angular que demuestra cómo combinar IA generativa y analítica para guiar visitantes en tiempo real.',
    },
    {
      authors: 'Gîrbacia, F.',
      year: 2024,
      citations: '109',
      title: 'An analysis of research trends for using artificial intelligence in cultural heritage',
      topic: 'IA, patrimonio cultural, tendencias tecnológicas',
      role: 'Estructuración taxonómica de cómo la IA aporta a la documentación, curaduría y acceso a bienes patrimoniales.',
    },
    {
      authors: 'Anwar, M. S. et al.',
      year: 2025,
      citations: '105',
      title: 'Metaverse and XR for cultural heritage education: Applications, standards, architecture',
      topic: 'Metaverso, XR, patrimonio, educación',
      role: 'Sistematización de arquitecturas cliente-servidor y estándares para experiencias patrimoniales interactivas.',
    },
    {
      authors: 'Ranjgar, B. et al.',
      year: 2024,
      citations: '36',
      title: 'Cultural Heritage Information Retrieval: Past, Present, and Future Trends',
      topic: 'Recuperación de información, ontologías, Web Semántica',
      role: 'Base teórica para la arquitectura RAG de AFRONEXIA: conectar modelos de lenguaje con bases de conocimiento estructuradas.',
    },
    {
      authors: 'Sun, J. et al.',
      year: 2025,
      citations: '14',
      title: 'Deep learning models for cultural pattern recognition: Preserving intangible heritage of Li ethnic subgroups',
      topic: 'Deep Learning, patrones culturales, patrimonio inmaterial',
      role: 'Metodología para documentar y salvaguardar saberes ancestrales de minorías étnicas mediante reconocimiento digital.',
    },
  ],
  leaves: [
    {
      authors: 'Koukopoulos, Z. et al.',
      year: 2026,
      citations: '0',
      title: 'AI-enhanced XR technologies for cultural heritage environments: A review of current solutions',
      topic: 'IA, XR, patrimonio cultural inmersivo',
      role: 'Frontera tecnológica 2026: integración de asistentes inteligentes con realidad extendida para turismo.',
    },
    {
      authors: 'Wang, R. et al.',
      year: 2026,
      citations: '2',
      title: 'Visual information identification and Q&A of intangible cultural heritage inheritors by using enhanced Graph-Retrieval',
      topic: 'Graph-Retrieval, patrimonio inmaterial, Q&A',
      role: 'Solución directa para consultar portadores del saber ancestral afrocolombiano mediante grafos de conocimiento.',
    },
    {
      authors: 'Jiang, J. & Wang, B.',
      year: 2026,
      citations: '1',
      title: 'Data mining-driven personalized recommendation in smart tourism systems',
      topic: 'Smart tourism, minería de datos, recomendación contextual',
      role: 'Personalización de itinerarios turísticos según perfil, tiempo y ubicación geográfica.',
    },
    {
      authors: 'Ye, Z. et al.',
      year: 2025,
      citations: '1',
      title: 'TourismMinds: A geo-augmented LLM framework for semantic-aware trajectory analytics and generation',
      topic: 'LLM, geolocalización, analítica turística',
      role: 'Framework que une LLMs con capas GIS para generar recorridos culturalmente coherentes.',
    },
    {
      authors: 'Sangamuang, S. et al.',
      year: 2025,
      citations: '2',
      title: 'Integrating generative AI and the metaverse for cultural heritage (Lamphun Brocade Fabric)',
      topic: 'IA generativa, saberes textiles, patrimonio',
      role: 'Demuestra cómo narrativas generativas preservan saberes artesanales tradicionales.',
    },
  ],
};

export const PATENTS_DATA = [
  {
    patentNumber: 'CN118708822 A',
    database: 'PATENTSCOPE / Lens',
    inventors: 'Liu Jing, Xie Aihua, Duan Yujin, Wang Biao',
    pubDate: '27/09/2024',
    country: 'China',
    status: 'Activa / Publicada',
    title: 'Método y sistema de generación de mapas de patrimonio cultural inmaterial basado en IA',
    keyTech: 'Mapas de patrimonio inmaterial, priorización por IA, afinidad de perfiles',
    relevance: 'Muy Alta',
    transferToAfronexia:
      'Aporta la lógica para el módulo de georreferenciación y cartografía interactiva de saberes ancestrales de Barrancabermeja.',
  },
  {
    patentNumber: 'KR1020250061233 A / WO 2025/089510 A1',
    database: 'PATENTSCOPE / Lens',
    inventors: 'Jwa Jeong Woo',
    pubDate: '08/05/2025',
    country: 'Corea del Sur / PCT',
    status: 'Activa / Publicada',
    title: 'Sistema y método de servicio de turismo inteligente basado en chatbot de IA',
    keyTech: 'Chatbot turístico, reconocimiento de intención, extracción de entidades, consultas dinámicas',
    relevance: 'Muy Alta',
    transferToAfronexia:
      'Referente de arquitectura directa para NEXIA: manejo de intenciones de visitantes, consulta a base de datos y respuesta contextual.',
  },
  {
    patentNumber: 'CN113052505 A',
    database: 'PATENTSCOPE / Lens',
    inventors: 'Kuang Zhiying',
    pubDate: '29/06/2021',
    country: 'China',
    status: 'Activa / Concedida',
    title: 'Método de recomendación de experiencias de turismo cultural basado en clustering y árboles de decisión',
    keyTech: 'Agrupamiento de usuarios, predicción de demanda turística, afinidad cultural',
    relevance: 'Alta',
    transferToAfronexia:
      'Algoritmos transferibles para la segmentación de visitantes y recomendación inteligente de saberes gastronómicos y festivos.',
  },
  {
    patentNumber: 'CN117076759 A',
    database: 'PATENTSCOPE / Lens',
    inventors: 'Xiao Xiong',
    pubDate: '17/11/2023',
    country: 'China',
    status: 'Activa / Publicada',
    title: 'Método de planificación de rutas turísticas inteligentes basado en Big Data e índices multidimensionales',
    keyTech: 'Optimización de trayectorias, índices de confort y emoción, planificación temporal',
    relevance: 'Muy Alta',
    transferToAfronexia:
      'Adaptable al diseño de circuitos culturales y recorridos por el río Magdalena y barrios tradicionales afro.',
  },
];

export const PATENT_METRICS = {
  totalCorpus: 20,
  familiesCount: 20,
  dominantCountry: 'China (con presencia en Corea del Sur y solicitudes PCT)',
  timeline: [
    { year: '2018', count: 1 },
    { year: '2019', count: 1 },
    { year: '2020', count: 1 },
    { year: '2021', count: 1 },
    { year: '2022', count: 1 },
    { year: '2023', count: 2 },
    { year: '2024', count: 4 },
    { year: '2025', count: 7 }, // Peak
    { year: '2026', count: 3 },
  ],
  topInventors: [
    { name: 'Jwa Jeong Woo', count: 2 },
    { name: 'Liu Jing / Xie Aihua', count: 1 },
    { name: 'Xiao Xiong', count: 1 },
    { name: 'Kuang Zhiying', count: 1 },
    { name: 'Chen Chongcheng', count: 1 },
    { name: 'Dai Ziyang', count: 1 },
    { name: 'Otros inventores', count: 13 },
  ],
};

export const TRL_DATA = {
  beforeVT: {
    level: 3,
    title: 'TRL 3 — Prueba de concepto experimental',
    evidence: 'Arquitectura y base de datos definidas, prototipo navegable estático, primeros componentes y conexiones técnicas.',
  },
  afterVT: {
    level: 4,
    title: 'TRL 4 — Tecnología validada en laboratorio',
    evidence: 'Integración funcional de PostgreSQL con pgvector, API REST, arquitectura RAG, embeddings y NEXIA en pruebas controladas.',
  },
  nextMilestone: {
    level: 5,
    title: 'TRL 5 — Tecnología validada en entorno relevante',
    evidence: 'Piloto con usuarios reales, actores culturales y emprendedores afrodescendientes de Barrancabermeja con métricas de aceptación.',
  },
};

export const ORGANIZATIONAL_GAPS = [
  { area: 'Relacionamiento externo', currentLevel: 0, targetLevel: 4, priorityScore: 89.0, status: 'Crítico' },
  { area: 'Identificación de necesidades de software', currentLevel: 1, targetLevel: 4, priorityScore: 70.5, status: 'Alto' },
  { area: 'Alianzas del ecosistema', currentLevel: 1, targetLevel: 4, priorityScore: 66.8, status: 'Alto' },
  { area: 'Promoción y apropiación social', currentLevel: 1, targetLevel: 4, priorityScore: 64.2, status: 'Medio-Alto' },
  { area: 'Articulación con formación técnica', currentLevel: 1, targetLevel: 4, priorityScore: 60.0, status: 'Medio' },
  { area: 'Desarrollo de software y código', currentLevel: 4, targetLevel: 4, priorityScore: 25.0, status: 'Fortaleza consolidada' },
];

export const PROTOTYPE_MODULES_TABLE9 = [
  {
    moduleNumber: '0',
    name: 'Inicio e Identidad Territorial',
    features: 'Presentación territorial del río Magdalena, identidad de marca AFRONEXIA, buscador general y acceso inmediato a NEXIA.',
    role: 'Punto de entrada accesible al ecosistema cultural y turístico.',
    tech: 'React, Hero visual, motor de búsqueda.',
  },
  {
    moduleNumber: '1',
    name: 'Explorador Cultural y Turístico',
    features: 'Catálogo visual de lugares con filtros (Espacio cultural, Sitio natural, Lugar histórico, Gastronomía); fichas con foto, horario y contacto.',
    role: 'Descubrir y consultar atractivos relacionados con la cultura afrodescendiente.',
    tech: 'Filtros dinámicos, renderizado de tarjetas, metadatos estructurados.',
  },
  {
    moduleNumber: '2',
    name: 'Memoria y Patrimonio',
    features: 'Archivo digital comunitario; saberes de gastronomía, música de tambores, medicina tradicional y oralidad; opción "Registrar mis saberes".',
    role: 'Preservar, documentar y transmitir la memoria cultural con reconocimiento al portador.',
    tech: 'Formulario de registro comunitario, categorización por saberes.',
  },
  {
    moduleNumber: '3',
    name: 'Agenda Cultural',
    features: 'Eventos organizados cronológicamente; filtros por Festival, Taller, Feria, Gastronómica y Patrimonial; organizador, fecha y mapa.',
    role: 'Centralizar y promover la programación cultural viva del territorio.',
    tech: 'Calendario reactivo, filtros temporales.',
  },
  {
    moduleNumber: '4',
    name: 'Talentos y Emprendimientos',
    features: 'Perfiles de emprendimientos, artesanos y cocineros tradicionales, categorías, responsables, ubicación, catálogo de productos y precios.',
    role: 'Integrar la dimensión económica y comercial de la comunidad afrodescendiente.',
    tech: 'Catálogo de emprendedores, contacto directo vía WhatsApp/teléfono.',
  },
  {
    moduleNumber: '5',
    name: 'Rutas Culturales',
    features: 'Itinerarios comunitarios, duración estimada, nivel de dificultad, paradas de recorrido y mapa georreferenciado interactivo.',
    role: 'Estructurar circuitos turísticos basados en memoria, río y territorio.',
    tech: 'Visualización geoespacial, cálculo de paradas y tiempos.',
  },
  {
    moduleNumber: '6',
    name: 'Experiencias Turísticas',
    features: 'Experiencias inmersivas con duración, cupo máximo, guía local certificado, tarifa y botón de reserva directa.',
    role: 'Convertir los saberes y atractivos en productos turísticos comercializables.',
    tech: 'Módulo de disponibilidad, gestión de cupos y contacto con guías.',
  },
  {
    moduleNumber: '7',
    name: 'Asistente Turístico Cultural (NEXIA)',
    features: 'Consultas en lenguaje natural en español colombiano, sugerencias rápidas, trazabilidad documental y generación de itinerarios personalizados.',
    role: 'Interfaz inteligente contextualizada que evita alucinaciones mediante arquitectura RAG.',
    tech: 'RAG, embeddings semánticos, pgvector, prompt engineering cultural.',
  },
  {
    moduleNumber: '8',
    name: 'Autenticación y Panel Administrativo',
    features: 'Inicio de sesión, gestión de roles (Administrador, Emprendedor, Gestor Cultural) y dashboard con indicadores de impacto y moderación.',
    role: 'Supervisar el ecosistema, proteger la calidad de los datos y empoderar a la comunidad.',
    tech: 'Control de acceso basado en roles (RBAC), métricas de uso.',
  },
];

export const BIBLIOGRAPHY_ITEMS = [
  {
    citation:
      'Anwar, M. S., Yang, J., Frnda, J., Choi, A., Baghaei, N., & Ali, M. (2025). Metaverse and XR for cultural heritage education: Applications, standards, architecture, and technological insights for enhanced immersive experience. Virtual Reality. https://doi.org/10.1007/s10055-025-01126-z',
    type: 'Artículo de Revista Q1',
    pages: 'p. 25, 27, 58',
  },
  {
    citation:
      'Gîrbacia, F. (2024). An analysis of research trends for using artificial intelligence in cultural heritage. Electronics, 13. https://doi.org/10.3390/electronics13183738',
    type: 'Revisión Sistemática',
    pages: 'p. 25, 59',
  },
  {
    citation:
      'Jwa, J. W. (2025). AI-based smart tourism service system and method. Patent Application KR1020250061233 A / WO 2025/089510 A1. Korean Intellectual Property Office & WIPO.',
    type: 'Patente Internacional',
    pages: 'p. 31, 33, 34',
  },
  {
    citation:
      'Koukopoulos, Z., Koukopoulos, D., & Fidas, C. (2026). AI-enhanced XR technologies for cultural heritage environments: A review of current solutions and future directions. Digital Applications in Archaeology and Cultural Heritage. https://doi.org/10.1016/j.daach.2026.e00565',
    type: 'Artículo de Revista',
    pages: 'p. 23, 29, 60',
  },
  {
    citation:
      'Liu, J., Xie, A., Duan, Y., & Wang, B. (2024). Artificial intelligence-based intangible cultural heritage map generation and representation method. Patent Application CN118708822 A. China National Intellectual Property Administration.',
    type: 'Patente Nacional',
    pages: 'p. 31, 33, 35',
  },
  {
    citation:
      'Ranjgar, B., Sadeghi-Niaraki, A., Shakeri, M., Rahimi, F., & Choi, S.-M. (2024). Cultural heritage information retrieval: Past, present, and future trends. IEEE Access. https://doi.org/10.1109/ACCESS.2024.3374769',
    type: 'Artículo IEEE',
    pages: 'p. 25, 28, 63',
  },
  {
    citation:
      'Sperlí, G. (2021). A cultural heritage framework using a deep learning based chatbot for supporting tourist journey. Expert Systems with Applications, 183, 115277. https://doi.org/10.1016/j.eswa.2021.115277',
    type: 'Artículo Fundacional',
    pages: 'p. 26, 28, 64',
  },
  {
    citation:
      'Suanpang, P., & Pothipassa, P. (2024). Integrating generative AI and IoT for sustainable smart tourism destinations. Sustainability, 16(17), 7435. https://doi.org/10.3390/su16177435',
    type: 'Artículo Consolidación',
    pages: 'p. 24, 27, 64',
  },
  {
    citation:
      'Wang, R., Zhang, X., Liu, Q., Su, J., Zhang, Y., & Ma, Y. (2026). Visual information identification and Q&A of intangible cultural heritage inheritors by using enhanced Graph-Retrieval framework. npj Heritage Science. https://doi.org/10.1038/s40494-026-02384-z',
    type: 'Artículo Frontera Nature',
    pages: 'p. 23, 29, 65',
  },
  {
    citation:
      'Ye, Z., Su, X., He, D., Zhang, Z., Sun, Y., Ji, J., Xie, X., Wang, J., Wei, R., Zhang, Y., Li, Y., & Chen, L. (2025). TourismMinds: A geo-augmented LLM framework for semantic-aware trajectory analytics and generation. Proceedings of the ACM. https://doi.org/10.1145/3770697',
    type: 'Conferencia ACM',
    pages: 'p. 24, 49, 65',
  },
];
