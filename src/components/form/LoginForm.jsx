import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const LoginForm = ({ onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <form className="register-form  form" onSubmit={handleSubmit}>
      <h4>
        <FormattedMessage id="login" />
      </h4>
      <div className="inputs">
        <input
          className="button--form-input button"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "username" })}
        />
        <input
          className="button--form-input button"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "password" })}
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

export const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <form className="register-form form" onSubmit={handleSubmit}>
      <h4>
        <FormattedMessage id="sign_up" />
      </h4>
      <div className="inputs">
        <input
          className="button--form-input button"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "organization_name" })}
        />
        <input
          className="button--form-input button"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "email" })}
        />
        <input
          className="button--form-input button"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "phone" })}
        />
        <input
          className="button--form-input button"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "username" })}
        />
        <input
          className="button--form-input button"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder={formatMessage({ id: "password" })}
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

const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return isLogin ? (
    <LoginForm onSwitchToRegister={switchToRegister} onClose={onClose} />
  ) : (
    <RegisterForm onSwitchToLogin={switchToLogin} onClose={onClose} />
  );
};

export default AuthForm;
