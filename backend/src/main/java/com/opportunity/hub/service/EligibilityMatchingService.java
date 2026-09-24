package com.opportunity.hub.service;

import com.opportunity.hub.dto.EligibilityMatchDto;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.StudentProfile;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EligibilityMatchingService {

    public EligibilityMatchDto evaluateEligibility(StudentProfile profile, Event event) {
        if (profile == null || event == null) {
            return new EligibilityMatchDto(
                    true,
                    80.0,
                    "ELIGIBLE",
                    Collections.singletonList("✓ Open to all registered students"),
                    Collections.emptyList(),
                    "Eligible ✅ - Standard student access."
            );
        }

        List<String> matchReasons = new ArrayList<>();
        List<String> missingRequirements = new ArrayList<>();
        boolean hardRequirementsPassed = true;

        String studentDept = profile.getDepartment() != null ? profile.getDepartment().trim() : "All Departments";
        String eventDept = event.getDepartmentTarget() != null ? event.getDepartmentTarget().trim() : "All Departments";
        int studentYear = profile.getYearOfStudy() != null ? profile.getYearOfStudy() : 3;
        String eventYears = event.getEligibleYears() != null ? event.getEligibleYears().trim() : "ALL";
        double studentCgpa = profile.getCgpa() != null ? profile.getCgpa() : 8.0;
        double minCgpa = event.getMinCgpa() != null ? event.getMinCgpa() : 0.0;
        String studentSkills = profile.getTechnicalSkills() != null ? profile.getTechnicalSkills().toLowerCase() : "";
        String mandatorySkills = event.getMandatorySkills() != null ? event.getMandatorySkills().trim() : "";
        String studentCollege = profile.getCollege() != null ? profile.getCollege().trim() : "";
        String eventColleges = event.getEligibleColleges() != null ? event.getEligibleColleges().trim() : "ALL";

        // ==========================================
        // PHASE A: HARD ELIGIBILITY GATES
        // ==========================================

        // 1. Department Check
        boolean deptMatches = isDepartmentCompatible(studentDept, eventDept);
        if (deptMatches) {
            matchReasons.add("✓ Department matches (" + studentDept + ")");
        } else {
            hardRequirementsPassed = false;
            missingRequirements.add("✗ Department mismatch: Requires " + eventDept + " (Your department: " + studentDept + ")");
        }

        // 2. Year of Study Check
        boolean yearMatches = isYearCompatible(studentYear, eventYears);
        if (yearMatches) {
            matchReasons.add("✓ Year matches (Year " + studentYear + ")");
        } else {
            hardRequirementsPassed = false;
            missingRequirements.add("✗ Year mismatch: Open to Years " + eventYears + " (Your year: Year " + studentYear + ")");
        }

        // 3. Minimum CGPA Check
        if (minCgpa > 0.0) {
            if (studentCgpa >= minCgpa) {
                matchReasons.add("✓ CGPA requirement met (" + String.format("%.1f", studentCgpa) + " >= " + String.format("%.1f", minCgpa) + ")");
            } else {
                hardRequirementsPassed = false;
                missingRequirements.add("✗ Minimum CGPA requirement: " + String.format("%.1f", minCgpa) + " (Your CGPA: " + String.format("%.1f", studentCgpa) + ")");
            }
        }

        // 4. Mandatory Prerequisite Skills Check
        if (!mandatorySkills.isEmpty()) {
            String[] reqSkills = mandatorySkills.split("[,;]+");
            for (String rawSkill : reqSkills) {
                String skill = rawSkill.trim();
                if (!skill.isEmpty()) {
                    if (containsSkillToken(studentSkills, skill.toLowerCase())) {
                        matchReasons.add("✓ Required skill matches: " + skill);
                    } else {
                        hardRequirementsPassed = false;
                        missingRequirements.add("✗ Required skill: " + skill);
                    }
                }
            }
        }

        // 5. College Check (if restricted)
        if (!"ALL".equalsIgnoreCase(eventColleges) && !eventColleges.isEmpty()) {
            boolean collegeMatches = studentCollege.toLowerCase().contains(eventColleges.toLowerCase()) ||
                    eventColleges.toLowerCase().contains(studentCollege.toLowerCase());
            if (collegeMatches) {
                matchReasons.add("✓ College requirement verified");
            } else {
                hardRequirementsPassed = false;
                missingRequirements.add("✗ College restriction: Open to " + eventColleges);
            }
        }

        // ==========================================
        // PHASE B: TRANSPARENT MATCH PERCENTAGE
        // ==========================================

        double score = 30.0; // Baseline foundation score

        // 1. Technical Skills Alignment (Max 35%)
        String eventSkills = event.getSkillsRequired() != null ? event.getSkillsRequired() : "";
        if (!eventSkills.isEmpty()) {
            String[] skillTokens = eventSkills.split("[,;]+");
            int totalSkills = 0;
            int matchedSkills = 0;
            for (String token : skillTokens) {
                String s = token.trim();
                if (!s.isEmpty()) {
                    totalSkills++;
                    if (containsSkillToken(studentSkills, s.toLowerCase())) {
                        matchedSkills++;
                        // Add specific skill match reason if not already added by mandatory check
                        String skillReason = "✓ " + s + " skill matches";
                        if (!matchReasons.contains(skillReason) && !matchReasons.contains("✓ Required skill matches: " + s)) {
                            matchReasons.add(skillReason);
                        }
                    }
                }
            }
            if (totalSkills > 0) {
                double skillRatio = (double) matchedSkills / totalSkills;
                score += Math.min(skillRatio * 35.0, 35.0);
            }
        } else {
            score += 20.0; // Default skill points if no skills specified
        }

        // 2. Department Alignment (Max 15%)
        if (deptMatches) {
            if (studentDept.equalsIgnoreCase(eventDept)) {
                score += 15.0; // Exact match
            } else {
                score += 10.0; // "All Departments" or related
            }
        }

        // 3. Year Alignment (Max 10%)
        if (yearMatches) {
            score += 10.0;
        }

        // 4. Technical Interests Alignment (Max 15%)
        String techInterests = profile.getTechnicalInterests() != null ? profile.getTechnicalInterests().toLowerCase() : "";
        String eventContent = (event.getTitle() + " " + event.getDescription() + " " + event.getCategoryName()).toLowerCase();
        if (!techInterests.isEmpty()) {
            String[] interestTokens = techInterests.split("[,;]+");
            int interestMatches = 0;
            for (String interest : interestTokens) {
                String it = interest.trim();
                if (it.length() > 2 && eventContent.contains(it)) {
                    interestMatches++;
                    String interestReason = "✓ Interest matches (" + interest.trim() + ")";
                    if (!matchReasons.contains(interestReason)) {
                        matchReasons.add(interestReason);
                    }
                }
            }
            score += Math.min(interestMatches * 7.5, 15.0);
        }

        // 5. Career Goal & Non-Technical Synergy (Max 10%)
        String careerGoal = profile.getCareerGoals() != null ? profile.getCareerGoals().toLowerCase() : "";
        String nonTechInterests = profile.getNonTechnicalInterests() != null ? profile.getNonTechnicalInterests().toLowerCase() : "";
        boolean careerMatch = false;
        if (!careerGoal.isEmpty()) {
            String[] goalWords = careerGoal.split("\\s+");
            for (String gw : goalWords) {
                if (gw.length() > 3 && eventContent.contains(gw)) {
                    careerMatch = true;
                    break;
                }
            }
        }
        if (careerMatch) {
            score += 6.0;
            matchReasons.add("✓ Career goal alignment with opportunity");
        }
        if (!nonTechInterests.isEmpty() && eventContent.contains("leadership") || eventContent.contains("presentation") || eventContent.contains("pitch")) {
            score += 4.0;
        }

        // 6. Location & Accessibility Mode (Max 10%)
        String eventMode = event.getLocationMode() != null ? event.getLocationMode().toUpperCase() : "ONLINE";
        String eventLoc = event.getLocation() != null ? event.getLocation().toLowerCase() : "";
        String studentLoc = profile.getLocation() != null ? profile.getLocation().toLowerCase() : "";

        if ("ONLINE".equals(eventMode)) {
            score += 10.0;
            matchReasons.add("✓ Online mode — accessible anywhere");
        } else if (eventLoc.contains("remote") || (!studentLoc.isEmpty() && eventLoc.contains(studentLoc))) {
            score += 10.0;
            matchReasons.add("✓ Location matches (" + profile.getLocation() + ")");
        } else {
            score += 5.0; // Offline/Hybrid in other city
        }

        // 7. Academic Excellence Bonus (Max 5%)
        if (studentCgpa >= 8.5) {
            score += 5.0;
        } else if (studentCgpa >= 7.5) {
            score += 3.0;
        }

        // Final score capping (between 40.0% and 99.0%)
        double finalPercentage = Math.round(Math.min(Math.max(score, 40.0), 99.0) * 10.0) / 10.0;

        // Determine status
        String status;
        String summary;
        if (hardRequirementsPassed) {
            status = "ELIGIBLE";
            summary = "Eligible ✅ (" + finalPercentage + "% Match)";
        } else {
            status = "NOT_FULLY_ELIGIBLE";
            summary = "Not Fully Eligible ⚠️ (" + finalPercentage + "% Match)";
        }

        return new EligibilityMatchDto(
                hardRequirementsPassed,
                finalPercentage,
                status,
                matchReasons,
                missingRequirements,
                summary
        );
    }

    private boolean isDepartmentCompatible(String studentDept, String eventDept) {
        if (eventDept == null || eventDept.trim().isEmpty() ||
                "all".equalsIgnoreCase(eventDept) ||
                "all departments".equalsIgnoreCase(eventDept)) {
            return true;
        }
        String s = studentDept.toLowerCase();
        String e = eventDept.toLowerCase();
        if (s.contains(e) || e.contains(s)) return true;

        // Common engineering equivalencies
        if (s.contains("computer science") || s.contains("cse") || s.contains("information technology") || s.contains("it")) {
            if (e.contains("computer") || e.contains("cse") || e.contains("it") || e.contains("engineering")) {
                return true;
            }
        }
        return false;
    }

    private boolean isYearCompatible(int studentYear, String eventYears) {
        if (eventYears == null || eventYears.trim().isEmpty() || "ALL".equalsIgnoreCase(eventYears.trim())) {
            return true;
        }
        String[] parts = eventYears.split("[,;\\s]+");
        String studentYearStr = String.valueOf(studentYear);
        for (String part : parts) {
            String p = part.trim();
            if (p.equals(studentYearStr)) return true;
            if (studentYear == 1 && (p.contains("1") || p.equalsIgnoreCase("first"))) return true;
            if (studentYear == 2 && (p.contains("2") || p.equalsIgnoreCase("second"))) return true;
            if (studentYear == 3 && (p.contains("3") || p.equalsIgnoreCase("third"))) return true;
            if (studentYear == 4 && (p.contains("4") || p.equalsIgnoreCase("fourth") || p.equalsIgnoreCase("final"))) return true;
        }
        return false;
    }

    private boolean containsSkillToken(String skillsHaystack, String needle) {
        if (skillsHaystack == null || needle == null || needle.isEmpty()) return false;
        String[] tokens = skillsHaystack.split("[,;\\n]+");
        for (String t : tokens) {
            String clean = t.trim().toLowerCase();
            if (clean.equals(needle) || clean.contains(needle) || needle.contains(clean)) {
                return true;
            }
        }
        return false;
    }
}
