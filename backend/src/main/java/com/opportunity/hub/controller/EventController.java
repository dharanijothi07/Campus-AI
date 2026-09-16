package com.opportunity.hub.controller;

import com.opportunity.hub.dto.EventDto;
import com.opportunity.hub.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto.EventResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto.EventResponse> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    public ResponseEntity<EventDto.EventResponse> createEvent(Authentication authentication, @RequestBody EventDto.EventRequest req) {
        String email = authentication != null ? authentication.getName() : "organizer@example.com";
        return ResponseEntity.ok(eventService.createEvent(email, req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto.EventResponse> updateEvent(@PathVariable Long id, @RequestBody EventDto.EventRequest req) {
        return ResponseEntity.ok(eventService.updateEvent(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
