import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);

  const getUserDataFromToken = () => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const tokenParts = token.split(".");
      const payloadBase64 = tokenParts[1];
      const payloadDecoded = atob(payloadBase64);
      const payloadObject = JSON.parse(payloadDecoded);

      console.log(payloadObject);
      return payloadObject.user;
    }

    return null;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const user = getUserDataFromToken();
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
