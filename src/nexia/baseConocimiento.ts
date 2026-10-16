/**
 * Base_Conocimiento_AFRONEXIA_v1 — Barrancabermeja (Santander)
 *
 * Registros con la estructura de la tabla `ofertas_culturales` (ver
 * database/01_adaptar_base_conocimiento.sql). Cada registro cita su fuente web,
 * la fecha de la fuente y un estado de verificación.
 *
 * Los campos del bloque "planificación" (zona, apto_ninos, bano, tinto, momento…)
 * no existen como columnas en la tabla: al cargarlos a PostgreSQL se guardan dentro
 * de `etiquetas` con el formato clave:valor (ej. "bano:piscina", "ninos:si").
 *
 * Fecha de compilación y verificación: 15 de octubre de 2026.
 */

export type RelacionAfro = 'directa' | 'contextual' | 'sin_relacion';
export type EstadoVerificacion = 'verificado_en_fuente' | 'requiere_confirmacion' | 'alerta_vigente';
export type TipoBano = 'piscina' | 'pozo_natural' | 'parque_acuatico' | 'no_recomendado' | 'ninguno';
export type Momento = 'manana' | 'mediodia' | 'tarde' | 'atardecer' | 'noche' | 'dia_completo';
export type DiaTematico = 'ciudad_rio' | 'cienagas_agua' | 'excursion' | 'cultura_afro';

export interface OfertaCultural {
  // --- Columnas de ofertas_culturales ---
  id_conocimiento: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  municipio: string;
  departamento: string;
  etiquetas: string[];
  relacion_afro: RelacionAfro;
  nota_relacion_afro?: string;
  fuente_entidad: string;
  fuente_titulo: string;
  fecha_fuente: string | null; // YYYY-MM-DD (null si la fuente no publica fecha)
  fuente_url: string;
  estado_verificacion: EstadoVerificacion;
  fecha_verificacion: string; // YYYY-MM-DD

  // --- Planificación (se serializa en etiquetas al cargar a la BD) ---
  zona: string;
  tiempo_desde_centro?: string;
  apto_ninos: boolean;
  bano: TipoBano;
  tinto?: boolean;
  momento: Momento[];
  dia_tematico?: DiaTematico;
  direccion?: string;
  horario?: string;
  costo?: string;
  contacto?: string;
  seguridad?: string;
  confirmar?: string;
}

const VERIFICADO = '2026-10-15';
const BCA = 'Barrancabermeja';
const SANT = 'Santander';

