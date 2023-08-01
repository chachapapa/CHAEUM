import React from 'react';
import { ReactComponent as LogoText } from '../assets/chaeum_logo_text.svg';

interface HeaderPropsType {
  title?: string;
  isLogo: boolean;
  icon?: string[];
}

export const ChaeumHeader = ({ title, isLogo, icon }: HeaderPropsType) => {
  return (
    <div className="flex flex-row justify-between items-center fixed top-0 left-0 w-screen h-14 bg-white">
      <div>
        {isLogo ? (
          <LogoText height="auto" width="10rem" className="px-2" />
        ) : (
          <span className="px-4 text-3xl font-extrabold text-chaeum-gray-900">
            {title}
          </span>
        )}
      </div>
      <div className="px-2">ICON{/* Icon Buttons */}</div>
    </div>
  );
};
