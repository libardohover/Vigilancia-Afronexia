/**
 * Embeddings para la búsqueda vectorial (pgvector, columna embedding vector(1536)).
 *
 * IMPORTANTE: la consulta debe vectorizarse con EL MISMO modelo con que se generaron
 * los embeddings guardados en la tabla. Configúralo en .env.local:
 *
 *   EMBEDDINGS_PROVEEDOR=gemini   (gemini-embedding-2 a 1536 dimensiones)
 *   EMBEDDINGS_PROVEEDOR=openai   (text-embedding-3-small, 1536 dimensiones; requiere OPENAI_API_KEY)
 *   EMBEDDINGS_PROVEEDOR=ninguno  (por defecto: solo búsqueda por palabras)
 */
import { GoogleGenAI } from '@google/genai';

export const DIMENSIONES = 1536;

function proveedor(): 'gemini' | 'openai' | 'ninguno' {
  const v = (process.env.EMBEDDINGS_PROVEEDOR || 'ninguno').trim().toLowerCase();
  return v === 'gemini' || v === 'openai' ? v : 'ninguno';
}

export function embeddingsDisponibles(): boolean {
  const p = proveedor();
  if (p === 'gemini') return Boolean(process.env.GEMINI_API_KEY?.trim());
  if (p === 'openai') return Boolean(process.env.OPENAI_API_KEY?.trim());
  return false;
}

export async function embedTextos(textos: string[]): Promise<number[][]> {
  const p = proveedor();
  if (p === 'gemini') {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const r = await ai.models.embedContent({
      model: process.env.EMBEDDINGS_MODELO || 'gemini-embedding-2',
      contents: textos,
      config: { outputDimensionality: DIMENSIONES },
    });
    return (r.embeddings ?? []).map(e => e.values ?? []);
  }
  if (p === 'openai') {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: process.env.EMBEDDINGS_MODELO || 'text-embedding-3-small', input: textos }),
    });
    if (!res.ok) throw new Error(`OpenAI embeddings: HTTP ${res.status}`);
    const data = (await res.json()) as { data: { embedding: number[] }[] };
    return data.data.map(d => d.embedding);
  }
  throw new Error('No hay proveedor de embeddings configurado (EMBEDDINGS_PROVEEDOR).');
}

export async function embedConsulta(texto: string): Promise<number[] | null> {
  if (!embeddingsDisponibles()) return null;
  const [v] = await embedTextos([texto]);
  return v && v.length === DIMENSIONES ? v : null;
}
