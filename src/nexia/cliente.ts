/**
 * Cliente de NEXIA para el navegador.
 * Llama al agente del servidor (POST /api/nexia/chat). Si no hay servidor —por ejemplo,
 * si la presentación se publica como sitio estático— usa el motor local con la base incluida.
 */
import { BASE_CONOCIMIENTO } from './baseConocimiento';
import { responderLocal, type RespuestaNexia } from './engine';

export interface RespuestaCliente extends RespuestaNexia {
  origen: string;
}

export interface Turno {
  rol: 'usuario' | 'nexia';
  texto: string;
}

export async function preguntarNexia(mensaje: string, historial: Turno[]): Promise<RespuestaCliente> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch('/api/nexia/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje, historial: historial.slice(-6) }),
      signal: ctrl.signal,
    });
    const tipo = res.headers.get('content-type') ?? '';
    if (res.ok && tipo.includes('application/json')) {
      const data = (await res.json()) as RespuestaCliente;
      if (data?.texto) return data;
    }
  } catch {
    /* sin servidor: se usa el motor local */
  } finally {
    clearTimeout(t);
  }
  return { ...responderLocal(BASE_CONOCIMIENTO, mensaje), origen: 'Base incluida (modo sin servidor)' };
}
