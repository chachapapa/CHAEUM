import React, { useState, MouseEvent } from 'react';
import ActiveBubble from './ActiveBubble';
import ActiveBubble80 from './ActiveBubble85';
import ActiveBubble70 from './ActiveBubble80';
import ActiveBubble85 from './ActiveBubble70';
import ActiveBubble75 from './ActiveBubble75';
import ActiveInfoCard from './ActiveInfoCard';
import NewWave from './NewWave';
import NewActiveInfoCard from './NewActiveInfoCard';
import { Button, Card, Carousel } from '@material-tailwind/react';
import PhraseCard from './PhraseCard';
import TextButton from '../common/TextButton';
import { useNavigate } from 'react-router';

/*
    추후 서버에서 받아올때는 날짜 형식으로 받아오므로
    props로 받는 time을 number로 변환해서 사용

*/

type Props = {
  // 드래그 크기에 따른 화면 배치
  size: 'small' | 'medium';

  // 활동 시작시 받는 멘트 목록
  startMent: string[];

  // 응원글 목록
};

const ActiveTotalBubble = (props: Props) => {
  // 시00 분00 초00 밀리초00 단위로 되어있음.
  const times: number[] = [11111, 22222, 33333, 44444, 55555, 12345];
  const isActive: boolean[] = [true, false, true, false, true];

  const navigate = useNavigate();

  const stopTime = () => {
    alert('stop!');
  };

  const goResult = () => {
    // navigate('/active/result');
    navigate('/result');
  };

  return (
    <div className="z-10 w-[452px] h-[932px]">
      <div className="z-0 absolute top-1/4 left-2/3 custom-scale-250">
        <ActiveBubble70
          name="chacha"
          tag="클라이밍"
          time={times[0]}
          active={isActive[0]}
          size={90}
          color1="#DDFFDD"
          color2="#00FF00"
        ></ActiveBubble70>
      </div>

      <div className="z-0 absolute top-0 left-0.5">
        <ActiveBubble75
          name="lisa"
          tag="클라이밍"
          time={times[1]}
          active={isActive[1]}
          size={90}
          color1="#FFFFDD"
          color2="#FFFF00"
        ></ActiveBubble75>
      </div>
      <div className="z-0 absolute top-1/3 left-1/4 scale-125">
        <ActiveBubble80
          name="bobo"
          tag="클라이밍"
          time={times[2]}
          active={isActive[2]}
          size={90}
          color1="#DDFFFF"
          color2="#00FFFF"
        ></ActiveBubble80>
      </div>
      <div className="z-0 absolute top-2/3 left-1/3 scale-150">
        <ActiveBubble85
          name="dodo"
          tag="클라이밍"
          time={times[3]}
          active={isActive[3]}
          size={90}
          color1="#FFDDFF"
          color2="#FF00FF"
        ></ActiveBubble85>
      </div>
      <div className="z-0 absolute top-2/4 left-2/3 custom-scale-200">
        <ActiveBubble
          name="choco"
          tag="클라이밍"
          time={times[4]}
          active={isActive[4]}
          size={90}
          color1="#FFDDDD"
          color2="#FF0000"
        ></ActiveBubble>
      </div>
      {props.size === 'small' ? (
        <div className="z-0 absolute bottom-0 w-[452px] custom-scale-100 right-0">
          {/* <NewWave color="chaeumblue"></NewWave> */}
          <NewActiveInfoCard time={times[5]}></NewActiveInfoCard>
        </div>
      ) : (
        <div className="z-0 absolute bottom-0 w-[452px] h-[650px] custom-scale-100 right-0">
          {/* <NewWave color="chaeumblue"></NewWave> */}
          <NewActiveInfoCard time={times[5]}></NewActiveInfoCard>

          <div className="bg-chaeum-blue-300 max-w-[452px] h-[585px]">
            <div className="max-w-[452px] mx-auto overflow-hidden">
              <Carousel>
                {props.startMent.map((ment, index) => (
                  <div
                    key={index}
                    className="bg-chaeum-blue-300 p-4 w-300 h-200 items-center"
                  >
                    <Card>
                      <PhraseCard
                        title="동기부여 멘트"
                        ment={ment}
                      ></PhraseCard>
                    </Card>
                  </div>
                ))}
              </Carousel>

              <div className="mx-auto flex justify-center place-items-center pt-7">
                <Button
                  className=" m-4 float-left; w-40"
                  variant="filled"
                  color="gray"
                  size="lg"
                  ripple={true}
                  onClick={stopTime}
                >
                  일시중지
                </Button>
                <Button
                  className="m-4 float-left; w-40"
                  variant="filled"
                  size="lg"
                  ripple={true}
                  onClick={goResult}
                >
                  활동종료
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveTotalBubble;
