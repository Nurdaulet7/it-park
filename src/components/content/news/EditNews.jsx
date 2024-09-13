import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import axios from "axios";
import defaultImg from "../../../images/itpark-default.png";
import EditForm from "../../../pages/profile/MyProfile/EditForm";

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
    image: null,
    date: "",
    status: "не виден",
  });
  // const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://it-park.kz/kk/api/news/${id}`
        );
        setNewsData(response.data);
        // setExistingImage(response.data.image);
        setLoading(false);
        console.log(response.data.image);
      } catch (err) {
        setError("Не удалось загрузить новости");
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

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
      image: file.name,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "application/json",
    // };

    const formData = new FormData();
    formData.append("title_ru", newsData.title_ru);
    formData.append("title_kk", newsData.title_kk);
    formData.append("content_ru", newsData.content_ru);
    formData.append("content_kk", newsData.content_kk);
    formData.append("desc_ru", newsData.desc_ru);
    formData.append("desc_kk", newsData.desc_kk);
    formData.append("date", newsData.date);
    formData.append("status", newsData.status);

    if (newsData.image) {
      formData.append("image", newsData.image); // Отправляем только имя файла
    } else {
      formData.append("image", defaultImg); // Сохраняем текущее изображение или задаем дефолтное
    }
    formData.append("token", token);

    try {
      await axios.post(
        `https://it-park.kz/kk/api/update?table=news&post_id=${id}`,
        formData
      );
      navigate("/profile/news");
    } catch (err) {
      setError("Ошибка при обновлении новости");
    }
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
