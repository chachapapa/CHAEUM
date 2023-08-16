package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserMypageInfoResponse {

    private String nickname;
    private String gender;
    private String height;
    private String weight;
    private String mbti;
    private String introduce;
    private String backgroundUrl;
    private String profileImageUrl;
    private String mainColor;
}
