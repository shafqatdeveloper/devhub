"use client";
import React, { useEffect, useMemo, useState } from "react";
import FieldWrapper from "./FieldWrapper";
import { baseInputClass, invalidClass } from "./inputStyles";
import { mergeRefs, splitRHFProps } from "../ui/refUtils";

export default function FileInput({
  id,
  label,
  error,
  className = "",
  required,
  description,
  onFileSelect,
  multiple = false,
  accept,
  preview = true,
  ref: inputRef,
  ...rest
}) {
  const { rhfRef, fieldProps } = splitRHFProps(rest);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    fieldProps.onChange?.(e); // keep RHF in the loop

    const files = e.target.files;
    if (!files || files.length === 0) {
      onFileSelect?.(null);
      setPreviewUrl((u) => (u ? (URL.revokeObjectURL(u), null) : null));
      return;
    }
    onFileSelect?.(multiple ? Array.from(files) : files[0]);

    if (preview && files[0]?.type?.startsWith("image/")) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return url;
      });
    } else {
      setPreviewUrl((u) => (u ? (URL.revokeObjectURL(u), null) : null));
    }
  };

  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  const fileInputClass = useMemo(
    () =>
      [
        baseInputClass,
        error ? invalidClass : "",
        className,
        "file:mr-3 file:rounded file:border-0 file:bg-primaryLight file:text-white",
        "file:px-3 file:py-1.5 file:cursor-pointer",
        "text-textBlack dark:text-textWhite",
      ].join(" "),
    [className, error]
  );

  return (
    <FieldWrapper id={id} label={label} required={required} description={description} error={error}>
      <input
        id={id}
        ref={mergeRefs(rhfRef, inputRef)}
        type="file"
        accept={accept}
        multiple={multiple}
        aria-invalid={error ? true : undefined}
        className={fileInputClass}
        required={required}
        onChange={handleChange}
        {...fieldProps}
      />

      {preview && previewUrl ? (
        <div className="mt-3">
          <img
            src={previewUrl}
            alt="Selected preview"
            className="h-24 w-24 rounded object-cover ring-1 ring-black/10"
          />
        </div>
      ) : null}
    </FieldWrapper>
  );
}
