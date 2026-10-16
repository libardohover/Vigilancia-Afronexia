#!/usr/bin/env bash
# Inicia AFRONEXIA VT Intelligence en Linux/macOS
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "Se creó .env.local. Agrega tu GEMINI_API_KEY para activar el agente con IA."
fi
npm run build
npm start
