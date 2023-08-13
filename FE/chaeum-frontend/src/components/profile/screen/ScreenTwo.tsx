import React, { useState } from 'react';
import FeedPage from '../../../views/FeedPage';
import { Article, ColorForSelection } from '../../Types';
import EncourageMessageDetail from '../../feed/EncourageMessageDetail';
import EncourageMessageCarousel from '../../feed/EncourageMessageCarousel';
import CommentInput from '../../feed/CommentInput';
import CommentList from '../../feed/CommentList';
import {Comment} from '../../Types';

const ScreenTwo = () => {
  const example1: Article = {
    id: 1,
    user: { nickName: 'chacha', profileImage: '../chacha2.png' },
    date: 'Mar 16, 2020',
    dateTime: '2020-03-16',
    activityInfo: {id: 2, streakId: 2,  streak :{categoryMain : '운동', categoryMiddle: '클라이밍', streakTag: ['#빨주노초파남보', '#영!차-'],  streakName: '산양은 아니고 염소정도'}, category: '클라이밍', startTime: '2023-08-10 11:00:00', endTime : '2023-08-11 12:00:00', color: 'red' },
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
      { activityId : 1, replyId: 1, user: { nickName: 'coco', profileImage: '코코' }, content: '응원글 1' },
      { activityId : 1, replyId: 2, user: { nickName: 'lulu', profileImage: '룰루' }, content: '응원글 2' },
    ],
    commentList: [
      { activityId : 1, replyId: 3, user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { activityId : 1, replyId: 4, user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
  };

  const example2: Article = {
    id: 2,
    user: { nickName: 'chacha', profileImage: '../chacha1.jpg' },
    date: 'Mar 16, 2020',
    dateTime: '2020-03-16',
    activityInfo: { id: 1, streakId: 1, streak : {categoryMain : '운동', categoryMiddle: '클라이밍', streakTag: ['#빨주노초파남보', '#영!차-'],  streakName: '산양은 아니고 염소정도'}, category: '클라이밍', startTime: '2023-08-10 11:00:00', endTime : '2023-08-11 12:00:00', color: 'blue' },
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
      { activityId : 2, replyId: 3, user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { activityId : 2, replyId: 4, user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
    commentList: [
      { activityId : 2, replyId: 5, user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { activityId : 2, replyId: 6, user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
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



  return (
    <div className="h-96 overflow-y-auto">
      <div>최신순으로 내가 작성한 게시글을 보여줍니다.</div>
      <div>마이페이지를 누를때마다 서버에서 내 게시글을 가져옵니다.</div>
      <div>ProfilePage에서 변수로 가지고 있고, </div>
      <div>ButtonApp에서 Props로 받아옵니다.</div>
      <div>게시글이 없을때의 예외처리도 생각합니다.</div>

      <div className="max-w-7xl">
        <div className="w-full">
          {exampleList.map(post => (
            <article
              key={post.id}
              className="flex p-3 w-full flex-col items-start justify-between mb-3 bg-white"
            >
              <div className="flex justify-between w-full">
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
                      {/* <p className="text-white text-left">
                        {post.activityInfo.time}시간
                      </p> */}
                    </div>
                  </div>
                </div>

                <div>
                  <time
                    dateTime={post.dateTime}
                    className="text-chaeum-gray-900"
                  >
                    {post.date}
                  </time>

                  <div className="text-right text-chaeum-gray-900">
                    <i className="fa-regular fa-heart mr-0.5 " />
                    {post.likeCount}
                    <i className="fa-regular fa-comment ml-2 mr-0.5" />
                    {post.commentCount}
                  </div>
                </div>
              </div>
              <div className="group relative">
                <p className="mt-5 line-clamp-3 text-sm text-left leading-6 text-chaeum-gray-900 whitespace-pre-line">
                  {post.content}
                </p>
              </div>
              {/* 이미지 미리보기 / 상세 */}
              {detailedArticle && focusedArticle === post.id ? (
                <div className="my-5 flex flex-row overflow-auto snap-x">
                  {post.imageList.map((image, key) => (
                    <img
                      src={image}
                      key={key}
                      alt=""
                      className="flex-none mr-2 h-[330px] w-[330px] rounded-lg snap-center"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5 flex flex-row overflow-auto mb-5">
                  {post.imageList.map((image, key) => (
                    <img
                      src={image}
                      key={key}
                      alt=""
                      className="flex-none mr-2 h-[150px] w-[150px] rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* 응원글 미리보기 / 상세 */}
              {isPlusButtonClicked && focusedArticle === post.id ? (
                <EncourageMessageDetail
                  onPlusButtonClicked={() => onPlusButtonClicked(post.id)}
                  encourageMessageList={post.encourageMessageList}
                />
              ) : (
                <EncourageMessageCarousel
                  onPlusButtonClicked={() => onPlusButtonClicked(post.id)}
                  encourageMessageList={post.encourageMessageList}
                />
              )}
              {/* <CommentInput /> */}
              {detailedArticle && focusedArticle === post.id ? (
                <div className="flex flex-col justify-start">
                  <span onClick={() => onCloseButtonClicked(post.id)}>
                    닫기
                  </span>
                  <CommentList commentList={commentList} setCommentList={setCommentList}/>
                </div>
              ) : (
                <span onClick={() => onMoreCommentClicked(post.id)}>
                  게시글 상세보기
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenTwo;
