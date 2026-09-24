package com.opportunity.hub.service;

import com.opportunity.hub.dto.EligibilityMatchDto;
import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.Recommendation;
import com.opportunity.hub.model.StudentProfile;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.RecommendationRepository;
import com.opportunity.hub.repository.StudentProfileRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final EventRepository eventRepository;
    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final RecommendationRepository recommendationRepository;
    private final EventService eventService;
    private final EligibilityMatchingService matchingService;

    public RecommendationService(EventRepository eventRepository,
                                 StudentProfileRepository profileRepository,
                                 UserRepository userRepository,
                                 RecommendationRepository recommendationRepository,
                                 EventService eventService,
                                 EligibilityMatchingService matchingService) {
        this.eventRepository = eventRepository;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.recommendationRepository = recommendationRepository;
        this.eventService = eventService;
        this.matchingService = matchingService;
    }

    @Transactional
    public List<EventDto.EventResponse> getPersonalizedRecommendations(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<StudentProfile> profileOpt = profileRepository.findByUserId(user.getId());
        if (profileOpt.isEmpty()) {
            return eventService.getAllEvents();
        }

        StudentProfile profile = profileOpt.get();
        List<Event> allEvents = eventRepository.findApprovedEvents();

        List<EventDto.EventResponse> results = new ArrayList<>();

        for (Event event : allEvents) {
            EventDto.EventResponse dto = eventService.mapToResponse(event, profile);
            results.add(dto);
        }

        // Sort descending by AI match percentage
        results.sort((a, b) -> {
            // First prioritize eligible events
            boolean aEligible = a.getEligibilityMatch() != null && Boolean.TRUE.equals(a.getEligibilityMatch().getIsEligible());
            boolean bEligible = b.getEligibilityMatch() != null && Boolean.TRUE.equals(b.getEligibilityMatch().getIsEligible());
            if (aEligible != bEligible) {
                return aEligible ? -1 : 1;
            }
            double scoreA = a.getAiMatchPercentage() != null ? a.getAiMatchPercentage() : 0.0;
            double scoreB = b.getAiMatchPercentage() != null ? b.getAiMatchPercentage() : 0.0;
            return Double.compare(scoreB, scoreA);
        });

        return results;
    }
}
