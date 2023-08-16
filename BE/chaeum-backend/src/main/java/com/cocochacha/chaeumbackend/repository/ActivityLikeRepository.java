package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.ActivityLike;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivityLikeRepository extends JpaRepository<ActivityLike, Integer> {

    /**
     * 유저가 활동 내역에 대한 좋아요 여부를 알려주는 메소드
     *
     * @param activityId activityId
     * @param userId userId
     * @return 해당 유저가 해당 활동에 좋아요 여부
     */
    Optional<ActivityLike> findByActivityIdAndUserId(Activity activityId, UserPersonalInfo userId);
}
