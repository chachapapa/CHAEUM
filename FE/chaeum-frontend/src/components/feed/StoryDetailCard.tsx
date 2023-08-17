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
import CommentList from './CommentList';

type User = {
  nickname: string;
  profileImageUrl: string;
};

type Props = {
  story: Story;
  closeStoryDetail: (e: React.MouseEvent) => void;
};

const ENCOURAGE_MESSAGE_URL =
  'http://i9a810.p.ssafy.io:8080/api/activity/message/cheering';
const LIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/like-activity';
const AccessToken = localStorage.getItem('access_token');

const StoryDetailCard = ({ story, closeStoryDetail }: Props) => {
  const [encourageMessageList, setEncourageMessageList] = useState<Comment[]>(
    []
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  console.log(encourageMessageList);
  useEffect(() => {
    axios
      .get(`${LIKE_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { activityId: story.activityId },
      })
      .then(res => {
        if (res.data) {
          if (res.data.like) setIsLiked(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`${ENCOURAGE_MESSAGE_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { activityId: story.activityId },
      })
      .then(res => {
        console.log(res);
        if (res) {
          setEncourageMessageList(res.data);
        } else {
          console.log('응원글 가져오기 실패');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="flex pb-3 flex-col items-center justify-between bg-white w-11/12">
      <StoryActivityInfoCard
        color={story.streakColor}
        story={story}
        closeStoryDetail={closeStoryDetail}
      />
      <div className="w-full px-3">
        <CommentInput
          activityId={story.activityId}
          inputPlaceholder="응원글 입력..."
          commentOrEncourageMessage="encourageMessage"
          setEncourageMessageList={setEncourageMessageList}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />

        {/* 댓글 목록 */}
        <div className="p-1 pl-2 mt-3 max-h-[300px] overflow-auto">
          {encourageMessageList.map(encourageMessage => (
            <div
              className="relative w-full h-10 mb-1"
              key={encourageMessage.replyId}
            >
              <div className="absolute h-full w-full grid justify-items-start items-center ">
                <div className="flex h-full">
                  <Avatar
                    src={encourageMessage.profileUrl}
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
                        {encourageMessage.nickname}
                      </span>
                      <span className="text-start">
                        {encourageMessage.content}
                      </span>
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
