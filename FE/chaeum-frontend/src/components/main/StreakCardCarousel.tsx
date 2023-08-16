import React from 'react';
import { StreakCard } from './StreakCard';
import { StreakInfoType } from '../Types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/swiperStyle.css';

type CarouselPropsType = {
  activeList: StreakInfoType[];
};

export const StreakCardCarousel = ({ activeList }: CarouselPropsType) => {
  return (
    <>
      <Swiper
        autoHeight={true}
        loop={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        pagination={true}
        className="mySwiper h-[374px] w-full ease-in-out"
      >
        {activeList
          .slice()
          .reverse()
          .map((obj, index) => {
            // console.log(obj);
            return (
              <SwiperSlide className="slide-item" key={index}>
                <StreakCard
                  streakId={obj.streakId}
                  streakName={obj.streakName}
                  streakColor={obj.streakColor}
                  streakActive={obj.streakActive}
                  streakDeleted={obj.streakDeleted}
                  categoryId={obj.categoryId}
                  continueDays={obj.continueDays}
                  tagList={obj.tagList}
                  activeHistoryList={obj.activeHistoryList}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};
