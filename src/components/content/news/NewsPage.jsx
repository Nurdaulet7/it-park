import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Импортируйте useLocation и useNavigate
import { FormattedMessage } from "react-intl";
import NewsCard from "./NewsCard";
import { scrollToTop } from "../../../utils/scrollToTop";
import PaginationControls from "../../pagination/PaginationControls";
import { fetchData, selectPublicData } from "../../../redux/slices/dataSlice";

const NewsPage = () => {
  const dispatch = useDispatch();
  const {
    data: news,
    status,
    error,
  } = useSelector((state) => selectPublicData(state, "news"));
  const location = useLocation(); // Получите текущий путь

  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1; // Получите номер страницы из URL или установите 1 по умолчанию
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    scrollToTop();
    if (status.fetch === "idle") {
      dispatch(fetchData({ entityType: "news" }));
    }
  }, [status.fetch, dispatch]);

  if (status.fetch === "loading") {
    return (
      <div name="section-news" className="container section-news">
        <header className="section__header">
          <h2 className="section__title">
            <FormattedMessage id="our_news" />
          </h2>
        </header>
        <div className="section__body">
          <div className="news">
            <ul className="news__list grid grid--3">
              {[...Array(6)].map((_, index) => (
                <NewsCard key={index} forSkeleton={true} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (status.fetch === "failed") return <p>Error: {error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  return (
    <div className={`container`}>
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_news" />
        </h2>
      </header>
      <div className="section__body">
        <div>
          <ul className="events__list grid grid--3">
            {currentNews.map((news, index) => (
              <NewsCard key={index} news={news} />
            ))}
          </ul>
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          path="news"
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default NewsPage;
