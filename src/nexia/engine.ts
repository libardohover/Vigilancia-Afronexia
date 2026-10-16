/**
 * Motor de razonamiento local de NEXIA.
 *
 * Funciona sin conexión a internet ni clave de IA (en el navegador o en el servidor):
 *  1. interpreta la consulta (días, adultos, niños, intereses),
 *  2. recupera ofertas de la base de conocimiento con ranking por relevancia,
 *  3. arma itinerarios por día, sitios de baño seguros y dónde tomar tinto,
 *  4. devuelve una respuesta en Markdown con las fuentes de cada dato.
 *
 * El servidor usa estas mismas funciones como herramientas del agente Gemini.
 */
import type { DiaTematico, Momento, OfertaCultural } from './baseConocimiento';

// ───────────────────────── Utilidades de texto ─────────────────────────

export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOPWORDS = new Set(
  'a al algo con de del el en es la las lo los me mi mis o para por que se su sus un una uno unos y yo quiero puedo donde cual cuales como hay tengo vamos ir dia dias indiqueme digame dime recomienda recomiendame barrancabermeja'.split(' '),
);

function tokens(texto: string): string[] {
  return normalizar(texto)
    .split(' ')
    .filter(t => t.length > 2 && !STOPWORDS.has(t));
}

const NUMEROS: Record<string, number> = {
  un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8,
};

function numeroAntes(textoNorm: string, palabras: string): number | undefined {
  const re = new RegExp(`(\\d+|${Object.keys(NUMEROS).join('|')})\\s+(?:${palabras})\\b`);
  const m = textoNorm.match(re);
  if (!m) return undefined;
  return /^\d+$/.test(m[1]) ? Number(m[1]) : NUMEROS[m[1]];
}

// ───────────────────────── Interpretación de la consulta ─────────────────────────

export interface ConsultaInterpretada {
  dias?: number;
  adultos?: number;
  ninos?: number;
  conNinos: boolean;
  quiereItinerario: boolean;
  intereses: {
    bano: boolean;
    tinto: boolean;
    comida: boolean;
    culturaAfro: boolean;
    naturaleza: boolean;
  };
}

export function interpretarConsulta(consulta: string): ConsultaInterpretada {
  const t = normalizar(consulta);
  let dias = numeroAntes(t, 'dias?|noches?');
  if (!dias && /fin de semana|puente festivo/.test(t)) dias = 2;
  const ninos = numeroAntes(t, 'ninos?|ninas?|hijos?|hijas?|menores|chicos|pequenos');
  const adultos = numeroAntes(t, 'adultos?|personas mayores');
  const sinNinos = /\bsin (ninos?|ninas?|hijos?|menores)\b/.test(t);
  const conNinos = !sinNinos && (Boolean(ninos) || /\b(ninos?|ninas?|hijos?|hijas?|familia|menores|bebes?|pequenos)\b/.test(t));

  return {
    dias: dias ? Math.min(dias, 7) : undefined,
    adultos,
    ninos,
    conNinos,
    quiereItinerario: Boolean(dias) || /\b(ruta|rutas|itinerario|plan|planes|vacaciones|recorrido|agenda|visitar)\b/.test(t),
    intereses: {
      bano: /\b(banar\w*|bano|piscinas?|pozos?|nadar|charcos?|balnearios?|rio|cienagas?|quebradas?|agua|acuatico)\b/.test(t),
      tinto: /\b(tinto|tintico|cafe|cafes|cafeteria)\b/.test(t),
      comida: /\b(comer|comida|almorzar|almuerzo|cena|cenar|restaurantes?|gastronomia|plato|bocachico|pescado)\b/.test(t),
      culturaAfro: /\b(afro\w*|negr\w*|tambor\w*|cultura|cultural|patrimonio|saberes|memoria|festival\w*|musica)\b/.test(t),
      naturaleza: /\b(naturaleza|aves|micos|lancha|chalupa|paseo|ecoturismo|fauna|cienagas?)\b/.test(t),
    },
  };
}

// ───────────────────────── Recuperación (RAG léxico) ─────────────────────────

