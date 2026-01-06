// Authentication System for Nanogeyser

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!phone || !password) {
        showAlert('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    // Call login API through local proxy
    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phone,
            pass: password
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log('Login response:', result);
        
        if (result.code === 1 && result.data) {
            // Store user session
            const userData = {
                id: result.data.id,
                username: result.data.username,
                phone: result.data.phone,
                email: result.data.email,
                birthday: result.data.birthday,
                address: result.data.address,
                status: result.data.status,
                type: result.data.type
            };
            
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Lưu token nếu API trả về
            if (result.data.token || result.token) {
                sessionStorage.setItem('authToken', result.data.token || result.token);
            } else {
                // Dùng phone làm token tạm nếu API không trả về token
                sessionStorage.setItem('authToken', phone);
            }
            
            showAlert('Đăng nhập thành công!', 'success');
            
            // Redirect to homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showAlert(result.message || 'Số điện thoại hoặc mật khẩu không đúng!', 'error');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showAlert('Lỗi kết nối. Vui lòng thử lại!', 'error');
    });
});

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Auto-fill demo accounts
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for demo accounts
    document.querySelectorAll('.demo-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            document.getElementById('username').value = '0943498335';
            document.getElementById('password').value = 'hoang123';
        });
    });
});

// Check authentication status
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(currentUser);
}

// Logout function
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('loginTime');
        window.location.href = 'login.html';
    }
}

// Show alert messages
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
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 300);
    }, 3000);
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

// Session timeout check (30 minutes)
function checkSessionTimeout() {
    const loginTime = sessionStorage.getItem('loginTime');
    if (loginTime) {
        const now = new Date();
        const login = new Date(loginTime);
        const diffMinutes = (now - login) / (1000 * 60);
        
        if (diffMinutes > 30) {
            showAlert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'warning');
            setTimeout(() => {
                logout();
            }, 2000);
        }
    }
}

// Check session timeout every 5 minutes
setInterval(checkSessionTimeout, 5 * 60 * 1000);

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    return {
        score: strength,
        checks: checks,
        level: strength < 2 ? 'weak' : strength < 4 ? 'medium' : 'strong'
    };
}

// Remember me functionality
function handleRememberMe() {
    const rememberCheckbox = document.getElementById('remember');
    const username = document.getElementById('username').value;
    
    if (rememberCheckbox && rememberCheckbox.checked && username) {
        localStorage.setItem('rememberedUsername', username);
    } else {
        localStorage.removeItem('rememberedUsername');
    }
}

// Load remembered username
document.addEventListener('DOMContentLoaded', function() {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('remember').checked = true;
    }
});

// Add remember me handler to login form
document.getElementById('loginForm').addEventListener('submit', handleRememberMe);

// Forgot password handler
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('Tính năng quên mật khẩu sẽ được cập nhật sớm. Vui lòng liên hệ admin để được hỗ trợ.', 'info');
        });
    }
});

// Export functions for use in other files
window.authFunctions = {
    checkAuth,
    logout,
    showAlert,
    checkPasswordStrength
};