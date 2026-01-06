@echo off
echo ========================================
echo    NANOGEYSER WEBSITE SERVER
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js chưa được cài đặt!
    echo 📥 Vui lòng tải và cài đặt Node.js từ: https://nodejs.org
    echo.
    echo 🐍 Thử chạy với Python server...
    goto :python_server
)

echo ✅ Node.js đã được cài đặt
echo 📦 Đang cài đặt dependencies...
npm install express

if %errorlevel% neq 0 (
    echo ❌ Không thể cài đặt Express
    echo 🐍 Thử chạy với Python server...
    goto :python_server
)

echo 🚀 Đang khởi động Node.js server...
echo.
node server.js
goto :end

:python_server
echo.
echo 🐍 Đang thử khởi động Python server...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    python3 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Python chưa được cài đặt!
        echo 📥 Vui lòng cài đặt Python hoặc Node.js
        pause
        goto :end
    ) else (
        echo ✅ Python3 đã được cài đặt
        echo 🌐 Website sẽ chạy tại: http://localhost:8000
        echo 🔐 Đăng nhập: http://localhost:8000/login.html
        echo.
        python3 -m http.server 8000
    )
) else (
    echo ✅ Python đã được cài đặt
    echo 🌐 Website sẽ chạy tại: http://localhost:8000
    echo 🔐 Đăng nhập: http://localhost:8000/login.html
    echo.
    python -m http.server 8000
)

:end
pause