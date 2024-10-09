import getCurrentDate from "../../../utils/getCurrentDate";
import CreateEntity from "../MyProfile/CreateEntity";
import {
  createProfileEvent,
  fetchProfileEvents,
} from "../../../redux/slices/profileEventSlice";
import { fetchPublicEvents } from "../../../redux/slices/publicEventsSlice";

const CreateEvent = () => {
  const initialEventData = {
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    location_ru: "",
    location_kk: "",
    file: null,
    date: getCurrentDate(),
    time: "",
    status: 1,
  };

  return (
    <CreateEntity
      createAction={createProfileEvent}
      fetchPublicAction={fetchPublicEvents}
      fetchProfileAction={fetchProfileEvents}
      redirectPath="/profile/events"
      initialData={initialEventData}
    />
  );
};

export default CreateEvent;
