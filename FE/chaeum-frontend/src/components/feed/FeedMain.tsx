import React, { useEffect, useRef, useState } from 'react';
import ArticleCard from '../../components/feed/ArticleCard';
import NewStoryCard from '../../components/feed/NewStoryCard';
import { Article, ColorVariation, Comment, Story } from '../Types';
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
  const [cardTransitionOver, setCardTransitionOver] = useState<boolean>(true);
  const [isNavigateButtonClicked, setIsNavigateButtonClicked] =
    useState<boolean>(false);
  const [pageEndCount, setPageEndCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${STORY_LIST_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(res => {
        console.log(res);
        if (res) {
          console.log(res);
          setStoryList(res.data);
        } else {
          console.log('스토리 가져오기 실패');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const onStoryClicked = (story: Story) => {
    setCardTransitionOver(false);
    setDetailedStory(story);
    setIsStoryOpened(true);
  };

  const closeStoryDetail = (e: React.MouseEvent) => {
    if (
      e.target === document.querySelector('.background') ||
      e.target === document.querySelector('.fa-solid')
    ) {
      setIsStoryOpened(false);
      setTimeout(() => setCardTransitionOver(true), 200);
    }
  };

  const getArticle = async () => {
    try {
      const res = await axios.get(`${ARTICLE_LIST_URL}`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
        params: { idx: articleList.length },
      });
      // console.log(res.data);
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          const commentList: Comment[] = [];
          const encourageMessageList: Comment[] = [];

          for (let j = 0; j < res.data[i].replyList.length; j++) {
            if (res.data[i].replyList[j].cheer) {
              encourageMessageList.push(res.data[i].replyList[j]);
            } else {
              commentList.push(res.data[i].replyList[j]);
            }
          }
          const tmpArticle: Article = res.data[i];
          tmpArticle.commentList = commentList;
          tmpArticle.encourageMessageList = encourageMessageList;

          setArticleList(prevList => [...prevList, tmpArticle]);
        }
        setLoading(true);
      }
    } catch (e) {
      console.log('게시글 가져오기 실패');
    }
  };

  useEffect(() => {
    getArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageEndCount]);

  useEffect(() => {
    if (loading) {
      //로딩되었을 때만 실행
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      //옵져버 탐색 시작
      if (target.current) observer.observe(target.current);
    }
  }, [loading]);

  const loadMore = () => {
    setPageEndCount(prev => prev + 1);
  };

  const target = useRef<HTMLDivElement>(null);

  return (
    <div
      className={
        isStoryOpened
          ? 'relative overflow-hidden flex-grow'
          : 'relative overflow-auto flex-grow'
      }
    >
      <div className="flex bg-white p-5 overflow-auto">
        {storyList.map((story, index) => (
          <NewStoryCard
            story={story}
            key={index}
            onStoryClicked={() => onStoryClicked(story)}
          />
        ))}
      </div>
      <div
        className={
          isStoryOpened && !cardTransitionOver
            ? 'background flex absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 transition-all duration-200  z-50 justify-center items-center'
            : !isStoryOpened && !cardTransitionOver
              ? 'flex absolute top-0 left-0 w-full h-full opacity-0 transition-all duration-200  z-0 justify-center items-center'
              : ''
        }
        onClick={closeStoryDetail}
      >
        {detailedStory && isStoryOpened ? (
          <StoryDetailCard
            story={detailedStory}
            closeStoryDetail={closeStoryDetail}
          ></StoryDetailCard>
        ) : null}
      </div>

      <div className="bg-gray-100 mt-3">
        <div className="max-w-7xl">
          <div className="w-full">
            {articleList.map((article, index) => (
              <div key={index}>
                <ArticleCard
                  article={article}
                  setArticleList={setArticleList}
                  index={article.postId}
                ></ArticleCard>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-5">
        <FeedLoadingWave target={target} />
      </div>
    </div>
  );
};

export default FeedMain;
