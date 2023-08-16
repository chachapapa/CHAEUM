import React, { useEffect, useState } from 'react';
import '../styles/activewave.css';
import { ReactComponent as Active } from '../../assets/active_section.svg';

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
  color: 'blue' | 'yellow' | 'lime' | 'navy' | 'gray';
  img: string;
  nickname: string;
  tag: string[];
  // 렌더링 문제로 string이 아닌 number로 넘겨서 계산해야 합니다.
  time: number;
};

const StoryCard = (props: Props) => {
  const [time, setTime] = useState(props.time);

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 100); // Increment time by 100 milliseconds (1 second)
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  
  return (
    <svg
      className="loading"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      // width="400px"
      width="230px"
      height="150px"
      viewBox="0 0 230 150"
      enableBackground="new 0 0 230 150"
      xmlSpace="preserve"
    >
      <defs>
        <pattern
          id="active-water2"
          width=".25"
          height="1.1"
          patternContentUnits="objectBoundingBox"
        >
          <path
            // fill="#98F4F5"
            fill={props.color}
            d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
          />
        </pattern>
        <circle id="circle" cx="25%" cy="30%" r="30" />
        <clipPath id="circle-clip">
          <use xlinkHref="#circle" />
        </clipPath>
        <Active id="storycard"></Active>

        <mask id="active-text_mask2">
          <use x="0" y="0" xlinkHref="#storycard" opacity="1" fill="#0e98a4" />
        </mask>
      </defs>

      <use x="0" y="-100" xlinkHref="#storycard" fill="#0e98a4" />

      <rect
        className="active-water-fill2"
        mask="url(#active-text_mask2)"
        fill="url(#active-water2)"
        x="-400"
        y="0"
        width="1600"
        height="120"
      />

      <g clipPath="url(#circle-clip)">
        <image
          xlinkHref={props.img}
          x="10%"
          y="10%"
          width="60"
          height="60"
          preserveAspectRatio="xMidYMid slice"
        />  
        <use xlinkHref="#circle" fill="none" stroke="#0F1C3F" opacity="0.25" />
      </g>

      {/* <image href="../chacha2.png" x="0%" y="5%" width={50} height={50} /> */}
      <text x="42%" y="20%" fontSize="1.1em" fontWeight="bold">
        {props.nickname}
      </text>
      {props.tag.map((tag, index) => (
        <text key={index} x="42%" y={`${30 + index * 10}%`} fontSize="0.8em">
          {tag}
        </text>
      ))}
      <text x="42%" y="70%" fontSize="1.5em">
        {formattedTime}
      </text>
    </svg>
  );
};

export default StoryCard;
