// EventCard.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import Skeleton from "@mui/material/Skeleton";
import EditButton from "../../../pages/profile/ActionButtons/EditButton";
import DeleteButton from "../../../pages/profile/ActionButtons/DeleteButton";

const EventCard = (props) => {
  const { event, forAside = false, forProfile = false } = props;
  const { locale } = useIntl();
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/profile/events/update?id=${event.id}`);
  };

  if (!event) {
    return (
      <li className="events__item">
        <article className={`${forAside ? "event-card-aside" : ""} event-card`}>
          <Skeleton variant="text" width="20%" height={30} />
          <Skeleton variant="text" width="80%" height={80} />
          <Skeleton variant="text" width="30%" height={45} />
        </article>
      </li>
    );
  }

  return (
    <li className="events__item">
      {forProfile && (
        <div className="action-buttons action-buttons-event">
          <EditButton onClick={handleEditClick} />
          <DeleteButton entityId={event.id} entityType="events" />
        </div>
      )}
      <article
        className={`${forAside ? "event-card-aside" : ""} event-card`}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${event.image}) center/cover no-repeat`,
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
        <Link
          to={
            forProfile ? `/profile/events/${event.id}` : `/events/${event.id}`
          }
          className="button button-event"
        >
          <FormattedMessage id="more_details" defaultMessage={"Подробнее"} />
        </Link>
      </article>
    </li>
  );
};

export default EventCard;
