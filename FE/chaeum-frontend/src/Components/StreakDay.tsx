import React from 'react';
import { StreakColor } from './theme/StreakTheme';
import type { ColorPropsType } from './TypeInterface';

export const StreakDay = ({ color, weight }: ColorPropsType) => {
  const streakColor = StreakColor({ color, weight });

  return (
    <div>
      <div className={`rounded-md w-5 h-5 m-0.5 ${streakColor}`}></div>
    </div>
  );
};
