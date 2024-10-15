import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import { useDispatch, useSelector } from "react-redux";
import PaginationControls from "../../../components/pagination/PaginationControls";
import { fetchData, selectProfileData } from "../../../redux/slices/dataSlice";
import VacanciesCard from "../../../components/content/vacancies/VacanciesCard";

const MyVacancies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: vacancies,
    status,
    error,
  } = useSelector((state) => selectProfileData(state, "vacancies"));

  const location = useLocation();

  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVacancyPage = Array.isArray(vacancies)
    ? vacancies.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(vacancies.length / itemsPerPage);

  const retryFetch = () => {
    dispatch(fetchData({ entityType: "vacancies", isProfile: true }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status.fetch === "idle") {
      retryFetch();
    }
  }, [dispatch, status.fetch]);

  if (status.fetch === "failed") {
    return (
      <ErrorDisplay
        errorMessage={error}
        // errorType={errorType}
        retryAction={retryFetch}
      />
    );
  }

  return (
    <div className="my-news">
      <div className="my-news__uploader">
        <button
          className="upload-btn button"
          onClick={() => navigate("/profile/news/create")}
        >
          Опубликовать
        </button>
      </div>
      <div className="grid grid---1">
        {status.fetch === "loading"
          ? [...Array(6)].map((_, index) => (
              <VacanciesCard key={index} forSkeleton={true} />
            ))
          : currentVacancyPage.map((item, index) => (
              <VacanciesCard key={index} vacancy={item} />
            ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        path="profile/news"
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default MyVacancies;
