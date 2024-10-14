import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import EventCard from "../../../components/content/events/EventCard";
import PaginationControls from "../../../components/pagination/PaginationControls";
import { fetchData, selectProfileData } from "../../../redux/slices/dataSlice";

const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: events,
    status,
    error,
  } = useSelector((state) => selectProfileData(state, "events"));

  const location = useLocation(); // Получите текущий путь

  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1; // Получите номер страницы из URL или установите 1 по умолчанию
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvent = events.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const retryFetch = () => {
    dispatch(fetchData({ entityType: "events", isProfile: true }));
  };

  useEffect(() => {
    scrollToTop();

    if (status.fetch === "idle") {
      retryFetch();
    }
  }, [dispatch, status.fetch]);

  if (status.fetch === "failed") {
    <ErrorDisplay errorMessage={error} retryAction={retryFetch} />;
  }

  return (
    <div className="my-news">
      <div className="my-news__uploader">
        <button
          className="upload-btn button"
          onClick={() => navigate("/profile/events/create")}
        >
          Опубликовать
        </button>
      </div>
      <div className="grid grid---3">
        {status.fetch === "loading"
          ? [...Array(6)].map((_, index) => (
              <EventCard key={index} forSkeleton />
            ))
          : currentEvent.map((item, index) => (
              <EventCard key={index} event={item} forProfile />
            ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        path="profile/events"
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default MyEvents;
