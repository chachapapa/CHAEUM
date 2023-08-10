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

/*
  사용 예시

  <Timer></Timer>
*/
type User = {
  nickName: string;
  profileImage: string;
};

type Comment = {
  commentId: number;
  user: User;
  content: string;
};
const ActiveFullScreen = () => {
  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
    console.log(Math.floor(time / 100));
    console.log('현재 시간 입니다 : ' + currentTimer());
    console.log('현재 시간 타입입니다 : ' + typeof currentTimer());
  };

  const navigate = useNavigate();
  const goResult = () => {
    navigate('/active/result');
  };

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const currentTimer = () => {
    const now = new Date();
    const year = String(now.getFullYear());
    const months = String(now.getMonth()).padStart(2, '0');
    const days = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${months}-${days} ${hours}:${minutes}:${seconds}`;
  };

  const tags = [
    {
      id: 1,
      tag: '클라이밍',
    },
    {
      id: 3,
      tag: '열심히',
    },
    {
      id: 2,
      tag: '운동',
    },
  ];

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
  return (
    <div className="z-10 stopwatch-container bg-chaeum-blue-300 w-[307.16px] h-full">
      <div className="max-w-[307.16px] mx-auto overflow-hidden">
        <div className="text-5xl mt-5"> 채움 중 ...</div>
        <div className="mt-5">
          {tags.map(tag => (
            <Tag tag={tag.tag} key={tag.id} color="blue"></Tag>
          ))}
        </div>
        <div className="text-5xl mt-10">{formattedTime}</div>
        <div className="bg-chaeum-blue-300 p-4 w-300 h-200 items-center">
          <Card className="w-full h-[200px] border-x-4">
            <div className=" w-[360px] p-1 pl-2 my-3">
              {commentListExample.map(comment => (
                <div
                  className="relative w-full h-10 mb-1"
                  key={comment.commentId}
                >
                  <div className="absolute h-full w-full grid justify-items-start items-center ">
                    <div className="flex h-full">
                      <Avatar
                        src={comment.user.profileImage}
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
                            {comment.user.nickName}
                          </span>
                          <span>{comment.content}</span>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="bg-chaeum-blue-300 p-4 w-300 h-200 items-center">
          <Card>
            <PhraseCard title="동기부여멘트" ment={'동기부여멘트'}></PhraseCard>
          </Card>
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
