/* eslint-disable indent */
import React, { useState, useRef } from 'react';
import '../styles/draggablescreen.css';
import ActiveFullScreen from './ActiveFullScreen';
import ActiveTotalBubble from './ActiveTotalBubble';
import ActiveInfoCard from './ActiveInfoCard';

enum ScreenType {
  SMALL,
  MEDIUM,
  FULL,
}

const DraggableScreen = () => {
  const [screenType, setScreenType] = useState<ScreenType>(ScreenType.SMALL);
  const [isDragging, setIsDragging] = useState(false);
  const initialY = useRef<number>(0);
  const ments: string[] = [
    '일찍 일어나는 새가 일찍 잔다.',
    '공든탑이 무너지랴',
  ];

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    initialY.current = event.clientY;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaY = event.clientY - initialY.current;

    // 여기서 적절한 로직으로 드래그 길이에 따라서 화면 크기를 결정합니다.
    // 예를 들어, 일정 거리 이하의 드래그면 ScreenType.SMALL, 그 이상의 드래그면 ScreenType.MEDIUM, 전체 드래그면 ScreenType.FULL로 설정할 수 있습니다.
    // 이 예시에서는 드래그 거리에 따라 비율을 계산하여 화면 크기를 결정합니다.
    const screenWidth = window.innerHeight;
    const dragPercentage = deltaY / screenWidth;
    let newScreenType: ScreenType;

    if (Math.abs(dragPercentage) < 0.4) {
      newScreenType = ScreenType.SMALL;
    } else if (Math.abs(dragPercentage) < 0.7) {
      newScreenType = ScreenType.MEDIUM;
    } else {
      newScreenType = ScreenType.FULL;
    }

    setScreenType(newScreenType);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getScreenClassName = () => {
    switch (screenType) {
      case ScreenType.SMALL:
        return 'screen small';
      case ScreenType.MEDIUM:
        return 'screen medium';
      case ScreenType.FULL:
        return 'screen full';
      default:
        return 'screen';
    }
  };

  return (
    <div
      className=" h-screen flex flex-col items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className={getScreenClassName()}>
        {screenType === ScreenType.SMALL && (
          <div className="w-full h-screen flex items-center justify-center">
            <ActiveTotalBubble size="small" startMent={ments} />
          </div>
        )}
        {screenType === ScreenType.MEDIUM && (
          <div className="w-full h-screen flex items-center justify-center z-20">
            <ActiveTotalBubble size="medium" startMent={ments} />
          </div>
        )}
        {screenType === ScreenType.FULL && (
          <div className="w-full h-screen">
            {/* Full Screen 컨텐츠 */}
            <ActiveFullScreen />
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableScreen;
