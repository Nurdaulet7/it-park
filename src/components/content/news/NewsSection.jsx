import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import NewsCard from "./NewsCard";
import {
  fetchPublicNews,
  selectPublicNews,
  selectPublicNewsError,
  selectPublicNewsFetchStatus,
} from "../../../redux/slices/publicNewsSlice";

const NewsSection = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectPublicNews);
  const error = useSelector(selectPublicNewsError);
  const status = useSelector(selectPublicNewsFetchStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPublicNews());
    }
  }, [dispatch, status]);

  if (status === "loading") {
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
              {[...Array(3)].map((_, index) => (
                <NewsCard key={index} forSkeleton={true} />
              ))}
            </ul>
          </div>
        </div>
      </Element>
    );
  }
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
