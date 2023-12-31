import React, { useEffect, useState } from 'react';
import TextBox from '../common/TextBox';
import TextButton from '../common/TextButton';
import CommentInputBox from '../common/CommentInputBox';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setMyNickname } from '../../features/states/userStates';
import { API_ROUTES, getApiUrl } from '../../apiConfig';

type Props = {
  currentStep: number;
  onClickNext: () => void;
  onClickBefore: () => void;
  isDuplicationTested: number;
  setIsDuplicationTested: React.Dispatch<React.SetStateAction<number>>;
};

// const DUPLICATION_CHECK_URL =
//   'http://i9a810.p.ssafy.io:8080/api/user/duplication-check';

const AccessToken = localStorage.getItem('access_token');

const UserNicknameInput = ({
  currentStep,
  onClickNext,
  onClickBefore,
  isDuplicationTested,
  setIsDuplicationTested,
}: Props) => {
  const [nickname, setNickname] = useState<string>(' ');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const myNickname = useAppSelector(
    state => state.userStateSetter.userStateSetter.nickname
  );

  useEffect(() => {
    setTimeout(() => {
      setIsStarted(true);
    }, 300);
  }, [isStarted]);

  const onClickTest = () => {
    axios
      .get(`${getApiUrl(API_ROUTES.CHECK_DUPLICATION_URL)}`, {
        params: { nickname: nickname },
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(res => {
        console.log(res);
        if (res.data === true) {
          dispatch(setMyNickname(nickname));
          setIsDuplicationTested(1);
        } else {
          setIsDuplicationTested(2);
        }
      });
  };

  return (
    <div
      className={
        isStarted
          ? 'flex flex-col w-full h-5/6 items-center gap-8 transition-opacity duration-500'
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
          setIsDuplicationTested={setIsDuplicationTested}
          setNickname={setNickname}
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
