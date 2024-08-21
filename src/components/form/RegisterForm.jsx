import React, { useState } from "react";
import Dialog from "../dialog-menu/Dialog";

const RegisterForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    activityField: "",
    fullName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных
    console.log(formData);
    onClose(); // Закрыть диалог после отправки
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="register-form">
        <h2>Зарегистрироваться</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название ТОО</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Сфера деятельности</label>
            <input
              type="text"
              name="activityField"
              value={formData.activityField}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Ф.И.О</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Электронная почта</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Отправить
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default RegisterForm;
