import React from "react";
import "./DetailedInfoPage.scss";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import EventCard from "../events/EventCard";
import NewsCard from "../news/NewsCard";
import { FaWhatsapp, FaInstagram, FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import HtmlContent from "../../../utils/HtmlContent";

const EntityDetailsPage = (props) => {
  const { event, allData, entityType } = props;

  const { locale } = useIntl();

  const filteredData = Array.isArray(allData)
    ? allData.filter((e) => e.id !== event.id)
    : [];

  return (
    <div className="container detailed-info">
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
              {isNaN(new Date(event.date)) ? (
                <span>
                  <FormattedMessage id="invalid_date" />
                </span>
              ) : (
                <FormattedDate
                  value={new Date(event.date)}
                  year="numeric"
                  month="2-digit"
                  day="2-digit"
                />
              )}
            </span>
            <h3>{getTranslatedContent(event, "title", locale)}</h3>
            <div>
              <HtmlContent
                content={getTranslatedContent(event, "content", locale)}
              />
            </div>
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
          {filteredData.slice(0, 4).map((e) => {
            switch (entityType) {
              case "news":
                return <NewsCard key={e.id} news={e} forAside />;
              case "events":
                return <EventCard key={e.id} event={e} forAside />;
              default:
                return <div key={e.id}>Unknown entity type</div>;
            }
          })}
        </aside>
      </div>
    </div>
  );
};

export default EntityDetailsPage;
