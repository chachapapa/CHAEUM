package com.cocochacha.chaeumbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EndActivityRequest {
    private int activityId;
    private int streakId;
    private String endTime;
}