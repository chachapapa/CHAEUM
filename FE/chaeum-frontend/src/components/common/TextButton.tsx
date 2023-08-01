import React from 'react';

/*
  텍스트 버튼에 관한 컴포넌트

  사용 예시

  <TextButton icon="kakao" type="kakao" size="large" label="카카오로 시작하기"></TextButton>
  <TextButton type="primary" size="medium" label="소셜 로그인"></TextButton>
*/

// props 타입 지정
interface InputProps {
  // 소셜 로그인 아이콘
  icon?: 'kakao' | 'naver' | 'google';
  // 배경색
  type: 'kakao' | 'naver' | 'google' | 'primary' | 'white' | 'gray' | 'warning';
  // 버튼 크기
  size: 'small' | 'medium' | 'large';
  // 버튼 내부 텍스트
  label: string;
}

// 아이콘 타입
const IconType = {
  kakao: '../icon/kakao.png',
  naver: '../icon/naver.png',
  google: '../icon/google.png',
};

// 종류에 알맞는 버튼 타입을 선택합니다.
const ButtonType = {
  kakao: 'bg-kakao-yellow text-black font-bold rounded',
  naver: 'bg-naver-green text-black font-bold rounded',
  google: 'bg-gray-100 text-black font-bold rounded',
  primary:
    'bg-chaeum-blue-500 hover:bg-chaeum-blue-700 text-white font-bold rounded',
  white: 'bg-white-500 hover:bg-gray-700 text-black font-bold rounded',
  gray: 'bg-gray-400 hover:bg-gray-700 text-white font-bold rounded',
  warning: 'bg-red-400 hover:bg-red-700 text-white font-bold rounded',
};

const ButtonSize = {
  activeSmall: 'text-sm px-4 py-2 w-14 h-5',
  small: 'text-sm px-4 py-2 w-12 h-7',
  medium: 'text-md px-6 py-3 w-64',
  large: 'text-lg px-8 py-4 w-80',
};

const TextButton = ({
  icon,
  type = 'primary',
  size = 'medium',
  label,
  ...props
}: InputProps) => {
  const classNames = ButtonType[type] + ' ' + ButtonSize[size];

  let iconType;
  if (icon) iconType = IconType[icon];

  return (
    <div className="w-100 mb-5">
      <button className={classNames}>
        <div className="relative flex items-center justify-content gap-x-8">
          {icon && <img src={iconType} alt="회사로고" className='w-[35px]'></img>}
          {label}
        </div>
      </button>
    </div>
  );
};

export default TextButton;