export interface FiltrosBusqueda {
  categoria?: string;
  soloAptosNinos?: boolean;
  tipoBano?: OfertaCultural['bano'][];
  tinto?: boolean;
}

function textoIndexable(o: OfertaCultural): string {
  return [o.nombre, o.categoria, o.descripcion, o.nota_relacion_afro ?? '', o.zona, o.municipio, o.etiquetas.join(' '), o.bano, o.tinto ? 'tinto cafe' : '']
    .join(' ');
}

export function buscarOfertas(
  base: OfertaCultural[],
  consulta: string,
  filtros: FiltrosBusqueda = {},
  limite = 8,
): OfertaCultural[] {
  const q = tokens(consulta);
  const filtradas = base.filter(o => {
    if (filtros.categoria && o.categoria !== filtros.categoria) return false;
    if (filtros.soloAptosNinos && !o.apto_ninos) return false;
    if (filtros.tipoBano && !filtros.tipoBano.includes(o.bano)) return false;
    if (filtros.tinto && !o.tinto) return false;
    return true;
  });
  if (q.length === 0) return filtradas.slice(0, limite);

  const puntuadas = filtradas.map(o => {
    const nombre = normalizar(o.nombre);
    const etiquetas = normalizar(o.etiquetas.join(' '));
    const cuerpo = normalizar(textoIndexable(o));
    let score = 0;
    for (const tk of q) {
      if (nombre.includes(tk)) score += 4;
      if (etiquetas.includes(tk)) score += 3;
      if (normalizar(o.categoria).includes(tk)) score += 3;
      if (cuerpo.includes(tk)) score += 1;
    }
    if (score > 0 && q.some(tk => tk.startsWith('afro') || tk.startsWith('negr'))) {
      score += o.relacion_afro === 'directa' ? 4 : o.relacion_afro === 'contextual' ? 1.5 : 0;
    }
    if (score > 0 && o.estado_verificacion === 'verificado_en_fuente') score += 0.5;
    return { o, score };
  });
  return puntuadas
    .filter(p => p.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limite)
    .map(p => p.o);
}

// ───────────────────────── Planificador de itinerarios ─────────────────────────

export interface Parada {
  momento: string;
  oferta: OfertaCultural;
  nota?: string;
}

export interface DiaPlan {
  numero: number;
  titulo: string;
  paradas: Parada[];
}

export interface PlanViaje {
  dias: DiaPlan[];
  banoSi: OfertaCultural[];
  banoExcursion: OfertaCultural[];
  banoNo: OfertaCultural[];
  tinto: OfertaCultural[];
  avisos: string[];
  usadas: OfertaCultural[];
}

interface Slot {
  momento: string;
  elegir: (o: OfertaCultural, c: ConsultaInterpretada) => boolean;
  preferir?: (o: OfertaCultural) => number;
  nota?: (o: OfertaCultural, ctx: ConsultaInterpretada) => string | undefined;
  opcional?: boolean;
}

const TITULOS: Record<DiaTematico, string> = {
  ciudad_rio: 'Barrancabermeja, el río y su cultura',
  cienagas_agua: 'Ciénagas, pescadores y atardecer',
  excursion: 'Excursión de día completo: parque acuático o pozos naturales',
  cultura_afro: 'Río, pesca artesanal y memoria del territorio',
};

const tiene = (o: OfertaCultural, m: Momento) => o.momento.includes(m);

