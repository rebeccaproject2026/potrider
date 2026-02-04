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

const BAR_COLORS = {
  pending: "bg-[#0066FF]",
  inProgress: "bg-[#FF9800]",
  delivered: "bg-[#109F22]",
  cancelled: "bg-[#F44336]",
};

/**
 * Reusable delivery card for Tracking map – matches reference: driver, ETA, status, address, total orders stacked bar + legend.
 * Slightly reduced size for a cleaner map overlay.
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
  const total = pending + inProgress + delivered + cancelled || 1;
  const segments = [
    { key: "pending", count: pending, color: BAR_COLORS.pending },
    { key: "inProgress", count: inProgress, color: BAR_COLORS.inProgress },
    { key: "delivered", count: delivered, color: BAR_COLORS.delivered },
    { key: "cancelled", count: cancelled, color: BAR_COLORS.cancelled },
  ].filter((s) => s.count > 0);

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden w-full max-w-[260px] ${className}`}
    >
      <div className="p-2.5">
        {/* Driver row: avatar, name + badge, share/chat icons */}
        <div className="flex items-start gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={driverName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-[11px] font-semibold uppercase">
                {driverName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-gray-900 text-[12px] truncate">
                {driverName}
              </span>
              <span
                className={`shrink-0 inline-flex px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                  isOnline
                    ? "bg-[#D4FFDA] text-[#109F22]"
                    : "bg-[#FEECEB] text-[#F44336]"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={() => onShare?.()}
              className="p-1 rounded text-gray-600 hover:bg-gray-100"
              aria-label="Share"
            >
              <Icon icon="mdi:share-variant-outline" className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChat?.()}
              className="p-1 rounded text-gray-600 hover:bg-gray-100"
              aria-label="Chat"
            >
              <Icon icon="mdi:chat-outline" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ETA + delivery status on same row */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-[11px] text-gray-600 truncate">ETA: {eta}</p>
          <div className="flex items-center gap-1 shrink-0">
            <span
              className={`w-1 h-1 rounded-full shrink-0 ${statusStyle.dot}`}
            />
            <span className={`text-[11px] font-semibold ${statusStyle.text}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Address */}
        <p className="text-[11px] text-gray-700 mb-2 leading-tight">
          {address}
        </p>

        {/* Total Orders with box icon + stacked bar + legend */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Icon
              icon="mdi:package-variant"
              className="w-3.5 h-3.5 text-gray-500 shrink-0"
            />
            <p className="text-[11px] font-semibold text-gray-900">
              Total Orders ({totalOrders})
            </p>
          </div>
          {/* Horizontal stacked bar */}
          <div className="flex h-2 rounded overflow-hidden bg-gray-100 mb-1.5">
            {segments.map((seg) => (
              <div
                key={seg.key}
                className={`${seg.color} min-w-[4px]`}
                style={{ width: `${(seg.count / total) * 100}%` }}
                title={`${seg.key}: ${seg.count}`}
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[10px] text-gray-500">
            {pending > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#0066FF]" />
                Pending
              </span>
            )}
            {inProgress > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#FF9800]" />
                In-Progress
              </span>
            )}
            {delivered > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#109F22]" />
                Delivered
              </span>
            )}
            {cancelled > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#F44336]" />
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
