import React from 'react';
import { StreakCard } from './StreakCard';
import { StreakCardInfoType } from '../Types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/swiperStyle.css';

type CarouselPropsType = {
  activeList: StreakCardInfoType[];
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
        {activeList.map((obj, index) => {
          return (
            <SwiperSlide className="slide-item" key={index}>
              <StreakCard
                title={obj.title}
                tags={obj.tags}
                color={obj.color}
                info={obj.info}
                className="card shrink-0 h-fit"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
