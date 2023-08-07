package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.dto.ModifyStreakRequest;

public interface StreakService {

    /**
     * CreateStreakRequest 를 사용해 스트릭 생성하는 함수
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 스트릭이 정상 생성 되었다면 true, 아니라면 false
     */
    boolean createStreak(CreateStreakRequest createStreakRequest, UserPersonalInfo userPersonalInfo);

    /**
     * ModifyStreakRequest 를 사용해 스트릭 수정하는 함수
     * @param modifyStreakRequest 스트릭_id, 스트릭_name, 스트릭_color, 스트릭_태그_리스트
     * @return 스트릭이 정상 수정 되었다면 true, 아니라면 false
     */
    boolean modifyStreak(ModifyStreakRequest modifyStreakRequest);

}
