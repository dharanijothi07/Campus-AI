package com.opportunity.hub.controller;

import com.opportunity.hub.dto.VerificationResultDto;
import com.opportunity.hub.service.VerificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class VerificationController {

    private final VerificationService verificationService;

    public VerificationController(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<VerificationResultDto> verifyEvent(@PathVariable Long id) {
        return ResponseEntity.ok(verificationService.verifyEvent(id));
    }
}
