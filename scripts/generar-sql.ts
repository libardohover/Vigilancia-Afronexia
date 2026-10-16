/**
 * Genera database/02_base_conocimiento_barrancabermeja.sql a partir de
 * src/nexia/baseConocimiento.ts (para cargarlo con psql o pgAdmin sin Node).
 *
 *   npm run kb:sql
 */
import fs from 'node:fs';
import { BASE_CONOCIMIENTO, etiquetasPlanificacion } from '../src/nexia/baseConocimiento.js';

const q = (v: string | null | undefined) => (v === null || v === undefined ? 'NULL' : `'${v.replace(/'/g, "''")}'`);

const columnas = [
  'id_conocimiento', 'nombre', 'descripcion', 'categoria', 'municipio', 'departamento', 'etiquetas',
  'relacion_afro', 'nota_relacion_afro', 'fuente_entidad', 'fuente_titulo', 'fecha_fuente', 'fuente_url',
  'estado_verificacion', 'fecha_verificacion',
];

const filas = BASE_CONOCIMIENTO.map(o =>
  `  (${[
    q(o.id_conocimiento), q(o.nombre), q(o.descripcion), q(o.categoria), q(o.municipio), q(o.departamento),
    q([...o.etiquetas, ...etiquetasPlanificacion(o)].join(' | ')), q(o.relacion_afro), q(o.nota_relacion_afro ?? null),
    q(o.fuente_entidad), q(o.fuente_titulo), o.fecha_fuente ? `DATE ${q(o.fecha_fuente)}` : 'NULL', q(o.fuente_url),
    q(o.estado_verificacion), `DATE ${q(o.fecha_verificacion)}`,
  ].join(', ')})`,
);

const sql = `-- AFRONEXIA - Base_Conocimiento_AFRONEXIA_v1 · Barrancabermeja (${BASE_CONOCIMIENTO.length} registros)
-- Generado automáticamente desde src/nexia/baseConocimiento.ts (npm run kb:sql). No editar a mano.
-- Requiere haber ejecutado antes 01_adaptar_base_conocimiento.sql. Es idempotente.
--
-- SUPUESTO: la tabla usa las columnas "nombre" y "descripcion". Si en tu tabla se llaman distinto
-- (p. ej. "titulo"), usa mejor "npm run kb:cargar", que detecta las columnas automáticamente.
-- Al actualizar un registro se borra su embedding para regenerarlo (npm run kb:embeddings).

BEGIN;

INSERT INTO ofertas_culturales (${columnas.join(', ')})
VALUES
${filas.join(',\n')}
ON CONFLICT (id_conocimiento) WHERE id_conocimiento IS NOT NULL DO UPDATE SET
${columnas.filter(c => c !== 'id_conocimiento').map(c => `  ${c} = EXCLUDED.${c}`).join(',\n')},
  embedding = NULL;

COMMIT;
`;

fs.writeFileSync('database/02_base_conocimiento_barrancabermeja.sql', sql, 'utf8');
console.log(`✓ database/02_base_conocimiento_barrancabermeja.sql (${BASE_CONOCIMIENTO.length} registros)`);
