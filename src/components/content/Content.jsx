import React from "react";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";
import Carousel from "./swiper/Carousel";

const Content = () => {
  return (
    <main className={cn("layout", styles["main"])}>
      <aside className={cn(styles["menu"])}>
        <Menu />
      </aside>
      <div className={cn(styles["content"])}>
        <section className="section container">
          <Carousel />
        </section>
      </div>
    </main>
  );
};

export default Content;
