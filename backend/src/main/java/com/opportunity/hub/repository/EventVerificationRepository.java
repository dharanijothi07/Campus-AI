package com.opportunity.hub.repository;

import com.opportunity.hub.model.EventVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventVerificationRepository extends JpaRepository<EventVerification, Long> {
    Optional<EventVerification> findByEventId(Long eventId);
}
