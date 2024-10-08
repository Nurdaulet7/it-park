import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  editProfileEvent,
  fetchProfileEvents,
  selectCurrentProfileEvent,
  selectProfileEventsError,
  selectProfileEventsFetchStatus,
  setCurrentProfileEvent,
} from "../../../redux/slices/profileEventSlice";
import { scrollToTop } from "../../../utils/scrollToTop";
import { fetchPublicEvents } from "../../../redux/slices/publicEventsSlice";
import EditForm from "../profileComponents/EditForm";
import { toast } from "react-toastify";

const EditEvents = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentEvent = useSelector(selectCurrentProfileEvent);
  const fetchStatus = useSelector(selectProfileEventsFetchStatus);
  const error = useSelector(selectProfileEventsError);

  const [eventData, setEventData] = useState({
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
  });

  useEffect(() => {
    scrollToTop();

    if (fetchStatus === "idle") {
      dispatch(fetchProfileEvents()).then(() => {
        dispatch(setCurrentProfileEvent(parseInt(id)));
      });
    } else if (fetchStatus === "succeeded") {
      dispatch(setCurrentProfileEvent(parseInt(id)));
    }
  }, [id, fetchStatus, dispatch]);

  useEffect(() => {
    if (currentEvent) {
      setEventData({
        ...currentEvent,
        file: currentEvent.image || null,
      });
    }
  }, [currentEvent]);

  const handleChange = useCallback((name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      toast.error("Выберите изображение.");
      return;
    }

    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("Изображение не должно превышать 1MB.");
      return;
    }

    setEventData((prevData) => ({
      ...prevData,
      file: file,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const eventToUpdate = {
      ...eventData,
    };

    toast
      .promise(
        dispatch(editProfileEvent({ id, eventData: eventToUpdate })).unwrap(),
        {
          pending: "Изменение новости...",
          success: "Новость успешно изменена 👌",
          error: "Ошибка при изменении новости 🤯",
        }
      )
      .then(() => {
        dispatch(fetchProfileEvents());
        dispatch(fetchPublicEvents({ forceRefresh: true }));
        navigate("/profile/events");
      })
      .catch((err) => {
        console.log("Error during updating events", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const retryFetch = () => {
    dispatch(fetchProfileEvents()).then(() => {
      dispatch(setCurrentProfileEvent(parseInt(id)));
      error = dispatch(selectProfileEventsError);
    });
  };

  return (
    <EditForm
      data={eventData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      status={fetchStatus}
      error={error}
      retryFetch={retryFetch}
    />
  );
};

export default EditEvents;
