package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
public class AddActivityResponse {
    private int activityId;
    private int streakId;

    /* DataBase에는 Date로 저장이 되지만, 여기서는 String으로 할 것 => 문제가 생기면 바꾸기 */
    private String date;

    /* 14일 동안 각 날에 대한 누적 시간 => 리스트로 할 필요 없다면 그냥 int[]로 할 것 */
    private List<List<String>> accumulate;

    @Builder
    public AddActivityResponse(int activityId, int streakId, String date, List<List<String>> accumulate) {
        this.activityId = activityId;
        this.streakId = streakId;
        this.date = date;
        this.accumulate = accumulate;
    }
}


