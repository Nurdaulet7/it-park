import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./Carousel.module.scss";
import { FormattedMessage } from "react-intl";

// import required modules
import { Parallax, Pagination, Autoplay, Navigation } from "swiper/modules";
import { Element } from "react-scroll";
import classNames from "classnames";

const Carousel = () => {
  return (
    <Element
      name="section-home"
      className={classNames(
        "section container section-home",
        styles["swiper-slide"]
      )}
    >
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
        className={classNames(styles["mySwiper"], styles["swiper"])}
      >
        <div
          slot="container-start"
          className={styles["parallax-bg"]}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className={styles["intro-info"]}>
            <div className={styles["title"]} data-swiper-parallax="-300">
              <FormattedMessage id="welcome" />
            </div>
            <div className={styles["text"]} data-swiper-parallax="-100">
              <p>
                <FormattedMessage id="it_park_info" />
              </p>
            </div>
            <button className={styles["button"]}>
              <FormattedMessage id="click_here" />
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles["intro-info"]}>
            <div className={styles["title"]} data-swiper-parallax="-300">
              <FormattedMessage id="welcome" />
            </div>
            <div className={styles["text"]} data-swiper-parallax="-100">
              <p>
                <FormattedMessage id="it_park_info" />
              </p>
            </div>
            <button className={styles["button"]}>
              <FormattedMessage id="click_here" />
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </Element>
  );
};

export default Carousel;
