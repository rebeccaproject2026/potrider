import { useState } from "react";
import { Icon } from "@iconify/react";
import DeliveryDetailsDrawer from "./DeliveryDetailsDrawer";
import DeliveryChatDrawer from "./DeliveryChatDrawer";

const MOCK_ORDER = {
  orderQuantity: "13 Items",
  orderAmount: "1325.26",
  paymentMethod: "Cash on Delivery",
  orderType: "Same Day",
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
  showActions = true,
  onShare,
  onChat,
}) => {
  const {
    pending = 0,
    inProgress = 0,
    delivered = 0,
    cancelled = 0,
  } = breakdown;

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

  // Independent drawers for Card actions
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleShareClick = () => {
    setDetailsOpen(true);
    if (onShare) onShare();
  };

  const handleChatClick = () => {
    setChatOpen(true); // Only opens Chat Drawer
    if (onChat) onChat();
  };

  return (
    <>
      <div
        className={`bg-white rounded-sm border border-gray-200 shadow-lg overflow-hidden w-[120%] max-w-[150%px] ${className}`}
      >
        <div className="p-2">
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
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${isOnline
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

            {showActions && (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleShareClick}
                  className="text-blue-500 hover:bg-blue-50 rounded transition-colors"
                >
                  <Icon icon="fa6-solid:up-right-from-square" style={{ fontSize: "16px", color: "#0066FF" }} />
                </button>
                <button
                  type="button"
                  onClick={handleChatClick}
                  className="text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon icon="fluent:chat-16-regular" style={{ fontSize: "26px", color: "#000" }} />
                </button>
              </div>
            )}
          </div>

          {/* ETA & Status & Progress Line */}
          <div className="mb-1">
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
          <p className="text-[11px] text-gray-500 mb-1 pb-3 border-b border-gray-100 leading-tight">
            {address}
          </p>

          {/* Total Orders with box icon */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
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

      {/* Details drawer (Share) - Only render when actions are shown */}
      {showActions && (
        <DeliveryDetailsDrawer
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        />
      )}

      {/* Independent Chat Drawer - Only render when actions are shown */}
      {showActions && (
        <DeliveryChatDrawer
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          driverName={driverName}
          avatar={avatar}
          isOnline={isOnline}
          eta={eta}
          status={status}
          address={address}
          // Pass mock order details or real data here
          orderQuantity={MOCK_ORDER.orderQuantity}
          orderAmount={MOCK_ORDER.orderAmount}
          paymentMethod={MOCK_ORDER.paymentMethod}
          orderType={MOCK_ORDER.orderType}
        />
      )}
    </>
  );
};

export default DeliveryCard;
