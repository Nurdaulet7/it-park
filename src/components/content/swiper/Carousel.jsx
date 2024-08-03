import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.css";
import { FormattedMessage } from "react-intl";

// import required modules
import { Parallax, Pagination, Autoplay, Navigation } from "swiper/modules";

const Carousel = () => {
  return (
    <Swiper
      style={{
        "--swiper-pagination-color": "#fff",
      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      modules={[Parallax, Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 7000,
      }}
      className="mySwiper"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        data-swiper-parallax="-23%"
      ></div>
      <SwiperSlide>
        <div className="intro-info">
          <div className="title" data-swiper-parallax="-300">
            <FormattedMessage id="welcome" />
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Скоро в Кызылорде откроется первый региональный IT-парк, где
              талантливая молодежь сможет разрабатывать свои стартап-проекты
            </p>
          </div>
          <button className="button">
            <FormattedMessage id="click_here" />
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="intro-info">
          <div className="title" data-swiper-parallax="-300">
            It Park — место притяжения и развития информационных технологий
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Скоро в Кызылорде откроется первый региональный IT-парк, где
              талантливая молодежь сможет разрабатывать свои стартап-проекты
            </p>
          </div>
          <button className="button">Подробнее</button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
