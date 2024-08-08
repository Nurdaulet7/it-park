import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";
import Carousel from "./swiper/Carousel";
import ThemeToggle from "../toggle/ThemeToggle";
import { Element, scroller } from "react-scroll";
import ResidentSection from "./residents/ResidentsSection";
import ResidentDetailsSection from "./residents/ResidentDetailsSection";
import EventsSection from "./events/EventsSection";
import EventDetailsSection from "./events/EventDetailsSection";
import Events from "./events/Events";
import NewsSection from "./news/NewsSection";

const MainContent = ({ scrollToSection }) => {
  useEffect(() => {
    if (scrollToSection) {
      scroller.scrollTo(scrollToSection, {
        duration: 200,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -100, // Высота хедера
      });
    }
  }, [scrollToSection]);

  return (
    <>
      <Element name="section-home" className="section container section-home">
        <Carousel />
      </Element>
      <Element
        name="section-partners"
        className="section container section-partners"
      >
        <ResidentSection />
      </Element>
      <Element
        name="section-events"
        className="section container section-events"
      >
        <EventsSection />
      </Element>
      <Element name="section-news" className="section container section-news">
        <NewsSection />
      </Element>
      {/* Другие секции */}
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
        </Routes>
      </div>
    </main>
  );
};

export default Content;
