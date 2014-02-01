@echo off

cd C:\Turbulenz\SDK\0.26.1

set "VIRTUAL_ENV=C:\Turbulenz\SDK\0.26.1\env"

if defined _OLD_VIRTUAL_PROMPT (
    set "PROMPT=%_OLD_VIRTUAL_PROMPT%"
) else (
    if not defined PROMPT (
        set "PROMPT=$P$G"
    )
	set "_OLD_VIRTUAL_PROMPT=%PROMPT%"	
)
set "PROMPT=(env) %PROMPT%"

if not defined _OLD_VIRTUAL_PYTHONHOME (
    set "_OLD_VIRTUAL_PYTHONHOME=%PYTHONHOME%"
)
set PYTHONHOME=

if defined _OLD_VIRTUAL_PATH (
    set "PATH=%_OLD_VIRTUAL_PATH%"
) else (
    set "_OLD_VIRTUAL_PATH=%PATH%"
)
set "PATH=%VIRTUAL_ENV%\Scripts;%PATH%"


cd C:\Users\Dude\Documents\GitHub\Getogo

makehtml --mode canvas-debug -t . start.js -o start.canvas.debug.html


TIMEOUT 1

REM start CHROME.EXE http://127.0.0.1:8070/#/play/getogo/start.canvas.debug.html


if "%1" == "" goto END

cd %1

set WEBAPP=

:END