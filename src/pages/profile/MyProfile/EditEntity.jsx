import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../../../utils/scrollToTop";
import { toast } from "react-toastify";
import EditForm from "../profileComponents/EditForm";
import {
  editProfileData,
  fetchData,
  selectProfileData,
  setCurrentData,
} from "../../../redux/slices/dataSlice";

const EditEntity = ({ redirectUrl, defaultData, entityType }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isProfile = true;

  const { currentItem, status, error } = useSelector((state) => {
    const data = selectProfileData(state, entityType);
    return {
      currentItem: data.currentData,
      status: data.status.fetch,
      error: data.status.error,
    };
  });

  const [itemData, setItemData] = useState(defaultData);

  useEffect(() => {
    scrollToTop();

    if (status === "idle") {
      dispatch(fetchData({ entityType, isProfile }))
        .unwrap()
        .then(() => {
          dispatch(setCurrentData({ entityType, id, isProfile }));
        });
    } else if (status === "succeeded") {
      dispatch(setCurrentData({ entityType, id, isProfile }));
    }
  }, [id, status, dispatch]);

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
      .promise(
        dispatch(editProfileData({ entityType, data: itemData, id })).unwrap(),
        {
          pending: "Изменение...",
          success: "Успешно изменено 👌",
          error: "Ошибка при изменении 🤯",
        }
      )
      .then(() => {
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
    dispatch(fetchData({ entityType, isProfile }))
      .unwrap()
      .then(() => {
        dispatch(setCurrentData({ entityType, id, isProfile }));
      });
  };

  return (
    <EditForm
      data={itemData}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      status={status}
      error={error}
      retryFetch={retryFetch}
    />
  );
};

export default EditEntity;
