import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { Comment, User } from '../Types';

type Props = {
  onPlusButtonClicked: () => void;
  encourageMessageList: Comment[];
};

const EncourageMessageDetail = (props: Props) => {
  return (
    <div className="bg-gray-100 rounded-lg w-full p-1 pl-2 mb-3">
      <div className="flex justify-between mb-2">
        <span className="flex items-center text-sm">응원글</span>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          onClick={props.onPlusButtonClicked}
          className=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 448 512"
          >
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </IconButton>
      </div>

      <div className="relative w-full">
        {props.encourageMessageList.map((encourageMessage, index) => (
          <div className="h-full w-full grid justify-items-start items-center bg-gray-100 mb-3" key={index}>
            <div className="flex h-full w-full">
              <Avatar
                src={encourageMessage.profileUrl}
                alt="avatar"
                size="sm"
                className="mr-2"
              />

              <div className="text-center self-center w-10/12">
                <Typography
                  variant="lead"
                  color="text-chaeum-gray-900"
                  className="flex flex-col opacity-80 text-sm"
                >
                  <span className="flex whitespace-nowrap font-bold text-xs mr-2 items-center">
                    {encourageMessage.nickname}
                  </span>
                  <span className='text-start items'>{encourageMessage.content}</span>
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncourageMessageDetail;
