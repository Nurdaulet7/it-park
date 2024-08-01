import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import logo from "../../images/logo-it-park.png.png";

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
            alt="itPARK logo"
            width="150"
            height="40"
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
            U
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
      <dialog
        className={cn("mobile-overlay ")}
        id="mobileOverlay"
        open={isDialogOpen}
      >
        <form
          action=""
          className="mobile-overlay__close-button-wrapper"
          method="dialog"
        >
          <button
            className="mobile-overlay__close-button cross-button"
            type="submit"
            onClick={handleCloseDialog}
          >
            <span className="visually-hidden">Close navigation menu</span>
          </button>
        </form>
        <div className="mobile-overlay__body">
          <ul className="mobile-overlay__list">
            <input
              type="text"
              className={cn("button input")}
              form="search"
              placeholder="Поиск по сайту"
            />
            <a
              href="/"
              className={cn(
                "button",
                "button--transparent",
                styles["header__button"]
              )}
            >
              Стать резидентом
            </a>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                Главная
              </a>
            </li>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                Проекты
              </a>
            </li>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                Мероприятия
              </a>
            </li>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                Новости
              </a>
            </li>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                Первый IT-Park в Кызылорде
              </a>
            </li>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                Партнеры
              </a>
            </li>
            <li className="mobile-overlay__item">
              <a href="/" className="mobile-overlay__link">
                О нас
              </a>
            </li>
          </ul>
        </div>
      </dialog>
    </header>
  );
};

export default Header;
