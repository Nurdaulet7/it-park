import React, { useEffect, useState } from "react";
import "./MyNews.scss";
import axios from "axios";
import NewsCard from "../../../components/content/news/NewsCard";

const MyNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) return null;

    const tokenParts = token.split(".");

    if (tokenParts.length !== 3) return null;

    const payloadBase64 = tokenParts[1];
    const payloadDecoded = atob(payloadBase64);
    const payloadObject = JSON.parse(payloadDecoded);

    return payloadObject.user?.id || null;
  };

  useEffect(() => {
    const fetchNews = async () => {
      const userId = getUserIdFromToken();

      if (!userId) {
        setError("Не удалось получить идентификатор пользователя");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://it-park.kz/kk/api/news?user_id=${userId}`
        );

        console.log("Response Data:", response.data);
        const newsArray = Object.values(response.data).filter(
          (item) => typeof item === "object" && item.id
        );

        setNews(newsArray);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка получения новостей:", err);
        setError("Ошибка при получении новостей");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-news">
      <div className="my-news__uploader">
        <button className="upload-btn button">Опубликовать</button>
      </div>
      <div className="grid grid---2">
        {news.map((item, index) => (
          <NewsCard key={index} news={item} forProfile />
        ))}
      </div>
    </div>
  );
};

export default MyNews;
