import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import logo from "../../images/logo-it-park.png";
import { FaRegUser } from "react-icons/fa";
import LanguageSwitcher from "../lngSwitcher/LanguageSwitcher";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const Header = (props) => {
  const { onOpenDialog, onOpenResidentForm, onOpenLoginForm, setLocale } =
    props;
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleUserClick = async () => {
    const token = checkTokenExpiration();
    if (token) {
      navigate("/profile/user");
    } else {
      onOpenLoginForm();
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      navigate("");
    }
  };

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
                value={searchTerm}
                onChange={handleSearch}
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
            onClick={handleUserClick}
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
