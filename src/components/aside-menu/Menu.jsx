import React from "react";
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
  { name: "Главная", icon: AiOutlineHome },
  { name: "Партнеры", icon: HiOutlineUserGroup },
  { name: "Мероприятия", icon: LuPartyPopper },
  { name: "Новости", icon: RiMegaphoneLine },
  { name: "Вакансии", icon: TbReportSearch },
  { name: "Проекты", icon: TbSettingsCog },
  { name: "Первый IT-Park", icon: TbRosetteNumber1 },
  { name: "О нас", icon: MdOutlineErrorOutline },
];

const Menu = () => {
  return (
    <ul className={cn(styles["menu__list"])}>
      {menu_sections.map((section, index) => {
        return (
          <li
            key={index}
            className={cn(
              styles["menu__list-item"],
              "button button--transparent button--transparent--menu"
            )}
          >
            <a href="/" className={cn(styles["menu__list-link"])}>
              <span className={cn(styles["menu__list-item-icon"])}>
                {<section.icon />}
              </span>
              <span className="menu__list-item-text">{section.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
