import { IconButton } from '@material-tailwind/react';
import React from 'react';

/*
  사용 예시

  <CustomIconButton colorInput="yellow"></CustomIconButton>
 */

// props 타입 지정
interface InputProps {
  icon: 'heart' | 'play' | 'comment' | 'mag';
  colorInput: 'blue' | 'yellow' | 'lime' | 'navy' | 'gray' | 'white';
  // img: string;
  // des: string;
}

// 미리 지정한 아이콘 타입
const IconType = {
  heart: 'fa-solid fa-heart',
  play: 'fa-solid fa-play',
  comment: 'fa-solid fa-comment',
  mag: 'fa-solid fa-magnifying-glass',
};

// 미리 지정한 색 타입
const ColorType = {
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  navy: 'bg-navy-500',
  gray: 'bg-gray-500',
  white: 'bg-white-500',
};

const CustomIconButton = (props: InputProps) => {
  let iconinput;
  if (props.icon) iconinput = IconType[props.icon];
  let colorinput;
  if (props.colorInput) colorinput = ColorType[props.colorInput];
  return (
    <div className="flex items-center gap-4">
      <IconButton className={colorinput}>
        <i className={iconinput} />
      </IconButton>
    </div>
  );
};

export default CustomIconButton;
