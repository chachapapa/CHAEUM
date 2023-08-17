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
import com.cocochacha.chaeumbackend.dto.RivalListResponse;
import com.cocochacha.chaeumbackend.dto.RivalListResponse.Rival;
import com.cocochacha.chaeumbackend.dto.RivalUpdateResponse;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;
import com.cocochacha.chaeumbackend.repository.CategoryRepository;
import com.cocochacha.chaeumbackend.repository.StreakInfoRepository;
import com.cocochacha.chaeumbackend.repository.StreakRepository;
import com.cocochacha.chaeumbackend.repository.TagRepository;
import jakarta.validation.constraints.Null;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.TreeSet;
import java.util.stream.Collectors;
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

        String color = createStreakRequest.getStreakColor();
        String name = createStreakRequest.getStreakName();

        if(name.equals("")){
            name = createStreakRequest.getCategoryMiddle();
        }
        if(color.equals("")){
            color = "chaeumblue";
        }

        //들어온 createStreakRequest 를 사용해서
        //새로운 Streak 객체를 만들어준다.
        Streak streak = Streak.builder()
                .streakName(name)
                .streakColor(color)
                .category(categoryRepository.findByCategoryMainAndCategoryMiddle(
                        createStreakRequest.getCategoryMain(),
                        createStreakRequest.getCategoryMiddle()).get())
                .userPersonalInfo(userPersonalInfo)
                .streakActive(true)
                .build();

        // 스트릭 정보 리스트를 선언한다.
        List<StreakInfo> streakInfos = new ArrayList<>();

        if(createStreakRequest.getTagList() != null) {
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
        }
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

            // 기존 스트릭 정보 리스트를 모두 제거
            streakInfoRepository.deleteAllByStreak(streak);


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

            streak.changeStreakActive();

            if (streak.isStreakActive()) {
                return false;
            }
        } else {
            return false;
        }

        return true;
    }

    @Override
    public List<List<GetStreakResponse>> getStreak(UserPersonalInfo userPersonalInfo) {

        List<List<GetStreakResponse>> streakResponseList = new ArrayList<>();

        Optional<List<Streak>> optionalStreakList = streakRepository.findStreaksByUserPersonalInfoAndStreakDeletedIsFalse(
                userPersonalInfo);

        if (optionalStreakList.isPresent()) {
            List<Streak> streakList = optionalStreakList.get();
            List<GetStreakResponse> exerciseStreak = new ArrayList<>();
            List<GetStreakResponse> studyStreak = new ArrayList<>();
            List<GetStreakResponse> etcStreak = new ArrayList<>();

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

                // 태그 리스트 받아오기
                List<String> tagList = new ArrayList<>();

                List<StreakInfo> streakInfos = streakInfoRepository.findAllByStreak(streak)
                        .orElse(null);

                for (StreakInfo streakInfo : streakInfos) {
                    tagList.add(streakInfo.getTag().getTagName());
                }

                streakResponse.setTagList(tagList);

                // streak을 활동별로 구분
                if (streak.getCategory().getCategoryMain().equals("운동")) {
                    exerciseStreak.add(streakResponse);
                } else if (streak.getCategory().getCategoryMain().equals("공부")) {
                    studyStreak.add(streakResponse);
                } else {
                    etcStreak.add(streakResponse);
                }
            }

            Collections.sort(exerciseStreak, (o1, o2) -> {
                if (o1.isStreakActive() == o2.isStreakActive()) {
                    return o1.getStreakId() - o2.getStreakId();
                } else {
                    if (o1.isStreakActive()) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });
            Collections.sort(studyStreak, (o1, o2) -> {
                if (o1.isStreakActive() == o2.isStreakActive()) {
                    return o1.getStreakId() - o2.getStreakId();
                } else {
                    if (o1.isStreakActive()) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });
            Collections.sort(etcStreak, (o1, o2) -> {
                if (o1.isStreakActive() == o2.isStreakActive()) {
                    return o1.getStreakId() - o2.getStreakId();
                } else {
                    if (o1.isStreakActive()) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });

            streakResponseList.add(exerciseStreak);
            streakResponseList.add(studyStreak);
            streakResponseList.add(etcStreak);

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

        for (String str : strings) {
            GetCategoryResponse categoryResponse = new GetCategoryResponse();
            List<Category> categoryList = categoryRepository.findAllByCategoryMain(str)
                    .orElse(null);
            List<String> categoryString = new ArrayList<>();
            for (Category category : categoryList) {
                categoryString.add(category.getCategoryMiddle());
            }
            categoryResponse.setCategoryMiddleList(categoryString);
            categoryResponseList.add(categoryResponse);
        }
        return categoryResponseList;
    }

    @Override
    public Streak findById(int id) {
        return streakRepository.findById(id).orElse(null);
    }

    @Override
    public RivalListResponse getRivalList(Streak myStreak) {
        // 요청으로 들어온 스트릭과 카테고리가 같은 중분류인 스트릭id들을 가져와요
        // 개수가 5개가 안된다면 그냥 스트릭 id를 다 가져와요
        List<Streak> streakList = streakRepository.findAllByCategory(myStreak.getCategory())
                .orElse(null);
        if (streakList.size() < 6) {
            streakList = streakRepository.findAll();
        }
        List<Integer> streakIds = streakList.stream().map(Streak::getStreakId)
                .collect(Collectors.toList());

        // 각 스트릭의 7일간 누적 시간 합을 가져와요
        int myTime = 0;
        HashSet<Integer> hashSet = new HashSet<>();
        for (Streak streak : streakList) {
            hashSet.add(streak.getStreakId());
        }

        // 시간을 키, 스트릭 id를 밸류로 하여 트리셋에 데이터 저장
        TreeSet<int[]> treeSet = new TreeSet<>((o1, o2) -> {
            if (o1[1] != o2[1]) {
                return o1[1] - o2[1];
            }
            return o1[0] - o2[0];
        });

        List<List<Integer>> accumulateWeekTime = activityRepository.accumulateWeekTime(
                streakIds).orElse(null);
        if (accumulateWeekTime == null) {
            return null;
        }
        fill: while (accumulateWeekTime.size() < 6) {
            int tempId = streakIds.get(new Random().nextInt(streakIds.size()));
            for (List<Integer> idAndTime : accumulateWeekTime) {
                if (idAndTime.get(0).equals(tempId)) {
                    continue fill;
                }
            }
            accumulateWeekTime.add(List.of(tempId, 0));
        }

        for (List<Integer> idAndTime : accumulateWeekTime) {
            if (myStreak.getStreakId() == idAndTime.get(0)) {
                myTime = idAndTime.get(1);
            } else if (hashSet.contains(idAndTime.get(0))) {
                treeSet.add(new int[]{idAndTime.get(0), idAndTime.get(1)});
            }
        }

        List<RivalListResponse.Rival> selectedRivalList = new ArrayList<>();

        // 나보다 2시간반 이내, 2시간 이내, 1시간반 이내, 1시간 이내, 30분 이내로 앞서는 스트릭을 하나씩 가져와요
        int[] seconds = {9000, 7200, 5400, 3600, 1800};
        for (int second : seconds) {
            int[] findF = treeSet.floor(new int[]{Integer.MAX_VALUE, myTime + second});

            int[] find;
            // 누적시간이 자신의 누적시간보다 크고 범위보다 작은 값이 있다면 그 값을 써요
            if (findF != null && findF[1] > myTime) {
                find = findF;
            } else {
                // 위에서 못찾았으면 범위보다 큰 값을 써요
                int[] findH = treeSet.higher(new int[]{Integer.MAX_VALUE, myTime + second});
                if (findH != null) {
                    find = findH;
                }

                // 위에서 못찾았으면 자신의 누적시간보다 작은 값을 써요
                else if (findF != null) {
                    find = findF;
                }

                // 위에서도 못찾았으면 문제가 있어요 null을 리턴해요
                else {
                    return null;
                }
            }

            // 찾은 값을 트리셋에서 제거해요
            treeSet.remove(find);

            // 제거한 값에서의 스트릭 id를 통해 데이터를 저장해요
            Streak rivalStreak = streakRepository.findById(find[0]).orElse(null);
            if (rivalStreak == null) {
                return null;
            }

            Integer ongoingTime = activityRepository.findOngoingTime(find[0]).orElse(null);

            RivalListResponse.Rival rival = Rival.builder()
                    .streakId(rivalStreak.getStreakId())
                    .nickname(rivalStreak.getUserPersonalInfo().getNickname())
                    .categoryId(rivalStreak.getCategory().getCategoryId())
                    .categoryMain(rivalStreak.getCategory().getCategoryMain())
                    .categoryMiddle(rivalStreak.getCategory().getCategoryMiddle())
                    .accumulateTime(find[1])
                    .profileImageUrl(rivalStreak.getUserPersonalInfo().getProfileImageUrl())
                    .build();

            if (ongoingTime != null) {
                rival.setActive(true);
                rival.setOngoingTime(ongoingTime);
            } else {
                rival.setActive(false);
                rival.setOngoingTime(0);
            }

            selectedRivalList.add(rival);
        }

        return RivalListResponse.builder()
                .myAccumulateTime(myTime)
                .rivalList(selectedRivalList).build();
    }

    @Override
    public RivalUpdateResponse getRivalList(List<Integer> rivalStreakIds) {

        List<RivalUpdateResponse.Rival> selectedRivalList = new ArrayList<>();

        for (int streakId : rivalStreakIds) {
            Integer accumlatieWeekTime = activityRepository.accmulateWeekTime(streakId).orElse(0);

            Integer ongoingTime = activityRepository.findOngoingTime(streakId)
                    .orElse(null);

            RivalUpdateResponse.Rival rival = RivalUpdateResponse.Rival.builder()
                    .streakId(streakId)
                    .accumulateTime(accumlatieWeekTime)
                    .build();

            if (ongoingTime != null) {
                rival.setActive(true);
                rival.setOngoingTime(ongoingTime);
            } else {
                rival.setActive(false);
                rival.setOngoingTime(0);
            }

            selectedRivalList.add(rival);
        }

        return RivalUpdateResponse.builder().rivalList(selectedRivalList).build();
    }
}
