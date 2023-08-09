import React, { useState } from 'react';
import TextButton from '../common/TextButton';
import TextBox from '../common/TextBox';
import Dropdown from '../common/Dropdown';
import { Select, Option } from '@material-tailwind/react';
import { Streak } from '../Types';

type Props = {
  currentStep: number;
  onClickNext: () => void;
  onClickBefore: () => void;
};

const UserStreakCreationInput = ({
  currentStep,
  onClickNext,
  onClickBefore,
}: Props) => {

  const [anotherStreak, setAnotherStreak] = useState<Streak>({categoryMain:'기타', categoryMiddle: ''});

  return (
    <div
      className={
        currentStep === 3
          ? 'flex flex-col w-full h-5/6 items-center gap-8 transition-opacity duration-1000'
          : 'flex flex-col w-full h-5/6 items-center gap-8 opacity-0'
      }
    >
      <div className="flex flex-col w-10/12 h-full justify-center">
        <div className="font-bold text-2xl mb-5">
          처음으로 만들 스트릭의
          <br /> 카테고리를 골라주세요!
        </div>
        <Dropdown mainCategory="공부"/>
        <Dropdown mainCategory="운동"/>
        <TextBox height='h-16' inputPlaceholder='카테고리를 직접 입력하세요!' label='그 외' setAnotherStreak={setAnotherStreak}></TextBox>
        
      </div>

      <div className="w-10/12 mb-10">
        <div onClick={onClickNext} className="mb-5">
          <TextButton size="large" label="채움 시작하기" type="primary" />
        </div>
        <div onClick={onClickBefore}>
          <TextButton size="large" label="이전으로" type="gray" />
        </div>
      </div>
    </div>
  );
};

export default UserStreakCreationInput;
