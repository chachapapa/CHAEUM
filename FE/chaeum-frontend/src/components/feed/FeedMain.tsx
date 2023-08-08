import React, { useState } from 'react';
import ArticleCard from '../../components/feed/ArticleCard';
import NewStoryCard from '../../components/feed/NewStoryCard';
import { ColorVariation, Story } from '../Types';
import StoryDetailCard from './StoryDetailCard';

const storyExample: Story[] = [
  {
    id: 1,
    nickname: 'chacha',
    title: '산양은 아니고 염소정도',
    img: './chacah2.png',
    color: 'yellow',
    tag: ['#클라이밍', '#빨주노초파'],
    time: 15,
  },
  {
    id: 2,
    nickname: 'coco',
    title: '정성하 따라잡기',
    img: '../chacah1.jpg',
    color: 'blue',
    tag: ['#핑거스타일', '#쥰내어렵당'],
    time: 10,
  },
];

const FeedMain = () => {

  const [detailedStory, setDetailedStory] = useState<Story>();
  const [isStoryOpened, setIsStoryOpened] = useState<boolean>(false);

  const onStoryClicked = (story:Story) => {
    setDetailedStory(story);
    setIsStoryOpened(true);
  };

  const CloseStoryDetail = () =>{
    setIsStoryOpened(false);
  };


  return (
    <div className=" overflow-auto flex-grow">
      <div className="flex bg-white p-5 overflow-auto">
        {storyExample.map(story => (
          <NewStoryCard
            story={story}
            key={story.id}
            onStoryClicked = {()=>onStoryClicked(story)}
          />
        ))}
      </div>
      <div className={isStoryOpened? 'flex absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 transition-all z-50 justify-center items-center':'absolute opacity-0 transition-all'} onClick={CloseStoryDetail}>
        {detailedStory && isStoryOpened ? <StoryDetailCard story={detailedStory}></StoryDetailCard> : null}
      </div>
      <ArticleCard></ArticleCard>
    </div>
  );
};

export default FeedMain;
