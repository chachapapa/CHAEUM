import React, { useEffect, useState } from 'react';
import FeedPage from '../../../views/FeedPage';
import { Article, ColorForSelection } from '../../Types';
import EncourageMessageDetail from '../../feed/EncourageMessageDetail';
import EncourageMessageCarousel from '../../feed/EncourageMessageCarousel';
import CommentInput from '../../feed/CommentInput';
import CommentList from '../../feed/CommentList';
import { Comment } from '../../Types';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ArticleCard from '../../feed/ArticleCard';

const USER_ARTICLE_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/sns';
const AccessToken = localStorage.getItem('access_token');

const ScreenTwo = () => {
  const example1: Article = {
    id: 1,
    user: { nickName: 'chacha', profileImage: '../chacha2.png' },
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
      color: 'red',
    },
    likeCount: 5,
    commentCount: 15,
    content: '오늘은 컴포넌트를 만들어볼거에요 꺄륵',
    imageList: [
      '../chacha1.jpg',
      '../chacha1.jpg',
      '../chacha1.jpg',
      '../chacha1.jpg',
    ],
    encourageMessageList: [
      {
        activityId: 1,
        replyId: 1,
        user: { nickName: 'coco', profileImage: '코코' },
        content: '응원글 1',
      },
      {
        activityId: 1,
        replyId: 2,
        user: { nickName: 'lulu', profileImage: '룰루' },
        content: '응원글 2',
      },
    ],
    commentList: [
      {
        activityId: 1,
        replyId: 3,
        user: { nickName: 'coco', profileImage: '코코' },
        content: '댓글 1',
      },
      {
        activityId: 1,
        replyId: 4,
        user: { nickName: 'lulu', profileImage: '룰루' },
        content: '댓글 2',
      },
    ],
  };

  const example2: Article = {
    id: 2,
    user: { nickName: 'chacha', profileImage: '../chacha1.jpg' },
    date: 'Mar 16, 2020',
    dateTime: '2020-03-16',
    activityInfo: {
      id: 1,
      streakId: 1,
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
        activityId: 2,
        replyId: 3,
        user: { nickName: 'coco', profileImage: '코코' },
        content: '댓글 1',
      },
      {
        activityId: 2,
        replyId: 4,
        user: { nickName: 'lulu', profileImage: '룰루' },
        content: '댓글 2',
      },
    ],
    commentList: [
      {
        activityId: 2,
        replyId: 5,
        user: { nickName: 'coco', profileImage: '코코' },
        content: '댓글 1',
      },
      {
        activityId: 2,
        replyId: 6,
        user: { nickName: 'lulu', profileImage: '룰루' },
        content: '댓글 2',
      },
    ],
  };

  const arr: ColorForSelection[] = [
    { color: 'bg-slate-400', hoverColor: 'hover:bg-slate-500' },
    { color: 'bg-red-400', hoverColor: 'hover:bg-red-500' },
    { color: 'bg-orange-400', hoverColor: 'hover:bg-orange-500' },
    { color: 'bg-amber-400', hoverColor: 'hover:bg-amber-500' },
    { color: 'bg-yellow-400', hoverColor: 'hover:bg-yellow-500' },
    { color: 'bg-lime-400', hoverColor: 'hover:bg-lime-500' },
    { color: 'bg-green-400', hoverColor: 'hover:bg-green-500' },
    { color: 'bg-emerald-400', hoverColor: 'hover:bg-emerald-500' },
    { color: 'bg-teal-400', hoverColor: 'hover:bg-teal-500' },
    { color: 'bg-chaeum-blue-400', hoverColor: 'hover:bg-chaeum-blue-500' },
    { color: 'bg-cyan-400', hoverColor: 'hover:bg-cyan-500' },
    { color: 'bg-sky-400', hoverColor: 'hover:bg-sky-500' },
    { color: 'bg-blue-400', hoverColor: 'hover:bg-blue-500' },
    { color: 'bg-indigo-400', hoverColor: 'hover:bg-indigo-500' },
    { color: 'bg-violet-400', hoverColor: 'hover:bg-violet-500' },
    { color: 'bg-purple-400', hoverColor: 'hover:bg-purple-500' },
    { color: 'bg-fuchsia-400', hoverColor: 'hover:bg-fuchsia-500' },
    { color: 'bg-pink-400', hoverColor: 'hover:bg-pink-500' },
    { color: 'bg-rose-400', hoverColor: 'hover:bg-rose-500' },
  ];
  const exampleList = [example1, example2];

  const [isPlusButtonClicked, setIsPlusButtonClicked] =
    useState<boolean>(false);
  const [detailedArticle, setDetailedArticle] = useState<boolean>(false);
  const [focusedArticle, setFocusedArticle] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [articleList, setArticleList] = useState<Article[]>([]);

  const onPlusButtonClicked = (id: number) => {
    setIsPlusButtonClicked(!isPlusButtonClicked);
    setFocusedArticle(id);
  };

  const onMoreCommentClicked = (id: number) => {
    setDetailedArticle(true);
    setFocusedArticle(id);
  };

  const onCloseButtonClicked = (id: number) => {
    setDetailedArticle(false);
    setFocusedArticle(id);
  };

  const location = useLocation();
  const userNickName = location.pathname.split('/')[1];

  useEffect(() => {
    // axios
    //   .get(`${USER_ARTICLE_LIST_URL}`, {
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //     params : {nickName : userNickName}
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
            content: '11수 하면 그만이야~~~',
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

  return (
    <div>
      {/* <div>최신순으로 내가 작성한 게시글을 보여줍니다.</div>
      <div>마이페이지를 누를때마다 서버에서 내 게시글을 가져옵니다.</div>
      <div>ProfilePage에서 변수로 가지고 있고, </div>
      <div>ButtonApp에서 Props로 받아옵니다.</div>
      <div>게시글이 없을때의 예외처리도 생각합니다.</div> */}

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
  );
};

export default ScreenTwo;
