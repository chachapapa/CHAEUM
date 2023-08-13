import React, { useEffect, useState } from 'react';
import '../../styles/activecardwave.css';
import { WaveColor } from '../../theme/WaveColorTheme';
import { WaveBottomColor } from '../../theme/StreakTheme';
import { ColorVariation } from '../../Types';

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
  color: ColorVariation;
  tag: string[];
  // 렌더링 문제로 string이 아닌 number로 넘겨서 계산해야 합니다.
  startToEndTime: string;
  date: string;
  title: string;
};

const ActivityUploadCard = (props: Props) => {
  const weight0 = 'w0';
  const weight2 = 'w2';
  const weight3 = 'w3';
  const weight4 = 'w4';
  const waveFirst = WaveColor({ color: props.color, weight4 });
  const waveSecond = WaveColor({ color: props.color, weight3 });
  const waveThird = WaveColor({ color: props.color, weight2 });
  const backgroundColor = WaveBottomColor({ color: props.color, weight0 });
  const BottomFirst = WaveBottomColor({ color: props.color, weight4 });
  const BottomSecond = WaveBottomColor({ color: props.color, weight3 });
  const BottomThird = WaveBottomColor({ color: props.color, weight2 });


  return (
    <div className={`relative w-11/12 h-[120px] flex overflow-auto rounded-lg shadow-xl ${backgroundColor}`}>
      <div className="flex flex-col justify-evenly w-full mx-2 z-10">
        <div className="relative flex items-center justify-between gap-x-1">
          <div className="text-base leading-6">
            <div
              className={`text-xs ${BottomFirst} rounded-md py-0.5 px-1 w-fit mb-1`}
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              <p className="font-bold text-left text-sm text-white">{props.title}</p>
            </div>

            <div
              className="text-xs rounded-md py-0.5 px-1 w-fit"
              style={{ display: 'flex', flexWrap: 'wrap', minWidth: '120px' }}
            >
              {props.tag.map((tagItem, index) => (
                <div key={index} style={{ marginRight: '5px' }}>
                  <p className="text-white text-left">{tagItem}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='self-start text-chaeum-gray-900'>
            {props.date}
          </div>
        </div>
        
        <div className="text-xl text-white">
          {props.startToEndTime}
        </div>
      </div>
      <div className="absolute flex flex-col self-end w-full z-0">
        <svg
          className="waves self-end"
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
        <div className="relative h-14 w-full">
          <div
            className={`absolute bottom-0 w-full h-14 ${BottomThird} opacity-50`}
          ></div>
          <div
            className={`absolute bottom-0 w-full h-14 ${BottomSecond} opacity-50`}
          ></div>
          <div
            className={`absolute bottom-0 w-full h-14 ${BottomFirst} opacity-50`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ActivityUploadCard;
