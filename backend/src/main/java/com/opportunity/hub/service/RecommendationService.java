package com.opportunity.hub.service;

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

    public RecommendationService(EventRepository eventRepository,
                                 StudentProfileRepository profileRepository,
                                 UserRepository userRepository,
                                 RecommendationRepository recommendationRepository,
                                 EventService eventService) {
        this.eventRepository = eventRepository;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.recommendationRepository = recommendationRepository;
        this.eventService = eventService;
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
            double score = calculateMatchScore(profile, event);
            EventDto.EventResponse dto = eventService.mapToResponse(event);
            dto.setAiMatchPercentage(Math.round(score * 10.0) / 10.0);
            results.add(dto);
        }

        // Sort descending by AI match percentage
        results.sort((a, b) -> Double.compare(b.getAiMatchPercentage(), a.getAiMatchPercentage()));

        return results;
    }

    private double calculateMatchScore(StudentProfile profile, Event event) {
        double score = 50.0; // Base baseline score

        String skills = (profile.getSkills() + " " + profile.getInterests()).toLowerCase();
        String eventSkills = (event.getSkillsRequired() + " " + event.getTitle() + " " + event.getDescription()).toLowerCase();
        String dept = profile.getDepartment() != null ? profile.getDepartment().toLowerCase() : "";
        String eventDept = event.getDepartmentTarget() != null ? event.getDepartmentTarget().toLowerCase() : "";
        String loc = profile.getLocation() != null ? profile.getLocation().toLowerCase() : "";
        String eventLoc = event.getLocation() != null ? event.getLocation().toLowerCase() : "";

        // 1. Skill & Interest Match (+25% max)
        String[] skillTokens = skills.split("[,\\s]+");
        int matchCount = 0;
        for (String token : skillTokens) {
            if (token.length() > 2 && eventSkills.contains(token)) {
                matchCount++;
            }
        }
        score += Math.min(matchCount * 7.5, 25.0);

        // 2. Department Match (+15%)
        if (eventDept.contains("all") || eventDept.contains(dept) || dept.contains(eventDept)) {
            score += 15.0;
        }

        // 3. Location Match (+10%)
        if (eventLoc.contains("remote") || eventLoc.contains(loc) || loc.contains(eventLoc)) {
            score += 10.0;
        }

        // Cap score at 99.0 max
        return Math.min(score, 99.0);
    }
}
