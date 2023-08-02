package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.RefreshToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * RefreshToken 엔티티에 접근하는데 사용되는 JpaRepository입니다.
 */
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    /**
     * 특정 사용자의 RefreshToken을 조회합니다.
     *
     * @param userId 사용자의 ID
     * @return 조회된 RefreshToken 객체를 Optional로 감싼 결과
     */
    Optional<RefreshToken> findByUserId(Long userId);

    /**
     * 특정 RefreshToken 값을 가지는 RefreshToken을 조회합니다.
     *
     * @param refreshToken 조회할 Refresh Token 값
     * @return 조회된 RefreshToken 객체를 Optional로 감싼 결과
     */
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
