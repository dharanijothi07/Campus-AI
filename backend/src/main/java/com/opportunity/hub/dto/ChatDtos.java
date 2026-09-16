package com.opportunity.hub.dto;

import java.util.List;

public class ChatDtos {

    public static class ChatRequest {
        private String query;

        public ChatRequest() {}
        public ChatRequest(String query) { this.query = query; }

        public String getQuery() { return query; }
        public void setQuery(String query) { this.query = query; }
    }

    public static class ChatResponse {
        private String query;
        private String response;
        private List<EventDto.EventResponse> suggestedEvents;

        public ChatResponse() {}
        public ChatResponse(String query, String response, List<EventDto.EventResponse> suggestedEvents) {
            this.query = query;
            this.response = response;
            this.suggestedEvents = suggestedEvents;
        }

        public String getQuery() { return query; }
        public void setQuery(String query) { this.query = query; }
        public String getResponse() { return response; }
        public void setResponse(String response) { this.response = response; }
        public List<EventDto.EventResponse> getSuggestedEvents() { return suggestedEvents; }
        public void setSuggestedEvents(List<EventDto.EventResponse> suggestedEvents) { this.suggestedEvents = suggestedEvents; }
    }
}
