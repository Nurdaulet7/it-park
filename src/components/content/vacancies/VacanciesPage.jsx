import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VacanciesCard from "./VacanciesCard";
import { scrollToTop } from "../../../utils/scrollToTop";
import { FormattedMessage } from "react-intl";
import { fetchData, selectPublicData } from "../../../redux/slices/dataSlice";
import PaginationControls from "../../pagination/PaginationControls";

const VacanciesPage = () => {
  const dispatch = useDispatch();
  const {
    data: vacancies,
    status,
    error,
  } = useSelector((state) => selectPublicData(state, "vacancies"));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    scrollToTop();
    if (status.fetch === "idle") {
      dispatch(fetchData({ entityType: "vacancies" }));
    }
  }, [status.fetch, dispatch]);

  if (status.fetch === "loading") {
    return (
      <div>
        <header className="section__header">
          <h2 className="section__title">
            <FormattedMessage id="our_vacancies" />
          </h2>
        </header>
        <div className="section__body">
          <div className="vacancy">
            <ul className="events__list grid grid--1">
              {[...Array(2)].map((_, index) => (
                <VacanciesCard key={index} forSkeleton={true} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (status.fetch === "failed") return <p>Error: {error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVacancies = vacancies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vacancies.length / itemsPerPage);

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
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          path="news"
          itemsPerPage={itemsPerPage}
          dataLength={vacancies.length}
        />
      </div>
    </div>
  );
};

export default VacanciesPage;
