import React, { useState } from 'react';
import { ReactComponent as LogoText } from '../../assets/chaeum_logo_text.svg';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isElement } from 'react-dom/test-utils';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  openDrawer,
  setArticleWriteStep,
  setIsSearchBarOpened,
} from '../../features/states/states';
import { isConstructorDeclaration } from 'typescript';
import InputTag from './InputTag';
import { IconButton } from '@material-tailwind/react';
import axios from 'axios';

interface HeaderPropsType {
  title?: JSX.Element | string;
  isLogo: boolean;
}

const ARTICLE_WRITE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/create';
const USER_SEARCH_URL =
  'http://i9a810.p.ssafy.io:8080/api/user/nickname-search';
const AccessToken = localStorage.getItem('access_token');

export const ChaeumHeader = ({ title, isLogo }: HeaderPropsType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const articleWriteStep = useAppSelector(
    state => state.stateSetter.articleWriteStep
  );
  const isSearchBarOpened = useAppSelector(
    state => state.stateSetter.isSearchBarOpened
  );
  const myNickName = useAppSelector(state => state.stateSetter.nickname);
  const drawerState = useAppSelector(state => state.stateSetter);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const onWriteButtonClicked = () => {
    dispatch(setArticleWriteStep(1));
  };

  const onOpenSearckButtonClick = () => {
    dispatch(setIsSearchBarOpened());
  };

  const onGobackButtonClicked = () => {
    dispatch(setArticleWriteStep(articleWriteStep - 1));
    if (articleWriteStep === 1) {
      navigate('/feed');
    }
  };

  const onSettingButtonClick = () => {
    // dispatch(setIsSettingButtonClicked());
    dispatch(openDrawer({isDrawerOpen:true, drawerType:'설정'}));
  };

  const onRegistButtonClicked = () => {
    //   if (imageList.length > 0) {
    //     const formData = new FormData();
    //     formData.append("백에서 받을 이미지파일 이름", imageList);
    //     formData.append("activityId", activity.id);
    //     formData.append("content", articleContent);
    //     axios
    //       .post(`${ACTIVITY_LIST_URL}`, formData, {
    //         headers: { Authorization: `Bearer ${AccessToken}`,
    //                    "Content-Type": "multipart/form-data" },
    //       })
    //       .then(() => {
    //         setImageList([]);
    //         navigate('/feed');
    //       })
    //       .catch(() => {
    //         console.log('게시글 등록실패')
    //       })
    //   } else {
    //     const data = {
    //       activityId: activity.id,
    //       content: articleContent,
    //     };
    //     axios
    //       .post(
    //여긴 달라질수도... 이미지없을때 요청을 따로?
    //         `${ACTIVITY_LIST_URL}`,
    //         new URLSearchParams(data)
    //       )
    //       .then(() => {
    //         navigate('/feed');
    //       })
    //       .catch(() => {
    //         console.log('게시글 등록실패')
    //       })
    //   }
    // };
    dispatch(setArticleWriteStep(0));
    navigate('/feed');
  };

  const onSearchButtonClick = () => {
    console.log('검색검색');
    axios
      .get(`${USER_SEARCH_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { keyword: searchKeyword },
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
    <div className="flex flex-col items-center justify-center sticky top-0 left-0 z-10 w-full min-h-[56px] bg-white">
      <div className="flex flex-row w-full justify-between items-center">
        <div>
          {isLogo ? (
            <Link to={'/main'}>
              <LogoText height="auto" width="10rem" className="px-2" />
            </Link>
          ) : isElement(title) || typeof title === 'string' ? (
            <span
              className="px-4 text-3xl font-environmentR font-semibold text-chaeum-gray-900"
              onClick={onGobackButtonClicked}
            >
              {title}
            </span>
          ) : null}
        </div>
        <div className="px-2">
          {location.pathname === '/feed/write' && articleWriteStep === 2 ? (
            <div
              className="w-[80px] flex flex-row-reverse justify-between text-lg text-chaeum-blue-500"
              onClick={onRegistButtonClicked}
            >
              공유하기
            </div>
          ) : location.pathname === '/feed/write' && articleWriteStep === 1 ? (
            <div className="w-[80px] flex flex-row-reverse justify-between text-lg">
              활동목록
            </div>
          ) : location.pathname === '/feed' ? (
            <div className="w-[70px] flex flex-row-reverse justify-between">
              <Link to={'write'} onClick={onWriteButtonClicked}>
                <i className="fa-regular fa-pen-to-square text-2xl text-chaeum-blue-500"></i>
              </Link>
            </div>
          ) : isElement(title) ? (
            <span
              className="px-4 text-3xl font-environmentR font-semibold text-chaeum-gray-900"
              onClick={onGobackButtonClicked}
            >
              {title}
            </span>
          ) : (
            <span className="px-4 text-2xl font-semibold text-chaeum-gray-900">
              {title}
            </span>
          )}
        </div>
        <div className="px-2 mr-1">
          {location.pathname === '/feed/write' && articleWriteStep === 2 ? (
            <div
              className="w-[80px] flex flex-row-reverse justify-between text-lg text-chaeum-blue-500"
              onClick={onRegistButtonClicked}
            >
              공유하기
            </div>
          ) : location.pathname === '/feed/write' && articleWriteStep === 1 ? (
            <div className="w-[80px] flex flex-row-reverse justify-between text-lg">
              활동목록
            </div>
          ) : location.pathname === '/feed' ? (
            <div className="w-[70px] flex flex-row-reverse justify-between">
              <Link to={'write'} onClick={onWriteButtonClicked}>
                <i className="fa-regular fa-pen-to-square text-2xl text-chaeum-blue-500"></i>
              </Link>
              <i className="fa-regular fa-bell text-2xl text-chaeum-blue-500"></i>
            </div>
          ) : location.pathname.includes('/profile') ? (
            <div className="w-[70px] flex flex-row-reverse justify-between">
              <svg
                className="fill-transparent stroke-chaeum-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                height="1.55em"
                strokeWidth="55px"
                viewBox=" -40 -40 580 580 "
                onClick={onSettingButtonClick}
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>

              <svg
                className="fill-chaeum-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 512 512"
                onClick={onOpenSearckButtonClick}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
      {isSearchBarOpened ? (
        <div className="flex items-center justify-center mb-3">
          <InputTag
            label="친구 검색"
            setSearchKeyword={setSearchKeyword}
          ></InputTag>
          <IconButton
            variant="text"
            className="ml-2"
            onClick={onSearchButtonClick}
          >
            <svg
              className="fill-chaeum-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
