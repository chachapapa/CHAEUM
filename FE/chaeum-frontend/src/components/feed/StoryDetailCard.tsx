/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar } from '@material-tailwind/react';
import { ChevronDownIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Article, ColorForSelection, Comment, Story } from '../Types';
import InputTag from '../common/InputTag';
import CustomIconButton from '../common/CustomIconButton';
import CommentInputBox from '../common/CommentInputBox';
import CommentInput from './CommentInput';
import StoryActivityInfoCard from './StoryActivityInfoCard';
import axios from 'axios';

type User = {
  nickName: string;
  profileImage: string;
};

type Props = {
  story: Story;
  closeStoryDetail: () => void;
};

const ENCOURAGE_MESSAGE_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/cheering';
const AccessToken = localStorage.getItem('access_token');

const StoryDetailCard = ({ story, closeStoryDetail }: Props) => {
  const [encourageMessageList, setEncourageMessageList] = useState<Comment[]>(
    []
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);


  useEffect(() => {
    //각 스토리당 좋아요 여부 가져오기.
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

  useEffect(() => {
    // axios
    //   .get(`${ENCOURAGE_MESSAGE_URL}`,{
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //     params: { activityId: story.activityId },
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res) {
    //       setEncourageMessageList(prevList => [...prevList, res.data]);
    //     } else {
    //       console.log('응원글 가져오기 실패');
    //     }
    //   });
  });


  




  return (
    <Card className="flex pb-3 flex-col items-center justify-between bg-white w-11/12">
      <StoryActivityInfoCard
        color={story.color}
        story={story}
        closeStoryDetail={closeStoryDetail}
      />
      <div className="w-full px-3">
        <CommentInput
          activityId={story.activityId}
          inputPlaceholder="응원글 입력..."
          commentOrEncourageMessage="encourageMessage"
          isLiked = {isLiked}
          setIsLiked={setIsLiked}
        />

        {/* 댓글 목록 */}
        <div className="p-1 pl-2 mt-3 w-full">
          {encourageMessageList.map(encourageMessage => (
            <div
              className="relative w-full h-10 mb-1"
              key={encourageMessage.replyId}
            >
              <div className="absolute h-full w-full grid justify-items-start items-center ">
                <div className="flex h-full">
                  <Avatar
                    src={encourageMessage.user.profileImage}
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
                        {encourageMessage.user.nickName}
                      </span>
                      <span>{encourageMessage.content}</span>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StoryDetailCard;
