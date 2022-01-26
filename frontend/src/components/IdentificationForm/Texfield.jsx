import React from "react";
import { ErrorMessage, useField } from "formik";
import { useLinkClickHandler } from "react-router-dom";

export const Textfield = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={`form-control shadow-none w-50 ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};
