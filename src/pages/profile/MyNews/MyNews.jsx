import React, { useEffect, useState } from "react";
import "./MyNews.scss";
import NewsCard from "../../../components/content/news/NewsCard";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileNews,
  selectProfileNews,
  selectProfileNewsError,
  selectProfileNewsFetchStatus,
} from "../../../redux/slices/profileNewsSlice";
import PaginationControls from "../../../components/pagination/PaginationControls";

const MyNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const news = useSelector(selectProfileNews);
  const status = useSelector(selectProfileNewsFetchStatus);
  const error = useSelector(selectProfileNewsError);

  const location = useLocation(); // Получите текущий путь

  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1; // Получите номер страницы из URL или установите 1 по умолчанию
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const retryFetch = () => {
    dispatch(fetchProfileNews());
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status === "idle") {
      dispatch(fetchProfileNews());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return (
      <ErrorDisplay
        errorMessage={error}
        // errorType={errorType}
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
      <div className="grid grid---3">
        {status === "loading"
          ? [...Array(6)].map((_, index) => (
              <NewsCard key={index} forSkeleton />
            ))
          : currentNews.map((item, index) => (
              <NewsCard key={index} news={item} forProfile />
            ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        path="profile/news"
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default MyNews;

// const getUserIdFromToken = () => {
//   const token = localStorage.getItem("jwtToken");

//   if (!token) return null;

//   const tokenParts = token.split(".");

//   if (tokenParts.length !== 3) return null;

//   const payloadBase64 = tokenParts[1];
//   const payloadDecoded = atob(payloadBase64);
//   const payloadObject = JSON.parse(payloadDecoded);

//   return payloadObject.user?.id || null;
// };

// const fetchNews = async () => {
//   const userId = getUserIdFromToken();

//   if (!userId) {
//     setError("Не удалось получить идентификатор пользователя");
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await axios.get(
//       `https://it-park.kz/kk/api/news?user_id=${userId}`
//     );

//     const newsArray = Object.values(response.data).filter(
//       (item) => typeof item === "object" && item.id
//     );

//     console.log("NEWS", newsArray);
//     setNews(newsArray);
//     setLoading(false);
//   } catch (err) {
//     console.error("Ошибка получения новостей:", err);
//     let errorMessage = "Ошибка при получении новостей";
//     let errorType = "UnknownError";
//     if (err.response) {
//       errorMessage += `: Статус ${err.response.status}. ${err.response.data.message}`;
//       errorType = "ServerError";
//     } else if (err.request) {
//       errorMessage +=
//         ": Ответ от сервера не был получен, возможно, проблемы с сетью";
//       errorType = "NetworkError";
//     } else {
//       errorMessage += ": Проверьте соединение с интернетом";
//     }
//     setError(errorMessage);
//     setErrorType(errorType);
//     setLoading(false);
//   }
// };
