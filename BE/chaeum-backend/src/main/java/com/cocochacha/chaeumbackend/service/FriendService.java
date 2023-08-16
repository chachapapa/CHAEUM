package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.*;
import com.cocochacha.chaeumbackend.dto.*;
import com.cocochacha.chaeumbackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserPersonalInfoRepository userPersonalInfoRepository;
    private final FriendRelationshipRepository friendRelationshipRepository;
    private final FriendLogRepository friendLogRepository;
    private final FriendAddRepository friendAddRepository;

    /**
     * 친구 신청을 해주는 메소드
     *
     * @param addFriendRequest 친구가 되고 싶은 사람의 아이디
     * @param userPersonalInfoTo 친구를 건 사람을 아이디
     * @return 친구 신청이 잘 되었다면 true, 아니라면 false
     */
    public boolean addFriend(AddFriendRequest addFriendRequest, UserPersonalInfo userPersonalInfoTo) {
        /*
            toFrom과 fromTo가 이미 mongoDB안에 있는지 확인해야함
         */
        String nickname = addFriendRequest.getNickname();

        long toId = userPersonalInfoTo.getId();

        UserPersonalInfo userPersonalInfoFrom = findUserPersonalInfo(nickname);
        long fromId = userPersonalInfoFrom.getId();

        if (fromId == 0) {
            // 해당 닉네임을 가지고 있는 유저가 없다는 의미
            return false;
        }

        String toFromId = toId + "." + fromId;
        String fromToId = fromId + "." + toId;

        // 해당 값이 있는지 없는지 확인
        FriendCheck friendCheck = friendRepository.findByFriendRelationship(toFromId).orElse(null);

        if (friendCheck != null) {
            if (friendCheck.isCheck()) {
                // 이미 친구인 경우로, 이 경우는 올 수 없음
                return false;
            }
            // 원래 친구 였다가, 관계를 끊은 상태로 다시 친구 요청을 보낸 것
            return true;
        }

        // 친구 신청 중으로 변경
        createdAddDatabase(userPersonalInfoTo, userPersonalInfoFrom);
        save(toFromId);
        save(fromToId);
        return true;
    }

    /**
     * 친구 신청에 대해서 수락을 해주는 메소드
     *
     * @param acceptFriendRequest 친구 신청을 한 사람의 닉네임
     * @param toUser 친구 신청을 받은 아이디
     * @return 친구 신청 수락 성공 여부
     */
    public boolean acceptFriend(AcceptFriendRequest acceptFriendRequest, UserPersonalInfo toUser) {
        // acceptFriendRequest는 친구 신청을 보낸 사람, toUser는 친구 신청을 받은 사람
        String nickname = acceptFriendRequest.getNickname();
        long toId = toUser.getId();

        UserPersonalInfo fromUser = findUserPersonalInfo(nickname);
        long fromId = fromUser.getId();

        if (fromUser == null) {
            // 해당 닉네임을 가지고 있는 유저가 없다는 의미
            return false;
        }

        // 친구 신청을 받아서 더 이상 친구 신청 중이 아님 => false 로 변경
        changeAddFriend(fromUser, toUser);
        saveAtFriendRelationship(toUser, fromUser);
        saveAtFriendRelationship(fromUser, toUser);
        return true;
    }

    /**
     * 친구 신청을 거절을 해주는 메소드
     *
     * @param rejectFriendRequest 본인한테 친구 신청을 넣은 사람의 닉네임
     * @param userPersonalInfoFrom 본인 아이디
     */
    public void rejectFriend(RejectFriendRequest rejectFriendRequest, UserPersonalInfo userPersonalInfoFrom) {
        // rejectFriendRequest 이게 거절 할 사람으로 이 사람이 신청을 한거임
        // userPersonalInfoFrom 본인이고, 거절을 할 사람

        UserPersonalInfo userPersonalInfoTo = findUserPersonalInfo(rejectFriendRequest.getNickname());

        FriendAdd friendAdd = friendAddRepository
                .findByToIdAndFromId(userPersonalInfoTo, userPersonalInfoFrom)
                .orElse(null);

        if (friendAdd == null) {
            throw new NoSuchElementException("null 값!");
        }

        // 친구 신청을 하는 중이 아니므로 false로 해야함
        friendAdd.changeIsAdd(false);
        friendAddRepository.save(friendAdd);
    }

    /**
     * 친구 신청 취소를 해주는 메소드
     *
     * @param cancelAddFriendRequest 본인한테 친구 신청을 받은 사람의 닉네임
     * @param userPersonalInfoTo 본인 아이디
     */
    public void cancelAddFriend(CancelAddFriendRequest cancelAddFriendRequest, UserPersonalInfo userPersonalInfoTo) {
        // 본인이 취소를 구른 사람
        // 입력으로 들어오는 값이 친구 신청을 받은 사람
        // 즉, 본인이 To, 입력으로 들어오는 값이 from 임
        UserPersonalInfo userPersonalInfoFrom = findUserPersonalInfo(cancelAddFriendRequest.getNickname());
        FriendAdd friendAdd = friendAddRepository.findByToIdAndFromId(userPersonalInfoTo, userPersonalInfoFrom).orElse(null);

        if (friendAdd == null) {
            throw new NoSuchElementException("null 값!");
        }

        // 친구 신청을 취소했기 때문에 false로 바꿔주면 됨
        friendAdd.changeIsAdd(false);
        friendAddRepository.save(friendAdd);
    }

    /**
     * 친구를 삭제(끊어주는) 메소드
     *
     * @param deleteFriendRequest 끊고 싶은 친구의 닉네임
     * @param userPersonalInfo 본인 아이디
     * @return 삭제가 성공하면 true, 실패하면 false
     */
    public boolean deleteFriend(DeleteFriendRequest deleteFriendRequest, UserPersonalInfo userPersonalInfo) {
        /*
            삭제가 아니라 기존에 친구였던 관계(true)를 바꾸는 것(false)
            바꿀 때, toId와 fromId둘 다 바꿔야함

         */
        UserPersonalInfo userPersonalInfoFrom = findUserPersonalInfo(deleteFriendRequest.getNickname());

        long fromId = userPersonalInfoFrom.getId();
        long toId = userPersonalInfo.getId();

        String toFromId = toId + "." + fromId;
        String fromToId = fromId + "." + toId;

        update(toFromId, true);
        update(fromToId, true);

        if (!updateFriendRelationship(userPersonalInfo, userPersonalInfoFrom) &&
                !updateFriendRelationship(userPersonalInfoFrom, userPersonalInfo)) {
            return false;
        }
        return true;
    }

    /**
     * A와 B가 친구인지 알려주는 메소드
     *
     * @param viewFriendRequest 친구인지 궁금한 사람의 닉네임
     * @param toId 본인 아이디
     * @return A와 B의 친구 여부, 친구면 true, 아니면 false
     */
    public boolean viewFriend(ViewFriendRequest viewFriendRequest, long toId) {
        // A와 B가 친구인지 확인 해주는 메소드
        String nickname = viewFriendRequest.getNickname();
        long fromId = findUserPersonalInfo(nickname).getId();

        String id = toId + "." + fromId;
        FriendCheck friendCheck = friendRepository.findByFriendRelationship(id).orElse(null);
        System.out.println(friendCheck);

        if (friendCheck == null || !friendCheck.isCheck()) {
            // 둘이 친구 아님
            return false;
        }
        // 둘이 친구임
        return true;
    }

    /**
     * 입력으로 들어오는 사람의 전체 친구 목록
     *
     * @param viewAllFriendRequest 해당 사람의 전체 친구 목록
     * @return 해당 사람의 전체 친구 목록
     */
    public List<ViewAllFriendResponse> viewAllFriend(ViewAllFriendRequest viewAllFriendRequest) {
        // 입력으로 받는 닉네임을 통해서 유저의 아이디를 얻음
        UserPersonalInfo userId = findUserPersonalInfo(viewAllFriendRequest.getNickname());

        // 해당 유저의 정보를 이용해서 해당 유저와 친구인 유저를 추출함
        List<FriendRelationship> friendRelationshipList = friendRelationshipRepository.findByToIdAndIsFriendIsTrue(userId)
                .orElse(null);

        if (friendRelationshipList == null) {
            throw new NoSuchElementException("null 값!");
        }

        // 닉네임, 프로필 사진 ??
        // 더 필요가 없나 => 만약에 더 필요하다고 하면 추가해주기
        List<ViewAllFriendResponse> responses = new ArrayList<>();
        for (FriendRelationship friendRelationship : friendRelationshipList) {
            UserPersonalInfo userPersonalInfo = friendRelationship.getFromId();

            // DTO에 값 넣어주기
            ViewAllFriendResponse viewAllFriendResponse = ViewAllFriendResponse.builder()
                    .nickname(userPersonalInfo.getNickname())
                    .profileUrl(userPersonalInfo.getProfileImageUrl())
                    .build();

            responses.add(viewAllFriendResponse);
        }
        return responses;
    }

    /**
     * 본인한테 친구 신청을 넣은 사람의 목록을 보여주는 메소드
     *
     * @param userPersonalInfo 본인 아이디
     * @return 본인한테 친구 신청을 넣은 사람의 목록
     */
    public AddListFriendResponse addListFriend(UserPersonalInfo userPersonalInfo) {
        // 나한테 친구 신청을 넣은 사람의 목록
        // 친구가 된 사람이 아니라 현재 친구 신청을 넣은 사람의 목록을 보여주면 됨
        // 파라미터는 본인임
        List<FriendAdd> friendAddList = friendAddRepository.findAllByFromId(userPersonalInfo).orElse(null);

        if (friendAddList == null) {
            throw new NoSuchElementException("null 값!");
        }

        List<String> nicknameList = new ArrayList<>();

        for (FriendAdd friendAdd : friendAddList) {
            nicknameList.add(friendAdd.getToId().getNickname());
        }

        AddListFriendResponse addListFriendResponses = new AddListFriendResponse();
        addListFriendResponses.setNickname(nicknameList);

        return addListFriendResponses;
    }

    /**
     * 친구 신청 중 DB에 값을 넣어주는 메소드
     * 값이 이미 있다면, 친구 신청 중으로 바꿔주는 메소드
     *
     * @param userPersonalInfoTo 친구 신청을 건 사람
     * @param userPersonalInfoFrom 친구 신청을 받은 사람
     */
    public void createdAddDatabase(UserPersonalInfo userPersonalInfoTo, UserPersonalInfo userPersonalInfoFrom) {
        FriendAdd friendAdd = friendAddRepository.findByToIdAndFromId(userPersonalInfoTo, userPersonalInfoFrom).orElse(null);

        if (friendAdd == null) {
            // friendReject가 null 이면 행이 없다는 의미이기 때문에 추가해주면 됨
            friendAddRepository.save(
                    FriendAdd.builder()
                            .toId(userPersonalInfoTo)
                            .fromId(userPersonalInfoFrom)
                            .isAdd(true)
                            .build()
            );
        } else {
            friendAdd.changeIsAdd(true);
            friendAddRepository.save(friendAdd);
        }
    }

    /**
     * 닉네임을 통해서 유저의 정보를 찾아주는 메소드
     *
     * @param nickname 닉네임
     * @return 해당 닉네임에 해당하는 UserPersonalInfo
     */
    public UserPersonalInfo findUserPersonalInfo(String nickname) {
        List<UserPersonalInfo> userPersonalInfoList = userPersonalInfoRepository.findAllByNickname(nickname);

        for (UserPersonalInfo userPersonalInfo : userPersonalInfoList) {
            if (userPersonalInfo.getIsRegistered()) {
                return userPersonalInfo;
            }
        }
        return null;
    }

    /**
     * mongoDB에 값을 저장해주는 메소드
     *
     * @param id 두개의 ID를 합친 새로운 ID
     * @return DB에 저장이 잘 되었다면 true, 아니면 false
     */
    public boolean save(String id) {
        FriendCheck friendCheck = FriendCheck.builder()
                .check(false)
                .friendRelationship(id)
                .build();
        FriendCheck a = friendRepository.save(friendCheck);
        return true;
    }

    /**
     * 친구 신청 여부의 상태를 fasle로 바꿔주는 메소드
     *
     * @param userPersonalInfoFrom 친구 신청을 한 사람
     * @param userPersonalInfoTo 친구 신청을 받은 사람
     */
    public void changeAddFriend(UserPersonalInfo userPersonalInfoFrom, UserPersonalInfo userPersonalInfoTo) {
        // from이 준 사람, to가 받은 사람
        FriendAdd friendAdd = friendAddRepository.findByToIdAndFromId(userPersonalInfoTo, userPersonalInfoFrom).orElse(null);
        friendAdd.changeIsAdd(false);
        friendAddRepository.save(friendAdd);
    }

    /**
     * 친구 관계를 저장해주는 메소드
     *
     * @param userPersonalInfoTo 친구 신청을 한 사람의 아이디
     * @param userPersonalInfoFrom 친구 신청을 받은 사람의 아이디
     */
    public void saveAtFriendRelationship(UserPersonalInfo userPersonalInfoTo, UserPersonalInfo userPersonalInfoFrom) {
        FriendRelationship friendRelationship = friendRelationshipRepository
                .findByToIdAndFromId(userPersonalInfoTo, userPersonalInfoFrom)
                .orElse(null);
        if (friendRelationship != null) {
            // 기존에 친구 였다가 친구를 끊고 다시 친구를 한 경우
            friendRelationship.changeIsFriend(true);
        } else {
            // 신규 저장
            friendRelationship = FriendRelationship.builder()
                    .toId(userPersonalInfoTo)
                    .fromId(userPersonalInfoFrom)
                    .isFriend(true)
                    .build();
        }
        FriendRelationship saveFriendRelation = friendRelationshipRepository.save(friendRelationship);

        FriendLog friendLog = FriendLog.builder()
                .friendRelationshipId(saveFriendRelation)
                .build();

        friendLogRepository.save(friendLog); // 친구 신청을 수락해서, 해당 정보를 로그에 저장

        String toFromId = userPersonalInfoTo.getId() + "." + userPersonalInfoFrom.getId();

        FriendCheck friendCheck = FriendCheck.builder()
                .friendRelationship(toFromId)
                .check(true)
                .build();

        friendRepository.save(friendCheck); // mongoDB의 정보를 수정해줌
    }

    /**
     * 현재 여부를 반대로 바꿔주는 메소드
     *
     * @param id 만들어진 ID
     * @param isCheck 현재 여부
     */
    public void update(String id, boolean isCheck) {
        FriendCheck friendCheck = FriendCheck.builder()
                .check(isCheck ^ true)
                .friendRelationship(id)
                .build();
        friendRepository.save(friendCheck);
    }

    /**
     * 친구 관계를 반대로 해주는 메소드
     * 친구 관계가 true면 false로, false면 true로
     *
     * @param userPersonalInfoTo 친구 신청을 한 유저의 정보
     * @param userPersonalInfoFrom 친구 신청을 받은 유저의 정보
     * @return 친구 정보가 알맞게 수정이 되면 true, 아니라면 false
     */
    public boolean updateFriendRelationship(UserPersonalInfo userPersonalInfoTo, UserPersonalInfo userPersonalInfoFrom) {
        FriendRelationship friendRelationship = friendRelationshipRepository
                .findByToIdAndFromId(userPersonalInfoTo, userPersonalInfoFrom)
                .orElse(null);

        if (friendRelationship == null) {
            return false;
        }

        friendRelationship.changeIsFriend(friendRelationship.isFriend() ^ true);

        FriendRelationship saveFriendRelation = friendRelationshipRepository.save(friendRelationship);

        FriendLog friendLog = FriendLog.builder()
                .friendRelationshipId(saveFriendRelation)
                .build();
        friendLogRepository.save(friendLog);
        return true;
    }
}
