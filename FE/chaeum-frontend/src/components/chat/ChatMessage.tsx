import React from 'react';
import { Avatar } from '@material-tailwind/react';

type User = {
  profileImage: string;
  nickName: string;
};

type ChatMessage = {
  user: User;
  content: string;
  time: string;
};

const ChatMessage = () => {
  const tmpMessage: ChatMessage = {
    user: { profileImage: './chacha1.jpg', nickName: 'chacha' },
    content: '메세지 테스트',
    time: '오후 11:07',
  };

  return (
    <div className="flex">
      <Avatar src={tmpMessage.user.profileImage} alt="avatar" size='sm' />
      <div className="flex w-auto h-9 bg-chaeum-gray-300 text-chaeum-gray-900 rounded-lg mx-2 text-sm self-center items-center px-2">{tmpMessage.content}</div>
      <div className='text-chaeum-gray-900 text-xs self-end'>{tmpMessage.time}</div>
    </div>
  );
};

export default ChatMessage;
