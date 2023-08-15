package com.cocochacha.chaeumbackend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UpdateMypageInfoRequest {

    private String gender;
    private String height;
    private String weight;
    private String mbti;
    private String introduce;
    private MultipartFile backgroundImage;
    private MultipartFile profileImage;
}
