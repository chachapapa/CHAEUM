package com.cocochacha.chaeumbackend.config;

import com.cocochacha.chaeumbackend.config.jwt.TokenProvider;
import com.cocochacha.chaeumbackend.config.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.cocochacha.chaeumbackend.config.oauth.OAuth2SuccessHandler;
import com.cocochacha.chaeumbackend.config.oauth.OAuth2UserCustomService;
import com.cocochacha.chaeumbackend.repository.RefreshTokenRepository;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 웹 OAuth 보안 구성 클래스입니다.
 */
@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class WebOAuthSecurityConfig implements WebMvcConfigurer {

    private final OAuth2UserCustomService oAuth2UserCustomService;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserPersonalInfoService userPersonalInfoService;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("https://i9a810.p.ssafy.io", "http://localhost:3000",
                        "http://localhost:8080", "http://i9a810.p.ssafy.io:80",
                        "http://i9a810.p.ssafy.io:8080", "https://accounts.kakao.com/login"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // 스프링 시큐리티 기능 비활성화
    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
                .requestMatchers("/img/**", "/css/**", "/js/**");
    }

    /**
     * 보안 필터 체인을 설정하는 메서드입니다.
     *
     * @param http HttpSecurity 객체
     * @return SecurityFilterChain 객체
     * @throws Exception 예외 처리
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 토큰 방식으로 인증을 하기 때문에 폼로그인, 세션 비활성화
        http.csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .logout().disable();

        http.cors()
                .configurationSource(corsConfigurationSource());

        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // 헤더를 확인할 커스텀 필터 추가
        http.addFilterBefore(tokenAuthenticationFilter(),
                UsernamePasswordAuthenticationFilter.class);

        // 토큰 재발급 API URL은 인증 없이 접근 가능하도록 설정. 나머지 API URL은 인증 필요
        http.authorizeHttpRequests()
                .requestMatchers("/api/token").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll();

        http.oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                // Authorization 요청과 관련된 상태 저장
                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                // 인증 성공 시 실행할 핸들러
                .successHandler(oAuth2SuccessHandler())
                .userInfoEndpoint()
                .userService(oAuth2UserCustomService);

        http.logout()
                .logoutSuccessUrl("/login");

        // /api로 시작하는 url인 경우 401 상태 코드를 반환하도록 예외 처리
        http.exceptionHandling()
                .defaultAuthenticationEntryPointFor(
                        new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                        new AntPathRequestMatcher("/api/**"));

        return http.build();
    }

    /**
     * OAuth 2.0 인증 성공 핸들러를 생성하는 빈 객체를 반환합니다.
     *
     * @return OAuth2SuccessHandler 객체
     */
    @Bean
    public OAuth2SuccessHandler oAuth2SuccessHandler() {
        return new OAuth2SuccessHandler(tokenProvider,
                refreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository(),
                userPersonalInfoService
        );
    }

    /**
     * 토큰 인증 필터를 생성하는 빈 객체를 반환합니다.
     *
     * @return TokenAuthenticationFilter 객체
     */
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(tokenProvider);
    }

    /**
     * OAuth 2.0 인증 요청을 쿠키를 기반으로 저장하는 빈 객체를 반환합니다.
     *
     * @return OAuth2AuthorizationRequestBasedOnCookieRepository 객체
     */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /**
     * BCryptPasswordEncoder 객체를 반환합니다.
     *
     * @return BCryptPasswordEncoder 객체
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
