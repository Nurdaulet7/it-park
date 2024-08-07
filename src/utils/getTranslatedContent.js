// src/utils/translationUtils.js

export const getTranslatedContent = (data, field, locale) => {
  if (!data) return "";
  switch (locale) {
    case "ru-RU":
      return data[`${field}_ru`];
    case "kk-KZ":
      return data[`${field}_kk`];
    case "en-US":
      return data[`${field}_en`];
    default:
      return data[`${field}_kk`];
  }
};
