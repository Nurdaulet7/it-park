import React from "react";
import "./DetailedInfoPage.scss";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import EventCard from "../events/EventCard";
import NewsCard from "../news/NewsCard";
import { selectEvents } from "../../../redux/slices/eventsSlice";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaInstagram, FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { selectNews } from "../../../redux/slices/newsSlice";

// const shuffleArray = (array) => {
//   return array.sort(() => Math.random() - 0.5);
// };

const formatTextWithParagraphs = (text) => {
  // Разбиваем текст на массив строк, используя двойные или более пробелы и переводы строки
  const paragraphs = text
    .split(/\s*\n\s*/)
    .filter((paragraph) => paragraph.trim() !== "");
  return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
};

const DetailedInfoPage = ({ event, isNews = false }) => {
  const { locale } = useIntl();
  const allEvents = useSelector(selectEvents);
  const allNews = useSelector(selectNews);
  const filteredEvents = isNews
    ? allNews.filter((e) => e.id !== event.id)
    : allEvents.filter((e) => e.id !== event.id);

  return (
    <div className="section container detailed-info">
      <div className="detailed-info__body">
        <div className="detailed-info__content">
          <img
            className="detailed-info__content-image"
            src={event.image}
            alt={event.title_ru}
            loading="lazy"
          />
          <div className="detailed-info__content-texts">
            <span className="tag-detail">
              <FormattedDate
                value={new Date(event.date)}
                defaultMessage="Неправильная дата"
                year="numeric"
                month="2-digit"
                day="2-digit"
              />
            </span>
            <h3>{getTranslatedContent(event, "title", locale)}</h3>
            <p>
              {formatTextWithParagraphs(
                getTranslatedContent(event, "content", locale)
              )}
            </p>
          </div>
          <div className="detailed-info__content-share">
            <span className="share-text">
              <FormattedMessage id="share" defaultMessage={"Поделиться"} />:
            </span>
            <div className="share-icons">
              <a href="#" className="link-icon">
                <FaInstagram />
              </a>
              <a href="#" className="link-icon">
                <FaWhatsapp />
              </a>
              <a href="#" className="link-icon">
                <FaSquareFacebook />
              </a>
              <a href="#" className="link-icon">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
        <aside className="detailed-info__aside">
          {filteredEvents
            .slice(0, isNews ? 4 : 3)
            .map((e) =>
              isNews ? (
                <NewsCard key={e.id} news={e} forAside />
              ) : (
                <EventCard key={e.id} event={e} forAside />
              )
            )}
        </aside>
      </div>
    </div>
  );
};

export default DetailedInfoPage;

// <header className="section__header">
// <h2 className="section__title">
//   {getTranslatedContent(event, "title", locale)}
// </h2>
// </header>
// <div className="section__body">
// <p>{getTranslatedContent(event, "content", locale)}</p>
// <p>{getTranslatedContent(event, "location", locale)}</p>
// <img
//   src={event?.image}
//   alt={getTranslatedContent(event, "title", locale)}
// />
// </div>
