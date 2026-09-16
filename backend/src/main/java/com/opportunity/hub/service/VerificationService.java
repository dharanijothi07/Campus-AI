package com.opportunity.hub.service;

import com.opportunity.hub.dto.VerificationResultDto;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.EventVerification;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.EventVerificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VerificationService {

    private final EventRepository eventRepository;
    private final EventVerificationRepository verificationRepository;

    public VerificationService(EventRepository eventRepository, EventVerificationRepository verificationRepository) {
        this.eventRepository = eventRepository;
        this.verificationRepository = verificationRepository;
    }

    @Transactional
    public VerificationResultDto verifyEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));

        List<Event> existingEvents = eventRepository.findAll();

        boolean isDuplicate = false;
        for (Event existing : existingEvents) {
            if (!existing.getId().equals(eventId) && 
                existing.getTitle().equalsIgnoreCase(event.getTitle()) &&
                existing.getCategoryName().equalsIgnoreCase(event.getCategoryName())) {
                isDuplicate = true;
                break;
            }
        }

        String titleDesc = (event.getTitle() + " " + event.getDescription()).toLowerCase();
        boolean isSuspicious = titleDesc.contains("guaranteed 100% placement without interview") ||
                               titleDesc.contains("send bitcoin") ||
                               titleDesc.contains("pay registration fee to personal upi") ||
                               titleDesc.contains("free money");

        boolean missingInfo = event.getEligibility() == null || event.getEligibility().trim().isEmpty() ||
                               event.getRegistrationLink() == null || !event.getRegistrationLink().startsWith("http");

        double qualityScore = 95.0;
        if (isDuplicate) qualityScore -= 30.0;
        if (isSuspicious) qualityScore -= 50.0;
        if (missingInfo) qualityScore -= 20.0;
        qualityScore = Math.max(10.0, Math.min(100.0, qualityScore));

        double credibilityScore = (event.getOrganizer() != null && event.getOrganizer().getRole().equals("ORGANIZER")) ? 94.0 : 82.0;

        String status = (isSuspicious || qualityScore < 50.0) ? "FLAGGED" : "VERIFIED";

        String summary = String.format("AI Verification Completed: Quality Score: %.1f%%. Credibility: %.1f%%. Status: %s. %s",
                qualityScore, credibilityScore, status,
                isDuplicate ? "Warning: Potential duplicate title." : "No duplicates detected.");

        EventVerification verification = verificationRepository.findByEventId(eventId)
                .orElseGet(() -> {
                    EventVerification ev = new EventVerification();
                    ev.setEvent(event);
                    return ev;
                });

        verification.setIsDuplicate(isDuplicate);
        verification.setIsSuspicious(isSuspicious);
        verification.setMissingInfo(missingInfo);
        verification.setQualityScore(qualityScore);
        verification.setCredibilityScore(credibilityScore);
        verification.setVerificationSummary(summary);
        verification.setStatus(status);

        EventVerification saved = verificationRepository.save(verification);

        // Update event flags
        event.setQualityScore(qualityScore);
        event.setIsVerified("VERIFIED".equalsIgnoreCase(status));
        eventRepository.save(event);

        VerificationResultDto dto = new VerificationResultDto();
        dto.setEventId(eventId);
        dto.setIsDuplicate(saved.getIsDuplicate());
        dto.setIsSuspicious(saved.getIsSuspicious());
        dto.setMissingInfo(saved.getMissingInfo());
        dto.setQualityScore(saved.getQualityScore());
        dto.setCredibilityScore(saved.getCredibilityScore());
        dto.setVerificationSummary(saved.getVerificationSummary());
        dto.setStatus(saved.getStatus());

        return dto;
    }
}
