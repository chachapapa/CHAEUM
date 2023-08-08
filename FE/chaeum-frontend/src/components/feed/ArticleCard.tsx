import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import ColorContainer from '../common/ColorContainer';
import Dropdown from '../common/Dropdown';
import ChatMessage from '../chat/ChatMessage';
import EncourageMessageCarousel from './EncourageMessageCarousel';
import EncourageMessageDetail from './EncourageMessageDetail';
import CommentList from './CommentList';
import ActiveInformation from '../main/ActiveInformation';
import ChatPreview from '../chat/ChatPreview';
import { Article, ColorForSelection } from '../Types';
import LoadingPage from '../common/LoadingPage';
import { isConstructorDeclaration } from 'typescript';
import { Avatar } from '@material-tailwind/react';

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
      { user: { nickName: 'coco', profileImage: '코코' }, content: '응원글 1' },
      { user: { nickName: 'lulu', profileImage: '룰루' }, content: '응원글 2' },
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

  const [isPlusButtonClicked, setIsPlusButtonClicked] =
    useState<boolean>(false);
  const [detailedArticle, setDetailedArticle] = useState<boolean>(false);
  const [focusedArticle, setFocusedArticle] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  //로딩스크린 페이드아웃을 만들어보자...
  //페이지 로드가 끝나면
  //isFadingOut true로 바꿔주기
  //isloading 값은 false로 바꾸기
  //isFadingOut 이 true인 동안 애니메이션
  //이후 다시 setTimeout으로 false 로 변환
  //최종적으로 isLoading과 isFadingOut이 둘다 false가 되면
  //페이지 이동.

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsFadingOut(true);
  //     setIsLoading(false);
  //     console.log('애니메이션시작');
  //   }, 5000);
  // }, []);

  // useEffect(() => {
  //   if (isFadingOut) {
  //     setTimeout(() => {
  //       setIsFadingOut(false);
  //       console.log('화면전환');
  //     }, 700);
  //   }
  // }, [isFadingOut]);

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
    <div className="bg-gray-100 mt-3">
      {!isLoading && !isFadingOut ? (
        <div className="max-w-7xl">
          <div className="w-full">
            {exampleList.map(post => (
              <article
                key={post.id}
                className="flex p-3 w-full flex-col items-start justify-between mb-3 bg-white"
              >
                <div className='flex justify-between w-full'>
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
                {isPlusButtonClicked && focusedArticle === post.id? (
                  <EncourageMessageDetail
                    onPlusButtonClicked={() => onPlusButtonClicked(post.id)}
                    articleId={post.id}
                  />
                ) : (
                  <EncourageMessageCarousel
                    onPlusButtonClicked={() => onPlusButtonClicked(post.id)}
                    articleId={post.id}
                  />
                )}
                <CommentInput />
                {detailedArticle && focusedArticle === post.id ? (
                  <div className="flex flex-col justify-start">
                    <span onClick={() => onCloseButtonClicked(post.id)}>
                      닫기
                    </span>
                    <CommentList />
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
      ) : (
        <LoadingPage isFadingOut={isFadingOut} />
      )}
    </div>
  );
};

export default ArticleCard;
