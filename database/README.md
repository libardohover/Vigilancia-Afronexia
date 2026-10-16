# Base de datos — Base_Conocimiento_AFRONEXIA_v1

| Archivo | Qué hace |
|---|---|
| `01_adaptar_base_conocimiento.sql` | Migración (la que ya tenías): agrega a `ofertas_culturales` las columnas de trazabilidad (`id_conocimiento`, `municipio`, `etiquetas`, `relacion_afro`, `fuente_*`, `estado_verificacion`…). Idempotente. |
| `02_base_conocimiento_barrancabermeja.sql` | Datos: 30 registros de Barrancabermeja y alrededores con fuente, fecha y estado de verificación. Generado con `npm run kb:sql`. Idempotente. |

## Opción A — con Node (recomendada)

En `.env.local` define `DATABASE_URL=postgresql://usuario:clave@localhost:5432/tu_base` y ejecuta:

```bash
npm run kb:cargar -- --migrar   # aplica 01 y carga/actualiza los registros
npm run kb:embeddings           # opcional: embeddings para la búsqueda vectorial
```

`kb:cargar` detecta cómo se llaman tus columnas de nombre y descripción (`nombre`/`titulo`, `descripcion`/…),
no toca los registros que ya tenías (solo los que tienen `id_conocimiento`) y avisa si tu tabla exige
otra columna obligatoria. Con `--simular` muestra qué haría sin escribir.

## Opción B — solo SQL (psql o pgAdmin)

```bash
psql -d tu_base -f database/01_adaptar_base_conocimiento.sql
psql -d tu_base -f database/02_base_conocimiento_barrancabermeja.sql
```

> El archivo 02 supone que las columnas se llaman `nombre` y `descripcion`. Si no es así, usa la opción A.

## Columna `etiquetas`

Además de etiquetas libres, guarda los datos que NEXIA usa para planificar, separados por ` | `
con formato `clave:valor`: `zona`, `ninos:si|no`, `bano:piscina|pozo_natural|parque_acuatico|no_recomendado|ninguno`,
`momento:manana|mediodia|tarde|atardecer|noche|dia_completo`, `tinto:si`, `dia`, `tiempo`, `direccion`,
`horario`, `costo`, `contacto`, `seguridad`, `confirmar`.

## Embeddings

La columna `embedding vector(1536)` debe llenarse con **el mismo modelo** con que se vectorizan las
consultas. Configura `EMBEDDINGS_PROVEEDOR` (`gemini` u `openai`) igual que el cargador original del
prototipo. Al actualizar un registro, su embedding se borra para regenerarlo.
