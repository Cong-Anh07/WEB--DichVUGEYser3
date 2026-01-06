// Booking Page JavaScript

let selectedService = null;
let servicePrices = {
    maintenance: 300000,
    repair: 200000,
    installation: 500000,
    warranty: 0
};

let addonPrices = {
    'water-test': 100000,
    'system-upgrade': 0,
    'maintenance-plan': 0
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingPage();
    setupEventListeners();
    setMinDate();
});

// Initialize booking page
function initializeBookingPage() {
    // Load configuration if available
    if (typeof window.CONFIG !== 'undefined' && window.CONFIG.pricing) {
        servicePrices = {
            maintenance: window.CONFIG.pricing.maintenance || 300000,
            repair: window.CONFIG.pricing.repairBase || 200000,
            installation: window.CONFIG.pricing.installation || 500000,
            warranty: 0
        };
    }
    
    // Update service prices in UI
    updateServicePricesInUI();
}

// Update service prices in UI
function updateServicePricesInUI() {
    const serviceCards = document.querySelectorAll('.service-option');
    serviceCards.forEach(card => {
        const serviceType = card.getAttribute('data-service');
        const priceElement = card.querySelector('.service-price');
        if (priceElement && servicePrices[serviceType] !== undefined) {
            if (servicePrices[serviceType] === 0) {
                priceElement.textContent = 'Miễn Phí';
            } else {
                priceElement.textContent = formatCurrency(servicePrices[serviceType]);
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Service selection
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            selectService(this.getAttribute('data-service'));
        });
    });
    
    // Form inputs for cost calculation
    document.getElementById('urgency').addEventListener('change', calculateCost);
    document.querySelectorAll('input[name="additionalServices"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateCost);
    });
    
    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', handleFormSubmission);
    
    // Phone number formatting
    document.getElementById('customerPhone').addEventListener('input', formatPhoneNumber);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Set minimum date to today
function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInput = document.getElementById('appointmentDate');
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Select service
function selectService(serviceType) {
    selectedService = serviceType;
    
    // Update UI
    document.querySelectorAll('.service-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelector(`[data-service="${serviceType}"]`).classList.add('selected');
    
    // Save selected service and redirect to registration page
    localStorage.setItem('selectedService', serviceType);
    window.location.href = `register-appointment.html?service=${serviceType}`;
}

// Update selected service info
function updateSelectedServiceInfo(serviceType) {
    const serviceNames = {
        maintenance: 'Bảo Dưỡng Định Kỳ',
        repair: 'Sửa Chữa',
        installation: 'Lắp Đặt Mới',
        warranty: 'Bảo Hành'
    };
    
    const serviceDescriptions = {
        maintenance: 'Vệ sinh, thay lõi lọc, kiểm tra hệ thống - 60-90 phút',
        repair: 'Chẩn đoán và khắc phục sự cố - 30-120 phút',
        installation: 'Lắp đặt máy lọc nước mới - 120-180 phút',
        warranty: 'Dịch vụ bảo hành miễn phí - 30-60 phút'
    };
    
    document.getElementById('selectedServiceName').textContent = serviceNames[serviceType];
    document.getElementById('selectedServiceDetails').textContent = serviceDescriptions[serviceType];
}

// Calculate total cost
function calculateCost() {
    if (!selectedService) return;
    
    let baseCost = servicePrices[selectedService];
    let addonCost = 0;
    let urgencyCost = 0;
    
    // Calculate addon costs
    document.querySelectorAll('input[name="additionalServices"]:checked').forEach(checkbox => {
        addonCost += addonPrices[checkbox.value] || 0;
    });
    
    // Calculate urgency surcharge
    const urgency = document.getElementById('urgency').value;
    if (urgency === 'urgent') {
        urgencyCost = baseCost * 0.2;
    } else if (urgency === 'emergency') {
        urgencyCost = baseCost * 0.5;
    }
    
    const totalCost = baseCost + addonCost + urgencyCost;
    
    // Update UI
    document.getElementById('baseCost').textContent = formatCurrency(baseCost);
    document.getElementById('addonCost').textContent = formatCurrency(addonCost);
    document.getElementById('urgencyCost').textContent = formatCurrency(urgencyCost);
    document.getElementById('totalCost').textContent = formatCurrency(totalCost);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format phone number
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 4) {
            value = value;
        } else if (value.length <= 7) {
            value = value.slice(0, 4) + ' ' + value.slice(4);
        } else {
            value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 10);
        }
    }
    e.target.value = value;
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!selectedService) {
        showAlert('Vui lòng chọn dịch vụ trước khi đặt lịch!', 'error');
        return;
    }
    
    // Validate required fields
    const requiredFields = ['customerName', 'customerPhone', 'customerAddress', 'appointmentDate', 'appointmentTime'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!document.getElementById('agreeTerms').checked) {
        showAlert('Vui lòng đồng ý với điều khoản dịch vụ!', 'error');
        return;
    }
    
    if (!document.getElementById('confirmInfo').checked) {
        showAlert('Vui lòng xác nhận thông tin là chính xác!', 'error');
        return;
    }
    
    if (!isValid) {
        showAlert('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    // Collect form data
    const formData = collectFormData();
    
    // Submit booking
    submitBooking(formData);
}

// Collect form data
function collectFormData() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    // Convert to object
    const data = {};
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Add selected service
    data.selectedService = selectedService;
    
    // Add cost calculation
    data.estimatedCost = document.getElementById('totalCost').textContent;
    
    // Add timestamp
    data.submittedAt = new Date().toISOString();
    
    return data;
}

