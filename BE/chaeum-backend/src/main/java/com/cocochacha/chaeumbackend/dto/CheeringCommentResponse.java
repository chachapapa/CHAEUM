package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheeringCommentResponse {
    List<String> comments;

    @Builder
    public CheeringCommentResponse(List<String> comments) {
        this.comments = comments;
    }
}
