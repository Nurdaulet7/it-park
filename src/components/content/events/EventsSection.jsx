import React, { useEffect } from "react";
import { FormattedMessage, useIntl, FormattedDate } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import {
  fetchPublicEvents,
  selectPublicEvents,
  selectPublicEventsError,
  selectPublicEventsFetchStatus,
} from "../../../redux/slices/publicEventsSlice";

const EventsSection = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectPublicEvents);
  const status = useSelector(selectPublicEventsFetchStatus);
  const error = useSelector(selectPublicEventsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPublicEvents());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <Element
        name="section-events"
        className="section container section-events"
      >
        <header className="section__header">
          <h2 className="section__title">
            <FormattedMessage id="our_events" />
          </h2>
        </header>
        <div className="section__body">
          <div className="events">
            <ul className="events__list grid grid---2">
              {[...Array(2)].map((_, index) => (
                <EventCard key={index} />
              ))}
            </ul>
          </div>
        </div>
      </Element>
    );
  }

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Element name="section-events" className="section container section-events">
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_events" />
        </h2>
      </header>
      <div className="section__body">
        <div className="events">
          <ul className="events__list grid grid---2">
            {events.slice(0, 2).map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </ul>
          <div className="view-all-button">
            <Link to="/events" className="button">
              <FormattedMessage
                id="view_all_events"
                defaultMessage="View All Events"
              />
            </Link>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default EventsSection;
