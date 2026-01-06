// Admin Dashboard JavaScript

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = authFunctions.checkAuth();
    if (!currentUser || currentUser.type !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Set admin name
    document.getElementById('adminName').textContent = currentUser.name;
    
    // Initialize dashboard
    initializeDashboard();
    initializeSidebar();
    loadDashboardData();
});

// Initialize sidebar navigation
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                loadSectionData(sectionId);
            }
        });
    });
}

// Initialize dashboard
function initializeDashboard() {
    // Set current date for date filters
    const today = new Date();
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    if (startDate && endDate) {
        startDate.value = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        endDate.value = today.toISOString().split('T')[0];
    }
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard statistics
    updateStats();
    loadRecentActivities();
    loadServiceChart();
}

// Update statistics
function updateStats() {
    const stats = {
        todayAppointments: Math.floor(Math.random() * 50) + 10,
        totalCustomers: Math.floor(Math.random() * 2000) + 1000,
        completedServices: Math.floor(Math.random() * 100) + 50,
        monthlyRevenue: (Math.random() * 50 + 20).toFixed(1)
    };
    
    // Update stat cards with animation
    animateCounter('.stat-card:nth-child(1) h3', stats.todayAppointments);
    animateCounter('.stat-card:nth-child(2) h3', stats.totalCustomers);
    animateCounter('.stat-card:nth-child(3) h3', stats.completedServices);
    
    const revenueElement = document.querySelector('.stat-card:nth-child(4) h3');
    if (revenueElement) {
        revenueElement.textContent = stats.monthlyRevenue + 'M';
    }
}

// Animate counter
function animateCounter(selector, target) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 30);
}

