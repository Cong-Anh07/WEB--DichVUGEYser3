// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fetch API data - gọi qua proxy local để tránh CORS
function fetchServiceData() {
    fetch("/api/user/user_list/")
        .then(response => response.json())
        .then(result => {
            console.log('API Response:', result);
            // Hiển thị tên dịch vụ vào các element có class .service
            const serviceElements = document.querySelectorAll('.service');
            if (result && Array.isArray(result)) {
                serviceElements.forEach((el, index) => {
                    if (result[index] && result[index].name) {
                        el.textContent = result[index].name;
                    }
                });
            } else if (result && result.data && Array.isArray(result.data)) {
                serviceElements.forEach((el, index) => {
                    if (result.data[index] && result.data[index].name) {
                        el.textContent = result.data[index].name;
                    }
                });
            }
        })
        .catch(error => console.log('API Error:', error));
}

// Gọi API khi trang load xong
window.addEventListener('DOMContentLoaded', fetchServiceData);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});
