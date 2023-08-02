package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.User;
import com.cocochacha.chaeumbackend.dto.MyInfoResponse;
import com.cocochacha.chaeumbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserApiController {

    private final UserService userService;

    /**
     * 현재 인증된 사용자의 정보를 가져와서 MyInfoResponse 객체로 응답합니다.
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @return 현재 인증된 사용자의 정보를 담은 MyInfoResponse 객체를 ResponseEntity로 응답합니다.
     * @throws IllegalArgumentException 인자가 유효하지 않을 때 발생하는 예외
     */
    @GetMapping("/me")
    public ResponseEntity<MyInfoResponse> myInfoResponseEntity(HttpServletRequest request,
            HttpServletResponse response) throws IllegalArgumentException {

        // 현재 인증된 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById((Long) authentication.getPrincipal());

        // MyInfoResponse 객체에 사용자 정보를 담아 응답
        MyInfoResponse myInfoResponse = new MyInfoResponse(user.getId(), user.getEmail(),
                user.getNickname(),
                user.getProfileImageUrl(), user.getIsRegistered());

        return ResponseEntity.ok().body(myInfoResponse);
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
        if (userService.findByNickname(nickname) != null) {
            return ResponseEntity.ok().body(false);
        }

        return ResponseEntity.ok().body(true);
    }
}
