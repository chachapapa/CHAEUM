import React from 'react';
import { MyProfileCard } from '../MyProfileCard';
import InputTag from '../../common/InputTag';
import CustomIconButton from '../../common/CustomIconButton';

const ScreenThree = () => {
  return (
    <div className="h-96 flex-col justify-center overflow-y-auto">
      {/* 검색창 */}
      <div className="mt-3 flex items-center justify-center">
        <InputTag label="친구 검색"></InputTag>
        <CustomIconButton
          callback={() => alert('검색하기')}
          iconType="magnifying-glass"
        ></CustomIconButton>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard name="coco" mbti="ESFJ" age={21}></MyProfileCard>
      </div>
    </div>
  );
};

export default ScreenThree;
