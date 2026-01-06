#!/bin/bash

echo "========================================"
echo "    NANOGEYSER WEBSITE SERVER"
echo "========================================"
echo

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js đã được cài đặt"
    echo "📦 Đang cài đặt dependencies..."
    
    if npm install express; then
        echo "🚀 Đang khởi động Node.js server..."
        echo
        node server.js
    else
        echo "❌ Không thể cài đặt Express"
        echo "🐍 Thử chạy với Python server..."
        python_server
    fi
else
    echo "❌ Node.js chưa được cài đặt!"
    echo "📥 Vui lòng tải và cài đặt Node.js từ: https://nodejs.org"
    echo
    echo "🐍 Thử chạy với Python server..."
    python_server
fi

python_server() {
    echo
    echo "🐍 Đang thử khởi động Python server..."
    
    if command -v python3 &> /dev/null; then
        echo "✅ Python3 đã được cài đặt"
        echo "🌐 Website sẽ chạy tại: http://localhost:8000"
        echo "🔐 Đăng nhập: http://localhost:8000/login.html"
        echo
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        echo "✅ Python đã được cài đặt"
        echo "🌐 Website sẽ chạy tại: http://localhost:8000"
        echo "🔐 Đăng nhập: http://localhost:8000/login.html"
        echo
        python -m http.server 8000
    else
        echo "❌ Python chưa được cài đặt!"
        echo "📥 Vui lòng cài đặt Python hoặc Node.js"
    fi
}