package com.opportunity.hub.service;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.dto.SearchDtos;
import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.StudentProfile;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.StudentProfileRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final EventRepository eventRepository;
    private final EventService eventService;
    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;

    public SearchService(EventRepository eventRepository,
                         EventService eventService,
                         UserRepository userRepository,
                         StudentProfileRepository profileRepository) {
        this.eventRepository = eventRepository;
        this.eventService = eventService;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public SearchDtos.SearchResponse smartSearch(SearchDtos.SearchRequest req) {
        return smartSearch(req, null);
    }

    public SearchDtos.SearchResponse smartSearch(SearchDtos.SearchRequest req, String userEmail) {
        String query = req.getQuery() != null ? req.getQuery().trim() : "";
        String lowerQuery = query.toLowerCase();

        SearchDtos.SearchResponse response = new SearchDtos.SearchResponse();
        response.setOriginalQuery(query);

        // 1. Extract Category
        String category = "All Categories";
        if (lowerQuery.contains("hackathon")) category = "Hackathon";
        else if (lowerQuery.contains("workshop")) category = "Workshop";
        else if (lowerQuery.contains("internship")) category = "Internship";
        else if (lowerQuery.contains("competition") || lowerQuery.contains("contest")) category = "Competition";
        response.setExtractedCategory(category);

        // 2. Extract Location
        String location = "All Locations";
        if (lowerQuery.contains("chennai")) location = "Chennai";
        else if (lowerQuery.contains("bengaluru") || lowerQuery.contains("bangalore")) location = "Bengaluru";
        else if (lowerQuery.contains("remote") || lowerQuery.contains("online")) location = "Remote";
        response.setExtractedLocation(location);

        // 3. Extract Department
        String dept = "All Departments";
        if (lowerQuery.contains("cse") || lowerQuery.contains("computer science")) dept = "Computer Science & Engineering";
        else if (lowerQuery.contains("it") || lowerQuery.contains("information technology")) dept = "Information Technology";
        else if (lowerQuery.contains("ece") || lowerQuery.contains("electronics")) dept = "Electronics & Communication";
        response.setExtractedDepartment(dept);

        // 4. Extract Keywords
        List<String> keywords = Arrays.stream(lowerQuery.split("\\s+"))
                .filter(w -> w.length() > 3 && !Arrays.asList("find", "for", "students", "in", "this", "month", "the", "and").contains(w))
                .collect(Collectors.toList());
        response.setExtractedKeywords(keywords);

        // 5. Query Database (Approved events only)
        List<Event> allEvents = eventRepository.findApprovedEvents();
        String finalCategory = category;
        String finalLocation = location;

        StudentProfile profile = null;
        if (userEmail != null) {
            Optional<User> u = userRepository.findByEmail(userEmail);
            if (u.isPresent()) {
                profile = profileRepository.findByUserId(u.get().getId()).orElse(null);
            }
        }
        final StudentProfile finalProfile = profile;

        List<EventDto.EventResponse> filteredEvents = allEvents.stream()
                .filter(e -> {
                    boolean catMatch = "All Categories".equals(finalCategory) || e.getCategoryName().equalsIgnoreCase(finalCategory);
                    boolean locMatch = "All Locations".equals(finalLocation) || e.getLocation().equalsIgnoreCase(finalLocation) || e.getLocation().equalsIgnoreCase("Remote");
                    
                    boolean keywordMatch = keywords.isEmpty() || keywords.stream().anyMatch(k -> 
                        e.getTitle().toLowerCase().contains(k) || 
                        e.getDescription().toLowerCase().contains(k) || 
                        e.getSkillsRequired().toLowerCase().contains(k)
                    );

                    return catMatch && (locMatch || keywordMatch);
                })
                .map(e -> eventService.mapToResponse(e, finalProfile))
                .collect(Collectors.toList());

        response.setEvents(filteredEvents);
        return response;
    }
}
