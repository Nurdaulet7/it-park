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

const NewsSection = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectNewsError);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews());
    }
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Element name="section-news" className={`container`}>
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_news" />
        </h2>
      </header>
      <div className="section__body">
        <div className="news">
          <ul className="news__list grid grid--3">
            {news.slice(0, 3).map((event, index) => (
              <>
                <p>{index}</p>
                <p>{event.title_kk}</p>
              </>
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

// import React, { useEffect } from "react";
// import { FormattedMessage, useIntl, FormattedDate } from "react-intl";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   selectEvents,
//   selectEventsError,
//   selectEventsStatus,
// } from "../../../redux/slices/eventsSlice";
// import { Element } from "react-scroll";
// import { Link } from "react-router-dom";
// import EventCard from "../events/EventCard";

// const NewsSection = () => {
//   const dispatch = useDispatch();
//   const events = useSelector(selectEvents);
//   const status = useSelector(selectEventsStatus);
//   const error = useSelector(selectEventsError);
//   const { locale } = useIntl();

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEvents());
//     }
//   }, [status, dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Error: {error}</p>;

//   return (
//     <Element name="section-news" className={`container`}>
//       <header className="section__header">
//         <h2 className="section__title">
//           <FormattedMessage id="our_events" />
//         </h2>
//       </header>
//       <div className="section__body">
//         <div className="events">
//           <ul className="events__list grid grid--2">
//             {events.slice(0, 2).map((event, index) => (
//               <EventCard key={index} event={event} locale={locale} />
//             ))}
//           </ul>
//           <div className="view-all-button">
//             <Link to="/events" className="button">
//               <FormattedMessage
//                 id="view_all_events"
//                 defaultMessage="View All Events"
//               />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Element>
//   );
// };

// export default NewsSection;
