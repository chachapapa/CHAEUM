import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';

/*
  사용 예시

  <Timer></Timer>
*/

const Stopwatch = () => {
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
    <div className="stopwatch-container">
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
    </div>
  );
};

export default Stopwatch;
