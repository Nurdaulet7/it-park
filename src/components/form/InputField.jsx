import React from "react";

const InputField = ({ type, name, value, onChange, placeholder, error }) => (
  <>
    <input
      className="button--form-input button"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <span className="error">{error}</span>}
  </>
);

export default InputField;
