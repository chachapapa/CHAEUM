package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.MyPersonalInfoRequest;
import com.cocochacha.chaeumbackend.dto.MyPersonalInfoResponse;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserPersonalInfoApiController {

    private final UserPersonalInfoService userPersonalInfoService;

    /**
     * 현재 인증된 사용자의 정보를 가져와서 MyInfoResponse 객체로 응답합니다.
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @return 현재 인증된 사용자의 정보를 담은 MyInfoResponse 객체를 ResponseEntity로 응답합니다.
     * @throws IllegalArgumentException 인자가 유효하지 않을 때 발생하는 예외
     */
    @GetMapping("/me")
    public ResponseEntity<MyPersonalInfoResponse> myInfoResponseEntity(HttpServletRequest request,
            HttpServletResponse response) throws IllegalArgumentException {

        // 현재 인증된 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(
                ((org.springframework.security.core.userdetails.User) (authentication.getPrincipal())).getUsername());
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(userId);

        // MyInfoResponse 객체에 사용자 정보를 담아 응답
        MyPersonalInfoResponse myPersonalInfoResponse = new MyPersonalInfoResponse(userPersonalInfo.getId(), userPersonalInfo.getEmail(),
                userPersonalInfo.getNickname(),
                userPersonalInfo.getProfileImageUrl(), userPersonalInfo.getIsRegistered());

        return ResponseEntity.ok().body(myPersonalInfoResponse);
    }

    /**
     * 주어진 닉네임의 중복 여부를 체크하는 API 엔드포인트입니다.
     *
     * @param nickname 검사할 닉네임
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @return 닉네임이 중복되지 않을 때 true를, 중복될 때 false를 ResponseEntity로 응답합니다.
     */
    @GetMapping("duplication-check")
    public ResponseEntity<Boolean> nicknameDuplicationCheck(@RequestParam String nickname,
            HttpServletRequest request, HttpServletResponse response) {

        // 주어진 닉네임이 중복되지 않을 경우 true, 중복될 경우 false를 응답
        if (userPersonalInfoService.findByNickname(nickname) != null) {
            return ResponseEntity.ok().body(false);
        }

        return ResponseEntity.ok().body(true);
    }

    /**
     * 유저 정보를 초기 설정하는 API 엔드포인트입니다.
     *
     * @param myInfo MyInfoRequest 객체로 전달된 초기 설정 정보
     * @return 유저 정보 초기 설정이 성공하면 true를, 닉네임이 이미 사용 중일 경우 false를 ResponseEntity로 응답합니다.
     */
    @PostMapping("me")
    public ResponseEntity<Boolean> setMyInfo(@RequestBody MyPersonalInfoRequest myInfo) {
        // 전달받은 닉네임
        String newNickname = myInfo.getNickname();

        // 현재 인증된 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById((Long) authentication.getPrincipal());

        // 주어진 닉네임이 이미 사용 중일 경우 false를 응답
        if (userPersonalInfoService.findByNickname(newNickname) != null) {
            return ResponseEntity.ok().body(false);
        }

        // 닉네임과 초기 설정 여부를 업데이트하고, 데이터베이스에 저장
        userPersonalInfo.updateNickname(newNickname);
        userPersonalInfo.registData();

        return ResponseEntity.ok().body(true);
    }
}
