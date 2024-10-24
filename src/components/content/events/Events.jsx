import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "./EventCard";
import { useState } from "react";
import { scrollToTop } from "../../../utils/scrollToTop";
import PaginationControls from "../../pagination/PaginationControls";
import { useLocation } from "react-router-dom";
import { fetchData, selectPublicData } from "../../../redux/slices/dataSlice";

const Events = () => {
  const dispatch = useDispatch();
  const {
    data: events,
    status,
    error,
  } = useSelector((state) => selectPublicData(state, "events"));
  const { locale } = useIntl();
  const location = useLocation();

  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    scrollToTop();
    if (status.fetch === "idle") {
      dispatch(fetchData({ entityType: "events" }));
    }
  }, [status.fetch, dispatch]);

  if (status.fetch === "loading") {
    return (
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">
            <FormattedMessage id="our_events" />
          </h2>
        </header>
        <div className="section__body">
          <div className="events">
            <ul className="events__list grid grid--3">
              {[...Array(itemsPerPage)].map((_, index) => (
                <EventCard key={index} forSkeleton />
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
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(events.length / itemsPerPage);

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
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          path="events"
          itemsPerPage={itemsPerPage}
          dataLength={events.length}
        />
      </div>
    </div>
  );
};

export default Events;
