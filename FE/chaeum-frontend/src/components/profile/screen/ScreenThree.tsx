import React from 'react';
import { MyProfileCard } from '../MyProfileCard';
import InputTag from '../../common/InputTag';
import CustomIconButton from '../../common/CustomIconButton';
import { useNavigate } from 'react-router-dom';

const ScreenThree = () => {
  const navigate = useNavigate();
  const friendProfile = (nickName: string) => {
    const des = `/profile/${nickName}`;
    console.log(`/profile/${des}로 이동`);
    navigate(des);
  };

  return (
    <div className="h-96 flex-col justify-center overflow-y-auto">
      {/* 검색창 */}
      <div className="flex items-center justify-center">
        <InputTag label="친구 검색"></InputTag>
        {/* <CustomIconButton
          callback={() => alert('검색하기')}
          iconType="magnifying-glass"
        ></CustomIconButton> */}
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard
          name="coco"
          mbti="ESFJ"
          age={21}
          onClick={() => friendProfile('코코')}
        ></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard
          name="coco"
          mbti="ESFJ"
          age={21}
          onClick={() => friendProfile('coco')}
        ></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard
          name="coco"
          mbti="ESFJ"
          age={21}
          onClick={() => friendProfile('chacha')}
        ></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard
          name="coco"
          mbti="ESFJ"
          age={21}
          onClick={() => friendProfile('efewfe')}
        ></MyProfileCard>
      </div>
      <div className="mt-3 ml-3">
        <MyProfileCard
          name="coco"
          mbti="ESFJ"
          age={21}
          onClick={() => friendProfile('코코')}
        ></MyProfileCard>
      </div>
    </div>
  );
};

export default ScreenThree;
