package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "activity_like_log")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLikeLog {

    @Id
    @Column(name = "activity_like_log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_like_id", referencedColumnName = "activity_like_id")
    private ActivityLike activityLike;

    @Column(name = "log")
    @CreationTimestamp
    private Date createTime;

    @Builder
    public ActivityLikeLog(ActivityLike activityLike) {
        this.activityLike = activityLike;
    }
}
