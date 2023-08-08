package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StartMessageResponse {
    List<String> sentences;

    @Builder
    public StartMessageResponse(List<String> sentences) {
        this.sentences = sentences;
    }

}

