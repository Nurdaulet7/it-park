import React from "react";
import { Link } from "react-scroll";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuPartyPopper } from "react-icons/lu";
import { RiMegaphoneLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { TbSettingsCog } from "react-icons/tb";
import { TbRosetteNumber1 } from "react-icons/tb";
import { MdOutlineErrorOutline } from "react-icons/md";

const menu_sections = [
  { name: "Главная", icon: AiOutlineHome, to: "section-home" },
  { name: "Партнеры", icon: HiOutlineUserGroup, to: "section-partners" },
  { name: "Мероприятия", icon: LuPartyPopper, to: "section-events" },
  { name: "Новости", icon: RiMegaphoneLine, to: "section-news" },
  { name: "Вакансии", icon: TbReportSearch, to: "section-vacancies" },
  { name: "Проекты", icon: TbSettingsCog, to: "section-projects" },
  { name: "Первый IT-Park", icon: TbRosetteNumber1, to: "section-first" },
  { name: "О нас", icon: MdOutlineErrorOutline, to: "section-about" },
];

const Menu = () => {
  return (
    <ul className={cn(styles["menu__list"])}>
      <input
        type="text"
        className={cn("button input visible-tablet")}
        form="search"
        placeholder="Поиск по сайту"
      />
      <a
        href="/"
        className={cn(
          "button button--tablet-button",
          styles["tablet-button"],
          "visible-tablet"
        )}
      >
        Стать резидентом
      </a>
      {menu_sections.map((section, index) => {
        return (
          <li
            key={index}
            className={cn(
              styles["menu__list-item"],
              "button button--transparent button--transparent--menu"
            )}
          >
            <Link
              activeClass={styles["active"]}
              to={section.to}
              spy={true}
              smooth={true}
              offset={-100} // Высота хедера
              duration={200}
              className={cn(styles["menu__list-link"])}
            >
              <span className={cn(styles["menu__list-item-icon"])}>
                {<section.icon />}
              </span>
              <span className="menu__list-item-text">{section.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
