package com.cocochacha.chaeumbackend.config.jwt;

import com.cocochacha.chaeumbackend.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

/**
 * JWT 토큰 생성 및 검증을 담당하는 서비스 클래스입니다.
 */
@RequiredArgsConstructor
@Service
public class TokenProvider {

    private final JwtProperties jwtProperties;

    /**
     * 사용자 정보와 만료 기간을 바탕으로 JWT 토큰을 생성합니다.
     *
     * @param user      사용자 객체
     * @param expiredAt 토큰의 만료 기간 (Duration 타입)
     * @return 생성된 JWT 토큰 문자열
     */
    public String generateToken(User user, Duration expiredAt) {
        Date now = new Date();
        return makeToken(new Date(now.getTime() + expiredAt.toMillis()), user);
    }

    /**
     * JWT 토큰을 생성합니다.
     *
     * @param expiry 토큰의 만료 시각
     * @param user   사용자 객체
     * @return 생성된 JWT 토큰 문자열
     */
    private String makeToken(Date expiry, User user) {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();
    }

    /**
     * 주어진 JWT 토큰의 유효성을 검사합니다.
     *
     * @param token 검증할 JWT 토큰 문자열
     * @return 토큰의 유효성 여부 (유효한 경우 true, 그렇지 않은 경우 false)
     */
    public boolean validToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtProperties.getSecretKey())
                    .parseClaimsJws(token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 주어진 JWT 토큰으로부터 인증(Authentication) 객체를 생성합니다.
     *
     * @param token JWT 토큰 문자열
     * @return 생성된 Authentication 객체
     */
    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(
                new SimpleGrantedAuthority("ROLE_USER"));

        return new UsernamePasswordAuthenticationToken(
                new org.springframework.security.core.userdetails.User(claims.getSubject
                        (), "", authorities), token, authorities);
    }

    /**
     * JWT 토큰으로부터 사용자 ID를 추출합니다.
     *
     * @param token JWT 토큰 문자열
     * @return 추출된 사용자 ID (Long 타입)
     */
    public Long getUserId(String token) {
        Claims claims = getClaims(token);
        return claims.get("id", Long.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
    }
}
