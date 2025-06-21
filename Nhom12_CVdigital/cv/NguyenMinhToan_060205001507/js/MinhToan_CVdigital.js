document.addEventListener('DOMContentLoaded', function() {
    
    // --- HIỆU ỨNG GÕ CHỮ CHO PHỤ ĐỀ ---
    const subtitleElement = document.getElementById('subtitle');
    // Kiểm tra xem phần tử có tồn tại không trước khi thực thi
    if(subtitleElement) {
        const roles = ["Sinh viên Công nghệ thông tin", "Lập trình viên Web", "Người giải quyết vấn đề"];
        let roleIndex = 0; // Chỉ số của vai trò hiện tại trong mảng 'roles'
        let charIndex = 0; // Chỉ số của ký tự hiện tại đang được gõ

        // Hàm gõ chữ
        function type() {
            if (charIndex < roles[roleIndex].length) {
                subtitleElement.textContent += roles[roleIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Gọi lại hàm type sau 100ms để gõ ký tự tiếp theo
            } else {
                setTimeout(erase, 2000); // Sau khi gõ xong, đợi 2 giây rồi bắt đầu xóa
            }
        }

        // Hàm xóa chữ
        function erase() {
            if (charIndex > 0) {
                subtitleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50); // Gọi lại hàm erase sau 50ms để xóa ký tự tiếp theo
            } else {
                roleIndex = (roleIndex + 1) % roles.length; // Chuyển sang vai trò tiếp theo, quay vòng lại từ đầu nếu hết
                setTimeout(type, 500); // Đợi 0.5 giây rồi bắt đầu gõ vai trò mới
            }
        }
        
        type(); // Bắt đầu hiệu ứng
    }

    // --- CHỨC NĂNG CHUYỂN ĐỔI GIAO DIỆN SÁNG/TỐI (THEME TOGGLER) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const toggleIcon = themeToggle.querySelector('i');

    // Kiểm tra trong localStorage xem người dùng đã chọn theme nào trước đó chưa
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggleIcon.classList.replace('fa-sun', 'fa-moon'); // Đổi icon thành mặt trăng
    }

    // Click vào nút chuyển đổi
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Lưu lựa chọn của người dùng vào localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            localStorage.setItem('theme', 'dark');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- CHỨC NĂNG THEO DÕI KHI CUỘN (SCROLLSPY) & HIỂN THỊ NÚT "LÊN ĐẦU TRANG" ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        let current = 'home'; // Section hiện tại đang hiển thị trên màn hình

        // Xác định section hiện tại
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // -75 để tạo khoảng đệm, giúp active link chính xác hơn khi header đang fixed
            if (pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });

        // Thêm class 'active' cho link điều hướng tương ứng
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href')?.substring(1) === current) {
                a.classList.add('active');
            }
        });

        // Hiển thị hoặc ẩn nút "Lên đầu trang"
        if(window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // --- HIỆU ỨNG HIỂN THỊ CÁC PHẦN TỬ KHI CUỘN VÀO TẦM NHÌN ---
    // Sử dụng IntersectionObserver để có hiệu suất tốt hơn so với lắng nghe sự kiện 'scroll'
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // entry.isIntersecting là true khi phần tử đi vào viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Thêm class để kích hoạt animation CSS

                // Trường hợp đặc biệt: khi section 'skills' hiện ra, kích hoạt animation cho các thanh progress
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        // Thêm một chút độ trễ để hiệu ứng mượt mà hơn
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200); 
                    });
                }

                // Sau khi đã hiển thị, ngừng theo dõi phần tử này để tiết kiệm tài nguyên
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Kích hoạt khi 20% của phần tử hiển thị trong viewport

    // Áp dụng observer cho tất cả các phần tử có class 'hidden'
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});