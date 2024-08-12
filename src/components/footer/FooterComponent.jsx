import React from "react";
import cn from "classnames";
import logo from "../../images/logo-it-park.png";
import YandexMap from "./YandexMap";
import { FormattedMessage } from "react-intl";

const FooterComponent = () => {
  return (
    <footer className={cn("footer")}>
      <div className={cn("layout footer-body")}>
        <div className="footer__inner grid grid--2">
          <div className="footer__inner-content">
            <div className="footer__inner-content_logo">
              <img src={logo} alt="it-park logo" />
            </div>
            <div className="footer__inner-content_contacts">
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
            <div className="footer__inner-bottom">
              <p>IT-Park ©2023.</p>
              <p>
                <FormattedMessage id="copyright" />
              </p>
            </div>
          </div>
          <div className="footer__inner-map">
            <YandexMap className="map" />
          </div>
        </div>
        <div className="footer__inner-content_bottom">
          <hr className="footer-line" />
          <a className="organization-link" href="https://cit.orda.gov.kz/kk">
            {<FormattedMessage id="organization" />}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
