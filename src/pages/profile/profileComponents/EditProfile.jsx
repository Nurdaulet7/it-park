import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import EditForm from "../profileComponents/EditForm";
import { toast } from "react-toastify";
import { selectProfileNewsError } from "../../../redux/slices/profileNewsSlice";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const error = useSelector(selectProfileNewsError);
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

  const handleChange = useCallback((name, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      toast.error("Выберите изображение.");
      return;
    }

    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("Изображение не должно превышать 1MB.");
      return;
    }

    setProfileData((prevData) => ({
      ...prevData,
      file: file,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileDataToUpdate = {
      ...profileData,
    };

    console.log(profileDataToUpdate);
  };

  return (
    <EditForm
      data={profileData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      status={"succeeded"}
      error={error}
      retryFetch={() => 1 + 1}
    />
    // <div>
    //   <p>{profileData.name}</p>
    //   <p>{profileData.id}</p>
    //   <img
    //     src={profileData.image}
    //     alt="profile image"
    //     style={{ width: "300px" }}
    //   />
    // </div>
  );
};

export default EditProfile;
