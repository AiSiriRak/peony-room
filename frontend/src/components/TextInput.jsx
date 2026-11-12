export function TextInput({
  value,
  onChange,
  type = "text",
  className = "",
  multiline = false,
  borderWeight = "border-2",
  ...props
}) {
  const commonClasses = `
    ${borderWeight} rounded-full border-black px-5 py-3 text-subtle focus:outline-none focus:ring-0
    ${className}
  `;

  if (multiline) {
    return (
      <textarea
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`resize-none ${commonClasses}`}
      />
    );
  }

  return (
    <input
      {...props}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={commonClasses}
    />
  );
}
