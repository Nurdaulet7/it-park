import React from "react";
import { fetchPublicEvents } from "../../../redux/slices/publicEventsSlice";
import EditEntity from "../MyProfile/EditEntity";
import {
  editProfileEvent,
  fetchProfileEvents,
  selectCurrentProfileEvent,
  selectProfileEventsError,
  selectProfileEventsFetchStatus,
  setCurrentProfileEvent,
} from "../../../redux/slices/profileEventSlice";

const EditEvents = () => {
  const initialEventData = {
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    location_ru: "",
    location_kk: "",
    file: null,
    date: "",
    time: "",
    status: 0,
  };

  return (
    <EditEntity
      redirectUrl="/profile/events"
      defaultData={initialEventData}
      entityType="events"
    />
  );
};

export default EditEvents;
