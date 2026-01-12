// Booking Page JavaScript
let selectedService = null;
const servicePrices = { maintenance: 300000, repair: 200000, installation: 500000, warranty: 0 };

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            selectService(this.getAttribute('data-service'));
        });
    });
});

function selectService(serviceType) {
    selectedService = serviceType;
    document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
    document.querySelector(`[data-service="${serviceType}"]`)?.classList.add('selected');
    localStorage.setItem('selectedService', serviceType);
    window.location.href = `register-appointment.html?service=${serviceType}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
