// src/components/content/residents/ResidentDetailsSection.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentResident } from "../../../redux/slices/residentsSlice";
import { FormattedMessage, useIntl } from "react-intl";

const ResidentDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resident = useSelector((state) => state.residents.currentResident);
  const status = useSelector((state) => state.residents.status);
  const error = useSelector((state) => state.residents.error);
  const { locale } = useIntl();

  useEffect(() => {
    dispatch(setCurrentResident(parseInt(id)));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const getTranslatedContent = (field) => {
    if (!resident) return "";
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

  return (
    <div className="section container">
      <header className="section__header">
        <h2 className="section__title">{getTranslatedContent("name")}</h2>
      </header>
      <div className="section__body">
        <p>{getTranslatedContent("content")}</p>
        <p>{getTranslatedContent("location")}</p>
        <img src={resident?.image} alt={getTranslatedContent("name")} />
      </div>
    </div>
  );
};

export default ResidentDetailsSection;
