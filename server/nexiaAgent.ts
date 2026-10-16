/**
 * NEXIA — agente virtual de AFRONEXIA (Gemini con llamado de herramientas).
 *
 * Herramientas:
 *  - buscar_base_conocimiento: RAG sobre ofertas_culturales (PostgreSQL o base incluida).
 *  - planificar_itinerario:    planificador determinista por días (motor local).
 *  - buscar_en_web:            búsqueda en Google (grounding) para datos actuales.
 *
 * Sin GEMINI_API_KEY, o si Gemini falla, responde el motor local con la misma base.
 */
import { GoogleGenAI, Type, type Content, type FunctionDeclaration, type Part } from '@google/genai';
import type { OfertaCultural } from '../src/nexia/baseConocimiento.js';
import {
  fuentesDe,
  planificarViaje,
  redactarPlan,
  responderLocal,
  type Fuente,
  type RespuestaNexia,
} from '../src/nexia/engine.js';
import { buscar, obtenerBase } from './knowledgeStore.js';

export const MODELO_POR_DEFECTO = 'gemini-3.8-flash';
const MAX_RONDAS = 5;
const TIMEOUT_MS = Number(process.env.NEXIA_TIMEOUT_MS) || 45000;

export function geminiConfigurado(): boolean {
  const k = process.env.GEMINI_API_KEY?.trim();
  return Boolean(k && k !== 'MY_GEMINI_API_KEY' && !k.startsWith('PLACEHOLDER'));
}

function fechaHoy(): string {
  return new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Bogota' });
}

const INSTRUCCIONES = () => `Eres NEXIA, el agente virtual de turismo cultural de AFRONEXIA (SENA – SENNOVA) para Barrancabermeja y el Magdalena Medio santandereano.
Hoy es ${fechaHoy()}.

CÓMO TRABAJAS
1. Usa SIEMPRE primero la herramienta buscar_base_conocimiento (y planificar_itinerario si piden rutas, planes o varios días). Es la fuente principal y verificada.
2. Usa buscar_en_web solo para completar o actualizar: horarios, precios, aperturas recientes, eventos de estas fechas, o cuando la base no tenga el dato. Indica que ese dato viene de la web.
3. NUNCA inventes lugares, direcciones, teléfonos, precios ni horarios. Si un dato no está confirmado, dilo y sugiere confirmarlo.

SEGURIDAD (obligatorio cuando hay niños o preguntan por bañarse)
- No recomiendes bañarse en el río Magdalena ni en aguas abiertas de las ciénagas: cambios bruscos de nivel, babillas, sin salvavidas; la ciénaga San Silvestre es fuente de agua potable.
- Para bañarse recomienda piscinas, parques acuáticos y pozos naturales señalados en la base, con sus advertencias.
- En lanchas o chalupas: chaleco salvavidas para todos.

ESTILO
- Español colombiano, cálido y claro. Usa Markdown: títulos ### por día o sección, viñetas, **negritas** para los nombres.
- Para itinerarios: un bloque por día con horarios aproximados (mañana, almuerzo, tarde, atardecer, noche), luego "¿Dónde bañarse?" (sí / no) y "¿Dónde tomar tinto?" si lo piden.
- Marca con ⚠️ lo que se debe confirmar (tarifas, horarios, ingreso de no afiliados).
- Cuando aporte, menciona la relación con la cultura afro del territorio (nota_relacion_afro) sin exagerarla.
- No escribas la lista de fuentes ni URLs al final: la interfaz las muestra automáticamente.`;

