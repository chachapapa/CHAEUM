import React, { useEffect, useRef, useState } from 'react';
import ArticleCard from '../../components/feed/ArticleCard';
import NewStoryCard from '../../components/feed/NewStoryCard';
import { Article, ColorVariation, Story } from '../Types';
import StoryDetailCard from './StoryDetailCard';
import LoadingPage from '../common/LoadingPage';
import FeedLoadingWave from './FeedLoadingWave';
import axios from 'axios';

const ARTICLE_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/sns';
const STORY_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/active';
const AccessToken = localStorage.getItem('access_token');

const FeedMain = () => {
  const [detailedStory, setDetailedStory] = useState<Story>();
  const [isStoryOpened, setIsStoryOpened] = useState<boolean>(false);
  // const [isArticleLoading, setIsArticleLoading] = useState<boolean>(false);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [storyList, setStoryList] = useState<Story[]>([]);
  let isArticleLoading = false;

  useEffect(() => {
    // 무한스크롤이 완성되면 지워질 부분. 게시글 가져오기요청만!
    // axios
    //   .get(`${ARTICLE_LIST_URL}`, {
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res) {
    //       setArticleList(prevList => [
    //         ...prevList, res.data
    //       ]);
    //     } else {
    //       console.log('게시글 가져오기 실패');
    //     }
    //   });

    // axios
    //   .get(`${STORY_LIST_URL}`, {
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res) {
    //       setStoryList(prevList => [...prevList, res.data]);
    //     } else {
    //       console.log('스토리 가져오기 실패');
    //     }
    //   });

    setStoryList([
      {
        activityId: 1,
        id: 1,
        nickname: 'chacha',
        title: '산양은 아니고 염소정도',
        profileImg: './chacah2.png',
        color: 'yellow',
        tag: ['#클라이밍', '#빨주노초파'],
        time: 15,
      },
      {
        activityId: 2,
        id: 2,
        nickname: 'coco',
        title: '정성하 따라잡기',
        profileImg: './chacah1.jpg',
        color: 'blue',
        tag: ['#핑거스타일', '#쥰내어렵당'],
        time: 10,
      },
      {
        activityId: 3,
        id: 3,
        nickname: '차차아버님',
        title: '마지막주를 불태워보아요',
        profileImg: './chacah1.jpg',
        color: 'red',
        tag: ['#공통프로젝트', '#물대신커피'],
        time: 10,
      },
    ]);
  }, []);

  const onStoryClicked = (story: Story) => {
    setDetailedStory(story);
    setIsStoryOpened(true);
  };

  const closeStoryDetail = () => {
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
    <div className="relative overflow-auto flex-grow">
      <div className="flex bg-white p-5 overflow-auto">
        {storyList.map(story => (
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
      >
        {detailedStory && isStoryOpened ? (
          <StoryDetailCard
            story={detailedStory}
            closeStoryDetail={closeStoryDetail}
          ></StoryDetailCard>
        ) : null}
      </div>
      {/* {articleList.map((article,index) => (
        <ArticleCard article={article} key={index}></ArticleCard>
      ))} */}
      <ArticleCard
        article={articleList[0]}
        key={1}
        setArticleList={setArticleList}
      ></ArticleCard>

      <FeedLoadingWave target={target} />
    </div>
  );
};

export default FeedMain;
