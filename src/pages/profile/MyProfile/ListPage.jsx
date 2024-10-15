import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationControls from "../../../components/pagination/PaginationControls";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import { scrollToTop } from "../../../utils/scrollToTop";
import { fetchData, selectProfileData } from "../../../redux/slices/dataSlice";

const ListPage = ({
  entityType,
  CardComponent,
  path,
  cardPropsName,
  gridColumnsCount = 3,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status, error } = useSelector((state) =>
    selectProfileData(state, entityType)
  );

  const location = useLocation();
  const itemsPerPage = 6;
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(data)
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const dataLength = data.length;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const retryFetch = () => {
    dispatch(fetchData({ entityType, isProfile: true }));
  };

  useEffect(() => {
    scrollToTop();

    if (status.fetch === "idle") {
      retryFetch();
    }
  }, [dispatch, status.fetch, entityType]);

  if (status.fetch === "failed") {
    return <ErrorDisplay errorMessage={error} retryAction={retryFetch} />;
  }

  return (
    <div className="list-page">
      <div className="list-page__uploader">
        <button
          className="upload-btn button"
          onClick={() => navigate(`/profile/${entityType}/create`)}
        >
          Опубликовать
        </button>
      </div>
      <div className={`grid grid---${gridColumnsCount}`}>
        {status.fetch === "loading"
          ? [...Array(itemsPerPage)].map((_, index) => (
              <CardComponent key={index} forSkeleton />
            ))
          : currentItems.map((item, index) => (
              <CardComponent
                key={index}
                {...{ [cardPropsName]: item }}
                forProfile
              />
            ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        path={path}
        itemsPerPage={itemsPerPage}
        dataLength={dataLength}
      />
    </div>
  );
};

export default ListPage;
