// EventCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";

const EventCard = ({ event, forAside = false }) => {
  const { locale } = useIntl();

  return (
    <li className="events__item">
      <article
        className={`${forAside ? "event-card-aside" : ""} event-card`}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url(${event.image}) center/cover no-repeat`,
        }}
      >
        <p>
          <FormattedDate
            value={new Date(event.date)}
            defaultMessage={event.date}
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        </p>
        <h3>{getTranslatedContent(event, "title", locale)}</h3>
        <Link to={`/events/${event.id}`} className="button button-event">
          <FormattedMessage id="more_details" defaultMessage={"Подробнее"} />
        </Link>
      </article>
    </li>
  );
};

export default EventCard;
