package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.*;
import com.cocochacha.chaeumbackend.dto.*;
import com.cocochacha.chaeumbackend.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import com.pkslow.ai.AIClient;
import com.pkslow.ai.GoogleBardClient;
import com.pkslow.ai.domain.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ActivityService {

    @Autowired
    private final ActivityRepository activityRepository;
    @Autowired
    private final StreakRepository streakRepository;
    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final ReplyRepository replyRepository;
    @Autowired
    private final UserMypageInfoRepository userMypageInfoRepository;

    /**
     * 활동을 시작하면 필요한 정보를 가공해서 Controller에 넘겨주는 메소드
     * 필요한 정보는, DB에 들어가는 값과 최근 14일 간 누적 시간
     *
     * @param addActivityRequest 스트릭 ID와 시작 시간
     * @return 스트릭 ID와 시작 시간, 누적 시간
     */
    public AddActivityResponse createActivity(AddActivityRequest addActivityRequest) {
        if ((Integer) addActivityRequest.getStreakId() == null) {
            throw new NoSuchElementException("값 없음");
        }

        // streakId 가져오기
        Streak streakId = streakRepository.findById(addActivityRequest.getStreakId()).orElse(null);
        if (streakId == null) {
            // 해당 streakID는 streak Table에 없는 값!
            throw new NullPointerException("없는 값!");
        }

        Activity activity = Activity.builder()
                .streakId(streakId)
                .build();

        activity.changeStartTime(addActivityRequest.getDate());

        activityRepository.save(activity);

        // 누적 시간 구하기
        List<List<String>> accumulate = activityRepository.accumulateQuery(
                addActivityRequest.getStreakId()).orElse(null);

        AddActivityResponse addActivityResponse = AddActivityResponse.builder()
                .activityId(activity.getId())
                .streakId(addActivityRequest.getStreakId())
                .date(addActivityRequest.getDate())
                .accumulate(accumulate)
                .build();

        return addActivityResponse;
    }

    /**
     * 활동 종료 후, 값을 DB에 저장하는 메소드
     *
     * @param endActivityRequest 입력으로 받는 값
     * @return DB에 저장이 되는 값
     */
    public EndActivityRequest endActivity(EndActivityRequest endActivityRequest) {
        int activityId = endActivityRequest.getActivityId();

        Activity activity = activityRepository.findById(activityId).orElse(null);

        if (activity == null) {
            // 예외 던지기
            throw new NoSuchElementException("null 값");
        } else if (activity.getActivityEndTime() != null) {
            // 이미 값이 있는 경우 => 예외의 경우 새로운 것을 만들어서 넘길지 의논해보기
            throw new NullPointerException("이미 있는 값");
        } else {
            // null 값이 아닌 경우 종료에 해당하는 값 넣어주기
            Streak streakId = streakRepository.findById(endActivityRequest.getStreakId()).orElse(null);

            if (streakId == null) {
                // 해당 streakID는 streak Table에 없는 값!
                throw new NullPointerException("없는 값!");
            }

            activity.changeStreakId(streakId);

            // 값 저장해주기 => DB에 반영
            activityRepository.updateEnd(endActivityRequest.getEndTime(),
                    activity.getActivityStartTime(),
                    endActivityRequest.getStreakId(), activityId);

            // DTO에 값을 담아서 return 해주기
            return endActivityRequest;
        }
    }

    /**
     * 활동 시작시 사용자가 받는 목록을 만들어 주는 메소드
     *
     * @param startMessageRequest categoryId, userPersonalInfo로 유저의 정보
     * @return 시작시 사용자가 받는 멘트 목록
     */
    public StartMessageResponse startMessage(StartMessageRequest startMessageRequest, UserPersonalInfo userPersonalInfo) {
        UserMypageInfo userMypageInfo = userMypageInfoRepository.findById(userPersonalInfo.getId()).orElse(null);

        int categoryId = startMessageRequest.getCategoryId();

        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (category == null) {
            throw new NoSuchElementException("null 값!");
        }

        String doing = "하는 일 : " + category.getCategoryMiddle();
        String mbti = "";

        if (userMypageInfo.getMbti() != null) {
            mbti = "MBTI : " + userMypageInfo.getMbti();
        }

//        String prompt = doing + mbti + ", 이 정보를 이용해서 동기부여가 될만한 문장만 5개만 알려줘";

        String prompt = doing + mbti + ", 이 정보를 이용해서 동기부여가 될만한 문장을 0. 1. 2. 3. 4. 5. 6. 7. 8. 9. 으로 해서 10개만 알려줘";

        List<String> sentences = createSentence(prompt);
        StartMessageResponse startMessageResponsege = StartMessageResponse.builder()
                .sentences(sentences)
                .build();

        return startMessageResponsege;

    }

    /**
     * 활동 중에 받는 메세지를 만들어 주는 메소드
     *
     * @param doingMessageRequest categoryId, activityId
     * @param userPersonalInfo user의 정보
     * @return 활동 중 받는 메세지의 목록
     */
    public DoingMessageResponse doMessage(DoingMessageRequest doingMessageRequest, UserPersonalInfo userPersonalInfo) {
        Activity activity = activityRepository.findById(doingMessageRequest.getActivityId()).orElse(null);

        // 스트릭 아이디
        int streakId = activity.getStreakId().getStreakId();

        // 카테고리 아이디
        int categoryId = doingMessageRequest.getCategoryId();

        // 카테고리 아이디를 이용해서 카테고리에 대한 정보를 다 가져옵니다.
        Category category = categoryRepository.findById(categoryId).orElse(null);

        // 위에 있는 정보를 이용해서 프롬프트를 생성 한 후, 프롬프트를 만들어서 문장을 생성 후, 값을 넘겨주면 됨
        List<String> sentences = createSentence("여기에 프롬프트를 만들어서 넘겨야함");

        DoingMessageResponse doingMessageResponse = DoingMessageResponse.builder()
                .sentences(sentences)
                .build();
        return doingMessageResponse;
    }

    /**
     * 활동 중에 받는 응원글 목록을 뽑아주는 메소드
     *
     * @param cheeringCommentRequest activityId
     * @return 응원글 목록
     */
    public List<CheeringCommentResponse> cheeringComment(CheeringCommentRequest cheeringCommentRequest) {
        Activity activity = activityRepository.findById(cheeringCommentRequest.getActivityId()).orElse(null);
        if (activity == null) {
            throw new NullPointerException("null 값!");
        }

        List<Reply> reply = replyRepository.findAllByActivityId(activity).orElse(null);
        List<String> replyList = new ArrayList<>();
        List<CheeringCommentResponse> cheeringCommentResponses = new ArrayList<>();
        
        for (int i = 0; i < reply.size(); i++) {
            UserPersonalInfo userInfo = reply.get(i).getUserId();

            CheeringCommentResponse cheeringCommentResponse = CheeringCommentResponse.builder()
                    .comments(reply.get(i).getContent())
                    .nickname(userInfo.getNickname())
                    .profileUrl(userInfo.getProfileImageUrl())
                    .build();

            cheeringCommentResponses.add(cheeringCommentResponse);
        }
        return cheeringCommentResponses;
    }

    /**
     * Bard API를 이용해서 문장을 만들어 주는 메소드
     *
     * @param prompt AI한테 줄 문장
     * @return AI가 생성한 문장의 목록
     */
    public List<String> createSentence(String prompt) {
        /*
            여기는 AI 모델이 보내는 값을 보고, 그에 맞게 고쳐쓸 것
            지금 포맷을 정하는 것은 너무 도박적인 일임
            파싱하는 과정은 어렵지 않으니 그냥 아무거나 넘기는 것으로 할 것
         */

        AIClient client = new GoogleBardClient("ZgjP_v4J5GQyCQWfzgTnY582o6rgDGYbjeTHHhAVjfGmDBJWxYN-AfZSU7uT7tBrBidvRg.");

        Answer answer1 = client.ask(prompt);

        List<String> sentences = new ArrayList<>();

        for (String a : answer1.getChosenAnswer().split("\n")) {
            if (a.length() == 0) {
                continue;
            }
            if (a.charAt(0) >= '0' && a.charAt(0) <= '9'){
                sentences.add(a.split("\\d.")[1]);
            }
        }

        return sentences;
    }

}

