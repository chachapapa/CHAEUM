import React from 'react';
import { Avatar } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Tag } from '../common/Tag';
import ImageUpload from '../common/ImageUpload';

interface ProfileCardPropsType {
  name: string;
  age?: number;
  mbti?: string;
  longest?: number;
  profileImage?: string;
  onClick: () => void;
}

export const MyProfileCard = ({
  name,
  age,
  mbti,
  longest,
  profileImage,
  onClick,
}: ProfileCardPropsType) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex bg-white z-50 p-2 w-11/12 h-20  left-[50%] top-[160px] -translate-x-[50%] justify-between rounded-3xl shadow-[0_0_10px_10px_rgba(208,211,222,0.2)] shadow-chauem-gray-500/50 "
    >
      <div className="flex justify-self-center items-center">
        {typeof profileImage === 'undefined' ? (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-chaeum-gray-900 text-3xl"
          />
        ) : (
          <Avatar src={profileImage} alt="profileImage" size="md" />
        )}

        <div className="justify-self-start text-start text-md font-bold  text-chaeum-gray-900 ml-2">
          <span className='ml-2'>{name}</span>
          <div className="justify-self-start self-center font-light">
            {typeof mbti === 'undefined' ? null : <Tag tag={mbti} />}
            {typeof age === 'undefined' ? null : <Tag tag={age.toString()} />}
          </div>
        </div>
      </div>
    </div>
  );
};
