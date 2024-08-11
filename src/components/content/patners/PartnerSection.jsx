import React from "react";
import { FormattedMessage } from "react-intl";
import { Element } from "react-scroll";
import ProjectsSwiper from "../swiper/ProjectsSwiper";

const PartnerSection = () => {
  return (
    <div name="section-partners" className="section container section-partners">
      <header className="section__header">
        <h2 className="section__title">
          <FormattedMessage id="partners" />
        </h2>
      </header>
      <div className="section__body">
        <div className="residents">
          <div className="residents__list grid grid--1">
            <ProjectsSwiper isPartners={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
