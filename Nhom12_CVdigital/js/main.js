/* Hàm này tạo ra các hạt bay lơ lửng cho nền trang web. */
function createParticles() {
  // Lấy phần tử container có id là 'particles' từ HTML.
  const particlesContainer = document.getElementById('particles');
  // Số lượng hạt muốn tạo.
  const numberOfParticles = 50;

  // Dùng vòng lặp để tạo đủ số lượng hạt.
  for (let i = 0; i < numberOfParticles; i++) {
    // Tạo một thẻ <div> mới cho mỗi hạt.
    const particle = document.createElement('div');
    // Gán class 'particle' để áp dụng CSS đã định nghĩa.
    particle.className = 'particle';

    // Đặt vị trí xuất phát ngẫu nhiên theo chiều ngang (từ 0% đến 100%).
    particle.style.left = Math.random() * 100 + '%';
    // Đặt độ trễ animation ngẫu nhiên (từ 0 đến 8 giây). Điều này làm các hạt không bay cùng lúc.
    particle.style.animationDelay = Math.random() * 8 + 's';
    // Đặt thời gian chạy animation ngẫu nhiên (từ 6 đến 10 giây). Điều này làm các hạt bay với tốc độ khác nhau.
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    // Thêm hạt vừa tạo vào trong container.
    particlesContainer.appendChild(particle);
  }
}

/* Hàm này khởi tạo chức năng tìm kiếm thành viên. */
function initializeSearch() {
  // Lấy ô input tìm kiếm.
  const searchInput = document.getElementById('searchInput');
  // Lấy tất cả các thẻ thành viên. querySelectorAll trả về một danh sách (NodeList).
  const memberCards = document.querySelectorAll('.member-card');
  // Lấy phần tử thông báo khi không có kết quả.
  const noResults = document.getElementById('noResults');
  // Thêm một sự kiện 'input', nó sẽ kích hoạt mỗi khi người dùng gõ chữ vào ô tìm kiếm.
  searchInput.addEventListener('input', function() {
    // Lấy giá trị người dùng nhập, chuyển thành chữ thường và xóa khoảng trắng thừa.
    const searchTerm = this.value.toLowerCase().trim();
    // Biến đếm số thẻ đang hiển thị.
    let visibleCards = 0;
    // Lặp qua từng thẻ thành viên.
    memberCards.forEach(card => {
      // Lấy thông tin tên và kỹ năng từ thuộc tính 'data-*' của thẻ.
      const name = card.getAttribute('data-name').toLowerCase();
      const skills = card.getAttribute('data-skills').toLowerCase();
      // Kiểm tra xem tên hoặc kỹ năng có chứa từ khóa tìm kiếm hay không.
      if (name.includes(searchTerm) || skills.includes(searchTerm)) {
        // Nếu có, xóa class 'hidden' để thẻ hiện ra.
        card.classList.remove('hidden');
        // Tăng biến đếm.
        visibleCards++;
      } else {
        // Nếu không, thêm class 'hidden' để ẩn thẻ đi (cần CSS cho class .hidden).
        card.classList.add('hidden');
      }
    });
    // Kiểm tra để hiển thị hoặc ẩn thông báo "Không tìm thấy".
    if (visibleCards === 0 && searchTerm !== '') {
      // Nếu không có thẻ nào hiện và người dùng có nhập gì đó, thì hiện thông báo.
      noResults.style.display = 'block';
    } else {
      // Ngược lại, ẩn thông báo đi.
      noResults.style.display = 'none';
    }
  });
}

/* Hàm này thêm hiệu ứng xuất hiện lần đầu cho các thẻ. */
function addEntranceAnimations() {
  const cards = document.querySelectorAll('.member-card');

  // Lặp qua từng thẻ và áp dụng animation.
  cards.forEach((card, index) => {
    // Mặc định cho thẻ trong suốt và dịch xuống dưới một chút.
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.animation = `fadeInUp 0.8s ease-out ${0.2 * index}s forwards`;
  });
}

/* Hàm này xử lý tương tác khi người dùng click vào thẻ. */
function addCardInteractions() {
  const cards = document.querySelectorAll('.member-card');
  cards.forEach(card => {
    // Thêm sự kiện 'click' cho mỗi thẻ.
    card.addEventListener('click', function() {
      // Khi click, thẻ sẽ hơi lún xuống (scale(0.98)).
      // this.style.transform sẽ ghi đè lên hiệu ứng hover trong CSS.
      this.style.transform = 'translateY(-12px) scale(0.98)';
      // Dùng setTimeout để trả thẻ về trạng thái hover sau một khoảng thời gian ngắn (150ms).
      setTimeout(() => {
        // Trả lại trạng thái hover (scale(1.01)).
        this.style.transform = 'translateY(-12px) scale(1.01)';
      }, 150);
    });
  });
}

/* Hàm này tinh chỉnh lại hiệu ứng của các icon bay khi hover. */
function addHoverEffects() {
  const cards = document.querySelectorAll('.member-card');
  cards.forEach(card => {
    // Sự kiện 'mouseenter' kích hoạt khi con trỏ chuột đi vào khu vực của thẻ.
    card.addEventListener('mouseenter', function() {
      // Lấy tất cả icon bay bên trong thẻ đang được hover.
      const floatingIcons = this.querySelectorAll('.floating-icon');
      // Lặp qua các icon và thay đổi animation của chúng để tạo hiệu ứng mới mẻ.
      floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = (index * 0.1) + 's';
        icon.style.animationDuration = '5s';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Gọi các hàm để khởi tạo hiệu ứng và chức năng.
  createParticles();
  initializeSearch();
  addEntranceAnimations();
  addCardInteractions();
  addHoverEffects();
});

/* Phần này tự động thêm các keyframes cần thiết vào trang bằng JavaScript. */
// Tạo một thẻ <style> mới.
const style = document.createElement('style');
// Thêm nội dung CSS (định nghĩa animation 'fadeInUp') vào thẻ style.
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
// Gắn thẻ <style> này vào trong thẻ <head> của trang web.
document.head.appendChild(style);