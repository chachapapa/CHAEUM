import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import ScreenOne from './screen/ScreenOne';
import ScreenTwo from './screen/ScreenTwo';
import ScreenThree from './screen/ScreenThree';
import axios from 'axios';
import { StreakInfoType } from '../Types';
import { useLocation } from 'react-router-dom';
import { API_ROUTES, getApiUrl } from '../../apiConfig';

type Props = {
  scrollY: number | undefined;
  userNickname: string;
};

// const STREAK_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/streak';
const AccessToken = localStorage.getItem('access_token');

const ButtonApp = ({ scrollY, userNickname }: Props) => {
  const [studyActive, setStudyActive] = useState<StreakInfoType[]>([]);
  const [exerciseActive, setExerciseActive] = useState<StreakInfoType[]>([]);
  const [othersActive, setOthersActive] = useState<StreakInfoType[]>([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${getApiUrl(API_ROUTES.STREAK_LIST_URL)}`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
        params: { nickname: decodeURI(location.pathname.split('/')[2]) },
      })
      .then(res => {
        console.log(res);
        if (res.data) {
          // console.log(res.data[0].data);
          setStudyActive(res.data[0]);
          setExerciseActive(res.data[1]);
          setOthersActive(res.data[2]);
        } else {
          console.log('유저 정보가 없어용');
        }
      })
      .catch(e => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 버튼 배열
  const but = [
    {
      label: '스트릭',
      value: 'My Streak',
      desc: (
        <ScreenOne
          studyActive={studyActive}
          exerciseActive={exerciseActive}
          othersActive={othersActive}
        ></ScreenOne>
      ),
    },
    {
      label: '게시글',
      value: 'My Feed',
      desc: <ScreenTwo userNickname={userNickname}></ScreenTwo>,
    },
    {
      label: '친구',
      value: 'My Friend',
      desc: <ScreenThree></ScreenThree>,
    },
  ];

  const initialValue = but[1].value; // 두 번째 탭의 value 값을 가져옴

  return (
    <Tabs value={initialValue}>
      <TabsHeader
        className={
          scrollY !== undefined && scrollY > 314
            ? 'fixed top-[56px] p-0 w-[100vw]  border-4 border-white z-50'
            : 'p-0 border-4 border-white'
        }
      >
        {but.map(({ label, value }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center font-normal text-sm">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        className={scrollY !== undefined && scrollY > 314 ? 'mt-[28px]' : ''}
      >
        {but.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="w-full px-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default ButtonApp;
