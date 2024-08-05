import React from "react";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";
import Carousel from "./swiper/Carousel";
import ThemeToggle from "../toggle/ThemeToggle";
import { Element } from "react-scroll";
import ResidentSection from "./residents/ResidentsSection";

const Content = () => {
  return (
    <main className={cn("layout", styles["main"])}>
      <ThemeToggle />
      <aside className={cn(styles["menu"])}>
        <Menu />
      </aside>
      <div className={cn(styles["content"])}>
        <Element name="section-home" className="section container section-home">
          <Carousel />
        </Element>
        <ResidentSection />
      </div>
    </main>
  );
};

export default Content;
