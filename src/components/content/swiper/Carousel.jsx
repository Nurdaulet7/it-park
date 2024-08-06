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
              <FormattedMessage id="it_park_info" />
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
            <FormattedMessage id="welcome" />
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              <FormattedMessage id="it_park_info" />
            </p>
          </div>
          <button className="button">
            <FormattedMessage id="click_here" />
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
