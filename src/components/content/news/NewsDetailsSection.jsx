import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DetailedInfoPage from "../detail/DetailedInfoPage";
import SkeletonDetail from "../../skeleton/SkeletonDetail";
import {
  fetchPublicNews,
  selectCurrentPublicNews,
  selectPublicNewsError,
  selectPublicNewsFetchStatus,
  setCurrentPublicNews,
} from "../../../redux/slices/publicNewsSlice";
import {
  fetchProfileNews,
  selectCurrentProfileNews,
  selectProfileNews,
  selectProfileNewsError,
  selectProfileNewsFetchStatus,
  setCurrentProfileNews,
} from "../../../redux/slices/profileNewsSlice";

const NewsDetailsSection = ({ isProfileNews = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const news = useSelector(
    isProfileNews ? selectCurrentProfileNews : selectCurrentPublicNews
  );

  const status = useSelector(
    isProfileNews ? selectProfileNewsFetchStatus : selectPublicNewsFetchStatus
  );
  const error = useSelector(
    isProfileNews ? selectProfileNewsError : selectPublicNewsError
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isProfileNews) {
      if (status === "idle") {
        dispatch(fetchProfileNews()).then(() => {
          dispatch(setCurrentProfileNews(parseInt(id)));
        });
      } else {
        dispatch(setCurrentProfileNews(parseInt(id)));
      }
    } else {
      if (status === "idle") {
        dispatch(fetchPublicNews()).then(() => {
          dispatch(setCurrentPublicNews(parseInt(id)));
        });
      } else {
        dispatch(setCurrentPublicNews(parseInt(id)));
      }
    }
  }, [dispatch, id, status, isProfileNews]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!news) return <p>No news data available</p>;

  return <DetailedInfoPage event={news} isNews isProfileNews />;
};

export default NewsDetailsSection;
