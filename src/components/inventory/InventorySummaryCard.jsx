
const InventorySummaryCard = ({
  label,
  count,
  textColor,
  image,
}) => (
  <div
    className={`rounded-sm border border-gray-200 px-2 overflow-hidden bg-white p-1.5 items-center min-h-[50px]`}
  >
    <p className={`text-sm font-semibold ${textColor} mb-2`}>{label}</p>
    <div className="flex items-center mb-2 gap-2">
      <img
        src={image}
        alt="inventory"
        className="w-10 h-10 object-contain"
      />
      {/* <Icon
        icon={icon}
        className={`w-10 h-10 ${textColor} ${bgLight} rounded-full p-1`}
      /> */}
      <span className={`text-lg font-bold ${textColor}`}>{count} Items</span>
    </div>
  </div>
);

export default InventorySummaryCard;
