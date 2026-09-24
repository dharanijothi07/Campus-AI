package com.opportunity.hub.controller;

import com.opportunity.hub.dto.SearchDtos;
import com.opportunity.hub.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping
    public ResponseEntity<SearchDtos.SearchResponse> search(
            Authentication authentication,
            @RequestBody SearchDtos.SearchRequest request) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(searchService.smartSearch(request, email));
    }
}
