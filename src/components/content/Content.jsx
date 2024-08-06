import React from "react";
import { Routes, Route } from "react-router-dom";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";
import Carousel from "./swiper/Carousel";
import ThemeToggle from "../toggle/ThemeToggle";
import { Element } from "react-scroll";
import ResidentSection from "./residents/ResidentsSection";
import ResidentDetailsSection from "./residents/ResidentDetailsSection";

const MainContent = () => {
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
      {/* Другие секции */}
    </>
  );
};

const Content = () => {
  return (
    <main className={cn("layout", styles["main"])}>
      <ThemeToggle />
      <aside className={cn(styles["menu"])}>
        <Menu />
      </aside>
      <div className={cn(styles["content"])}>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/resident/:id" element={<ResidentDetailsSection />} />
        </Routes>
      </div>
    </main>
  );
};

export default Content;
