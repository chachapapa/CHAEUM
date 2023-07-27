import React from 'react';
import CommentCarousel from './CommentCarousel';
import CommentInput from './CommentInput';

type User = {
  nickName: string;
  profileImage: string;
};

type Activity = {
  category: string;
  color: string;
  time: number;
};

type Comment = {
  user: User;
  content: string;
};

type Article = {
  id: number;
  user: User;
  date: string;
  dateTime: string;
  activityInfo: Activity;
  likeCount: number;
  commentCount: number;
  content: string;
  imageList: string[];
  encourageMessageList: Comment[];
  commentList: Comment[];
};

const ArticleCard = () => {
  const example1: Article = {
    id: 1,
    user: { nickName: 'chacha', profileImage: '../chacha2.png' },
    date: 'Mar 16, 2020',
    dateTime: '2020-03-16',
    activityInfo: { category: '클라이밍', time: 3, color: 'bg-yellow-300' },
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
      { user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
    commentList: [
      { user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
  };

  const example2: Article = {
    id: 2,
    user: { nickName: 'chacha', profileImage: '../chacha1.jpg' },
    date: 'Mar 16, 2020',
    dateTime: '2020-03-16',
    activityInfo: { category: '클라이밍', time: 3, color: 'bg-blue-300' },
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
      { user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
    commentList: [
      { user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
  };

  const exampleList = [example1, example2];

  const arr: string[] = [
    'bg-blue-400',
    'bg-cyan-400',
    'bg-yellow-400',
    'bg-orange-400',
    'bg-lime-400',
    'bg-teal-400',
    'bg-sky-400',
  ];

  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-max">
          {exampleList.map(post => (
            <article
              key={post.id}
              className="flex p-3 max-w-sm flex-col items-start justify-between mb-5 bg-white"
            >
              <div className="relative flex items-center gap-x-4">
                <img
                  src={post.user.profileImage}
                  alt=""
                  className="h-16 w-16 rounded-full bg-gray-50"
                />
                <div className="text-lg leading-6">
                  <p className="text-chaeum-gray-900 text-left">
                    {post.user.nickName}
                  </p>
                  <div
                    className={`text-sm ${post.activityInfo.color} rounded-md py-0.5 px-1 w-fit`}
                  >
                    <p className="text-white text-left">
                      #{post.activityInfo.category}
                    </p>
                    <p className="text-white text-left">
                      {post.activityInfo.time}시간
                    </p>
                  </div>
                </div>
              </div>
              <div className="place-self-end absolute ">
                <time dateTime={post.dateTime} className="text-chaeum-gray-900">
                  {post.date}
                </time>

                <div className="text-right text-chaeum-gray-900">
                  <i className="fa-regular fa-heart mr-0.5 " />
                  {post.likeCount}
                  <i className="fa-regular fa-comment ml-2 mr-0.5" />
                  {post.commentCount}
                </div>
              </div>

              <div className="group relative">
                <p className="mt-5 line-clamp-3 text-sm text-left leading-6 text-chaeum-gray-900 whitespace-pre-line">
                  {post.content}
                </p>
              </div>
              <div className="mt-5 flex flex-row w-[360px] overflow-auto mb-5">
                {post.imageList.map((image, key) => (
                  <img
                    src={image}
                    key={key}
                    alt=""
                    className="mr-2 h-[150px] w-[150px] rounded-lg"
                  />
                ))}
              </div>
              <CommentCarousel />
              <CommentInput />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
