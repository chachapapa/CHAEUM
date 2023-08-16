import React from 'react';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../../features/states/states';
import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import { useAppSelector } from '../../hooks/reduxHooks';
import TextButton from './TextButton';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {
  title: string; // 상단 제목
  content?: string; // 내용
  button1: string; // 첫번째 버튼
  button2: string; // 두번째 버튼
  openChk: boolean;
  type?: string; //설정 버튼 클릭시 구분
  logOutButtonClick?: () => void;
  modifyButtonClick?: () => void;
  streakId?: number;
  callback1?(): void;
  callback2?(): void;
};

export const BottomDrawer = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { drawerState } = useAppSelector(state => state.stateSetter);

  const overlayProps = {
    className: 'w-full h-full fixed',
  };

  const onFirstButtonClick = () => {
    if (props.callback1 !== undefined) {
      props.callback1(); // 상위 컴포넌트의 onChange 콜백 호출
    }
    dispatch(closeDrawer());
  };

  const onSecondButtonClick = () => {
    if (props.callback2 !== undefined) {
      props.callback2(); // 상위 컴포넌트의 onChange 콜백 호출
    }
    dispatch(closeDrawer());
  };

  return (
    <>
      <Drawer
        overlayProps={overlayProps}
        placement="bottom"
        open={useAppSelector(
          state => state.stateSetter.drawerState.isDrawerOpen
        )}
        onClose={() => dispatch(closeDrawer())}
        className={
          props.openChk
            ? 'm-center z-[9997] p-4 rounded-t-lg fixed flex flex-col justify-between !max-w-[46.15vh] !inset-x-0 '
            : 'm-center z-[9997] p-4 rounded-t-lg fixed flex flex-col justify-between !max-w-[46.15vh] !inset-x-0 translate-x-0 translate-y-[300px] translate-z-0'
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
        {props.content ? (
          <Typography variant="h6" color="blue-gray">
            {props.content}
          </Typography>
        ) : null}

        {props.type === 'setting' ? (
          <div>
            <TextButton
              type="primary"
              size="medium"
              label={props.button1}
              callback={() => {
                dispatch(closeDrawer());
                if (props.modifyButtonClick !== undefined) {
                  props.modifyButtonClick();
                }
              }}
              className="my-1"
            ></TextButton>
            <TextButton
              type="warning"
              size="medium"
              label={props.button2}
              callback={() => {
                dispatch(closeDrawer());
                if (props.logOutButtonClick !== undefined) {
                  props.logOutButtonClick();
                }
              }}
              className="my-1"
            ></TextButton>
          </div>
        ) : props.type === 'logout' ? (
          <div>
            <TextButton
              type="warning"
              size="medium"
              label={props.button1}
              callback={() => {
                dispatch(closeDrawer());
                navigate('/');
              }}
              className="my-1"
            ></TextButton>
            <TextButton
              type="gray"
              size="medium"
              label={props.button2}
              callback={() => {
                dispatch(closeDrawer());
                navigate('/');
              }}
              className="my-1"
            ></TextButton>
          </div>
        ) : (
          <div>
            <TextButton
              type={drawerState.drawerType === 'unlock' ? 'primary' : 'warning'}
              size="medium"
              label={props.button1}
              callback={onFirstButtonClick}
              className="my-1"
            ></TextButton>
            <TextButton
              type="gray"
              size="medium"
              label={props.button2}
              callback={onSecondButtonClick}
              className="my-1"
            ></TextButton>
          </div>
        )}
      </Drawer>
    </>
  );
};
