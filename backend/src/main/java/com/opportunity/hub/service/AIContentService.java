package com.opportunity.hub.service;

import com.opportunity.hub.dto.AIContentDtos;
import org.springframework.stereotype.Service;

@Service
public class AIContentService {

    private final AIService aiService;

    public AIContentService(AIService aiService) {
        this.aiService = aiService;
    }

    public AIContentDtos.AIContentResponse generateDescription(AIContentDtos.DescriptionRequest req) {
        String prompt = String.format(
                "Generate a professional, compelling, hackathon-level event description for a college event titled '%s'. Category: %s. Topics: %s. Target Audience: %s. Include key highlights, learning outcomes, and reason to participate.",
                req.getTitle() != null ? req.getTitle() : "Tech Hackathon",
                req.getCategoryName() != null ? req.getCategoryName() : "Hackathon",
                req.getKeyTopics() != null ? req.getKeyTopics() : "AI, Full-Stack, Cloud",
                req.getTargetAudience() != null ? req.getTargetAudience() : "Engineering Students"
        );

        String generated = aiService.generateText(prompt);
        return new AIContentDtos.AIContentResponse(generated);
    }

    public AIContentDtos.AIContentResponse generatePromotion(AIContentDtos.PromotionRequest req) {
        String prompt = String.format(
                "Create a high-conversion social media promotional post for %s platform. Event Title: '%s'. Description Summary: '%s'. Include emojis, hashtags, urgency trigger, and registration CTA.",
                req.getPlatform() != null ? req.getPlatform() : "LinkedIn",
                req.getTitle() != null ? req.getTitle() : "Upcoming Hackathon",
                req.getDescription() != null ? req.getDescription() : "Build AI applications and compete for prizes."
        );

        String generated = aiService.generateText(prompt);
        return new AIContentDtos.AIContentResponse(generated);
    }
}
