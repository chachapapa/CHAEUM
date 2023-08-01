import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';

type User = {
  nickName: string;
  profileImage: string;
};

type Comment = {
  commentId: number;
  user: User;
  content: string;
};

const CommentList = () => {
  const commentListExample: Comment[] = [
    {
      commentId: 1,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 1',
    },
    {
      commentId: 2,
      user: { nickName: 'lulu', profileImage: '../chacha1.jpg' },
      content: '댓글 2',
    },
    {
      commentId: 3,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 3',
    },
    {
      commentId: 4,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 4',
    },
    {
      commentId: 5,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 5',
    },
    {
      commentId: 6,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 6',
    },
    {
      commentId: 7,
      user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
      content: '댓글 7',
    },
  ];

  return (
    <div className=" w-[360px] p-1 pl-2 my-3">
      {commentListExample.map(comment => (
        <div className="relative w-full h-10 mb-1" key={comment.commentId}>
          <div className="absolute h-full w-full grid justify-items-start items-center ">
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
                  <span className="font-bold mr-2">{comment.user.nickName}</span>
                  <span>{comment.content}</span>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
