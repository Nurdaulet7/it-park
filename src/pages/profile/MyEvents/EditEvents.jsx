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
      fetchAction={fetchProfileEvents}
      selectCurrentItem={selectCurrentProfileEvent}
      selectFetchStatus={selectProfileEventsFetchStatus}
      selectError={selectProfileEventsError}
      setCurrentItem={setCurrentProfileEvent}
      editAction={editProfileEvent}
      fetchPublicAction={fetchPublicEvents}
      redirectUrl="/profile/events"
      defaultData={initialEventData}
    />
  );
};

export default EditEvents;
