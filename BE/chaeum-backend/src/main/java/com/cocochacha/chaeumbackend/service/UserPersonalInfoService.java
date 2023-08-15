package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.MyPersonalInfoResponse;
import com.cocochacha.chaeumbackend.repository.UserPersonalInfoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 사용자 개인 정보를 처리하는 서비스 클래스입니다.
 */
@RequiredArgsConstructor
@Service
public class UserPersonalInfoService {

    private final UserPersonalInfoRepository userPersonalInfoRepository;

    /**
     * 주어진 사용자 ID에 해당하는 사용자의 개인 정보를 가져옵니다.
     *
     * @param userId 사용자 ID
     * @return 사용자의 개인 정보를 담은 MyPersonalInfoResponse 객체
     */
    public MyPersonalInfoResponse getMyPersonalInfo(Long userId) {
        UserPersonalInfo userPersonalInfo = findById(userId);
        return new MyPersonalInfoResponse(
                userPersonalInfo.getEmail(),
                userPersonalInfo.getNickname(),
                userPersonalInfo.getProfileImageUrl(),
                userPersonalInfo.getIsRegistered()
        );
    }

    /**
     * 주어진 사용자 ID에 해당하는 사용자를 검색합니다.
     *
     * @param userId 검색하고자 하는 사용자의 ID(Long 타입)
     * @return 검색된 사용자 객체(UserPersonalInfo)
     * @throws IllegalArgumentException 주어진 사용자 ID에 해당하는 사용자가 없는 경우 예외 발생
     */
    public UserPersonalInfo findById(Long userId) {
        return userPersonalInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found."));
    }

    /**
     * 주어진 이메일에 해당하는 사용자를 검색합니다.
     *
     * @param email 검색하고자 하는 사용자의 이메일 주소
     * @return 검색된 사용자 객체(UserPersonalInfo)
     * @throws IllegalArgumentException 주어진 이메일에 해당하는 사용자가 없는 경우 예외 발생
     */
    public UserPersonalInfo findByEmail(String email) {
        return userPersonalInfoRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    /**
     * 주어진 닉네임의 사용 가능 여부를 체크합니다.
     *
     * @param userId   사용자 ID
     * @param nickname 검사할 닉네임
     * @return 닉네임이 중복되지 않거나 해당 사용자의 닉네임인 경우 true, 중복된 경우 false
     */
    public boolean isNicknameAvailable(Long userId, String nickname) {
        List<UserPersonalInfo> usersWithNickname = findAllByNickname(nickname);
        return usersWithNickname.isEmpty() || (usersWithNickname.size() == 1 && usersWithNickname.get(0).getId().equals(userId));
    }

    /**
     * 주어진 닉네임에 해당하는 사용자들을 검색합니다.
     *
     * @param nickname 검색하고자 하는 사용자의 닉네임
     * @return 검색된 사용자 객체들의 컬렉션 (List)
     */
    public List<UserPersonalInfo> findAllByNickname(String nickname) {
        return userPersonalInfoRepository.findAllByNickname(nickname);
    }

    /**
     * 사용자 개인 정보를 업데이트합니다.
     *
     * @param userId      사용자 ID
     * @param newNickname 새로운 닉네임
     */
    @Transactional
    public void updateUserPersonalInfo(Long userId, String newNickname) {
        UserPersonalInfo userPersonalInfo = findById(userId);
        userPersonalInfo.updateNickname(newNickname);
        userPersonalInfo.registData();
    }

    /**
     * 사용자 개인 정보를 저장합니다.
     *
     * @param userPersonalInfo 사용자 개인 정보 객체
     */
    @Transactional
    public void save(UserPersonalInfo userPersonalInfo) {
        userPersonalInfoRepository.save(userPersonalInfo);
    }

    public UserPersonalInfo findRegisteredUsersByNickname(String nickname) {
        return userPersonalInfoRepository.findByNicknameAndIsRegistered(nickname, true).orElse(null);
    }
}
