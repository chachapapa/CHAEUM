import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import MainPage from '../../../views/MainPage';
import CustomIconButton from '../../common/CustomIconButton';
import { StreakCardCarousel } from '../../main/StreakCardCarousel';
import { StreakInfoType } from '../../Types';
import axios from 'axios';


type Props ={
  exerciseActive : StreakInfoType[],
  studyActive : StreakInfoType[];
  othersActive : StreakInfoType[];
}

const ScreenOne = ({exerciseActive, studyActive, othersActive}:Props) => {
  
  // console.log(exerciseActive);
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex-grow overflow-auto  flex justify-center items-end flex-col min-h-vh transition-all z-0">
          <div className="list flex flex-col items-center wrap-scroll w-full h-full mx-auto transition-all ease-out duration-300">
            <div className="category w-full mb-4 transition duration-300 ease-in-out">
              <div className="category-title flex mb-4 flex-row justify-between items-center px-1 transition-all ease-out duration-300">
                <span className="text-3xl text-left text-chaeum-gray-700 transition-all">
                  공부
                </span>
              </div>
              <StreakCardCarousel activeList={studyActive} />
            </div>
            <div className="category w-full mb-4 transition duration-300 ease-in-out">
              <div className="category-title flex mb-4 flex-row justify-between items-center px-1 transition-all ease-in-out duration-300">
                <span className="text-3xl text-left text-chaeum-gray-700">
                  운동
                </span>
              </div>
              <StreakCardCarousel activeList={exerciseActive} />
            </div>
            <div className="category w-full mb-4 transition duration-300 ease-in-out">
              <div className="category-title flex mb-4 flex-row justify-between items-center px-1 ease-in-out">
                <span className="text-3xl text-left text-chaeum-gray-700">
                  기타
                </span>
              </div>
              <StreakCardCarousel activeList={othersActive} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenOne;
