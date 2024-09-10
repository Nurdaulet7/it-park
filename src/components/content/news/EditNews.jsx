import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { scrollToTop } from "../../../utils/scrollToTop";

const EditNews = () => {
  const [searchParams] = useSearchParams(); // Получаем query-параметры
  const id = searchParams.get("id"); // Получаем значение параметра 'id'
  const [newsData, setNewsData] = useState({
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
  });
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
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить данные новости");
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    try {
      await axios.post(
        `https://it-park.kz/api/update?table=news&post_id=${id}`,
        newsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/profile/news"); // Переход на страницу новостей
    } catch (err) {
      setError("Ошибка при обновлении новости");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-edit">
      <h3>Редактирование</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title_ru">Заголовок (Рус):</label>
          <input
            type="text"
            name="title_ru"
            value={newsData.title_ru}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title_kk">Заголовок (Каз):</label>
          <input
            type="text"
            name="title_kk"
            value={newsData.title_kk}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content_ru">Контент (Рус):</label>
          <textarea
            name="content_ru"
            value={newsData.content_ru}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content_kk">Контент (Каз):</label>
          <textarea
            name="content_kk"
            value={newsData.content_kk}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditNews;
