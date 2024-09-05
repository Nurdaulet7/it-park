import React from "react";
import ProfileMenu from "../../components/aside-menu/ProfileMenu";
import ProfileContent from "./ProfileContent";

const UserProfile = () => {
  return (
    <div className="container detailed-info">
      <div className="detailed-info__body">
        <ProfileContent className="detailed-info__content" />
        <ProfileMenu className="detailed-info__aside" />
      </div>
    </div>
  );
};

export default UserProfile;
