import { Carousel, Typography, IconButton } from '@material-tailwind/react';
import React from 'react';

type User = {
  nickName: string;
  profileImage: string;
};

type Comment = {
  user: User;
  content: string;
};

const commentList: Comment[] = [
  {
    user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
    content: '댓글 1',
  },
  {
    user: { nickName: 'lulu', profileImage: '../chacha1.jpg' },
    content: '댓글 2',
  },
  {
    user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
    content: '댓글 1',
  },
  {
    user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
    content: '댓글 1',
  },
  {
    user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
    content: '댓글 1',
  },
  {
    user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
    content: '댓글 1',
  },
  {
    user: { nickName: 'coco', profileImage: '../chacha1.jpg' },
    content: '댓글 1',
  },

];

const CommentCarousel = () => {
  return (
    <Carousel
      className="rounded-lg mb-3"
      autoplay
      loop
      
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-1 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-0 bg-white' : 'w-0 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <IconButton
          disabled
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-0 w-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          // onClick={onClickPlus}
          className="!absolute top-2/4 !right-1 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </IconButton>
      )}
    >
      {commentList.map((comment, key) => (
        <div className="relative w-full h-10" key={key}>
          <div className="absolute inset-0 h-full w-full grid justify-items-start items-center bg-gray-100 pl-2">
            <div className="flex">
              <img
                src={comment.user.profileImage}
                alt=""
                className="h-7 w-7 rounded-full bg-gray-50 mr-2"
              />

              <div className="text-center self-center">
                <Typography
                  variant="lead"
                  color="text-chaeum-gray-900"
                  className="opacity-80 text-sm"
                >
                  {comment.user.nickName} {comment.content}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CommentCarousel;