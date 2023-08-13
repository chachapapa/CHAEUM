import React from 'react';
import { ReactComponent as LogoText } from '../../assets/chaeum_logo_text.svg';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isElement } from 'react-dom/test-utils';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setArticleWriteStep } from '../../features/states/states';

interface HeaderPropsType {
  title?: JSX.Element | string;
  isLogo: boolean;
}

const ARTICLE_WRITE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/create';
const AccessToken = localStorage.getItem('access_token');

export const ChaeumHeader = ({ title, isLogo}: HeaderPropsType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const articleWriteStep = useAppSelector(
    state => state.stateSetter.articleWriteStep
  );

  const onWriteButtonClicked = () => {
    dispatch(setArticleWriteStep(1));
  };

  const onGobackButtonClicked = () => {
    dispatch(setArticleWriteStep(articleWriteStep - 1));
    if (articleWriteStep === 1) {
      navigate('/feed');
    }
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

  return (
    <div className="flex flex-row justify-between items-center sticky top-0 left-0 z-10 w-full min-h-[56px] bg-white">
      <div>
        {isLogo ? (
          <Link to={'/main'}>
            <LogoText height="auto" width="10rem" className="px-2" />
          </Link>
        ) : isElement(title) ? (
          <span className="px-4 text-3xl font-environmentR font-semibold text-chaeum-gray-900" onClick={onGobackButtonClicked}>
            {title}
          </span>
        ) : null}
      </div>
      <div className="px-2">
        {location.pathname === '/feed/write' && articleWriteStep === 2 ? (
          <div className="w-[80px] flex flex-row-reverse justify-between text-lg text-chaeum-blue-500" onClick={onRegistButtonClicked}>
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
        ) : null}
      </div>
    </div>
  );
};
