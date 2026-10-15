@echo off
REM Inicia AFRONEXIA VT Intelligence en Windows
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias...
  call npm install || goto :error
)
call npm run build || goto :error
call npm start
goto :eof
:error
echo Ocurrio un error. Revisa los mensajes anteriores.
pause
