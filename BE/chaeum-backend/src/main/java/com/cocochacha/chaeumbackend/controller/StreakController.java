package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.dto.ModifyStreakRequest;
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

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());

        if(streakService.createStreak(createStreakRequest, userPersonalInfo)){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    /**
     * 스트릭을 수정합니다.
     *
     * @param modifyStreakRequest
     * @return
     */
    @PatchMapping("/modification")
    public ResponseEntity<?> modifyStreak(@RequestBody ModifyStreakRequest modifyStreakRequest){

        if(streakService.modifyStreak(modifyStreakRequest)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
        }
    }

    /**
     * 헤더에서 UserId를 추출하는 함수
     *
     * @return UserId
     */
    private Long getUserIDFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }
}
