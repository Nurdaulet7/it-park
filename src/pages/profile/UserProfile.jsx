import React from "react";
import ProfileMenu from "../../components/aside-menu/ProfileMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import MyProfile from "./MyProfile/MyProfile";
import MyNews from "./MyNews/MyNews";
import { NotFound } from "../NotFound";
import EditNews from "./MyNews/EditNews";
import CreateNews from "./MyNews/CreateNews";
import NewsDetailsSection from "../../components/content/news/NewsDetailsSection";
import EditProfile from "./MyProfile/EditProfile";
import MyEvents from "./MyEvents/MyEvents";

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
              element={<NewsDetailsSection isProfileNews />}
            />
            <Route path="events" element={<MyEvents />} />
            <Route path="events/update" element={<EditNews />} />
            <Route path="events/create" element={<CreateNews />} />
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
