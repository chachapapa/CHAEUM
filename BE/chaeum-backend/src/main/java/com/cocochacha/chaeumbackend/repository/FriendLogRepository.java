package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.FriendLog;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 친구 신청 로그에 대한 기본적인 JPA 메소드를 사용하기 위해서 만든 인터페이스
 *
 */
public interface FriendLogRepository extends JpaRepository<FriendLog, Integer> {
}

