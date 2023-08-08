import React, { useState, useEffect } from 'react';
import { Button, Card, Carousel } from '@material-tailwind/react';
import ActiveInfoCard from './ActiveInfoCard';
import PhraseCard from './PhraseCard';
import { useNavigate } from 'react-router';
import { Tag } from '../common/Tag';

/*
  사용 예시

  <Timer></Timer>
*/

const ActiveFullScreen = () => {
  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(true);

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

  const navigate = useNavigate();
  const goResult = () => {
    navigate('/active/result');
  };

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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

  const tags = [
    {
      id: 1,
      tag: '클라이밍',
    },
    {
      id: 3,
      tag: '열심히',
    },
    {
      id: 2,
      tag: '운동',
    },
  ];
  return (
    <div className="z-10 stopwatch-container bg-chaeum-blue-300 w-[452px] h-[932px]">
      <div className="max-w-[452px] mx-auto overflow-hidden">
        <div className="text-5xl mt-5"> 채움 중 ...</div>
        <div className="mt-5">
          {tags.map(tag => (
            <Tag tag={tag.tag} key={tag.id} color="blue"></Tag>
          ))}
        </div>
        <div className="text-5xl mt-10">{formattedTime}</div>
        <div className="bg-chaeum-blue-300 p-4 w-300 h-200 items-center">
          <Card>
            <PhraseCard title="친구의 응원글" ment={'응원글'}></PhraseCard>
          </Card>
        </div>
        <div className="bg-chaeum-blue-300 p-4 w-300 h-200 items-center">
          <Card>
            <PhraseCard title="동기부여멘트" ment={'동기부여멘트'}></PhraseCard>
          </Card>
        </div>
        <div className="mx-auto flex justify-center place-items-center pt-7">
          <Button
            className=" m-4 float-left; w-40"
            variant="filled"
            color="gray"
            size="lg"
            ripple={true}
            onClick={startAndStop}
          >
            {isRunning ? <div>일시중지</div> : <div>다시시작</div>}
          </Button>
          <Button
            className="m-4 float-left; w-40"
            variant="filled"
            size="lg"
            ripple={true}
            onClick={goResult}
          >
            활동종료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveFullScreen;
