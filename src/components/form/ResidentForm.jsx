import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";

const scheme = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Поле не должно быть пустым")
    .refine((val) => val.length > 0, "Поле не должно быть пустым"),
  activityField: z
    .string()
    .trim()
    .min(1, "Поле не должно быть пустым")
    .refine((val) => val.length > 0, "Поле не должно быть пустым"),
  fullName: z
    .string()
    .regex(
      /(([A-Z]{1}[a-z]{1,40})(\s[A-Z]{1}[a-z]{1,40})?)\s([A-Z]{1}[a-z]{1,40})/
    )
    .max(60),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 символов"),
  email: z.string().email("Некорректный адрес электронной почты"),
});

const ResidentForm = ({ onClose }) => {
  const initialFormData = {
    companyName: "",
    activityField: "",
    fullName: "",
    phone: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});
  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = scheme.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log(validationResult.data);
      setFormData(initialFormData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData(initialFormData); // Очистка формы при закрытии
    onClose();
  };

  return (
    <form className="register-form form" onSubmit={handleSubmit}>
      <h4>{formatMessage({ id: "become_resident" })}</h4>
      <div className="inputs">
        <InputField
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder={formatMessage({ id: "company_name" })}
          error={errors.companyName}
        />

        <SelectField
          name="activityField"
          value={formData.activityField}
          onChange={handleChange}
          placeholder={formatMessage({ id: "digitalization" })}
          error={errors.activityField}
        />

        <InputField
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={formatMessage({ id: "full_name" })}
          error={errors.fullName}
        />

        <InputField
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={formatMessage({ id: "phone" })}
          error={errors.phone}
        />

        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={formatMessage({ id: "email" })}
          error={errors.email}
        />
      </div>
      <button type="submit" className="button">
        <FormattedMessage id="send" />
      </button>
    </form>
  );
};

const InputField = ({ type, name, value, onChange, placeholder, error }) => (
  <>
    <input
      className="button--form-input button"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <span className="error">{error}</span>}
  </>
);

const SelectField = ({ name, value, onChange, placeholder, error }) => (
  <>
    <select
      className="button--form-input-select button"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
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
    {error && <span className="error">{error}</span>}
  </>
);

export default ResidentForm;
