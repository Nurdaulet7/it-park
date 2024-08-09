import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  selectNews,
  selectNewsError,
  selectNewsStatus,
} from "../../../redux/slices/newsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import NewsCard from "./NewsCard";
import { scrollToTop } from "../../../utils/scrollToTop";

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectNewsError);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    scrollToTop();
    if (status === "idle") {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      console.log("Next");
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    console.log("Prev");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

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
        <div className="pagination-controls">
          <button
            className="button button-pagination"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {`<`}
          </button>
          <span className="button button-pagination-counter">{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="button button-pagination"
          >
            {`>`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
