package com.cocochacha.chaeumbackend.service;

import com.cocochacha.chaeumbackend.domain.FriendAdd;
import com.cocochacha.chaeumbackend.domain.FriendCheck;
import com.cocochacha.chaeumbackend.domain.UserPersonalInfo;
import com.cocochacha.chaeumbackend.dto.AddFriendRequest;
import com.cocochacha.chaeumbackend.repository.FriendAddRepository;
import com.cocochacha.chaeumbackend.repository.FriendRepository;
import com.cocochacha.chaeumbackend.repository.UserPersonalInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserPersonalInfoRepository userPersonalInfoRepository;
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
}
