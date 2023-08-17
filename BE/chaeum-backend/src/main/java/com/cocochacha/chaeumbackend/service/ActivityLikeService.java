package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.*;
import com.cocochacha.chaeumbackend.dto.*;
import com.cocochacha.chaeumbackend.repository.ActivityLikeLogRepository;
import com.cocochacha.chaeumbackend.repository.ActivityLikeRepository;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;
import com.cocochacha.chaeumbackend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ActivityLikeService {

    private final ActivityRepository activityRepository;
    private final ActivityLikeRepository activityLikeRepository;
    private final ActivityLikeLogRepository activityLikeLogRepository;
    private final PostRepository postRepository;

    /**
     * 좋아요 수를 늘려주는 메소드
     *
     * @param likeActivityRequest activityId
     * @param userPersonalInfo userInfo
     * @return 좋아요를 성공하면 true, 실패하면 false
     */
    public boolean addLikeByActivity(LikeActivityRequest likeActivityRequest, UserPersonalInfo userPersonalInfo) {
        // activityId에 해당하는 활동내역에 본인이 좋아요를 누른 것
        Activity activity = activityRepository.findById(likeActivityRequest.getActivityId()).orElse(null);
        return addLike(activity, userPersonalInfo);
    }

    /**
     * 좋아요 수를 늘려주는 메소드
     *
     * @param likePostRequest postId
     * @param userPersonalInfo userInfo
     * @return 좋아요를 성공하면 true, 실패하면 false
     */
    public boolean addLikeByPost(LikePostRequest likePostRequest, UserPersonalInfo userPersonalInfo) {
        // postID에 해당하는 post에 본인이 좋아요를 누름
        Post post = postRepository.findById(likePostRequest.getPostId()).orElse(null);
        if (post == null) {
            return false;
        }
        return addLike(post.getActivity(), userPersonalInfo);
    }

    /**
     * post와 activity의 좋아요가 공유하기 때문에, 같은 환경에서 좋아요 수를 늘려주기 위해서 만든 메소드
     * 좋아요 수를 늘려줌
     *
     * @param activity activityId
     * @param userPersonalInfo userId
     * @return 좋아요를 추가에 성공하면 true, 실패하면 false
     */
    public boolean addLike(Activity activity, UserPersonalInfo userPersonalInfo) {
        // 내가 해당 활동 내역에 좋아요를 누른 적이 있는지 확인하기
        ActivityLike activityLike = activityLikeRepository
                .findByActivityIdAndUserId(activity, userPersonalInfo).orElse(null);

        if (activityLike == null) {
            // 한번도 안누른 상태
            // 좋아요 눌러주기
            activity.addLikeCnt();
            activityRepository.save(activity);

            createActivityLike(activity, userPersonalInfo);
            return true;
        } else  {
            // 이미 DB에 있는 상황
            if (activityLike.isLike()) {
                // 이미 누른 상태
                return false;
            } else {
                activity.addLikeCnt();
                activityLike.changeIsLike(); // 다시 좋아요 누름

                // 저장
                activityRepository.save(activity);
                activityLikeRepository.save(activityLike);
                return true;
            }
        }
    }

    /**
     * 좋아요 수와 activityId, 좋아요 여부를 합쳐서 반환해주는 메소드
     *
     * @param viewLikeActivityRequest activityId
     * @param userPersonalInfo userInfo
     * @return 좋아요 수, activityId, 좋아요 여부
     */
    public ViewLikeActivityResponse viewLikeActivity(ViewLikeActivityRequest viewLikeActivityRequest, UserPersonalInfo userPersonalInfo) {
        Activity activity = activityRepository.findById(viewLikeActivityRequest.getActivityId()).orElse(null);
        if (activity == null) {
            throw new NoSuchElementException("null 값!");
        }
        int cnt = viewLike(activity);
        boolean isLike = isLike(activity, userPersonalInfo);

        ViewLikeActivityResponse viewLikeActivityResponse = ViewLikeActivityResponse.builder()
                .activityId(viewLikeActivityRequest.getActivityId())
                .cnt(cnt)
                .isLike(isLike)
                .build();

        return  viewLikeActivityResponse;
    }

    /**
     * 좋아요 수와 postId, 좋아요 여부를 합쳐서 반환해주는 메소드
     *
     * @param viewLikePostRequest postId
     * @param userPersonalInfo userInfo
     * @return 좋아요 수, postId, 좋아요 여부
     */
    public ViewLikePostResponse viewLikePost(ViewLikePostRequest viewLikePostRequest, UserPersonalInfo userPersonalInfo) {
        Post post = postRepository.findById(viewLikePostRequest.getPostId()).orElse(null);
        if (post == null) {
            throw new NoSuchElementException("null 값!");
        }
        int cnt = viewLike(post.getActivity());
        boolean isLike = isLike(post.getActivity(), userPersonalInfo);

        ViewLikePostResponse viewLikePostResponse = ViewLikePostResponse.builder()
                .postId(viewLikePostRequest.getPostId())
                .cnt(cnt)
                .isLike(isLike)
                .build();

        return viewLikePostResponse;
    }

    /**
     * 좋아요를 취소해주는 메소드
     *
     * @param disLikeActivityRequest activityId
     * @param userPersonalInfo userInfo
     * @return 좋아요 취소가 성공하면 true, 실패하면 false
     */
    public boolean disLikeByActivity(DisLikeActivityRequest disLikeActivityRequest, UserPersonalInfo userPersonalInfo) {
        // activityId에 해당하는 활동내역에 본인이 좋아요를 누른 것을 취소한 것
        Activity activity = activityRepository.findById(disLikeActivityRequest.getActivityId()).orElse(null);
        return disLike(activity, userPersonalInfo);
    }

    /**
     * 좋아요를 취소해주는 멧드
     *
     * @param disLikePostRequest postId
     * @param userPersonalInfo userInfo
     * @return 좋아요 취소가 성공하면 true, 실패하면 false
     */
    public boolean disLikeByPost(DisLikePostRequest disLikePostRequest, UserPersonalInfo userPersonalInfo) {
        // postID에 해당하는 post에 본인이 누른 좋아요를 취소함
        Post post = postRepository.findById(disLikePostRequest.getPostId()).orElse(null);
        if (post == null) {
            return false;
        }
        return disLike(post.getActivity(), userPersonalInfo);
    }

    /**
     * 만약에 좋아요 여부 테이블에 해당 값이 없다면 추가해주는 메소드
     *
     * @param activity activityId
     * @param userPersonalInfo userInfo
     */
    public void createActivityLike(Activity activity, UserPersonalInfo userPersonalInfo) {
        ActivityLike activityLike = ActivityLike.builder()
                .activityId(activity)
                .userId(userPersonalInfo)
                .build();

        ActivityLike saveData = activityLikeRepository.save(activityLike);
        createActivityLikeLog(saveData);
    }

    /**
     * 좋아요 여부를 가지고 로그로 만들어 주는 메소드
     *
     * @param activityLike 좋아요 여부
     */
    public void createActivityLikeLog(ActivityLike activityLike) {
        ActivityLikeLog activityLikeLog = ActivityLikeLog.builder()
                .activityLike(activityLike)
                .build();

        activityLikeLogRepository.save(activityLikeLog);
    }

    /**
     * 좋아요 수를 반환해주는 메소드
     *
     * @param activity activity
     * @return 좋아요 수
     */
    public int viewLike(Activity activity) {
        return activity.getLikeCnt();
    }

    /**
     * 본인이 해당 게시글에 좋아요를 눌렀는지 여부를 알려주는 메소드
     *
     * @param activity activityId
     * @param userPersonalInfo userInfo
     * @return 해당 게시물에 좋아요를 눌렀다면 true, 아니면 false
     */
    public boolean isLike(Activity activity, UserPersonalInfo userPersonalInfo) {
        ActivityLike activityLike = activityLikeRepository.findByActivityIdAndUserId(activity, userPersonalInfo)
                .orElse(null);

        if (activityLike == null || !activityLike.isLike()) {
            return false;
        }
        return true;
    }

    /**
     * activityId와 userInfo를 가지고 좋아요를 취소해주는 메소드
     *
     * @param activity activityId
     * @param userPersonalInfo userInfo
     * @return 좋아요 취소가 성공하면 true, 실패하면 false
     */
    public boolean disLike(Activity activity, UserPersonalInfo userPersonalInfo) {
        // 내가 해당 활동 내역에 좋아요를 누른 적이 있는지 확인하기
        ActivityLike activityLike = activityLikeRepository
                .findByActivityIdAndUserId(activity, userPersonalInfo).orElse(null);

        if (activityLike == null) {
            // 좋아요를 취소하려면 누를 것이 있어야함!
            return false;
        }

        // 현재 좋아요 상태인지 확인 하기
        if (!activityLike.isLike()) {
            // isLike가 false라는 것은 해당 활동 내역은 좋아요를 안누를 것으로 취소할 수 없음
            return false;
        }

        // 취소 누르기
        activityLike.changeIsLike();
        // 좋아요 수 줄이기
        activity.subLikeCnt();
        // 로그 남기기
        createActivityLikeLog(activityLike);

        activityRepository.save(activity);
        activityLikeRepository.save(activityLike);
        return true;
    }
}
