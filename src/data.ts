import { Question, Cycle, ProfileDetail, RIASECType } from './types';

// 1. PREGUNTAS IPSATIVAS (Escenarios de Acción)
export const questions: Question[] = [
  // REALISTA (R) - Tangibilidad, herramientas, físico
  { id: 1, type: 'R', text: "🛠️ Se rompe un aparato en casa. ¿Tu primer instinto es coger un destornillador y desmontarlo para ver las tripas antes de tirarlo?" },
  { id: 7, type: 'R', text: "🌲 ¿Te agobia la idea de trabajar 8 horas sentado frente a una pantalla y prefieres estar en movimiento, usando tus manos o al aire libre?" },
  { id: 13, type: 'R', text: "⚙️ Cuando montas un mueble, ¿pasas de leer las instrucciones largas y prefieres encajar las piezas guiándote por la lógica visual y el tacto?" },
  { id: 19, type: 'R', text: "🌱 ¿Disfrutas manchándote las manos, ya sea trasteando con el motor de una moto, cuidando un huerto o reparando algo físico?" },

  // INVESTIGADOR (I) - Lógica, análisis, descubrir el fallo
  { id: 2, type: 'I', text: "🔍 Si el wifi o el ordenador fallan, ¿te picas investigando en foros hasta encontrar la causa exacta del problema y solucionarlo tú mismo?" },
  { id: 8, type: 'I', text: "🧩 Ante un juego de estrategia o un rompecabezas complejo, ¿eres de los que analiza todas las variables antes de mover ficha?" },
  { id: 14, type: 'I', text: "💻 ¿Te da curiosidad saber qué hay detrás del código de una web, cómo funciona un virus o qué hace realmente un medicamento en el cuerpo?" },
  { id: 20, type: 'I', text: "📈 Cuando te cuentan algo increíble, ¿eres la persona del grupo que duda y busca los datos o las pruebas reales para comprobar si es verdad?" },

  // ARTÍSTICO (A) - Creación, estética, romper la norma
  { id: 3, type: 'A', text: "🎨 Tienes que entregar un trabajo. ¿Inviertes casi tanto tiempo en que el diseño, la tipografía y la portada sean brutales como en el propio texto?" },
  { id: 9, type: 'A', text: "🤲 ¿Sientes la necesidad de expresarte tuneando tu ropa, dibujando, moldeando materiales o creando cosas que no existían antes?" },
  { id: 15, type: 'A', text: "🖼️ ¿Te fijas en detalles que otros pasan por alto, como el encuadre de una peli, la combinación de colores de una tienda o el diseño de un logo?" },
  { id: 21, type: 'A', text: "🖌️ ¿Odias la rutina y hacer siempre lo mismo, prefiriendo entornos donde puedas aportar tu visión original y hacer las cosas a tu manera?" },

  // SOCIAL (S) - Empatía, cuidado, apoyo
  { id: 4, type: 'S', text: "💬 Si hay mal rollo o dos amigos se pelean, ¿eres tú quien media, los escucha por separado e intenta que hagan las paces?" },
  { id: 10, type: 'S', text: "🩹 ¿Te sale de forma natural cuidar de alguien cuando está enfermo o se siente solo, mostrándole paciencia genuina?" },
  { id: 16, type: 'S', text: "🤝 Si alguien en tu instituto lo está pasando mal o sufre injusticias, ¿sientes el impulso de acercarte y ofrecerle tu apoyo?" },
  { id: 22, type: 'S', text: "🏥 ¿Te imaginas trabajando en un entorno donde tu objetivo principal sea mejorar el día a día de personas mayores, niños o gente vulnerable?" },

  // EMPRENDEDOR (E) - Liderazgo, persuasión, acción
  { id: 5, type: 'E', text: "🚀 Nadie se decide para el fin de semana. ¿Eres quien toma el mando, propone el plan, convence a los demás y organiza los horarios?" },
  { id: 11, type: 'E', text: "🗣️ Si hay que quejarse por una nota injusta a un profesor, ¿eres tú quien da un paso al frente y habla en nombre de todo el grupo?" },
  { id: 17, type: 'E', text: "📱 ¿Tienes buen 'pico'? ¿Se te da bien negociar precios en Wallapop, convencer a la gente de tus ideas o vender un proyecto?" },
  { id: 23, type: 'E', text: "📣 ¿Te motivan los retos donde hay que competir, alcanzar objetivos rápidos o sacar adelante un negocio desde cero?" },

  // CONVENCIONAL (C) - Orden, detalle, estructura
  { id: 6, type: 'C', text: "📊 ¿Te da una paz mental enorme tener tus apuntes limpios, subrayados por colores y organizar tus carpetas del ordenador sin archivos sueltos?" },
  { id: 12, type: 'C', text: "📁 Cuando hay que hacer bote para un regalo, ¿eres tú quien lleva la cuenta exacta de quién ha pagado y quién falta, sin que se te escape un céntimo?" },
  { id: 18, type: 'C', text: "📋 ¿Prefieres trabajar siguiendo pautas muy claras, donde sepas exactamente qué se espera de ti paso a paso, sin improvisaciones?" },
  { id: 24, type: 'C', text: "📝 Tienes 'ojo de halcón' para los errores. ¿Eres capaz de detectar una falta de ortografía o un fallo en una lista de datos en cuestión de segundos?" }
];

