import React from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  Typography,
  IconButton,
  Avatar,
} from '@material-tailwind/react';
import { ChevronDownIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Article, ColorForSelection } from '../Types';
import InputTag from '../common/InputTag';
import CustomIconButton from '../common/CustomIconButton';

type User = {
  nickName: string;
  profileImage: string;
};

type Comment = {
  commentId: number;
  user: User;
  content: string;
};

const StoryDetailCard = () => {
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
  ];

  return (
    <div className="">
      <Card className="flex p-3 max-w-sm flex-col items-center justify-between mb-5 bg-white w-96 h-96">
        <div className="relative flex items-center gap-x-4">
          <img
            src="../chacha1.jpg"
            alt=""
            className="h-16 w-16 rounded-full bg-gray-50"
          />
          <div className="text-lg leading-6">
            <p className="text-chaeum-gray-900 text-left">coco</p>
            <p className="text-black text-left">#클라이밍</p>
            <p className="text-black text-left">#운동</p>
          </div>
        </div>

        {/* 스트릭 넣어야함*/}

        <p className="text-black justify-center text-left text-2xl">02:23:21</p>

        {/* 댓글 인풋 & 작성버튼, 좋아요버튼 */}
        <div className="relative flex items-center gap-x-2">
          <InputTag label="댓글달기"></InputTag>
          <CustomIconButton icon="comment" colorInput="lime"></CustomIconButton>
          <CustomIconButton icon="heart" colorInput="lime"></CustomIconButton>
        </div>

        {/* 댓글 목록 */}
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
                      <span className="font-bold mr-2">
                        {comment.user.nickName}
                      </span>
                      <span>{comment.content}</span>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StoryDetailCard;
