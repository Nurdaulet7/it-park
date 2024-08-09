import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacancies,
  selectVacancies,
  selectVacanciesError,
  selectVacanciesStatus,
} from "../../../redux/slices/vacanciesSlice";
import VacanciesCard from "./VacanciesCard";
import { scrollToTop } from "../../../utils/scrollToTop";
import { FormattedMessage } from "react-intl";

const VacanciesPage = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectVacancies);
  const status = useSelector(selectVacanciesStatus);
  const error = useSelector(selectVacanciesError);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    scrollToTop();
    if (status === "idle") {
      dispatch(fetchVacancies());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVacancies = vacancies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vacancies.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      console.log("Next");
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    console.log("Prev");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  return (
    <div className={`container`}>
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_vacancies" />
        </h2>
      </header>
      <div className="section__body">
        <div>
          <ul className="vacancies__list grid grid--1">
            {currentVacancies.map((vacancy, index) => (
              <VacanciesCard key={index} vacancy={vacancy} />
            ))}
          </ul>
        </div>
        <div className="pagination-controls">
          <button
            className="button button-pagination"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {`<`}
          </button>
          <span className="button button-pagination-counter">{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="button button-pagination"
          >
            {`>`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacanciesPage;
