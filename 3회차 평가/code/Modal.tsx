import React from 'react';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import TextButton from './TextButton';

type Props = {
  title: string; // 상단 제목
  content: string; // 내용
  button1: string; // 첫번째 버튼
  button2: string; // 두번째 버튼
};

const Modal = (props: Props) => {
  const [openBottom, setOpenBottom] = React.useState(false);
  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <Button onClick={openDrawerBottom}>{props.title}</Button>
      </div>
      <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4 w-80"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h3" color="blue-gray">
            {props.title}
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
        <Typography variant="h5" color="blue-gray">
          {props.content}
        </Typography>
        <TextButton
          type="warning"
          size="medium"
          label={props.button1}
        ></TextButton>
        <TextButton
          type="gray"
          size="medium"
          label={props.button2}
        ></TextButton>
      </Drawer>
    </React.Fragment>
  );
};

export default Modal;
