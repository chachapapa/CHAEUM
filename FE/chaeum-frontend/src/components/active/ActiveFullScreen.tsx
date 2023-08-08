import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import ActiveInfoCard from './ActiveInfoCard';

/*
  사용 예시

  <Timer></Timer>
*/

const ActiveFullScreen = () => {
  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
    console.log(Math.floor(time / 100));
    console.log('현재 시간 입니다 : ' + currentTimer());
    console.log('현재 시간 타입입니다 : ' + typeof currentTimer());
  };

  const currentTimer = () => {
    const now = new Date();
    const year = String(now.getFullYear());
    const months = String(now.getMonth()).padStart(2, '0');
    const days = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${months}-${days} ${hours}:${minutes}:${seconds}`;
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };
  return (
    <div className="z-10 stopwatch-container bg-chaeum-blue-300 w-[452px] h-[932px]">
      {/* <div className="z-50 stopwatch-container bg-white w-[452px] h-[400px] flex justify-center items-center">
        <img src="../icon/gray_bar.png" alt="회색 바"></img>
        <div className="text-2xl pt-20"> 채움 중</div>
        <h1 className="stopwatch-time text-2xl">
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </h1>
        <div className="stopwatch-buttons">
          <Button className="stopwatch-button m-4" onClick={startAndStop}>
            {isRunning ? '일시정지' : '계속하기'}
          </Button>
          <Button className="stopwatch-button m-4" onClick={reset}>
            그만두기
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default ActiveFullScreen;
