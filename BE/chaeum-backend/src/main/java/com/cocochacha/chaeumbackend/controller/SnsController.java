package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import com.cocochacha.chaeumbackend.service.SnsService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sns")
public class SnsController {

    @Autowired
    UserPersonalInfoService userPersonalInfoService;

    @Autowired
    SnsService snsService;

    /**
     * 친구이면서 액티브 중인 사람의 리스트를 반환해준다.
     *
     * @return List<GetActiveResponse> List<(친구 이름, 액티브 시작 시간, 스트릭 이름, 액티비티 id)>
     */
    @GetMapping("/active")
    public ResponseEntity<?> getActiveList() {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        List<GetActiveResponse> getActiveResponseList = snsService.getActiveResponseList(
                userPersonalInfo);
        return new ResponseEntity<>(getActiveResponseList, HttpStatus.OK);
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
