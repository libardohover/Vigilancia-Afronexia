#!/usr/bin/env bash
# Inicia AFRONEXIA VT Intelligence en Linux/macOS
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
npm run build
npm start