// Submit booking
function submitBooking(data) {
    // Show loading
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate booking ID
        const bookingId = 'BK' + Date.now().toString().slice(-6);
        
        // Store booking data (in real app, send to server)
        localStorage.setItem(`booking_${bookingId}`, JSON.stringify(data));
        
        // Show success message
        showBookingSuccess(bookingId, data);
        
        // Reset form
        resetForm();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Show booking success
function showBookingSuccess(bookingId, data) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="modal-header">
                <h3><i class="fas fa-check-circle" style="color: var(--success-color);"></i> Đặt Lịch Thành Công!</h3>
            </div>
            <div class="modal-body">
                <div class="booking-success">
                    <p><strong>Mã đặt lịch:</strong> ${bookingId}</p>
                    <p><strong>Dịch vụ:</strong> ${document.getElementById('selectedServiceName').textContent}</p>
                    <p><strong>Khách hàng:</strong> ${data.customerName}</p>
                    <p><strong>Số điện thoại:</strong> ${data.customerPhone}</p>
                    <p><strong>Ngày hẹn:</strong> ${formatDate(data.appointmentDate)}</p>
                    <p><strong>Giờ hẹn:</strong> ${data.appointmentTime}</p>
                    <p><strong>Ước tính chi phí:</strong> ${data.estimatedCost}</p>
                </div>
                <div class="success-note">
                    <p><i class="fas fa-info-circle"></i> Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút để xác nhận lịch hẹn.</p>
                    <p><i class="fas fa-phone"></i> Hotline hỗ trợ: <strong>1900 1234</strong></p>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="closeSuccessModal()">Đóng</button>
                <button class="btn btn-secondary" onclick="printBooking('${bookingId}')">In Phiếu</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeSuccessModal();
        }
    }, 10000);
}

