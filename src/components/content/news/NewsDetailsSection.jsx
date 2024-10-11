import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DetailedInfoPage from "../detail/DetailedInfoPage";
import SkeletonDetail from "../../skeleton/SkeletonDetail";
import {
  fetchData,
  selectCurrentData,
  selectProfileData,
  selectPublicData,
  setCurrentData,
} from "../../../redux/slices/dataSlice";

const NewsDetailsSection = ({ isProfileNews = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentData = useSelector((state) =>
    selectCurrentData(state, "news", isProfileNews)
  );
  const { status, error } = useSelector((state) => {
    const data = isProfileNews
      ? selectProfileData(state, "news")
      : selectPublicData(state, "news");
    return {
      status: data.status.fetch,
      error: data.error,
    };
  });

  console.log(currentData);

  useEffect(() => {
    window.scrollTo(0, 0);
    const entityType = "news";

    if (status === "idle") {
      dispatch(fetchData({ entityType, isProfileNews }))
        .unwrap()
        .then(() => {
          dispatch(setCurrentData({ entityType, id, isProfileNews }));
        });
    } else if (status === "succeeded" && currentData?.id !== id) {
      dispatch(setCurrentData({ entityType, id, isProfileNews }));
    }
  }, [dispatch, id, status, isProfileNews]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!currentData) return <p>No news data available</p>;

  return <DetailedInfoPage event={currentData} isNews isProfileNews />;
};

export default NewsDetailsSection;
