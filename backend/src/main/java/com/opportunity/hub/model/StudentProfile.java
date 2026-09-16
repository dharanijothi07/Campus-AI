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
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public StudentProfile() {}

    public StudentProfile(User user, String department, String skills, String interests, String location, String careerGoals, String previousActivities) {
        this.user = user;
        this.department = department;
        this.skills = skills;
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
    public void setSkills(String skills) { this.skills = skills; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }

    public String getPreviousActivities() { return previousActivities; }
    public void setPreviousActivities(String previousActivities) { this.previousActivities = previousActivities; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
