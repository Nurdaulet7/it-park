import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import styles from "./Projects.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import {
  selectProjectsError,
  selectProjects,
  fetchProjects,
  selectProjectsStatus,
} from "../../../redux/slices/projectsSlice";
import { Link } from "react-router-dom";
import {
  fetchPartners,
  selectPartners,
  selectPartnersError,
  selectPartnersStatus,
} from "../../../redux/slices/partnersSlice";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";

const ProjectsSwiper = ({ isPartners = false }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const status = useSelector(selectProjectsStatus);
  const error = useSelector(selectProjectsError);

  const partners = useSelector(selectPartners);
  const partnersStatus = useSelector(selectPartnersStatus);
  const partnersError = useSelector(selectPartnersError);

  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle" || partners.length === 0) {
      dispatch(fetchProjects());
      dispatch(fetchPartners());
    }
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
  }, [status, dispatch]);

  if (isPartners) {
    if (partnersStatus === "loading") return <p>Loading...</p>;
    if (partnersStatus === "failed") return <p>Error: {partnersError}</p>;
  } else {
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
  }

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
      {isPartners
        ? partners.map((partner, index) => {
            return (
              <SwiperSlide key={index} className={styles["swiper-slide"]}>
                <a href={partner.link} className={styles["swiper-slide__item"]}>
                  <div className={styles["swiper-slide__item-img"]}>
                    <img
                      className={styles["img-second"]}
                      src={partner.image}
                      alt={partner.name}
                      loading="lazy"
                    />
                  </div>
                </a>
              </SwiperSlide>
            );
          })
        : projects.map((project, index) => {
            return (
              <SwiperSlide key={index} className={styles["swiper-slide"]}>
                <Link
                  to={`/projects/${project.id}`}
                  className={styles["swiper-slide__item"]}
                >
                  <div className={styles["swiper-slide__item-img"]}>
                    <img
                      src={project.image}
                      alt={project.title_en}
                      loading="lazy"
                    />
                  </div>
                  <p className={styles["swiper-slide__item-title"]}>
                    {getTranslatedContent(project, "title", locale)}
                  </p>
                </Link>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};
export default ProjectsSwiper;
