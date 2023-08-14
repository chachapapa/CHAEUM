package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.AcceptFriendRequest;
import com.cocochacha.chaeumbackend.dto.AddFriendRequest;
import com.cocochacha.chaeumbackend.dto.CancelAddFriendRequest;
import com.cocochacha.chaeumbackend.dto.RejectFriendRequest;
import com.cocochacha.chaeumbackend.service.FriendService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/user")
public class FriendController {

    @Autowired
    private FriendService friendService;

    @Autowired
    private UserPersonalInfoService userPersonalInfoService;

    /**
     * 친구 신청에 대한 응답을 처리해주는 메소드
     *
     * @param addFriendRequest 친구가 되고 싶은 사람의 아이디(친구 신청을 받는 사람의 아이디)
     * @return 성공, 실패 여부
     */
    @PostMapping("/add")
    public ResponseEntity<?> addFriend(@RequestBody AddFriendRequest addFriendRequest) {
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());
        if (friendService.addFriend(addFriendRequest, userPersonalInfo)) {
            return new ResponseEntity<>("친구 신청 완료", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("친구 신청 실패", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 친구 신청 수락에 대한 응답을 주는 메소드
     *
     * @param acceptFriendRequest 친구 신청을 한 사람의 닉네임
     * @return 성공, 실패 여부
     */
    @PostMapping("/accept")
    public ResponseEntity<?> acceptFriend(@RequestBody AcceptFriendRequest acceptFriendRequest) {
        // 친구 요청 수락
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());
        if (friendService.acceptFriend(acceptFriendRequest, userPersonalInfo)) {
            return new ResponseEntity<>("친구 신청 수락 완료", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("친구 신청 수락 실패", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 친구 신청 거절에 대한 응답에 요청을 해주는 메소드
     *
     * @param rejectFriendRequest 친구를 신청한 사람의 아이디, 즉, 본인한테 친구 신청을 한 사람의 아이디
     * @return 거절 성공, 실패 여부
     */
    @PatchMapping("/reject")
    public ResponseEntity<?> rejectFriend(@RequestBody RejectFriendRequest rejectFriendRequest) {
        // 내가 누르는 것, 즉 친구를 요청한 사람의 닉네임이 들어옴
        /*
            reject의 핵심은 친구 신청을 거절 했다는 것임 => DB에 true 들어감
            근데 DB가 false라고 해서 거절을 안한 것(수락)을 한 것이 아님
            그냥 무시한 것 일수도 있음
         */
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());
        try {
            friendService.rejectFriend(rejectFriendRequest, userPersonalInfo);
            return new ResponseEntity<>("친구 신청 취소 완료", HttpStatus.OK);
        } catch (NoSuchElementException NSEE) {
            return new ResponseEntity<>("친구 신청 취소 실패", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 친구 신청 취소에 대한 응답에 요청을 해주는 메소드
     *
     * @param cancelAddFriendRequest 본인이 친구 신청을 보낸 사람의 닉네임
     * @return 친구 신청 취소 성공, 실패 여부
     */
    @PatchMapping("/cancel")
    public ResponseEntity<?> cancelAddFriend(@RequestBody CancelAddFriendRequest cancelAddFriendRequest) {
        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findById(getUserIDFromAuthentication());
        try {
            friendService.cancelAddFriend(cancelAddFriendRequest, userPersonalInfo);
            return new ResponseEntity<>("친구 신청 취소 완료", HttpStatus.OK);
        } catch (NoSuchElementException NSEE) {
            return new ResponseEntity<>("친구 신청 취소 실패", HttpStatus.BAD_REQUEST);
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
