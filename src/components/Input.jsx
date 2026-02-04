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
  className = "",
  labelClassName = "",
  compact = false,
  ...rest
}) => {
  const paddingY = compact ? "py-2" : "py-3";
  const baseInputClass = `w-full px-3 ${paddingY} text-sm border rounded-sm bg-white text-[0000] font-medium placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent `;
  const borderClass = error ? "border-red-500" : "border-[#DDDDDD]";
  const inputClass = `${baseInputClass} ${borderClass} ${
    rightIcon ? "pr-10" : ""
  } ${className}`.trim();

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

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-semibold text-[#212121] ${
            compact ? "mb-0.5" : "mb-1"
          } ${labelClassName}`.trim()}
        >
          {label}
        </label>
      )}
      {rightIcon ? (
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
