import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Tag } from '../common/Tag';
import ImageUpload from '../common/ImageUpload';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  deleteFriendNicknameList,
  setFriendNicknameList,
} from '../../features/states/states';
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
const FRIEND_REQUEST_CHECK_URL =
  'http://i9a810.p.ssafy.io:8080/api/user/add/me';
const FRIEND_STATUS_URL = 'http://i9a810.p.ssafy.io:8080/api/user';
const FRIEND_REQUEST_CANCEL_URL = 'http://i9a810.p.ssafy.io:8080/api/user/cancel';
const AccessToken = localStorage.getItem('access_token');

export const MyProfileCard = ({
  name,
  age,
  mbti,
  longest,
  profileImage,
  onClick,
}: ProfileCardPropsType) => {
  const myNickname = useAppSelector(
    state => state.userStateSetter.userStateSetter.nickname
  );
  const friendNicknameList = useAppSelector(
    state => state.stateSetter.friendNicknameList
  );
  //0 아무것도 없는 남
  //1 친구 신청중
  //2 친구
  const [friendCheck, setFriendCheck] = useState<number>(0);
  const dispatch = useAppDispatch();

  const onFriendButtonClick = () => {
    axios
      .post(`${FRIEND_REQUEST_URL}`, JSON.stringify({ nickname: name }), {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.data === '친구 신청 완료') {
          dispatch(setFriendNicknameList([name]));
          setFriendCheck(1);
        } else {
          console.log('친구 신청 실패');
        }
      });
  };

  const onDeleteButtonClick = () => {
    const deleteFriend = async () => {
      try {
        const res = await axios.patch(
          `${FRIEND_STATUS_URL}`,
          { nickname: name },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.data === '삭제 완료') {
          dispatch(deleteFriendNicknameList(name));
          setFriendCheck(0);
        }
      } catch (e) {
        console.log('유저 정보가 없습니다.');
      }
    };
    deleteFriend();
  };

  const onCancelButtonClick = () => {
    const cancelRequest = async () => {
      try {
        const res = await axios.patch(
          `${FRIEND_REQUEST_CANCEL_URL}`,
          { nickname: name },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.data === '친구 신청 취소 완료') {
          setFriendCheck(0);
        }
      } catch (e) {
        console.log('유저 정보가 없습니다.');
      }
    };
    cancelRequest();
  };

  useEffect(() => {
    const getFriendCheck = async () => {
      try {
        const res = await axios.get(`${FRIEND_STATUS_URL}`, {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
          params: { nickname: name },
        });
        if (res.data === '둘이 친구 입니다.') {
          setFriendCheck(2);
        } else {
          try {
            const res = await axios.get(`${FRIEND_REQUEST_CHECK_URL}`, {
              headers: {
                Authorization: `Bearer ${AccessToken}`,
                'Content-Type': 'application/json',
              },
              params: { nickname: name },
            });
            if (res.data) {
              setFriendCheck(1);
            } else {
              setFriendCheck(0);
            }
          } catch (e) {
            console.log('에러에러');
          }
        }
      } catch (e) {
        console.log('에러에러');
      }
    };
    getFriendCheck();
  }, []);

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
      {name === myNickname ? null : friendCheck === 2 ? (
        <Button
          className="w-16 p-0 h-6 shadow-none self-center bg-gray-300 hover:shadow-none"
          onClick={onDeleteButtonClick}
        >
          친구 삭제
        </Button>
      ) : friendCheck === 1 ? (
        <Button
          className="w-16 p-0 h-6 shadow-none self-center bg-red-100 hover:shadow-none"
          onClick={onCancelButtonClick}
        >
          신청 취소
        </Button>
      ) : (
        <Button
          className="w-16 p-0 h-6 shadow-none self-center bg-chaeum-blue-400 hover:shadow-none"
          onClick={onFriendButtonClick}
        >
          친구 신청
        </Button>
      )}
    </div>
  );
};
