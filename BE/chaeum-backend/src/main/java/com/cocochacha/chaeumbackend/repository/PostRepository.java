package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Post;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    // 친구들 포스트만 가져오는 쿼리
    @Query("SELECT p FROM Post p Where p.userPersonalInfo IN :friends")
    List<Post> findFriendsPosts(@Param("friends")List<UserPersonalInfo> friends);

    // 모르는 사람들의 포스트만 가져오는 쿼리
    @Query("SELECT p FROM Post p Where p.userPersonalInfo NOT IN :friends")
    List<Post> findStrangersPosts(@Param("friends") List<UserPersonalInfo> friends);

    List<Post> findAllByPostEnableIsTrue();
}
