import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  selectEvents,
  selectEventsError,
  selectEventsStatus,
} from "../../../redux/slices/eventsSlice";
import EventCard from "./EventCard";
import { useState } from "react";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);
  const { locale } = useIntl();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`container`}>
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_events" />
        </h2>
      </header>
      <div className="section__body">
        <div className="events">
          <ul className="events__list grid grid--3">
            {currentEvents.map((event, index) => (
              <EventCard key={index} event={event} locale={locale} />
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

export default Events;
