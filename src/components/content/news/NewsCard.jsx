import React from "react";
import { useIntl } from "react-intl";

const NewsCard = ({ news }) => {
  const { locale } = useIntl();

  return (
    <li className="news_item">
      <article className="news-card"></article>
    </li>
  );
};

export default NewsCard;
