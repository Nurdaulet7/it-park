import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { FaRegEye } from "react-icons/fa";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import HtmlContent from "../../../utils/HtmlContent";
import EditButton from "../../../pages/profile/ActionButtons/EditButton";
import DeleteButton from "../../../pages/profile/ActionButtons/DeleteButton";
import { CgArrowsExpandRight } from "react-icons/cg";
const VacanciesCard = ({
  vacancy,
  forSkeleton = false,
  forProfile = false,
}) => {
  const { locale } = useIntl();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(
      forProfile
        ? `/profile/vacancies/${vacancy.id}`
        : `/vacancies/${vacancy.id}`
    );
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate(`/profile/vacancies/update?id=${vacancy.id}`);
  };

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
      <article
        className={`vacancy-card ${!forProfile ? "cursor-pointer" : ""}`}
        {...(!forProfile && { onClick: handleCardClick })}
      >
        <div className="vacancy-card__header">
          <div className="header">
            <div className="header-image">
              <img src={vacancy.image} alt={vacancy.title_en} />
            </div>
            <p>{vacancy.too_name}</p>
          </div>
          {forProfile && (
            <a className="read-more" onClick={handleCardClick}>
              <CgArrowsExpandRight />
            </a>
          )}
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
          {forProfile ? (
            <div className="action-buttons">
              <EditButton onClick={handleEditClick} />
              <DeleteButton entityId={vacancy.id} entityType="vacancies" />
            </div>
          ) : (
            <span className="views">
              <FaRegEye id="eye-icon" />
              {vacancy.views}
            </span>
          )}
        </div>
      </article>
    </li>
  );
};

export default VacanciesCard;
