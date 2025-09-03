"use client";
import React from "react";
import { mergeRefs, splitRHFProps } from "../ui/refUtils";

export default function Checkbox({
  id,
  label,
  error,
  description,
  className = "",
  ref: inputRef,
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);

  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        ref={mergeRefs(rhfRef, inputRef)}
        type="checkbox"
        aria-invalid={error ? true : undefined}
        className={[
          "mt-1 h-4 w-4 rounded border border-gray-600",
          error ? "border-red-500" : "",
          className,
        ].join(" ")}
        {...fieldProps}
      />
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-textBlack dark:text-textWhite">
          {label}
        </label>
        {description ? <p className="text-xs text-gray-500">{description}</p> : null}
        {error ? (
          <p className="text-xs text-red-600">
            {error?.message?.toString?.() || "Invalid value"}
          </p>
        ) : null}
      </div>
    </div>
  );
}
