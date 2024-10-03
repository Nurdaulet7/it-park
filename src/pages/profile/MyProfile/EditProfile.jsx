import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";

const EditProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || {});

  const [profileData, setProfileData] = useState({
    bin: "",
    education: null,
    education_name: null,
    email: "",
    id: "",
    iin: null,
    image: "",
    login: "",
    name: "",
    phone: "",
    resident: "",
  });

  useEffect(() => {
    scrollToTop();

    if (user) {
      setProfileData({ ...user });
    }
  }, [user]);

  return (
    <div>
      <p>{profileData.name}</p>
      <p>{profileData.id}</p>
      <img
        src={profileData.image}
        alt="profile image"
        style={{ width: "300px" }}
      />
    </div>
  );
};

export default EditProfile;
