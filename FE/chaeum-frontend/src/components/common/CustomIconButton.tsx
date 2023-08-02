import React from 'react';
import { IconButton } from '@material-tailwind/react';

// props 타입 지정
interface InputProps {
  colorInput?: 'blue' | 'yellow' | 'lime' | 'gray';
  iconType: string;
  size?: 'sm' | 'md' | 'lg';
  varient?: 'gradient' | 'outlined' | 'text';
  textsize?: string;
  callback(): void;
  // img: string;
  // des: string;
}

// 미리 지정한 색 타입
const ColorType = {
  chaeumblue: 'bg-chaeum-blue-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  navy: 'bg-navy-500',
  gray: 'bg-gray-500',
};

const CustomIconButton = ({
  colorInput = 'gray',
  iconType,
  size = 'md',
  callback = () => {
    alert('클릭');
  },

  ...props
}: InputProps) => {
  let colorinput;
  if (colorInput) colorinput = ColorType[colorInput];

  return (
    // <div className="flex items-center gap-4">
    <IconButton
      size={`${size}`}
      variant={props.varient}
      color={colorInput}
      onClick={callback}
    >
      <i className={`fa-solid fa-${iconType} text-${props.textsize}`} />
    </IconButton>
    // </div>
  );
};

export default CustomIconButton;