// 2. PERFILES (Manifiestos Vocacionales)
export const profilesData: Record<RIASECType, ProfileDetail> = {
  R: {
    name: "Perfil Realista (El Motor Físico)",
    emoji: "🛠️",
    desc: "Tu cerebro necesita tangibilidad. No eres de quedarte viendo venir los problemas en una pizarra; tu inteligencia se activa cuando tienes herramientas, máquinas o elementos de la naturaleza entre las manos.",
    destrezas: "Facilidad para tareas físicas, sentido espacial brutal, entendimiento de mecanismos y reparación intuitiva de objetos.",
    sirve: "Para que el mundo siga girando. Si algo se rompe, tú lo arreglas. Si algo falta, tú lo montas.",
    ramas: "Mantenimiento Industrial, Informática de Hardware, Electromecánica, Instalaciones y Medio Natural."
  },
  I: {
    name: "Perfil Investigador (La Mente Analítica)",
    emoji: "🔍",
    desc: "Eres el escáner del grupo. Te encanta desmontar mentalmente los problemas para entender el 'porqué' oculto de las cosas. No te conformas con la superficie, necesitas llegar a la raíz lógica.",
    destrezas: "Habilidad analítica pura, resolución de problemas por descarte, diagnóstico preciso y comprensión de sistemas complejos.",
    sirve: "Para encontrar fallos que nadie más ve, ya sea en un código de programación, en una red informática o en el cuerpo humano.",
    ramas: "Sistemas Informáticos, Farmacia y Laboratorio, Asistencia Sanitaria Técnica, Calidad."
  },
  A: {
    name: "Perfil Artístico (El Rupturista Estético)",
    emoji: "🎨",
    desc: "Para ti las cosas no solo tienen que funcionar, tienen que transmitir algo. Detestas la monotonía y los trabajos robóticos. Tienes el don de ver oportunidades estéticas donde otros solo ven caos.",
    destrezas: "Originalidad desbordante, manipulación de colores/formas, pensamiento lateral y creación manual.",
    sirve: "Para dar identidad al mundo. Diseñar joyas, moldear cuero, crear marcas visuales o revolucionar la moda.",
    ramas: "Orfebrería Cordobesa, Artesanía en Cuero, Serigrafía, Confección y Moda, Preimpresión Digital."
  },
  S: {
    name: "Perfil Social (El Pilar Humano)",
    emoji: "🤝",
    desc: "Tienes un radar especial para las emociones ajenas. Tu energía vital aumenta cuando apoyas, escuchas o guías a los demás. En un mundo cada vez más frío, tu empatía es un talento altamente profesional.",
    destrezas: "Paciencia inagotable, escucha activa real, mediación en conflictos y cuidado físico-emocional.",
    sirve: "Para sostener a la sociedad. Eres el salvavidas en urgencias, el apoyo en residencias y el guía en educación.",
    ramas: "Atención a la Dependencia, Auxiliar de Enfermería, Emergencias Sanitarias, Animación Sociocultural."
  },
  E: {
    name: "Perfil Emprendedor (El Catalizador)",
    emoji: "🚀",
    desc: "Te mueve la adrenalina de activar proyectos. Tienes facilidad de palabra, te creces ante los retos y no te tiembla el pulso si tienes que poner a la gente de acuerdo para lograr un objetivo.",
    destrezas: "Persuasión cara a cara, liderazgo natural, resiliencia y cero miedo a proponer ideas audaces.",
    sirve: "Para hacer que las cosas sucedan. Gestionar ventas, abrir nuevos mercados, liderar rutas deportivas o crear startups.",
    ramas: "Actividades Comerciales, Guía de Turismo Activo (TECO), Marketing, Dirección de Equipos."
  },
  C: {
    name: "Perfil Convencional (El Arquitecto del Orden)",
    emoji: "📊",
    desc: "El caos te incomoda y el orden te da paz. Eres la persona que sostiene los cimientos de cualquier proyecto gracias a tu rigor. Sabes que sin una buena estructura, hasta la mejor idea se hunde.",
    destrezas: "Atención extrema al detalle, dominio de datos, sistematización infalible de tareas y precisión milimétrica.",
    sirve: "Para evitar el colapso. Controlar finanzas, gestionar la logística, certificar calidad o llevar la administración impecable.",
    ramas: "Gestión Administrativa, Preimpresión, Logística, Mecanizado de Precisión."
  }
};

