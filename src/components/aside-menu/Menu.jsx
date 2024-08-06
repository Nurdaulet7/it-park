import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { FormattedMessage } from "react-intl";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuPartyPopper } from "react-icons/lu";
import { RiMegaphoneLine } from "react-icons/ri";
import {
  TbReportSearch,
  TbSettingsCog,
  TbRosetteNumber1,
} from "react-icons/tb";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const menu_sections = [
  { id: "home", icon: AiOutlineHome, to: "section-home", isInternal: true },
  {
    id: "partners",
    icon: HiOutlineUserGroup,
    to: "section-partners",
    isInternal: true,
  },
  { id: "events", icon: LuPartyPopper, to: "section-events", isInternal: true },
  { id: "news", icon: RiMegaphoneLine, to: "section-news", isInternal: true },
  {
    id: "vacancies",
    icon: TbReportSearch,
    to: "section-vacancies",
    isInternal: true,
  },
  {
    id: "projects",
    icon: TbSettingsCog,
    to: "section-projects",
    isInternal: true,
  },
  {
    id: "first_it_park",
    icon: TbRosetteNumber1,
    to: "section-first",
    isInternal: false,
  },
  {
    id: "about_us",
    icon: MdOutlineErrorOutline,
    to: "section-about",
    isInternal: false,
  },
];

const Menu = ({ setScrollToSection }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, isExternal) => {
    if (isExternal) {
      navigate(path);
    } else {
      setScrollToSection(path);
      navigate("/");
    }
  };

  return (
    <ul className={cn(styles["menu__list"])}>
      <FormattedMessage
        id="search_placeholder"
        defaultMessage="Поиск по сайту"
        children={(placeholder) => (
          <input
            type="text"
            className={cn("button input visible-tablet")}
            form="search"
            placeholder={placeholder}
          />
        )}
      />
      <a
        href="/"
        className={cn(
          "button button--tablet-button",
          styles["tablet-button"],
          "visible-tablet"
        )}
      >
        <FormattedMessage
          id="become_resident"
          defaultMessage="Стать резидентом"
        />
      </a>
      {menu_sections.map((section, index) => (
        <li key={index} className={cn(styles["menu__list-item"])}>
          <ScrollLink
            onClick={() => handleNavigation(section.to, !section.isInternal)}
            activeClass={styles["active"]}
            to={section.to}
            spy={true}
            smooth={true}
            offset={-100} // Высота хедера
            duration={200}
            className={cn(
              styles["menu__list-link"],
              "button button--transparent button--transparent--menu"
            )}
          >
            <span className={cn(styles["menu__list-item-icon"])}>
              {<section.icon />}
            </span>
            <span className="menu__list-item-text">
              <FormattedMessage id={section.id} defaultMessage={section.id} />
            </span>
          </ScrollLink>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
