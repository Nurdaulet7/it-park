import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchEvents,
  selectEvents,
  selectEventsError,
  selectEventsStatus,
} from "../../../redux/slices/eventsSlice";
import { scrollToTop } from "../../../utils/scrollToTop";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import EventCard from "../../../components/content/events/EventCard";

const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);

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
          : events.map((item, index) => (
              <EventCard key={index} event={item} forProfile />
            ))}
      </div>
    </div>
  );
};

export default MyEvents;
