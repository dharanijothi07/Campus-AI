package com.opportunity.hub.controller;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto.EventResponse>> getRecommendations(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "student@example.com";
        return ResponseEntity.ok(recommendationService.getPersonalizedRecommendations(email));
    }
}
