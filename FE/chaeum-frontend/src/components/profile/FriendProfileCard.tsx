import React from 'react';
import { Avatar, Button } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Tag } from '../common/Tag';
import { User } from '../Types';
import UserNicknameInput from '../signup/UserNicknameInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
  user: User;
  index: number;
  setFriendList?: React.Dispatch<React.SetStateAction<User[]>>;
  type?: string;
};

const FRIEND_DELETE_URL = 'http://i9a810.p.ssafy.io:8080/api/user';
const AccessToken = localStorage.getItem('access_token');

const FriendProfileCard = ({ user, index, setFriendList, type }: Props) => {
  const navigate = useNavigate();

  const onProfileClick = () => {
    window.location.replace(`/profile/${user.nickname}`);
  };

  const onDeleteButtonClick = () => {
    const deleteFriend = async () => {
      try {
        const res = await axios.patch(`${FRIEND_DELETE_URL}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
          params: { nickname: `${user.nickname}` },
        });
        if (setFriendList) setFriendList(prev => prev.splice(index, 1));
      } catch (e) {
        console.log('유저 정보가 없습니다.');
      }
    };
    deleteFriend();
  };

  return (
    <div>
      <div
        onClick={onProfileClick}
        className="flex bg-white z-50 p-2 w-full h-20 justify-between"
      >
        <div className="flex justify-self-center items-center">
          {typeof user.profileImageUrl === 'undefined' ? (
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-chaeum-gray-900 text-3xl"
            />
          ) : (
            <Avatar src={user.profileImageUrl} alt="profileImage" size="md" />
          )}

          <div className="ml-2 justify-self-start text-start text-md font-bold text-chaeum-gray-900">
            <span className="ml-2">{user.nickname}</span>
            <div className="justify-self-start self-center font-light">
              {typeof user.mbti === 'undefined' ? null : (
                <Tag tag={user.mbti} />
              )}
              {typeof user.age === 'undefined' ? null : (
                <Tag tag={user.age.toString()} />
              )}
            </div>
          </div>
        </div>
        {type === 'search' ? null : (
          <button
            className="flex h-6 bg-gray-300 text-xs items-center p-1 rounded-md shadow-sm text-white font-middle self-center"
            onClick={onDeleteButtonClick}
          >
            친구 삭제
          </button>
        )}
      </div>
      <hr></hr>
    </div>
  );
};

export default FriendProfileCard;
