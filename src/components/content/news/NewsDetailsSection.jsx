import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchNews,
  selectCurrentNews,
  selectNewsStatus,
  setCurrentNews,
} from "../../../redux/slices/newsSlice";
import { selectEventsError } from "../../../redux/slices/eventsSlice";
import DetailedInfoPage from "../detail/DetailedInfoPage";
import SkeletonDetail from "../../skeleton/SkeletonDetail";

const NewsDetailsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector(selectCurrentNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectEventsError);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status === "idle") {
      dispatch(fetchNews()).then(() => {
        dispatch(setCurrentNews(parseInt(id)));
      });
    } else {
      dispatch(setCurrentNews(parseInt(id)));
    }
  }, [dispatch, id, status]);

  if (status === "loading") return <SkeletonDetail />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (!news) return <p>No news data available</p>;

  return <DetailedInfoPage event={news} isNews />;
};

export default NewsDetailsSection;
