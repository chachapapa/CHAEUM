import React, { useEffect, useState } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import ProfileHeader from '../components/profile/ProfileHeader';
import { MyProfileCard } from '../components/profile/MyProfileCard';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import { ChaeumNav } from '../components/common/ChaeumNav';
import { useLocation } from 'react-router';
import ButtonApp from '../components/profile/ButtonApp';
import {
  Card,
  Select,
  Option,
  Textarea,
  Input,
} from '@material-tailwind/react';
import { useAppSelector } from '../hooks/reduxHooks';
import { BottomDrawer } from '../components/common/BottomDrawer';
import { useDispatch } from 'react-redux';
import { ReactComponent as LogoText } from '../assets/chaeum_logo_text.svg';

import { openDrawer, openModal, closeModal } from '../features/states/states';
import InputTag from '../components/common/InputTag';
/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/

const EnterancePage = () => {
  const introduceText = '밑의 항목은 임시로 Page를 그대로 넣어놨습니다';

  const mbtiList: string[] = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  const genderList: string[] = ['남자', '여자'];

  const drawerType = useAppSelector(state => state.stateSetter.drawerType);
  const isDrawerOpen = useAppSelector(state => state.stateSetter.isDrawerOpen);
  const { modalState } = useAppSelector(state => state.stateSetter);
  const dispatch = useDispatch();

  const [modalTypeKor, setModalTypeKor] = useState<string>('');
  const [goMypageModify, setGoMypageModify] = useState(false);

  const modifyButtonClick = () => {
    // 수정 아이콘을 클릭했을 때 실행할 코드 작성
    // dispatch(openDrawer('modifyProfile'));
    // alert('마이페이지 수정 구현해야함');
    if (modalState.isModalOpen) dispatch(closeModal());
    else
      dispatch(
        openModal({
          isModalOpen: true,
          modalType: 'modify',
          middleCategory: '',
        })
      );
  };
  const modifyMyProfile = () => {
    // 내 정보를 디비에 보내고
    setGoMypageModify(true);
    setTimeout(() => {
      dispatch(closeModal());
      setGoMypageModify(false);
    }, 1500);

    // 창닫기
  };
  const logOutButtonClick = () => {
    // 로그아웃 or 회원탈퇴 기능
    console.log('logout button clicked!!');
    dispatch(openDrawer('logout'));
    console.log('logout state updated!!');
  };

  useEffect(() => {
    if (drawerType === 'logout') setModalTypeKor('로그아웃');
    else if (drawerType === 'withdrawal') setModalTypeKor('회원탈퇴');
  }, [drawerType]);

  return (
    <div className="w-full flex flex-col items-center outline">
      {/* <div className="w-[452px] h-[932px] flex flex-col items-center outline"> */}
      {/* <ChaeumHeader isLogo></ChaeumHeader> */}
      {/* <ProfileHeader></ProfileHeader> */}
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

      {/* header nav 제외한 중앙 영역 */}
      <div className="w-full relative justify-center overflow-hidden item-center">
        {/* 프로필 카드는 absolute 로 높이 설정 */}
        <div className="z-10 absolute w-full flex justify-center items-center h-2/3">
          <MyProfileCard
            name="코코"
            longest={300}
            age={12}
            mbti="ISTJ"
            profile="../chacha1.jpg"
          ></MyProfileCard>
        </div>

        {/* 배경사진 */}
        <div
          className="w-full"
          style={{
            maxHeight: '200px', // 높이를 최대 200px로 제한
            overflow: 'hidden', // 넘치는 부분은 숨김 처리
          }}
        >
          <img
            src="../chacha1.jpg"
            alt="배경사진"
            className="w-full h-auto object-cover top-1/2 -translate-y-1/4"
            style={{
              minWidth: '200px', // 최소 너비를 200px로 유지하여 비율 유지
            }}
          />
        </div>

        {/* 내 소개 */}
        <div className="mt-16 h-[50px] overflow-hidden text-sm">
          {introduceText}
        </div>

        <Card className="border-4 w-full">
          <ButtonApp></ButtonApp>
        </Card>
      </div>
      <ChaeumNav />
      {/* 로그아웃 */}
      {isDrawerOpen ? (
        <div className="visible z-[9999] bg-white">
          {isDrawerOpen ? (
            <BottomDrawer
              title="로그아웃"
              content="로그아웃 하시겠습니까?"
              button1="로그아웃"
              button2="취소하기"
              openChk={true}
            />
          ) : (
            <BottomDrawer
              title="로그아웃"
              content="로그아웃 하시겠습니까?"
              button1="로그아웃"
              button2="취소하기"
              openChk={false}
            />
          )}
        </div>
      ) : (
        <div className="invisible transition-all delay-500 z-[9999] bg-white">
          {isDrawerOpen ? (
            <BottomDrawer
              title="로그아웃"
              content="로그아웃 하시겠습니까?"
              button1="로그아웃"
              button2="취소하기"
              openChk={true}
            />
          ) : (
            <BottomDrawer
              title="로그아웃"
              content="로그아웃 하시겠습니까?"
              button1="로그아웃"
              button2="취소하기"
              openChk={false}
            />
          )}
        </div>
      )}
      {/* 내 정보 수정 */}
      {modalState.isModalOpen ? (
        <div className="fixed flex flex-2 justify-center items-center flex-col shrink-0 inset-0 w-full h-full pointer-events-auto z-[9995] bg-chaeum-gray-300 bg-opacity-60 backdrop-blur-lg transition-all duration-300">
          <div className="w-[46.15vh] flex flex-col justify-center items-center">
            <span className="font-bold text-2xl m-8 w-full">
              내정보 수정하기
            </span>
            <div className="w-full flex flex-col">
              <span className="text-start m-1 text-sm text-black">내 소개</span>

              <InputTag label="간단히 나를 소개해주세요." width="w-full mb-5" />
            </div>

            <div className=" flex flex-col w-full mb-5">
              <div className="w-full flex flex-col">
                <span className="text-start m-1 text-sm text-black">성별</span>
                <Select
                  placeholder="성별을 선택하세요."
                  className={
                    'h-10 bg-white w-full bg-opacity-50 border-[1px] focus:border-2 border-chaeum-gray-500/80 focus:border-blue-500'
                  }
                >
                  {genderList.map(gender => (
                    <Option key={gender}>{gender}</Option>
                  ))}
                  {}
                </Select>

                <span className="text-start m-1 text-sm text-black">MBTI</span>
                <Select
                  placeholder="MBTI를 선택하세요."
                  className={
                    'h-10 bg-white w-full bg-opacity-50 border-[1px] focus:border-2 border-chaeum-gray-500/80 focus:border-blue-500'
                  }
                >
                  {mbtiList.map(mbti => (
                    <Option key={mbti}>{mbti}</Option>
                  ))}
                  {}
                </Select>

                <div className="flex flex-row justify-center">
                  <div className="flex-none p-2">
                    <span className="text-start m-1 text-sm text-chaeum-gray-700">
                      키(cm)
                    </span>
                    <InputTag
                      label="키를 입력해주세요!"
                      className="w-full mb-5"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <div className="flex-none p-2">
                    <span className="text-start m-1 text-sm text-chaeum-gray-700">
                      몸무게(kg)
                    </span>
                    <InputTag
                      label="몸무게를 입력해주세요!"
                      className="w-full mb-5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="transition-all duration-300 opacity-100 w-full my-8">
              <div className="buttons flex flex-col w-full justify-center items-center gap-y-5">
                <TextButton
                  label="수정하기"
                  type="warning"
                  className="h-12 w-full"
                  callback={modifyMyProfile}
                />

                <TextButton
                  label="취소하기"
                  type="gray"
                  className="h-12 w-full text-chaeum-gray-900 text-center justify-items-center"
                  callback={() => dispatch(closeModal())}
                />
              </div>

              <div className="text-center my-4 p-2 rounded-lg transition-all duration-500 w-full">
                {goMypageModify ? (
                  <span className="bg-chaeum-blue-700 bg-opacity-70 p-2 text-xs text-white rounded-lg transition-all duration-500  w-full">
                    내 정보를 수정했어요!
                  </span>
                ) : (
                  <span className="transition-all duration-500 bg-white bg-opacity-0 text-opacity-0 text-white invisible">
                    내 정보를 수정했어요!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-opacity-0 transition-all duration-500 opacity-0 text-opacity-0 ease-in"></div>
      )}
    </div>
  );
};

export default EnterancePage;
