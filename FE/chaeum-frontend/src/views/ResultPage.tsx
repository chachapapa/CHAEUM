import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Typography,
} from '@material-tailwind/react';
import { Tag } from '../components/common/Tag';
import CommentList from '../components/feed/CommentList';
import { RivalCard } from '../components/active/result/RivalCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { setStartMentList } from '../features/states/states';
import { useAppSelector } from '../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_ROUTES, getApiUrl } from '../apiConfig';
/*
  Props
  시간은 2023-08-02 17:20:15 
  이런식으로 연월일 시간을 string으로 받고
  보여줄때는 시간만 보여주기.

  activityTime은 이전 페이지에서 계산해서 string으로 받기.
*/
type Cheering = {
  nickname: string;
  content: string;
  profileUrl: string;
};
type Props = {
  tags: string[];
  startTime: string;
  endTime: string;
  activityTime: string;
};

type User = {
  nickName: string;
  profileImage: string;
};

type Comment = {
  commentId: number;
  user: User;
  content: string;
};

let cheeringMent: Cheering[] = [
  {
    nickname: '',
    content: '응원글이 아직 없습니다.',
    profileUrl: '../chacha2.png',
  },
];
const access_token = localStorage.getItem('access_token');
const COMPLETE_ACT_URL = 'http://i9a810.p.ssafy.io:8080/api/activity';

const ResultPage = () => {
  // 임시 작성 =====================
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
  const myActivityTagList = useAppSelector(
    state => state.stateSetter.myActivityTagList
  );

  const tags = myActivityTagList;

  const commentListExample: Comment[] = [
    {
      commentId: 1,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 1',
    },
    {
      commentId: 2,
      user: { nickName: 'lulu', profileImage: '../chacha1.jpg' },
      content: '댓글 2',
    },
    {
      commentId: 3,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 3',
    },
    {
      commentId: 4,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 4',
    },
  ];

  // 응원글 갱신
  const fetchCheering = async () => {
    try {
      const response = await axios
        .get(`${getApiUrl(API_ROUTES.ACTIVITY_ENCOURAGE_URL)}`, {
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCheering();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const myActivityInfo = useAppSelector(
    state => state.stateSetter.myActivityInfo
  );
  const rivalInfoList = useAppSelector(
    state => state.stateSetter.rivalInfoList
  );
  const startMentList = useAppSelector(
    state => state.stateSetter.startMentList
  );

  // const startTime = '2023-08-02 14:03:21';
  const startTime = new Date(myActivityInfo.date);
  const endTime = new Date();
  // const activityTime = '00:04:00';
  const activityTime = calculateTimeDifference(myActivityInfo.date);
  function calculateTimeDifference(targetTime: string): string {
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

    // Hours calculation
    const hours = Math.floor(timeDifferenceInSeconds / 3600);

    // Minutes calculation
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

    // Seconds calculation
    const seconds = Math.floor((timeDifferenceInSeconds % 60) / 1);

    const shours = String(hours).padStart(2, '0');
    const sminutes = String(minutes).padStart(2, '0');
    const sseconds = String(seconds).padStart(2, '0');

    return `${shours}:${sminutes}:${sseconds}`;
  }

  const currentTimer = (now: Date) => {
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 시간 분리
  // const sTime = startTime.split(' ')[1];
  // const eTime = endTime.split(' ')[1];
  const sTime = currentTimer(startTime);
  const eTime = currentTimer(endTime);

  // Routes
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToShare = () => {
    // 동기부여 멘트 초기화
    dispatch(setStartMentList(['...동기부여 멘트를 생성중입니다...']));
    navigate('/feed/write');
  };

  const goToMain = () => {
    // 동기부여 멘트 초기화
    dispatch(setStartMentList(['...동기부여 멘트를 생성중입니다...']));
    navigate('/main');
  };

  return (
    <div className="w-full flex flex-col items-center outline">
      <Carousel className="w-full h-full">
        <div className=" bg-chaeum-blue-300 outline outline-1 h-full">
          {/* 태그 */}
          <div className="pt-20">
            {tags.map((tag, index) => (
              <Tag tag={tag} key={index} color="blue"></Tag>
            ))}
          </div>
          <div className="text-5xl pt-12">채움 완료</div>
          <div className="text-2xl pt-4">
            {sTime} ~ {eTime}
          </div>
          <div className="text-5xl pt-16">{activityTime}</div>

          <div className="flex justify-center place-items-center">
            <div className="float-left; ml-12 w-24">
              <RivalCard
                name={rivalInfoList[0].nickname}
                tag={rivalInfoList[0].categoryMiddle}
                profile={rivalInfoList[0].profileImageUrl}
              ></RivalCard>
            </div>
            <div className="float-left; w-24">
              <RivalCard
                name={rivalInfoList[1].nickname}
                tag={rivalInfoList[1].categoryMiddle}
                profile={rivalInfoList[1].profileImageUrl}
              ></RivalCard>
            </div>
            <div className="float-left; w-48">
              <RivalCard
                name={rivalInfoList[2].nickname}
                tag={rivalInfoList[2].categoryMiddle}
                profile={rivalInfoList[2].profileImageUrl}
              ></RivalCard>
            </div>
          </div>
          <div className="mx-auto flex justify-center place-items-center pt-10">
            <Button
              className=" m-4 float-left; w-40"
              variant="filled"
              color="gray"
              ripple={true}
              size="lg"
              onClick={goToShare}
            >
              활동공유
            </Button>
            <Button
              className="m-4 float-left; w-40"
              variant="filled"
              ripple={true}
              size="lg"
              onClick={goToMain}
            >
              활동완료
            </Button>
          </div>
        </div>

        <div className="bg-chaeum-blue-300 outline outline-1 h-full">
          <div className="text-4xl pt-10">채움 완료</div>

          {/* 태그 */}
          <div className="pt-2">
            {tags.map((tag, index) => (
              <Tag tag={tag} key={index} color="blue"></Tag>
            ))}
          </div>
          <div className="text-5xl pt-4">{activityTime}</div>

          <div className="text-2xl pt-10">친구의 응원글</div>
          <div className="mx-auto flex justify-center pt-4">
            <Card className="w-full h-[200px] border-x-4">
              <div className=" w-[360px] p-1 pl-2 my-3">
                {/* {commentListExample.map(comment => ( */}

                {/* 응원글이 없을경우 처리 */}
                {cheeringMent.length === 0 ? (
                  <div className="text-center w-full pr-24">
                    작성된 응원글이 없습니다.
                  </div>
                ) : (
                  <>
                    {/* 응원글이 있을경우 최대 4개까지 보여주게끔 처리 */}
                    {cheeringMent.slice(0, 4).map(comment => (
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
                                <span>{comment.content}</span>
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

          <div className="mx-auto flex justify-center place-items-center pt-20 mt-1">
            <Button
              className=" m-4 float-left; w-40"
              variant="filled"
              color="gray"
              size="lg"
              ripple={true}
              onClick={goToShare}
            >
              활동공유
            </Button>
            <Button
              className="m-4 float-left; w-40"
              variant="filled"
              size="lg"
              ripple={true}
              onClick={goToMain}
            >
              활동완료
            </Button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ResultPage;
