import React from 'react';

export interface TitleProps {
  text?: string;
}

function Title({ text }: TitleProps) {
  return <div className="text-3xl font-bold underline">{text}</div>;
}

export default Title;
