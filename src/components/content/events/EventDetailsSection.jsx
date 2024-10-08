import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import DetailedInfoPage from "../detail/DetailedInfoPage";
import SkeletonDetail from "../../skeleton/SkeletonDetail";
import {
  fetchPublicEvents,
  selectCurrentPublicEvent,
  selectPublicEventsError,
  selectPublicEventsFetchStatus,
  setCurrentPublicEvent,
} from "../../../redux/slices/publicEventsSlice";

const EventDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector(selectCurrentPublicEvent);
  const status = useSelector(selectPublicEventsFetchStatus);
  const error = useSelector(selectPublicEventsError);

  useEffect(() => {
    scrollToTop();
    if (status === "idle") {
      dispatch(fetchPublicEvents()).then(() => {
        dispatch(setCurrentPublicEvent(parseInt(id)));
      });
    } else {
      dispatch(setCurrentPublicEvent(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!event) return <p>No event data available</p>;

  return <DetailedInfoPage event={event} />;
};

export default EventDetailsSection;
