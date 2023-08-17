package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheeringCommentResponse {
    String nickname;
    String content;
    String profileUrl;

    @Builder
    public CheeringCommentResponse(String nickname, String comments, String profileUrl) {
        this.nickname = nickname;
        this.content = comments;
        this.profileUrl = profileUrl;
    }
}