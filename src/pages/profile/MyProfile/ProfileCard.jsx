import React from "react";
import EditButton from "../ActionButtons/EditButton";
import { useNavigate } from "react-router-dom";

const ProfileCard = (props) => {
  const { userData } = props;

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/profile/user/update`, { state: { user: userData } }); // Передаем данные пользователя
  };

  return (
    <div className="profile-card">
      <div className="profile-card__body">
        <div className="profile-image">
          <img
            src={
              userData?.image ||
              "https://static.vecteezy.com/system/resources/previews/026/434/417/original/default-avatar-profile-icon-of-social-media-user-photo-vector.jpg"
            }
            alt="Profile"
          />
          <p>
            <strong>{userData.name}</strong>
          </p>
        </div>
        <div className="profile-content">
          <div className="profile-content__text">
            <p>
              <strong>Телефон:</strong> {userData.phone}
            </p>
            <p>
              <strong>Электронная:</strong> {userData.email}
            </p>
            <p>
              <strong>БИН:</strong> {userData.iin}
            </p>
            <p>
              <strong>Резидент:</strong> {userData.education_name}
            </p>
          </div>
          <div className="profile-content__bottom action-buttons">
            <EditButton onClick={handleEditClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
