import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setCurrentTab } from '../../features/tab/tab';
import AnimatedIcon from './AnimatedIcon';

export const ChaeumNav = () => {
  const navigate = useNavigate();
  const currentTab = useAppSelector(state => state.tabSetter.tabNumber);
  const dispatch = useAppDispatch();

  console.log('렌더링시 state 내 탭번호' + currentTab);

  // const [tabNumber, setTabNumber] = useState<number>(0);

  const onTabClick = (value: number) => {
    console.log('탭클릭함수  실행');
    // setTabNumber(value);
    dispatch(setCurrentTab(value));

    console.log('디스패치와 라우팅 사이'+ currentTab);

    if (value === 0) {
      navigate('/feed');
    } else if (value === 1) {
      navigate('/main');
    } else {
      //뒤에 유저 id 넣어야함.
      navigate('/profile');
    }
  };

  return (

    <div className="sticky bottom-0 left-0 flex flex-row justify-around items-center w-full h-14 bg-white">
      {currentTab === 0 ? (
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

      {currentTab === 1 ? (
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

      {currentTab === 2 ? (
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
