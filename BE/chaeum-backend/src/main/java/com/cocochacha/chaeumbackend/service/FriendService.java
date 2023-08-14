package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.*;
import com.cocochacha.chaeumbackend.dto.AcceptFriendRequest;
import com.cocochacha.chaeumbackend.dto.AddFriendRequest;
import com.cocochacha.chaeumbackend.dto.CancelAddFriendRequest;
import com.cocochacha.chaeumbackend.dto.RejectFriendRequest;
import com.cocochacha.chaeumbackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
