import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { Comment } from '../Types';
import axios from 'axios';
import { useAppSelector } from '../../hooks/reduxHooks';

type Props = {
  commentList: Comment[];
  setCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const COMMENT_DELETE_URL =
  'http://i9a810.p.ssafy.io:8080/api/sns/comment/delete';
const AccessToken = localStorage.getItem('access_token');

const CommentList = ({ commentList, setCommentList }: Props) => {
  const fixedNickname = useAppSelector(state => state.stateSetter.nickname);

  const onCommentDeleteButtonClick = (
    replyId: number | undefined,
    index: number
  ) => {
    axios
      .put(
        `${COMMENT_DELETE_URL}`,
        { replyId: replyId },
        { headers: { Authorization: `Bearer ${AccessToken}` } }
      )
      .then(res => {
        console.log(res);
        if (res) {
          setCommentList(prevList => prevList.splice(index, 1));
        } else {
          console.log('댓글 삭제 실패');
        }
      });
  };

  return (
    <div className=" w-full p-1 pl-2 my-3">
      {commentList.map((comment, index) => (
        <div className="w-full h-10 mb-1" key={index}>
          <div className="flex h-full justify-between items-center ">
            <div className="flex h-full">
              <Avatar
                src={comment.user.profileImage}
                alt="avatar"
                size="sm"
                className="mr-2"
              />

              <div className="text-center self-center">
                <Typography
                  variant="lead"
                  color="text-chaeum-gray-900"
                  className="opacity-80 text-sm"
                >
                  <span className="font-semibold mr-2">
                    {comment.user.nickName}
                  </span>
                  <span>{comment.content}</span>
                </Typography>
              </div>
            </div>
            {fixedNickname === comment.user.nickName ? (
              <i
                className="fa-solid fa-trash"
                onClick={() =>
                  onCommentDeleteButtonClick(comment.replyId, index)
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
