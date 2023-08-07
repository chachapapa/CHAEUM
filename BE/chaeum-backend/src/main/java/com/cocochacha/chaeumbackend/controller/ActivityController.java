package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.dto.AddActivityRequest;
import com.cocochacha.chaeumbackend.dto.AddActivityResponse;
import com.cocochacha.chaeumbackend.dto.EndActivityRequest;
import com.cocochacha.chaeumbackend.dto.StartMessageRequest;
import com.cocochacha.chaeumbackend.service.ActivityService;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    /**
     * 활동 시작에 대한 요청에 대한 응답을 해주는 메소드
     *
     * @param addActivityRequest 스트릭 ID, 시작 시간
     * @return DB에 저장되는 값과 HTTP 응답 코드
     */
    @PostMapping("")
    public ResponseEntity<?> createActivity(@RequestBody AddActivityRequest addActivityRequest) {
        // DB에 값을 저장하고, Front End에게 누적 값 주기
        try {
            AddActivityResponse addActivityResponse = activityService.createActivity(addActivityRequest);
            return new ResponseEntity<>(addActivityResponse, HttpStatus.OK);
        } catch (NoSuchElementException | NullPointerException NSEE) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
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

    @GetMapping("/message/starting")
    public ResponseEntity<?> startMent(@RequestBody StartMessageRequest startMessageRequest) {
        // 시작시 받는 멘트
        // 유저의 정보를 기반으로 메세지를 보내줄 것
        activityService.startMessage(startMessageRequest);
        return null;
    }
}

