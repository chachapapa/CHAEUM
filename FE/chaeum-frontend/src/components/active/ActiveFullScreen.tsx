import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Typography,
} from '@material-tailwind/react';
import ActiveInfoCard from './ActiveInfoCard';
import PhraseCard from './PhraseCard';
import { useNavigate } from 'react-router';
import { Tag } from '../common/Tag';
import axios from 'axios';
import {
  setMyActivityInfo,
  setRivalInfoList,
  setMyAccumalteTime,
} from '../../features/states/states';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';

type Cheering = {
  nickname: string;
  comments: string;
  profileUrl: string;
};

type Props = {
  cheeringMent: Cheering[];
  startMent: string[];
};

const ActiveFullScreen = (props: Props) => {
  const dispatch = useDispatch();
  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  const rivalInfoList = useAppSelector(
    state => state.stateSetter.rivalInfoList
  );
  const myAccumulateTime = useAppSelector(
    state => state.stateSetter.myAccumulateTime
  );
  const myActivityTagList = useAppSelector(
    state => state.stateSetter.myActivityTagList
  );

  // state to store time
  const [time, setTime] = useState(
    myAccumulateTime + calculateTimeDifference(myActivityInfo.date)
  );

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(true);

  function calculateTimeDifference(targetTime: string): number {
    /*
      현재 시간 - 활동 시작시간 을 빼면
      라이벌이 활동중일때 accumulateTime + 해당 시간 차 만큼
      활동시간을 갱신할 수 있습니다.
    */

    const currentTime = new Date();
    const targetDate = new Date(targetTime);

    const timeDifferenceInSeconds = Math.floor(
      (currentTime.getTime() - targetDate.getTime()) / 1000
    );

    return timeDifferenceInSeconds;
  }

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor((time % 60) / 1);

  // Method to start and stop timer
  const startAndStop = () => {
    // setIsRunning(!isRunning);
    // console.log(Math.floor(time / 100));
    // console.log('현재 시간 입니다 : ' + currentTimer());
    // console.log('현재 시간 타입입니다 : ' + typeof currentTimer());
    alert('추후 업데이트 예정입니다 :(');
  };

  const UPDATE_ACTIVITY_URL = 'http://i9a810.p.ssafy.io:8080/api/activity';
  const access_token = localStorage.getItem('access_token');
  const navigate = useNavigate();

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

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // const tags = [
  //   {
  //     id: 1,
  //     tag: '클라이밍',
  //   },
  //   {
  //     id: 3,
  //     tag: '열심히',
  //   },
  //   {
  //     id: 2,
  //     tag: '운동',
  //   },
  // ];

  const tags = myActivityTagList;
  return (
    <div className="z-10 stopwatch-container bg-[#aae8ed] w-full h-full">
      <div className="max-w-[307.16px] mx-auto overflow-hidden">
        <div className="text-5xl mt-5"> 채움 중 ...</div>
        <div className="mt-5">
          {tags.map((tag, index) => (
            <Tag tag={tag} key={index} color="blue"></Tag>
          ))}
        </div>
        <div className="text-5xl mt-10">{formattedTime}</div>
        <div className="bg-[#aae8ed] p-4 w-300 h-200 items-center">
          <Card className="w-full h-[200px] border-x-4">
            <div className=" w-[360px] p-1 pl-2 my-3">
              {/* {commentListExample.map(comment => ( */}

              {/* 응원글이 없을경우 처리 */}
              {props.cheeringMent.length === 0 ? (
                <div className="text-center w-full pr-24">
                  작성된 응원글이 없습니다.
                </div>
              ) : (
                <>
                  {/* 응원글이 있을경우 최대 4개까지 보여주게끔 처리 */}
                  {props.cheeringMent.slice(0, 4).map(comment => (
                    <div
                      className="relative w-full h-10 mb-1"
                      key={comment.nickname}
                    >
                      <div className="absolute h-full w-full grid justify-items-start items-center ">
                        <div className="flex h-full">
                          <Avatar
                            src={comment.profileUrl}
                            alt="avatar"
                            size="sm"
                            className="mr-2"
                          />

                          <div className="text-center self-center">
                            <Typography
                              variant="lead"
                              color="text-chaeum-gray-900"
                              className="opacity-80 text-sm"
                            >
                              <span className="font-bold mr-2">
                                {comment.nickname}
                              </span>
                              <span>{comment.comments}</span>
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>
        </div>
        <div className="bg-[#aae8ed] p-4 w-300 h-200 items-center">
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
        </div>
        <div className="mx-auto flex justify-center place-items-center ">
          <Button
            className=" m-4 float-left; w-40"
            variant="filled"
            color="gray"
            size="lg"
            ripple={true}
            onClick={startAndStop}
          >
            {isRunning ? <div>일시중지</div> : <div>다시시작</div>}
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
  );
};

export default ActiveFullScreen;
