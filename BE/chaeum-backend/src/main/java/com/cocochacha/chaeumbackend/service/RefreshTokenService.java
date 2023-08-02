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
     * �־��� �������� ��ū���� �����ͺ��̽����� �ش� RefreshToken�� �˻��մϴ�
     *
     * @param refreshToken �˻��ϰ��� �ϴ� �������� ��ū
     * @return �˻��� RefreshToken ��ü
     * @throws IllegalArgumentException �־��� �������� ��ū���� �˻��� RefreshToken�� ���� ��� ���� �߻�
     */
    public RefreshToken findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }
}

