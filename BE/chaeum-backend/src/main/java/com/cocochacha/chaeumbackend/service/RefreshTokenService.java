package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.RefreshToken;
import com.cocochacha.chaeumbackend.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * 주어진 리프레시 토큰으로 데이터베이스에서 해당 RefreshToken을 검색합니다
     *
     * @param refreshToken 검색하고자 하는 리프레시 토큰
     * @return 검색된 RefreshToken 객체
     * @throws IllegalArgumentException 주어진 리프레시 토큰으로 검색된 RefreshToken이 없는 경우 예외 발생
     */
    public RefreshToken findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }
}

