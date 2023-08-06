package com.cocochacha.chaeumbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddActivityRequest {
    private int streakId;
    private String date;
}