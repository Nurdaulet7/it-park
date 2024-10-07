import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditForm from "../profileComponents/EditForm";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createProfileNews,
  fetchProfileNews,
} from "../../../redux/slices/profileNewsSlice";
import { fetchPublicNews } from "../../../redux/slices/publicNewsSlice";

const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

const CreateNews = () => {
  const [newsData, setNewsData] = useState({
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    desc_ru: "",
    desc_kk: "",
    file: null,
    date: getCurrentDate(),
    status: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = useCallback((name, value) => {
    setNewsData((prevData) => ({
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

    setNewsData((prevData) => ({
      ...prevData,
      file: file,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast
      .promise(dispatch(createProfileNews(newsData)).unwrap(), {
        pending: "Создание новости...",
        success: "Новость успешно создана 👌",
        error: "Ошибка при создании новости 🤯",
      })
      .then(() => {
        dispatch(fetchPublicNews({ forceRefresh: true }));
        dispatch(fetchProfileNews());
        navigate("/profile/news");
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
      data={newsData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      forCreateNews
    />
  );
};

export default CreateNews;
