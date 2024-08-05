import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import "./index.css";
import App from "./App";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";
import { ThemeProvider } from "./context/ThemeContext";

const locale = LOCALES.KAZAKH;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </IntlProvider>
);
