# AFRONEXIA · VT Intelligence 2026

Dashboard interactivo y **presentación científica de 15 minutos** para la sustentación de la Vigilancia Tecnológica del proyecto **AFRONEXIA** (SENA – SENNOVA 2026, Grupo de Investigación GIDT).

> *"Conectando raíces, creando experiencias."*

## Contenido

| # | Pantalla | Duración |
|---|---|---|
| 1 | Contexto territorial e I+D+i | 1:00 |
| 2 | Metodología de vigilancia tecnológica (UNE 166006) | 1:30 |
| 3 | Resultados cienciométricos mundiales | 2:30 |
| 4 | Árbol de la Ciencia (Tree of Science) | 2:00 |
| 5 | Vigilancia de patentes y propiedad industrial | 2:00 |
| 6 | Priorización tecnológica y madurez TRL | 2:00 |
| 7 | Evolución de ingeniería del prototipo | 2:30 |
| 8 | Conclusiones y hoja de ruta | 1:30 |

Incluye cronómetro por pantalla, guion del orador, fuentes y referencias, y el **prototipo funcional con el agente NEXIA**.

## Agente virtual NEXIA

En el prototipo (pantalla 7 → **Ver Prototipo Funcional**, o pantalla 8), NEXIA responde como agente virtual de turismo cultural de Barrancabermeja. Por ejemplo:

> *Tengo tres días de vacaciones y vamos dos adultos y dos niños. Dame una ruta por día, dónde bañarnos con los niños y dónde tomar un buen tinto.*

Responde con un itinerario por día, sitios **seguros** para bañarse con niños (piscinas, parque acuático y pozos naturales), los sitios **no recomendados** (río Magdalena y aguas abiertas de las ciénagas) con su motivo, dónde tomar tinto, los datos que hay que confirmar (⚠️) y las **fuentes** de cada dato.

**Cómo funciona**

| Capa | Descripción |
|---|---|
| Base de conocimiento | `ofertas_culturales` (PostgreSQL) con la estructura de `database/01_adaptar_base_conocimiento.sql`. Incluye 30 registros investigados en la web sobre Barrancabermeja, cada uno con fuente, fecha y estado de verificación (`src/nexia/baseConocimiento.ts`). |
| Agente con IA (con `GEMINI_API_KEY`) | Gemini con tres herramientas: `buscar_base_conocimiento` (RAG), `planificar_itinerario` y `buscar_en_web` (Google, para datos actuales). |
| Motor local (sin clave) | Interpreta la consulta (días, adultos, niños, intereses), recupera y arma el itinerario con la misma base. También funciona en el navegador si la presentación se publica como sitio estático. |
| Búsqueda vectorial (opcional) | pgvector sobre la columna `embedding`, combinada con la búsqueda por palabras. |

Para conectar la base de datos real del prototipo, ver [`database/README.md`](database/README.md).

## Atajos de teclado

| Tecla | Acción |
|---|---|
| `→` · `Espacio` · `Av Pág` | Pantalla siguiente |
| `←` · `Re Pág` | Pantalla anterior |
| `1` … `8` | Ir a una pantalla |
| `P` | Iniciar / pausar cronómetro |
| `N` | Mostrar / ocultar guion del orador |
| `R` | Mostrar / ocultar referencias |
| `F` | Pantalla completa |

## Tecnologías

React 19 · TypeScript 7 · Vite 8 · Tailwind CSS 4 · Express 4 · Google Gemini (`@google/genai`) · PostgreSQL + pgvector (`pg`)

La presentación funciona sin base de datos ni clave de API. El servidor incluido (Express) agrega el agente NEXIA con IA, la conexión a PostgreSQL y la búsqueda web.

## Requisitos

