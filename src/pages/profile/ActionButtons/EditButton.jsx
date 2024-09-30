import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const EditButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="change change-btn">
      <FaPencilAlt />
    </button>
  );
};

export default EditButton;
