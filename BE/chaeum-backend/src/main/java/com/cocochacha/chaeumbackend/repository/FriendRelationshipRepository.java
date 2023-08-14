package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.FriendRelationship;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface FriendRelationshipRepository extends JpaRepository<FriendRelationship, Integer> {

    /**
     * 본인과 친구인 사람의 목록을 추출해주는 메소드
     *
     * @param id 본인의 아이디
     * @return 본인과 친구인 사람들 목록
     */
    Optional<List<FriendRelationship>> findByToIdAndIsFriendIsTrue(UserPersonalInfo id);

    /**
     * 두 사람의 친구 관계를 추출해주는 메소드
     *
     * @param toId 신청한 사람의 아이디
     * @param fromId 신청을 받은 사람의 아이디
     * @return 둘의 친구 관계
     */
    Optional<FriendRelationship> findByToIdAndFromId(UserPersonalInfo toId, UserPersonalInfo fromId);
}
