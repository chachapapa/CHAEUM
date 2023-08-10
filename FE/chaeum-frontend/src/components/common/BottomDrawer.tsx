import { useDispatch } from 'react-redux';
import React, { ComponentProps } from 'react';
import { closeDrawer } from '../../features/states/states';
import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import { useAppSelector } from '../../hooks/reduxHooks';
import TextButton from './TextButton';

type Props = {
  title: string; // 상단 제목
  content: string; // 내용
  button1: string; // 첫번째 버튼
  button2: string; // 두번째 버튼
  openChk: boolean;
};

export const BottomDrawer = (props: Props) => {
  const dispatch = useDispatch();

  const overlayProps = {
    className: 'w-full h-full fixed',
  };
  return (
    <>
      <Drawer
        overlayProps={overlayProps}
        placement="bottom"
        open={useAppSelector(state => state.stateSetter.isDrawerOpen)}
        onClose={() => dispatch(closeDrawer())}
        className={
          props.openChk
            ? 'm-center z-[9997] p-4 rounded-t-lg fixed flex flex-col justify-between !max-w-[46.15vh] !inset-x-0 '
            : 'm-center z-[9997] p-4 rounded-t-lg fixed flex flex-col justify-between !max-w-[46.15vh] !inset-x-0 translate-x-0 translate-y-[300px] translate-z-0 '
        }
      >
        <div className="mb-6 grid grid-cols-3 items-center justify-between grid-rows-1">
          <div></div>
          <span className="text-lg justify-center">{props.title}</span>
          <IconButton
            className="justify-self-end"
            variant="text"
            color="blue-gray"
            onClick={() => dispatch(closeDrawer())}
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
        <Typography variant="h6" color="blue-gray">
          {props.content}
        </Typography>
        <div>
          <TextButton
            type="warning"
            size="medium"
            label={props.button1}
            callback={() => dispatch(closeDrawer())}
            className="my-1"
          ></TextButton>
          <TextButton
            type="gray"
            size="medium"
            label={props.button2}
            callback={() => dispatch(closeDrawer())}
            className="my-1"
          ></TextButton>
        </div>
      </Drawer>
    </>
  );
};
