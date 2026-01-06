// Data management for Nanogeyser Website
// Contains sample data for products, customers, bookings, etc.

const sampleData = {
    // Sample Products with detailed information
    products: [
        {
            id: 'NG-PRO-2024-001234',
            productCode: 'NG-PRO-2024',
            serialNumber: '001234',
            name: 'Nanogeyser Pro 2024',
            category: 'Pro',
            purchaseDate: '2023-01-15',
            warrantyExpiry: '2025-01-15',
            customerId: 'C001',
            status: 'active',
            lastMaintenance: '2023-10-15',
            nextMaintenance: '2024-01-15',
            maintenanceHistory: [
                {
                    date: '2023-07-15',
                    type: 'maintenance',
                    technician: 'Nguyễn Văn B',
                    notes: 'Thay lõi lọc số 1, 2, 3. Vệ sinh bình chứa.'
                },
                {
                    date: '2023-10-15',
                    type: 'maintenance',
                    technician: 'Trần Văn C',
                    notes: 'Thay lõi lọc RO. Kiểm tra áp suất hệ thống.'
                }
            ]
        },
        {
            id: 'NG-BASIC-2023-005678',
            productCode: 'NG-BASIC-2023',
            serialNumber: '005678',
            name: 'Nanogeyser Basic 2023',
            category: 'Basic',
            purchaseDate: '2022-06-10',
            warrantyExpiry: '2024-06-10',
            customerId: 'C001',
            status: 'warning', // sắp hết bảo hành
            lastMaintenance: '2023-12-10',
            nextMaintenance: '2024-06-10',
            maintenanceHistory: [
                {
                    date: '2022-12-10',
                    type: 'maintenance',
                    technician: 'Lê Thị D',
                    notes: 'Bảo dưỡng định kỳ lần đầu. Thay lõi lọc.'
                },
                {
                    date: '2023-06-10',
                    type: 'repair',
                    technician: 'Nguyễn Văn B',
                    notes: 'Sửa chữa van áp suất. Thay lõi lọc số 2.'
                },
                {
                    date: '2023-12-10',
                    type: 'maintenance',
                    technician: 'Trần Văn C',
                    notes: 'Bảo dưỡng định kỳ. Vệ sinh toàn bộ hệ thống.'
                }
            ]
        },
        {
            id: 'NG-PREMIUM-2024-009876',
            productCode: 'NG-PREMIUM-2024',
            serialNumber: '009876',
            name: 'Nanogeyser Premium 2024',
            category: 'Premium',
            purchaseDate: '2023-12-01',
            warrantyExpiry: '2026-12-01',
            customerId: 'C002',
            status: 'active',
            lastMaintenance: null,
            nextMaintenance: '2024-03-01',
            maintenanceHistory: []
        }
    ],

    // Sample Customers
    customers: [
        {
            id: 'C001',
            name: 'Nguyễn Văn A',
            phone: '0901234567',
            email: 'nguyenvana@email.com',
            address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
            registerDate: '2023-01-10',
            customerType: 'premium',
            totalProducts: 2,
            totalServices: 5,
            notes: 'Khách hàng VIP, ưu tiên phục vụ'
        },
        {
            id: 'C002',
            name: 'Trần Thị B',
            phone: '0902345678',
            email: 'tranthib@email.com',
            address: '456 Đường DEF, Phường UVW, Quận 3, TP.HCM',
            registerDate: '2023-12-01',
            customerType: 'standard',
            totalProducts: 1,
            totalServices: 0,
            notes: 'Khách hàng mới'
        },
        {
            id: 'C003',
            name: 'Lê Văn C',
            phone: '0903456789',
            email: 'levanc@email.com',
            address: '789 Đường GHI, Phường RST, Quận 7, TP.HCM',
            registerDate: '2022-05-15',
            customerType: 'standard',
            totalProducts: 1,
            totalServices: 3,
            notes: ''
        }
    ],

    // Sample Bookings
    bookings: [
        {
            id: 'B001',
            customerId: 'C001',
            customerName: 'Nguyễn Văn A',
            customerPhone: '0901234567',
            productId: 'NG-PRO-2024-001234',
            serviceType: 'maintenance',
            serviceName: 'Bảo dưỡng định kỳ',
            appointmentDate: '2024-01-15',
            appointmentTime: '09:00',
            status: 'confirmed',
            technicianId: 'T001',
            technicianName: 'Nguyễn Văn B',
            address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
            notes: 'Khách yêu cầu thay lõi lọc số 1, 2, 3',
            createdDate: '2024-01-10',
            estimatedDuration: 90, // minutes
            estimatedCost: 300000
        },
        {
            id: 'B002',
            customerId: 'C001',
            customerName: 'Nguyễn Văn A',
            customerPhone: '0901234567',
            productId: 'NG-BASIC-2023-005678',
            serviceType: 'repair',
            serviceName: 'Sửa chữa',
            appointmentDate: '2024-01-20',
            appointmentTime: '14:00',
            status: 'pending',
            technicianId: null,
            technicianName: null,
            address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
            notes: 'Máy có tiếng ồn bất thường, áp lực nước yếu',
            createdDate: '2024-01-12',
            estimatedDuration: 60,
            estimatedCost: 200000
        },
        {
            id: 'B003',
            customerId: 'C002',
            customerName: 'Trần Thị B',
            customerPhone: '0902345678',
            productId: 'NG-PREMIUM-2024-009876',
            serviceType: 'installation',
            serviceName: 'Lắp đặt',
            appointmentDate: '2024-01-18',
            appointmentTime: '10:00',
            status: 'completed',
            technicianId: 'T002',
            technicianName: 'Trần Văn C',
            address: '456 Đường DEF, Phường UVW, Quận 3, TP.HCM',
            notes: 'Lắp đặt máy mới, hướng dẫn sử dụng',
            createdDate: '2023-12-28',
            completedDate: '2024-01-18',
            estimatedDuration: 180,
            actualDuration: 165,
            estimatedCost: 500000,
            actualCost: 500000
        }
    ],

    // Sample Technicians
    technicians: [
        {
            id: 'T001',
            name: 'Nguyễn Văn B',
            phone: '0911111111',
            email: 'technician1@nanogeyser.vn',
            specialization: ['maintenance', 'repair'],
            experience: 5, // years
            rating: 4.8,
            totalJobs: 234,
            status: 'active',
            workingArea: ['Quận 1', 'Quận 3', 'Quận 5']
        },
        {
            id: 'T002',
            name: 'Trần Văn C',
            phone: '0922222222',
            email: 'technician2@nanogeyser.vn',
            specialization: ['installation', 'maintenance'],
            experience: 3,
            rating: 4.6,
            totalJobs: 156,
            status: 'active',
            workingArea: ['Quận 2', 'Quận 7', 'Quận 9']
        },
        {
            id: 'T003',
            name: 'Lê Thị D',
            phone: '0933333333',
            email: 'technician3@nanogeyser.vn',
            specialization: ['repair', 'warranty'],
            experience: 7,
            rating: 4.9,
            totalJobs: 312,
            status: 'active',
            workingArea: ['Quận 4', 'Quận 6', 'Quận 8']
        }
    ],

    // Sample Service History
    serviceHistory: [
        {
            id: 'S001',
            bookingId: 'B003',
            customerId: 'C002',
            productId: 'NG-PREMIUM-2024-009876',
            serviceType: 'installation',
            technicianId: 'T002',
            serviceDate: '2024-01-18',
            duration: 165, // minutes
            cost: 500000,
            status: 'completed',
            rating: 5,
            feedback: 'Kỹ thuật viên chuyên nghiệp, lắp đặt nhanh gọn',
            workDone: [
                'Khảo sát vị trí lắp đặt',
                'Lắp đặt máy lọc nước',
                'Kết nối đường ống',
                'Test hoạt động',
                'Hướng dẫn sử dụng'
            ],
            partsUsed: [
                {
                    name: 'Ống nối nước',
                    quantity: 2,
                    cost: 50000
                },
                {
                    name: 'Van khóa',
                    quantity: 1,
                    cost: 30000
                }
            ]
        }
    ],

    // Sample Warranty Claims
    warrantyClaims: [
        {
            id: 'W001',
            productId: 'NG-BASIC-2023-005678',
            customerId: 'C001',
            claimDate: '2023-06-10',
            issue: 'Van áp suất bị hỏng',
            status: 'resolved',
            resolution: 'Thay thế van áp suất mới',
            technicianId: 'T001',
            resolutionDate: '2023-06-10',
            cost: 0, // warranty
            notes: 'Lỗi do sản xuất, thay thế miễn phí'
        }
    ],

    // Sample Inventory
    inventory: [
        {
            id: 'P001',
            name: 'Lõi lọc số 1 - PP Cotton',
            category: 'filter',
            stock: 150,
            minStock: 20,
            price: 50000,
            supplier: 'Nhà cung cấp A',
            lastRestocked: '2024-01-01'
        },
        {
            id: 'P002',
            name: 'Lõi lọc số 2 - GAC Carbon',
            category: 'filter',
            stock: 120,
            minStock: 15,
            price: 80000,
            supplier: 'Nhà cung cấp A',
            lastRestocked: '2024-01-01'
        },
        {
            id: 'P003',
            name: 'Màng RO',
            category: 'membrane',
            stock: 45,
            minStock: 10,
            price: 350000,
            supplier: 'Nhà cung cấp B',
            lastRestocked: '2023-12-15'
        },
        {
            id: 'P004',
            name: 'Van áp suất',
            category: 'component',
            stock: 25,
            minStock: 5,
            price: 120000,
            supplier: 'Nhà cung cấp C',
            lastRestocked: '2023-12-20'
        }
    ]
};

// Utility functions for data management
const dataUtils = {
    // Get product by ID
    getProductById: (id) => {
        return sampleData.products.find(product => product.id === id);
    },

    // Get customer by ID
    getCustomerById: (id) => {
        return sampleData.customers.find(customer => customer.id === id);
    },

    // Get bookings by customer ID
    getBookingsByCustomer: (customerId) => {
        return sampleData.bookings.filter(booking => booking.customerId === customerId);
    },

    // Get products by customer ID
    getProductsByCustomer: (customerId) => {
        return sampleData.products.filter(product => product.customerId === customerId);
    },

    // Get warranty status
    getWarrantyStatus: (product) => {
        const today = new Date();
        const warrantyExpiry = new Date(product.warrantyExpiry);
        const daysLeft = Math.ceil((warrantyExpiry - today) / (1000 * 60 * 60 * 24));
        
        if (daysLeft < 0) return { status: 'expired', daysLeft: 0 };
        if (daysLeft < 30) return { status: 'warning', daysLeft };
        return { status: 'active', daysLeft };
    },

    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    },

    // Format date
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }
};

// Export data and utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sampleData, dataUtils };
} else {
    window.SAMPLE_DATA = sampleData;
    window.DATA_UTILS = dataUtils;
}