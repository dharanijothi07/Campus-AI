package com.opportunity.hub.dto;

import java.time.LocalDateTime;

public class EventDto {

    public static class EventRequest {
        private String title;
        private String description;
        private String categoryName; // Hackathon, Workshop, Internship, Competition
        private String location;
        private String departmentTarget;
        private LocalDateTime eventDate;
        private LocalDateTime deadline;
        private String eligibility;
        private String skillsRequired;
        private String registrationLink;
        private String organizerName;
        private String locationMode; // Online, Offline, Hybrid
        private String imageUrl;
        private Boolean isApproved;

        public EventRequest() {}

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getDepartmentTarget() { return departmentTarget; }
        public void setDepartmentTarget(String departmentTarget) { this.departmentTarget = departmentTarget; }
        public LocalDateTime getEventDate() { return eventDate; }
        public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
        public LocalDateTime getDeadline() { return deadline; }
        public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }
        public String getEligibility() { return eligibility; }
        public void setEligibility(String eligibility) { this.eligibility = eligibility; }
        public String getSkillsRequired() { return skillsRequired; }
        public void setSkillsRequired(String skillsRequired) { this.skillsRequired = skillsRequired; }
        public String getRegistrationLink() { return registrationLink; }
        public void setRegistrationLink(String registrationLink) { this.registrationLink = registrationLink; }
        public String getOrganizerName() { return organizerName; }
        public void setOrganizerName(String organizerName) { this.organizerName = organizerName; }
        public String getLocationMode() { return locationMode; }
        public void setLocationMode(String locationMode) { this.locationMode = locationMode; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public Boolean getIsApproved() { return isApproved; }
        public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }
    }

    public static class EventResponse {
        private Long id;
        private String title;
        private String description;
        private String categoryName;
        private String location;
        private String departmentTarget;
        private LocalDateTime eventDate;
        private LocalDateTime deadline;
        private String eligibility;
        private String skillsRequired;
        private String registrationLink;
        private String organizerName;
        private String locationMode;
        private String imageUrl;
        private Boolean isApproved;
        private Double qualityScore;
        private Boolean isVerified;
        private Double aiMatchPercentage; // Optional match score for student view

        public EventResponse() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getDepartmentTarget() { return departmentTarget; }
        public void setDepartmentTarget(String departmentTarget) { this.departmentTarget = departmentTarget; }
        public LocalDateTime getEventDate() { return eventDate; }
        public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
        public LocalDateTime getDeadline() { return deadline; }
        public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }
        public String getEligibility() { return eligibility; }
        public void setEligibility(String eligibility) { this.eligibility = eligibility; }
        public String getSkillsRequired() { return skillsRequired; }
        public void setSkillsRequired(String skillsRequired) { this.skillsRequired = skillsRequired; }
        public String getRegistrationLink() { return registrationLink; }
        public void setRegistrationLink(String registrationLink) { this.registrationLink = registrationLink; }
        public String getOrganizerName() { return organizerName; }
        public void setOrganizerName(String organizerName) { this.organizerName = organizerName; }
        public String getLocationMode() { return locationMode; }
        public void setLocationMode(String locationMode) { this.locationMode = locationMode; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public Boolean getIsApproved() { return isApproved; }
        public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }
        public Double getQualityScore() { return qualityScore; }
        public void setQualityScore(Double qualityScore) { this.qualityScore = qualityScore; }
        public Boolean getIsVerified() { return isVerified; }
        public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
        public Double getAiMatchPercentage() { return aiMatchPercentage; }
        public void setAiMatchPercentage(Double aiMatchPercentage) { this.aiMatchPercentage = aiMatchPercentage; }
    }
}
