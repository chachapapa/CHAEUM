package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.*;
import com.cocochacha.chaeumbackend.service.ActivityLikeService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/sns")
public class ActivityLikeController {
    @Autowired
    private UserPersonalInfoService userPersonalInfoService;
    @Autowired
    private ActivityLikeService activityLikeService;

    /**
     * 좋아요 요청에 대한 응답 메소드
     * 해당 메소드는 activityId로 동작
     *
     * @param likeActivityRequest activityId
     * @return 좋아요에 성공하면 true, 실패하면 false
     */
    @PatchMapping("/like-activity")
    public ResponseEntity<?> addLikeByActivity(@RequestBody LikeActivityRequest likeActivityRequest) {
        // 활동 내역 좋아요 하기 - 활동 내역에서
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());
        if (activityLikeService.addLikeByActivity(likeActivityRequest, userPersonalInfo)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 좋아요 요청에 대한 응답 메소드
     * 해당 메소드는 postId로 동작
     *
     * @param likePostRequest postId
     * @return 좋아요 성공하면 true, 실패하면 false
     */
    @PatchMapping("/like-post")
    public ResponseEntity<?> addLikeByPost(@RequestBody LikePostRequest likePostRequest) {
        // 활동 내역 좋아요 하기 - 게시글에서
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());
        if (activityLikeService.addLikeByPost(likePostRequest, userPersonalInfo)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 좋아요 수를 보기 위한 요청에 대한 응답
     *
     * @param activityId activityId
     * @return activityId, 좋아요 수
     */
    @GetMapping("/like-activity")
    public ResponseEntity<?> viewLikeByActivity(@RequestParam int activityId) {
        ViewLikeActivityRequest viewLikeActivityRequest = new ViewLikeActivityRequest();
        viewLikeActivityRequest.setActivityId(activityId);

        try {
            ViewLikeActivityResponse viewLikeActivityResponse = activityLikeService.viewLikeActivity(viewLikeActivityRequest);
            return new ResponseEntity<>(viewLikeActivityResponse, HttpStatus.OK);
        } catch (NoSuchElementException NSEE) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 좋아요 수를 보기 위한 요청에 대한 응답
     *
     * @param postId postId
     * @return postId, 좋아요 수
     */
    @GetMapping("/like-post")
    public ResponseEntity<?> viewLikeByPost(@RequestParam int postId) {
        ViewLikePostRequest viewLikePostRequest = new ViewLikePostRequest();
        viewLikePostRequest.setPostId(postId);

        try {
            ViewLikePostResponse viewLikePostResponse = activityLikeService.viewLikePost(viewLikePostRequest);
            return new ResponseEntity<>(viewLikePostResponse, HttpStatus.OK);
        } catch (NoSuchElementException NSEE) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 헤더에서 UserId를 추출하는 함수
     *
     * @return UserId
     */
    private Long getUserIDFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }

}
