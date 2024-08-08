// src/components/content/residents/ResidentDetailsSection.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchResidents,
  selectCurrentResident,
  selectResidentsError,
  selectResidentsStatus,
  setCurrentResident,
} from "../../../redux/slices/residentsSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { getTranslatedContent } from "../../../utils/getTranslatedContent";

const ResidentDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resident = useSelector(selectCurrentResident);
  const status = useSelector(selectResidentsStatus);
  const error = useSelector(selectResidentsError);
  const { locale } = useIntl();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchResidents()).then(() => {
        dispatch(setCurrentResident(parseInt(id)));
      });
    } else {
      dispatch(setCurrentResident(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!resident) return <p>No resident data available</p>;

  return (
    <div className="section container">
      <header className="section__header">
        <h2 className="section__title">
          {getTranslatedContent(resident, "name", locale)}
        </h2>
      </header>
      <div className="section__body">
        <p>{getTranslatedContent(resident, "content", locale)}</p>
        <p>{getTranslatedContent(resident, "location", locale)}</p>
        <img
          src={resident?.image}
          alt={getTranslatedContent(resident, "name", locale)}
        />
      </div>
    </div>
  );
};

export default ResidentDetailsSection;
