package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.dto.AddActivityRequest;
import com.cocochacha.chaeumbackend.dto.EndActivityRequest;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;

import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ActivityService {

    @Autowired
    private final ActivityRepository activityRepository;
    public void createActivity(AddActivityRequest addActivityRequest) {
        Activity activity = Activity.builder()
                .streakId(addActivityRequest.getStreakId())
                .build();

        activity.changeStartTime(addActivityRequest.getDate());
        activityRepository.save(activity);
    }

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
            activity.changeStreakId(endActivityRequest.getStreakId());

            // 값 저장해주기 => DB에 반영
            activityRepository.updateEnd(endActivityRequest.getEndTime(),
                    activity.getActivityStartTime(),
                    endActivityRequest.getStreakId(), activityId);

            // DTO에 값을 담아서 return 해주기
            return endActivityRequest;
        }
    }
}

