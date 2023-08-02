package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.dto.CreateAccessTokenRequest;
import com.cocochacha.chaeumbackend.dto.CreateAccessTokenResponse;
import com.cocochacha.chaeumbackend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/token")
public class TokenApiController {

    private final TokenService tokenService;

    /**
     * 새로운 액세스 토큰을 생성하는 API 엔드포인트입니다.
     *
     * @param request 요청 바디에 포함된 리프레시 토큰 정보를 담은 CreateAccessTokenRequest 객체
     * @return 생성된 새로운 액세스 토큰을 담은 ResponseEntity
     */
    @PostMapping("/")
    public ResponseEntity<CreateAccessTokenResponse> createNewAccessToken(
            @RequestBody CreateAccessTokenRequest request) {
        // 주어진 리프레시 토큰을 사용하여 새로운 액세스 토큰을 생성
        String newAccessToken = tokenService.createNewAccessToken(request.getRefreshToken());

        // 생성된 액세스 토큰을 포함한 ResponseEntity를 반환
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateAccessTokenResponse(newAccessToken));
    }
}
