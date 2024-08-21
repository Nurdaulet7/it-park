import React, { useState } from "react";

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
    <form className="register-form  form" onSubmit={handleSubmit}>
      <h4>Стать резидентом</h4>
      <div className="inputs">
        <input
          className="button--form-input button"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          placeholder="Название ТОО"
        />
        <select
          className="button--form-input-select button"
          name="activityField"
          value={formData.activityField}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Цифровизация
          </option>
          <option value="Образование">Образование</option>
          <option value="Здравоохранение">Здравоохранение</option>
          <option value="Финансы">Финансы</option>
          <option value="Торговля">Торговля</option>
          <option value="IT">IT</option>
        </select>
        {/* <input
          className="button--form-input button "
          type="text"
          name="activityField"
          value={formData.activityField}
          onChange={handleChange}
          required
          placeholder="Цифровизация"
        /> */}
        <input
          className="button--form-input button"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Ф.И.О"
          required
        />
        <input
          className="button--form-input button"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Телефон"
          required
        />
        <input
          className="button--form-input button"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Электронная почта"
          required
        />
      </div>
      <button type="submit" className="button">
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
