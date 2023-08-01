import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';

type Props = {
  onPlusButtonClicked : (id: number) => void;
  articleId : number;
}



const EncourageMessageDetail = (props:Props) => {
  return (
    <div className="bg-gray-100 rounded-lg w-[360px] p-1 pl-2 mb-3">
      <div className="flex justify-between mb-2">
        <span className="flex items-center text-sm">응원글</span>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          // onClick={props.onPlusButtonClicked(props.articleId)}
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

      <div className="relative w-full h-10">
        <div className="absolute h-full w-full grid justify-items-start items-center bg-gray-100">
          <div className="flex h-full">
            <Avatar
              src="./chacha1.jpg"
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
                닉네임 응원글
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncourageMessageDetail;
