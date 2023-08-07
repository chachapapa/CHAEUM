package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.dto.AddActivityRequest;
import com.cocochacha.chaeumbackend.dto.AddActivityResponse;
import com.cocochacha.chaeumbackend.dto.EndActivityRequest;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;

import java.util.List;
import java.util.NoSuchElementException;

import com.cocochacha.chaeumbackend.repository.StreakRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ActivityService {

    @Autowired
    private final ActivityRepository activityRepository;
    @Autowired
    private final StreakRepository streakRepository;

    /**
     * 활동을 시작하면 필요한 정보를 가공해서 Controller에 넘겨주는 메소드
     * 필요한 정보는, DB에 들어가는 값과 최근 14일 간 누적 시간
     *
     * @param addActivityRequest 스트릭 ID와 시작 시간
     * @return 스트릭 ID와 시작 시간, 누적 시간
     */
    public AddActivityResponse createActivity(AddActivityRequest addActivityRequest) {
        if ((Integer) addActivityRequest.getStreakId() == null) {
            throw new NoSuchElementException("값 없음");
        }

        // streakId 가져오기
        Streak streakId = streakRepository.findById(addActivityRequest.getStreakId()).orElse(null);
        if (streakId == null) {
            // 해당 streakID는 streak Table에 없는 값!
            throw new NullPointerException("없는 값!");
        }

        Activity activity = Activity.builder()
                .streakId(streakId)
                .build();

        activity.changeStartTime(addActivityRequest.getDate());

        activityRepository.save(activity);

        // 누적 시간 구하기
        List<List<String>> accumulate = activityRepository.accumulateQuery(
                addActivityRequest.getStreakId()).orElse(null);

        AddActivityResponse addActivityResponse = AddActivityResponse.builder()
                .activityId(activity.getId())
                .streakId(addActivityRequest.getStreakId())
                .date(addActivityRequest.getDate())
                .accumulate(accumulate)
                .build();

        return addActivityResponse;
    }

    /**
     * 활동 종료 후, 값을 DB에 저장하는 메소드
     *
     * @param endActivityRequest 입력으로 받는 값
     * @return DB에 저장이 되는 값
     */
    public EndActivityRequest endActivity(EndActivityRequest endActivityRequest) {
        int activityId = endActivityRequest.getActivityId();

        Activity activity = activityRepository.findById(activityId).orElse(null);

        if (activity == null) {
            // 예외 던지기
            throw new NoSuchElementException("null 값");
        } else if (activity.getActivityEndTime() != null) {
            // 이미 값이 있는 경우 => 예외의 경우 새로운 것을 만들어서 넘길지 의논해보기
            throw new NullPointerException("이미 있는 값");
        } else {
            // null 값이 아닌 경우 종료에 해당하는 값 넣어주기
            Streak streakId = streakRepository.findById(endActivityRequest.getStreakId()).orElse(null);

            if (streakId == null) {
                // 해당 streakID는 streak Table에 없는 값!
                throw new NullPointerException("없는 값!");
            }

            activity.changeStreakId(streakId);

            // 값 저장해주기 => DB에 반영
            activityRepository.updateEnd(endActivityRequest.getEndTime(),
                    activity.getActivityStartTime(),
                    endActivityRequest.getStreakId(), activityId);

            // DTO에 값을 담아서 return 해주기
            return endActivityRequest;
        }
    }
}

