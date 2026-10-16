@echo off
REM Inicia AFRONEXIA VT Intelligence en Windows
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias...
  call npm install || goto :error
)
if not exist .env.local (
  copy .env.example .env.local >nul
  echo Se creo .env.local. Agrega tu GEMINI_API_KEY para activar el agente con IA.
)
call npm run build || goto :error
call npm start
goto :eof
:error
echo Ocurrio un error. Revisa los mensajes anteriores.
pause
