package com.opportunity.hub.dto;

public class VerificationResultDto {
    private Long eventId;
    private Boolean isDuplicate;
    private Boolean isSuspicious;
    private Boolean missingInfo;
    private Double qualityScore;
    private Double credibilityScore;
    private String verificationSummary;
    private String status;

    public VerificationResultDto() {}

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
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
}
