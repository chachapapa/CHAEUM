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
} from '@fortawesome/free-solid-svg-icons';
import { StreakCardProps } from '../Types';
import { TextColor } from '../theme/TextColorTheme';
import { ActiveColor } from '../theme/ActiveColorTheme';
import { StreakRank } from './StreakRank';
import ActiveInformation from './ActiveInformation';
import { openModal } from '../../features/states/states';
import { useDispatch } from 'react-redux';

export const StreakCard = ({
  title,
  tags,
  color,
  info,
  ...props
}: StreakCardProps) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isListOpen, SetIsListOpen] = useState(false);

  const goStreakSetting = () => {
    alert('go Setting');
  };

  const today: Date = new Date();

  const duration = (): string => {
    let todayDuration = 0;

    const today: Date = new Date();
    let curr: Date = new Date();

    info?.some(element => {
      const chkDate: Date = new Date(curr.setDate(curr.getDate() - 1));
      const dateForm: string =
        chkDate.getFullYear() +
        '-' +
        (chkDate.getMonth() + 1) +
        '-' +
        chkDate.getDate();

      if (element.date !== dateForm) return true;
      todayDuration++;
      curr = chkDate;
    });

    const getStreakCnt = () => {
      const Date = today.getDate();
      if (Date === 0) return 49;
      else return 42 + Date * 7;
    };

    if (todayDuration >= getStreakCnt()) return '5주 이상';

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
      className={`text-chaeum-gray-900 grid gap-x-1 grid-cols-3 grid-rows-3-auto w-full h-full px-4 pt-4 rounded-lg border-2 m-4 mb-10  ${props.className}`}
    >
      <div className="card-header col-span-3 flex flex-row items-center justify-between">
        <span className="title text-xl font-bold mb-2 text-black">{title}</span>

        {isSettingOpen ? (
          <div className="flex flex-row justify-end items-center p-0.5 mb-2">
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-chaeum-gray-600 text-2xl "
              onClick={() => {
                dispatch(openModal('remove'));
              }}
            />
            <FontAwesomeIcon
              icon={faLock}
              className="text-chaeum-gray-600 text-2xl pl-1.5"
              onClick={() => {
                dispatch(openModal('lock'));
              }}
            />
            <FontAwesomeIcon
              icon={faPen}
              className="text-chaeum-gray-600 text-2xl pl-1.5"
              onClick={() => {
                dispatch(openModal('modify'));
              }}
            />
            <FontAwesomeIcon
              onClick={settingToggle}
              icon={faMinus}
              className="text-chaeum-gray-600 text-2xl pl-1.5"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-end items-center p-0.5 mb-2">
            <FontAwesomeIcon
              onClick={settingToggle}
              icon={faGear}
              className="text-chaeum-gray-600 text-2xl"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-start shrink-0 flex-wrap col-span-3 mb-2">
        {tags.map((tag, key) => {
          return <Tag key={key} tag={tag} color={color} />;
        })}
      </div>
      <div className="col-span-2">
        <StreakFull color={color} info={info} />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <StreakRank userlist={userlistSample} />
        </div>
        <div className="duration text-xl pb-2">{duration()}</div>
        <div onClick={goStreakSetting}>
          <FontAwesomeIcon
            icon={faCirclePlay}
            className={`text-5xl ${TextColor({ color })} ${ActiveColor({
              color,
            })}`}
          />
        </div>
      </div>
      <div className="col-span-3 pt-4 ">
        <hr />
        <div className="pb-2">
          <FontAwesomeIcon
            onClick={settingList}
            icon={faChevronUp}
            className="text-chaeum-gray-600 pt-2 text-xl "
          />
          <div className={isListOpen ? OPEN_TYPE.open : OPEN_TYPE.close}>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
            <div className="transition-height duration-500 delay-200">
              <ActiveInformation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OPEN_TYPE = {
  open: 'pb-2 h-96 ease-in-out overflow-scroll opacity-100 duration-700 transition-height',
  close: 'h-0 ease-in-out overflow-hidden duration-700 transition-height',
};
