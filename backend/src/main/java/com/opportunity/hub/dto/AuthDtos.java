package com.opportunity.hub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public static class LoginRequest {
        @NotBlank @Email
        private String email;

        @NotBlank
        private String password;

        public LoginRequest() {}
        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        @NotBlank @Email
        private String email;

        @NotBlank @Size(min = 6)
        private String password;

        @NotBlank
        private String fullName;

        private String role = "STUDENT"; // STUDENT or ORGANIZER

        // Student details if role == STUDENT
        private String department;
        private String skills;
        private String interests;
        private String location;
        private String careerGoals;

        // Organizer details if role == ORGANIZER
        private String organizationName;
        private String website;

        public RegisterRequest() {}

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public String getSkills() { return skills; }
        public void setSkills(String skills) { this.skills = skills; }
        public String getInterests() { return interests; }
        public void setInterests(String interests) { this.interests = interests; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getCareerGoals() { return careerGoals; }
        public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }
        public String getOrganizationName() { return organizationName; }
        public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }
        public String getWebsite() { return website; }
        public void setWebsite(String website) { this.website = website; }
    }

    public static class AuthResponse {
        private String token;
        private String tokenType = "Bearer";
        private Long userId;
        private String email;
        private String fullName;
        private String role;

        public AuthResponse(String token, Long userId, String email, String fullName, String role) {
            this.token = token;
            this.userId = userId;
            this.email = email;
            this.fullName = fullName;
            this.role = role;
        }

        public String getToken() { return token; }
        public String getTokenType() { return tokenType; }
        public Long getUserId() { return userId; }
        public String getEmail() { return email; }
        public String getFullName() { return fullName; }
        public String getRole() { return role; }
    }
}
