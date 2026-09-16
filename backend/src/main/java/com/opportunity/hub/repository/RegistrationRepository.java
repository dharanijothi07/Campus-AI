package com.opportunity.hub.repository;

import com.opportunity.hub.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudentId(Long studentId);
    Optional<Registration> findByStudentIdAndEventId(Long studentId, Long eventId);
    Boolean existsByStudentIdAndEventId(Long studentId, Long eventId);
    Long countByEventId(Long eventId);
}
