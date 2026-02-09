/**
 * Finance summary card – matches dashboard card design:
 * White bg, rounded corners, soft shadow, title + value and percentage on one row.
 * Positive change = green, negative = red.
 */
const FinanceSummaryCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-[#F9FAFB] rounded-sm shadow-sm p-4 border border-gray-200">
      <p className="text-[13.5px] font-semibold text-[#3F4753] mb-2">{title}</p>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-semibold text-[#000000] truncate">
          {value}
        </span>
        <span
          className={`text-sm font-semibold shrink-0 ${isPositive ? "text-green-600" : "text-red-600"
            }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default FinanceSummaryCard;
