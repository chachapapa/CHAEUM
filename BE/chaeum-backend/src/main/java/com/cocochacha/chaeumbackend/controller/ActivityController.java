package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.dto.AddActivityRequest;
import com.cocochacha.chaeumbackend.dto.EndActivityRequest;
import com.cocochacha.chaeumbackend.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping("")
    public ResponseEntity<?> createActivity(@RequestBody AddActivityRequest addActivityRequest) {
        activityService.createActivity(addActivityRequest);
        return null;
    }

    @PatchMapping("")
    public ResponseEntity<?> endActivity(@RequestBody EndActivityRequest endActivityRequest) {
        activityService.endActivity(endActivityRequest);
        return null;
    }
}

