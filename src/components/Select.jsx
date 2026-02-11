import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Reusable Select – search, single/multi, avatar, product info. All configurable via props.
 *
 * @param {string} [title] - Trigger button title when nothing selected
 * @param {Array} [options=[]] - Options: { value, label?, name?, image?, priceRange?, stockStatus?, meta? } or use getters
 * @param {Function} [onSelect] - (label) => void – single select callback
 * @param {string} [selectOption] - Selected label (single mode)
 * @param {string} [customStyle] - Wrapper className
 * @param {boolean} [showSearch=false] - Show search input inside dropdown
 * @param {string} [searchLabel] - Label above search input (inside dropdown)
 * @param {string} [searchPlaceholder] - Placeholder for search input (default "Search here...")
 * @param {boolean} [multiple=false] - Multi-select with checkboxes
 * @param {Array} [value] - Selected value(s): single = value, multiple = array of values
 * @param {Function} [onChange] - (e) => void, e.target.value = value or array of values
 * @param {string} [placeholder] - Placeholder when empty
 * @param {boolean} [showCheckbox] - Show checkbox per option (default true when multiple)
 * @param {boolean} [showAvatar=false] - Show avatar/image left of each option (use option.image)
 * @param {boolean} [showProductInfo=false] - Show product layout: name, price/stock, meta
 * @param {Function} [getOptionValue] - (option) => value; default: (o) => o.value
 * @param {Function} [getOptionLabel] - (option) => label; default: (o) => o.label ?? o.name
 * @param {Function} [getOptionImage] - (option) => image url; default: (o) => o.image ?? o.avatar
 * @param {Function} [getOptionMeta] - (option) => meta string; default: (o) => o.meta
 * @param {string} [minWidth] - Min width for wrapper
 */
