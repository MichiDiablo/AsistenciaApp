@echo off
REM Crea un entorno virtual en la carpeta "venv"
python -m venv venv

REM Activa el entorno virtual
call venv\Scripts\activate.bat

REM Instala Flask en el entorno virtual
pip install flask

REM Mensaje final
echo El entorno virtual se ha creado, activado, y Flask se ha instalado correctamente.
pause
