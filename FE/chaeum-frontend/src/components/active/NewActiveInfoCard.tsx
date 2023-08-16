import React, { useEffect, useState } from 'react';
import '../styles/activecardwave.css';
import { WaveColor } from '../theme/WaveColorTheme';
import { useAppSelector } from '../../hooks/reduxHooks';

/*
  사용법
  <NewActiveInfoCard 
    time={15}>
  </NewActiveInfoCard>

  닉네임은 8글자(한글) 제한이 될 것 같습니다
  
  태그는 최대 3칸 지원하며(공간상의 문제)
  
  타이머는 컴포넌트 내에서 연산을 계속하는것 보다
  "현재 시간 - 최초 활동시간" 을 number로 넘겨서
  작동하게끔 로직을 구현했습니다.
*/

type Props = {
  // 렌더링 문제로 string이 아닌 number로 넘겨서 계산해야 합니다.
  time: number;
};

const NewActiveInfoCard = (props: Props) => {
  const waveFirst = WaveColor({ color: 'chaeumblue' });
  const waveSecond = WaveColor({ color: 'chaeumblue' });

  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  const myAccumulateTime = useAppSelector(
    state => state.stateSetter.myAccumulateTime
  );

  const [time, setTime] = useState(
    myAccumulateTime + calculateTimeDifference(myActivityInfo.date)
  );

  function calculateTimeDifference(targetTime: string): number {
    /*
      현재 시간 - 활동 시작시간 을 빼면
      라이벌이 활동중일때 accumulateTime + 해당 시간 차 만큼
      활동시간을 갱신할 수 있습니다.
    */

    const currentTime = new Date();
    const targetDate = new Date(targetTime);

    const timeDifferenceInSeconds = Math.floor(
      (currentTime.getTime() - targetDate.getTime()) / 1000
    );

    return timeDifferenceInSeconds;
  }

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(time => time + 1); // Increment time by 100 milliseconds (1 second)
      // console.log(time);
      // console.log(myActivityInfo.myAccumalteTime);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor((time % 60) / 1);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="relative flex overflow-auto rounded-lg shadow-xl">
      <div className="flex flex-col justify-around w-full m-2">
        <div className="text-5xl z-20">{formattedTime}</div>
      </div>
      <svg
        className="waves absolute self-end z-10"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        height="42.93px"
        width="100%"
      >
        <defs>
          <path
            id="gentle-wave-front"
            d="M-160 44c30 0 50-13 88-13s 50 13 88 13 50-13 88-13 50 13 88 13 v44h-352z"
          />
          <path
            id="gentle-wave-middle"
            d="M-160 44c40 0 58-10.4 88-18s 55 18 90 18 58-11 88-18 58 21 88 18 v44h-352z"
          />
          <path
            id="gentle-wave-back"
            d="M-160 44c30 0 50-13 90-15s 50 13 88 13 50-13 87-13 50 13 80 12 v44h-352z"
          />
        </defs>
        <g className="parallax">
          {/* <use
            xlinkHref="#gentle-wave-back"
            x="48"
            y="0"
            className={`${waveThird} opacity-50`}
          /> */}
          <use
            xlinkHref="#gentle-wave-middle"
            x="48"
            y="0"
            className={`${waveSecond} opacity-50`}
          />
          <use
            xlinkHref="#gentle-wave-front"
            x="48"
            y="0"
            className={`${waveFirst} opacity-50`}
          />
        </g>
      </svg>
      {/* <div className="relative h-16">
        <div className={`absolute bottom-0 w-full h h-16 ${BottomThird} opacity-50`}></div>
        <div className={`absolute bottom-0 w-full h h-16 ${BottomSecond} opacity-50`}></div>
        <div className={`absolute bottom-0 w-full h h-16 ${BottomFirst} opacity-50`}></div>
      </div> */}
    </div>
  );
};

export default NewActiveInfoCard;
