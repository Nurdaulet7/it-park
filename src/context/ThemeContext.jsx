import React, { useEffect, createContext, useState, useContext } from "react";

const StorageKey = "features-color-theme";
const supportedThemes = {
  light: "light",
  dark: "dark",
};

const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.'
    );
  }

  return context;
};

const getTheme = () => {
  let theme = localStorage.getItem(StorageKey);

  if (!theme) {
    localStorage.setItem(StorageKey, "light");
    theme = "light";
  }

  return theme;
};

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem(StorageKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
