import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
import { createNews } from "../../../redux/slices/newsSlice";
import { useDispatch } from "react-redux";

const CreateNews = () => {
  const [newsData, setNewsData] = useState({
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    desc_ru: "",
    desc_kk: "",
    file: null,
    date: "",
    status: 0,
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
    dispatch(createNews(newsData))
      .unwrap()
      .then(() => {
        navigate("/profile/news");
      })
      .catch((err) => {
        console.error("Ошибка при создании новости", err);
      });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("jwtToken");

  //   const formData = new FormData();
  //   formData.append("title_ru", newsData.title_ru);
  //   formData.append("title_kk", newsData.title_kk);
  //   formData.append("content_ru", newsData.content_ru);
  //   formData.append("content_kk", newsData.content_kk);
  //   formData.append("desc_ru", newsData.desc_ru);
  //   formData.append("desc_kk", newsData.desc_kk);
  //   formData.append("date", newsData.date);
  //   formData.append("status", newsData.status);

  //   if (newsData.image) {
  //     formData.append("image", newsData.image);
  //   }
  //   formData.append("token", token);

  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }

  //   try {
  //     await axios.post(`https://it-park.kz/kk/api/create?table=news`, formData);
  //     navigate("/profile/news");
  //   } catch (err) {
  //     console.error("Ошибка при создании новости", err);
  //   }
  // };

  return (
    <EditForm
      data={newsData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateNews;
