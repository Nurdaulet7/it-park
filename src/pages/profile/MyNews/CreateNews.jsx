import React from "react";
import getCurrentDate from "../../../utils/getCurrentDate";
import CreateEntity from "../MyProfile/CreateEntity";
import {
  createProfileNews,
  fetchProfileNews,
} from "../../../redux/slices/profileNewsSlice";
import { fetchPublicNews } from "../../../redux/slices/publicNewsSlice";

const CreateNews = () => {
  const initialNewsData = {
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    desc_ru: "",
    desc_kk: "",
    file: null,
    date: getCurrentDate(),
    status: 1,
  };

  return (
    <CreateEntity
      createAction={createProfileNews}
      fetchPublicAction={fetchPublicNews}
      fetchProfileAction={fetchProfileNews}
      redirectPath={"/profile/news"}
      initialData={initialNewsData}
    />
  );
};

export default CreateNews;
