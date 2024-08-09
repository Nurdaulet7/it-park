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
import { useIntl } from "react-intl";

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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!vacancy) return <p>No vacancy data available</p>;

  return (
    <div className="section container">
      <header className="section__header">
        <h2 className="section__title">
          {getTranslatedContent(vacancy, "title", locale)}
        </h2>
      </header>
      <div className="section__body">
        <p>{getTranslatedContent(vacancy, "content", locale)}</p>
        <p>{getTranslatedContent(vacancy, "location", locale)}</p>
        <img
          src={vacancy?.image}
          alt={getTranslatedContent(vacancy, "title", locale)}
        />
      </div>
    </div>
  );
};

export default VacanciesDetailsSection;
