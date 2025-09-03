"use client";
import React from "react";
import FieldWrapper from "./FieldWrapper";
import { baseInputClass, invalidClass } from "./inputStyles";
import { mergeRefs, splitRHFProps } from "../ui/refUtils";

export default function Select({
  id,
  label,
  error,
  className = "",
  required,
  description,
  children,
  ref: inputRef,
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);

  return (
    <FieldWrapper id={id} label={label} required={required} description={description} error={error}>
      <select
        id={id}
        ref={mergeRefs(rhfRef, inputRef)}
        aria-invalid={error ? true : undefined}
        className={[baseInputClass, error ? invalidClass : "", className].join(" ")}
        {...fieldProps}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
