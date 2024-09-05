import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";
import InputField from "./InputField";

const LoginForm = (props) => {
  const { onSwitchToRegister, isOpen, onClose } = props;
  const { formatMessage } = useIntl();

  const initialLoginData = {
    username: "",
    password: "",
    remember: false,
  };

  const loginSchema = z.object({
    username: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "loginRequired" })),
    password: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "passwordRequired" })),
    remember: z.boolean().optional(),
  });

  const [formData, setFormData] = useState(initialLoginData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialLoginData);
      setErrors({});
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log(validationResult.data);
      setFormData({
        username: "",
        password: "",
        remember: false,
      });
      setErrors({});
      onClose();
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
