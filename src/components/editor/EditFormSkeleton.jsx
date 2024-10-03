import React from "react";
import { Skeleton } from "@mui/material";

const EditFormSkeleton = () => {
  return (
    <div className="news-edit">
      <Skeleton
        className="skeleton"
        animation="wave"
        width="250px"
        height={40}
      />
      <div className="news-edit__form">
        <div className="news-edit__container grid grid--2">
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="150px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={45}
            />
          </div>
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="150px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={45}
            />
          </div>
        </div>
        <div className="news-edit__container grid grid--2">
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="200px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={150}
            />
          </div>
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="200px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={150}
            />
          </div>
        </div>
        <div className="news-edit__container grid grid--2">
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="100px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={100}
            />
          </div>
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="100px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={100}
            />
          </div>
        </div>

        <div className="news-edit__container grid grid--3">
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="100px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={45}
            />
          </div>

          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="80px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={45}
            />
          </div>
          <div className="news-edit__field">
            <Skeleton
              className="skeleton"
              animation="wave"
              width="150px"
              height={25}
            />
            <Skeleton
              className="skeleton"
              animation="wave"
              variant="rectangular"
              width="100%"
              height={45}
            />
          </div>
        </div>

        <Skeleton
          className="skeleton news-edit__submit"
          animation="wave"
          variant="rectangular"
          width="200px"
          height={45}
        />
      </div>
    </div>
  );
};

export default EditFormSkeleton;
