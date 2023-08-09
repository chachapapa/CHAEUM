package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import java.util.List;

public interface SnsService {

    /**
     * User의 친구를 확인하고 액티브 중인 친구들 리스트를 반환한다.
     *
     * @param userPersonalInfo
     * @return List<GetActiveResponse> List<(친구 이름, 액티브 시작 시간, 스트릭 이름, 액티비티 id)>
     */
    List<GetActiveResponse> getActiveResponseList(UserPersonalInfo userPersonalInfo);

}
