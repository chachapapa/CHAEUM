package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
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

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="streak_id", referencedColumnName = "streak_id")
    private Streak streakId;

    @Column(name = "activity_start_time")
    private String activityStartTime;

    @Column(name = "activity_end_time")
    private String activityEndTime;

    @Column(name = "activity_time")
    private int activityTime;

    @Builder
    public Activity(Streak streakId) {
        this.streakId = streakId;
    }

    public void changeStreakId(Streak streakId) {
        this.streakId = streakId;
    }

    public void changeStartTime(String activityStartTime) {
        this.activityStartTime = activityStartTime;
    }

    public void changeEndTime(String activityEndTime) {
        this.activityEndTime = activityEndTime;
    }
}

