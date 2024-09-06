import React from "react";
import { FormattedMessage } from "react-intl";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className={"menu"}>
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

// import React, { useState } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import { FormattedMessage } from "react-intl";
// import cn from "classnames";
// import styles from "../content/Content.module.scss";
// import { AiOutlineHome } from "react-icons/ai";
// import { HiOutlineUserGroup } from "react-icons/hi2";
// import { LuPartyPopper } from "react-icons/lu";
// import { RiMegaphoneLine } from "react-icons/ri";
// import {
//   TbReportSearch,
//   TbSettingsCog,
//   TbRosetteNumber1,
// } from "react-icons/tb";
// import { MdOutlineErrorOutline } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// const menu_sectionss = [
//   { id: "home", icon: AiOutlineHome, to: "section-home", isInternal: true },
//   {
//     id: "residents",
//     icon: HiOutlineUserGroup,
//     to: "section-residents",
//     isInternal: true,
//   },
//   { id: "events", icon: LuPartyPopper, to: "section-events", isInternal: true },
//   { id: "news", icon: RiMegaphoneLine, to: "section-news", isInternal: true },
//   {
//     id: "vacancies",
//     icon: TbReportSearch,
//     to: "section-vacancies",
//     isInternal: true,
//   },
//   {
//     id: "projects",
//     icon: TbSettingsCog,
//     to: "section-projects",
//     isInternal: true,
//   },
//   // {
//   //   id: "partners",
//   //   icon: FaRegHandshake,
//   //   to: "section-partners",
//   //   isInternal: true,
//   // },
//   {
//     id: "first_it_park",
//     icon: TbRosetteNumber1,
//     to: "/first_it_park",
//     isInternal: false,
//   },
//   {
//     id: "about_us",
//     icon: MdOutlineErrorOutline,
//     to: "/about_us",
//     isInternal: false,
//   },
// ;

// const Menu = ({ setScrollToSection, onMenuItemClick, onOpenResidentForm }) => {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection = useState(null);
//   const [homePath, setCurrentPath = useState(null);
//   const [searchTerm, setSearchTerm = useState("");

//   const handleNavigation = (path, isExternal, sectionId) => {
//     setSearchTerm("");
//     setCurrentPath(!isExternal);
//     if (isExternal) {
//       setActiveSection(sectionId);
//       navigate(path);
//     } else {
//       setScrollToSection(path);
//       navigate("/");
//     }

//     if (onMenuItemClick) {
//       onMenuItemClick();
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSearch();
//     }
//   };

//   const handleSearch = () => {
//     if (searchTerm) {
//       onMenuItemClick();
//       navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
//     } else {
//       navigate("");
//     }
//   };

//   return (
//     <ul className={cn("menu__list")}>
//       <FormattedMessage
//         id="search_placeholder"
//         defaultMessage="Поиск по сайту"
//         children={(placeholder) => (
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={handleKeyDown} // Отслеживание нажатия клавиши "Enter"
//             placeholder={placeholder}
//             className={cn("button", "input", "visible-tablet")}
//           />
//         )}
//       />
//       <button
//         onClick={onOpenResidentForm}
//         className={cn(
//           "button button--tablet-button",
//           "tablet-button",
//           "visible-tablet"
//         )}
//       >
//         <FormattedMessage
//           id="become_resident"
//           defaultMessage="Стать резидентом"
//         />
//       </button>
//       {menu_sections.map((section, index) => (
//         <li key={index} className={cn("menu__list-item")}>
//           <ScrollLink
//             onClick={() =>
//               handleNavigation(section.to, !section.isInternal, section.id)
//             }
//             activeClass={
//               homePath || activeSection === null ? "active" : ""
//             }
//             to={section.to}
//             spy={true}
//             smooth={true}
//             offset={-96} // Высота хедера
//             duration={100}
//             className={cn(
//               "menu__list-link",
//               "button button--transparent button--transparent--menu",
//               homePath ? "" : activeSection === section.id && "active"
//             )}
//           >
//             <span className={cn("menu__list-item-icon")}>
//               {<section.icon />}
//             </span>
//             <span className="menu__list-item-text">
//               <FormattedMessage id={section.id} defaultMessage={section.id} />
//             </span>
//           </ScrollLink>
//         </li>
//       ))}
//     </ul>
//   );
// };
