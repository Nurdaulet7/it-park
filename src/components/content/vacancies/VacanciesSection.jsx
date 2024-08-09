import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVacancies,
  selectVacanciesStatus,
  selectVacanciesError,
  fetchVacancies,
} from "../../../redux/slices/vacanciesSlice";
import { Element } from "react-scroll";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import VacanciesCard from "./VacanciesCard";

const VacanciesSection = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectVacancies);
  const status = useSelector(selectVacanciesStatus);
  const error = useSelector(selectVacanciesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVacancies());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Element
      name="section-vacancies"
      className={`section container section-vacancies`}
    >
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_vacancies" />
        </h2>
      </header>
      <div className="section__body">
        <div className="vacancy">
          <ul className="events__list grid grid--1">
            {vacancies.slice(0, 1).map((vacancy, index) => (
              //   <EventCard key={index} vacancy={vacancy} />
              <VacanciesCard key={index} vacancy={vacancy} />
            ))}
          </ul>
          <div className="view-all-button">
            <Link to="/vacancies" className="button">
              <FormattedMessage
                id="view_all_vacancies"
                defaultMessage="View All Vacancies"
              />
            </Link>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default VacanciesSection;