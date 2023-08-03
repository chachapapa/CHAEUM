package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.dto.AddActivityRequest;
import com.cocochacha.chaeumbackend.dto.EndActivityRequest;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ActivityService {

    @Autowired
    private final ActivityRepository activityRepository;
    public void createActivity(AddActivityRequest addActivityRequest) {
        // 여기서 올 수 있는 예외가 뭐가 있을지 생각해보기
        Activity activity = Activity.builder()
                .streakId(addActivityRequest.getStreakId())
                .build();

        activity.changeStartTime(addActivityRequest.getDate());
        activityRepository.save(activity);
    }

    public void endActivity(EndActivityRequest endActivityRequest) {
        int activityId = endActivityRequest.getActivityId();
        System.out.println(activityId);
    }
}

