import React, { useCallback, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { z } from "zod";
import ErrorDisplay from "../../../components/Error/ErrorDisplay";
import InputField from "../../../components/editor/InputField";
import EditFormSkeleton from "../../../components/editor/EditFormSkeleton";

const EditForm = ({
  data,
  handleChange,
  handleImageChange,
  handleSubmit,
  forCreate = false,
  isSubmitting,
  status,
  error,
  retryFetch,
}) => {
  const newsSchema = z.object({
    title_ru: z
      .string()
      .trim()
      .min(1, "Заголовок (Рус) не должен быть пустым")
      .min(10, "Заголовок (Рус) должен содержать минимум 10 символов"),
    title_kk: z
      .string()
      .trim()
      .min(1, "Заголовок (Каз) не должен быть пустым")
      .min(10, "Заголовок (Каз) должен содержать минимум 10 символов"),
    // file: z
    //   .instanceof(File, "Необходимо загрузить изображения")
    //   .refine(
    //     (file) => file.size <= 1024 * 1024,
    //     "Файл должен быть меньше 1 МБ"
    //   ) // Проверка размера
    //   .refine(
    //     (file) => file.type.startsWith("image/"),
    //     "Файл должен быть изображением"
    //   ),
  });
  const [errors, setErrors] = useState({});

  const validateField = useCallback(
    (name, value) => {
      try {
        newsSchema.pick({ [name]: true }).parse({ [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error.errors[0].message,
          }));
        }
      }
    },
    [newsSchema]
  );

  const handleFieldChange = (name, value) => {
    handleChange(name, value);
    validateField(name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      newsSchema.parse({
        title_ru: data.title_ru,
        title_kk: data.title_kk,
        file: data.file,
      });
      setErrors({});
      handleSubmit(e);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
    }
  };

  if (status === "loading") return <EditFormSkeleton />;
  if (status === "failed")
    return <ErrorDisplay errorMessage={error} retryAction={retryFetch} />;

  const imageUrl =
    data.file instanceof File ? URL.createObjectURL(data.file) : data.image;

  return (
    <div className="news-edit">
      <h3 className="news-edit__title">
        {forCreate ? "Добавьте новость" : "Редактирование"}
      </h3>
      <form className="news-edit__form" onSubmit={onSubmit}>
        <div className="news-edit__container grid grid--2">
          <InputField
            label="Заголовок (Рус)"
            name="title_ru"
            value={data.title_ru}
            placeholder="Заполните заголовок"
            onChange={(e) => handleFieldChange("title_ru", e.target.value)}
            error={errors.title_ru}
          />
          <InputField
            label="Заголовок (Каз)"
            name="title_kk"
            value={data.title_kk}
            placeholder="Заполните заголовок"
            onChange={(e) => handleFieldChange("title_kk", e.target.value)}
            error={errors.title_kk}
          />
        </div>
        <div className="news-edit__container grid grid--2">
          <InputField
            label="Краткое описание"
            name="desc_ru"
            value={data.desc_ru}
            placeholder="Заполните краткое описание"
            onChange={(e) => handleChange("desc_ru", e.target.value)}
            isTextarea
          />
          <InputField
            label="Қысқаша мазмұндама"
            name="desc_kk"
            value={data.desc_kk}
            placeholder="Қысқаша мазмұңдаманы толтырыңыз"
            onChange={(e) => handleChange("desc_kk", e.target.value)}
            isTextarea
          />
        </div>
        <div className="news-edit__container grid grid--2">
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="content_ru">
              Контент (Рус):
            </label>
            <CKEditor
              className="news-edit__editor"
              editor={ClassicEditor}
              data={data.content_ru}
              onChange={(event, editor) =>
                handleChange("content_ru", editor.getData())
              }
            />
          </div>
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="content_kk">
              Контент (Каз):
            </label>
            <CKEditor
              className="news-edit__editor"
              editor={ClassicEditor}
              data={data.content_kk}
              onChange={(event, editor) =>
                handleChange("content_kk", editor.getData())
              }
            />
          </div>
        </div>

        <div className="news-edit__container grid grid--3">
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="date">
              Дата:
            </label>
            <input
              className="news-edit__input button input input__editer"
              type="date"
              name="date"
              value={data.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="status">
              Статус:
            </label>
            <select
              className="news-edit__input button input input__editer"
              name="status"
              value={data.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value={0}>не виден</option>
              <option value={1}>виден</option>
            </select>
          </div>

          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="file">
              Выберите изображение:
            </label>
            {imageUrl && (
              <div className="news-edit__image-preview">
                <img src={imageUrl} alt="Текущее изображение" />
                <p className="news-edit__image-hint">
                  Вы можете выбрать новое изображение для замены.
                </p>
              </div>
            )}
            <input
              className="news-edit__input button input input__editer input__editer-image"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* {errors.file && (
              <span className="error-message">{errors.file}</span>
            )} */}
          </div>
        </div>

        <button
          className={`news-edit__submit button ${
            isSubmitting ? "button-disabled" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {forCreate ? "Добавить новость" : "Сохранить изменения"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
