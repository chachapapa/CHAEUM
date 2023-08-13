package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Category;
import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreakRepository extends JpaRepository<Streak, Integer> {

    Optional<List<Streak>> findAllByStreakDeletedIsFalse();
    Optional<List<Streak>> findStreaksByUserPersonalInfoAndStreakDeletedIsFalse(UserPersonalInfo userPersonalInfo);
    Optional<List<Streak>> findAllByCategory(Category category);
}
