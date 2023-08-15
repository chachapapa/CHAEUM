package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activity_like")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLike {

    @Id
    @Column(name = "activity_like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
    private Activity activityId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserPersonalInfo userId;

    @Column(name = "is_like")
    // 좋아요 여부로 true면 좋아요를 구른 것에 대한 로그, false면 싫어요를 누른 로그
    private boolean isLike;

    @Builder
    public ActivityLike(Activity activityId, UserPersonalInfo userId) {
        this.isLike = true;
        this.activityId = activityId;
        this.userId = userId;
    }

    public void changeIsLike() {
        this.isLike = !this.isLike;
    }
}
