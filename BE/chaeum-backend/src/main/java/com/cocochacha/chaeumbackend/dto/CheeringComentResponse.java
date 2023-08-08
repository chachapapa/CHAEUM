package com.cocochacha.chaeumbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheeringComentResponse {
    List<String> coments;

    @Builder
    public CheeringComentResponse(List<String> coments) {
        this.coments = coments;
    }
}
