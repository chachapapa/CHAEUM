import React from 'react';
import { ReactComponent as LogoText } from '../../assets/chaeum_logo_text.svg';
import { openDrawer } from '../../features/states/states';
import { useDispatch } from 'react-redux';

const ProfileHeader = () => {
  const dispatch = useDispatch();

  const modifyButtonClick = () => {
    // 수정 아이콘을 클릭했을 때 실행할 코드 작성
    // dispatch(openDrawer('modifyProfile'));
    alert('마이페이지 수정 구현해야함');
  };

  const logOutButtonClick = () => {
    // 로그아웃 or 회원탈퇴 기능
    console.log('logout button clicked!!');
    dispatch(openDrawer('logout'));
    console.log('logout state updated!!');
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
          <i
            className="fa-regular fa-comments text-2xl text-chaeum-blue-500"
            onClick={logOutButtonClick}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
