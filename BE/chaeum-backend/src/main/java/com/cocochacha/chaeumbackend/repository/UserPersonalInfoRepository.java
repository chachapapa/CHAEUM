package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPersonalInfoRepository extends JpaRepository<UserPersonalInfo, Long> {

    /**
     * 주어진 이메일로 사용자를 검색합니다.
     *
     * @param email 검색하고자 하는 사용자의 이메일
     * @return 검색된 사용자 객체(Optional)
     */
    Optional<UserPersonalInfo> findByEmail(String email);

    /**
     * 해당하는 닉네임을 가지는 유저들을 검색합니다.
     *
     * @param nickname 검색하고자 하는 사용자의 닉네임
     * @return 검색된 사용자 객체들의 컬렉션 (List)
     */
    List<UserPersonalInfo> findAllByNickname(String nickname);

    Optional<UserPersonalInfo> findByNicknameAndIsRegistered(String nickname, Boolean isRegistered);
}
