package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.Category;
import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.StreakInfo;
import com.cocochacha.chaeumbackend.domain.Tag;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateStreakRequest;
import com.cocochacha.chaeumbackend.dto.DeactivateStreakRequest;
import com.cocochacha.chaeumbackend.dto.DeleteStreakRequest;
import com.cocochacha.chaeumbackend.dto.GetCategoryResponse;
import com.cocochacha.chaeumbackend.dto.GetStreakResponse;
import com.cocochacha.chaeumbackend.dto.ModifyStreakRequest;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;
import com.cocochacha.chaeumbackend.repository.CategoryRepository;
import com.cocochacha.chaeumbackend.repository.StreakInfoRepository;
import com.cocochacha.chaeumbackend.repository.StreakRepository;
import com.cocochacha.chaeumbackend.repository.TagRepository;
import jakarta.validation.constraints.Null;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StreakServiceImpl implements StreakService {

    @Autowired
    StreakRepository streakRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    StreakInfoRepository streakInfoRepository;

    @Autowired
    ActivityRepository activityRepository;

    /**
     * 사용자의 스트릭을 생성한다. 사용자의 스트릭정보를 생성한다. 사용자의 태그를 생성한다.
     *
     * @param createStreakRequest (userId, 대분류, 중분류, 스트릭이름, 스트릭컬러, 태그리스트)
     * @return 새로운 스트릭이 저장이 잘 되었다면 true 아니라면 false
     */
    @Override
    @Transactional
    public boolean createStreak(CreateStreakRequest createStreakRequest,
            UserPersonalInfo userPersonalInfo) {

        //들어온 createStreakRequest 를 사용해서
        //새로운 Streak 객체를 만들어준다.

        Streak streak = Streak.builder()
                .streakName(createStreakRequest.getStreakName())
                .streakColor(createStreakRequest.getStreakColor())
                .category(categoryRepository.findByCategoryMainAndCategoryMiddle(
                        createStreakRequest.getCategoryMain(),
                        createStreakRequest.getCategoryMiddle()).get())
                .userPersonalInfo(userPersonalInfo)
                .streakActive(true)
                .build();

        // 스트릭 정보 리스트를 선언한다.
        List<StreakInfo> streakInfos = new ArrayList<>();

        // 들어온 태그 리스트들을 사용한다.
        // 만약 태그가 저장되어있지 않다면 태그를 새로 저장한다
        for (String tagName : createStreakRequest.getTagList()) {
            Optional<Tag> optionalTag = tagRepository.findByTagName(tagName);
            Tag tag;
            if (optionalTag.isEmpty()) {
                tag = Tag.builder()
                        .tagName(tagName)
                        .build();
                tagRepository.save(tag);
            } else {
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

    @Override
    @Transactional
    public boolean modifyStreak(ModifyStreakRequest modifyStreakRequest,
            UserPersonalInfo userPersonalInfo) {
        Optional<Streak> optionalStreak = streakRepository.findById(
                modifyStreakRequest.getStreakId());

        if (optionalStreak.isPresent()) {
            Streak streak = optionalStreak.get();

            // 수정하는 유저와 스트릭의 관계가 유효한지 확인
            if (!streak.getUserPersonalInfo().equals(userPersonalInfo)) {
                return false;
            }

            streak.changeStreakName(modifyStreakRequest.getStreakName());
            streak.changeStreakColor(modifyStreakRequest.getStreakColor());

            // 스트릭 정보 리스트를 선언한다.
            List<StreakInfo> streakInfos = new ArrayList<>();

            // 들어온 태그 리스트들을 사용한다.
            // 만약 태그가 저장되어있지 않다면 태그를 새로 저장한다
            for (String tagName : modifyStreakRequest.getTagList()) {
                Optional<Tag> optionalTag = tagRepository.findByTagName(tagName);
                Tag tag;
                if (optionalTag.isEmpty()) {
                    tag = Tag.builder()
                            .tagName(tagName)
                            .build();
                    tagRepository.save(tag);
                } else {
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

        } else {
            return false;
        }

        // 잘 저장이 되었다면 true 아니라면 false
        return true;
    }

    @Override
    @Transactional
    public boolean deleteStreak(DeleteStreakRequest deleteStreakRequest,
            UserPersonalInfo userPersonalInfo) {
        // deleteStreakRequest의 StreakId를 이용해서 streak을 뽑아낸다.
        Optional<Streak> optionalStreak = streakRepository.findById(
                deleteStreakRequest.getStreakId());

        // StreakId에 해당하는 streak이 존재한다면
        if (optionalStreak.isPresent()) {
            Streak streak = optionalStreak.get();

            /// 삭제하는 유저와 스트릭의 관계가 유효한지 확인
            if (!streak.getUserPersonalInfo().equals(userPersonalInfo)) {
                return false;
            }

            // deleted를 true로 만드는 형태로 스트릭을 삭제 처리 한다.
            streak.changeStreakDeleted(true);

            if (!streak.isStreakDeleted()) {
                return false;
            }
        }
        // 존재하지 않는다면 false 리턴
        else {
            return false;
        }

        return true;
    }

    @Override
    @Transactional
    public boolean deactivateStreak(DeactivateStreakRequest deactivateStreakRequest,
            UserPersonalInfo userPersonalInfo) {
        Optional<Streak> optionalStreak = streakRepository.findById(
                deactivateStreakRequest.getStreakId());

        // StreakId에 해당하는 streak이 존재한다면
        if (optionalStreak.isPresent()) {
            Streak streak = optionalStreak.get();

            // 비활성화하는 유저와 스트릭의 관계가 유효한지 확인
            if (!streak.getUserPersonalInfo().equals(userPersonalInfo)) {
                return false;
            }

            streak.changeStreakActive(false);

            if (streak.isStreakActive()) {
                return false;
            }
        } else {
            return false;
        }

        return true;
    }

    @Override
    public List<GetStreakResponse> getStreak(UserPersonalInfo userPersonalInfo) {

        List<GetStreakResponse> streakResponseList = new ArrayList<>();

        Optional<List<Streak>> optionalStreakList = streakRepository.findStreaksByUserPersonalInfoAndStreakDeletedIsFalse(
                userPersonalInfo);

        if (optionalStreakList.isPresent()) {
            List<Streak> streakList = optionalStreakList.get();
            for (Streak streak : streakList) {
                // 6주간의 데이터를 저장
                List<List<String>> activityList = activityRepository.accumulateQuery6Weeks(
                        streak.getStreakId()).orElse(null);
                GetStreakResponse streakResponse = GetStreakResponse.builder()
                        .streakId(streak.getStreakId())
                        .streakDeleted(streak.isStreakDeleted())
                        .streakActive(streak.isStreakActive())
                        .streakColor(streak.getStreakColor())
                        .streakName(streak.getStreakName())
                        .categoryId(streak.getCategory().getCategoryId())
                        .activeHistoryList(activityList)
                        .continueDays(0)
                        .build();

                streakResponseList.add(streakResponse);
            }
        } else {
            return null;
        }

        return streakResponseList;
    }

    /**
     * 카테고리 중분류를 모두 모두 반환 해주는 함수
     *
     * @return List<GetCategoryResponse ( List < String> 중분류 카테고리 리스트) >
     */
    @Override
    public List<GetCategoryResponse> getCategory() {

        List<GetCategoryResponse> categoryResponseList = new ArrayList<>();
        String[] strings = {"운동", "공부", "기타"};

        for(String str : strings){
            GetCategoryResponse categoryResponse = new GetCategoryResponse();
            List<Category> categoryList  = categoryRepository.findAllByCategoryMain(str).orElse(null);
            List<String> categoryString = new ArrayList<>();
            for(Category category: categoryList){
                categoryString.add(category.getCategoryMiddle());
            }
            categoryResponse.setCategoryMiddleList(categoryString);
            categoryResponseList.add(categoryResponse);
        }
        return categoryResponseList;
    }
}
