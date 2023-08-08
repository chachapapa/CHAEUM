import React from 'react';
import NewStoryCard from '../NewStoryCard';
import ArticleCard from '../ArticleCard';
import ActivityOutlineCard from './ActivityOutlineCard';
import ActivityUploadCard from './ActivityUploadCard';
import InputTag from '../../common/InputTag';
import TextBox from '../../common/TextBox';
import TextArea from '../../common/TextArea';
import { ColorVariation } from '../../Types';
import { StreakColor } from '../../theme/StreakTheme';
import ImageUpload from '../../common/ImageUpload';


type Props = {
  streakColor: ColorVariation;
};

const FeedWritePage = (props: Props) => {
  return (
    <div className="overflow-auto flex flex-col flex-grow bg-white items-center">
      <ActivityUploadCard
        color={props.streakColor}
        tag={['#브루노마스']}
        time={3}
        title="월드스타프로젝트"
        startToEndTime="17:30 ~ 19:30"
      />

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
        <ImageUpload
        />
      </div>
    </div>
  );
};

export default FeedWritePage;
