package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.StreakInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreakInfoRepository extends JpaRepository<StreakInfo, Integer> {

    Optional<StreakInfo> findByStreak(Streak streak);

    Optional<List<StreakInfo>> findAllByStreak(Streak streak);
}