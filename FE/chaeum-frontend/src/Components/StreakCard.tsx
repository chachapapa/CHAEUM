import React, { useState } from 'react';
import { StreakFull } from './StreakFull';
import { Tag } from './Tag';
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
import { ColorPropsType, StreakInfoType } from './TypeInterface';
import { TextColor } from './theme/TextColorTheme';
import { ActiveColor } from './theme/ActiveColorTheme';
import { StreakRank } from './StreakRank';

interface StreakCardProps extends StreakInfoType {
  title: string;
  tags: string[];
}

export const StreakCard = ({ title, tags, color, info }: StreakCardProps) => {
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

    if (todayDuration >= getStreakCnt())
      return '현재 ' + todayDuration + '일 이상';

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

  return (
    <div className="grid gap-x-1 grid-cols-3 grid-rows-3-auto w-96 p-4 rounded-lg shadow-[0_0_10px_5px_rgba(208,211,222,0.5)] shadow-chauem-gray-500/50 mb-4">
      <div className="text-xl col-span-2 font-bold mb-2 text-left">{title}</div>
      <div className="flex flex-row justify-end p-0.5 mb-2">
        {isSettingOpen ? (
          <div>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-chaeum-gray-600 text-2xl "
            />
            <FontAwesomeIcon
              icon={faLock}
              className="text-chaeum-gray-600 text-2xl pl-1.5"
            />
            <FontAwesomeIcon
              icon={faPen}
              className="text-chaeum-gray-600 text-2xl pl-1.5"
            />
            <FontAwesomeIcon
              onClick={settingToggle}
              icon={faMinus}
              className="text-chaeum-gray-600 text-2xl pl-1.5"
            />
          </div>
        ) : (
          <div>
            <FontAwesomeIcon
              onClick={settingToggle}
              icon={faGear}
              className="text-chaeum-gray-600 text-2xl"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-start col-span-3 mb-2">
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
        <div className="text-2xl">{duration()}</div>
        <div onClick={goStreakSetting}>
          <FontAwesomeIcon
            icon={faCirclePlay}
            className={`text-5xl ${TextColor({ color })} ${ActiveColor({
              color,
            })}`}
          />
        </div>
      </div>
      <div className="col-span-3 py-4">
        <hr />
        {isListOpen ? (
          <div>
            <FontAwesomeIcon
              onClick={settingList}
              icon={faChevronUp}
              className="text-chaeum-gray-600 "
            />
            <div>ListBox1</div>
            <div>ListBox2</div>
            <div>ListBox3</div>
            <div>ListBox4</div>
          </div>
        ) : (
          <FontAwesomeIcon
            onClick={settingList}
            icon={faChevronDown}
            className="text-chaeum-gray-600 "
          />
        )}
      </div>
    </div>
  );
};
