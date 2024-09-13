import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditForm = ({ data, handleChange, handleImageChange, handleSubmit }) => {
  return (
    <div className="news-edit">
      <h3 className="news-edit__title">Редактирование</h3>
      <form className="news-edit__form" onSubmit={handleSubmit}>
        <div className="news-edit__container grid grid--2">
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="title_ru">
              Заголовок (Рус):
            </label>
            <input
              className="news-edit__input button input input__editer"
              type="text"
              name="title_ru"
              value={data.title_ru}
              onChange={(e) => handleChange("title_ru", e.target.value)}
            />
          </div>
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="title_kk">
              Заголовок (Каз):
            </label>
            <input
              className="news-edit__input button input input__editer"
              type="text"
              name="title_kk"
              value={data.title_kk}
              onChange={(e) => handleChange("title_kk", e.target.value)}
            />
          </div>
        </div>
        <div className="news-edit__container grid grid--2">
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="desc_ru">
              Краткое описание:
            </label>
            <textarea
              className="news-edit__input button input input__editer input__editer-textarea"
              type="text"
              name="desc_ru"
              value={data.desc_ru}
              placeholder="Заполните краткое описание"
              onChange={(e) => handleChange("desc_ru", e.target.value)}
            />
          </div>
          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="desc_kk">
              Қысқаша мазмұндама:
            </label>
            <textarea
              className="news-edit__input button input input__editer input__editer-textarea"
              type="text"
              name="desc_kk"
              value={data.desc_kk}
              placeholder="Қысқаша мазмұңдаманы толтырыңыз"
              onChange={(e) => handleChange("desc_kk", e.target.value)}
            />
          </div>
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
              <option value="не виден">не виден</option>
              <option value="виден">виден</option>
            </select>
          </div>

          <div className="news-edit__field">
            <label className="news-edit__label" htmlFor="image">
              Выберите изображение:
            </label>
            <input
              className="news-edit__input button input input__editer input__editer-image"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <button className="news-edit__submit button" type="submit">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EditForm;