// 3. BASE DE DATOS DE CICLOS (Optimizada para el motor de Sinergias)
export const cycles: Cycle[] = [
  // ARTE Y DISEÑO
  {
    id: "orfebreria",
    title: "Orfebrería y Platería Artística",
    center: "Escuela de Arte Dionisio Ortiz (EA)",
    category: "Arte",
    tags: ["A", "R"], // Artífice de lo Práctico
    gives: "Fundición, cincelado, modelado, sacado de fuego, microfusión cordobesa y tecnología digital aplicada en filigrana.",
    for: "Diseñar y materializar piezas únicas de joyería, platería fina o esculturas metálicas usando el saber histórico de Córdoba.",
    exits: "Trabajo en talleres del Parque Joyero, creación de tu propia firma de joyería artística, orfebre artesanal.",
    isArtSchool: true
  },
  {
    id: "cuero",
    title: "Artesanía en Cuero",
    center: "Escuela de Arte Mateo Inurria (EASD)",
    category: "Arte",
    tags: ["A", "R"], // Artífice de lo Práctico
    gives: "Diseño y despiece de cuero, repujado tradicional andaluz, teñidos de precisión, marroquinería fina y costura artesanal.",
    for: "Crear bolsos de alta costura, complementos de moda de piel o elementos decorativos que mezclan vanguardia y tradición.",
    exits: "Diseñador/a de marroquinería, artesano en talleres del cuero tradicionales, colaborador en marcas de calzado.",
    isArtSchool: true
  },
  {
    id: "serigrafia",
    title: "Serigrafía Artística",
    center: "Escuela de Arte Dionisio Ortiz (EA)",
    category: "Arte",
    tags: ["A", "R"], 
    gives: "Emulsionado y revelado de pantallas fotográficas, estampación textil, impresión manual sobre cerámica, metal o vidrio.",
    for: "Estampar diseños de autor en camisetas, lienzos, cartelería fina o tiradas de obras de arte independientes.",
    exits: "Técnico en talleres de serigrafía, diseñador de merchandising de autor, impresor textil artístico.",
    isArtSchool: true
  },
  {
    id: "confeccion",
    title: "Confección y Moda",
    center: "IES Trassierra",
    category: "Arte",
    tags: ["A", "R", "E"], // Incluye E porque a menudo crean su propia marca
    gives: "Corte de tejidos, patronaje por ordenador, confección a máquina industrial, acabados y arreglos de prendas.",
    for: "Diseñar, ensamblar y confeccionar ropa en serie o a medida con acabados profesionales de alta calidad.",
    exits: "Sastrería y modistería a medida, técnico de corte en fábricas, patronista, creador de tu propia firma textil."
  },

  // SALUD Y SOCIAL
  {
    id: "dependencia",
    title: "Atención a Personas en Situación de Dependencia",
    center: "IES Galileo Galilei / IES Averroes",
    category: "Salud",
    tags: ["S", "C"], // Gestor de Cuidados (requiere mucho orden en protocolos médicos)
    gives: "Intervención educativa, ocio adaptado, apoyo psicosocial, primeros auxilios y mantenimiento de autonomía personal.",
    for: "Dar una vida digna, activa y estructurada a ancianos, personas con TEA o diversidades funcionales.",
    exits: "Auxiliar en residencias geriátricas, mediador/a de integración en colegios públicos (NEE), ayuda a domicilio."
  },
  {
    id: "auxenfermeria",
    title: "Cuidados Auxiliares de Enfermería (TCAE)",
    center: "IES Mateo Inurria / IES Fuensanta",
    category: "Salud",
    tags: ["S", "I"], // Guía Analítico (Cuidado humano + protocolo hospitalario riguroso)
    gives: "Técnicas de higiene hospitalaria, alimentación artificial, toma de constantes vitales y asistencia clínica básica.",
    for: "Cuidar de forma cercana e instrumental al paciente de hospital o clínica, codo con codo con los médicos.",
    exits: "Trabajo en hospitales públicos (SAS), clínicas dentales privadas, mutuas, residencias."
  },
  {
    id: "farmacia",
    title: "Farmacia y Parafarmacia",
    center: "IES San Álvaro",
    category: "Salud",
    tags: ["I", "C", "S"], // Mucha precisión de datos (I+C) con trato al público (S)
    gives: "Dispensación de fármacos, fórmulas magistrales, nomenclatura médica, dermofarmacia y atención directa.",
    for: "Asesorar al vecindario sobre medicamentos y organizar con extrema precisión el almacén farmacológico.",
    exits: "Técnico en farmacia comunitaria, auxiliar en depósitos hospitalarios, tiendas de parafarmacia."
  },
  {
    id: "emergencias",
    title: "Emergencias Sanitarias",
    center: "IES Fuensanta",
    category: "Salud",
    tags: ["S", "R"], // Guía Técnico (Salvar vidas en situaciones físicas intensas)
    gives: "Soporte vital básico, traslado seguro, primeros auxilios psicológicos graves y logística de catástrofes.",
    for: "Llegar los primeros al lugar de un accidente, estabilizar al paciente y transportarlo con pericia técnica.",
    exits: "Conductor/a y camillero/a de ambulancias (SVB/UVI Móvil), operador/a del 112, técnico en Cruz Roja."
  },

  // TECNOLOGÍA E INFORMÁTICA
  {
    id: "smr",
    title: "Sistemas Microinformáticos y Redes (SMR)",
    center: "IES Gran Capitán / IES Trassierra",
    category: "Tecnología",
    tags: ["I", "R"], // Ingeniero de Campo
    gives: "Montaje de fuentes y placas, configuración de redes locales, sistemas operativos, seguridad y copias de seguridad.",
    for: "Solucionar la infraestructura física y lógica de ordenadores y redes de cualquier empresa cordobesa.",
    exits: "Técnico informático de soporte, instalador de redes, montador de PC, reparador físico de equipos."
  },
  {
    id: "preimpresion",
    title: "Preimpresión Digital",
    center: "IES Ángel de Saavedra",
    category: "Tecnología",
    tags: ["C", "A"], // Diseñador Metódico (Arte pero con software y parámetros técnicos exactos)
    gives: "Tratamiento con Photoshop, maquetación con InDesign, vectorización de logotipos y gestión de perfiles de color.",
    for: "Preparar matemáticamente todo el material digital e imágenes para que se impriman perfectas en máquinas offset.",
    exits: "Maquetador en editoriales, retocador fotográfico profesional, ajustador de packaging industrial."
  },

  // EMPRESA Y COMERCIO
  {
    id: "gestion",
    title: "Gestión Administrativa",
    center: "IES Góngora / IES Trassierra / IES Gran Capitán",
    category: "Empresa",
    tags: ["C", "E"], // Estratega Organizado
    gives: "Contabilidad básica, nóminas, ofimática PRO, atención digital al cliente y trámites fiscales.",
    for: "Sostener el motor burocrático y económico de cualquier empresa para que todo funcione sin problemas legales.",
    exits: "Auxiliar administrativo, contable de pymes, atención al público, secretariado institucional."
  },
  {
    id: "act_comerciales",
    title: "Actividades Comerciales / Escaparatismo",
    center: "IES Gran Capitán",
    category: "Empresa",
    tags: ["E", "A"], // Visionario del Mercado (Emprender con estética visual)
    gives: "Escaparatismo, marketing local, gestión de inventarios, técnicas de venta y comercio electrónico.",
    for: "Hacer atractivos los productos, diseñar pasillos estratégicos y convertir visitantes en compradores fieles.",
    exits: "Visual merchandiser, encargado/a de tienda, creador/a de E-Commerce, representante comercial."
  },
  {
    id: "natural",
    title: "Guía en el Medio Natural y de Tiempo Libre (TECO)",
    center: "IES López Neyra",
    category: "Empresa",
    tags: ["E", "R", "S"], // Emprendimiento físico liderando grupos
    gives: "Técnicas de equitación elemental, conducción de ciclistas, progresión sobre roca y dinámicas de grupo.",
    for: "Liderar rutas físicas seguras a caballo o en bicicleta por la Sierra de Córdoba guiando a jóvenes o turistas.",
    exits: "Monitor de turismo activo, guía de senderos, animador socio-deportivo, creador de rutas."
  },
  {
    id: "cocina",
    title: "Cocina y Gastronomía",
    center: "IES Gran Capitán",
    category: "Empresa",
    tags: ["R", "A", "E"], // Execution manual con arte y gestión de comandas
    gives: "Preelaboración y conservación, técnicas clásicas/fusión, repostería cordobesa e higiene alimentaria.",
    for: "Llevar los fogones de un restaurante con maestría, resistiendo la presión del servicio y controlando la calidad.",
    exits: "Cocinero/a profesional, jefe/a de partida, técnico en catering, repostero artesanal."
  },

  // INDUSTRIA Y MOTOR
  {
    id: "electromecanica",
    title: "Electromecánica de Vehículos Automóviles",
    center: "IES Zoco",
    category: "Industria",
    tags: ["R", "I"], // Ingeniero de Campo
    gives: "Motores térmicos, sistemas de transmisión, diagnosis computarizada del coche y reparación eléctrica.",
    for: "Diagnosticar anomalías mediante software y desarmar el bloque motor físico para que el vehículo vuelva a rodar.",
    exits: "Mecánico de automóviles/camiones en talleres oficiales, técnico de ITV, especialista en diagnosis electrónica."
  },
  {
    id: "mecanizado",
    title: "Mecanizado de Precisión",
    center: "IES Maimónides",
    category: "Industria",
    tags: ["R", "C"], // Técnico Preciso (Trabajo manual pero sujeto a métricas de micras)
    gives: "Tornos, fresadoras manuales, programación numérica computarizada (CNC), soldadura y metrología.",
    for: "Fabricar piezas metálicas milimétricas basándote en planos técnicos detallados donde un error arruina el lote.",
    exits: "Tornero/a fresador/a, operario CNC en la industria metalúrgica, matricero, control de calidad dimensional."
  },
  {
    id: "electricidad",
    title: "Instalaciones Eléctricas y Automáticas",
    center: "IES Maimónides / IES Fuensanta",
    category: "Industria",
    tags: ["R", "I"], 
    gives: "Esquemas de viviendas, montaje de cuadros automáticos, domótica, antenas y placas solares.",
    for: "Dotar de energía y redes eléctricas robustas y eficientes a los hogares e industrias desde la lógica de los circuitos.",
    exits: "Electricista autorizado, instalador de energía solar, técnico en domótica, mantenedor de edificios."
  },
  {
    id: "carroceria",
    title: "Carrocería de Vehículos",
    center: "IES Zoco",
    category: "Industria",
    tags: ["R", "A"], // Artífice de lo Práctico (Chapa, pero con masillado y pintado estético)
    gives: "Desabollado de chapas, bancadas de chasis, soldadura MIG, masillado fino y pintado aerográfico.",
    for: "Rehacer la estructura y embellecer la piel exterior de coches tras un impacto para dejarlos como salidos de fábrica.",
    exits: "Pintor/a y chapista de vehículos, técnico en aerografía, perito estimador de daños para seguros."
  }
];
