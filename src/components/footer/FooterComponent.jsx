import React from "react";
import cn from "classnames";
import logo from "../../images/logo-it-park.png";

const FooterComponent = () => {
  return (
    <footer className={cn("layout footer")}>
      <div className="footer__inner">
        <div className="footer__inner-content">
          <div className="footer__inner-content_logo">
            <img src={logo} alt="it-park logo" />
          </div>
          <div className="footer__inner-content_contacts">
            <p>Адрес: ул. Гафура Мухамеджанова, IT-Park</p>
            <p>Телефон: 8 (7242) 40-11-91 (вн:7252)</p>
            <p>Электронная почта: it-park.kz</p>
          </div>
          <div className="footer__inner-content_bottom"></div>
        </div>
        <div className="footer__inner-map"></div>
        <div className="footer__inner-bottom">
          <p>IT-Park ©2023.</p>
          <p>Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
