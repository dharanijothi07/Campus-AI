package com.opportunity.hub.controller;

import com.opportunity.hub.dto.SearchDtos;
import com.opportunity.hub.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping
    public ResponseEntity<SearchDtos.SearchResponse> search(@RequestBody SearchDtos.SearchRequest request) {
        return ResponseEntity.ok(searchService.smartSearch(request));
    }
}
