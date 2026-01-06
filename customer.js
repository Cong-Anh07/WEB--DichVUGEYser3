// Customer Dashboard JavaScript

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = authFunctions.checkAuth();
    if (!currentUser || currentUser.type !== 'customer') {
        window.location.href = 'login.html';
        return;
    }
    
    // Set customer info
    document.getElementById('customerName').textContent = currentUser.name;
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profilePhone').textContent = currentUser.phone || '0901234567';
    
    // Initialize dashboard
    initializeCustomerDashboard();
    initializeCustomerSidebar();
    loadCustomerData();
});

// Initialize sidebar navigation
function initializeCustomerSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
            document.querySelectorAll('.customer-section').forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                loadCustomerSectionData(sectionId);
            }
        });
    });
}

// Initialize customer dashboard
function initializeCustomerDashboard() {
    // Initialize booking filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter bookings
            const filter = this.getAttribute('data-filter');
            filterBookings(filter);
        });
    });
}

// Load customer data
function loadCustomerData() {
    loadOverviewData();
    loadProductsData();
    loadCustomerBookingsData();
    loadCustomerWarrantyData();
}

// Load overview data
function loadOverviewData() {
    const overviewData = {
        products: 2,
        upcomingAppointments: 1,
        warrantyDays: 365,
        maintenanceCount: 5
    };
    
    // Update overview cards with animation
    animateCustomerCounter('.overview-card:nth-child(1) h3', overviewData.products);
    animateCustomerCounter('.overview-card:nth-child(2) h3', overviewData.upcomingAppointments);
    animateCustomerCounter('.overview-card:nth-child(3) h3', overviewData.warrantyDays);
    animateCustomerCounter('.overview-card:nth-child(4) h3', overviewData.maintenanceCount);
    
    // Load upcoming appointments
    loadUpcomingAppointments();
    loadWarrantyAlerts();
}

// Animate counter for customer dashboard
function animateCustomerCounter(selector, target) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

// Load upcoming appointments
function loadUpcomingAppointments() {
    const appointments = [
        {
            day: '15',
            month: 'Th1',
            title: 'Bảo dưỡng định kỳ',
            product: 'NG-Pro-2024',
            time: '09:00 - 10:00',
            status: 'confirmed'
        }
    ];
    
    const appointmentList = document.querySelector('.appointment-list');
    if (appointmentList) {
        appointmentList.innerHTML = appointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-date">
                    <span class="day">${appointment.day}</span>
                    <span class="month">${appointment.month}</span>
                </div>
                <div class="appointment-info">
                    <h4>${appointment.title}</h4>
                    <p>Sản phẩm: ${appointment.product}</p>
                    <p>Thời gian: ${appointment.time}</p>
                </div>
                <div class="appointment-status">
                    <span class="status ${appointment.status}">Đã xác nhận</span>
                </div>
            </div>
        `).join('');
    }
}

// Load warranty alerts
function loadWarrantyAlerts() {
    const alerts = [
        {
            type: 'warning',
            icon: 'fa-exclamation-triangle',
            title: 'Sắp hết hạn bảo hành',
            message: 'Sản phẩm NG-001234 sẽ hết hạn bảo hành vào 30/03/2024'
        },
        {
            type: 'info',
            icon: 'fa-info-circle',
            title: 'Nhắc nhở bảo dưỡng',
            message: 'Đã đến thời gian thay lõi lọc cho sản phẩm NG-Pro-2024'
        }
    ];
    
    const alertList = document.querySelector('.alert-list');
    if (alertList) {
        alertList.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <i class="fas ${alert.icon}"></i>
                <div>
                    <h4>${alert.title}</h4>
                    <p>${alert.message}</p>
                </div>
            </div>
        `).join('');
    }
}

