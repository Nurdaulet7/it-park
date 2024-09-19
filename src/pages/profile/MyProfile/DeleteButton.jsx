// DeleteButton.jsx
import React from "react";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteNews } from "../../../redux/slices/newsSlice";

const DeleteButton = ({ entityId, onSuccess, entityType }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!window.confirm(`Вы уверены, что хотите удалить ${entityType}?`)) {
      return;
    }

    dispatch(deleteNews({ entityId, entityType }))
      .unwrap()
      .then(() => {
        alert(
          `${
            entityType.charAt(0).toUpperCase() + entityType.slice(1)
          } успешно удалено`
        );
        onSuccess();
      })
      .catch((error) => {
        console.error(`Ошибка при удалении ${entityType}:`, error);
        alert(`Не удалось удалить ${entityType}`);
      });

    // const token = localStorage.getItem("jwtToken");
    // const formData = new FormData();
    // formData.append("token", token);

    // try {
    //   await axios.post(
    //     `https://it-park.kz/kk/api/trash?table=news&post_id=${entityId}`,
    //     formData
    //   );

    //   if (onSuccess) {
    //     onSuccess();
    //   }

    //   alert(`${entityType} успешно удалено`);
    // } catch (error) {
    //   console.error(`Ошибка при удалении ${entityType}:`, error);
    //   alert(`Не удалось удалить ${entityType}`);
    // }
  };

  return (
    <button onClick={handleDelete} className="change delete-btn">
      <span className="icon">
        <RiDeleteBinLine />
      </span>
    </button>
  );
};

export default DeleteButton;
