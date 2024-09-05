import React from "react";
import ProfileMenu from "../../components/aside-menu/ProfileMenu";
import { Route, Routes } from "react-router-dom";
import MyProfile from "./MyProfile/MyProfile";
import MyNews from "./MyNews/MyNews";
import { NotFound } from "../NotFound";

const UserProfile = () => {
  return (
    <div className="container">
      <div className="profile">
        <div className="profile__content">
          <Routes>
            <Route path="user" element={<MyProfile />} />
            <Route path="news" element={<MyNews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <aside className="profile__aside">
          <ProfileMenu />
        </aside>
      </div>
    </div>
  );
};

export default UserProfile;
