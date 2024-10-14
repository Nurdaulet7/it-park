import React, { useEffect, useState } from "react";
import "./MyNews.scss";
import NewsCard from "../../../components/content/news/NewsCard";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import { useDispatch, useSelector } from "react-redux";
import PaginationControls from "../../../components/pagination/PaginationControls";
import { fetchData, selectProfileData } from "../../../redux/slices/dataSlice";

const MyNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: news,
    status,
    error,
  } = useSelector((state) => selectProfileData(state, "news"));

  const location = useLocation();

  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = Array.isArray(news)
    ? news.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const retryFetch = () => {
    dispatch(fetchData({ entityType: "news", isProfile: true }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status.fetch === "idle") {
      dispatch(fetchData({ entityType: "news", isProfile: true }));
    }
  }, [dispatch, status]);

  if (status.fetch === "failed") {
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
        {status.fetch === "loading"
          ? [...Array(6)].map((_, index) => (
              <NewsCard key={index} forSkeleton />
            ))
          : currentNews.map((item, index) => (
              <NewsCard key={index} news={item} forProfile={true} />
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
