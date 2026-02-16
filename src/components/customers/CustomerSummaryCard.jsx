import { User, Eye } from "lucide-react";

/**
 * Reusable customer summary card:
 * Icon in colored circle, colored title, main count, +% change (green), View link with eye icon.
 */
const CustomerSummaryCard = ({
  title,
  count,
  change = "+ 22%",
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  titleColor = "text-blue-600",
  onView,
}) => {
  return (
    <div className="bg-white rounded-sm shadow-md p-2.5 border border-gray-100">
      <p className={`text-xs font-semibold ${titleColor} mb-2`}>{title}</p>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBgColor} ${iconColor}`}
          >
            <User className="w-5 h-5" />
          </div>
          <span className="text-xl font-semibold text-gray-900">{count}</span>
        </div>
        <span className="text-sm font-bold text-green-600 shrink-0">
          {change}
        </span>
      </div>
      <button
        onClick={onView}
        className="text-[12px] text-[#3F4753] flex items-center gap-1 font-bold underline hover:underline mt-2 cursor-pointer"
      >
        <Eye className="w-4 h-4 " aria-hidden="true" />
        View
      </button>
    </div>
  );
};

export default CustomerSummaryCard;
