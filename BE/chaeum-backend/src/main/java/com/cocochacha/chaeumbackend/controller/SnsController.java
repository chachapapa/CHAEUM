package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateReplyRequest;
import com.cocochacha.chaeumbackend.dto.CreatePostRequest;
import com.cocochacha.chaeumbackend.dto.DeletePostRequest;
import com.cocochacha.chaeumbackend.dto.DeleteReplyRequest;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import com.cocochacha.chaeumbackend.service.SnsService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/sns")
public class SnsController {

    @Autowired
    UserPersonalInfoService userPersonalInfoService;

    @Autowired
    SnsService snsService;

    /**
     * 친구이면서 액티브 중인 사람의 리스트를 반환해준다.
     *
     * @return List<GetActiveResponse> List<(친구 이름, 액티브 시작 시간, 스트릭 이름, 액티비티 id)>
     */
    @GetMapping("/active")
    public ResponseEntity<?> getActiveList() {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        List<GetActiveResponse> getActiveResponseList = snsService.getActiveResponseList(
                userPersonalInfo);
        return new ResponseEntity<>(getActiveResponseList, HttpStatus.OK);
    }

    /**
     * 액티브에서 응원글을 등록하는 함수
     *
     * @param createReplyRequest ( 활동내역_id, 댓글 내용 )
     * @return
     */
    @PostMapping("/cheering")
    public ResponseEntity<?> createCheering(
            @RequestBody CreateReplyRequest createReplyRequest) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (snsService.createReply(createReplyRequest, userPersonalInfo, true)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestPart CreatePostRequest createPostRequest,
                                        @RequestPart List<MultipartFile> fileList) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        try {
            if (snsService.createPost(createPostRequest, userPersonalInfo, fileList)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_ACCEPTABLE);
    }

    @PatchMapping("/delete")
    public ResponseEntity<?> deletePost(@RequestBody DeletePostRequest deletePostRequest) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (snsService.deletePost(deletePostRequest, userPersonalInfo)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
    }

    @PostMapping("/comment")
    public ResponseEntity<?> createReply(@RequestBody CreateReplyRequest createReplyRequest) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (snsService.createReply(createReplyRequest, userPersonalInfo, false)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/comment")
    public ResponseEntity<?> deleteReply(@RequestBody DeleteReplyRequest deleteReplyRequest) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(
                getUserIDFromAuthentication());

        if (snsService.deleteReply(deleteReplyRequest, userPersonalInfo)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
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
