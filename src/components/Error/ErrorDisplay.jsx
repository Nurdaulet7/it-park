import React from "react";
import { LuServerOff } from "react-icons/lu";
import { PiWifiXBold } from "react-icons/pi";
import { BiError } from "react-icons/bi";

const ErrorDisplay = ({ errorMessage, errorType, retryAction }) => {
  const getIcon = (type) => {
    switch (type) {
      case "ServerError":
        return <LuServerOff className="error-icon" />;

      case "NetworkError":
        return <PiWifiXBold className="error-icon" />;
      default:
        return <BiError className="error-icon" />;
    }
  };

  return (
    <div className="error-content">
      <h2>Произошла ошибка</h2>
      {getIcon(errorType)}
      <p>{errorMessage}</p>
      <button onClick={retryAction} className="button retry-btn">
        Попробовать снова
      </button>
    </div>
  );
};

export default ErrorDisplay;
