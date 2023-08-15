package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateReplyRequest {

    private int activityId;
    private String comment;
    private String createTime;
}
