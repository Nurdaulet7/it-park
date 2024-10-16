import React from "react";
import ProfileMenu from "../../components/aside-menu/ProfileMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import MyProfile from "./MyProfile/MyProfile";
import MyNews from "./MyNews/MyNews";
import { NotFound } from "../NotFound";
import EditNews from "./MyNews/EditNews";
import CreateNews from "./MyNews/CreateNews";
import EditProfile from "./MyProfile/EditProfile";
import MyEvents from "./MyEvents/MyEvents";
import EditEvents from "./MyEvents/EditEvents";
import CreateEvents from "./MyEvents/CreateEvents";
import EntityDetailsSection from "../../components/content/detail/EntityDetailsSection";
import MyVacancies from "./MyVacancies/MyVacancies";
import EditVacancies from "./MyVacancies/EditVacancies";
import VacanciesDetailsSection from "../../components/content/vacancies/VacanciesDetailsSection";
import CreateVacancies from "./MyVacancies/CreateVacancies";

const UserProfile = () => {
  const location = useLocation();
  const shouldShowAside =
    location.pathname !== "/profile/news/update" &&
    location.pathname !== "/profile/news/create" &&
    !/\/profile\/news\/\d+/.test(location.pathname) &&
    location.pathname !== "/profile/user/update";

  return (
    <div className="container">
      <div className="profile">
        <div
          className={shouldShowAside ? "profile__content" : "profile_editor"}
        >
          <Routes>
            <Route path="user" element={<MyProfile />} />
            <Route path="user/update" element={<EditProfile />} />
            <Route path="news" element={<MyNews />} />
            <Route path="news/update" element={<EditNews />} />
            <Route path="news/create" element={<CreateNews />} />
            <Route
              path="/news/:id"
              element={<EntityDetailsSection entityType={"news"} />}
            />
            <Route path="events" element={<MyEvents />} />
            <Route path="events/update" element={<EditEvents />} />
            <Route path="events/create" element={<CreateEvents />} />
            <Route
              path="/events/:id"
              element={<EntityDetailsSection entityType={"events"} />}
            />
            <Route path="vacancies" element={<MyVacancies />} />
            <Route
              path="/vacancies/:id"
              element={<VacanciesDetailsSection isProfile={true} />}
            />
            <Route path="vacancies/update" element={<EditVacancies />} />
            <Route path="vacancies/create" element={<CreateVacancies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {shouldShowAside && (
          <aside className="profile__aside">
            <ProfileMenu />
          </aside>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
