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

const NewsDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector(selectCurrentPublicNews);
  const status = useSelector(selectPublicNewsFetchStatus);
  const error = useSelector(selectPublicNewsError);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status === "idle") {
      dispatch(fetchPublicNews()).then(() => {
        dispatch(setCurrentPublicNews(parseInt(id)));
      });
    } else {
      dispatch(setCurrentPublicNews(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!news) return <p>No news data available</p>;

  return <DetailedInfoPage event={news} isNews />;
};

export default NewsDetailsSection;
