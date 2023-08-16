package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchMypageInfoResponse {

    private String nickname;
    private String mbti;
    private String profileImageUrl;
    private String mainColor;
}
