import React from "react";
import getCurrentDate from "../../../utils/getCurrentDate";
import CreateEntity from "../MyProfile/CreateEntity";

const CreateVacancies = () => {
  const initialVacancyData = {
    too_name: "",
    title_ru: "",
    title_kk: "",
    title_en: "",
    desc_ru: "",
    desc_kk: "",
    desc_en: "",
    type_work_ru: "",
    type_work_kk: "",
    type_work_en: "",
    type_zan_ru: "",
    type_zan_kk: "",
    type_zan_en: "",
    require_ru: "",
    require_kk: "",
    require_en: "",
    price: null,
    file: null,
    date: getCurrentDate(),
    status: 1,
  };

  return (
    <CreateEntity
      redirectPath={"/profile/vacancies"}
      initialData={initialVacancyData}
      entityType={"vacancies"}
    />
  );
};

export default CreateVacancies;
