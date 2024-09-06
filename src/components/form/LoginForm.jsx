import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";
import InputField from "./InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const { onSwitchToRegister, isOpen, onClose } = props;
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const initialLoginData = {
    login: "",
    password: "",
    remember: false,
  };

  const loginSchema = z.object({
    login: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "loginRequired" })), // Исправили на login
    password: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "passwordRequired" })),
    remember: z.boolean().optional(),
  });

  const [formData, setFormData] = useState(initialLoginData);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialLoginData);
      setErrors({});
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    const fieldScheme = loginSchema.shape[name];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("login", formData.login);
        formDataToSend.append("password", formData.password);

        console.log(formDataToSend);

        const response = await axios.post(
          "https://it-park.kz/kk/api/login",
          formDataToSend
        );

        console.log(response);

        if (response.data.token) {
          const token = response.data.token;
          localStorage.setItem("jwtToken", token);
          navigate("/profile/user");
          onClose();
        } else {
          setErrorMessage("Ошибка аутентификации. Проверьте введенные данные.");
        }
      } catch (error) {
        console.error("Ошибка запроса:", error);
        if (error.response && error.response.data) {
          setErrorMessage(
            error.response.data.message || "Неверные логин или пароль"
          );
        } else {
          setErrorMessage("Ошибка сети. Попробуйте позже.");
        }
      }
    }
  };

  return (
    <form className="register-form  form" onSubmit={handleSubmit}>
      <h4>
        <FormattedMessage id="login" />
      </h4>
      <div className="inputs">
        <InputField
          type="text"
          name="login" // Исправлено на login
          value={formData.login}
          onChange={handleChange}
          placeholder={formatMessage({ id: "username" })} // Placeholder остаётся тем же
          error={errors.login} // Ошибки для login
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={formatMessage({ id: "password" })}
          error={errors.password}
          autocomplete="current-password"
        />
        <div className="form-buttons">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <FormattedMessage id="remember_me" />
          </label>
          <a href="#" className="forgot-password-link">
            <FormattedMessage id="forgot_password" />
          </a>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="log-reg-buttons">
        <button type="submit" className="button">
          <FormattedMessage id="sign_in" />
        </button>
        <button
          type="button"
          className="button button--link"
          onClick={onSwitchToRegister}
        >
          <FormattedMessage id="sign_up" />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
