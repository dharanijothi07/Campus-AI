package com.opportunity.hub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private EventCategory category;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "category_name", nullable = false)
    private String categoryName; // Hackathon, Workshop, Internship, Competition

    @Column(nullable = false)
    private String location;

    @Column(name = "department_target")
    private String departmentTarget = "All Departments";

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(nullable = false)
    private LocalDateTime deadline;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String eligibility;

    @Column(name = "skills_required", columnDefinition = "TEXT", nullable = false)
    private String skillsRequired;

    @Column(name = "registration_link", length = 500, nullable = false)
    private String registrationLink;

    @Column(name = "organizer_name")
    private String organizerName;

    @Column(name = "location_mode", length = 50)
    private String locationMode = "Offline"; // Online, Offline, Hybrid

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(name = "is_approved")
    private Boolean isApproved = true;

    @Column(name = "quality_score")
    private Double qualityScore = 80.0;

    @Column(name = "is_verified")
    private Boolean isVerified = true;

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

    public Event() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getOrganizer() { return organizer; }
    public void setOrganizer(User organizer) { this.organizer = organizer; }

    public EventCategory getCategory() { return category; }
    public void setCategory(EventCategory category) { this.category = category; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
