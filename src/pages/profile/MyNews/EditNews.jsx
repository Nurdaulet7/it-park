import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  editProfileNews,
  fetchProfileNews,
  selectCurrentProfileNews,
  selectProfileNewsError,
  selectProfileNewsFetchStatus,
  setCurrentProfileNews,
} from "../../../redux/slices/profileNewsSlice";
import { fetchPublicNews } from "../../../redux/slices/publicNewsSlice";
import EditForm from "../profileComponents/EditForm";

const EditNews = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentNews = useSelector(selectCurrentProfileNews);
  const fetchStatus = useSelector(selectProfileNewsFetchStatus);
  const error = useSelector(selectProfileNewsError);

  const [newsData, setNewsData] = useState({
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
    desc_ru: "",
    desc_kk: "",
    file: null,
    date: "",
    status: 0,
  });

  useEffect(() => {
    scrollToTop();

    if (fetchStatus === "idle") {
      dispatch(fetchProfileNews()).then(() => {
        dispatch(setCurrentProfileNews(parseInt(id)));
      });
    } else if (fetchStatus === "succeeded") {
      dispatch(setCurrentProfileNews(parseInt(id)));
    }
  }, [id, fetchStatus, dispatch]);

  useEffect(() => {
    if (currentNews) {
      setNewsData({
        ...currentNews,
        file: currentNews.image || null,
      });
    }
  }, [currentNews]);

  const handleChange = useCallback((name, value) => {
    setNewsData((prevData) => ({
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

    setNewsData((prevData) => ({
      ...prevData,
      file: file,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newsToUpdate = {
      ...newsData,
    };

    toast
      .promise(
        dispatch(editProfileNews({ id, newsData: newsToUpdate })).unwrap(),
        {
          pending: "Изменение новости...",
          success: "Новость успешно изменена 👌",
          error: "Ошибка при изменении новости 🤯",
        }
      )
      .then(() => {
        dispatch(fetchProfileNews());
        dispatch(fetchPublicNews({ forceRefresh: true }));
        navigate("/profile/news");
      })
      .catch((err) => {
        console.log("Error during updating news", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const retryFetch = () => {
    dispatch(fetchProfileNews()).then(() => {
      dispatch(setCurrentProfileNews(parseInt(id)));
      error = dispatch(selectProfileNewsError);
    });
  };

  return (
    <EditForm
      data={newsData}
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

export default EditNews;
