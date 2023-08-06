package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activity")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Activity {
    @Id
    @Column(name = "activity_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //    @ManyToOne(cascade = CascadeType.ALL)
////    @JoinColumn(name="streak_id", referencedColumnName = "streak_id") // 이거 만약에 에러나면 의심하기
    @Column(name = "streak_id")
    private int streakId;
//    private Streak streakId; // 이것을 쓸 것!

    @Column(name = "activity_start_time")
    private String activityStartTime;

    @Column(name = "activity_end_time")
    private String activityEndTime;

    @Column(name = "activity_time")
    private int activityTime;

    @Builder
    public Activity(int streakId) {
        this.streakId = streakId;
    }

    public void changeStreakId(int streakId) {
        this.streakId = streakId;
    }

    public void changeStartTime(String activityStartTime) {
        this.activityStartTime = activityStartTime;
    }

    public void changeEndTime(String activityEndTime) {
        this.activityEndTime = activityEndTime;
    }
}

