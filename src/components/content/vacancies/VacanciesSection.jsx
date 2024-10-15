import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "react-scroll";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import VacanciesCard from "./VacanciesCard";
import { fetchData, selectPublicData } from "../../../redux/slices/dataSlice";

const VacanciesSection = () => {
  const dispatch = useDispatch();
  const {
    data: vacancies,
    status,
    error,
  } = useSelector((state) => selectPublicData(state, "vacancies"));

  useEffect(() => {
    if (status.fetch === "idle") {
      dispatch(fetchData({ entityType: "vacancies" }));
    }
  }, [status.fetch, dispatch]);

  if (status.fetch === "loading") {
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
              {[...Array(1)].map((_, index) => (
                <VacanciesCard key={index} forSkeleton={true} />
              ))}
            </ul>
          </div>
        </div>
      </Element>
    );
  }

  if (status.fetch === "failed") return <p>Error: {error}</p>;

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
