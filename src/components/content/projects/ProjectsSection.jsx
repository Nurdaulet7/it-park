import React from "react";
import { FormattedMessage } from "react-intl";
import { Element } from "react-scroll";
import ProjectsSwiper from "../swiper/ProjectsSwiper";

const ProjectsSection = () => {
  return (
    <Element
      name="section-projects"
      className="section container section-projects"
    >
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="our_projects" />
        </h2>
      </header>
      <div className="section__body">
        <div className="residents">
          <div className="residents__list grid grid--1">
            <ProjectsSwiper />
          </div>
        </div>
      </div>
    </Element>
  );
};

export default ProjectsSection;
