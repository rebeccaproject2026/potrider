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
      <p className={`text-sm font-semibold ${titleColor} mb-2`}>{title}</p>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBgColor} ${iconColor}`}
          >
            <User className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">{count}</span>
        </div>
        <span className="text-sm font-medium text-green-600 shrink-0">
          {change}
        </span>
      </div>
      <button
        type="button"
        onClick={onView}
        className="mt-2 flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium"
      >
        <Eye className="w-4 h-4" />
        View
      </button>
    </div>
  );
};

export default CustomerSummaryCard;
