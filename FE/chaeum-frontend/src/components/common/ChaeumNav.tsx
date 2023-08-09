import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setCurrentTab } from '../../features/states/states';
import AnimatedIcon from './AnimatedIcon';

export const ChaeumNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = useAppSelector(state => state.stateSetter.tabNumber);
  const dispatch = useAppDispatch();

  console.log('렌더링시 state 내 탭번호' + currentTab);

  const [currentLocation, setCurrentLocation] = useState<string>('main');

  const onTabClick = (value:number) => {
    
    dispatch(setCurrentTab(value));

    if (value === 0) {
      navigate('/feed');
    } else if (value === 1) {
      navigate('/main');
    } else {
      //뒤에 유저 id 넣어야함.
      navigate('/profile');
    }
  };

  useEffect(() => {
    const tmplocation = location.pathname.split('/');
    setCurrentLocation(tmplocation[1]);
  },[location.pathname]);
  

  return (

    <div className="sticky bottom-0 left-0 flex flex-row justify-around items-center w-full min-h-[56px] bg-white">
      {currentLocation === 'feed' ? (
        <i
          className="fa-solid fa-square-poll-horizontal text-2xl text-chaeum-blue-500"
          onClick={() => onTabClick(0)}
        ></i>
      ) : (
        <i
          className="fa-solid fa-square-poll-horizontal text-2xl text-chaeum-gray-900"
          onClick={() => onTabClick(0)}
        ></i>
      )}

      {currentLocation === 'main' ? (
        <i
          className="fa-regular fa-square text-2xl text-chaeum-blue-500"
          onClick={() => onTabClick(1)}
        ></i>
      ) : (
        <i
          className="fa-regular fa-square text-2xl text-chaeum-gray-900"
          onClick={() => onTabClick(1)}
        ></i>
      )}

      {currentLocation === 'profile' ? (
        <i
          className="fa-regular fa-user text-2xl text-chaeum-blue-500"
          onClick={() => onTabClick(2)}
        ></i>
      ) : (
        <i
          className="fa-regular fa-user text-2xl text-chaeum-gray-900"
          onClick={() => onTabClick(2)}
        ></i>
      )}
    </div>


  // <div className="sticky bottom-0 left-0 flex flex-row justify-around items-center w-full h-14 bg-white">
  //   {currentTab === 0 ? (
  //     <AnimatedIcon icon="feed" onTabClick={() => onTabClick(0)} />
  //   ) : (
  //     <i
  //       className="fa-solid fa-square-poll-horizontal text-2xl text-chaeum-gray-900"
  //       onClick={() => onTabClick(0)}
  //     ></i>
  //   )}
  //   {currentTab === 1 ? (
  //     <AnimatedIcon icon="main" onTabClick={() => onTabClick(1)} />
  //   ) : (
  //     <i
  //       className="fa-regular fa-square text-2xl text-chaeum-gray-900"
  //       onClick={() => onTabClick(1)}
  //     ></i>
  //   )}
  //   {currentTab === 1 ? (
  //     <AnimatedIcon icon="profile" onTabClick={() => onTabClick(1)} />
  //   ) : (
  //     <i
  //       className="fa-regular fa-user text-2xl text-chaeum-gray-900"
  //       onClick={() => onTabClick(2)}
  //     ></i>
  //   )}
  // </div>
  );
};
