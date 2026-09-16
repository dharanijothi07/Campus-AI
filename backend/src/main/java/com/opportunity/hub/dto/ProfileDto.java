package com.opportunity.hub.dto;

public class ProfileDto {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String department;
    private String skills;
    private String interests;
    private String location;
    private String careerGoals;
    private String previousActivities;

    public ProfileDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
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
    public String getPreviousActivities() { return previousActivities; }
    public void setPreviousActivities(String previousActivities) { this.previousActivities = previousActivities; }
}
