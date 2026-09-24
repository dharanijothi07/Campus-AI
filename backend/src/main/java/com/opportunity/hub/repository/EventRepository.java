package com.opportunity.hub.repository;

import com.opportunity.hub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findFirstByTitle(String title);

    @Query("SELECT e FROM Event e WHERE (e.approvalStatus = 'APPROVED' OR e.isApproved = true) ORDER BY e.eventDate ASC")
    List<Event> findApprovedEvents();

    List<Event> findByApprovalStatusOrderByEventDateAsc(String approvalStatus);

    List<Event> findByApprovalStatusIgnoreCase(String approvalStatus);

    List<Event> findByIsApprovedTrueOrderByEventDateAsc();

    List<Event> findByIsApprovedTrueAndCategoryNameIgnoreCase(String categoryName);

    List<Event> findByIsApprovedTrueAndLocationIgnoreCaseContaining(String location);

    List<Event> findByCategoryNameIgnoreCase(String categoryName);

    List<Event> findByLocationIgnoreCaseContaining(String location);

    List<Event> findByOrganizerId(Long organizerId);

    @Query("SELECT e FROM Event e WHERE (e.approvalStatus = 'APPROVED' OR (e.approvalStatus IS NULL AND e.isApproved = true)) AND (" +
           "LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.skillsRequired) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.categoryName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.location) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.departmentTarget) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(COALESCE(e.organizerName, '')) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Event> searchEvents(@Param("query") String query);
}
