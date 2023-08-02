package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 사용자의 Refresh Token을 저장하는 엔티티 클래스입니다.
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    /**
     * RefreshToken 객체를 생성하는 생성자입니다.
     *
     * @param userId       사용자의 ID
     * @param refreshToken 새로 생성된 Refresh Token
     */
    public RefreshToken(Long userId, String refreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }

    /**
     * RefreshToken을 갱신하는 메소드입니다.
     *
     * @param newRefreshToken 새로 갱신된 Refresh Token
     * @return 업데이트된 RefreshToken 객체
     */
    public RefreshToken update(String newRefreshToken) {
        this.refreshToken = newRefreshToken;

        return this;
    }
}
