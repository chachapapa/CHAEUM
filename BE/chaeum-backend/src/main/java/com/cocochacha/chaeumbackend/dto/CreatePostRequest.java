package com.cocochacha.chaeumbackend.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreatePostRequest {

    private int activityId;
    private String content;
    private String createTime;
}
