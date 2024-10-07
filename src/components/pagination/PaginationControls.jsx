// PaginationControls.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  path,
  itemsPerPage,
}) => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    scrollToTop();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      navigate(`/${path}?page=${currentPage + 1}&per_page=${itemsPerPage}`);
    }
  };

  const handlePrevPage = () => {
    scrollToTop();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      navigate(`/${path}?page=${currentPage - 1}&per_page=${itemsPerPage}`);
    }
  };

  return (
    <div className="pagination-controls">
      <button
        className="button button-pagination"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <span className="button button-pagination-counter">{`${currentPage} / ${totalPages}`}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="button button-pagination"
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationControls;
