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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://it-park.kz/kk/api/news/${id}`
        );
        setNewsData(response.data);
        setLoading(false);
        console.log(`image ${newsData.file}`);
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
      console.log("Updated data: ", newData);
      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(newsData);
    setNewsData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsToUpdate = {
      id,
      ...newsData,
    };

    console.log("Submitting data: ", newsToUpdate);

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
    />
  );
};

export default EditNews;