const PLANTILLAS: Record<DiaTematico, Slot[]> = {
  ciudad_rio: [
    {
      momento: '☕ 8:00 · Desayuno y tinto',
      elegir: o => o.categoria === 'cafe' && tiene(o, 'manana'),
    },
    {
      momento: '🌳 9:30 · Mañana',
      elegir: o => o.dia_tematico === 'ciudad_rio' && o.categoria === 'atractivo' && tiene(o, 'manana'),
      preferir: o => (o.etiquetas.includes('niños') ? 2 : 0) + (o.estado_verificacion === 'verificado_en_fuente' ? 1 : 0),
    },
    {
      momento: '🎶 11:00 · Cultura',
      elegir: o => o.categoria === 'cultura_afro' && o.dia_tematico === 'ciudad_rio',
    },
    {
      momento: '🍽️ 12:30 · Almuerzo',
      elegir: o => o.categoria === 'gastronomia' && o.dia_tematico === 'ciudad_rio' && tiene(o, 'mediodia'),
    },
    {
      momento: '🌇 17:00 · Atardecer',
      elegir: o => o.dia_tematico === 'ciudad_rio' && tiene(o, 'atardecer') && o.categoria === 'atractivo',
      preferir: o => (o.id_conocimiento === 'BCA-ATR-001' ? 2 : 0),
    },
    {
      momento: '🌙 19:00 · Noche en familia',
      elegir: o => (o.categoria === 'cafe' || o.categoria === 'atractivo') && tiene(o, 'noche') && o.dia_tematico === 'ciudad_rio' && o.id_conocimiento !== 'BCA-ATR-001',
      preferir: o => (o.categoria === 'cafe' ? 1 : 0),
    },
  ],
  cienagas_agua: [
    {
      momento: '🛥️ 9:00 · Mañana en la ciénaga',
      elegir: (o, c) => !c.conNinos && !c.intereses.bano && o.id_conocimiento === 'BCA-NAT-001',
      nota: () => 'Paseo en lancha para ver aves y, con suerte, manatíes; todos con chaleco.',
      opcional: true,
    },
    {
      momento: '🏊 9:00 · Mañana de piscina',
      elegir: (o, c) => (c.conNinos || c.intereses.bano) && o.bano === 'piscina' && o.dia_tematico === 'cienagas_agua',
      preferir: o => (o.estado_verificacion === 'verificado_en_fuente' ? 2 : 0),
      nota: (o, c) => (c.conNinos ? 'Los niños siempre al alcance de un adulto, con flotador si no nadan solos.' : undefined),
    },
    {
      momento: '🐟 12:30 · Almuerzo de pescado',
      elegir: o => o.categoria === 'gastronomia' && o.dia_tematico === 'cienagas_agua',
    },
    {
      momento: '🛶 15:00 · Pueblo de pescadores y ☕ tinto al atardecer',
      elegir: o => o.categoria === 'naturaleza' && o.dia_tematico === 'cienagas_agua' && tiene(o, 'atardecer'),
      nota: (o, c) =>
        `${c.conNinos ? 'Si toman la chalupa, chaleco salvavidas para todos.' : 'En chalupa, siempre con chaleco.'}${o.tinto ? ' Al caer la tarde, pidan un tinto frente a la ciénaga.' : ''}`,
    },
  ],
  excursion: [
    {
      momento: '🚗 7:30 · Salida temprano',
      elegir: o => o.bano === 'parque_acuatico' && o.dia_tematico === 'excursion',
      nota: () => 'Ideal con niños: zona Aquakids. Lleven bloqueador, ropa de cambio y agua.',
    },
    {
      momento: '🌿 Alternativa natural',
      elegir: o => o.bano === 'pozo_natural' && o.apto_ninos && o.dia_tematico === 'excursion',
      nota: () => 'Plan de “paseo de olla” en pozos naturales, si prefieren naturaleza a toboganes.',
      opcional: true,
    },
    {
      momento: '☕ 19:00 · Tinto de regreso',
      elegir: o => o.categoria === 'cafe' && tiene(o, 'noche'),
    },
  ],
  cultura_afro: [
    {
      momento: '🛶 8:00 · Mañana en el río',
      elegir: o => o.categoria === 'naturaleza' && o.dia_tematico === 'cultura_afro',
      preferir: o => (o.etiquetas.includes('turismo comunitario') ? 2 : 0),
    },
    {
      momento: '🍽️ 12:30 · Almuerzo campestre',
      elegir: o => o.dia_tematico === 'cultura_afro' && tiene(o, 'mediodia'),
    },
    {
      momento: '🎨 16:00 · Tarde',
      elegir: o => o.dia_tematico === 'cultura_afro' && tiene(o, 'tarde'),
    },
    {
      momento: '☕ 18:00 · Tinto',
      elegir: o => o.categoria === 'cafe',
    },
  ],
};

