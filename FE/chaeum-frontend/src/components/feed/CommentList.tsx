import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { Comment } from '../Types';
import axios from 'axios';
import { useAppSelector } from '../../hooks/reduxHooks';

type Props = {
  commentList: Comment[];
  setCommentList?: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const COMMENT_URL =
  'http://i9a810.p.ssafy.io:8080/api/sns/comment';
const AccessToken = localStorage.getItem('access_token');

const CommentList = ({ commentList, setCommentList }: Props) => {
  const fixedNickname = useAppSelector(state => state.userStateSetter.userStateSetter.nickname);

  const onCommentDeleteButtonClick = (
    replyId: number | undefined,
    index: number,
    activityId : number | undefined,
  ) => {
    axios
      .patch(
        `${COMMENT_URL}`,
        { replyId: replyId, activityId : activityId },
        { headers: { Authorization: `Bearer ${AccessToken}`, 'Content-Type': 'application/json' } }
      )
      .then(res => {
        console.log(res);
        if (res && setCommentList) {
          setCommentList(prev => prev.splice(index,1));
        } else {
          console.log('댓글 삭제 실패');
        }
      });
  };

  return (
    <div className=" w-full p-1 pl-2 my-3">
      {commentList.map((comment, index) => (
        <div className="w-full h-10 mb-2" key={index}>
          <div className="flex h-full justify-between items-center ">
            <div className="flex h-full items-center">
              <Avatar
                src={comment.profileUrl}
                alt="avatar"
                size="sm"
                className="mr-2"
              />
              <div className="text-center self-center">
                <Typography
                  variant="lead"
                  color="text-chaeum-gray-900"
                  className="flex flex-col opacity-80 text-sm"
                >
                  <span className="whitespace-nowrap font-semibold text-xs mr-2 text-start">
                    {comment.nickname}
                  </span>
                  <span className='text-start'>{comment.content}</span>
                </Typography>
              </div>
            </div>
            {fixedNickname === comment.nickname ? (
              <i
                className="fa-solid fa-trash"
                onClick={() =>
                  onCommentDeleteButtonClick(comment.replyId, index, comment.activityId)
                }
              ></i>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
