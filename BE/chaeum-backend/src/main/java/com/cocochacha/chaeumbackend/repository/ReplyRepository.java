package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Optional<List<Reply>> findAllByActivityId(Activity activityId);
}