function ordenTematico(c: ConsultaInterpretada): DiaTematico[] {
  if (c.intereses.naturaleza && !c.intereses.bano && !c.conNinos) {
    return ['cienagas_agua', 'cultura_afro', 'ciudad_rio', 'excursion'];
  }
  const base: DiaTematico[] = ['ciudad_rio', 'cienagas_agua'];
  if (c.intereses.bano || c.conNinos) base.push('excursion', 'cultura_afro');
  else base.push('cultura_afro', 'excursion');
  return base;
}

export function planificarViaje(base: OfertaCultural[], c: ConsultaInterpretada): PlanViaje {
  const n = Math.max(1, Math.min(c.dias ?? 3, 7));
  const temas = ordenTematico(c);
  const usadas = new Map<string, OfertaCultural>();
  const usadasEnDias = new Set<string>();
  const candidatos = (o: OfertaCultural) => (c.conNinos ? o.apto_ninos : true) && o.categoria !== 'seguridad';

  const dias: DiaPlan[] = [];
  for (let i = 0; i < n; i++) {
    const tema = temas[i % temas.length];
    const repeticion = i >= temas.length;
    const paradas: Parada[] = [];
    for (const slot of PLANTILLAS[tema]) {
      const opciones = base
        .filter(o => candidatos(o) && slot.elegir(o, c))
        .sort((a, b) => {
          const ua = usadasEnDias.has(a.id_conocimiento) ? 1 : 0;
          const ub = usadasEnDias.has(b.id_conocimiento) ? 1 : 0;
          if (ua !== ub) return ua - ub; // no repetir si hay alternativa
          return (slot.preferir?.(b) ?? 0) - (slot.preferir?.(a) ?? 0);
        });
      const elegido = opciones[0];
      if (!elegido) continue;
      if (slot.opcional && usadasEnDias.has(elegido.id_conocimiento)) continue;
      // Un café puede repetirse; un atractivo no, salvo que no haya alternativas
      if (usadasEnDias.has(elegido.id_conocimiento) && elegido.categoria !== 'cafe') continue;
      paradas.push({ momento: slot.momento, oferta: elegido, nota: slot.nota?.(elegido, c) });
      usadasEnDias.add(elegido.id_conocimiento);
      usadas.set(elegido.id_conocimiento, elegido);
    }
    dias.push({
      numero: i + 1,
      titulo: repeticion ? `Día libre: repite su favorito o descansen` : TITULOS[tema],
      paradas: repeticion ? [] : paradas,
    });
  }

  const banoSi = base.filter(o => (o.bano === 'piscina' || o.bano === 'parque_acuatico') && o.municipio === 'Barrancabermeja' && (!c.conNinos || o.apto_ninos));
  const banoExcursion = base.filter(o => (o.bano === 'pozo_natural' || o.bano === 'parque_acuatico') && o.municipio !== 'Barrancabermeja' && (!c.conNinos || o.apto_ninos));
  const banoNo = base.filter(o => o.bano === 'no_recomendado' && o.seguridad && (o.categoria === 'seguridad' || o.categoria === 'naturaleza'));
  const tinto = base.filter(o => o.tinto);
  for (const o of [...banoSi, ...banoExcursion, ...banoNo, ...tinto]) usadas.set(o.id_conocimiento, o);

  const avisos = [
    'En Barrancabermeja **no se recomienda bañarse con niños en el río Magdalena ni en las ciénagas**: el nivel del agua cambia de forma brusca, hay babillas y no hay salvavidas. Para bañarse, usen piscinas y parques acuáticos.',
    'Varios datos (horarios, tarifas, ingreso de no afiliados en clubes) **deben confirmarse por teléfono** antes de ir; están marcados con ⚠️.',
  ];
  if (n > 4) avisos.push('Con más de 4 días, los días extra quedan libres para repetir lo que más les guste.');

  return { dias, banoSi, banoExcursion, banoNo, tinto, avisos, usadas: [...usadas.values()] };
}

