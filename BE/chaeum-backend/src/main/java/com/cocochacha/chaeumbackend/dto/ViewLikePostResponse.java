package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViewLikePostResponse {
    private int postId;
    private int cnt;
    private boolean isLike;

    @Builder
    public ViewLikePostResponse(int postId, int cnt, boolean isLike) {
        this.postId = postId;
        this.cnt = cnt;
        this.isLike = isLike;
    }
}

