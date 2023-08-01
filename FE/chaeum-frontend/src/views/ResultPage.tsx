import React from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/

const EnterancePage = () => {
  return (
    <div className="w-[452px] h-[932px] bg-white outline outline-1">
      <AnimatedLogo />
      <TextButton
        icon="kakao"
        type="kakao"
        size="medium"
        label="카카오로 시작하기"
      />
      <TextButton
        icon="naver"
        type="naver"
        size="medium"
        label="네이버로 시작하기"
      />
      <TextButton
        icon="google"
        type="google"
        size="medium"
        label="구글로 시작하기"
      />
    </div>
  );
};

export default EnterancePage;