// ───────────────────────── Redacción de respuestas ─────────────────────────

function linea(o: OfertaCultural): string {
  const extra: string[] = [];
  if (o.tiempo_desde_centro && o.tiempo_desde_centro !== 'en el casco urbano') extra.push(o.tiempo_desde_centro);
  if (o.direccion) extra.push(o.direccion);
  return extra.length ? ` _(${extra.join(' · ')})_` : '';
}

function lineaTinto(o: OfertaCultural): string {
  if (o.categoria !== 'cafe') {
    return `- **${o.nombre}**${linea(o)}: tinto frente a la ciénaga al atardecer, un plan que destacan quienes lo visitan.${confirmar(o)}`;
  }
  return `- **${o.nombre}**${linea(o)}: ${resumir(o.descripcion)}${o.costo ? ` ${o.costo}.` : ''}${confirmar(o)}`;
}

function confirmar(o: OfertaCultural): string {
  return o.confirmar ? `\n  ⚠️ ${o.confirmar}` : '';
}

function grupo(c: ConsultaInterpretada): string {
  const partes: string[] = [];
  if (c.adultos) partes.push(`${c.adultos} adulto${c.adultos > 1 ? 's' : ''}`);
  if (c.ninos) partes.push(`${c.ninos} niño${c.ninos > 1 ? 's' : ''}`);
  else if (c.conNinos) partes.push('niños');
  return partes.length ? ` para ${partes.join(' y ')}` : '';
}

export function redactarPlan(plan: PlanViaje, c: ConsultaInterpretada): string {
  const out: string[] = [];
  const n = plan.dias.length;
  out.push(`¡Con gusto! Esta es una propuesta de **${n} día${n > 1 ? 's' : ''} en Barrancabermeja${grupo(c)}**, armada con la base de conocimiento de AFRONEXIA.`);

  for (const d of plan.dias) {
    out.push(`\n### Día ${d.numero} · ${d.titulo}`);
    if (d.paradas.length === 0) {
      out.push('- Día flexible: descansen, repitan la piscina o vuelvan a su lugar favorito.');
      continue;
    }
    for (const p of d.paradas) {
      out.push(`- **${p.momento} — ${p.oferta.nombre}**${linea(p.oferta)}: ${resumir(p.oferta.descripcion)}${p.nota ? ` ${p.nota}` : ''}${confirmar(p.oferta)}`);
    }
  }

  if (c.intereses.bano || c.conNinos) {
    out.push('\n### 🏊 ¿Dónde bañarse con los niños?');
    out.push('**Sí, en Barrancabermeja (piscinas):**');
    for (const o of plan.banoSi) {
      const det = [o.horario ? `Horario: ${o.horario}` : '', o.contacto ? `Tel.: ${o.contacto}` : ''].filter(Boolean).join(' · ');
      out.push(`- **${o.nombre}**${linea(o)}: ${resumir(o.descripcion)}${det ? ` ${det}.` : ''}${confirmar(o)}`);
    }
    if (plan.banoExcursion.length) {
      out.push('\n**Sí, saliendo de excursión (parque acuático y pozos naturales):**');
      for (const o of plan.banoExcursion) {
        out.push(`- **${o.nombre}** — ${o.municipio}${linea(o)}: ${resumir(o.descripcion)}${o.costo ? ` Costo: ${o.costo}.` : ''}${o.seguridad ? ` ${o.seguridad}` : ''}${confirmar(o)}`);
      }
    }
    out.push('\n**No recomendados para bañarse:**');
    for (const o of plan.banoNo) out.push(`- **${o.nombre}**: ${o.seguridad}`);
  }

  if (c.intereses.tinto || c.quiereItinerario) {
    out.push('\n### ☕ ¿Dónde tomar un buen tinto?');
    for (const o of ordenarTinto(plan.tinto)) out.push(lineaTinto(o));
  }

  out.push('\n### Antes de salir');
  for (const a of plan.avisos) out.push(`- ${a}`);
  return out.join('\n');
}

