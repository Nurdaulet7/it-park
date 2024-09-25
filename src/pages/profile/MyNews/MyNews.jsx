import React, { useEffect, useState } from "react";
import "./MyNews.scss";
import axios from "axios";
import NewsCard from "../../../components/content/news/NewsCard";
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";

const MyNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const navigate = useNavigate();

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

      const newsArray = Object.values(response.data).filter(
        (item) => typeof item === "object" && item.id
      );

      setNews(newsArray);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка получения новостей:", err);
      let errorMessage = "Ошибка при получении новостей";
      let errorType = "UnknownError";
      if (err.response) {
        errorMessage += `: Статус ${err.response.status}. ${err.response.data.message}`;
        errorType = "ServerError";
      } else if (err.request) {
        errorMessage +=
          ": Ответ от сервера не был получен, возможно, проблемы с сетью";
        errorType = "NetworkError";
      } else {
        errorMessage += ": Проверьте соединение с интернетом";
      }
      setError(errorMessage);
      setErrorType(errorType);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchNews();
  };

  if (error) {
    return (
      <ErrorDisplay
        errorMessage={error}
        errorType={errorType}
        retryAction={retryFetch}
      />
    );
  }

  return (
    <div className="my-news">
      <div className="my-news__uploader">
        <button
          className="upload-btn button"
          onClick={() => navigate("/profile/news/create")}
        >
          Опубликовать
        </button>
      </div>
      <div className="grid grid---2">
        {loading
          ? [...Array(4)].map((_, index) => (
              <NewsCard key={index} forSkeleton />
            ))
          : news.map((item, index) => (
              <NewsCard key={index} news={item} forProfile setNews={setNews} />
            ))}
      </div>
    </div>
  );
};

export default MyNews;
