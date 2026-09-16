package com.opportunity.hub.service;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.Registration;
import com.opportunity.hub.model.User;
import com.opportunity.hub.model.UserActivity;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.RegistrationRepository;
import com.opportunity.hub.repository.UserActivityRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final UserActivityRepository activityRepository;
    private final EventService eventService;

    public RegistrationService(RegistrationRepository registrationRepository,
                               EventRepository eventRepository,
                               UserRepository userRepository,
                               UserActivityRepository activityRepository,
                               EventService eventService) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.eventService = eventService;
    }

    @Transactional
    public Map<String, Object> registerForEvent(String studentEmail, Long eventId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student user not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));

        if (registrationRepository.existsByStudentIdAndEventId(student.getId(), eventId)) {
            throw new RuntimeException("You are already registered for this event!");
        }

        Registration reg = new Registration(student, event);
        Registration saved = registrationRepository.save(reg);

        // Log user activity
        activityRepository.save(new UserActivity(student, event, "REGISTER", "Registered for event: " + event.getTitle()));

        return Map.of(
                "registrationId", saved.getId(),
                "status", saved.getStatus(),
                "message", "Successfully registered for " + event.getTitle() + "!",
                "registeredAt", saved.getRegisteredAt().toString()
        );
    }

    public List<EventDto.EventResponse> getMyRegistrations(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student user not found"));

        List<Registration> list = registrationRepository.findByStudentId(student.getId());
        return list.stream()
                .map(r -> eventService.mapToResponse(r.getEvent()))
                .collect(Collectors.toList());
    }
}
