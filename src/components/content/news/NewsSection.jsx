import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  selectNews,
  selectNewsError,
  selectNewsStatus,
} from "../../../redux/slices/newsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import NewsCard from "./NewsCard";

const NewsSection = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews());
    }
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Element name="section-news" className="section container section-news">
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_news" />
        </h2>
      </header>
      <div className="section__body">
        <div className="news">
          <ul className="news__list grid grid--3">
            {news.slice(0, 3).map((news, index) => (
              <NewsCard key={index} news={news} />
            ))}
          </ul>
          <div className="view-all-button">
            <Link to="/news" className="button">
              <FormattedMessage
                id="view_all_news"
                defaultMessage="View All News"
              />
            </Link>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default NewsSection;