const Select = ({
  title,
  options = [],
  onSelect,
  selectOption,
  customStyle = "",
  showSearch = false,
  searchLabel,
  searchPlaceholder = "Search here...",
  multiple = false,
  value,
  onChange,
  placeholder = "Select...",
  showCheckbox,
  showAvatar = false,
  showProductInfo = false,
  getOptionValue = (o) => o.value,
  getOptionLabel = (o) => o.label ?? o.name ?? "",
  getOptionImage = (o) => o.image ?? o.avatar ?? "",
  getOptionMeta = (o) => o.meta ?? "",
  minWidth = "100px",
  compact = false,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const isValueOnChangeMode = value !== undefined && onChange;
  const isMulti = multiple || Array.isArray(value);
  const selectedValues =
    isMulti && Array.isArray(value)
      ? value
      : value != null && value !== ""
        ? [value]
        : [];
  const displayTitle = isValueOnChangeMode ? placeholder : title;

  const getDisplayOption = () => {
    if (isMulti) {
      if (selectedValues.length === 0) return "";
      if (selectedValues.length === 1) {
        const opt = options.find(
          (o) => getOptionValue(o) === selectedValues[0]
        );
        return opt ? getOptionLabel(opt) : String(selectedValues[0]);
      }
      return `${selectedValues.length} items selected`;
    }
    if (isValueOnChangeMode) {
      const opt = options.find((o) => getOptionValue(o) === value);
      return opt ? getOptionLabel(opt) : "";
    }
    return selectOption ?? "";
  };

  const displayOption = getDisplayOption();

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const isSelected = (item) => selectedValues.includes(getOptionValue(item));

  const handleSelectOption = (item) => {
    if (disabled) return;
    const val = getOptionValue(item);
    const label = getOptionLabel(item);

    if (isMulti) {
      const next = isSelected(item)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      if (onChange) onChange({ target: { value: next } });
      return;
    }

    if (isValueOnChangeMode) {
      onChange({ target: { value: val } });
    } else if (onSelect) {
      onSelect(label);
    }
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const filteredOptions = showSearch
    ? options.filter((item) =>
      getOptionLabel(item)?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : options;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, showSearch]);

  const handleKeyDown = (e) => {
    if (!isOpen || disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectOption(filteredOptions[highlightedIndex]);
    }
  };

  const renderOptionContent = (item, index) => {
    const label = getOptionLabel(item);
    const image = showAvatar ? getOptionImage(item) : null;
    const isHighlighted =
      highlightedIndex === index ||
      (!isMulti && displayOption === label) ||
      (isMulti && isSelected(item));
    const priceRange = item.priceRange ?? item.price ?? "";
    const stockStatus = item.stockStatus ?? "";
    const meta = showProductInfo ? getOptionMeta(item) : "";

    if (showProductInfo || showAvatar) {
      return (
        <div
          className={`group flex items-start gap-3 px-2 py-1 cursor-pointer border-b border-gray-100 last:border-0 transition
        ${isHighlighted
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-900 hover:bg-[var(--color-secondary)]"
            }`}
          onClick={() => handleSelectOption(item)}
        >
          {showCheckbox !== false && isMulti && (
            <span className="shrink-0 flex items-center pt-0.5">
              <input
                type="checkbox"
                checked={isSelected(item)}
                onChange={() => handleSelectOption(item)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </span>
          )}

          {showAvatar && (
            <div className="w-14 h-14 rounded-sm shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-lg group-hover:text-white">📦</span>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p
              className={`font-bold text-sm transition
            ${isHighlighted
                  ? "text-white"
                  : "text-gray-900 group-hover:text-white"
                }`}
            >
              {label}
            </p>

            {showProductInfo && (priceRange || stockStatus) && (
              <p
                className={`text-xs font-semibold mt-0.5 transition
              ${isHighlighted
                    ? "text-blue-100"
                    : "text-gray-600 group-hover:text-white"
                  }`}
              >
                {priceRange} {stockStatus ? `(${stockStatus})` : ""}
              </p>
            )}

            {showProductInfo && meta && (
              <p
                className={`text-xs mt-1 font-medium truncate transition
              ${isHighlighted
                    ? "text-blue-100"
                    : "text-gray-400 group-hover:text-white"
                  }`}
              >
                {meta}
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <li
        onClick={() => handleSelectOption(item)}
        className={`px-2.5 py-2 cursor-pointer border-b border-gray-100 last:border-0 transition flex items-center gap-2 ${isHighlighted ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
          } ${displayOption === label ? "bg-gray-200 font-medium" : ""} ${highlightedIndex === index ? "bg-blue-100" : ""
          }`}
      >
        {showCheckbox !== false && isMulti && (
          <input
            type="checkbox"
            checked={isSelected(item)}
            onChange={() => handleSelectOption(item)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
          />
        )}
        <span>{label}</span>
      </li>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative min-w-0 block w-full ${customStyle}`}
      style={minWidth ? { minWidth } : undefined}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`head-dr-dropdown form-select w-full px-2.5 text-[13px] border border-[#DDDDDD] rounded-sm font-medium focus:outline-none shadow-none flex items-center justify-between pr-8 transition-colors placeholder-gray-600 ${compact ? "min-h-[32px] py-2" : "min-h-[38px] py-3"
          } ${disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-gray-900 cursor-pointer"
          } ${className}`}
      >
        <span className="overflow-hidden whitespace-nowrap text-sm flex-1 text-left text-gray-600">
          {displayOption || displayTitle}
        </span>
        <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 flex items-center justify-center ${disabled ? "text-gray-300" : "text-gray-500"}`}>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-1 w-full bg-white rounded-sm border border-gray-300 shadow-lg max-h-72 overflow-hidden flex flex-col">
          {showSearch && (
            <div className="p-2 border-b border-gray-200 shrink-0">
              {searchLabel && (
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {searchLabel}
                </label>
              )}
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className="w-full px-2.5 py-1.5 text-[13px] border border-[#000] rounded-sm bg-white text-gray-700 placeholder-gray-600 focus:outline-none "
              />
            </div>
          )}

          {showProductInfo || showAvatar ? (
            <div className="text-[13px] text-gray-700 max-h-60 overflow-y-auto flex-1 min-h-0">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item, index) => (
                  <div key={getOptionValue(item) ?? index}>
                    {renderOptionContent(item, index)}
                  </div>
                ))
              ) : (
                <div className="px-2.5 py-2 text-gray-400">
                  No results found
                </div>
              )}
            </div>
          ) : (
            <ul className="text-[13px] text-gray-700 max-h-60 overflow-y-auto flex-1 min-h-0">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item, index) => (
                  <React.Fragment key={getOptionValue(item) ?? index}>
                    {renderOptionContent(item, index)}
                  </React.Fragment>
                ))
              ) : (
                <li className="px-2.5 py-2 text-gray-400">No results found</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
