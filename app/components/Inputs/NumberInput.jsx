"use client";
import React from "react";
import FieldWrapper from "./FieldWrapper";
import { baseInputClass, invalidClass } from "./inputStyles";
import { mergeRefs, splitRHFProps } from "../ui/refUtils";

export default function NumberInput({
  id,
  label,
  error,
  className = "",
  required,
  description,
  ref: inputRef,
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);

  return (
    <FieldWrapper id={id} label={label} required={required} description={description} error={error}>
      <input
        id={id}
        type="number"
        ref={mergeRefs(rhfRef, inputRef)}
        aria-invalid={error ? true : undefined}
        className={[baseInputClass, error ? invalidClass : "", className].join(" ")}
        {...fieldProps}
      />
    </FieldWrapper>
  );
}
