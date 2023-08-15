package com.cocochacha.chaeumbackend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Category;
import com.cocochacha.chaeumbackend.domain.File;
import com.cocochacha.chaeumbackend.domain.FriendRelationship;
import com.cocochacha.chaeumbackend.domain.Post;
import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.StreakInfo;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreatePostRequest;
import com.cocochacha.chaeumbackend.dto.DeletePostRequest;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;
import com.cocochacha.chaeumbackend.repository.FriendRelationshipRepository;
import com.cocochacha.chaeumbackend.repository.PostRepository;
import com.cocochacha.chaeumbackend.repository.StreakInfoRepository;
import com.cocochacha.chaeumbackend.repository.StreakRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SnsServiceImpl implements SnsService {

    @Autowired
    StreakRepository streakRepository;

    @Autowired
    ActivityRepository activityRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    StreakInfoRepository streakInfoRepository;

    @Autowired
    FriendRelationshipRepository friendRelationshipRepository;

    @Autowired
    AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    /**
     * User의 친구를 확인하고 액티브 중인 친구들 리스트를 반환한다.
     *
     * @param userPersonalInfo
     * @return List<GetActiveResponse> List<(친구 이름, 액티브 시작 시간, 스트릭 이름, 액티비티 id)>
     */
    @Override
    public List<GetActiveResponse> getActiveResponseList(UserPersonalInfo userPersonalInfo) {

        // 친구 리스트를 얻어내기
        List<FriendRelationship> friendInfoList = friendRelationshipRepository.findByToIdAndIsFriendIsTrue(
                userPersonalInfo).orElse(null);

        // 반환할 리스트 선언
        List<GetActiveResponse> activeResponseList = new ArrayList<>();

        for (FriendRelationship friendShip : friendInfoList) {

            // 친구의 스트릭 목록을 가져오기
            List<Streak> streakList = streakRepository.findStreaksByUserPersonalInfoAndStreakDeletedIsFalse(
                    friendShip.getFromId()).orElse(null);

            // 친구의 스트릭이 없다면 다른 친구 확인하기
            if (streakList == null) {
                continue;
            }

            // 스트릭리스트를 확인
            for (Streak streak : streakList) {
                // 활동내역 중 가장 최근의 값을 가져온다.
                Activity activity = activityRepository.findTopByStreakIdOrderByActivityStartTimeDesc
                        (streak).orElse(null);

                // 활동 내역이 없다면 다음 스트릭을 탐색한다.
                if (activity == null) {
                    continue;
                }

                // 활동 내역이 있고 아직 endTime이 설정되지 않았다면
                // 활동 중이므로 list에 추가한다.
                if (activity.getActivityEndTime() == null) {
                    GetActiveResponse activeResponse = GetActiveResponse.builder()
                            .activityId(activity.getId())
                            .activeStartTime(activity.getActivityStartTime())
                            .friendName(friendShip.getFromId().getNickname())
                            .streakName(streak.getStreakName())
                            .streakId(streak.getStreakId())
                            .activityId(activity.getId())
                            .profileUrl(friendShip.getFromId().getProfileImageUrl())
                            .build();
                    activeResponseList.add(activeResponse);
                    break;
                }
            }

        }

        return activeResponseList;
    }

    /**
     * 피드 작성하는 함수
     * 활동 내역을 뽑아와서 이미 글이 작성 되어있다면 false 리턴
     * 파일 리스트들을 받아서 파일들을 모두 올려준다.
     *
     *
     * @param createPostRequest
     * @param userPersonalInfo
     * @return 피드가 잘 작성되었는지
     */
    @Override
    @Transactional
    public boolean createPost(CreatePostRequest createPostRequest,
            UserPersonalInfo userPersonalInfo, List<MultipartFile> fileLists) throws IOException{

        // 활동 내역 뽑아오기
        Activity activity = activityRepository.findById(createPostRequest.getActivityId()).orElse(null);

        // 활동 내역이 존재하는지 확인
        if(activity== null)
            return false;
        if(activity.isActivityIsPost())
            return false;
        // 활동내역과 연결된 스트릭의 유저와 현재 추가하려는 유저가 같은지 확인
        if(!activity.getStreakId().getUserPersonalInfo().equals(userPersonalInfo))
            return false;

        // 이미지 파일 업로드
        List<File> fileList = new ArrayList<>();
        if(fileLists != null) {
            for (MultipartFile multipartFile : fileLists) {
                if(multipartFile.isEmpty()) continue;
                String tmpUrl = saveFile(multipartFile);
                fileList.add(File.builder()
                                .fileUrl(tmpUrl)
                                .build());
            }
        }

        // 이미지 추가시 변경해야한다. cretePostRequest 도 변경해야한다.
        Post post = Post.builder()
                .postTime(createPostRequest.getCreateTime())
                .postContent(createPostRequest.getContent())
                .userPersonalInfo(userPersonalInfo)
                .postEnable(true)
                .fileList(fileList)
                .activity(activity)
                .build();

        activity.changeActivityIsPost();

        return post.equals(postRepository.save(post));
    }

    /**
     * 피드 삭제 하는 함수
     *
     * @param deletePostRequest (피드_번호)
     * @param userPersonalInfo  유저 정보
     * @return 피드가 존재하고 삭제 했다면 True
     */

    @Override
    @Transactional
    public boolean deletePost(DeletePostRequest deletePostRequest,
            UserPersonalInfo userPersonalInfo) {

        // post를 찾는다.
        Post post = postRepository.findById(deletePostRequest.getPostId()).orElse(null);

        if (!post.getUserPersonalInfo().equals(userPersonalInfo)) {
            return false;
        }

        Activity activity = activityRepository.findById(post.getActivity().getId())
                .orElse(null);

        if (activity == null) {
            return false;
        }

        if(!activity.isActivityIsPost()){
            return false;
        }

        post.changePostEnable();

        activity.changeActivityIsPost();

        return true;
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
