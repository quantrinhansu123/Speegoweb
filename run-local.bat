@echo off
echo ========================================================
echo   Dang khoi chay Web Server Local tai cong 8000...
echo   Dia chi web: http://localhost:8000
echo ========================================================
start http://localhost:8000
python -m http.server 8000
pause
