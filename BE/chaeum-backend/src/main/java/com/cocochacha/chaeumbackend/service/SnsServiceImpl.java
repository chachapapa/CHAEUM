package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;
import com.cocochacha.chaeumbackend.repository.StreakRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SnsServiceImpl implements SnsService {

    @Autowired
    StreakRepository streakRepository;

    @Autowired
    ActivityRepository activityRepository;

    /**
     * User의 친구를 확인하고 액티브 중인 친구들 리스트를 반환한다.
     *
     * @param userPersonalInfo
     * @return List<GetActiveResponse> List<(친구 이름, 액티브 시작 시간, 스트릭 이름, 액티비티 id)>
     */
    @Override
    public List<GetActiveResponse> getActiveResponseList(UserPersonalInfo userPersonalInfo) {

        // 친구 리스트를 얻어내기
        // 수정해야해
        List<UserPersonalInfo> friendInfoList = null;

        // 반환할 리스트 선언
        List<GetActiveResponse> activeResponseList = new ArrayList<>();

        for (UserPersonalInfo friend : friendInfoList) {
            // 친구의 스트릭 목록을 가져오기
            List<Streak> streakList = streakRepository.findStreaksByUserPersonalInfoAndStreakDeletedIsFalse(
                    friend).orElse(null);

            // 친구의 스트릭이 없다면 다른 친구 확인하기
            if (streakList == null) {
                continue;
            }

            // 스트릭리스트를 확인
            for (Streak streak : streakList) {
                // 활동내역 중 가장 최근의 값을 가져온다.
                Activity activity = activityRepository.findTopByStreakIdOrderByActivityStartTimeDesc
                        (streak).orElse(null);

                // 활동 내역이 없다면 다음 스트릭을 탐색한다.
                if (activity == null) {
                    continue;
                }

                // 활동 내역이 있고 아직 endTime이 설정되지 않았다면
                // 활동 중이므로 list에 추가한다.
                if (activity.getActivityEndTime() == null) {
                    GetActiveResponse activeResponse = GetActiveResponse.builder()
                            .activityId(activity.getId())
                            .activeStartTime(activity.getActivityStartTime())
                            .friendName(friend.getNickname())
                            .streakName(streak.getStreakName())
                            .streakId(streak.getStreakId())
                            .activityId(activity.getId())
                            .build();
                    activeResponseList.add(activeResponse);
                    break;
                }
            }

        }

        return activeResponseList;
    }

}
