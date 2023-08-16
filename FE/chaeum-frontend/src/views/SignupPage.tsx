import React, { useEffect, useState } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TermsOfUse from '../components/signup/TermsOfUse';
// import UserNicknameInput from '../components/signup/UserNicknameInput';
import '../components/styles/terms.css';
import UserNicknameInput from '../components/signup/UserNicknameInput';
import UserStreakCreationInput from '../components/signup/UserStreakCreationInput';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingPage from '../components/common/LoadingPage';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setMyNickname } from '../features/states/states';

const SIGNUP_CHECK_URL = 'http://i9a810.p.ssafy.io:8080/api/user/me';
const REGIST_STREAK_URL = 'http://i9a810.p.ssafy.io:8080/api/streak';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isDuplicationTested, setIsDuplicationTested] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const myNickname = useAppSelector(state => state.stateSetter.nickname);

  const studyMiddleCategory = useAppSelector(
    state => state.stateSetter.initialStudyStreak
  );
  const sportMiddleCategory = useAppSelector(
    state => state.stateSetter.initialSportsStreak
  );

  const studyStreak = useAppSelector(
    state => state.stateSetter.initialStudyStreak
  );
  const sportsStreak = useAppSelector(
    state => state.stateSetter.initialSportsStreak
  );
  const myStreak = useAppSelector(state => state.stateSetter.initialMyStreak);
  const streaks = [studyStreak, sportsStreak, myStreak];

  const token = searchParams.get('token');

  //로컬스토리지에 토큰 저장하기.
  if (token) {
    localStorage.setItem('access_token', token);
  }

  const AccessToken = localStorage.getItem('access_token');

  //첫 로그인 시
  useEffect(() => {
    console.log('첫 테스트 실행');
    const getMyInfo = async () => {
      try {
        const res = await axios.get(`${SIGNUP_CHECK_URL}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
        });
        if (!res.data.isRegistered) {
          setTimeout(() => setIsFadingOut(true), 5000);
          setTimeout(() => setCurrentStep(1), 5500);
        } else {
          console.log(res.data);
          dispatch(setMyNickname(res.data.nickname));
          setCurrentStep(3);
          // navigate('/main');
        }
      } catch (e) {
        console.log('에러');
      }
    };
    getMyInfo();
    setTimeout(() => {
      setIsStarted(true);
    }, 500);
  },[]);

  const onClickNext = () => {
    console.log(myNickname);
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      // 회원 등록 요청
      axios
        .patch(
          `${SIGNUP_CHECK_URL}`,
          JSON.stringify({ nickname: myNickname }),
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          console.log(res);
          if (res) {
            setCurrentStep(currentStep + 1);
          } else {
            console.log('중복');
            setIsDuplicationTested(2);
          }
        });
    } else if (currentStep === 3) {
      {
        streaks.map(streak => {
          axios
            .post(`${REGIST_STREAK_URL}`, JSON.stringify(streak), {
              headers: {
                Authorization: `Bearer ${AccessToken}`,
                'Content-Type': 'application/json',
              },
            })
            .then(res => {
              console.log(res);
              if (res.data.isRegistered === false) {
                setCurrentStep(1);
              } else {
                navigate('/main');
              }
            });
          console.log(JSON.stringify(streak));
        });
      }

      // console.log(studyMiddleCategory);
      // console.log(sportMiddleCategory);
      // navigate('/main');
    }
  };

  const onClickBefore = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className=" w-full h-full bg-white outline outline-1">
      {currentStep === 0 ? null : (
        <div
          className={
            isStarted
              ? 'flex w-1/2 h-1/6 mx-auto items-center transition-all duration-700'
              : 'flex w-full h-2/3 items-center'
          }
        >
          <AnimatedLogo />
        </div>
      )}
      {currentStep === 0 ? (
        <LoadingPage isFadingOut={isFadingOut} />
      ) : currentStep === 1 ? (
        <TermsOfUse onClickNext={onClickNext} />
      ) : currentStep === 2 ? (
        <UserNicknameInput
          currentStep={currentStep}
          onClickNext={onClickNext}
          onClickBefore={onClickBefore}
          isDuplicationTested={isDuplicationTested}
          setIsDuplicationTested={setIsDuplicationTested}
        />
      ) : (
        <UserStreakCreationInput
          currentStep={currentStep}
          onClickNext={onClickNext}
          onClickBefore={onClickBefore}
        />
      )}
    </div>
  );
};

export default SignupPage;
