import React, { useEffect, useState } from 'react';
import { WaveColor } from '../theme/WaveColorTheme';
import { WaveBottomColor } from '../theme/StreakTheme';
import { ColorVariation, Story } from '../Types';

type Props = {
  color: ColorVariation;
  story: Story;
  closeStoryDetail: (e: React.MouseEvent) => void;
};

const StoryActivityInfoCard = ({ color, story, closeStoryDetail }: Props) => {
  const weight0 = 'w0';
  const weight2 = 'w2';
  const weight3 = 'w3';
  const weight4 = 'w4';
  const waveFirst = WaveColor({ color: color, weight4 });
  const waveSecond = WaveColor({ color: color, weight3 });
  const waveThird = WaveColor({ color: color, weight2 });
  const BottomFirst = WaveBottomColor({ color: color, weight4 });
  const BottomSecond = WaveBottomColor({ color: color, weight3 });
  const BottomThird = WaveBottomColor({ color: color, weight2 });
  const backgroundColor = WaveBottomColor({ color: color, weight0 });
  const startTime: Date = new Date(story.activeStartTime);
  const [time, setTime] = useState(
    calculateTimeDifference(story.activeStartTime)
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
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculat
  const seconds = Math.floor(time % 60);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className={`relative w-full h-[160px] mb-3 shadow-md rounded-lg ${backgroundColor}`}
    >
      <div className="flex flex-col">
        <div className="self-end mx-3 my-1">
          <i className="fa-solid fa-xmark" onClick={closeStoryDetail}></i>
        </div>
        <div className="flex w-full items-center justify-between gap-x-4">
          <div className="flex items-center ml-3">
            <img
              src={`${story.profileUrl}`}
              alt=""
              className="h-12 w-12 rounded-full bg-gray-50 mr-2"
            />
            <div>
              <p className="text-chaeum-gray-900 text-left text-lg">
                {story.friendName}
              </p>
              <div
                className={`text-xs ${BottomSecond} rounded-md py-0.5 px-1 w-fit`}
                style={{ display: 'flex', flexWrap: 'wrap' }}
              >
                <p className="text-chaeum-gray-900 text-left text-md font-bold">
                  {story.streakName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-sm py-0.5 px-1 gap-1 flex-wrap">
            {story.tagList.map((tag, index) => (
              <div
                className="text-left px-1 py-0.5 whitespace-nowrap rounded-md"
                key={index}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[40px]"></div>
      {/* 스트릭 넣어야함*/}

      <p className="text-black text-center text-2xl z-10 relative">
        {formattedTime}
      </p>

      <div className="absolute bottom-0 flex flex-col w-full">
        <svg
          className="waves z-0 "
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
            <use
              xlinkHref="#gentle-wave-back"
              x="60"
              y="0"
              className={`${waveThird} opacity-50`}
            />
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
        <div className="relative h-5 w-full">
          <div
            className={`absolute bottom-0 w-full h-5 ${BottomThird} opacity-50 `}
          ></div>
          <div
            className={`absolute bottom-0 w-full h-5 ${BottomSecond} opacity-50 `}
          ></div>
          <div
            className={`absolute bottom-0 w-full h-5 ${BottomFirst} opacity-50 `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StoryActivityInfoCard;
