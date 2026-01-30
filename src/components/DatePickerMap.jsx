import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Get start of day in ISO string
 */
const startOfDay = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

/**
 * Get end of day in ISO string
 */
const endOfDay = (d) => {
  const date = new Date(d);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
};

/**
 * Get start of month
 */
const startOfMonth = (d) => {
  const date = new Date(d);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

/**
 * Get end of month
 */
const endOfMonth = (d) => {
  const date = new Date(d);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
};

/**
 * Build date range options (same as Vue DatePickerMap)
 */
const getDateRangeOptions = () => {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);

  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const last30Start = new Date(now);
  last30Start.setDate(last30Start.getDate() - 30);

  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const lastMonthStart = startOfMonth(lastMonth);
  const lastMonthEnd = endOfMonth(lastMonth);

  const last3MonthsStart = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const last3MonthsEnd = new Date(now.getFullYear(), now.getMonth() - 1, 0);
  last3MonthsEnd.setHours(23, 59, 59, 999);

  return [
    {
      title: "Today",
      showDriver: true,
      value: { start: todayStart, end: todayEnd },
    },
    {
      title: "Yesterday",
      value: {
        start: startOfDay(yesterday),
        end: endOfDay(yesterday),
      },
    },
    {
      title: "This Month",
      value: { start: thisMonthStart, end: thisMonthEnd },
    },
    {
      title: "Last Week",
      value: {
        start: startOfDay(lastWeekStart),
        end: todayEnd,
      },
    },
    {
      title: "Last 30 Days",
      value: {
        start: startOfDay(last30Start),
        end: todayEnd,
      },
    },
    {
      title: "Last Month",
      value: { start: lastMonthStart, end: lastMonthEnd },
    },
    {
      title: "Last 3 Months",
      value: {
        start: last3MonthsStart.toISOString(),
        end: last3MonthsEnd.toISOString(),
      },
    },
  ];
};

// Options are built fresh when needed so "Today", "This Month" etc. are current

/**
 * DatePickerMap - Reusable time period selector (matches Vue DatePickerMap)
 * Use anywhere: Dashboard, Finances, Orders, etc.
 *
 * @param {number} defaultItem - Index of default option (0=Today, 1=Yesterday, 2=This Month, ...)
 * @param {function} onUpdate - Callback when selection changes: ({ start, end, showDriver }) => void
 * @param {string} className - Optional extra classes for the trigger button
 */
const DatePickerMap = ({
  defaultItem = 2,
  onUpdate,
  className = "",
}) => {
  const initialOption = useMemo(
    () => getDateRangeOptions()[defaultItem] ?? getDateRangeOptions()[2],
    [defaultItem]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialOption);
  const containerRef = useRef(null);
  const hasNotifiedMount = useRef(false);

  // Sync selected when defaultItem changes (e.g. prop reset)
  useEffect(() => {
    const opts = getDateRangeOptions();
    const option = opts[defaultItem] ?? opts[2];
    setSelected(option);
  }, [defaultItem]);

  // Notify parent of initial selection once on mount (stable deps to avoid infinite loop)
  useEffect(() => {
    if (hasNotifiedMount.current) return;
    hasNotifiedMount.current = true;
    const opts = getDateRangeOptions();
    const option = opts[defaultItem] ?? opts[2];
    onUpdate?.({
      start: option.value.start,
      end: option.value.end,
      showDriver: option.showDriver,
    });
    // Intentionally omit onUpdate from deps: we only want to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultItem]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onUpdate?.({
      start: option.value.start,
      end: option.value.end,
      showDriver: option.showDriver,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger - matches image: white bg, light grey border, rounded, chevron */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#D9D9D9] rounded-sm text-[#3F4753] hover:bg-gray-50 transition-colors shadow-sm min-w-[240px] justify-between"
      >
        <span className="text-sm font-medium">{selected.title}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#3F4753] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-[999]">
          {getDateRangeOptions().map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${selected.title === option.title
                ? "bg-green-50 text-[var(--color-primary)] font-medium"
                : "text-gray-700"
                }`}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatePickerMap;
