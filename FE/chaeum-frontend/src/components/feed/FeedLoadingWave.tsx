/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import '../styles/cardwave.css';
import { ReactComponent as Circle } from '../../assets/bubbleFrame.svg';

type Props = {
  target : React.RefObject<HTMLDivElement>;
}

const FeedLoadingWave = ({target} : Props) => {



  return (
    <div className='w-full' ref={target}>
      <svg
          className='flex items-center mx-auto justify-self-center '
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="60%"
          height="65px"
          viewBox="-250 50 700 120"
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
                fill="#49d9e6"
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

            <Circle id='text'/>
            <mask id="text_mask" className='self-center'>
              <use x="0" y="0" xlinkHref="#text" opacity="1" />
            </mask>
          </defs>

          {/* <use x="0" y="0" xlinkHref="#text"/> */}

          <rect
            className="water-steady"
            mask="url(#text_mask)"
            fill="url(#water1)"
            x="-400"
            y="0"
            width="1600"
            height="120"
          />
          <rect
            className="water-steady"
            mask="url(#text_mask)"
            fill="url(#water2)"
            x="-400"
            y="0"
            width="1600"
            height="120"
          />
        </svg>
    </div>
  );
};

export default FeedLoadingWave;
