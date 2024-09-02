import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";
import InputField from "./InputField";

const RegisterForm = ({ onSwitchToLogin, isOpen, onClose }) => {
  const { formatMessage } = useIntl();

  const initialFormData = {
    companyName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  };

  const registerScheme = z.object({
    companyName: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "fieldNotEmpty" })),
    email: z.string().email(formatMessage({ id: "invalidEmail" })),
    phone: z
      .string()
      .min(10, formatMessage({ id: "phoneMinLength" }))
      .regex(/^\d+$/, formatMessage({ id: "phoneDigitsOnly" })),
    username: z
      .string()
      .trim()
      .min(3, formatMessage({ id: "usernameMinLength" }))
      .max(20, formatMessage({ id: "usernameMaxLength" })),
    password: z
      .string()
      .min(8, formatMessage({ id: "passwordMinLength" }))
      .regex(/[a-z]/, formatMessage({ id: "passwordLowercase" }))
      .regex(/[A-Z]/, formatMessage({ id: "passwordUppercase" }))
      .regex(/\d/, formatMessage({ id: "passwordDigit" }))
      .regex(/[@$!%*?&#]/, formatMessage({ id: "passwordSpecialChar" })),
  });

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

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
          autocomplete="new-password"
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
