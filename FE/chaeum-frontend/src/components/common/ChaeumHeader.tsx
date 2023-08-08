import React from 'react';
import { ReactComponent as LogoText } from '../../assets/chaeum_logo_text.svg';
import { Link, useLocation } from 'react-router-dom';

interface HeaderPropsType {
  title?: string;
  isLogo: boolean;
}

export const ChaeumHeader = ({ title, isLogo }: HeaderPropsType) => {
  const location = useLocation();

  return (
    <div className="flex flex-row justify-between items-center sticky top-0 left-0 z-10 w-full min-h-[56px] bg-white">
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
        {location.pathname === '/feed/write' ? (
          <div className="w-[70px] flex flex-row-reverse justify-between">
            <i className="fa-regular fa-pen-to-square text-2xl text-chaeum-blue-500"></i>
          </div>
        ) : location.pathname === '/feed' ? (
          <div className="w-[70px] flex flex-row-reverse justify-between">
            <Link to={'write'}>
              <i className="fa-regular fa-pen-to-square text-2xl text-chaeum-blue-500"></i>
            </Link>
            <i className="fa-regular fa-bell text-2xl text-chaeum-blue-500"></i>
          </div>
        ) : null}
      </div>
    </div>
  );
};
