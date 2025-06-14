package com.example.Palindrome;

public class PalindromeResponse {
    private String text;
    private boolean isPalindrome;

    // Constructors, Getters and Setters
    public PalindromeResponse(String text, boolean isPalindrome) {
        this.text = text;
        this.isPalindrome = isPalindrome;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isPalindrome() {
        return isPalindrome;
    }

    public void setPalindrome(boolean isPalindrome) {
        this.isPalindrome = isPalindrome;
    }
}