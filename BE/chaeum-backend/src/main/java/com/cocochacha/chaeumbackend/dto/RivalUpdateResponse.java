package com.cocochacha.chaeumbackend.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RivalUpdateResponse {

    private List<Rival> rivalList;

    @Getter
    @Setter
    @Builder
    public static class Rival {

        int streakId;
        int accumulateTime;
        boolean isActive;
        int ongoingTime;
    }
}
