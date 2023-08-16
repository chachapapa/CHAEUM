import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { WaveColor } from '../../theme/WaveColorTheme';
import { WaveBottomColor } from '../../theme/StreakTheme';
import { Activity, Article } from '../../Types';
import { start } from 'repl';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setArticleWriteStep } from '../../../features/states/states';

type Props = {
  activity: Activity;
  setRegistActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
};

const ActivityInformation = ({ activity, setRegistActivity }: Props) => {
  const dispatch = useAppDispatch();
  const color = activity.color;
  const weight3 = 'w3';
  const backgroundColor = WaveBottomColor({ color, weight3 });

  const startTime: Date = new Date(activity.startTime);
  const endTime: Date = new Date(activity.endTime);

  const elapsedTime = endTime.getTime() - startTime.getTime();
  console.log(elapsedTime / 1000 / 60 / 60);
  const date =
    startTime.getFullYear() +
    '년 ' +
    startTime.getMonth() +
    '월 ' +
    startTime.getDay() +
    '일';
  const startTimeFormed = activity.startTime.split(' ')[1];
  const endTimeFormed = activity.endTime.split(' ')[1];

  const hour = Math.floor(elapsedTime / 3600000);
  const minute = Math.floor((elapsedTime - hour * 3600000) / 60000);
  const second = (elapsedTime - hour * 3600000 - minute * 60000) / 1000;
  const elapsedTimeFormed = hour + '시간 ' + minute + '분 ' + second + '초';

  const onWriteButtonClicked = () => {
    setRegistActivity(activity);
    dispatch(setArticleWriteStep(2));
  };
  console.log(hour + ' ' + minute + ' ' + second);
  // const activeExample = {
  //   streakColor : 'bg-chaeum-blue-400',
  //   date : '2023.07.21(금)',
  //   time : '15:00:25 ~ 17:22:48',
  //   activeCount : 8,
  //   howLong : '2시간 22분 23초',
  // };

  return (
    <Card color="transparent" className="w-full p-2">
      <div className="flex">
        <div
          className={`h-auto w-[6px] ${backgroundColor} rounded-full mr-2`}
        ></div>
        <div className="flex flex-col grow">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-2 mt-0"
          >
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h6">
                    {activity.streak.streakName}
                  </Typography>
                </div>
                <div className="flex flex-col items-end">
                  <Typography variant="small" color="text-chaeum-gray-900">
                    {date}
                  </Typography>
                  <Typography variant="small" color="text-chaeum-gray-900">
                    {startTimeFormed + ' ~ ' + endTimeFormed}
                  </Typography>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="mb-1 p-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <Typography variant="h6" color="text-chaeum-gray-900">
                  {elapsedTimeFormed}
                </Typography>
              </div>
              <div>
                <button className="outline outline-1 w-20 h-6 text-sm items-center rounded-md text-chaeum-gray-900 outline-chaeum-gray-300 hover:bg-chaeum-gray-300 mr-2 transition-all">
                  응원글 보기
                </button>
                <button
                  className={`w-20 h-6 text-sm items-center rounded-md text-white ${backgroundColor}`}
                  onClick={onWriteButtonClicked}
                >
                  공유하기
                </button>
              </div>
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};

export default ActivityInformation;
