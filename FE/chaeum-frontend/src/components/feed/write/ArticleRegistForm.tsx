import React, { useState } from 'react';
import NewStoryCard from '../NewStoryCard';
import ArticleCard from '../ArticleCard';
import ActivityOutlineCard from './ActivityOutlineCard';
import ActivityUploadCard from './ActivityUploadCard';
import InputTag from '../../common/InputTag';
import TextBox from '../../common/TextBox';
import TextArea from '../../common/TextArea';
import { Activity, ColorVariation, ImageFile } from '../../Types';
import { StreakColor } from '../../theme/StreakTheme';
import ImageUpload from '../../common/ImageUpload';
import { useNavigate } from 'react-router-dom';

type Props = {
  activity: Activity;
};

const ArticleRegistForm = ({ activity }: Props) => {
  const navigate = useNavigate();
  const startTime: Date = new Date(activity.startTime);
  const endTime: Date = new Date(activity.endTime);
  const elapsedTime = endTime.getTime() - startTime.getTime();
  console.log(elapsedTime / 1000 / 60 / 60);
  const date =
    startTime.getFullYear() +
    '년 ' +
    startTime.getMonth() +
    '월 ' +
    startTime.getDay() +
    '일';
  const startTimeFormed = activity.startTime.split(' ')[1];
  const endTimeFormed = activity.endTime.split(' ')[1];

  const hour = Math.floor(elapsedTime / 3600000);
  const minute = Math.floor((elapsedTime - hour * 3600000) / 60000);
  const second = (elapsedTime - hour * 3600000 - minute * 60000) / 1000;
  const elapsedTimeFormed = hour + '시간 ' + minute + '분 ' + second + '초';

  const [articleContent, setArticleContent] = useState<string>('');
  const [imageList, setImageList] = useState<ImageFile[]>([]);

  return (
    <div className="w-full flex flex-col items-center">
      {activity.streak.streakName && activity.streak.streakTag ? (
        <ActivityUploadCard
          color={activity.color}
          tag={activity.streak.streakTag}
          date={date}
          title={activity.streak.streakName}
          startToEndTime={`${startTimeFormed} ~ ${endTimeFormed}`}
        />
      ) : null}
      <div className="flex flex-col mt-7 w-11/12 ">
        <label className="self-start mb-1">
          <i className="fa-solid fa-pen mx-2"></i>
          게시글 작성
        </label>
        <TextArea
          height="h-[150px]"
          inputPlaceholder="활동 후기를 적는 곳이에요."
        />
      </div>

      <div className="flex flex-col mt-7 w-11/12 ">
        <label className="self-start mb-1">
          <i className="fa-regular fa-image mx-2"></i>
          사진/동영상 업로드
        </label>
        <ImageUpload imageList={imageList}/>
      </div>
    </div>
  );
};

export default ArticleRegistForm;
