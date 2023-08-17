/* eslint-disable indent */
import React, { useState, useRef, useEffect } from 'react';
import '../styles/draggablescreen.css';
import ActiveFullScreen from './ActiveFullScreen';
import ActiveTotalBubble from './ActiveTotalBubble';
import ActiveInfoCard from './ActiveInfoCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  setStartMentList,
  setActiveMentList,
  setRivalInfoList,
  setMyAccumalteTime,
} from '../../features/states/states';
import { useOutletContext } from 'react-router-dom';
import LoadingPage from '../common/LoadingPage';
import { RivalActivity } from '../Types';

enum ScreenType {
  SMALL,
  MEDIUM,
  FULL,
}

type Cheering = {
  nickname: string;
  comments: string;
  profileUrl: string;
};

type ChildProps = {
  streakId: string;
  categoryId: string;
  tagList: string[];
};

const access_token = localStorage.getItem('access_token');
const START_MENT_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/starting';
const ACTIVE_MENT_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/doing';
const CHEERING_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/cheering';
const RIVAL_URL = 'http://i9a810.p.ssafy.io:8080/api/streak/rival-list';
const UPDATE_RIVAL_URL =
  'http://i9a810.p.ssafy.io:8080/api/streak/rival-update';

const DraggableScreen = () => {
  const [screenType, setScreenType] = useState<ScreenType>(ScreenType.SMALL);
  const [isDragging, setIsDragging] = useState(false);
  const initialY = useRef<number>(0);
  const { streakId, categoryId } = useOutletContext<ChildProps>();
  // 통신을 위한 선언
  const dispatch = useDispatch();
  const startMentList = useAppSelector(
    state => state.stateSetter.startMentList
  );
  const activeMentList = useAppSelector(
    state => state.stateSetter.activeMentList
  );
  const rivalInfoList = useAppSelector(
    state => state.stateSetter.rivalInfoList
  );
  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  const myAccumulateTime = useAppSelector(
    state => state.stateSetter.myAccumulateTime
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    initialY.current = event.clientY;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaY = event.clientY - initialY.current;

    // 여기서 적절한 로직으로 드래그 길이에 따라서 화면 크기를 결정합니다.
    // 예를 들어, 일정 거리 이하의 드래그면 ScreenType.SMALL, 그 이상의 드래그면 ScreenType.MEDIUM, 전체 드래그면 ScreenType.FULL로 설정할 수 있습니다.
    // 이 예시에서는 드래그 거리에 따라 비율을 계산하여 화면 크기를 결정합니다.
    const screenWidth = window.innerHeight;
    const dragPercentage = deltaY / screenWidth;
    let newScreenType: ScreenType;

    if (Math.abs(dragPercentage) < 0.4) {
      newScreenType = ScreenType.SMALL;
    } else if (Math.abs(dragPercentage) < 0.7) {
      newScreenType = ScreenType.MEDIUM;
    } else {
      newScreenType = ScreenType.FULL;
    }

    setScreenType(newScreenType);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getScreenClassName = () => {
    switch (screenType) {
      case ScreenType.SMALL:
        return 'screen small';
      case ScreenType.MEDIUM:
        return 'screen medium';
      case ScreenType.FULL:
        return 'screen full';
      default:
        return 'screen';
    }
  };

  // =======================================================
  // 비동기 로직 시작
  // =======================================================

  // 활동 시작 동기부여 멘트
  const fetchStartSentences = async () => {
    // console.log(access_token);
    try {
      const response = await axios.get(START_MENT_URL, {
        headers: {
          Authorization: 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        },
        params: { categoryId: myActivityInfo.categoryId },
      });

      // Dispatch action to store the sentences in Redux
      dispatch(setStartMentList(response.data.sentences));
      // console.log(startMentList);
      // console.log(response.data.sentences);
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error fetching sentences:', error);
    }
  };

  // // 활동 중 동기부여 멘트
  // const fetchActiveSentences = async () => {
  //   try {
  //     const response = await axios.get(ACTIVE_MENT_URL, {
  //       headers: {
  //         Authorization: 'Bearer ' + access_token,
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         categoryId: myActivityInfo.categoryId,
  //         activityId: myActivityInfo.activityId,
  //       },
  //     });

  //     // Dispatch action to store the sentences in Redux
  //     dispatch(setActiveMentList(response.data.sentences));
  //     // console.log(startMentList);
  //     // console.log(response.data.sentences);
  //   } catch (error) {
  //     // console.error('Error fetching sentences:', error);
  //     console.log('Error fetching sentences:', error);
  //   }
  // };

  let cheeringMent: Cheering[] = [];
  // const cheeringMent: Cheering[] = [];

  // 응원글 갱신
  const fetchCheering = async () => {
    try {
      const response = await axios
        .get(CHEERING_URL, {
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
          },
          params: { activityId: myActivityInfo.activityId },
        })
        .then(res => {
          // console.log('응원글입니다');
          // console.log(res.data);
          cheeringMent = res.data;
          // console.log(cheeringMent);
        });
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error fetching 응원글:', error);
    }
  };

  // 최초 라이벌 rivalStreakId 저장
  const rivalStreakId: number[] = [];
  // let myAccumulateTime = 0;

  // 라이벌 목록 불러오기
  // 바로 라이벌 목록 갱신
  const fetchRival = async () => {
    try {
      const response1 = await axios
        .get(RIVAL_URL, {
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
          },
          params: {
            streakId: myActivityInfo.streakId,
            categoryId: myActivityInfo.categoryId,
          },
        })
        .then(res1 => {
          // Dispatch action to store the sentences in Redux
          // dispatch(setActiveMentList(response.data.sentences));
          // console.log(startMentList);

          // myAccumulateTime = response.data.myAccumulateTime;
          // console.log(myAccumulateTime);

          // console.log(res1.data);

          // 라이벌 리스트 리덕스 저장
          // console.log(res1.data.rivalList);
          dispatch(setRivalInfoList(res1.data.rivalList));

          // 누적시간 리덕스 저장
          // console.log(res1.data.myAccumulateTime);
          dispatch(setMyAccumalteTime(res1.data.myAccumulateTime));
        });
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error rival fetching sentences:', error);
    }
  };
  // 라이벌 목록 갱신
  const updateRival = async () => {
    const rivalStreakIds =
      rivalInfoList[0].streakId +
      ', ' +
      rivalInfoList[1].streakId +
      ', ' +
      rivalInfoList[2].streakId +
      ', ' +
      rivalInfoList[3].streakId +
      ', ' +
      rivalInfoList[4].streakId;
    // console.log(rivalStreakIds);
    try {
      const response = await axios
        .get(UPDATE_RIVAL_URL, {
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
          },
          params: { rivalStreakIds: rivalStreakIds },
        })
        .then(res => {
          const retData0 = {
            accumulateTime: res.data.rivalList[0].accumulateTime,
            active: res.data.rivalList[0].active,
            categoryId: rivalInfoList[0].categoryId,
            categoryMain: rivalInfoList[0].categoryMain,
            categoryMiddle: rivalInfoList[0].categoryMiddle,
            nickname: rivalInfoList[0].nickname,
            ongoingTime: res.data.rivalList[0].ongoingTime,
            profileImageUrl: rivalInfoList[0].profileImageUrl,
            streakId: res.data.rivalList[0].streakId,
          };
          const retData1 = {
            accumulateTime: res.data.rivalList[1].accumulateTime,
            active: res.data.rivalList[1].active,
            categoryId: rivalInfoList[1].categoryId,
            categoryMain: rivalInfoList[1].categoryMain,
            categoryMiddle: rivalInfoList[1].categoryMiddle,
            nickname: rivalInfoList[1].nickname,
            ongoingTime: res.data.rivalList[1].ongoingTime,
            profileImageUrl: rivalInfoList[1].profileImageUrl,
            streakId: res.data.rivalList[1].streakId,
          };
          const retData2 = {
            accumulateTime: res.data.rivalList[2].accumulateTime,
            active: res.data.rivalList[2].active,
            categoryId: rivalInfoList[2].categoryId,
            categoryMain: rivalInfoList[2].categoryMain,
            categoryMiddle: rivalInfoList[2].categoryMiddle,
            nickname: rivalInfoList[2].nickname,
            ongoingTime: res.data.rivalList[2].ongoingTime,
            profileImageUrl: rivalInfoList[2].profileImageUrl,
            streakId: res.data.rivalList[2].streakId,
          };
          const retData3 = {
            accumulateTime: res.data.rivalList[3].accumulateTime,
            active: res.data.rivalList[3].active,
            categoryId: rivalInfoList[3].categoryId,
            categoryMain: rivalInfoList[3].categoryMain,
            categoryMiddle: rivalInfoList[3].categoryMiddle,
            nickname: rivalInfoList[3].nickname,
            ongoingTime: res.data.rivalList[3].ongoingTime,
            profileImageUrl: rivalInfoList[3].profileImageUrl,
            streakId: res.data.rivalList[3].streakId,
          };
          const retData4 = {
            accumulateTime: res.data.rivalList[4].accumulateTime,
            active: res.data.rivalList[4].active,
            categoryId: rivalInfoList[4].categoryId,
            categoryMain: rivalInfoList[4].categoryMain,
            categoryMiddle: rivalInfoList[4].categoryMiddle,
            nickname: rivalInfoList[4].nickname,
            ongoingTime: res.data.rivalList[4].ongoingTime,
            profileImageUrl: rivalInfoList[4].profileImageUrl,
            streakId: res.data.rivalList[4].streakId,
          };
          const retData = [retData0, retData1, retData2, retData3, retData4];
          console.log(retData);
          dispatch(setRivalInfoList(retData));
        });
      console.log('rival update complete!');
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error fetching sentences:', error);
    }
  };

  // =======================================================
  // 비동기 로직 끝
  // =======================================================
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  // 로직 처리
  useEffect(() => {
    // 렌더링 시 최초 실행
    // fetchStartSentences();

    // fetchRival();
    // // 3초 대기
    const timer = setTimeout(() => {
      setIsLoadingOver(true);
    }, 3000);

    // 응원글, 라이벌 갱신은 1분 단위로 진행
    const interval = setInterval(() => {
      fetchCheering();
      fetchRival();
      // updateRival();
    }, 10000); // 1분마다 fetchCheering 호출

    // return () => clearTimeout(timer);
    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 클리어
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myActivityInfo]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {}
      {isLoadingOver ? (
        <div className={getScreenClassName()}>
          {screenType === ScreenType.SMALL && (
            <div className="w-full h-screen flex items-center justify-center">
              <ActiveTotalBubble
                size="small"
                startMent={startMentList}
                cheeringMent={cheeringMent}
              />
            </div>
          )}
          {screenType === ScreenType.MEDIUM && (
            <div className="w-full h-screen flex items-center justify-center z-20">
              <ActiveTotalBubble
                size="medium"
                startMent={startMentList}
                cheeringMent={cheeringMent}
              />
            </div>
          )}
          {screenType === ScreenType.FULL && (
            <div className="w-full h-screen">
              {/* Full Screen 컨텐츠 */}
              <ActiveFullScreen
                cheeringMent={cheeringMent}
                startMent={startMentList}
              />
            </div>
          )}
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default DraggableScreen;
