import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";
import Carousel from "./swiper/Carousel";
import ThemeToggle from "../toggle/ThemeToggle";
import { scroller } from "react-scroll";
import ResidentSection from "./residents/ResidentsSection";
import ResidentDetailsSection from "./residents/ResidentDetailsSection";
import EventsSection from "./events/EventsSection";
import EventDetailsSection from "./events/EventDetailsSection";
import Events from "./events/Events";
import NewsSection from "./news/NewsSection";
import NewsPage from "./news/NewsPage";
import NewsDetailsSection from "./news/NewsDetailsSection";
import VacanciesSection from "./vacancies/VacanciesSection";
import VacanciesPage from "./vacancies/VacanciesPage";
import VacanciesDetailsSection from "./vacancies/VacanciesDetailsSection";
import ProjectsSection from "./projects/ProjectsSection";

const MainContent = ({ scrollToSection }) => {
  useEffect(() => {
    if (scrollToSection) {
      scroller.scrollTo(scrollToSection, {
        duration: 200,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -96, // Высота хедера
      });
    }
  }, [scrollToSection]);

  return (
    <>
      <Carousel />
      <ResidentSection />
      <EventsSection />
      <NewsSection />
      <VacanciesSection />
      <ProjectsSection />
    </>
  );
};

const Content = ({ scrollToSection, setScrollToSection }) => {
  return (
    <main className={cn("layout", styles["main"])}>
      <ThemeToggle />
      <aside className={cn(styles["menu"])}>
        <Menu setScrollToSection={setScrollToSection} />
      </aside>
      <div className={cn(styles["content"])}>
        <Routes>
          <Route
            path="/"
            element={<MainContent scrollToSection={scrollToSection} />}
          />
          <Route path="/resident/:id" element={<ResidentDetailsSection />} />
          <Route path="/events/:id" element={<EventDetailsSection />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailsSection />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacanciesDetailsSection />} />
        </Routes>
      </div>
    </main>
  );
};

export default Content;
