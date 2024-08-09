import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchNews,
  selectCurrentNews,
  selectNewsStatus,
  setCurrentNews,
} from "../../../redux/slices/newsSlice";
import { selectEventsError } from "../../../redux/slices/eventsSlice";
import { useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";

const NewsDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector(selectCurrentNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectEventsError);
  const { locale } = useIntl();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status === "idle") {
      dispatch(fetchNews()).then(() => {
        dispatch(setCurrentNews(parseInt(id)));
      });
    } else {
      dispatch(setCurrentNews(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!news) return <p>No news data available</p>;

  return (
    <div className="section container">
      <header className="section__header">
        <h2 className="section__title">
          {getTranslatedContent(news, "title", locale)}
        </h2>
      </header>
      <div className="section__body">
        <p>{getTranslatedContent(news, "content", locale)}</p>
        <p>{getTranslatedContent(news, "location", locale)}</p>
        <img
          src={news?.image}
          alt={getTranslatedContent(news, "title", locale)}
        />
      </div>
    </div>
  );
};

export default NewsDetailsSection;
