package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DoingMessageResponse {
    List<String> sentences;

    @Builder
    public DoingMessageResponse(List<String> sentences) {
        this.sentences = sentences;
    }
}
