package com.cocochacha.chaeumbackend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.cocochacha.chaeumbackend.domain.Activity;
import com.cocochacha.chaeumbackend.domain.Category;
import com.cocochacha.chaeumbackend.domain.File;
import com.cocochacha.chaeumbackend.domain.FriendRelationship;
import com.cocochacha.chaeumbackend.domain.Post;
import com.cocochacha.chaeumbackend.domain.Reply;
import com.cocochacha.chaeumbackend.domain.Streak;
import com.cocochacha.chaeumbackend.domain.StreakInfo;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateReplyRequest;
import com.cocochacha.chaeumbackend.dto.CreatePostRequest;
import com.cocochacha.chaeumbackend.dto.DeletePostRequest;
import com.cocochacha.chaeumbackend.dto.DeleteReplyRequest;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import com.cocochacha.chaeumbackend.dto.GetPostRequest;
import com.cocochacha.chaeumbackend.dto.GetPostResponse;
import com.cocochacha.chaeumbackend.dto.GetReplyResponse;
import com.cocochacha.chaeumbackend.repository.ActivityRepository;
import com.cocochacha.chaeumbackend.repository.FriendRelationshipRepository;
import com.cocochacha.chaeumbackend.repository.PostRepository;
import com.cocochacha.chaeumbackend.repository.ReplyRepository;
import com.cocochacha.chaeumbackend.repository.StreakInfoRepository;
import com.cocochacha.chaeumbackend.repository.StreakRepository;
import com.cocochacha.chaeumbackend.repository.UserPersonalInfoRepository;
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
    ReplyRepository replyRepository;

    @Autowired
    StreakInfoRepository streakInfoRepository;

    @Autowired
    FriendRelationshipRepository friendRelationshipRepository;

    @Autowired
    UserPersonalInfoRepository userPersonalInfoRepository;

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

                List<String> tagList = new ArrayList<>();

                // tag 정보를 가져오기 위한 streakInfo 리스트
                List<StreakInfo> streakInfos = streakInfoRepository
                        .findAllByStreak(streak)
                        .orElse(null);

                for (StreakInfo streakInfo : streakInfos) {
                    tagList.add(streakInfo.getTag().getTagName());
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
                            .streakColor(streak.getStreakColor())
                            .activityId(activity.getId())
                            .profileUrl(friendShip.getFromId().getProfileImageUrl())
                            .tagList(tagList)
                            .build();
                    activeResponseList.add(activeResponse);
                    break;
                }
            }

        }

        return activeResponseList;
    }

    /**
     * 피드 작성하는 함수 활동 내역을 뽑아와서 이미 글이 작성 되어있다면 false 리턴 파일 리스트들을 받아서 파일들을 모두 올려준다.
     *
     * @param createPostRequest
     * @param userPersonalInfo
     * @return 피드가 잘 작성되었는지
     */
    @Override
    @Transactional
    public boolean createPost(CreatePostRequest createPostRequest,
                              UserPersonalInfo userPersonalInfo, List<MultipartFile> fileLists) throws IOException {

        // 활동 내역 뽑아오기
        Activity activity = activityRepository.findById(createPostRequest.getActivityId()).orElse(null);

        // 활동 내역이 존재하는지 확인
        if (activity == null) {
            return false;
        }
        if (activity.isActivityIsPost()) {
            return false;
        }
        // 활동내역과 연결된 스트릭의 유저와 현재 추가하려는 유저가 같은지 확인
        if (!activity.getStreakId().getUserPersonalInfo().equals(userPersonalInfo)) {
            return false;
        }

        // 이미지 파일 업로드
        List<File> fileList = new ArrayList<>();
        if (fileLists != null) {
            for (MultipartFile multipartFile : fileLists) {
                if (multipartFile.isEmpty()) {
                    continue;
                }
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

        if (!activity.isActivityIsPost()) {
            return false;
        }

        post.changePostEnable();

        activity.changeActivityIsPost();

        return true;
    }

    /**
     * 댓글 작성하는 함수
     *
     * @param createReplyRequest ( 활동내역_Id, 댓글_내용, 댓글_작성_시간 )
     * @param userPersonalInfo   User 정보
     * @param isCheer            응원글이라면 True
     * @return 생성이 잘 되었느지
     */

    @Override
    @Transactional
    public boolean createReply(CreateReplyRequest createReplyRequest,
                               UserPersonalInfo userPersonalInfo, boolean isCheer) {

        Reply reply = Reply.builder()
                .isCheer(isCheer)
                .content(createReplyRequest.getComment())
                .replyDeleted(false)
                .activityId(activityRepository.findById(createReplyRequest.getActivityId())
                        .orElse(null))
                .userId(userPersonalInfo)
                .build();

        return reply.equals(replyRepository.save(reply));
    }

    @Override
    @Transactional
    public boolean deleteReply(DeleteReplyRequest deleteReplyRequest,
                               UserPersonalInfo userPersonalInfo) {

        // 댓글을 댓글 번호로 찾아서 삭제 한다.
        Reply reply = replyRepository.findById(deleteReplyRequest.getReplyId()).orElse(null);

        if (!reply.getUserId().equals(userPersonalInfo)) {
            return false;
        }

        reply.changeDeleted();

        return true;
    }

    /**
     * 친구의 피드를 먼저 보여주고, 내 스트릭들과 연관된 피드를 제공하는 함수
     *
     * @param getPostRequest   idx가 들어있다.
     * @param userPersonalInfo 유저_정보
     * @return 피드 정보, 댓글 리스트, 태그 리스트 들을 모두 넘겨준다.
     */
    @Override
    public List<GetPostResponse> getPostResponseList(GetPostRequest getPostRequest,
                                                     UserPersonalInfo userPersonalInfo) {

        // 리턴할 값
        List<GetPostResponse> postResponseList = new ArrayList<>();

        // 친구 리스트
        List<UserPersonalInfo> friends = new ArrayList<>();

        // 카테고리 리스트
        List<Integer> categories = new ArrayList<>();

        // 친구 및 모르는 사람 포스트 리스트
        List<Post> friendPostList = new ArrayList<>();
        List<Post> strangerPostList = new ArrayList<>();

        // 모르는 사람들의 포스트를 확인하기 위한 카테고리 저장
        for (Streak streak : streakRepository
                .findStreaksByUserPersonalInfoAndStreakDeletedIsFalse(userPersonalInfo)
                .orElse(null)) {
            categories.add(streak.getCategory().getCategoryId());
        }

        // 모든 포스트를 확인해서 친구의 것인지 아닌지 확인
        for (Post post : postRepository.findAllByPostEnableIsTrueOrderByPostIdDesc()) {
            // 내 포스트라면 넘어간다.
//            if(userPersonalInfo.equals(post.getUserPersonalInfo()))
//                continue;

            // 친구 포스트라면 친구포스트 리스트에 넣어준다
            if (friends.contains(post.getUserPersonalInfo())) {
                friendPostList.add(post);
            } else {
                // 사용자의 스트릭 아이디의 카테고리 중 일치하는 것이 있다면 가져오기
                if (categories.contains(
                        post.getActivity().getStreakId().getCategory().getCategoryId())) {
                    strangerPostList.add(post);
                }
            }
        }

        // 친구의 포스트인지 확인하기 위한 변수들
        int friendCnt = friendPostList.size();
        int cnt = 0;

        // 친구 포스트 뒤에 모르는 사람의 포스트를 더함
        friendPostList.addAll(strangerPostList);

        // 모든 포스트들에 대한 댓글 등등 넣어준다.
        for (Post post : friendPostList) {

            // 포스트에 해당하는 댓글들 가져오기
            List<Reply> replyList = replyRepository
                    .findAllByActivityIdAndReplyDeletedIsFalse(post.getActivity());

            List<String> tagList = new ArrayList<>();

            // tag 정보를 가져오기 위한 streakInfo 리스트
            List<StreakInfo> streakInfos = streakInfoRepository
                    .findAllByStreak(post.getActivity().getStreakId())
                    .orElse(null);

            for (StreakInfo streakInfo : streakInfos) {
                tagList.add(streakInfo.getTag().getTagName());
            }

            // 댓글들을 가져와서 대댓글과 댓글로 정렬하기
            List<GetReplyResponse> replySortList = new ArrayList<>();
            Map<Long, List<GetReplyResponse>> replyMap = new HashMap<>();

            // 댓글들을 가져와서 대댓글, 댓글로 분류하기
            for (Reply reply : replyList) {

                GetReplyResponse replyResponse = GetReplyResponse.builder()
                        .replyId(reply.getReplyId())
                        .content(reply.getContent())
                        .isCheer(reply.getIsCheer())
                        .rereplyId(reply.getRereplyId())
                        .build();

                if (reply.getRereplyId() == null) {
                    replySortList.add(replyResponse);
                } else {
                    // 대댓글을 댓글의 해쉬맵 안에 넣어서 관리한다.
                    replyMap.computeIfAbsent(reply.getRereplyId(), k -> new ArrayList<>())
                            .add(replyResponse);
                }
            }

            for (GetReplyResponse replyResponse : replySortList) {
                List<GetReplyResponse> replies = replyMap.getOrDefault(replyResponse.getReplyId(),
                        Collections.emptyList());
                replyResponse.setReplies(replies);
            }

            List<String> fileList = new ArrayList<>();
            for (File file : post.getFileList()) {
                fileList.add(file.getFileUrl());
            }

            // 댓글, 파일리스트, 포스트 관련 내용들을 모두 한 dto에 담는다.
            GetPostResponse getPostResponse = GetPostResponse.builder()
                    .postId(post.getPostId())
                    .activityId(post.getActivity().getId())
                    .postContent(post.getPostContent())
                    .postTime(post.getPostTime())
                    .replyList(replySortList)
                    .tagList(tagList)
                    .profileUrl(post.getUserPersonalInfo().getProfileImageUrl())
                    .nickname(post.getUserPersonalInfo().getNickname())
                    .imageList(fileList)
                    .isFriend(true)
                    .streakColor(post.getActivity().getStreakId().getStreakColor())
                    .build();

            if (cnt++ <= friendCnt) {
                getPostResponse.setFriend(false);
            }

            // dto 리스트에 저장
            postResponseList.add(getPostResponse);
        }

        // 리스트에 저장된 값들을 무한 스크롤로 보내는데
        // 이거 매번 완탐으로 하는데 괜찮은건가....
        return postResponseList.stream().skip(getPostRequest.getIdx())
                .limit(10).collect(Collectors.toList());
    }

    @Override
    public List<GetPostResponse> getPostByNickname(String nickName, UserPersonalInfo userPersonalInfo){

        List<GetPostResponse> postResponseList = new ArrayList<>();
        List<Post> postList = new ArrayList<>();

        if(nickName.equals(userPersonalInfo.getNickname())){
            postList = postRepository.findAllByUserPersonalInfoAndPostEnableIsTrueOrderByPostIdDesc(userPersonalInfo);
        }
        else{
            UserPersonalInfo user = userPersonalInfoRepository.findByNicknameAndIsRegistered(nickName, true).orElse(null);
            postList = postRepository.findAllByUserPersonalInfoAndPostEnableIsTrueOrderByPostIdDesc(user);
        }

        // 모든 포스트들에 대한 댓글 등등 넣어준다.
        for (Post post : postList) {

            // 포스트에 해당하는 댓글들 가져오기
            List<Reply> replyList = replyRepository
                    .findAllByActivityIdAndReplyDeletedIsFalse(post.getActivity());

            List<String> tagList = new ArrayList<>();

            // tag 정보를 가져오기 위한 streakInfo 리스트
            List<StreakInfo> streakInfos = streakInfoRepository
                    .findAllByStreak(post.getActivity().getStreakId())
                    .orElse(null);

            for (StreakInfo streakInfo : streakInfos) {
                tagList.add(streakInfo.getTag().getTagName());
            }

            // 댓글들을 가져와서 대댓글과 댓글로 정렬하기
            List<GetReplyResponse> replySortList = new ArrayList<>();
            Map<Long, List<GetReplyResponse>> replyMap = new HashMap<>();

            // 댓글들을 가져와서 대댓글, 댓글로 분류하기
            for (Reply reply : replyList) {

                GetReplyResponse replyResponse = GetReplyResponse.builder()
                        .replyId(reply.getReplyId())
                        .content(reply.getContent())
                        .isCheer(reply.getIsCheer())
                        .rereplyId(reply.getRereplyId())
                        .build();

                if (reply.getRereplyId() == null) {
                    replySortList.add(replyResponse);
                } else {
                    // 대댓글을 댓글의 해쉬맵 안에 넣어서 관리한다.
                    replyMap.computeIfAbsent(reply.getRereplyId(), k -> new ArrayList<>())
                            .add(replyResponse);
                }
            }

            for (GetReplyResponse replyResponse : replySortList) {
                List<GetReplyResponse> replies = replyMap.getOrDefault(replyResponse.getReplyId(),
                        Collections.emptyList());
                replyResponse.setReplies(replies);
            }

            List<String> fileList = new ArrayList<>();
            for (File file : post.getFileList()) {
                fileList.add(file.getFileUrl());
            }

            // 댓글, 파일리스트, 포스트 관련 내용들을 모두 한 dto에 담는다.
            GetPostResponse getPostResponse = GetPostResponse.builder()
                    .postId(post.getPostId())
                    .activityId(post.getActivity().getId())
                    .postContent(post.getPostContent())
                    .postTime(post.getPostTime())
                    .replyList(replySortList)
                    .tagList(tagList)
                    .profileUrl(post.getUserPersonalInfo().getProfileImageUrl())
                    .nickname(post.getUserPersonalInfo().getNickname())
                    .imageList(fileList)
                    .isFriend(true)
                    .streakColor(post.getActivity().getStreakId().getStreakColor())
                    .build();

            // dto 리스트에 저장
            postResponseList.add(getPostResponse);
        }

        return postResponseList;
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
