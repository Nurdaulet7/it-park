import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";
import InputField from "./InputField";

const ResidentForm = ({ isOpen, onClose }) => {
  const { formatMessage } = useIntl();

  const initialFormData = {
    companyName: "",
    activityField: "",
    fullName: "",
    phone: "",
    email: "",
  };

  const scheme = z.object({
    companyName: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "fieldNotEmpty" }))
      .refine((val) => val.length > 0, formatMessage({ id: "fieldNotEmpty" })),
    activityField: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "digitalizationNotSelected" }))
      .refine(
        (val) => val.length > 0,
        formatMessage({ id: "digitalizationNotSelected" })
      ),
    fullName: z
      .string()
      .trim()
      .min(1, formatMessage({ id: "fieldNotEmpty" }))
      .regex(/^[\p{L}\s-]+$/u, formatMessage({ id: "invalidName" }))
      .max(60, formatMessage({ id: "maxLengthExceeded" })),
    phone: z
      .string()
      .min(10, formatMessage({ id: "phoneMinLength" }))
      .regex(/^\d+$/, formatMessage({ id: "phoneDigitsOnly" })),
    email: z.string().email(formatMessage({ id: "invalidEmail" })),
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

    const fieldScheme = scheme.shape[name];
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

    const validationResult = scheme.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log(validationResult.data);
      setFormData(initialFormData);
      handleClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    setFormData(initialFormData);
    onClose();
  };

  return (
    <form className="register-form form" onSubmit={handleSubmit}>
      <h4>{formatMessage({ id: "become_resident" })}</h4>
      <div className="inputs">
        <InputField
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder={formatMessage({ id: "company_name" })}
          error={errors.companyName}
        />

        <SelectField
          name="activityField"
          value={formData.activityField}
          onChange={handleChange}
          placeholder={formatMessage({ id: "digitalization" })}
          error={errors.activityField}
        />

        <InputField
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={formatMessage({ id: "full_name" })}
          error={errors.fullName}
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
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={formatMessage({ id: "email" })}
          error={errors.email}
        />
      </div>
      <button type="submit" className="button">
        <FormattedMessage id="send" />
      </button>
    </form>
  );
};

const SelectField = ({ name, value, onChange, placeholder, error }) => (
  <>
    <select
      className="button--form-input-select button"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      <option value="Образование">
        <FormattedMessage id="education" />
      </option>
      <option value="Здравоохранение">
        <FormattedMessage id="healthcare" />
      </option>
      <option value="Финансы">
        <FormattedMessage id="finance" />
      </option>
      <option value="Торговля">
        <FormattedMessage id="commerce" />
      </option>
      <option value="IT">IT</option>
    </select>
    {error && <span className="error">{error}</span>}
  </>
);

export default ResidentForm;
