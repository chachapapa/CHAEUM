package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViewLikeActivityResponse {
    private int activityId;
    private int cnt;

    @Builder
    public ViewLikeActivityResponse(int activityId, int cnt) {
        this.activityId = activityId;
        this.cnt = cnt;
    }
}
