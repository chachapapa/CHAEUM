import React from 'react';
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

const ButtonApp = () => {
  // 버튼 배열
  const but = [
    {
      label: '내 스트릭',
      value: 'My Streak',
      desc: <ScreenOne></ScreenOne>,
    },
    {
      label: '내 게시글',
      value: 'My Feed',
      desc: <ScreenTwo></ScreenTwo>,
    },
    {
      label: '내 친구',
      value: 'My Friend',
      desc: <ScreenThree></ScreenThree>,
    },
  ];

  const initialValue = but[1].value; // 두 번째 탭의 value 값을 가져옴

  return (
    <Tabs value={initialValue}>
      <TabsHeader>
        {but.map(({ label, value }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2 font-bold">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
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
