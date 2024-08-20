import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonDetail = () => {
  return (
    <>
      <Skeleton
        className="skeleton"
        animation="wave"
        variant="rectangular"
        width="100%"
        height={350}
      />
      <Skeleton className="skeleton" animation="wave" height={30} />
      <Skeleton className="skeleton" animation="wave" height={30} />
      <Skeleton className="skeleton" animation="wave" width="60%" height={30} />
    </>
  );
};

export default SkeletonDetail;
