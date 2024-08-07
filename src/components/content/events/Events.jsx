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

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

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
            {events.map((event, index) => (
              <EventCard key={index} event={event} locale={locale} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Events;
