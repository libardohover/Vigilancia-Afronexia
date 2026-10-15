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

Incluye cronómetro por pantalla, guion del orador, fuentes y referencias, y visor del prototipo.

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

React 19 · TypeScript 7 · Vite 8 · Tailwind CSS 4 · Lucide

Es una aplicación **100 % estática**: no necesita base de datos, servidor propio ni clave de API.

## Requisitos

- [Node.js](https://nodejs.org/) **20.19 o superior** (recomendado 22 LTS)

## Uso

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Servidor local (para presentar)

```bash
npm run build   # genera la versión optimizada en dist/
npm start       # la sirve en http://localhost:3000
```

O en un solo paso: `npm run serve`.

Scripts incluidos que instalan, compilan e inician:

- **Windows:** doble clic en `iniciar-servidor.bat`
- **Linux / macOS:** `./iniciar-servidor.sh`

Otros equipos de la misma red pueden abrir la presentación en `http://<IP-del-equipo>:3000`. Para usar otro puerto, define la variable `PORT` (en PowerShell: `$env:PORT=8080; npm start`).

### Sin Node.js

La carpeta `dist/` generada por `npm run build` se puede copiar a cualquier servidor web (Apache, nginx, IIS) o a un servicio de hosting estático (GitHub Pages, Netlify, Vercel).

### Con Docker (opcional)

```bash
docker build -t afronexia-vt .
docker run -d -p 3000:80 --name afronexia-vt afronexia-vt
```

## Estructura

```
├── src/
│   ├── App.tsx                 # Navegación, cronómetro y atajos
│   ├── components/
│   │   ├── screens/            # Las 8 pantallas de la presentación
│   │   ├── logos/              # AFRONEXIA, SENA, GIDT
│   │   └── *Modal.tsx          # Guion, referencias, visor del prototipo
│   ├── data/reportData.ts      # Datos del informe de vigilancia tecnológica
│   └── assets/images/          # Imágenes del territorio y del prototipo
├── public/                     # Archivos estáticos (favicon)
├── extras/github-ci.yml        # Flujo de CI opcional
├── Dockerfile · nginx.conf
└── iniciar-servidor.bat / .sh
```

## Integración continua (opcional)

`extras/github-ci.yml` compila el proyecto en cada `push`. Para activarlo, cópialo a `.github/workflows/ci.yml`. Necesitas un token de GitHub con el permiso **workflow**, o puedes crearlo desde la pestaña **Actions** del repositorio.

## Créditos

Proyecto AFRONEXIA · SENA – Centro de Comercio, Regional Antioquia · SENNOVA 2026 · Grupo de Investigación GIDT.
