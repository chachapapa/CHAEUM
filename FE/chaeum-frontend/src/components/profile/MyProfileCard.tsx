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
import { API_ROUTES, getApiUrl } from '../../apiConfig';
import { ColorVariation } from '../Types';
import { WaveColor } from '../theme/WaveColorTheme';
import { WaveBottomColor } from '../theme/StreakTheme';

interface ProfileCardPropsType {
  name: string;
  age?: number;
  mbti?: string;
  longest?: number;
  profileImage?: string;
  onClick: () => void;
  mainColor: ColorVariation | undefined;
}

const FRIEND_REQUEST_URL = 'http://i9a810.p.ssafy.io:8080/api/user/add';
const FRIEND_REQUEST_CHECK_URL =
  'http://i9a810.p.ssafy.io:8080/api/user/add/me';
const FRIEND_STATUS_URL = 'http://i9a810.p.ssafy.io:8080/api/user';
const FRIEND_REQUEST_CANCEL_URL =
  'http://i9a810.p.ssafy.io:8080/api/user/cancel';
const AccessToken = localStorage.getItem('access_token');

export const MyProfileCard = ({
  name,
  age,
  mbti,
  longest,
  profileImage,
  onClick,
  mainColor,
}: ProfileCardPropsType) => {
  const weight0 = 'w0';
  const weight3 = 'w3';
  const weight4 = 'w4';
  const waveFirst = WaveColor({ color: mainColor, weight4 });
  const waveSecond = WaveColor({ color: mainColor, weight3 });
  const BottomFirst = WaveBottomColor({ color: mainColor, weight4 });
  const BottomSecond = WaveBottomColor({ color: mainColor, weight3 });
  const titleBoxColor = WaveBottomColor({ color: mainColor, weight3 });
  const backgroundColor = WaveBottomColor({
    color: mainColor,
    weight0,
  });

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
      .post(
        `${getApiUrl(API_ROUTES.FRIEND_REQUEST_URL)}`,
        JSON.stringify({ nickname: name }),
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
          `${getApiUrl(API_ROUTES.FRIEND_DELETE_URL)}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={onClick}
      className={`absolute flex flex-col ${backgroundColor} z-10 w-11/12 h-20  left-[50%] top-[160px] -translate-x-[50%] justify-center rounded-3xl shadow-[0_0_10px_10px_rgba(208,211,222,0.2)] shadow-chauem-gray-500/50 overflow-auto`}
    >
      <div className='flex justify-between mr-5'>
        <div className="flex justify-self-center items-center ml-5 z-30">
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
              {typeof mbti === 'undefined' ? null : (
                <div className={mainColor? 'text-sm items-center px-1 rounded-md w-max':'bg-white text-sm items-center px-1 rounded-md w-max'}>#{mbti}</div>
              )}
              {typeof age === 'undefined' ? null : <Tag tag={age.toString()} />}
            </div>
          </div>
        </div>
        {name === myNickname ? null : friendCheck === 2 ? (
          <Button
            className="w-16 p-0 h-6 shadow-none self-center bg-gray-300 hover:shadow-none z-30"
            onClick={onDeleteButtonClick}
          >
            친구 삭제
          </Button>
        ) : friendCheck === 1 ? (
          <Button
            className="w-16 p-0 h-6 shadow-none self-center bg-red-200 hover:shadow-none z-30"
            onClick={onCancelButtonClick}
          >
            신청 취소
          </Button>
        ) : (
          <Button
            className="w-16 p-0 h-6 shadow-none self-center bg-chaeum-blue-400 hover:shadow-none z-30"
            onClick={onFriendButtonClick}
          >
            친구 신청
          </Button>
        )}
      </div>
      <svg
        className={mainColor? 'waves absolute self-end z-10 bottom-4' : 'waves absolute self-end z-10 bottom-1'} 
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        height="42.93px"
        width="100%"
      >
        <defs>
          <path
            id="gentle-wave-front"
            d="M-160 44c30 0 50-13 88-13s 50 13 88 13 50-13 88-13 50 13 88 13 v44h-352z"
          />
          <path
            id="gentle-wave-middle"
            d="M-160 44c40 0 58-10.4 88-18s 55 18 90 18 58-11 88-18 58 21 88 18 v44h-352z"
          />
          <path
            id="gentle-wave-back"
            d="M-160 44c30 0 50-13 90-15s 50 13 88 13 50-13 87-13 50 13 80 12 v44h-352z"
          />
        </defs>
        <g className="parallax">
          {/* <use
            xlinkHref="#gentle-wave-back"
            x="48"
            y="0"
            className={`${waveThird} opacity-50`}
          /> */}
          <use
            xlinkHref="#gentle-wave-middle"
            x="48"
            y="0"
            className={`${waveSecond} opacity-50 z-0`}
          />
          <use
            xlinkHref="#gentle-wave-front"
            x="48"
            y="0"
            className={`${waveFirst} opacity-50 z-0`}
          />
        </g>
      </svg>
      <div className={mainColor?'absolute bottom-0 h-4 w-full' : 'absolute bottom-0 w-full'}>
        {/* <div className={`absolute bottom-0 w-full h h-16 ${BottomThird} opacity-50`}></div> */}
        <div
          className={mainColor ? `absolute bottom-0 w-full h h-4 ${BottomSecond} opacity-50` : 'absolute bottom-0 w-full h-1 bg-black opacity-50'}
        ></div>
        <div
          className={mainColor? `absolute bottom-0 w-full h h-4 ${BottomFirst} opacity-50`:'absolute bottom-0 w-full h-1 bg-black opacity-50'}
        ></div>
      </div>
    </div>
  );
};
