import React, { useEffect, useRef, useState } from 'react';
import ArticleCard from '../../components/feed/ArticleCard';
import NewStoryCard from '../../components/feed/NewStoryCard';
import { Article, ColorVariation, Story } from '../Types';
import StoryDetailCard from './StoryDetailCard';
import LoadingPage from '../common/LoadingPage';
import FeedLoadingWave from './FeedLoadingWave';
import axios from 'axios';

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


const ARTICLE_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/sns';
const AccessToken = localStorage.getItem('access_token');

const FeedMain = () => {
  const [detailedStory, setDetailedStory] = useState<Story>();
  const [isStoryOpened, setIsStoryOpened] = useState<boolean>(false);
  // const [isArticleLoading, setIsArticleLoading] = useState<boolean>(false);
  const [articleList, setArticleList] = useState<Article[]>([]);
  let isArticleLoading = false;

  
  

  const onStoryClicked = (story: Story) => {
    setDetailedStory(story);
    setIsStoryOpened(true);
  };

  const CloseStoryDetail = () => {
    setIsStoryOpened(false);
  };

  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
  });

  const options = {
    threshold: 1.0,
  };

  const callback = () => {
    if (isArticleLoading === false) {

      isArticleLoading = true;
      
      // 무한스크롤 구현을 위해 10개씩 받아오기. 이를 위해서 인덱스를 변수로 같이 보내서 잘라서 받아와야함.
      // 선우야 미안해!
      // axios
      //   .get(`${ARTICLE_LIST_URL}`, {
      //     headers: {
      //       Authorization: `Bearer ${AccessToken}`,
      //     }, params : {index : articleList.length }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     if (res.data) {
      //       setArticleList(prevList => [...prevList,res.data]);
      //       isArticleLoading=false;
      //     } else {
      //       console.log('게시글이 없어용');
      //     }
      //   });

    }
  };

  
  const observer = new IntersectionObserver(callback, options);

  return (
    <div className=" overflow-auto flex-grow">
      <div className="flex bg-white p-5 overflow-auto">
        {storyExample.map(story => (
          <NewStoryCard
            story={story}
            key={story.id}
            onStoryClicked={() => onStoryClicked(story)}
          />
        ))}
      </div>
      <div
        className={
          isStoryOpened
            ? 'flex absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 transition-all z-50 justify-center items-center'
            : 'absolute opacity-0 transition-all'
        }
        onClick={CloseStoryDetail}
      >
        {detailedStory && isStoryOpened ? (
          <StoryDetailCard story={detailedStory}></StoryDetailCard>
        ) : null}
      </div>
      <ArticleCard></ArticleCard>
      <FeedLoadingWave target={target} />
    </div>
  );
};

export default FeedMain;
