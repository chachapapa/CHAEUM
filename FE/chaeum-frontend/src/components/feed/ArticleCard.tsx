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
import { useLocation } from 'react-router-dom';

type Props = {
  article: Article;
  index: number;
  setArticleList: React.Dispatch<React.SetStateAction<Article[]>>;
};

const ARTICLE_DELETE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/delete';
const LIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/like-post';
const AccessToken = localStorage.getItem('access_token');

const ArticleCard = ({ article, setArticleList, index }: Props) => {
  const location = useLocation();
  const [isPlusButtonClicked, setIsPlusButtonClicked] =
    useState<boolean>(false);
  const [detailedArticle, setDetailedArticle] = useState<boolean>(false);
  const [focusedArticle, setFocusedArticle] = useState<number>();
  const fixedNickname = useAppSelector(
    state => state.userStateSetter.userStateSetter.nickname
  );
  const tagBackgroundColor = WaveBottomColor({
    color: article.streakColor,
    weight3: 'w3',
  });
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentList, setCommentList] = useState<Comment[]>(
    article.commentList
  );
  const [encourageMessageList, setEncourageMessageList] = useState<Comment[]>(
    article.encourageMessageList
  );

  useEffect(() => {
    //각 게시물당 좋아요 여부 가져오기.
    axios
      .get(`${LIKE_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { postId: article.postId },
      })
      .then(res => {
        if (res.data) {
          setLikeCount(res.data.cnt);
          if (res.data.like) setIsLiked(true);
        }
      });
  });

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
      .patch(
        `${ARTICLE_DELETE_URL}`,
        JSON.stringify({ postId: article.postId }),
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
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
    <article
      key={article.postId}
      className="flex p-3 w-full flex-col items-start justify-between mb-3 bg-white"
    >
      <div className="flex justify-between w-full">
        <div className="relative flex items-center gap-x-4 w-full">
          {location.pathname.includes('profile') ? null : (
            <img
              src={article.profileUrl}
              alt=""
              className="h-16 w-16 rounded-full bg-gray-50"
            />
          )}
          <div className="flex flex-col w-[180px] text-lg leading-6 ">
            {location.pathname.includes('profile') ? null : (
              <p className="text-chaeum-gray-900 text-left">
                {article.nickname}
              </p>
            )}
            {article.tagList ? (
              <div className="flex text-sm py-0.5 px-1 gap-1 flex-wrap">
                {article.tagList.map((tag, index) => (
                  <div
                    className={`${tagBackgroundColor} text-white text-left px-1 py-0.5 whitespace-nowrap rounded-md`}
                    key={index}
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <time
            dateTime={article.postTime}
            className="text-chaeum-gray-900 whitespace-nowrap"
          >
            {article.postTime ? article.postTime.split(' ')[0] : ''}
          </time>

          <div className="text-right text-chaeum-gray-900">
            <i className="fa-regular fa-heart mr-0.5 " />
            {likeCount}
            <i className="fa-regular fa-comment ml-2 mr-0.5" />
            {article.commentList ? article.commentList.length : ''}
          </div>
          {fixedNickname === article.nickname ? (
            <div className="flex justify-end">
              <IconButton
                variant="text"
                className="w-8 h-8 rounded-full hover:bg-chaeum-blue-500/10"
                onClick={() => onArticleDeleteClicked(article.postId, index)}
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
        <p
          className={
            detailedArticle && focusedArticle === article.postId
              ? 'mt-5 text-sm text-left leading-6 text-chaeum-gray-900 whitespace-pre-line'
              : 'mt-5 line-clamp-3 text-sm text-left leading-6 text-chaeum-gray-900 whitespace-pre-line'
          }
        >
          {article.postContent}
        </p>
      </div>
      {/* 이미지 미리보기 / 상세 */}
      {article.imageList && article.imageList.length > 0 ? (
        <div className="my-5 flex flex-row overflow-auto snap-x">
          {article.imageList.map((image, key) => (
            <img
              src={image}
              key={key}
              alt=""
              className={
                detailedArticle && focusedArticle === article.postId
                  ? 'flex-none mr-2 h-[330px] w-[330px] rounded-lg snap-center transition-all'
                  : 'flex-none mr-2 h-[150px] w-[150px] rounded-lg snap-center transition-all'
              }
            />
          ))}
        </div>
      ) : null}

      {/* 응원글 미리보기 / 상세 */}
      {isPlusButtonClicked && focusedArticle === article.postId ? (
        <EncourageMessageDetail
          onPlusButtonClicked={() => onPlusButtonClicked(article.postId)}
          encourageMessageList={article.encourageMessageList}
        />
      ) : article.encourageMessageList !== undefined &&
        article.encourageMessageList.length > 0 ? (
          <EncourageMessageCarousel
            onPlusButtonClicked={() => onPlusButtonClicked(article.postId)}
            encourageMessageList={article.encourageMessageList}
          />
        ) : null}
      <CommentInput
        activityId={article.activityId}
        postId={article.postId}
        setCommentList={setCommentList}
        inputPlaceholder="댓글 입력..."
        commentOrEncourageMessage="comment"
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
      {detailedArticle && focusedArticle === article.postId ? (
        <div className="flex flex-col items-end w-full">
          <span
            onClick={() => onCloseButtonClicked(article.postId)}
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
        <div className="flex flex-col items-end w-full">
          <span
            onClick={() => onMoreCommentClicked(article.postId)}
            className="text-sm text-chaeum-blue-500"
          >
            게시글 상세 보기
          </span>
        </div>
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
