package com.cocochacha.chaeumbackend.config.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * JWT 관련 프로퍼티를 담고 있는 클래스입니다.
 */
@Setter
@Getter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {

    /**
     * JWT 토큰 발급자(issuer)를 나타내는 문자열입니다.
     * 토큰이 발행된 서버의 정보를 식별하는 데 사용됩니다.
     */
    private String issuer;

    /**
     * JWT 토큰의 비밀 키(secret key)를 나타내는 문자열입니다.
     * 이 비밀 키를 사용하여 토큰을 생성하고 검증합니다.
     * 보안 상의 이유로 이 값은 외부에 노출되면 안 됩니다.
     */
    private String secretKey;
}
