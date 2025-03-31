import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

interface CustomSwiperProps {
  images: string[];
  autoplayDelay?: number;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ images, autoplayDelay = 2500 }) => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >

        {images && images.map((src, index) => (
          <SwiperSlide key={index} className='w-[200px] h-[150px]'>
                <img
                            className="lazyload img-product"
                            src={src}
                            alt={`Slide ${index + 1}`}
                            style={{
                              width: '60%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                          />
          </SwiperSlide>
        ))}
       
      </Swiper>
    </>
  );
};

export default CustomSwiper;