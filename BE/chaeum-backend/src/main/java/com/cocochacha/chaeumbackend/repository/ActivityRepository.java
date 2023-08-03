package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Activity;
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

    Optional<Activity> findById(int id);

    @Query(value = accumulateTimeQuery, nativeQuery = true)
    Optional<List<List<String>>> accumulateQuery(@Param("streak_id") int streakId);

    @Modifying
    @Query(value = activityTimeQuery, nativeQuery = true)
    void updateEnd(@Param("activity_end_time") String activityEndTime,
            @Param("activity_start_time") String activityStartTime,
            @Param("streak_id") int streakId,
            @Param("activity_id") int activityId);

}


