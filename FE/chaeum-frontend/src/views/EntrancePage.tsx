import React from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import { Link } from 'react-router-dom';

const EntrancePage = () => {
  return (
    <div className=" w-full h-full bg-white outline outline-1">
      <div className="flex w-full h-2/3 items-center">
        <AnimatedLogo />
      </div>
      <div className="flex flex-col h-1/3 justify-evenly  items-center">
        <Link to="/signup" className='w-3/4'>
          <TextButton
            icon="kakao"
            type="kakao"
            size="medium"
            label="카카오로 시작하기"
          />
        </Link>
        <Link to="/signup" className='w-3/4'>
          <TextButton
            icon="naver"
            type="naver"
            size="medium"
            label="네이버로 시작하기"
          />
        </Link>
        <Link to="/signup" className='w-3/4'>
          <TextButton
            icon="google"
            type="google"
            size="medium"
            label="구글로 시작하기"
          />
        </Link>
      </div>
    </div>
  );
};

export default EntrancePage;