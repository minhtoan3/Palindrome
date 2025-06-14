document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const resultContainer = document.getElementById('result-container');
    const charCount = document.getElementById('char-count');
    const historyList = document.getElementById('history-list');

    // --- Debounce Function ---
    // Ngăn việc gọi API liên tục khi đang gõ
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // --- API Call Function ---
    function checkPalindrome(text) {
        if (!text) {
            resultContainer.innerHTML = '';
            return;
        }

        fetch(`http://localhost:8080/api/check?text=${encodeURIComponent(text)}`)
            .then(response => response.json())
            .then(data => {
                let alertClass = '';
                let message = '';

                // Chỉ hiển thị kết quả nếu người dùng vẫn đang gõ từ đó
                if (inputText.value === text) {
                    if (data.palindrome) {
                        alertClass = 'alert-success';
                        message = `"${data.text}" là một Palindrome! ✅`;
                    } else {
                        alertClass = 'alert-danger';
                        message = `"${data.text}" không phải là Palindrome. ❌`;
                    }
                    resultContainer.innerHTML = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
                }
                // Sau khi kiểm tra, cập nhật lại lịch sử
                fetchAndRenderHistory();
            })
            .catch(error => console.error('Error:', error));
    }

    // --- History Function ---
    function fetchAndRenderHistory() {
        fetch('http://localhost:8080/api/history')
            .then(response => response.json())
            .then(history => {
                historyList.innerHTML = ''; // Xóa lịch sử cũ
                if (history.length === 0) {
                    historyList.innerHTML = '<li class="text-muted">Chưa có lịch sử.</li>';
                } else {
                    history.forEach(term => {
                        const li = document.createElement('li');
                        li.textContent = term;
                        historyList.appendChild(li);
                    });
                }
            });
    }

    // --- Event Listeners ---
    // Tạo phiên bản debounced của hàm checkPalindrome
    const debouncedCheck = debounce(checkPalindrome, 500); // Chờ 500ms sau khi ngừng gõ

    // Gán sự kiện cho ô input
    inputText.addEventListener('input', () => {
        const text = inputText.value;
        // 1. Cập nhật bộ đếm ký tự
        charCount.textContent = `${text.length} ký tự`;
        // 2. Gọi hàm kiểm tra trực tiếp (có debounce)
        debouncedCheck(text);
    });

    // Tải lịch sử lần đầu tiên khi trang được mở
    fetchAndRenderHistory();
});