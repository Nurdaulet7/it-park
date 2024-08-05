import React from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import logo from "../../images/logo-it-park.png.png";
import { FaRegUser } from "react-icons/fa";

const Header = ({ onOpenDialog }) => {
  return (
    <header className={cn(styles["header"])}>
      <div className={cn(styles["header__inner"], "layout")}>
        <a href="/" className={cn(styles["header__logo"], "logo")}>
          <img
            src={logo}
            alt="itPARK logo"
            width="140"
            // height="40"
            loading="lazy"
          />
        </a>
        <div className={cn(styles["header__buttons"])}>
          <input
            type="text"
            form="search"
            placeholder="Поиск по сайту"
            className={cn("hidden-tablet", "button", "input")}
          />
          <a
            href="/"
            className={cn(
              "button",
              "button--transparent",
              styles["header__button"],
              "hidden-tablet"
            )}
          >
            Стать резидентом
          </a>
          <button
            className={cn(
              "button",
              "button--transparent",
              styles["header__button"]
            )}
          >
            RU
          </button>
          <button
            className={cn(
              "button",
              "button--transparent",
              styles["header__button"]
            )}
          >
            <FaRegUser />
          </button>
          <button
            className={cn(
              styles["button__burger-menu"],
              styles["burger-button"],
              "visible-tablet"
            )}
            type="button"
            onClick={onOpenDialog}
          >
            <span className="visually-hidden">Open navigation menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
