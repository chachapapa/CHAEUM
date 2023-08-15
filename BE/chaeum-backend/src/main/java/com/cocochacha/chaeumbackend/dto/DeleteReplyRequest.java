package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DeleteReplyRequest {

    private int activityId;
    private Long replyId;
}
