/**
 * Genera embeddings (vector 1536) para los registros de la base de conocimiento.
 *
 *   npm run kb:embeddings            → solo registros con embedding vacío
 *   npm run kb:embeddings -- --todos → recalcula todos los que tienen id_conocimiento
 *
 * Requiere DATABASE_URL y EMBEDDINGS_PROVEEDOR (gemini u openai) con su clave.
 * Usa el MISMO proveedor que generó los embeddings existentes del prototipo.
 */
import '../server/env.js';
import pg from 'pg';
import { CANDIDATAS } from '../server/knowledgeStore.js';
import { DIMENSIONES, embedTextos, embeddingsDisponibles } from '../server/embeddings.js';

const TODOS = process.argv.includes('--todos');
const LOTE = 16;

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL en .env.local');
  if (!embeddingsDisponibles()) {
    throw new Error('Configura EMBEDDINGS_PROVEEDOR=gemini (con GEMINI_API_KEY) u openai (con OPENAI_API_KEY) en .env.local');
  }
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });
  await client.connect();
  try {
    const cols = new Set(
      (await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name='ofertas_culturales'`)).rows.map(r => r.column_name),
    );
    const n = CANDIDATAS.nombre.find(c => cols.has(c));
    const d = CANDIDATAS.descripcion.find(c => cols.has(c));
    const filas = (
      await client.query(
        `SELECT id_conocimiento, "${n}" AS nombre, ${d ? `"${d}"` : `''`} AS descripcion, categoria, municipio, etiquetas
           FROM ofertas_culturales
          WHERE id_conocimiento IS NOT NULL ${TODOS ? '' : 'AND embedding IS NULL'}`,
      )
    ).rows;
    console.log(`Registros por vectorizar: ${filas.length}`);

    for (let i = 0; i < filas.length; i += LOTE) {
      const lote = filas.slice(i, i + LOTE);
      const textos = lote.map(f =>
        [f.nombre, f.categoria, f.municipio, f.descripcion, String(f.etiquetas ?? '').replace(/\|/g, ',')].filter(Boolean).join('. '),
      );
      const vectores = await embedTextos(textos);
      for (let j = 0; j < lote.length; j++) {
        const v = vectores[j];
        if (!v || v.length !== DIMENSIONES) throw new Error(`Dimensión inesperada (${v?.length}); se esperaban ${DIMENSIONES}.`);
        await client.query(`UPDATE ofertas_culturales SET embedding = $1::vector WHERE id_conocimiento = $2`, [
          `[${v.join(',')}]`,
          lote[j].id_conocimiento,
        ]);
      }
      console.log(`  ✓ ${Math.min(i + LOTE, filas.length)}/${filas.length}`);
    }
  } finally {
    await client.end();
  }
}

main().catch(err => {
  console.error('Error:', (err as Error).message);
  process.exit(1);
});
