package com.opportunity.hub.dto;

import java.util.ArrayList;
import java.util.List;

public class EligibilityMatchDto {

    private Boolean isEligible;
    private Double matchPercentage;
    private String status; // ELIGIBLE, NOT_FULLY_ELIGIBLE, NOT_ELIGIBLE
    private List<String> matchReasons = new ArrayList<>();
    private List<String> missingRequirements = new ArrayList<>();
    private String summary;

    public EligibilityMatchDto() {}

    public EligibilityMatchDto(Boolean isEligible, Double matchPercentage, String status,
                               List<String> matchReasons, List<String> missingRequirements, String summary) {
        this.isEligible = isEligible;
        this.matchPercentage = matchPercentage;
        this.status = status;
        this.matchReasons = matchReasons != null ? matchReasons : new ArrayList<>();
        this.missingRequirements = missingRequirements != null ? missingRequirements : new ArrayList<>();
        this.summary = summary;
    }

    public Boolean getIsEligible() { return isEligible; }
    public void setIsEligible(Boolean isEligible) { this.isEligible = isEligible; }

    public Double getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Double matchPercentage) { this.matchPercentage = matchPercentage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getMatchReasons() { return matchReasons; }
    public void setMatchReasons(List<String> matchReasons) { this.matchReasons = matchReasons; }

    public List<String> getMissingRequirements() { return missingRequirements; }
    public void setMissingRequirements(List<String> missingRequirements) { this.missingRequirements = missingRequirements; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
