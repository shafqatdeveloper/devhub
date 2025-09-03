"use client";
import React from "react";

export default function FieldWrapper({
  id,
  label,
  required,
  description,
  error,
  labelHidden = false,
  children,
}) {
  const errorText =
    typeof error === "string"
      ? error
      : error?.message?.toString?.() || null;

  const descId = description ? `${id}-desc` : undefined;
  const errId = errorText ? `${id}-err` : undefined;
  let child = children;
  if (React.isValidElement(children)) {
    const prevDescribedBy = children.props["aria-describedby"];
    const describedBy = [prevDescribedBy, descId, errId].filter(Boolean).join(" ") || undefined;

    child = React.cloneElement(children, {
      id,                
      "aria-describedby": describedBy,
    });
  }

  return (
    <div className="space-y-2">
      {label ? (
        <label
          htmlFor={id}
          className={
            labelHidden
              ? "sr-only"
              : "block text-sm font-medium text-textBlack dark:text-textWhite"
          }
        >
          {label} {required ? <span aria-hidden>*</span> : null}
        </label>
      ) : null}

      {child}

      {description ? (
        <p id={descId} className="text-xs text-gray-500">
          {description}
        </p>
      ) : null}

      {errorText ? (
        <p id={errId} role="alert" className="text-xs text-red-600">
          {errorText}
        </p>
      ) : null}
    </div>
  );
}
