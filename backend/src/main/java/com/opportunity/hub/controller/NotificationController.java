package com.opportunity.hub.controller;

import com.opportunity.hub.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getNotifications(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "student@example.com";
        return ResponseEntity.ok(notificationService.getUserNotifications(email));
    }
}
