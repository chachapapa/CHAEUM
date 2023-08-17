import React, { useEffect, useState } from 'react';
import { MyProfileCard } from '../MyProfileCard';
import InputTag from '../../common/InputTag';
import CustomIconButton from '../../common/CustomIconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import  FriendProfileCard from '../FriendProfileCard';
import axios from 'axios';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { User } from '../../Types';
import { IconButton } from '@material-tailwind/react';

const FRIEND_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/user/list';
const USER_SEARCH_URL = 'http://i9a810.p.ssafy.io:8080/api/user/nickname-search';
const AccessToken = localStorage.getItem('access_token');

const ScreenThree = () => {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState<User[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${FRIEND_LIST_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { nickname: decodeURI(location.pathname.split('/')[2]) },
      })  
      .then(res => {
        // console.log(res);
        if (res.data) {
          // console.log(res.data);
          for(let i = 0 ; i< res.data.length ; i++){
            const tmp : User = {nickname : res.data[i].nickname , profileImageUrl : res.data[i].profileUrl};
            setFriendList(prev => [...prev,tmp]);
          }
        } else {
          console.log('카테고리 못가져옴 ㅎ');
        }
      });
    
  }, []);

  const onSearchButtonClick = () => {
    console.log('검색검색');
    axios
      .get(`${USER_SEARCH_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { keyword : searchKeyword },
      })
      .then(res => {
        console.log(res.data);
        // if (res.data) {
        //   setFriendList(res.data);
        // } else {
        //   console.log('카테고리 못가져옴 ㅎ');
        // }
      });
  };

  return (
    <div className="flex flex-col justify-center">
      {/* 검색창 */}
      {/* <div className="flex items-center justify-center mb-3">
        <InputTag label="친구 검색" setSearchKeyword={setSearchKeyword}></InputTag>
        <IconButton variant="text" className='ml-2' onClick={onSearchButtonClick}>
          <svg
            className='fill-chaeum-blue-500'
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </IconButton>
      </div> */}
      {friendList.map((friend, index) => (
        <div className="my-2" key={index}>
          <FriendProfileCard
            user={friend}
            index={index}
            setFriendList={setFriendList}
          ></FriendProfileCard>
        </div>
      ))}
    </div>
  );
};

export default ScreenThree;
