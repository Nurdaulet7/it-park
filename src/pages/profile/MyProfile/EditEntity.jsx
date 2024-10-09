import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../../../utils/scrollToTop";
import { toast } from "react-toastify";
import EditForm from "../profileComponents/EditForm";

const EditEntity = ({
  fetchAction,
  selectCurrentItem,
  selectFetchStatus,
  selectError,
  setCurrentItem,
  editAction,
  fetchPublicAction,
  redirectUrl,
  defaultData,
}) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentItem = useSelector(selectCurrentItem);
  const fetchStatus = useSelector(selectFetchStatus);
  const error = useSelector(selectError);

  const [itemData, setItemData] = useState(defaultData);

  useEffect(() => {
    scrollToTop();

    if (fetchStatus === "idle") {
      dispatch(fetchAction()).then(() => {
        dispatch(setCurrentItem(parseInt(id)));
      });
    } else if (fetchStatus === "succeeded") {
      dispatch(setCurrentItem(parseInt(id)));
    }
  }, [id, fetchStatus, dispatch]);

  useEffect(() => {
    if (currentItem) {
      setItemData({
        ...currentItem,
        file: currentItem.image || null,
      });
    }
  }, [currentItem]);

  const handleChange = useCallback((name, value) => {
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      toast.error("Выберите изображение.");
      return;
    }

    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("Изображение не должно превышать 1MB.");
      return;
    }

    setItemData((prevData) => ({
      ...prevData,
      file: file,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast
      .promise(dispatch(editAction({ id, data: itemData })).unwrap(), {
        pending: "Изменение...",
        success: "Успешно изменено 👌",
        error: "Ошибка при изменении 🤯",
      })
      .then(() => {
        dispatch(fetchAction());
        dispatch(fetchPublicAction({ forceRefresh: true }));
        navigate(redirectUrl);
      })
      .catch((err) => {
        console.log("Error during updating item", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const retryFetch = () => {
    dispatch(fetchAction()).then(() => {
      dispatch(setCurrentItem(parseInt(id)));
      error = dispatch(selectError);
    });
  };

  return (
    <EditForm
      data={itemData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      status={fetchStatus}
      error={error}
      retryFetch={retryFetch}
    />
  );
};

export default EditEntity;
