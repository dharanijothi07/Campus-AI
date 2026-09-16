package com.opportunity.hub.controller;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> register(Authentication authentication, @RequestBody Map<String, Long> payload) {
        Long eventId = payload.get("eventId");
        String email = authentication != null ? authentication.getName() : "student@example.com";
        return ResponseEntity.ok(registrationService.registerForEvent(email, eventId));
    }

    @GetMapping("/my")
    public ResponseEntity<List<EventDto.EventResponse>> getMyRegistrations(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "student@example.com";
        return ResponseEntity.ok(registrationService.getMyRegistrations(email));
    }
}
