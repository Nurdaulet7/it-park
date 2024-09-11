import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditNews = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [newsData, setNewsData] = useState({
    title_ru: "",
    title_kk: "",
    content_ru: "",
    content_kk: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://it-park.kz/kk/api/news/${id}`
        );
        setNewsData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить новости");
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (name, value) => {
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newsData);
    // try {
    //   await axios.post(
    //     `https://it-park.kz/api/update?table=news&post_id=${id}`,
    //     newsData
    //   );
    //   navigate("/profile/news");
    // } catch (err) {
    //   setError("Ошибка при обновлении новости");
    // }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

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
              value={newsData.title_ru}
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
              value={newsData.title_kk}
              onChange={(e) => handleChange("title_kk", e.target.value)}
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
              data={newsData.content_ru}
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
              data={newsData.content_kk}
              onChange={(event, editor) =>
                handleChange("content_kk", editor.getData())
              }
            />
          </div>
        </div>
        <button className="news-edit__submit" type="submit">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EditNews;

// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { scrollToTop } from "../../../utils/scrollToTop";

// const EditNews = () => {
//   const [searchParams] = useSearchParams(); // Получаем query-параметры
//   const id = searchParams.get("id"); // Получаем значение параметра 'id'
//   const [newsData, setNewsData] = useState({
//     title_ru: "",
//     title_kk: "",
//     content_ru: "",
//     content_kk: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     scrollToTop();
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get(
//           `https://it-park.kz/kk/api/news/${id}`
//         );

//         setNewsData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Не удалось загрузить данные новости");
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewsData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("jwtToken");

//     try {
//       await axios.post(
//         `https://it-park.kz/api/update?table=news&post_id=${id}`,
//         newsData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       navigate("/profile/news"); // Переход на страницу новостей
//     } catch (err) {
//       setError("Ошибка при обновлении новости");
//     }
//   };

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="news-edit">
//       <h3>Редактирование</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title_ru">Заголовок (Рус):</label>
//           <input
//             type="text"
//             name="title_ru"
//             value={newsData.title_ru}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="title_kk">Заголовок (Каз):</label>
//           <input
//             type="text"
//             name="title_kk"
//             value={newsData.title_kk}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="content_ru">Контент (Рус):</label>
//           <textarea
//             name="content_ru"
//             value={newsData.content_ru}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="content_kk">Контент (Каз):</label>
//           <textarea
//             name="content_kk"
//             value={newsData.content_kk}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Сохранить изменения</button>
//       </form>
//     </div>
//   );
// };

// export default EditNews;
