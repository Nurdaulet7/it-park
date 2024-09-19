// src/components/ToastNotification.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  selectNotificationMessage,
  selectNotificationType,
  clearNotification,
} from "../../redux/slices/notificationSlice";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  const message = useSelector(selectNotificationMessage);
  const type = useSelector(selectNotificationType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      } else if (type === "info") {
        toast.info(message);
      } else {
        toast(message);
      }
      dispatch(clearNotification());
    }
  }, [message, type, dispatch]);

  return <ToastContainer position="top-right" autoClose={3000} />;
};

export default ToastNotification;
