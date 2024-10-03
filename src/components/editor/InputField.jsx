import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  isTextarea = false,
}) => {
  return (
    <div className="news-edit__field">
      <label className="news-edit__label" htmlFor={name}>
        {label}:
      </label>
      {isTextarea ? (
        <textarea
          //   className={`news-edit__input button input input__editer ${
          //     error ? "input-error" : ""
          //   }`}
          className="news-edit__input button input input__editer input__editer-textarea"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          className={`news-edit__input button input input__editer ${
            error ? "input-error" : ""
          }`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
