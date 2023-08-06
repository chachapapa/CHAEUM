package com.cocochacha.chaeumbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MyPersonalInfoResponse {

    private String email;
    private String nickname;
    private String profileImageUrl;
    private Boolean isRegistered;
}
