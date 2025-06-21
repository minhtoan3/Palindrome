/* Kiểm tra file JavaScript tải thành công */
console.log("JavaScript file loaded successfully!");

/* Khởi tạo khi DOM tải xong */
document.addEventListener('DOMContentLoaded', () => {
    /* Cấu hình Particles.js */
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    /* Hiệu ứng gõ chữ cho phần header */
    const typedTexts = document.querySelectorAll('.typing');
    const startTime = Date.now();

    typedTexts.forEach((element, index) => {
        let text = element.textContent;
        function typeWriter() {
            let i = 0;
            element.textContent = '';
            function type() {
                const elapsed = Date.now() - startTime - index * 2000;
                if (i < text.length && elapsed >= i * 100) {
                    element.textContent += text.charAt(i);
                    i++;
                    requestAnimationFrame(type);
                } else if (i >= text.length) {
                    setTimeout(() => typeWriter(), 2000);
                } else {
                    requestAnimationFrame(type);
                }
            }
            requestAnimationFrame(type);
        }
        typeWriter();
    });

    /* Cuộn mượt cho thanh điều hướng */
    const sections = document.querySelectorAll('.section, .footer');
    const navLinks = document.querySelectorAll('nav ul li a:not(.download-cv)');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* Tô sáng liên kết điều hướng khi cuộn */
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* Hiệu ứng timeline khi cuộn */
    const timelineItems = document.querySelectorAll('.timeline-item');

    function checkTimeline() {
        const triggerBottom = window.innerHeight * 0.8;
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    }

    window.addEventListener('scroll', debounce(checkTimeline, 100));
    checkTimeline();

    /* Lọc dự án */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease';
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.transition = 'opacity 0.5s ease';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    /* Mở liên kết dự án */
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });
    });

    /* Hiệu ứng cuộn cho phần header */
    const header = document.querySelector('.header');
    const headerElements = document.querySelectorAll('.header .social-icons a, .header .gradient-text, .header p, .header .image-frame');

    function triggerHeaderAnimation() {
        const triggerBottom = window.innerHeight / 1.3;
        const headerTop = header.getBoundingClientRect().top;
        const headerBottom = headerTop + header.offsetHeight;

        if (headerTop < triggerBottom && headerBottom > 0) {
            headerElements.forEach((element, index) => {
                element.style.animation = 'none';
                element.offsetHeight;
                element.style.opacity = '0';
                element.style.animation = `slideIn${element.classList.contains('image-frame') ? 'Right' : 'Left'} 1s ease-out ${index * 0.2}s forwards`;
            });
        }
    }

    triggerHeaderAnimation();
    window.addEventListener('scroll', triggerHeaderAnimation);

    /* Nút Learn More hiển thị kỹ năng bổ sung */
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    const additionalSkills = document.querySelector('.additional-skills');
    
    learnMoreBtn.addEventListener('click', () => {
        const isHidden = additionalSkills.style.display === 'none' || additionalSkills.style.display === '';
        additionalSkills.style.display = isHidden ? 'block' : 'none';
        additionalSkills.style.opacity = isHidden ? '0' : '1';
        if (isHidden) {
            setTimeout(() => {
                additionalSkills.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                additionalSkills.style.opacity = '1';
                additionalSkills.style.transform = 'translateY(0)';
            }, 10);
        } else {
            additionalSkills.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            additionalSkills.style.opacity = '0';
            additionalSkills.style.transform = 'translateY(20px)';
            setTimeout(() => {
                additionalSkills.style.display = 'none';
            }, 500);
        }
        learnMoreBtn.textContent = isHidden ? 'Show Less' : 'Learn More';
    });

    /* Modal liên hệ */
    const contactBtn = document.querySelector('.contact-btn');
    const contactModal = document.querySelector('.contact-modal');
    const closeContactModalBtn = document.querySelector('.close-contact-modal');

    contactBtn.addEventListener('click', () => {
        contactModal.style.display = 'flex';
        setTimeout(() => contactModal.classList.add('show'), 10);
    });

    closeContactModalBtn.addEventListener('click', closeContactModal);
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) closeContactModal();
    });

    function closeContactModal() {
        contactModal.classList.remove('show');
        setTimeout(() => contactModal.style.display = 'none', 300);
    }

    /* Modal sở thích */
    let hobbyModal = document.querySelector('.hobby-modal');
    if (!hobbyModal) {
        hobbyModal = document.createElement('div');
        hobbyModal.className = 'hobby-modal';
        hobbyModal.innerHTML = `
            <div class="hobby-modal-content">
                <button class="close-modal">×</button>
                <h3 class="modal-title"></h3>
                <p class="modal-description"></p>
            </div>
        `;
        document.body.appendChild(hobbyModal);
    }

    const hobbyModalContent = hobbyModal.querySelector('.hobby-modal-content');
    const modalTitle = hobbyModal.querySelector('.modal-title');
    const modalDescription = hobbyModal.querySelector('.modal-description');
    const closeHobbyModalBtn = hobbyModal.querySelector('.close-modal');

    /* Sự kiện cho nút Xem thêm sở thích */
    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const hobbyItem = btn.closest('.hobby-item');
            const title = hobbyItem.querySelector('h3').textContent;
            const description = btn.dataset.description || 'Chưa có thông tin chi tiết.';

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            hobbyModal.style.display = 'flex';
            setTimeout(() => hobbyModal.classList.add('show'), 10);
        });
    });

    /* Đóng modal sở thích */
    closeHobbyModalBtn.addEventListener('click', closeHobbyModal);
    hobbyModal.addEventListener('click', (e) => {
        if (e.target === hobbyModal) closeHobbyModal();
    });

    function closeHobbyModal() {
        hobbyModal.classList.remove('show');
        setTimeout(() => hobbyModal.style.display = 'none', 300);
    }

    /* Xử lý tải CV */
    const downloadCvLink = document.querySelector('.download-cv');
    downloadCvLink.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmDownload = confirm('Bạn có chắc chắn muốn tải CV cá nhân của Thanh Hải không?');
        if (confirmDownload) {
            const link = document.createElement('a');
            link.href = 'thanhhai.pdf';
            link.download = 'thanhhai.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    /* Hàm debounce cho sự kiện cuộn */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});