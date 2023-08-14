package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.AcceptFriendRequest;
import com.cocochacha.chaeumbackend.dto.AddFriendRequest;
import com.cocochacha.chaeumbackend.service.FriendService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
     * 헤더에서 UserId를 추출하는 함수
     *
     * @return UserId
     */
    private Long getUserIDFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }
}
