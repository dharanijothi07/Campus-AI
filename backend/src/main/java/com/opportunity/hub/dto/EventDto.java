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
        private String locationMode; // ONLINE, OFFLINE, HYBRID
        private String imageUrl;
        private String approvalStatus; // PENDING, APPROVED, REJECTED
        private Boolean isApproved;
        private String eligibleYears; // e.g. "1,2,3,4" or "3,4" or "ALL"
        private Double minCgpa;
        private String eligibleColleges;
        private String mandatorySkills;

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
        public String getApprovalStatus() { return approvalStatus; }
        public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }
        public Boolean getIsApproved() { return isApproved; }
        public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }
        public String getEligibleYears() { return eligibleYears != null ? eligibleYears : "ALL"; }
        public void setEligibleYears(String eligibleYears) { this.eligibleYears = eligibleYears; }
        public Double getMinCgpa() { return minCgpa != null ? minCgpa : 0.0; }
        public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
        public String getEligibleColleges() { return eligibleColleges != null ? eligibleColleges : "ALL"; }
        public void setEligibleColleges(String eligibleColleges) { this.eligibleColleges = eligibleColleges; }
        public String getMandatorySkills() { return mandatorySkills; }
        public void setMandatorySkills(String mandatorySkills) { this.mandatorySkills = mandatorySkills; }
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
        private String approvalStatus; // PENDING, APPROVED, REJECTED
        private Boolean isApproved;
        private Double qualityScore;
        private Boolean isVerified;
        private Double aiMatchPercentage; // Optional match score for student view
        private String eligibleYears;
        private Double minCgpa;
        private String eligibleColleges;
        private String mandatorySkills;
        private EligibilityMatchDto eligibilityMatch;

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
        public String getApprovalStatus() { return approvalStatus; }
        public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }
        public Boolean getIsApproved() { return isApproved; }
        public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }
        public Double getQualityScore() { return qualityScore; }
        public void setQualityScore(Double qualityScore) { this.qualityScore = qualityScore; }
        public Boolean getIsVerified() { return isVerified; }
        public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
        public Double getAiMatchPercentage() { return aiMatchPercentage; }
        public void setAiMatchPercentage(Double aiMatchPercentage) { this.aiMatchPercentage = aiMatchPercentage; }
        public String getEligibleYears() { return eligibleYears != null ? eligibleYears : "ALL"; }
        public void setEligibleYears(String eligibleYears) { this.eligibleYears = eligibleYears; }
        public Double getMinCgpa() { return minCgpa != null ? minCgpa : 0.0; }
        public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
        public String getEligibleColleges() { return eligibleColleges != null ? eligibleColleges : "ALL"; }
        public void setEligibleColleges(String eligibleColleges) { this.eligibleColleges = eligibleColleges; }
        public String getMandatorySkills() { return mandatorySkills; }
        public void setMandatorySkills(String mandatorySkills) { this.mandatorySkills = mandatorySkills; }
        public EligibilityMatchDto getEligibilityMatch() { return eligibilityMatch; }
        public void setEligibilityMatch(EligibilityMatchDto eligibilityMatch) { this.eligibilityMatch = eligibilityMatch; }
    }
}
