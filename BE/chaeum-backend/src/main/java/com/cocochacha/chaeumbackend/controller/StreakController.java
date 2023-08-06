package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.service.StreakService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/streak")
public class StreakController {

    @Autowired
    StreakService streakService;

    @Autowired
    UserPersonalInfoService userPersonalInfoService;

    /**
     * 사용자의 스트릭을 생성한다.
     * 사용자의 스트릭정보를 생성한다.
     * 사용자의 태그를 생성한다.
     *
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 생성이 잘 되었는지 반환
     */
    @PostMapping("")
    public ResponseEntity<?> createStreak(@RequestBody CreateStreakRequest createStreakRequest){

        if(streakService.createStreak(createStreakRequest)){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }


}
