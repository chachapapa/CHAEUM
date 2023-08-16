package com.cocochacha.chaeumbackend.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetReplyResponse {

    private Long replyId;
    private String content;
    private boolean isCheer;
    private Long rereplyId;
    private String replyTime;
    private List<GetReplyResponse> replies;
}
