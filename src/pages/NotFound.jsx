import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

export const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404</h1>
      <p>
        <FormattedMessage id="notFound" />
      </p>
      <Link className={classNames("btn-go-home", "button")} to={"/"}>
        <FormattedMessage id="back_home" />
      </Link>
    </div>
  );
};
