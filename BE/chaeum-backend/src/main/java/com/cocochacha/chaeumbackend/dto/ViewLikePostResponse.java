package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViewLikePostResponse {
    private int postId;
    private int cnt;

    @Builder
    public ViewLikePostResponse(int postId, int cnt) {
        this.postId = postId;
        this.cnt = cnt;
    }
}

