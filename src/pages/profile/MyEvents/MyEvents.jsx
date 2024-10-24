import React from "react";
import ListPage from "../profileComponents/ListPage";
import EventCard from "../../../components/content/events/EventCard";

const MyEvents = () => {
  return (
    <ListPage
      entityType="events"
      CardComponent={EventCard}
      path="profile/events"
      cardPropsName="event"
    />
  );
};

export default MyEvents;