/** Cafés primero; los sitios donde el tinto es un plan (no un café) al final. */
function ordenarTinto(lista: OfertaCultural[]): OfertaCultural[] {
  return [...lista].sort((a, b) => Number(b.categoria === 'cafe') - Number(a.categoria === 'cafe'));
}

function resumir(texto: string, max = 230): string {
  if (texto.length <= max) return texto;
  const corte = texto.lastIndexOf('. ', max);
  return texto.slice(0, corte > 80 ? corte + 1 : max) + (corte > 80 ? '' : '…');
}

export interface Fuente {
  titulo: string;
  entidad: string;
  url: string;
  fecha: string | null;
}

export function fuentesDe(ofertas: OfertaCultural[]): Fuente[] {
  const mapa = new Map<string, Fuente>();
  for (const o of ofertas) {
    if (!mapa.has(o.fuente_url)) {
      mapa.set(o.fuente_url, { titulo: o.fuente_titulo, entidad: o.fuente_entidad, url: o.fuente_url, fecha: o.fecha_fuente });
    }
  }
  return [...mapa.values()];
}

export interface RespuestaNexia {
  texto: string;
  fuentes: Fuente[];
  motor: 'gemini' | 'local';
  herramientas?: string[];
}

/** Respuesta completa del motor local (sin IA generativa). */
export function responderLocal(base: OfertaCultural[], consulta: string): RespuestaNexia {
  const c = interpretarConsulta(consulta);

  if (c.quiereItinerario) {
    const plan = planificarViaje(base, c);
    return { texto: redactarPlan(plan, c), fuentes: fuentesDe(plan.usadas), motor: 'local', herramientas: ['planificar_itinerario'] };
  }

  const out: string[] = [];
  const usadas: OfertaCultural[] = [];

  if (c.intereses.bano) {
    const plan = planificarViaje(base, { ...c, dias: 1 });
    const texto = redactarPlan(plan, { ...c, quiereItinerario: false, intereses: { ...c.intereses, tinto: c.intereses.tinto } });
    const seccion = texto.slice(texto.indexOf('### 🏊'));
    out.push(seccion.includes('### 🏊') ? seccion : texto);
    usadas.push(...plan.banoSi, ...plan.banoExcursion, ...plan.banoNo, ...(c.intereses.tinto ? plan.tinto : []));
  } else if (c.intereses.tinto) {
    const cafes = base.filter(o => o.tinto);
    out.push('### ☕ Dónde tomar un buen tinto en Barrancabermeja');
    for (const o of ordenarTinto(cafes)) out.push(lineaTinto(o));
    usadas.push(...cafes);
  } else {
    const hallazgos = buscarOfertas(base, consulta, { soloAptosNinos: c.conNinos }, 6);
    if (hallazgos.length === 0) {
      return {
        texto:
          'No encontré información verificada sobre eso en la base de conocimiento de AFRONEXIA. Puedo ayudarte con **rutas por días**, **dónde bañarse con niños**, **dónde tomar tinto**, **gastronomía ribereña**, **ciénagas y paseos en chalupa** o **cultura afro y festivales** de Barrancabermeja.',
        fuentes: [],
        motor: 'local',
      };
    }
    out.push('Esto es lo que encontré en la base de conocimiento de AFRONEXIA:');
    for (const o of hallazgos) {
      out.push(`- **${o.nombre}**${linea(o)}: ${resumir(o.descripcion, 300)}${o.seguridad ? ` ${o.seguridad}` : ''}${confirmar(o)}`);
    }
    usadas.push(...hallazgos);
    if (hallazgos.some(o => o.relacion_afro !== 'sin_relacion')) {
      const afro = hallazgos.filter(o => o.nota_relacion_afro).map(o => `- _${o.nombre}_: ${o.nota_relacion_afro}`);
      if (afro.length) out.push('\n**Relación con la cultura afro:**', ...afro);
    }
  }
  return { texto: out.join('\n'), fuentes: fuentesDe(usadas), motor: 'local', herramientas: ['buscar_base_conocimiento'] };
}
