import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchEvents,
  selectEvents,
  selectEventsError,
  selectEventsStatus,
} from "../../../redux/slices/eventsSlice";
import { scrollToTop } from "../../../utils/scrollToTop";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import EventCard from "../../../components/content/events/EventCard";
import PaginationControls from "../../../components/pagination/PaginationControls";

const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);

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
    dispatch(fetchEvents());
  };

  useEffect(() => {
    scrollToTop();

    if (status === "idle") {
      retryFetch();
    }
  }, [dispatch, status]);

  if (status === "failed") {
    <ErrorDisplay errorMessage={error} retryAction={retryFetch} />;
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
      <div className="grid grid---3">
        {status === "loading"
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
