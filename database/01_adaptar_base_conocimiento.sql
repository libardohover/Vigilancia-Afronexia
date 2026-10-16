-- AFRONEXIA - Adaptación de ofertas_culturales para Base_Conocimiento_AFRONEXIA_v1
-- Ejecutar una sola vez. Es idempotente.

CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE ofertas_culturales
  ADD COLUMN IF NOT EXISTS id_conocimiento VARCHAR(30),
  ADD COLUMN IF NOT EXISTS municipio VARCHAR(120),
  ADD COLUMN IF NOT EXISTS departamento VARCHAR(120),
  ADD COLUMN IF NOT EXISTS etiquetas TEXT,
  ADD COLUMN IF NOT EXISTS relacion_afro VARCHAR(30),
  ADD COLUMN IF NOT EXISTS nota_relacion_afro TEXT,
  ADD COLUMN IF NOT EXISTS fuente_entidad VARCHAR(255),
  ADD COLUMN IF NOT EXISTS fuente_titulo TEXT,
  ADD COLUMN IF NOT EXISTS fecha_fuente DATE,
  ADD COLUMN IF NOT EXISTS fuente_url TEXT,
  ADD COLUMN IF NOT EXISTS estado_verificacion VARCHAR(30),
  ADD COLUMN IF NOT EXISTS fecha_verificacion DATE;

CREATE UNIQUE INDEX IF NOT EXISTS uq_ofertas_culturales_id_conocimiento
  ON ofertas_culturales (id_conocimiento)
  WHERE id_conocimiento IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ofertas_culturales_categoria
  ON ofertas_culturales (categoria);

CREATE INDEX IF NOT EXISTS idx_ofertas_culturales_relacion_afro
  ON ofertas_culturales (relacion_afro);

-- El índice vectorial existente puede seguir usando vector_cosine_ops.
-- La columna embedding ya es vector(1536), compatible con el cargador.
