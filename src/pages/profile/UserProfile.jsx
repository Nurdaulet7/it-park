import React from "react";
import ProfileMenu from "../../components/aside-menu/ProfileMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import MyProfile from "./MyProfile/MyProfile";
import MyNews from "./MyNews/MyNews";
import { NotFound } from "../NotFound";
import EditNews from "../../components/content/news/EditNews";

const UserProfile = () => {
  const location = useLocation();
  const shouldShowAside = location.pathname !== "/profile/news/update";

  return (
    <div className="container">
      <div className={shouldShowAside ? "profile" : ""}>
        <div className="profile__content">
          <Routes>
            <Route path="user" element={<MyProfile />} />
            <Route path="news" element={<MyNews />} />
            <Route path="news/update" element={<EditNews />} />
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
