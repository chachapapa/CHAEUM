package com.cocochacha.chaeumbackend.domain;

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

/**
 * Streak, Tag N:M 관계를
 * 1:N 1:N 관계로 나누기 위한 테이블
 *
 */
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StreakInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "streak_info_id")
    private int streakInfoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "streak_id")
    private Streak streak;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
