import React, { useEffect, useState } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import ProfileHeader from '../components/profile/ProfileHeader';
import { MyProfileCard } from '../components/profile/MyProfileCard';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import { ChaeumNav } from '../components/common/ChaeumNav';
import { useLocation } from 'react-router';
import ButtonApp from '../components/profile/ButtonApp';
import { Card } from '@material-tailwind/react';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/

const EnterancePage = () => {
  const introduceText = '밑의 항목은 임시로 Page를 그대로 넣어놨습니다';
  return (
    <div className="w-full flex flex-col items-center outline">
      {/* <div className="w-[452px] h-[932px] flex flex-col items-center outline"> */}
      {/* <ChaeumHeader isLogo></ChaeumHeader> */}
      <ProfileHeader></ProfileHeader>

      {/* header nav 제외한 중앙 영역 */}
      <div className="w-full relative justify-center overflow-hidden item-center">
        {/* 프로필 카드는 absolute 로 높이 설정 */}
        <div className="z-10 absolute w-full flex justify-center items-center h-1/2">
          <MyProfileCard
            name="코코"
            longest={300}
            age={12}
            mbti="ISTJ"
            profile="../chacha1.jpg"
          ></MyProfileCard>
        </div>

        {/* 배경사진 */}
        <div
          className="w-full"
          style={{
            maxHeight: '200px', // 높이를 최대 200px로 제한
            overflow: 'hidden', // 넘치는 부분은 숨김 처리
          }}
        >
          <img
            src="../chacha1.jpg"
            alt="배경사진"
            className="w-full h-auto object-cover top-1/2 -translate-y-1/4"
            style={{
              minWidth: '200px', // 최소 너비를 200px로 유지하여 비율 유지
            }}
          />
        </div>

        {/* 내 소개 */}
        <div className="mt-20 h-[150px] overflow-hidden">{introduceText}</div>

        <Card className="border-4 w-full">
          <ButtonApp></ButtonApp>
        </Card>
      </div>
      <ChaeumNav />
    </div>
  );
};

export default EnterancePage;
