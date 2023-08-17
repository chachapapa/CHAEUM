import React, { useState } from 'react';
import { useEffect } from 'react';
import { Await, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import CustomIconButton from '../components/common/CustomIconButton';
import { ChaeumNav } from '../components/common/ChaeumNav';
import { StreakCardCarousel } from '../components/main/StreakCardCarousel';
import { StreakInfoType } from '../components/Types';
import { BottomDrawer } from '../components/common/BottomDrawer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/reduxHooks';
import {
  openModal,
  closeModal,
  setMyStreakInfo,
} from '../features/states/states';
import LoadingWave from '../components/main/LoadingWave';
import { OverlayModal } from '../components/common/OverlayModal';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/

type Props = {
  isProfilePage: boolean;
};

const ACCESS_TOKEN_URL = 'http://i9a810.p.ssafy.io:8080/api/token';

const MainPage = ({ isProfilePage }: Props) => {
  // 모든 스트릭 정보 저정
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');

  //로컬스토리지에 토큰 저장하기.
  if (token) {
    localStorage.setItem('access_token', token);
  }

  const AccessToken = localStorage.getItem('access_token');
  type UrlObjType = {
    [key in string]: string;
  };

  const url: UrlObjType = {
    STREAK_LIST_URL: 'http://i9a810.p.ssafy.io:8080/api/streak',
    CATEGORY_LIST_URL: 'http://i9a810.p.ssafy.io:8080/api/streak/category',
    STREAK_DELETE_URL: 'http://i9a810.p.ssafy.io:8080/api/streak/deletion',
    STREAK_ACTIVE_URL: 'http://i9a810.p.ssafy.io:8080/api/streak/deactivation',
  };

  const isInfo = useAppSelector(state => state.stateSetter.myStreakInfo);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    axios
      .get(`${url.CATEGORY_LIST_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(res => {
        if (res.data) {
          setSportsMiddleCategroyList(res.data[0].categoryMiddleList);
          setStudyMiddleCategroyList(res.data[1].categoryMiddleList);
        } else {
          console.log('카테고리 못가져옴 ㅎ');
        }
      });

    if (isInfo === null) {
      axios
        .get(`${url.STREAK_LIST_URL}`, {
          // params: { nickname: nickname },
          headers: { Authorization: `Bearer ${AccessToken}` },
        })
        .then(res => {
          if (res.data) {
            // setAllStreaks(res.data);
            setTimeout(() => dispatch(setMyStreakInfo(res.data)), 3000);
          } else {
            alert('문제있음');
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //이후 쿠키 가져올 때 사용할 코드
  // const getCookie= (key:string) => {
  //   let result = null;
  //   const cookie = document.cookie.split(';');
  //   cookie.some( (item) : boolean => {
  //     item = item.replace(' ', '');

  //     const  dic = item.split('=');

  //     if(key === dic[0]) {
  //       result = dic[1];
  //       return true;
  //     }else{
  //       return false;
  //     }

  //   });
  //   return result;
  // };

  // console.log('함수로 가져오기'+ getCookie('refresh_token'));

  // const [cookie, setCookie] = useCookies(['__stripe_mid']);

  // console.log('그냥다큐먼트 내부 쿠키'+ document.cookie);

  const today: Date = new Date();
  // const activeDate: Date = new Date();

  const getStreakCnt = () => {
    const Date = today.getDate();
    if (Date === 0) return 49;
    else return 42 + Date * 7;
  };

  // 카테고리 별로 분리하기
  const myStreaks = useAppSelector(state => state.stateSetter.myStreakInfo);

  const exerciseActive: StreakInfoType[] = [];
  const studyActive: StreakInfoType[] = [];
  const othersActive: StreakInfoType[] = [];

  if (myStreaks !== null) {
    myStreaks[0].map((obj, index) => {
      exerciseActive.push(obj);
    });
    myStreaks[1].map((obj, index) => {
      studyActive.push(obj);
    });
    myStreaks[2].map((obj, index) => {
      othersActive.push(obj);
    });
  }
  // 모달 창 열기

  const { modalState, drawerState } = useAppSelector(
    state => state.stateSetter
  );
  const dispatch = useDispatch();

  // 스트릭 생성하기
  const [modalTypeKor, setModalTypeKor] = useState<string>('');
  const [studyMiddleCategoryList, setStudyMiddleCategroyList] = useState<
    string[]
  >([]);
  const [sportsMiddleCategoryList, setSportsMiddleCategroyList] = useState<
    string[]
  >([]);

  const streakPlus = (category: '운동' | '공부' | '기타' | '') => {
    //스트릭 추가 페이지
    if (modalState.isModalOpen) dispatch(closeModal());
    else {
      dispatch(
        openModal({
          isModalOpen: true,
          modalType: 'create',
          mainCategory: category,
        })
      );
    }
  };

  useEffect(() => {
    if (drawerState.drawerType === 'remove') setModalTypeKor('삭제');
    else if (drawerState.drawerType === 'lock') setModalTypeKor('비활성화');
    else if (drawerState.drawerType === 'unlock') setModalTypeKor('활성화');
  }, [drawerState.drawerType]);

  // 1. 생성하기

  const removeStreak = () => {
    // 스트릭을 정보를 디비에 보내고
    axios
      .patch(
        `${url.STREAK_DELETE_URL}`,
        JSON.stringify({ streakId: drawerState.streakId }),
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        axios
          .get(`${url.STREAK_LIST_URL}`, {
            headers: { Authorization: `Bearer ${AccessToken}` },
          })
          .then(res => {
            if (res.data) {
              dispatch(setMyStreakInfo(res.data));
            } else {
              alert('문제있음');
            }
          });
      })
      .catch(err => {
        console.log(url.STREAK_DELETE_URL);
        console.log(err);
      });
  };

  const deactiveStreak = () => {
    // 스트릭을 정보를 디비에 보내고
    const param = { streakId: drawerState.streakId };
    axios
      .patch(
        `${url.STREAK_ACTIVE_URL}`,
        JSON.stringify({ streakId: drawerState.streakId }),
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        axios
          .get(`${url.STREAK_LIST_URL}`, {
            headers: { Authorization: `Bearer ${AccessToken}` },
          })
          .then(res => {
            if (res.data) {
              dispatch(setMyStreakInfo(res.data));
            } else {
              alert('문제있음');
            }
          });
      });
  };

  return (
    <div className="w-full h-full">
      {isInfo !== null ? (
        <>
          <div className="loaded w-full h-full flex flex-col items-center outline  transition-all duration-300">
            {isProfilePage ? null : (
              <ChaeumHeader isLogo={false} title="Streak" />
            )}
            <div className="w-full flex-grow overflow-auto  flex justify-center items-end flex-col min-h-vh transition-all z-0">
              <div className="list flex flex-col items-center wrap-scroll w-full h-full mx-auto transition-all ease-out duration-300">
                <div className="category w-full mb-4 transition duration-300 ease-in-out">
                  <div className="category-title flex mb-4 flex-row justify-between items-center px-1 transition-all ease-in-out duration-300">
                    <span className="text-3xl text-left text-chaeum-gray-700">
                      운동
                    </span>
                    <CustomIconButton
                      size="sm"
                      iconType="plus"
                      colorInput="gray"
                      varient="text"
                      textsize="xl"
                      callback={() => streakPlus('운동')}
                    />
                  </div>
                  <StreakCardCarousel activeList={exerciseActive} />
                </div>
                <div className="category w-full mb-4 transition duration-300 ease-in-out">
                  <div className="category-title flex mb-4 flex-row justify-between items-center px-1 transition-all ease-out duration-300">
                    <span className="text-3xl text-left text-chaeum-gray-700 transition-all">
                      공부
                    </span>
                    <CustomIconButton
                      iconType="plus"
                      colorInput="gray"
                      varient="text"
                      textsize="xl"
                      callback={() => streakPlus('공부')}
                    />
                  </div>{' '}
                  <StreakCardCarousel activeList={studyActive} />
                </div>
                <div className="category w-full mb-4 transition duration-300 ease-in-out">
                  <div className="category-title flex mb-4 flex-row justify-between items-center px-1 ease-in-out">
                    <span className="text-3xl text-left text-chaeum-gray-700">
                      기타
                    </span>
                    <CustomIconButton
                      size="sm"
                      iconType="plus"
                      colorInput="gray"
                      varient="text"
                      textsize="xl"
                      callback={() => streakPlus('기타')}
                    />
                  </div>
                  <StreakCardCarousel activeList={othersActive} />
                </div>
              </div>
            </div>
            {isProfilePage ? null : <ChaeumNav />}
            {drawerState.isDrawerOpen ? (
              <div className="visible z-[9999] bg-white">
                {drawerState.isDrawerOpen ? (
                  <BottomDrawer
                    title={`스트릭 ${modalTypeKor}`}
                    content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                    button1={`${modalTypeKor}하기`}
                    button2="취소하기"
                    callback1={
                      drawerState.drawerType === 'remove'
                        ? removeStreak
                        : deactiveStreak
                    }
                    streakId={drawerState.streakId}
                    openChk={true}
                  />
                ) : (
                  <BottomDrawer
                    title={`스트릭 ${modalTypeKor}`}
                    content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                    button1={`${modalTypeKor}하기`}
                    button2="취소하기"
                    callback1={
                      drawerState.drawerType === 'remove'
                        ? removeStreak
                        : deactiveStreak
                    }
                    openChk={false}
                  />
                )}
              </div>
            ) : (
              <div className="invisible transition-all delay-500 z-[9999] bg-white">
                {drawerState.isDrawerOpen ? (
                  <BottomDrawer
                    title={`스트릭 ${modalTypeKor}`}
                    content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                    button1={`${modalTypeKor}하기`}
                    button2="취소하기"
                    callback1={
                      drawerState.drawerType === 'remove'
                        ? removeStreak
                        : deactiveStreak
                    }
                    streakId={drawerState.streakId}
                    openChk={true}
                  />
                ) : (
                  <BottomDrawer
                    title={`스트릭 ${modalTypeKor}`}
                    content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                    button1={`${modalTypeKor}하기`}
                    button2="취소하기"
                    callback1={
                      drawerState.drawerType === 'remove'
                        ? removeStreak
                        : deactiveStreak
                    }
                    openChk={false}
                  />
                )}
              </div>
            )}

            {modalState.isModalOpen ? (
              modalState.mainCategory === '운동' ? (
                <OverlayModal categoryList={sportsMiddleCategoryList} />
              ) : (
                <OverlayModal categoryList={studyMiddleCategoryList} />
              )
            ) : (
              <div className="bg-opacity-0 transition-all duration-500 opacity-0 text-opacity-0 ease-in"></div>
            )}
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center m-center transition-all duration-300">
          <div className="h-[70px]">
            <LoadingWave />
          </div>
          <div>스트릭을 열심히 채우는 중이에요!</div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
