package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.UserMypageInfo;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.UpdateMypageInfoRequest;
import com.cocochacha.chaeumbackend.dto.UpdateMypageInfoResponse;
import com.cocochacha.chaeumbackend.repository.UserMypageInfoRepository;
import com.cocochacha.chaeumbackend.repository.UserPersonalInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * 사용자 마이페이지 정보를 처리하는 서비스 클래스입니다.
 */
@RequiredArgsConstructor
@Service
public class UserMypageInfoService {

    private final UserPersonalInfoRepository userPersonalInfoRepository;
    private final UserMypageInfoRepository userMypageInfoRepository;

    /**
     * 마이페이지 관련 유저 정보를 갱신합니다
     *
     * @param userId
     * @param updateMypageInfoRequest
     * @return
     */
    @Transactional
    public UpdateMypageInfoResponse updateMypageInfoResponse(Long userId,
            UpdateMypageInfoRequest updateMypageInfoRequest) {

        UserPersonalInfo userPersonalInfo = userPersonalInfoRepository.findById(userId)
                .orElse(null);
        if (userPersonalInfo == null) {
            return null;
        }

        UserMypageInfo userMypageInfo = userMypageInfoRepository.findById(userId)
                .orElse(UserMypageInfo.builder().userPersonalInfo(userPersonalInfo).build());

        UpdateMypageInfoResponse updateMypageInfoResponse = new UpdateMypageInfoResponse();

        if (StringUtils.hasText(updateMypageInfoRequest.getGender())) {
            userMypageInfo.setGender(updateMypageInfoRequest.getGender());
            updateMypageInfoResponse.setGender(updateMypageInfoRequest.getGender());
        }
        if (StringUtils.hasText(updateMypageInfoRequest.getHeight())) {
            userMypageInfo.setHeight(updateMypageInfoRequest.getHeight());
            updateMypageInfoResponse.setHeight(updateMypageInfoRequest.getHeight());
        }
        if (StringUtils.hasText(updateMypageInfoRequest.getWeight())) {
            userMypageInfo.setWeight(updateMypageInfoRequest.getWeight());
            updateMypageInfoResponse.setWeight(updateMypageInfoRequest.getWeight());
        }
        if (StringUtils.hasText(updateMypageInfoRequest.getMbti())) {
            userMypageInfo.setMbti(updateMypageInfoRequest.getMbti());
            updateMypageInfoResponse.setMbti(updateMypageInfoRequest.getMbti());
        }
        if (StringUtils.hasText(updateMypageInfoRequest.getIntroduce())) {
            userMypageInfo.setIntroduce(updateMypageInfoRequest.getIntroduce());
            updateMypageInfoResponse.setIntroduce(updateMypageInfoRequest.getIntroduce());
        }
        if (StringUtils.hasText(updateMypageInfoRequest.getBackgroundUrl())) {
            userMypageInfo.setBackgroundUrl(updateMypageInfoRequest.getBackgroundUrl());
            updateMypageInfoResponse.setBackgroundUrl(updateMypageInfoRequest.getBackgroundUrl());
        }
        if (StringUtils.hasText(updateMypageInfoRequest.getProfileImageUrl())) {
            userPersonalInfo.setProfileImageUrl(updateMypageInfoRequest.getProfileImageUrl());
            updateMypageInfoResponse.setProfileImageUrl(
                    updateMypageInfoRequest.getProfileImageUrl());
        }

        userPersonalInfoRepository.save(userPersonalInfo);
        userMypageInfoRepository.save(userMypageInfo);

        return updateMypageInfoResponse;
    }

    public UserMypageInfo findMypageInfo(UserPersonalInfo userPersonalInfo) {

        UserMypageInfo userMypageInfo = userMypageInfoRepository.findById(userPersonalInfo.getId()).orElse(null);
        if (userMypageInfo == null) {
            userMypageInfo = userMypageInfoRepository.save(UserMypageInfo.builder().userPersonalInfo(userPersonalInfo).build());
        }

        return userMypageInfo;
    }
}
