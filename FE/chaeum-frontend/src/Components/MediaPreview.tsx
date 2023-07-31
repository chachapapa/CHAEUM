import React from 'react';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import TextButton from './TextButton';

const MediaPreview = () => {
  const [openBottom, setOpenBottom] = React.useState(false);
  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <img
          src="../icon/chatting_menu_icon.png"
          onClick={openDrawerBottom}
          alt="채팅메뉴"
        ></img>
      </div>
      <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4 w-80"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h3" color="blue-gray">
            사진 보내기
          </Typography>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerBottom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <input
          className="block w-60 h-60 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        ></input>
      </Drawer>
    </React.Fragment>
  );
};

export default MediaPreview;
