// src/index.js

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import "./index.css";
import App from "./App";
import { messages } from "./i18n/messages";
import { ThemeProvider } from "./context/ThemeContext";
import { getInitialLocale } from "./i18n/getInitialLocale";

const Root = () => {
  const [locale, setLocale] = useState(getInitialLocale());

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider>
        <App setLocale={setLocale} />
      </ThemeProvider>
    </IntlProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
