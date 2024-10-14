import React from "react";
import EditEntity from "../MyProfile/EditEntity";
import {
  editProfileNews,
  fetchProfileNews,
  selectCurrentProfileNews,
  selectProfileNewsError,
  selectProfileNewsFetchStatus,
  setCurrentProfileNews,
} from "../../../redux/slices/profileNewsSlice";
import { fetchPublicNews } from "../../../redux/slices/publicNewsSlice";

const EditNews = () => {
  const initialNewsData = {
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    desc_ru: "",
    desc_kk: "",
    file: null,
    date: "",
    status: 0,
  };

  return (
    <EditEntity
      redirectUrl="/profile/news"
      defaultData={initialNewsData}
      entityType="news"
    />
  );
};

export default EditNews;
