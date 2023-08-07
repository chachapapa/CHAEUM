import React from 'react';
import '../styles/wave.css';
import {ReactComponent as FeedIcon} from '../../assets/feedIcon.svg';

type Props = {
  icon: string;
  onTabClick: () => void;
};

const AnimatedIcon = ({ icon, onTabClick }: Props) => {
  return (
    <svg
      className={'flex items-center'}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="24px"
      height="24px"
      viewBox="0 0 500 500"
      enableBackground="new 0 0 574.558 120"
      xmlSpace="preserve"
    >
      <defs>
        <pattern
          id="water1"
          width=".25"
          height="10"
          patternContentUnits="objectBoundingBox"
        >
          {/* 물결 조정시 d 건드리면 됨 */}
          <path
            fill="#2bb7c4"
            d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
          />
        </pattern>

        <pattern
          id="water2"
          width=".25"
          height="10"
          patternContentUnits="objectBoundingBox"
        >
          {/* 물결 조정시 d 건드리면 됨 */}
          <path
            fill="#22a1ac"
            d="M0.25,1H0c0,0,0-0.2,0-0.916c0.083-0.1,0.05,0.6,0.25,0C0.6,0.327,0.25,1,0.25,1z"
          />
        </pattern>

        {icon === 'feed' ? (
          <FeedIcon id='icon'/>
        ) : icon === 'main' ? (
          <i
            id="icon"
            className="fa-regular fa-square text-2xl text-chaeum-gray-900"
            onClick={() => onTabClick}
          ></i>
        ) : (
          <i
            id="icon"
            className="fa-regular fa-user text-2xl text-chaeum-gray-900"
            onClick={() => onTabClick}
          ></i>
        )}

        <mask id="icon_mask">
          <use x="0" y="0" xlinkHref="#icon" opacity="1" />
        </mask>
      </defs>

      <use x="0" y="0" xlinkHref="#icon" />

      <rect
        className="water-waving"
        mask="url(#icon_mask)"
        fill="url(#water1)"
        x="-400"
        y="0"
        width="1600"
        height="120"
      />
      <rect
        className="water-waving"
        mask="url(#icon_mask)"
        fill="url(#water2)"
        x="-400"
        y="0"
        width="1600"
        height="120"
      />
    </svg>
  );
};

export default AnimatedIcon;
