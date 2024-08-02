// src/components/Dialog/Dialog.js
import React from "react";
import cn from "classnames";

const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <dialog
      className={cn("mobile-overlay", { "visible-desktop": isOpen })}
      open={isOpen}
    >
      <form
        action=""
        className="mobile-overlay__close-button-wrapper"
        method="dialog"
      >
        <button
          className="mobile-overlay__close-button cross-button"
          type="submit"
          onClick={onClose}
        >
          <span className="visually-hidden">Close navigation menu</span>
        </button>
      </form>
      <div className="mobile-overlay__body">{children}</div>
    </dialog>
  );
};

export default Dialog;
