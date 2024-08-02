import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import logo from "../../images/logo-it-park.png.png";
import Menu from "../aside-menu/Menu";
import Dialog from "../dialog-menu/Dialog";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <header className={cn(styles["header"])}>
      <div className={cn(styles["header__inner"], "layout")}>
        <a href="/" className={cn(styles["header__logo"], "logo")}>
          <img
            src={logo}
            // src="https://it-park.kz/uploads/settings/1.png"
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
            onClick={handleOpenDialog}
          >
            <span className="visually-hidden">Open navigation menu</span>
          </button>
        </div>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <Menu />
      </Dialog>
    </header>
  );
};

export default Header;
