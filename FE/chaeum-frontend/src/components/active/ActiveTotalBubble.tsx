import React, { useState, MouseEvent, useEffect } from 'react';
import ActiveBubble from './ActiveBubble';
import ActiveBubble80 from './ActiveBubble85';
import ActiveBubble70 from './ActiveBubble80';
import ActiveBubble85 from './ActiveBubble70';
import ActiveBubble75 from './ActiveBubble75';
import ActiveInfoCard from './ActiveInfoCard';
import NewWave from './NewWave';
import NewActiveInfoCard from './NewActiveInfoCard';
import { Button, Card, Carousel } from '@material-tailwind/react';
import PhraseCard from './PhraseCard';
import TextButton from '../common/TextButton';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../hooks/reduxHooks';
import LoadingPage from '../common/LoadingPage';
import axios from 'axios';

/*
    추후 서버에서 받아올때는 날짜 형식으로 받아오므로
    props로 받는 time을 number로 변환해서 사용

*/

type Props = {
  // 드래그 크기에 따른 화면 배치
  size: 'small' | 'medium';

  // 활동 시작시 받는 멘트 목록
  startMent: string[];

  // 활동 중 받는 멘트 목록
  activeMent: string[];

  // 응원글 목록

  // 누적 시간
  // times: number[];
};

