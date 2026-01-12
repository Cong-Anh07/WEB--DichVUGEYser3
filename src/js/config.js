// Configuration file for Nanogeyser Website
const config = {
    admin: {
        username: 'admin',
        password: 'nanogeyser2024!',
        email: 'admin@nanogeyser.vn',
        name: 'Quản trị viên Nanogeyser'
    },
    customer: {
        username: 'customer',
        password: 'customer123',
        email: 'customer@email.com',
        name: 'Nguyễn Văn A',
        phone: '0901234567'
    },
    company: {
        name: 'Nanogeyser Vietnam',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '1900 1234',
        email: 'info@nanogeyser.vn',
        website: 'https://nanogeyser.vn'
    },
    services: [
        { id: 'maintenance', name: 'Bảo dưỡng định kỳ', price: 300000, duration: '60-90 phút' },
        { id: 'repair', name: 'Sửa chữa', price: 200000, duration: '30-120 phút' },
        { id: 'warranty', name: 'Bảo hành', price: 0, duration: '30-60 phút' },
        { id: 'installation', name: 'Lắp đặt', price: 500000, duration: '120-180 phút' }
    ],
    contact: {
        hotline: '1900 1234',
        email: 'support@nanogeyser.vn',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        workingHours: 'Thứ 2 - Chủ nhật: 8:00 - 20:00'
    }
};

window.CONFIG = config;
