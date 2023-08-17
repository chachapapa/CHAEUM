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

  // const [articleContent, setArticleContent] = useState<string>('');
  // const [imageList, setImageList] = useState<ImageFile[]>([]);

  return (
    <div className="w-full flex flex-col items-center">
      {activity.streakName && activity.tagList ? (
        <ActivityUploadCard
          color={activity.streakColor}
          tag={activity.tagList}
          date={activity.date}
          title={activity.streakName}
          startToEndTime={`${activity.startTime} ~ ${activity.endTime}`}
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
        <ImageUpload/>
      </div>
    </div>
  );
};

export default ArticleRegistForm;
