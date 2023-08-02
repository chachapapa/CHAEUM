import React from 'react';
import '../../styles/activewave.css';
import { ReactComponent as ActiveSection } from '../../../assets/article_card.svg';

/*
  사용 예시

  <ActivityOutlineCard
    color="lime"
    tag="#클라이밍"
    time="02:03:25"
  ></ActivityOutlineCard>
*/

type Props = {
  color: 'blue' | 'yellow' | 'lime' | 'navy' | 'gray';
  tag: string;
  time: string;
};

const ActivityOutlineCard = (props: Props) => {
  return (
    <svg
      className="loading"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      // width="400px"
      width="430px"
      height="190px"
      viewBox="0 0 430 190"
      enableBackground="new 0 0 574.558 120"
      xmlSpace="preserve"
    >
      <defs>
        <pattern
          id="active-water"
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

        {/* <text
          id="text"
          transform="matrix(1 0 0 1 -8.0684 116.7852)"
          fontSize="100px"
        >
          CHAEUM
        </text> */}
        {/* <Logo id="text"></Logo> */}
        <ActiveSection id="active-text"></ActiveSection>

        <mask id="active-text_mask">
          <use
            x="0"
            y="0"
            xlinkHref="#active-text"
            opacity="1"
            fill="#0e98a4"
          />
        </mask>
      </defs>

      <use x="0" y="-100" xlinkHref="#active-text" fill="#0e98a4" />

      <rect
        className="active-water-fill"
        mask="url(#active-text_mask)"
        fill="url(#active-water)"
        x="-400"
        y="0"
        width="1600"
        height="120"
      />
      <text x="50" y="30" fontSize="2em">
        {props.tag}
      </text>
      <text x="50" y="60">
        {props.time}
      </text>
    </svg>
  );
};

export default ActivityOutlineCard;
