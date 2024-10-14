import React from "react";
import getCurrentDate from "../../../utils/getCurrentDate";
import CreateEntity from "../MyProfile/CreateEntity";

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
      redirectPath={"/profile/news"}
      initialData={initialNewsData}
      entityType={"news"}
    />
  );
};

export default CreateNews;
