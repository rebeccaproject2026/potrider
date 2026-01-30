import { ChevronDown } from "lucide-react";

/**
 * Reusable Select Component
 * @param {Object} props
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {Array<{value: string, label: string}>} props.options - Options array
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.minWidth - Minimum width (e.g., "100px")
 */
const Select = ({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  className = "",
  minWidth = "100px",
}) => {
  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={onChange}
        className={`head-dr-dropdown form-select px-2.5 py-2 text-[13px] border border-gray-300 rounded-sm bg-white text-gray-700 focus:outline-none appearance-none cursor-pointer shadow-none ${className}`}
        style={{ minWidth }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default Select;