export const BASE_CONOCIMIENTO: OfertaCultural[] = [
  // ───────────────────────── Ciudad y río ─────────────────────────
  {
    id_conocimiento: 'BCA-ATR-001',
    nombre: 'Malecón y Cristo Petrolero (Ciénaga Miramar)',
    categoria: 'atractivo',
    descripcion:
      'Escultura de unos 26 m y 20 toneladas que emerge del agua de la ciénaga Miramar, frente a la refinería; se ilumina de noche. El malecón tiene un sendero peatonal empedrado con figuras metálicas y es ideal para caminar y ver el atardecer.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['malecón', 'mirador', 'atardecer', 'paseo', 'fotografía', 'río magdalena', 'ciénaga miramar'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-un-viaje-inolvidable-a-orillas-del-magdalena-3486599',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Centro – ciénaga Miramar', tiempo_desde_centro: 'en el casco urbano',
    apto_ninos: true, bano: 'ninguno', momento: ['atardecer', 'noche'], dia_tematico: 'ciudad_rio',
    costo: 'Acceso libre',
  },
  {
    id_conocimiento: 'BCA-ATR-002',
    nombre: 'Museo peatonal de fauna nativa del río Yuma',
    categoria: 'atractivo',
    descripcion:
      'Museo al aire libre con esculturas de animales de la región (pumas, iguanas, garzas, tortugas, chigüiros) del maestro Lombana. Recorrido a pie atractivo para niños y para observadores de aves.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['niños', 'esculturas', 'fauna', 'aire libre', 'gratis', 'aves'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja',
    fuente_titulo: '¿Qué hay pa’ hacer?',
    fecha_fuente: '2021-05-24',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/1227/que-hay-pa-hacer/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Avenida del Ferrocarril', tiempo_desde_centro: 'en el casco urbano',
    apto_ninos: true, bano: 'ninguno', momento: ['manana', 'tarde'], dia_tematico: 'ciudad_rio',
    direccion: 'Avenida del Ferrocarril', costo: 'Acceso libre',
  },
  {
    id_conocimiento: 'BCA-ATR-003',
    nombre: 'Parque a la Vida',
    categoria: 'atractivo',
    descripcion:
      'Parque con juegos, zonas verdes, restaurantes y bares de cocina local e internacional (barrios Colombia y El Recreo). Punto de salida de la tradicional chiva rumbera.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['parque', 'juegos infantiles', 'restaurantes', 'cena', 'familia'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja / El Tiempo',
    fuente_titulo: '¿Qué hay pa’ hacer? · Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/1227/que-hay-pa-hacer/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrios Colombia y El Recreo', tiempo_desde_centro: 'en el casco urbano',
    apto_ninos: true, bano: 'ninguno', momento: ['tarde', 'noche'], dia_tematico: 'ciudad_rio',
  },
  {
    id_conocimiento: 'BCA-ATR-004',
    nombre: 'Museo del Petróleo',
    categoria: 'atractivo',
    descripcion:
      'Fundado en 1984. Recorre la historia de la extracción y refinación del petróleo con mapas, maquetas, fotografías, maquinaria antigua y salas interactivas (unas 450 piezas).',
    municipio: BCA, departamento: SANT,
    etiquetas: ['museo', 'historia', 'petróleo', 'educativo', 'bajo techo'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja / Turismo enColombia',
    fuente_titulo: '¿Qué hay pa’ hacer?',
    fecha_fuente: '2021-05-24',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/1227/que-hay-pa-hacer/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja',
    apto_ninos: true, bano: 'ninguno', momento: ['manana'], dia_tematico: 'ciudad_rio',
    confirmar: 'Las fuentes no publican dirección ni horario: confirmar antes de ir.',
  },
  {
    id_conocimiento: 'BCA-ATR-005',
    nombre: 'Puente Guillermo Gaviria Correa (Barrancabermeja–Yondó)',
    categoria: 'atractivo',
    descripcion: 'Puente sobre el río Magdalena que une Santander con Antioquia; reconocido por sus atardeceres.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['puente', 'atardecer', 'río magdalena', 'fotografía'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Weekend Santander',
    fuente_titulo: 'Barrancabermeja, la ciudad y el río',
    fecha_fuente: '2023-12-21',
    fuente_url: 'https://weekendsantander.com/blog/barrancabermeja-santander-que-hacer/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Río Magdalena', apto_ninos: true, bano: 'ninguno', momento: ['atardecer'], dia_tematico: 'ciudad_rio',
  },
  {
    id_conocimiento: 'BCA-ATR-006',
    nombre: 'Corregimiento El Centro (primer pozo petrolero)',
    categoria: 'atractivo',
    descripcion:
      'A unos 20 minutos en carro hacia el sur. Allí se perforó el primer pozo petrolero del país (La Cira-Infantas, 1918). Tiene restaurantes campestres con bocachico, bagre y cortes de res y cabro.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['historia', 'petróleo', 'restaurante campestre', 'almuerzo', 'bocachico'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-un-viaje-inolvidable-a-orillas-del-magdalena-3486599',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Sur del distrito', tiempo_desde_centro: '20 min en carro',
    apto_ninos: true, bano: 'ninguno', momento: ['mediodia'], dia_tematico: 'cultura_afro',
  },

  // ───────────────────────── Cultura afro y festivales ─────────────────────────
  {
    id_conocimiento: 'BCA-AFR-001',
    nombre: 'Paseo de la Cultura',
    categoria: 'cultura_afro',
    descripcion:
      'Parque dedicado a la música de bandas pelayeras, la cumbia y el porro, con tres templetes y una estatua de mujer afrocolombiana. Sede del Festival Nacional de Bandas Folclóricas (abril) y de tradiciones como la Pollera Colorá, María Varilla, Arrancatetas y Vaca Vieja.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['cultura', 'música', 'bandas', 'cumbia', 'estatua mujer afro', 'gratis'],
    relacion_afro: 'directa',
    nota_relacion_afro: 'Incluye una estatua de mujer afrocolombiana y homenajea músicas de raíz afro-caribe (cumbia, porro).',
    fuente_entidad: 'Weekend Santander / Alcaldía Distrital de Barrancabermeja',
    fuente_titulo: 'Barrancabermeja, la ciudad y el río · ¿Qué hay pa’ hacer?',
    fecha_fuente: '2023-12-21',
    fuente_url: 'https://weekendsantander.com/blog/barrancabermeja-santander-que-hacer/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrio Galán, Avenida 60', tiempo_desde_centro: 'en el casco urbano',
    apto_ninos: true, bano: 'ninguno', momento: ['manana', 'tarde'], dia_tematico: 'ciudad_rio',
    direccion: 'Barrio Galán, Avenida 60', costo: 'Acceso libre',
  },
  {
    id_conocimiento: 'BCA-AFR-002',
    nombre: 'Festival de Tamboras',
    categoria: 'festival',
    descripcion: 'Festival de tamboras y folclor colombiano que se realiza en marzo.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['festival', 'tambora', 'música tradicional', 'marzo'],
    relacion_afro: 'directa',
    nota_relacion_afro: 'La tambora es una tradición musical de raíz afro del río Magdalena.',
    fuente_entidad: 'Turismo enColombia',
    fuente_titulo: 'Barrancabermeja: guía de turismo completa',
    fecha_fuente: null,
    fuente_url: 'https://turismo.encolombia.com/barrancabermeja/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja', apto_ninos: true, bano: 'ninguno', momento: ['noche'],
    confirmar: 'Confirmar fechas exactas de la edición del año.',
  },
  {
    id_conocimiento: 'BCA-AFR-003',
    nombre: 'Festival Nacional de Bandas Folclóricas',
    categoria: 'festival',
    descripcion: 'Se realiza en abril en el Paseo de la Cultura; reconocido como patrimonio cultural y artístico de la Nación.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['festival', 'bandas', 'abril', 'patrimonio'],
    relacion_afro: 'contextual',
    nota_relacion_afro: 'Las bandas pelayeras interpretan porro y cumbia, géneros de raíz afro-caribe.',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja',
    fuente_titulo: '¿Qué hay pa’ hacer?',
    fecha_fuente: '2021-05-24',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/1227/que-hay-pa-hacer/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Paseo de la Cultura', apto_ninos: true, bano: 'ninguno', momento: ['noche'],
  },
  {
    id_conocimiento: 'BCA-AFR-004',
    nombre: 'Parque del Cacique Pipatón y Yarima',
    categoria: 'atractivo',
    descripcion: 'Monumento al cacique Pipatón (líder yariguí). En el parque hay comida típica y artesanías.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['monumento', 'artesanías', 'comida típica', 'historia indígena'],
    relacion_afro: 'sin_relacion',
    nota_relacion_afro: 'Patrimonio indígena yariguí; útil para contextualizar la diversidad étnica del territorio.',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-un-viaje-inolvidable-a-orillas-del-magdalena-3486599',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja', apto_ninos: true, bano: 'ninguno', momento: ['tarde'], dia_tematico: 'cultura_afro',
  },

  // ───────────────────────── Ciénagas y río ─────────────────────────
  {
    id_conocimiento: 'BCA-NAT-001',
    nombre: 'Ciénaga San Silvestre',
    categoria: 'naturaleza',
    descripcion:
      'A unos 15 minutos al norte. Principal espejo de agua del Magdalena Medio y fuente del agua potable de la ciudad; hábitat del manatí antillano, chigüiros, babillas y unas 71 especies de aves. Tiene clubes náuticos, balnearios y restaurantes; se practican esquí acuático, jet ski y paseos en lancha.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['ciénaga', 'lancha', 'esquí acuático', 'aves', 'manatí', 'naturaleza'],
    relacion_afro: 'contextual',
    nota_relacion_afro: 'Territorio de pesca artesanal ribereña del Magdalena Medio.',
    fuente_entidad: 'El Tiempo / Weekend Santander / El Frente',
    fuente_titulo: 'Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-un-viaje-inolvidable-a-orillas-del-magdalena-3486599',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Norte – San Silvestre', tiempo_desde_centro: '15 min',
    apto_ninos: true, bano: 'no_recomendado', momento: ['manana', 'tarde'], dia_tematico: 'cienagas_agua',
    seguridad:
      'No bañarse en aguas abiertas de la ciénaga: es fuente de agua potable, hay babillas (en febrero de 2026 se trasladaron allí babillas adultas) y no hay salvavidas. En lancha, todos con chaleco salvavidas.',
  },
  {
    id_conocimiento: 'BCA-NAT-002',
    nombre: 'Corregimiento El Llanito (pueblo de pescadores)',
    categoria: 'naturaleza',
    descripcion:
      'Pueblo de pescadores a unos 30 minutos del casco urbano, frente a la ciénaga. Murales, tejido de atarraya, paseos en chalupa hacia La Isla de los Mangos e Isla del Amor, y platos de bocachico frito o sudado y caldos de pescado. Los visitantes disfrutan el café viendo el atardecer sobre la ciénaga.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['pescadores', 'bocachico', 'almuerzo', 'chalupa', 'atardecer', 'murales', 'tinto al atardecer'],
    relacion_afro: 'contextual',
    nota_relacion_afro: 'Cultura anfibia y de pesca artesanal ribereña del Magdalena Medio, con saberes compartidos por comunidades afro del río.',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja / Tripadvisor',
    fuente_titulo: 'Corregimiento El Llanito · Opiniones sobre El Llanito',
    fecha_fuente: '2020-11-05',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/343/corregimiento-el-llanito/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Norte – El Llanito', tiempo_desde_centro: '30 min',
    apto_ninos: true, bano: 'no_recomendado', tinto: true, momento: ['mediodia', 'atardecer'], dia_tematico: 'cienagas_agua',
    costo: 'Un plato de pescado ronda los $30.000 según reseñas (Tripadvisor)',
    seguridad: 'Disfrutar la ciénaga desde la orilla o en chalupa con chaleco; no es zona de baño para niños.',
  },
  {
    id_conocimiento: 'BCA-NAT-003',
    nombre: 'Ciénaga de San Rafael de Chucurí (paseo comunitario en chalupa)',
    categoria: 'naturaleza',
    descripcion:
      'A unos 40–45 minutos por el río desde el puerto Yuma. Un proyecto comunitario de pescadores ofrece recorridos por los caños para ver aves y micos, el contraste de aguas claras y negras, presenciar una faena de pesca y probar empanadas de bocachico seco.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['chalupa', 'turismo comunitario', 'pescadores', 'aves', 'micos', 'empanadas de bocachico'],
    relacion_afro: 'contextual',
    nota_relacion_afro: 'Turismo comunitario de pescadores ribereños; saberes de pesca y cocina de río.',
    fuente_entidad: 'El Tiempo / Weekend Santander',
    fuente_titulo: 'Barrancabermeja, un destino natural más allá del petróleo',
    fecha_fuente: '2022-01-15',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-planes-turisticos-y-naturales-645045',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Río Magdalena – puerto Yuma', tiempo_desde_centro: '40–45 min en chalupa',
    apto_ninos: true, bano: 'no_recomendado', momento: ['manana'], dia_tematico: 'cultura_afro',
    seguridad: 'Chaleco salvavidas obligatorio para todos, en especial los niños. Consultar el nivel del río antes de salir.',
    confirmar: 'Confirmar operador, horario y tarifa en el puerto Yuma (terminal en remodelación según El Tiempo, 2025).',
  },
  {
    id_conocimiento: 'BCA-NAT-004',
    nombre: 'Ruta de los micos (recorrido fluvial)',
    categoria: 'naturaleza',
    descripcion: 'Recorrido en lancha desde el sector La Represa para ver micos aulladores rojos, nutrias y, a veces, manatíes.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['lancha', 'fauna', 'micos', 'nutrias', 'manatí', 'niños'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-un-viaje-inolvidable-a-orillas-del-magdalena-3486599',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Sector La Represa', apto_ninos: true, bano: 'no_recomendado', momento: ['manana'], dia_tematico: 'cultura_afro',
    seguridad: 'Chaleco salvavidas para todos.',
    confirmar: 'Confirmar operador y horario de salida.',
  },

  // ───────────────────────── Dónde bañarse ─────────────────────────
  {
    id_conocimiento: 'BCA-REC-001',
    nombre: 'CAFABA – Sede Recreacional José Joaquín Bohórquez',
    categoria: 'recreacion_acuatica',
    descripcion:
      'Centro recreativo natural de la Caja de Compensación Familiar de Barrancabermeja junto a la ciénaga San Silvestre, con piscina, actividades acuáticas y deportivas, restaurante y espacios para paseos en familia.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['piscina', 'niños', 'familia', 'bañarse', 'restaurante', 'san silvestre'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'CAFABA',
    fuente_titulo: 'Sede recreacional José Joaquín Bohórquez',
    fecha_fuente: '2026-10-15',
    fuente_url: 'https://www.cafaba.com.co/recreacion/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Vía a El Llanito, vereda San Silvestre', tiempo_desde_centro: '10–15 min',
    apto_ninos: true, bano: 'piscina', momento: ['dia_completo'], dia_tematico: 'cienagas_agua',
    direccion: 'Vía El Llanito, vereda San Silvestre',
    horario: 'Mar–vie 8:00–16:30 (piscina 9:00–16:00); sáb, dom y festivos 8:00–17:00 (piscina 9:00–16:30). Lunes cerrado (si el lunes es festivo, cierra el martes).',
    contacto: 'PBX (607) 611 8230 · Cel. 317 423 0387 · sederecreacional@cafaba.com.co',
    confirmar: 'La página no publica tarifas ni si admite no afiliados: llamar antes de ir.',
  },
  {
    id_conocimiento: 'BCA-REC-002',
    nombre: 'Club Miramar – Sede campestre',
    categoria: 'recreacion_acuatica',
    descripcion: 'Sede campestre a unos 20 minutos, sobre la ciénaga San Silvestre, con juegos acuáticos e infantiles, paseos en lancha, servicio de comida y parapente.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['club', 'juegos acuáticos', 'niños', 'lancha', 'comida'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja',
    fuente_titulo: '¿Qué hay pa’ hacer?',
    fecha_fuente: '2021-05-24',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/1227/que-hay-pa-hacer/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Norte – San Silvestre', tiempo_desde_centro: '20 min',
    apto_ninos: true, bano: 'piscina', momento: ['dia_completo'], dia_tematico: 'cienagas_agua',
    confirmar: 'Es un club: confirmar si permite el ingreso de visitantes no socios y la tarifa.',
  },
  {
    id_conocimiento: 'BCA-REC-003',
    nombre: 'Club Infantas',
    categoria: 'recreacion_acuatica',
    descripcion: 'Club con piscinas olímpica y semiolímpica, toboganes, zonas de juegos infantiles, restaurantes, canchas, patinódromo y gimnasio.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['club', 'piscina', 'toboganes', 'niños', 'bañarse'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Alcaldía Distrital de Barrancabermeja',
    fuente_titulo: '¿Qué hay pa’ hacer?',
    fecha_fuente: '2021-05-24',
    fuente_url: 'https://www.barrancabermeja.gov.co/publicaciones/1227/que-hay-pa-hacer/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja', apto_ninos: true, bano: 'piscina', momento: ['dia_completo'], dia_tematico: 'cienagas_agua',
    confirmar: 'Es un club: confirmar condiciones de ingreso para visitantes.',
  },
  {
    id_conocimiento: 'BCA-REC-004',
    nombre: 'Parque del Agua de Barrancabermeja',
    categoria: 'recreacion_acuatica',
    descripcion:
      'Parque público con piscina de olas (la más grande del país según la Alcaldía), piscina infantil y zonas de juegos, a cargo de INDERBA. La obra estuvo años en construcción y suspendida; en abril de 2025 seguía en intervención.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['parque acuático', 'piscina de olas', 'piscina infantil', 'niños'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Semana / Telepetróleo / El Tiempo',
    fuente_titulo: 'Santander logró sacar del limbo una emblemática construcción en Barrancabermeja',
    fecha_fuente: '2025-04-09',
    fuente_url: 'https://www.semana.com/mejor-colombia/articulo/esta-obra-que-barrancabermeja-daba-por-perdida-volvio-a-la-vida-cuanto-le-costo-a-santander-rescatarla/202547/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja', apto_ninos: true, bano: 'parque_acuatico', momento: ['dia_completo'],
    confirmar: 'No encontramos confirmación de su apertura al público: verificar con INDERBA antes de planear la visita.',
  },

  // ───────────────────────── Excursiones (pozos y parque acuático) ─────────────────────────
  {
    id_conocimiento: 'SVC-EXC-001',
    nombre: 'Piscinas naturales de San Vicente de Chucurí (vereda Cantarranas)',
    categoria: 'excursion',
    descripcion:
      'Pozos naturales en una finca a 8 km (unos 15 min) del casco urbano de San Vicente de Chucurí, por la vía hacia la vereda Cantarranas. Clima de 20 a 27 °C; el plan es bañarse todo el día. El cuidandero ofrece comida (precio a convenir).',
    municipio: 'San Vicente de Chucurí', departamento: SANT,
    etiquetas: ['pozo natural', 'bañarse', 'paseo de olla', 'naturaleza', 'excursión'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Senderismo Colombia',
    fuente_titulo: 'Piscinas naturales en San Vicente de Chucurí',
    fecha_fuente: '2019-06-21',
    fuente_url: 'https://senderismocol.com/ecoturismo/santander/piscinas-naturales/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'San Vicente de Chucurí', tiempo_desde_centro: 'excursión de día completo por carretera; calcular el trayecto antes de salir',
    apto_ninos: true, bano: 'pozo_natural', momento: ['dia_completo'], dia_tematico: 'excursion',
    costo: '$2.000 por persona (dato de 2019)',
    seguridad: 'Pozo natural sin salvavidas: niños siempre al alcance de un adulto y con flotador o chaleco; no entrar si llovió y baja creciente.',
    confirmar: 'Fuente de 2019: confirmar que sigue abierto, el costo y la profundidad.',
  },
  {
    id_conocimiento: 'SVC-EXC-002',
    nombre: 'Cueva de los Aviones (San Vicente de Chucurí)',
    categoria: 'excursion',
    descripcion: 'Recorrido entre toboganes naturales, cascadas, pozos y cuevas en la vereda Cantarranas, con torrentismo. Dificultad media; se recomienda operador certificado y calzado con buen agarre.',
    municipio: 'San Vicente de Chucurí', departamento: SANT,
    etiquetas: ['aventura', 'cascadas', 'pozos', 'torrentismo', 'guía'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un destino natural más allá del petróleo',
    fecha_fuente: '2022-01-15',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-planes-turisticos-y-naturales-645045',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'San Vicente de Chucurí', apto_ninos: false, bano: 'pozo_natural', momento: ['dia_completo'], dia_tematico: 'excursion',
    seguridad: 'Dificultad media: no recomendado para niños pequeños. Ir solo con guía certificado.',
  },
  {
    id_conocimiento: 'BET-EXC-001',
    nombre: 'Parque Acuático Los Trinitarios (Comfenalco Santander)',
    categoria: 'excursion',
    descripcion:
      'Parque acuático en Betulia, frente al embalse de Topocoro, inaugurado en abril de 2026; el más grande del oriente colombiano según sus operadores. Tiene la zona Aquakids para los más pequeños con juegos interactivos, chorros y toboganes.',
    municipio: 'Betulia', departamento: SANT,
    etiquetas: ['parque acuático', 'niños', 'toboganes', 'aquakids', 'topocoro', 'excursión'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Vanguardia / Metropolitano',
    fuente_titulo: 'Conozca las atracciones del Parque Acuático Los Trinitarios',
    fecha_fuente: '2026-04-25',
    fuente_url: 'https://www.vanguardia.com/santander/2026/04/25/conozca-las-atracciones-del-parque-acuatico-los-trinitarios-el-mas-grande-del-oriente-colombiano/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Betulia – embalse de Topocoro', tiempo_desde_centro: 'menos de 90 min por carretera',
    apto_ninos: true, bano: 'parque_acuatico', momento: ['dia_completo'], dia_tematico: 'excursion',
    confirmar: 'Las fuentes no publican tarifas ni horarios: consultar en comfenalcosantander.com.co.',
  },
  {
    id_conocimiento: 'BET-EXC-002',
    nombre: 'Embalse de Topocoro',
    categoria: 'excursion',
    descripcion: 'Embalse con islas y vegetación; kayak, paddle board, jet ski, wakeboard y lanchas hacia cascadas; cabañas, glamping y restaurantes.',
    municipio: 'Betulia', departamento: SANT,
    etiquetas: ['embalse', 'lancha', 'kayak', 'cascadas', 'excursión'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un viaje inolvidable a orillas del Magdalena',
    fecha_fuente: '2025-09-02',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-un-viaje-inolvidable-a-orillas-del-magdalena-3486599',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Betulia', apto_ninos: true, bano: 'no_recomendado', momento: ['tarde'], dia_tematico: 'excursion',
    seguridad: 'Actividades acuáticas siempre con chaleco y con operador.',
  },

  // ───────────────────────── Comida ─────────────────────────
  {
    id_conocimiento: 'BCA-GAS-001',
    nombre: 'Cocina ribereña de Barrancabermeja',
    categoria: 'gastronomia',
    descripcion:
      'Platos típicos: bocachico y bagre (frito, sudado o frito-sudado), cachama, doncella, sancocho, cazuela, patacones con suero, arroz con coco, tamales de arroz, bollos y dulces de mango, fríjol y ñame.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['gastronomía', 'bocachico', 'bagre', 'sancocho', 'arroz con coco', 'dulces'],
    relacion_afro: 'contextual',
    nota_relacion_afro: 'Cocina de río con técnicas y productos compartidos con comunidades afro del Magdalena (arroz con coco, bollos, pescado de río).',
    fuente_entidad: 'Weekend Santander / El Tiempo',
    fuente_titulo: 'Barrancabermeja, la ciudad y el río',
    fecha_fuente: '2023-12-21',
    fuente_url: 'https://weekendsantander.com/blog/barrancabermeja-santander-que-hacer/',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja', apto_ninos: true, bano: 'ninguno', momento: ['mediodia'],
  },
  {
    id_conocimiento: 'BCA-GAS-002',
    nombre: 'Muelle Comida – Mirador',
    categoria: 'gastronomia',
    descripcion: 'Punto de comida y mirador junto al río: bocachico frito-sudado, arroz con coco y patacones con suero.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['almuerzo', 'mirador', 'río', 'bocachico', 'arroz con coco'],
    relacion_afro: 'contextual',
    fuente_entidad: 'Weekend Santander',
    fuente_titulo: 'Barrancabermeja, la ciudad y el río',
    fecha_fuente: '2023-12-21',
    fuente_url: 'https://weekendsantander.com/blog/barrancabermeja-santander-que-hacer/',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Ribera del río Magdalena', apto_ninos: true, bano: 'ninguno', momento: ['mediodia'], dia_tematico: 'ciudad_rio',
    confirmar: 'La fuente no da dirección exacta.',
  },
  {
    id_conocimiento: 'BCA-GAS-003',
    nombre: 'Restaurante Isla de los Mangos (El Llanito)',
    categoria: 'gastronomia',
    descripcion: 'Restaurante de cocina caribeña/latina cerca de El Llanito; calificación 3,7/5 con 3 reseñas en Tripadvisor.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['almuerzo', 'pescado', 'el llanito'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Tripadvisor',
    fuente_titulo: 'El Llanito – restaurantes cercanos',
    fecha_fuente: '2026-10-15',
    fuente_url: 'https://www.tripadvisor.com/Attraction_Review-g1594789-d10604777-Reviews-El_Llanito-Barrancabermeja_Santander_Department.html',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Norte – El Llanito', apto_ninos: true, bano: 'ninguno', momento: ['mediodia'], dia_tematico: 'cienagas_agua',
  },
  {
    id_conocimiento: 'BCA-GAS-004',
    nombre: 'Estadero Puerto Libre de la Familia Polanco (El Llanito)',
    categoria: 'gastronomia',
    descripcion: 'Estadero familiar listado junto a El Llanito (sin calificación publicada).',
    municipio: BCA, departamento: SANT,
    etiquetas: ['almuerzo', 'estadero', 'el llanito', 'familia'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Tripadvisor',
    fuente_titulo: 'El Llanito – restaurantes cercanos',
    fecha_fuente: '2026-10-15',
    fuente_url: 'https://www.tripadvisor.com/Attraction_Review-g1594789-d10604777-Reviews-El_Llanito-Barrancabermeja_Santander_Department.html',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Norte – El Llanito', apto_ninos: true, bano: 'ninguno', momento: ['mediodia'], dia_tematico: 'cienagas_agua',
  },
  {
    id_conocimiento: 'BCA-GAS-005',
    nombre: 'La Cazuela',
    categoria: 'gastronomia',
    descripcion: 'Restaurante recomendado para platos regionales, en especial la cazuela de bagre.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['almuerzo', 'cena', 'cazuela de bagre', 'comida regional'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'El Tiempo',
    fuente_titulo: 'Barrancabermeja, un destino natural más allá del petróleo',
    fecha_fuente: '2022-01-15',
    fuente_url: 'https://www.eltiempo.com/vida/viajar/barrancabermeja-planes-turisticos-y-naturales-645045',
    estado_verificacion: 'requiere_confirmacion',
    fecha_verificacion: VERIFICADO,
    zona: 'Barrancabermeja', apto_ninos: true, bano: 'ninguno', momento: ['mediodia', 'noche'], dia_tematico: 'ciudad_rio',
    confirmar: 'Fuente de 2022: confirmar que sigue abierto y su dirección.',
  },

  // ───────────────────────── Dónde tomar un buen tinto ─────────────────────────
  {
    id_conocimiento: 'BCA-CAF-001',
    nombre: 'Criba 18 Café',
    categoria: 'cafe',
    descripcion:
      'Café de especialidad con desayunos; 4,5/5 en Tripadvisor ("buen café", "un lugar único"). Carta: americano, espresso doble, café campesino con panela, clavo y canela, carajillo, latte y capuchinos.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['tinto', 'café', 'desayuno', 'café de especialidad', 'café campesino'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Tripadvisor / Rappi',
    fuente_titulo: 'Criba 18 Café, Barrancabermeja',
    fecha_fuente: '2026-10-15',
    fuente_url: 'https://www.tripadvisor.com/Restaurant_Review-g1594789-d25278366-Reviews-Criba_18_Cafe-Barrancabermeja_Santander_Department.html',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Centro', apto_ninos: true, bano: 'ninguno', tinto: true, momento: ['manana', 'tarde'], dia_tematico: 'ciudad_rio',
    direccion: 'Carrera 24 # 49-64',
    costo: 'Americano 12 oz ≈ $7.600 · café campesino ≈ $9.600 (precios en Rappi)',
    confirmar: 'El horario publicado en Rappi es el de domicilios; confirmar el horario del local.',
  },
  {
    id_conocimiento: 'BCA-CAF-002',
    nombre: 'Maravillas del Café',
    categoria: 'cafe',
    descripcion:
      'Café-restaurante familiar cerca del Parque a la Vida, con gran variedad de cafés, platos de sal y postres (waffles, brownie con helado). 4,2/5 con 397 reseñas; tarde de fin de semana muy concurrida, conviene reservar.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['tinto', 'café', 'postres', 'familia', 'cena'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Carta.menu (reseñas agregadas)',
    fuente_titulo: 'Maravillas del Café en Barrancabermeja',
    fecha_fuente: '2026-10-15',
    fuente_url: 'https://carta.menu/restaurants/barrancabermeja/maravillas-del-cafe',
    estado_verificacion: 'verificado_en_fuente',
    fecha_verificacion: VERIFICADO,
    zona: 'Cerca del Parque a la Vida', apto_ninos: true, bano: 'ninguno', tinto: true, momento: ['tarde', 'noche'], dia_tematico: 'ciudad_rio',
    direccion: 'Carrera 25, cerca del Parque a la Vida',
    contacto: '+57 302 366 9800',
    costo: 'Alrededor de $20.000–30.000 por persona según reseñas',
  },

  // ───────────────────────── Seguridad ─────────────────────────
  {
    id_conocimiento: 'BCA-SEG-001',
    nombre: 'Río Magdalena: no apto para bañarse con niños',
    categoria: 'seguridad',
    descripcion:
      'El nivel del río cambia de forma brusca. En febrero de 2026 hubo alerta amarilla por aumento del nivel y en agosto de 2026, por la sequía, la Oficina de Gestión del Riesgo pidió no caminar ni permanecer en los bancos de arena porque el río puede volver a subir y el terreno no es firme.',
    municipio: BCA, departamento: SANT,
    etiquetas: ['seguridad', 'río magdalena', 'bañarse', 'alerta', 'bancos de arena'],
    relacion_afro: 'sin_relacion',
    fuente_entidad: 'Blu Radio / Vanguardia',
    fuente_titulo: 'Advierten riesgo de transitar por bancos de arena en el río Magdalena por sequía',
    fecha_fuente: '2026-08-26',
    fuente_url: 'https://www.bluradio.com/regiones/santanderes/advierten-riesgo-de-transitar-por-bancos-de-arena-en-el-rio-magdalena-en-barrancabermeja-rg10',
    estado_verificacion: 'alerta_vigente',
    fecha_verificacion: VERIFICADO,
    zona: 'Río Magdalena', apto_ninos: false, bano: 'no_recomendado', momento: [],
    seguridad: 'No bañarse en el río ni subirse a los bancos de arena. Disfrutarlo desde el malecón o en lancha con chaleco.',
  },
];

/** Etiquetas clave:valor con los campos de planificación (para guardarlos en la BD). */
export function etiquetasPlanificacion(o: OfertaCultural): string[] {
  const t = [
    `zona:${o.zona}`,
    `ninos:${o.apto_ninos ? 'si' : 'no'}`,
    `bano:${o.bano}`,
    ...o.momento.map(m => `momento:${m}`),
  ];
  if (o.tinto) t.push('tinto:si');
  if (o.dia_tematico) t.push(`dia:${o.dia_tematico}`);
  if (o.tiempo_desde_centro) t.push(`tiempo:${o.tiempo_desde_centro}`);
  if (o.direccion) t.push(`direccion:${o.direccion}`);
  if (o.horario) t.push(`horario:${o.horario}`);
  if (o.costo) t.push(`costo:${o.costo}`);
  if (o.contacto) t.push(`contacto:${o.contacto}`);
  if (o.seguridad) t.push(`seguridad:${o.seguridad}`);
  if (o.confirmar) t.push(`confirmar:${o.confirmar}`);
  return t;
}
