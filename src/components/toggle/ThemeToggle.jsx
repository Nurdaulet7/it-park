import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Импортируем хук useTheme
import "./ThemeToggle.scss"; // Импортируем стили для переключателя
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Получаем текущую тему и функцию для её изменения

  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div
      className="theme-toggle"
      onClick={handleSwitchTheme}
      data-theme={theme}
    >
      <div className="theme-toggle-ball">
        {theme === "dark" ? <FiSun /> : <FaRegMoon />}
      </div>
    </div>
  );
}

export default ThemeToggle;
