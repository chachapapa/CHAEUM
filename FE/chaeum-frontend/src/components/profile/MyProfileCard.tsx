import React from 'react';
import { Avatar, Button } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Tag } from '../common/Tag';
import ImageUpload from '../common/ImageUpload';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { deleteFriendNicknameList, setFriendNicknameList } from '../../features/states/states';
import axios from 'axios';

interface ProfileCardPropsType {
  name: string;
  age?: number;
  mbti?: string;
  longest?: number;
  profileImage?: string;
  onClick: () => void;
}

const FRIEND_REQUEST_URL = 'http://i9a810.p.ssafy.io:8080/api/user/add';
const FRIEND_DELETE_URL = 'http://i9a810.p.ssafy.io:8080/api/user';
const AccessToken = localStorage.getItem('access_token');

export const MyProfileCard = ({
  name,
  age,
  mbti,
  longest,
  profileImage,
  onClick,
}: ProfileCardPropsType) => {
  const myNickname = useAppSelector(state => state.userStateSetter.userStateSetter.nickname);
  const friendNicknameList = useAppSelector(
    state => state.stateSetter.friendNicknameList
  );
  const dispatch = useAppDispatch();

  const onFriendButtonClick = () => {
    axios
      .post(
        `${FRIEND_REQUEST_URL}`,
        JSON.stringify({ nickname : name }),
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        if (res.data === '친구 신청 완료') {
          dispatch(setFriendNicknameList([name]));
        } else {
          console.log('친구 신청 실패');
        }
      });
  };

  const onDeleteButtonClick = () => {
    const deleteFriend = async () => {
      try {
        const res = await axios.patch(`${FRIEND_DELETE_URL}`, { nickname: name },{
          headers: { Authorization: `Bearer ${AccessToken}`,'Content-Type': 'application/json', },
        });
        if (res.data === '삭제 완료') dispatch(deleteFriendNicknameList(name));
      } catch (e) {
        console.log('유저 정보가 없습니다.');
      }
    };
    deleteFriend();
  };

  return (
    <div
      onClick={onClick}
      className="absolute flex bg-white z-10 p-2 w-11/12 h-20  left-[50%] top-[160px] -translate-x-[50%] justify-between rounded-3xl shadow-[0_0_10px_10px_rgba(208,211,222,0.2)] shadow-chauem-gray-500/50 "
    >
      <div className="flex justify-self-center items-center">
        {typeof profileImage === 'undefined' ? (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-chaeum-gray-900 text-3xl"
          />
        ) : (
          <Avatar src={profileImage} alt="profileImage" size="md" />
        )}

        <div className="justify-self-start text-start text-md font-bold  text-chaeum-gray-900 ml-2">
          <span className="ml-2">{name}</span>
          <div className="justify-self-start self-center font-light">
            {typeof mbti === 'undefined' ? null : <Tag tag={mbti} />}
            {typeof age === 'undefined' ? null : <Tag tag={age.toString()} />}
          </div>
        </div>
      </div>
      {name === myNickname ? null : friendNicknameList.includes(name) ? (
        <Button
          className="w-16 p-0 h-6 shadow-none self-center bg-gray-300"
          onClick={onDeleteButtonClick}
        >
          친구 삭제
        </Button>
      ) : (
        <Button
          className="w-16 p-0 h-6 shadow-none self-center bg-chaeum-blue-400"
          onClick={onFriendButtonClick}
        >
          친구 신청
        </Button>
      )}
    </div>
  );
};
