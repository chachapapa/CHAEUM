import React from 'react';
import '../styles/activecardwave.css';
import { WaveColor } from '../theme/WaveColorTheme';

type Props = {
  color?: string;
};

const NewWave = ({ color }: Props) => {
  // const  = 'w5';
  // const waveFirst = <WaveColor color={color} weight='w1'/>;
  // const waveSecond = <WaveColor color={color} weight='w3'/>;
  // const waveThird = WaveColor({color,w5});
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
            className="fill-chaeum-blue-300 opacity-50"
          />
          <use
            xlinkHref="#gentle-wave-middle"
            x="48"
            y="0"
            className="fill-chaeum-blue-600 opacity-50"
          />
          <use xlinkHref="#gentle-wave-front" x="48" y="0" className='fill-chaeum-blue-800 opacity-50' />
        </g>
      </svg>
      <div className="relative h-16">
        <div className="absolute bottom-0 w-full h h-16 bg-chaeum-blue-300 opacity-50"></div>
        <div className="absolute bottom-0 w-full h h-16 bg-chaeum-blue-600 opacity-50"></div>
        <div className='absolute bottom-0 w-full h-16 bg-chaeum-blue-800 opacity-50'></div>
      </div>
    </div>
  );
};

export default NewWave;
