/* eslint-disable indent */
import React, { ReactComponentElement, useEffect, useState } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import ProfileHeader from '../components/profile/ProfileHeader';
import { MyProfileCard } from '../components/profile/MyProfileCard';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import { ChaeumNav } from '../components/common/ChaeumNav';
import { useLocation } from 'react-router';
import { closeDrawer } from '../features/states/states';
import ButtonApp from '../components/profile/ButtonApp';
import {
  Card,
  Select,
  Option,
  Textarea,
  Input,
  Drawer,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useAppSelector } from '../hooks/reduxHooks';
import { BottomDrawer } from '../components/common/BottomDrawer';
import { useDispatch } from 'react-redux';
import { ReactComponent as LogoText } from '../assets/chaeum_logo_text.svg';

import { openDrawer, openModal, closeModal } from '../features/states/states';
import InputTag from '../components/common/InputTag';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GenderButton from '../components/profile/GenderButton';
import { User } from '../components/Types';
import '../components/styles/profiletab.css';
import axios from 'axios';

const USER_INFO_URL = 'http://i9a810.p.ssafy.io:8080/api/user/mypage-info';
const AccessToken = localStorage.getItem('access_token');

const ProfilePage = () => {
  const location = useLocation();
  const userNickname = decodeURI(location.pathname.split('/')[2]);
  // const params = useSearchParams
  const [user, setUser] = useState<User>({ nickName: '', profileImage: '' });

  useEffect(() => {
    // 렌더링 제대로 안되면 이걸로 해보자
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`${USER_INFO_URL}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
          params: { nickname: userNickname },
        });
        console.log(res.data);
        setUser({
          nickName: res.data.nickname,
          profileImage: res.data.profileImageUrl,
          age: res.data.age,
          gender: res.data.gender,
          mbti: res.data.mbti,
          introduction: res.data.introduce,
          height: res.data.height,
          weight: res.data.weight,
        });
      } catch (e) {
        console.log('유저 정보가 없습니다.');
      }
    };
    getUserInfo();
    console.log(user);
    // axios
    //   .get(`${USER_INFO_URL}`, {
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //     params: { nickname: { userNickname } },
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res.data) {
    //       setUser(res.data);
    //     } else {
    //       console.log('유저 정보가 없어용');
    //     }
    //   });

    // setUser({
    //   nickName: '차차아버님',
    //   profileImage: '../chacha1.jpg',
    //   introduction: '★☆한달안에 보라색 도전.☆★',
    //   gender: 'm',
    //   mbti: 'esfj',
    //   age: 27,
    // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const { modalState, drawerState } = useAppSelector(state => state.stateSetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalTypeKor, setModalTypeKor] = useState<string>('');
  const [isLogoutButtonClicked, setIsLogoutButtonClicked] =
    useState<boolean>(false);
  const [goMypageModify, setGoMypageModify] = useState(false);
  const overlayProps = {
    className: 'w-full h-full fixed',
  };
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
          mainCategory: '',
        })
      );
  };
  const registMyData = () => {

    console.log(user);
    axios
      .patch(
        `${USER_INFO_URL}`,
        JSON.stringify({
          nickname: user.nickName,
          profileImageUrl: user.profileImage,
          gender: user.gender,
          age: user.age,
          weight: user.weight,
          height: user.height,
          mbti: user.mbti,
          introduce: user.introduction,
        }),
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
          setGoMypageModify(true);
          setTimeout(() => {
            dispatch(closeModal());
            setGoMypageModify(false);
          }, 500);
        }
      });

    // 창닫기
  };

  const onMbtiChange = (value: string | undefined) => {
    setUser(prev => ({
      ...prev,
      mbti: value,
    }));
  };

  const logOutButtonClick = () => {
    // 로그아웃 or 회원탈퇴 기능
    console.log('logout button clicked!!');

    setTimeout(() => {
      setIsLogoutButtonClicked(true);
      dispatch(openDrawer({ drawerType: 'logout', isDrawerOpen: true }));
    }, 500);

    console.log('logout state updated!!');
  };

  const logout = () => {
    console.log('로그아웃 버튼클릭');
    navigate('/entrance');
    dispatch(closeDrawer());
  };

  // 성별 버튼
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (buttonIndex: number) => {
    if (selectedButton === buttonIndex) {
      setSelectedButton(null); // 이미 선택된 버튼을 다시 클릭한 경우 선택 상태를 취소
    } else {
      setSelectedButton(buttonIndex);
      if (buttonIndex === 0) {
        setUser(prev => ({
          ...prev,
          gender: 'm',
        }));
      } else if (buttonIndex === 1) {
        setUser(prev => ({
          ...prev,
          gender: 'f',
        }));
      }
    }
  };

  // useEffect(() => {
  //   if (drawerState.drawerType === 'logout') setModalTypeKor('로그아웃');
  //   else if (drawerState.drawerType === 'withdrawal')
  //     setModalTypeKor('회원탈퇴');
  // }, [drawerState.drawerType]);

  const [scrollY, setScrollY] = useState<number | undefined>(0);
  const onProfileScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    setScrollY(document.getElementById('box')?.scrollTop);
    console.log(scrollY);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white outline outline-1">
      {user ? (
        <ChaeumHeader isLogo={false} title="Profile"></ChaeumHeader>
      ) : (
        <ChaeumHeader isLogo></ChaeumHeader>
      )}
      <div
        className={
          scrollY !== undefined && scrollY > 314
            ? 'relative w-full overflow-scroll'
            : 'relative w-full flex-grow overflow-auto items-center'
        }
        onScroll={onProfileScroll}
        id="box"
      >
        <MyProfileCard
          name={user.nickName}
          longest={300}
          age={user.age}
          mbti={user.mbti}
          profileImage={user.profileImage}
          onClick={() => {
            console.log('내 프로필');
          }}
        ></MyProfileCard>
        {/* 배경사진 */}
        <div
          className="w-full min-h-[200px]"
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
          {user.introduction}
        </div>

        {/* <div className={scrollY !==undefined && scrollY > 314? 'sticky top-[56px]': 'w-full'}> */}
        <div className="w-full">
          <ButtonApp scrollY={scrollY}></ButtonApp>
        </div>
      </div>

      {/* 설정 */}
      {drawerState.isDrawerOpen && !isLogoutButtonClicked ? (
        <div className="visible z-[9999] bg-white">
          {drawerState.isDrawerOpen && !isLogoutButtonClicked ? (
            <BottomDrawer
              title="계정 설정"
              button1="프로필 수정"
              button2="로그아웃"
              openChk={true}
              type="setting"
              modifyButtonClick={modifyButtonClick}
              logOutButtonClick={logOutButtonClick}
            />
          ) : (
            <BottomDrawer
              title="계정 설정"
              button1="프로필 수정"
              button2="로그아웃"
              openChk={true}
              type="setting"
              modifyButtonClick={modifyButtonClick}
              logOutButtonClick={logOutButtonClick}
            />
          )}
        </div>
      ) : !drawerState.isDrawerOpen && !isLogoutButtonClicked ? (
        <div className="invisible transition-all delay-500 z-[9999] bg-white">
          {drawerState.isDrawerOpen && !isLogoutButtonClicked ? (
            <BottomDrawer
              title="계정 설정"
              button1="프로필 수정"
              button2="로그아웃"
              openChk={true}
              type="setting"
              modifyButtonClick={modifyButtonClick}
              logOutButtonClick={logOutButtonClick}
            />
          ) : (
            <BottomDrawer
              title="계정 설정"
              button1="프로필 수정"
              button2="로그아웃"
              openChk={true}
              type="setting"
              modifyButtonClick={modifyButtonClick}
              logOutButtonClick={logOutButtonClick}
            />
          )}
        </div>
      ) : drawerState.isDrawerOpen && isLogoutButtonClicked ? (
        <div className="visible z-[9999] bg-white">
          {drawerState.isDrawerOpen && !isLogoutButtonClicked ? (
            <BottomDrawer
              title="로그아웃"
              button1="로그아웃"
              button2="취소"
              type="logout"
              openChk={true}
            />
          ) : (
            <BottomDrawer
              title="로그아웃"
              button1="로그아웃"
              button2="취소"
              type="logout"
              openChk={true}
            />
          )}
        </div>
      ) : (
        <div className="invisible transition-all delay-500 z-[9999] bg-white">
          {drawerState.isDrawerOpen && isLogoutButtonClicked ? (
            <BottomDrawer
              title="로그아웃"
              button1="로그아웃"
              button2="취소"
              type="logout"
              openChk={true}
            />
          ) : (
            <BottomDrawer
              title="로그아웃"
              button1="로그아웃"
              button2="취소"
              type="logout"
              openChk={true}
            />
          )}
        </div>
      )}
      {/* 내 정보 수정 */}
      {modalState.isModalOpen ? (
        <div className="absolute flex justify-center items-center flex-col shrink-0 inset-0 w-full h-full pointer-events-auto z-[9995] bg-chaeum-gray-300 bg-opacity-60 backdrop-blur-md transition-all duration-300">
          <div className="w-10/12 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl m-8 w-full text-chaeum-gray-900">
              내정보 수정하기
            </span>
            <div className="w-full flex flex-col">
              <span className="text-start m-1 text-sm text-black">내 소개</span>

              <InputTag
                label="간단히 나를 소개해주세요."
                width="w-full mb-5"
                setUser={setUser}
                for="introduction"
              />
            </div>

            <div className=" flex flex-col w-full mb-5">
              <div className="w-full flex flex-col">
                <span className="text-start m-1 text-sm text-black">성별</span>

                <div className="flex space-x-4 justify-center">
                  <GenderButton
                    label="남자"
                    isSelected={selectedButton === 0}
                    onClick={() => handleButtonClick(0)}
                  />
                  <GenderButton
                    label="여자"
                    isSelected={selectedButton === 1}
                    onClick={() => handleButtonClick(1)}
                  />
                </div>

                <span className="text-start m-1 text-sm text-black">MBTI</span>
                <Select
                  placeholder="MBTI를 선택하세요."
                  className={
                    'h-10 bg-white w-full bg-opacity-50 border-[1px] focus:border-2 border-chaeum-gray-500/80 focus:border-blue-500'
                  }
                  onChange={onMbtiChange}
                >
                  {mbtiList.map((mbti, index) => (
                    <Option key={index} value={mbti}>
                      {mbti}
                    </Option>
                  ))}
                </Select>

                <div className="flex flex-row justify-center">
                  <div className="flex-none p-2">
                    <span className="text-start m-1 text-sm text-chaeum-gray-700">
                      키(cm)
                    </span>
                    <InputTag
                      label="키를 입력해주세요!"
                      className="w-full mb-5"
                      setUser={setUser}
                      for="height"
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
                      setUser={setUser}
                      for="weight"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="transition-all duration-300 opacity-100 w-full mt-8">
              <div className="buttons flex flex-col w-full justify-center items-center gap-y-5">
                <TextButton
                  label="수정하기"
                  type="primary"
                  className="h-12 w-full"
                  callback={registMyData}
                />

                <TextButton
                  label="취소하기"
                  type="gray"
                  className="h-12 w-full text-chaeum-gray-900 text-center justify-items-center"
                  callback={() => dispatch(closeModal())}
                />
              </div>

              <div className="text-center mt-4 p-2 rounded-lg transition-all duration-500 w-full">
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
        <div className="hidden w-full h-full absolute bg-chaeum-gray-300 bg-opacity-0 transition-all duration-1000 opacity-0 text-opacity-0 ease-in"></div>
        // absolute flex justify-center items-center flex-col shrink-0 inset-0 w-full h-full pointer-events-auto z-[9995] bg-chaeum-gray-300 bg-opacity-60 backdrop-blur-md transition-all duration-300
      )}
      <ChaeumNav />
    </div>
  );
};

export default ProfilePage;
