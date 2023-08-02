package com.cocochacha.chaeumbackend.config.oauth;

import com.cocochacha.chaeumbackend.domain.User;
import com.cocochacha.chaeumbackend.repository.UserRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

/**
 * OAuth2UserCustomService 클래스는 OAuth2 사용자 정보를 처리하기 위한 Spring Security의 DefaultOAuth2UserService의
 * 커스텀 구현체입니다.
 */
@RequiredArgsConstructor
@Service
public class OAuth2UserCustomService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    /**
     * OAuth2UserRequest를 기반으로 사용자 정보를 가져옵니다. 가져온 정보를 데이터베이스에 저장 또는 업데이트합니다.
     *
     * @param userRequest 사용자 정보를 요청하는 OAuth2UserRequest 객체
     * @return 사용자 정보를 담고 있는 OAuth2User 객체
     * @throws OAuth2AuthenticationException 인증에 관련된 오류가 발생한 경우 예외를 던집니다.
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 요청을 바탕으로 유저 정보를 담은 객체 반환
        OAuth2User user = super.loadUser(userRequest);
        saveOrUpdate(user);

        return user;
    }

    /**
     * OAuth2User 정보를 기반으로 데이터베이스에 사용자 정보를 저장하거나 업데이트합니다.
     *
     * @param oAuth2User 사용자 정보를 담고 있는 OAuth2User 객체
     * @return 데이터베이스에 저장 또는 업데이트된 User 객체를 반환합니다.
     */
    private User saveOrUpdate(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        Long id = (Long) attributes.get("id");
        String email = (String) kakaoAccount.get("email");
        String name = (String) profile.get("nickname");
        String profileImageUrl = (String) profile.get("profile_image_url");

        User user = userRepository.findByEmail(email)
                .orElse(User.builder()
                        .id(id)
                        .email(email)
                        .nickname(name)
                        .profileImageUrl(profileImageUrl)
                        .isRegistered(false)
                        .build());

        return userRepository.save(user);
    }
}
