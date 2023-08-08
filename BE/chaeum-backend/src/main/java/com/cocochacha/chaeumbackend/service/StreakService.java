package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.dto.DeactivateStreakRequest;
import com.cocochacha.chaeumbackend.dto.DeleteStreakRequest;
import com.cocochacha.chaeumbackend.dto.GetStreakResponse;
import com.cocochacha.chaeumbackend.dto.ModifyStreakRequest;
import java.util.List;

public interface StreakService {

    /**
     * CreateStreakRequest 를 사용해 스트릭 생성하는 함수
     *
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 스트릭이 정상 생성 되었다면 true, 아니라면 false
     */
    boolean createStreak(CreateStreakRequest createStreakRequest,
            UserPersonalInfo userPersonalInfo);

    /**
     * ModifyStreakRequest 를 사용해 스트릭 수정하는 함수
     *
     * @param modifyStreakRequest (스트릭_id, 스트릭_name, 스트릭_color, 스트릭_태그_리스트)
     * @param userPersonalInfo
     * @return 스트릭이 정상 수정 되었다면 true, 아니라면 false
     */
    boolean modifyStreak(ModifyStreakRequest modifyStreakRequest,
            UserPersonalInfo userPersonalInfo);

    /**
     * DeleteStreakRequest 를 사용해 스트릭을 삭제 처리하는 함수
     *
     * @param deleteStreakRequest (스트릭_id)
     * @param userPersonalInfo
     * @return 스트릭이 삭제 되었다면 true, 아니라면 false
     */
    boolean deleteStreak(DeleteStreakRequest deleteStreakRequest,
            UserPersonalInfo userPersonalInfo);

    /**
     * 스트릭을 비활성화 하는 함수
     *
     * @param deactivateStreakRequest 스트릭_id
     * @param userPersonalInfo
     * @return 스트릭 비활성화가 되었다면 true, 아니라면 false
     */
    boolean deactivateStreak(DeactivateStreakRequest deactivateStreakRequest,
            UserPersonalInfo userPersonalInfo);

    /**
     * 42일간의 스트릭 목록을 반환 하는 함수
     *
     * @param userPersonalInfo
     * @return getStreakResponse (스트릭_id, 스트릭_이름, 스트릭_컬러, 스트릭_active, 스트릭_deleted, 카테고리,
     * list<list<String>> )
     */
    List<GetStreakResponse> getStreak(UserPersonalInfo userPersonalInfo);
}
