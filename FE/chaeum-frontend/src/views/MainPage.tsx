import React, { useState } from 'react';
import { useEffect } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import ActiveInfoCard from '../components/active/ActiveInfoCard';
import { Await, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import CustomIconButton from '../components/common/CustomIconButton';
import { ChaeumNav } from '../components/common/ChaeumNav';
import { StreakCardCarousel } from '../components/main/StreakCardCarousel';
import { StreakCardInfoType } from '../components/Types';
import InputTag from '../components/common/InputTag';
import Dropdown from '../components/common/Dropdown';
import { TagInput } from '../components/main/TagInput';
import ColorContainer from '../components/common/ColorContainer';
import { Option, Select } from '@material-tailwind/react';
import { BottomDrawer } from '../components/common/BottomDrawer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/reduxHooks';
import LoadingPage from '../components/common/LoadingPage';
import { openModal, closeModal } from '../features/states/states';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/
const ACCESS_TOKEN_URL = 'http://i9a810.p.ssafy.io:8080/api/token';

const MainPage = () => {
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

  // fetch로 streakInfo 받아오기
  // 현재 더미데이터
  const streakInfo: StreakCardInfoType[] = [
    {
      category: '공부',
      title: '1일 1솔',
      tags: ['공부', '코딩', '알고리즘', '백준', '하기시룸'],
      color: 'chaeumblue',
      isDeactive: true,
      info: [],
    },
    {
      category: '공부',
      title: '🈚 한자 졸업요건 언제 사라져',
      tags: ['공부', '한자', '상공회의소', '4급'],
      color: 'orange',
      info: [],
    },
    {
      category: '공부',
      title: '정처기',
      tags: ['공부', '3일의 전사'],
      color: 'fuchsia',
      info: [],
    },
    {
      category: '공부',
      title: '코더 말고 개발자',
      tags: ['공부'],
      color: 'violet',
      info: [],
    },
    {
      category: '운동',
      title: '💧🐶 물개프로젝트',
      tags: ['운동', '수영', '오정레포츠센터'],
      color: 'rose',
      info: [
        {
          date: '2023-7-30',
          activetime: 2,
        },
        {
          date: '2023-7-29',
          activetime: 5,
        },
        {
          date: '2023-7-28',
          activetime: 4,
        },
        {
          date: '2023-7-27',
          activetime: 1,
        },
        {
          date: '2023-7-24',
          activetime: 4,
        },
        {
          date: '2023-7-18',
          activetime: 2,
        },
        {
          date: '2023-7-17',
          activetime: 3,
        },
        {
          date: '2023-7-16',
          activetime: 1,
        },
        {
          date: '2023-7-11',
          activetime: 1,
        },
        {
          date: '2023-7-4',
          activetime: 1,
        },
        {
          date: '2023-7-2',
          activetime: 2,
        },
        {
          date: '2023-7-1',
          activetime: 2,
        },
        {
          date: '2023-6-30',
          activetime: 5,
        },
        {
          date: '2023-6-29',
          activetime: 1,
        },
        {
          date: '2023-6-23',
          activetime: 4,
        },
      ],
    },
    {
      category: '운동',
      title: '1만보 걷기',
      tags: ['운동', '걷기'],
      color: 'green',
      info: [],
    },
    {
      category: '기타',
      title: '피아노',
      tags: ['기타', '악기', '피아노', '라흐완주', '월광'],
      color: 'yellow',
      info: [
        {
          date: '2023-8-1',
          activetime: 3,
        },
        {
          date: '2023-7-28',
          activetime: 1,
        },
        {
          date: '2023-7-27',
          activetime: 1,
        },
        {
          date: '2023-7-26',
          activetime: 4,
        },
        {
          date: '2023-7-25',
          activetime: 2,
        },
        {
          date: '2023-7-24',
          activetime: 2,
        },
        {
          date: '2023-7-23',
          activetime: 4,
        },
        {
          date: '2023-7-22',
          activetime: 1,
        },
        {
          date: '2023-7-19',
          activetime: 3,
        },
        {
          date: '2023-7-18',
          activetime: 3,
        },
        {
          date: '2023-7-17',
          activetime: 4,
        },
        {
          date: '2023-7-12',
          activetime: 1,
        },
        {
          date: '2023-7-11',
          activetime: 5,
        },
        {
          date: '2023-7-5',
          activetime: 8,
        },
        {
          date: '2023-7-4',
          activetime: 2,
        },
        {
          date: '2023-7-3',
          activetime: 2,
        },
        {
          date: '2023-7-2',
          activetime: 2,
        },
        {
          date: '2023-7-1',
          activetime: 2,
        },
        {
          date: '2023-6-30',
          activetime: 2,
        },
        {
          date: '2023-6-27',
          activetime: 4,
        },
      ],
    },
  ];

  const today: Date = new Date();
  let activeDate: Date = new Date();

  const getStreakCnt = () => {
    const Date = today.getDate();
    if (Date === 0) return 49;
    else return 42 + Date * 7;
  };

  for (let i = 0; i < getStreakCnt(); i++) {
    activeDate = new Date(activeDate.setDate(activeDate.getDate() - 1));
    const dateString =
      activeDate.getFullYear() +
      '-' +
      (activeDate.getMonth() + 1) +
      '-' +
      activeDate.getDate();
    // console.log(dateString);
    const activeTime = Math.floor(Math.random() * 5) + 1;
    const sampleActive = {
      date: dateString,
      activetime: activeTime,
    };
    streakInfo[0].info?.push(sampleActive);
  }

  // ----------------------------------------------

  // 카테고리 별로 분리하기
  const studyActive: StreakCardInfoType[] = [];
  const exerciseActive: StreakCardInfoType[] = [];
  const othersActive: StreakCardInfoType[] = [];

  streakInfo.map((obj, index) => {
    if (obj.category === '공부') {
      studyActive.push(obj);
    } else if (obj.category === '운동') {
      exerciseActive.push(obj);
    } else {
      othersActive.push(obj);
    }
  });

  // 모달 창 열기

  const drawerType = useAppSelector(state => state.stateSetter.drawerType);
  const isDrawerOpen = useAppSelector(state => state.stateSetter.isDrawerOpen);
  const { modalState } = useAppSelector(state => state.stateSetter);
  const dispatch = useDispatch();

  // 스트릭 생성하기
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [goCreate, setGoCreate] = useState(false);
  const [goModify, setGoModify] = useState(false);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryList, setCategoryList] = useState<mainCategory>([]);
  const [modalTypeKor, setModalTypeKor] = useState<string>('');

  const categoryExercise = [
    { id: 0, main: '운동', name: '수영' },
    { id: 1, main: '운동', name: '러닝' },
    { id: 2, main: '운동', name: '헬스' },
    { id: 3, main: '운동', name: '자전거' },
    { id: 4, main: '운동', name: '클라이밍' },
  ];

  const categoryStudy = [
    { id: 0, main: '공부', name: '학교' },
    { id: 1, main: '공부', name: '자격증' },
    { id: 2, main: '공부', name: '프로그래밍' },
    { id: 3, main: '공부', name: '영어' },
    { id: 4, main: '공부', name: '고시' },
  ];

  const streakPlus = (category: '운동' | '공부' | '기타' | '') => {
    //스트릭 추가 페이지
    if (modalState.isModalOpen) dispatch(closeModal());
    else
      dispatch(
        openModal({
          isModalOpen: true,
          modalType: 'create',
          mainCategory: category,
        })
      );
  };

  useEffect(() => {
    if (modalState.mainCategory === '기타') setCategoryList([]);
    else if (modalState.mainCategory === '공부') setCategoryList(categoryStudy);
    else setCategoryList(categoryExercise);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.mainCategory]);

  useEffect(() => {
    if (drawerType === 'remove') setModalTypeKor('삭제');
    else if (drawerType === 'lock') setModalTypeKor('비활성화');
    else if (drawerType === 'unlock') setModalTypeKor('활성화');
  }, [drawerType]);

  const createStreak = () => {
    // 스트릭을 정보를 디비에 보내고
    setGoCreate(true);
    setTimeout(() => {
      dispatch(closeModal());
      setGoCreate(false);
    }, 1500);

    // 창닫기
  };

  const modifyStreak = () => {
    // 스트릭을 정보를 디비에 보내고
    setGoModify(true);
    setTimeout(() => {
      dispatch(closeModal());
      setGoCreate(false);
    }, 1500);

    // 창닫기
  };

  const colorArr = [
    {
      color: 'bg-red-400',
    },
    {
      color: 'bg-orange-400',
    },
    {
      color: 'bg-amber-400',
    },
    {
      color: 'bg-yellow-400',
    },
    {
      color: 'bg-lime-400',
    },
    {
      color: 'bg-green-400',
    },
    {
      color: 'bg-emerald-400',
    },
    {
      color: 'bg-teal-400',
    },
    {
      color: 'bg-cyan-400',
    },
    {
      color: 'bg-chaeum-blue-400',
    },
    {
      color: 'bg-sky-400',
    },
    {
      color: 'bg-blue-400',
    },
    {
      color: 'bg-indigo-400',
    },
    {
      color: 'bg-violet-400',
    },
    {
      color: 'bg-purple-400',
    },
    {
      color: 'bg-fuchsia-400',
    },
    {
      color: 'bg-pink-400',
    },
    {
      color: 'bg-rose-400',
    },
    {
      color: 'bg-slate-400',
    },
  ];

  type mainCategory = {
    id: number;
    main: string;
    name: string;
  }[];

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');

  //로컬스토리지에 토큰 저장하기.
  if (token) {
    localStorage.setItem('access_token', token);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col items-center outline">
        <ChaeumHeader isLogo={false} title="Streak" />
        <div className="w-full flex-grow overflow-auto  flex justify-center items-end flex-col min-h-vh transition-all z-0">
          <div className="list flex flex-col items-center wrap-scroll w-full h-full mx-auto transition-all ease-out duration-300">
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
              </div>
              <StreakCardCarousel activeList={studyActive} />
            </div>
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
        <ChaeumNav />
        {isDrawerOpen ? (
          <div className="visible z-[9999] bg-white">
            {isDrawerOpen ? (
              <BottomDrawer
                title={`스트릭 ${modalTypeKor}`}
                content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                button1={`${modalTypeKor}하기`}
                button2="취소하기"
                openChk={true}
              />
            ) : (
              <BottomDrawer
                title={`스트릭 ${modalTypeKor}`}
                content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                button1={`${modalTypeKor}하기`}
                button2="취소하기"
                openChk={false}
              />
            )}
          </div>
        ) : (
          <div className="invisible transition-all delay-500 z-[9999] bg-white">
            {isDrawerOpen ? (
              <BottomDrawer
                title={`스트릭 ${modalTypeKor}`}
                content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                button1={`${modalTypeKor}하기`}
                button2="취소하기"
                openChk={true}
              />
            ) : (
              <BottomDrawer
                title={`스트릭 ${modalTypeKor}`}
                content={`스트릭을 ${modalTypeKor}하시겠습니까?`}
                button1={`${modalTypeKor}하기`}
                button2="취소하기"
                openChk={false}
              />
            )}
          </div>
        )}
      </div>
      {modalState.isModalOpen ? (
        <div className="fixed flex flex-2 justify-center items-center flex-col shrink-0 inset-0 w-full h-full pointer-events-auto z-[9995] bg-chaeum-gray-300 bg-opacity-60 backdrop-blur-lg transition-all duration-300">
          <div className="w-[46.15vh] flex flex-col justify-center items-center">
            <span className="font-bold text-2xl m-8 w-full">
              {modalState.modalType === 'create'
                ? '스트릭 생성하기'
                : '스트릭 수정하기'}
            </span>
            <div className="w-full flex flex-col">
              <span className="text-start m-1 text-sm text-chaeum-gray-700">
                스트릭 이름
              </span>
              {modalState.modalType === 'create' ? (
                <InputTag
                  label="스트릭 이름을 입력하세요."
                  width="w-full mb-5"
                />
              ) : (
                <InputTag label="이미 있는 이름 넣기" width="w-full mb-5" />
              )}
            </div>

            {modalState.mainCategory !== '기타' && (
              <div className=" flex flex-col w-full mb-5">
                <div className="w-full flex flex-col">
                  <span className="text-start m-1 text-sm text-chaeum-gray-700">
                    중분류
                  </span>
                  <Select
                    placeholder="중분류를 선택하세요."
                    className={
                      'h-10 bg-white w-full bg-opacity-50 border-[1px] focus:border-2 border-chaeum-gray-500/80 focus:border-blue-500'
                    }
                  >
                    {categoryList.map(category => (
                      <Option key={category.id}>{category.name}</Option>
                    ))}
                    {}
                  </Select>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col">
              <span className="text-start m-1 text-sm text-chaeum-gray-700">
                태그
              </span>
              <TagInput />
            </div>
            <br />
            <div className="w-full flex flex-col">
              <span className="text-start m-1 text-sm text-chaeum-gray-700">
                색상
              </span>
              <div className="flex w-full overflow-auto overflow-y-hidden">
                {colorArr.map((container, idx) => (
                  <ColorContainer key={idx} color={container.color} />
                ))}
              </div>
            </div>
            <div className="transition-all duration-300 opacity-100 w-full my-8">
              <div className="buttons flex flex-col w-full justify-center items-center gap-y-5">
                {modalState.modalType === 'create' ? (
                  <TextButton
                    label="생성하기"
                    type="warning"
                    className="h-12 w-full"
                    callback={createStreak}
                  />
                ) : (
                  <TextButton
                    label="수정하기"
                    type="warning"
                    className="h-12 w-full"
                    callback={modifyStreak}
                  />
                )}

                <TextButton
                  label="취소하기"
                  type="gray"
                  className="h-12 w-full text-chaeum-gray-900 text-center justify-items-center"
                  callback={() => streakPlus('')}
                />
              </div>
              {modalState.modalType === 'create' ? (
                <div className="text-center my-4 p-2 rounded-lg transition-all duration-500 w-full">
                  {goCreate ? (
                    <span className="bg-chaeum-blue-700 bg-opacity-70 p-2 text-xs text-white rounded-lg transition-all duration-500  w-full">
                      "공부" 카테고리에 새로운 스트릭을 만들었어요!
                    </span>
                  ) : (
                    <span className="transition-all duration-500 bg-white bg-opacity-0 text-opacity-0 text-white invisible">
                      "공부" 카테고리에 새로운 스트릭을 만들었어요!
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-center my-4 p-2 rounded-lg transition-all duration-500 w-full">
                  {goModify ? (
                    <span className="bg-chaeum-blue-700 bg-opacity-70 p-2 text-xs text-white rounded-lg transition-all duration-500  w-full">
                      '스트릭 이름'을 수정했어요!
                    </span>
                  ) : (
                    <span className="transition-all duration-500 bg-white bg-opacity-0 text-opacity-0 text-white invisible">
                      '스트릭 이름'을 수정했어요!
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-opacity-0 transition-all duration-500 opacity-0 text-opacity-0 ease-in"></div>
      )}
    </div>
  );
};

export default MainPage;
