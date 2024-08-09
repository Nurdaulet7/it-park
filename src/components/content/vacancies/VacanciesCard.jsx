import React from "react";
import { FormattedDate, useIntl } from "react-intl";
import { FaRegEye } from "react-icons/fa";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import { Link } from "react-router-dom";

const VacanciesCard = ({ vacancy }) => {
  const { locale } = useIntl();

  return (
    <li className="vacancy_item">
      <Link to={`/vacancies/${vacancy.id}`}>
        <article className="vacancy-card">
          <div className="vacancy-card__header">
            <div className="header-image">
              <img src={vacancy.image} alt={vacancy.title_en} />
            </div>
            <p>{vacancy.too_name}</p>
          </div>
          <div className="vacancy-card__body">
            <h4 className="vacancy-card__body-job">
              {getTranslatedContent(vacancy, "title", locale)}
            </h4>
            <p className="vacancy-card__body-desc">
              {
                getTranslatedContent(vacancy, "desc", locale)
                  .replace(/(.+?)\1/, "$1")
                  .match(/^[^\.]+/)[0]
              }
            </p>
            <p className="vacancy-card__body-price">от 150 000тг</p>
          </div>
          <div className="vacancy-card__footer">
            <FormattedDate
              value={new Date(vacancy.date)}
              defaultMessage="Неправильная дата"
              year="numeric"
              month="2-digit"
              day="2-digit"
            />
            <span className="views">
              <FaRegEye id="eye-icon" />
              {vacancy.views}
            </span>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default VacanciesCard;
