"use client";
import React from "react";
import FieldWrapper from "./FieldWrapper";
import { baseInputClass, invalidClass } from "./inputStyles";
import { mergeRefs,splitRHFProps } from "../ui/refUtils";

export default function TextInput({
  id,
  label,
  error,
  className = "",
  required,
  description,
  ref: inputRef,   // React 19: ref as prop
  type = "text",
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);

  return (
    <FieldWrapper id={id} label={label} required={required} description={description} error={error}>
      <input
        id={id}
        type={type}
        ref={mergeRefs(rhfRef, inputRef)}
        aria-invalid={error ? true : undefined}
        className={[baseInputClass, error ? invalidClass : "", className].join(" ")}
        {...fieldProps}
      />
    </FieldWrapper>
  );
}

