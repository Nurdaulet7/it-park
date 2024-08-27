import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthForm = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return isLogin ? (
    <LoginForm
      onSwitchToRegister={switchToRegister}
      isOpen={isOpen}
      onClose={onClose}
    />
  ) : (
    <RegisterForm
      onSwitchToLogin={switchToLogin}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default AuthForm;
