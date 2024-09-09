import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");

    navigate("/");
  };

  return <button onClick={handleLogout}>Выйти</button>;
};

const menu_sections = [
  { id: "Мой профиль" },
  { id: "Мои новости" },
  { id: "Мои мероприятия" },
  { id: "Мои вакансии" },
  { id: "Мои проекты" },
  { id: "Электронный журнал" },
  { id: "Приемы" },
  { id: "Выйти с аккаунта" },
];
const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для управления видимостью меню

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Переключаем состояние видимости меню
  };

  return (
    <div className={"menu"}>
      <button
        className={cn("menu-toggle-btn", {
          "menu-toggle-btn--active": isMenuOpen,
        })}
        onClick={toggleMenu}
      >
        <CgMenuRightAlt />
      </button>
      <ul className={cn("menu__list")}>
        {menu_sections.map((section, index) => (
          <article
            className={cn(
              "menu__list-link",
              "button button--transparent button--transparent--menu"
            )}
          >
            <li key={index} className={cn("menu__list-item")}>
              <span className="menu__list-item-text">
                <FormattedMessage id={section.id} defaultMessage={section.id} />
              </span>
            </li>
          </article>
        ))}
        <LogoutButton />
      </ul>
    </div>
  );
};

export default ProfileMenu;
