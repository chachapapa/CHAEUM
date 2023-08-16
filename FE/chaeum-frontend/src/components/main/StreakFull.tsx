/* eslint-disable indent */
import React, { useState } from 'react';
import { StreakDay } from './StreakDay';
import { StreakBlankType } from '../Types';

// 시작 날짜 구하기
// 일요일 : 현재날짜 - 41
// 월요일 : 현재날짜 - 35
// 화요일 : 현재날짜 - 36
// 수요일 : 현재날짜 - 37
// 목요일 : 현재날짜 - 38
// 금요일 : 현재날짜 - 39
// 토요일 : 현재날짜 - 40

// 스트릭 정보는 6주치 날짜 & 활동 시간을 받아오면
export const StreakFull = ({ ...props }: StreakBlankType) => {
  const today: Date = new Date(); // 오늘 날짜

  const day: number = today.getDay(); // 오늘 요일

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
  const currDateString = toString(currDate);

  // 서버에서 받아오는 data에는 6주 자료가 담겨있다.
  // ex) 오늘이 목요일이면 6주 전 목요일까지의 자료
  // 하지만 스트릭 구성 시 필요한 자료는 금주를 제외한 5주까지의 자료 (월~금)
  // 따라서 받아온 activeHistoryList를 재구성해주어야한다.
  // const dIdx = sDate;
  // 시작 날짜보다 작을 때를 제외한 activeHistoryList 뽑기
  // 날짜 정보 및 시간정보 저장
  const activeList: string[][] = props.activeHistoryList.filter(
    (record, idx) => sDate <= toDate(record[0].split(' ')[0])
  );

  // 해당정보를 형식에 맞게 잘라서 넣기
  const activeDateList: string[] = [];
  const activeTimeList: number[] = [];

  activeList.map((obj, idx) => {
    activeDateList.push(obj[0].split(' ')[0]);
    const time = Number(obj[2]) / 3600;
    activeTimeList.push(Math.floor(time));
  });

  // activeDateList.map((obj, idx) => {
  //   console.log(idx + ' : ' + obj);
  //   console.log(idx + ' : ' + activeTimeList[idx]);
  // });

  // 1주 단위로 스트릭 모으기
  const streakWeek = (dayCnt?: number) => {
    // Type Narrowing
    dayCnt = typeof dayCnt === 'undefined' ? 7 : dayCnt;

    // 일요일을 맨 뒤로 뺄 예정이므로 숫자 카운팅 바꿔주기
    if (dayCnt === 0) dayCnt = 7;

    // 요일별 스트릭 element를 담을 배열
    const streakWeekView = [];

    for (let i = 0; i < dayCnt; i++) {
      const stringDate: string = toString(currDate);

      // 시간을 환산하여 색상을 정하기 위한 weight 타입 지정 후 선언
      let weight: 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | undefined;

      // activeHistoryList를 돌면서 현재 스트릭에 해당하는 날짜가 리스트에 존재하는지 확인
      // 존재하면 weight 계산, 아니면 넘어가기
      // .some 사용
      // const realActiveList = activeList.filter(e => e[0] === currDateString);

      // eslint-disable-next-line no-loop-func
      activeDateList.map((obj, idx) => {
        if (stringDate === obj) {
          if (activeTimeList[idx] <= 1) weight = 'w1';
          else if (activeTimeList[idx] <= 2) weight = 'w2';
          else if (activeTimeList[idx] <= 3) weight = 'w3';
          else if (activeTimeList[idx] <= 4) weight = 'w4';
          else weight = 'w5';
        }
      });

      typeof weight === 'undefined'
        ? streakWeekView.push(<StreakDay />)
        : streakWeekView.push(
            <StreakDay color={props.streakColor} weight={weight} />
          );
      currDate = new Date(currDate.setDate(currDate.getDate() + 1));
    }

    // 리턴 : streakWeekView을 div 태그로 감싸서 보내기
    return (
      <div className="flex flex-col justify-normal items-center flex-1">
        {streakWeekView}
      </div>
    );
  };

  const streakList = () => {
    const streakListView = []; // html 구조로 저장할 배열

    // 5주까지는 7일치 정보를 갖고와서 배열에 넣기
    for (let i = 0; i < 5; i++) {
      streakListView.push(streakWeek(7));
    }

    // 마지막 주는 현재 요일까지만 출력될 수 있게 따로 배열에 넣기
    streakListView.push(streakWeek(day));

    return streakListView;
  };

  // 좌측 요일 표기를 위한 함수
  const dayList = () => {
    const dayList = []; // html 식으로 저장할 배열

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']; // 요일 약자 저장

    // 각 요일을 <span></span> 태그에 담아서 dayList에 저장하기
    for (let i = 0; i < 7; i++) {
      dayList.push(<span key={i}>{days[i]}</span>);
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

// 날짜 -> 스트링 타입
const toString = (dateType: Date) => {
  // 연도
  const year = dateType.getFullYear();
  // 월 : 1~9월엔 앞에 0 붙이기
  const month: string | number =
    dateType.getMonth() + 1 < 10
      ? '0' + (dateType.getMonth() + 1)
      : dateType.getMonth() + 1;
  // 일: 1~9월엔 앞에 0 붙이기
  const date: string | number =
    dateType.getDate() < 10 ? '0' + dateType.getDate() : dateType.getDate();

  // 현재 스트릭에 해당하는 날짜를 activeHistoryList가 갖고있는 날짜 형식으로 형변환
  return year + '-' + month + '-' + date;
};

// 스트링 -> 날짜 타입
const toDate = (strDate: string) => {
  const split = strDate.split('-');
  const y = parseInt(split[0]);
  const m = parseInt(split[1]);
  const d = parseInt(split[2]);
  return new Date(y, m - 1, d);
};
