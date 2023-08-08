package com.cocochacha.chaeumbackend.config.oauth;

import com.cocochacha.chaeumbackend.config.jwt.TokenProvider;
import com.cocochacha.chaeumbackend.domain.RefreshToken;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.repository.RefreshTokenRepository;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import com.cocochacha.chaeumbackend.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    /**
     * 새로 생성된 리프레시 토큰을 저장할 쿠키의 이름입니다.
     */
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

    /**
     * 리프레시 토큰의 유효 기간입니다.
     */
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);

    /**
     * 엑세스 토큰의 유효 기간입니다.
     */
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
    private final UserPersonalInfoService userPersonalInfoService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findByEmail((String) kakaoAccount.get("email"));

        // 리프레시 토큰 생성 -> 저장 -> 쿠키에 저장
        String refreshToken = tokenProvider.generateToken(userPersonalInfo, REFRESH_TOKEN_DURATION);
        saveRefreshToken(userPersonalInfo.getId(), refreshToken);
        addRefreshTokenToCookie(request, response, refreshToken);
        // 엑세스 토큰 생성 -> 패스에 엑세스 토큰을 추가
        String accessToken = tokenProvider.generateToken(userPersonalInfo, ACCESS_TOKEN_DURATION);
        String targetUrl = getTargetUrl(accessToken);
        // 인증 관련 설정값, 쿠키 제거
        clearAuthenticationAttributes(request, response);
        // 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    /**
     * 생성된 리프레시 토큰을 전달받아 데이터베이스에 저장합니다.
     *
     * @param userId          사용자 ID(Long 타입)
     * @param newRefreshToken 생성된 리프레시 토큰
     */
    private void saveRefreshToken(Long userId, String newRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId)
                .map(entity -> entity.update(newRefreshToken))
                .orElse(new RefreshToken(userId, newRefreshToken));

        refreshTokenRepository.save(refreshToken);
    }

    /**
     * 생성된 리프레시 토큰을 쿠키에 저장합니다.
     *
     * @param request      HttpServletRequest 객체
     * @param response     HttpServletResponse 객체
     * @param refreshToken 생성된 리프레시 토큰
     */
    private void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response,
            String refreshToken) {
        int cookieMaxAge = (int) REFRESH_TOKEN_DURATION.toSeconds();

        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
        CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
    }

    /**
     * 인증 관련 설정값과 쿠키를 제거합니다.
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     */
    private void clearAuthenticationAttributes(HttpServletRequest request,
            HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    /**
     * 엑세스 토큰을 패스에 추가한 URL을 반환합니다.
     *
     * @param token 엑세스 토큰
     * @return 엑세스 토큰이 추가된 URL 문자열
     */
    private String getTargetUrl(String token) {
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .path("/signup")
                .queryParam("token", token)
                .build()
                .toUriString();
    }
}
