import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchNews,
  selectNews,
  selectNewsStatus,
} from "../../../redux/slices/newsSlice";
import {
  fetchEvents,
  selectEvents,
  selectEventsStatus,
} from "../../../redux/slices/eventsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import NewsCard from "../news/NewsCard";
import EventCard from "../events/EventCard";
import {
  fetchVacancies,
  selectVacancies,
  selectVacanciesStatus,
} from "../../../redux/slices/vacanciesSlice";
import VacanciesCard from "../vacancies/VacanciesCard";
import { scrollToTop } from "../../../utils/scrollToTop";

const SearchResults = () => {
  const dispatch = useDispatch();

  const news = useSelector(selectNews);
  const newsStatus = useSelector(selectNewsStatus);
  const events = useSelector(selectEvents);
  const eventsStatus = useSelector(selectEventsStatus);
  const vacancies = useSelector(selectVacancies);
  const vacanciesStatus = useSelector(selectVacanciesStatus);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
    if (eventsStatus === "idle") {
      dispatch(fetchEvents());
    }
    if (vacanciesStatus === "idle") {
      dispatch(fetchVacancies());
    }
  }, [dispatch, newsStatus, eventsStatus, vacanciesStatus, searchParams]);

  const mapLocaleToShortCode = {
    "en-US": "en",
    "ru-RU": "ru",
    "kk-KZ": "kk",
  };

  const { locale } = useIntl();

  const shortLocale = mapLocaleToShortCode[locale] || "kk";
  const titleField = `title_${shortLocale}`;
  const contentField = `content_${shortLocale}`;
  const descField = `desc_${shortLocale}`;

  const filteredNews = news.filter((item) => {
    const title = item[titleField]?.toLowerCase() || "";
    const content = item[contentField]?.toLowerCase() || "";

    return title.includes(query) || content.includes(query);
  });

  const filteredEvents = events.filter((item) => {
    const title = item[titleField]?.toLowerCase() || "";
    const content = item[contentField]?.toLowerCase() || "";

    return title.includes(query) || content.includes(query);
  });

  const filteredVacancies = vacancies.filter((item) => {
    const title = item[titleField]?.toLowerCase() || "";
    const desc = item[descField]?.toLowerCase() || "";

    return title.includes(query) || desc.includes(query);
  });

  return (
    <div className="container search">
      <header className="search-header">
        <h3>
          {<FormattedMessage id="search_results_for" />} "{query}"
        </h3>
      </header>
      <div className="search-body">
        <h4>
          <FormattedMessage id="news" />
        </h4>
        <ul className="grid grid--3">
          {newsStatus === "loading" ? (
            [...Array(3)].map((_, index) => (
              <NewsCard key={index} forAside={true} forSkeleton={true} />
            ))
          ) : filteredNews.length > 0 ? (
            filteredNews.map((newsItem, index) => (
              <NewsCard key={index} news={newsItem} forAside />
            ))
          ) : (
            <p className="not_found_text">Ничего не найдено</p>
          )}
        </ul>
      </div>
      <div className="search-body">
        <h4>
          <FormattedMessage id="events" />
        </h4>
        <ul className="grid grid--3">
          {eventsStatus === "loading" ? (
            [...Array(3)].map((_, index) => (
              <EventCard key={index} forAside={true} forSkeleton={true} />
            ))
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((eventItem, index) => (
              <EventCard key={index} event={eventItem} forAside />
            ))
          ) : (
            <p className="not_found_text">Ничего не найдено</p>
          )}
        </ul>
      </div>
      <div className="search-body">
        <h4>
          <FormattedMessage id="vacancies" />
        </h4>
        <ul className="grid grid--1">
          {vacanciesStatus === "loading" ? (
            <VacanciesCard forSkeleton />
          ) : filteredVacancies.length > 0 ? (
            filteredVacancies.map((vacancyItem, index) => (
              <VacanciesCard key={index} vacancy={vacancyItem} />
            ))
          ) : (
            <p className="not_found_text">Ничего не найдено</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