// Load recent activities
function loadRecentActivities() {
    const activities = [
        {
            icon: 'fa-calendar-plus',
            text: '<strong>Nguyễn Văn A</strong> đặt lịch bảo dưỡng',
            time: '5 phút trước'
        },
        {
            icon: 'fa-wrench',
            text: 'Hoàn thành sửa chữa cho <strong>Trần Thị B</strong>',
            time: '15 phút trước'
        },
        {
            icon: 'fa-shield-alt',
            text: 'Kích hoạt bảo hành sản phẩm <strong>NG-001234</strong>',
            time: '30 phút trước'
        },
        {
            icon: 'fa-user-plus',
            text: '<strong>Lê Văn C</strong> đăng ký tài khoản mới',
            time: '1 giờ trước'
        },
        {
            icon: 'fa-tools',
            text: 'Cập nhật lịch bảo dưỡng cho <strong>Phạm Thị D</strong>',
            time: '2 giờ trước'
        }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="fas ${activity.icon}"></i>
                <div>
                    <p>${activity.text}</p>
                    <span>${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Load service chart (placeholder)
function loadServiceChart() {
    const canvas = document.getElementById('serviceChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Simple chart placeholder
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#2c5aa0';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Biểu đồ thống kê dịch vụ', canvas.width / 2, canvas.height / 2);
        ctx.fillText('(Cần tích hợp Chart.js)', canvas.width / 2, canvas.height / 2 + 25);
    }
}

// Load section specific data
function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'bookings':
            loadBookingsData();
            break;
        case 'customers':
            loadCustomersData();
            break;
        case 'warranty':
            loadWarrantyData();
            break;
        case 'services':
            loadServicesData();
            break;
        case 'reports':
            loadReportsData();
            break;
    }
}

// Load bookings data
function loadBookingsData() {
    const bookings = [
        {
            id: '001',
            customer: 'Nguyễn Văn A',
            phone: '0901234567',
            service: 'Bảo dưỡng định kỳ',
            date: '15/01/2024 09:00',
            status: 'pending'
        },
        {
            id: '002',
            customer: 'Trần Thị B',
            phone: '0902345678',
            service: 'Sửa chữa',
            date: '16/01/2024 14:00',
            status: 'confirmed'
        },
        {
            id: '003',
            customer: 'Lê Văn C',
            phone: '0903456789',
            service: 'Bảo hành',
            date: '17/01/2024 10:00',
            status: 'completed'
        }
    ];
    
    const tbody = document.getElementById('bookingsTable');
    if (tbody) {
        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>#${booking.id}</td>
                <td>${booking.customer}<br><small>${booking.phone}</small></td>
                <td>${booking.service}</td>
                <td>${booking.date}</td>
                <td><span class="status ${booking.status}">${getStatusText(booking.status)}</span></td>
                <td>
                    ${booking.status === 'pending' ? `
                        <button class="btn-icon" onclick="confirmBooking('${booking.id}')" title="Xác nhận">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-icon" onclick="editBooking('${booking.id}')" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteBooking('${booking.id}')" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Load customers data
function loadCustomersData() {
    const customers = [
        {
            id: 'C001',
            name: 'Nguyễn Văn A',
            phone: '0901234567',
            email: 'nguyenvana@email.com',
            product: 'NG-Pro-2024',
            registerDate: '10/01/2024'
        },
        {
            id: 'C002',
            name: 'Trần Thị B',
            phone: '0902345678',
            email: 'tranthib@email.com',
            product: 'NG-Basic-2023',
            registerDate: '08/01/2024'
        },
        {
            id: 'C003',
            name: 'Lê Văn C',
            phone: '0903456789',
            email: 'levanc@email.com',
            product: 'NG-Pro-2024',
            registerDate: '05/01/2024'
        }
    ];
    
    const tbody = document.getElementById('customersTable');
    if (tbody) {
        tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>#${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.email}</td>
                <td>${customer.product}</td>
                <td>${customer.registerDate}</td>
                <td>
                    <button class="btn-icon" onclick="viewCustomer('${customer.id}')" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editCustomer('${customer.id}')" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Load warranty data
function loadWarrantyData() {
    const warranties = [
        {
            productCode: 'NG-001234',
            customer: 'Nguyễn Văn A',
            purchaseDate: '15/01/2023',
            expiryDate: '15/01/2025',
            status: 'active'
        },
        {
            productCode: 'NG-002345',
            customer: 'Trần Thị B',
            purchaseDate: '10/03/2022',
            expiryDate: '10/03/2024',
            status: 'warning'
        },
        {
            productCode: 'NG-003456',
            customer: 'Lê Văn C',
            purchaseDate: '05/12/2021',
            expiryDate: '05/12/2023',
            status: 'expired'
        }
    ];
    
    // Update warranty stats
    const activeCount = warranties.filter(w => w.status === 'active').length;
    const warningCount = warranties.filter(w => w.status === 'warning').length;
    const expiredCount = warranties.filter(w => w.status === 'expired').length;
    
    document.querySelector('.warranty-stat:nth-child(1) .count').textContent = activeCount;
    document.querySelector('.warranty-stat:nth-child(2) .count').textContent = warningCount;
    document.querySelector('.warranty-stat:nth-child(3) .count').textContent = expiredCount;
    
    const tbody = document.getElementById('warrantyTable');
    if (tbody) {
        tbody.innerHTML = warranties.map(warranty => `
            <tr>
                <td>${warranty.productCode}</td>
                <td>${warranty.customer}</td>
                <td>${warranty.purchaseDate}</td>
                <td>${warranty.expiryDate}</td>
                <td><span class="status ${warranty.status}">${getWarrantyStatusText(warranty.status)}</span></td>
                <td>
                    <button class="btn-icon" onclick="viewWarranty('${warranty.productCode}')" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="extendWarranty('${warranty.productCode}')" title="Gia hạn">
                        <i class="fas fa-clock"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Helper functions
function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

function getWarrantyStatusText(status) {
    const statusMap = {
        'active': 'Còn hạn',
        'warning': 'Sắp hết hạn',
        'expired': 'Đã hết hạn'
    };
    return statusMap[status] || status;
}

// Modal functions
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Booking management functions
function confirmBooking(id) {
    if (confirm('Xác nhận lịch hẹn này?')) {
        authFunctions.showAlert(`Đã xác nhận lịch hẹn #${id}`, 'success');
        loadBookingsData();
    }
}

function editBooking(id) {
    authFunctions.showAlert(`Chỉnh sửa lịch hẹn #${id}`, 'info');
}

function deleteBooking(id) {
    if (confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
        authFunctions.showAlert(`Đã xóa lịch hẹn #${id}`, 'success');
        loadBookingsData();
    }
}

// Customer management functions
function viewCustomer(id) {
    authFunctions.showAlert(`Xem thông tin khách hàng #${id}`, 'info');
}

function editCustomer(id) {
    authFunctions.showAlert(`Chỉnh sửa thông tin khách hàng #${id}`, 'info');
}

// Warranty management functions
function addWarranty() {
    authFunctions.showAlert('Thêm thông tin bảo hành mới', 'info');
}

function viewWarranty(productCode) {
    authFunctions.showAlert(`Xem thông tin bảo hành ${productCode}`, 'info');
}

function extendWarranty(productCode) {
    if (confirm(`Gia hạn bảo hành cho sản phẩm ${productCode}?`)) {
        authFunctions.showAlert(`Đã gia hạn bảo hành cho ${productCode}`, 'success');
        loadWarrantyData();
    }
}

// Form handlers
document.getElementById('addBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    authFunctions.showAlert('Đã thêm lịch hẹn mới thành công!', 'success');
    closeModal('bookingModal');
    loadBookingsData();
    this.reset();
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.section-header').nextElementSibling.querySelector('table tbody');
            
            if (table) {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Auto-refresh data every 5 minutes
setInterval(() => {
    const activeSection = document.querySelector('.admin-section.active');
    if (activeSection) {
        loadSectionData(activeSection.id);
    }
}, 5 * 60 * 1000);

// Export functions for global access
window.adminFunctions = {
    confirmBooking,
    editBooking,
    deleteBooking,
    viewCustomer,
    editCustomer,
    addWarranty,
    viewWarranty,
    extendWarranty,
    openBookingModal,
    closeModal
};