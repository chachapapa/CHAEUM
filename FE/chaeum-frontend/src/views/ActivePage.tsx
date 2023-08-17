import React, { useState, MouseEvent, useEffect } from 'react';
import DraggableScreen from '../components/active/DraggableScreen';
import { Outlet } from 'react-router';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/reduxHooks';
import {
  setMyActivityInfo,
  setRivalInfoList,
  setMyAccumalteTime,
  setMyActivityTagList,
  setStartMentList,
  setActiveMentList,
} from '../features/states/states';
import LoadingPage from '../components/common/LoadingPage';

const access_token = localStorage.getItem('access_token');
const MAKE_ACTIVITY_URL = 'http://i9a810.p.ssafy.io:8080/api/activity';
const RIVAL_URL = 'http://i9a810.p.ssafy.io:8080/api/streak/rival-list';
const START_MENT_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/starting';
const ACTIVE_MENT_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/doing';
const CHEERING_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/cheering';
const ActivePage = () => {
  // 통신을 위한 선언
  const dispatch = useDispatch();

  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  const myAccumulateTime = useAppSelector(
    state => state.stateSetter.myAccumulateTime
  );
  const myActivityTagList = useAppSelector(
    state => state.stateSetter.myActivityTagList
  );
  const rivalInfoList = useAppSelector(
    state => state.stateSetter.rivalInfoList
  );
  const startMentList = useAppSelector(
    state => state.stateSetter.startMentList
  );
  const activeMentList = useAppSelector(
    state => state.stateSetter.activeMentList
  );
  const { state } = useLocation();

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

  // 활동 시작 동기부여 멘트
  const fetchStartSentences = async () => {
    // console.log(access_token);
    try {
      const response = await axios
        .get(START_MENT_URL, {
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
          },
          params: { categoryId: state.categoryId },
        })
        .then(res => {
          // Dispatch action to store the sentences in Redux
          dispatch(setStartMentList(res.data.sentences));
          // console.log(startMentList);
          // console.log(res.data.sentences);
        });
    } catch (error) {
      // console.error('Error fetching sentences:', error);
      console.log('Error startment fetching sentences:', error);
    }
  };

  useEffect(() => {
    // 렌더링 시 최초 실행
    // 활동내역 생성
    dispatch(setMyActivityTagList(state.tagList));

    const createActivity = async () => {
      const PreData = {
        streakId: state.streakId,
        date: currentTimer(),
        categoryId: state.categoryId,
        activityId: 0,
      };

      dispatch(setMyActivityInfo(PreData));

      try {
        const response = await axios
          .post(
            MAKE_ACTIVITY_URL,
            { streakId: state.streakId, date: currentTimer() },
            {
              headers: {
                Authorization: 'Bearer ' + access_token,
                'Content-Type': 'application/json',
              },
            }
          )
          .then(res => {
            const MergedData = {
              streakId: state.streakId,
              date: currentTimer(),
              categoryId: state.categoryId,
              activityId: res.data.activityId,
            };

            dispatch(setMyActivityInfo(MergedData));
            // console.log('생성된 활동 정보 : ');
            // console.log(res.data);

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
                      streakId: state.streakId,
                      categoryId: state.categoryId,
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

            fetchRival();
          });
        // response로 받은 data와 state로 넘겨받은 categoryId를 한번에 redux에 업데이트
      } catch (error) {
        // console.error('Error fetching sentences:', error);
        console.log('Error make fetching sentences:', error);
      }
    };

    createActivity();
    fetchStartSentences();
    // fetchActiveSentences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden outline outline-4 relative flex justify-center">
      <Outlet context={{ state }}></Outlet>
      {/* <div>1</div> */}
    </div>
  );
};

export default ActivePage;
