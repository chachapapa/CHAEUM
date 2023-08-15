package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    /**
     * ActivityId에 해당하는 모든 댓글을 구해주는 메소드
     *
     * @param activityId activityId
     * @return 댓글 목록
     */
    Optional<List<Reply>> findAllByActivityId(Activity activityId);

    /**
     * ActivityId에 해당하고 삭제되지 않은 댓글을 구해주는 메소드
     *
     * @param activityId activityId
     * @return 댓글 목록
     */
    List<Reply> findAllByActivityIdAndReplyDeletedIsFalse(Activity activityId);
}

