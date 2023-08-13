package com.cocochacha.chaeumbackend.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RivalListResponse {

    private Integer myAccumulateTime;
    private List<Rival> rivalList;

    @Getter
    @Setter
    @Builder
    public static class Rival {

        int streakId;
        String nickname;
        int categoryId;
        String categoryMain;
        String categoryMiddle;
        int accumulateTime;
        boolean isActive;
        int ongoingTime;
    }
}