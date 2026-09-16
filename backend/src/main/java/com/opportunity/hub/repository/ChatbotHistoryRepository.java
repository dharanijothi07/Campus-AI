package com.opportunity.hub.repository;

import com.opportunity.hub.model.ChatbotHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatbotHistoryRepository extends JpaRepository<ChatbotHistory, Long> {
    List<ChatbotHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
}
