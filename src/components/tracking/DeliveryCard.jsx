import { Icon } from "@iconify/react";

const STATUS_COLORS = {
  Pending: { bg: "bg-[#E3EEFF]", text: "text-[#0066FF]", dot: "bg-[#0066FF]" },
  "In-progress": {
    bg: "bg-[#FFF5E5]",
    text: "text-[#FF9800]",
    dot: "bg-[#FF9800]",
  },
  Delivered: {
    bg: "bg-[#D4FFDA]",
    text: "text-[#109F22]",
    dot: "bg-[#109F22]",
  },
  Cancelled: {
    bg: "bg-[#FEECEB]",
    text: "text-[#F44336]",
    dot: "bg-[#F44336]",
  },
};

/**
 * Reusable delivery card for Tracking page – driver info, ETA, status, address, order breakdown.
 * Matches the order-page style and the tracking map overlay design.
 * @param {Object} props
 * @param {string} props.driverName - Driver display name
 * @param {string} [props.avatar] - Optional image URL for driver avatar
 * @param {boolean} [props.isOnline=true] - Online/Offline badge
 * @param {string} props.eta - ETA text e.g. "20 Jan 2025 at 11:00pm"
 * @param {string} props.status - "Pending" | "In-progress" | "Delivered" | "Cancelled"
 * @param {string} props.address - Delivery address
 * @param {number} props.totalOrders - Total order count
 * @param {Object} [props.breakdown] - { pending, inProgress, delivered, cancelled } counts
 * @param {string} [props.className] - Extra wrapper class (e.g. for map positioning)
 * @param {Function} [props.onShare] - Share button click
 * @param {Function} [props.onChat] - Chat button click
 */
const DeliveryCard = ({
  driverName,
  avatar,
  isOnline = true,
  eta,
  status,
  address,
  totalOrders = 0,
  breakdown = {},
  className = "",
  onShare,
  onChat,
}) => {
  const {
    pending = 0,
    inProgress = 0,
    delivered = 0,
    cancelled = 0,
  } = breakdown;
  const statusStyle = STATUS_COLORS[status] || STATUS_COLORS.Pending;

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden w-full max-w-[320px] ${className}`}
    >
      <div className="p-3">
        {/* Driver row: avatar, name, badge, share/chat */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={driverName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm font-semibold">
                {driverName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm truncate">
                {driverName}
              </span>
              <span
                className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  isOnline
                    ? "bg-[#D4FFDA] text-[#109F22]"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onShare?.()}
              className="p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Share"
            >
              <Icon icon="mdi:share-variant-outline" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChat?.()}
              className="p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Chat"
            >
              <Icon icon="mdi:chat-outline" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ETA */}
        <p className="text-xs text-gray-600 mb-1.5">ETA: {eta}</p>

        {/* Current delivery status */}
        <div className="flex items-center gap-1.5 mb-2">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusStyle.dot}`}
          />
          <span className={`text-sm font-semibold ${statusStyle.text}`}>
            {status}
          </span>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-700 mb-3">{address}</p>

        {/* Total Orders breakdown */}
        <div>
          <p className="text-xs font-semibold text-gray-900 mb-1.5">
            Total Orders ({totalOrders})
          </p>
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {pending > 0 && (
              <span className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 rounded text-xs font-medium bg-[#E3EEFF] text-[#0066FF]">
                {pending}
              </span>
            )}
            {inProgress > 0 && (
              <span className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 rounded text-xs font-medium bg-[#FFF5E5] text-[#FF9800]">
                {inProgress}
              </span>
            )}
            {delivered > 0 && (
              <span className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 rounded text-xs font-medium bg-[#D4FFDA] text-[#109F22]">
                {delivered}
              </span>
            )}
            {cancelled > 0 && (
              <span className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 rounded text-xs font-medium bg-[#FEECEB] text-[#F44336]">
                {cancelled}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500">
            {pending > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />{" "}
                Pending
              </span>
            )}
            {inProgress > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9800]" />{" "}
                In-Progress
              </span>
            )}
            {delivered > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#109F22]" />{" "}
                Delivered
              </span>
            )}
            {cancelled > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F44336]" />{" "}
                Canceled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
