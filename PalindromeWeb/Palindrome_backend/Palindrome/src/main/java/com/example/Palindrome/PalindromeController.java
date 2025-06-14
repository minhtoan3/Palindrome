package com.example.Palindrome;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class PalindromeController {

    // Tiêm (Inject) PalindromeService vào Controller
    private final PalindromeService palindromeService;

    @Autowired
    public PalindromeController(PalindromeService palindromeService) {
        this.palindromeService = palindromeService;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/check")
    public PalindromeResponse checkPalindrome(@RequestParam String text) {
        boolean isPalindromeResult = isPalindrome(text);

        // Sau khi kiểm tra, thêm từ vào lịch sử
        if (text != null && !text.trim().isEmpty()) {
            palindromeService.addToHistory(text);
        }

        return new PalindromeResponse(text, isPalindromeResult);
    }

    // API MỚI: để lấy lịch sử tìm kiếm
    @CrossOrigin(origins = "*")
    @GetMapping("/api/history")
    public List<String> getSearchHistory() {
        return palindromeService.getHistory();
    }

    private boolean isPalindrome(String text) {
        if (text == null || text.trim().isEmpty()) {
            return false;
        }
        String cleanedText = text.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0;
        int right = cleanedText.length() - 1;
        while (left < right) {
            if (cleanedText.charAt(left) != cleanedText.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}