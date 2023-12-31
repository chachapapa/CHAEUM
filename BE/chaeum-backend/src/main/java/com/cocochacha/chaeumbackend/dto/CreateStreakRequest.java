package com.cocochacha.chaeumbackend.dto;

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
public class CreateStreakRequest {
    private String categoryMain;
    private String categoryMiddle;
    private String streakName;
    private String streakColor;
    private List<String> tagList;
}
