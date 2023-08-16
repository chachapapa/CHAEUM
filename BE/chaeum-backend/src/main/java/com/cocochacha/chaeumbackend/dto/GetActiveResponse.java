package com.cocochacha.chaeumbackend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetActiveResponse {

    private String friendName;
    private String activeStartTime;
    private String streakName;
    private int streakId;
    private int activityId;
    private String profileUrl;
    private String streakColor;
    private List<String> tagList;
}
