import React, { useCallback, useState } from "react";
import getCurrentDate from "../../../utils/getCurrentDate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createProfileEvent,
  fetchProfileEvents,
} from "../../../redux/slices/profileEventSlice";
import { fetchPublicEvents } from "../../../redux/slices/publicEventsSlice";
import EditForm from "../profileComponents/EditForm";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast
      .promise(dispatch(createProfileEvent(eventData)).unwrap(), {
        pending: "Создание новости...",
        success: "Новость успешно создана 👌",
        error: "Ошибка при создании новости 🤯",
      })
      .then(() => {
        dispatch(fetchPublicEvents({ forceRefresh: true }));
        dispatch(fetchProfileEvents());
        navigate("/profile/events");
      })
      .catch((err) => {
        console.error("Ошибка при создании новости", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <EditForm
      data={eventData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      forCreateNews
    />
  );
};

export default CreateEvent;
