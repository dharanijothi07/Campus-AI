package com.opportunity.hub.controller;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventController {

    private final EventService eventService;

    public AdminEventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto.EventResponse>> getAllAdminEvents() {
        // Return all events (both approved and pending) for admin management
        return ResponseEntity.ok(eventService.getAllEvents(false));
    }

    @PostMapping
    public ResponseEntity<EventDto.EventResponse> createAdminEvent(
            Authentication authentication,
            @RequestBody EventDto.EventRequest req) {
        String email = authentication != null ? authentication.getName() : "admin@example.com";
        // Default admin created events to approved if not explicitly specified
        if (req.getIsApproved() == null) {
            req.setIsApproved(true);
        }
        return ResponseEntity.ok(eventService.createEvent(email, req));
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<EventDto.EventResponse> toggleApproval(
            @PathVariable Long id,
            @RequestParam(name = "approved", required = false, defaultValue = "true") Boolean approved) {
        return ResponseEntity.ok(eventService.setApprovalStatus(id, approved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto.EventResponse> updateAdminEvent(
            @PathVariable Long id,
            @RequestBody EventDto.EventRequest req) {
        return ResponseEntity.ok(eventService.updateEvent(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
