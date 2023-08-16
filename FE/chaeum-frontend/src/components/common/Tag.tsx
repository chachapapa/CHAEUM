import React from 'react';
import { StreakColor } from '../theme/StreakTheme';

interface TagPropsType {
  tag: string;
  color?: string;
}

export const Tag = ({ tag, color = 'chaeumblue' }: TagPropsType) => {
  const weight = color === 'deactive' ? 'w1' : 'w3';
  const tagColor = StreakColor({ color, weight });

  return (
    <>
      <span
        className={`px-2 ${tagColor} ${
          color === 'deactive' ? 'text-chaeum-gray-600' : 'text-chaeum-gray-900'
        } rounded-md m-1 text-sm`}
      >
        #{tag}
      </span>
    </>
  );
};
