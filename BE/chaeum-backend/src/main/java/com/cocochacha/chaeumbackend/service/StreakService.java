package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;

public interface StreakService {

    /**
     * StreakCreateDto를 사용해 스트릭 생성하는 함수
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 스트릭이 정상 생성 되었다면 true, 아니라면 false
     */
    boolean createStreak(CreateStreakRequest createStreakRequest);

}
