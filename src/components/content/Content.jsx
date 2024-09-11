import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import BackToTop from "../toggle/BackToTop";
import ProjectDetailsPage from "./projects/ProjectDetailsPage";
import FirstItPark from "../../pages/FirstItPark";
import AboutUs from "../../pages/AboutUs";
import { NotFound } from "../../pages/NotFound";
import SearchResults from "./search/SearchResults";
import UserProfile from "../../pages/profile/UserProfile";
import PrivateRoute from "./route/PrivateRoute";

const MainContent = ({ scrollToSection }) => {
  useEffect(() => {
    if (scrollToSection) {
      scroller.scrollTo(scrollToSection, {
        duration: 100,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -95.5, // Высота хедера
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

const Content = (props) => {
  const { scrollToSection, setScrollToSection } = props;

  return (
    <main className={cn("layout", styles["main"])}>
      <ThemeToggle />
      <BackToTop />
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
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/first_it_park" element={<FirstItPark />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/search" element={<SearchResults />} />

          <Route
            path="/profile/*"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  );
};

export default Content;
