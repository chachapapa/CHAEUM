package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Streak;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {

    String activityTimeQuery = """
            UPDATE activity
            SET activity_end_time = :activity_end_time,
                activity_time = TIME_TO_SEC(
                            TIMEDIFF(DATE_FORMAT(:activity_end_time, '%Y-%m-%d %H:%i:%s'),
                             DATE_FORMAT(:activity_start_time, '%Y-%m-%d %H:%i:%s'))
                            ),
                streak_id = :streak_id
            WHERE streak_id = :streak_id and activity_id = :activity_id
            """;

    String accumulateTimeQuery = """
            select Date(activity_start_time) as `start_time` ,sum(activity_time) as `sum_time`
            from (select * 
                    from activity
                    where DATE_SUB(curdate(), INTERVAL 15 Day) <= Date(activity_start_time) 
                    and streak_id = :streak_id
                  ) as 14day
            group by Date(activity_start_time);      
            """;

    String accumulateTimeQuery6Weeks = """
            select max(activity_start_time) as `start_time` ,max(activity_end_time) as `end_time`, 
            sum(activity_time) as `sum_time`, max(activity_is_post) as `activity_is_post`
            from (select * 
                    from activity
                    where DATE_SUB(curdate(), INTERVAL 43 Day) <= Date(activity_start_time) 
                    and streak_id = :streak_id
                  ) as 42day
            group by Date(activity_start_time);      
            """;

    Optional<Activity> findById(int id);

    /**
     * 해당 스트릭의 14일 간의 누적 시간(초)을 구하는 메소드
     *
     * @param streakId 구하고 싶은 스트릭 ID
     * @return [날짜, 누적 시간] 형태의 리스트
     */
    @Query(value = accumulateTimeQuery, nativeQuery = true)
    Optional<List<List<String>>> accumulateQuery(@Param("streak_id") int streakId);

    /**
     * 한번 활동에 얼마나 했는지 구해서, 해당 데이터와 함께 DB에 넣는 메소드
     *
     * @param activityEndTime 활동 끝난 시간
     * @param activityStartTime 활동 시작 시간
     * @param streakId 스트릭 ID
     * @param activityId 활동 내역 ID
     */
    @Modifying
    @Query(value = activityTimeQuery, nativeQuery = true)
    void updateEnd(@Param("activity_end_time") String activityEndTime,
            @Param("activity_start_time") String activityStartTime,
            @Param("streak_id") int streakId,
            @Param("activity_id") int activityId);


    /**
     * 해당 스트릭의 42일 간의 누적 시간(초)을 구하는 메소드
     *
     * @param streakId 구하고 싶은 스트릭 ID
     * @return [날짜, 누적 시간] 형태의 리스트
     */
    @Query(value = accumulateTimeQuery6Weeks, nativeQuery = true)
    Optional<List<List<String>>> accumulateQuery6Weeks(@Param("streak_id") int streakId);

    Optional<Activity> findTopByStreakIdOrderByActivityStartTimeDesc(Streak streak);
}


