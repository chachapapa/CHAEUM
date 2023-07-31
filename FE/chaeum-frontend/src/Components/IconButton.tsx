import React, { useEffect, useState } from 'react';

/*
  사용 예시

  <IconButton img="../chacha1.jpg" des="test"></IconButton>
*/

// props 타입 지정
interface InputProps {
  img: string;
  des: string;
}

const TextButton = ({ img, des, ...props }: InputProps) => {
  return (
    <div>
      <img
        src={`${img}`}
        alt={`${des}`}
        className="w-20 h-20 rounded-full"
      ></img>
    </div>
  );
};

export default TextButton;
