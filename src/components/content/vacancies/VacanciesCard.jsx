import React from "react";
import { FormattedDate, useIntl } from "react-intl";
import { FaRegEye } from "react-icons/fa";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import HtmlContent from "../../../utils/HtmlContent";

const VacanciesCard = ({ vacancy, forSkeleton = false }) => {
  const { locale } = useIntl();

  if (forSkeleton) {
    return (
      <li className="vacancy_item">
        <article className="vacancy-card">
          <div className="vacancy-card__header">
            <Skeleton variant="circle" width="40px" height={40} />
            <Skeleton variant="text" width="30%" />
          </div>
          <div className="vacancy-card__body">
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="20%" />
          </div>
          <div className="vacancy-card__footer">
            <Skeleton variant="text" width="10%" />
            <Skeleton variant="text" width="20%" />
          </div>
        </article>
      </li>
    );
  }

  const translatedDesc = getTranslatedContent(vacancy, "desc", locale);
  const shortDesc = translatedDesc
    ? translatedDesc.match(/^[^\.]+/)?.[0]
    : "Описание отсутствует";

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
              <HtmlContent content={shortDesc} />
            </p>
            <p className="vacancy-card__body-price">{vacancy.price} тг</p>
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
