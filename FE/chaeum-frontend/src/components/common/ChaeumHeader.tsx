import React from 'react';
import { ReactComponent as LogoText } from '../../assets/chaeum_logo_text.svg';

interface HeaderPropsType {
  title?: string;
  isLogo: boolean;
  icon?: string;
}

export const ChaeumHeader = ({ title, isLogo, icon }: HeaderPropsType) => {
  return (
    <div className="flex flex-row justify-between items-center sticky top-0 left-0 w-100% min-h-[56px] bg-white">
      <div>
        {isLogo ? (
          <LogoText height="auto" width="10rem" className="px-2" />
        ) : (
          <span className="px-4 text-2xl font-environmentR font-semibold text-chaeum-gray-900">
            {title}
          </span>
        )}
      </div>
      <div className="px-2">
        {icon === 'write' ? (
          <div className="w-[70px] flex flex-row-reverse justify-between">
            <i className="fa-regular fa-pen-to-square text-2xl text-chaeum-blue-500"></i>
          </div>
        ) : icon === 'alarm&chat' ? (
          <div className="w-[70px] flex flex-row-reverse justify-between">
            <i className="fa-regular fa-comments text-2xl text-chaeum-blue-500"></i>
            <i className="fa-regular fa-bell text-2xl text-chaeum-blue-500"></i>
          </div>
        ) : null}
      </div>
    </div>
  );
};
