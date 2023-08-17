import { IconButton, input } from '@material-tailwind/react';
import React, { useState } from 'react';
import CommentInputBox from '../common/CommentInputBox';
import axios from 'axios';
import { Comment } from '../Types';
import { useAppSelector } from '../../hooks/reduxHooks';
import { stat } from 'fs';

type Props = {
  inputPlaceholder: string;
  activityId?: number;
  postId?: number;
  setCommentList?: React.Dispatch<React.SetStateAction<Comment[]>>;
  setCommentUpdateCount? : React.Dispatch<React.SetStateAction<number>>;
  setEncourageMessageList?: React.Dispatch<React.SetStateAction<Comment[]>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  commentOrEncourageMessage: 'comment' | 'encourageMessage';
};

const COMMENT_REGIST_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/comment';
const LIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/like-post';
const ACTIVITY_LIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/like-activity';
const DISLIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/like-post/cancel';
const ACTIVITY_DISLIKE_URL =
  'http://i9a810.p.ssafy.io:8080/api/sns/like-activity/cancel';
const ENCOURAGE_MESSAGE_REGIST_URL =
  'http://i9a810.p.ssafy.io:8080/api/sns/cheering';
const AccessToken = localStorage.getItem('access_token');

const CommentInput = ({
  activityId,
  postId,
  setCommentList,
  setCommentUpdateCount,
  setEncourageMessageList,
  inputPlaceholder,
  commentOrEncourageMessage,
  isLiked,
  setIsLiked,
}: Props) => {
  const [currentComment, setCurrentComment] = useState<string>('');
  const myNickname = useAppSelector(state => state.userStateSetter.userStateSetter.nickname);
  const myProfileImageUrl = useAppSelector(
    state => state.stateSetter.myProfileImageUrl
  );
  const onLikeButtonClicked = () => {
    if (commentOrEncourageMessage === 'comment') {
      axios
        .patch(
          `${LIKE_URL}`,
          { postId: postId },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          if (res) setIsLiked(prev => !prev);
        });
    } else if (commentOrEncourageMessage === 'encourageMessage') {
      axios
        .patch(
          `${ACTIVITY_LIKE_URL}`,
          { activityId: activityId },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          if (res) setIsLiked(prev => !prev);
        });
    }
  };

  const onDislikeButtonClicked = () => {
    if (commentOrEncourageMessage === 'comment') {
      axios
        .patch(
          `${DISLIKE_URL}`,
          { postId: postId },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          if (res) setIsLiked(prev => !prev);
        });
    } else if (commentOrEncourageMessage === 'encourageMessage') {
      axios
        .patch(
          `${ACTIVITY_DISLIKE_URL}`,
          { activityId: activityId },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          if (res) setIsLiked(prev => !prev);
        });
    }
  };

  const registComment = () => {
    console.log(currentComment);
    if (commentOrEncourageMessage === 'comment') {
      axios
        .post(
          `${COMMENT_REGIST_URL}`,
          { activityId: activityId, comment: currentComment },
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          if (res && setCommentList) {
            console.log('이프문 들어옴');
            // setCommentList(prev => [
            //   ...prev,
            //   {
            //     nickname: myNickname,
            //     profileUrl: myProfileImageUrl,
            //     content: currentComment,
            //   },
            // ]);
            if(setCommentUpdateCount) setCommentUpdateCount(prev => prev+1);
            setCommentList(prev =>
              prev.splice(prev.length, 0, {
                nickname: myNickname,
                profileUrl: myProfileImageUrl,
                content: currentComment,
              })
            );
          } else {
            console.log('댓글 등록 실패');
          }
        });
    } else if (commentOrEncourageMessage === 'encourageMessage') {
      axios
        .post(
          `${ENCOURAGE_MESSAGE_REGIST_URL}`,
          JSON.stringify({ activityId: activityId, comment: currentComment }),
          {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          
          if (res && setEncourageMessageList) {
            setEncourageMessageList(prev =>
              prev.splice(prev.length, 0, {
                nickname: myNickname,
                profileUrl: myProfileImageUrl,
                content: currentComment,
              })
            );
          } else {
            console.log('응원글 등록 실패');
          }
        });
    }
  };

  return (
    <div className="flex w-full mb-2">
      <CommentInputBox
        inputPlaceholder={inputPlaceholder}
        setCurrentComment={setCurrentComment}
      />
      <div className="flex">
        <IconButton
          variant="text"
          className="rounded-full hover:bg-chaeum-blue-500/10"
          onClick={registComment}
        >
          <svg
            className="fill-transparent stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            height="1.9em"
            strokeWidth="50px"
            viewBox="-30 0 580 512"
          >
            <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
          </svg>
        </IconButton>
        <IconButton
          variant="text"
          className="rounded-full hover:bg-chaeum-blue-500/10"
          onClick={isLiked ? onDislikeButtonClicked : onLikeButtonClicked}
        >
          {isLiked ? (
            <svg
              className="fill-chaeum-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 512 512"
            >
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 512 512"
            >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default CommentInput;
