import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchVacancies,
  selectCurrentVacancies,
  selectVacanciesError,
  selectVacanciesStatus,
  setCurrentVacancy,
} from "../../../redux/slices/vacanciesSlice";
import { scrollToTop } from "../../../utils/scrollToTop";
import { setCurrentEvent } from "../../../redux/slices/eventsSlice";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import { FormattedMessage, useIntl } from "react-intl";
import SkeletonDetail from "../../skeleton/SkeletonDetail";
import HtmlContent from "../../../utils/HtmlContent";

const VacanciesDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const vacancy = useSelector(selectCurrentVacancies);
  const status = useSelector(selectVacanciesStatus);
  const error = useSelector(selectVacanciesError);
  const { locale } = useIntl();

  useEffect(() => {
    scrollToTop();

    if (status === "idle") {
      dispatch(fetchVacancies()).then(() => {
        dispatch(setCurrentEvent(parseInt(id)));
      });
    } else {
      dispatch(setCurrentVacancy(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!vacancy) return <p>No vacancy data available</p>;

  return (
    <div className="container vacancy-details">
      <div className="vacancy-card__header">
        <div className="header-image">
          <img src={vacancy.image} alt={vacancy.title_en} />
        </div>
        <p>{vacancy.too_name}</p>
      </div>
      <div className="vacancy__content">
        <div className="vacancy__content-title">
          <h3>{getTranslatedContent(vacancy, "title", locale)}</h3>
        </div>
        <div className="vacancy__content-details">
          <div className="detail-item">
            <p>
              <FormattedMessage id="job_type" />
            </p>
            <p>{getTranslatedContent(vacancy, "type_work", locale)}</p>
          </div>
          <div className="detail-item">
            <p>
              <FormattedMessage id="employment" />
            </p>
            <p>{getTranslatedContent(vacancy, "type_zan", locale)}</p>
          </div>
          <div className="detail-item">
            <p>
              <FormattedMessage id="salary" />
            </p>
            <p>{vacancy.price} ₸</p>
          </div>
        </div>
        <div className="vacancy__content-body">
          <h5>
            <FormattedMessage id="summary" />
          </h5>
          <HtmlContent
            content={getTranslatedContent(vacancy, "desc", locale)}
          />
        </div>
      </div>
    </div>
  );
};

export default VacanciesDetailsSection;
