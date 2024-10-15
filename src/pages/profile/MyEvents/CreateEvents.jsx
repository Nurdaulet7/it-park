import getCurrentDate from "../../../utils/getCurrentDate";
import CreateEntity from "../MyProfile/CreateEntity";

const CreateEvents = () => {
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
      redirectPath={"/profile/events"}
      initialData={initialEventData}
      entityType={"events"}
    />
  );
};

export default CreateEvents;
