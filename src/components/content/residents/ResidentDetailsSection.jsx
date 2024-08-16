// src/components/content/residents/ResidentDetailsSection.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchResidents,
  selectCurrentResident,
  selectResidentsError,
  selectResidentsStatus,
  setCurrentResident,
} from "../../../redux/slices/residentsSlice";

import {
  fetchProjects,
  selectProjects,
} from "../../../redux/slices/projectsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import { scrollToTop } from "../../../utils/scrollToTop";

const ResidentDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resident = useSelector(selectCurrentResident);
  const status = useSelector(selectResidentsStatus);
  const error = useSelector(selectResidentsError);
  const projects = useSelector(selectProjects);
  const { locale } = useIntl();

  useEffect(() => {
    scrollToTop();
    if (status === "idle") {
      dispatch(fetchResidents()).then(() => {
        dispatch(setCurrentResident(parseInt(id)));
      });
    } else {
      dispatch(setCurrentResident(parseInt(id)));
    }
    dispatch(fetchProjects());
  }, [dispatch, id, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!resident) return <p>No resident data available</p>;

  // Фильтруем проекты, относящиеся к текущему резиденту
  const residentProjects = projects.filter((project) =>
    resident.user_id.some((user) => user.id === project.id)
  );

  return (
    <div className="detail-section ">
      <div className="detail-section__body">
        <img
          className="detail-section__body-image"
          src={resident?.image}
          width={350}
          height={200}
          alt={getTranslatedContent(resident, "name", locale)}
        />
        <div className="detail-section__body-content">
          <div className="content-header">
            <h4 className="content-header__title">
              {getTranslatedContent(resident, "name", locale)}
            </h4>
            <p>{getTranslatedContent(resident, "content", locale)}</p>
          </div>
          <ul className="content-contacts">
            <li className="content-contacts__item">
              <span>Мекенжай: </span>Микрорайон Левый берег, 15А, 2-этаж
            </li>
            <li className="content-contacts__item">
              <span>Телефон: </span>+7 776 889 39 99
            </li>
            <li className="content-contacts__item">
              <span>Электрондық пошта: </span>school_programming@mail.ru
            </li>
            <li className="content-contacts__item">
              <span>Әлеуметтік желілер:</span>
            </li>
          </ul>
        </div>
      </div>
      {residentProjects.length > 0 && (
        <>
          <header className="projects__section">
            <h3 className="projects__title">
              <FormattedMessage id="our_projects" />
              {/* {getTranslatedContent(resident, "name", locale)} */}
            </h3>
          </header>
          <div className="projects-list grid grid--3">
            {residentProjects.map((project, index) => {
              return (
                <a href={"/"} className="projects-list__item" key={index}>
                  <div className="projects-list__item-img">
                    <img
                      src={project.image}
                      alt={project.title_en}
                      loading="lazy"
                    />
                  </div>
                  <p className={"projects-list__item-title"}>
                    {getTranslatedContent(project, "title", locale)}
                  </p>
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ResidentDetailsSection;
