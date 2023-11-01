import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { sliderItems } from '@/app/constants';
import Image from 'next/image';


const SliderMain = () => {

  const progressCircle = React.useRef(null);
  const progressContent = React.useRef(null);
  const onAutoplayTimeLeft = (s:any, time:any, progress:any) => {
    (progressCircle.current as any).style.setProperty('--progress', 1 - progress);
    (progressContent.current as any).textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="mySwiper"
    >
      {
        sliderItems?.map((item:any, index:number) => (
          <SwiperSlide key={item}>
            <div className='absolute gap-2 p-4 flex items-center 800px:items-start pl-4 justify-center flex-col hero_animation w-[400px] h-[400px]  800px:w-[600px] 800px:h-[600px] rounded-full 800px:top-[20%] 800px:left-[10%]'>
            <h1 className='text-white text-[30px]'>{item?.title}</h1>
            <h4 className='text-white text-[20px]'>
             {item?. subtitle}
            </h4>
            <p className='text'>
              {item?.description}
            </p>
            </div>
             <Image  className='!w-full !h-full object-cover' src={item?.image} alt={index +' slider'} />
            </SwiperSlide>
        ))
      }
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  </>
  )
}

export default SliderMain