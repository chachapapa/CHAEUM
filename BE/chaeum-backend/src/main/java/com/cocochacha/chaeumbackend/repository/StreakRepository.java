package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Streak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreakRepository extends JpaRepository<Streak, Integer> {

}
