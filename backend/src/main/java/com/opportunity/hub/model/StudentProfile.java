package com.opportunity.hub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String department;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String skills;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String interests;

    @Column(nullable = false)
    private String location;

    @Column(name = "career_goals", columnDefinition = "TEXT", nullable = false)
    private String careerGoals;

    @Column(name = "college")
    private String college = "Anna University / Campus Institute";

    @Column(name = "year_of_study")
    private Integer yearOfStudy = 3;

    @Column(name = "cgpa")
    private Double cgpa = 8.0;

    @Column(name = "technical_skills", columnDefinition = "TEXT")
    private String technicalSkills;

    @Column(name = "technical_interests", columnDefinition = "TEXT")
    private String technicalInterests;

    @Column(name = "non_technical_interests", columnDefinition = "TEXT")
    private String nonTechnicalInterests;

    @Column(name = "previous_activities", columnDefinition = "TEXT")
    private String previousActivities;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.technicalSkills == null || this.technicalSkills.isEmpty()) {
            this.technicalSkills = this.skills;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        if (this.technicalSkills == null || this.technicalSkills.isEmpty()) {
            this.technicalSkills = this.skills;
        }
    }

    public StudentProfile() {}

    public StudentProfile(User user, String department, String skills, String interests, String location, String careerGoals, String previousActivities) {
        this.user = user;
        this.department = department;
        this.skills = skills;
        this.technicalSkills = skills;
        this.interests = interests;
        this.location = location;
        this.careerGoals = careerGoals;
        this.previousActivities = previousActivities;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) {
        this.skills = skills;
        if (this.technicalSkills == null || this.technicalSkills.isEmpty()) {
            this.technicalSkills = skills;
        }
    }

    public String getTechnicalSkills() {
        return (technicalSkills != null && !technicalSkills.trim().isEmpty()) ? technicalSkills : skills;
    }
    public void setTechnicalSkills(String technicalSkills) {
        this.technicalSkills = technicalSkills;
        if (this.skills == null || this.skills.trim().isEmpty()) {
            this.skills = technicalSkills;
        }
    }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public String getTechnicalInterests() {
        return (technicalInterests != null && !technicalInterests.trim().isEmpty()) ? technicalInterests : interests;
    }
    public void setTechnicalInterests(String technicalInterests) { this.technicalInterests = technicalInterests; }

    public String getNonTechnicalInterests() { return nonTechnicalInterests; }
    public void setNonTechnicalInterests(String nonTechnicalInterests) { this.nonTechnicalInterests = nonTechnicalInterests; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public Integer getYearOfStudy() { return yearOfStudy != null ? yearOfStudy : 3; }
    public void setYearOfStudy(Integer yearOfStudy) { this.yearOfStudy = yearOfStudy; }

    public Double getCgpa() { return cgpa != null ? cgpa : 8.0; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }

    public String getPreviousActivities() { return previousActivities; }
    public void setPreviousActivities(String previousActivities) { this.previousActivities = previousActivities; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