// Close success modal
function closeSuccessModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Print booking
function printBooking(bookingId) {
    const bookingData = JSON.parse(localStorage.getItem(`booking_${bookingId}`));
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Phiếu Đặt Lịch - ${bookingId}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 15px; }
                .label { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>NANOGEYSER</h2>
                <h3>PHIẾU ĐẶT LỊCH HẸN</h3>
                <p>Mã: ${bookingId}</p>
            </div>
            <div class="info"><span class="label">Dịch vụ:</span> ${document.getElementById('selectedServiceName').textContent}</div>
            <div class="info"><span class="label">Khách hàng:</span> ${bookingData.customerName}</div>
            <div class="info"><span class="label">Số điện thoại:</span> ${bookingData.customerPhone}</div>
            <div class="info"><span class="label">Địa chỉ:</span> ${bookingData.customerAddress}</div>
            <div class="info"><span class="label">Ngày hẹn:</span> ${formatDate(bookingData.appointmentDate)}</div>
            <div class="info"><span class="label">Giờ hẹn:</span> ${bookingData.appointmentTime}</div>
            <div class="info"><span class="label">Ước tính chi phí:</span> ${bookingData.estimatedCost}</div>
            <div style="margin-top: 30px;">
                <p><strong>Lưu ý:</strong> Vui lòng có mặt đúng giờ hẹn. Liên hệ 1900 1234 nếu cần thay đổi.</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Reset form
function resetForm() {
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingFormContainer').style.display = 'none';
    
    // Reset service selection
    document.querySelectorAll('.service-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    selectedService = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show terms modal
function showTerms() {
    document.getElementById('termsModal').style.display = 'block';
}

// Show privacy modal
function showPrivacy() {
    showAlert('Chính sách bảo mật sẽ được cập nhật sớm', 'info');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show alert
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${getAlertIcon(type)}"></i>
            <span>${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        background: ${getAlertColor(type)};
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function getAlertIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getAlertColor(type) {
    switch (type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add CSS for booking page specific styles
const bookingStyles = `
<style>
.booking-page {
    padding-top: 80px;
}

.booking-main {
    min-height: calc(100vh - 80px);
    padding: 2rem 0;
}

.page-header {
    text-align: center;
    margin-bottom: 3rem;
}

.page-header h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.page-header p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1rem;
}

.breadcrumb {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #666;
}

.breadcrumb a {
    color: var(--primary-color);
    text-decoration: none;
}

.service-selection {
    margin-bottom: 3rem;
}

.service-selection h2 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
}

.service-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.service-option {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.service-option:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.service-option.selected {
    border-color: var(--primary-color);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
}

.service-option.selected .service-icon {
    background: white;
    color: var(--primary-color);
}

.service-icon {
    width: 80px;
    height: 80px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 2rem;
    color: white;
}

.service-option h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.service-price {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.service-option.selected .service-price {
    color: white;
}

.service-duration {
    color: #666;
    margin-bottom: 1rem;
}

.service-option.selected .service-duration {
    color: rgba(255,255,255,0.9);
}

.service-includes {
    list-style: none;
    text-align: left;
    margin-bottom: 1.5rem;
}

.service-includes li {
    padding: 0.25rem 0;
    position: relative;
    padding-left: 1.5rem;
}

.service-includes li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
}

.service-option.selected .service-includes li:before {
    color: white;
}

.btn-outline {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-outline:hover {
    background: var(--primary-color);
    color: white;
}

.service-option.selected .btn-outline {
    background: white;
    border-color: white;
    color: var(--primary-color);
}

.booking-form-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    margin-bottom: 3rem;
}

.booking-form-container h2 {
    color: var(--primary-color);
    margin-bottom: 2rem;
    text-align: center;
}

.form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e9ecef;
}

.form-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.form-section h3 {
    color: #333;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.selected-service {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 10px;
    border-left: 4px solid var(--primary-color);
}

.service-summary .service-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.service-summary .service-details {
    color: #666;
}

.required {
    color: #dc3545;
}

.form-group input.error,
.form-group select.error {
    border-color: #dc3545;
}

.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
    margin: 0;
}

.additional-services {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.service-addon {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.service-addon:hover {
    border-color: var(--primary-color);
    background: #f8f9fa;
}

.service-addon input[type="checkbox"]:checked + .addon-info {
    color: var(--primary-color);
}

.addon-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.addon-name {
    font-weight: 500;
}

.addon-price {
    font-weight: bold;
    color: var(--primary-color);
}

.cost-breakdown {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
}

.cost-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
}

.cost-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-color);
    border-top: 2px solid var(--primary-color);
    padding-top: 1rem;
    margin-top: 1rem;
}

.cost-note {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
}

.terms-conditions {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
}

.terms-conditions .checkbox-item {
    margin-bottom: 0.5rem;
}

.terms-conditions a {
    color: var(--primary-color);
    text-decoration: none;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.contact-info {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
}

.contact-info h2 {
    color: var(--primary-color);
    margin-bottom: 2rem;
}

.contact-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}

.contact-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 10px;
}

.contact-method i {
    font-size: 2rem;
    color: var(--primary-color);
}

.contact-method h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
}

.contact-method p {
    margin: 0;
    color: #666;
}

.success-modal .modal-content {
    max-width: 600px;
}

.booking-success {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.booking-success p {
    margin-bottom: 0.5rem;
}

.success-note {
    background: #e8f5e8;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid var(--success-color);
}

.success-note p {
    margin-bottom: 0.5rem;
    color: #155724;
}

@media (max-width: 768px) {
    .service-cards {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .contact-methods {
        grid-template-columns: 1fr;
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .checkbox-group {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', bookingStyles);