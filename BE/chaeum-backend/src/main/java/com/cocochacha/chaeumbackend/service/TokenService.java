package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.config.jwt.TokenProvider;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TokenService {

    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserPersonalInfoService userPersonalInfoService;

    /**
     * 주어진 리프레시 토큰으로 새로운 액세스 토큰을 생성합니다.
     *
     * @param refreshToken 새로운 액세스 토큰을 생성하는데 사용될 리프레시 토큰
     * @return 생성된 새로운 액세스 토큰
     * @throws IllegalArgumentException 주어진 리프레시 토큰이 유효하지 않거나 관련된 사용자 정보가 없는 경우 예외 발생
     */
    public String createNewAccessToken(String refreshToken) {
        // 토큰 유효성 검사에 실패하면 예외 발생
        if (!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(userId);

        return tokenProvider.generateToken(userPersonalInfo, Duration.ofHours(2));
    }
}

