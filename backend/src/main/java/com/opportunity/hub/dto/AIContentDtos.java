package com.opportunity.hub.dto;

public class AIContentDtos {

    public static class DescriptionRequest {
        private String title;
        private String categoryName;
        private String keyTopics;
        private String targetAudience;

        public DescriptionRequest() {}

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        public String getKeyTopics() { return keyTopics; }
        public void setKeyTopics(String keyTopics) { this.keyTopics = keyTopics; }
        public String getTargetAudience() { return targetAudience; }
        public void setTargetAudience(String targetAudience) { this.targetAudience = targetAudience; }
    }

    public static class PromotionRequest {
        private String title;
        private String description;
        private String platform; // LinkedIn, Twitter/X, Email, WhatsApp

        public PromotionRequest() {}

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getPlatform() { return platform; }
        public void setPlatform(String platform) { this.platform = platform; }
    }

    public static class AIContentResponse {
        private String generatedContent;

        public AIContentResponse() {}
        public AIContentResponse(String generatedContent) { this.generatedContent = generatedContent; }

        public String getGeneratedContent() { return generatedContent; }
        public void setGeneratedContent(String generatedContent) { this.generatedContent = generatedContent; }
    }
}
