package com.opportunity.hub.service;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.EventCategory;
import com.opportunity.hub.model.EventVerification;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.EventCategoryRepository;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.EventVerificationRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventCategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final EventVerificationRepository verificationRepository;

    public EventService(EventRepository eventRepository,
                        EventCategoryRepository categoryRepository,
                        UserRepository userRepository,
                        EventVerificationRepository verificationRepository) {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
    }

    public List<EventDto.EventResponse> getAllEvents() {
        return getAllEvents(true);
    }

    public List<EventDto.EventResponse> getAllEvents(Boolean approvedOnly) {
        List<Event> events;
        if (Boolean.TRUE.equals(approvedOnly)) {
            events = eventRepository.findByApprovalStatusOrderByEventDateAsc("APPROVED");
            if (events.isEmpty()) {
                // Fallback in case existing records in database haven't run migration yet
                events = eventRepository.findByIsApprovedTrueOrderByEventDateAsc();
            }
        } else {
            events = eventRepository.findAll();
        }
        return events.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EventDto.EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));
        return mapToResponse(event);
    }

    @Transactional
    public EventDto.EventResponse createEvent(String userEmail, EventDto.EventRequest req) {
        User organizer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Organizer user not found"));

        EventCategory category = categoryRepository.findByNameIgnoreCase(req.getCategoryName())
                .orElseGet(() -> categoryRepository.save(new EventCategory(req.getCategoryName(), req.getCategoryName() + " category")));

        Event event = new Event();
        event.setOrganizer(organizer);
        event.setCategory(category);
        event.setTitle(req.getTitle());
        event.setDescription(req.getDescription());
        event.setCategoryName(req.getCategoryName() != null ? req.getCategoryName() : "Hackathon");
        event.setLocation(req.getLocation() != null ? req.getLocation() : "Remote");
        event.setDepartmentTarget(req.getDepartmentTarget() != null ? req.getDepartmentTarget() : "All Departments");
        event.setEventDate(req.getEventDate() != null ? req.getEventDate() : LocalDateTime.now().plusDays(15));
        event.setDeadline(req.getDeadline() != null ? req.getDeadline() : LocalDateTime.now().plusDays(10));
        event.setEligibility(req.getEligibility() != null ? req.getEligibility() : "Open to all students");
        event.setSkillsRequired(req.getSkillsRequired() != null ? req.getSkillsRequired() : "General Tech Skills");
        event.setRegistrationLink(req.getRegistrationLink() != null ? req.getRegistrationLink() : "https://opportunityhub.dev/register");
        event.setOrganizerName(req.getOrganizerName() != null && !req.getOrganizerName().trim().isEmpty() ? req.getOrganizerName().trim() : organizer.getFullName());
        
        // Location mode: ONLINE, OFFLINE, HYBRID
        event.setLocationMode(req.getLocationMode() != null ? req.getLocationMode().toUpperCase() : "OFFLINE");
        event.setImageUrl(req.getImageUrl());
        
        // Default to PENDING unless explicitly specified as APPROVED
        String initialStatus = "PENDING";
        if ("APPROVED".equalsIgnoreCase(req.getApprovalStatus()) || Boolean.TRUE.equals(req.getIsApproved())) {
            initialStatus = "APPROVED";
        } else if ("REJECTED".equalsIgnoreCase(req.getApprovalStatus())) {
            initialStatus = "REJECTED";
        }
        event.setApprovalStatus(initialStatus);
        
        event.setQualityScore(88.0);
        event.setIsVerified(true);

        Event saved = eventRepository.save(event);

        // Auto-create initial audit verification entry
        EventVerification verification = new EventVerification();
        verification.setEvent(saved);
        verification.setIsDuplicate(false);
        verification.setIsSuspicious(false);
        verification.setMissingInfo(false);
        verification.setQualityScore(88.0);
        verification.setCredibilityScore(92.0);
        verification.setVerificationSummary("Verified upon creation. Status: " + initialStatus);
        verification.setStatus("VERIFIED");
        verificationRepository.save(verification);

        return mapToResponse(saved);
    }

    @Transactional
    public EventDto.EventResponse updateEvent(Long id, EventDto.EventRequest req) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        if (req.getTitle() != null) event.setTitle(req.getTitle());
        if (req.getDescription() != null) event.setDescription(req.getDescription());
        if (req.getCategoryName() != null) event.setCategoryName(req.getCategoryName());
        if (req.getLocation() != null) event.setLocation(req.getLocation());
        if (req.getDepartmentTarget() != null) event.setDepartmentTarget(req.getDepartmentTarget());
        if (req.getEventDate() != null) event.setEventDate(req.getEventDate());
        if (req.getDeadline() != null) event.setDeadline(req.getDeadline());
        if (req.getEligibility() != null) event.setEligibility(req.getEligibility());
        if (req.getSkillsRequired() != null) event.setSkillsRequired(req.getSkillsRequired());
        if (req.getRegistrationLink() != null) event.setRegistrationLink(req.getRegistrationLink());
        if (req.getOrganizerName() != null) event.setOrganizerName(req.getOrganizerName());
        if (req.getLocationMode() != null) event.setLocationMode(req.getLocationMode().toUpperCase());
        if (req.getImageUrl() != null) event.setImageUrl(req.getImageUrl());
        
        if (req.getApprovalStatus() != null) {
            event.setApprovalStatus(req.getApprovalStatus().toUpperCase());
        } else if (req.getIsApproved() != null) {
            event.setIsApproved(req.getIsApproved());
        }

        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    @Transactional
    public EventDto.EventResponse approveEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));
        event.setApprovalStatus("APPROVED");
        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    @Transactional
    public EventDto.EventResponse rejectEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));
        event.setApprovalStatus("REJECTED");
        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    @Transactional
    public EventDto.EventResponse setApprovalStatus(Long id, boolean approved) {
        return approved ? approveEvent(id) : rejectEvent(id);
    }

    @Transactional
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found with ID: " + id);
        }
        eventRepository.deleteById(id);
    }

    public EventDto.EventResponse mapToResponse(Event event) {
        EventDto.EventResponse res = new EventDto.EventResponse();
        res.setId(event.getId());
        res.setTitle(event.getTitle());
        res.setDescription(event.getDescription());
        res.setCategoryName(event.getCategoryName());
        res.setLocation(event.getLocation());
        res.setDepartmentTarget(event.getDepartmentTarget());
        res.setEventDate(event.getEventDate());
        res.setDeadline(event.getDeadline());
        res.setEligibility(event.getEligibility());
        res.setSkillsRequired(event.getSkillsRequired());
        res.setRegistrationLink(event.getRegistrationLink());
        
        String orgName = event.getOrganizerName();
        if (orgName == null || orgName.trim().isEmpty()) {
            orgName = event.getOrganizer() != null ? event.getOrganizer().getFullName() : "Verified Organizer";
        }
        res.setOrganizerName(orgName);
        res.setLocationMode(event.getLocationMode() != null ? event.getLocationMode().toUpperCase() : "OFFLINE");
        res.setImageUrl(event.getImageUrl());
        res.setApprovalStatus(event.getApprovalStatus());
        res.setIsApproved(event.getIsApproved());
        res.setQualityScore(event.getQualityScore());
        res.setIsVerified(event.getIsVerified());
        return res;
    }
}
