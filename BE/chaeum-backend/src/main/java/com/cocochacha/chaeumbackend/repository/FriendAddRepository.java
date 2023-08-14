package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.FriendAdd;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendAddRepository extends JpaRepository<FriendAdd, Integer> {

    /**
     * 현재 두 사람이 친구 신청을 진행하고 있는지 찾아주는 메소드
     *
     * @param userPersonalInfoTo 친구를 건 사람의 유저 정보
     * @param userPersonalInfoFrom 친구 신청을 받은 사람의 유저 정보
     * @return 친구 중 여부를 담은 entity
     */
    Optional<FriendAdd> findByToIdAndFromId(UserPersonalInfo userPersonalInfoTo, UserPersonalInfo userPersonalInfoFrom);

    /**
     * 친구 신청을 누구한테 받았는지 알려주는 메소드
     *
     * @param userPersonalInfoInfoFrom 친구 신청을 받은 사람의 유저 정보
     * @return 친구 중 여부를 담은 entity의 목록
     */
    Optional<List<FriendAdd>> findAllByFromId(UserPersonalInfo userPersonalInfoInfoFrom);
}
