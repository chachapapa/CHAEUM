import React from 'react';
import { ReactComponent as LogoText } from '../../assets/chaeum_logo_text.svg';

const ProfileHeader = () => {
  const modifyButtonClick = () => {
    // 아이콘을 클릭했을 때 실행할 코드 작성
    alert('모달 작업 완료시 진행');
  };

  return (
    <div className="flex flex-row justify-between items-center sticky top-0 left-0 w-100% min-h-[56px] bg-white">
      <LogoText height="auto" width="10rem" className="px-2" />

      <div className="px-2">
        <div className="w-[70px] ml-12 flex flex-row-reverse justify-between">
          {/* 추후 icon button 모달로 수정 */}
          <i
            className="fa-solid fa-user-pen text-2xl text-chaeum-blue-500 cursor-pointer"
            onClick={modifyButtonClick}
          ></i>
          <i className="fa-regular fa-comments text-2xl text-chaeum-blue-500"></i>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
