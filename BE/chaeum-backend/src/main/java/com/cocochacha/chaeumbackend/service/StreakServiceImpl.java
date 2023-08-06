package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.StreakInfo;
import com.cocochacha.chaeumbackend.domain.Tag;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.repository.CategoryRepository;
import com.cocochacha.chaeumbackend.repository.StreakInfoRepository;
import com.cocochacha.chaeumbackend.repository.StreakRepository;
import com.cocochacha.chaeumbackend.repository.TagRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StreakServiceImpl implements StreakService{

    @Autowired
    StreakRepository streakRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    StreakInfoRepository streakInfoRepository;

    /**
     * 사용자의 스트릭을 생성한다.
     * 사용자의 스트릭정보를 생성한다.
     * 사용자의 태그를 생성한다.
     *
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 새로운 스트릭이 저장이 잘 되었다면 true 아니라면 false
     */
    @Override
    @Transactional
    public boolean createStreak(CreateStreakRequest createStreakRequest) {

        /**
         * 들어온 createStreakRequest 를 사용해서
         * 새로운 Streak 객체를 만들어준다.
         */

        Streak streak = Streak.builder()
                .streakName(createStreakRequest.getStreakName())
                .streakColor(createStreakRequest.getStreakColor())
                .category(categoryRepository.findByCategoryMainAndCategoryMiddle(
                        createStreakRequest.getCategoryMain(), createStreakRequest.getCategoryMiddle()).get())
                .build();

        // 스트릭 정보 리스트를 선언한다.
        List<StreakInfo> streakInfos = new ArrayList<>();

        // 들어온 태그 리스트들을 사용한다.
        // 만약 태그가 저장되어있지 않다면 태그를 새로 저장한다
        for(String tagName : createStreakRequest.getTagList()){
            Optional<Tag> optionalTag = tagRepository.findByTagName(tagName);
            Tag tag;
            if(optionalTag.isEmpty()){
                tag = Tag.builder()
                        .tagName(tagName)
                        .build();
                tagRepository.save(tag);
            }
            else{
                tag = optionalTag.get();
            }
            StreakInfo streakInfo = StreakInfo.builder()
                    .streak(streak)
                    .tag(tag)
                    .build();
            streakInfos.add(streakInfo);
        }

        // 스트릭에 스트릭 정보를 넣어준다.
        streak.changeStreakInfoList(streakInfos);

        // 잘 저장이 되었다면 true 아니라면 false
        return streak.equals(streakRepository.save(streak));
    }
}
