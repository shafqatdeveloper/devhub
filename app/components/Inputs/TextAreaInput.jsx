"use client";
import React from "react";
import FieldWrapper from "./FieldWrapper";
import { baseInputClass, invalidClass } from "./inputStyles";
import { mergeRefs, splitRHFProps } from "../ui/refUtils";

export default function TextArea({
  id,
  label,
  error,
  className = "",
  required,
  description,
  rows = 4,
  ref: inputRef,
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);

  return (
    <FieldWrapper id={id} label={label} required={required} description={description} error={error}>
      <textarea
        id={id}
        ref={mergeRefs(rhfRef, inputRef)}
        rows={rows}
        aria-invalid={error ? true : undefined}
        className={[baseInputClass, "min-h-[120px]", error ? invalidClass : "", className].join(" ")}
        {...fieldProps}
      />
    </FieldWrapper>
  );
}
