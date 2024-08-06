// SectionPartners.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "react-scroll";
import { fetchResidents } from "../../../redux/slices/residentsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

const ResidentSection = () => {
  const dispatch = useDispatch();
  const residents = useSelector((state) => state.residents.residents);
  const status = useSelector((state) => state.residents.status);
  const error = useSelector((state) => state.residents.error);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchResidents());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const getTranslatedContent = (resident, field) => {
    switch (locale) {
      case "ru-RU":
        return resident[`${field}_ru`];
      case "kk-KZ":
        return resident[`${field}_kk`];
      case "en-US":
        return resident[`${field}_en`];
      default:
        return resident[`${field}_kk`];
    }
  };
  console.log(locale);

  return (
    <Element name="section-partners" className={`section container `}>
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_residents" />
        </h2>
      </header>
      <div className="section__body">
        <div className="residents">
          <ul className="residents__list grid grid--3">
            {residents.map((resident, index) => (
              <li key={index} className="residents__item">
                <Link to={`/resident/${resident.id}`}>
                  <article className="resident-card">
                    <div className="resident-card__logo">
                      <img
                        className="resident__image"
                        src={resident.image}
                        alt="resident"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="resident-card__title">
                      {getTranslatedContent(resident, "name")}
                    </h3>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Element>
  );
};

export default ResidentSection;