const HERRAMIENTAS: FunctionDeclaration[] = [
  {
    name: 'buscar_base_conocimiento',
    description:
      'Busca en la base de conocimiento de AFRONEXIA (tabla ofertas_culturales) atractivos, sitios para bañarse, cafés, restaurantes, ciénagas, cultura afro, festivales y alertas de seguridad de Barrancabermeja y alrededores.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        consulta: { type: Type.STRING, description: 'Qué buscar, en palabras clave (ej. "piscina niños", "tinto café", "bocachico").' },
        categoria: {
          type: Type.STRING,
          description: 'Filtro opcional por categoría.',
          enum: ['atractivo', 'cultura_afro', 'festival', 'naturaleza', 'recreacion_acuatica', 'excursion', 'gastronomia', 'cafe', 'seguridad'],
        },
        solo_aptos_ninos: { type: Type.BOOLEAN, description: 'true si viajan niños.' },
      },
      required: ['consulta'],
    },
  },
  {
    name: 'planificar_itinerario',
    description:
      'Genera un borrador de itinerario por días con la base de conocimiento: paradas por horario, sitios seguros para bañarse, sitios no recomendados y dónde tomar tinto.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        dias: { type: Type.INTEGER, description: 'Número de días (1 a 7).' },
        adultos: { type: Type.INTEGER },
        ninos: { type: Type.INTEGER },
        intereses: {
          type: Type.ARRAY,
          items: { type: Type.STRING, enum: ['bano', 'tinto', 'comida', 'cultura_afro', 'naturaleza'] },
        },
      },
      required: ['dias'],
    },
  },
  {
    name: 'buscar_en_web',
    description:
      'Busca en Google información ACTUAL sobre Barrancabermeja (horarios, precios, aperturas, eventos). Úsala solo para completar la base de conocimiento.',
    parameters: {
      type: Type.OBJECT,
      properties: { consulta: { type: Type.STRING } },
      required: ['consulta'],
    },
  },
];

function compacta(o: OfertaCultural) {
  return {
    id: o.id_conocimiento,
    nombre: o.nombre,
    categoria: o.categoria,
    municipio: o.municipio,
    descripcion: o.descripcion,
    zona: o.zona,
    tiempo_desde_centro: o.tiempo_desde_centro,
    direccion: o.direccion,
    horario: o.horario,
    costo: o.costo,
    contacto: o.contacto,
    apto_ninos: o.apto_ninos,
    tipo_bano: o.bano,
    tinto: o.tinto,
    seguridad: o.seguridad,
    confirmar: o.confirmar,
    relacion_afro: o.relacion_afro,
    nota_relacion_afro: o.nota_relacion_afro,
    estado_verificacion: o.estado_verificacion,
    fuente: `${o.fuente_entidad} (${o.fecha_fuente ?? 's. f.'})`,
  };
}

interface Contexto {
  usadas: Map<string, OfertaCultural>;
  web: Fuente[];
  herramientas: string[];
}

async function buscarEnWeb(ai: GoogleGenAI, modelo: string, consulta: string, ctx: Contexto) {
  const r = await ai.models.generateContent({
    model: modelo,
    contents: `${consulta} (Barrancabermeja, Santander, Colombia). Responde en español con datos concretos y su fecha.`,
    config: { tools: [{ googleSearch: {} }], temperature: 0.2 },
  });
  const chunks = r.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  for (const c of chunks) {
    if (c.web?.uri) ctx.web.push({ titulo: c.web.title || 'Resultado web', entidad: 'Búsqueda web (Google)', url: c.web.uri, fecha: null });
  }
  return { resumen: r.text ?? '', fuentes: chunks.map(c => c.web?.title).filter(Boolean) };
}

