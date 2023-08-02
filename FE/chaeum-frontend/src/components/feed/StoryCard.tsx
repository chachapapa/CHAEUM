import React from 'react';
import '../styles/activewave.css';
import { ReactComponent as Active } from '../../assets/active_section.svg';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from '@material-tailwind/react';

/*
  사용법
  <StoryCard
    nickname="chacha"
    img="../chacha2.png"
    ment="나는 산양이 될테야"
    color="yellow"
    tag="#클라이밍"
    time="02:03:25"
  ></StoryCard>
*/

type Props = {
  color: 'blue' | 'yellow' | 'lime' | 'navy' | 'gray';
  img: string;
  nickname: string;
  ment: string;
  tag: string;
  time: string;
};

const StoryCard = (props: Props) => {
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

        {/* <text
          id="text"
          transform="matrix(1 0 0 1 -8.0684 116.7852)"
          fontSize="100px"
        >
          CHAEUM
        </text> */}
        {/* <Logo id="text"></Logo> */}
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
          width="70"
          height="70"
          preserveAspectRatio="xMidYMid slice"
        />
        <use xlinkHref="#circle" fill="none" stroke="#0F1C3F" opacity="0.25" />
      </g>

      {/* <image href="../chacha2.png" x="0%" y="5%" width={50} height={50} /> */}
      <text x="50%" y="20%" fontSize="1.5em">
        {props.nickname}
      </text>
      <text x="50%" y="30%" fontSize="1em">
        {props.ment}
      </text>
      <text x="50%" y="40%" fontSize="1em">
        {props.tag}
      </text>
      <text x="50%" y="70%" fontSize="2em">
        {props.time}
      </text>
    </svg>
  );
};

export default StoryCard;
