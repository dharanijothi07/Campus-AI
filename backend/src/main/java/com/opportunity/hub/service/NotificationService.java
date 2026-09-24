package com.opportunity.hub.service;

import com.opportunity.hub.model.Notification;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.NotificationRepository;
import com.opportunity.hub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public List<Map<String, Object>> getUserNotifications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        if (list.isEmpty()) {
            // Provide default initial notification for demo
            Notification defaultNotif = new Notification(user, "🎯 Welcome to CAMPUS AI!", 
                    "Your profile has been analyzed. Check your personalized recommendations feed!", "RECOMMENDATION");
            notificationRepository.save(defaultNotif);
            list = List.of(defaultNotif);
        }

        return list.stream().map(n -> Map.<String, Object>of(
                "id", n.getId(),
                "title", n.getTitle(),
                "message", n.getMessage(),
                "type", n.getType(),
                "isRead", n.getIsRead(),
                "createdAt", n.getCreatedAt().toString()
        )).collect(Collectors.toList());
    }
}
