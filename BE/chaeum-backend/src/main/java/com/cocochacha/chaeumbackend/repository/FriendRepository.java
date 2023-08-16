package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.FriendCheck;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FriendRepository extends MongoRepository<FriendCheck, String> {

    /**
     * 두 사람이 친구인지 알려주는 메소드
     *
     * @param friendRelationship 친구 관계
     * @return 친구 관계의 여부를 담은 entity
     */
    Optional<FriendCheck> findByFriendRelationship(String friendRelationship);

    /**
     * 두 친구 관계를 끊어주는 메소드
     *
     * @param friendRelationship 친구 관계
     */
    void deleteByFriendRelationship(String friendRelationship);

}
