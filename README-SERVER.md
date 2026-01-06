# 🚀 Hướng Dẫn Chạy Server Localhost

## Cách 1: Chạy Tự Động (Khuyến nghị)

### Windows:
```bash
# Nhấp đúp vào file hoặc chạy lệnh:
start-server.bat
```

### Mac/Linux:
```bash
# Mở terminal và chạy:
chmod +x start-server.sh
./start-server.sh
```

## Cách 2: Chạy Thủ Công

### Với Node.js (Khuyến nghị):
```bash
# 1. Cài đặt Node.js từ https://nodejs.org
# 2. Cài đặt dependencies:
npm install express

# 3. Chạy server:
npm start
# hoặc
node server.js
```

**Truy cập:**
- 🏠 Trang chủ: http://localhost:3000
- 🔐 Đăng nhập: http://localhost:3000/login
- 👨‍💼 Admin: http://localhost:3000/admin
- 👤 Khách hàng: http://localhost:3000/customer

### Với Python:
```bash
# Python 3:
python3 -m http.server 8000

# Python 2:
python -m http.server 8000
```

**Truy cập:**
- 🏠 Trang chủ: http://localhost:8000
- 🔐 Đăng nhập: http://localhost:8000/login.html
- 👨‍💼 Admin: http://localhost:8000/admin-dashboard.html
- 👤 Khách hàng: http://localhost:8000/customer-dashboard.html

## 🔐 Tài Khoản Demo

| Loại | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Khách hàng | customer | customer123 |

## 🛠️ Troubleshooting

### Lỗi "Port đã được sử dụng":
```bash
# Thay đổi port trong server.js:
const PORT = 3001; // hoặc port khác
```

### Lỗi "Node.js không tìm thấy":
1. Tải Node.js từ: https://nodejs.org
2. Cài đặt và khởi động lại terminal
3. Kiểm tra: `node --version`

### Lỗi "Python không tìm thấy":
1. Tải Python từ: https://python.org
2. Đảm bảo chọn "Add to PATH" khi cài đặt
3. Kiểm tra: `python --version`

## 📱 Tính Năng Website

### 🏠 Trang Chủ
- Hero section với thông điệp chính
- Giới thiệu dịch vụ
- Form đặt lịch
- Thông tin liên hệ

### 👨‍💼 Admin Dashboard
- Thống kê tổng quan
- Quản lý đặt lịch
- Quản lý khách hàng
- Quản lý bảo hành
- Báo cáo doanh thu

### 👤 Customer Dashboard
- Tổng quan tài khoản
- Quản lý sản phẩm
- Đặt lịch bảo dưỡng
- Theo dõi bảo hành
- Cập nhật thông tin cá nhân

## 🔧 Development

### Chạy với auto-reload:
```bash
npm install -g nodemon
npm run dev
```

### Cấu trúc thư mục:
```
nanogeyser-website/
├── index.html              # Trang chủ
├── login.html              # Đăng nhập
├── admin-dashboard.html    # Dashboard admin
├── customer-dashboard.html # Dashboard khách hàng
├── styles.css              # CSS chính
├── script.js               # JavaScript trang chủ
├── auth.js                 # Xử lý đăng nhập
├── admin.js                # JavaScript admin
├── customer.js             # JavaScript khách hàng
├── server.js               # Node.js server
├── package.json            # Dependencies
├── start-server.bat        # Script Windows
├── start-server.sh         # Script Mac/Linux
└── README-SERVER.md        # Hướng dẫn này
```

## 🌐 Deploy Production

### Với Netlify/Vercel:
1. Upload toàn bộ files (trừ server.js, package.json)
2. Set index.html làm trang chủ

### Với VPS/Hosting:
1. Upload toàn bộ files
2. Cài đặt Node.js trên server
3. Chạy: `npm install && npm start`
4. Sử dụng PM2 để quản lý process

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser (F12)
2. Xem log terminal
3. Đảm bảo tất cả files đều có trong thư mục
4. Kiểm tra firewall/antivirus

---
© 2024 Nanogeyser - Website Dịch Vụ Bảo Hành Bảo Dưỡng