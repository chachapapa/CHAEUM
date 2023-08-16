package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "user_mypage_info")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Entity
public class UserMypageInfo {

    @Id
    @Column(name = "id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserPersonalInfo userPersonalInfo;

    @Column(name = "user_gender")
    private String gender;

    @Column(name = "user_height")
    private String height;

    @Column(name = "user_weight")
    private String weight;

    @Column(name = "user_mbti")
    private String mbti;

    @Column(name = "user_introduce")
    private String introduce;

    @Column(name = "user_background_url")
    private String backgroundUrl;

    @Column(name = "user_main_color")
    private String mainColor;

    @Builder
    public UserMypageInfo(UserPersonalInfo userPersonalInfo, String mainColor) {
        this.userPersonalInfo = userPersonalInfo;
        this.mainColor = mainColor != null ? mainColor : "chaeumblue";
    }
}
