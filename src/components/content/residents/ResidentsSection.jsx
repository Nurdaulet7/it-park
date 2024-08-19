import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "react-scroll";
import {
  fetchResidents,
  selectResidents,
  selectResidentsError,
  selectResidentsStatus,
} from "../../../redux/slices/residentsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import Skeleton from "@mui/material/Skeleton";

const ResidentSection = () => {
  const dispatch = useDispatch();
  const residents = useSelector(selectResidents);
  const status = useSelector(selectResidentsStatus);
  const error = useSelector(selectResidentsError);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchResidents());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <Element
        name="section-residents"
        className="section container section-residents"
      >
        <header className="section__header">
          <h2 className="section__title">
            <FormattedMessage id="our_residents" />
          </h2>
        </header>
        <div className="section__body">
          <div className="residents">
            <ul className="residents__list grid grid--3">
              {[...Array(6)].map((_, index) => (
                <li key={index} className="residents__item">
                  <article className="resident-card">
                    <div className="resident-card__logo">
                      <Skeleton variant="circular" width={100} height={80} />
                    </div>
                    <Skeleton width="70%" height="2rem" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Element>
    );
  }
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Element
      name="section-residents"
      className="section container section-residents"
    >
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
                      {getTranslatedContent(resident, "name", locale)}
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
