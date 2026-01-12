// Authentication System for Nanogeyser
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!phone || !password) {
        showAlert('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, pass: password })
    })
    .then(res => res.json())
    .then(result => {
        if (result.code === 1 && result.data) {
            sessionStorage.setItem('currentUser', JSON.stringify(result.data));
            sessionStorage.setItem('loginTime', new Date().toISOString());
            showAlert('Đăng nhập thành công!', 'success');
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            showAlert(result.message || 'Số điện thoại hoặc mật khẩu không đúng!', 'error');
        }
    })
    .catch(() => showAlert('Lỗi kết nối. Vui lòng thử lại!', 'error'));
});

document.querySelector('.toggle-password')?.addEventListener('click', function() {
    const input = document.getElementById('password');
    const icon = this.querySelector('i');
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

function showAlert(message, type = 'info') {
    document.querySelector('.alert')?.remove();
    const colors = { success: '#28a745', error: '#dc3545', warning: '#ffc107', info: '#17a2b8' };
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `<span>${message}</span>`;
    alert.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem;border-radius:8px;color:white;z-index:9999;background:${colors[type]}`;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

window.authFunctions = { showAlert, logout };
