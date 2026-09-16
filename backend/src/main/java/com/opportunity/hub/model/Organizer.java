package com.opportunity.hub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "organizers")
public class Organizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "organization_name", nullable = false)
    private String organizationName;

    private String website;

    @Column(name = "credibility_score")
    private Double credibilityScore = 85.0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Organizer() {}

    public Organizer(User user, String organizationName, String website) {
        this.user = user;
        this.organizationName = organizationName;
        this.website = website;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public Double getCredibilityScore() { return credibilityScore; }
    public void setCredibilityScore(Double credibilityScore) { this.credibilityScore = credibilityScore; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
