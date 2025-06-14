package com.example.Palindrome;

import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Service
public class PalindromeService {

    // Dùng LinkedList để dễ dàng thêm vào đầu và giới hạn kích thước
    private final LinkedList<String> searchHistory = new LinkedList<>();
    private static final int MAX_HISTORY_SIZE = 10;

    /**
     * Thêm một từ mới vào lịch sử.
     * Nếu lịch sử đầy, từ cũ nhất sẽ bị xóa.
     * @param term Từ cần thêm.
     */
    public void addToHistory(String term) {
        // Tránh thêm các từ trùng lặp liên tiếp
        if (!searchHistory.isEmpty() && searchHistory.getFirst().equalsIgnoreCase(term)) {
            return;
        }

        searchHistory.addFirst(term); // Thêm vào đầu danh sách

        // Nếu danh sách vượt quá kích thước tối đa, xóa phần tử cuối cùng
        if (searchHistory.size() > MAX_HISTORY_SIZE) {
            searchHistory.removeLast();
        }
    }

    /**
     * Lấy danh sách lịch sử các từ đã tìm kiếm.
     * @return Một danh sách các chuỗi.
     */
    public List<String> getHistory() {
        return Collections.unmodifiableList(searchHistory);
    }
}