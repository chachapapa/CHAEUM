import React, { useState } from 'react';
import { Button, Card, Carousel, Typography } from '@material-tailwind/react';
import { Tag } from '../components/common/Tag';
import CommentList from '../components/feed/CommentList';
import { RivalCard } from '../components/active/result/RivalCard';
import { useNavigate } from 'react-router-dom';

/*
  Props
  시간은 2023-08-02 17:20:15 
  이런식으로 연월일 시간을 string으로 받고
  보여줄때는 시간만 보여주기.

  activityTime은 이전 페이지에서 계산해서 string으로 받기.
*/

type Props = {
  tags: string[];
  startTime: string;
  endTime: string;
  activityTime: string;
};

const ResultPage = () => {
  // 임시 작성 =====================
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

  const startTime = '2023-08-02 14:03:21';
  const endTime = '2023-08-02 14:07:21';
  const activityTime = '00:04:00';

  // 시간 분리
  const sTime = startTime.split(' ')[1];
  const eTime = endTime.split(' ')[1];

  // Routes
  const navigate = useNavigate();
  const goToShare = () => {
    console.log('go to feed write page');
    navigate('/feed/write');
  };

  return (
    <Carousel className="rounded-xl w-[452px] h-[932px]">
      <div className="w-[452px] h-[932px] bg-chaeum-blue-300 outline outline-1">
        {/* 태그 */}
        <div className="pt-40">
          {tags.map(tag => (
            <Tag tag={tag.tag} key={tag.id} color="blue"></Tag>
          ))}
        </div>
        <div className="text-5xl pt-12">채움 완료</div>
        <div className="text-2xl pt-4">
          {sTime} ~ {eTime}
        </div>
        <div className="text-5xl pt-36">{activityTime}</div>
        <div className="mx-auto flex justify-center place-items-center pt-60">
          <Button
            className=" m-4 float-left; w-40"
            variant="filled"
            color="gray"
            ripple={true}
            size="lg"
            onClick={goToShare}
          >
            공유하기
          </Button>
          <Button
            className="m-4 float-left; w-40"
            variant="filled"
            ripple={true}
            size="lg"
            onClick={goToShare}
          >
            수정하기
          </Button>
        </div>
      </div>

      <div className="w-[452px] h-[932px] bg-chaeum-blue-300 outline outline-1">
        <div className="text-4xl pt-20">채움 완료</div>

        {/* 태그 */}
        <div className="pt-2">
          {tags.map(tag => (
            <Tag tag={tag.tag} key={tag.id} color="blue"></Tag>
          ))}
        </div>
        <div className="text-5xl pt-4">{activityTime}</div>

        <div className="text-2xl pt-12">친구의 응원글</div>
        <div className="mx-auto flex justify-center pt-4">
          <Card className="w-[300px] h-[200px]">
            <CommentList></CommentList>
          </Card>
        </div>

        <div className="flex justify-center place-items-center">
          <div className="m-4 float-left; w-24">
            <RivalCard name="coco" tag="#코딩"></RivalCard>
          </div>
          <div className="m-4 float-left; w-24">
            <RivalCard name="rulu" tag="#음주"></RivalCard>
          </div>
          <div className="m-4 float-left; w-48">
            <RivalCard name="맥주" tag="#콸콸콸"></RivalCard>
          </div>
        </div>
        <div className="mx-auto flex justify-center place-items-center pt-7">
          <Button
            className=" m-4 float-left; w-40"
            variant="filled"
            color="gray"
            size="lg"
            ripple={true}
            onClick={goToShare}
          >
            공유하기
          </Button>
          <Button
            className="m-4 float-left; w-40"
            variant="filled"
            size="lg"
            ripple={true}
            onClick={goToShare}
          >
            수정하기
          </Button>
        </div>
      </div>
    </Carousel>
  );
};

export default ResultPage;
