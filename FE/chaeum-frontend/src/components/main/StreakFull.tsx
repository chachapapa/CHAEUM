import React, { useState } from 'react';
import { StreakDay } from './StreakDay';
import { StreakInfoType } from '../Types';

// 시작 날짜 구하기
// 일요일 : 현재날짜 - 41
// 월요일 : 현재날짜 - 35
// 화요일 : 현재날짜 - 36
// 수요일 : 현재날짜 - 37
// 목요일 : 현재날짜 - 38
// 금요일 : 현재날짜 - 39
// 토요일 : 현재날짜 - 40

// 스트릭 정보는 6주치 날짜 & 활동 시간을 받아오면
export const StreakFull = ({ info, color }: StreakInfoType) => {
  const today: Date = new Date();
  const day: number = today.getDay();

  // 시작 날짜 구하기
  const arrange = day === 0 ? 6 : day - 1;

  // 전월 말일 구하기
  let prevYear =
    today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
  let prevMonth = today.getMonth() === 0 ? 12 : today.getMonth();
  let lastDate = new Date(prevYear, prevMonth, 0);
  let operation = today.getDate() - (35 + arrange) + lastDate.getDate();

  // 한달 더 뒤로 가기
  if (operation <= 0) {
    prevYear = prevMonth === 1 ? prevYear - 1 : prevYear;
    prevMonth = prevMonth === 1 ? 12 : prevMonth - 1;
    lastDate = new Date(prevYear, prevMonth, 0);
    operation += lastDate.getDate();
  }

  const sDate = new Date(prevYear, prevMonth - 1, operation); // 시작날짜
  let currDate = sDate;
  // const [currDate, setCurrDate] = useState(sDate);

  const streakWeek = (dayCnt?: number) => {
    // Narrowing
    dayCnt = typeof dayCnt === 'undefined' ? 7 : dayCnt;

    if (dayCnt === 0) dayCnt = 7; // 일요일

    const streakWeekView = [];

    for (let i = 0; i < dayCnt; i++) {
      const currDateString: string =
        currDate.getFullYear() +
        '-' +
        (currDate.getMonth() + 1) +
        '-' +
        currDate.getDate();

      let weight: 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | undefined;

      info?.some(e => {
        if (e.date === currDateString) {
          if (e.activetime <= 1) weight = 'w1';
          else if (e.activetime <= 2) weight = 'w2';
          else if (e.activetime <= 3) weight = 'w3';
          else if (e.activetime <= 4) weight = 'w4';
          else weight = 'w5';
        }
      });

      typeof weight === 'undefined'
        ? streakWeekView.push(<StreakDay />)
        : streakWeekView.push(<StreakDay color={color} weight={weight} />);
      currDate = new Date(currDate.setDate(currDate.getDate() + 1));
    }

    return (
      <div className="flex flex-col justify-normal items-center flex-1">
        {streakWeekView}
      </div>
    );
  };

  const streakList = () => {
    const streakListView = [];

    for (let i = 0; i < 5; i++) {
      streakListView.push(streakWeek(7));
    }

    streakListView.push(streakWeek(day));

    return streakListView;
  };

  const dayList = () => {
    const dayList = [];

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    for (let i = 0; i < 7; i++) {
      dayList.push(<span>{days[i]}</span>);
    }

    return dayList;
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-col justify-around items-center text-xs">
          {dayList()}
        </div>
        {streakList()}
      </div>
    </div>
  );
};
