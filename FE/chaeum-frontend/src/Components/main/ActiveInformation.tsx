import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';

const ActiveInformation = () => {

  const activeExample = {
    streakColor : 'bg-chaeum-blue-400',
    date : '2023.07.21(금)',
    time : '15:00:25 ~ 17:22:48',
    activeCount : 8,
    howLong : '2시간 22분 23초',
  };

  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <div className="flex">
        <div className={`h-auto w-[6px] ${activeExample.streakColor} rounded-full mr-2`}></div>
        <div className="flex flex-col grow">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-2 mt-0"
          >
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <Typography variant="small" color="text-chaeum-gray-900">
                    {activeExample.date}
                  </Typography>
                  <Typography variant="small" color="text-chaeum-gray-900">
                    {activeExample.time}
                  </Typography>
                </div>
                <div className="5 flex self-end gap-0 text-sm">{activeExample.activeCount}번째 채움</div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="mb-1 p-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <Typography variant="h5" color="text-chaeum-gray-900">
                  {activeExample.howLong}
                </Typography>
              </div>
              <div>
                <button className="outline outline-1 w-20 h-6 text-sm items-center rounded-md text-chaeum-gray-900 outline-chaeum-gray-300 hover:bg-chaeum-gray-300 mr-2 transition-all">
                  응원글 보기
                </button>
                <button className={`w-20 h-6 text-sm items-center rounded-md text-white ${activeExample.streakColor}`}>
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

export default ActiveInformation;
