/**
 * Origen de la base de conocimiento de NEXIA.
 *
 * - Con DATABASE_URL: lee la tabla `ofertas_culturales` de PostgreSQL (la misma del
 *   prototipo AFRONEXIA, adaptada con database/01_adaptar_base_conocimiento.sql).
 *   Se adapta a los nombres de columna existentes (nombre/titulo, descripcion/…).
 * - Sin DATABASE_URL: usa la base incluida en src/nexia/baseConocimiento.ts.
 *
 * Si hay embeddings y un proveedor configurado, la búsqueda combina similitud
 * vectorial (pgvector, distancia coseno) con el ranking léxico.
 */
import pg from 'pg';
import { BASE_CONOCIMIENTO, type OfertaCultural } from '../src/nexia/baseConocimiento.js';
import { buscarOfertas, type FiltrosBusqueda } from '../src/nexia/engine.js';
import { embeddingsDisponibles, embedConsulta } from './embeddings.js';

const CACHE_MS = 5 * 60 * 1000;
let pool: pg.Pool | null = null;
let cache: { datos: OfertaCultural[]; hasta: number; origen: string } | null = null;
let columnasCache: Set<string> | null = null;

function getPool(): pg.Pool | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  if (!pool) {
    pool = new pg.Pool({
      connectionString: url,
      max: 4,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });
    pool.on('error', err => console.error('[NEXIA] Error en el pool de PostgreSQL:', err.message));
  }
  return pool;
}

export async function columnasTabla(p: pg.Pool): Promise<Set<string>> {
  if (columnasCache) return columnasCache;
  const r = await p.query(
    `SELECT column_name FROM information_schema.columns WHERE table_name = 'ofertas_culturales'`,
  );
  columnasCache = new Set(r.rows.map(x => String(x.column_name)));
  return columnasCache;
}

const primera = (cols: Set<string>, opciones: string[]) => opciones.find(c => cols.has(c));

export const CANDIDATAS = {
  nombre: ['nombre', 'titulo', 'nombre_oferta', 'name'],
  descripcion: ['descripcion', 'description', 'detalle', 'contenido', 'texto'],
};

/** Convierte una fila de la BD al formato interno. */
function filaAOferta(row: Record<string, unknown>, cols: Set<string>): OfertaCultural | null {
  const colNombre = primera(cols, CANDIDATAS.nombre);
  const colDesc = primera(cols, CANDIDATAS.descripcion);
  const nombre = colNombre ? String(row[colNombre] ?? '') : '';
  if (!nombre) return null;

  // etiquetas: "a | b | clave:valor"
  const crudas = String(row.etiquetas ?? '')
    .split(/\s*\|\s*/)
    .map(s => s.trim())
    .filter(Boolean);
  const kv: Record<string, string[]> = {};
  const libres: string[] = [];
  for (const e of crudas) {
    const m = e.match(/^(zona|ninos|bano|momento|tinto|dia|tiempo|direccion|horario|costo|contacto|seguridad|confirmar):(.*)$/);
    if (m) (kv[m[1]] ??= []).push(m[2].trim());
    else libres.push(e);
  }
  const uno = (k: string) => kv[k]?.[0];
  const fecha = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v).slice(0, 10) : null);

  return {
    id_conocimiento: String(row.id_conocimiento ?? row.id ?? nombre),
    nombre,
    categoria: String(row.categoria ?? 'atractivo'),
    descripcion: colDesc ? String(row[colDesc] ?? '') : '',
    municipio: String(row.municipio ?? 'Barrancabermeja'),
    departamento: String(row.departamento ?? 'Santander'),
    etiquetas: libres,
    relacion_afro: (row.relacion_afro as OfertaCultural['relacion_afro']) ?? 'sin_relacion',
    nota_relacion_afro: row.nota_relacion_afro ? String(row.nota_relacion_afro) : undefined,
    fuente_entidad: String(row.fuente_entidad ?? 'Base de conocimiento AFRONEXIA'),
    fuente_titulo: String(row.fuente_titulo ?? 'Registro de la base de conocimiento'),
    fecha_fuente: fecha(row.fecha_fuente),
    fuente_url: String(row.fuente_url ?? ''),
    estado_verificacion: (row.estado_verificacion as OfertaCultural['estado_verificacion']) ?? 'requiere_confirmacion',
    fecha_verificacion: fecha(row.fecha_verificacion) ?? '',
    zona: uno('zona') ?? String(row.municipio ?? ''),
    tiempo_desde_centro: uno('tiempo'),
    apto_ninos: uno('ninos') !== 'no',
    bano: (uno('bano') as OfertaCultural['bano']) ?? 'ninguno',
    tinto: uno('tinto') === 'si',
    momento: (kv.momento ?? []) as OfertaCultural['momento'],
    dia_tematico: uno('dia') as OfertaCultural['dia_tematico'],
    direccion: uno('direccion'),
    horario: uno('horario'),
    costo: uno('costo'),
    contacto: uno('contacto'),
    seguridad: uno('seguridad'),
    confirmar: uno('confirmar'),
  };
}

