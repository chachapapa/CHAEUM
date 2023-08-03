package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.dto.AddActivityRequest;
import com.cocochacha.chaeumbackend.dto.EndActivityRequest;
import com.cocochacha.chaeumbackend.service.ActivityService;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    /**
     * 활동 종료에 대한 요청에 응답을 해주는 메소드
     *
     * @param endActivityRequest 활동 ID, 스트릭 ID, 종료 시간
     * @return DB에 저장된 값
     */
    @Transactional
    @PatchMapping("")
    public ResponseEntity<?> endActivity(@RequestBody EndActivityRequest endActivityRequest) {
        // 종료하고 값을 던져줘야함
        try {
            EndActivityRequest returnValue = activityService.endActivity(endActivityRequest);
            return new ResponseEntity<>(returnValue, HttpStatus.OK);
        } catch (NoSuchElementException | NullPointerException NSEE) {
            // 리턴 하기
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }
}

