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
  profile?: string;
}

export const MyProfileCard = ({
  name,
  age,
  mbti,
  longest,
  profile,
}: ProfileCardPropsType) => {
  return (
    <div className="bg-white z-50 grid grid-cols-[1fr_3fr_1fr] grid-rows-2 p-2 w-11/12 justify-self-center self-center rounded-3xl shadow-[0_0_5px_5px_rgba(208,211,222,0.5)] shadow-chauem-gray-500/50 ">
      <div className="profilearea row-span-2 justify-self-center self-center w-3 ">
        {typeof profile === 'undefined' ? (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-chaeum-gray-900 text-3xl"
          />
        ) : (
          <Avatar src={profile} alt="profile"></Avatar>
        )}
      </div>
      <div className="justify-self-start self-center text-xl font-extrabold  text-chaeum-gray-900">
        <span>{name}</span>
      </div>

      <div className=" justify-self-center self-center ">
        {longest ? (
          <span className="font-bold  text-chaeum-gray-900">현재 </span>
        ) : null}
      </div>
      <div className="justify-self-start self-center">
        {typeof mbti === 'undefined' ? null : <Tag tag={mbti} />}
        {typeof age === 'undefined' ? null : <Tag tag={age.toString()} />}
      </div>
      <div className=" justify-self-center self-center ">
        <span className="text-chaeum-blue-500 text-bold text-lg">
          {longest}{' '}
        </span>
        {longest ? (
          <span className="text-lg text-bold text-chaeum-gray-900">일</span>
        ) : null}
      </div>
    </div>
  );
};
