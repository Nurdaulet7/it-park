import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import axios from "axios";
import EditForm from "./EditForm";
import { useDispatch } from "react-redux";
import { editNews } from "../../../redux/slices/newsSlice";
import { toast } from "react-toastify";

const EditNews = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    scrollToTop();
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://it-park.kz/kk/api/news/${id}`
        );
        const newsData = response.data;
        console.log("newsData image: ", newsData.image);
        setNewsData({
          ...newsData,
          file: newsData.image ? newsData.image : null,
        });
        setLoading(false);
        console.log("File: ", newsData.file);
      } catch (err) {
        setError("Не удалось загрузить новости");
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (name, value) => {
    setNewsData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };
      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewsData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newsToUpdate = {
      ...newsData,
    };

    toast
      .promise(dispatch(editNews({ id, newsData: newsToUpdate })).unwrap(), {
        pending: "Изменение новости...",
        success: "Новость успешно изменена 👌",
        error: "Ошибка при изменении новости 🤯",
      })
      .then(() => {
        navigate("/profile/news");
      })
      .catch((err) => {
        console.log("Error during updating news", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <EditForm
      data={newsData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default EditNews;
