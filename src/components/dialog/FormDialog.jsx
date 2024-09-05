// src/components/FormDialog/FormDialog.js
import React, { useEffect } from "react";
import cn from "classnames";

const FormDialog = (props) => {
  const { isOpen, onClose, children } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <dialog className={cn("form-overlay", { "form-overlay--open": isOpen })}>
      <div className="form-overlay__content">
        <form
          action=""
          className="mobile-overlay__close-button-wrapper"
          method="dialog"
        >
          <button
            className="mobile-overlay__close-button cross-button"
            type="button"
            onClick={onClose}
          >
            <span className="visually-hidden">Close navigation menu</span>
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default FormDialog;
