import React from "react";
import EditEntity from "../profileComponents/EditEntity";

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
