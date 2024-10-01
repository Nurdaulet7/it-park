// DeleteButton.jsx
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import cn from "classnames";
import {
  deleteProfileNews,
  fetchProfileNews,
} from "../../../redux/slices/profileNewsSlice";
import { fetchPublicNews } from "../../../redux/slices/publicNewsSlice";

const Dialog = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <dialog className={cn("form-overlay", { "form-overlay--open": isOpen })}>
      <div className="form-overlay__content">
        <h4 className="form-overlay__content-title">{title}</h4>
        <div className="form-overlay__content-content">{children}</div>
        <div className="form-overlay__content-actions">
          <button onClick={onConfirm} className="dialog-btn">
            Да
          </button>
          <button onClick={onClose} className="dialog-btn">
            Нет
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

const DeleteButton = ({ entityId, entityType }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isDialogOpen]);

  const handleDelete = async () => {
    dispatch(deleteProfileNews({ entityId, entityType }))
      .unwrap()
      .then(() => {
        dispatch(fetchProfileNews());
        dispatch(fetchPublicNews({ forceRefresh: true }));
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error(`Ошибка при удалении ${entityType}:`, error);
      });
  };

  return (
    <>
      <button onClick={() => setDialogOpen(true)} className="change delete-btn">
        <RiDeleteBinLine />
      </button>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        title={`Удаление ${entityType}`}
      >
        Вы уверены, что хотите удалить {entityType}?
      </Dialog>
    </>
  );
};

export default DeleteButton;