// Load products data
function loadProductsData() {
    const products = [
        {
            id: 'NG-Pro-2024-001234',
            name: 'Nanogeyser Pro 2024',
            code: 'NG-Pro-2024-001234',
            purchaseDate: '15/01/2023',
            warrantyDays: 365,
            warrantyStatus: 'active',
            image: 'product1.jpg'
        },
        {
            id: 'NG-Basic-2023-005678',
            name: 'Nanogeyser Basic 2023',
            code: 'NG-Basic-2023-005678',
            purchaseDate: '10/06/2022',
            warrantyDays: 45,
            warrantyStatus: 'warning',
            image: 'product2.jpg'
        }
    ];
    
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display:none; align-items:center; justify-content:center; height:200px; background:#f8f9fa; color:#666;">
                        <i class="fas fa-image" style="font-size:3rem;"></i>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-code">Mã: ${product.code}</p>
                    <p class="purchase-date">Ngày mua: ${product.purchaseDate}</p>
                    <div class="warranty-status">
                        <span class="status ${product.warrantyStatus}">
                            Còn bảo hành: ${product.warrantyDays} ngày
                        </span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-sm btn-primary" onclick="bookMaintenance('${product.id}')">
                        Đặt lịch bảo dưỡng
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="viewProductDetails('${product.id}')">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Load customer bookings data
function loadCustomerBookingsData() {
    const bookings = [
        {
            id: 1,
            day: '15',
            month: 'Th1',
            year: '2024',
            title: 'Bảo dưỡng định kỳ',
            product: 'NG-Pro-2024-001234',
            time: '09:00 - 10:00',
            technician: 'Nguyễn Văn B',
            status: 'confirmed'
        },
        {
            id: 2,
            day: '20',
            month: 'Th1',
            year: '2024',
            title: 'Sửa chữa',
            product: 'NG-Basic-2023-005678',
            time: '14:00 - 15:00',
            issue: 'Áp lực nước yếu',
            status: 'pending'
        }
    ];
    
    const bookingsList = document.querySelector('.bookings-list');
    if (bookingsList) {
        bookingsList.innerHTML = bookings.map(booking => `
            <div class="booking-item ${booking.status}">
                <div class="booking-date">
                    <span class="day">${booking.day}</span>
                    <span class="month">${booking.month}</span>
                    <span class="year">${booking.year}</span>
                </div>
                <div class="booking-info">
                    <h4>${booking.title}</h4>
                    <p>Sản phẩm: ${booking.product}</p>
                    <p>Thời gian: ${booking.time}</p>
                    ${booking.technician ? `<p>Kỹ thuật viên: ${booking.technician}</p>` : ''}
                    ${booking.issue ? `<p>Vấn đề: ${booking.issue}</p>` : ''}
                </div>
                <div class="booking-status">
                    <span class="status ${booking.status}">${getCustomerStatusText(booking.status)}</span>
                </div>
                <div class="booking-actions">
                    ${booking.status !== 'completed' ? `
                        <button class="btn-icon" onclick="rescheduleBooking(${booking.id})" title="Đổi lịch">
                            <i class="fas fa-calendar-alt"></i>
                        </button>
                        <button class="btn-icon" onclick="cancelBooking(${booking.id})" title="Hủy lịch">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
}

// Load customer warranty data
function loadCustomerWarrantyData() {
    const warranties = [
        {
            productCode: 'NG-Pro-2024-001234',
            purchaseDate: '15/01/2023',
            expiryDate: '15/01/2025',
            remainingDays: 365,
            progress: 50,
            status: 'active'
        },
        {
            productCode: 'NG-Basic-2023-005678',
            purchaseDate: '10/06/2022',
            expiryDate: '10/06/2024',
            remainingDays: 45,
            progress: 90,
            status: 'warning'
        }
    ];
    
    const warrantyCards = document.querySelector('.warranty-cards');
    if (warrantyCards) {
        warrantyCards.innerHTML = warranties.map(warranty => `
            <div class="warranty-card ${warranty.status}">
                <div class="warranty-header">
                    <h3>${warranty.productCode}</h3>
                    <span class="warranty-badge ${warranty.status}">
                        ${warranty.status === 'active' ? 'Còn hạn' : 'Sắp hết hạn'}
                    </span>
                </div>
                <div class="warranty-details">
                    <div class="warranty-item">
                        <span class="label">Ngày mua:</span>
                        <span class="value">${warranty.purchaseDate}</span>
                    </div>
                    <div class="warranty-item">
                        <span class="label">Hết hạn:</span>
                        <span class="value">${warranty.expiryDate}</span>
                    </div>
                    <div class="warranty-item">
                        <span class="label">Còn lại:</span>
                        <span class="value">${warranty.remainingDays} ngày</span>
                    </div>
                </div>
                <div class="warranty-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${warranty.status}" style="width: ${warranty.progress}%"></div>
                    </div>
                    <span class="progress-text">${warranty.progress}% thời gian bảo hành</span>
                </div>
            </div>
        `).join('');
    }
}

// Load section specific data
function loadCustomerSectionData(sectionId) {
    switch (sectionId) {
        case 'overview':
            loadOverviewData();
            break;
        case 'products':
            loadProductsData();
            break;
        case 'bookings':
            loadCustomerBookingsData();
            break;
        case 'warranty':
            loadCustomerWarrantyData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

// Load profile data
function loadProfileData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        const form = document.getElementById('profileForm');
        if (form) {
            form.querySelector('input[type="text"]').value = currentUser.name;
            form.querySelector('input[type="tel"]').value = currentUser.phone || '0901234567';
            form.querySelector('input[type="email"]').value = currentUser.email;
        }
    }
}

// Helper functions
function getCustomerStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// Filter bookings
function filterBookings(filter) {
    const bookingItems = document.querySelectorAll('.booking-item');
    bookingItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Customer action functions
function quickBooking() {
    document.getElementById('quickBookingModal').style.display = 'block';
}

function newBooking() {
    quickBooking();
}

function bookMaintenance(productId) {
    authFunctions.showAlert(`Đặt lịch bảo dưỡng cho sản phẩm ${productId}`, 'info');
    quickBooking();
}

function viewProductDetails(productId) {
    authFunctions.showAlert(`Xem chi tiết sản phẩm ${productId}`, 'info');
}

function registerProduct() {
    authFunctions.showAlert('Tính năng đăng ký sản phẩm mới sẽ được cập nhật sớm', 'info');
}

function rescheduleBooking(id) {
    if (confirm('Bạn muốn đổi lịch hẹn này?')) {
        authFunctions.showAlert(`Đã gửi yêu cầu đổi lịch hẹn #${id}`, 'success');
    }
}

function cancelBooking(id) {
    if (confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
        authFunctions.showAlert(`Đã hủy lịch hẹn #${id}`, 'success');
        loadCustomerBookingsData();
    }
}

function editBooking(id) {
    authFunctions.showAlert(`Chỉnh sửa lịch hẹn #${id}`, 'info');
}

function checkWarranty() {
    authFunctions.showAlert('Kiểm tra thông tin bảo hành', 'info');
}

function changePassword() {
    authFunctions.showAlert('Tính năng đổi mật khẩu sẽ được cập nhật sớm', 'info');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form handlers
document.getElementById('quickBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    authFunctions.showAlert('Đã đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.', 'success');
    closeModal('quickBookingModal');
    this.reset();
    
    // Update booking count
    const badge = document.getElementById('customerBookingCount');
    if (badge) {
        badge.textContent = parseInt(badge.textContent) + 1;
    }
});

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    authFunctions.showAlert('Đã cập nhật thông tin cá nhân thành công!', 'success');
    
    // Update session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    currentUser.name = this.querySelector('input[type="text"]').value;
    currentUser.phone = this.querySelector('input[type="tel"]').value;
    currentUser.email = this.querySelector('input[type="email"]').value;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update display
    document.getElementById('customerName').textContent = currentUser.name;
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profilePhone').textContent = currentUser.phone;
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

// Auto-refresh data every 10 minutes
setInterval(() => {
    const activeSection = document.querySelector('.customer-section.active');
    if (activeSection) {
        loadCustomerSectionData(activeSection.id);
    }
}, 10 * 60 * 1000);

// Export functions for global access
window.customerFunctions = {
    quickBooking,
    newBooking,
    bookMaintenance,
    viewProductDetails,
    registerProduct,
    rescheduleBooking,
    cancelBooking,
    editBooking,
    checkWarranty,
    changePassword,
    closeModal
};