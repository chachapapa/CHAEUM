import { IconButton } from '@material-tailwind/react';
import React from 'react';

/*
  사용 예시

  <CustomIconButton colorInput="yellow"></CustomIconButton>
 */

// props 타입 지정
interface InputProps {
  colorInput: 'blue' | 'yellow' | 'lime' | 'navy' | 'gray';
  // img: string;
  // des: string;
}

// 미리 지정한 색 타입
const ColorType = {
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  navy: 'bg-navy-500',
  gray: 'bg-gray-500',
};

const CustomIconButton = ({ colorInput, ...props }: InputProps) => {
  let colorinput;
  if (colorInput) colorinput = ColorType[colorInput];
  return (
    <div className="flex items-center gap-4">
      <IconButton className={colorinput}>
        <i className="fa-solid fa-play" />
      </IconButton>
    </div>
  );
};

export default CustomIconButton;
