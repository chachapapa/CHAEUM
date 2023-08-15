package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.CreateReplyRequest;
import com.cocochacha.chaeumbackend.dto.CreatePostRequest;
import com.cocochacha.chaeumbackend.dto.DeletePostRequest;
import com.cocochacha.chaeumbackend.dto.DeleteReplyRequest;
import com.cocochacha.chaeumbackend.dto.GetActiveResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface SnsService {

    /**
     * User의 친구를 확인하고 액티브 중인 친구들 리스트를 반환한다.
     *
     * @param userPersonalInfo
     * @return List<GetActiveResponse> List<(친구 이름, 액티브 시작 시간, 스트릭 이름, 액티비티 id)>
     */
    List<GetActiveResponse> getActiveResponseList(UserPersonalInfo userPersonalInfo);

    boolean createPost(CreatePostRequest createPostRequest, UserPersonalInfo userPersonalInfo, List<MultipartFile> fileList) throws IOException;

    boolean createReply(CreateReplyRequest createReplyRequest, UserPersonalInfo userPersonalInfo, boolean isCheer);

    boolean deletePost(DeletePostRequest deletePostRequest, UserPersonalInfo userPersonalInfo);

    boolean deleteReply(DeleteReplyRequest deleteReplyRequest, UserPersonalInfo userPersonalInfo);

}
