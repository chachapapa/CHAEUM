package com.cocochacha.chaeumbackend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StartMessageRequest {
    private long userId;
    private int categoryId;
}
