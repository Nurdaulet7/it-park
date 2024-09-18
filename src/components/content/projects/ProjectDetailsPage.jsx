import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProjects,
  selectCurrentProject,
  selectProjectsError,
  selectProjectsStatus,
  setCurrentProject,
} from "../../../redux/slices/projectsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { scrollToTop } from "../../../utils/scrollToTop";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";
import SkeletonDetail from "../../skeleton/SkeletonDetail";
import HtmlContent from "../../../utils/HtmlContent";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(selectCurrentProject);
  const status = useSelector(selectProjectsStatus);
  const error = useSelector(selectProjectsError);
  const { locale } = useIntl();

  useEffect(() => {
    scrollToTop();
    if (status === "idle") {
      dispatch(fetchProjects()).then(() => {
        dispatch(setCurrentProject(parseInt(id)));
      });
    } else {
      dispatch(setCurrentProject(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!project) return <p>No project data available</p>;

  const handleClick = (event) => {
    event.preventDefault();
    if (project.file) {
      window.open(project.file, "_blank");
    } else {
      console.error("File not found");
    }
  };

  return (
    <div className="container project-details">
      <div className="project-details__body">
        <div className="project-details__content">
          <h3>{getTranslatedContent(project, "title", locale)}</h3>
          <HtmlContent
            content={getTranslatedContent(project, "desc", locale)}
          />
        </div>
        <div className="project-details__img">
          <img src={project.image} alt={project.title_ru} loading="lazy" />
        </div>
      </div>
      {project.file && (
        <div className="project-details__bottom">
          <button className="button" type="button" onClick={handleClick}>
            <FormattedMessage id="download" defaultMessage={"Download"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
