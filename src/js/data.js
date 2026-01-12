// Data management for Nanogeyser Website
const sampleData = {
    products: [],
    customers: [],
    bookings: [],
    technicians: []
};

const dataUtils = {
    getProductById: (id) => sampleData.products.find(p => p.id === id),
    getCustomerById: (id) => sampleData.customers.find(c => c.id === id),
    getBookingsByCustomer: (customerId) => sampleData.bookings.filter(b => b.customerId === customerId),
    formatCurrency: (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount),
    formatDate: (dateString) => new Date(dateString).toLocaleDateString('vi-VN')
};

window.SAMPLE_DATA = sampleData;
window.DATA_UTILS = dataUtils;
