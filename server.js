const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

const API_BASE = 'http://mobile.chothuetatca.com/api';

// ============ PROXY API để bypass CORS ============

// --- USER APIs ---
app.post('/api/user/setOTP', proxyPost('/user/setOTP'));
app.post('/api/user/checkOTP', proxyPost('/user/checkOTP'));
app.get('/api/user/support', proxyGet('/user/support'));
app.post('/api/user/register', proxyPost('/user/register'));
app.post('/api/user/login', proxyPost('/user/login'));
app.post('/api/user/updateUser', proxyPost('/user/updateUser'));
app.post('/api/user/check', proxyPost('/user/check'));
app.get('/api/user/listProduct/:user_id', (req, res) => proxyGetWithParams(`/user/listProduct/${req.params.user_id}`, res));
app.get('/api/user/history/:id', (req, res) => proxyGetWithParams(`/user/history/${req.params.id}`, res));
app.get('/api/user/detailHistory/:order_id', (req, res) => proxyGetWithParams(`/user/detailHistory/${req.params.order_id}`, res));
app.get('/api/user/listUserByService', proxyGet('/user/listUserByService'));
app.get('/api/user/user_list/:page?', (req, res) => proxyGetWithParams(`/user/user_list/${req.params.page || ''}`, res));
app.get('/api/user/searchUser_list', proxyGet('/user/searchUser_list'));
app.get('/api/user/:id', (req, res) => proxyGetWithParams(`/user/${req.params.id}`, res));
app.get('/api/user/staff-detail/:id', (req, res) => proxyGetWithParams(`/user/staff-detail/${req.params.id}`, res));

// --- PRODUCT APIs ---
app.get('/api/products', proxyGet('/product/list'));
app.get('/api/product/list', proxyGet('/product/list'));
app.get('/api/product/listCate', proxyGet('/product/listCate'));
app.get('/api/product/search', proxyGet('/product/search'));
app.get('/api/product/:id', (req, res) => proxyGetWithParams(`/product/${req.params.id}`, res));

// --- SERVICE APIs ---
app.get('/api/service/listService', proxyGet('/service/listService'));
app.get('/api/service/:id', (req, res) => proxyGetWithParams(`/service/${req.params.id}`, res));

// --- BLOG APIs ---
app.get('/api/blog/list', proxyGet('/blog/list'));
app.get('/api/blog/search', proxyGet('/blog/search'));
app.get('/api/blog/listPhilanthropy', proxyGet('/blog/listPhilanthropy'));
app.get('/api/blog/:id', (req, res) => proxyGetWithParams(`/blog/${req.params.id}`, res));

// --- NOTIFY APIs ---
app.get('/api/notify/list', proxyGet('/notify/list'));
app.get('/api/notify/:id', (req, res) => proxyGetWithParams(`/notify/${req.params.id}`, res));

// --- ORDER APIs ---
app.post('/api/order/them', proxyPost('/order/them'));
app.post('/api/order/phone', proxyPost('/order/phone'));
app.post('/api/order/save-repair', proxyPost('/order/save-repair'));
app.get('/api/order/get-product-by-user/:id', (req, res) => proxyGetWithParams(`/order/get-product-by-user/${req.params.id}`, res));
app.get('/api/order/filterCore/:id', (req, res) => proxyGetWithParams(`/order/filterCore/${req.params.id}`, res));

// --- TASKS APIs ---
app.get('/api/tasks', proxyGet('/tasks'));
app.get('/api/tasks/ton-dong', proxyGet('/tasks/ton-dong'));
app.get('/api/tasks/:id', (req, res) => proxyGetWithParams(`/tasks/${req.params.id}`, res));
app.get('/api/tasks/customer/:id', (req, res) => proxyGetWithParams(`/tasks/customer/${req.params.id}`, res));
app.post('/api/tasks/them', proxyPost('/tasks/them'));
app.post('/api/tasks/xoa', proxyPost('/tasks/xoa'));
app.post('/api/tasks/phone', proxyPost('/tasks/phone'));

// Proxy helper functions
function proxyGet(endpoint) {
    return async (req, res) => {
        try {
            const url = API_BASE + endpoint + (req.query ? '?' + new URLSearchParams(req.query).toString() : '');
            const response = await fetch(url);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.log('API Error:', error.message);
            res.status(500).json({ error: 'API Error', message: error.message });
        }
    };
}

async function proxyGetWithParams(endpoint, res) {
    try {
        const response = await fetch(API_BASE + endpoint);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log('API Error:', error.message);
        res.status(500).json({ error: 'API Error', message: error.message });
    }
}

function proxyPost(endpoint) {
    return async (req, res) => {
        try {
            const response = await fetch(API_BASE + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            });
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.log('API Error:', error.message);
            res.status(500).json({ error: 'API Error', message: error.message });
        }
    };
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer-dashboard.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'booking.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Nanogeyser Website đang chạy tại:`);
    console.log(`📱 Trang chủ: http://localhost:${PORT}`);
    console.log(`🔐 Đăng nhập: http://localhost:${PORT}/login`);
    console.log(`📅 Đặt lịch: http://localhost:${PORT}/booking`);
    console.log(`👨‍💼 Admin: http://localhost:${PORT}/admin`);
    console.log(`👤 Khách hàng: http://localhost:${PORT}/customer`);
    console.log(`\n📋 Tài khoản demo:`);
    console.log(`   Admin: admin / admin123`);
    console.log(`   Khách hàng: customer / customer123`);
    console.log(`\n⏹️  Nhấn Ctrl+C để dừng server`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Đang dừng server...');
    process.exit(0);
});