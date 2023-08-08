import React, { useState } from 'react';
import TextBox from '../common/TextBox';
import TextButton from '../common/TextButton';
import CommentInputBox from '../common/CommentInputBox';
import axios from 'axios';

type Props = {
  currentStep: number;
  onClickNext: () => void;
  onClickBefore: () => void;
};

const DUPLICATION_CHECK_URL =
  'http://i9a810.p.ssafy.io:8080/api/user/duplication-check';

const UserNicknameInput = ({
  currentStep,
  onClickNext,
  onClickBefore,
}: Props) => {
  const [nickName, setNickName] = useState<string>('기본값');
  const [isDuplicationTested, setIsDuplicationTested] = useState<number>(0);

  const onClickTest = () => {
    axios
      .get(`${DUPLICATION_CHECK_URL}`, { params: { nickname: nickName } })
      .then(res => {
        console.log(res);
        if (res.data === 'SUCCESS') {
          setIsDuplicationTested(1);
          return true;
        } else {
          setIsDuplicationTested(2);
          return false;
        }
      });
  };

  return (
    <div
      className={
        currentStep === 2
          ? 'flex flex-col w-full h-5/6 items-center gap-8 transition-opacity duration-1000'
          : 'flex flex-col w-full h-5/6 items-center gap-8 opacity-0'
      }
    >
      <div className="flex flex-col w-10/12 h-full justify-center">
        <div className="font-bold text-2xl mb-5">
          채움에서 사용하고 싶은
          <br /> 당신의 이름은 무엇인가요?
        </div>

        <TextBox
          inputPlaceholder="닉네임을 입력해주세요."
          height="h-16"
          isDuplicationTested={isDuplicationTested}
        />
      </div>

      <div className="w-10/12 mb-10">
        {isDuplicationTested === 1 ? (
          <div onClick={onClickNext} className="mb-5">
            <TextButton size="large" label="다음으로" type="primary" />
          </div>
        ) : (
          <div onClick={onClickTest} className="mb-5">
            <TextButton size="large" label="중복체크" type="primary" />
          </div>
        )}

        <div onClick={onClickBefore}>
          <TextButton size="large" label="이전으로" type="gray" />
        </div>
      </div>
    </div>
  );
};

export default UserNicknameInput;
