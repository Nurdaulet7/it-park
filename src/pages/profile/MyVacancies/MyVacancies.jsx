import React from "react";
import ListPage from "../MyProfile/ListPage";
import VacanciesCard from "../../../components/content/vacancies/VacanciesCard";

const MyVacancies = () => {
  return (
    <ListPage
      entityType="vacancies"
      CardComponent={VacanciesCard}
      path="profile/vacancies"
      cardPropsName="vacancy"
      gridColumnsCount={1}
    />
  );
};

export default MyVacancies;
