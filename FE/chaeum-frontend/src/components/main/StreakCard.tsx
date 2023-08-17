import React, { useState } from 'react';
import { StreakFull } from './StreakFull';
import { Tag } from '../common/Tag';
import { JsxElement } from 'typescript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faCirclePlay,
  faTrashCan,
  faLock,
  faPen,
  faMinus,
  faChevronDown,
  faChevronUp,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import { StreakInfoType } from '../Types';
import { TextColor } from '../theme/TextColorTheme';
import { ActiveColor } from '../theme/ActiveColorTheme';
import { StreakRank } from './StreakRank';
import ActiveInformation from './ActiveInformation';
import { openDrawer, openModal } from '../../features/states/states';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategory } from './StreakCategoryList';

export const StreakCard = ({ ...props }: StreakInfoType) => {
  // 비활성화 시 props 정보 바꾸기
  if (props.streakDeleted) {
    props.streakColor = 'deactive';
  }

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isListOpen, SetIsListOpen] = useState(false);

  const navigate = useNavigate();

  const goActive = () => {
    navigate('/active');

    // 추후에 받아온 streakId, categoryId를 보내야 합니다.
    // const streakId = 24;
    const streakId = props.streakId;
    const categoryId = props.categoryId;
    const tagList = props.tagList;
    // const categoryId = 18;
    navigate('/active', { state: { streakId, categoryId, tagList } });
  };

  const duration = (): string => {
    let todayDuration = 0;

    const today: Date = new Date();
    let curr: Date = new Date();

    if (
      props.activeHistoryList.length !== 0 &&
      props.activeHistoryList[0][0].split(' ')[0] === toString(today)
    ) {
      props.activeHistoryList?.some(element => {
        const chkDate: Date = curr;
        const chkDateStr = toString(chkDate);
        if (element[0].split(' ')[0] !== chkDateStr) return true;

        todayDuration++;
        curr = new Date(curr.setDate(curr.getDate() - 1));
      });
    } else if (
      props.activeHistoryList.length !== 0 &&
      props.activeHistoryList[0][0].split(' ')[0] !== toString(today)
    ) {
      props.activeHistoryList?.some(element => {
        const chkDate: Date = new Date(curr.setDate(curr.getDate() - 1));
        const chkDateStr = toString(chkDate);
        if (element[0].split(' ')[0] !== chkDateStr) return true;

        todayDuration++;
        curr = chkDate;
      });
    }

    const getStreakCnt = () => {
      const Date = today.getDate();
      if (Date === 0) return 49;
      else return 42 + Date * 7;
    };

    if (todayDuration >= getStreakCnt()) return '5주 이상';
    // 오늘 포함하기
    return '현재 ' + todayDuration + '일';
  };

  const settingToggle = (): void => {
    setIsSettingOpen(!isSettingOpen);
  };

  const settingList = (): void => {
    SetIsListOpen(!isListOpen);
  };

  const userlistSample = [
    { profile: '../chacha1.jpg', userName: 'rank1', durtime: '03:56:15' },
    { profile: '../chacha2.png', userName: 'rank2', durtime: '02:11:07' },
    { profile: '../temp1.jpg', userName: 'rank3', durtime: '02:09:27' },
    { profile: '../temp2.jpg', userName: 'rank4', durtime: '01:33:48' },
    { profile: '../temp3.png', userName: 'rank5', durtime: '01:05:22' },
  ];

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        props.streakActive ? 'text-black' : 'text-chaeum-gray-500'
      } grid gap-x-1 grid-cols-3 grid-rows-3-auto w-full px-4 pt-4 rounded-lg border-2 m-4 mb-10 card shrink-0 h-fit`}
    >
      <div className="col-span-2 title text-xl font-bold mb-2 text-start text-ellipsis overflow-hidden whitespace-nowrap">
        {props.streakName}
      </div>
      <div className="flex flex-row items-center justify-end">
        {isSettingOpen ? (
          <div className="flex flex-row justify-end items-center p-0.5 mb-2">
            {props.streakActive ? (
              <>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-chaeum-gray-600 text-xl hover:cursor-pointer hover:text-chaeum-gray-900 active:text-chaeum-gray-900"
                  onClick={() => {
                    dispatch(
                      openDrawer({
                        isDrawerOpen: true,
                        drawerType: 'remove',
                        streakId: props.streakId,
                      })
                    );
                  }}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-chaeum-gray-600 text-xl pl-1.5 hover:cursor-pointer hover:text-chaeum-gray-900 active:text-chaeum-gray-900"
                  onClick={() => {
                    dispatch(
                      openDrawer({
                        isDrawerOpen: true,
                        drawerType: 'lock',
                        streakId: props.streakId,
                      })
                    );
                  }}
                />
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-chaeum-gray-600 text-xl pl-1.5 hover:cursor-pointer hover:text-chaeum-gray-900 active:text-chaeum-gray-900"
                  onClick={() => {
                    dispatch(
                      openModal({
                        isModalOpen: true,
                        modalType: 'modify',
                        mainCategory: getCategory(props.categoryId)
                          .mainCategory, // 해당 스트릭의 중분류로 수정
                        streakInfo: props,
                      })
                    );
                  }}
                />
              </>
            ) : (
              <FontAwesomeIcon
                icon={faLockOpen}
                className="text-chaeum-gray-600 text-xl pl-1.5 hover:cursor-pointer hover:text-chaeum-gray-900 active:text-chaeum-gray-900"
                onClick={() => {
                  dispatch(
                    openDrawer({
                      isDrawerOpen: true,
                      drawerType: 'unlock',
                      streakId: props.streakId,
                    })
                  );
                }}
              />
            )}
            <FontAwesomeIcon
              onClick={settingToggle}
              icon={faMinus}
              className="text-chaeum-gray-600 text-xl pl-1.5 hover:cursor-pointer hover:text-chaeum-gray-900 active:text-chaeum-gray-900"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-end items-center p-0.5 mb-2">
            <FontAwesomeIcon
              onClick={settingToggle}
              icon={faGear}
              className="text-chaeum-gray-600 text-xl hover:cursor-pointer hover:text-chaeum-gray-900 active:text-chaeum-gray-900"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-start shrink-0 flex-wrap col-span-3 mb-2">
        {props.tagList.map((tag, key) => {
          return (
            <Tag
              key={key}
              tag={tag}
              color={props.streakActive ? props.streakColor : 'deactive'}
            />
          );
        })}
      </div>
      <div className="col-span-2">
        <StreakFull
          streakColor={props.streakActive ? props.streakColor : 'deactive'}
          activeHistoryList={props.activeHistoryList}
        />
      </div>
      <div className="flex flex-col justify-around">
        {/* <div>
          <StreakRank userlist={userlistSample} />
        </div> */}
        <div className="duration text-xl pb-2">{duration()}</div>
        {props.streakActive ? (
          <div onClick={goActive}>
            <FontAwesomeIcon
              icon={faCirclePlay}
              className={`text-5xl ${TextColor({
                color: props.streakColor,
              })} ${ActiveColor({ color: props.streakColor })}`}
            />
          </div>
        ) : (
          <div className="duration text-xl pb-2">
            {props.streakActive ? duration() : '비활성화'}
          </div>
        )}
      </div>
      <div className="col-span-3 pt-4 ">
        <hr />
        <div className="pb-2">
          <FontAwesomeIcon
            onClick={settingList}
            icon={isListOpen ? faChevronUp : faChevronDown}
            className="text-chaeum-gray-600 pt-2 text-xl "
          />
          <div className={isListOpen ? OPEN_TYPE.open : OPEN_TYPE.close}></div>
        </div>
      </div>
    </div>
  );
};

const OPEN_TYPE = {
  open: 'pb-2 h-96 ease-in-out overflow-scroll opacity-100 duration-700 transition-height',
  close: 'h-0 ease-in-out overflow-hidden duration-700 transition-height',
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
