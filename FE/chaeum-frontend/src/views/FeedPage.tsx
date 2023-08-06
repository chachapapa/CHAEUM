import React from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import { ChaeumHeader } from '../components/common/ChaeumHeader';
import StoryCard from '../components/feed/StoryCard';
import ArticleCard from '../components/feed/ArticleCard';
import { ChaeumNav } from '../components/common/ChaeumNav';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/

const FeedPage = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100 outline outline-1">
      <ChaeumHeader isLogo></ChaeumHeader>

      <div className='h-2/3 overflow-auto flex-grow'>
        <div className="bg-white p-5 mt-5">
          <StoryCard
            nickname="chacha"
            img="../chacha2.png"
            ment="나는 산양이 될테야"
            color="yellow"
            tag="#클라이밍"
            time="02:03:25"
          ></StoryCard>
        </div>

        <ArticleCard></ArticleCard>
      </div>
      <ChaeumNav></ChaeumNav>
    </div>
  );
};

export default FeedPage;