/** Todas las ofertas (con caché de 5 minutos si vienen de PostgreSQL). */
export async function obtenerBase(): Promise<{ datos: OfertaCultural[]; origen: string }> {
  const p = getPool();
  if (!p) return { datos: BASE_CONOCIMIENTO, origen: 'Base incluida (src/nexia/baseConocimiento.ts)' };
  if (cache && cache.hasta > Date.now()) return cache;
  try {
    const cols = await columnasTabla(p);
    const r = await p.query(`SELECT * FROM ofertas_culturales`);
    const datos = r.rows
      .map(row => {
        delete (row as Record<string, unknown>).embedding;
        return filaAOferta(row, cols);
      })
      .filter((o): o is OfertaCultural => o !== null);
    if (datos.length === 0) {
      console.warn('[NEXIA] ofertas_culturales está vacía; se usa la base incluida.');
      return { datos: BASE_CONOCIMIENTO, origen: 'Base incluida (la tabla está vacía)' };
    }
    cache = { datos, hasta: Date.now() + CACHE_MS, origen: `PostgreSQL · ofertas_culturales (${datos.length} registros)` };
    return cache;
  } catch (err) {
    console.error('[NEXIA] No se pudo leer PostgreSQL; se usa la base incluida:', (err as Error).message);
    return { datos: BASE_CONOCIMIENTO, origen: 'Base incluida (PostgreSQL no disponible)' };
  }
}

/** Búsqueda híbrida: vectorial (si hay embeddings) + léxica. */
export async function buscar(consulta: string, filtros: FiltrosBusqueda = {}, limite = 8): Promise<OfertaCultural[]> {
  const { datos } = await obtenerBase();
  const lexico = buscarOfertas(datos, consulta, filtros, limite);
  const p = getPool();
  if (!p || !embeddingsDisponibles()) return lexico;

  try {
    const vector = await embedConsulta(consulta);
    if (!vector) return lexico;
    const r = await p.query(
      `SELECT id_conocimiento FROM ofertas_culturales
        WHERE embedding IS NOT NULL AND id_conocimiento IS NOT NULL
        ORDER BY embedding <=> $1::vector LIMIT $2`,
      [`[${vector.join(',')}]`, limite],
    );
    const porId = new Map(datos.map(o => [o.id_conocimiento, o]));
    const vectorial = r.rows
      .map(x => porId.get(String(x.id_conocimiento)))
      .filter((o): o is OfertaCultural => Boolean(o))
      .filter(o => buscarOfertas([o], '', filtros, 1).length === 1);
    const vistos = new Set<string>();
    const mezcla: OfertaCultural[] = [];
    for (let i = 0; mezcla.length < limite && (i < vectorial.length || i < lexico.length); i++) {
      for (const o of [vectorial[i], lexico[i]]) {
        if (o && !vistos.has(o.id_conocimiento)) {
          vistos.add(o.id_conocimiento);
          mezcla.push(o);
        }
      }
    }
    return mezcla.slice(0, limite);
  } catch (err) {
    console.warn('[NEXIA] Búsqueda vectorial no disponible:', (err as Error).message);
    return lexico;
  }
}

export async function cerrarPool(): Promise<void> {
  await pool?.end();
  pool = null;
}
