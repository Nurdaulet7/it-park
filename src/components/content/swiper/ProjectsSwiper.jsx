import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import styles from "./Projects.module.scss";

const ProjectsSwiper = () => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1280) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 1400) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    // Вызов при загрузке компонента
    handleResize();

    // Слушатель изменений размера окна
    window.addEventListener("resize", handleResize);

    // Удаление слушателя при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode, Autoplay]}
      className={styles["swiper"]}
      autoplay={{
        delay: 3000,
      }}
      speed={600}
    >
      <SwiperSlide className={styles["swiper-slide"]}>Slide 2</SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>Slide 3</SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>Slide 3</SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>Slide 2</SwiperSlide>
    </Swiper>
  );
};
export default ProjectsSwiper;
