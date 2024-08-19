import React, { useEffect } from "react";
import { scrollToTop } from "../utils/scrollToTop";
import itpark from "../images/aboutItpark.png";
import "./AboutUs.scss";
import { FormattedMessage } from "react-intl";
import { FaWhatsapp, FaInstagram, FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const AboutUs = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="container about-container">
      <div className="about-container__content">
        <div className="content-texts">
          <h2>IT Park</h2>
          <p>
            <FormattedMessage id="it_park_text1" />
          </p>
          <p>
            <FormattedMessage id="it_park_text2" />
          </p>
          <div className="footer__inner-content_contacts about-contacts">
            <p>
              <FormattedMessage id="address" />
            </p>
            <p>
              <FormattedMessage id="tel_number" />:
              <a href="tel:87242401191"> 8 (7242) 40-11-91 (вн:7252)</a>
            </p>
            <p>
              <FormattedMessage id="mail" />:{" "}
              <a href="mailto:it-park.kz">it-park.kz</a>
            </p>
          </div>
          <div className="detailed-info__content-share">
            <span className="share-text">
              <FormattedMessage id="share" defaultMessage={"Поделиться"} />:
            </span>

            <div className="share-icons">
              <a href="#" className="link-icon">
                <FaInstagram />
              </a>
              <a href="#" className="link-icon">
                <FaWhatsapp />
              </a>
              <a href="#" className="link-icon">
                <FaSquareFacebook />
              </a>
              <a href="#" className="link-icon">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
        <div className="content-img">
          <img src={itpark} alt="IT-park" loading="lazy" />
        </div>
      </div>
      <div className="about-container__form"></div>
    </div>
  );
};

export default AboutUs;
