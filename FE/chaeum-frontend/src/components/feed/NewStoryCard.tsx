import React, { useEffect, useState } from 'react';
import '../styles/activecardwave.css';
import { WaveColor } from '../theme/WaveColorTheme';
import { WaveBottomColor } from '../theme/StreakTheme';
import { Avatar } from '@material-tailwind/react';
import { ColorVariation, Story } from '../Types';

/*
  사용법
  <StoryCard 
    color='yellow' 
    img='../chacha2.png' 
    nickname='코코' 
    tag={['tag1', 'tag2', 'tag3']} 
    time={15}>
  </StoryCard>

  닉네임은 8글자(한글) 제한이 될 것 같습니다
  
  태그는 최대 3칸 지원하며(공간상의 문제)
  
  타이머는 컴포넌트 내에서 연산을 계속하는것 보다
  "현재 시간 - 최초 활동시간" 을 number로 넘겨서
  작동하게끔 로직을 구현했습니다.
*/

type Props = {
  story: Story;
  onStoryClicked : ()=>void;
};

const NewStoryCard = ({story, onStoryClicked}: Props) => {
  const weight0 = 'w0';
  const weight3 = 'w3';
  const weight4 = 'w4';
  const waveFirst = WaveColor({ color: story.color, weight4 });
  const waveSecond = WaveColor({ color: story.color, weight3 });
  const titleBoxColor = WaveBottomColor({ color: story.color, weight3 });
  const backgroundColor = WaveBottomColor({ color: story.color, weight0 });

  const [time, setTime] = useState(story.time);

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 100); // Increment time by 100 milliseconds (1 second)
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculat
  const seconds = Math.floor((time % 6000) / 100);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={`${backgroundColor} relative min-w-[230px] min-h-[150px] flex overflow-auto rounded-lg shadow-lg mr-10 z-20`} onClick={onStoryClicked}>
      <div className="flex flex-col justify-around w-full m-2">
        <div className="relative flex items-center gap-x-1">
          <img
            src={story.profileImg}
            alt=""
            className="h-14 w-14 rounded-full bg-gray-50"
          />
          <div className="text-base leading-6">
            <p className="text-chaeum-gray-900 text-left">{story.nickname}</p>
            <div
              className={`text-xs ${titleBoxColor} rounded-md py-0.5 px-1 w-fit`}
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              <p className="font-bold text-left text-sm">{story.title}</p>
            </div>

            <div
              className='text-xs rounded-md py-0.5 px-1 w-fit'
              style={{ display: 'flex', flexWrap: 'wrap', minWidth: '120px' }}
            >
              {story.tag.map((tagItem, index) => (
                <div key={index} style={{ marginRight: '5px' }}>
                  <p className="text-chaeum-gray-900 text-left">{tagItem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-2xl z-20">{formattedTime}</div>
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

export default NewStoryCard;
