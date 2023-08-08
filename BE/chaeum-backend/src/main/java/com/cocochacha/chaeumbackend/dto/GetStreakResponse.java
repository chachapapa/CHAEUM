package com.cocochacha.chaeumbackend.dto;

import com.cocochacha.chaeumbackend.domain.Category;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStreakResponse {

    private int streakId;
    private String streakName;
    private String streakColor;
    private boolean streakActive;
    private boolean streakDeleted;
    private int categoryId;
    private int continueDays;
    private List<List<String>> activeHistoryList;
}
