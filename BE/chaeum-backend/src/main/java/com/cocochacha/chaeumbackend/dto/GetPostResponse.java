package com.cocochacha.chaeumbackend.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetPostResponse {

    private int postId;
    private int activityId;
    private boolean isFriend;
    private String profileUrl;
    private String postContent;
    private String postTime;
    private String streakColor;
    private String nickname;
    private String streakName;
    private List<GetReplyResponse> replyList;
    private List<String> tagList;
    private List<String> imageList;
}
