import React, { useEffect, useState } from 'react';
import chacha from '../../public/chacha1.jpg';
import { Avatar } from '@material-tailwind/react';

interface RankPropsType {
  userlist: {
    profile: string;
    userName: string;
    durtime: string;
  }[];
}

interface threeUserlistType {
  profile: string;
  userName: string;
  durtime: string;
  height: string;
}

export const StreakRank = ({ userlist }: RankPropsType) => {
  const [currRank, setCurrRank] = useState(0);
  useEffect(() => {
    const rank = setTimeout(() => {
      setCurrRank((currRank + 1) % 5);
      threeUserlist();
    }, 1500);
  });

  const threeUserlist = () => {
    const newList: threeUserlistType[] = [];

    const prevRank = currRank - 1 < 0 ? 4 : currRank - 1;
    const nextRank = currRank + 1 > 4 ? 0 : currRank + 1;
    const prevUser = {
      profile: userlist[prevRank].profile,
      userName: userlist[prevRank].userName,
      durtime: userlist[prevRank].durtime,
      height: 'bottom-',
    };
    const currUser = {
      profile: userlist[currRank].profile,
      userName: userlist[currRank].userName,
      durtime: userlist[currRank].durtime,
      height: 'bottom-5',
    };
    const nextUser = {
      profile: userlist[nextRank].profile,
      userName: userlist[nextRank].userName,
      durtime: userlist[nextRank].durtime,
      height: 'bottom-0',
    };
    newList.push(prevUser);
    newList.push(currUser);
    newList.push(nextUser);

    return newList;
  };

  const rankList = () => {
    const rankList: number[] = [];

    const prevRank = currRank - 1 < 0 ? 4 : currRank - 1;
    const nextRank = currRank + 1 > 4 ? 0 : currRank + 1;

    rankList.push(prevRank);
    rankList.push(currRank);
    rankList.push(nextRank);

    return rankList;
  };

  return (
    <div>
      <div className="relative grid grid-cols-[1fr_3fr] p-1 py-3">
        <div className="relative">
          {threeUserlist().map((user, index) =>
            index === 1 ? (
              <div
                key={index}
                className={'absolute w-9 h-9 bottom-4 left-0 z-10'}
              >
                <Avatar
                  src={`${user.profile}`}
                  alt="profile img"
                  size="sm"
                  className="self-center justify-self-center"
                />
              </div>
            ) : (
              <div
                key={index}
                className={`absolute w-9 h-9  ${user.height} left-0 `}
              >
                <Avatar
                  src={`${user.profile}`}
                  alt="profile img"
                  size="sm"
                  className="self-center justify-self-center opacity-30"
                />
              </div>
            )
          )}
        </div>
        <div className="h-16 flex flex-col justify-center items-center pl-5">
          <span className="block text-xs pr-1">{rankList()[1] + 1}등</span>
          <span className="block text-xs pr-1">
            {threeUserlist()[1].userName}
          </span>
          <span className="block text-xs pr-1">
            {threeUserlist()[1].durtime}
          </span>
        </div>
      </div>
    </div>
  );
};

{
  /* {threeUserlist().map((user, index) => (
          <div className="row-span-3 self-center justify-self-center">
            <Avatar
              src={`${user.profile}`}
              alt="profile img"
              size="sm"
              className="row-span-3 self-center justify-self-center"
            />
          </div>
          {index === 1 ? (
            <>
              <span className="col-span-2 text-xs justify-self-center">
                {rankList()[index] + 1}등
              </span>
              <span className="col-span-2 text-xs justify-self-center">
                {user.userName}
              </span>
              <span className="col-span-2 text-xs justify-self-center">
                {user.durtime}
              </span>
            </>
          ) : (
            <></>
          )}
        </div> */
}
