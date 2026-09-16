package com.opportunity.hub.controller;

import com.opportunity.hub.dto.AIContentDtos;
import com.opportunity.hub.service.AIContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIContentController {

    private final AIContentService aiContentService;

    public AIContentController(AIContentService aiContentService) {
        this.aiContentService = aiContentService;
    }

    @PostMapping("/generate-description")
    public ResponseEntity<AIContentDtos.AIContentResponse> generateDescription(@RequestBody AIContentDtos.DescriptionRequest req) {
        return ResponseEntity.ok(aiContentService.generateDescription(req));
    }

    @PostMapping("/generate-promotion")
    public ResponseEntity<AIContentDtos.AIContentResponse> generatePromotion(@RequestBody AIContentDtos.PromotionRequest req) {
        return ResponseEntity.ok(aiContentService.generatePromotion(req));
    }
}
