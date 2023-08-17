package com.cocochacha.chaeumbackend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.cocochacha.chaeumbackend.domain.UserMypageInfo;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.UpdateMypageInfoRequest;
import com.cocochacha.chaeumbackend.dto.UpdateMypageInfoResponse;
import com.cocochacha.chaeumbackend.repository.UserMypageInfoRepository;
import com.cocochacha.chaeumbackend.repository.UserPersonalInfoRepository;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * 사용자 마이페이지 정보를 처리하는 서비스 클래스입니다.
 */
@RequiredArgsConstructor
@Service
public class UserMypageInfoService {

    private final UserPersonalInfoRepository userPersonalInfoRepository;

    private final UserMypageInfoRepository userMypageInfoRepository;

    AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * 마이페이지 관련 유저 정보를 갱신합니다
     *
     * @param userId
     * @param updateMypageInfoRequest
     * @return
     */
    @Transactional
    public UpdateMypageInfoResponse updateMypageInfoResponse(Long userId,
            UpdateMypageInfoRequest updateMypageInfoRequest,
            MultipartFile updateMypageProfileImage,
            MultipartFile updateMypageBackgroundImage)
            throws IOException {

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
        if (StringUtils.hasText(updateMypageInfoRequest.getMainColor())) {
            userMypageInfo.setMainColor(updateMypageInfoRequest.getMainColor());
            updateMypageInfoResponse.setMainColor(updateMypageInfoRequest.getMainColor());
        }
        if (updateMypageProfileImage != null && !updateMypageProfileImage.isEmpty()) {
            String backgroundUrl = saveFile(updateMypageProfileImage);

            userMypageInfo.setBackgroundUrl(backgroundUrl);
            updateMypageInfoResponse.setBackgroundUrl(backgroundUrl);
        }
        if (updateMypageBackgroundImage != null && !updateMypageBackgroundImage.isEmpty()) {
            String profileImageUrl = saveFile(updateMypageBackgroundImage);

            userPersonalInfo.setProfileImageUrl(profileImageUrl);
            updateMypageInfoResponse.setProfileImageUrl(profileImageUrl);
        }

        userPersonalInfoRepository.save(userPersonalInfo);
        userMypageInfoRepository.save(userMypageInfo);

        return updateMypageInfoResponse;
    }

    public UserMypageInfo findMypageInfo(UserPersonalInfo userPersonalInfo) {

        UserMypageInfo userMypageInfo = userMypageInfoRepository.findById(userPersonalInfo.getId())
                .orElse(null);
        if (userMypageInfo == null) {
            userMypageInfo = userMypageInfoRepository.save(
                    UserMypageInfo.builder().userPersonalInfo(userPersonalInfo).build());
        }

        return userMypageInfo;
    }

    /**
     * 파일을 s3에 저장하는 함수
     *
     * @param multipartFile
     * @return 파일url
     * @throws IOException
     */
    public String saveFile(MultipartFile multipartFile) throws IOException {
        // 원래 파일의 이름
        String originalFilename = multipartFile.getOriginalFilename();
        // s3에 들어갈 파일 이름
        String s3FileName = UUID.randomUUID() + "-" + originalFilename;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        // s3에 이미지를 저장해준다.
        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, s3FileName).toString();
    }
}
