package com.opportunity.hub.service;

import com.opportunity.hub.dto.ChatDtos;
import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.model.ChatbotHistory;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.ChatbotHistoryRepository;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatbotService {

    private final EventRepository eventRepository;
    private final ChatbotHistoryRepository chatbotHistoryRepository;
    private final UserRepository userRepository;
    private final EventService eventService;
    private final AIService aiService;

    public ChatbotService(EventRepository eventRepository,
                          ChatbotHistoryRepository chatbotHistoryRepository,
                          UserRepository userRepository,
                          EventService eventService,
                          AIService aiService) {
        this.eventRepository = eventRepository;
        this.chatbotHistoryRepository = chatbotHistoryRepository;
        this.userRepository = userRepository;
        this.eventService = eventService;
        this.aiService = aiService;
    }

    public ChatDtos.ChatResponse processQuery(String userEmail, ChatDtos.ChatRequest request) {
        String query = request.getQuery() != null ? request.getQuery().trim() : "";
        String lowerQuery = query.toLowerCase();

        List<Event> allEvents = eventRepository.findAll();
        List<EventDto.EventResponse> suggestedEvents = new ArrayList<>();
        String replyText = "";

        if (lowerQuery.contains("hackathon")) {
            List<Event> matches = allEvents.stream()
                    .filter(e -> "Hackathon".equalsIgnoreCase(e.getCategoryName()))
                    .collect(Collectors.toList());
            suggestedEvents = matches.stream().map(eventService::mapToResponse).collect(Collectors.toList());
            replyText = "We found " + matches.size() + " active hackathons! Top recommendation: " + 
                        (!matches.isEmpty() ? matches.get(0).getTitle() + " (Deadline: " + matches.get(0).getDeadline().toLocalDate() + ")" : "Check the recommendations page.");
        } else if (lowerQuery.contains("internship")) {
            List<Event> matches = allEvents.stream()
                    .filter(e -> "Internship".equalsIgnoreCase(e.getCategoryName()))
                    .collect(Collectors.toList());
            suggestedEvents = matches.stream().map(eventService::mapToResponse).collect(Collectors.toList());
            replyText = "Here are the live internship opportunities available for engineering students! Top listing: " +
                        (!matches.isEmpty() ? matches.get(0).getTitle() + " at " + matches.get(0).getLocation() : "Check the internships section.");
        } else if (lowerQuery.contains("eligibility") || lowerQuery.contains("criteria")) {
            replyText = "Event eligibility varies by role. Most engineering hackathons are open to UG/PG CSE, IT, and ECE students with basic programming skills in Java, Python, or React.";
            suggestedEvents = allEvents.stream().limit(2).map(eventService::mapToResponse).collect(Collectors.toList());
        } else if (lowerQuery.contains("deadline")) {
            replyText = "Upcoming deadlines: " + allEvents.stream()
                    .map(e -> e.getTitle() + " (" + e.getDeadline().toLocalDate() + ")")
                    .collect(Collectors.joining(", "));
            suggestedEvents = allEvents.stream().limit(3).map(eventService::mapToResponse).collect(Collectors.toList());
        } else {
            // Use general AI service
            String aiAnswer = aiService.generateText("You are an AI assistant for the AI Student Opportunity Ecosystem. Answer this student query concisely: " + query);
            replyText = aiAnswer != null ? aiAnswer : "Welcome to Opportunity Hub! You can ask me about hackathons, workshops, internships, deadlines, and eligibility.";
            suggestedEvents = allEvents.stream().limit(2).map(eventService::mapToResponse).collect(Collectors.toList());
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
