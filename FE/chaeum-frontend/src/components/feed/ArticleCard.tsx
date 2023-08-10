import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import EncourageMessageCarousel from './EncourageMessageCarousel';
import EncourageMessageDetail from './EncourageMessageDetail';
import CommentList from './CommentList';
import { Article, Comment } from '../Types';
import LoadingPage from '../common/LoadingPage';

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
      { postId : 1, user: { nickName: '차차아버님', profileImage: '코코' }, content: '응원글 1' },
      { postId : 1, user: { nickName: 'lulu', profileImage: '룰루' }, content: '응원글 2' },
    ],
    commentList: [
      { postId : 1, user: { nickName: '차차아버님', profileImage: '코코' }, content: '댓글 1' },
      { postId : 1, user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
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
      { postId : 2, user: { nickName: 'coco', profileImage: '코코' }, content: '댓글 1' },
      { postId : 2, user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
    commentList: [
      { postId : 2, user: { nickName: '차차아버님', profileImage: '코코' }, content: '댓글 1' },
      { postId : 2, user: { nickName: 'lulu', profileImage: '룰루' }, content: '댓글 2' },
    ],
  };

  const exampleList = [example1, example2];

  const [isPlusButtonClicked, setIsPlusButtonClicked] =
    useState<boolean>(false);
  const [detailedArticle, setDetailedArticle] = useState<boolean>(false);
  const [focusedArticle, setFocusedArticle] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
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

                <div className="my-5 flex flex-row overflow-auto snap-x">
                  {post.imageList.map((image, key) => (
                    <img
                      src={image}
                      key={key}
                      alt=""
                      className={
                        detailedArticle && focusedArticle === post.id
                          ? 'flex-none mr-2 h-[330px] w-[330px] rounded-lg snap-center transition-all'
                          : 'flex-none mr-2 h-[150px] w-[150px] rounded-lg snap-center transition-all'
                      }
                    />
                  ))}
                </div>

                {/* 응원글 미리보기 / 상세 */}
                {isPlusButtonClicked && focusedArticle === post.id ? (
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
                <CommentInput postId={post.id} setCommentList={setCommentList}/>
                {detailedArticle && focusedArticle === post.id ? (
                  <div className="flex flex-col items-start w-full">
                    <span onClick={() => onCloseButtonClicked(post.id)}>
                      닫기
                    </span>
                    <CommentList commentList={post.commentList} setCommentList={setCommentList}/>
                  </div>
                ) : (
                  <span onClick={() => onMoreCommentClicked(post.id)} className='text-sm'>
                    댓글 상세보기
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
