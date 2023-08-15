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
        params: { categoryId: 2 },
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

  // 활동 중 동기부여 멘트
  const fetchActiveSentences = async () => {
    try {
      const response = await axios.get(ACTIVE_MENT_URL, {
        headers: {
          Authorization: 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        },
        params: {
          categoryId: 2,
          activityId: myActivityInfo.activityId,
        },
      });

      // Dispatch action to store the sentences in Redux
      dispatch(setActiveMentList(response.data.sentences));
      // console.log(startMentList);
      // console.log(response.data.sentences);
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error fetching sentences:', error);
    }
  };

  let cheeringMent: Cheering[] = [];

  // 응원글 갱신
  const fetchCheering = async () => {
    try {
      const response = await axios.get(CHEERING_URL, {
        headers: {
          Authorization: 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        },
        params: { activityId: myActivityInfo.activityId },
      });

      // Dispatch action to store the sentences in Redux
      // dispatch(setActiveMentList(response.data.sentences));
      // console.log(startMentList);

      console.log(response.data);
      cheeringMent = response.data;
      console.log(cheeringMent);
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error fetching sentences:', error);
    }
  };

  // 최초 라이벌 rivalStreakId 저장
  const rivalStreakId: number[] = [];
  // let myAccumulateTime = 0;

  // 라이벌 목록 불러오기
  const fetchRival = async () => {
    try {
      const response = await axios.get(RIVAL_URL, {
        headers: {
          Authorization: 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        },
        params: {
          streakId: myActivityInfo.streakId,
          categoryId: myActivityInfo.categoryId,
        },
      });

      // Dispatch action to store the sentences in Redux
      // dispatch(setActiveMentList(response.data.sentences));
      // console.log(startMentList);

      // myAccumulateTime = response.data.myAccumulateTime;
      // console.log(myAccumulateTime);
      console.log('라이벌 목록을 불러옵니다.');
      console.log(response.data);
      dispatch(setRivalInfoList(response.data.rivalList));
      dispatch(setMyAccumalteTime(response.data.myAccumulateTime));
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error fetching sentences:', error);
    }
  };

  // 라이벌 목록 갱신
  const updateRival = async () => {
    try {
      const response = await axios.get(UPDATE_RIVAL_URL, {
        headers: {
          Authorization: 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        },
        params: { streakId: streakId, categoryId: categoryId },
      });

      // Dispatch action to store the sentences in Redux
      // dispatch(setActiveMentList(response.data.sentences));
      // console.log(startMentList);

      console.log(response.data);
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
    fetchStartSentences();
    fetchActiveSentences();
    fetchCheering();
    fetchRival();
    // // 1초 대기
    const timer = setTimeout(() => {
      setIsLoadingOver(true);
    }, 5000);

    // 응원글, 라이벌 갱신은 1분 단위로 진행
    const interval = setInterval(() => {
      fetchRival();
      console.log();
      // setTimeout(fetchCheering, 30000); // 30초 뒤에 fetchRival 호출
    }, 6000); // 1분마다 fetchCheering 호출

    // return () => clearTimeout(timer);
    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 클리어
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className=" h-screen flex flex-col items-center justify-center"
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
                activeMent={activeMentList}
              />
            </div>
          )}
          {screenType === ScreenType.MEDIUM && (
            <div className="w-full h-screen flex items-center justify-center z-20">
              <ActiveTotalBubble
                size="medium"
                startMent={startMentList}
                activeMent={activeMentList}
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
