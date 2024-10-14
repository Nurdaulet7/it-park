import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchData,
  selectCurrentData,
  selectProfileData,
  selectPublicData,
  setCurrentData,
} from "../../../redux/slices/dataSlice";
import SkeletonDetail from "../../skeleton/SkeletonDetail";
import EntityDetailsPage from "./EntityDetailsPage";

const EntityDetailsSection = ({ entityType }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isProfile = location.pathname.includes("/profile") ? true : false;

  const currentData = useSelector((state) =>
    selectCurrentData(state, entityType, isProfile)
  );

  const { allData, status, error } = useSelector((state) => {
    const data = isProfile
      ? selectProfileData(state, entityType)
      : selectPublicData(state, entityType);
    return {
      allData: data.data,
      status: data.status.fetch,
      error: data.status.error,
    };
  });

  console.log("currentData", currentData);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status === "idle") {
      dispatch(fetchData({ entityType, isProfile }))
        .unwrap()
        .then(() => {
          dispatch(setCurrentData({ entityType, id, isProfile }));
        });
    } else if (status === "succeeded" && currentData?.id !== id) {
      dispatch(setCurrentData({ entityType, id, isProfile }));
    }
  }, [dispatch, id, status, isProfile]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!currentData) return <p>No news data available</p>;

  return (
    <EntityDetailsPage
      event={currentData}
      allData={allData}
      entityType={entityType}
    />
  );
};

export default EntityDetailsSection;
