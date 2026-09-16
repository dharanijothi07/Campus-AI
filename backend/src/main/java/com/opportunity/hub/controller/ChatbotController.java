package com.opportunity.hub.controller;

import com.opportunity.hub.dto.ChatDtos;
import com.opportunity.hub.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ResponseEntity<ChatDtos.ChatResponse> chat(Authentication authentication, @RequestBody ChatDtos.ChatRequest request) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(chatbotService.processQuery(email, request));
    }
}
