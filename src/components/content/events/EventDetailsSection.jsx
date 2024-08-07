import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchEvents,
  setCurrentEvent,
} from "../../../redux/slices/eventsSlice";
import { useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";

const EventDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.currentEvent);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents()).then(() => {
        dispatch(setCurrentEvent(parseInt(id)));
      });
    } else {
      dispatch(setCurrentEvent(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!event) return <p>No event data available</p>;

  return (
    <div className="section container">
      <header className="section__header">
        <h2 className="section__title">
          {getTranslatedContent(event, "title", locale)}
        </h2>
      </header>
      <div className="section__body">
        <p>{getTranslatedContent(event, "content", locale)}</p>
        <p>{getTranslatedContent(event, "location", locale)}</p>
        <img
          src={event?.image}
          alt={getTranslatedContent(event, "title", locale)}
        />
      </div>
    </div>
  );
};

export default EventDetailsSection;