- [Node.js](https://nodejs.org/) **20.19 o superior** (recomendado 22 LTS)

## Uso

```bash
npm install
cp .env.example .env.local     # en Windows: copy .env.example .env.local
```

En `.env.local` pon tu `GEMINI_API_KEY` para activar el agente con IA y, si quieres usar la base del prototipo, `DATABASE_URL`.

### Desarrollo

```bash
npm run dev
```

### Servidor local (para presentar)

```bash
npm run build   # compila la presentación y el servidor en dist/
npm start       # inicia en http://localhost:3000
```

O en un solo paso: `npm run serve`.

Scripts incluidos que instalan, compilan e inician:

- **Windows:** doble clic en `iniciar-servidor.bat`
- **Linux / macOS:** `./iniciar-servidor.sh`

Otros equipos de la misma red pueden abrir la presentación en `http://<IP-del-equipo>:3000`. Para usar otro puerto, define la variable `PORT` (en PowerShell: `$env:PORT=8080; npm start`).

### Como sitio estático

Los archivos de `dist/` (sin `server.cjs`) se pueden publicar en cualquier hosting estático (GitHub Pages, Netlify, IIS). NEXIA seguirá funcionando con el motor local y la base incluida, sin IA generativa ni búsqueda web.

### Con Docker (opcional)

```bash
docker build -t afronexia-vt .
docker run -d -p 3000:3000 --env-file .env.local --name afronexia-vt afronexia-vt
```

### Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Desarrollo (Express + Vite) |
| `npm run build` / `npm start` | Compilar e iniciar en producción |
| `npm run kb:cargar` | Cargar la base de conocimiento en PostgreSQL (`-- --migrar`, `-- --simular`) |
| `npm run kb:embeddings` | Generar embeddings para la búsqueda vectorial |
| `npm run kb:sql` | Regenerar `database/02_base_conocimiento_barrancabermeja.sql` |
| `npm run typecheck` | Verificación de tipos |

## Estructura

```
├── server.ts                   # Servidor Express: presentación + API de NEXIA
├── server/
│   ├── nexiaAgent.ts           # Agente Gemini con herramientas
│   ├── knowledgeStore.ts       # Lectura de ofertas_culturales (PostgreSQL o base incluida)
│   └── embeddings.ts           # Embeddings (Gemini u OpenAI) para pgvector
├── database/                   # Migración, datos SQL y guía
├── scripts/                    # kb:cargar, kb:embeddings, kb:sql, compilación del servidor
├── src/
│   ├── nexia/                  # Base de conocimiento, motor local, cliente y Markdown
│   ├── App.tsx                 # Navegación, cronómetro y atajos
│   ├── components/
│   │   ├── screens/            # Las 8 pantallas de la presentación
│   │   ├── logos/              # AFRONEXIA, SENA, GIDT
│   │   └── *Modal.tsx          # Guion, referencias, visor del prototipo
│   ├── data/reportData.ts      # Datos del informe de vigilancia tecnológica
│   └── assets/images/          # Imágenes del territorio y del prototipo
├── public/                     # Archivos estáticos (favicon)
├── extras/github-ci.yml        # Flujo de CI opcional
├── Dockerfile
└── iniciar-servidor.bat / .sh
```

## Integración continua (opcional)

`extras/github-ci.yml` compila el proyecto en cada `push`. Para activarlo, cópialo a `.github/workflows/ci.yml`. Necesitas un token de GitHub con el permiso **workflow**, o puedes crearlo desde la pestaña **Actions** del repositorio.

## Fuentes de la base de conocimiento

Alcaldía Distrital de Barrancabermeja, CAFABA, El Tiempo, Semana, Vanguardia, Blu Radio, El Frente, Metropolitano, Weekend Santander, Turismo enColombia, Senderismo Colombia, Tripadvisor, Rappi y Carta.menu. Cada registro enlaza su fuente; los datos marcados como `requiere_confirmacion` deben verificarse antes de publicarse como oficiales.

## Créditos

Proyecto AFRONEXIA · SENA – Centro de Comercio, Regional Antioquia · SENNOVA 2026 · Grupo de Investigación GIDT.
