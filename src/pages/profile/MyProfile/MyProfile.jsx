import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../redux/slices/authSlice";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const user = useSelector(selectAuthUser);
  console.log("User data", userData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (user) {
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return <div>Загрузка данных пользователя...</div>;
  }

  return <ProfileCard userData={userData} />;
};

export default MyProfile;
