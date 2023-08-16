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

type Props = {
  scrollY : number|undefined;
}

const ButtonApp = ({scrollY}:Props) => {
  // 버튼 배열
  const but = [
    {
      label: '스트릭',
      value: 'My Streak',
      desc: <ScreenOne></ScreenOne>,
    },
    {
      label: '게시글',
      value: 'My Feed',
      desc: <ScreenTwo></ScreenTwo>,
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
      <TabsHeader className={scrollY !== undefined && scrollY > 314? 'fixed top-[56px] p-0 w-[100vw]  border-4 border-white z-50':'p-0 border-4 border-white'}>
        {but.map(({ label, value }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center font-normal text-sm">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className={scrollY !== undefined && scrollY > 314? 'mt-[28px]' : ''}>
        {but.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="w-full">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default ButtonApp;
