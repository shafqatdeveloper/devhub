// Set a ref (function or object) to a value
export function setRef(ref, value) {
  if (!ref) return;
  if (typeof ref === "function") ref(value);
  else if ("current" in ref) ref.current = value;
}

// Merge multiple refs into one setter
export function mergeRefs(...refs) {
  return (node) => refs.forEach((r) => setRef(r, node));
}

// Split RHF "rest" props into { rhfRef, fieldProps }
export function splitRHFProps(rest) {
  const { ref: rhfRef, ...fieldProps } = rest || {};
  return { rhfRef, fieldProps };
}
