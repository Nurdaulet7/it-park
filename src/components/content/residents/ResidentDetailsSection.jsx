// src/components/content/details/ResidentDetailsSection.jsx

import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

const ResidentDetailsSection = ({ selectedResidentId, onBack }) => {
  const residents = useSelector((state) => state.residents.residents);
  const { locale } = useIntl();

  const resident = residents.find((res) => res.id === selectedResidentId);

  const getTranslatedContent = (field) => {
    switch (locale) {
      case "ru-RU":
        return resident[`${field}_ru`];
      case "kz-KZ":
        return resident[`${field}_kk`];
      case "en-US":
        return resident[`${field}_en`];
      default:
        return resident[`${field}_kk`];
    }
  };

  if (!resident) {
    return <p>No details available</p>;
  }

  return (
    <div className="details">
      <button onClick={onBack}>Back</button>
      <h2>{getTranslatedContent("name")}</h2>
      <p>{getTranslatedContent("content")}</p>
      <img src={resident.image} alt={getTranslatedContent("name")} />
    </div>
  );
};

export default ResidentDetailsSection;
