import React from 'react';
import { useEffect } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import ActiveInfoCard from '../components/active/ActiveInfoCard';
import { useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import CustomIconButton from '../components/common/CustomIconButton';
import { ChaeumNav } from '../components/common/ChaeumNav';
import { StreakCardCarousel } from '../components/main/StreakCardCarousel';
import { StreakCardInfoType } from '../components/Types';

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

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');

  //로컬스토리지에 토큰 저장하기.
  if (token) {
    localStorage.setItem('access_token', token);
  }

  // fetch로 streakInfo 받아오기
  // 현재 더미데이터
  const streakInfo: StreakCardInfoType[] = [
    {
      category: '공부',
      title: '1일 1솔',
      tags: ['공부', '코딩', '알고리즘', '백준', '하기시룸'],
      color: 'chaeumblue',
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

  const streakPlus = (category: string) => {
    //스트릭 추가 페이지
    alert('스트릭 추가');
  };

  return (
    <div className="w-full flex flex-col items-center outline">
      <ChaeumHeader isLogo={false} title="Streak" />
      <div className="w-full h-full flex-grow overflow-auto  flex justify-center items-end outline flex-col min-h-vh transition-all">
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
    </div>
    // </div>
  );
};

export default MainPage;
