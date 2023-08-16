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
  const [cardTransitionOver, setCardTransitionOver] = useState<boolean>(true);
  const [isNavigateButtonClicked, setIsNavigateButtonClicked] = useState<boolean>(false);
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

    setArticleList([
      {
        id: 1,
        user: { nickName: 'chacha', profileImage: '../chacha2.png' },
        date: 'Mar 16, 2020',
        dateTime: '2020-03-16',
        activityInfo: {
          id: 1,
          streakId: 1,
          streak: {
            categoryMain: '공부',
            categoryMiddle: '수능',
            streakTag: ['#서울대드가자~', '#10수'],
            streakName: '니가 그렇게 공부를 잘해?!?',
          },
          category: '수능',
          startTime: '2023-08-10 11:00:00',
          endTime: '2023-08-11 12:00:00',
          color: 'red',
        },
        likeCount: 5,
        commentCount: 15,
        content: '윽엑 더미데이터 한땀한땀 적어 넣기 여간 귀찮은게 아닌걸',
        imageList: [
          '../chacha1.jpg',
          '../chacha2.png',
          '../chacha2.png',
          '../chacha1.jpg',
        ],
        encourageMessageList: [
          {
            activityId: 1,
            user: { nickName: '차차아버님', profileImage: './chacha2.png' },
            content: '응 절대 못가~~~',
          },
          {
            activityId: 1,
            user: {
              nickName: '지나가는 서울대생',
              profileImage: './chacha1.jpg',
            },
            content: '11수 하면 그만이야~~~말줄임 테스트',
          },
        ],
        commentList: [
          {
            activityId: 1,
            user: { nickName: '스승님', profileImage: './chacha1.jpg' },
            content: '헛된 꿈을 꾸었느냐...',
          },
          {
            activityId: 1,
            user: { nickName: 'Daniel Ceaser', profileImage: './chacha2.png' },
            content: 'Best Part',
          },
        ],
      },

      {
        id: 2,
        user: { nickName: 'chacha', profileImage: '../chacha1.jpg' },
        date: 'Mar 16, 2020',
        dateTime: '2020-03-16',
        activityInfo: {
          id: 2,
          streakId: 2,
          streak: {
            categoryMain: '운동',
            categoryMiddle: '클라이밍',
            streakTag: ['#빨주노초파남보', '#영!차-'],
            streakName: '산양은 아니고 염소정도',
          },
          category: '클라이밍',
          startTime: '2023-08-10 11:00:00',
          endTime: '2023-08-11 12:00:00',
          color: 'teal',
        },
        likeCount: 5,
        commentCount: 15,
        content:
          '오늘은 컴포넌트를 만들어볼거에요 꺄륵꺄륵 \n 오늘 하나는 만들어 놔야지. \n 타입스크립트도 조금 적용 제대로 해서..',
        imageList: [
          '../chacha1.jpg',
          '../chacha1.jpg',
          '../chacha1.jpg',
          '../chacha1.jpg',
        ],
        encourageMessageList: [
          {
            activityId: 2,
            user: { nickName: 'coco', profileImage: '코코' },
            content: '댓글 1',
          },
          {
            activityId: 2,
            user: { nickName: 'lulu', profileImage: '룰루' },
            content: '댓글 2',
          },
        ],
        commentList: [
          {
            activityId: 2,
            user: { nickName: '차차아버님', profileImage: '코코' },
            content: '댓글 1',
          },
          {
            activityId: 2,
            user: { nickName: 'lulu', profileImage: '룰루' },
            content: '댓글 2',
          },
        ],
      },
      {
        id: 3,
        user: { nickName: 'chacha', profileImage: '../chacha1.jpg' },
        date: 'Mar 16, 2020',
        dateTime: '2020-03-16',
        activityInfo: {
          id: 3,
          streakId: 3,
          streak: {
            categoryMain: '운동',
            categoryMiddle: '클라이밍',
            streakTag: ['#빨주노초파남보', '#영!차-'],
            streakName: '산양은 아니고 염소정도',
          },
          category: '클라이밍',
          startTime: '2023-08-10 11:00:00',
          endTime: '2023-08-11 12:00:00',
          color: 'blue',
        },
        likeCount: 5,
        commentCount: 15,
        content:
          '오늘은 컴포넌트를 만들어볼거에요 꺄륵꺄륵 \n 오늘 하나는 만들어 놔야지. \n 타입스크립트도 조금 적용 제대로 해서..',
        imageList: [
          '../chacha1.jpg',
          '../chacha1.jpg',
          '../chacha1.jpg',
          '../chacha1.jpg',
        ],
        encourageMessageList: [
          {
            activityId: 3,
            user: { nickName: 'coco', profileImage: '코코' },
            content: '댓글 1',
          },
          {
            activityId: 3,
            user: { nickName: 'lulu', profileImage: '룰루' },
            content: '댓글 2',
          },
        ],
        commentList: [
          {
            activityId: 2,
            user: { nickName: '차차아버님', profileImage: '코코' },
            content: '댓글 1',
          },
          {
            activityId: 3,
            user: { nickName: 'lulu', profileImage: '룰루' },
            content: '댓글 2',
          },
        ],
      },
    ]);
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
    <div
      className={
        isStoryOpened
          ? 'relative overflow-hidden flex-grow'
          : 'relative overflow-auto flex-grow'
      }
    >
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
            {articleList.map(article => (
              <div key={article.id}>
                <ArticleCard
                  article={article}
                  setArticleList={setArticleList}
                  index={article.id}
                ></ArticleCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeedLoadingWave target={target} />
    </div>
  );
};

export default FeedMain;
