package com.opportunity.hub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "event_verification")
public class EventVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", nullable = false, unique = true)
    private Event event;

    @Column(name = "is_duplicate")
    private Boolean isDuplicate = false;

    @Column(name = "is_suspicious")
    private Boolean isSuspicious = false;

    @Column(name = "missing_info")
    private Boolean missingInfo = false;

    @Column(name = "quality_score")
    private Double qualityScore = 85.0;

    @Column(name = "credibility_score")
    private Double credibilityScore = 90.0;

    @Column(name = "verification_summary", columnDefinition = "TEXT")
    private String verificationSummary;

    private String status = "VERIFIED"; // VERIFIED, FLAGGED, PENDING

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public EventVerification() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public Boolean getIsDuplicate() { return isDuplicate; }
    public void setIsDuplicate(Boolean isDuplicate) { this.isDuplicate = isDuplicate; }

    public Boolean getIsSuspicious() { return isSuspicious; }
    public void setIsSuspicious(Boolean isSuspicious) { this.isSuspicious = isSuspicious; }

    public Boolean getMissingInfo() { return missingInfo; }
    public void setMissingInfo(Boolean missingInfo) { this.missingInfo = missingInfo; }

    public Double getQualityScore() { return qualityScore; }
    public void setQualityScore(Double qualityScore) { this.qualityScore = qualityScore; }

    public Double getCredibilityScore() { return credibilityScore; }
    public void setCredibilityScore(Double credibilityScore) { this.credibilityScore = credibilityScore; }

    public String getVerificationSummary() { return verificationSummary; }
    public void setVerificationSummary(String verificationSummary) { this.verificationSummary = verificationSummary; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
