import React, { useEffect } from "react";
import { FormattedMessage, useIntl, FormattedDate } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/slices/eventsSlice";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";

const EventsSection = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const getTranslatedContent = (event, field) => {
    switch (locale) {
      case "ru-RU":
        return event[`${field}_ru`];
      case "kk-KZ":
        return event[`${field}_kk`];
      case "en-US":
        return event[`${field}_en`];
      default:
        return event[`${field}_kk`];
    }
  };

  return (
    <Element name="section-events" className={`container`}>
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_events" />
        </h2>
      </header>
      <div className="section__body">
        <div className="events">
          <ul className="events__list grid grid--2">
            {events.slice(0, 2).map((event, index) => (
              <li key={index} className="events__item">
                <article
                  className="event-card"
                  style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url(${event.image}) center/cover no-repeat`,
                  }}
                >
                  <p>
                    <FormattedDate
                      value={new Date(event.date)}
                      defaultMessage={event.date}
                      year="numeric"
                      month="long"
                      day="2-digit"
                    />
                  </p>
                  <h3>{getTranslatedContent(event, "title")}</h3>
                  <Link
                    to={`/event/${event.id}`}
                    className="button button-event"
                  >
                    <FormattedMessage
                      id="more_details"
                      defaultMessage={"Подробнее"}
                    />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <div className="view-all-button">
            <Link to="/event" className="button">
              <FormattedMessage
                id="view_all_events"
                defaultMessage="View All Events"
              />
            </Link>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default EventsSection;

// <article className="event-card">
// <h2 className="event-card__date">{event.date}</h2>
// <div className="event-card__logo">
//   <img
//     className="resident__image"
//     src={event.image}
//     alt="event"
//     loading="lazy"
//   />
// </div>
// <h3 className="event-card__title">
//   {getTranslatedContent(event, "title")}
// </h3>
// </article>

// SectionPartners.jsx

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Element } from "react-scroll";
// import { fetchResidents } from "../../../redux/slices/residentsSlice";
// import { FormattedMessage, useIntl } from "react-intl";
// import { Link } from "react-router-dom";

// const ResidentSection = () => {
//   const dispatch = useDispatch();
//   const residents = useSelector((state) => state.residents.residents);
//   const status = useSelector((state) => state.residents.status);
//   const error = useSelector((state) => state.residents.error);
//   const { locale } = useIntl();

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchResidents());
//     }
//   }, [status, dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Error: {error}</p>;

//   const getTranslatedContent = (resident, field) => {
//     switch (locale) {
//       case "ru-RU":
//         return resident[`${field}_ru`];
//       case "kk-KZ":
//         return resident[`${field}_kk`];
//       case "en-US":
//         return resident[`${field}_en`];
//       default:
//         return resident[`${field}_kk`];
//     }
//   };
//   console.log(locale);

//   return (
//     <Element name="section-partners" className={`section container `}>
//       <header className="section__header">
//         <h2 className="section__title">
//           <FormattedMessage id="our_residents" />
//         </h2>
//       </header>
//       <div className="section__body">
//         <div className="residents">
//           <ul className="residents__list grid grid--3">
//             {residents.map((resident, index) => (
//               <li key={index} className="residents__item">
//                 <Link to={`/resident/${resident.id}`}>
//                   <article className="resident-card">
//                     <div className="resident-card__logo">
//                       <img
//                         className="resident__image"
//                         src={resident.image}
//                         alt="resident"
//                         loading="lazy"
//                       />
//                     </div>
//                     <h3 className="resident-card__title">
//                       {getTranslatedContent(resident, "name")}
//                     </h3>
//                   </article>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </Element>
//   );
// };

// export default ResidentSection;
