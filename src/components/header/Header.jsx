import React from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import logo from "../../images/logo-it-park.png.png";
import { type } from "@testing-library/user-event/dist/type";

const Header = () => {
  return <header className={cn(styles["header"])}></header>;
};

export default Header;
