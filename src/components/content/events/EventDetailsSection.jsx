import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchEvents,
  setCurrentEvent,
} from "../../../redux/slices/eventsSlice";

import { scrollToTop } from "../../../utils/scrollToTop";
import DetailedInfoPage from "../detail/DetailedInfoPage";
import SkeletonDetail from "../../skeleton/SkeletonDetail";

const EventDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.currentEvent);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    scrollToTop();
    if (status === "idle") {
      dispatch(fetchEvents()).then(() => {
        dispatch(setCurrentEvent(parseInt(id)));
      });
    } else {
      dispatch(setCurrentEvent(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!event) return <p>No event data available</p>;

  return <DetailedInfoPage event={event} />;
};

export default EventDetailsSection;
