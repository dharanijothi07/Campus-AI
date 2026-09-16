package com.opportunity.hub.repository;

import com.opportunity.hub.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByStudentIdOrderByMatchPercentageDesc(Long studentId);
    void deleteByStudentId(Long studentId);
}
