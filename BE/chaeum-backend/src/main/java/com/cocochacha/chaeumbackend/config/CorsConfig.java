package com.cocochacha.chaeumbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS 설정을 관리하는 클래스입니다.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * CORS 설정을 추가합니다.
     *
     * @param registry CORS 설정 레지스트리
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://i9a810.p.ssafy.io:80/", "http://localhost:3000/",
                        "http://localhost:8080");
    }
}
