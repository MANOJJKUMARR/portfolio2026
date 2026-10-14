@echo off
title Portfolio Live Server (Google Chrome)
echo ========================================================
echo   Launching Portfolio in Google Chrome with Live Reload
echo ========================================================
echo.

:: 1. Open Google Chrome specifically
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://127.0.0.1:3000"

:: 2. Start Live Server (with --no-browser so Edge does NOT open)
npx live-server --port=3000 --no-browser
