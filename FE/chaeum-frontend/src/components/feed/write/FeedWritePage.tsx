import React, { useState } from 'react';
import NewStoryCard from '../NewStoryCard';
import ArticleCard from '../ArticleCard';
import ActivityOutlineCard from './ActivityOutlineCard';
import ActivityUploadCard from './ActivityUploadCard';
import InputTag from '../../common/InputTag';
import TextBox from '../../common/TextBox';
import TextArea from '../../common/TextArea';
import { Activity, ColorVariation } from '../../Types';
import { StreakColor } from '../../theme/StreakTheme';
import ImageUpload from '../../common/ImageUpload';
import ArticleRegistForm from './ArticleRegistForm';
import ActivityList from './ActivityList';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const FeedWritePage = () => {
  const articleWriteStep = useAppSelector(
    state => state.stateSetter.articleWriteStep
  );
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [registActivity, setRegistActivity] = useState<Activity>();

  if (registActivity === undefined && state) {
    setRegistActivity(state.registActivity);
  }
  const onClickNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <div className="overflow-auto flex flex-col flex-grow bg-white items-center">
      {articleWriteStep === 1 ? (
        <ActivityList setRegistActivity={setRegistActivity} />
      ) : articleWriteStep === 2 && registActivity ? (
        <ArticleRegistForm activity={registActivity} />
      ) : null}
    </div>
  );
};

export default FeedWritePage;
