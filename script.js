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

// Form submissions - Warranty Check
const warrantyForm = document.getElementById('warrantyCheck');
if (warrantyForm) {
    warrantyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productCode = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="text"]:nth-child(2)').value;
        
        setTimeout(() => {
            alert(`Đang kiểm tra bảo hành cho sản phẩm: ${productCode}\nSố điện thoại: ${phone}\n\nKết quả sẽ được gửi qua SMS trong vài phút.`);
            this.reset();
        }, 1000);
    });
}

// Form submissions - Booking Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const address = this.querySelector('input[type="text"]:nth-child(2)').value;
        const service = this.querySelector('select').value;
        
        if (!name || !phone || !address || !service) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        setTimeout(() => {
            alert(`Cảm ơn ${name}!\n\nYêu cầu đặt lịch của bạn đã được ghi nhận:\n- Dịch vụ: ${getServiceName(service)}\n- Địa chỉ: ${address}\n- SĐT: ${phone}\n\nChúng tôi sẽ liên hệ với bạn trong vòng 30 phút để xác nhận lịch hẹn.`);
            this.reset();
        }, 1000);
    });
}

// Helper function to get service name
function getServiceName(value) {
    const services = {
        'maintenance': 'Bảo dưỡng định kỳ',
        'repair': 'Sửa chữa',
        'warranty': 'Bảo hành'
    };
    return services[value] || value;
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .warranty-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
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
    });
});

// Add click-to-call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!confirm('Bạn có muốn gọi điện thoại không?')) {
            e.preventDefault();
        }
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add testimonials rotation (if testimonials section exists)
function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentIndex = 0;
        
        setInterval(() => {
            testimonials[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.opacity = '1';
        }, 5000);
    }
}

// Initialize testimonials rotation
window.addEventListener('load', rotateTestimonials);


// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Feature cards scroll animation
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, delay);
            featureObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    featureObserver.observe(card);
});


// Feature cards animation end handler
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('animationend', function(e) {
        if (e.animationName === 'floatUp') {
            this.classList.add('collapsed');
            console.log('Card collapsed:', this);
        }
    });
});

// Backup: Add collapsed class after 3 seconds if animation doesn't fire
setTimeout(() => {
    document.querySelectorAll('.feature-card').forEach(card => {
        if (!card.classList.contains('collapsed')) {
            card.classList.add('collapsed');
        }
    });
}, 3000);
