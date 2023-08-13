import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import EncourageMessageCarousel from './EncourageMessageCarousel';
import EncourageMessageDetail from './EncourageMessageDetail';
import CommentList from './CommentList';
import { Article, Comment } from '../Types';
import LoadingPage from '../common/LoadingPage';
import { IconButton } from '@material-tailwind/react';
import { useAppSelector } from '../../hooks/reduxHooks';
import axios from 'axios';
import { WaveBottomColor } from '../theme/StreakTheme';

type Props = {
  article: Article;
  key: number;
  setArticleList: React.Dispatch<React.SetStateAction<Article[]>>;
};

const ARTICLE_DELETE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/delete';
const LIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/heart';
const AccessToken = localStorage.getItem('access_token');

const ArticleCard = ({ article, key, setArticleList }: Props) => {
  const [isPlusButtonClicked, setIsPlusButtonClicked] =
    useState<boolean>(false);
  const [detailedArticle, setDetailedArticle] = useState<boolean>(false);
  const [focusedArticle, setFocusedArticle] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const fixedNickname = useAppSelector(state => state.stateSetter.nickname);
  const tagBackgroundColor = WaveBottomColor({
    color: article.activityInfo.color,
    weight3: 'w3',
  });
  const [isLiked, setsIsLiked] = useState<boolean>(false);

  useEffect(() => {
    //각 게시물당 좋아요 여부 가져오기.
    // axios
    //   .get(`${LIKE_URL}`, {
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //     params: { activityId: article.activityInfo.id },
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res.data) {
    //       setsIsLiked(true);
    //     } else {
    //       setsIsLiked(false);
    //     }
    //   });
  });

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

  const onArticleDeleteClicked = (id: number, index: number) => {
    axios
      .put(`${ARTICLE_DELETE_URL}`, JSON.stringify({ article_id: id }), {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(res => {
        console.log(res);
        if (res) {
          setArticleList(prevList => prevList.splice(index, 1));
        } else {
          console.log('댓글 삭제 실패');
        }
      });
  };

  return (
    // <div className="bg-gray-100 mt-3">
    //   {!isLoading && !isFadingOut ? (
    //     <div className="max-w-7xl">
    //       <div className="w-full">
    //         {exampleList.map(post => (
    <article
      key={article.id}
      className="flex p-3 w-full flex-col items-start justify-between mb-3 bg-white"
    >
      <div className="flex justify-between w-full">
        <div className="relative flex items-center gap-x-4">
          <img
            src={article.user.profileImage}
            alt=""
            className="h-16 w-16 rounded-full bg-gray-50"
          />
          <div className="text-lg leading-6">
            <p className="text-chaeum-gray-900 text-left">
              {article.user.nickName}
            </p>
            <div
              className={`text-sm ${tagBackgroundColor} rounded-md py-0.5 px-1 w-fit`}
            >
              <p className="text-white text-left">
                #{article.activityInfo.category}
              </p>
              {/* <p className="text-white text-left">
                          {article.activityInfo.time}시간
                        </p> */}
            </div>
          </div>
        </div>

        <div>
          <time dateTime={article.dateTime} className="text-chaeum-gray-900">
            {article.date}
          </time>

          <div className="text-right text-chaeum-gray-900">
            <i className="fa-regular fa-heart mr-0.5 " />
            {article.likeCount}
            <i className="fa-regular fa-comment ml-2 mr-0.5" />
            {article.commentCount}
          </div>
          {fixedNickname === article.user.nickName ? (
            <div className="flex justify-end">
              <IconButton
                variant="text"
                className="w-8 h-8 rounded-full hover:bg-chaeum-blue-500/10"
                onClick={() => onArticleDeleteClicked(article.id, key)}
              >
                <svg
                  className="fill-chaeum-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  height="2em"
                  viewBox="20 20 576 512"
                >
                  <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
                </svg>
              </IconButton>
            </div>
          ) : null}
        </div>
      </div>
      <div className="group relative">
        <p className="mt-5 line-clamp-3 text-sm text-left leading-6 text-chaeum-gray-900 whitespace-pre-line">
          {article.content}
        </p>
      </div>
      {/* 이미지 미리보기 / 상세 */}

      <div className="my-5 flex flex-row overflow-auto snap-x">
        {article.imageList.map((image, key) => (
          <img
            src={image}
            key={key}
            alt=""
            className={
              detailedArticle && focusedArticle === article.id
                ? 'flex-none mr-2 h-[330px] w-[330px] rounded-lg snap-center transition-all'
                : 'flex-none mr-2 h-[150px] w-[150px] rounded-lg snap-center transition-all'
            }
          />
        ))}
      </div>

      {/* 응원글 미리보기 / 상세 */}
      {isPlusButtonClicked && focusedArticle === article.id ? (
        <EncourageMessageDetail
          onPlusButtonClicked={() => onPlusButtonClicked(article.id)}
          encourageMessageList={article.encourageMessageList}
        />
      ) : (
        <EncourageMessageCarousel
          onPlusButtonClicked={() => onPlusButtonClicked(article.id)}
          encourageMessageList={article.encourageMessageList}
        />
      )}
      <CommentInput
        activityId={article.activityInfo.id}
        setCommentList={setCommentList}
        inputPlaceholder="댓글 입력..."
        commentOrEncourageMessage="comment"
        isLiked={isLiked}
        setIsLiked={setsIsLiked}
      />
      {detailedArticle && focusedArticle === article.id ? (
        <div className="flex flex-col items-start w-full">
          <span
            onClick={() => onCloseButtonClicked(article.id)}
            className="text-sm"
          >
            닫기
          </span>
          <CommentList
            commentList={article.commentList}
            setCommentList={setCommentList}
          />
        </div>
      ) : (
        <span
          onClick={() => onMoreCommentClicked(article.id)}
          className="text-sm"
        >
          댓글 더보기
        </span>
      )}
    </article>
    //         ))}
    //       </div>
    //     </div>
    //   ) : (
    //     <LoadingPage isFadingOut={isFadingOut} />
    //   )}
    // </div>
  );
};

export default ArticleCard;
