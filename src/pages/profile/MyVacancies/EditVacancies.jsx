import React from "react";
import EditEntity from "../profileComponents/EditEntity";

const EditVacancies = () => {
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
    date: "",
    status: 0,
  };

  return (
    <EditEntity
      redirectUrl="/profile/vacancies"
      defaultData={initialVacancyData}
      entityType="vacancies"
    />
  );
};

export default EditVacancies;
