import { Card } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ActivityInformation from './ActivityInformation';
import axios from 'axios';
import { Activity } from '../../Types';
import { Article } from '../../Types';

type Props = {
  setRegistActivity : React.Dispatch<React.SetStateAction<Activity | undefined>>;
}

const ACTIVITY_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/activity/list';
const AccessToken = localStorage.getItem('access_token');

const example2: Activity = {
  id: 1,
  streakId: 1,
  streak :{categoryMain : '운동', categoryMiddle: '클라이밍', streakTag: ['#빨주노초파남보', '#영!차-'],  streakName: '산양은 아니고 염소정도'},
  category: '클라이밍',
  startTime: '2023-08-11 11:10:30',
  endTime: '2023-08-11 12:00:00',

  color: 'teal',
};

const ActivityList = ({setRegistActivity}:Props) => {
  const [activityList, setActivityList] = useState<Activity[]>([]);

  

  useEffect(() => {
    // axios
    //   .get(`${ACTIVITY_LIST_URL}`, {
    //     headers: { Authorization: `Bearer ${AccessToken}` },
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res) {
    //       setActivityList(res.data);
    //     } else {
    //       console.log('활동목록 가져오기 실패');
    //     }
    //   });

    setActivityList([example2]);
  },[setActivityList]);

  return (
    <div className="flex py-3 flex-col items-center justify-between bg-white w-11/12">
      {activityList.map(activity => (
        <ActivityInformation activity={activity} key={activity.id} setRegistActivity={setRegistActivity}/>
      ))}
    </div>
  );
};

export default ActivityList;
