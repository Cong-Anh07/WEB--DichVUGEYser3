// Configuration file for Nanogeyser Website
// Browser-compatible configuration

const config = {
    // Admin Credentials
    admin: {
        username: 'admin',
        password: 'nanogeyser2024!',
        email: 'admin@nanogeyser.vn',
        name: 'Quản trị viên Nanogeyser'
    },

    // Customer Demo Account
    customer: {
        username: 'customer',
        password: 'customer123',
        email: 'customer@email.com',
        name: 'Nguyễn Văn A',
        phone: '0901234567'
    },

    // Company Information
    company: {
        name: 'Nanogeyser Vietnam',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '1900 1234',
        email: 'info@nanogeyser.vn',
        website: 'https://nanogeyser.vn'
    },

    // Product Information
    products: [
        {
            id: 'NG-PRO-2024',
            name: 'Nanogeyser Pro 2024',
            category: 'Pro',
            price: 15000000,
            warranty: 24,
            features: [
                'Công nghệ lọc RO 9 cấp',
                'Màn hình LCD hiển thị TDS',
                'Tự động rửa màng',
                'Báo thay lõi lọc',
                'Bình áp 12L'
            ],
            specifications: {
                capacity: '12L/h',
                pressure: '0.1-0.4 MPa',
                power: '36W',
                dimensions: '350x180x420mm',
                weight: '8.5kg'
            }
        },
        {
            id: 'NG-BASIC-2023',
            name: 'Nanogeyser Basic 2023',
            category: 'Basic',
            price: 8000000,
            warranty: 18,
            features: [
                'Công nghệ lọc RO 7 cấp',
                'Đèn UV diệt khuẩn',
                'Van áp suất tự động',
                'Bình áp 8L'
            ],
            specifications: {
                capacity: '8L/h',
                pressure: '0.1-0.3 MPa',
                power: '24W',
                dimensions: '320x160x380mm',
                weight: '6.5kg'
            }
        },
        {
            id: 'NG-PREMIUM-2024',
            name: 'Nanogeyser Premium 2024',
            category: 'Premium',
            price: 25000000,
            warranty: 36,
            features: [
                'Công nghệ lọc RO 11 cấp',
                'Màn hình cảm ứng thông minh',
                'Tự động rửa màng theo lịch',
                'Cảnh báo chất lượng nước',
                'Bình áp 15L',
                'Kết nối WiFi, điều khiển từ xa'
            ],
            specifications: {
                capacity: '15L/h',
                pressure: '0.1-0.5 MPa',
                power: '48W',
                dimensions: '380x200x450mm',
                weight: '12kg'
            }
        }
    ],

    // Service Information
    services: [
        {
            id: 'maintenance',
            name: 'Bảo dưỡng định kỳ',
            price: 300000,
            duration: '60-90 phút',
            description: 'Vệ sinh, thay lõi lọc, kiểm tra hệ thống'
        },
        {
            id: 'repair',
            name: 'Sửa chữa',
            price: 200000,
            duration: '30-120 phút',
            description: 'Khắc phục sự cố, thay thế linh kiện'
        },
        {
            id: 'warranty',
            name: 'Bảo hành',
            price: 0,
            duration: '30-60 phút',
            description: 'Dịch vụ bảo hành miễn phí trong thời hạn'
        },
        {
            id: 'installation',
            name: 'Lắp đặt',
            price: 500000,
            duration: '120-180 phút',
            description: 'Lắp đặt máy lọc nước tại nhà'
        }
    ],

    // Contact Information
    contact: {
        hotline: '1900 1234',
        email: 'support@nanogeyser.vn',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        workingHours: 'Thứ 2 - Chủ nhật: 8:00 - 20:00'
    }
};

// Export for browser
window.CONFIG = config;
