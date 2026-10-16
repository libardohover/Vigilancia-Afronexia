/**
 * Carga Base_Conocimiento_AFRONEXIA_v1 (Barrancabermeja) en la tabla ofertas_culturales.
 *
 *   npm run kb:cargar              → inserta o actualiza (idempotente, por id_conocimiento)
 *   npm run kb:cargar -- --migrar  → además ejecuta database/01_adaptar_base_conocimiento.sql
 *   npm run kb:cargar -- --simular → muestra qué haría sin escribir en la BD
 *
 * Requiere DATABASE_URL en .env.local. Se adapta a las columnas existentes de la tabla:
 * busca la columna de nombre (nombre/titulo/…) y de descripción (descripcion/…).
 * Al actualizar un registro, borra su embedding para que se regenere con kb:embeddings.
 */
import '../server/env.js';
import fs from 'node:fs';
import pg from 'pg';
import { BASE_CONOCIMIENTO, etiquetasPlanificacion } from '../src/nexia/baseConocimiento.js';
import { CANDIDATAS } from '../server/knowledgeStore.js';

const args = new Set(process.argv.slice(2));
const MIGRAR = args.has('--migrar');
const SIMULAR = args.has('--simular');

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error('Falta DATABASE_URL en .env.local (ej. postgresql://usuario:clave@localhost:5432/afronexia)');
    process.exit(1);
  }
  const client = new pg.Client({
    connectionString: url,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });
  await client.connect();

  try {
    if (MIGRAR) {
      const sql = fs.readFileSync('database/01_adaptar_base_conocimiento.sql', 'utf8');
      if (SIMULAR) console.log('[simular] Se ejecutaría database/01_adaptar_base_conocimiento.sql');
      else {
        await client.query(sql);
        console.log('✓ Migración aplicada (01_adaptar_base_conocimiento.sql)');
      }
    }

    const r = await client.query(
      `SELECT column_name, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'ofertas_culturales'`,
    );
    if (r.rows.length === 0) throw new Error('No existe la tabla ofertas_culturales en esta base de datos.');
    const cols = new Set(r.rows.map(x => String(x.column_name)));
    const colNombre = CANDIDATAS.nombre.find(c => cols.has(c));
    const colDesc = CANDIDATAS.descripcion.find(c => cols.has(c));
    if (!cols.has('id_conocimiento')) throw new Error('Falta la columna id_conocimiento: ejecuta con --migrar.');
    if (!colNombre) throw new Error(`No encontré columna de nombre (${CANDIDATAS.nombre.join(', ')}). Columnas: ${[...cols].join(', ')}`);

    const obligatorias = r.rows
      .filter(x => x.is_nullable === 'NO' && !x.column_default)
      .map(x => String(x.column_name));
    console.log(`Tabla ofertas_culturales: nombre → "${colNombre}", descripción → "${colDesc ?? '(no existe)'}"`);

    let insertados = 0;
    let actualizados = 0;
    const errores: string[] = [];

    for (const o of BASE_CONOCIMIENTO) {
      const valores: Record<string, unknown> = {
        id_conocimiento: o.id_conocimiento,
        [colNombre]: o.nombre,
        categoria: o.categoria,
        municipio: o.municipio,
        departamento: o.departamento,
        etiquetas: [...o.etiquetas, ...etiquetasPlanificacion(o)].join(' | '),
        relacion_afro: o.relacion_afro,
        nota_relacion_afro: o.nota_relacion_afro ?? null,
        fuente_entidad: o.fuente_entidad,
        fuente_titulo: o.fuente_titulo,
        fecha_fuente: o.fecha_fuente,
        fuente_url: o.fuente_url,
        estado_verificacion: o.estado_verificacion,
        fecha_verificacion: o.fecha_verificacion,
      };
      if (colDesc) valores[colDesc] = o.descripcion;
      const usar = Object.keys(valores).filter(c => cols.has(c));
      const faltan = obligatorias.filter(c => !usar.includes(c));
      if (faltan.length) {
        errores.push(`${o.id_conocimiento}: la tabla exige valores para ${faltan.join(', ')} (NOT NULL sin valor por defecto).`);
        continue;
      }

      const lista = usar.map(c => `"${c}"`).join(', ');
      const params = usar.map((_, i) => `$${i + 1}`).join(', ');
      const set = usar
        .filter(c => c !== 'id_conocimiento')
        .map(c => `"${c}" = EXCLUDED."${c}"`)
        .concat(cols.has('embedding') ? ['"embedding" = NULL'] : [])
        .join(', ');
      const sql = `INSERT INTO ofertas_culturales (${lista}) VALUES (${params})
        ON CONFLICT (id_conocimiento) WHERE id_conocimiento IS NOT NULL DO UPDATE SET ${set}
        RETURNING (xmax = 0) AS insertado`;

      if (SIMULAR) {
        console.log(`[simular] ${o.id_conocimiento} · ${o.nombre}`);
        continue;
      }
      try {
        const res = await client.query(sql, usar.map(c => valores[c]));
        if (res.rows[0]?.insertado) insertados++;
        else actualizados++;
      } catch (err) {
        errores.push(`${o.id_conocimiento}: ${(err as Error).message}`);
      }
    }

    if (!SIMULAR) console.log(`✓ ${insertados} registros nuevos · ${actualizados} actualizados · ${errores.length} con error`);
    for (const e of errores) console.error('  ✗', e);
    if (cols.has('embedding') && !SIMULAR) {
      console.log('Siguiente paso (opcional): npm run kb:embeddings  → genera los embeddings para la búsqueda vectorial.');
    }
    if (errores.length) process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main().catch(err => {
  console.error('Error:', (err as Error).message);
  process.exit(1);
});
