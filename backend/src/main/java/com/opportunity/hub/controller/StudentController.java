package com.opportunity.hub.controller;

import com.opportunity.hub.dto.ProfileDto;
import com.opportunity.hub.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> getProfile(Authentication authentication) {
        return ResponseEntity.ok(studentService.getStudentProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileDto> updateProfile(Authentication authentication, @RequestBody ProfileDto dto) {
        return ResponseEntity.ok(studentService.updateStudentProfile(authentication.getName(), dto));
    }
}
