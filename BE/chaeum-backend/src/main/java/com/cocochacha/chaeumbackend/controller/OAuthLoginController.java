package com.cocochacha.chaeumbackend.controller;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@RestController
@RequestMapping("/oauth")
public class OAuthLoginController {

    /**
     * 카카오 OAuth2 로그인을 위한 인증 요청을 생성하고, 클라이언트를 해당 인증 요청 페이지로 리다이렉트합니다.
     *
     * @param response HttpServletResponse 객체
     * @throws IOException 입출력 예외
     */
    @GetMapping("/login/kakao")
    public void oauth2Login(HttpServletResponse response) throws IOException {
        // 인증 요청을 위한 URI 구성
        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("i9a810.p.ssafy.io")
                .port(8080)
                .path("/oauth2/authorize/kakao")
                .build();

        // 클라이언트를 인증 요청 페이지로 리다이렉트
        response.sendRedirect(uriComponents.toUriString());
    }
}
