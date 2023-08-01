import React from 'react';
import { Fragment } from 'react';
import { StreakColor } from './theme/StreakTheme';

interface TagPropsType {
  tag: string;
  color?: string;
}

export const Tag = ({ tag, color = 'chaeumblue' }: TagPropsType) => {
  const weight = 'w3';
  const tagColor = StreakColor({ color, weight });

  return (
    <>
      <span
        className={`px-2 ${tagColor} text-chaeum-gray-900 rounded-md m-1 text-sm`}
      >
        #{tag}
      </span>
    </>
  );
};
