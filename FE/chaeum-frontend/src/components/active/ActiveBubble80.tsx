/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
// import { ReactComponent as BubbleFrame } from '../../../assets/bubbleFrame.svg';
// import '../../styles/cardwave.css';
import '../styles/cardwave.css';
import { RivalPropsType } from '../Types';
import { useAppSelector } from '../../hooks/reduxHooks';

interface BubblePropsType extends RivalPropsType {
  time: number;
  active: boolean;
  // 원의 사이즈. 90, 85, 80, 75, 70
  size: number;
  // 물결 색깔
  color1: string;
  color2: string;
}

const ActiveBubble = ({
  name,
  tag,
  profile,
  time,
  active,
  size,
  color1,
  color2,
}: BubblePropsType) => {
  const rivalInfoList = useAppSelector(
    state => state.stateSetter.rivalInfoList
  );
  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  let inputTime = time;
  if (active) inputTime += calculateTimeDifference(myActivityInfo.date);
  const [bubbleTime, setTime] = useState(inputTime);

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
      if (active) setTime(bubbleTime => bubbleTime + 1); // Increment time by 100 milliseconds (1 second)
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [active, bubbleTime]);

  // Hours calculation
  const hours = Math.floor(bubbleTime / 3600);

  // Minutes calculation
  const minutes = Math.floor((bubbleTime % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor((bubbleTime % 60) / 1);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return (
    <div>
      <svg
        className="bubbleactive"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 430 430"
        enableBackground="new 0 0 574.558 120"
        xmlSpace="preserve"
      >
        <defs>
          <pattern
            id="water80_1"
            width=".25"
            height="1.1"
            patternContentUnits="objectBoundingBox"
          >
            <path
              fill={color1}
              d="M0.25,1H0c0,0,0-0.900,0-0.916c0.083-0.325,0.158,0.350,0.25,0C0.8,0.1,0.25,0.1,0.25,1z"
            />
          </pattern>
          <pattern
            id="water80_2"
            width=".25"
            height="1.1"
            patternContentUnits="objectBoundingBox"
          >
            <path
              fill={color2}
              d="M0.25,1H0c0,0,0-0.900,0-0.916c0.083-0.201,0.158,0.350,0.25,0C0.8,0.1,0.25,0.1,0.25,1z"
            />
          </pattern>
          <circle
            id="bubblecircle"
            cx="105"
            cy="70"
            r="20"
            vectorEffect="non-scaling-stroke"
          />
          <clipPath id="bubble-circle-clip">
            <use xlinkHref="#bubblecircle" />
          </clipPath>

          <mask id="bubble_mask">
            <use x="0" y="0" xlinkHref="#bubble" opacity="1" fill="#0e98a4" />
          </mask>
        </defs>
        {/* <use x="0" y="0" xlinkHref="#text" fill="#0e98a4" /> */}
        {/* <BubbleFrame x="0" y="0" id="bubble"></BubbleFrame> */}
        {/* BubbleSize({size}, {x}, {y}); */}
        {/* <BubbleFrame90 x={x} y={y} id="bubble"></BubbleFrame90> */}
        {/* <BubbleFrame90 x={x} y={y} id="bubble"></BubbleFrame90> */}
        {/* 버블버블 */}
        <svg
          id="bubble"
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_40_5832)">
            <circle cx={'100'} cy="100" r={size} fill="white" />
          </g>
          <defs>
            <filter
              id="filter0_d_40_5832"
              x="-2"
              y="0"
              width="214"
              height="214"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_40_5832"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_40_5832"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        {/* {active ? (
          <rect
            className="water-fill1"
            mask="url(#bubble_mask)"
            fill="url(#water80_1)"
            x="-400"
            y="0"
            width="1600"
            height="50"
          />
        ) : null}
        {active ? (
          <rect
            className="water-fill2"
            mask="url(#bubble_mask)"
            fill="url(#water80_2)"
            x="-400"
            y="0"
            width="1600"
            height="100"
          />
        ) : null} */}

        <rect
          className="water-fill1"
          mask="url(#bubble_mask)"
          fill="url(#water80_1)"
          x="-400"
          y="0"
          width="1600"
          height="50"
        />

        <rect
          className="water-fill2"
          mask="url(#bubble_mask)"
          fill="url(#water80_2)"
          x="-400"
          y="0"
          width="1600"
          height="100"
        />

        <g x="0" y="0" clipPath="url(#bubble-circle-clip)">
          <image
            xlinkHref={profile}
            x="60"
            y="40"
            width="75"
            height="78"
            preserveAspectRatio="xMidYMid slice"
          />
          <use
            xlinkHref="#bubblecircle"
            fill="none"
            stroke="#45495B"
            strokeWidth="4"
            opacity="0.25"
          />
        </g>
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          transform="translate(105,110)"
          fontSize="1.8rem"
          fill="#45495B"
        >
          {formattedTime}
        </text>
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          transform="translate(105, 140)"
          fontSize="2.2rem"
          fill="#45495B"
        >
          {name}
        </text>
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          transform="translate(105,170)"
          fontSize="1.5rem"
          fill="#45495B"
        >
          #{tag}
        </text>
      </svg>
    </div>
  );
};

export default ActiveBubble;
