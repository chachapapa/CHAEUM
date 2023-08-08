package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Streak {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "streak_id")
    private int streakId;

    @Column(name = "streak_name")
    private String streakName;

    @Column(name = "streak_color")
    private String streakColor;

    @Column(name = "streak_active")
    private boolean streakActive = true;

    @Column(name = "streak_deleted")
    private boolean streakDeleted = false;

    // streak_info 테이블과 1:N 관계 매핑
    @OneToMany(mappedBy = "streak", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StreakInfo> streakInfoList;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserPersonalInfo userPersonalInfo;

    public void changeStreakDeleted(boolean b) {
        this.streakDeleted = b;
    }

    public void changeStreakActive(boolean b) {
        this.streakActive = b;
    }

    public void changeStreakColor(String streakColor) {
        this.streakColor = streakColor;
    }

    public void changeStreakName(String streakName) {
        this.streakName = streakName;
    }

    public void changeStreakInfoList(List<StreakInfo> streakInfoList){
        this.streakInfoList = streakInfoList;
    }
}
