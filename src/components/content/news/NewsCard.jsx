import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";

const NewsCard = ({ news, forAside = false }) => {
  const { locale } = useIntl();

  return (
    <li className="news_item">
      <article className={`${forAside ? "news-card-aside" : ""} news-card`}>
        <div className="news-card__header">
          <img src={news.image} alt={news.title_en} />
        </div>
        <div className="news-card__content">
          <div className="news-card__body">
            <span className="tag tag-red">
              <FormattedDate
                value={new Date(news.date)}
                defaultMessage="Неправильная дата"
                year="numeric"
                month="2-digit"
                day="2-digit"
              />
            </span>
            <h4>{getTranslatedContent(news, "title", locale)}</h4>
          </div>
          <div className="news-card__footer">
            <span className="views">
              <FaRegEye id="eye-icon" />
              {news.views}
            </span>
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
