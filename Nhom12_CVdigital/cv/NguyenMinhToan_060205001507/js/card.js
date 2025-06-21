// Chờ cho toàn bộ nội dung HTML được tải xong trước khi thực hiện các hàm khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    createParticles();       // Tạo hiệu ứng hạt động
    init3DEffect();          // Khởi tạo hiệu ứng 3D khi di chuyển chuột
    initColorPicker();       // Khởi tạo trình chọn màu
    animateOnLoad();         // Thực hiện hiệu ứng xuất hiện khi tải trang
});

// Tạo các hạt động ngẫu nhiên trong vùng hiển thị
function createParticles() {
    const particlesContainer = document.getElementById('particles');  // Lấy phần tử chứa hạt
    if (!particlesContainer) return;  // Nếu không tồn tại thì thoát

    const particleCount = 50;  // Số lượng hạt cần tạo
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div'); // Tạo thẻ div mới
        particle.className = 'particle';  // Gán class để áp dụng CSS
        particle.style.left = Math.random() * 100 + '%';  // Vị trí trái ngẫu nhiên
        particle.style.top = Math.random() * 100 + '%';   // Vị trí trên ngẫu nhiên
        particle.style.animationDelay = Math.random() * 6 + 's';        // Thời gian trễ ngẫu nhiên
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Thời lượng chạy animation
        particlesContainer.appendChild(particle); // Thêm vào container
    }
}

// Khởi tạo hiệu ứng xoay 3D khi rê chuột vào thẻ
function init3DEffect() {
    const cardContainer = document.getElementById('cardContainer');  // Vùng chứa hiệu ứng
    const profileCard = document.getElementById('profileCard');      // Thẻ chính
    if (!cardContainer || !profileCard) return;
    let isAnimating = false;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    // Hàm xử lý chuyển động mượt (easing) khi di chuột
    function animate() {
        if (!isAnimating) return;
        currentX += (targetX - currentX) * 0.3; // Dịch chuyển dần theo trục X
        currentY += (targetY - currentY) * 0.3; // Dịch chuyển dần theo trục Y
        cardContainer.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        requestAnimationFrame(animate); // Gọi đệ quy để tiếp tục hiệu ứng
    }

    // Sự kiện khi rê chuột vào container
    cardContainer.addEventListener('mousemove', (e) => {
        if (!isAnimating) {
            isAnimating = true;
            profileCard.style.transform = `translateZ(50px)`; // Làm nổi thẻ lên
            requestAnimationFrame(animate);
        }
        const rect = cardContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetX = (centerX - x) / 10;
        targetY = (y - centerY) / 10;
    });

    // Sự kiện khi chuột rời khỏi vùng container
    cardContainer.addEventListener('mouseleave', () => {
        isAnimating = false;
        cardContainer.style.transition = 'transform 0.5s ease-out';  // Hiệu ứng quay lại ban đầu
        profileCard.style.transition = 'transform 0.5s ease-out';
        cardContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        profileCard.style.transform = 'translateZ(0)';
        currentX = targetX = 0;
        currentY = targetY = 0;
    });
}

// Khởi tạo và xử lý sự kiện đổi màu chủ đề bằng input type="color"
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    if (!colorPicker) return;
    // Cập nhật màu sắc chủ đạo và màu phụ
    const updateThemeColor = (color) => {
        const secondaryColor = shadeColor(color, -20);  // Tạo màu phụ tối hơn
        document.documentElement.style.setProperty('--primary-color', color);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    };
    // Gán sự kiện khi người dùng chọn màu mới
    colorPicker.addEventListener('input', (event) => {
        updateThemeColor(event.target.value);
    });
    // Cập nhật màu ban đầu khi trang được tải
    updateThemeColor(colorPicker.value);
}

/**
 * Hàm tạo ra một màu mới sáng hơn hoặc tối hơn màu gốc.
 * @param {string} color - Mã màu hex ban đầu.
 * @param {number} percent - Phần trăm thay đổi độ sáng (-100 là tối nhất, 100 là sáng nhất).
 * @returns {string} Mã màu mới dạng hex.
 */
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16); // Lấy giá trị Red
    let G = parseInt(color.substring(3, 5), 16); // Lấy giá trị Green
    let B = parseInt(color.substring(5, 7), 16); // Lấy giá trị Blue
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
    return "#" + RR + GG + BB;
}
/**
 * Hàm tạo hiệu ứng xuất hiện dần theo thứ tự cho các phần tử được chọn
 */
function animateOnLoad() {
    const elementsToAnimate = [
        '.avatar-container', '.info-section', '.color-picker-container',
        '.social-links', '.more-info'
    ];
    elementsToAnimate.forEach((selector, index) => {
        const el = document.querySelector(selector); // Tìm phần tử theo selector
        if (el) {
            el.style.opacity = '0'; // Ẩn ban đầu
            el.style.transform += ' translateY(30px)'; // Dịch xuống
            setTimeout(() => {
                el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'; // Áp dụng hiệu ứng chuyển động
                el.style.opacity = '1';  // Hiển thị
                el.style.transform = el.style.transform.replace(/translateY\([^)]+\)/, 'translateY(0)'); // Dịch về lại
            }, 200 + (index * 100)); // Trễ theo thứ tự
        }
    });
}
