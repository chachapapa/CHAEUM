package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserPersonalInfoRepository extends JpaRepository<UserPersonalInfo, Long> {

    /**
     * 주어진 이메일로 사용자를 검색합니다.
     *
     * @param email 검색하고자 하는 사용자의 이메일
     * @return 검색된 사용자 객체(Optional)
     */
    Optional<UserPersonalInfo> findByEmail(String email);

    /**
     * 해당하는 닉네임을 가지는 유저들을 검색합니다.
     *
     * @param nickname 검색하고자 하는 사용자의 닉네임
     * @return 검색된 사용자 객체들의 컬렉션 (List)
     */
    List<UserPersonalInfo> findAllByNickname(String nickname);

    Optional<UserPersonalInfo> findByNicknameAndIsRegistered(String nickname, Boolean isRegistered);

    String searchByNicknameOrderBySimilarityQuery = """
            SELECT *
            FROM users
            WHERE nickname LIKE CONCAT('%', :keyword, '%')
            AND is_registered = TRUE
            ORDER BY CASE WHEN nickname = :keyword THEN 0
            WHEN nickname = CONCAT(:keyword, '%') THEN 1
            WHEN nickname = CONCAT('%', :keyword, '%') THEN 2
            WHEN nickname = CONCAT('%', :keyword) THEN 3
            ELSE 4
            END
            """;

    @Query(value = searchByNicknameOrderBySimilarityQuery, nativeQuery = true)
    Optional<List<UserPersonalInfo>> searchByNicknameOrderBySimilarity(
            @Param("keyword") String keyword);
}
