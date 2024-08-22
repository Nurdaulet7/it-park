import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const ResidentForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    activityField: "",
    fullName: "",
    phone: "",
    email: "",
  });

  const { formatMessage } = useIntl();

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
      <h4>
        <FormattedMessage id="become_resident" />
      </h4>
      <div className="inputs">
        <input
          className="button--form-input button"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "company_name" })}
        />
        <select
          className="button--form-input-select button"
          name="activityField"
          value={formData.activityField}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            <FormattedMessage id="digitalization" />
          </option>
          <option value="Образование">
            <FormattedMessage id="education" />
          </option>
          <option value="Здравоохранение">
            <FormattedMessage id="healthcare" />
          </option>
          <option value="Финансы">
            <FormattedMessage id="finance" />
          </option>
          <option value="Торговля">
            <FormattedMessage id="commerce" />
          </option>
          <option value="IT">IT</option>
        </select>
        <input
          className="button--form-input button"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={formatMessage({ id: "full_name" })}
          required
        />
        <input
          className="button--form-input button"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={formatMessage({ id: "phone" })}
          required
        />
        <input
          className="button--form-input button"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={formatMessage({ id: "email" })}
          required
        />
      </div>
      <button type="submit" className="button">
        <FormattedMessage id="send" />
      </button>
    </form>
  );
};

export default ResidentForm;
