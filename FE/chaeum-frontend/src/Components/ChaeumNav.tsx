import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRectangleList,
  faGrip,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
export const ChaeumNav = () => {
  return (
    <div className="fixed bottom-0 left-0 flex flex-row justify-around items-center w-screen h-14 bg-white">
      <FontAwesomeIcon icon={faRectangleList} className="text-4xl" />
      <FontAwesomeIcon icon={faGrip} className="text-4xl" />
      <FontAwesomeIcon icon={faUser} className="text-4xl" />
    </div>
  );
};
