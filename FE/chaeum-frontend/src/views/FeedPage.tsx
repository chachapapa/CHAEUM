import React, { useEffect, useState } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import StoryCard from '../components/feed/StoryCard';
import ArticleCard from '../components/feed/ArticleCard';
import { ChaeumNav } from '../components/common/ChaeumNav';
import NewStoryCard from '../components/feed/NewStoryCard';
import LoadingPage from '../components/common/LoadingPage';
import { Outlet, useLocation } from 'react-router-dom';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/

const FeedPage = () => {

  const location = useLocation();
  const [isLogo, setIsLogo] = useState<boolean>(false);

  useEffect(() => {
    if(location.pathname === '/feed') {
      setIsLogo(true);
    }
  },[location.pathname]);
  
  


  return (
    <div className="flex flex-col w-full h-full bg-gray-100 outline outline-1">
      {isLogo? <ChaeumHeader isLogo></ChaeumHeader> : <ChaeumHeader isLogo={false} title='게시글 작성'></ChaeumHeader>}

      <Outlet/>
      
      <ChaeumNav></ChaeumNav>
    </div>
  );
};

export default FeedPage;
