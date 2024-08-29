import { Skeleton } from "@mui/material";
import React from "react";

const NewsSkeleton = ({ forAside = false }) => {
  return (
    <li className="news_item">
      <article className={`${forAside ? "news-card-aside" : ""} news-card`}>
        <div className="news-card__header">
          <Skeleton variant="rectangular" width="100%" height={180} />
        </div>
        <div className="news-card__content">
          <div className="news-card__body">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
          </div>
          <div className="news-card__footer">
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="20%" />
          </div>
        </div>
      </article>
    </li>
  );
};

export default NewsSkeleton;
