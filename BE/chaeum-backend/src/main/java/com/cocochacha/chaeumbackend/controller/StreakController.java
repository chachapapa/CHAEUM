package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.dto.DeactivateStreakRequest;
import com.cocochacha.chaeumbackend.dto.DeleteStreakRequest;
import com.cocochacha.chaeumbackend.dto.GetCategoryResponse;
import com.cocochacha.chaeumbackend.dto.GetStreakResponse;
import com.cocochacha.chaeumbackend.dto.ModifyStreakRequest;
import com.cocochacha.chaeumbackend.service.StreakService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import java.util.ArrayList;
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
     * 사용자의 스트릭을 생성한다. 사용자의 스트릭정보를 생성한다. 사용자의 태그를 생성한다.
     *
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 생성이 잘 되었는지 반환
     */
    @PostMapping("")
    public ResponseEntity<?> createStreak(@RequestBody CreateStreakRequest createStreakRequest) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (streakService.createStreak(createStreakRequest, userPersonalInfo)) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    /**
     * 사용자의 스트릭의 목록을 반환한다.
     *
     * @return 스트릭에 6주 활동에 대한 목록
     */
    @GetMapping("")
    public ResponseEntity<?> getStreak() {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        // userPersonalInfo에 대한 6주치 활동내역 리스트 가져오기
        List<List<GetStreakResponse>> streakResponseList = streakService.getStreak(userPersonalInfo);

        if (streakResponseList != null) {
            return new ResponseEntity<>(streakResponseList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
        }
    }

    /**
     * 사용자의 스트릭을 수정합니다. 사용자의 태그를 수정합니다. 스트릭 정보 테이블을 수정합니다.
     *
     * @param modifyStreakRequest
     * @return
     */
    @PatchMapping("/modification")
    public ResponseEntity<?> modifyStreak(@RequestBody ModifyStreakRequest modifyStreakRequest) {

        // 수정하는 유저와 스트릭의 관계가 유효한지 확인하기 위해 user 가져오기.
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (streakService.modifyStreak(modifyStreakRequest, userPersonalInfo)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
        }
    }

    /**
     * 사용자 스트릭의 deleted를 true로 바꿔서 삭제 처리한다.
     *
     * @param deleteStreakRequest
     * @return
     */
    @PatchMapping("/deletion")
    public ResponseEntity<?> deleteStreak(@RequestBody DeleteStreakRequest deleteStreakRequest) {

        // 삭제하는 유저와 스트릭의 관계가 유효한지 확인하기 위해 user 가져오기.
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (streakService.deleteStreak(deleteStreakRequest, userPersonalInfo)) {
            return new ResponseEntity<>("true", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("false", HttpStatus.NO_CONTENT);
        }
    }

    /**
     * 사용자 스트릭의 active 정보를 비활성화 합니다.
     *
     * @param deactivateStreakRequest
     * @return
     */
    @PatchMapping("/deactivation")
    public ResponseEntity<?> deactivateStreak(
            @RequestBody DeactivateStreakRequest deactivateStreakRequest) {

        // 비활성화하는 유저와 스트릭의 관계가 유효한지 확인하기 위해 user 가져오기.
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (streakService.deactivateStreak(deactivateStreakRequest, userPersonalInfo)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/category")
    public ResponseEntity<?> getMiddleCategory(){

        List<GetCategoryResponse> getStreakResponseList = streakService.getCategory();

        return new ResponseEntity<>(getStreakResponseList, HttpStatus.OK);
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
