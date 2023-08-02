package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.User;
import com.cocochacha.chaeumbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    /**
     * 주어진 사용자 ID에 해당하는 사용자를 검색합니다.
     *
     * @param userId 검색하고자 하는 사용자의 ID(Long 타입)
     * @return 검색된 사용자 객체(User)
     * @throws IllegalArgumentException 주어진 사용자 ID에 해당하는 사용자가 없는 경우 예외 발생
     */
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    /**
     * 주어진 이메일에 해당하는 사용자를 검색합니다.
     *
     * @param email 검색하고자 하는 사용자의 이메일 주소
     * @return 검색된 사용자 객체(User)
     * @throws IllegalArgumentException 주어진 이메일에 해당하는 사용자가 없는 경우 예외 발생
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    /**
     * 주어진 닉네임에 해당하는 사용자를 검색합니다.
     *
     * @param nickname 검색하고자 하는 사용자의 닉네임
     * @return 검색된 사용자 객체
     * @throws IllegalArgumentException 주어진 사용자 ID에 해당하는 사용자가 없는 경우 예외 발생
     */
    public User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElse(null);
    }
}
