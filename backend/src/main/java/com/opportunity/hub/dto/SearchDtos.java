package com.opportunity.hub.dto;

import java.util.List;

public class SearchDtos {

    public static class SearchRequest {
        private String query; // Natural language query e.g. "Find AI hackathons for CSE students in Chennai this month"

        public SearchRequest() {}
        public SearchRequest(String query) { this.query = query; }

        public String getQuery() { return query; }
        public void setQuery(String query) { this.query = query; }
    }

    public static class SearchResponse {
        private String originalQuery;
        private String extractedCategory;
        private String extractedLocation;
        private String extractedDepartment;
        private List<String> extractedKeywords;
        private List<EventDto.EventResponse> events;

        public SearchResponse() {}

        public String getOriginalQuery() { return originalQuery; }
        public void setOriginalQuery(String originalQuery) { this.originalQuery = originalQuery; }
        public String getExtractedCategory() { return extractedCategory; }
        public void setExtractedCategory(String extractedCategory) { this.extractedCategory = extractedCategory; }
        public String getExtractedLocation() { return extractedLocation; }
        public void setExtractedLocation(String extractedLocation) { this.extractedLocation = extractedLocation; }
        public String getExtractedDepartment() { return extractedDepartment; }
        public void setExtractedDepartment(String extractedDepartment) { this.extractedDepartment = extractedDepartment; }
        public List<String> getExtractedKeywords() { return extractedKeywords; }
        public void setExtractedKeywords(List<String> extractedKeywords) { this.extractedKeywords = extractedKeywords; }
        public List<EventDto.EventResponse> getEvents() { return events; }
        public void setEvents(List<EventDto.EventResponse> events) { this.events = events; }
    }
}
