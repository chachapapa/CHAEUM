package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.dto.MyPersonalInfoRequest;
import com.cocochacha.chaeumbackend.dto.MyPersonalInfoResponse;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 사용자 개인 정보를 다루는 API 컨트롤러입니다.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserPersonalInfoApiController {

    private final UserPersonalInfoService userPersonalInfoService;

    /**
     * 현재 인증된 사용자의 정보를 가져와서 MyInfoResponse 객체로 응답합니다.
     *
     * @return 현재 인증된 사용자의 정보를 담은 MyInfoResponse 객체를 ResponseEntity로 응답합니다.
     * @throws IllegalArgumentException 인자가 유효하지 않을 때 발생하는 예외
     */
    @GetMapping("/me")
    public ResponseEntity<MyPersonalInfoResponse> myInfoResponseEntity() {
        Long userId = getUserIDFromAuthentication();
        MyPersonalInfoResponse myPersonalInfoResponse = userPersonalInfoService.getMyPersonalInfo(
                userId);
        return ResponseEntity.ok(myPersonalInfoResponse);
    }

    /**
     * 주어진 닉네임의 중복 여부를 체크하는 API 엔드포인트입니다.
     *
     * @param nickname 검사할 닉네임
     * @return 닉네임이 중복되지 않을 때 true를, 중복될 때 false를 ResponseEntity로 응답합니다.
     */
    @GetMapping("/duplication-check")
    public ResponseEntity<Boolean> nicknameDuplicationCheck(@RequestParam String nickname) {
        Long userId = getUserIDFromAuthentication();
        boolean isNicknameAvailable = userPersonalInfoService.isNicknameAvailable(userId, nickname);
        return ResponseEntity.ok(isNicknameAvailable);
    }

    /**
     * 유저 정보를 초기 설정하는 API 엔드포인트입니다.
     *
     * @param myInfo MyPersonalInfoRequest 객체로 전달된 초기 설정 정보
     * @return 유저 정보 초기 설정이 성공하면 true를, 닉네임이 이미 사용 중일 경우 false를 ResponseEntity로 응답합니다.
     */
    @PostMapping("/me")
    public ResponseEntity<Boolean> setMyInfo(@RequestBody MyPersonalInfoRequest myInfo) {
        Long userId = getUserIDFromAuthentication();
        String newNickname = myInfo.getNickname();
        boolean isNicknameAvailable = userPersonalInfoService.isNicknameAvailable(userId,
                newNickname);

        if (!isNicknameAvailable) {
            return ResponseEntity.ok(false);
        }

        userPersonalInfoService.updateUserPersonalInfo(userId, newNickname);
        return ResponseEntity.ok(true);
    }

    private Long getUserIDFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }
}
