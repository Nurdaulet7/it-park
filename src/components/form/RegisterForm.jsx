import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";
import InputField from "./InputField";

const registerScheme = z.object({
  companyName: z.string().trim().min(1, "Поле не должно быть пустым"),
  email: z.string().email("Некорректный адрес электронной почты"),
  phone: z
    .string()
    .min(10, "Телефон должен содержать минимум 10 символов")
    .regex(/^\d+$/, "Телефон должен содержать только цифры"),
  username: z
    .string()
    .trim()
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя должно содержать не более 20 символов"),
  password: z
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
    .regex(
      /[@$!%*?&#]/,
      "Пароль должен содержать хотя бы один специальный символ"
    ),
});

const RegisterForm = ({ onSwitchToLogin, isOpen, onClose }) => {
  const initialFormData = {
    companyName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const fieldScheme = registerScheme.shape[name];
    const validationResult = fieldScheme.safeParse(value);

    if (validationResult.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationResult.error.errors[0].message,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = registerScheme.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log(validationResult.data);
      setFormData(initialFormData);
      setErrors({});
      onClose();
    }
  };

  return (
    <form className="register-form form" onSubmit={handleSubmit}>
      <h4>
        <FormattedMessage id="sign_up" />
      </h4>
      <div className="inputs">
        <InputField
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder={formatMessage({ id: "organization_name" })}
          error={errors.companyName}
        />
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={formatMessage({ id: "email" })}
          error={errors.email}
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
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder={formatMessage({ id: "username" })}
          error={errors.username}
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={formatMessage({ id: "password" })}
          error={errors.password}
        />
      </div>

      <div className="log-reg-buttons">
        <button type="submit" className="button">
          <FormattedMessage id="sign_up" />
        </button>
        <button
          type="button"
          className="button button--link"
          onClick={onSwitchToLogin}
        >
          <FormattedMessage id="sign_in" />
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
