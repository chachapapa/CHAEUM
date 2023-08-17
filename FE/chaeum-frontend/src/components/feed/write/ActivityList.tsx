import { Card } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ActivityInformation from './ActivityInformation';
import axios from 'axios';
import { Activity } from '../../Types';
import { Article } from '../../Types';
import { StreakInfoType } from '../../Types';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { StreakCard } from '../../main/StreakCard';

type Props = {
  setRegistActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
};

// const ACTIVITY_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/activity/list';
const AccessToken = localStorage.getItem('access_token');

const ActivityList = ({ setRegistActivity }: Props) => {
  const [activityList, setActivityList] = useState<StreakInfoType[]>([]);
  const myStreakInfo = useAppSelector(state => state.stateSetter.myStreakInfo);

  // console.log('스트릭정보');
  // console.log(myStreakInfo);

  useEffect(() => {
    // if (myStreakInfo) console.log(myStreakInfo[0][0].activeHistoryList);
    if (myStreakInfo) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < myStreakInfo[i].length; j++) {
          console.log(myStreakInfo[i][j]);
          setActivityList(prev => [...prev, myStreakInfo[i][j]]);
        }
      }
    }
    console.log('완료');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(activityList);

  // useEffect(() => {
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
  // setActivityList([example2]);
  // }, [setActivityList]);

  return (
    <div className=" bg-white w-11/12 my-3">
      {activityList.map((activity, index) => (
        <div className="flex flex-col items-center justify-between" key={index}>
          {activity.activeHistoryList.map((active, index) => (
            <div key={index} className="w-full">
              {active[3] === '0' ? (
                <div>
                  <ActivityInformation
                    middleCategory={activity}
                    activity={active}
                    key={index}
                    setRegistActivity={setRegistActivity}
                  />
                  <hr className="my-3"></hr>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
