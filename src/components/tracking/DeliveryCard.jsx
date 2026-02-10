import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import DeliveryDetailsDrawer from "./DeliveryDetailsDrawer";

const MOCK_CHAT_MESSAGES = [
  {
    id: "1",
    from: "user",
    text: "Hi, can you confirm if my order is in progress?",
    time: "10:21 pm",
  },
  {
    id: "2",
    from: "driver",
    text: "Hello! Your package is on its way and will reach you soon. Estimated delivery time: 30 minutes.",
    time: "10:22 pm",
  },
  {
    id: "3",
    from: "user",
    text: "Thank you for the update. Looking forward to receiving my package.",
    time: "09:46 AM",
  },
];

/**
 * Chat popup – opens when user clicks Chat on a delivery card.
 * Compact popup (not full screen): status bar, driver bar, order summary, scrollable chat.
 */
const DeliveryChatDrawer = ({
  open,
  onClose,
  driverName,
  avatar,
  isOnline,
  eta,
  status,
  address,
  pending = 10,
  inProgress = 4,
  delivered = 2,
  cancelled = 3,
}) => {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed right-4 bottom-4 z-50 w-[380px] max-h-[85vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top status bar – colored count boxes */}
        <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#0066FF] shrink-0">
          <div className="bg-[#FFEB3B] text-gray-900 rounded px-2 py-0.5 text-xs font-bold">
            {pending}
          </div>
          <div className="bg-[#FF9800] text-white rounded px-2 py-0.5 text-xs font-bold">
            {inProgress}
          </div>
          <div className="bg-[#109F22] text-white rounded px-2 py-0.5 text-xs font-bold">
            {delivered}
          </div>
          <div className="bg-[#F44336] text-white rounded px-2 py-0.5 text-xs font-bold">
            {cancelled}
          </div>
        </div>

        {/* Driver bar – blue with avatar, name, Online, close */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0066FF] text-white shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={driverName}
              className="w-9 h-9 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              {driverName ? driverName.charAt(0) : "D"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm truncate">
              {driverName || "Driver Name"}
            </p>
            <p className="text-white/90 text-xs">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 shrink-0"
            aria-label="Close chat"
          >
            <Icon icon="mdi:close" className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Scrollable content: order summary + chat */}
        <div className="flex-1 overflow-y-auto min-h-0 bg-[#f5f5f5]">
          {/* Order summary – compact */}
          <div className="bg-white rounded-b-xl shadow-sm px-3 py-3 mb-2">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p className="text-xs text-gray-800">ETA: {eta}</p>
              <span
                className={`text-xs font-bold ${
                  status === "Delivered"
                    ? "text-[#109F22]"
                    : status === "Cancelled"
                      ? "text-[#F44336]"
                      : status === "In-progress"
                        ? "text-[#FF9800]"
                        : "text-[#0066FF]"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${
                  status === "Delivered"
                    ? "bg-[#109F22] w-full"
                    : status === "Cancelled"
                      ? "bg-[#F44336] w-full"
                      : status === "In-progress"
                        ? "bg-[#FF9800] w-2/3"
                        : "bg-[#0066FF] w-1/3"
                }`}
              />
            </div>
            <p className="text-xs text-gray-700 mb-3 line-clamp-2">{address}</p>

            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-gray-100 rounded-lg px-2 py-1.5">
                <p className="text-[9px] text-gray-500">Order Quantity</p>
                <p className="text-xs font-semibold text-gray-900">13 Items</p>
              </div>
              <div className="bg-gray-100 rounded-lg px-2 py-1.5">
                <p className="text-[9px] text-gray-500">Order Amount</p>
                <p className="text-xs font-semibold text-gray-900">$1325.26</p>
              </div>
              <div className="bg-gray-100 rounded-lg px-2 py-1.5">
                <p className="text-[9px] text-gray-500">Payment Method</p>
                <p className="text-xs font-semibold text-gray-900 truncate">
                  Cash on Delivery
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg px-2 py-1.5">
                <p className="text-[9px] text-gray-500">Order Type</p>
                <p className="text-xs font-semibold text-gray-900">Same Day</p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="px-3 pb-4 space-y-2">
            {MOCK_CHAT_MESSAGES.map((msg) =>
              msg.from === "user" ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[90%] rounded-xl rounded-br-md bg-[#0066FF] text-white px-3 py-2 shadow-sm">
                    <p className="text-xs">{msg.text}</p>
                    <p className="text-[9px] text-white/80 mt-0.5">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-start">
                  <div className="max-w-[90%] rounded-xl rounded-bl-md bg-gray-200 text-gray-900 px-3 py-2 shadow-sm">
                    <p className="text-xs">{msg.text}</p>
                    <p className="text-[9px] text-gray-600 mt-0.5 text-right">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Calculate percentages/widths for stacked bar
  const total = pending + inProgress + delivered + cancelled || 1;
  const pPending = (pending / total) * 100;
  const pInProgress = (inProgress / total) * 100;
  const pDelivered = (delivered / total) * 100;
  const pCancelled = (cancelled / total) * 100;

  // Status colors for text and progress line
  const getStatusStyle = (s) => {
    switch (s) {
      case "Delivered":
        return {
          text: "text-[#109F22]",
          bar: "bg-[#109F22]",
          width: "w-full",
        };
      case "Cancelled":
        return {
          text: "text-[#F44336]",
          bar: "bg-[#F44336]",
          width: "w-full",
        };
      case "In-progress":
        return {
          text: "text-[#FF9800]",
          bar: "bg-[#FF9800]",
          width: "w-2/3",
        };
      default:
        return {
          text: "text-[#0066FF]",
          bar: "bg-[#0066FF]",
          width: "w-1/3",
        };
    }
  };

  const style = getStatusStyle(status);

  const handleShareClick = () => {
    setDrawerOpen(true);
    if (onShare) onShare();
  };

  const handleChatClick = () => {
    setChatOpen(true);
    if (onChat) onChat();
  };

  return (
    <>
      <div
        className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full max-w-[300px] ${className}`}
      >
        <div className="p-3">
          {/* Driver row: avatar, name + badge, share/chat icons */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <div className="relative pt-1">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={driverName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold border border-gray-200">
                    {driverName ? driverName.charAt(0) : "D"}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      isOnline
                        ? "bg-[#D4FFDA] text-[#109F22]"
                        : "bg-[#FEECEB] text-[#F44336]"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm leading-tight">
                  {driverName}
                </h4>
              </div>
            </div>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={handleShareClick}
                className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"
              >
                <Icon icon="mdi:export-variant" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleChatClick}
                className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-200"
              >
                <Icon icon="mdi:message-outline" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ETA & Status & Progress Line */}
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-[11px] text-gray-500 font-medium truncate">
                ETA: {eta}
              </p>
              <span className={`text-[11px] font-bold ${style.text}`}>
                {status}
              </span>
            </div>
            {/* Visual Progress Line */}
            <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full rounded-full ${style.bar} ${style.width}`}
              ></div>
            </div>
          </div>

          {/* Address */}
          <p className="text-[11px] text-gray-500 mb-3 pb-3 border-b border-gray-100 leading-tight">
            {address}
          </p>

          {/* Total Orders with box icon */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Icon
                icon="mdi:package-variant-closed"
                className="w-4 h-4 text-gray-700 shrink-0"
              />
              <p className="text-[11px] font-bold text-gray-800">
                Total Orders ({totalOrders})
              </p>
            </div>

            {/* Horizontal stacked bar with numbers inside */}
            <div className="flex h-3.5 w-full rounded overflow-hidden mb-2">
              {pending > 0 && (
                <div
                  style={{ width: `${pPending}%` }}
                  className="bg-[#0066FF] flex items-center justify-center text-[9px] text-white font-bold"
                >
                  {pending}
                </div>
              )}
              {inProgress > 0 && (
                <div
                  style={{ width: `${pInProgress}%` }}
                  className="bg-[#FF9800] flex items-center justify-center text-[9px] text-white font-bold"
                >
                  {inProgress}
                </div>
              )}
              {delivered > 0 && (
                <div
                  style={{ width: `${pDelivered}%` }}
                  className="bg-[#109F22] flex items-center justify-center text-[9px] text-white font-bold"
                >
                  {delivered}
                </div>
              )}
              {cancelled > 0 && (
                <div
                  style={{ width: `${pCancelled}%` }}
                  className="bg-[#F44336] flex items-center justify-center text-[9px] text-white font-bold"
                >
                  {cancelled}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></div>
                <span className="text-[10px] text-gray-500">Pending</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF9800]"></div>
                <span className="text-[10px] text-gray-500">In-Progress</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#109F22]"></div>
                <span className="text-[10px] text-gray-500">Delivered</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F44336]"></div>
                <span className="text-[10px] text-gray-500">Canceled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details drawer (Share) */}
      <DeliveryDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <DeliveryChatDrawer
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        driverName={driverName}
        avatar={avatar}
        isOnline={isOnline}
        eta={eta}
        status={status}
        address={address}
        pending={pending}
        inProgress={inProgress}
        delivered={delivered}
        cancelled={cancelled}
      />
    </>
  );
};

export default DeliveryCard;
