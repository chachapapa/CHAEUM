import React, { useEffect, useState } from 'react';
import '../styles/activecardwave.css';
import { WaveColor } from '../theme/WaveColorTheme';
import { WaveBottomColor } from '../theme/StreakTheme';
import { IconColor } from '../theme/IconTheme';
import { Avatar, IconButton } from '@material-tailwind/react';
import { ColorVariation, Story } from '../Types';
import axios from 'axios';

/*
  사용법
  <StoryCard 
    color='yellow' 
    img='../chacha2.png' 
    nickname='코코' 
    tag={['tag1', 'tag2', 'tag3']} 
    time={15}>
  </StoryCard>

  닉네임은 8글자(한글) 제한이 될 것 같습니다
  
  태그는 최대 3칸 지원하며(공간상의 문제)
  
  타이머는 컴포넌트 내에서 연산을 계속하는것 보다
  "현재 시간 - 최초 활동시간" 을 number로 넘겨서
  작동하게끔 로직을 구현했습니다.
*/

type Props = {
  story: Story;
  onStoryClicked: () => void;
};
const ACTIVITY_LIKE_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/like-activity';
const ACTIVITY_DISLIKE_URL =
  'http://i9a810.p.ssafy.io:8080/api/sns/like-activity/cancel';
const AccessToken = localStorage.getItem('access_token');

const NewStoryCard = ({ story, onStoryClicked }: Props) => {
  const weight0 = 'w0';
  const weight3 = 'w3';
  const weight4 = 'w4';
  const waveFirst = WaveColor({ color: story.streakColor, weight4 });
  const waveSecond = WaveColor({ color: story.streakColor, weight3 });
  const titleBoxColor = WaveBottomColor({ color: story.streakColor, weight3 });
  const fullIconColor = IconColor({color : story.streakColor , weight3});
  const backgroundColor = WaveBottomColor({
    color: story.streakColor,
    weight0,
  });
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [time, setTime] = useState(
    calculateTimeDifference(story.activeStartTime)
  );
  

  function calculateTimeDifference(targetTime: string): number {
    /*
      현재 시간 - 활동 시작시간 을 빼면
      라이벌이 활동중일때 accumulateTime + 해당 시간 차 만큼
      활동시간을 갱신할 수 있습니다.
    */

    const currentTime = new Date();
    const targetDate = new Date(targetTime);

    const timeDifferenceInSeconds = Math.floor(
      (currentTime.getTime() - targetDate.getTime()) / 1000
    );

    return timeDifferenceInSeconds;
  }

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(time => time + 1); // Increment time by 100 milliseconds (1 second)
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculat
  const seconds = Math.floor(time % 60);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const onLikeButtonClicked = (e : React.MouseEvent) => {
    e.stopPropagation();
    axios
      .patch(
        `${ACTIVITY_LIKE_URL}`,
        { activityId: story.activityId },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        if (res) setIsLiked(prev => !prev);
      });
  };

  const onDislikeButtonClicked = (e: React.MouseEvent) => {
    e.stopPropagation();
    axios
      .patch(
        `${ACTIVITY_DISLIKE_URL}`,
        { activityId: story.activityId },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        if (res) setIsLiked(prev => !prev);
      });
  };

  return (
    <div
      id = 'storyBackground'
      className={`${backgroundColor} relative min-w-[230px] min-h-[150px] flex overflow-auto rounded-lg shadow-lg mr-10 z-20`}
      onClick={onStoryClicked}
    >
      <div className="flex flex-col justify-around w-full m-2">
        <div className="relative flex items-center gap-x-1">
          <img
            src={story.profileUrl}
            alt=""
            className="h-14 w-14 rounded-full bg-gray-50"
          />
          <div className="text-base leading-6">
            <p className="text-chaeum-gray-900 text-left">{story.friendName}</p>
            <div
              className={`text-xs ${titleBoxColor} rounded-md py-0.5 px-1 w-fit`}
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              <p className="font-bold text-left text-sm">{story.streakName}</p>
            </div>

            <div
              className="text-xs rounded-md py-0.5 px-1 w-fit"
              style={{ display: 'flex', flexWrap: 'wrap', minWidth: '120px' }}
            >
              {story.tagList.map((tagItem, index) => (
                <div key={index} style={{ marginRight: '5px' }}>
                  <p className="text-chaeum-gray-900 text-left">#{tagItem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className="text-2xl z-20 flex flex-grow items-center justify-center">{formattedTime}</div>
          <div>
            <IconButton
              variant="text"
              className="rounded-full hover:bg-chaeum-blue-500/10 z-30"
              onClick={isLiked ? onDislikeButtonClicked : onLikeButtonClicked}
            >
              {isLiked ? (
                <svg
                  className={fullIconColor}
                  xmlns="http://www.w3.org/2000/svg"
                  height="2em"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              ) : (
                <svg
                  className='fill-chaeum-gray-300'
                  xmlns="http://www.w3.org/2000/svg"
                  height="2em"
                  viewBox="0 0 512 512"
                >
                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </div>
      <svg
        className="waves absolute self-end z-10"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        height="42.93px"
        width="100%"
      >
        <defs>
          <path
            id="gentle-wave-front"
            d="M-160 44c30 0 50-13 88-13s 50 13 88 13 50-13 88-13 50 13 88 13 v44h-352z"
          />
          <path
            id="gentle-wave-middle"
            d="M-160 44c40 0 58-10.4 88-18s 55 18 90 18 58-11 88-18 58 21 88 18 v44h-352z"
          />
          <path
            id="gentle-wave-back"
            d="M-160 44c30 0 50-13 90-15s 50 13 88 13 50-13 87-13 50 13 80 12 v44h-352z"
          />
        </defs>
        <g className="parallax">
          {/* <use
            xlinkHref="#gentle-wave-back"
            x="48"
            y="0"
            className={`${waveThird} opacity-50`}
          /> */}
          <use
            xlinkHref="#gentle-wave-middle"
            x="48"
            y="0"
            className={`${waveSecond} opacity-50`}
          />
          <use
            xlinkHref="#gentle-wave-front"
            x="48"
            y="0"
            className={`${waveFirst} opacity-50`}
          />
        </g>
      </svg>
      {/* <div className="relative h-16">
        <div className={`absolute bottom-0 w-full h h-16 ${BottomThird} opacity-50`}></div>
        <div className={`absolute bottom-0 w-full h h-16 ${BottomSecond} opacity-50`}></div>
        <div className={`absolute bottom-0 w-full h h-16 ${BottomFirst} opacity-50`}></div>
      </div> */}
    </div>
  );
};

export default NewStoryCard;
