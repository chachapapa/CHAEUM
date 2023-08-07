import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRectangleList,
  faGrip,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const ChaeumNav = () => {
  return (
    <div className="sticky bottom-0 left-0 flex flex-row justify-around py-2 items-center w-full h-14 bg-white">
      <FontAwesomeIcon icon={faRectangleList} className="text-4xl" />
      <FontAwesomeIcon icon={faGrip} className="text-4xl" />
      <FontAwesomeIcon icon={faUser} className="text-4xl" />
    </div>
  );
};
