import React from "react";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";

const Content = () => {
  return (
    <main className={cn("layout", styles["main"])}>
      <aside className={cn(styles["menu"])}>
        <Menu />
      </aside>
      <div className="container"></div>
    </main>
  );
};

export default Content;
