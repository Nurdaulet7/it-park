// SectionPartners.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "react-scroll";
import { fetchResidents } from "../../../redux/slices/residentsSlice";

const ResidentSection = () => {
  const dispatch = useDispatch();
  const residents = useSelector((state) => state.residents.residents);
  const status = useSelector((state) => state.residents.status);
  const error = useSelector((state) => state.residents.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchResidents());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Element name="section-partners" className={`section container `}>
      <header className="section__header">
        <h2 className="section__title">Residents</h2>
      </header>
      <div className="section__body">
        <div className="residents">
          <ul className="residents__list grid grid--3">
            {residents.map((event) => (
              <li className="residents__item">
                <article className="resident-card">
                  <div className="resident-card__logo">
                    <img
                      className="resident__image"
                      src={event.image}
                      alt="resident"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="resident-card__title">{event.name_kk}</h3>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Element>
  );
};

export default ResidentSection;
