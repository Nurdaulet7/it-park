import React from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import logo from "../../images/logo-it-park.png";
import { FaRegUser } from "react-icons/fa";
import LanguageSwitcher from "../lngSwitcher/LanguageSwitcher";
import { FormattedMessage } from "react-intl";

const Header = ({
  onOpenDialog,
  onOpenResidentForm,
  onOpenLoginForm,
  setLocale,
}) => {
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
          <FormattedMessage
            id="search_placeholder"
            defaultMessage="Поиск по сайту"
            children={(placeholder) => (
              <input
                type="text"
                form="search"
                placeholder={placeholder}
                className={cn("hidden-tablet", "button", "input")}
              />
            )}
          />
          <button
            onClick={onOpenResidentForm}
            className={cn(
              "button",
              "button--transparent",
              styles["header__button"],
              "hidden-tablet"
            )}
          >
            <FormattedMessage
              id="become_resident"
              defaultMessage="Стать резидентом"
            />
          </button>
          <LanguageSwitcher setLocale={setLocale} />
          <button
            onClick={onOpenLoginForm}
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
