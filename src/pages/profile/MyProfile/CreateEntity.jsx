import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditForm from "../profileComponents/EditForm";

const CreateEntity = ({
  createAction,
  fetchPublicAction,
  fetchProfileAction,
  redirectPath,
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = useCallback((name, value) => {
    setData((prevData) => ({
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

    setData((prevData) => ({
      ...prevData,
      file: file,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast
      .promise(dispatch(createAction(data)).unwrap(), {
        pending: "Создание...",
        success: "Успешно создано 👌",
        error: "Ошибка при создании 🤯",
      })
      .then(() => {
        dispatch(fetchPublicAction({ forceRefresh: true }));
        dispatch(fetchProfileAction());
        navigate(redirectPath);
      })
      .catch((err) => {
        console.error("Ошибка при создании", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <EditForm
      data={data}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default CreateEntity;
