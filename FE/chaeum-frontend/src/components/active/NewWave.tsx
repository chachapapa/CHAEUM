import React from 'react';
import '../styles/activecardwave.css';
import { WaveColor } from '../theme/WaveColorTheme';
import { WaveBottomColor } from '../theme/StreakTheme';

type Props = {
  color?: string;
};

const NewWave = ({ color }: Props) => {
  const  weight2 = 'w2';
  const weight3 = 'w3';
  const weight4 = 'w4';
  const waveFirst = WaveColor({color,weight4});
  const waveSecond = WaveColor({color, weight3});
  const waveThird = WaveColor({color,weight2});
  const BottomFirst = WaveBottomColor({color,weight4});
  const BottomSecond = WaveBottomColor({color,weight3});
  const BottomThird = WaveBottomColor({color,weight2});
  return (
    <div className="w-full overflow-auto">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
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
            x="48"
            y="0"
            className={`${waveThird} opacity-50`}
          />
          <use
            xlinkHref="#gentle-wave-middle"
            x="48"
            y="0"
            className={`${waveSecond} opacity-50`}
          />
          <use xlinkHref="#gentle-wave-front" x="48" y="0" className={`${waveFirst} opacity-50`} />
        </g>
      </svg>
      <div className="relative h-16">
        <div className={`absolute bottom-0 w-full h h-16 ${BottomThird} opacity-50`}></div>
        <div className={`absolute bottom-0 w-full h h-16 ${BottomSecond} opacity-50`}></div>
        <div className={`absolute bottom-0 w-full h h-16 ${BottomFirst} opacity-50`}></div>
      </div>
    </div>
  );
};

export default NewWave;
