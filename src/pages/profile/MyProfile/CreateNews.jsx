import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
import { createNews } from "../../../redux/slices/newsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewsData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast
      .promise(dispatch(createNews(newsData)).unwrap(), {
        pending: "Создание новости...",
        success: "Новость успешно создана 👌",
        error: "Ошибка при создании новости 🤯",
      })
      .then(() => {
        navigate("/profile/news");
      })
      .catch((err) => {
        console.error("Ошибка при создании новости", err);
      });
  };

  return (
    <EditForm
      data={newsData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      forCreateNews
    />
  );
};

export default CreateNews;