async function ejecutar(ai: GoogleGenAI, modelo: string, nombre: string, args: Record<string, unknown>, ctx: Contexto) {
  ctx.herramientas.push(nombre);
  if (nombre === 'buscar_base_conocimiento') {
    const r = await buscar(String(args.consulta ?? ''), {
      categoria: args.categoria ? String(args.categoria) : undefined,
      soloAptosNinos: Boolean(args.solo_aptos_ninos),
    });
    r.forEach(o => ctx.usadas.set(o.id_conocimiento, o));
    return { resultados: r.map(compacta), total: r.length };
  }
  if (nombre === 'planificar_itinerario') {
    const { datos } = await obtenerBase();
    const intereses = new Set((args.intereses as string[] | undefined) ?? []);
    const ninos = Number(args.ninos) || 0;
    const c = {
      dias: Number(args.dias) || 1,
      adultos: Number(args.adultos) || undefined,
      ninos: ninos || undefined,
      conNinos: ninos > 0,
      quiereItinerario: true,
      intereses: {
        bano: intereses.has('bano'),
        tinto: intereses.has('tinto'),
        comida: intereses.has('comida'),
        culturaAfro: intereses.has('cultura_afro'),
        naturaleza: intereses.has('naturaleza'),
      },
    };
    const plan = planificarViaje(datos, c);
    plan.usadas.forEach(o => ctx.usadas.set(o.id_conocimiento, o));
    return {
      borrador_markdown: redactarPlan(plan, c),
      detalle_sitios: plan.usadas.map(compacta),
    };
  }
  if (nombre === 'buscar_en_web') {
    return buscarEnWeb(ai, modelo, String(args.consulta ?? ''), ctx);
  }
  return { error: `Herramienta desconocida: ${nombre}` };
}

export interface MensajeHistorial {
  rol: 'usuario' | 'nexia';
  texto: string;
}

/** `cliente` permite inyectar un cliente simulado en pruebas. */
export async function agenteGemini(
  mensaje: string,
  historial: MensajeHistorial[],
  cliente?: GoogleGenAI,
): Promise<RespuestaNexia> {
  const ai = cliente ?? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const modelo = process.env.GEMINI_MODEL?.trim() || MODELO_POR_DEFECTO;
  const ctx: Contexto = { usadas: new Map(), web: [], herramientas: [] };

  const contents: Content[] = [
    ...historial.slice(-6).map(h => ({ role: h.rol === 'usuario' ? 'user' : 'model', parts: [{ text: h.texto.slice(0, 4000) }] })),
    { role: 'user', parts: [{ text: mensaje.slice(0, 4000) }] },
  ];

  for (let ronda = 0; ronda < MAX_RONDAS; ronda++) {
    const r = await ai.models.generateContent({
      model: modelo,
      contents,
      config: {
        systemInstruction: INSTRUCCIONES(),
        tools: [{ functionDeclarations: HERRAMIENTAS }],
        temperature: 0.4,
      },
    });
    const llamadas = r.functionCalls ?? [];
    if (llamadas.length === 0) {
      const texto = r.text?.trim();
      if (!texto) throw new Error('Gemini devolvió una respuesta vacía.');
      return {
        texto,
        fuentes: [...fuentesDe([...ctx.usadas.values()]), ...ctx.web].filter((f, i, a) => a.findIndex(x => x.url === f.url) === i),
        motor: 'gemini',
        herramientas: [...new Set(ctx.herramientas)],
      };
    }
    contents.push(r.candidates?.[0]?.content ?? { role: 'model', parts: llamadas.map(fc => ({ functionCall: fc })) });
    const respuestas: Part[] = [];
    for (const fc of llamadas) {
      let resultado: unknown;
      try {
        resultado = await ejecutar(ai, modelo, fc.name ?? '', (fc.args ?? {}) as Record<string, unknown>, ctx);
      } catch (err) {
        resultado = { error: (err as Error).message };
      }
      respuestas.push({ functionResponse: { name: fc.name, id: fc.id, response: { resultado } } });
    }
    contents.push({ role: 'user', parts: respuestas });
  }
  throw new Error('El agente superó el número máximo de pasos.');
}

/** Punto de entrada: Gemini si está configurado; si no (o si falla), motor local. */
export async function responderNexia(mensaje: string, historial: MensajeHistorial[] = []): Promise<RespuestaNexia & { origen: string }> {
  const { datos, origen } = await obtenerBase();
  if (geminiConfigurado()) {
    try {
      const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error('Tiempo de espera agotado')), TIMEOUT_MS));
      const r = await Promise.race([agenteGemini(mensaje, historial), timeout]);
      return { ...r, origen };
    } catch (err) {
      console.warn('[NEXIA] Gemini no disponible, se usa el motor local:', (err as Error).message);
    }
  }
  return { ...responderLocal(datos, mensaje), origen };
}
