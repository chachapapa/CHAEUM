import React from 'react';
import { ReactComponent as CardFrame } from '../assets/rectangle.svg';
import './styles/cardwave.css';
import { RivalPropsType } from './TypeInterface';

export const RivalCard = ({ name, tag, profile }: RivalPropsType) => {
  return (
    <>
      <svg
        className="rivalcard"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="430"
        height="vh"
        viewBox="0 0 430 190"
        enableBackground="new 0 0 574.558 120"
        xmlSpace="preserve"
      >
        <defs>
          <pattern
            id="water1"
            width=".25"
            height="1.1"
            patternContentUnits="objectBoundingBox"
          >
            <path
              fill="#98F4F5"
              d="M0.25,1H0c0,0,0-0.900,0-0.916c0.083-0.325,0.158,0.350,0.25,0C0.8,0.1,0.25,0.1,0.25,1z"
            />
          </pattern>
          <pattern
            id="water2"
            width=".25"
            height="1.1"
            patternContentUnits="objectBoundingBox"
          >
            <path
              fill="#49D9E6"
              d="M0.25,1H0c0,0,0-0.900,0-0.916c0.083-0.201,0.158,0.350,0.25,0C0.8,0.1,0.25,0.1,0.25,1z"
            />
          </pattern>
          <circle
            id="circle"
            cx="93.5"
            cy="92"
            r="20"
            vectorEffect="non-scaling-stroke"
          />
          <clipPath id="circle-clip">
            <use xlinkHref="#circle" />
          </clipPath>

          <mask id="text_mask">
            <use x="0" y="0" xlinkHref="#text" opacity="1" fill="#0e98a4" />
          </mask>
        </defs>

        {/* <use x="0" y="0" xlinkHref="#text" fill="#0e98a4" /> */}
        <CardFrame x="0" y="0" id="text"></CardFrame>

        <rect
          className="water-fill1"
          mask="url(#text_mask)"
          fill="url(#water1)"
          x="-400"
          y="0"
          width="1600"
          height="50"
        />
        <rect
          className="water-fill2"
          mask="url(#text_mask)"
          fill="url(#water2)"
          x="-400"
          y="0"
          width="1600"
          height="100"
        />

        <g clipPath="url(#circle-clip)">
          <image
            xlinkHref="../temp1.jpg"
            x="60"
            y="50"
            width="75"
            height="78"
            preserveAspectRatio="xMidYMid slice"
          />
          <use
            xlinkHref="#circle"
            fill="none"
            stroke="#45495B"
            strokeWidth="4"
            opacity="0.25"
          />
        </g>
        {/* <image href="../chacha1.jpg" width="10%" /> */}
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          transform="translate(92, 130)"
          fontSize="1.2rem"
          fill="#45495B"
        >
          {name}
        </text>
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          transform="translate(92,150)"
          fontSize="0.8rem"
          fill="#45495B"
        >
          #{tag}
        </text>
      </svg>
    </>
  );
};
