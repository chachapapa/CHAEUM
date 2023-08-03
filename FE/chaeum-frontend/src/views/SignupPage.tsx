import React, { useState } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TermsOfUse from '../components/signup/TermsOfUse';
// import UserNicknameInput from '../components/signup/UserNicknameInput';
import '../components/styles/terms.css';
import UserNicknameInput from '../components/signup/UserNicknameInput';
import UserStreakCreationInput from '../components/signup/UserStreakCreationInput';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const onClickNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3){
      navigate('/main');
    }
  };

  const onClickBefore = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  setTimeout(() => {
    setIsStarted(true);
  }, 500);

  return (
    <div className=" w-full h-full bg-white outline outline-1">
      <div
        className={
          isStarted
            ? 'flex w-1/2 h-1/6 mx-auto items-center transition-all duration-700'
            : 'flex w-full h-2/3 items-center'
        }
      >
        <AnimatedLogo />
      </div>
      {currentStep === 1 ? (
        <TermsOfUse isStarted={isStarted} onClickNext={onClickNext} />
      ) : currentStep === 2 ? (
        <UserNicknameInput currentStep={currentStep} onClickNext={onClickNext} onClickBefore={onClickBefore} />
      ) : <UserStreakCreationInput currentStep={currentStep} onClickNext={onClickNext} onClickBefore={onClickBefore}/>}
    </div>
  );
};

export default SignupPage;
