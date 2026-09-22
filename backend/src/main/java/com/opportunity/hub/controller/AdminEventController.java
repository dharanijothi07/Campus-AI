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
        // New events created by Admin/Organizer should use APPROVED only when explicitly approved. Otherwise use PENDING.
        if (!"APPROVED".equalsIgnoreCase(req.getApprovalStatus()) && !Boolean.TRUE.equals(req.getIsApproved())) {
            req.setApprovalStatus("PENDING");
            req.setIsApproved(false);
        } else {
            req.setApprovalStatus("APPROVED");
            req.setIsApproved(true);
        }
        return ResponseEntity.ok(eventService.createEvent(email, req));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<EventDto.EventResponse> approveEventPost(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.approveEvent(id));
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<EventDto.EventResponse> approveEventPatch(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.approveEvent(id));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<EventDto.EventResponse> rejectEventPost(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.rejectEvent(id));
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<EventDto.EventResponse> rejectEventPatch(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.rejectEvent(id));
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
