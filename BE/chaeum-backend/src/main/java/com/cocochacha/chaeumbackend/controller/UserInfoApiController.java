package com.cocochacha.chaeumbackend.controller;

import com.cocochacha.chaeumbackend.domain.UserMypageInfo;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.MyPersonalInfoRequest;
import com.cocochacha.chaeumbackend.dto.MyPersonalInfoResponse;
import com.cocochacha.chaeumbackend.dto.SearchMypageInfoResponse;
import com.cocochacha.chaeumbackend.dto.UpdateMypageInfoRequest;
import com.cocochacha.chaeumbackend.dto.UpdateMypageInfoResponse;
import com.cocochacha.chaeumbackend.dto.UserMypageInfoResponse;
import com.cocochacha.chaeumbackend.service.UserMypageInfoService;
import com.cocochacha.chaeumbackend.service.UserPersonalInfoService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 사용자 개인 정보를 다루는 API 컨트롤러입니다.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserInfoApiController {

    private final UserPersonalInfoService userPersonalInfoService;
    private final UserMypageInfoService userMypageInfoService;

    /**
     * 현재 인증된 사용자의 정보를 가져와서 MyInfoResponse 객체로 응답합니다.
     *
     * @return 현재 인증된 사용자의 정보를 담은 MyInfoResponse 객체를 ResponseEntity로 응답합니다.
     * @throws IllegalArgumentException 인자가 유효하지 않을 때 발생하는 예외
     */
    @GetMapping("/me")
    public ResponseEntity<MyPersonalInfoResponse> myInfoResponseEntity() {
        Long userId = getUserIDFromAuthentication();
        MyPersonalInfoResponse myPersonalInfoResponse = userPersonalInfoService.getMyPersonalInfo(
                userId);
        return ResponseEntity.ok(myPersonalInfoResponse);
    }

    /**
     * 주어진 닉네임의 중복 여부를 체크하는 API 엔드포인트입니다.
     *
     * @param nickname 검사할 닉네임
     * @return 닉네임이 중복되지 않을 때 true를, 중복될 때 false를 ResponseEntity로 응답합니다.
     */
    @GetMapping("/duplication-check")
    public ResponseEntity<Boolean> nicknameDuplicationCheck(@RequestParam String nickname) {
        Long userId = getUserIDFromAuthentication();
        boolean isNicknameAvailable = userPersonalInfoService.isNicknameAvailable(userId, nickname);
        return ResponseEntity.ok(isNicknameAvailable);
    }

    /**
     * 유저 정보를 초기 설정하는 API 엔드포인트입니다.
     *
     * @param myInfo MyPersonalInfoRequest 객체로 전달된 초기 설정 정보
     * @return 유저 정보 초기 설정이 성공하면 true를, 닉네임이 이미 사용 중일 경우 false를 ResponseEntity로 응답합니다.
     */
    @PatchMapping("/me")
    public ResponseEntity<Boolean> setMyInfo(@RequestBody MyPersonalInfoRequest myInfo) {
        Long userId = getUserIDFromAuthentication();
        String newNickname = myInfo.getNickname();
        boolean isNicknameAvailable = userPersonalInfoService.isNicknameAvailable(userId,
                newNickname);

        if (!isNicknameAvailable) {
            return ResponseEntity.ok(false);
        }

        userPersonalInfoService.updateUserPersonalInfo(userId, newNickname);
        return ResponseEntity.ok(true);
    }

    /**
     * 마이페이지 회원정보를 수정하는 API 엔드포인트입니다.
     *
     * @param updateMypageInfoRequest
     * @return
     */
    @PatchMapping("/mypage-info")
    public ResponseEntity<?> updateMypageInfo(
            @RequestPart UpdateMypageInfoRequest updateMypageInfoRequest,
            @RequestPart MultipartFile updateMypageProfileImage,
            @RequestPart MultipartFile updateMypageBackgroundImage) {
        Long userId = getUserIDFromAuthentication();
        UpdateMypageInfoResponse updateMypageInfoResponse = null;
        try {
            updateMypageInfoResponse = userMypageInfoService.updateMypageInfoResponse(
                    userId, updateMypageInfoRequest, updateMypageProfileImage,
                    updateMypageBackgroundImage);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (updateMypageInfoResponse == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(updateMypageInfoResponse);
    }

    /**
     * 닉네임이 일치하는 등록된 회원의 마이페이지 회원정보를 읽어오는 API 엔드포인트입니다.
     *
     * @param nickname
     * @return
     */
    @GetMapping("/mypage-info")
    public ResponseEntity<?> userMypageInfo(@RequestParam String nickname) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoService.findRegisteredUsersByNickname(
                nickname);
        if (userPersonalInfo == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        UserMypageInfo userMypageInfo = userMypageInfoService.findMypageInfo(userPersonalInfo);
        if (userMypageInfo == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        UserMypageInfoResponse userMypageInfoResponse = UserMypageInfoResponse.builder()
                .nickname(nickname)
                .mbti(userMypageInfo.getMbti())
                .introduce(userMypageInfo.getIntroduce())
                .backgroundUrl(userMypageInfo.getBackgroundUrl())
                .profileImageUrl(userPersonalInfo.getProfileImageUrl())
                .mainColor(userMypageInfo.getMainColor())
                .build();

        if (userMypageInfo.getId().equals(getUserIDFromAuthentication())) {
            userMypageInfoResponse.setGender(userMypageInfo.getGender());
            userMypageInfoResponse.setHeight(userMypageInfo.getHeight());
            userMypageInfoResponse.setWeight(userMypageInfo.getWeight());
        }

        return new ResponseEntity<>(userMypageInfoResponse, HttpStatus.OK);
    }

    /**
     * 닉네임에 키워드를 포함하는 유저 리스트를 검색하여 유사도 순으로 보여줍니다
     *
     * @param keyword
     * @return
     */
    @GetMapping("/nickname-search")
    public ResponseEntity<?> userNicknameSearch(@RequestParam String keyword) {

        List<UserPersonalInfo> userPersonalInfoList = userPersonalInfoService.findAllByNicknameOrderBySimilarity(
                keyword);
        if (userPersonalInfoList == null || userPersonalInfoList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<SearchMypageInfoResponse> searchMypageInfoResponseList = new ArrayList<>();
        for (UserPersonalInfo userPersonalInfo : userPersonalInfoList) {
            UserMypageInfo userMypageInfo = userMypageInfoService.findMypageInfo(userPersonalInfo);

            searchMypageInfoResponseList.add(SearchMypageInfoResponse.builder()
                    .nickname(userPersonalInfo.getNickname())
                    .mbti(userMypageInfo.getMbti())
                    .profileImageUrl(userPersonalInfo.getProfileImageUrl())
                    .mainColor(userMypageInfo.getMainColor())
                    .build());
        }

        return new ResponseEntity<>(searchMypageInfoResponseList, HttpStatus.OK);
    }

    private Long getUserIDFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }
}
