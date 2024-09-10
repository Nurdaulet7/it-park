import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Skeleton from "@mui/material/Skeleton";

const NewsCard = (props) => {
  const {
    news,
    forAside = false,
    forSkeleton = false,
    forProfile = false,
  } = props;
  const { locale } = useIntl();

  if (forSkeleton) {
    return (
      <li className="news_item">
        <article className={`${forAside ? "news-card-aside" : ""} news-card`}>
          {!forAside && (
            <div className="news-card__header">
              <Skeleton variant="rectangular" width="100%" height={180} />
            </div>
          )}
          <div className="news-card__content">
            <div className="news-card__body">
              <Skeleton variant="text" width="20%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </div>
            <div className="news-card__footer">
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="20%" />
            </div>
          </div>
        </article>
      </li>
    );
  }

  return (
    <li className="news_item">
      <article className={`${forAside ? "news-card-aside" : ""} news-card`}>
        {!forAside && (
          <div className="resident-icon">
            <img
              className="icon"
              src={news.user_id.image}
              alt={news.user_id.name_ru}
            />
          </div>
        )}

        <div className="news-card__header">
          <img src={news.image} alt={news.title_en} />
        </div>
        <div className="news-card__content">
          <div className="news-card__body">
            <span className="tag tag-red">
              {isNaN(new Date(news.date)) ? (
                <span>
                  <FormattedMessage id="invalid_date" />
                </span>
              ) : (
                <FormattedDate
                  value={new Date(news.date)}
                  year="numeric"
                  month="2-digit"
                  day="2-digit"
                />
              )}
            </span>
            <h4>{getTranslatedContent(news, "title", locale)}</h4>
          </div>
          <div className="news-card__footer">
            {forProfile ? (
              <div className="change-buttons">
                <a href="#" className="change change-btn">
                  <FaPencilAlt />
                </a>
                <a href="#" className="change delete-btn">
                  <RiDeleteBinLine />
                </a>
              </div>
            ) : (
              <span className="views">
                <FaRegEye id="eye-icon" />
                {news.views}
              </span>
            )}
            <Link to={`/news/${news.id}`} className="read-more">
              <FormattedMessage
                id="read_more"
                defaultMessage={"Читать далее »"}
              />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
};

export default NewsCard;
