import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { RiMenuFold4Fill } from "react-icons/ri";

const menu_sections = [
  { id: "Мой профиль", url: "/profile/user" },
  { id: "Мои новости", url: "/profile/news" },
  { id: "Мои мероприятия", url: "/profile/events" },
  { id: "Мои вакансии", url: "/profile/vacancies" },
  { id: "Мои проекты", url: "/profile/projects" },
  { id: "Электронный журнал", url: "/profile/journal" },
  { id: "Приемы", url: "/profile/appointments" },
  { id: "Выйти с аккаунта", url: "/logout" },
];

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("tokenExpiration");

    navigate("/");
  };

  const handleSectionClick = (url) => {
    if (url === "/logout") {
      handleLogout();
    } else {
      navigate(url);
    }
  };

  return (
    <div className={cn("menu", { "menu--open": isMenuOpen })}>
      <button
        className={cn("menu-toggle-btn", {
          "menu-toggle-btn--active": isMenuOpen,
        })}
        onClick={toggleMenu}
      >
        {isMenuOpen ? <CgMenuRightAlt /> : <RiMenuFold4Fill />}
      </button>
      <ul className={cn("menu__list")}>
        {menu_sections.map((section, index) => (
          <li
            key={index}
            className={cn("menu__list-item-profile", {
              "menu__list-item-profile--active":
                location.pathname === section.url,
            })}
            onClick={() => handleSectionClick(section.url)}
          >
            <span className="menu__list-item-text">{section.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