const ActiveTotalBubble = (props: Props) => {
  const rivalInfoList = useAppSelector(
    state => state.stateSetter.rivalInfoList
  );
  // 시00 분00 초00 밀리초00 단위로 되어있음.
  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  // RivalActivity 배열에서 accumulateTime 값을 추출하여 times 배열에 저장
  const profileImgList = rivalInfoList.map(rival => rival.profileImageUrl);
  const nameList = rivalInfoList.map(rival => rival.nickname);
  const tagList = rivalInfoList.map(rival => rival.categoryMiddle);
  const times = rivalInfoList.map(rival => rival.accumulateTime);
  const isActive = rivalInfoList.map(rival => !rival.active);

  // let nameList: string[] = ['라이벌', '라이벌', '라이벌', '라이벌', '라이벌'];
  // let tagList: string[] = ['로딩중', '로딩중', '로딩중', '로딩중', '로딩중'];
  // let times: number[] = [0, 0, 0, 0, 0, 0];
  // let isActive: boolean[] = [true, true, true, true, true];

  // const nameList: string[] = ['라이벌', '라이벌', '라이벌', '라이벌', '라이벌'];
  // const tagList: string[] = ['로딩중', '로딩중', '로딩중', '로딩중', '로딩중'];
  // const times: number[] = [0, 0, 0, 0, 0, 0];
  // const isActive: boolean[] = [true, true, true, true, true];

  // useEffect(() => {

  //   nameList = rivalInfoList.map(rival => rival.nickName);
  //   tagList = rivalInfoList.map(rival => rival.categoryMiddle);
  //   times = rivalInfoList.map(rival => rival.accumulateTime);
  //   isActive = rivalInfoList.map(rival => rival.isActive);
  // }, [rivalInfoList]);

  // if (rivalInfoList !== undefined) {
  //   nameList = rivalInfoList.map(rival => rival.nickName);
  //   tagList = rivalInfoList.map(rival => rival.categoryMiddle);
  //   times = rivalInfoList.map(rival => rival.accumulateTime);
  //   isActive = rivalInfoList.map(rival => rival.isActive);
  // }

  // const times: number[] = [11111, 22222, 33333, 44444, 55555, 12345];
  // const isActive: boolean[] = [true, true, true, true, true];

  const navigate = useNavigate();

  const stopTime = () => {
    alert('추후 업데이트 예정입니다 :(');
  };

  const UPDATE_ACTIVITY_URL = 'http://i9a810.p.ssafy.io:8080/api/activity';
  const access_token = localStorage.getItem('access_token');

  // 서버에 시간을 넘기기 위한 함수
  const currentTimer = () => {
    const now = new Date();
    const year = String(now.getFullYear());
    const months = String(now.getMonth() + 1).padStart(2, '0');
    const days = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${months}-${days} ${hours}:${minutes}:${seconds}`;
  };

  const goResult = () => {
    // 활동 종료
    const updateActivity = async () => {
      try {
        const response = await axios.patch(
          UPDATE_ACTIVITY_URL,
          {
            activityId: myActivityInfo.activityId,
            streakId: myActivityInfo.streakId,
            endTime: currentTimer(),
          },
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
              'Content-Type': 'application/json',
            },
          }
        );

        // Dispatch action to store the sentences in Redux
        // dispatch(setActiveMentList(response.data.sentences));
        // console.log(startMentList);

        // myAccumulateTime = response.data.myAccumulateTime;
        // console.log(myAccumulateTime);
        // console.log('활동을 끝내고 서버로 업데이트합니다.');
        // console.log(response.data);
      } catch (error) {
        // console.error('Error fetching sentences:', error);
        console.log('Error fetching sentences:', error);
      }
    };

    updateActivity();

    navigate('/active/result');
  };

  if (!rivalInfoList) return <div>Loading..</div>;
  return (
    <div>
      <div className="z-0 absolute top-1/4 left-3/4 custom-scale-300">
        <ActiveBubble70
          name={nameList[0]}
          tag={tagList[0]}
          time={times[0]}
          active={isActive[0]}
          size={90}
          color1={isActive[0] ? '#DDFFDD' : '#D3D3D3'}
          color2={isActive[0] ? '#00FF00' : '#D3D3D3'}
        ></ActiveBubble70>
      </div>

      <div className="z-0 absolute top-0 left-0.5">
        <ActiveBubble75
          name={nameList[1]}
          tag={tagList[1]}
          time={times[1]}
          active={isActive[1]}
          size={90}
          color1={isActive[1] ? '#FFFFDD' : '#D3D3D3'}
          color2={isActive[1] ? '#FFFF00' : '#D3D3D3'}
        ></ActiveBubble75>
      </div>
      <div className="z-0 absolute top-1/3 left-1/4 scale-125">
        <ActiveBubble80
          name={nameList[2]}
          tag={tagList[2]}
          time={times[2]}
          active={isActive[2]}
          size={90}
          color1={isActive[1] ? '#DDFFFF' : '#D3D3D3'}
          color2={isActive[1] ? '#00FFFF' : '#D3D3D3'}
        ></ActiveBubble80>
      </div>
      <div className="z-0 absolute top-2/3 left-1/3 custom-scale-200">
        <ActiveBubble85
          name={nameList[3]}
          tag={tagList[3]}
          time={times[3]}
          active={isActive[3]}
          size={90}
          color1={isActive[1] ? '#FFDDFF' : '#D3D3D3'}
          color2={isActive[1] ? '#FF00FF' : '#D3D3D3'}
        ></ActiveBubble85>
      </div>
      <div className="z-0 absolute top-2/4 left-3/4 custom-scale-200">
        <ActiveBubble
          name={nameList[4]}
          tag={tagList[4]}
          time={times[4]}
          active={isActive[4]}
          size={90}
          color1={isActive[1] ? '#FFDDDD' : '#D3D3D3'}
          color2={isActive[1] ? '#FF0000' : '#D3D3D3'}
        ></ActiveBubble>
      </div>
      {props.size === 'small' ? (
        <div className="z-0 absolute bottom-0 w-full custom-scale-100 right-0">
          {/* <NewWave color="chaeumblue"></NewWave> */}
          <NewActiveInfoCard time={times[4]}></NewActiveInfoCard>
        </div>
      ) : (
        <div className="z-0 absolute bottom-0 w-full h-[350px] custom-scale-100 right-0">
          {/* <NewWave color="chaeumblue"></NewWave> */}
          <NewActiveInfoCard time={times[4]}></NewActiveInfoCard>

          <div className="bg-[#aae8ed] max-w-full h-[287px]">
            <div className=" mx-auto overflow-hidden">
              <div className="text-lg text-chaeum-blue-800 mt-6">
                CHAE:UM 이 응원합니다!!
              </div>
              <Carousel
                autoplay
                loop
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-1 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill('').map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? 'w-0 bg-white' : 'w-0 bg-white/50'
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
                prevArrow={({ handlePrev }) => null}
                nextArrow={({ handleNext }) => null}
              >
                {props.startMent.map((ment, index) => (
                  <div
                    key={index}
                    className="bg-[#aae8ed] p-4 w-300 h-200 items-center"
                  >
                    <div>{ment}</div>
                  </div>
                ))}
              </Carousel>

              <div className="mx-auto flex justify-center place-items-center pt-3">
                <Button
                  className=" m-4 float-left; w-40"
                  variant="filled"
                  color="gray"
                  size="lg"
                  ripple={true}
                  onClick={stopTime}
                >
                  일시중지
                </Button>
                <Button
                  className="m-4 float-left; w-40"
                  variant="filled"
                  size="lg"
                  ripple={true}
                  onClick={goResult}
                >
                  활동종료
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveTotalBubble;
