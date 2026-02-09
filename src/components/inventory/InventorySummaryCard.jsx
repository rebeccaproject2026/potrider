import { Icon } from "@iconify/react";

/**
 * Reusable inventory summary card – icon + count (e.g. In Stock 210 Items).
 * @param {string} label - e.g. "In Stock", "Low Stock", "Out of Stock"
 * @param {number} count - Item count
 * @param {string} bgLight - Tailwind bg class (e.g. bg-[#D4FFDA])
 * @param {string} textColor - Tailwind text color (e.g. text-[#109F22])
 * @param {string} [icon] - Iconify icon name (default: mdi:package-variant)
 */
const InventorySummaryCard = ({
  label,
  count,
  textColor,
  bgLight,
  icon = "mdi:package-variant",
}) => (
  <div
    className={`rounded-sm border border-gray-200 px-2 overflow-hidden bg-white p-1.5 items-center min-h-[50px]`}
  >
    <p className={`text-sm font-semibold ${textColor} mb-2`}>{label}</p>
    <div className="flex items-center mb-2 gap-2">
      <Icon
        icon={icon}
        className={`w-10 h-10 ${textColor} ${bgLight} rounded-full p-1`}
      />
      <span className={`text-lg font-bold ${textColor}`}>{count} Items</span>
    </div>
  </div>
);

export default InventorySummaryCard;
