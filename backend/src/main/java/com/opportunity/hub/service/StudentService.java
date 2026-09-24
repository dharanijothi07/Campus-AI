package com.opportunity.hub.service;

import com.opportunity.hub.dto.ProfileDto;
import com.opportunity.hub.model.StudentProfile;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.StudentProfileRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    public StudentService(StudentProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public ProfileDto getStudentProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> createDefaultProfile(user));

        return mapToDto(profile);
    }

    @Transactional
    public ProfileDto updateStudentProfile(String email, ProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getFullName() != null && !dto.getFullName().trim().isEmpty()) {
            user.setFullName(dto.getFullName());
            userRepository.save(user);
        }

        StudentProfile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> new StudentProfile(user, "Computer Science & Engineering", "Java", "Hackathons", "Chennai", "Software Engineer", ""));

        if (dto.getDepartment() != null) profile.setDepartment(dto.getDepartment());
        if (dto.getSkills() != null) profile.setSkills(dto.getSkills());
        if (dto.getTechnicalSkills() != null) profile.setTechnicalSkills(dto.getTechnicalSkills());
        if (dto.getInterests() != null) profile.setInterests(dto.getInterests());
        if (dto.getTechnicalInterests() != null) profile.setTechnicalInterests(dto.getTechnicalInterests());
        if (dto.getNonTechnicalInterests() != null) profile.setNonTechnicalInterests(dto.getNonTechnicalInterests());
        if (dto.getLocation() != null) profile.setLocation(dto.getLocation());
        if (dto.getCareerGoals() != null) profile.setCareerGoals(dto.getCareerGoals());
        if (dto.getCollege() != null) profile.setCollege(dto.getCollege());
        if (dto.getYearOfStudy() != null) profile.setYearOfStudy(dto.getYearOfStudy());
        if (dto.getCgpa() != null) profile.setCgpa(dto.getCgpa());
        if (dto.getPreviousActivities() != null) profile.setPreviousActivities(dto.getPreviousActivities());

        StudentProfile saved = profileRepository.save(profile);
        return mapToDto(saved);
    }

    private StudentProfile createDefaultProfile(User user) {
        StudentProfile p = new StudentProfile(
                user,
                "Computer Science & Engineering",
                "React, Java, Python",
                "Hackathons, AI/ML, Internships",
                "Chennai",
                "Software Engineer",
                "Registered on AI Opportunity Hub"
        );
        p.setCollege("Anna University / College of Engineering Guindy");
        p.setYearOfStudy(3);
        p.setCgpa(8.2);
        p.setTechnicalSkills("React, Java, Python, Spring Boot, MySQL");
        p.setTechnicalInterests("AI/ML, Generative AI, Cloud Architecture, Hackathons");
        p.setNonTechnicalInterests("Product Pitching, Open Source Community, Team Leadership");
        return profileRepository.save(p);
    }

    private ProfileDto mapToDto(StudentProfile profile) {
        ProfileDto dto = new ProfileDto();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setFullName(profile.getUser().getFullName());
        dto.setEmail(profile.getUser().getEmail());
        dto.setDepartment(profile.getDepartment());
        dto.setSkills(profile.getSkills());
        dto.setTechnicalSkills(profile.getTechnicalSkills());
        dto.setInterests(profile.getInterests());
        dto.setTechnicalInterests(profile.getTechnicalInterests());
        dto.setNonTechnicalInterests(profile.getNonTechnicalInterests());
        dto.setLocation(profile.getLocation());
        dto.setCareerGoals(profile.getCareerGoals());
        dto.setCollege(profile.getCollege());
        dto.setYearOfStudy(profile.getYearOfStudy());
        dto.setCgpa(profile.getCgpa());
        dto.setPreviousActivities(profile.getPreviousActivities());
        return dto;
    }
}
