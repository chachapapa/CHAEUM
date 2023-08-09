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

const SIGNUP_CHECK_URL = 'http://i9a810.p.ssafy.io:8080/api/user/me';
const REGIST_STREAK_URL = 'http://i9a810.p.ssafy.io:8080/api/streak';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const onClickNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      {
        streaks.map(streak => {
          // axios
          //   .post(`${REGIST_STREAK_URL}`, JSON.stringify(streak),{
          //     headers: {
          //       Authorization: `Bearer ${AccessToken}`,
          //       'Content-Type': 'application/json',
          //     },  
          //     // params: {
          //     //   categoryMain: streak.categoryMain,
          //     //   categoryMiddle: streak.categoryMiddle,  
          //     // },

          //   })
          //   .then(res => {
          //     console.log(res);
          //     if (res.data.isRegistered === false) {
          //       setCurrentStep(1);
          //     } else {
          //       navigate('/main');
          //     }
          //   });
        });
      }

      navigate('/main');
    }
  };

  const onClickBefore = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // setTimeout(() => {
  //   setIsStarted(true);
  // }, 500);

  useEffect(() => {
    console.log(AccessToken);
    const getUserInfo = async () => {
      await axios
        .get(`${SIGNUP_CHECK_URL}`, {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
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
    };
    getUserInfo();
    setIsStarted(true);
  }, [AccessToken, navigate]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsFadingOut(true);
  //     setIsLoading(false);
  //     console.log('애니메이션시작');
  //   }, 5000);
  // }, []);

  // useEffect(() => {
  //   if (isFadingOut) {
  //     setTimeout(() => {
  //       setIsFadingOut(false);
  //       console.log('화면전환');
  //     }, 700);
  //   }
  // }, [isFadingOut]);

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
        <LoadingPage />
      ) : currentStep === 1 ? (
        <TermsOfUse isStarted={isStarted} onClickNext={onClickNext} />
      ) : currentStep === 2 ? (
        <UserNicknameInput
          currentStep={currentStep}
          onClickNext={onClickNext}
          onClickBefore={onClickBefore}
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
