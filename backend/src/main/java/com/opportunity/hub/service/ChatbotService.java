package com.opportunity.hub.service;

import com.opportunity.hub.dto.ChatDtos;
import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.model.ChatbotHistory;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.User;
import com.opportunity.hub.dto.EligibilityMatchDto;
import com.opportunity.hub.model.StudentProfile;
import com.opportunity.hub.repository.ChatbotHistoryRepository;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.StudentProfileRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatbotService {

    private final EventRepository eventRepository;
    private final ChatbotHistoryRepository chatbotHistoryRepository;
    private final UserRepository userRepository;
    private final EventService eventService;
    private final AIService aiService;
    private final StudentProfileRepository profileRepository;
    private final EligibilityMatchingService matchingService;

    public ChatbotService(EventRepository eventRepository,
                          ChatbotHistoryRepository chatbotHistoryRepository,
                          UserRepository userRepository,
                          EventService eventService,
                          AIService aiService,
                          StudentProfileRepository profileRepository,
                          EligibilityMatchingService matchingService) {
        this.eventRepository = eventRepository;
        this.chatbotHistoryRepository = chatbotHistoryRepository;
        this.userRepository = userRepository;
        this.eventService = eventService;
        this.aiService = aiService;
        this.profileRepository = profileRepository;
        this.matchingService = matchingService;
    }

    public ChatDtos.ChatResponse processQuery(String userEmail, ChatDtos.ChatRequest request) {
        String query = request.getQuery() != null ? request.getQuery().trim() : "";
        String lowerQuery = query.toLowerCase();

        List<Event> allEvents = eventRepository.findApprovedEvents();
        List<EventDto.EventResponse> suggestedEvents = new ArrayList<>();
        String replyText = "";

        StudentProfile profile = null;
        if (userEmail != null) {
            Optional<User> u = userRepository.findByEmail(userEmail);
            if (u.isPresent()) {
                profile = profileRepository.findByUserId(u.get().getId()).orElse(null);
            }
        }
        final StudentProfile finalProfile = profile;

        if (lowerQuery.contains("hackathon")) {
            List<Event> matches = allEvents.stream()
                    .filter(e -> "Hackathon".equalsIgnoreCase(e.getCategoryName()))
                    .collect(Collectors.toList());
            suggestedEvents = matches.stream().map(e -> eventService.mapToResponse(e, finalProfile)).collect(Collectors.toList());
            replyText = "We found " + matches.size() + " active hackathons! Top recommendation: " + 
                        (!matches.isEmpty() ? matches.get(0).getTitle() + " (Deadline: " + matches.get(0).getDeadline().toLocalDate() + ")" : "Check the recommendations page.");
        } else if (lowerQuery.contains("internship")) {
            List<Event> matches = allEvents.stream()
                    .filter(e -> "Internship".equalsIgnoreCase(e.getCategoryName()))
                    .collect(Collectors.toList());
            suggestedEvents = matches.stream().map(e -> eventService.mapToResponse(e, finalProfile)).collect(Collectors.toList());
            replyText = "Here are the live internship opportunities available for engineering students! Top listing: " +
                        (!matches.isEmpty() ? matches.get(0).getTitle() + " at " + matches.get(0).getLocation() : "Check the internships section.");
        } else if (lowerQuery.contains("eligibility") || lowerQuery.contains("criteria") || lowerQuery.contains("eligible")) {
            if (finalProfile != null) {
                long eligibleCount = allEvents.stream()
                        .map(e -> matchingService.evaluateEligibility(finalProfile, e))
                        .filter(EligibilityMatchDto::getIsEligible)
                        .count();
                replyText = "Based on your student profile (" + finalProfile.getDepartment() + ", Year " + finalProfile.getYearOfStudy() + ", CGPA " + finalProfile.getCgpa() + "), you are officially eligible for " + eligibleCount + " out of " + allEvents.size() + " live opportunities!";
                suggestedEvents = allEvents.stream().map(e -> eventService.mapToResponse(e, finalProfile)).limit(3).collect(Collectors.toList());
            } else {
                replyText = "Event eligibility is determined by your department, year of study, CGPA, and prerequisite skills. Log in and complete your Student Profile to see your personalized Eligibility Status and Match Percentage!";
                suggestedEvents = allEvents.stream().limit(2).map(eventService::mapToResponse).collect(Collectors.toList());
            }
        } else if (lowerQuery.contains("deadline")) {
            replyText = "Upcoming deadlines: " + allEvents.stream()
                    .map(e -> e.getTitle() + " (" + e.getDeadline().toLocalDate() + ")")
                    .collect(Collectors.joining(", "));
            suggestedEvents = allEvents.stream().limit(3).map(e -> eventService.mapToResponse(e, finalProfile)).collect(Collectors.toList());
        } else {
            // Use general AI service
            String aiAnswer = aiService.generateText("You are an AI assistant for the CAMPUS AI Student Opportunity Ecosystem. Answer this student query concisely: " + query);
            replyText = aiAnswer != null ? aiAnswer : "Welcome to CAMPUS AI! You can ask me about hackathons, workshops, internships, deadlines, and eligibility.";
            suggestedEvents = allEvents.stream().limit(2).map(e -> eventService.mapToResponse(e, finalProfile)).collect(Collectors.toList());
        }

        // Save history if user is logged in
        final String botAnswer = replyText;
        if (userEmail != null) {
            userRepository.findByEmail(userEmail).ifPresent(user -> {
                ChatbotHistory history = new ChatbotHistory(user, query, finalReplyText(botAnswer));
                chatbotHistoryRepository.save(history);
            });
        }

        return new ChatDtos.ChatResponse(query, replyText, suggestedEvents);
    }

    private String finalReplyText(String text) {
        return text != null && text.length() > 2000 ? text.substring(0, 2000) : text;
    }
}
