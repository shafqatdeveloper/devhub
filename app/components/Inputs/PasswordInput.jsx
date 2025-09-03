"use client";
import React, { useState } from "react";
import FieldWrapper from "./FieldWrapper";
import { baseInputClass, invalidClass } from "./inputStyles";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { mergeRefs,splitRHFProps } from "../ui/refUtils";

export default function PasswordInput({
  id,
  label,
  error,
  className = "",
  required,
  description,
  ref: inputRef,  // parent ref
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);
  const [show, setShow] = useState(false);

  return (
    <FieldWrapper id={id} label={label} required={required} description={description} error={error}>
      <div className="relative w-full">
        <input
          id={id}
          ref={mergeRefs(rhfRef, inputRef)}
          type={show ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          className={[baseInputClass, error ? invalidClass : "", className, "pr-10"].join(" ")}
          {...fieldProps}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </FieldWrapper>
  );
}
