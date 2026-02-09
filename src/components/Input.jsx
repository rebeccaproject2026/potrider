const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled = false,
  error = false,
  rightIcon,
  prefix,
  suffix,
  className = "",
  containerClassName = "", // For styling the parent wrapper div
  labelClassName = "",
  compact = false,
  width = "full", // Can be "full", "auto", or any Tailwind width class like "w-32", "w-48", etc.
  ...rest
}) => {
  const paddingY = compact ? "py-2" : "py-3";
  // Handle width prop: can be "full", "auto", Tailwind class like "w-32", or just "32" (will become w-32)
  let widthClass = "w-full"; // default
  if (width === "full") {
    widthClass = "w-full";
  } else if (width === "auto") {
    widthClass = "w-auto";
  } else if (width && width.startsWith("w-")) {
    widthClass = width; // Already has w- prefix
  } else if (width) {
    widthClass = `w-${width}`; // Add w- prefix if not present
  }

  // Check if className contains a background class - if so, don't add bg-white
  const hasCustomBg = className && /bg-/.test(className);
  const bgClass = hasCustomBg ? "" : "bg-white";

  const baseInputClass = `${widthClass} px-3 ${paddingY} text-sm border ${bgClass} text-[0000] font-medium placeholder-gray-600 focus:outline-none  `;
  const borderClass = error ? "border-red-500" : "border-[#DDDDDD]";

  // Determine border radius based on prefix/suffix
  let roundedClass = "rounded-sm";
  if (prefix && !suffix) {
    roundedClass = "rounded-r-sm rounded-l-none";
  } else if (suffix && !prefix) {
    roundedClass = "rounded-l-sm rounded-r-none";
  } else if (prefix && suffix) {
    roundedClass = "rounded-none";
  }

  const inputClass = `${baseInputClass} ${borderClass} ${roundedClass} ${rightIcon ? "pr-10" : ""} ${className}`.trim();

  const inputEl = (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={id}
      disabled={disabled}
      className={inputClass}
      {...rest}
    />
  );

  // Container width: use full width if width is "full", otherwise auto to let input control its width
  const containerWidthClass = width === "full" ? "w-full" : "w-auto";
  const containerClass = `${containerWidthClass} ${containerClassName}`.trim();

  return (
    <div className={containerClass}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm ${compact ? "mb-0.5" : "mb-1"} ${labelClassName?.includes("font-") ? "" : "font-semibold"} ${labelClassName?.includes("text-") ? "" : "text-[#212121]"} ${labelClassName}`.trim()}
        >
          {label}
        </label>
      )}
      {prefix || suffix ? (
        <div className="flex">
          {prefix && (
            <span className={`inline-flex items-center px-3 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-r-0 border-[#DDDDDD] ${error ? "border-red-500" : ""} rounded-l-sm`}>
              {prefix}
            </span>
          )}
          {inputEl}
          {suffix && (
            <span className={`inline-flex items-center px-3 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-l-0 border-[#DDDDDD] ${error ? "border-red-500" : ""} rounded-r-sm`}>
              {suffix}
            </span>
          )}
        </div>
      ) : rightIcon ? (
        <div className="relative">
          {inputEl}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 flex items-center justify-center">
            {rightIcon}
          </span>
        </div>
      ) : (
        inputEl
      )}
    </div>
  );
};

export default Input;
