package com.opportunity.hub.service;

import com.opportunity.hub.dto.AuthDtos;
import com.opportunity.hub.model.Organizer;
import com.opportunity.hub.model.StudentProfile;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.OrganizerRepository;
import com.opportunity.hub.repository.StudentProfileRepository;
import com.opportunity.hub.repository.UserRepository;
import com.opportunity.hub.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final OrganizerRepository organizerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       StudentProfileRepository studentProfileRepository,
                       OrganizerRepository organizerRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.organizerRepository = organizerRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthDtos.AuthResponse registerUser(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already registered!");
        }

        String role = request.getRole() != null && !request.getRole().isEmpty() ? request.getRole().toUpperCase() : "STUDENT";
        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFullName(),
                role
        );
        User savedUser = userRepository.save(user);

        if ("STUDENT".equals(role)) {
            StudentProfile profile = new StudentProfile(
                    savedUser,
                    request.getDepartment() != null ? request.getDepartment() : "Computer Science & Engineering",
                    request.getSkills() != null ? request.getSkills() : "Java, Python, React",
                    request.getInterests() != null ? request.getInterests() : "Hackathons, Web Dev",
                    request.getLocation() != null ? request.getLocation() : "Chennai",
                    request.getCareerGoals() != null ? request.getCareerGoals() : "Software Engineer",
                    "New student registration"
            );
            studentProfileRepository.save(profile);
        } else if ("ORGANIZER".equals(role)) {
            Organizer organizer = new Organizer(
                    savedUser,
                    request.getOrganizationName() != null ? request.getOrganizationName() : request.getFullName() + " Org",
                    request.getWebsite() != null ? request.getWebsite() : "https://example.org"
            );
            organizerRepository.save(organizer);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String jwt = tokenProvider.generateToken(authentication);

        return new AuthDtos.AuthResponse(jwt, savedUser.getId(), savedUser.getEmail(), savedUser.getFullName(), savedUser.getRole());
    }

    public AuthDtos.AuthResponse loginUser(AuthDtos.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthDtos.AuthResponse(jwt, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
    }
}
