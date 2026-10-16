/**
 * Servidor de AFRONEXIA VT Intelligence 2026.
 * - Sirve la presentación (frontend compilado en dist/ o Vite en desarrollo).
 * - Expone el agente NEXIA en POST /api/nexia/chat.
 */
import './server/env.js'; // debe ir primero: carga .env.local / .env
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { geminiConfigurado, responderNexia, MODELO_POR_DEFECTO, type MensajeHistorial } from './server/nexiaAgent.js';
import { obtenerBase } from './server/knowledgeStore.js';
import { embeddingsDisponibles } from './server/embeddings.js';

const IS_PROD = process.env.NODE_ENV === 'production';

async function main() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  app.disable('x-powered-by');
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', async (_req, res) => {
    const { datos, origen } = await obtenerBase();
    res.json({
      status: 'ok',
      modo: IS_PROD ? 'produccion' : 'desarrollo',
      nexia: {
        motor: geminiConfigurado() ? `Gemini (${process.env.GEMINI_MODEL || MODELO_POR_DEFECTO}) + herramientas` : 'Motor local',
        base_conocimiento: origen,
        registros: datos.length,
        busqueda_vectorial: embeddingsDisponibles() && Boolean(process.env.DATABASE_URL),
      },
    });
  });

  app.post('/api/nexia/chat', async (req, res) => {
    const mensaje = typeof req.body?.mensaje === 'string' ? req.body.mensaje.trim() : '';
    if (!mensaje) {
      res.status(400).json({ error: 'El campo "mensaje" es obligatorio.' });
      return;
    }
    const historial: MensajeHistorial[] = Array.isArray(req.body?.historial)
      ? req.body.historial
          .filter((h: unknown): h is MensajeHistorial => typeof h === 'object' && h !== null && typeof (h as MensajeHistorial).texto === 'string')
          .slice(-6)
      : [];
    try {
      res.json(await responderNexia(mensaje.slice(0, 2000), historial));
    } catch (err) {
      console.error('[NEXIA] Error:', err);
      res.status(500).json({ error: 'NEXIA no pudo procesar la consulta.' });
    }
  });

  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
  });

  if (!IS_PROD) {
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const dist = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(path.join(dist, 'index.html'))) {
      console.error('[AFRONEXIA] No se encontró dist/index.html. Ejecuta primero: npm run build');
      process.exit(1);
    }
    app.use(express.static(dist, { index: false, maxAge: '1h' }));
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  const { origen } = await obtenerBase();
  const server = app.listen(PORT, HOST, () => {
    console.log('\n  AFRONEXIA VT Intelligence 2026');
    console.log(`  ➜ Modo:    ${IS_PROD ? 'producción' : 'desarrollo'}`);
    console.log(`  ➜ Local:   http://localhost:${PORT}`);
    console.log(`  ➜ Red:     http://<IP-de-este-equipo>:${PORT}`);
    console.log(`  ➜ NEXIA:   ${geminiConfigurado() ? 'Gemini + base de conocimiento + web' : 'motor local (sin GEMINI_API_KEY)'}`);
    console.log(`  ➜ Base:    ${origen}\n`);
  });
  server.on('error', (err: NodeJS.ErrnoException) => {
    console.error(err.code === 'EADDRINUSE' ? `[AFRONEXIA] El puerto ${PORT} ya está en uso. Define otro PORT en .env.local` : err);
    process.exit(1);
  });
}

main().catch(err => {
  console.error('[AFRONEXIA] No se pudo iniciar:', err);
  process.exit(1);
});
